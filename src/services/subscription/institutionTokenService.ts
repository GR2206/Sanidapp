import localStaffConfig from '../../../content/staff-allowlist-config.json';
import { fetchGitHubJson } from '@/services/github/githubClient';
import type { StaffAllowlistConfig } from '@/types/staffAllowlist';

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

export async function loadStaffAllowlistConfig(): Promise<StaffAllowlistConfig> {
  const local = localStaffConfig as StaffAllowlistConfig;

  try {
    const remote = await fetchGitHubJson<StaffAllowlistConfig>('staff-allowlist-config.json');
    return mergeStaffConfig(local, remote);
  } catch {
    return local;
  }
}

export async function getInstitutionTokenForSanatorio(
  sanatorioId: string,
): Promise<string | null> {
  const config = await loadStaffAllowlistConfig();
  const token = config.sanatorios[sanatorioId]?.institutionToken?.trim();
  return token || null;
}

export async function validateInstitutionToken(
  sanatorioId: string,
  tokenInput: string,
): Promise<boolean> {
  const normalizedInput = tokenInput.trim();
  if (!normalizedInput || !sanatorioId) {
    return false;
  }

  const expected = await getInstitutionTokenForSanatorio(sanatorioId);
  if (!expected) {
    return false;
  }

  return expected === normalizedInput;
}

export async function findSanatorioIdByInstitutionToken(
  tokenInput: string,
): Promise<string | null> {
  const normalizedInput = tokenInput.trim();
  if (!normalizedInput) {
    return null;
  }

  const config = await loadStaffAllowlistConfig();

  for (const [sanatorioId, entry] of Object.entries(config.sanatorios)) {
    if (entry.institutionToken?.trim() === normalizedInput) {
      return sanatorioId;
    }
  }

  return null;
}
