#!/usr/bin/env node
/** Lote 2/19 — 10 monografías pt-BR desde español revisado */
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
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'vas-001', name: 'Vasopressina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Hormônio antidiurético em doses vasopressoras; coadjuvante no choque séptico refratário.',
    indications: `## Indicações\n\n- Choque vasodilatador refratário a catecolaminas.\n- Sangramento por varizes esofágicas (esquemas específicos).\n\n## Precauções\n\n- Isquemia periférica, digital e mesentérica. Não administrar bolus rápido, salvo protocolo.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '0,03–0,04 UI/min fixo ou 0,01–0,04 UI/min conforme protocolo séptico.',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '0,0002–0,002 UI/kg/min (protocolo pediátrico).',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: 'Dose por kg conforme protocolo da UCIN para choque refratário.',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Estabilidade\n\n- Diluição estável conforme bula; alternar sítio de infusão.',
    adverseEffects: '## Efeitos adversos\n\n- Isquemia periférica, bradicardia, hipo/hipernatremia conforme contexto.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pos-001', name: 'Posaconazol', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Triazol IV (Noxafil) para profilaxia e tratamento de aspergilose e micoses invasivas; requer filtro em linha.',
    indications: `## Indicações principais\n\n- Profilaxia de aspergilose invasiva em pacientes de alto risco.\n- Tratamento de aspergilose e outras micoses invasivas conforme prescrição.\n\n## Precauções\n\n- Filtro em linha de 0,22 µm obrigatório. Preferir via central. Múltiplas interações por inibição do CYP3A4.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Solução concentrada para infusão contendo 300 mg em 16,7 mL (18 mg/mL) (Noxafil IV).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 18 mg/mL.',
        diluent: '300 mg em 150–250 mL de SF, SG 5% ou Ringer lactato.',
        finalConcentration: '1–2 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 150–250 mL de SF, SG 5% ou Ringer lactato e administrar em 90 min mediante filtro em linha (0,22 µm). Usar via central preferencialmente.',
        notes: 'Requer filtro em linha de 0,22 µm. Preferir via central (irritante em via periférica). Dose de ataque: 300 mg a cada 12 h no dia 1; manutenção: 300 mg/dia. Indicado na profilaxia e tratamento de aspergilose e outras micoses invasivas. Múltiplas interações por inibição do CYP3A4.',
      },
      pediatrico: { dose: 'Esquemas sob supervisão de infectologia pediátrica.', administration: 'IV intermitente conforme protocolo.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 12 h em temperatura ambiente; 24 h refrigerada.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, diarreia, elevação de transaminases, prolongamento do QT.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'suf-001', name: 'Sufentanila', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Opioide de alta potência para anestesia balanceada e sedação em UTI.',
    indications: `## Indicações\n\n- Analgesia em anestesia de grande porte.\n- Sedoanalgesia em UTI em esquemas com midazolam/propofol.\n\n## Precauções\n\n- Alta potência: erros de dose críticos. Depressão respiratória.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 50 mcg/mL.', dose: 'Bolus 5–20 mcg; infusão 0,1–0,5 mcg/kg/h.', administration: 'IV em bomba de infusão.' },
      pediatrico: { dose: '0,5–1 mcg/kg em bolus; infusão conforme protocolo.', administration: 'IV.' },
      neonatal: { dose: 'Microdoses na UCIN conforme protocolo de analgesia.', administration: 'IV em bomba de infusão.' },
    },
    stability: '## Estabilidade\n\n- Preparar em bomba com duplo controle.',
    adverseEffects: '## Efeitos adversos\n\n- Apneia, rigidez torácica, bradicardia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'roc-001', name: 'Rocurônio', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Bloqueador neuromuscular não despolarizante de início rápido para intubação e bloqueio neuromuscular em UTI.',
    indications: `## Indicações\n\n- Intubação em sequência rápida (alternativa à succinilcolina).\n- Bloqueio neuromuscular em ventilação mecânica.\n\n## Precauções\n\n- Reversão com sugamadex disponível. Ajustar em hepatopatia grave.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 10 mg/mL.', dose: 'SRI: 0,6–1,2 mg/kg IV. Manutenção: 0,1–0,2 mg/kg/h.', administration: 'IV em bolus ou infusão.' },
      pediatrico: {
        presentation: 'Frasco-ampola 50 mg/5 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '0,5 a 1 mg/mL. Pode ser administrado sem diluição.',
        infusionRate: 'Push ou infusão com bomba de infusão.',
        dose: 'Para intubação: 0,45 a 0,6 mg/kg/dose. Infusão com bomba: 7 a 12 mcg/kg/min.',
        compatibility: 'Incompatível com tiopental, anfotericina, amoxicilina, dexametasona, diazepam, furosemida, insulina, metilprednisolona, vancomicina.',
        notes: 'Bloqueador neuromuscular; requer suporte ventilatório durante a administração; não altera o estado de consciência. Pode causar bloqueio neuromuscular prolongado e anafilaxia.',
      },
      neonatal: { dose: '0,45–1 mg/kg conforme protocolo da UCIN.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Frasco aberto conforme bula.\n\n## Guia pediátrica\n\n- 30 dias refrigerado após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, taquicardia, bloqueio prolongado.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vrp-001', name: 'Verapamil', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Bloqueador dos canais de cálcio para taquicardia supraventricular, FA e angina.',
    indications: `## Indicações\n\n- Taquicardia supraventricular paroxística (reversão ou controle da FC).\n- Fibrilação atrial/flutter.\n- Angina pectoris e HAS.\n\n## Precauções\n\n- Contraindicado com betabloqueadores IV, bloqueio AV avançado, IC descompensada e síndrome de Wolff-Parkinson-White com FA.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 80 e 120 mg. Ampola 5 mg/2 mL.', dose: 'TSV: 5–10 mg IV em 2 min. Manutenção VO: 120–480 mg/dia fracionado.', administration: 'IV lenta sob monitorização ou VO.' },
      pediatrico: { dose: '0,1–0,2 mg/kg IV (máx. 5 mg) em 2 min; repetir uma vez se necessário.', administration: 'IV lenta com monitor cardíaco.' },
      neonatal: { dose: '0,1–0,2 mg/kg IV conforme protocolo cardiológico neonatal.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- Ampolas: administrar IV sem diluição ou conforme protocolo.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, bradicardia, bloqueio AV, constipação, edema.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'rem-001', name: 'Remifentanila', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Opioide ultracurto metabolizado por esterases plasmáticas; infusão contínua sem acúmulo.',
    indications: `## Indicações\n\n- Analgesia intraoperatória.\n- Sedoanalgesia em UTI quando se requer offset rápido.\n\n## Precauções\n\n- Hipotensão e bradicardia. Dor rebote ao suspender se não houver analgesia alternativa.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 1–5 mg.', dose: '0,05–0,2 mcg/kg/min em infusão.', administration: 'IV contínua exclusivamente.' },
      pediatrico: { dose: '0,1–0,5 mcg/kg/min conforme protocolo.', administration: 'IV.' },
      neonatal: { dose: 'Uso na UCIN conforme protocolo anestésico/neonatal.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Reconstituir conforme bula; utilizar em 24 h.',
    adverseEffects: '## Efeitos adversos\n\n- Apneia, hipotensão, rigidez muscular, dor ao retirar.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'prt-001', name: 'Protamina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Antídoto da heparina; reversão pós-circulação extracorpórea e sobredose de heparina.',
    indications: `## Indicações\n\n- Reversão de heparina não fracionada após cirurgia cardíaca ou sangramento por heparina.\n\n## Precauções\n\n- Reações anafilactoides. Rebound de anticoagulação. Reversão parcial de heparina de baixo peso molecular.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10 mg/mL.', dose: '1 mg de protamina por 100 UI de heparina remanescentes; IV lento em 10 min (máx. 50 mg/dose).', administration: 'IV muito lenta.' },
      pediatrico: { dose: '1 mg por 100 UI de heparina; máx. 50 mg.', administration: 'IV lenta.' },
      neonatal: { dose: 'Mesma regra mg:UI conforme heparina administrada.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- Utilizar imediatamente após diluição.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, bradicardia, anafilaxia, edema pulmonar.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'rif-001', name: 'Rifampicina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Rifamicina para tuberculose, profilaxia de meningococo e biofilmes em dispositivos (esquemas específicos).',
    indications: `## Indicações\n\n- Tuberculose em esquemas combinados.\n- Profilaxia de contactantes de meningite meningocócica.\n- Componente em infecções protéticas em associação.\n\n## Precauções\n\n- Potente indutor enzimático (interações). Urina/suor/saliva tingidos de laranja.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 600 mg (Rifampicina Kilab, Richet).',
        reconstitution: '10 mL de água para injeção. Conc.: 60 mg/mL.',
        diluent: '600 mg em 500 mL de SG 5%.',
        finalConcentration: '1,2 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Agitar suavemente até dissolução completa. Diluir em 100–500 mL de SG 5% e administrar em até 3 h.',
        notes: 'Após 4 h da preparação da diluição, pode ocorrer precipitação do antibiótico. Utilizar preferencialmente SG 5%, pois em SF a estabilidade é reduzida.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola 600 mg.',
        administration: 'IV.',
        diluent: 'Preferencialmente SG 5%. Caso contrário, SF.',
        finalConcentration: '6 mg/mL.',
        infusionRate: '30 min a 3 h com bomba de infusão.',
        dose: '10 a 20 mg/kg. Máx. 600 mg/dia.',
        notes: 'Antibiótico tuberculostático. Pode causar náuseas, vômitos, tontura, febre, hepatite, coloração avermelhada no escarro, urina e lágrimas.',
      },
      neonatal: { dose: 'Esquemas de TB neonatal conforme protocolo nacional/UCIN.', administration: 'VO.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente.\n\n## Solução diluída (a administrar)\n\n- 4 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente reconstituído e 4 h diluído.',
    adverseEffects: '## Efeitos adversos\n\n- Hepatotoxicidade, reações de hipersensibilidade, coloração laranja dos fluidos.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'pnc-001', name: 'Pancurônio', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Bloqueador neuromuscular não despolarizante de longa duração com efeito vagolítico (taquicardia).',
    indications: `## Indicações\n\n- Bloqueio neuromuscular prolongado em cirurgia e VM.\n\n## Precauções\n\n- Taquicardia. Eliminação renal: prolongado na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 2 mg/mL.', dose: '0,08–0,12 mg/kg em bolus; repetir conforme TOF.', administration: 'IV.' },
      pediatrico: { dose: '0,1 mg/kg em bolus.', administration: 'IV.' },
      neonatal: { dose: '0,05–0,1 mg/kg conforme protocolo.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Pronto para uso.',
    adverseEffects: '## Efeitos adversos\n\n- Taquicardia, bloqueio prolongado na DRC.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pro-001', name: 'Propofol', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Anestésico/sedativo IV de início e offset rápidos; lipêmico, risco de síndrome de infusão.',
    indications: `## Indicações\n\n- Indução e manutenção anestésica.\n- Sedação em UTI (protocolo com lipídios e triglicerídeos).\n\n## Precauções\n\n- Síndrome de infusão do propofol (PRIS) com doses altas prolongadas. Contaminação: cadeia asséptica rigorosa.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Emulsão lipídica 10 mg/mL (frasco/ampola).',
        dose: 'Indução 1–2,5 mg/kg IV; sedação 25–75 mcg/kg/min.',
        administration: 'IV sem diluição ou em infusão conforme protocolo.',
        notes: 'Monitorar triglicerídeos e ácido lático em infusão > 48 h.',
      },
      pediatrico: {
        presentation: 'Ampola 200 mg/mL.',
        administration: 'IV.',
        finalConcentration: 'Administrar sem diluir.',
        infusionRate: 'Bolus de 20 a 30 segundos.',
        dose: '2,5 a 3,5 mg/kg.',
        notes: 'Anestésico geral. Deve ser manuseado com técnica asséptica. Utilizar cada frasco para um único paciente e agitar bem a injeção antes de administrar. Pode causar bradicardia significativa se usado com fentanil, hipotensão, febre, cefaleia, tontura. Urina verde, dor no sítio de injeção.',
      },
      neonatal: { dose: 'Uso restrito na UCIN; esquemas de sedação conforme protocolo.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Cadeia asséptica; utilizar em 6–12 h após abertura conforme norma do serviço.\n\n## Guia pediátrica\n\n- Não refrigerar. Descartar o remanescente após aberto. Diluição estável por 12 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, apneia, PRIS (acidose, rabdomiólise, insuficiência cardíaca).',
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

console.log(`\nLote 2: ${drugs.length} monografias pt-BR`);
