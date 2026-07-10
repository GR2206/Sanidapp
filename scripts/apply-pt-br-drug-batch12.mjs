#!/usr/bin/env node
/** Lote 12/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
};

const drugs = [
  {
    id: 'car-001', name: 'Carbamazepina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Anticonvulsivante e estabilizador do humor; indutor enzimático com múltiplas interações.',
    indications: `## Indicações\n\n- Epilepsia focal, neuralgia do trigêmeo.\n- Transtorno bipolar (VO).\n\n## Precauções\n\n- Síndrome de hipersensibilidade (HLA-B*1502 em asiáticos). Agranulocitose. Interações CYP.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 200–400 mg; suspensão VO.', dose: 'Início 200 mg VO a cada 12 h; titular até 800–1200 mg/dia.', administration: 'VO com alimentos.' },
      pediatrico: { dose: '10–20 mg/kg/dia dividido a cada 8–12 h.', administration: 'VO.' },
      neonatal: { dose: 'Uso limitado; esquemas especializados VO.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Suspensão conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Tontura, diplopia, leucopenia, rash grave (SJS/TEN).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cef-001', name: 'Cefalexina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Cefalosporina de primeira geração oral para infecções de pele e vias urinárias leves a moderadas.',
    indications: `## Indicações\n\n- ITU não complicada, celulite leve, infecções de pele por estreptococo/estafilococo sensível.\n\n## Precauções\n\n- Alergia grave a betalactâmicos. Reação cruzada possível com penicilinas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Cápsulas 500 mg; suspensão.', dose: '250–500 mg VO a cada 6 h.', administration: 'VO.' },
      pediatrico: { dose: '25–50 mg/kg/dia VO a cada 6–8 h (máx. 4 g/dia).', administration: 'VO.' },
      neonatal: { dose: '25 mg/kg/dose VO a cada 12 h conforme protocolo.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Suspensão refrigerada conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, náuseas, rash. Anafilaxia (raro).',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cef-002', name: 'Cefazolina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Cefalosporina de primeira geração IV; profilaxia cirúrgica e MSSA.',
    indications: `## Indicações\n\n- Profilaxia cirúrgica de pele e partes moles.\n- Infecções por MSSA e estreptococo sensível.\n\n## Precauções\n\n- Ajustar na DRC. Alergia a betalactâmicos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1 g (Cefazolina Drawer, Fabra, Klonal, Northia, Richet, Pharmavial).',
        reconstitution: '10 mL de água para injeção ou SF. Conc.: 100 mg/mL.',
        diluent: '1 g em 100 mL de SF ou SG 5%.',
        finalConcentration: '10 mg/mL.',
        administration: 'IM: Sim. Reconstituir com 4 mL de água para injeção e aplicar IM profundo. IV direta: Sim. Reconstituir com 10 mL de água para injeção ou SF e administrar em 3–5 min. IV intermitente: Sim. Diluir em 50–100 mL de SF ou SG 5% e administrar em 30–60 min.',
        notes: 'Compatível com SF e SG 5%. Pode produzir flebite na via IV direta. É possível a administração IM. Primeira escolha para profilaxia cirúrgica.',
      },
      pediatrico: { dose: '25–100 mg/kg/dia a cada 6–8 h.', administration: 'IV.' },
      neonatal: { dose: '25 mg/kg/dose a cada 12 h (UCIN).', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente, 10 dias refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente, 10 dias refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Flebite, rash, diarreia. Anafilaxia.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-004', name: 'Cefoxitina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Cefamicina com cobertura de anaeróbios; profilaxia cirúrgica colorretal e ginecológica.',
    indications: `## Indicações\n\n- Infecções intra-abdominais polimicrobianas.\n- Profilaxia cirúrgica com risco anaeróbio.\n\n## Precauções\n\n- Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 1 g ou 2 g.', dose: '1–2 g IV a cada 6–8 h.', infusionRate: 'Perfusão 30 min.', administration: 'IV.' },
      pediatrico: { dose: '80–160 mg/kg/dia a cada 6–8 h.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar em 6–24 h conforme diluente.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite, colite por *C. difficile*.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cef-006', name: 'Cefotaxima', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Cefalosporina de terceira geração; alternativa na meningite neonatal e pediátrica.',
    indications: `## Indicações\n\n- Meningite bacteriana, sepse, infecções nosocomiais em esquemas.\n- Infecções respiratórias, ósseas e de tecidos moles.\n\n## Precauções\n\n- Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 1 g.', dose: '1–2 g IV a cada 6–8 h.', infusionRate: 'Perfusão 30 min.', administration: 'IV.' },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 1000 mg.',
        reconstitution: 'Reconstituir com água para injeção. Diluir em SF 0,9% ou SG 5%.',
        administration: 'IV ou IM.',
        finalConcentration: '20 a 60 mg/mL (pode ser bolus 100 mg/mL em 3 a 5 min).',
        infusionRate: '15 a 30 min com bomba de infusão.',
        dose: '100 a 200 mg/kg/dia, em 3 a 4 doses diárias. Máx. 12 g/dia.',
        notes: 'Antibiótico cefalosporínico bactericida para infecções respiratórias incluindo garganta e nariz, ossos e tecidos moles. Pode causar cefaleia, náuseas, diarreia, arritmia, flebite.',
      },
      neonatal: { dose: '50 mg/kg/dose a cada 12 h; meningite: a cada 8 h (UCIN).', administration: 'IV.' },
    },
    stability: '## Guia pediátrica\n\n- 24 h em temperatura ambiente e 10 dias refrigerado (2 a 8°C).',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, náuseas, diarreia, arritmia, flebite.',
    bibliography: [BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-008', name: 'Cefepima', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Cefalosporina de quarta geração com cobertura antipseudomonas ampliada.',
    indications: `## Indicações\n\n- Pneumonia nosocomial, neutropenia febril, infecções por Gram-negativos resistentes sensíveis.\n\n## Precauções\n\n- Neurotoxicidade na DRC. Ajustar dose.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 1 g ou 2 g.', dose: '1–2 g IV a cada 8–12 h.', infusionRate: 'Perfusão 30 min.', administration: 'IV.' },
      pediatrico: { dose: '50 mg/kg/dose a cada 8 h (máx. 2 g).', administration: 'IV.' },
      neonatal: { dose: '30 mg/kg/dose a cada 12 h (protocolo da UCIN).', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- 24 h refrigerada após diluição.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite, encefalopatia na DRC.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cef-009', name: 'Cefalotina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Cefalosporina de primeira geração IV; uso em infecções sensíveis conforme esquema institucional.',
    indications: `## Indicações\n\n- Infecções por microorganismos sensíveis conforme prescrição e cultura.\n\n## Precauções\n\n- Alergia a betalactâmicos. Ajustar na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 1 g (Arecemin, Cefalotina Larjan, Drawer, Dosagluc, Cefade, Richet).',
        reconstitution: '5 mL de água para injeção. Conc.: 200 mg/mL.',
        diluent: '1–2 g em 100 mL de SF ou SG 5%.',
        finalConcentration: '10–20 mg/mL.',
        administration: 'IV direta: Sim. Reconstituir com 10 mL de água para injeção, SF ou SG 5% e administrar em 3–5 min. IV intermitente: Sim. Diluir 1 g em 100 mL de SF ou SG 5% e administrar em 30–60 min.',
        notes: 'Se o conteúdo do frasco não se dissolver por completo, adicionar água para injeção (0,2–0,5 mL) e agitar vigorosamente. O escurecimento da solução em temperatura ambiente não afeta a eficácia. É possível a administração IM.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 1000 mg.',
        administration: 'IM ou IV.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: '100 mg/mL.',
        infusionRate: '3 a 5 min.',
        dose: '100 mg/kg em 3 ou 4 doses diárias. Adulto 500 a 2000 mg a cada 6 h. Máx. 12 g/dia.',
        notes: 'Antibiótico cefalosporínico bactericida. Pode causar diarreia, flebite. A injeção IM pode ser dolorosa. Pode ser prescrito frio; se for o caso, friccionar até atingir temperatura ambiente.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 12 h em temperatura ambiente, 96 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- 96 h refrigerado; 12 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite. Dor na injeção IM.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-010', name: 'Ceftarolina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Cefalosporina de quinta geração (Zinforo) com atividade frente a MRSA e Gram-negativos sensíveis.',
    indications: `## Indicações\n\n- Infecções de pele e partes moles complicadas e pneumonia adquirida na comunidade conforme prescrição.\n\n## Precauções\n\n- Diluir e utilizar imediatamente após reconstituição.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 600 mg (Zinforo).',
        reconstitution: '20 mL de água para injeção. Conc.: 30 mg/mL.',
        diluent: '600 mg em 250 mL de SF ou SG 5%.',
        finalConcentration: '2,4 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Reconstituir 600 mg com 250 mL de água para injeção, SF ou SG 5% e administrar em 60 min.',
      },
      pediatrico: { dose: 'Esquemas sob supervisão de infectologia pediátrica.', administration: 'IV intermitente conforme protocolo.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Diluir e utilizar imediatamente.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente e 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite, rash.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-011', name: 'Ceftazidima-avibactam', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Combinação ceftazidima-avibactam (Zavicefta) para infecções por Gram-negativos resistentes.',
    indications: `## Indicações\n\n- Infecções complicadas intra-abdominais, urinárias e pneumonia nosocomial conforme prescrição e antibiograma.\n\n## Precauções\n\n- Diluir e utilizar imediatamente. Não demorar mais de 30 min entre reconstituição e fim da preparação IV.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 2 g de ceftazidima + 0,5 g de avibactam (Zavicefta).',
        reconstitution: '10 mL de água para injeção. Conc.: 200 mg/mL de ceftazidima e 50 mg/mL de avibactam.',
        diluent: '2,5 g em 100 mL de SF ou SG 5%.',
        finalConcentration: 'Conc. ceftazidima: 20 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e administrar em 120 min.',
        notes: 'Uma vez preparada a infusão, não demorar mais de meia hora para iniciá-la (o tempo entre a reconstituição e o final da preparação intravenosa não deve exceder 30 minutos).',
      },
      pediatrico: { dose: 'Esquemas sob supervisão de infectologia pediátrica.', administration: 'IV intermitente conforme protocolo.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Diluir e utilizar imediatamente.\n\n## Solução diluída (a administrar)\n\n- 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, flebite, rash.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cip-001', name: 'Ciprofloxacino', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Fluoroquinolona com cobertura antipseudomonas; restrição em pediatria por risco articular.',
    indications: `## Indicações\n\n- ITU complicada, prostatite, infecções por *Pseudomonas* em adultos.\n- Profilaxia em neutropenia (esquemas).\n\n## Precauções\n\n- Evitar na gestação e lactação. Uso pediátrico restrito a indicações específicas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachê contendo 200 mg (Norgreen, Rivero).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 200 mg / 100 mL.',
        finalConcentration: '200 mg / 100 mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. 200 mg em 30 min, 400 mg em 60 min.',
        notes: 'Não retirar a proteção (bolsa plástica preta) até o momento de usar.',
      },
      pediatrico: {
        presentation: 'Sachê 200 mg/100 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5% e SG 10%.',
        finalConcentration: '2 mg/mL.',
        infusionRate: '60 min.',
        dose: '20–30 mg/kg/dia em 2 doses diárias. Máx. 800 mg/dia.',
        notes: 'Antibacteriano de amplo espectro (fluoroquinolona), para infecções respiratórias, ósseas, urinárias, pele e tecidos moles. Pode causar hiper e hipotensão, arritmias, cefaleia, tontura, convulsões, alucinações, hiperglicemia, náuseas, vômitos, diarreia, dor abdominal, anemia, dispneia, broncoespasmo, anafilaxia. Fotossensível.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- Não especificado.\n\n## Guia pediátrica\n\n- Após aberto, 14 dias em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, tendinite/ruptura tendínea, prolongamento do QT, fotossensibilidade.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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

console.log(`\nLote 12: ${drugs.length} monografias pt-BR`);
