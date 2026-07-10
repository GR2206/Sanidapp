#!/usr/bin/env node
/** Garrahan re-translation batch 7/8 — 13 EN monographs (part A) */
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
  anmat: { citation: 'ANMAT. Drug information and authorized prescribing information in Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). ICU medication guidelines.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Argentine Society of Cardiology. Clinical practice guidelines.', url: 'https://www.sac.org.ar/' },
  sag: { citation: 'Argentine Society of Gynecology and Obstetrics. Obstetric protocols.', url: 'https://www.sag.org.ar/' },
  sadiUcip: { citation: 'Infectious Diseases Service, Infection Prevention and Control. UCIP 2026 — Dilution and stability guide.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Argentine Society of Infectious Diseases (SADI). Guidelines and consensus statements.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Clinical practice guidelines.', url: 'https://www.idsociety.org/' },
};

const drugs = [
  {
    id: 'lvt-001', name: 'Levetiracetam', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsant.',
    indications: `${MAIN}\n\nAnticonvulsant.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial 500 mg/5 mL IV; tablets PO.',
        dose: 'Loading 60 mg/kg IV (max. 4500 mg); maintenance 500–1500 mg every 12 h PO.',
        administration: 'IV over 15 min or PO.',
      },
      pediatrico: {
        presentation: 'Tablets: 500 - 1000 mg; Oral solution: 100 mg/ml; Powder vial 5 ml: 100 mg/ml',
        administration: 'PO; IV',
        diluent: '0.9% NaCl, 5% dextrose, Ringer.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '15 min with continuous infusion pump.',
        dose: '4 to 16 years: initial: 10 - 20 mg/kg/day every 12 h, increase 10 - 20 mg/kg/day every 2 weeks up to a maximum of 60 mg/kg/day every 12 h. Adults: initial: 500 mg every 12 h, increase 1000 mg/day every 2 weeks up to a maximum of 3000 mg/day. Adjust dose in renal insufficiency and hemodialysis. See levetiracetam dose adjustment in patients with altered renal function.',
        notes: 'IV administration: Dilute dose in 100 ml of normal saline or 5% dextrose and administer over 15 min (neonates: 5 mg/ml). Taper drug gradually to minimize increased seizure frequency.',
      },
      neonatal: {
        dose: 'Loading 40–60 mg/kg; maintenance per NICU protocol.',
        administration: 'IV.',
      },
    },
    stability: '## General\n\n- IV dilution stable 4 h at room temperature per package insert.\n\n## Pediatric guide\n\n- Discard remainder once opened. Dilution stable 24 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nAsthenia, depression, nervousness, somnolence, infection, ataxia, dizziness, vertigo, seizures.',
    bibliography: [BIB.garrahan('levETIRAcetam*', ' (code 1536, ATC N03AX)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mep-001', name: 'Methylprednisolone', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anti-inflammatory and immunosuppressant. Spinal cord injury.. Treatment of rejection in glomerulopathies (lupus, etc.).',
    indications: `${MAIN}\n\nAnti-inflammatory and immunosuppressant. Spinal cord injury.. Treatment of rejection in glomerulopathies (lupus, etc.).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial 40–125 mg.',
        dose: 'Asthma: 60–125 mg IV. MS relapse: 1 g/day x 3–5 days (protocol).',
        administration: 'Slow IV or infusion.',
      },
      pediatrico: {
        presentation: 'Lyophilized powder vial: 500 mg',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '125 mg/mL.',
        infusionRate: '20 to 60 min with continuous infusion pump.',
        dose: 'Anti-inflammatory and immunosuppressant: IV: 30 mg/kg in a single dose, followed by 15 - 30 mg/kg/day or 600 mg/m²/day every 24 h for 3 days; Spinal cord injury: IV: 30 mg/kg followed by 5,4 mg/kg/hour for 23 h; Rejection treatment - glomerulopathies: IV: 10 mg/kg/dose for 3 consecutive days, maximum dose: 1 g/dose; ventricular tachycardia - silent lymphocytic myocarditis: 30 mg/kg/day in a single dose for 3 doses. See equivalent corticosteroid doses.',
        notes: 'Powder vial reconstitution: add only the diluent provided in the package or sterile water for injection; stable 48 h at room temperature. IV infusion: dilute in normal saline (preferably) or 5% dextrose at a recommended concentration of 2,5 - 20 mg/ml and administer over 30 - 120 minutes. IV push: maximum recommended concentration 125 mg/ml. For doses < 250 mg infuse over no less than 5 minutes; doses ≥ 250 mg infuse over no less than 30 minutes. With high doses antiacid prophylaxis may be required. See considerations for safe corticosteroid therapy. See corticosteroid update.',
      },
      neonatal: {
        dose: 'Restricted use; pulmonary/DAH regimens per NICU.',
        administration: 'IV.',
      },
    },
    stability: '## General\n\n- Reconstitute per package insert.\n\n## Pediatric guide\n\n- 48 h at room temperature once reconstituted.',
    adverseEffects: '## Adverse effects\n\nHypertension, hyperglycemia, peptic ulcer, myopathy, growth arrest, cataracts, osteoporosis, posterior subcapsular cataracts, cushingoid syndrome, hypokalemic alkalosis, edema, increased susceptibility to infections, osteonecrosis.',
    bibliography: [BIB.garrahan('metilprednisoLOna', ' (code 0137, ATC H02AB)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'min-001', name: 'Minocycline', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tetracycline antibiotic used to treat bacterial infections including pneumonia and other respiratory tract infections, certain skin and soft tissue infections, eye infections, lymphatic system infections, digestive tract infections, reproductive system infections, and urinary tract infections.',
    indications: `${MAIN}\n\nTetracycline antibiotic used to treat bacterial infections including pneumonia and other respiratory tract infections, certain skin and soft tissue infections, eye infections, lymphatic system infections, digestive tract infections, reproductive system infections, and urinary tract infections.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Capsules 100 mg.',
        dose: '100 mg PO every 12 h.',
        administration: 'PO with plenty of water.',
      },
      pediatrico: {
        presentation: 'Tablets: 50 - 100 mg',
        administration: 'PO',
        dose: 'Skin and soft tissue infections: > 8 years: loading: 4 mg/kg, then 2 mg/kg/dose every 12 h; maximum: 200 mg/day, in case of infections due to multidrug-resistant organisms (Acinetobacter sp, S maltophilia, Nocardia) maximum daily dose 400 mg; adults: loading: 200 mg, then 100 mg/dose every 12 h, in case of infections due to multidrug-resistant organisms (Acinetobacter sp, S maltophilia, Nocardia) 200 mg/dose every 12 h.',
        notes: 'May be taken with or without food; drink a glass of water with each dose. With prolonged therapy perform hematologic, renal and hepatic monitoring. Interactions: antacids with iron, aluminum, calcium and magnesium decrease absorption. Reduce anticoagulant dose because it increases their effect.',
      },
    },
    stability: '## Stability\n\n- Store per package insert; protect from light.',
    adverseEffects: '## Adverse effects\n\nPermanent tooth discoloration and inhibition of bone development in children, anorexia, nausea, vomiting, diarrhea, urticaria, rash, dermatitis, superinfection, hemolytic anemia, thrombocytopenia, eosinophilia.',
    bibliography: [BIB.garrahan('minoCICLina clorhidrato', ' (code 1359, ATC J01AA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'mox-001', name: 'Moxifloxacin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibacterial for treatment of drug-resistant tuberculosis.',
    indications: `${MAIN}\n\nAntibacterial for treatment of drug-resistant tuberculosis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 400 mg; IV 400 mg.',
        dose: '400 mg PO/IV every 24 h.',
        administration: 'PO or IV.',
      },
      pediatrico: {
        presentation: 'Tablets: 400 mg',
        administration: 'PO; Ophthalmic',
        dose: 'Infants and children < 15 years: 10 mg/kg/day every 24 h, maximum dose: 400 mg; adolescents and > 15 years: 400 mg every 24 h.',
        notes: 'Precautions: monitor for signs of tendinitis or tendon rupture; rupture risk increases with concomitant corticosteroid use. Use with caution in patients with CNS disorders because quinolones may cause seizures. Caution with drugs that lower K levels (e.g. loop and thiazide diuretics, laxatives, corticosteroids, amphotericin B) or associated with clinically significant bradycardia. Interactions: additive effect on QT prolongation when administered simultaneously with drugs that may affect QT. Space 6 h from antacids with Mg and Al, sucralfate, didanosine, and agents with Fe and Zn. Increases effect of oral anticoagulants; increased INR monitoring. See tuberculosis treatment guide.',
      },
    },
    stability: '## Stability\n\n- IV: use per bag or dilution package insert.',
    adverseEffects: '## Adverse effects\n\nSuperinfections due to resistant bacteria or fungi, such as oral and vaginal candidiasis; headache, dizziness, insomnia, confusion, agitation, hallucinations; QT prolongation in patients with hypokalemia; nausea, vomiting, abdominal pain and diarrhea; increased transaminases.',
    bibliography: [BIB.garrahan('MOXIfloxacina*', ' (code 1765, ATC J01MA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'mtp-001', name: 'Metoclopramide', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antiemetic, antinauseant.',
    indications: `${MAIN}\n\nAntiemetic, antinauseant.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 10 mg/2 mL.',
        dose: '10 mg slow IV every 6–8 h PRN.',
        administration: 'Slow IV.',
      },
      pediatrico: {
        presentation: 'Tablets: 10 mg; Pediatric drops: 2 mg/ml (0,1 mg/drop); Adult drops: 5 mg/ml; Ampoules 2 ml: 5 mg/ml',
        administration: 'PO; IV; IM',
        diluent: '0.9% NaCl.',
        finalConcentration: '0,2 to 5 mg/mL.',
        infusionRate: 'No less than 15 min.',
        dose: 'Children: 0,4 - 0,8 mg/kg/day every 6 h; adults: 10 - 15 mg/dose every 6 h. For chemotherapy: IV - PO: 1 - 2 mg/kg/dose, every 2 - 4 h for 2 to 5 doses, if nausea and/or vomiting continue: 0,5 mg/kg or 30 mg; every 4 - 6 h for 5 days. Postoperative: children: 0,1 - 0,2 mg/kg/dose every 6 - 8 h; > 14 years and adults: 10 mg every 6 - 8 h. Maximum dose is that preceding extrapyramidal effects.',
        compatibility: 'Incompatible with cephalothin and sodium bicarbonate.',
        notes: 'Use with caution and reduce dose in renal insufficiency, hypertension or depression. Antimuscarinics and opioid analgesics antagonize metoclopramide effect on the gastrointestinal tract; antipsychotics increase risk of extrapyramidal effects. Metoclopramide increases effects of paracetamol and aspirin.',
      },
      neonatal: {
        dose: 'Restricted use; 0,1 mg/kg per NICU protocol.',
        administration: 'IV.',
      },
    },
    stability: '## General\n\n- Use after withdrawal.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nExtrapyramidal symptoms (more common in children and young adults, especially after high IV doses), seizures, neuroleptic malignant syndrome. Occasionally: somnolence, restlessness, depression, diarrhea.',
    bibliography: [BIB.garrahan('MetoCLOPRAMIDA', ' (code 0138, ATC A03FA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ngl-001', name: 'Nitroglycerin', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Short-acting coronary vasodilator. IV, peripheral and pulmonary hypotensive agent.',
    indications: `${MAIN}\n\nShort-acting coronary vasodilator. IV, peripheral and pulmonary hypotensive agent.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per package insert; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: 'Start 5–10 mcg/min; increase every 3–5 min until effect (max. per protocol).',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output and peripheral perfusion.',
      },
      pediatrico: {
        presentation: 'Ampoules 5 ml: 5 mg/ml',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '< 400 mcg/mL.',
        infusionRate: 'Continuous infusion pump only.',
        dose: '0,5-10 µg/kg/minute.',
        compatibility: 'Do not administer concomitantly with other medication. May antagonize anticoagulant effect of heparin.',
        notes: 'For continuous infusion dilute in 5% dextrose or normal saline at a concentration of 50-100 µg/ml (maximum concentration: 400 µg/ml). Decreases anticoagulant effect of heparin. Beta-blockers and calcium channel blockers may increase hypotensive effect of nitroglycerin.',
      },
      neonatal: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per package insert; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: '0,5–3 mcg/kg/min in NICU; monitor BP.',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output and peripheral perfusion.',
      },
    },
    stability: '## General\n\n- Use glass/polyethylene bag per package insert; protect from light.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nVertigo, headache, tachycardia, nausea, hypotension, dizziness, exfoliative dermatitis.',
    bibliography: [BIB.garrahan('nitroGLICERINA', ' (code 0150, ATC C01CA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nif-001', name: 'Nifedipine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Arterial vasodilator. Calcium channel blocker.',
    indications: `${MAIN}\n\nArterial vasodilator. Calcium channel blocker.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Extended-release tablets 30 and 60 mg. Capsules 10 mg.',
        dose: 'Hypertension: 30–60 mg/day PO ER. Tocolysis/obstetric: per maternity protocol.',
        administration: 'PO. Do not crush or chew ER formulations.',
      },
      pediatrico: {
        dose: 'Controlled-release tablets: 0,25-0,5 mg/kg/day, every 12-24 h; maximum dose: 3 mg/kg/day (up to 120 mg/day). Adults: Initial: controlled-release tablets: 30 to 60 mg/day every 24 h; maximum dose: 120 mg/day (controlled-release tablets).',
        administration: 'PO; SL',
        presentation: 'Controlled-release tablets: 30 mg',
        notes: 'Interactions: increases adverse effects of beta-blockers; increases serum concentration of digoxin; rifampin decreases nifedipine levels; with cyclosporine gingival hyperplasia is exacerbated.',
      },
    },
    stability: '## Stability\n\n- Store per package insert.',
    adverseEffects: '## Adverse effects\n\nFlushing, headache, nausea, cutaneous reactions, lower extremity edema, tachycardia, palpitations, gingival hyperplasia.',
    bibliography: [BIB.garrahan('NIFEdipina', ' (code 0240, ATC C08CA)'), BIB.heartHtn, BIB.anmat, BIB.sag, BIB.aap],
  },
  {
    id: 'nip-001', name: 'Sodium nitroprusside', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Arterial and venous vasodilator.',
    indications: `${MAIN}\n\nArterial and venous vasodilator.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per package insert; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: '0,3–10 mcg/kg/min titrated; maximum infusion time per protocol.',
        infusionRate: 'Continuous infusion protected from light.',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output and peripheral perfusion.',
      },
      pediatrico: {
        presentation: 'Powder vial: 50 mg',
        administration: 'IV',
        diluent: '5% dextrose ONLY.',
        finalConcentration: 'Usual 200 mcg/mL. With fluid restriction, 1000 mcg/mL.',
        infusionRate: 'Continuous infusion pump only, according to BP.',
        dose: 'Initial: 0,5-1 µg/kg/min, maintenance: up to 4-6 µg/kg/min',
        notes: 'Dilute in 5% dextrose at a concentration of 0,2 mg/ml (maximum dilution concentration: 1 mg/ml); dilution lasts 24 h if kept protected from light.',
      },
    },
    stability: '## General\n\n- Protect strictly from light; discard if solution blue/gray.\n\n## Pediatric guide\n\n- 24 h once reconstituted. 24 h once diluted.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, sweating, restlessness, headache, palpitations. Thiocyanate intoxication.',
    bibliography: [BIB.garrahan('nitroPRUSIATO de Sodio', ' (code 0151, ATC C02DD)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nsh-001', name: 'Hypertonic sodium chloride', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hyponatremia.',
    indications: `${MAIN}\n\nHyponatremia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule/bag NaCl 3% or 23,4%.',
        dose: '3%: 100–150 mL bolus in cerebral edema. Hyponatremia: per deficit calculation.',
        administration: 'Central IV for 23,4%.',
      },
      pediatrico: {
        dose: 'Requirements: 2 mEq/kg/day. Hyponatremia treatment: etiologic treatment first. Acute symptomatic hyponatremia with Na <130: (theoretical Na - actual Na) x 0,6 x weight (kg) = mEq Na to administer as 3% NaCl over 1- 4h. See CIME Electrolytes Bulletin.',
        administration: 'PO; IV',
        presentation: 'Ampoules: 200 mg/ml (3,4 mEq Na/ml); Oral solution (compounded): 233 mg/ml (4 mEq Na/ml)',
        notes: 'Do not correct natremia more than 10 mEq/liter at a time. Do not administer 20% IV undiluted. Caution in patients with congestive heart failure, severe renal insufficiency, sodium retention with edema, neonates with hyperbilirubinemia. Pseudohyponatremia: for each 62 mg% increase in glucose, a 1 mEq decrease in Na concentration occurs.',
      },
      neonatal: {
        dose: 'Hypertonic bolus per neuro-NICU protocol.',
        administration: 'Central IV.',
      },
    },
    stability: '## Stability\n\n- Ready-to-use solution; double-check concentration.',
    adverseEffects: '## Adverse effects\n\nEdema, nausea, vomiting.',
    bibliography: [BIB.garrahan('Sodio CLORURO', ' (code 0313, ATC A12CA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ose-001', name: 'Oseltamivir', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of influenza (A or B) in adults and children > 1 year within the first 2 days of symptom onset. Influenza prophylaxis in patients > 13 years. Neuraminidase inhibitor.',
    indications: `${MAIN}\n\nTreatment of influenza (A or B) in adults and children > 1 year within the first 2 days of symptom onset. Influenza prophylaxis in patients > 13 years. Neuraminidase inhibitor.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Capsules 75 mg; suspension.',
        dose: '75 mg PO every 12 h x 5 days (treatment).',
        administration: 'PO with or without food.',
      },
      pediatrico: {
        dose: 'Treatment (treatment duration: 5 days): Term newborn (TNB) < 15 days: 3 mg/kg/dose every 24 h; TNB > 15 days: 3 mg/kg/dose every 12 h; Preterm newborn (PTNB) corrected GA < 38 weeks: 1 mg/kg/dose every 12 h; PTNB corrected GA 38 - 40 weeks: 1,5 mg/kg/dose every 12 h. Maximum neonatal dose: 12 mg total every 12 h, start within 48 h of symptom onset. 3 months to 1 year: 3 mg/kg/dose every 12 h; > 1 to 12 years: <15 kg: 30 mg every 12 h; 15 to 23 kg: 45 mg every 12 h; 23 to 40 kg: 60 mg every 12 h; > 40 kg and adults: 75 mg every 12 h. Prophylaxis: Not recommended in neonates; adolescents and adults: 75 mg/day for 10 days. Dose adjustment in renal insufficiency: Cr Cl 10-30 ml/min reduce dose frequency: treatment: every 24 h, prophylaxis: every 48 h.',
        administration: 'PO',
        presentation: 'Capsules: 75 mg; Suspension: 12 mg/ml; Syrup (compounded): 15 mg/ml',
        notes: 'Treatment should begin within 48 h of symptom onset. Prophylaxis begin within 2 days of contact. Do not administer with live attenuated influenza vaccine or any medication containing salicylates (aspirin) due to Reye syndrome risk; for fever reduction paracetamol or other NSAIDs are recommended. Prophylactic-dose ranitidine is recommended as it may cause gastrointestinal bleeding; monitor hepatic enzymes.',
      },
      neonatal: {
        dose: '1–3 mg/kg/dose PO every 12 h per NICU influenza protocol.',
        administration: 'PO.',
      },
    },
    stability: '## Stability\n\n- Suspension refrigerated per package insert.',
    adverseEffects: '## Adverse effects\n\nInsomnia, vertigo, nausea, vomiting, abdominal pain, conjunctivitis, epistaxis, ear disorders. Behavioral disturbances. Delirium, suicidal ideation.',
    bibliography: [BIB.garrahan('Oseltamivir Fosfato*', ' (code 1611, ATC J05AH)'), BIB.idsa, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'phb-001', name: 'Phenobarbital', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsant, hypnotic.',
    indications: `${MAIN}\n\nAnticonvulsant, hypnotic.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 200 mg/mL.',
        dose: 'Loading 15–20 mg/kg slow IV; maintenance 1–3 mg/kg/day.',
        administration: 'Very slow IV.',
      },
      pediatrico: {
        presentation: 'Tablets: 15-100 mg; Ampoules 2 ml: 50 mg/ml; Solution (compounded): 20 mg/ml See Formulation',
        administration: 'PO; IV; IM',
        diluent: '0.9% NaCl.',
        finalConcentration: '1 mg/mL.',
        infusionRate: '30 mg/min with continuous infusion pump.',
        dose: 'Loading (IV; IM): 20 mg/kg/dose, maximum dose: 1 g. Maintenance (PO; IV): 3-5 mg/kg/day every 12-24 h. Adults: 100 mg every 12 h, maximum dose: 600 mg. Renal insufficiency with glomerular filtration < 10 ml/min/1,73 m²: reduce dose by 50% and administer every 24 h; intermittent hemodialysis (20-50% dialyzed): an extra dose may be necessary, administer a dose during and after; peritoneal dialysis (40-50% dialyzed, depending on number of cycles); continuous replacement therapy: monitor serum levels, in some cases higher and more frequent doses may be necessary. Hepatic insufficiency: although dose reduction is recommended, no specific dose adjustment exists.',
        notes: 'In both hepatic and renal insufficiency frequent serum level monitoring is recommended; in some cases higher and more frequent doses may be necessary. Enzyme inducer, reduces plasma concentration of: carBAMazepine, clonazePAM, lamoTRIgina, valproate. Anticonvulsant effects are antagonized by antidepressants and antipsychotics. Administer undiluted or dilute with equal volume of normal saline. Maximum infusion rate: children: 30 mg/min, adults or > 60 kg: 60 mg/min. See preliminary guide for prevention of medication-related teratogenesis.',
      },
      neonatal: {
        dose: 'Loading 15–20 mg/kg; maintenance 3–4 mg/kg/day (NICU).',
        administration: 'IV.',
      },
    },
    stability: '## General\n\n- Do not mix with other drugs in Y-site.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nSomnolence, irritability and hyperactivity, ataxia, cutaneous rash, cardiorespiratory depression.',
    bibliography: [BIB.garrahan('FENobarbital', ' (code 0092, ATC N03AA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pos-001', name: 'Posaconazole', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of invasive fungal infections (IFI) when other first-line drugs cannot be used or have proven ineffective (aspergillosis, fusariosis, chromoblastomycosis, mycetoma, coccidioidomycosis) and as first-line treatment in selected patients',
    indications: `${MAIN}\n\nTreatment of invasive fungal infections (IFI) when other first-line drugs cannot be used or have proven ineffective (aspergillosis, fusariosis, chromoblastomycosis, mycetoma, coccidioidomycosis) and as first-line treatment in selected patients with oropharyngeal candidiasis.\nProphylaxis of IFI in immunocompromised patients (patients with acute myeloid leukemia, or myelodysplastic syndrome under chemotherapy or hematopoietic stem cell transplant under immunosuppressive treatment).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Solution for concentrate for solution for infusion containing 300 mg in 16,7 mL (18 mg/mL) (Noxafil IV).',
        reconstitution: 'No prior reconstitution required. Conc: 18 mg/mL.',
        diluent: '300 mg in 150-250 mL of 0.9% NaCl, 5% dextrose or Ringer lactate.',
        finalConcentration: '1-2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 150-250 mL of 0.9% NaCl, 5% dextrose or Ringer lactate and administer over 90 min via in-line filter (0,22 µm). Prefer central line.',
        notes: 'Requires 0,22 µm in-line filter. Prefer central line (irritant via peripheral route). Loading dose: 300 mg every 12 h on day 1; maintenance: 300 mg/day. Indicated for prophylaxis and treatment of aspergillosis and other invasive mycoses. Multiple interactions via CYP3A4 inhibition.',
      },
      pediatrico: {
        dose: 'Immediate-release suspension: Prophylaxis: 4 - 6 mg/kg/dose every 8 h, maximum: 400 mg/dose; Treatment: 4 - 6 mg/kg/dose every 6 h Extended-release tablets: ≥ 3 years and adolescents ≤ 17 years: loading dose (x 24 h): 5 - 7 mg/kg/dose every 12 h, maximum: 300 mg/dose), maintenance: 5 - 7 mg/kg/dose every 24 h, maximum 300 mg/dose. Adjust dose by therapeutic drug monitoring (desired range prophylaxis: ≥ 700 ng/mL, treatment: 1000 - 1250 ng/mL)',
        administration: 'PO',
        presentation: 'Modified-release tablets: 100 mg; Oral suspension 105 ml: 40 mg/ml',
        notes: 'Tablet and oral suspension should not be used interchangeably due to dosing differences between formulations. Modified-release tablets may be administered with or without meals; oral suspension should be administered with a meal or nutritional supplement in patients who cannot tolerate a meal to improve absorption. Tablets cannot be split. Concentration increased by verapamil, cyclosporine, clarithromycin, erythromycin. Increases concentration of vincristine, vinblastine (neurotoxicity risk), cyclosporine, tacrolimus, sirolimus (reduce dose when starting posaconazole and monitor blood levels); atazanavir, protease inhibitors (monitor adverse effects), digoxin (monitor levels when starting treatment). Concentration decreased by fosamprenavir, H2 antagonists and proton pump inhibitors.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (for administration)\n\n- 12 h at room temperature, 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nNeutropenia, electrolyte imbalance, anorexia, decreased appetite, hypokalemia, hypomagnesemia, paresthesia, dizziness, somnolence, headache, dysgeusia, hypertension, nausea, vomiting, abdominal pain, diarrhea, dyspepsia, dry mouth, flatulence, constipation, anorectal discomfort, rash, pruritus, fever, asthenia, fatigue.',
    bibliography: [BIB.garrahan('Posaconazol*', ' (code 1742, ATC J02AC)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'pro-001', name: 'Propofol', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anesthetic. Sedation in ventilated patients.',
    indications: `${MAIN}\n\nAnesthetic. Sedation in ventilated patients.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lipid emulsion 10 mg/mL (vial/ampoule).',
        dose: 'Induction 1–2,5 mg/kg IV; sedation 25–75 mcg/kg/min.',
        administration: 'IV undiluted or infusion per protocol.',
        notes: 'Monitor triglycerides and lactic acid with infusion > 48 h.',
      },
      pediatrico: {
        presentation: 'Powder vial/ampoules 20 ml: 10 mg/ml',
        administration: 'IV',
        finalConcentration: 'Administer undiluted.',
        infusionRate: 'Bolus over 20 to 30 seconds.',
        dose: 'Bolus: 2 - 2,5 mg/kg Continuous infusion: 0,25 - 4 mg/kg/h, maximum 48 h for peri-extubation period.',
        notes: 'Rapid-onset, short-duration hypnotic agent. No analgesic effects. Caution in patients with cardiorespiratory instability and lipid metabolism disorders (pancreatitis, primary hyperlipoproteinemia, diabetic hyperlipidemia). Infusion stability: 6 h. May be administered undiluted or diluted in 5% dextrose at concentration > 2 mg/ml. Store refrigerated. See standardized PICU analgosedation preparations.',
      },
      neonatal: {
        dose: 'Restricted use in NICU; sedation regimens per protocol.',
        administration: 'IV.',
      },
    },
    stability: '## General\n\n- Aseptic chain; use within 6–12 h after opening per service policy.\n\n## Pediatric guide\n\n- Do not refrigerate. Discard remainder once opened. Dilution stable 12 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nApnea, pain at injection site. Possible psychomotor excitation and decreased heart rate.',
    bibliography: [BIB.garrahan('Propofol*', ' (code 0434, ATC N01AX)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nEN Garrahan batch 7 (part A): ${drugs.length} monographs`);
