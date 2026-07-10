#!/usr/bin/env node
/** Lote 4/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/farmacologia/drugs');

const ADJUST = '> Ajustar conforme protocolo institucional e prescrição médica.';

const BIB = {
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sanfordPip: { citation: 'Sanford Guide to Antimicrobial Therapy — Piperacillin-tazobactam.', url: 'https://www.sanfordguide.com/' },
  sanfordVan: { citation: 'Sanford Guide to Antimicrobial Therapy — Vancomycin dosing and monitoring.', url: 'https://www.sanfordguide.com/' },
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  anmatPip: { citation: 'ANMAT. Informações de medicamentos — Piperacilina e tazobactam.', url: 'https://www.argentina.gob.ar/anmat' },
  anmatVan: { citation: 'ANMAT. Informações de medicamentos — Vancomicina.', url: 'https://www.argentina.gob.ar/anmat' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  sadiPip: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes de manejo antimicrobiano.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Diretrizes clínicas.', url: 'https://www.idsociety.org/' },
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  pedGuide: { citation: 'Guia institucional de diluição e administração pediátrica. Junho de 2026.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
  heartHf: { citation: 'American Heart Association. Heart failure guidelines.', url: 'https://www.heart.org/' },
  heartHtn: { citation: 'American Heart Association. Hypertension and heart failure guidelines.', url: 'https://www.heart.org/' },
  heartAf: { citation: 'American Heart Association. Atrial fibrillation guidelines.', url: 'https://www.heart.org/' },
  esc: { citation: 'European Society of Cardiology. Heart failure guidelines.', url: 'https://www.escardio.org/' },
  rybak: { citation: 'Rybak MJ, et al. Therapeutic monitoring of vancomycin: revised consensus guidelines. Am J Health Syst Pharm. 2020.', url: 'https://www.ashp.org/' },
};

const drugs = [
  {
    id: 'sav-001', name: 'Sacubitril/valsartana', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Inibidor de neprilisina/BRA (iARNI) para insuficiência cardíaca com fração de ejeção reduzida.',
    indications: `## Indicações\n\n- Insuficiência cardíaca crônica com FE reduzida (substituto de IECA/BRA em pacientes elegíveis).\n- Redução de hospitalizações e mortalidade cardiovascular na IC ambulatorial.\n\n## Precauções\n\n- Suspender IECA 36 h antes de iniciar. Contraindicado na gestação e angioedema prévio.\n- Vigilar hipotensão, hipercalemia e função renal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 24/26, 49/51 e 97/103 mg (sacubitril/valsartana).', dose: 'Iniciar 49/51 mg VO a cada 12 h; titular até 97/103 mg a cada 12 h conforme tolerância.', administration: 'VO a cada 12 h.' },
      pediatrico: { dose: 'Doses pediátricas conforme protocolo cardiológico especializado.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula na embalagem original.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, hipercalemia, angioedema, tosse (menor que IECA), tontura.',
    bibliography: [BIB.heartHf, BIB.anmat, BIB.sac, BIB.esc],
  },
  {
    id: 'ppf-001', name: 'Propafenona', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Antiarrítmico classe IC com atividade betabloqueadora para FA e TSV.',
    indications: `## Indicações\n\n- Fibrilação atrial paroxística (cardioversão farmacológica ou manutenção).\n- Taquicardia supraventricular.\n- Arritmias ventriculares em contextos selecionados.\n\n## Precauções\n\n- Contraindicado em IC, broncoespasmo, bloqueio AV e síndrome de Brugada.\n- Interações com digoxina e varfarina.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 150 e 300 mg. Ampola 35 mg/20 mL.', dose: 'FA: 450–600 mg/dia VO fracionado. IV: 2 mg/kg em 10 min (uso hospitalar).', administration: 'VO ou IV sob monitor cardíaco.' },
      pediatrico: { dose: '8–10 mg/kg/dia VO dividido (uso especializado).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- IV administrar conforme protocolo após diluição.',
    adverseEffects: '## Efeitos adversos\n\n- Tontura, sabor metálico, proarritmia, bradicardia, náuseas.',
    bibliography: [BIB.heartAf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'pip-001', name: 'Piperacilina+tazobactam', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Betalactâmico com inibidor de betalactamases para infecções polimicrobianas graves, incluindo *Pseudomonas* em esquemas combinados.',
    indications: `## Indicações principais\n\n- Infecções intra-abdominais complicadas, pele e partes moles, pneumonia nosocomial (em esquemas conforme cultura).\n- Sepse de foco abdominal ou urinário, neutropenia febril (terapia empírica combinada conforme protocolo).\n\n## Precauções\n\n- Ajustar dose na insuficiência renal.\n- História de alergia a penicilinas: avaliar risco antes de administrar.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 4 g de piperacilina (PIP) + 0,5 g de tazobactam (Bagótaz, Drawer, FADA, Pharmavial, Piperac Compuesto, Norgreen, Northia, Vredian, Petezam, Richet, Tazonam EDTA).',
        reconstitution: '20 mL de água para injeção. Conc. PIP: 200 mg/mL.',
        diluent: '4,5 g em 100 mL de SF ou SG 5%.',
        finalConcentration: 'Conc. PIP: 40 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Agitar suavemente até dissolução. Diluir em 50–150 mL de SF e administrar em 30 min.',
        notes: 'É possível a administração IV em infusão contínua. Nesse caso, diluem-se 13,5 g (3 frascos-ampola) em 250 mL de SF a passar em 24 h.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 4500 mg.',
        reconstitution: 'Reconstituir com 17 mL para volume final de 20 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%, água destilada para reconstituição.',
        finalConcentration: '20 mg/mL. Em restrição hídrica: 200 mg/mL.',
        infusionRate: '30 minutos com bomba de infusão.',
        dose: '240 mg/kg/dia em 3 doses. Máx. 18 g/dia. Para o cálculo da dose considerar apenas os 4000 mg de piperacilina, NÃO os 4500 mg somados com tazobactam.',
        notes: 'Antibiótico de amplo espectro para tratamento de sepse, intra-abdominal, pele e tecidos moles, trato respiratório inferior e urinário. Pode causar hiper e hipotensão, arritmia, parada cardíaca, cefaleia, convulsões, náuseas, vômitos, diarreia, flebite. ADMINISTRAR ISOLADAMENTE.',
      },
      neonatal: { dose: 'Dose e intervalo conforme idade pós-menstrual, peso e foco infeccioso (prescrição de infectologia/neonatologia).', administration: 'IV preferencialmente central.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente e 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente e 7 dias refrigerado.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente, 48 h refrigerado.',
    adverseEffects: '## Frequentes\n\n- Diarreia, náuseas, rash, flebite.\n\n## Graves\n\n- Reações de hipersensibilidade, colite por *C. difficile*.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanfordPip, BIB.anmatPip, BIB.sadiPip],
  },
  {
    id: 'ram-001', name: 'Ramipril', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'IECA lipofílico de ação prolongada para HAS, IC e prevenção cardiovascular.',
    indications: `## Indicações\n\n- Hipertensão arterial.\n- Insuficiência cardíaca com disfunção ventricular.\n- Prevenção cardiovascular em alto risco e pós-infarto.\n- Nefropatia diabética com microalbuminúria.\n\n## Precauções\n\n- Contraindicado na gestação. Precaução em estenose bilateral de artéria renal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 2,5, 5 e 10 mg.', dose: 'HAS: 2,5–10 mg/dia VO. IC: iniciar 1,25–2,5 mg/dia e titular.', administration: 'VO em 1–2 tomadas.' },
      pediatrico: { dose: '0,05–0,1 mg/kg/dia VO (uso especializado).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Tosse, hipotensão, hipercalemia, cefaleia, tontura.',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'pan-001', name: 'Pantoprazol', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'IBP IV/VO para profilaxia de úlcera de estresse e sangramento digestivo alto.',
    indications: `## Indicações\n\n- Profilaxia de úlcera de estresse em UTI.\n- Hemorragia digestiva alta em esquemas com IBP IV.\n\n## Precauções\n\n- Interações com clopidogrel (menor que omeprazol). Hipomagnesemia prolongada.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 40 mg IV; comprimidos VO.', dose: '40–80 mg IV a cada 24 h em infusão ou bolus.', administration: 'IV em 15 min ou VO.' },
      pediatrico: { dose: '0,5–1 mg/kg/dia IV/VO (máx. 40 mg).', administration: 'IV/VO.' },
      neonatal: { dose: '0,5–1 mg/kg/dia na UCIN para profilaxia.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Reconstituir e utilizar conforme bula IV.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, diarreia, trombocitopenia (raro).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'trm-001', name: 'Tramadol', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Analgésico opioide fraco de ação central; uso em dor moderada conforme prescrição institucional em pediatria.',
    indications: `## Indicações\n\n- Dor aguda moderada.\n\n## Precauções\n\n- Depressão respiratória, risco de convulsões e síndrome de abstinência. Interações com ISRS (serotoninérgico).\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 100 mg/2 mL.',
        administration: 'IV, SC ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '20 min com bomba de infusão.',
        dose: '1 a 2 mg/kg/dose em 3 doses diárias. Máx. 3 a 6 mg/kg/dia.',
        notes: 'Analgésico de ação central. Pode causar síncope, taquicardia, tontura, convulsões, cefaleia, alucinações, náuseas, vômitos, diarreia, depressão respiratória, síndrome de abstinência, anafilaxia.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Síncope, taquicardia, tontura, convulsões, náuseas, vômitos, depressão respiratória, anafilaxia.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'war-001', name: 'Varfarina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Anticoagulante oral antagonista da vitamina K; requer controle de INR e educação do paciente.',
    indications: `## Indicações\n\n- Fibrilação atrial, prótese valvar mecânica.\n- TEP/TVP crônico.\n\n## Precauções\n\n- Múltiplas interações e dieta. Contraindicado na gestação. Risco de sangramento.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 5 mg (e outras concentrações).', dose: 'Dose inicial 5 mg/dia VO; ajustar conforme INR objetivo.', administration: 'VO no mesmo horário diariamente.' },
      pediatrico: { dose: '0,1–0,2 mg/kg/dia VO; ajustar por INR.', administration: 'VO.' },
      neonatal: { dose: 'Uso muito restrito; esquemas cardiológicos neonatais.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Comprimidos na embalagem original.',
    adverseEffects: '## Efeitos adversos\n\n- Sangramento, necrose cutânea (raro no início), teratogenicidade.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'zid-001', name: 'Zidovudina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Antirretroviral nucleosídeo (AZT) para infecção por HIV e profilaxia perinatal conforme esquemas institucionais.',
    indications: `## Indicações principais\n\n- Tratamento de infecção por HIV em esquemas combinados.\n- Profilaxia perinatal e pós-exposição conforme protocolo.\n\n## Precauções\n\n- Mielotoxicidade (anemia, neutropenia). Ajustar na insuficiência renal/hepática.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 200 mg em 20 mL (Zidovudina Dosa).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 10 mg/mL.',
        diluent: '200 mg em 50–200 mL de SF ou SG 5%.',
        finalConcentration: '2–4 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 50–100 mL de SF ou SG 5% e administrar em 60 min.',
      },
      pediatrico: { dose: 'Esquemas conforme protocolo pediátrico de HIV.', administration: 'IV intermitente conforme indicação.' },
      neonatal: { dose: 'Profilaxia e tratamento conforme protocolo da UCIN/perinatal.', administration: 'IV lenta conforme esquema.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente; 48 h refrigerada.',
    adverseEffects: '## Efeitos adversos\n\n- Anemia, neutropenia, náuseas, cefaleia, mialgias.',
    bibliography: [BIB.sadiUcip, BIB.idsa, BIB.anmat, BIB.sadi],
  },
  {
    id: 'van-001', name: 'Vancomicina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Glicopeptídeo bactericida contra Gram-positivos, incluindo MRSA. Uso em infecções graves e profilaxia conforme protocolo; infusão lenta e vigilância de nefrotoxicidade e ototoxicidade.',
    indications: `## Indicações principais\n\n- Infecções graves por Gram-positivos, incluindo MRSA e enterococos.\n- Pneumonia associada à ventilação mecânica, bacteriemia, endocardite, osteomielite.\n- Colite por *Clostridioides difficile* grave: via oral conforme indicação médica.\n\n## Precauções\n\n- Infundir lentamente para reduzir síndrome do homem vermelho.\n- Ajustar dose na insuficiência renal; monitorar função renal e níveis séricos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1 g (Vancomicina Northia*, Drawer, Varedet*, Fabra*, Vancomax, Richet*, Icopiax, Rivervan).',
        reconstitution: '10 mL de água para injeção. Conc.: 100 mg/mL.',
        diluent: '500 mg em 100 mL de SF.',
        finalConcentration: '5 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir 500 mg em 100 mL de SF e administrar em não menos de 90 min. Oral: Sim*. Diluir em 30 mL de água e administrar por SNG.',
        notes: 'A administração IV rápida pode produzir reação anafilactoide com prurido e erupção cutânea e dor muscular. Essas reações podem ser evitadas com administração lenta do produto.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 500/1000 mg.',
        reconstitution: 'Água destilada para reconstituição.',
        administration: 'IV.',
        diluent: 'SF ou SG 5%.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '60 min com bomba de infusão.',
        dose: '10 mg/kg/dose em 4 doses diárias.',
        notes: 'Antibiótico para endocardite, meningite, osteomielite, infecções secundárias a cateteres centrais, derivações ventriculoperitoneais, fístulas de hemodiálise, enxertos vasculares, próteses valvulares cardíacas. Ototóxico, nefrotóxico. Pode causar hipotensão, síndrome do homem vermelho, flebite. A administração em bolus pode induzir parada cardíaca.',
      },
      neonatal: { dose: 'Dose e intervalo conforme idade pós-menstrual e função renal (protocolo da UCIN).', administration: 'Via central preferida; monitorar acesso e sinais de extravasamento.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- 96 h refrigerado.',
    adverseEffects: '## Frequentes\n\n- Nefrotoxicidade, flebite, síndrome do homem vermelho com infusão rápida.\n\n## Graves\n\n- Ototoxicidade, neutropenia, reações de hipersensibilidade.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.rybak, BIB.sanfordVan, BIB.anmatVan],
  },
  {
    id: 'pol-001', name: 'Polimixina B', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Polimixina IV ou tópica; reserva para Gram-negativos MDR. Nefrotoxicidade significativa.',
    indications: `## Indicações\n\n- Infecções sistêmicas por Gram-negativos multirresistentes.\n- Uso tópico em queimaduras (apresentação específica).\n\n## Precauções\n\n- Nefrotoxicidade e neurotoxicidade. Monitorar função renal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 500.000 UI ou 1 milhão UI.', dose: '1,5–2,5 mg/kg/dia IV dividido a cada 12 h (converter UI em mg conforme bula).', infusionRate: 'Perfusão lenta.', administration: 'IV.' },
      pediatrico: { dose: '1,5–2,5 mg/kg/dia dividido a cada 12 h.', administration: 'IV.' },
      neonatal: { dose: 'Dose conforme protocolo da UCIN; uso de reserva.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar após diluição conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Nefrotoxicidade, neurotoxicidade, reações relacionadas à infusão.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
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

console.log(`\nLote 4: ${drugs.length} monografias pt-BR`);
