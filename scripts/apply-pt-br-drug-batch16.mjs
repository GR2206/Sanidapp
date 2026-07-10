#!/usr/bin/env node
/** Lote 16/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  heartHtn: { citation: 'American Heart Association. Hypertension and heart failure guidelines.', url: 'https://www.heart.org/' },
  heartHf: { citation: 'American Heart Association. Heart failure guidelines.', url: 'https://www.heart.org/' },
  esc: { citation: 'European Society of Cardiology. Heart failure guidelines.', url: 'https://www.escardio.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'hdr-001', name: 'Hidralazina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Vasodilatador direto para emergência hipertensiva na gestação e pré-eclâmpsia.',
    indications: `## Indicações\n\n- Pré-eclâmpsia/eclâmpsia com HAS grave.\n- Emergência hipertensiva em esquemas obstétricos.\n\n## Precauções\n\n- Taquicardia reflexa. Cefaleia e flushing.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 20 mg/mL.', dose: '5–10 mg IV a cada 20–30 min; máx. 20 mg/dose obstétrica.', administration: 'IV lenta.' },
      pediatrico: { dose: '0,1–0,2 mg/kg IV a cada 6 h (uso limitado).', administration: 'IV.' },
      neonatal: { dose: '0,1–0,5 mg/kg/dose conforme protocolo cardiológico.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar após extração.',
    adverseEffects: '## Efeitos adversos\n\n- Taquicardia, cefaleia, hipotensão, síndrome tipo lúpus (crônico).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hef-001', name: 'Heparina sódica', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Anticoagulante parenteral; TEP, síndromes coronarianos e circulação extracorpórea. Controle com TTPa.',
    indications: `## Indicações\n\n- Tromboembolismo venoso, síndrome coronariana aguda.\n- Profilaxia e tratamento em cirurgia cardíaca/ECMO.\n\n## Precauções\n\n- Sangramento maior. TTPa conforme protocolo. Antídoto: protamina.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 5000 UI/mL.', dose: 'Bolus 60–80 UI/kg em SCA; perfusão 12–15 UI/kg/h titulada ao TTPa.', administration: 'IV em bomba de infusão.' },
      pediatrico: { dose: 'Bolus 75 UI/kg; infusão 20 UI/kg/h ajustada ao TTPa.', administration: 'IV.' },
      neonatal: { dose: '28 UI/kg/h infusão habitual na UCIN (protocolo).', administration: 'IV em bomba de infusão.' },
    },
    stability: '## Estabilidade\n\n- Perfusão preparada conforme cartilha; não agitar.',
    adverseEffects: '## Efeitos adversos\n\n- Hemorragia, trombocitopenia induzida por heparina (HIT).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hio-001', name: 'Hioscina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Antiespasmódico anticolinérgico (butilbrometo de escopolamina); uso em cólicas e espasmo gastrointestinal conforme protocolo.',
    indications: `## Indicações\n\n- Espasmo gastrointestinal e biliar.\n- Cólicas abdominais em esquemas controlados.\n\n## Precauções\n\n- Retenção urinária, glaucoma de ângulo fechado. Pode retardar absorção de outros medicamentos orais.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 20 mg/mL.',
        administration: 'IV ou IM.',
        diluent: 'Água destilada, SF, SG 5%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolus 5 min.',
        dose: '5 a 10 mg/dia em 3 doses.',
        notes: 'Espasmolítico. Pode afetar o retardo da absorção de outras medicações orais por diminuição da motilidade e do esvaziamento gástrico. Pode causar secura de boca, taquicardia, constipação, retenção urinária.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Secura de boca, taquicardia, constipação, retenção urinária, visão turva.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'imu-001', name: 'Imunoglobulina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Imunoglobulina humana IV (IGIV); anticorpos policlonais para imunodeficiências e doenças autoimunes conforme protocolo.',
    indications: `## Indicações\n\n- Imunodeficiências primárias e secundárias.\n- Encefalite, síndrome de Guillain-Barré, miastenia gravis, esclerose múltipla (esquemas específicos).\n\n## Precauções\n\n- Reações infusionais. Não misturar com outras soluções IV. Monitorar durante a infusão.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Frasco-ampola conforme concentração institucional.',
        administration: 'IV.',
        diluent: 'Não deve ser misturada com outras soluções intravenosas.',
        finalConcentration: '5%.',
        infusionRate: '0,3 a 0,5 mL/kg/h em aumento até 4 mL/kg/h.',
        dose: '400 a 1000 mg/kg/dia. Máx. 2000 mg/kg/dia.',
        notes: 'Anticorpos policlonais de origem plasmática, empregadas em distintos tipos de imunodeficiência, encefalite, síndrome de Guillain-Barré, miastenia gravis, esclerose múltipla.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante após aberta. Conservar entre 2 e 30°.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, febre, calafrios, náuseas, reações anafiláticas (raras).',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'ipr-001', name: 'Brometo de ipratrópio', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Anticolinérgico inalado para broncoespasmo; sinergia com salbutamol em nebulização.',
    indications: `## Indicações\n\n- DPOC exacerbada e asma moderada-grave em combinação com beta-2.\n\n## Precauções\n\n- Glaucoma de ângulo fechado se nebulização nos olhos. Retenção urinária em HBP.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Nebulização 0,25–0,5 mg; MDI.', dose: '0,5 mg nebulização a cada 6–8 h; combinar com salbutamol na crise.', administration: 'Nebulização.' },
      pediatrico: { dose: '0,25–0,5 mg nebulização a cada 6–8 h.', administration: 'Nebulização.' },
      neonatal: { dose: '0,25 mg nebulização conforme protocolo respiratório da UCIN.', administration: 'Nebulização.' },
    },
    stability: '## Estabilidade\n\n- Mistura com salbutamol estável no turno.',
    adverseEffects: '## Efeitos adversos\n\n- Boca seca, tosse, retenção urinária.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ivb-001', name: 'Ivabradina', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Inibidor da corrente If para controle da frequência na IC com ritmo sinusal e FC elevada.',
    indications: `## Indicações\n\n- Insuficiência cardíaca crônica em ritmo sinusal com FC ≥ 70 lpm apesar de betabloqueador otimizado.\n- Angina crônica em ritmo sinusal (conforme indicação registrada).\n\n## Precauções\n\n- Contraindicado em bradicardia, bloqueio AV, fibrilação atrial, insuficiência hepática grave.\n- Interação com inibidores potentes de CYP3A4 (ex.: claritromicina, cetoconazol).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 5 e 7,5 mg.', dose: 'Iniciar 5 mg VO a cada 12 h; titular até 7,5 mg a cada 12 h conforme FC e tolerância.', administration: 'VO com as refeições.' },
      pediatrico: { dose: 'Não indicado de rotina em pediatria.', administration: '—' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, fosfenos visuais, tontura, fadiga, bloqueio AV.',
    bibliography: [BIB.heartHf, BIB.anmat, BIB.sac, BIB.esc],
  },
  {
    id: 'kcl-001', name: 'Cloreto de potássio', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Reposição de potássio IV/VO; concentrações periféricas máximas estritas por risco de parada cardíaca.',
    indications: `## Indicações\n\n- Hipocalemia sintomática ou grave.\n- Manutenção em nutrição parenteral.\n\n## Precauções\n\n- Nunca bolus IV direto. Máx. 10 mEq/h periférica e 20 mEq/h central (protocolo). Monitorar ECG.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampolas 10–20 mEq; bolsas premix.', dose: 'Reposição conforme déficit e níveis; típico 10–40 mEq em diluição.', infusionRate: '≤ 10 mEq/h periférica.', administration: 'IV diluído exclusivamente.' },
      pediatrico: { dose: '0,5–1 mEq/kg/dia manutenção; reposição conforme K+ sérico.', administration: 'IV em bomba de infusão.' },
      neonatal: { dose: '1–2 mEq/kg/dia na UCIN dividido em bomba.', administration: 'IV central preferencial.' },
    },
    stability: '## Estabilidade\n\n- Utilizar linha dedicada; verificar concentração final.',
    adverseEffects: '## Efeitos adversos\n\n- Flebite, arritmias por administração rápida, hipercalemia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'lev-001', name: 'Levofloxacino', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Fluoroquinolona de amplo espectro; pneumonia comunitária e nosocomial em adultos.',
    indications: `## Indicações\n\n- Pneumonia adquirida na comunidade, ITU, prostatite.\n- Esquemas combinados em tuberculose sensível (conforme protocolo nacional).\n\n## Precauções\n\n- Restringir em pediatria. Prolongamento do QT.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 500 mg, 750 mg; IV 500 mg.', dose: '500–750 mg VO/IV a cada 24 h.', administration: 'VO ou IV.' },
      pediatrico: { dose: 'Uso restrito > 6 meses em indicações específicas conforme protocolo.', administration: 'VO/IV especializado.' },
    },
    stability: '## Estabilidade\n\n- IV diluída conforme bula; proteger da luz.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, tendinite, alteração da glicemia, prolongamento do QT.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'lis-001', name: 'Lisinopril', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'IECA de ação prolongada sem grupo sulfidrílico para HAS, IC e proteção pós-infarto.',
    indications: `## Indicações\n\n- Hipertensão arterial.\n- Insuficiência cardíaca com disfunção sistólica.\n- Infarto agudo do miocárdio em fase aguda e crônica.\n- Nefropatia diabética.\n\n## Precauções\n\n- Contraindicado na gestação e angioedema prévio com IECA.\n- Ajustar em insuficiência renal; vigilar potássio e creatinina.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 5, 10 e 20 mg.', dose: 'HAS: 10–40 mg/dia VO. IC: iniciar 2,5–5 mg/dia e titular.', administration: 'VO em dose única diária.' },
      pediatrico: { dose: '0,07–0,6 mg/kg/dia VO (máx. 40 mg/dia) em 1–2 doses.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Tosse seca, hipotensão, hipercalemia, elevação de creatinina, angioedema.',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'ltx-001', name: 'Levotiroxina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Hormônio tireoidiano T4 IV/VO para coma mixedematoso e déficit na hospitalização.',
    indications: `## Indicações\n\n- Coma mixedematoso (ataque IV com T3 conforme protocolo).\n- Reposição no hipotireoidismo em paciente hospitalizado.\n\n## Precauções\n\n- Arritmias e isquemia em idosos com ataque rápido. Monitorar ECG.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos; ampola IV 200 mcg.', dose: 'Mixedema: 200–400 mcg IV em ataque; manutenção VO.', administration: 'IV lenta ou VO em jejum.' },
      pediatrico: { dose: '10–15 mcg/kg/dia VO; IV em mixedema conforme endocrinologia.', administration: 'IV/VO.' },
      neonatal: { dose: '10–15 mcg/kg/dia VO em hipotireoidismo congênito.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- IV utilizar imediatamente após preparação.',
    adverseEffects: '## Efeitos adversos\n\n- Taquicardia, angina, arritmias, insônia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nLote 16: ${drugs.length} monografias pt-BR`);
