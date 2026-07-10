#!/usr/bin/env node
/** Lote 7/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  heartHtn: { citation: 'American Heart Association. Hypertension and heart failure guidelines.', url: 'https://www.heart.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'caf-001', name: 'Citrato de cafeína', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Estimulante respiratório central de primeira linha na apneia do prematuro.',
    indications: `## Indicações\n\n- Tratamento e profilaxia da apneia do prematuro.\n\n## Precauções\n\n- Taquicardia, irritabilidade. Monitorar níveis em uso prolongado.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Principalmente neonatal.', dose: 'Não há uso habitual em adultos.', administration: 'N/A.' },
      pediatrico: {
        presentation: 'Ampola 1 mL 25% (cafeína base; verificar equivalência com citrato conforme apresentação institucional).',
        administration: 'IM ou IV.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: '10 mg/mL.',
        infusionRate: '30 min com bomba de infusão.',
        dose: 'Apneia do prematuro: dose de ataque 10 a 20 mg/kg. Manutenção: 5 mg/kg/dia.',
        notes: 'Estimulante do SNC, diurético, estimulante respiratório. Pode causar insônia, excitação, taquicardia, hipo e hiperglicemia, distúrbios digestivos.',
      },
      neonatal: { dose: 'Ataque 10–20 mg/kg IV em 30 min; manutenção 5 mg/kg/dia.', administration: 'IV/VO.' },
    },
    stability: '## Guia pediátrica\n\n- 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Insônia, excitação, taquicardia, hipo e hiperglicemia, distúrbios digestivos.\n- Irritabilidade.',
    bibliography: [BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'cap-001', name: 'Captopril', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'IECA de ação curta; útil em crise hipertensiva sublingual e manejo de IC e HAS na emergência.',
    indications: `## Indicações\n\n- Hipertensão arterial e crise hipertensiva (sublingual conforme protocolo).\n- Insuficiência cardíaca.\n- Nefropatia diabética.\n\n## Precauções\n\n- Contraindicado na gestação e angioedema prévio.\n- Monitorar PA, função renal e potássio.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 25 e 50 mg.', dose: 'HAS crônica: 12,5–50 mg VO 2–3 vezes/dia. Crise: 25 mg sublingual, repetir conforme protocolo.', administration: 'VO ou sublingual (crise hipertensiva).' },
      pediatrico: { dose: '0,3–0,5 mg/kg/dose VO a cada 8–24 h (máx. conforme protocolo).', administration: 'VO.' },
      neonatal: { dose: '0,01–0,05 mg/kg/dose VO a cada 8–24 h conforme cardiologista.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Comprimidos conforme bula. Proteger da umidade.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, tosse, hipercalemia, rash, angioedema, alteração do paladar.',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'cef-003', name: 'Cefuroxima', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Cefalosporina de segunda geração IV/VO para infecções respiratórias e cirúrgicas.',
    indications: `## Indicações\n\n- Pneumonia comunitária, infecções cirúrgicas, ITU.\n- Meningite bacteriana, septicemia, gonorreia (esquemas pediátricos).\n\n## Precauções\n\n- Ajustar na DRC. A solução final é de cor amarelada.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 750 mg, 1,5 g IV; comprimidos 250–500 mg VO.', dose: 'IV: 750 mg–1,5 g a cada 8 h. VO: 250–500 mg a cada 12 h.', administration: 'IV ou VO.' },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 750 ou 1500 mg.',
        administration: 'IV ou IM.',
        diluent: 'Água para injeção, SF, SG 5%.',
        finalConcentration: '250 mg/mL.',
        infusionRate: 'De 3 a 5 min.',
        dose: '30 a 100 mg/kg/dia em 3 a 4 doses diárias. Meningite bacteriana: 200 a 240 mg/kg/dia.',
        notes: 'Antibiótico cefalosporínico bactericida para infecções respiratórias, ósseas, biliares, meningite, septicemia, gonorreia. Pode causar tromboflebite, diarreia, náuseas, prurido, rash cutâneo por hipersensibilidade. A solução final é de cor amarelada.',
      },
      neonatal: { dose: 'Dose conforme protocolo da UCIN.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- IV diluída: 24 h refrigerada.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente e 48 h refrigerado entre 4° C e 8° C.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite, tromboflebite, rash, prurido.',
    bibliography: [BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-005', name: 'Ceftriaxona', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Cefalosporina de terceira geração de meia-vida longa; meningite, pneumonia e gonorreia.',
    indications: `## Indicações\n\n- Pneumonia, meningite, bacteriemia, gonorreia não complicada (dose única conforme diretriz).\n- Infecções ósseas e articulares em esquemas.\n\n## Precauções\n\n- Não misturar com cálcio na mesma linha (lactentes). Colelitíase reversível com uso prolongado.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 1 g (Drawer, FABRA, Pharmavial, Acantex, Ceftriaz, Exemple, Norgreen, Bioteral).',
        reconstitution: '10 mL de água para injeção. Conc.: 100 mg/mL.',
        diluent: '1 g em 100 mL de SF ou SG 5%. Passar em 30–60 min.',
        finalConcentration: '10 mg/mL.',
        administration: 'IM: Sim. IV direta: Sim. Reconstituir 1 g em 9,6 mL de água para injeção e passar em 2–4 min (exceto marca Norgreen: NÃO). IV intermitente: Sim.',
        notes: 'Não injetar mais de 1 g via IM. Sem lidocaína esta via é dolorosa. É incompatível e não deve ser misturada com vancomicina, fluconazol e aminoglicosídeos.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 1000 mg.',
        administration: 'IV ou IM.',
        diluent: 'Água para injeção, SF, SG 5%.',
        finalConcentration: 'Entre 10 mg/mL e 40 mg/mL.',
        infusionRate: 'Não menor que 30 min.',
        dose: '50 a 75 mg/kg/dia (não exceder 2 g/dia). Dose máxima 4 g/dia em caso de meningite.',
        notes: 'Antibiótico cefalosporínico bactericida para infecções respiratórias, ósseas, biliares, meningite. A combinação com aminoglicosídeos ou diuréticos pode aumentar a nefrotoxicidade. Pode causar febre, cefaleia, tontura, diarreia, náuseas, vômitos, anemia.',
      },
      neonatal: { dose: '50 mg/kg/dose a cada 24 h (meningite: esquemas específicos da UCIN).', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 6 h em temperatura ambiente e 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente e 72 h refrigerado.\n\n## Guia pediátrica\n\n- 3 dias em temperatura ambiente e 10 dias refrigerado a 4° C.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite, litíase biliar sintomática (raro).',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-007', name: 'Ceftazidima', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Cefalosporina antipseudomonas de terceira geração; uso em neutropenia febril e *Pseudomonas*.',
    indications: `## Indicações\n\n- Infecções por *Pseudomonas* e Gram-negativos hospitalares.\n- Infecções respiratórias, ósseas, biliares, meningite, septicemia.\n\n## Precauções\n\n- Utilizar em associação para resistência. Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 1 g (Ceftazidima Northia).',
        reconstitution: '10 mL de água para injeção. Conc.: 100 mg/mL.',
        diluent: 'Reconstituir 1 g com 10 mL de água para injeção, diluir em 50–100 mL e administrar em 15–30 min.',
        administration: 'IV direta: Sim. Reconstituir 1 g em 10 mL de água para injeção e administrar em 3–5 min. IV intermitente: Sim.',
        notes: 'Irritante. Atenção na reconstituição porque se desprende CO₂ (eliminar as bolhas antes da administração). Existe risco de flebite ao usar a via IV direta. É possível a administração IM.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 1000 mg.',
        reconstitution: 'Água destilada para reconstituição.',
        administration: 'IV ou IM.',
        finalConcentration: '40 mg/mL (pode ser bolus 180 mg/mL).',
        infusionRate: '15 a 30 min com bomba de infusão.',
        dose: '100/150 mg/kg/dia em 3 doses. Máx. 6 g/dia.',
        notes: 'Antibiótico cefalosporínico bactericida para infecções respiratórias, ósseas, biliares, meningite, septicemia. Pode causar cefaleia, náuseas, diarreia, anafilaxia, flebite.',
      },
      neonatal: { dose: '50 mg/kg/dose a cada 12 h (UCIN).', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente e 24 h refrigerado.\n\n## Guia pediátrica\n\n- Estável 24 h em temperatura ambiente protegido da luz; 10 dias refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, náuseas, diarreia, anafilaxia, flebite.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-012', name: 'Ceftolozano-tazobactam', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Combinação ceftolozano-tazobactam (Zerbaxa) com atividade antipseudomonas reforçada.',
    indications: `## Indicações\n\n- Infecções complicadas intra-abdominais e pneumonia nosocomial conforme prescrição e antibiograma.\n\n## Precauções\n\n- Alergia a betalactâmicos. Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 1 g de ceftolozano + 0,5 g de tazobactam (Zerbaxa).',
        reconstitution: '10 mL de água para injeção ou SF. Conc.: 100 mg/mL de ceftolozano e 50 mg/mL de tazobactam.',
        diluent: '1,5 g em 100 mL de SF ou SG 5%.',
        finalConcentration: 'Conc.: 10 mg/mL de ceftolozano e 5 mg/mL de tazobactam.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e administrar em 60 min.',
      },
      pediatrico: { dose: 'Esquemas sob supervisão de infectologia pediátrica.', administration: 'IV intermitente conforme protocolo.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente ou 7 dias refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite, rash.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cla-001', name: 'Claritromicina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Macrolídeo oral/IV para atípicas e erradicação de *H. pylori* em esquemas.',
    indications: `## Indicações\n\n- Pneumonia atípica, sinusite, infecções de pele.\n- Componente de terapia tripla para *H. pylori*.\n\n## Precauções\n\n- Prolongamento do QT. Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 500 mg (Claritromicina Northia, Pharmavial, Richet, Kiaricid).',
        reconstitution: '10 mL de água para injeção. Conc.: 50 mg/mL.',
        diluent: '500 mg em 250 mL de SF ou SG 5%.',
        finalConcentration: '2 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Reconstituir 500 mg com 10 mL de água para injeção e diluir em 250 mL de SF, SG 5% e administrar em 60 min.',
        notes: 'Utilizar unicamente água para injeção para reconstituição, pois outros diluentes podem produzir precipitação. Não fazer com SF. Irritante (pode provocar flebite).',
      },
      pediatrico: { dose: '15 mg/kg/dia dividido a cada 12 h.', administration: 'VO.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente e 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente e 48 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, alteração do paladar, prolongamento do QT.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cli-001', name: 'Clindamicina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Lincosamida para anaeróbios e Gram-positivos; alternativa em alergia a betalactâmicos.',
    indications: `## Indicações\n\n- Infecções de pele, ósseas, pneumonia por aspiração (anaeróbios).\n- Toxoplasmose em esquemas.\n\n## Precauções\n\n- Alto risco de colite por *C. difficile*.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola contendo 600 mg em 4 mL de solução (Clindamicina Drawer, Fabra, Duncan, Clindanovag, Larjan, Ramallo, Northia, FADA, Clindalaf, Klonal).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 150 mg/mL.',
        diluent: '600 mg em 50–100 mL de SF ou SG 5%.',
        finalConcentration: '6–12 mg/mL (conc. máx. 18 mg/mL).',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 50 mL de SF ou SG 5% e administrar em 20 min.',
        notes: 'Ao refrigerar pode haver formação de cristais que se redissolvem em temperatura ambiente. A administração rápida pode gerar hipotensão (não se recomenda infundir mais de 1200 mg em 1 h).',
      },
      pediatrico: {
        presentation: 'Ampola 600 mg/4 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '12 mg/mL.',
        infusionRate: '30 mg/minuto.',
        dose: '20 a 40 mg/kg/dia em 3 a 4 doses diárias.',
        compatibility: 'Incompatível com ampicilina sódica, fenitoína sódica, barbituratos, aminofilina, gluconato de cálcio e sulfato de magnésio.',
        notes: 'Antibiótico para infecções de vias respiratórias, pele e tecidos moles, sepse, infecções intra-abdominais, doença pélvica inflamatória e do aparelho genital, profilaxia contra endocardite. Pode causar hipotensão, parada cardíaca, arritmias, tontura, cefaleia, diarreia, náuseas, vômitos, dor abdominal.',
      },
      neonatal: { dose: '5–7,5 mg/kg/dose a cada 6–8 h.', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente e/ou refrigerado.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, colite por *C. difficile*, rash.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'clo-001', name: 'Clonidina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Agonista alfa-2 adrenérgico central. Anti-hipertensivo, sedativo e analgésico; prevenção da síndrome de abstinência de opioides conforme protocolo.',
    indications: `## Indicações\n\n- Sedação em UTI pediátrica (perfusão contínua).\n- Hipertensão arterial (esquemas conforme prescrição).\n- Prevenção da síndrome de abstinência de opioides.\n\n## Precauções\n\n- Monitorar PA e FC. Risco de hipotensão e bradicardia.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 150 mcg/mL.',
        reconstitution: 'Uma vez reconstituída, 1 ampola até 24 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        finalConcentration: 'Conforme diluição para bomba de infusão (1 ampola até 24 mL).',
        infusionRate: 'Conforme indicação médica, com bomba de infusão.',
        dose: 'Inicial de 0,25 mcg/kg/h, e ir aumentando de 0,1 mcg até lograr a sedação adequada.',
        notes: 'Anti-hipertensivo, sedativo, analgésico, prevenção da síndrome de abstinência de opioides. Pode causar hipotensão, bradicardia, náuseas, vômitos.',
      },
    },
    stability: '## Guia pediátrica\n\n- 24 h. Uma vez reconstituída 1 ampola até 24 mL.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, bradicardia, sedação excessiva, náuseas, vômitos, boca seca.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'clp-001', name: 'Clorpromazina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Antipsicótico fenotiazínico de primeira geração. Uso como antiemético e sedativo conforme prescrição institucional.',
    indications: `## Indicações\n\n- Náuseas e vômitos refratários (antiemético).\n- Agitação psicomotora em esquemas controlados.\n\n## Precauções\n\n- Evitar contato com a pele (dermatite de contato). Risco de hipotensão ortostática.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 50 mg/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF.',
        finalConcentration: '1 mg/mL.',
        infusionRate: '0,5 mg/min.',
        dose: '0,5 a 1 mg/kg, em 3 ou 4 doses diárias. Máx. 75 mg/dia.',
        notes: 'Antipsicótico, antiemético. Pode causar hipotensão, taquicardia, arritmias, sedação, ansiedade, convulsões, constipação, anafilaxia. Evitar contato com a pele, pode causar dermatite.',
      },
    },
    stability: '## Guia pediátrica\n\n- 7 dias uma vez reconstituída.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, taquicardia, arritmias, sedação, ansiedade, convulsões, constipação, anafilaxia, dermatite por contato.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
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

console.log(`\nLote 7: ${drugs.length} monografias pt-BR`);
