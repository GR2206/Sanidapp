#!/usr/bin/env node
/** Lote 11/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/farmacologia/drugs');

const ADJUST = '> Ajustar conforme protocolo institucional e prescrição médica.';

const BIB = {
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Diretrizes clínicas.', url: 'https://www.idsociety.org/' },
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  pedGuide: { citation: 'Guia institucional de diluição e administração pediátrica. Junho de 2026.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  heartArr: { citation: 'American Heart Association. Hypertension and arrhythmia guidelines.', url: 'https://www.heart.org/' },
  heartHf: { citation: 'American Heart Association. Heart failure and hypertension guidelines.', url: 'https://www.heart.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'ate-001', name: 'Atenolol', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Betabloqueador beta-1 cardioseletivo de ação prolongada para HAS, angina e arritmias.',
    indications: `## Indicações\n\n- Hipertensão arterial.\n- Angina pectoris.\n- Arritmias supraventriculares (controle de frequência).\n- Profilaxia pós-infarto.\n\n## Precauções\n\n- Contraindicado em bradicardia, bloqueio AV, asma grave e choque cardiogênico.\n- Ajustar dose na insuficiência renal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 50 e 100 mg. Ampola 5 mg/10 mL (uso IV limitado).', dose: 'HAS/angina: 50–100 mg/dia VO. Arritmias: conforme protocolo cardiológico.', administration: 'VO em dose única ou fracionada.' },
      pediatrico: { dose: '0,5–1 mg/kg/dia VO em 1–2 doses (máx. 2 mg/kg/dia).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Comprimidos conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, hipotensão, fadiga, broncoespasmo, impotência, depressão.',
    bibliography: [BIB.heartArr, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'atr-001', name: 'Atropina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Anticolinérgico para bradicardia sintomática e intoxicações colinérgicas.',
    indications: `## Indicações\n\n- Bradicardia sintomática em PCR e fora de PCR (ACLS/PALS).\n- Premedicação antes de intubação (menos frequente).\n- Intoxicação por organofosforados (esquemas).\n\n## Precauções\n\n- Doses < 0,5 mg em adultos podem causar bradicardia paradoxal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 1 mg/mL.', dose: 'Bradicardia: 1 mg IV a cada 3–5 min (máx. 3 mg).', administration: 'IV em bolus rápido.' },
      pediatrico: {
        presentation: 'Ampola 1 mg/mL.',
        administration: 'IV, SC, IM ou intratraqueal.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: '0,1 mg/mL.',
        infusionRate: 'PARADA CARDÍACA sem diluir (Push).',
        dose: '0,02 mg/kg/dose. Pode repetir a cada 5 min até máx. 1 mg.',
        notes: 'Antiarrítmico, tratamento de bradicardia, reduz secreções. Pode causar midríase, boca seca, arritmia, alucinações.',
      },
      neonatal: { dose: '0,02 mg/kg IV (protocolo NRP/PALS neonatal).', administration: 'IV/IO.' },
    },
    stability: '## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Midríase, boca seca, arritmia, alucinações.\n- Taquicardia, retenção urinária.',
    bibliography: [BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'atr-002', name: 'Atracúrio', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Bloqueador neuromuscular não despolarizante com degradação espontânea; liberação de histamina.',
    indications: `## Indicações\n\n- Bloqueio neuromuscular em cirurgia e VM.\n\n## Precauções\n\n- Histamina: hipotensão e broncoespasmo. Laudanosina (convulsões) com infusão prolongada (raro).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10 mg/mL.', dose: '0,4–0,5 mg/kg em bolus; 5–10 mcg/kg/min.', administration: 'IV.' },
      pediatrico: { dose: '0,3–0,5 mg/kg em bolus.', administration: 'IV.' },
      neonatal: { dose: '0,5 mg/kg em bolus conforme protocolo.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar em 24 h.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, broncoespasmo, eritema.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'azi-001', name: 'Azitromicina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Macrolídeo de meia-vida longa; atípicas, MAC e esquemas de Chagas (conforme protocolo).',
    indications: `## Indicações\n\n- Pneumonia atípica, faringite (alternativa em alergia a penicilina).\n- Infecções não tuberculosas por micobactérias em esquemas.\n\n## Precauções\n\n- Prolongamento do QT. Interações por CYP3A4.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 500 mg; suspensão; frasco-ampola IV 500 mg.', dose: '500 mg VO dia 1, depois 250 mg/dia por 4 dias; ou 500 mg IV a cada 24 h.', administration: 'VO ou IV.' },
      pediatrico: { dose: '10 mg/kg/dia VO dia 1, depois 5 mg/kg/dia por 4 dias.', administration: 'VO/IV.' },
      neonatal: { dose: 'Uso restrito conforme protocolo da UCIN (ex.: Chagas).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- IV reconstituída conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, náuseas, prolongamento do QT, hepatotoxicidade.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'azt-002', name: 'Aztreonam-avibactam', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Combinação de aztreonam com avibactam (Emblaveo) para infecções por enterobactérias produtoras de metalobetalactamases (MBL).',
    indications: `## Indicações principais\n\n- Infecções por enterobactérias MBL (incluindo NDM), conforme prescrição e antibiograma.\n\n## Precauções\n\n- Não misturar com outros medicamentos. Proteger da luz. Dois frascos separados para reconstituição.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1,5 g de aztreonam + 0,5 g de avibactam (em dois frascos separados) (Emblaveo).',
        reconstitution: 'Reconstituir cada frasco individualmente com 10 mL de água para injeção ou SF. Conc. final combinada: aztreonam 100 mg/mL + avibactam 33,3 mg/mL. Misturar ambos os frascos reconstituídos antes de diluir.',
        diluent: '1 dose em 100–250 mL de SF ou SG 5%.',
        finalConcentration: 'Conc. aztreonam: ≤ 27 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Infusão em 3 horas (infusão prolongada). Dose habitual: aztreonam 6 g + avibactam 2 g/dia em 3 doses.',
        notes: 'Indicado para infecções por enterobactérias MBL (incluindo NDM). Não misturar com outros medicamentos. Proteger da luz.',
      },
      pediatrico: { dose: 'Esquemas sob supervisão de infectologia pediátrica.', administration: 'IV intermitente conforme protocolo.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Utilizar imediatamente. Se não for possível, máx. 1 h em temperatura ambiente ou 24 h refrigerado (sem diluir).\n\n## Solução diluída (a administrar)\n\n- 12 h em temperatura ambiente ou 24 h refrigerado após diluição.',
    adverseEffects: '## Efeitos adversos\n\n- Rash, flebite, diarreia, reações relacionadas à infusão.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'bic-001', name: 'Bicarbonato de sódio', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Alcalinizante IV para acidose metabólica grave e algumas intoxicações (protocolo).',
    indications: `## Indicações\n\n- Acidose metabólica com pH < 7,1 em contextos específicos.\n- Intoxicação por tricíclicos (alcalinização urinária no protocolo).\n- Hipercalemia com alterações no ECG (esquemas).\n\n## Precauções\n\n- Hipocalemia, alcalose, hipernatremia. Extravasamento tissular. Não aquecer.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 1 mEq/mL (8,4%).', dose: '1–2 mEq/kg IV diluído em situações selecionadas (prescrição).', administration: 'IV lenta diluída.' },
      pediatrico: {
        presentation: 'Sachê 100 mL 1/6 mol.',
        administration: 'IV.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: 'Correção de EAB em HP.',
        infusionRate: 'Infusão contínua entre 4 e 8 horas com bomba de infusão.',
        dose: 'Começa com 1 mEq/kg, depois 0,5 a cada 10 min. Total 2 a 5 mEq/kg. Monitorização cardíaca contínua.',
        notes: 'Controle frequente de EAB e laboratório. Não aquecer. O extravasamento pode causar necrose tissular.',
      },
      neonatal: { dose: '1–2 mEq/kg em parada com acidose conforme NRP.', administration: 'IV lenta.' },
    },
    stability: '## Guia pediátrica\n\n- Manter em temperatura ambiente. Descartar o remanescente.\n\n## Geral\n\n- Não misturar com cálcio na mesma linha.',
    adverseEffects: '## Efeitos adversos\n\n- Alcalose, hipocalemia, hiperosmolaridade. Necrose tissular por extravasamento.',
    bibliography: [BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'bis-001', name: 'Bisoprolol', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Betabloqueador beta-1 cardioseletivo de ação prolongada para IC e HAS.',
    indications: `## Indicações\n\n- Insuficiência cardíaca crônica estável com disfunção sistólica.\n- Hipertensão arterial.\n- Angina pectoris.\n\n## Precauções\n\n- Titulação gradual. Não suspender bruscamente. Contraindicado em asma grave e bloqueio AV avançado.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 2,5, 5 e 10 mg.', dose: 'IC: iniciar 1,25 mg/dia VO e titular até 10 mg/dia. HAS: 5–10 mg/dia.', administration: 'VO em dose única matinal.' },
      pediatrico: { dose: '0,1–0,2 mg/kg/dia VO (uso especializado).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, hipotensão, fadiga, tontura, broncoespasmo.',
    bibliography: [BIB.heartHf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'bum-001', name: 'Bumetanida', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Diurético de alça mais potente que furosemida mg a mg; útil na resistência à furosemida.',
    indications: `## Indicações\n\n- Edema na ICC, cirrose, DRC quando se requer diurese potente.\n\n## Precauções\n\n- Hipocalemia e hipovolemia. Ajustar em hepatopatia grave.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 0,25 mg/mL.', dose: '0,5–1 mg IV/IM; repetir conforme resposta (1 mg ≈ 40 mg furosemida).', administration: 'IV/IM.' },
      pediatrico: { dose: '0,015–0,05 mg/kg/dose a cada 6–12 h.', administration: 'IV/IM.' },
      neonatal: { dose: '0,01–0,05 mg/kg/dose conforme protocolo.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar após extração sem diluição habitual.',
    adverseEffects: '## Efeitos adversos\n\n- Hipocalemia, hipotensão, câimbras musculares.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cac-001', name: 'Cloreto de cálcio', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Cálcio elementar IV mais concentrado que gluconato; parada cardíaca por hipocalcemia/hiperK/hiperMg.',
    indications: `## Indicações\n\n- Parada cardíaca por hipercalemia, hipocalcemia ou intoxicação por bloqueadores de cálcio.\n- Hipocalcemia grave sintomática.\n\n## Precauções\n\n- Maior risco de necrose por extravasamento que gluconato. Via central preferencial.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10% cloreto de cálcio (13,6 mEq Ca/10 mL).', dose: 'PCR: 1 g (10 mL) IV/IO. Hipocalcemia: 0,5–1 g IV lento.', administration: 'IV/IO lento.' },
      pediatrico: { dose: '20 mg/kg (0,2 mL/kg) IV/IO em PCR conforme PALS.', administration: 'IV/IO.' },
      neonatal: { dose: '20 mg/kg IV lento em PCR/hipocalcemia da UCIN.', administration: 'IV central.' },
    },
    stability: '## Estabilidade\n\n- Incompatível com bicarbonato em linha.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, necrose tissular, arritmias.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cag-001', name: 'Gluconato de cálcio', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Reposição de cálcio IV na hipocalcemia sintomática e hipercalemia com alterações no ECG.',
    indications: `## Indicações\n\n- Hipocalcemia sintomática (tetania, QT prolongado).\n- Hipercalemia com alterações no ECG (esquema de urgência).\n- Intoxicação por bloqueadores dos canais de cálcio.\n\n## Precauções\n\n- Extravasamento: necrose. Não misturar com bicarbonato na mesma linha.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10% (0,465 mEq Ca/mL).', dose: '1–2 ampolas (10–20 mL) IV lento; repetir conforme protocolo.', administration: 'IV lento 10–20 min.' },
      pediatrico: {
        presentation: 'Ampola 10 mL gluconato de cálcio 10%.',
        administration: 'IV.',
        diluent: 'SF, SG 5% e 10%.',
        finalConcentration: 'Até 50 mg/mL.',
        infusionRate: '1 a 2 mL/min.',
        dose: 'Ataque: 1 a 2 mL/kg/dose. Manutenção: 5 a 10 mL/kg/dia.',
        notes: 'Hipocalcemia grave. Hipermagnesemia sintomática por sobredose de sulfato de magnésio, câimbras e dor muscular por picada ou mordida de insetos (viúva negra, escorpião). Pode causar hipotensão, bradicardia, arritmia, cefaleia, náuseas, vômitos, constipação. ADMINISTRAR SOMENTE POR CATETER CENTRAL E MONITORAR. O extravasamento pode necrosar tecidos.',
      },
      neonatal: { dose: '1–2 mL/kg gluconato 10% IV lento sob monitorização.', administration: 'IV lento.' },
    },
    stability: '## Geral\n\n- Utilizar via dedicada se possível.\n\n## Guia pediátrica\n\n- Descartar após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, hipotensão, necrose por extravasamento.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
];

for (const drug of drugs) {
  const out = {
    id: drug.id,
    name: drug.name,
    branch: 'atencion-sanitaria',
    version: drug.version,
    updatedAt: drug.updatedAt,
    translationReviewed: true,
    executiveSummary: drug.executiveSummary,
    indications: drug.indications,
    dilution: drug.dilution,
    stability: drug.stability,
    adverseEffects: drug.adverseEffects,
    bibliography: drug.bibliography,
  };
  fs.writeFileSync(path.join(OUT, `${drug.id}.json`), `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log(`✓ ${drug.id}`);
}

console.log(`\nLote 11: ${drugs.length} monografias pt-BR`);
