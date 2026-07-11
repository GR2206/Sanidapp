#!/usr/bin/env node
/** Lote 9/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  heartAng: { citation: 'American Heart Association. Angina and heart failure guidelines.', url: 'https://www.heart.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'flu-001', name: 'Fluconazol', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Triazol antifúngico oral/IV de amplo espectro em leveduras; candidíase e profilaxia em neutropenia.',
    indications: `## Indicações principais\n\n- Candidíase mucocutânea e sistêmica em pacientes sensíveis.\n- Criptococose (esquemas de indução/manutenção em associação).\n- Profilaxia de candidíase em neutropenia e UTI.\n\n## Precauções\n\n- Ajustar dose na insuficiência renal.\n- Prolongamento do QT. Interações por inibição do CYP2C9/3A4.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachê contendo 200 mg (Fluconazol Norgreen, Rivero, Fluconovag, Braun).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 2 mg/mL.',
        finalConcentration: '2 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Administrar o conteúdo do sachê em 60 min.',
        notes: 'Manter em temperatura ambiente e protegido da luz. Não retirar a proteção (bolsa plástica preta) até o momento de usar.',
      },
      pediatrico: {
        presentation: 'Sachê 100 mL/200 mg.',
        administration: 'IV.',
        diluent: 'Já diluído.',
        finalConcentration: 'Não diluir.',
        infusionRate: '2 h com bomba de infusão.',
        dose: '5 a 10 mg/kg/dia. Máx. 200 mg/dia em uma dose diária.',
        compatibility: 'Não administrar concomitantemente com ampicilina, gluconato de cálcio, ceftazidima, cefotaxima, cefuroxima, ceftriaxona, clindamicina, furosemida, imipenem e piperacilina.',
        notes: 'Antimicótico sistêmico. Pode causar cefaleia, vômitos, dor abdominal, diarreia, exantema. Hepatotóxico.',
      },
      neonatal: { dose: 'Profilaxia/tratamento conforme protocolo da UCIN (ex.: 6 mg/kg/dose a cada 72 h em prematuros).', administration: 'IV lenta.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- Não especificado.\n\n## Guia pediátrica\n\n- Descartar após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, rash, elevação de transaminases, prolongamento do QT.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'fsc-001', name: 'Foscarnet', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Antiviral para infecções por citomegalovírus (CMV) e herpes resistentes ao aciclovir; uso IV sob supervisão especializada.',
    indications: `## Indicações\n\n- Retinite por CMV.\n- Infecções por herpesvírus resistentes ao aciclovir.\n\n## Precauções\n\n- Nefrotoxicidade. Monitorização renal e eletrolítica rigorosa. Hidratação adequada.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Frasco-ampola 500 mL/12 g.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '12 mg/mL.',
        infusionRate: 'Entre 1 e 2 h com bomba de infusão.',
        dose: 'Retinite por CMV: 180 mg/kg/dia em três doses diárias.',
        notes: 'Agente antiviral para o tratamento do CMV. Pode causar hiper e hipotensão, arritmias, cefaleia, convulsões, náuseas, vômitos, diarreias, dispneia. Nefrotóxico.',
      },
    },
    stability: '## Guia pediátrica\n\n- Não refrigerar.',
    adverseEffects: '## Efeitos adversos\n\n- Nefrotoxicidade, hipocalcemia, hipomagnesemia, náuseas, vômitos, diarreia, cefaleia, convulsões.',
    bibliography: [BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'imp-001', name: 'Imipenem+cilastatina', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Carbapenêmico de amplo espectro; cilastatina inibe degradação renal. Ajustar na DRC.',
    indications: `## Indicações\n\n- Infecções polimicrobianas graves, intra-abdominais, nosocomiais.\n- Não é primeira linha em convulsões/epilepsia não controlada.\n\n## Precauções\n\n- Maior risco de convulsões que meropenem. Ajuste rigoroso na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 500 mg de imipenem + 500 mg de cilastatina (Imipenem Drawer, Dixabiox, Imistatin, Zienam, Pharmavial, Imipecil, Richet).',
        reconstitution: '10 mL de SF ou SG 5%. Conc.: 50 mg/mL.',
        diluent: '500 mg em 100 mL de SF ou SG 5%.',
        finalConcentration: '5 mg/mL.',
        administration: 'IV intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e agitar. Administrar em 20–30 min. Doses >500 mg devem ser infundidas em 40–60 min.',
        notes: '500 mg de imipenem+cilastatina contêm 37,5 mg de sódio (1,6 mEq). Se aparecerem náuseas e vômitos, diminuir velocidade de infusão. É possível a administração IM.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola 500 mg pó para reconstituir.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5% e 10%.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '≤500 mg: 15 a 30 min. >500 mg: 40 a 60 min.',
        dose: '60 a 100 mg/kg/dia em 3 ou 4 doses diárias. Máx. 4 g/dia.',
        compatibility: 'Não administrar concomitantemente com ganciclovir.',
        notes: 'Antibiótico betalactâmico de amplo espectro. Pode causar hipotensão, taquicardia, convulsões, náuseas, flebite.',
      },
      neonatal: { dose: 'Dose conforme idade pós-menstrual (UCIN); uso especializado.', administration: 'IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- Com SF: 4 h em temperatura ambiente e 48 h refrigerada. SG 5%: 4 h em temperatura ambiente e 24 h refrigerada.\n\n## Guia pediátrica\n\n- SF temperatura ambiente 10 h, 48 h refrigerado. SG 5% temperatura ambiente 4 h, 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, diarreia, convulsões, rash.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'ins-001', name: 'Insulina corriente', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Insulina humana de ação curta IV/SC para cetoacidose, hiperglicemia em UTI e correção com glicose.',
    indications: `## Indicações\n\n- Cetoacidose diabética e estado hiperglicêmico hiperosmolar.\n- Controle glicêmico em UTI com protocolo de insulina.\n- Correção de hipercalemia (esquemas com glicose).\n\n## Precauções\n\n- Hipoglicemia. Monitorar glicemia capilar a cada 1–2 h em infusão.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 100 UI/mL.', dose: 'CAD: bolus 0,1 UI/kg IV depois infusão 0,1 UI/kg/h titulada.', administration: 'IV em bomba ou SC.' },
      pediatrico: {
        presentation: 'Frasco-ampola 100 UI/mL.',
        administration: 'SC ou IV.',
        diluent: 'SF, SG 5% e 10%.',
        infusionRate: 'Gotejo contínuo com bomba de infusão.',
        dose: '0,03 a 0,1 UI/kg/dia conforme glicemia.',
        notes: 'Agente hipoglicemiante e para o tratamento da hipercalemia. Pode causar hipoglicemia, taquicardia, palidez, síncope, hipocalemia, náuseas, anafilaxia.',
      },
      neonatal: { dose: 'Hiperglicemia na UCIN: 0,01–0,05 UI/kg/h em bomba.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Perfusão IV 24–48 h conforme protocolo institucional.\n\n## Guia pediátrica\n\n- Guardar fechada refrigerada; após aberta 28 dias refrigerada. Diluída para gotejo: 24 h.',
    adverseEffects: '## Efeitos adversos\n\n- Hipoglicemia, hipocalemia durante correção de CAD.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'iso-001', name: 'Isossorbida mononitrato', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Nitrato de ação prolongada para angina crônica e insuficiência cardíaca.',
    indications: `## Indicações\n\n- Angina pectoris crônica estável.\n- Insuficiência cardíaca (coadjuvante em esquemas institucionais).\n- Profilaxia de angina no esforço.\n\n## Precauções\n\n- Hipotensão, cefaleia frequente no início. Contraindicado com inibidores de PDE-5 (sildenafil, etc.).\n- Intervalo livre de nitratos se usado várias vezes ao dia (tolerância).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos liberação prolongada 30, 60 e 120 mg.', dose: '30–120 mg/dia VO em 1–2 doses (formulação LP preferida).', administration: 'VO. Não triturar comprimidos de liberação prolongada.' },
      pediatrico: { dose: 'Uso pediátrico limitado; seguir protocolo cardiológico.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula, proteger da umidade.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, hipotensão, tontura, rubor facial, taquicardia reflexa.',
    bibliography: [BIB.heartAng, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'inp-001', name: 'Insulina NPH', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Insulina intermediária SC para transição pós-CAD e diabetes basal em hospitalização.',
    indications: `## Indicações\n\n- Esquema basal-bolus na diabetes hospitalizada.\n- Transição após infusão de insulina corriente em CAD estabilizada.\n\n## Precauções\n\n- Não administrar IV. Hipoglicemia tardia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 100 UI/mL NPH.', dose: 'Dose basal conforme esquema (ex.: 0,2–0,5 UI/kg/dia basal).', administration: 'SC exclusivamente.' },
      pediatrico: {
        presentation: 'Frasco-ampola 100 UI/mL.',
        administration: 'SC.',
        dose: '0,5 a 1,5 UI/kg/dia conforme requerimentos.',
        notes: 'Agente hipoglicemiante. Pode causar hipoglicemia, taquicardia, palidez, síncope, hipocalemia, náuseas, anafilaxia. ADMINISTRAR 15 MIN ANTES DOS ALIMENTOS. NUNCA IV.',
      },
      neonatal: { dose: 'Uso limitado; esquemas endocrinologia neonatal SC.', administration: 'SC.' },
    },
    stability: '## Geral\n\n- Refrigerar; agitar suavemente antes de usar.\n\n## Guia pediátrica\n\n- Guardar fechado refrigerado; após aberto 28 dias refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Hipoglicemia, lipodistrofia no sítio de injeção.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ket-001', name: 'Cetamina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Anestésico dissociativo com analgesia; útil em broncoespasmo e sedoanalgesia no choque.',
    indications: `## Indicações\n\n- Indução sequencial, sedoanalgesia em UTI.\n- Broncoespasmo grave refratário (protocolo).\n- Analgesia subdissociativa em baixas doses.\n\n## Precauções\n\n- Aumento de secreções; considerar anticolinérgico. HAS e taquicardia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 50 mg/mL.', dose: 'Analgesia: 0,1–0,3 mg/kg em bolus ou 0,12–0,36 mg/kg/h. Indução: 1–2 mg/kg IV.', administration: 'IV lenta ou infusão.' },
      pediatrico: {
        presentation: 'Frasco-ampola 500 mg/10 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '50 mg/mL em bolus. 2 mg/mL intermitente ou infusão contínua.',
        infusionRate: 'Bolus 1 minuto.',
        dose: 'IM 3 a 7 mg/kg/dose; IV 1 a 2 mg/kg/dose.',
        compatibility: 'Precipita concomitantemente com diazepam.',
        notes: 'Anestésico geral. Pode causar hiper e hipotensão, arritmias, alucinações, depressão respiratória, sialorreia, náuseas, vômitos, anafilaxia, dependência física e psicológica com uso prolongado.',
      },
      neonatal: { dose: 'Uso na UCIN conforme protocolo de sedação/analgesia.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Utilizar imediatamente após diluição, se aplicável.\n\n## Guia pediátrica\n\n- 10 dias refrigerado. Depois descartar. (Recomendação farmácia HNZN).',
    adverseEffects: '## Efeitos adversos\n\n- Alucinações, hipertensão, hipersalivação, laringoespasmo (raro).',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ktr-001', name: 'Cetorolaco', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'AINE potente IV/IM para dor aguda de curta duração; uso restrito em pediatria conforme protocolo institucional.',
    indications: `## Indicações\n\n- Dor aguda moderada a grave de curta duração.\n\n## Precauções\n\n- Nefrotóxico. Precipita com morfina. Uso limitado em tempo e dose.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 30 mg/mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '30 mg/mL.',
        infusionRate: 'De 1 a 5 minutos.',
        dose: '0,4 a 1 mg/kg/dia em dose única. Máx. 15 mg/dia.',
        compatibility: 'Precipita concomitantemente com morfina.',
        notes: 'AINE. Pode causar cefaleia, hipertensão, diarreia, anafilaxia. Nefrotóxico.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, hipertensão, diarreia, anafilaxia, nefrotoxicidade, sangramento gastrointestinal.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'lab-001', name: 'Labetalol', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Beta/alfa bloqueador para crise hipertensiva e controle de PA na obstetrícia (protocolo).',
    indications: `## Indicações\n\n- Emergência hipertensiva com dano de órgão-alvo.\n- Hipertensão na gestação (protocolo obstétrico).\n\n## Precauções\n\n- Evitar em asma grave, bloqueio AV, choque.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 5 mg/mL.', dose: '10–20 mg IV em bolus a cada 10 min; infusão 0,5–2 mg/min.', administration: 'IV lenta ou infusão.' },
      pediatrico: {
        presentation: 'Ampola 20 mg/4 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        finalConcentration: 'Bolus: 5 mg/mL. Infusão contínua: 1 mg/mL.',
        infusionRate: 'Bolus de 2 a 3 minutos ou infusão contínua.',
        dose: '0,2 a 0,5 mg/kg/dose. Máx. 20 mg/dose. Infusão contínua: 0,4 a 1 mg/kg/h, máx. 3 mg/kg/h.',
        notes: 'Anti-hipertensivo. Pode causar hipotensão ortostática, edema, bradicardia, tontura, cefaleia, náuseas, broncoespasmo.',
      },
    },
    stability: '## Geral\n\n- Utilizar diluição fresca para infusão.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto. Diluição estável 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão ortostática, bradicardia, broncoespasmo.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'lid-001', name: 'Lidocaína', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Antiarrítmico classe IB para arritmias ventriculares; também anestesia local conforme apresentação.',
    indications: `## Indicações\n\n- Taquicardia ventricular sem pulso refratária (ACLS alternativo).\n- TV/pVC estável em protocolos selecionados.\n\n## Precauções\n\n- Toxicidade do SNC e cardíaca por níveis elevados. Ajustar em hepatopatia e DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 1% (10 mg/mL) e 2%.', dose: 'Bolus 1–1,5 mg/kg IV; infusão 1–4 mg/min.', administration: 'IV em bolus lento e infusão.' },
      pediatrico: {
        presentation: 'Ampola 5 mL a 2%.',
        administration: 'IV, SC, intratraqueal, transdérmica.',
        finalConcentration: '20 mg/mL para bolus. 8 mg/mL para infusão.',
        infusionRate: 'Infusão contínua com bomba de infusão.',
        dose: 'Anestésico local: 4,5 mg/kg/dose. Antiarrítmico: 1 mg/kg, máximo 100 mg/dose.',
        notes: 'Antiarrítmico, anestésico local. Pode causar bradicardia, hipotensão, arritmias, agitação, convulsões, náuseas, vômitos, parada respiratória.',
      },
      neonatal: { dose: '0,5–1 mg/kg em bolus conforme protocolo de arritmias da UCIN.', administration: 'IV lenta.' },
    },
    stability: '## Geral\n\n- Utilizar imediatamente após extração para bolus.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Tontura, convulsões, bradicardia, hipotensão (toxicidade).',
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

console.log(`\nLote 9: ${drugs.length} monografias pt-BR`);
