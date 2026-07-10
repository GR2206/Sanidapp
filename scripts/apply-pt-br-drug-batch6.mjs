#!/usr/bin/env node
/** Lote 6/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  heartHtn: { citation: 'American Heart Association. Hypertension guidelines.', url: 'https://www.heart.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
};

const drugs = [
  {
    id: 'amf-003', name: 'Anfotericina B complexo lipídico', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Formulação de anfotericina B como complexo lipídico (Abelcet) para infecções fúngicas sistêmicas.',
    indications: `## Indicações principais\n\n- Infecções fúngicas sistêmicas em esquemas que contemplem complexo lipídico de anfotericina B.\n\n## Precauções\n\n- Frasco de uso único; não contém conservantes. Monitorar função renal e íons.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 100 mg em 20 mL de solução (Abelcet).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 5 mg/mL.',
        diluent: '100 mg em 100 mL de SG 5%. Não utilizar SF.',
        finalConcentration: '1 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Extrair com seringa a dose necessária e utilizar o filtro que acompanha o frasco. Introduzir a dose requerida em 100 mL de SG 5% e administrar em 120 min.',
        notes: 'Todo o material não utilizado deve ser descartado (não contém conservantes). Utilizar a agulha com filtro para retirar a solução do frasco e depois preparar a infusão.',
      },
      pediatrico: { dose: 'Dose conforme protocolo de infectologia pediátrica.', administration: 'IV intermitente conforme cartilha institucional.' },
      neonatal: { dose: 'Dose conforme protocolo da UCIN.', administration: 'IV central.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Frasco de uso único. Manter refrigerado.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente e 48 h refrigerada. Utilizar equipo fotossensível.',
    adverseEffects: '## Efeitos adversos\n\n- Reações relacionadas à infusão, nefrotoxicidade, hipocalemia, febre.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'ami-001', name: 'Amicacina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Aminoglicosídeo de reserva para Gram-negativos multirresistentes; monitorização de níveis obrigatória.',
    indications: `## Indicações\n\n- Infecções por Gram-negativos resistentes sensíveis.\n- Trato urinário, respiratório, septicemia.\n\n## Precauções\n\n- Nefrotoxicidade e ototoxicidade. Ajustar por níveis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola contendo 500 mg em 2 mL de solução (Duncan, FABRA, Klonal, Larjan, Richet, Rivero).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 250 mg/mL.',
        diluent: '500 mg em 200 mL de SF.',
        finalConcentration: '2,5 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Administrar a dose em 30–60 min.',
        notes: 'Pode sofrer mudança de coloração sem perda de atividade. Descartar soluções escuras.',
      },
      pediatrico: {
        presentation: 'Ampola 500 mg/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: 'Até 10 mg/mL.',
        infusionRate: 'Entre 30 e 60 min com bomba de infusão.',
        dose: '15 mg/kg/dia. Por não mais de 10 dias.',
        compatibility: 'NÃO DEVE SER ADMINISTRADO COM OUTROS MEDICAMENTOS. Os antibióticos betalactâmicos reduzem sua eficácia.',
        notes: 'Antibiótico para trato urinário, respiratório, septicemia. Pode causar febre, cefaleia, tontura, ataxia, náuseas, vômitos, anemia, ototoxicidade e nefrotoxicidade.',
      },
      neonatal: { dose: '15 mg/kg/dose a cada 24–48 h conforme idade pós-menstrual.', administration: 'IV.' },
    },
    stability: '## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- Conservar ampola fechada em local escuro. Descarta-se o remanescente após aberta.',
    adverseEffects: '## Efeitos adversos\n\n- Febre, cefaleia, tontura, ataxia, náuseas, vômitos, anemia, ototoxicidade, nefrotoxicidade.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'aml-001', name: 'Amlodipino', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Bloqueador dos canais de cálcio dihidropiridínico de longa ação para HAS e angina.',
    indications: `## Indicações\n\n- Hipertensão arterial.\n- Angina pectoris crônica estável.\n- Vasoespasmo coronariano (variante de Prinzmetal).\n\n## Precauções\n\n- Edema periférico frequente. Precaução em estenose aórtica grave e IC descompensada.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 5 e 10 mg.', dose: '5–10 mg/dia VO em dose única matinal.', administration: 'VO.' },
      pediatrico: { dose: '0,1–0,3 mg/kg/dia VO (máx. 5 mg/dia em <6 anos; 10 mg/dia em maiores).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula, proteger da luz.',
    adverseEffects: '## Efeitos adversos\n\n- Edema de membros inferiores, rubor facial, cefaleia, tontura, palpitações.',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'amo-001', name: 'Amoxicilina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Aminopenicilina oral de primeira linha em muitas infecções comunitárias; apresentação IV em hospital conforme protocolo.',
    indications: `## Indicações principais\n\n- Otite média, sinusite, faringoamigdalite (conforme diretriz local).\n- Pneumonia adquirida na comunidade em pacientes selecionados.\n- Profilaxia dental em risco de endocardite (esquemas).\n\n## Precauções\n\n- Alergia a penicilinas.\n- Rash na mononucleose.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Cápsulas 500 mg, 875 mg; suspensão; ampola IV se disponível.', dose: 'VO: 500 mg–1 g a cada 8 h. IV conforme protocolo hospitalar.', administration: 'VO com ou sem alimentos; IV em perfusão.' },
      pediatrico: { dose: 'VO: 25–45 mg/kg/dia dividido a cada 8–12 h (máx. 3 g/dia).', administration: 'VO preferencial; IV se não tolerar oral.' },
      neonatal: { dose: '25–30 mg/kg/dose VO a cada 12 h ou IV conforme protocolo da UCIN.', administration: 'VO ou IV conforme tolerância e gravidade.' },
    },
    stability: '## Estabilidade\n\n- Suspensão reconstituída: refrigerar conforme bula (habitualmente 7–14 dias).',
    adverseEffects: '## Frequentes\n\n- Diarreia, náuseas, rash.\n\n## Graves\n\n- Anafilaxia, colite por *C. difficile*.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'amo-002', name: 'Amoxicilina/ácido clavulânico', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Betalactâmico com inibidor para infecções comunitárias resistentes à amoxicilina isolada (otite, sinusite, mordeduras).',
    indications: `## Indicações principais\n\n- Infecções respiratórias, otorrinolaringológicas e de pele onde se suspeite resistência à amoxicilina.\n- Mordeduras humanas/animal em esquemas conforme protocolo.\n\n## Precauções\n\n- Alergia a penicilinas.\n- Maior risco de diarreia e hepatotoxicidade colestática que amoxicilina isolada.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 500/125 mg, 875/125 mg; suspensão; IV 1,2 g ou 2,2 g.', dose: 'VO: 875/125 mg a cada 12 h. IV: 1,2 g a cada 8 h ou conforme protocolo.', administration: 'VO ou IV.' },
      pediatrico: { dose: 'VO: 25–45 mg/kg/dia de amoxicilina a cada 12 h (componente amoxicilina).', administration: 'VO preferencial.' },
      neonatal: { dose: 'Dose conforme protocolo da UCIN; uso restrito.', administration: 'VO ou IV conforme indicação.' },
    },
    stability: '## Estabilidade\n\n- Suspensão refrigerada conforme bula. IV diluída: utilizar no turno.',
    adverseEffects: '## Frequentes\n\n- Diarreia, náuseas.\n\n## Graves\n\n- Hepatite colestática, anafilaxia, colite por *C. difficile*.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'amp-001', name: 'Ampicilina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Aminopenicilina de espectro ampliado frente a enterococos e *Listeria*. Uso IV/IM ou oral conforme apresentação e indicação.',
    indications: `## Indicações principais\n\n- Infecções por microorganismos sensíveis: ITU, pneumonia, meningite, endocardite.\n- Profilaxia em cirurgia conforme protocolo.\n\n## Precauções\n\n- Alergia a penicilinas: contraindicado. Reconstituir com água destilada.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 1 g (Bagó, Drawer, Klonal, LIA, Pharmavial, Rivero).',
        reconstitution: '10 mL de água para injeção. Conc.: 100 mg/mL.',
        diluent: '1 g em 100 mL de SF.',
        finalConcentration: '10 mg/mL.',
        administration: 'IV direta: Sim. Reconstituir 1 g em 10–15 mL de água para injeção e passar em NÃO MENOS DE 10–15 min (veloc. máxima: 100 mg/min). IV intermitente: Sim. Diluir em 50–100 mL de SF. Passar em 15–60 min.',
        notes: 'SG 5% acelera a hidrólise da ampicilina (utilizar imediatamente). Prefere-se diluir com SF.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola 1000 mg.',
        reconstitution: 'RECONSTITUIR COM ÁGUA DESTILADA.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%, Ringer.',
        finalConcentration: 'Entre 2 e 30 mg/mL.',
        infusionRate: 'Entre 15 e 30 min com bomba de infusão.',
        dose: '200 mg/kg/dia.',
        notes: 'Antibiótico betalactâmico. Pode causar convulsões, cefaleia, tontura, diarreia, náuseas, vômitos, anafilaxia, superinfecção.',
      },
      neonatal: { dose: '50 mg/kg/dose a cada 12 h em RN a termo; intervalos maiores em prematuros (protocolo da UCIN).', administration: 'IV lenta em bomba de seringa.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente, 4 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 4 h em temperatura ambiente e 24 h refrigerado.\n\n## Guia pediátrica\n\n- 8 h em temperatura ambiente (25°). 48 h refrigerado (4°).',
    adverseEffects: '## Frequentes\n\n- Diarreia, náuseas, rash, cefaleia, tontura.\n\n## Graves\n\n- Convulsões, anafilaxia, colite por *C. difficile*, superinfecção.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'amp-002', name: 'Ampicilina-sulbactam', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Betalactâmico com inibidor de betalactamases para infecções por produtores de betalactamase.',
    indications: `## Indicações principais\n\n- Infecções de pele e estruturas cutâneas, intra-abdominais ou ginecológicas.\n- Polimicrobianas em esquemas empíricos conforme protocolo.\n\n## Precauções\n\n- Alergia a penicilinas. Para o cálculo da dose deve-se considerar os 1000 mg de ampicilina, NÃO os 1500 da soma com o sulbactam.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1 g de ampicilina + 0,5 g de sulbactam (PharmaVial, Drawer, Klonal, Norgreen, Northia**, Richmond).',
        reconstitution: '5 mL de água para injeção. Conc.: 300 mg/mL.',
        diluent: '1,5 g em 100 mL de SF.',
        finalConcentration: 'Conc. AMS: 15 mg/mL.',
        administration: 'IV direta: Sim. Reconstituir 1,5 g em 3 mL de água para injeção e administrar em 3–5 min. IV intermitente: Sim. Administrar 1,5 g em 100 mL de SF em 15–30 min.',
        notes: 'SG 5% acelera a hidrólise da ampicilina (utilizar imediatamente). Prefere-se diluir com SF.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola 1500 mg.',
        reconstitution: 'RECONSTITUIR COM ÁGUA DESTILADA.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%, Ringer.',
        finalConcentration: 'Entre 2 e 30 mg/mL.',
        infusionRate: 'Entre 15 e 30 min com bomba de infusão.',
        dose: '200 a 300 mg/kg/dia (componente ampicilina: 1000 mg por frasco).',
        notes: 'Antibiótico betalactâmico para infecções que afetam a pele e estruturas cutâneas, intra-abdominais ou ginecológicas. Pode causar dor torácica, cefaleia, tontura, convulsões, diarreia, náuseas, vômitos, anafilaxia. Para o cálculo da dose deve-se considerar os 1000 mg da ampicilina, NÃO OS 1500 DA SOMA COM O SULBACTAM.',
      },
      neonatal: { dose: 'Dose conforme idade pós-menstrual e peso (protocolo da UCIN).', administration: 'IV em bomba de seringa.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente e 4 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 3 h em temperatura ambiente e 24 h refrigerado.\n\n## Guia pediátrica\n\n- 8 h em temperatura ambiente (25°). 48 h refrigerado (4°). Conservar em temperatura ambiente protegido da luz.',
    adverseEffects: '## Frequentes\n\n- Diarreia, flebite, rash, cefaleia, tontura, dor torácica.\n\n## Graves\n\n- Convulsões, anafilaxia, colite por *C. difficile*.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'ani-001', name: 'Anidulafungina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Equinocandina IV sem ajuste renal; candidemia e candidíase esofágica em adultos.',
    indications: `## Indicações principais\n\n- Candidemia e outras formas de candidíase invasiva em adultos.\n- Candidíase esofágica.\n\n## Precauções\n\n- Hepatotoxicidade. Histamina mediada. Uso principalmente em adultos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 100 mg (Ecalta).',
        reconstitution: '30 mL de água para injeção. Conc.: 3,33 mg/mL.',
        diluent: '100 mg em 100 mL de SF ou SG 5%.',
        finalConcentration: '0,77 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Administrar a velocidade de 100 mg em 90 min.',
        notes: 'A dose de ataque (200 mg) deve ser administrada em 3 horas.',
      },
      pediatrico: { dose: 'Uso limitado; esquemas sob supervisão de infectologia pediátrica.', administration: 'IV conforme protocolo.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h refrigerado. Diluir imediatamente.\n\n## Solução diluída (a administrar)\n\n- 48 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, hipocalemia, elevação de transaminases, rash.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'azt-001', name: 'Aztreonam', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Monobactâmico ativo frente a Gram-negativos; seguro em alergia grave a penicilina (sem reação cruzada).',
    indications: `## Indicações\n\n- Infecções por Gram-negativos em pacientes com alergia a betalactâmicos.\n- Infecções urinárias e respiratórias nosocomiais em esquemas.\n\n## Precauções\n\n- Sem cobertura Gram-positiva nem anaeróbia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 1 g (Richet, Norgreen).',
        reconstitution: '10 mL de água para injeção. Conc.: 100 mg/mL.',
        diluent: '1 g em 100 mL de SF.',
        finalConcentration: '10 mg/mL.',
        administration: 'IV intermitente: Sim. Diluir 1 g em 100 mL de SF ou SG 5% e administrar em 20–60 min.',
        notes: 'Não administrar junto com outros medicamentos. Em caso de administração simultânea, suspender a administração do aztreonam.',
      },
      pediatrico: { dose: '90–120 mg/kg/dia dividido a cada 6–8 h.', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 7 dias refrigerado.\n\n## Solução diluída (a administrar)\n\n- Não especificado.',
    adverseEffects: '## Efeitos adversos\n\n- Rash, flebite, diarreia.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cas-001', name: 'Caspofungina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Equinocandina IV para candidíase invasiva e aspergilose em esquemas de resgate.',
    indications: `## Indicações principais\n\n- Candidíase invasiva.\n- Aspergilose invasiva em pacientes refratários ou intolerantes a outros antifúngicos.\n- Profilaxia em transplante de células-tronco (esquemas).\n\n## Precauções\n\n- Ajustar dose na insuficiência hepática moderada-grave. Histamina mediada (rubor, rash).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 50 mg ou 70 mg (Cancidas).',
        reconstitution: '10,5 mL de água para injeção, SF ou água bacteriostática. Conc.: 5 mg/mL (50 mg) ou 7 mg/mL (70 mg). Agitar suavemente até obter solução clara.',
        diluent: '50–70 mg em 250 mL de SF ou Ringer lactato.',
        finalConcentration: '0,2–0,28 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Extrair o volume necessário e diluir em 250 mL de SF ou Ringer lactato. Administrar em 60 min.',
        notes: 'Não utilizar SG 5% como diluente (incompatível). Dose de ataque: 70 mg no dia 1; manutenção: 50 mg/dia. Em pacientes com insuficiência hepática moderada aumentar para 70 mg/dia. Equinocandina de primeira linha para candidíase invasiva.',
      },
      pediatrico: { dose: 'Ataque 70 mg/m² dia 1, depois 50 mg/m²/dia IV.', administration: 'IV 1 h.' },
      neonatal: { dose: '25 mg/m²/dia IV conforme protocolo da UCIN (uso especializado).', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente, 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente, 48 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Febre, flebite, elevação de transaminases, rash.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
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

console.log(`\nLote 6: ${drugs.length} monografias pt-BR`);
