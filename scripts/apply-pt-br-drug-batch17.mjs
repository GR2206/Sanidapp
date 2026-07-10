#!/usr/bin/env node
/** Lote 17/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  pedGuide: { citation: 'Guia institucional de diluição e administração pediátrica. Junho de 2026.', url: 'https://www.sadi.org.ar/' },
  ucip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  heartHtn: { citation: 'American Heart Association. Hypertension guidelines.', url: 'https://www.heart.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sag: { citation: 'Sociedade Argentina de Ginecologia e Obstetrícia. Protocolos obstétricos.', url: 'https://www.sag.org.ar/' },
};

const drugs = [
  {
    id: 'mic-001', name: 'Micafungina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Equinocandina IV para candidíase e profilaxia em transplante; uma dose diária.',
    indications: `## Indicações principais\n\n- Candidíase esofágica e candidemia.\n- Profilaxia de candidíase em transplante e UTI de alto risco.\n\n## Precauções\n\n- Ajustar em insuficiência hepática grave. Hemólise (raro).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 50 mg ou 100 mg (Mycamine).',
        reconstitution: '5 mL de SF. Conc: 10 mg/mL (50 mg) ou 20 mg/mL (100 mg). Agitar suavemente; não agitar vigorosamente.',
        diluent: '50–100 mg em 100 mL de SF.',
        finalConcentration: '0,5–1 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 100 mL de SF e administrar em 60 min. Proteger da luz.',
        notes: 'Não agitar vigorosamente (gera espuma). Proteger da luz durante toda a preparação e infusão. Não usar SG 5% para reconstituição. Dose habitual candidíase invasora: 100 mg/dia; profilaxia em transplante: 50 mg/dia. Equinocandina sem ajuste de dose em IR ou IH leve-moderada.',
      },
      pediatrico: { dose: '2–3 mg/kg/dia IV (máx. 100 mg/dia).', administration: 'IV 1 h.' },
      neonatal: { dose: '2–4 mg/kg/dia IV conforme protocolo da UCIN.', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco-ampola)\n\n- 24 h em temperatura ambiente protegido da luz.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente protegido da luz.',
    adverseEffects: '## Efeitos adversos\n\n- Flebite, elevação de fosfatase alcalina, rash, náuseas.',
    bibliography: [BIB.ucip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'mid-001', name: 'Midazolam', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Benzodiazepínico IV para sedação, ansiolise e estado de mal epiléptico em esquemas combinados.',
    indications: `## Indicações\n\n- Sedação em ventilação mecânica e procedimentos.\n- Pré-medicação e estado de mal epiléptico (protocolo).\n\n## Precauções\n\n- Depressão respiratória, delirium. Acúmulo na DRC e em infusão prolongada.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 5 mg/mL.', dose: 'Bolus 1–2 mg IV; sedação contínua 0,02–0,1 mg/kg/h.', infusionRate: 'Perfusão titulada em bomba de infusão.', administration: 'IV lenta ou infusão contínua.' },
      pediatrico: {
        presentation: 'Ampola 15 mg/3 mL.',
        administration: 'IV, IM, intranasal.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '5 mg/mL (pode ser administrado puro).',
        infusionRate: 'Infusão contínua conforme indicação médica. Bolus IV de 2 a 5 min. IN, 15 seg.',
        dose: '0,05 a 0,1 mg/kg/dose. Máx. 7 mg/dose.',
        notes: 'Hipnótico, sedante. Anticonvulsivante benzodiazepínico. Pode causar hipotensão, depressão do SNC, convulsões, abstinência na suspensão brusca. Ter preparado equipamento de RCP. Monitorar. IM doloroso. IN ardor e irritação.',
      },
      neonatal: { dose: 'Sedação UCIN: 0,03–0,06 mg/kg/h (protocolo).', administration: 'IV em bomba de infusão.' },
    },
    stability: '## Geral\n\n- Diluição 24 h conforme bula.\n\n## Guia pediátrica\n\n- 24 h após diluído.',
    adverseEffects: '## Efeitos adversos\n\n- Depressão respiratória, hipotensão, tolerância, síndrome de abstinência.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'min-001', name: 'Minociclina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Tetraciclina oral com boa penetração tissular; acne e MRSA cutâneo.',
    indications: `## Indicações\n\n- Acne moderada-grave, MRSA cutâneo, infecções atípicas em adultos.\n\n## Precauções\n\n- Evitar na gestação e < 8 anos. Vertigem e pigmentação (raro).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Cápsulas 100 mg.', dose: '100 mg VO a cada 12 h.', administration: 'VO com abundante água.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula; proteger da luz.',
    adverseEffects: '## Efeitos adversos\n\n- Vertigem, náuseas, fotossensibilidade, manchado dental em pediatria.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'mop-001', name: 'Metoprolol', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Betabloqueador beta-1 para controle da FC em síndrome coronariana aguda e arritmias supraventriculares.',
    indications: `## Indicações\n\n- Taquicardia supraventricular, controle da FC em SCA sem contraindicações.\n- Hipertensão e arritmias em contextos selecionados.\n\n## Precauções\n\n- Não usar em bradicardia, bloqueio AV, choque cardiogênico descompensado.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 1 mg/mL.', dose: '5 mg IV a cada 5 min até 15 mg conforme tolerância.', administration: 'IV lenta.' },
      pediatrico: { dose: '0,1 mg/kg IV a cada 5 min (máx. conforme protocolo cardiológico).', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- Utilizar sem diluição ou conforme bula IV.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, hipotensão, broncoespasmo, fadiga.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mox-001', name: 'Moxifloxacino', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Fluoroquinolona com cobertura de pneumococo e anaeróbios; uso principalmente em adultos.',
    indications: `## Indicações\n\n- Pneumonia adquirida na comunidade, sinusite bacteriana, exacerbação de DPOC.\n\n## Precauções\n\n- Prolongamento do QT. Hepatotoxicidade (rara). Não antipseudomonas confiável.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 400 mg; IV 400 mg.', dose: '400 mg VO/IV a cada 24 h.', administration: 'VO ou IV.' },
    },
    stability: '## Estabilidade\n\n- IV: utilizar conforme bula de bolsa ou diluição.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, prolongamento do QT, hepatotoxicidade, tendinite.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'mtp-001', name: 'Metoclopramida', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Procinético e antiemético; enxaqueca e náuseas pós-operatórias. Risco de discinesia extrapiramidal.',
    indications: `## Indicações\n\n- Náuseas e vômitos pós-operatórios e por medicamentos.\n- Gastroparesia, refluxo (VO).\n\n## Precauções\n\n- Discinesia extrapiramidal especialmente em jovens. Contraindicado em obstrução GI.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10 mg/2 mL.', dose: '10 mg IV lenta a cada 6–8 h PRN.', administration: 'IV lenta.' },
      pediatrico: {
        presentation: 'Ampola 10 mg/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF.',
        finalConcentration: '0,2 a 5 mg/mL.',
        infusionRate: 'Não menor que 15 min.',
        dose: '0,4 a 0,8 mg/kg/dia em 4 doses diárias.',
        compatibility: 'Incompatível com cefalotina e bicarbonato de sódio.',
        notes: 'Antiemético, antinauseoso. Pode causar sonolência, inquietação, hipotensão, diarreia.',
      },
      neonatal: { dose: 'Uso restrito; 0,1 mg/kg conforme protocolo da UCIN.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Utilizar após extração.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberta.',
    adverseEffects: '## Efeitos adversos\n\n- Acatisia, distonia, sedação, prolongamento do QT.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nal-001', name: 'Naloxona', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Antagonista opioide para depressão respiratória por opioides; meia-vida mais curta que muitos opioides.',
    indications: `## Indicações\n\n- Depressão respiratória por opioides.\n- Intoxicação opioide aguda.\n\n## Precauções\n\n- Duração curta: pode requerer infusão ou repetir doses. Síndrome de abstinência aguda.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 0,4 mg/mL.', dose: '0,04–0,4 mg IV a cada 2–3 min até resposta (máx. conforme protocolo).', administration: 'IV/IM/intranasal conforme protocolo.' },
      pediatrico: {
        presentation: 'Ampola 0,4 mg/1 mL.',
        administration: 'IV, SC, IM, intratraqueal.',
        diluent: 'SF, SG 5%.',
        finalConcentration: 'Sem diluir.',
        infusionRate: 'Bolus, 30 seg.',
        dose: '0,1 mg/kg/dose. Máx. 2 mg.',
        notes: 'Antídoto para intoxicação com narcóticos opiáceos. Pode causar náuseas, vômitos, sudorese, excitação, hiper e hipotensão, parada cardíaca.',
      },
      neonatal: { dose: '0,1 mg/kg IV/IO se depressão por opioides maternos.', administration: 'IV lenta.' },
    },
    stability: '## Geral\n\n- Pronto para uso.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberta.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, vômitos, agitação, edema pulmonar (raro), recorrência de depressão.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ngl-001', name: 'Nitroglicerina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Vasodilatador nitrato para síndrome coronariana aguda, edema agudo de pulmão e controle de PA.',
    indications: `## Indicações\n\n- Síndrome coronariana aguda, angina instável.\n- Edema agudo de pulmão hipertensivo.\n- Controle da pressão arterial perioperatória.\n\n## Precauções\n\n- Hipotensão, uso com inibidores de PDE-5 (contraindicado). Tolerância com infusão prolongada.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: 'Início 5–10 mcg/min; incrementar a cada 3–5 min até efeito (máx. conforme protocolo).',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampola 25 mg/5 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '< 400 mcg/mL.',
        infusionRate: 'Somente por bomba de infusão.',
        dose: 'Iniciar com 0,25 a 0,5 mcg/kg/min e ir aumentando até o efeito. Usual: 1 a 3 mcg/kg/min. Máx. 5 mcg/kg/min.',
        compatibility: 'Não administrar concomitantemente com outra medicação. Pode antagonizar o efeito anticoagulante da heparina.',
        notes: 'Agente antianginoso, anti-hipertensivo, vasodilatador coronariano. Pode causar hipotensão, palpitações, bradicardia, náuseas, vômitos, diaforese.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '0,5–3 mcg/kg/min na UCIN; monitorar PA.',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Geral\n\n- Utilizar bolsa de vidro/polietileno conforme bula; proteger da luz.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberta.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, hipotensão, taquicardia reflexa, metahemoglobinemia (raro).',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nif-001', name: 'Nifedipino', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Bloqueador de canais de cálcio para HAS, angina e tocolise em esquemas obstétricos.',
    indications: `## Indicações\n\n- Hipertensão arterial e crise hipertensiva (formulação de liberação controlada conforme protocolo).\n- Angina de peito.\n- Tocolise em trabalho de parto pré-termo (uso obstétrico institucional).\n\n## Precauções\n\n- Evitar mastigar cápsulas de liberação prolongada. Risco de hipotensão brusca com formulações de liberação imediata sublingual.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos liberação prolongada 30 e 60 mg. Cápsulas 10 mg.', dose: 'HAS: 30–60 mg/dia VO LP. Tocolise/obstétrica: conforme protocolo de maternidade.', administration: 'VO. Não triturar nem mastigar formulações LP.' },
      pediatrico: { dose: '0,25–0,5 mg/kg/dose VO a cada 6–8 h (uso especializado).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, taquicardia reflexa, cefaleia, edema, rubor facial.',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sag, BIB.aap],
  },
  {
    id: 'nip-001', name: 'Nitroprussiato de sódio', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Vasodilatador de ação ultrarrápida; crise hipertensiva e balanço ventricular em UTI.',
    indications: `## Indicações\n\n- Emergência hipertensiva com dano de órgão-alvo.\n- Insuficiência cardíaca aguda com pós-carga elevada.\n\n## Precauções\n\n- Toxicidade por cianeto/tiocianato com infusão prolongada ou doses altas. Proteger da luz.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '0,3–10 mcg/kg/min titulado; tempo máximo de infusão conforme protocolo.',
        infusionRate: 'Infusão contínua protegida da luz.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola 50 mg.',
        administration: 'IV.',
        diluent: 'SOMENTE dextrose 5%.',
        finalConcentration: 'Usual 200 mcg/mL. Em restrição hídrica, 1000 mcg/mL.',
        infusionRate: 'Somente por bomba de infusão, conforme PA.',
        dose: 'Iniciar 0,3 a 0,5 mcg/kg/min e ir aumentando até o efeito desejado. Usual: 3 mcg/kg/min. Máx. 8 a 10 mcg/kg/min.',
        notes: 'Anti-hipertensivo. Pode causar hipotensão, palpitações, inquietação, desorientação, cefaleia, hipertensão intracraniana, náusea, vômito. Toxicidade por cianeto e tiocianato. Proteger SOMENTE O ENVASE COM A SOLUÇÃO da luz, NÃO A PERFUSÃO. Não administrar concomitantemente com outra medicação.',
      },
    },
    stability: '## Geral\n\n- Proteger estritamente da luz; descartar se solução azul/cinza.\n\n## Guia pediátrica\n\n- 24 h após reconstituído. 24 h após diluído.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão grave, intoxicação por cianeto, metahemoglobinemia.',
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

console.log(`\nLote 17: ${drugs.length} monografias pt-BR`);
