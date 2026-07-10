#!/usr/bin/env node
/** Garrahan re-translation batch 6/8 — 10 EN monographs (part B) */
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
  anmat: { citation: 'ANMAT. Drug information and authorized prescribing information in Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). ICU medication guidelines.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Argentine Society of Infectious Diseases (SADI). Guidelines and consensus statements.', url: 'https://www.sadi.org.ar/' },
  heartHf: { citation: 'American Heart Association. Heart failure guidelines.', url: 'https://www.heart.org/' },
  sac: { citation: 'Argentine Society of Cardiology. Clinical practice guidelines.', url: 'https://www.sac.org.ar/' },
  esc: { citation: 'European Society of Cardiology. Heart failure guidelines.', url: 'https://www.escardio.org/' },
};

const drugs = [
  {
    id: 'fsc-001', name: 'Foscarnet', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of herpes group infections resistant to conventional therapies.',
    indications: `${MAIN}\n\nTreatment of herpes group infections resistant to conventional therapies.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: '500 mL vial: 24 mg/mL',
        administration: 'IV',
        diluent: '0.9% NaCl solution, 5% dextrose.',
        finalConcentration: '12 mg/mL.',
        infusionRate: 'Between 1 and 2 hours with syringe pump.',
        dose: 'CMV retinitis: Induction: 90 mg/kg/dose every 12 h or 60 mg/kg/dose every 8 h for 14-21 days; maintenance: 90-120 mg/kg/dose every 24 h. Acyclovir-resistant mucocutaneous herpes simplex: 40 mg/kg/dose every 8-12 h.',
        notes: 'Use with caution in patients with impaired renal function and when other nephrotoxic agents such as amphotericin B, aminoglycosides, cisplatin, and cyclosporine are used. Interacts with pentamidine (increases hypocalcemia), ciprofloxacin (increases risk of seizures). To decrease renal toxicity the patient must be adequately hydrated. Via central catheter infuse undiluted. Via peripheral vein the solution must be diluted to a maximum final concentration of 12 mg/mL. Infusion rate must not exceed 60 mg/kg/hour. Each gram of sodium foscarnet contains 10 mmol of sodium and 3.3 mmol of phosphate.',
      },
    },
    stability: '## Pediatric guide\n\n- Do not refrigerate.',
    adverseEffects: '## Adverse effects\n\nRenal insufficiency, hypercalcemia, hyper or hypophosphatemia, metabolic alterations. Magnesium alterations.',
    bibliography: [BIB.garrahan('Foscarnet*', ' (code 1128, ATC J05AD)'), BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'fur-001', name: 'Furosemide', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Loop diuretic.',
    indications: `${MAIN}\n\nLoop diuretic.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 10 mg/mL.',
        dose: '20–40 mg slow IV; 40–80 mg in acute pulmonary edema per protocol.',
        administration: 'Slow IV or IM.',
      },
      pediatrico: {
        presentation: 'Tablets: 40 mg; Drops: 20 mg/mL (1 mg/drop) See formulation; 2 mL ampoules: 10 mg/mL.',
        administration: 'PO; IV',
        diluent: '0.9% NaCl solution, 5% dextrose.',
        finalConcentration: '10 mg/mL.',
        infusionRate: '4 mg/min.',
        dose: 'Neonates and preterm infants: PO: 1-4 mg/kg/dose every 12-24 h; IV: 1-2 mg/kg/dose every 12-24 h. Infants and children: IV: 1 mg/kg/dose every 6-12 h, continuous infusion: 0.05 mg/kg/hour; PO: initial: 0.5 - 2 mg/kg/dose every 12-24 h; maximum PO dose: 6 mg/kg/day. Adults: PO/IV: 20-80 mg/day every 6-12 h, maximum 600 mg/day. Patients with renal failure may require higher doses to induce diuresis.',
        notes: 'Administer with food. For IV infusion dilute in normal saline (stable dilution 24 h). Maximum administration rate is 4 mg/min. Protect from light if administered undiluted. NSAIDs may reduce the antihypertensive and diuretic effects of the drug. Increases risk of hypokalemia with thiazides and corticosteroids. Increases risk of ototoxicity with aminoglycosides. Slow administration prevents ototoxicity.',
      },
      neonatal: {
        dose: '0.5–1 mg/kg/dose every 12–24 h (NICU).',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- Use immediately; protect from light in storage.\n\n## Pediatric guide\n\n- 24 h once diluted.',
    adverseEffects: '## Adverse effects\n\nOtotoxicity, rash, headache, hypotension, muscle pain. In preterm neonates: hypokalemia, hypomagnesemia, hyponatremia, hyperuricemia, nephrocalcinosis, hypocalcemia.',
    bibliography: [BIB.garrahan('Furosemide', ' (code 0099, ATC C03CA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hdr-001', name: 'Hydralazine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antihypertensive. Vasodilator.',
    indications: `${MAIN}\n\nAntihypertensive. Vasodilator.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 20 mg/mL.',
        dose: '5–10 mg IV every 20–30 min; max. 20 mg/dose obstetric.',
        administration: 'Slow IV.',
      },
      pediatrico: {
        dose: 'Infants and children: initial: 0.25 mg/kg/dose 3 to 4 times per day, maximum: 25 mg/dose; increase over 3 to 4 weeks up to infants: 5 mg/kg/day and children: 7.5 mg/kg/day, maximum: 200 mg/day. In patients with mild to moderate renal insufficiency administer every 8 h, in severe renal insufficiency for fast acetylators every 8 to 16 h and slow acetylators every 12 to 24 h. Adults: initial: 10 mg every 6 h, increase 10 to 25 mg/dose every 2 to 5 days up to 300 mg/day. Usual dose range for hypertension: 25 to 100 mg/day in 2 doses.',
        administration: 'PO',
        presentation: 'Tablets: 25 - 50 mg',
        notes: 'Prolonged use of hydralazine may cause pyridoxine deficiency. Indomethacin may decrease the hypotensive effects of hydralazine. Use with caution in patients with severe renal insufficiency. Administer with food.',
      },
      neonatal: {
        dose: '0.1–0.5 mg/kg/dose per cardiology protocol.',
        administration: 'IV.',
      },
    },
    stability: '## Stability\n\n- Use after withdrawal.',
    adverseEffects: '## Adverse effects\n\nPalpitations, tachycardia, edema, orthostatic hypotension, headache, fever, anorexia, nausea, vomiting.',
    bibliography: [BIB.garrahan('Hydralazine', ' (code 1554, ATC C02DB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hio-001', name: 'Hyoscine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Spasmolytic, to inhibit secretion production.',
    indications: `${MAIN}\n\nSpasmolytic, to inhibit secretion production.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Tablets: 10 mg; Ampoules: 20 mg/mL.',
        administration: 'PO; IV; IM; SL; SC',
        diluent: 'SWFI, 0.9% NaCl solution, 5% dextrose.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolus 5 min.',
        dose: 'Antisecretory (adjunct): IV-SC-IM: Infants and < 6 years: 0.3-0.6 mg/kg/dose, maximum dose: 1.5 mg/kg/day; 6 to 12 years: 5 - 10 mg/dose up to 3 times per day, > 12 years: 20 mg/dose up to 4 times per day, adults maximum dose: 100 mg/day. PO: 6 to 12 years: 10 mg/dose every 8 h, > 12 years: 20 mg every 6 h.',
        notes: 'Contraindicated in patients with myasthenia gravis, megacolon, and glaucoma. Hyoscine increases the anticholinergic effects of: anticholinergic antidepressants, antihistamines, amantadine, phenothiazines. Concomitant use with metoclopramide may decrease the gastrointestinal effect of both drugs. The ampoule may be administered PO. See alert',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nDry mouth, tachycardia, visual disturbances, constipation, urinary retention. Allergic reactions.',
    bibliography: [BIB.garrahan('Hyoscine N-Butylbromide', ' (code 0840, ATC A03BA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'imu-001', name: 'Immunoglobulin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Kawasaki disease, idiopathic thrombocytopenic purpura, acquired immunodeficiency syndrome. Replacement therapy per Immunology indication. Varicella prevention in newborns and immunocompromised hosts.',
    indications: `${MAIN}\n\nKawasaki disease, idiopathic thrombocytopenic purpura, acquired immunodeficiency syndrome. Replacement therapy per Immunology indication. Varicella prevention in newborns and immunocompromised hosts.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Powder vial: 2,500 - 5,000 - 10,000 mg (concentration: 50 mg/mL)',
        administration: 'IV',
        diluent: 'Must not be mixed with other intravenous solutions.',
        finalConcentration: '5%.',
        infusionRate: '0.3 to 0.5 mL/kg/h increasing up to 4 mL/kg/h.',
        dose: 'Immunodeficiencies: start 0.4 - 0.8 g/kg, every 3 to 4 weeks. Severe Guillain-Barré syndrome and significant disability: 2 g/kg (divided over 2 to 5 days) before 2 weeks of evolution. Chronic inflammatory demyelinating polyneuropathy: attack dose 2 g/kg over 2 to 5 days, followed by maintenance dose 1 g/kg every 3 - 4 weeks. Autoimmune encephalitis: 2 g/kg over 2 - 5 days. Multifocal motor neuropathy: 2 g/kg, divided over 2 to 5 days. Myasthenia gravis: 1 g/kg, single dose. Idiopathic thrombocytopenic purpura: 0.8 - 1 g/kg, single dose; per specialist criteria may be repeated at 48 h. Kawasaki disease: 2 g/kg, single dose. Pediatric multisystem inflammatory syndrome (PIMS) related to COVID-19: 2 g/kg in a single dose, maximum 100 g. See Therapy for pediatric multisystem inflammatory syndrome related to COVID-19.',
        notes: 'Administration: Inpatient wards: See IV IG infusion templates. Day Hospital: See IV IG infusion template for different brands. See "Use of Gammaglobulin in Pediatrics". See "Intravenous Gammaglobulin Request Form"',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened. Store between 2 and 30°C.',
    adverseEffects: '## Adverse effects\n\nAnaphylaxis, chest pain, dyspnea, shock, headache, fever, chills, nausea, vomiting, myalgias, arthralgias.',
    bibliography: [BIB.garrahan('Human Intravenous Gammaglobulin*', ' (code 0102, ATC J06BA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'ivb-001', name: 'Ivabradine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Heart failure with persistent tachycardia despite beta-blocker use. Exclusively reduces heart rate by selective and specific inhibition of the If current of the cardiac pacemaker that controls spontaneous diastolic depolarization in the sinus node and regulates heart rate.',
    indications: `${MAIN}\n\nHeart failure with persistent tachycardia despite beta-blocker use. Exclusively reduces heart rate by selective and specific inhibition of the If current of the cardiac pacemaker that controls spontaneous diastolic depolarization in the sinus node and regulates heart rate.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 5 and 7.5 mg.',
        dose: 'Start 5 mg PO every 12 h; titrate to 7.5 mg every 12 h according to HR and tolerance.',
        administration: 'PO with meals.',
      },
      pediatrico: {
        dose: '≥ 6 months and < 40 kg: initial 0.05 mg/kg/dose every 12 h, titrate dose according to response after 2 weeks by 0.05 mg/kg until achieving at least a 20% reduction in heart rate. Maximum dose 6 months to 1 year: 0.2 mg/kg/dose every 12 h, > 1 year: 0.3 mg/kg/dose every 12 h (up to 7.5 mg/dose every 12 h). ≥ 6 months and > 40 kg: initial 2.5 mg/dose every 12 h, titrate dose according to response after 2 weeks by 2.5 mg until achieving at least a 20% reduction in heart rate. Maximum dose 7.5 mg/dose every 12 h. If bradycardia occurs consider reducing the dose to the previous dose received or 0.02 mg/kg/dose every 12 h if on the initial dose.',
        administration: 'PO',
        presentation: 'Tablets: 5 mg',
        notes: 'Administer with breakfast and dinner, avoid grapefruit juice. Caution in patients with decompensated acute heart failure, sustained hypotension, sinus node disease, symptomatic bradycardia, severe hepatic failure. Interactions: avoid concomitant use with medications that prolong the QT interval (amiodarone, pentamidine, etc.) as QT prolongation may be exacerbated with the decrease in heart rate. Rifampicin, phenytoin reduce its activity. Potent CYP3A4 inhibitors such as azole antifungals (itraconazole, etc.), macrolide antibiotics (clarithromycin, erythromycin, etc.), HIV protease inhibitors (nelfinavir, ritonavir, etc.) increase plasma concentrations of ivabradine. With potassium-wasting diuretics, risk of serious arrhythmias.',
      },
    },
    stability: '## Stability\n\n- Store per prescribing information.',
    adverseEffects: '## Adverse effects\n\nHeadaches (during the 1st month), dizziness possibly related to bradycardia, luminous phenomena, blurred vision, bradycardia, 1st-degree AV block, extrasystole, atrial fibrillation, uncontrolled blood pressure. ',
    bibliography: [BIB.garrahan('ivaBRADine*', ' (code 2031, ATC C01EB)'), BIB.heartHf, BIB.anmat, BIB.sac, BIB.esc],
  },
  {
    id: 'kcl-001', name: 'Potassium chloride', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hypokalemia.',
    indications: `${MAIN}\n\nHypokalemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoules 10–20 mEq; premix bags.',
        dose: 'Replacement according to deficit and levels; typical 10–40 mEq in dilution.',
        infusionRate: '≤ 10 mEq/h peripheral.',
        administration: 'IV diluted exclusively.',
      },
      pediatrico: {
        dose: 'Potassium requirements: PO/ IV: < 1 year: 2-6 mEq/kg/day; > 1 year: 1-3 mEq/kg/day; adults: 40-80 mEq/day. Symptomatic hypokalemia: IV: neonates, infants, children: 0.5-1 mEq/kg/dose. Asymptomatic hypokalemia: PO: children: 3 mEq/kg/day (plus concurrent losses), adults: 40-100 mEq in divided doses (recommended not to exceed 20 mEq/dose). See CIME Electrolytes Bulletin.',
        administration: 'PO; IV',
        presentation: 'Extended-release capsules: 600 mg (8 mEq K); Oral solution (compounded preparation): 223 mg/mL (3 mEq K/mL) See formulation; Ampoules: 3 mEq/mL',
        notes: 'Caution in renal and adrenal insufficiency. IV: do not administer undiluted (peripheral route: potassium concentration less than 60 mEq/liter due to risk of phlebitis; central route: 150-200 mEq/liter). Infusion rate: < 0.25 mEq/kg/hour. Max infusion: 20 mEq/h. Perform cardiac monitoring during infusion. Compatible solvents: 5% dextrose, normal saline. Increases risk of hyperkalemia with nonsteroidal anti-inflammatory drugs, cyclosporine, digoxin, heparin, potassium-sparing diuretics. Monitor and correct hypomagnesemia. 1 g KCl = 13.5 mEq K.',
      },
      neonatal: {
        dose: '1–2 mEq/kg/day in NICU divided on pump.',
        administration: 'Central IV preferred.',
      },
    },
    stability: '## Stability\n\n- Use dedicated line; verify final concentration.',
    adverseEffects: '## Adverse effects\n\nPO: nausea, vomiting, abdominal pain, diarrhea, hyperkalemia. IV: phlebitis, paresthesias, arrhythmias, block, cardiac arrest.',
    bibliography: [BIB.garrahan('potassium CHLORIDE*', ' (code 0286, ATC A12BA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ktr-001', name: 'Ketorolac', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Nonsteroidal. Analgesic in moderate to severe acute pain, equivalent to opioids. Limited anti-inflammatory efficacy.',
    indications: `${MAIN}\n\nNonsteroidal. Analgesic in moderate to severe acute pain, equivalent to opioids. Limited anti-inflammatory efficacy.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: '1 mL ampoules: 30 mg/mL; 2 mL ampoules: 15 mg/mL; Tablets: 10 mg',
        administration: 'PO; IV',
        diluent: '0.9% NaCl solution, 5% dextrose.',
        finalConcentration: '30 mg/mL.',
        infusionRate: '1 to 5 minutes.',
        dose: 'Children 6 months to 16 years: IV: 0.5 mg/kg/dose (max: 15 mg/dose) every 6 - 8 h; PO: 1 mg/kg/dose every 6 - 8 h, maximum dose: 10 mg/dose. ≥ 17 years, more than 50 kg and adults: IV: 30 mg every 6 - 8 h, maximum dose: 120 mg/day (if the child weighs less than 50 kg do not exceed 60 mg/day), PO: 10 mg every 6 - 8 h, maximum dose: 40 mg/day.',
        compatibility: 'Precipitates concomitantly with morphine.',
        notes: 'Maximum treatment duration: 48 - 72 h. Administration: push over more than 15 seconds or for intermittent infusion dilute in normal saline or 5% dextrose at a concentration of 0.12 mg/mL. Moderate or severe renal insufficiency: contraindicated because ketorolac and its metabolites are eliminated mainly by the renal route. In patients with lesser degree of renal insufficiency administer half the recommended dose, without exceeding a total daily dose of 60 mg, with periodic renal function tests. Dialysis barely allows elimination of ketorolac from the blood.',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nNausea, dyspepsia, epigastric pain, constipation, diarrhea, edema, hypertension, rash, pruritus, purpura, somnolence, dizziness, headache, sweating. Gastrointestinal hemorrhage, thrombocytopenia, seizures, acute renal insufficiency.',
    bibliography: [BIB.garrahan('ketoROLac tromethamine*', ' (code 0642, ATC M01AB)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'lor-001', name: 'Lorazepam', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsant. Muscle relaxant. Anxiolytic. Antiemetic (anticipatory vomiting).',
    indications: `${MAIN}\n\nAnticonvulsant. Muscle relaxant. Anxiolytic. Antiemetic (anticipatory vomiting).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 2–4 mg/mL.',
        dose: '1–4 mg slow IV PRN sedation; status: 0.1 mg/kg (protocol).',
        administration: 'Slow IV.',
      },
      pediatrico: {
        presentation: 'Tablets: 1-2-2.5 mg; Sublingual tablets: 1 mg; Ampoules: 4 mg/mL; Solution (compounded preparation): 1 mg/mL',
        reconstitution: '1 amp. + 3 mL diluent.',
        administration: 'PO; IV; IM',
        diluent: 'SWFI, 0.9% NaCl solution, 5% dextrose.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolus 2 to 5 minutes. Drip for analgosedation.',
        dose: 'Anxiety, sedation: infants and children (PO/IV): 0.05 mg/kg/dose every 4-6-8 h (maximum 2 mg/dose), adults: 1-10 mg/day every 8-12 h. Status epilepticus (IV/Rectal): neonates: 0.05 mg/kg repeat if necessary in 10-15 min., infants and children: 0.1 mg/kg (maximum 4 mg/dose) repeat if necessary in 10-15 min., adults: 4 mg/dose repeat if necessary in 10-15 min. Antiemetic: 0.05 mg/kg/dose every 6 h, maximum: 4 mg/dose.',
        notes: 'IV: Dilute previously with equal volume of 5% dextrose or normal saline, do not exceed 2 mg/minute. Interactions: other CNS or respiratory depressants may increase adverse effects of lorazepam. Ampoules contain benzyl alcohol 2%, polyethylene glycol and propylene glycol (caution in newborns due to toxicity). Avoid intra-arterial administration. Contraindicated in narrow-angle glaucoma. See preliminary guide for prevention of teratogenesis caused by medications. See practical guide for analgosedation management and weaning in intermediate and moderate care units.',
      },
      neonatal: {
        dose: '0.05 mg/kg IV per NICU seizure protocol.',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- IV diluted per prescribing information.\n\n## Pediatric guide\n\n- Discard remainder once opened. Refrigerate.',
    adverseEffects: '## Adverse effects\n\nExcessive sedation, ataxia.',
    bibliography: [BIB.garrahan('LORazepam', ' (code 0131, ATC N05BA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ltx-001', name: 'Levothyroxine', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Hypothyroidism.',
    indications: `${MAIN}\n\nHypothyroidism.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets; IV ampoule 200 mcg.',
        dose: 'Myxedema: 200–400 mcg IV loading; PO maintenance.',
        administration: 'Slow IV or PO on empty stomach.',
      },
      pediatrico: {
        dose: '0 - 3 months: 10-15 µg/kg; 3 - 6 months: 25-50 µg; 6-12 months: 50-75 µg; 1-5 years: 75-100 µg; 6-12 years: 100-150 µg; > 12 years: 150 µg.',
        administration: 'PO',
        presentation: 'Tablets: 25 mcg - 50 mcg - 100 mcg',
        notes: 'Must be prescribed by specialists. Iron salts, aluminum hydroxide, sucralfate decrease its absorption. Levothyroxine increases the effect of oral anticoagulants. Phenytoin may decrease levothyroxine levels. Administer on empty stomach, 1 - 1.5 h before breakfast. Do not administer via nasogastric tube.',
      },
      neonatal: {
        dose: '10–15 mcg/kg/day PO in congenital hypothyroidism.',
        administration: 'PO.',
      },
    },
    stability: '## Stability\n\n- IV use immediately after preparation.',
    adverseEffects: '## Adverse effects\n\nTachycardia, headaches, cardiac arrhythmias, nervousness, insomnia, alopecia, increased appetite.',
    bibliography: [BIB.garrahan('levoTHYROXine', ' (code 0343, ATC H03AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nEN Garrahan batch 6 (part B): ${drugs.length} monographs`);
