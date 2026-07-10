#!/usr/bin/env node
/** Utilidades compartidas para generadores de monografías. */
export const BRANCH = 'atencion-sanitaria';
export const DATE = '2026-06-25';

export const BIB = {
  sanford: {
    citation: 'Sanford Guide to Antimicrobial Therapy.',
    url: 'https://www.sanfordguide.com/',
  },
  anmat: {
    citation: 'ANMAT. Información de medicamentos y prospectos autorizados en Argentina.',
    url: 'https://www.argentina.gob.ar/anmat',
  },
  sadi: {
    citation: 'Sociedad Argentina de Infectología (SADI). Guías y consensos.',
    url: 'https://www.sadi.org.ar/',
  },
  idsa: {
    citation: 'Infectious Diseases Society of America (IDSA). Guías clínicas.',
    url: 'https://www.idsociety.org/',
  },
  aha: {
    citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.',
    url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines',
  },
  sccm: {
    citation: 'Society of Critical Care Medicine (SCCM). Guías de medicación en UCI.',
    url: 'https://www.sccm.org/',
  },
  aap: {
    citation: 'American Academy of Pediatrics. Medication guidance in critical care.',
    url: 'https://www.aap.org/',
  },
};

export function bib(...keys) {
  return keys.map((k) => BIB[k]);
}

function disclaimer() {
  return '\n\n> Ajustar según protocolo institucional y prescripción médica.';
}

export function build({
  id,
  name,
  executiveSummary,
  indications,
  dilution,
  stability,
  adverseEffects,
  bibliography = bib('aha', 'anmat', 'sccm', 'aap'),
}) {
  return {
    id,
    name,
    branch: BRANCH,
    version: '1.0',
    updatedAt: DATE,
    executiveSummary,
    indications: indications + disclaimer(),
    dilution,
    stability,
    adverseEffects,
    bibliography,
  };
}
