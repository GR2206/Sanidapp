#!/usr/bin/env node
/** Lote 14/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  heartHtn: { citation: 'American Heart Association. Hypertension and heart failure guidelines.', url: 'https://www.heart.org/' },
  heartAf: { citation: 'American Heart Association. Atrial fibrillation guidelines.', url: 'https://www.heart.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'enp-001', name: 'Enalapril', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'IECA de ação prolongada para hipertensão arterial, insuficiência cardíaca e proteção renal na diabetes.',
    indications: `## Indicações\n\n- Hipertensão arterial essencial e secundária.\n- Insuficiência cardíaca com disfunção sistólica (início e manutenção).\n- Nefropatia diabética com proteinúria.\n\n## Precauções\n\n- Contraindicado na gestação e angioedema prévio com IECA.\n- Vigilar função renal e potássio; risco de hipotensão na primeira dose.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 5, 10 e 20 mg. Ampola 1,25 mg/mL (uso IV limitado).', dose: 'HAS: 5–20 mg/dia VO em 1–2 tomadas. IC: iniciar 2,5 mg VO 1–2 vezes/dia e titular.', administration: 'VO com ou sem alimentos.' },
      pediatrico: { dose: '0,08–0,6 mg/kg/dia VO em 1–2 doses (máx. conforme protocolo cardiológico).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Comprimidos: conservar conforme bula em temperatura ambiente.\n- Solução IV: utilizar imediatamente após preparação.',
    adverseEffects: '## Efeitos adversos\n\n- Tosse seca, hipotensão, hipercalemia, elevação de creatinina, angioedema (raro).',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'eri-001', name: 'Eritromicina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Macrolídeo histórico; profilaxia ocular neonatal e procinético em lactentes (protocolo).',
    indications: `## Indicações\n\n- Alternativa em alergia a penicilina.\n- Profilaxia oftálmica neonatal de gonococo/clamídia conforme norma local.\n\n## Precauções\n\n- Prolongamento do QT. Múltiplas interações.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos; frasco-ampola IV 1 g.', dose: '250–500 mg VO a cada 6 h ou 500 mg–1 g IV a cada 6 h.', administration: 'VO ou IV.' },
      pediatrico: { dose: '30–50 mg/kg/dia dividido a cada 6 h.', administration: 'VO/IV.' },
      neonatal: { dose: 'Profilaxia ocular: pomada 0,5% conforme protocolo. IV oral conforme indicação.', administration: 'Tópica ocular ou VO/IV.' },
    },
    stability: '## Estabilidade\n\n- IV instável; utilizar pronto.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, dor abdominal, prolongamento do QT.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'esm-001', name: 'Esmolol', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Betabloqueador ultracurto para taquicardia supraventricular e controle perioperatório de FC/PA.',
    indications: `## Indicações\n\n- Taquicardia supraventricular, controle da FC na isquemia aguda.\n- Hipertensão perioperatória.\n\n## Precauções\n\n- Contraindicado em bradicardia, bloqueio AV avançado, asma grave.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 2500 mg/10 mL.', dose: 'Ataque 0,5 mg/kg em 1 min, depois 50–300 mcg/kg/min.', administration: 'IV em bomba de infusão.' },
      pediatrico: { dose: '100–300 mcg/kg/min em infusão conforme protocolo cardiológico.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar dentro de 24 h após preparação.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, bradicardia, broncoespasmo, hipoglicemia mascarada.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'esp-001', name: 'Espironolactona', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Diurético poupador de potássio; IC, ascite e hiperaldosteronismo.',
    indications: `## Indicações\n\n- IC com fração de ejeção reduzida, ascite por cirrose.\n- Hiperaldosteronismo primário/secundário.\n\n## Precauções\n\n- Hipercalemia, especialmente com IECA/BRA. Ginecomastia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 25–100 mg.', dose: '25–50 mg VO a cada 24 h; ascite: 100–400 mg/dia em esquemas.', administration: 'VO.' },
      pediatrico: { dose: '1–3 mg/kg/dia VO dividido.', administration: 'VO.' },
      neonatal: { dose: '1–3 mg/kg/dia conforme protocolo diurético da UCIN.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- VO estável.',
    adverseEffects: '## Efeitos adversos\n\n- Hipercalemia, ginecomastia, tontura, rash.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'fen-001', name: 'Fenilefrina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Vasopressor alfa-adrenérgico puro; hipotensão intraoperatória e anafilaxia em esquemas.',
    indications: `## Indicações\n\n- Hipotensão durante anestesia.\n- Vasopressor na anafilaxia quando indicado no protocolo.\n\n## Precauções\n\n- Reflexo bradicardia. Cuidado em cardiopatia coronariana.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: 'Bolus 50–100 mcg IV ou perfusão 0,1–0,5 mcg/kg/min.',
        infusionRate: 'Bolus lento ou infusão contínua.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '1–5 mcg/kg/dose em bolus ou perfusão conforme protocolo.',
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
        dose: 'Bolus e perfusão conforme cartilha da UCIN; uso restrito.',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Estabilidade\n\n- Utilizar solução recém-preparada ou conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia reflexa, hipertensão, cefaleia, extravasamento.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'fer-001', name: 'Ferro sacarose IV', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Reposição de ferro IV para anemia ferropênica quando VO não tolera ou não é eficaz.',
    indications: `## Indicações\n\n- Anemia ferropênica na DRC, gestação, sangramento crônico quando VO falha.\n- Reposição rápida pré-cirúrgica em esquemas.\n\n## Precauções\n\n- Reações anafilactoides: administrar lentamente em ambiente com ressuscitação. Não misturar com outros medicamentos.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 100 mg ferro elementar.', dose: 'Dose total calculada pelo déficit; típico 200 mg IV em 15–30 min.', administration: 'IV lenta em diluição.' },
      pediatrico: { dose: '3–7 mg/kg ferro elementar IV conforme protocolo.', administration: 'IV lenta.' },
      neonatal: { dose: 'Uso limitado; esquemas hematologia neonatal.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar diluição preparada imediatamente.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, reações relacionadas à infusão, manchado cutâneo.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'flc-001', name: 'Flecainida', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Antiarrítmico classe IC para fibrilação atrial e taquicardias supraventriculares em coração estruturalmente saudável.',
    indications: `## Indicações\n\n- Fibrilação atrial paroxística (manutenção do ritmo sinusal).\n- Taquicardia supraventricular em pacientes sem cardiopatia estrutural significativa.\n\n## Precauções\n\n- Contraindicado em cardiopatia estrutural, IC e pós-IAM. Proarritmia.\n- Iniciar sob supervisão cardiológica com ECG basal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 100 mg.', dose: '100 mg VO a cada 12 h; titular até 150 mg a cada 12 h conforme resposta.', administration: 'VO.' },
      pediatrico: { dose: '1–3 mg/kg/dia VO dividido (uso muito especializado).', administration: 'VO sob supervisão cardiológica.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Proarritmia, tontura, visão turva, náuseas, bloqueio AV.',
    bibliography: [BIB.heartAf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'flm-001', name: 'Flumazenil', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Antagonista de benzodiazepínicos na sedação excessiva; risco de convulsões na epilepsia ou mistura com TCA.',
    indications: `## Indicações\n\n- Reversão de sedação por benzodiazepínicos em procedimentos ou VM.\n- Intoxicação por benzodiazepínicos com depressão respiratória.\n\n## Precauções\n\n- Contraindicado se mistura com antidepressivos tricíclicos ou em epilepsia tratada com BZD. Convulsões.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 0,1 mg/mL.', dose: '0,2 mg IV em 15 s; repetir 0,2 mg a cada 1 min até 1 mg (protocolo).', administration: 'IV lenta.' },
      pediatrico: {
        presentation: 'Ampola 0,5 mg/5 mL.',
        administration: 'IV.',
        diluent: 'Água destilada, SF, SG 5%, Ringer.',
        finalConcentration: '0,05 mg/mL.',
        infusionRate: 'Push de 15 a 30 seg.',
        dose: '0,01 mg/kg a cada 1 min. Até 5 doses.',
        notes: 'Antagonista das benzodiazepinas. Pode causar náuseas, vômitos, arritmias, taquicardia, bradicardia, convulsões.',
      },
      neonatal: { dose: 'Uso muito restrito; 0,01 mg/kg conforme protocolo da UCIN.', administration: 'IV lenta.' },
    },
    stability: '## Geral\n\n- Utilizar imediatamente após aberto.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente. Depois descartar.',
    adverseEffects: '## Efeitos adversos\n\n- Convulsões, agitação, náuseas, recorrência de sedação.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'fnt-001', name: 'Fentanila', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Opioide potente para analgesia e sedação em UTI e procedimentos; risco de rigidez torácica em bolus rápido.',
    indications: `## Indicações\n\n- Analgesia perioperatória e em ventilação mecânica.\n- Sedoanalgesia em UTI.\n\n## Precauções\n\n- Depressão respiratória. Bolus lentos. Rigidez torácica com bolus rápidos e doses altas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 50 mcg/mL.', dose: 'Bolus 25–100 mcg IV; infusão 0,5–2 mcg/kg/h.', administration: 'IV lenta ou infusão.' },
      pediatrico: {
        presentation: 'Ampola 150 mcg/5 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '50 mcg/mL.',
        infusionRate: 'Em push não menor que 30 seg.',
        dose: 'De 1 a 10 mcg/kg/h.',
        notes: 'Anestésico, analgésico, narcótico. Pode causar hipotensão, bradicardia, depressão do sensorium, dependência física e psicológica. A infusão a uma velocidade superior à recomendada pode ocasionar rigidez muscular ou tórax em madeira.',
      },
      neonatal: { dose: '0,5–2 mcg/kg em bolus; infusão conforme escala de dor da UCIN.', administration: 'IV em bomba de infusão.' },
    },
    stability: '## Geral\n\n- Diluição 24 h conforme bula.\n\n## Guia pediátrica\n\n- 24 h após diluído.',
    adverseEffects: '## Efeitos adversos\n\n- Depressão respiratória, rigidez muscular, bradicardia, náuseas.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'fny-001', name: 'Fenitoína', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Anticonvulsivante e antiarrítmico classe IB; carga lenta IV no estado de mal epiléptico com monitorização de PA.',
    indications: `## Indicações\n\n- Estado de mal epiléptico (após benzodiazepínicos).\n- Profilaxia e tratamento de convulsões em neurocirurgia/trauma.\n\n## Precauções\n\n- Hipotensão e arritmias com infusão rápida. Extravasamento: síndrome do guante calcificado. Monitorar níveis.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 50 mg/mL.', dose: 'Ataque 15–20 mg/kg IV (máx. 1500 mg) a ≤ 50 mg/min.', infusionRate: 'Não exceder 50 mg/min.', administration: 'IV em SF 0,9% (não SG 5%).' },
      pediatrico: {
        presentation: 'Ampola 100 mg/2 mL.',
        administration: 'IV.',
        diluent: 'SF ou Ringer. NÃO dextrose.',
        finalConcentration: '1 a 10 mg/mL.',
        infusionRate: '50 mg/min com bomba de infusão.',
        dose: 'Ataque: 15 a 20 mg/kg (máx. 1,5 g). Manutenção: 5 a 8 mg/kg/dia em duas doses diárias.',
        notes: 'Anticonvulsivante. Pode causar náuseas, vômitos, hipotensão, depressão do SNC. Não administrar na mesma linha/via concomitantemente com nenhum outro medicamento.',
      },
      neonatal: { dose: '15–20 mg/kg em ataque; manutenção conforme níveis da UCIN.', administration: 'IV muito lenta.' },
    },
    stability: '## Geral\n\n- Precipita com SG 5%; utilizar SF 0,9%.\n\n## Guia pediátrica\n\n- Administrar dentro das 4 h posteriores à diluição.',
    adverseEffects: '## Efeitos adversos\n\n- Nistagmo, ataxia, hipotensão, arritmias, toxicidade com níveis elevados.',
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

console.log(`\nLote 14: ${drugs.length} monografias pt-BR`);
