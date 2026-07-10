import localStaffConfig from '../../../content/staff-allowlist-config.json';
import { getGitHubRawUrl } from '@/constants/config';
import { i18nError } from '@/i18n/resolveMessage';
import { fetchGistText } from '@/services/gist/gistClient';
import { fetchGitHubJson } from '@/services/github/githubClient';
import type {
  StaffAllowlistConfig,
  StaffAllowlistEntry,
  StaffAllowlistGistConfig,
  StaffAllowlistPage,
  StaffRegistrationInput,
  StaffRegistrationMatch,
} from '@/types/staffAllowlist';
import type { UserRole } from '@/types/auth';
import { normalizePersonText, findStaffEntryByPerson } from '@/utils/personText';

const REQUIRED_COLUMNS = ['nombre', 'apellido'] as const;

function detectDelimiter(headerLine: string): string {
  const semicolons = (headerLine.match(/;/g) ?? []).length;
  const commas = (headerLine.match(/,/g) ?? []).length;
  return semicolons > commas ? ';' : ',';
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsvStaff(csv: string): StaffAllowlistEntry[] {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const delimiter = detectDelimiter(lines[0]);
  const headers = parseCsvLine(lines[0], delimiter).map((header) => header.toLowerCase());
  const columnIndex = Object.fromEntries(headers.map((header, index) => [header, index]));

  for (const column of REQUIRED_COLUMNS) {
    if (!(column in columnIndex)) {
      throw new Error(`El archivo CSV debe incluir las columnas "nombre" y "apellido".`);
    }
  }

  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line, delimiter);
    const rangoIndex = columnIndex.rango;
    const emailIndex = columnIndex.email;

    return {
      nombre: cells[columnIndex.nombre] ?? '',
      apellido: cells[columnIndex.apellido] ?? '',
      email: emailIndex !== undefined ? cells[emailIndex] ?? '' : undefined,
      rango: rangoIndex !== undefined ? cells[rangoIndex] ?? '' : undefined,
    };
  });
}

function normalizeStaffPage(payload: StaffAllowlistPage | StaffAllowlistEntry[]): StaffAllowlistPage {
  if (Array.isArray(payload)) {
    return { staff: payload };
  }

  return {
    version: payload.version,
    updatedAt: payload.updatedAt,
    sanatorioId: payload.sanatorioId,
    staff: payload.staff ?? [],
  };
}

function parseStaffPayload(raw: string, filename: string): StaffAllowlistPage {
  if (filename.toLowerCase().endsWith('.csv')) {
    return { staff: parseCsvStaff(raw) };
  }

  return normalizeStaffPage(JSON.parse(raw) as StaffAllowlistPage | StaffAllowlistEntry[]);
}

function mergeStaffConfig(
  local: StaffAllowlistConfig,
  remote: StaffAllowlistConfig | null,
): StaffAllowlistConfig {
  if (!remote?.sanatorios) {
    return local;
  }

  const sanatorios: StaffAllowlistConfig['sanatorios'] = { ...local.sanatorios };

  for (const [id, remoteEntry] of Object.entries(remote.sanatorios)) {
    const localEntry = sanatorios[id];
    if (!localEntry) {
      sanatorios[id] = remoteEntry;
      continue;
    }

    sanatorios[id] = {
      ...localEntry,
      ...remoteEntry,
      gistId: remoteEntry.gistId?.trim() ? remoteEntry.gistId : localEntry.gistId,
      filename: remoteEntry.filename?.trim() ? remoteEntry.filename : localEntry.filename,
      institutionToken: remoteEntry.institutionToken?.trim()
        ? remoteEntry.institutionToken
        : localEntry.institutionToken,
    };
  }

  return { sanatorios };
}

async function loadStaffConfig(): Promise<StaffAllowlistConfig> {
  const local = localStaffConfig as StaffAllowlistConfig;

  try {
    const remote = await fetchGitHubJson<StaffAllowlistConfig>('staff-allowlist-config.json');
    return mergeStaffConfig(local, remote);
  } catch {
    return local;
  }
}

function getSanatorioGistConfig(
  config: StaffAllowlistConfig,
  sanatorioId: string,
): StaffAllowlistGistConfig | null {
  return config.sanatorios[sanatorioId] ?? null;
}

async function fetchBundledStaffList(
  sanatorioId: string,
  filename: string,
): Promise<StaffAllowlistPage> {
  const relativePath = `staff-allowlists/${filename || `${sanatorioId}.json`}`;
  const url = getGitHubRawUrl(`content/${relativePath}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No se encontr? el padr?n local (${response.status}).`);
  }

  const raw = await response.text();
  return parseStaffPayload(raw, filename || `${sanatorioId}.json`);
}

export async function loadStaffAllowlist(sanatorioId: string): Promise<StaffAllowlistPage> {
  const config = await loadStaffConfig();
  const gistEntry = getSanatorioGistConfig(config, sanatorioId);

  if (!gistEntry) {
    throw i18nError('auth.errors.staffRosterNotConfigured');
  }

  if (gistEntry.gistId.trim()) {
    const raw = await fetchGistText(gistEntry);
    return parseStaffPayload(raw, gistEntry.filename);
  }

  return fetchBundledStaffList(sanatorioId, gistEntry.filename);
}

export function isSupervisorRango(rango: string | undefined): boolean {
  if (!rango?.trim()) {
    return false;
  }

  return normalizePersonText(rango).includes('supervisor');
}

export function userClaimsSupervisor(profesion: string): boolean {
  return normalizePersonText(profesion).includes('supervisor');
}

export function roleFromStaffRango(rango: string | undefined): Extract<UserRole, 'user' | 'supervisor'> {
  return isSupervisorRango(rango) ? 'supervisor' : 'user';
}

export async function matchStaffRegistration(
  sanatorioId: string,
  input: StaffRegistrationInput,
): Promise<StaffRegistrationMatch | null> {
  let allowlist: StaffAllowlistPage;

  try {
    allowlist = await loadStaffAllowlist(sanatorioId);
  } catch {
    throw i18nError('auth.errors.staffRosterVerifyFailed');
  }

  const entry = findStaffEntryByPerson(allowlist.staff, input);
  if (!entry) {
    return null;
  }

  const listIsSupervisor = isSupervisorRango(entry.rango);
  const claimsSupervisor = userClaimsSupervisor(input.profesion);

  if (claimsSupervisor && !listIsSupervisor) {
    throw i18nError('auth.errors.staffSupervisorMismatch');
  }

  const profesion = input.profesion.trim();
  const role: Extract<UserRole, 'user' | 'supervisor'> =
    claimsSupervisor && listIsSupervisor ? 'supervisor' : 'user';

  return {
    entry,
    role,
    profesion,
  };
}

export async function validateStaffRegistration(
  sanatorioId: string,
  input: StaffRegistrationInput,
): Promise<StaffRegistrationMatch> {
  const match = await matchStaffRegistration(sanatorioId, input);

  if (!match) {
    throw i18nError('auth.errors.staffNotOnRoster');
  }

  return match;
}
