#!/usr/bin/env node
/** Lote 18/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  heartHtn: { citation: 'American Heart Association. Hypertension guidelines.', url: 'https://www.heart.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'nit-001', name: 'Nitrofurantoína', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Antibiótico exclusivamente urinário VO; profilaxia e cistite.',
    indications: `## Indicações\n\n- Cistite aguda não complicada.\n- Profilaxia de ITU recorrente.\n\n## Precauções\n\n- Contraindicado se ClCr < 30 mL/min (falta de concentração urinária). Evitar no último mês de gestação.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Cápsulas 50 mg, 100 mg; suspensão.', dose: '100 mg VO a cada 12 h por 5–7 dias (cistite). Profilaxia: 50–100 mg VO à noite.', administration: 'VO com alimentos.' },
      pediatrico: { dose: '5–7 mg/kg/dia dividido a cada 6 h (máx. 400 mg/dia).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar protegido da luz.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, neuropatia periférica (prolongado), pneumonite (raro).',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'nor-001', name: 'Noradrenalina (norepinefrina)', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Vasopressor de primeira linha no choque séptico e distributivo; infusão contínua com monitorização hemodinâmica.',
    indications: `## Indicações\n\n- Choque séptico, anafilaxia refratária, hipotensão grave em UTI.\n- Suporte hemodinâmico transitório até correção da causa.\n\n## Precauções\n\n- Extravasamento grave; preferir via central. Monitorar extremidades e perfusão.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: 'Início habitual 0,05–0,1 mcg/kg/min; titular até PAM objetivo (prescrição).',
        infusionRate: 'Infusão contínua em bomba.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampola 4 mg/4 mL.',
        administration: 'IV.',
        diluent: 'SOMENTE dextrose 5%.',
        finalConcentration: 'Usual 4 mcg/mL. Em restrição hídrica, 16 mcg/mL.',
        infusionRate: 'Somente por bomba de infusão.',
        dose: 'Inicial 0,05 a 1 mcg/kg/min, ajustar até o efeito desejado. Máx. 1 a 2 mcg/kg/min.',
        notes: 'Vasoconstritor periférico, estimulante inotrópico do coração, dilatador coronariano. A extravasação produz necrose de tecidos; escolher um vaso de grande calibre. Pode causar arritmia, hipertensão, taquicardia, bradicardia, vômitos, cefaleias, insuficiência respiratória.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco-ampola para infusão IV conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF.',
        diluent: 'SG 5% ou SF.',
        finalConcentration: 'Concentração conforme cartilha do serviço (bomba de infusão).',
        dose: '0,05–1 mcg/kg/min conforme protocolo da UCIN e peso.',
        infusionRate: 'Titular conforme PA e perfusão.',
        administration: 'IV contínua em bomba; via central preferencial.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Geral\n\n- Proteger da luz. Trocar solução conforme política do serviço (habitualmente 24 h).\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberta. Diluição estável 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia reflexa, arritmias, isquemia periférica, extravasamento com necrose.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nsh-001', name: 'Cloreto de sódio hipertônico', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Solução hipertônica (3%, 7,5%, 23,4%) para hiponatremia sintomática e hipertensão intracraniana.',
    indications: `## Indicações\n\n- Hiponatremia sintomática grave.\n- Hipertensão intracraniana com herniação (bolus em protocolo neuro).\n\n## Precauções\n\n- Correção lenta de sódio para evitar síndrome de desmielinização osmótica. Monitorar Na+ a cada 2–4 h.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola/bolsa NaCl 3% ou 23,4%.', dose: '3%: 100–150 mL em bolus no edema cerebral. Hiponatremia: conforme cálculo do déficit.', administration: 'IV central para 23,4%.' },
      pediatrico: { dose: '2–5 mL/kg NaCl 3% em bolus na herniação (protocolo PALS).', administration: 'IV.' },
      neonatal: { dose: 'Bolus hipertônico conforme protocolo neuro-UCIN.', administration: 'IV central.' },
    },
    stability: '## Estabilidade\n\n- Solução pronta; verificar duplamente a concentração.',
    adverseEffects: '## Efeitos adversos\n\n- Sobre-correção de sódio, flebite, edema pulmonar.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'oct-001', name: 'Octreotida', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Análogo de somatostatina para sangramento varicoso, fístulas e síndromes neuroendócrinos.',
    indications: `## Indicações\n\n- Hemorragia por varizes esofágicas (coadjuvante).\n- Fístulas pancreáticas e entéricas de alto débito.\n- Tumores neuroendócrinos.\n\n## Precauções\n\n- Colelitíase com uso prolongado. Hiperglicemia/hipoglicemia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 50–100 mcg/mL.', dose: 'Bolus 50 mcg IV depois infusão 50 mcg/h em sangramento varicoso (protocolo).', administration: 'IV em bomba de infusão.' },
      pediatrico: {
        presentation: 'Ampola 0,1 mg/1 mL.',
        administration: 'IV, SC, IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: 'Em bolus sem diluir; intermitente em 50–200 mL.',
        infusionRate: 'Bolus de 3 minutos em emergências médicas; caso contrário 15 a 30 minutos com bomba de infusão.',
        dose: 'Para hemorragia digestiva (HDB): bolus inicial 1 mcg/kg, seguido de infusão contínua de 1 mcg/kg/h.',
        notes: 'Antissecretor, antidiarreico. Pode causar hiper e hipotensão, hiper e hipoglicemia, cefaleias, arritmias, náusea, vômito, diarreia. Conservar na geladeira.',
      },
      neonatal: { dose: 'Esquemas UCIN para coleções linfáticas/fístulas.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Perfusão 24 h conforme diluição.\n\n## Guia pediátrica\n\n- 4 dias em temperatura ambiente após diluído. Conservar na geladeira.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, dor abdominal, bradicardia, alteração da glicemia.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'olm-001', name: 'Olmesartana', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'BRA para hipertensão arterial e combinações com diurético ou bloqueador de cálcio.',
    indications: `## Indicações\n\n- Hipertensão arterial essencial.\n- Esquemas combinados institucionais (olmesartana + HCTZ ou anlodipino).\n\n## Precauções\n\n- Contraindicado na gestação. Enteropatia por olmesartana (rara, crônica).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 20 e 40 mg.', dose: '20–40 mg/dia VO em dose única.', administration: 'VO com ou sem alimentos.' },
      pediatrico: { dose: '0,3–1 mg/kg/dia VO (6–16 anos, conforme protocolo).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Tontura, hipotensão, hipercalemia, diarreia crônica (raro).',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'ome-001', name: 'Omeprazol', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Inibidor da bomba de prótons IV/VO para profilaxia e tratamento de úlcera péptica e sangramento digestivo alto.',
    indications: `## Indicações\n\n- Profilaxia de úlcera de estresse em UTI.\n- Hemorragia digestiva alta (esquemas com IBP IV).\n- Esofagite por refluxo.\n\n## Precauções\n\n- Interações com rifampicina, fenitoína e carbamazepina. Reconstituir somente com solvente do fabricante.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Frasco-ampola 40 mg.',
        reconstitution: 'Reconstituir somente com o solvente fornecido pelo fabricante.',
        administration: 'IV.',
        diluent: 'SF ou SG 5% para diluição.',
        finalConcentration: '0,4 mg/mL.',
        infusionRate: 'Entre 20 e 30 minutos com bomba de infusão.',
        dose: 'De 1 mês a 12 anos: 0,5 a 2 mg/kg. Maior de 12 anos: 40 mg/dia. Em dose única diária.',
        compatibility: 'Não administrar concomitantemente com rifampicina, fenitoína e carbamazepina.',
        notes: 'Inibidor da bomba de prótons gástrica. Pode causar cefaleias, náusea, vômito, dor abdominal, flatulência, diarreia.',
      },
    },
    stability: '## Guia pediátrica\n\n- 4 horas em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, náusea, vômito, dor abdominal, flatulência, diarreia.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'ond-001', name: 'Ondansetrona', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Antiemético setron para náuseas pós-operatórias e por quimioterapia.',
    indications: `## Indicações\n\n- Náuseas e vômitos pós-operatórios.\n- Antiemese em quimioterapia e radioterapia.\n\n## Precauções\n\n- Prolongamento do QT. Constipação.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 4–8 mg; comprimidos ODT.', dose: '4–8 mg IV lenta ou VO a cada 8 h.', administration: 'IV lenta ou VO.' },
      pediatrico: {
        presentation: 'Ampola 8 mg/4 mL ou 4 mg/2 mL.',
        administration: 'IV ou IM (adultos).',
        diluent: 'SF, SG 5%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolus de 2 a 5 minutos.',
        dose: '0,15 mg/kg/dose.',
        compatibility: 'Incompatível com aciclovir, ampicilina, aminofilina, furosemida, ganciclovir, lorazepam, metilprednisolona e piperacilina.',
        notes: 'Antiemético. Pode causar hipotensão, síncope, cefaleia, constipação ou diarreia.',
      },
      neonatal: { dose: '0,1 mg/kg IV a cada 8 h conforme protocolo.', administration: 'IV lenta.' },
    },
    stability: '## Geral\n\n- IV compatível em SF e SG.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, constipação, prolongamento do QT.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ose-001', name: 'Oseltamivir', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Antiviral oral para influenza; iniciar idealmente dentro de 48 h dos sintomas.',
    indications: `## Indicações\n\n- Influenza em pacientes de risco ou grave.\n- Profilaxia pós-exposição em surtos.\n\n## Precauções\n\n- Ajustar dose na DRC. Efeitos neuropsiquiátricos relatados em pediatria.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Cápsulas 75 mg; suspensão.', dose: '75 mg VO a cada 12 h por 5 dias (tratamento).', administration: 'VO com ou sem alimentos.' },
      pediatrico: { dose: 'Dose por peso conforme suspensão (30–75 mg a cada 12 h).', administration: 'VO.' },
      neonatal: { dose: '1–3 mg/kg/dose VO a cada 12 h conforme protocolo influenza UCIN.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Suspensão refrigerada conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, vômitos, cefaleia.',
    bibliography: [BIB.idsa, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'oxa-001', name: 'Oxacilina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Penicilina resistente à penicilinase para MSSA; não ativa frente a MRSA.',
    indications: `## Indicações principais\n\n- Infecções por *Staphylococcus aureus* sensível à oxacilina (MSSA).\n- Celulite, osteomielite, endocardite estafilocócica (esquemas).\n\n## Precauções\n\n- Não usar se suspeita de MRSA.\n- Alergia a penicilinas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 1 g ou 2 g.', reconstitution: 'Reconstituir 1 g com 10 mL água para injeção ou SF 0,9%.', dose: '1–2 g IV a cada 4–6 h.', infusionRate: 'Perfusão 30–60 min.', administration: 'IV ou IM.' },
      pediatrico: { dose: '100–200 mg/kg/dia dividido a cada 4–6 h.', administration: 'IV.' },
      neonatal: { dose: '25–50 mg/kg/dose a cada 12 h (protocolo UCIN).', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Solução reconstituída: 4 h ambiente / 24 h refrigerada (verificar bula).',
    adverseEffects: '## Frequentes\n\n- Flebite, rash.\n\n## Graves\n\n- Anafilaxia, nefrite intersticial (raro).',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'phb-001', name: 'Fenobarbital', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Barbitúrico antiepiléptico; segunda linha no estado de mal epiléptico refratário.',
    indications: `## Indicações\n\n- Estado de mal epiléptico refratário a benzodiazepínicos e fenitoína.\n- Convulsões neonatais (protocolo UCIN).\n\n## Precauções\n\n- Depressão respiratória. Acúmulo e sedação prolongada.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 200 mg/mL.', dose: 'Ataque 15–20 mg/kg IV lenta; manutenção 1–3 mg/kg/dia.', administration: 'IV muito lenta.' },
      pediatrico: {
        presentation: 'Ampola 100 mg/2 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF.',
        finalConcentration: '1 mg/mL.',
        infusionRate: '30 mg/min com bomba de infusão.',
        dose: '15 a 20 mg/kg (máx. 1 g/dose). A dose pode ser repetida aos 15 min.',
        notes: 'Anticonvulsivante, barbitúrico. Pode causar náusea, vômito, depressão do SNC, dependência física ou psicológica. O EXTRAVASAMENTO PODE NECROSAR TECIDOS.',
      },
      neonatal: { dose: 'Ataque 15–20 mg/kg; manutenção 3–4 mg/kg/dia (UCIN).', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Não misturar com outros medicamentos em Y.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Sedação, depressão respiratória, hipotensão, rash.',
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

console.log(`\nLote 18: ${drugs.length} monografias pt-BR`);
