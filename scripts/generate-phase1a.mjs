#!/usr/bin/env node
/**
 * Genera monografías pendientes desde master-list.csv (fases 1–4)
 * Uso: node scripts/generate-phase1a.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PHASE2_MONOGRAPHS } from './monographs-phase2.mjs';
import { PHASE3_MONOGRAPHS } from './monographs-phase3.mjs';
import { PHASE4_MONOGRAPHS } from './monographs-phase4.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DRUGS_DIR = path.join(ROOT, 'content/branches/atencion-sanitaria/farmacologia/drugs');
const MASTER_LIST = path.join(ROOT, 'content/branches/atencion-sanitaria/farmacologia/master-list.csv');
const BRANCH = 'atencion-sanitaria';
const DATE = '2026-06-25';

const BIB = {
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
};

function bib(...keys) {
  return keys.map((k) => BIB[k]);
}

function disclaimer() {
  return '\n\n> Ajustar según protocolo institucional y prescripción médica.';
}

function build({
  id,
  name,
  executiveSummary,
  indications,
  dilution,
  stability,
  adverseEffects,
  bibliography = bib('sanford', 'anmat', 'sadi', 'idsa'),
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

/** @type {Record<string, ReturnType<typeof build>>} */
const MONOGRAPHS = {
  'amp-001': build({
    id: 'amp-001',
    name: 'Ampicilina',
    executiveSummary:
      'Aminopenicilina de espectro ampliado frente a enterococos y Listeria. Uso IV/IM u oral según presentación e indicación.',
    indications:
      '## Indicaciones principales\n\n- Infecciones por microorganismos sensibles: ITU, neumonía adquirida en la comunidad (esquemas combinados), meningitis (en combinación según protocolo), endocarditis (esquemas).\n- Profilaxis en cirugía según protocolo.\n\n## Precauciones\n\n- Alergia a penicilinas: contraindicado.\n- Ajustar dosis en insuficiencia renal.\n- Rash morbiliforme frecuente en mononucleosis infecciosa.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 500 mg o 1 g IV; cápsulas/suspensión VO.',
        reconstitution: 'IV: reconstituir 1 g con 10 mL agua para inyección o NaCl 0,9%.',
        diluent: 'Diluir en SG 5% o NaCl 0,9% para perfusión.',
        finalConcentration: 'Hasta 30 mg/mL para perfusión IV.',
        dose: 'IV: 1–2 g cada 4–6 h. VO: 250–500 mg cada 6 h (según indicación).',
        infusionRate: 'Perfusión IV en 15–30 min.',
        administration: 'IV, IM o VO según presentación.',
        notes: 'Registrar vía y alergias previas a betalactámicos.',
      },
      pediatrico: {
        presentation: 'Frasco-ampolla IV; suspensión VO.',
        dose: 'IV: 50–100 mg/kg/día dividido cada 6 h. VO: 25–50 mg/kg/día cada 6–8 h.',
        administration: 'IV o VO. Doble verificación por peso.',
        notes: 'Ajustar en IRC.',
      },
      neonatal: {
        presentation: 'Frasco-ampolla IV (NNU).',
        dose: '50 mg/kg/dosis cada 12 h en RN a término; intervalos mayores en prematuros (protocolo NNU).',
        administration: 'IV lenta en bomba de jeringa.',
        notes: 'Población día 0–30. Vigilar función renal.',
      },
    },
    stability:
      '## Estabilidad\n\n- Solución reconstituida: usar en 1 h ambiente o según prospecto.\n- Dilución para perfusión: habitualmente 4–8 h ambiente / 24 h refrigerada.\n- Descartar si hay turbidez.',
    adverseEffects:
      '## Frecuentes\n\n- Diarrea, náuseas, rash.\n\n## Graves\n\n- Anafilaxia, colitis por *C. difficile*.\n\n## Vigilancia\n\n- Signos de hipersensibilidad y diarrea abundante.',
  }),

  'amp-002': build({
    id: 'amp-002',
    name: 'Ampicilina/sulbactam',
    executiveSummary:
      'Betalactámico con inhibidor de betalactamasas para infecciones por productores de betalactamasa, incluido *Acinetobacter* en esquemas según sensibilidad.',
    indications:
      '## Indicaciones principales\n\n- Infecciones de piel, intraabdominales, ginecológicas y respiratorias por microorganismos sensibles.\n- Polimicrobianas en esquemas empíricos según protocolo.\n\n## Precauciones\n\n- Alergia a penicilinas.\n- Ajuste en IRC. Hepatotoxicidad colestásica (rara) con uso prolongado.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1,5 g (1 g ampicilina + 0,5 g sulbactam) o 3 g.',
        reconstitution: 'Reconstituir 1,5 g con 3,2 mL agua para inyección (aprox. 250 mg/mL de ampicilina).',
        diluent: 'SG 5% o NaCl 0,9%.',
        dose: '1,5–3 g IV cada 6 h (componente ampicilina).',
        infusionRate: 'Perfusión 15–30 min.',
        administration: 'IV o IM.',
      },
      pediatrico: {
        dose: '100–200 mg/kg/día de ampicilina dividido cada 6 h (máx. según protocolo).',
        administration: 'IV. Confirmar peso.',
      },
      neonatal: {
        dose: 'Dosis según edad postmenstrual y peso (protocolo NNU).',
        administration: 'IV en bomba de jeringa.',
      },
    },
    stability: '## Estabilidad\n\n- Usar solución diluida según prospecto (habitualmente 8 h ambiente).',
    adverseEffects:
      '## Frecuentes\n\n- Diarrea, flebitis, rash.\n\n## Graves\n\n- Hepatitis colestásica, anafilaxia, colitis por *C. difficile*.',
  }),

  'amo-001': build({
    id: 'amo-001',
    name: 'Amoxicilina',
    executiveSummary:
      'Aminopenicilina oral de primera línea en muchas infecciones comunitarias; presentación IV en hospital según protocolo.',
    indications:
      '## Indicaciones principales\n\n- Otitis media, sinusitis, faringoamigdalitis (según guía local).\n- Neumonía adquirida en la comunidad en pacientes seleccionados.\n- Profilaxis dental en riesgo de endocarditis (esquemas).\n\n## Precauciones\n\n- Alergia a penicilinas.\n- Rash en mononucleosis.',
    dilution: {
      adulto: {
        presentation: 'Cápsulas 500 mg, 875 mg; suspensión; ampolla IV si disponible.',
        dose: 'VO: 500 mg–1 g cada 8 h. IV según protocolo hospitalario.',
        administration: 'VO con o sin alimentos; IV en perfusión.',
      },
      pediatrico: {
        dose: 'VO: 25–45 mg/kg/día dividido cada 8–12 h (máx. 3 g/día).',
        administration: 'VO preferente; IV si no tolera oral.',
      },
      neonatal: {
        dose: '25–30 mg/kg/dosis VO cada 12 h o IV según protocolo NNU.',
        administration: 'VO o IV según tolerancia y gravedad.',
      },
    },
    stability: '## Estabilidad\n\n- Suspensión reconstituida: refrigerar según prospecto (habitualmente 7–14 días).',
    adverseEffects: '## Frecuentes\n\n- Diarrea, náuseas, rash.\n\n## Graves\n\n- Anafilaxia, colitis por *C. difficile*.',
  }),

  'amo-002': build({
    id: 'amo-002',
    name: 'Amoxicilina/ácido clavulánico',
    executiveSummary:
      'Betalactámico con inhibidor para infecciones comunitarias resistentes a amoxicilina sola (otitis, sinusitis, mordeduras).',
    indications:
      '## Indicaciones principales\n\n- Infecciones respiratorias, otorrinolaringológicas y de piel donde se sospeche resistencia a amoxicilina.\n- Mordeduras humanas/animal en esquemas según protocolo.\n\n## Precauciones\n\n- Alergia a penicilinas.\n- Mayor riesgo de diarrea y hepatotoxicidad colestásica que amoxicilina sola.',
    dilution: {
      adulto: {
        presentation: 'Tabletas 500/125 mg, 875/125 mg; suspensión; IV 1,2 g o 2,2 g.',
        dose: 'VO: 875/125 mg cada 12 h. IV: 1,2 g cada 8 h o según protocolo.',
        administration: 'VO o IV.',
      },
      pediatrico: {
        dose: 'VO: 25–45 mg/kg/día de amoxicilina cada 12 h (componente amoxicilina).',
        administration: 'VO preferente.',
      },
      neonatal: {
        dose: 'Dosis según protocolo NNU; uso restringido.',
        administration: 'VO o IV según indicación.',
      },
    },
    stability: '## Estabilidad\n\n- Suspensión refrigerada según prospecto. IV diluida: usar en turno.',
    adverseEffects:
      '## Frecuentes\n\n- Diarrea, náuseas.\n\n## Graves\n\n- Hepatitis colestásica, anafilaxia, colitis por *C. difficile*.',
  }),

  'pen-001': build({
    id: 'pen-001',
    name: 'Penicilina G (benzilpenicilina)',
    executiveSummary:
      'Penicilina natural de espectro estrecho; primera línea en sífilis, meningitis por neumococo sensible y estreptococo.',
    indications:
      '## Indicaciones principales\n\n- Sífilis, faringitis estreptocócica, meningitis/neumonía por *Streptococcus* sensible.\n- Endocarditis por estreptococo sensible (esquemas prolongados).\n\n## Precauciones\n\n- Alergia a penicilinas.\n- Dosis altas: neurotoxicidad (convulsiones) en IRC.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 5 millones UI o 10 millones UI.',
        reconstitution: 'Reconstituir en agua para inyección según prospecto.',
        diluent: 'NaCl 0,9% o SG 5% para perfusión.',
        dose: '1–4 millones UI cada 4 h IV o según indicación (sífilis/meningitis: esquemas específicos).',
        infusionRate: 'Perfusión en 30–60 min para dosis altas.',
        administration: 'IV o IM profunda.',
      },
      pediatrico: {
        dose: '100.000–250.000 UI/kg/día dividido cada 4–6 h según infección.',
        administration: 'IV. Doble verificación de UI y volumen.',
      },
      neonatal: {
        dose: '50.000 UI/kg/dosis cada 12 h en RN; meningitis: esquemas más frecuentes (protocolo NNU).',
        administration: 'IV lenta.',
      },
    },
    stability: '## Estabilidad\n\n- Inestable en solución; preparar y usar pronto (1–4 h según concentración).',
    adverseEffects: '## Frecuentes\n\n- Rash, flebitis.\n\n## Graves\n\n- Anafilaxia, convulsiones con dosis altas en IRC.',
  }),

  'pen-002': build({
    id: 'pen-002',
    name: 'Penicilina G benzatínica',
    executiveSummary:
      'Penicilina depot de acción prolongada para sífilis y profilaxis de fiebre reumática; solo IM.',
    indications:
      '## Indicaciones principales\n\n- Sífilis (esquemas por estadio).\n- Profilaxis secundaria de fiebre reumática.\n- Profilaxis de glomerulonefritis pos-estreptocócica en esquemas.\n\n## Precauciones\n\n- Solo IM profunda. No administrar IV (riesgo grave).\n- Alergia a penicilinas.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1,2 millones UI o 2,4 millones UI.',
        administration: 'IM profunda en glúteo o vasto lateral. No diluir para administración.',
        dose: 'Sífilis primaria/secundaria/latente: 2,4 millones UI IM dosis única (ajustar por estadio).',
        notes: 'Suspender bien antes de extraer. Rotar sitio de inyección.',
      },
      pediatrico: {
        dose: 'Fiebre reumática: 600.000 UI IM cada 3–4 semanas (< 27 kg) o 1,2 millones UI (≥ 27 kg).',
        administration: 'IM profunda. No IV.',
      },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente tras preparación. No refrigerar solución ya cargada en jeringa prolongadamente.',
    adverseEffects:
      '## Frecuentes\n\n- Dolor en sitio IM, reacción de Jarisch-Herxheimer en sífilis.\n\n## Graves\n\n- Anafilaxia.',
  }),

  'oxa-001': build({
    id: 'oxa-001',
    name: 'Oxacilina',
    executiveSummary:
      'Penicilina resistente a penicilinasa para MSSA; no activa frente a MRSA.',
    indications:
      '## Indicaciones principales\n\n- Infecciones por *Staphylococcus aureus* sensible a oxacilina (MSSA).\n- Celulitis, osteomielitis, endocarditis estafilocócica (esquemas).\n\n## Precauciones\n\n- No usar si se sospecha MRSA.\n- Alergia a penicilinas.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g o 2 g.',
        reconstitution: 'Reconstituir 1 g con 10 mL agua para inyección o NaCl 0,9%.',
        dose: '1–2 g IV cada 4–6 h.',
        infusionRate: 'Perfusión 30–60 min.',
        administration: 'IV o IM.',
      },
      pediatrico: {
        dose: '100–200 mg/kg/día dividido cada 4–6 h.',
        administration: 'IV.',
      },
      neonatal: {
        dose: '25–50 mg/kg/dosis cada 12 h (protocolo NNU).',
        administration: 'IV.',
      },
    },
    stability: '## Estabilidad\n\n- Solución reconstituida: 4 h ambiente / 24 h refrigerada (verificar prospecto).',
    adverseEffects: '## Frecuentes\n\n- Flebitis, rash.\n\n## Graves\n\n- Anafilaxia, nefritis intersticial (raro).',
  }),

  'tic-001': build({
    id: 'tic-001',
    name: 'Ticarcilina/ácido clavulánico',
    executiveSummary:
      'Antipseudomonal histórico en combinación; uso según antibiograma y disponibilidad institucional.',
    indications:
      '## Indicaciones principales\n\n- Infecciones por Gram negativos incluido *Pseudomonas* en esquemas combinados.\n- Alternativa según sensibilidad local cuando esté en formulario.\n\n## Precauciones\n\n- Alergia a penicilinas.\n- Ajuste en IRC. Uso restringido por disponibilidad de alternativas.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 3,1 g (3 g ticarcilina + 0,1 g clavulánico).',
        reconstitution: 'Reconstituir con 13 mL diluyente según prospecto.',
        dose: '3,1 g IV cada 4–6 h.',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV.',
      },
      pediatrico: {
        dose: '200–400 mg/kg/día de ticarcilina dividido cada 4–6 h (máx. protocolo).',
        administration: 'IV.',
      },
    },
    stability: '## Estabilidad\n\n- Usar dilución en 6–24 h según diluyente y prospecto.',
    adverseEffects: '## Frecuentes\n\n- Diarrea, flebitis, hipokalemia con dosis altas.\n\n## Graves\n\n- Anafilaxia, colitis por *C. difficile*.',
  }),

  'cef-001': build({
    id: 'cef-001',
    name: 'Cefalexina',
    executiveSummary: 'Cefalosporina de primera generación oral para infecciones de piel y vías urinarias leves-moderadas.',
    indications: '## Indicaciones\n\n- ITU no complicada, celulitis leve, infecciones de piel por estreptococo/estafilococo sensible.\n\n## Precauciones\n\n- Alergia grave a betalactámicos. Reacción cruzada posible con penicilinas.',
    dilution: {
      adulto: { presentation: 'Cápsulas 500 mg; suspensión.', dose: '250–500 mg VO cada 6 h.', administration: 'VO.' },
      pediatrico: { dose: '25–50 mg/kg/día VO cada 6–8 h (máx. 4 g/día).', administration: 'VO.' },
      neonatal: { dose: '25 mg/kg/dosis VO cada 12 h según protocolo.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Suspensión refrigerada según prospecto.',
    adverseEffects: '## Efectos\n\n- Diarrea, náuseas, rash. Anafilaxia (raro).',
  }),

  'cef-002': build({
    id: 'cef-002',
    name: 'Cefazolina',
    executiveSummary: 'Cefalosporina de primera generación IV; profilaxis quirúrgica y MSSA.',
    indications: '## Indicaciones\n\n- Profilaxis quirúrgica de piel y partes blandas.\n- Infecciones por MSSA y estreptococo sensible.\n\n## Precauciones\n\n- Ajustar en IRC. Alergia a betalactámicos.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g o 2 g.',
        reconstitution: '1 g con 10 mL diluyente.',
        dose: '1–2 g IV cada 8 h. Profilaxis: 2 g dosis única pre-incisión (protocolo).',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV o IM.',
      },
      pediatrico: { dose: '25–100 mg/kg/día cada 6–8 h.', administration: 'IV.' },
      neonatal: { dose: '25 mg/kg/dosis cada 12 h (NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h refrigerada según prospecto.',
    adverseEffects: '## Efectos\n\n- Flebitis, rash, diarrea. Anafilaxia.',
  }),

  'cef-003': build({
    id: 'cef-003',
    name: 'Cefuroxima',
    executiveSummary: 'Cefalosporina de segunda generación IV/VO para infecciones respiratorias y quirúrgicas.',
    indications: '## Indicaciones\n\n- Neumonía comunitaria, infecciones quirúrgicas, ITU.\n- Profilaxis quirúrgica en esquemas alternativos.\n\n## Precauciones\n\n- Ajustar en IRC.',
    dilution: {
      adulto: {
        presentation: 'Frasco 750 mg, 1,5 g IV; tabletas 250–500 mg VO.',
        dose: 'IV: 750 mg–1,5 g cada 8 h. VO: 250–500 mg cada 12 h.',
        administration: 'IV o VO.',
      },
      pediatrico: { dose: '30 mg/kg/día IV cada 8 h o VO cada 12 h.', administration: 'IV/VO.' },
      neonatal: { dose: 'Dosis según protocolo NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- IV diluida: 24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Diarrea, flebitis, rash.',
  }),

  'cef-004': build({
    id: 'cef-004',
    name: 'Cefoxitina',
    executiveSummary: 'Cefamicina con cobertura de anaerobios; profilaxis quirúrgica colorrectal y ginecológica.',
    indications: '## Indicaciones\n\n- Infecciones intraabdominales polimicrobianas.\n- Profilaxis quirúrgica con riesgo anaerobio.\n\n## Precauciones\n\n- Ajustar en IRC.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g o 2 g.',
        dose: '1–2 g IV cada 6–8 h.',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV.',
      },
      pediatrico: { dose: '80–160 mg/kg/día cada 6–8 h.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar en 6–24 h según diluyente.',
    adverseEffects: '## Efectos\n\n- Diarrea, flebitis, colitis por *C. difficile*.',
  }),

  'cef-005': build({
    id: 'cef-005',
    name: 'Ceftriaxona',
    executiveSummary: 'Cefalosporina de tercera generación de vida media larga; meningitis, neumonía y gonorrea.',
    indications: '## Indicaciones\n\n- Neumonía, meningitis, bacteriemia, gonorrea no complicada (dosis única según guía).\n- Infecciones óseas y articulares en esquemas.\n\n## Precauciones\n\n- No mezclar con calcio en la misma línea (lactantes). Colelitiasis reversible con uso prolongado.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g o 2 g.',
        reconstitution: '1 g con 10 mL agua para inyección.',
        dose: '1–2 g IV/IM cada 24 h o 1 g cada 12 h según infección.',
        administration: 'IV lenta 30 min o IM profunda.',
        notes: 'Evitar coadministración con soluciones que contengan calcio en neonatos.',
      },
      pediatrico: { dose: '50–100 mg/kg/día IV/IM cada 12–24 h (máx. 2 g/día).', administration: 'IV/IM.' },
      neonatal: { dose: '50 mg/kg/dosis cada 24 h (meningitis: esquemas específicos NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h ambiente / 3 días refrigerada (ver prospecto).',
    adverseEffects: '## Efectos\n\n- Diarrea, flebitis, litiasis biliar sintomática (raro).',
  }),

  'cef-006': build({
    id: 'cef-006',
    name: 'Cefotaxima',
    executiveSummary: 'Cefalosporina de tercera generación; alternativa en meningitis neonatal y pediátrica.',
    indications: '## Indicaciones\n\n- Meningitis bacteriana, sepsis, infecciones nosocomiales en esquemas.\n- Alternativa a ceftriaxona según protocolo.\n\n## Precauciones\n\n- Ajustar en IRC.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g.',
        dose: '1–2 g IV cada 6–8 h.',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV.',
      },
      pediatrico: { dose: '100–200 mg/kg/día dividido cada 6–8 h.', administration: 'IV.' },
      neonatal: { dose: '50 mg/kg/dosis cada 12 h; meningitis: cada 8 h (NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Dilución 12–24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Diarrea, flebitis, rash.',
  }),

  'cef-007': build({
    id: 'cef-007',
    name: 'Ceftazidima',
    executiveSummary: 'Cefalosporina antipseudomonal de tercera generación; uso en neutropenia febril y Pseudomonas.',
    indications: '## Indicaciones\n\n- Infecciones por *Pseudomonas* y Gram negativos hospitalarios.\n- Neutropenia febril en combinación.\n\n## Precauciones\n\n- Usar en combinación para resistencia. Ajustar en IRC.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g o 2 g.',
        dose: '1–2 g IV cada 8 h.',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV.',
      },
      pediatrico: { dose: '100–150 mg/kg/día cada 8 h.', administration: 'IV.' },
      neonatal: { dose: '50 mg/kg/dosis cada 12 h (NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Diarrea, rash, neurotoxicidad con dosis altas en IRC.',
  }),

  'cef-008': build({
    id: 'cef-008',
    name: 'Cefepime',
    executiveSummary: 'Cefalosporina de cuarta generación con cobertura antipseudomonal ampliada.',
    indications: '## Indicaciones\n\n- Neumonía nosocomial, neutropenia febril, infecciones por Gram negativos resistentes sensibles.\n\n## Precauciones\n\n- Neurotoxicidad en IRC. Ajustar dosis.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g o 2 g.',
        dose: '1–2 g IV cada 8–12 h.',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV.',
      },
      pediatrico: { dose: '50 mg/kg/dosis cada 8 h (máx. 2 g).', administration: 'IV.' },
      neonatal: { dose: '30 mg/kg/dosis cada 12 h (protocolo NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- 24 h refrigerada tras dilución.',
    adverseEffects: '## Efectos\n\n- Diarrea, flebitis, encefalopatía en IRC.',
  }),

  'imp-001': build({
    id: 'imp-001',
    name: 'Imipenem/cilastatina',
    executiveSummary: 'Carbapenémico de amplio espectro; cilastatina inhibe degradación renal. Ajustar en IRC.',
    indications: '## Indicaciones\n\n- Infecciones polimicrobianas graves, intraabdominales, nosocomiales.\n- No es primera línea en convulsiones/epilepsia no controlada.\n\n## Precauciones\n\n- Mayor riesgo de convulsiones que meropenem. Ajuste estricto en IRC.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 500 mg imipenem + 500 mg cilastatina o 1 g/1 g.',
        reconstitution: '500 mg con 10 mL diluyente.',
        dose: '500 mg–1 g IV cada 6 h.',
        infusionRate: 'Perfusión 20–60 min.',
        administration: 'IV.',
      },
      pediatrico: { dose: '15–25 mg/kg/dosis cada 6 h (imipenem).', administration: 'IV.' },
      neonatal: { dose: 'Dosis según edad postmenstrual (NNU); uso especializado.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente o 4 h ambiente tras reconstitución.',
    adverseEffects: '## Efectos\n\n- Náuseas, diarrea, convulsiones, rash.',
  }),

  'ert-001': build({
    id: 'ert-001',
    name: 'Ertapenem',
    executiveSummary: 'Carbapenémico de vida media larga; dosis única diaria. Sin cobertura antipseudomonal.',
    indications: '## Indicaciones\n\n- Infecciones comunitarias complicadas, intraabdominales, ITU complicada, neumonía adquirida en la comunidad grave.\n\n## Precauciones\n\n- No cubre *Pseudomonas* ni *Acinetobacter*. Ajustar en IRC.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g.',
        reconstitution: '1 g con 10 mL agua para inyección.',
        dose: '1 g IV/IM cada 24 h.',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV o IM profunda.',
      },
      pediatrico: { dose: '15 mg/kg/dosis cada 12 h (máx. 1 g/día).', administration: 'IV/IM.' },
    },
    stability: '## Estabilidad\n\n- Dilución 6 h ambiente / 24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Diarrea, flebitis, rash, convulsiones (raro).',
  }),

  'tei-001': build({
    id: 'tei-001',
    name: 'Teicoplanina',
    executiveSummary: 'Glicopéptido con dosis de carga y mantenimiento; alternativa a vancomicina IV.',
    indications: '## Indicaciones\n\n- Infecciones por Gram positivos incluido MRSA.\n- Profilaxis en cirugía ortopédica/cardíaca en esquemas.\n\n## Precauciones\n\n- Dosis de carga obligatoria. Monitorizar función renal y niveles según protocolo.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 200 mg o 400 mg.',
        reconstitution: 'Reconstituir con agua para inyección; espuma normal, dejar reposar.',
        dose: 'Carga: 6 mg/kg cada 12 h x 3 dosis. Mantenimiento: 6 mg/kg cada 24 h.',
        infusionRate: 'Perfusión IV lenta 30 min.',
        administration: 'IV o IM.',
      },
      pediatrico: { dose: 'Carga 10 mg/kg cada 12 h x 3; mantenimiento 6–10 mg/kg cada 24 h.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Solución reconstituida 24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Rash, nefrotoxicidad, ototoxicidad, reacciones de histamina (infusión rápida).',
  }),

  'lin-001': build({
    id: 'lin-001',
    name: 'Linezolid',
    executiveSummary: 'Oxazolidinona oral/IV para Gram positivos resistentes incluido VRE y neumonía nosocomial.',
    indications: '## Indicaciones\n\n- Neumonía nosocomial por MRSA, infecciones por VRE, infecciones de piel complicadas.\n\n## Precauciones\n\n- Mielotoxicidad con uso > 2 semanas. Interacción con ISRS (síndrome serotoninérgico).',
    dilution: {
      adulto: {
        presentation: 'Bolsa/botella 600 mg IV; comprimidos 600 mg VO.',
        dose: '600 mg IV/VO cada 12 h.',
        infusionRate: 'Perfusión 30–120 min.',
        administration: 'IV o VO.',
      },
      pediatrico: { dose: '10 mg/kg/dosis cada 8 h (< 12 años).', administration: 'IV/VO.' },
      neonatal: { dose: '10 mg/kg/dosis cada 8–12 h (NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Bolsa lista para usar según prospecto; no mezclar con otros fármacos.',
    adverseEffects: '## Efectos\n\n- Náuseas, diarrea, trombocitopenia, neuropatía periférica (uso prolongado).',
  }),

  'dap-001': build({
    id: 'dap-001',
    name: 'Daptomicina',
    executiveSummary: 'Lipopéptido IV solo adultos; bacteriemia y endocarditis por Gram positivos, incluido MRSA.',
    indications: '## Indicaciones\n\n- Bacteriemia, endocarditis, infecciones de piel complicadas por Gram positivos.\n\n## Precauciones\n\n- Contraindicado en neumonía (inactivado por surfactante). Monitorizar CPK.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 350 mg o 500 mg.',
        reconstitution: 'Reconstituir con NaCl 0,9% según prospecto.',
        dose: '4–6 mg/kg IV cada 24 h (6 mg/kg en endocarditis).',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV.',
        notes: 'No usar en neumonía.',
      },
    },
    stability: '## Estabilidad\n\n- Usar en 12–24 h tras dilución según prospecto.',
    adverseEffects: '## Efectos\n\n- Miopatía (elevación CPK), eosinofilia pulmonar, náuseas.',
  }),

  'gen-001': build({
    id: 'gen-001',
    name: 'Gentamicina',
    executiveSummary: 'Aminoglucósido bactericida concentración-dependiente; sinergia en endocarditis y sepsis Gram negativa.',
    indications: '## Indicaciones\n\n- Infecciones Gram negativas graves en combinación.\n- Sinergia en enterococo/endocarditis estafilocócica.\n\n## Precauciones\n\n- Nefrotoxicidad y ototoxicidad. Ajustar por niveles y función renal.',
    dilution: {
      adulto: {
        presentation: 'Ampolla 40 mg/mL o frascos 80 mg.',
        dose: '5–7 mg/kg/día IV/IM dividido cada 8 h o dosis única diaria (protocolo).',
        infusionRate: 'Perfusión 30–60 min.',
        administration: 'IV o IM.',
        notes: 'Solicitar niveles pre y post dosis según política.',
      },
      pediatrico: { dose: '5–7,5 mg/kg/día dividido cada 8 h o esquema único diario.', administration: 'IV.' },
      neonatal: { dose: '4–5 mg/kg/dosis cada 24–36 h según edad postmenstrual (NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Nefrotoxicidad, ototoxicidad, bloqueo neuromuscular (raro con anestésicos).',
  }),

  'ami-001': build({
    id: 'ami-001',
    name: 'Amikacina',
    executiveSummary: 'Aminoglucósido de reserva para Gram negativos multirresistentes; monitorización de niveles obligatoria.',
    indications: '## Indicaciones\n\n- Infecciones por Gram negativos resistentes sensibles.\n- Micobacterias no tuberculosas en esquemas especializados.\n\n## Precauciones\n\n- Nefrotoxicidad y ototoxicidad. Ajustar por niveles.',
    dilution: {
      adulto: {
        presentation: 'Ampolla 250 mg/mL.',
        dose: '15 mg/kg/día IV/IM dividido cada 8–12 h o dosis única diaria.',
        administration: 'IV en 30 min.',
        notes: 'Niveles valle y pico según protocolo.',
      },
      pediatrico: { dose: '15–20 mg/kg/día dividido cada 8 h.', administration: 'IV.' },
      neonatal: { dose: '15 mg/kg/dosis cada 24–48 h según edad postmenstrual.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- 24 h refrigerada tras dilución.',
    adverseEffects: '## Efectos\n\n- Nefrotoxicidad, ototoxicidad vestibular y coclear.',
  }),

  'tob-001': build({
    id: 'tob-001',
    name: 'Tobramicina',
    executiveSummary: 'Aminoglucósido con mayor actividad antipseudomonal; uso IV, IM o inhalada en fibrosis quística.',
    indications: '## Indicaciones\n\n- Infecciones por *Pseudomonas* en combinación.\n- Inhalada en exacerbaciones de fibrosis quística (presentación específica).\n\n## Precauciones\n\n- Monitorizar niveles y función renal.',
    dilution: {
      adulto: {
        presentation: 'Ampolla 40 mg/mL IV; solución para nebulización.',
        dose: '5–7 mg/kg/día IV dividido cada 8 h. Inhalada: según protocolo de fibrosis quística.',
        administration: 'IV o inhalada.',
      },
      pediatrico: { dose: '5–7 mg/kg/día IV cada 8 h.', administration: 'IV/inhalada según indicación.' },
      neonatal: { dose: '4–5 mg/kg/dosis cada 24–48 h (NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- IV diluida 24 h refrigerada. Nebulización: usar inmediatamente.',
    adverseEffects: '## Efectos\n\n- Nefrotoxicidad, ototoxicidad, broncoespasmo (inhalada).',
  }),

  'cip-001': build({
    id: 'cip-001',
    name: 'Ciprofloxacino',
    executiveSummary: 'Fluoroquinolona con cobertura antipseudomonal; restricción en pediatría por riesgo articular.',
    indications: '## Indicaciones\n\n- ITU complicada, prostatitis, infecciones por Pseudomonas en adultos.\n- Profilaxis en neutropenia (esquemas).\n\n## Precauciones\n\n- Evitar en embarazo y lactancia. Uso pediátrico restringido a indicaciones específicas.',
    dilution: {
      adulto: {
        presentation: 'Comprimidos 500 mg; bolsa IV 200 mg/100 mL o frasco 400 mg.',
        dose: '500–750 mg VO cada 12 h o 400 mg IV cada 8–12 h.',
        administration: 'VO o IV.',
      },
      pediatrico: {
        dose: 'Solo en indicaciones autorizadas (ej. fibrosis quística): 20–30 mg/kg/día cada 12 h.',
        administration: 'VO/IV bajo supervisión especializada.',
      },
    },
    stability: '## Estabilidad\n\n- IV: proteger de luz; estabilidad según bolsa preparada.',
    adverseEffects: '## Efectos\n\n- Náuseas, tendinitis/rotura tendinosa, prolongación QT, fotosensibilidad.',
  }),

  'lev-001': build({
    id: 'lev-001',
    name: 'Levofloxacino',
    executiveSummary: 'Fluoroquinolona de amplio espectro; neumonía comunitaria y nosocomial en adultos.',
    indications: '## Indicaciones\n\n- Neumonía adquirida en la comunidad, ITU, prostatitis.\n- Esquemas combinados en tuberculosis sensible (según protocolo nacional).\n\n## Precauciones\n\n- Restringir en pediatría. Prolongación QT.',
    dilution: {
      adulto: {
        presentation: 'Comprimidos 500 mg, 750 mg; IV 500 mg.',
        dose: '500–750 mg VO/IV cada 24 h.',
        administration: 'VO o IV.',
      },
      pediatrico: {
        dose: 'Uso restringido > 6 meses en indicaciones específicas según protocolo.',
        administration: 'VO/IV especializado.',
      },
    },
    stability: '## Estabilidad\n\n- IV diluida según prospecto; proteger de luz.',
    adverseEffects: '## Efectos\n\n- Náuseas, tendinitis, alteración de glicemia, prolongación QT.',
  }),

  'mox-001': build({
    id: 'mox-001',
    name: 'Moxifloxacino',
    executiveSummary: 'Fluoroquinolona con cobertura de neumococo y anaerobios; uso principalmente en adultos.',
    indications: '## Indicaciones\n\n- Neumonía adquirida en la comunidad, sinusitis bacteriana, exacerbación de EPOC.\n\n## Precauciones\n\n- Prolongación QT. Hepatotoxicidad (rara). No antipseudomonal confiable.',
    dilution: {
      adulto: {
        presentation: 'Comprimidos 400 mg; IV 400 mg.',
        dose: '400 mg VO/IV cada 24 h.',
        administration: 'VO o IV.',
      },
    },
    stability: '## Estabilidad\n\n- IV: usar según prospecto de bolsa o dilución.',
    adverseEffects: '## Efectos\n\n- Náuseas, prolongación QT, hepatotoxicidad, tendinitis.',
  }),

  'met-001': build({
    id: 'met-001',
    name: 'Metronidazol',
    executiveSummary: 'Nitroimidazol para anaerobios y *Clostridioides difficile*; IV y VO.',
    indications: '## Indicaciones\n\n- Infecciones intraabdominales, ginecológicas y de piel por anaerobios.\n- Colitis por *C. difficile* (VO preferente).\n- Profilaxis quirúrgica colorrectal.\n\n## Precauciones\n\n- Evitar alcohol (reacción tipo disulfiram). Neurotoxicidad con uso prolongado.',
    dilution: {
      adulto: {
        presentation: 'Comprimidos 250–500 mg; bolsa IV 500 mg.',
        dose: '500 mg VO cada 8 h o 500 mg IV cada 8 h.',
        administration: 'VO o IV.',
      },
      pediatrico: { dose: '30 mg/kg/día dividido cada 8 h.', administration: 'VO/IV.' },
      neonatal: { dose: '7,5 mg/kg/dosis cada 12 h (NNU).', administration: 'IV/VO.' },
    },
    stability: '## Estabilidad\n\n- IV: proteger de luz; 24 h refrigerada tras dilución.',
    adverseEffects: '## Efectos\n\n- Náuseas, sabor metálico, neuropatía periférica (prolongado).',
  }),

  'cli-001': build({
    id: 'cli-001',
    name: 'Clindamicina',
    executiveSummary: 'Lincosamida para anaerobios y Gram positivos; alternativa en alergia a betalactámicos.',
    indications: '## Indicaciones\n\n- Infecciones de piel, óseas, neumonía por aspiración (anaerobios).\n- Toxoplasmosis en esquemas.\n\n## Precauciones\n\n- Alto riesgo de colitis por *C. difficile*.',
    dilution: {
      adulto: {
        presentation: 'Cápsulas 300 mg; ampolla 150 mg/mL.',
        dose: '600–900 mg IV cada 8 h o 300 mg VO cada 6 h.',
        infusionRate: 'Perfusión 30 min.',
        administration: 'VO o IV.',
      },
      pediatrico: { dose: '25–40 mg/kg/día dividido cada 6–8 h.', administration: 'VO/IV.' },
      neonatal: { dose: '5–7,5 mg/kg/dosis cada 6–8 h.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- IV 24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Diarrea, colitis por *C. difficile*, rash.',
  }),

  'azi-001': build({
    id: 'azi-001',
    name: 'Azitromicina',
    executiveSummary: 'Macrólido de vida media larga; atípicas, MAC y esquemas de Chagas (según protocolo).',
    indications: '## Indicaciones\n\n- Neumonía atípica, faringitis (alternativa en alergia a penicilina).\n- Infecciones no tuberculosas por micobacterias en esquemas.\n\n## Precauciones\n\n- Prolongación QT. Interacciones por CYP3A4.',
    dilution: {
      adulto: {
        presentation: 'Comprimidos 500 mg; suspensión; frasco IV 500 mg.',
        dose: '500 mg VO día 1, luego 250 mg/día x 4 días; o 500 mg IV cada 24 h.',
        administration: 'VO o IV.',
      },
      pediatrico: { dose: '10 mg/kg/día VO día 1, luego 5 mg/kg/día x 4 días.', administration: 'VO/IV.' },
      neonatal: { dose: 'Uso restringido según protocolo NNU (ej. Chagas).', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- IV reconstituida según prospecto.',
    adverseEffects: '## Efectos\n\n- Diarrea, náuseas, prolongación QT, hepatotoxicidad.',
  }),

  'eri-001': build({
    id: 'eri-001',
    name: 'Eritromicina',
    executiveSummary: 'Macrólido histórico; profilaxis ocular neonatal y procinético en lactantes (protocolo).',
    indications: '## Indicaciones\n\n- Alternativa en alergia a penicilina.\n- Profilaxis oftálmica neonatal de gonococo/clamidia según norma local.\n\n## Precauciones\n\n- Prolongación QT. Interacciones múltiples.',
    dilution: {
      adulto: {
        presentation: 'Comprimidos; frasco IV 1 g.',
        dose: '250–500 mg VO cada 6 h o 500 mg–1 g IV cada 6 h.',
        administration: 'VO o IV.',
      },
      pediatrico: { dose: '30–50 mg/kg/día dividido cada 6 h.', administration: 'VO/IV.' },
      neonatal: {
        dose: 'Profilaxis ocular: pomada 0,5% según protocolo. IV oral según indicación.',
        administration: 'Tópica ocular o VO/IV.',
      },
    },
    stability: '## Estabilidad\n\n- IV inestable; usar pronto.',
    adverseEffects: '## Efectos\n\n- Náuseas, dolor abdominal, prolongación QT.',
  }),

  'cla-001': build({
    id: 'cla-001',
    name: 'Claritromicina',
    executiveSummary: 'Macrólido oral/IV para atípicas y erradicación de *H. pylori* en esquemas.',
    indications: '## Indicaciones\n\n- Neumonía atípica, sinusitis, infecciones de piel.\n- Componente de terapia triple para *H. pylori*.\n\n## Precauciones\n\n- Prolongación QT. Ajustar en IRC.',
    dilution: {
      adulto: {
        presentation: 'Comprimidos 500 mg; suspensión.',
        dose: '500 mg VO cada 12 h.',
        administration: 'VO.',
      },
      pediatrico: { dose: '15 mg/kg/día dividido cada 12 h.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Suspensión refrigerada según prospecto.',
    adverseEffects: '## Efectos\n\n- Diarrea, alteración de gusto, prolongación QT.',
  }),

  'tri-001': build({
    id: 'tri-001',
    name: 'Trimetoprima/sulfametoxazol',
    executiveSummary: 'Sulfonamida combinada (TMP-SMX); ITU, Pneumocystis y MRSA cutáneo comunitario.',
    indications: '## Indicaciones\n\n- ITU, prostatitis, infecciones respiratorias sensibles.\n- Profilaxis y tratamiento de *Pneumocystis jirovecii*.\n- MRSA cutáneo comunitario.\n\n## Precauciones\n\n- Riesgo de reacciones cutáneas graves (SJS/TEN). Ajustar en IRC. Hiperkalemia.',
    dilution: {
      adulto: {
        presentation: 'Comprimidos 80/400 mg o 160/800 mg; ampolla IV.',
        dose: '160/800 mg VO cada 12 h o 5 mg/kg TMP IV cada 6–8 h.',
        administration: 'VO o IV lenta.',
      },
      pediatrico: { dose: '6–10 mg/kg/día TMP dividido cada 12 h.', administration: 'VO/IV.' },
      neonatal: { dose: 'Evitar < 2 meses salvo indicación vital; dosis según NNU.', administration: 'VO/IV.' },
    },
    stability: '## Estabilidad\n\n- IV: proteger de luz; usar en turno.',
    adverseEffects: '## Efectos\n\n- Rash, hiperkalemia, mielotoxicidad, cristaluria.',
  }),

  'dox-001': build({
    id: 'dox-001',
    name: 'Doxiciclina',
    executiveSummary: 'Tetraciclina de vida media larga; atípicas, rickettsias y malaria profilaxis.',
    indications: '## Indicaciones\n\n- Neumonía atípica, rickettsiosis, borreliosis, brucelosis.\n- Profilaxis de malaria (esquemas).\n\n## Precauciones\n\n- Evitar < 8 años (manchado dental) salvo indicación vital. Fotosensibilidad.',
    dilution: {
      adulto: {
        presentation: 'Cápsulas 100 mg; frasco IV.',
        dose: '100 mg VO cada 12 h o carga 200 mg día 1.',
        administration: 'VO con agua, erecto.',
      },
      pediatrico: { dose: '> 8 años: 2–4 mg/kg/día cada 12 h.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- IV: proteger de luz; usar pronto.',
    adverseEffects: '## Efectos\n\n- Náuseas, fotosensibilidad, esofagitis si no se traga con agua.',
  }),

  'min-001': build({
    id: 'min-001',
    name: 'Minociclina',
    executiveSummary: 'Tetraciclina oral con buena penetración tisular; acné y MRSA cutáneo.',
    indications: '## Indicaciones\n\n- Acné moderado-grave, MRSA cutáneo, infecciones atípicas en adultos.\n\n## Precauciones\n\n- Evitar en embarazo y < 8 años. Vertigio y pigmentación (raro).',
    dilution: {
      adulto: {
        presentation: 'Cápsulas 100 mg.',
        dose: '100 mg VO cada 12 h.',
        administration: 'VO con abundante agua.',
      },
    },
    stability: '## Estabilidad\n\n- Conservar según prospecto; proteger de luz.',
    adverseEffects: '## Efectos\n\n- Vértigo, náuseas, fotosensibilidad, manchado dental en pediatría.',
  }),

  'tig-001': build({
    id: 'tig-001',
    name: 'Tigeciclina',
    executiveSummary: 'Glicilciclina IV de reserva para polimicrobianos intraabdominales y de piel complicados.',
    indications: '## Indicaciones\n\n- Infecciones intraabdominales y de piel complicadas cuando alternativas no son adecuadas.\n\n## Precauciones\n\n- Mayor mortalidad en bacteriemia en algunos estudios; no primera línea en sepsis. Náuseas frecuentes.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 50 mg.',
        reconstitution: '50 mg con 5,3 mL diluyente; diluir en 100 mL SG 5% o NaCl 0,9%.',
        dose: 'Carga 100 mg, luego 50 mg IV cada 12 h.',
        infusionRate: 'Perfusión 30–60 min.',
        administration: 'IV.',
      },
    },
    stability: '## Estabilidad\n\n- Usar dilución en 6–24 h según prospecto.',
    adverseEffects: '## Efectos\n\n- Náuseas, vómitos, hiperbilirrubinemia, pancreatitis (raro).',
  }),

  'azt-001': build({
    id: 'azt-001',
    name: 'Aztreonam',
    executiveSummary: 'Monobactámico activo frente a Gram negativos; seguro en alergia grave a penicilina (sin reacción cruzada).',
    indications: '## Indicaciones\n\n- Infecciones por Gram negativos en pacientes con alergia a betalactámicos.\n- Infecciones urinarias y respiratorias nosocomiales en esquemas.\n\n## Precauciones\n\n- Sin cobertura Gram positiva ni anaerobia.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 1 g o 2 g.',
        dose: '1–2 g IV cada 8 h.',
        infusionRate: 'Perfusión 30 min.',
        administration: 'IV.',
      },
      pediatrico: { dose: '90–120 mg/kg/día dividido cada 6–8 h.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- 24 h refrigerada tras dilución.',
    adverseEffects: '## Efectos\n\n- Rash, flebitis, diarrea.',
  }),

  'col-001': build({
    id: 'col-001',
    name: 'Colistina',
    executiveSummary: 'Polimixina de reserva para Gram negativos multirresistentes (CRE, MDR Pseudomonas).',
    indications: '## Indicaciones\n\n- Infecciones por bacilos Gram negativos multirresistentes sin alternativas.\n\n## Precauciones\n\n- Nefrotoxicidad y neurotoxicidad. Ajustar por función renal. Calcular dosis en UI o mg de colistimetato según protocolo.',
    dilution: {
      adulto: {
        presentation: 'Frasco colistimetato sódico (UI o mg según fabricante).',
        reconstitution: 'Reconstituir según prospecto; diluir en SG 5% o NaCl 0,9%.',
        dose: 'Carga 5 mg/kg de colistina base, mantenimiento 2,5–5 mg/kg/día dividido (protocolo institucional).',
        infusionRate: 'Perfusión 30–60 min.',
        administration: 'IV.',
        notes: 'Unificar unidades (UI vs mg) con farmacia antes de preparar.',
      },
      pediatrico: { dose: '2,5–5 mg/kg/día dividido cada 8–12 h (protocolo).', administration: 'IV.' },
      neonatal: { dose: 'Dosis según protocolo NNU y peso; monitorización renal estricta.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar solución diluida según prospecto (habitualmente 24 h).',
    adverseEffects: '## Efectos\n\n- Nefrotoxicidad, neurotoxicidad (parestesias), broncoespasmo (inhalada).',
  }),

  'pol-001': build({
    id: 'pol-001',
    name: 'Polimixina B',
    executiveSummary: 'Polimixina IV o tópica; reserva para Gram negativos MDR. Nefrotoxicidad significativa.',
    indications: '## Indicaciones\n\n- Infecciones sistémicas por Gram negativos multirresistentes.\n- Uso tópico en quemaduras (presentación específica).\n\n## Precauciones\n\n- Nefrotoxicidad y neurotoxicidad. Monitorizar función renal.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 500.000 UI o 1 millón UI.',
        dose: '1,5–2,5 mg/kg/día IV dividido cada 12 h (convertir UI a mg según prospecto).',
        infusionRate: 'Perfusión lenta.',
        administration: 'IV.',
      },
      pediatrico: { dose: '1,5–2,5 mg/kg/día dividido cada 12 h.', administration: 'IV.' },
      neonatal: { dose: 'Dosis según protocolo NNU; uso de reserva.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar tras dilución según prospecto.',
    adverseEffects: '## Efectos\n\n- Nefrotoxicidad, neurotoxicidad, reacciones infusion-related.',
  }),

  'fos-001': build({
    id: 'fos-001',
    name: 'Fosfomicina',
    executiveSummary: 'Antibiótico para ITU no complicada en dosis única oral; IV en infecciones graves en esquemas.',
    indications: '## Indicaciones\n\n- Cistitis aguda no complicada (dosis única VO).\n- ITU y prostatitis en esquemas IV según protocolo.\n\n## Precauciones\n\n- Ajustar en IRC. Diarrea frecuente VO.',
    dilution: {
      adulto: {
        presentation: 'Sobres 3 g VO; frasco IV 4 g.',
        dose: 'ITU: 3 g VO dosis única. IV: 4 g cada 6–8 h en infecciones graves (protocolo).',
        administration: 'VO en ayunas o IV.',
      },
      pediatrico: { dose: 'ITU: dosis única según peso (protocolo pediátrico).', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Sobres VO: usar inmediatamente tras disolver.',
    adverseEffects: '## Efectos\n\n- Diarrea, náuseas, cefalea.',
  }),

  'nit-001': build({
    id: 'nit-001',
    name: 'Nitrofurantoína',
    executiveSummary: 'Antibiótico exclusivamente urinario VO; profilaxis y cistitis.',
    indications: '## Indicaciones\n\n- Cistitis aguda no complicada.\n- Profilaxis de ITU recurrente.\n\n## Precauciones\n\n- Contraindicado si ClCr < 30 mL/min (falta de concentración urinaria). Evitar en último mes de embarazo.',
    dilution: {
      adulto: {
        presentation: 'Cápsulas 50 mg, 100 mg; suspensión.',
        dose: '100 mg VO cada 12 h x 5–7 días (cistitis). Profilaxis: 50–100 mg VO noche.',
        administration: 'VO con alimentos.',
      },
      pediatrico: { dose: '5–7 mg/kg/día dividido cada 6 h (máx. 400 mg/día).', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Conservar protegido de la luz.',
    adverseEffects: '## Efectos\n\n- Náuseas, neuropatía periférica (prolongado), neumonitis (raro).',
  }),

  'rif-001': build({
    id: 'rif-001',
    name: 'Rifampicina',
    executiveSummary: 'Rifamicina para tuberculosis, profilaxis de meningococo y biofilms en dispositivos (esquemas).',
    indications: '## Indicaciones\n\n- Tuberculosis en esquemas combinados.\n- Profilaxis de contactos de meningitis meningocócica.\n- Componente en infecciones protésicas en combinación.\n\n## Precauciones\n\n- Potente inductor enzimático (interacciones). Orina/sudor/saliva teñidos de naranja.',
    dilution: {
      adulto: {
        presentation: 'Cápsulas 300 mg, 600 mg; frasco IV.',
        dose: 'TB: 10 mg/kg/día VO (máx. 600 mg). Profilaxis meningococo: 600 mg VO cada 12 h x 2 días.',
        administration: 'VO en ayunas o IV según esquema.',
      },
      pediatrico: { dose: 'TB: 10–20 mg/kg/día VO (máx. 600 mg).', administration: 'VO/IV.' },
      neonatal: { dose: 'Esquemas TB neonatal según protocolo nacional/NNU.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Proteger de la luz. IV según prospecto.',
    adverseEffects: '## Efectos\n\n- Hepatotoxicidad, reacciones de hipersensibilidad, coloración naranja de fluidos.',
  }),

  'flu-001': build({
    id: 'flu-001',
    name: 'Fluconazol',
    executiveSummary:
      'Triazol antifúngico oral/IV de espectro amplio en levaduras; candidiasis y profilaxis en neutropenia.',
    indications:
      '## Indicaciones principales\n\n- Candidiasis mucocutánea y sistémica en pacientes sensibles.\n- Criptococosis (esquemas de inducción/mantenimiento en combinación).\n- Profilaxis de candidiasis en neutropenia y UCI.\n\n## Precauciones\n\n- Ajustar dosis en insuficiencia renal.\n- Prolongación QT. Interacciones por inhibición de CYP2C9/3A4.',
    dilution: {
      adulto: {
        presentation: 'Cápsulas 150 mg; suspensión VO; bolsa/frasco IV 200 mg/100 mL o 400 mg.',
        dose: 'Candidiasis: 400 mg día 1, luego 200 mg/día VO/IV. Profilaxis: 200–400 mg/día.',
        administration: 'VO o IV en perfusión 1–2 h.',
      },
      pediatrico: {
        dose: '6–12 mg/kg/día VO/IV (máx. 400 mg/día en candidiasis invasiva).',
        administration: 'VO/IV. Ajustar en IRC.',
      },
      neonatal: {
        dose: 'Profilaxis/treatment según protocolo NNU (ej. 6 mg/kg/dosis cada 72 h en prematuros).',
        administration: 'IV lenta.',
      },
    },
    stability: '## Estabilidad\n\n- IV diluida según prospecto; proteger de luz.',
    adverseEffects:
      '## Efectos\n\n- Náuseas, rash, elevación de transaminasas, prolongación QT.',
    bibliography: bib('sanford', 'idsa', 'anmat', 'sadi'),
  }),

  'amf-001': build({
    id: 'amf-001',
    name: 'Anfotericina B',
    executiveSummary:
      'Polieno de reserva para infecciones fúngicas graves; formulación convencional con mayor nefrotoxicidad.',
    indications:
      '## Indicaciones principales\n\n- Candidiasis invasiva, aspergilosis, criptococosis, mucormicosis en esquemas.\n- Enfermedad fúngica sistémica grave cuando triazoles/equinocandinas no son adecuados.\n\n## Precauciones\n\n- Nefrotoxicidad, hipokalemia, hipomagnesemia. Hidratar antes y durante. Premedicar según protocolo (antipirético, antiemético).',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla convencional (coloidal) 50 mg.',
        reconstitution: 'Reconstituir 50 mg con 10 mL agua para inyección (5 mg/mL).',
        diluent: 'Diluir en SG 5% (no NaCl 0,9% en formulación convencional).',
        finalConcentration: '0,1–0,2 mg/mL para perfusión.',
        dose: '0,7–1 mg/kg/día IV (dosis única diaria o dividida según protocolo).',
        infusionRate: 'Perfusión 2–6 h; no bolus.',
        administration: 'IV central preferida.',
        notes: 'Monitorizar K+, Mg2+, creatinina diaria.',
      },
      pediatrico: {
        dose: '0,7–1 mg/kg/día IV.',
        infusionRate: 'Perfusión prolongada 2–6 h.',
        administration: 'IV central.',
      },
      neonatal: {
        dose: '0,5–1 mg/kg/dosis cada 24–48 h según protocolo NNU.',
        administration: 'IV central con hidratación y control iónico.',
      },
    },
    stability: '## Estabilidad\n\n- Proteger de la luz. Usar dilución en 24 h según prospecto.',
    adverseEffects:
      '## Efectos\n\n- Fiebre, escalofríos, nefrotoxicidad, anemia, hipokalemia, flebitis.',
    bibliography: bib('sanford', 'idsa', 'anmat', 'sadi'),
  }),

  'amf-002': build({
    id: 'amf-002',
    name: 'Anfotericina B liposomal',
    executiveSummary:
      'Formulación liposomal con menor nefrotoxicidad; candidiasis/aspergilosis sistémica y criptococosis.',
    indications:
      '## Indicaciones principales\n\n- Candidiasis sistémica, aspergilosis invasiva, criptococosis meníngea en esquemas.\n- Alternativa a anfotericina B convencional cuando se busca menor nefrotoxicidad.\n\n## Precauciones\n\n- Aún con riesgo renal; monitorizar función renal e iones. Reacciones infusion-related.',
    dilution: {
      adulto: {
        presentation: 'Frasco liposomal 50 mg.',
        reconstitution: 'Reconstituir con agua para inyección según prospecto.',
        diluent: 'Diluir en SG 5% o NaCl 0,9% según indicación del fabricante liposomal.',
        dose: '3–5 mg/kg/día IV (criptococosis/aspergilosis: esquemas específicos).',
        infusionRate: 'Perfusión 2–3 h mínimo.',
        administration: 'IV central.',
      },
      pediatrico: {
        dose: '3–5 mg/kg/día IV.',
        infusionRate: 'Perfusión 2–3 h.',
        administration: 'IV central.',
      },
      neonatal: {
        dose: 'Dosis según protocolo NNU (habitualmente 3–5 mg/kg/día).',
        administration: 'IV central.',
      },
    },
    stability: '## Estabilidad\n\n- Usar dilución según prospecto liposomal; proteger de la luz.',
    adverseEffects: '## Efectos\n\n- Reacciones infusion-related, nefrotoxicidad (menor que convencional), hipokalemia.',
    bibliography: bib('sanford', 'idsa', 'anmat', 'sadi'),
  }),

  'vor-001': build({
    id: 'vor-001',
    name: 'Voriconazol',
    executiveSummary:
      'Triazol de primera línea en aspergilosis invasiva; VO/IV con monitorización de niveles y hepática.',
    indications:
      '## Indicaciones principales\n\n- Aspergilosis invasiva y pulmonar.\n- Infecciones fúngicas por hongos filamentosos sensibles.\n\n## Precauciones\n\n- Hepatotoxicidad, prolongación QT, fotosensibilidad. Monitorizar niveles séricos cuando esté disponible. Interacciones múltiples (CYP2C19).',
    dilution: {
      adulto: {
        presentation: 'Comprimidos 200 mg; frasco IV 200 mg.',
        dose: 'Carga 6 mg/kg IV cada 12 h x 2 dosis, luego 4 mg/kg cada 12 h; VO mantenimiento 200 mg cada 12 h.',
        infusionRate: 'IV en 1–2 h; no usar diluyente con cloruro (usar SG 5%).',
        administration: 'VO o IV.',
      },
      pediatrico: {
        dose: '9–10 mg/kg/dosis IV cada 12 h o VO según protocolo pediátrico.',
        administration: 'IV/VO con monitorización de niveles.',
      },
    },
    stability: '## Estabilidad\n\n- IV reconstituida: usar pronto; no refrigerar precipitado.',
    adverseEffects: '## Efectos\n\n- Alteraciones visuales transitorias, hepatotoxicidad, rash fotosensible, prolongación QT.',
    bibliography: bib('sanford', 'idsa', 'anmat', 'sadi'),
  }),

  'cas-001': build({
    id: 'cas-001',
    name: 'Caspofungina',
    executiveSummary:
      'Equinocandina IV para candidiasis invasiva y aspergilosis en esquemas de rescate.',
    indications:
      '## Indicaciones principales\n\n- Candidiasis invasiva.\n- Aspergilosis invasiva en pacientes refractarios o intolerantes a otros antifúngicos.\n- Profilaxis en trasplante de células madre (esquemas).\n\n## Precauciones\n\n- Ajustar dosis en insuficiencia hepática moderada-severa. Histamina mediada (rubor, rash).',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 50 mg o 70 mg.',
        reconstitution: 'Reconstituir 50 mg con 10,5 mL agua para inyección.',
        diluent: 'Diluir en NaCl 0,9% para perfusión.',
        dose: 'Carga 70 mg día 1, luego 50 mg IV cada 24 h.',
        infusionRate: 'Perfusión 1 h.',
        administration: 'IV.',
      },
      pediatrico: {
        dose: 'Carga 70 mg/m² día 1, luego 50 mg/m²/día IV.',
        administration: 'IV 1 h.',
      },
      neonatal: {
        dose: '25 mg/m²/día IV según protocolo NNU (uso especializado).',
        administration: 'IV.',
      },
    },
    stability: '## Estabilidad\n\n- Solución diluida: 24 h refrigerada / 48 h ambiente según prospecto.',
    adverseEffects: '## Efectos\n\n- Fiebre, flebitis, elevación de transaminasas, rash.',
    bibliography: bib('sanford', 'idsa', 'anmat', 'sadi'),
  }),

  'mic-001': build({
    id: 'mic-001',
    name: 'Micafungina',
    executiveSummary:
      'Equinocandina IV para candidiasis y profilaxis en trasplante; una dosis diaria.',
    indications:
      '## Indicaciones principales\n\n- Candidiasis esofágica y candidemia.\n- Profilaxis de candidiasis en trasplante y UCI de alto riesgo.\n\n## Precauciones\n\n- Ajustar en insuficiencia hepática severa. Hemólisis (raro).',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 50 mg o 100 mg.',
        reconstitution: 'Reconstituir con 5 mL de diluyente por frasco según prospecto.',
        diluent: 'NaCl 0,9% para perfusión final.',
        dose: 'Candidemia: 100 mg IV cada 24 h. Profilaxis: 50 mg IV cada 24 h.',
        infusionRate: 'Perfusión 1 h.',
        administration: 'IV.',
      },
      pediatrico: {
        dose: '2–3 mg/kg/día IV (máx. 100 mg/día).',
        administration: 'IV 1 h.',
      },
      neonatal: {
        dose: '2–4 mg/kg/día IV según protocolo NNU.',
        administration: 'IV.',
      },
    },
    stability: '## Estabilidad\n\n- Usar dilución en 24 h según prospecto.',
    adverseEffects: '## Efectos\n\n- Flebitis, elevación de fosfatasa alcalina, rash, náuseas.',
    bibliography: bib('sanford', 'idsa', 'anmat', 'sadi'),
  }),

  'ani-001': build({
    id: 'ani-001',
    name: 'Anidulafungina',
    executiveSummary:
      'Equinocandina IV sin ajuste renal; candidemia y candidiasis esofágica en adultos.',
    indications:
      '## Indicaciones principales\n\n- Candidemia y otras formas de candidiasis invasiva en adultos.\n- Candidiasis esofágica.\n\n## Precauciones\n\n- Hepatotoxicidad. Histamina mediada. Uso principalmente en adultos.',
    dilution: {
      adulto: {
        presentation: 'Frasco-ampolla 100 mg.',
        reconstitution: 'Reconstituir 100 mg con 30 mL agua para inyección; diluir en SG 5% o NaCl 0,9%.',
        dose: 'Carga 200 mg día 1, luego 100 mg IV cada 24 h.',
        infusionRate: 'Perfusión 1,5 h (no exceder 1,1 mg/min).',
        administration: 'IV.',
        notes: 'No requiere ajuste en insuficiencia renal.',
      },
      pediatrico: {
        dose: 'Uso limitado; esquemas bajo supervisión de infectología pediátrica.',
        administration: 'IV según protocolo.',
      },
    },
    stability: '## Estabilidad\n\n- Dilución estable 24 h refrigerada según prospecto.',
    adverseEffects: '## Efectos\n\n- Diarrea, hipokalemia, elevación de transaminasas, rash.',
    bibliography: bib('sanford', 'idsa', 'anmat', 'sadi'),
  }),
};

function parseMasterList() {
  const lines = fs.readFileSync(MASTER_LIST, 'utf8').trim().split('\n');
  const header = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const parts = line.split(',');
    return Object.fromEntries(header.map((key, i) => [key, parts[i]]));
  });
}

function updateMasterListStatus(id, status) {
  const content = fs.readFileSync(MASTER_LIST, 'utf8');
  const updated = content
    .split('\n')
    .map((line) => (line.startsWith(`${id},`) ? line.replace(/,[^,]+$/, `,${status}`) : line))
    .join('\n');
  fs.writeFileSync(MASTER_LIST, updated.endsWith('\n') ? updated : `${updated}\n`);
}

function main() {
  const rows = parseMasterList();
  const pending = rows.filter(
    (r) => ['1', '1b', '2', '3', '4'].includes(r.phase) && r.status !== 'publicado',
  );
  const existing = new Set(fs.readdirSync(DRUGS_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', '')));

  let created = 0;
  let skipped = 0;

  for (const row of pending) {
    const { id } = row;
    if (existing.has(id)) {
      skipped++;
      continue;
    }
    const drug = MONOGRAPHS[id] ?? PHASE2_MONOGRAPHS[id] ?? PHASE3_MONOGRAPHS[id] ?? PHASE4_MONOGRAPHS[id];
    if (!drug) {
      console.warn(`⚠ Sin plantilla para ${id} (${row.name})`);
      continue;
    }
    const outPath = path.join(DRUGS_DIR, `${id}.json`);
    fs.writeFileSync(outPath, `${JSON.stringify(drug, null, 2)}\n`);
    updateMasterListStatus(id, 'borrador');
    console.log(`+ ${id} ${row.name}`);
    created++;
  }

  console.log(`\n${created} monografías creadas, ${skipped} ya existían.`);
  if (created === 0) {
    process.exit(0);
  }
}

main();
