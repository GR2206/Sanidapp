#!/usr/bin/env node
/** Lote 10/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/farmacologia/drugs');

const ADJUST = '> Ajustar conforme protocolo institucional e prescrição médica.';

const BIB = {
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sanfordMer: { citation: 'Sanford Guide to Antimicrobial Therapy — Meropenem.', url: 'https://www.sanfordguide.com/' },
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  anmatMer: { citation: 'ANMAT. Informações de medicamentos — Meropenem.', url: 'https://www.argentina.gob.ar/anmat' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  sadiMer: { citation: 'Sociedade Argentina de Infectologia (SADI). Uso racional de antimicrobianos.', url: 'https://www.sadi.org.ar/' },
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  pedGuide: { citation: 'Guia institucional de diluição e administração pediátrica. Junho de 2026.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  heartHtn: { citation: 'American Heart Association. Hypertension and heart failure guidelines.', url: 'https://www.heart.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'lin-001', name: 'Linezolida', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Oxazolidinona oral/IV para Gram-positivos resistentes, incluindo VRE e pneumonia nosocomial.',
    indications: `## Indicações\n\n- Pneumonia nosocomial por MRSA, infecções por VRE, infecções de pele complicadas.\n\n## Precauções\n\n- Mielotoxicidade com uso > 2 semanas. Interação com ISRS (síndrome serotoninérgica).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachê contendo 600 mg de linezolida em 300 mL (Zyvox, Litrocan, Richet).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 2 mg/mL.',
        diluent: '600 mg em 300 mL.',
        finalConcentration: '2 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Pronto para uso. Administrar em 30–120 min.',
        notes: 'Irritante. Pode provocar flebite e dor no sítio de injeção. Pode apresentar coloração levemente amarelada que pode intensificar com o tempo sem afetar sua potência.',
      },
      pediatrico: {
        presentation: 'Sachê 300 mL/600 mg.',
        administration: 'IV.',
        diluent: 'SF, SG 5%, Ringer.',
        finalConcentration: '2 mg/mL.',
        infusionRate: 'Entre 30 e 120 minutos com bomba de infusão.',
        dose: '10 mg/kg/dose em 3 doses diárias.',
        compatibility: 'Incompatível com anfotericina B, diazepam, fenitoína, TMS (trimetoprima/sulfametoxazol) e ceftriaxona.',
        notes: 'Antibiótico oxazolidinona para NAC, NIH, infecções de pele e tecidos moles. Pode causar cefaleia, hipertensão, náuseas, vômitos, diarreia, convulsões, anafilaxia, flebite.',
      },
      neonatal: { dose: '10 mg/kg/dose a cada 8–12 h (UCIN).', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- Não especificado.\n\n## Guia pediátrica\n\n- 4 h em temperatura ambiente após aberto. Manter na embalagem original.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, diarreia, trombocitopenia, neuropatia periférica (uso prolongado).',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'lor-001', name: 'Lorazepam', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Benzodiazepínico intermediário para sedação, ansiedade e estado de mal epiléptico.',
    indications: `## Indicações\n\n- Sedação, ansiedade aguda.\n- Estado de mal epiléptico (esquemas com benzodiazepínicos).\n\n## Precauções\n\n- Depressão respiratória. Acúmulo na DRC e em idosos.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 2–4 mg/mL.', dose: '1–4 mg IV lento PRN sedação; status: 0,1 mg/kg (protocolo).', administration: 'IV lenta.' },
      pediatrico: {
        presentation: 'Ampola 4 mg/1 mL.',
        reconstitution: '1 ampola + 3 mL de diluente.',
        administration: 'IV ou IM.',
        diluent: 'Água destilada, SF, SG 5%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolus de 2 a 5 minutos. Gotejo para analgosedação.',
        dose: 'Sedação: 0,05 mg/kg/dose, 3 a 6 doses diárias. Máx. 2 mg/dose. Estado de mal epiléptico: 0,1 mg/kg. Máx. 4 mg/dose.',
        notes: 'Ansiolítico, sedativo, relaxante muscular, hipnótico, anticonvulsivante, antiemético. Pode causar depressão respiratória, hipotensão, bradicardia, parada cardíaca, síndrome de abstinência. Nefrotóxico. Conservar refrigerado.',
      },
      neonatal: { dose: '0,05 mg/kg IV conforme protocolo de convulsões da UCIN.', administration: 'IV lenta.' },
    },
    stability: '## Geral\n\n- IV diluída conforme bula.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto. Conservar refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Sedação excessiva, depressão respiratória, hipotensão.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'los-001', name: 'Losartana', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Antagonista do receptor da angiotensina II (BRA) para HAS, IC e nefroproteção.',
    indications: `## Indicações\n\n- Hipertensão arterial.\n- Insuficiência cardíaca com fração de ejeção reduzida (alternativa a IECA).\n- Nefropatia diabética com hipertensão.\n\n## Precauções\n\n- Contraindicado na gestação.\n- Precaução em estenose bilateral de artéria renal e desidratação.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 50 e 100 mg.', dose: '50–100 mg/dia VO em 1–2 tomadas. Pode ser combinado com diurético.', administration: 'VO com ou sem alimentos.' },
      pediatrico: { dose: '0,7 mg/kg/dia VO (máx. 50 mg/dia) em 1–2 doses.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, hipercalemia, tontura, elevação de creatinina, angioedema (raro).',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'lvt-001', name: 'Levetiracetam', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Anticonvulsivante IV/VO de amplo espectro; útil em status e profilaxia sem interações CYP relevantes.',
    indications: `## Indicações\n\n- Estado de mal epiléptico (dose de ataque IV).\n- Monoterapia ou adjuvante na epilepsia focal e generalizada.\n\n## Precauções\n\n- Ajustar na insuficiência renal. Alterações comportamentais/psiquiátricas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 500 mg/5 mL IV; comprimidos VO.', dose: 'Ataque 60 mg/kg IV (máx. 4500 mg); manutenção 500–1500 mg a cada 12 h VO.', administration: 'IV em 15 min ou VO.' },
      pediatrico: {
        presentation: 'Frasco-ampola 500 mg/5 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%, Ringer.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '15 minutos com bomba de infusão.',
        dose: '10 a 20 mg/kg/dia em duas doses diárias. Máx. 3 g/dia (adulto).',
        notes: 'Anticonvulsivante. Pode causar sonolência, ansiedade, irritabilidade, cefaleia, vômitos, diarreia, tosse, faringite.',
      },
      neonatal: { dose: 'Ataque 40–60 mg/kg; manutenção conforme protocolo da UCIN.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Diluição IV 4 h em temperatura ambiente conforme bula.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto. Diluição estável 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Sonolência, irritabilidade, cefaleia, trombocitopenia (raro).',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'man-001', name: 'Manitol', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Diurético osmótico IV para hipertensão intracraniana e glaucoma agudo.',
    indications: `## Indicações\n\n- Hipertensão intracraniana aguda, herniação cerebral (ponte).\n- Profilaxia de insuficiência renal na rabdomiólise (protocolo).\n\n## Precauções\n\n- Sobrecarga volêmica, hiponatremia, insuficiência renal se osmolaridade plasmática muito elevada.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Sachê ou bolsa 500 mL a 15%.', dose: '0,25–1 g/kg IV em 15–30 min; repetir conforme osmolaridade.', infusionRate: 'IV em 15–30 min.', administration: 'IV com filtro.' },
      pediatrico: { dose: '0,25–1 g/kg IV em 15–30 min.', administration: 'IV.' },
      neonatal: { dose: '0,25–0,5 g/kg conforme protocolo neuro-UCIN.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- Cristaliza no frio; aquecer e agitar antes de usar.',
    adverseEffects: '## Efeitos adversos\n\n- Desidratação, hiponatremia, insuficiência cardíaca por sobrecarga.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mer-001', name: 'Meropenem', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Carbapenêmico de amplo espectro para infecções graves polimicrobianas e sepse. Administração IV em perfusão; ajustar dose na insuficiência renal.',
    indications: `## Indicações principais\n\n- Infecções graves intra-abdominais, nosocomiais, neutropenia febril (em esquemas combinados), meningite bacteriana (conforme prescrição).\n- Pneumonia hospitalar ou associada à ventilação mecânica, bacteriemia, infecções de pele e partes moles complicadas.\n\n## Precauções\n\n- Ajustar dose e intervalo na insuficiência renal (ClCr).\n- História de reações a betalactâmicos: avaliar risco de hipersensibilidade cruzada.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó contendo 1 g (Meropenem Drawer, Fabra, FADA, Klonal, Larjan, Richet, Anfietoc).',
        reconstitution: '10 mL de água para injeção. Conc.: 50 mg/mL.',
        diluent: '500 mg em 100 mL de SF ou SG 5%.',
        finalConcentration: '5 mg/mL.',
        administration: 'IV direta: Sim. Agitar até dissolver em 10 mL de água para injeção, administrar em 5 min. IV intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e passar em 30–60 min.',
        notes: 'Em caso de restrição hídrica, pode ser diluído em até 50 mL de SF ou SG 5%.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 500 mg.',
        reconstitution: 'Água destilada para reconstituição.',
        administration: 'IV.',
        diluent: 'SF, SG 5% e 10%, manitol.',
        finalConcentration: '50 mg/mL.',
        infusionRate: '15 a 30 minutos com bomba de infusão.',
        dose: '10 a 40 mg/kg/dose em 3 doses diárias. Máx. 2 g. Depende do tipo de infecção.',
        notes: 'Antibiótico. Pode causar bradicardia, hipotensão, cefaleia, náuseas, dor abdominal, diarreia, flebite. PODE SER ADMINISTRADO A PARTIR DOS 3 MESES DE IDADE. Administrar isoladamente.',
      },
      neonatal: {
        presentation: 'Frasco-ampola 500 mg (UTI Neonatal).',
        dose: 'Dose e intervalo conforme idade pós-menstrual e peso (ex.: 20 mg/kg/dose a cada 12–24 h em prematuros; ajuste médico).',
        administration: 'IV preferencialmente por via central.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente, 8 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- Em SF: 8 h em temperatura ambiente, 48 h refrigerada. Em SG 5%: 3 h em temperatura ambiente, 14 h refrigerada.\n\n## Guia pediátrica\n\n- 2 h em temperatura ambiente. 12 h refrigerado.',
    adverseEffects: '## Frequentes\n\n- Diarreia, náuseas, elevação transitória de transaminases.\n- Flebite em via periférica.\n- Rash cutâneo.\n\n## Graves\n\n- Reações de hipersensibilidade, convulsões.\n- Colite por *C. difficile*.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanfordMer, BIB.anmatMer, BIB.sadiMer],
  },
  {
    id: 'met-001', name: 'Metronidazol', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Nitroimidazol para anaeróbios e *Clostridioides difficile*; IV e VO.',
    indications: `## Indicações\n\n- Infecções intra-abdominais, ginecológicas e de pele por anaeróbios.\n- Colite por *C. difficile* (VO preferencial).\n- Profilaxia cirúrgica colorretal.\n\n## Precauções\n\n- Evitar álcool (reação tipo dissulfiram). Neurotoxicidade com uso prolongado.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachê contendo 500 mg em 100 mL (Metronidazol Norgreen, Rivero, Ugar).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 5 mg/mL.',
        finalConcentration: '5 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Administrar em 60 min.',
      },
      pediatrico: {
        presentation: 'Sachê 500 mg/100 mL.',
        administration: 'IV.',
        diluent: 'Já diluído. Compatível com SF.',
        finalConcentration: 'Não diluir.',
        infusionRate: '60 min.',
        dose: '30 mg/kg/dia em 4 doses diárias.',
        notes: 'Antibacteriano de uso sistêmico. Pode causar náuseas, vômitos, sabor metálico, diarreia, tontura.',
      },
      neonatal: { dose: '7,5 mg/kg/dose a cada 12 h (UCIN).', administration: 'IV/VO.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- Não especificado.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, sabor metálico, neuropatia periférica (prolongado).',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'mep-001', name: 'Metilprednisolona', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Corticoide IV para asma grave, reações alérgicas, edema medular e surtos de EM.',
    indications: `## Indicações\n\n- Asma grave, exacerbação de DPOC, anafilaxia (após adrenalina).\n- Edema medular por compressão tumoral.\n\n## Precauções\n\n- Hiperglicemia, psicose esteroide, imunossupressão.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 40–125 mg.', dose: 'Asma: 60–125 mg IV. Surto de EM: 1 g/dia por 3–5 dias (protocolo).', administration: 'IV lenta ou perfusão.' },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 500 mg.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '125 mg/mL.',
        infusionRate: '20 a 60 minutos com bomba de infusão.',
        dose: '0,5 a 1,7 mg/kg/dia. Terapia pulsada: 15 a 30 mg/kg/dose (uma vez ao dia por 3 dias).',
        notes: 'Corticoide de uso sistêmico, anti-inflamatório. Pode causar edema, hipertensão, convulsões, psicose, cefaleia, hipertensão intracraniana, náuseas, vômitos, reações anafilactoides.',
      },
      neonatal: { dose: 'Uso restrito; esquemas pulmonares/DAH conforme UCIN.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Reconstituir conforme bula.\n\n## Guia pediátrica\n\n- 48 h em temperatura ambiente após reconstituída.',
    adverseEffects: '## Efeitos adversos\n\n- Hiperglicemia, insônia, úlcera, infecção oportunista.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mil-001', name: 'Milrinona', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Inodilatador (inibidor de fosfodiesterase III) na insuficiência cardíaca aguda e falência biventricular.',
    indications: `## Indicações\n\n- Insuficiência cardíaca aguda com baixo débito e congestão.\n- Ponte para suporte mecânico ou recuperação.\n\n## Precauções\n\n- Hipotensão, arritmias. Ajustar na insuficiência renal.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: 'Ataque 50 mcg/kg em 10 min (opcional), depois 0,375–0,75 mcg/kg/min.',
        infusionRate: 'Bolus lento se usar ataque.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola 10 mg/10 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '≤ 0,5 mg/mL para infusão contínua.',
        infusionRate: 'Conforme indicação médica.',
        dose: 'Dose de ataque 50 mcg/kg em 15 min. Infusão contínua: 0,25 a 0,75 mcg/kg/min.',
        notes: 'Agente inotrópico positivo. Pode causar hipotensão, arritmia, choque anafilático, cefaleia. Monitorar. Prescrito concomitantemente com furosemida.',
      },
    },
    stability: '## Geral\n\n- Diluição 24 h refrigerada conforme bula.\n\n## Guia pediátrica\n\n- 24 h uma vez diluído.',
    adverseEffects: '## Efeitos adversos\n\n- Taquiarritmias, hipotensão, cefaleia, trombocitopenia.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mor-001', name: 'Morfina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Opioide de referência para dor moderada-grave e sedoanalgesia em UTI.',
    indications: `## Indicações\n\n- Dor aguda e crônica em hospitalização.\n- Dispneia refratária em cuidados paliativos (protocolo).\n\n## Precauções\n\n- Depressão respiratória, retenção urinária. Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10 mg/mL.', dose: '2–5 mg IV a cada 5–15 min PRN; PCA ou infusão conforme prescrição.', administration: 'IV lenta.' },
      pediatrico: {
        presentation: 'Ampola 10 mg/1 mL.',
        administration: 'IV, SC, IM.',
        diluent: 'SF, SG 5%, Ringer.',
        finalConcentration: '5 mg/mL.',
        infusionRate: 'Em bolus 5 min. 15 a 30 min com bomba de infusão.',
        dose: '0,1 a 0,2 mg/kg/dose a cada 2 a 4 h. Máx. 15 mg/dia.',
        notes: 'Analgésico narcótico e sedativo. Pode causar hipotensão, depressão do SNC e respiratória, toxicomania, dependência física, náuseas, vômitos.',
      },
      neonatal: { dose: '0,01–0,05 mg/kg/dose conforme escala de dor da UCIN.', administration: 'IV lenta.' },
    },
    stability: '## Geral\n\n- Utilizar diluição no turno.\n\n## Guia pediátrica\n\n- Não especificado na cartilha.',
    adverseEffects: '## Efeitos adversos\n\n- Depressão respiratória, prurido, náuseas, hipotensão.',
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

console.log(`\nLote 10: ${drugs.length} monografias pt-BR`);
