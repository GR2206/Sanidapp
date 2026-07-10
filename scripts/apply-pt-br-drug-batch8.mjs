#!/usr/bin/env node
/** Lote 8/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  pedGuide: { citation: 'Guia institucional de diluição e administração pediátrica. Junho de 2026.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  ahaArr: { citation: 'American Heart Association. ACLS / arrhythmia guidelines.', url: 'https://www.heart.org/' },
  heartHf: { citation: 'American Heart Association. Heart failure and hypertension guidelines.', url: 'https://www.heart.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'cvd-001', name: 'Carvedilol', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Betabloqueador não seletivo com ação alfa-1 para HAS, IC e pós-infarto.',
    indications: `## Indicações\n\n- Insuficiência cardíaca com disfunção sistólica.\n- Hipertensão arterial.\n- Pós-infarto do miocárdio com disfunção ventricular.\n\n## Precauções\n\n- Não suspender bruscamente. Contraindicado em asma brônquica descompensada e bloqueio AV avançado.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 6,25, 12,5 e 25 mg.', dose: 'IC: iniciar 3,125 mg VO 2 vezes/dia e titular. HAS: 12,5–25 mg VO 2 vezes/dia.', administration: 'VO com alimentos (melhor tolerância).' },
      pediatrico: { dose: '0,05–0,4 mg/kg/dose VO a cada 12 h (titulação cardiológica).', administration: 'VO com alimentos.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, hipotensão, tontura, fadiga, broncoespasmo, piora da IC no início.',
    bibliography: [BIB.heartHf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'dia-001', name: 'Diazepam', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Benzodiazepínico para sedação, convulsões e sintomas de abstinência alcoólica (protocolo).',
    indications: `## Indicações\n\n- Estado de mal epiléptico (retal/IV conforme protocolo).\n- Sedação procedural e abstinência alcoólica em esquemas.\n\n## Precauções\n\n- Depressão respiratória. Cautela na DRC. Via venosa: emulsão IV específica de diazepam.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 5–10 mg.', dose: '5–10 mg IV lento repetível conforme protocolo.', administration: 'IV muito lenta; IM/retal conforme apresentação.' },
      pediatrico: {
        presentation: 'Ampola 10 mg/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5% e SG 10%.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '1 a 2 mg/min.',
        dose: 'Convulsão: 0,1–0,3 mg/kg/dose (máx. 10 mg/dose). Sedação: 0,1–0,3 mg/kg/dose (máx. 0,6 mg/kg a cada 8 h).',
        notes: 'Ansiolítico, hipnosedante, relaxante muscular, anticonvulsivante. Pode causar bradicardia, tontura, ataxia, confusão, excitação, flebite, necrose tissular se houver extravasamento, dependência física e psicológica. Não administrar em push por risco de hipotensão, depressão respiratória, parada cardíaca.',
      },
      neonatal: { dose: '0,1–0,3 mg/kg conforme protocolo de convulsões.', administration: 'IV lenta.' },
    },
    stability: '## Geral\n\n- Precipita com alguns diluentes; seguir bula da formulação IV.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Apneia, hipotensão, sedação prolongada.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dic-001', name: 'Diclofenaco', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'AINE não narcótico com ação analgésica, antipirética e anti-inflamatória; uso IV conforme prescrição institucional.',
    indications: `## Indicações\n\n- Dor aguda moderada a grave.\n- Inflamação em contextos selecionados.\n\n## Precauções\n\n- Risco de efeitos gastrointestinais e renais. Uso restrito em pediatria conforme protocolo.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 75 mg/3 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'De 30 min a 2 h com bomba de infusão.',
        dose: '150 mg/dia.',
        notes: 'Analgésico, antipirético, anti-inflamatório não esteroide (AINE), não narcótico. Pode causar tontura, cefaleia, rash, dor abdominal, diarreia.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Tontura, cefaleia, rash, dor abdominal, diarreia, elevação de transaminases.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'dif-001', name: 'Difenidramina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Anti-histamínico H1 de primeira geração com efeito sedativo; uso em reações alérgicas e sintomas conforme protocolo.',
    indications: `## Indicações\n\n- Reações alérgicas leves a moderadas.\n- Sintomas urticariformes e prurido.\n- Sedação em esquemas controlados.\n\n## Precauções\n\n- Potencializa depressão do SNC com benzodiazepínicos ou barbitúricos. Sonolência.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 10 mg/1 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '15 min com bomba de infusão.',
        dose: '5 mg/kg/dia.',
        notes: 'Anti-histamínico, sedativo. Pode causar hipotensão, taquicardia, tontura, excitação, náuseas, vômitos. Os anti-histamínicos produzem sonolência e potencialização da depressão do SNC com uso simultâneo de benzodiazepínicos ou barbitúricos.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Sonolência, hipotensão, taquicardia, tontura, excitação paradoxal, náuseas, vômitos.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'dip-001', name: 'Dipirona', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Analgésico e antipirético (metamizol); uso IV/IM conforme prescrição institucional em pediatria.',
    indications: `## Indicações\n\n- Dor aguda.\n- Febre refratária a outros antipiréticos.\n\n## Precauções\n\n- Risco de agranulocitose (raro). Hipotensão com administração rápida IV. Anafilaxia por via IV.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 1 g/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5% e SG 10%.',
        finalConcentration: '100 mg/mL.',
        infusionRate: 'Bolus 1 min.',
        dose: '10 a 20 mg/kg em 4 doses diárias.',
        notes: 'Analgésico, antipirético, antiespasmódico. Pode causar náuseas, vômitos, arritmia, anafilaxia (via IV), hipotensão em push.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, vômitos, arritmia, anafilaxia, hipotensão, agranulocitose (raro).',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'dlt-001', name: 'Diltiazem', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Bloqueador dos canais de cálcio não dihidropiridínico para FA/flutter, angina e HAS.',
    indications: `## Indicações\n\n- Controle de frequência em fibrilação atrial/flutter.\n- Angina pectoris e angina vasoespástica.\n- Hipertensão arterial.\n\n## Precauções\n\n- Contraindicado em bloqueio AV de alto grau, IC descompensada e junto com betabloqueadores IV sem supervisão.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 60 e 120 mg. Ampola 25 mg/5 mL.', dose: 'FA aguda: 0,25 mg/kg IV (máx. 20 mg), repetir 0,35 mg/kg se necessário. VO: 120–360 mg/dia.', administration: 'IV lenta ou VO.' },
      pediatrico: { dose: '0,1–0,3 mg/kg/dose IV a cada 6–8 h (uso especializado).', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- Solução IV: estabilidade limitada; preparar e administrar conforme protocolo.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, bloqueio AV, hipotensão, edema, constipação.',
    bibliography: [BIB.ahaArr, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'dop-001', name: 'Dopamina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Catecolamina com efeito dependente da dose: inotrópico e vasopressor; uso conforme protocolo institucional.',
    indications: `## Indicações\n\n- Hipotensão com baixo débito cardíaco, bradicardia sintomática em contextos específicos.\n- Suporte hemodinâmico em situações selecionadas.\n\n## Precauções\n\n- Taquiarritmias, isquemia mesentérica em doses vasopressoras. Extravasamento.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '2–20 mcg/kg/min titulado conforme resposta hemodinâmica.',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampola 100 mg/2,5 mL.',
        administration: 'IV.',
        diluent: 'SF, Ringer ou SG 5%.',
        finalConcentration: '3,2 mg/mL (até 6 mg/mL em caso de restrição hídrica).',
        infusionRate: 'Conforme indicação médica, com bomba de infusão.',
        dose: '0,002 a 0,02 mg/kg/min em infusão contínua. Máx. 0,05 mg/kg/min.',
        notes: 'Inotrópico positivo, aumenta o fluxo sanguíneo renal, coronariano e cerebral. Aumenta a diurese de forma dependente da dose. Pode causar taquicardia, hipertensão, arritmia, náuseas, vômitos. NUNCA ADMINISTRAR EM BOLUS. MONITORAR. A EXTRAVASAMENTO PODE NECROSAR TECIDOS.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '2–10 mcg/kg/min na UCIN; monitorização estreita.',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Geral\n\n- Proteger da luz; estabilidade 24 h conforme diluição institucional.\n\n## Guia pediátrica\n\n- 24 h uma vez diluída.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, arritmias, dor torácica, vasoconstrição periférica.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dxt-001', name: 'Dexametasona', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Corticoide potente IV/VO para edema cerebral, crupe, COVID grave e profilaxia de náuseas.',
    indications: `## Indicações\n\n- Edema cerebral, crupe (nebulização/IM conforme protocolo).\n- Profilaxia de náuseas por quimioterapia e pós-operatória.\n- Maturação pulmonar fetal (esquema obstétrico).\n\n## Precauções\n\n- Hiperglicemia, imunossupressão. Desmame se uso prolongado.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 4–8 mg/mL; comprimidos.', dose: '4–10 mg IV/IM conforme indicação; crupe ped: 0,6 mg/kg dose única.', administration: 'IV/IM/VO/nebulização conforme protocolo.' },
      pediatrico: {
        presentation: 'Ampola 8 mg/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '4 mg/mL.',
        infusionRate: '15 min com bomba de infusão.',
        dose: '0,5 a 2 mg/kg/dia em 4 doses diárias. Anti-inflamatório: 0,08 a 0,3 mg/kg/dia 2 a 4 vezes ao dia.',
        notes: 'Anti-inflamatório esteroide. Pode causar edema, hipertensão, cefaleia, náuseas, vômitos.',
      },
      neonatal: { dose: 'Maturação pulmonar fetal: esquema obstétrico. Evitar uso prolongado em RN.', administration: 'IM materno / IV RN conforme protocolo.' },
    },
    stability: '## Geral\n\n- IV estável conforme diluição.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Hiperglicemia, insônia, supressão adrenal, infecções.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ert-001', name: 'Ertapenem', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Carbapenêmico de meia-vida longa; dose única diária. Sem cobertura antipseudomonas.',
    indications: `## Indicações\n\n- Infecções comunitárias complicadas, intra-abdominais, ITU complicada, pneumonia adquirida na comunidade grave.\n\n## Precauções\n\n- Não cobre *Pseudomonas* nem *Acinetobacter*. Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1 g (Invanz, Ertapenem Richet).',
        reconstitution: '10 mL de água para injeção ou SF. Conc.: 100 mg/mL.',
        diluent: '1 g em 50–100 mL de SF.',
        finalConcentration: '10–20 mg/mL.',
        administration: 'IM: Sim. Reconstituir com 3,2 mL de solvente indolor e aplicar IM profundo. IV intermitente: Sim. Reconstituir com 10 mL de água para injeção ou SF, diluir com 50–100 mL de SF e infundir em 30–60 min.',
        notes: 'Não devem passar mais de 6 h entre a reconstituição e o fim da administração. Não se recomenda a diluição em SG 5% por sua instabilidade.',
      },
      pediatrico: { dose: '15 mg/kg/dose a cada 12 h (máx. 1 g/dia).', administration: 'IV/IM.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 6 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite, rash, convulsões (raro).',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'est-001', name: 'Estreptomicina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Aminoglicosídeo de reserva; uso em tuberculose e micobactérias em esquemas combinados.',
    indications: `## Indicações\n\n- Tuberculose e outras micobactérias em esquemas combinados conforme prescrição.\n\n## Precauções\n\n- Nefrotoxicidade e ototoxicidade. Monitorar níveis e função renal.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1 g (Estreptomicina Richet).',
        reconstitution: '4,5 mL de água para injeção ou SF (100 mg/mL).',
        administration: 'IM: Sim. Reconstituir 1 g com 4,5 mL de água para injeção ou SF e aplicar IM profundo.',
      },
      pediatrico: { dose: 'Esquemas conforme protocolo de tuberculose pediátrica.', administration: 'IM.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- Não se aplica.',
    adverseEffects: '## Efeitos adversos\n\n- Nefrotoxicidade, ototoxicidade vestibular e coclear.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
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

console.log(`\nLote 8: ${drugs.length} monografias pt-BR`);
