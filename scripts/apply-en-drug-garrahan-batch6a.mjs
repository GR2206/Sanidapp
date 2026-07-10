#!/usr/bin/env node
/** Garrahan re-translation batch 6/8 — 10 EN monographs (part A) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/en/farmacologia/drugs');

const ADJUST = '> Adjust according to institutional protocol and medical prescription.';
const MAIN = '## Main indications';

const BIB = {
  garrahan: (name, meta = '') => ({
    citation: `Hospital de Pediatría SAMIC Prof. Dr. Juan P. Garrahan. Institutional Pharmaceutical Formulary — ${name}${meta}.`,
    url: 'https://farmacia.garrahan.gov.ar/Vademecum/Busqueda',
  }),
  pedGuide: { citation: 'Institutional pediatric dilution and administration guide. June 2026.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  heartHtn: { citation: 'American Heart Association. Hypertension guidelines.', url: 'https://www.heart.org/' },
  heartAfib: { citation: 'American Heart Association. Atrial fibrillation guidelines.', url: 'https://www.heart.org/' },
  anmat: { citation: 'ANMAT. Drug information and authorized prescribing information in Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). ICU medication guidelines.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Argentine Society of Cardiology. Clinical practice guidelines.', url: 'https://www.sac.org.ar/' },
  sadiUcip: { citation: 'Infectious Diseases Service, Infection Prevention and Control. UCIP 2026 — Dilution and stability guide.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Argentine Society of Infectious Diseases (SADI). Guidelines and consensus statements.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Clinical practice guidelines.', url: 'https://www.idsociety.org/' },
};

const drugs = [
  {
    id: 'dif-001', name: 'Diphenhydramine', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antihistamine. Antiemetic adjunct. Sedative.',
    indications: `${MAIN}\n\nAntihistamine. Antiemetic adjunct. Sedative.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Capsules: 50 mg; Tablets: 50 mg; Syrup: 2,5 mg/mL; Ampoules or powder vial 10 mL: 10 mg/mL',
        administration: 'PO; IV; IM',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '15 min with continuous infusion pump.',
        dose: 'Infants: 1 mg/kg/day; Children: 3–5 mg/kg/day every 6–8 h, maximum dose: 50 mg/dose; premedication: 1 mg/kg/dose, maximum dose: 50 mg/dose. Adults: 50 mg/dose every 6–8 h, maximum dose: 50 mg/dose.',
        notes: '< 6 months may exhibit paradoxical hyperexcitability. Do not use in neonates. PO: administer with food. Contraindicated in asthmatic crises.',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nSignificant antimuscarinic activity, sedation. Dizziness, tinnitus, fatigue, diplopia, lassitude, incoordination, hypotension, nausea, vomiting, urinary retention. Overdose: psychosis, fever, hallucinations, seizures.',
    bibliography: [BIB.garrahan('difenhidrAMINA', ' (code 0071, ATC R06AA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'dip-001', name: 'Dipyrone', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Analgesic, antipyretic. Acute pain due to trauma or surgery. Colic pain. Cancer pain or other severe acute or chronic pain refractory to other analgesics. Hyperpyrexia resistant to other drugs.',
    indications: `${MAIN}\n\nAnalgesic, antipyretic. Acute pain due to trauma or surgery. Colic pain. Cancer pain or other severe acute or chronic pain refractory to other analgesics. Hyperpyrexia resistant to other drugs.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampoules 2 mL: 500 mg/mL; Tablets: 500 mg; Suspension: 50 mg/mL',
        administration: 'PO; IV',
        diluent: '0.9% NaCl, 5% dextrose and 10% dextrose.',
        finalConcentration: '100 mg/mL.',
        infusionRate: 'Bolus 1 min.',
        dose: '10 mg/kg/dose every 6 h. Adults: 0,5–1 g/dose every 6 h.',
        notes: 'PO as third-line drug after paracetamol and ibuprofen. Precautions: < 6 months, when combined with heparin there is risk of bleeding, patients with hepatopathy. Contraindications: porphyria, leukopenia, allergy to pyrazolones, hemorrhagic syndrome.',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nAgranulocytosis, aplastic anemia, severe cutaneous reactions, hypotension, bronchospasm, nausea, vomiting, dizziness, headache, diaphoresis, anaphylaxis.',
    bibliography: [BIB.garrahan('Dipirona', ' (code 0076, ATC N02BB)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'eno-001', name: 'Enoxaparin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticoagulant. Prophylaxis and treatment of deep vein thrombosis and/or pulmonary thromboembolism and arterial thrombosis.',
    indications: `${MAIN}\n\nAnticoagulant. Prophylaxis and treatment of deep vein thrombosis and/or pulmonary thromboembolism and arterial thrombosis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Prefilled syringe 40–100 mg.',
        dose: 'Prophylaxis: 40 mg SC every 24 h. PE: 1 mg/kg SC every 12 h.',
        administration: 'Deep SC; do not rub injection site.',
      },
      pediatrico: {
        dose: 'Per specialist indication. Prophylactic dose: < 2 months: 0,75 mg/kg/dose every 12 h; > 2 months: 0,5 mg/kg/dose every 12 h. Therapeutic dose: < 2 months: 1,5 mg/kg/dose every 12 h; > 2 months: 1 mg/kg/dose every 12 h',
        administration: 'SC',
        presentation: 'Prefilled syringe: 20 mg – 40 mg – 60 mg – 80 mg – 100 mg',
        notes: 'Lower bleeding risk than heparin, prolonged half-life, less laboratory monitoring. If combination with substances affecting hemostasis is indicated, perform careful clinical and laboratory monitoring. See alert.',
      },
      neonatal: {
        dose: '1,5 mg/kg SC every 12 h in NICU (protocol).',
        administration: 'SC.',
      },
    },
    stability: '## Stability\n\n- Prefilled syringes ready for use.',
    adverseEffects: '## Adverse effects\n\nThrombocytopenia (rare), hypochromic anemia, cutaneous necrosis at injection site, hemorrhage, fever, diarrhea, confusion, dyspnea, edema.',
    bibliography: [BIB.garrahan('Enoxaparina Sódica*', ' (code 1184, ATC B01AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'enp-001', name: 'Enalapril', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Venous and arterial vasodilator. Angiotensin-converting enzyme inhibitor.',
    indications: `${MAIN}\n\nVenous and arterial vasodilator. Angiotensin-converting enzyme inhibitor.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 5, 10 and 20 mg. Ampoule 1,25 mg/mL (limited IV use).',
        dose: 'Hypertension: 5–20 mg/day PO in 1–2 doses. Heart failure: start 2,5 mg PO 1–2 times/day and titrate.',
        administration: 'PO with or without food.',
      },
      pediatrico: {
        dose: 'PO: Children: initial: 0,08 mg/kg/day every 24 h, maximum dose: < 12 years: 0,6 mg/kg/day; > 12 years: 40 mg/day; adolescents and adults: 2,5–5 mg/day, usual dose for hypertension: 10–40 mg/day. IV (enalaprilat): Children: 5–10 µg/kg/dose every 8–24 h; adolescents and adults: 0,625–1,25 mg/dose every 6 h.',
        administration: 'PO',
        presentation: 'Tablets: 5–10 mg; Oral solution (compounded): 2 mg/mL (0,1 mg/drop) See formulation',
        notes: 'With potassium-sparing diuretics may cause hyperkalemia. Caution in sodium-depleted patients. Dialyzable. See preliminary guide for prevention of medication-related teratogenesis.',
      },
    },
    stability: '## Stability\n\n- Tablets: store per package insert at room temperature.\n- IV solution: use immediately after preparation.',
    adverseEffects: '## Adverse effects\n\nCutaneous reactions, taste disturbances, vertigo, headache, neutropenia, orthostatic hypotension, cough. Teratogenic.',
    bibliography: [BIB.garrahan('Enalapril Maleato', ' (code 0082, ATC C09AA)'), BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'eri-001', name: 'Erythromycin', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Macrolide. Infections caused by susceptible bacteria; neonatal ophthalmic prophylaxis; gastric motility stimulation in selected cases.',
    indications: '## Indications\n\n- Infections caused by susceptible bacteria (respiratory, skin, otitis).\n- Prophylaxis of neonatal ophthalmia (ophthalmic ointment).\n- Gastric motility stimulation per protocol.\n\n' + ADJUST,
    dilution: {
      adulto: {
        presentation: 'Tablets; IV vial 1 g.',
        dose: '250–500 mg PO every 6 h or 500 mg–1 g IV every 6 h.',
        administration: 'PO or IV.',
      },
      pediatrico: {
        presentation: 'Tablets; suspension; IV vial 1 g.',
        administration: 'PO; IV.',
        dose: '30–50 mg/kg/day divided every 6 h.',
        notes: 'Adjust in hepatopathy. Interactions with cisapride, terfenadine and other CYP3A4 substrates.',
      },
      neonatal: {
        dose: 'Ocular prophylaxis: 0,5% ointment per protocol. IV/PO per NICU indication.',
        administration: 'Ophthalmic topical or PO/IV.',
      },
    },
    stability: '## Stability\n\n- IV unstable; use promptly after reconstitution.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, diarrhea, QT prolongation, hepatotoxicity, hypersensitivity reactions.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'esp-001', name: 'Spironolactone', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Potassium-sparing diuretic, aldosterone antagonist, for treatment of edema and diuretic-induced hypokalemia.',
    indications: `${MAIN}\n\nPotassium-sparing diuretic, aldosterone antagonist, for treatment of edema and diuretic-induced hypokalemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 25–100 mg.',
        dose: '25–50 mg PO every 24 h; ascites: 100–400 mg/day in regimens.',
        administration: 'PO.',
      },
      pediatrico: {
        dose: 'Initial: 1 mg/kg/day every 12–24 h, maximum dose: 3,3 mg/kg/day (up to 100 mg/day). Adults: Edema, hypokalemia: 25 mg–200 mg every 12–24 h; Hypertension: 25 mg–50 mg/day.',
        administration: 'PO',
        presentation: 'Tablets: 25–100 mg; Suspension (compounded): 5 mg/mL',
        notes: 'Contraindicated in hyperkalemia, hyponatremia, severe renal failure, anuria. With nonsteroidal anti-inflammatory drugs, cyclosporine, potassium salts: high risk of hyperkalemia. May potentiate effects of antihypertensive drugs and other diuretics.',
      },
      neonatal: {
        dose: '1–3 mg/kg/day per NICU diuretic protocol.',
        administration: 'PO.',
      },
    },
    stability: '## Stability\n\n- PO stable.',
    adverseEffects: '## Adverse effects\n\nHyperkalemia, hyponatremia, headache, anorexia, nausea, diarrhea, vomiting, gynecomastia in males, menstrual disturbances in females.',
    bibliography: [BIB.garrahan('Espironolactona', ' (code 0085, ATC C03DA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'est-001', name: 'Streptomycin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiotic. Antituberculous agent.',
    indications: `${MAIN}\n\nAntibiotic. Antituberculous agent.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lyophilized powder vial containing 1 g (Streptomycin Richet).',
        reconstitution: '4,5 mL SWFI or 0.9% NaCl (100 mg/mL).',
        administration: 'IM: Yes. Reconstitute 1 g with 4,5 mL SWFI or 0.9% NaCl and administer deep IM.',
      },
      pediatrico: {
        dose: 'Neonates: reserved only for patients with resistance to other aminoglycosides. Children: 15–20 mg/kg/day, maximum dose: 1 g/day',
        administration: 'IM; IV (special cases)',
        presentation: 'Powder vial: 1 g',
        notes: 'Adjust dose in renal insufficiency. For IV administration (only for patients who do not tolerate IM injection and with Infectious Diseases authorization) dilute dose in 100 mL 0.9% NaCl and infuse over 30–60 minutes via peripheral or central line. See tuberculosis treatment guide. See preliminary guide for prevention of medication-related teratogenesis.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 48 h refrigerated.\n\n## Diluted solution (for administration)\n\n- Not applicable.',
    adverseEffects: '## Adverse effects\n\nOtotoxicity, nephrotoxicity, perioral paresthesia. With IM injection: hypersensitivity reactions.',
    bibliography: [BIB.garrahan('Estreptomicina', ' (code 0086, ATC J01GA)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'fer-001', name: 'IV iron sucrose', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Microcytic hypochromic anemia.',
    indications: `${MAIN}\n\nMicrocytic hypochromic anemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial 100 mg elemental iron.',
        dose: 'Total dose calculated by deficit; typical 200 mg IV over 15–30 min.',
        administration: 'Slow IV in dilution.',
      },
      pediatrico: {
        dose: 'All doses are expressed as elemental iron. Requirements: 0–1 year: 6 to 10 mg/day, 1–10 years: 10 mg; > 10 years: 12 to 15 mg/day. Anemia treatment: 3 mg/kg/day. Prophylaxis in preterm newborn: 2 mg/kg/day.',
        administration: 'PO',
        presentation: 'Tablets: 200 mg ferrous sulfate (60 mg elemental iron); Drops: 125 mg ferrous sulfate/mL (1 dropper = 0,6 mL = 15 mg elemental iron); Carbohydrate-free solution (compounded): 125 mg ferrous sulfate/mL',
        notes: 'Administer separately from milk. Vitamin C increases absorption. Antacids and vitamin E decrease absorption. Important: specify in mL or droppers since the salt is confused with elemental iron.',
      },
      neonatal: {
        dose: 'Limited use; neonatal hematology regimens.',
        administration: 'IV.',
      },
    },
    stability: '## Stability\n\n- Use prepared dilution immediately.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, anorexia, constipation, diarrhea, epigastric pain.',
    bibliography: [BIB.garrahan('Hierro (como Sulfato Ferroso)', ' (code 0093, ATC B03AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'flc-001', name: 'Flecainide', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Ventricular arrhythmias refractory to other agents. Paroxysmal supraventricular tachycardia.',
    indications: `${MAIN}\n\nVentricular arrhythmias refractory to other agents. Paroxysmal supraventricular tachycardia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 100 mg.',
        dose: '100 mg PO every 12 h; titrate to 150 mg every 12 h according to response.',
        administration: 'PO.',
      },
      pediatrico: {
        dose: 'Children: 1–5 mg/kg/day every 8 h. Adults: 100 mg every 12 h, increasing dosage every 4 days according to need and tolerance. Maximum dose: 400 mg/day.',
        administration: 'PO',
        presentation: 'Tablets: 100 mg',
        notes: 'Caution in patients with hepatic and/or renal insufficiency. Dairy products may interfere with absorption in infants. When used with amiodarone, reduce flecainide dose by 50%. When given concomitantly with propranolol, levels of both drugs increase. Flecainide may increase plasma concentration of digoxin.',
      },
    },
    stability: '## Stability\n\n- Store per package insert.',
    adverseEffects: '## Adverse effects\n\nBlurred vision, nausea, headache, vomiting, tremor, paresthesia, ventricular tachyarrhythmias, elevated transaminases.',
    bibliography: [BIB.garrahan('Flecainida*', ' (code 0368, ATC C01BC)'), BIB.heartAfib, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'fny-001', name: 'Phenytoin', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsant.',
    indications: `${MAIN}\n\nAnticonvulsant.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 50 mg/mL.',
        dose: 'Loading 15–20 mg/kg IV (max. 1500 mg) at ≤ 50 mg/min.',
        infusionRate: 'Do not exceed 50 mg/min.',
        administration: 'IV in 0.9% NaCl (not 5% dextrose).',
      },
      pediatrico: {
        presentation: 'Phenytoin sodium: Capsules: 100 mg; Suspension: 25 mg/mL; 2 mL ampoules: 50 mg/mL; Phenytoin calcium: Tablets: 100 mg',
        administration: 'PO; IV',
        diluent: '0.9% NaCl or Ringer. NOT dextrose.',
        finalConcentration: '1 to 10 mg/mL.',
        infusionRate: '50 mg/min with continuous infusion pump.',
        dose: 'IV loading dose: 15–20 mg/kg, maximum dose: 1500 mg. IV – PO maintenance: 5–8 mg/kg/day every 12 h. Adults: 300 mg/day every 8–12 h',
        notes: 'Monitor CBC, Ca, P, alkaline phosphatase every 6 months. PO: administer away from dairy products. IV push: infusion rate neonates: 0,5 mg/kg/minute; children and adults: 1–3 mg/kg/minute (maximum: 50 mg/min). Intermittent infusion (not recommended): dilute in 0.9% NaCl at concentration < 6 mg/mL. Separate administration by 2 h from antacids and enteral nutrition. Numerous drug interactions (metabolism induction or inhibition). Isoniazid increases risk of phenytoin toxicity: ataxia, hyperreflexia, nystagmus, tremor. Adjust phenytoin dose with serum level. See preliminary guide for prevention of medication-related teratogenesis.',
      },
      neonatal: {
        dose: '15–20 mg/kg loading; maintenance per NICU levels.',
        administration: 'Very slow IV.',
      },
    },
    stability: '## General\n\n- Precipitates with 5% dextrose; use 0.9% NaCl.\n\n## Pediatric guide\n\n- Administer within 4 h after dilution.',
    adverseEffects: '## Adverse effects\n\nHirsutism, gingival hyperplasia, ataxia, nystagmus, nausea, vomiting, hematologic abnormalities, calcium metabolism disturbance. With rapid administration: arrhythmias.',
    bibliography: [BIB.garrahan('DifenilhiDANTOÍNA sódica (Fenitoína)', ' (code 0072, ATC N03AB)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nEN Garrahan batch 6 (part A): ${drugs.length} monographs`);
