#!/usr/bin/env node
/** Lote 13/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
    id: 'col-001', name: 'Colistina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Polimixina de reserva para Gram-negativos multirresistentes (CRE, *Pseudomonas* MDR).',
    indications: `## Indicações\n\n- Infecções por bacilos Gram-negativos multirresistentes sem alternativas.\n\n## Precauções\n\n- Nefrotoxicidade e neurotoxicidade. Ajustar pela função renal. Calcular dose em UI ou mg de colistimetato conforme protocolo.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 100 mg de colistina em base ativa (Permalec*, Fabra*, Colistina Richet*, Techsphere*, Alfacolin*, Alficetin, Nolisin, Cotrelan*, Colislym, Espirotech*).',
        reconstitution: '2 mL de água para injeção. Conc.: 50 mg/mL.',
        diluent: '100 mg em 50–100 mL de SF ou SG 5%.',
        finalConcentration: '2 mg/mL.',
        administration: 'IV direta: Sim. Reconstituir em 3–5 mL de água para injeção e passar em 3–5 min. IV intermitente: Sim. Diluir em 50 mL de SF ou SG 5% e infundir em 10–15 min.',
        notes: '100 mg de colistina base equivalem aproximadamente a 240 mg de colistina metanosulfonato e a 3.000.000 UI de potência. É possível a administração IM ou inalatória.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 100 mg.',
        administration: 'IV.',
        diluent: 'SF, SG 5%, água destilada, Ringer.',
        finalConcentration: 'Conforme necessidades hídricas do paciente.',
        infusionRate: 'Bolus de 3 a 5 min.',
        dose: 'Máx. 5 mg/kg/dia de  nós 2 a 4 doses diárias.',
        compatibility: 'Precipita concomitantemente com eritromicina, cefalotina, tetraciclina.',
        notes: 'Antibiótico bactericida para enterite, trato respiratório inferior e urinário, TBC, pneumonias associadas a AMR, meningite. Pode causar tontura, ataxia, bloqueio neuromuscular que pode terminar em insuficiência respiratória, carcinogênese, mutagênese e prejuízo da fertilidade. Nefrotóxico.',
      },
      neonatal: { dose: 'Dose conforme protocolo da UCIN e peso; monitorização renal rigorosa.', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente, 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- Utilizar imediatamente após diluição. (24 h em temperatura ambiente).\n\n## Guia pediátrica\n\n- 8 h em temperatura ambiente, 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Nefrotoxicidade, neurotoxicidade (parestesias), broncoespasmo (inalada).',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cst-001', name: 'Cisatracúrio', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Bloqueador neuromuscular não despolarizante degradado por Hofmann; útil em hepatopatia e DRC.',
    indications: `## Indicações\n\n- Bloqueio neuromuscular em UTI e cirurgia quando se deseja eliminação independente de órgãos.\n\n## Precauções\n\n- Histamina mediada em bolus rápidos. Monitorar TOF.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 2 mg/mL.', dose: '0,15–0,2 mg/kg em bolus; 1–3 mcg/kg/min em infusão.', administration: 'IV.' },
      pediatrico: { dose: '0,1–0,15 mg/kg em bolus; infusão conforme TOF.', administration: 'IV.' },
      neonatal: { dose: '1–2 mcg/kg/min em infusão na UCIN.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Diluição 24 h refrigerada.',
    adverseEffects: '## Efeitos adversos\n\n- Rash, broncoespasmo, bloqueio prolongado.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dap-001', name: 'Daptomicina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Lipopeptídeo IV principalmente em adultos; bacteriemia e endocardite por Gram-positivos, incluindo MRSA.',
    indications: `## Indicações\n\n- Bacteriemia, endocardite, infecções de pele complicadas por Gram-positivos.\n\n## Precauções\n\n- Contraindicado na pneumonia (inativado pelo surfactante). Monitorar CPK.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 500 mg (Cubicin RT).',
        reconstitution: '10 mL de água para injeção. Conc.: 50 mg/mL.',
        diluent: '500 mg em 50 mL de SF.',
        finalConcentration: '10 mg/mL.',
        administration: 'IV direta: Sim, somente em adultos. Passar em 2 min. IV intermitente: Sim. Diluir em 50 mL de SF e administrar em 30 min.',
        notes: 'Não é compatível com SG 5%.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 500 mg.',
        reconstitution: 'Reconstituir e deixar repousar 10 min. Misturar com rotações suaves. Não agitar vigorosamente.',
        administration: 'IV.',
        diluent: 'SF. NÃO SG 5%.',
        finalConcentration: '20 mg/mL.',
        infusionRate: '30 min com bomba de infusão.',
        dose: 'De 2 a 17 anos: 4 a 6 mg/kg/dose uma vez ao dia.',
        notes: 'Antibiótico lipopeptídeo cíclico para infecções de pele e tecidos moles. Pode causar hiper e hipotensão, arritmias, cefaleia, náuseas, vômitos, diarreia, anafilaxia.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente, 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 48 h refrigerado.\n\n## Guia pediátrica\n\n- 12 h em temperatura ambiente, 48 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Miopatia (elevação de CPK), eosinofilia pulmonar, náuseas.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'des-001', name: 'Desmopressina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Análogo do ADH para diabetes insípido, hemofilia von Willebrand e sangramento urêmico.',
    indications: `## Indicações\n\n- Diabetes insípido central.\n- Hemofilia A leve / doença de von Willebrand (esquemas).\n- Sangramento urêmico em diálise.\n\n## Precauções\n\n- Hiponatremia e hiposmolaridade com fluidos livres. Monitorar sódio.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola IV 4 mcg/mL; nasal/VO conforme apresentação.', dose: 'DI: 1–2 mcg IV/SC ou dose intranasal conforme protocolo.', administration: 'IV lenta, SC ou intranasal.' },
      pediatrico: { dose: '0,3 mcg/kg IV/SC em sangramento ou DI conforme protocolo.', administration: 'IV/SC/intranasal.' },
      neonatal: { dose: '0,1–0,3 mcg/kg conforme indicação da UCIN.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Refrigerar conforme apresentação.',
    adverseEffects: '## Efeitos adversos\n\n- Hiponatremia, cefaleia, rubor, trombose (raro).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dex-001', name: 'Dexmedetomidina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Agonista alfa-2 para sedação cooperativa em ventilação mecânica; menor depressão respiratória que benzodiazepínicos.',
    indications: `## Indicações\n\n- Sedação em VM na UTI.\n- Sedação procedural em esquemas autorizados.\n\n## Precauções\n\n- Bradicardia e hipotensão. Não utilizar como agente único na agitação grave.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 100 mcg/mL.', dose: 'Ataque 1 mcg/kg em 10 min (opcional), depois 0,2–1,5 mcg/kg/h.', administration: 'IV em bomba de infusão.' },
      pediatrico: { dose: '0,2–1 mcg/kg/h sem ataque habitual em pediatria.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Diluição 24 h; não utilizar ampolas com partículas.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, hipotensão, boca seca, hipertensão em bolus.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dig-001', name: 'Digoxina', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Glicosídeo cardíaco para controle de frequência na FA, IC e arritmias supraventriculares.',
    indications: `## Indicações\n\n- Fibrilação atrial com resposta ventricular rápida (controle da FC).\n- Insuficiência cardíaca com disfunção sistólica (uso seletivo).\n- Taquicardia supraventricular.\n\n## Precauções\n\n- Janela terapêutica estreita. Vigilar níveis, função renal, potássio e magnésio.\n- Intoxicação: arritmias, náuseas, alterações visuais.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 0,25 mg. Ampola 0,25 mg/mL.', dose: 'Ataque IV: 0,25–0,5 mg; manutenção VO 0,125–0,25 mg/dia conforme função renal.', administration: 'VO ou IV lenta (diluída conforme protocolo).' },
      pediatrico: { dose: 'Ataque: 0,01–0,02 mg/kg IV/VO. Manutenção: 0,005–0,01 mg/kg/dia VO.', administration: 'VO ou IV lenta sob supervisão cardiológica.' },
      neonatal: { dose: 'Doses neonatais conforme protocolo cardiológico e níveis séricos.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- Ampolas: utilizar após diluição conforme protocolo institucional.',
    adverseEffects: '## Efeitos adversos\n\n- Arritmias, náuseas, vômitos, anorexia, confusão, alterações visuais (halos).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'dob-001', name: 'Dobutamina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Inotrópico beta-1 para insuficiência cardíaca aguda e choque cardiogênico com baixo débito.',
    indications: `## Indicações\n\n- Insuficiência cardíaca aguda descompensada com hipoperfusão.\n- Choque cardiogênico em esquemas combinados.\n\n## Precauções\n\n- Taquiarritmias. Hipovolemia não corrigida pode piorar a hipotensão.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '2,5–20 mcg/kg/min titulado.',
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
        dose: '2–20 mcg/kg/min conforme protocolo.',
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
        dose: '2–10 mcg/kg/min na UCIN sob prescrição especializada.',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Estabilidade\n\n- Utilizar em 24 h; proteger da luz conforme cartilha.',
    adverseEffects: '## Efeitos adversos\n\n- Taquicardia, arritmias, hipotensão, cefaleia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dox-001', name: 'Doxiciclina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Tetraciclina de meia-vida longa; atípicas, riquétsias e profilaxia de malária.',
    indications: `## Indicações\n\n- Pneumonia atípica, riquetsiose, borreliose, brucelose.\n- Profilaxia de malária (esquemas).\n\n## Precauções\n\n- Evitar < 8 anos (manchas dentárias) salvo indicação vital. Fotossensibilidade.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Cápsulas 100 mg; frasco-ampola IV.', dose: '100 mg VO a cada 12 h ou ataque 200 mg dia 1.', administration: 'VO com água, em posição ereta.' },
      pediatrico: { dose: '> 8 anos: 2–4 mg/kg/dia a cada 12 h.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- IV: proteger da luz; utilizar pronto.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, fotossensibilidade, esofagite se não engolir com água.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'efe-001', name: 'Efedrina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Simpaticomimético misto para hipotensão intraoperatória e broncoespasmo histórico.',
    indications: `## Indicações\n\n- Hipotensão durante anestesia espinhal/epidural.\n- Bradicardia com hipotensão em contexto anestésico.\n\n## Precauções\n\n- Taquicardia, HAS. Uso limitado em cardiopatia isquêmica.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 30–50 mg/mL.', dose: '5–10 mg IV em bolus; repetir a cada 3–5 min.', administration: 'IV lenta.' },
      pediatrico: { dose: '0,1–0,2 mg/kg IV em bolus.', administration: 'IV.' },
      neonatal: { dose: 'Uso restrito na UCIN.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Pronto para uso.',
    adverseEffects: '## Efeitos adversos\n\n- Taquicardia, palpitações, ansiedade, HAS.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'eno-001', name: 'Enoxaparina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'HBPM para TEP, profilaxia tromboembólica e síndrome coronariana (esquemas).',
    indications: `## Indicações\n\n- Tromboprofilaxia em cirurgia e hospitalização.\n- TEP/TVP, síndrome coronariana em esquemas sem heparina IV.\n\n## Precauções\n\n- Ajustar dose na DRC grave. Sangramento. Antídoto limitado (protamina parcial).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Seringa pré-carregada 40–100 mg.', dose: 'Profilaxia: 40 mg SC a cada 24 h. TEP: 1 mg/kg SC a cada 12 h.', administration: 'SC profunda; não friccionar a área.' },
      pediatrico: { dose: '0,5–1 mg/kg SC a cada 12 h conforme protocolo pediátrico.', administration: 'SC.' },
      neonatal: { dose: '1,5 mg/kg SC a cada 12 h na UCIN (protocolo).', administration: 'SC.' },
    },
    stability: '## Estabilidade\n\n- Seringas pré-carregadas prontas para uso.',
    adverseEffects: '## Efeitos adversos\n\n- Hematoma SC, sangramento maior, trombocitopenia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
];

// Fix typo in col-001 pediatric dose (introduced accidental "nós")
drugs[0].dilution.pediatrico.dose = 'Máx. 5 mg/kg/dia de 2 a 4 doses diárias.';

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

console.log(`\nLote 13: ${drugs.length} monografias pt-BR`);
