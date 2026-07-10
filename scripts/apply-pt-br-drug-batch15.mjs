#!/usr/bin/env node
/** Lote 15/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
};

const drugs = [
  {
    id: 'fon-001', name: 'Fondaparinux', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Anticoagulante sintético anti-Xa; profilaxia ortopédica e TEP em alergia a heparina sem HIT.',
    indications: `## Indicações\n\n- Tromboprofilaxia em cirurgia ortopédica maior.\n- TEP/TVP em esquemas selecionados.\n\n## Precauções\n\n- Contraindicado em DRC grave (ClCr < 30). Sem antídoto específico.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Seringa pré-carregada 2,5–10 mg.', dose: 'Profilaxia: 2,5 mg SC a cada 24 h. TEP: 5–10 mg SC conforme peso.', administration: 'SC profunda.' },
      pediatrico: { dose: 'Uso limitado sob hematologia pediátrica.', administration: 'SC.' },
      neonatal: { dose: 'Não recomendado rotineiramente.', administration: 'SC.' },
    },
    stability: '## Estabilidade\n\n- Não refrigerar seringas pré-carregadas conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Sangramento, anemia, trombocitopenia (raro).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'fos-001', name: 'Fosfomicina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Antibiótico para ITU não complicada em dose única oral; IV em infecções graves em esquemas.',
    indications: `## Indicações\n\n- Cistite aguda não complicada (dose única VO).\n- ITU e prostatite em esquemas IV conforme protocolo.\n\n## Precauções\n\n- Ajustar na DRC. Diarreia frequente VO. Alto teor de sódio.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1 g (Fosfomicina Luar, Fosfomicyn).',
        reconstitution: '10 mL de água destilada. Conc: 100 mg/mL.',
        diluent: '1–4 g em 100–250 mL de SG 5%.',
        finalConcentration: '4–40 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir na proporção de 4 mL de água destilada ou SG 5% para cada mL de solução reconstituída e infundir na proporção de 1 g/h. Esclarecimento: 4 g (40 mL) em 160 mL de SG 5%. Infundir 40 mL/h.',
        notes: 'Ao dissolver a fosfomicina ocorre reação exotérmica, fazendo o frasco-ampola aquecer levemente sem alterar o antibiótico. Alto teor de sódio (cada grama de ATB contém 14,5 mEq).',
      },
      pediatrico: { dose: 'ITU: dose única conforme peso (protocolo pediátrico).', administration: 'VO.' },
    },
    stability: '## Reconstituído (no frasco-ampola)\n\n- Não especificado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, náuseas, cefaleia.',
    bibliography: [BIB.ucip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'fur-001', name: 'Furosemida', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Diurético de alça de ação rápida; edema agudo de pulmão, IC descompensada e hipercalemia em esquemas.',
    indications: `## Indicações\n\n- Edema agudo de pulmão, insuficiência cardíaca descompensada.\n- Hipervolemia na DRC e síndrome nefrótica.\n\n## Precauções\n\n- Hipocalemia, hipovolemia, ototoxicidade com bolus rápidos. Monitorar eletrólitos e diurese.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10 mg/mL.', dose: '20–40 mg IV lenta; 40–80 mg em EAP conforme protocolo.', administration: 'IV lenta ou IM.' },
      pediatrico: {
        presentation: 'Ampola 20 mg/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '10 mg/mL.',
        infusionRate: '4 mg/min.',
        dose: '1 a 2 mg/kg/dose de 2 a 4 doses diárias.',
        notes: 'Diurético de alça, anti-hipertensivo. Pode causar hipotensão, tontura, cefaleias, vômitos, diarreias. Ototóxico. Prescrito concomitantemente com outras drogas. Não proteger da luz (apenas o armazenamento).',
      },
      neonatal: { dose: '0,5–1 mg/kg/dose a cada 12–24 h (UCIN).', administration: 'IV lenta.' },
    },
    stability: '## Geral\n\n- Utilizar imediatamente; proteger da luz no armazenamento.\n\n## Guia pediátrica\n\n- 24 h após diluída.',
    adverseEffects: '## Efeitos adversos\n\n- Hipocalemia, hipotensão, desidratação, ototoxicidade.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'gen-001', name: 'Gentamicina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Aminoglicosídeo bactericida concentração-dependente; sinergia em endocardite e sepse Gram-negativa.',
    indications: `## Indicações\n\n- Infecções Gram-negativas graves em combinação.\n- Sinergia em enterococo/endocardite estafilocócica.\n\n## Precauções\n\n- Nefrotoxicidade e ototoxicidade. Ajustar por níveis e função renal.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola contendo 80 mg (Gentamicina Drawer).',
        reconstitution: 'Não requer reconstituição prévia. Conc: 40 mg/mL.',
        diluent: '80 mg em 100 mL de SF.',
        finalConcentration: '0,8 mg/mL.',
        administration: 'IV intermitente: Sim. Diluir em 100 mL de SF e administrar em 30 min.',
      },
      pediatrico: {
        presentation: 'Ampola 80 mg/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '11 mg/mL.',
        infusionRate: '30 a 60 min.',
        dose: '5 a 7,5 mg/kg/dia em 1, 2 ou 3 doses diárias. Para endocardite: 3 mg/kg/dia em 3 doses.',
        compatibility: 'Incompatível com cefalosporinas, penicilina e heparina.',
        notes: 'Antibiótico aminoglicosídeo para infecções respiratórias, urinárias, digestivas, ósseas, tecidos moles, endocardite e septicemia. Pode causar cefaleias, náuseas, vômitos. Nefrotóxico.',
      },
      neonatal: { dose: '4–5 mg/kg/dose a cada 24–36 h conforme idade pós-menstrual (UCIN).', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco-ampola)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente e 48 h refrigerada.\n\n## Guia pediátrica\n\n- Descartar após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Nefrotoxicidade, ototoxicidade, bloqueio neuromuscular (raro com anestésicos).',
    bibliography: [BIB.ucip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'glc-001', name: 'Glucagon', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Hormônio para hipoglicemia grave inconsciente quando não há acesso IV para dextrose.',
    indications: `## Indicações\n\n- Hipoglicemia grave com alteração do nível de consciência.\n- Intoxicação por betabloqueadores/bloqueadores de cálcio (infusão em protocolo).\n\n## Precauções\n\n- Efeito curto: administrar carboidratos ao recuperar consciência. Náuseas frequentes.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 1 mg.', dose: '1 mg IM/SC/IV lenta; repetir em 15 min se persistir.', administration: 'IM/SC/IV.' },
      pediatrico: { dose: '0,03 mg/kg IM/SC (máx. 1 mg).', administration: 'IM/SC.' },
      neonatal: { dose: '0,03–0,1 mg/kg IM/SC/IV conforme protocolo.', administration: 'IM/SC/IV.' },
    },
    stability: '## Estabilidade\n\n- Reconstituir no momento.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, vômitos, hiperglicemia rebote.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'glu-001', name: 'Dextrose (glicose)', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Carboidrato IV para hipoglicemia, manutenção hídrica e veículo de diluição.',
    indications: `## Indicações\n\n- Hipoglicemia sintomática.\n- Manutenção e reposição calórica IV.\n- Diluente de medicamentos compatíveis.\n\n## Precauções\n\n- Hiperglicemia, flebite com concentrações altas periféricas. Monitorar glicemia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Bolsas SG 5%, 10%, 50%.', dose: 'Hipoglicemia: 25 g (50 mL SG 50%) IV em bolus. Manutenção conforme plano hídrico.', administration: 'IV.' },
      pediatrico: { dose: '0,5–1 g/kg SG 10–25% IV em bolus na hipoglicemia.', administration: 'IV.' },
      neonatal: { dose: '2 mL/kg SG 10% IV em bolus; infusão de manutenção conforme UCIN.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Bolsas conforme bula; após pinçada utilizar no turno.',
    adverseEffects: '## Efeitos adversos\n\n- Hiperglicemia, flebite, sobrecarga hídrica.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'gnc-001', name: 'Ganciclovir', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Antiviral para citomegalovírus em transplantados e imunocomprometidos; mielotoxicidade.',
    indications: `## Indicações\n\n- Doença invasiva por CMV em transplantados.\n- Profilaxia de CMV em esquemas de alto risco.\n\n## Precauções\n\n- Neutropenia e trombocitopenia. Teratogênico. Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 500 mg (Ganciclovir Richet, Cymevene).',
        reconstitution: '10 mL de água destilada. Conc: 50 mg/mL.',
        diluent: '500 mg em 50–100 mL de SF ou SG 5%.',
        finalConcentration: '5–10 mg/mL.',
        administration: 'IV intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e administrar em não menos de 60 min.',
      },
      pediatrico: { dose: '5 mg/kg IV a cada 12 h conforme protocolo de transplante.', administration: 'IV.' },
      neonatal: { dose: '6 mg/kg/dose a cada 12 h em CMV congênito (protocolo especializado).', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco-ampola)\n\n- 12 h em temperatura ambiente. Não refrigerar.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente. Não refrigerar.',
    adverseEffects: '## Efeitos adversos\n\n- Neutropenia, trombocitopenia, nefrotoxicidade.',
    bibliography: [BIB.ucip, BIB.idsa, BIB.anmat, BIB.sccm],
  },
  {
    id: 'hal-001', name: 'Haloperidol', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Antipsicótico butirofenona para agitação, delirium e náuseas refratárias.',
    indications: `## Indicações\n\n- Agitação psicomotora e delirium em UTI.\n- Náuseas refratárias (esquemas paliativos).\n\n## Precauções\n\n- Prolongamento do QT, discinesia aguda, síndrome neuroléptica maligna. Evitar em Parkinson.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 5 mg/mL.', dose: '0,5–5 mg IV/IM a cada 30–60 min PRN agitação.', administration: 'IV lenta ou IM.' },
      pediatrico: { dose: '0,025–0,075 mg/kg/dose IV/IM (máx. conforme protocolo).', administration: 'IV/IM.' },
      neonatal: { dose: 'Não recomendado salvo indicação psiquiátrica especializada.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- IV utilizar sem diluição ou conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Sedação, extrapiramidalismo, QT prolongado.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hct-001', name: 'Hidroclorotiazida', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Tiazídico oral para hipertensão e edema leve; hipocalemia e hiperglicemia.',
    indications: `## Indicações\n\n- Hipertensão arterial, edema leve de IC.\n- Nefrolitíase por cálcio (esquemas).\n\n## Precauções\n\n- Hiponatremia, hipocalemia. Contraindicada em anúria e gota.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 12,5–25 mg.', dose: '12,5–50 mg VO a cada 24 h pela manhã.', administration: 'VO.' },
      pediatrico: { dose: '1–2 mg/kg/dia VO dividido (máx. 50 mg/dia).', administration: 'VO.' },
      neonatal: { dose: 'Uso limitado; 1–2 mg/kg/dia sob prescrição especializada.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Comprimidos conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Hipocalemia, hiperglicemia, hiperuricemia, fotossensibilidade.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hdc-001', name: 'Hidrocortisona', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Corticoide com atividade mineralocorticoide; choque séptico refratário e insuficiência adrenal.',
    indications: `## Indicações\n\n- Insuficiência adrenal aguda.\n- Choque séptico refratário (esquemas de dose de estresse).\n- Profilaxia de doença do enxerto contra hospedeiro.\n\n## Precauções\n\n- Hiperglicemia, retenção de sódio.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 100 mg.', dose: 'Insuficiência adrenal: 100 mg IV em bolus. Choque: 50 mg a cada 6 h ou infusão conforme protocolo.', administration: 'IV em bolus ou infusão.' },
      pediatrico: {
        presentation: 'Frasco-ampola 100 ou 500 mg, pó para diluir.',
        administration: 'IV ou IM.',
        diluent: 'Água destilada, SF, SG 5%.',
        finalConcentration: '50 mg/mL.',
        infusionRate: 'Bolus 3 a 5 min.',
        dose: 'Anti-inflamatório: 1 a 5 mg/kg/dia. Asma: ataque de 4 a 8 mg/kg. Manutenção 2 mg/kg/dose em 4 doses diárias.',
        notes: 'Corticoide de uso sistêmico. Pode causar hipertensão, euforia, distensão abdominal, cefaleias, convulsões, aumento de peso, aumento do apetite.',
      },
      neonatal: { dose: '2–5 mg/kg/dose em insuficiência adrenal neonatal.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Utilizar após reconstituição conforme bula.\n\n## Guia pediátrica\n\n- 24 h na geladeira.',
    adverseEffects: '## Efeitos adversos\n\n- Hiperglicemia, hipertensão, edema, infecções.',
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

console.log(`\nLote 15: ${drugs.length} monografias pt-BR`);
