#!/usr/bin/env node
/** Garrahan re-translation batch 5/8 — 10 EN monographs (part B) */
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
  sadiUcip: { citation: 'Infectious Diseases Service, Infection Prevention and Control. UCIP 2026 — Dilution and stability guide.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Argentine Society of Infectious Diseases (SADI). Guidelines and consensus statements.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Clinical practice guidelines.', url: 'https://www.idsociety.org/' },
  sac: { citation: 'Argentine Society of Cardiology. Clinical practice guidelines.', url: 'https://www.sac.org.ar/' },
  heartArr: { citation: 'American Heart Association. Hypertension and arrhythmia guidelines.', url: 'https://www.heart.org/' },
  heartHf: { citation: 'American Heart Association. Heart failure and hypertension guidelines.', url: 'https://www.heart.org/' },
};

const drugs = [
  {
    id: 'ate-001', name: 'Atenolol', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Selective beta-blocker. Antihypertensive. Beta-adrenergic antagonist.',
    indications: `${MAIN}\n\nSelective beta-blocker. Antihypertensive. Beta-adrenergic antagonist.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 50 and 100 mg. Ampoule 5 mg/10 mL (limited IV use).',
        dose: 'HTN/angina: 50–100 mg/day PO. Arrhythmias: per cardiology protocol.',
        administration: 'PO in single or divided doses.',
      },
      pediatrico: {
        dose: 'Children: initial: 0.5 to 1 mg/kg/day every 12-24 h; maximum dose: 2 mg/kg/day, up to 100 mg/day. Adults: 25-50 mg/day every 24 h, maximum dose: hypertension: 100 mg/day; angina: 200 mg/day.',
        administration: 'PO',
        presentation: 'Tablets: 50-100 mg; Suspension (compounded preparation): 5 mg/mL',
        notes: 'Avoid abrupt discontinuation. Use with caution in patients with bronchospasm, diabetes mellitus, hyperthyroidism. Initial doses of antihypertensives are tentative and should be modified according to clinical response and side effects. See preliminary guide for prevention of teratogenesis caused by medications.',
      },
    },
    stability: '## Stability\n\n- Tablets per prescribing information.',
    adverseEffects: '## Adverse effects\n\nFatigue, lethargy, hallucinations, bradycardia, hypotension, rash, nausea, vomiting.',
    bibliography: [BIB.garrahan('Atenolol', ' (code 0263, ATC C07AB)'), BIB.heartArr, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'bic-001', name: 'Sodium bicarbonate', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Correction of metabolic acidosis.',
    indications: `${MAIN}\n\nCorrection of metabolic acidosis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 1 mEq/mL (8.4%).',
        dose: '1–2 mEq/kg IV diluted in selected situations (prescription).',
        administration: 'Slow diluted IV.',
      },
      pediatrico: {
        presentation: 'Capsules: 1000 mg; Oral solution 10% (compounded preparation): 100 mg of sodium bicarbonate/mL (1.2 mEq of bicarbonate/mL and 1.2 mEq of sodium/mL); IV solution 1 Molar: 1 mEq of bicarbonate/mL See formulation',
        administration: 'PO; IV',
        diluent: '0.9% NaCl or 5% dextrose.',
        finalConcentration: 'ABG correction in HP.',
        infusionRate: 'Continuous infusion over 4 to 8 hours with infusion pump.',
        dose: 'Severe acute metabolic acidosis (IV): mEq required = (desired serum bicarbonate - current bicarbonate) x 0.3 x weight in kg. Chronic metabolic acidosis (PO): mEq required = (desired serum bicarbonate - current bicarbonate) x 0.6 x weight in kg. See CIME Electrolytes Bulletin.',
        notes: 'Always treat the cause of acidosis. Correct hypokalemia first. PO administration: administer 1-3 hours after meals; 1 g sodium bicarbonate capsules contain 12 mEq of bicarbonate and 12 mEq of sodium. IV administration: peripheral route: dilute to 1/6; central route: IV push: slow up to 1 mEq/mL, IV infusion: dilute to 0.5 mEq/mL in 5% dextrose and infuse over more than 2 h. Incompatible with calcium, magnesium, and atropine',
      },
      neonatal: {
        dose: '1–2 mEq/kg in cardiac arrest with acidosis per NRP.',
        administration: 'Slow IV.',
      },
    },
    stability: '## Pediatric guide\n\n- Keep at room temperature. Discard remainder.\n\n## General\n\n- Do not mix with calcium in the same line.',
    adverseEffects: '## Adverse effects\n\nPO: gastric distension and flatulence. IV: tissue necrosis (avoid extravasation), hyponatremia, metabolic alkalosis, hypocalcemia.',
    bibliography: [BIB.garrahan('sodium BICARBONATE', ' (code 0267, ATC B05CB)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'cac-001', name: 'Calcium chloride', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of hypocalcemia and hyperkalemia.',
    indications: `${MAIN}\n\nTreatment of hypocalcemia and hyperkalemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 10% calcium chloride (13.6 mEq Ca/10 mL).',
        dose: 'Cardiac arrest: 1 g (10 mL) IV/IO. Hypocalcemia: 0.5–1 g slow IV.',
        administration: 'Slow IV/IO.',
      },
      pediatrico: {
        dose: 'Symptomatic hypocalcemia: 0.1 - 0.2 mL/kg/dose (0.14-0.28 mEq Ca++/kg/dose) every 4-6 h. Adults: 5-10 mL/dose (7-14 mEq/dose) every 6 h. Hyperkalemia: 0.3 mL/kg (maximum: 3 mL). See CIME Electrolytes Bulletin.',
        administration: 'IV',
        presentation: '10 mL ampoules: 100 mg of calcium chloride/mL (1.4 mEq Ca++/mL = 27.3 mg Ca++/mL)',
        notes: 'IV administration must be performed slowly (< 0.5-1 mL/min. For IV infusion dilute to 20 mg of calcium chloride per mL (0.2 mL/mL) and infuse over 1 hour. Compatible solvents: 5% dextrose and SWFI. Incompatible with bicarbonate, phosphate, and sulfate.',
      },
      neonatal: {
        dose: '20 mg/kg slow IV in cardiac arrest/hypocalcemia NICU.',
        administration: 'Central IV.',
      },
    },
    stability: '## Stability\n\n- Incompatible with bicarbonate in line.',
    adverseEffects: '## Adverse effects\n\nTissue necrosis from extravasation. Monitor heart rate. If bradycardia occurs, stop the infusion.',
    bibliography: [BIB.garrahan('calcium CHLORIDE', ' (ATC A12AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cag-001', name: 'Calcium gluconate', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of hyperkalemia. Hypocalcemic states.',
    indications: `${MAIN}\n\nTreatment of hyperkalemia. Hypocalcemic states.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 10% (0.465 mEq Ca/mL).',
        dose: '1–2 ampoules (10–20 mL) slow IV; repeat per protocol.',
        administration: 'Slow IV 10–20 min.',
      },
      pediatrico: {
        presentation: '10 mL ampoules: 100 mg of calcium gluconate/mL (0.46 mEq Ca/mL = 9 mg ionic Ca/mL)',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% and 10% dextrose.',
        finalConcentration: 'Up to 50 mg/mL.',
        infusionRate: '1 to 2 mL/min.',
        dose: 'Symptomatic hypocalcemia: 1-2 mL/kg/dose (0.46-0.92 mEq/kg/dose) over 5-10 min, may be repeated at 6 h or continued with an infusion of 5 mL/kg/day (2.3 mEq/kg/day). Adults: 10-30 mL (4.6-13.8 mEq) until response. Asymptomatic hypocalcemia with PO contraindicated: infants and children: 2-5 mL/kg/day as continuous infusion or every 6 h; adults: 20-150 mL/day as continuous infusion or in divided doses. Hyperkalemia: 0.5 - 1 mL/kg (maximum: 10 mL). See CIME Electrolytes Bulletin.',
        notes: 'IV push: 0.5-1 mL/minute IV infusion: dilute to 50 mg of calcium gluconate per mL (0.5 mL/mL) and infuse over 1 hour. Monitor heart rate while infusing. Correct hypokalemia first. Compatible solvents: 5% dextrose and SWFI. Do not mix with solutions containing bicarbonate or phosphate. 1 mEq Ca = 20 mg Ca++',
      },
      neonatal: {
        dose: '1–2 mL/kg 10% gluconate slow IV under monitoring.',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- Use dedicated line if possible.\n\n## Pediatric guide\n\n- Discard once opened.',
    adverseEffects: '## Adverse effects\n\nTissue necrosis from extravasation. Monitor heart rate. If bradycardia occurs, stop the infusion.',
    bibliography: [BIB.garrahan('calcium GLUCONATE', ' (code 0270, ATC A12AA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'car-001', name: 'Carbamazepine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsant. Adjunct in the treatment of neuropathic pain. Psychiatric use: mood stabilizer, recurrence prevention.',
    indications: `${MAIN}\n\nAnticonvulsant. Adjunct in the treatment of neuropathic pain. Psychiatric use: mood stabilizer, recurrence prevention.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 200–400 mg; oral suspension.',
        dose: 'Start 200 mg PO every 12 h; titrate to 800–1200 mg/day.',
        administration: 'PO with food.',
      },
      pediatrico: {
        dose: 'Dose should be adjusted according to patient response and serum level (therapeutic range: 4 - 12 µg/mL). Intervals for tablets: every 8-12 h Syrup: every 6 h. > 6 years: start 10-20 mg/kg/day, increase to 35 mg/kg/day; 6-12 years: start 200 mg/day, maintenance dose: 400-800 mg. > 12 years and adults: start 400 mg/day, maintenance dose 800-1200 mg. Maximum dose 12-15 years: 1000 mg; > 15 years: 1200 mg; adults: 1600 mg/day. Neuropathic pain: 10 - 30 mg/kg/day in 2 or 3 doses (maximum dose: 800 mg/day).',
        administration: 'PO',
        presentation: 'Tablets: 200-400 mg; Controlled-release tablets: 400 mg; Syrup: 20 mg/mL',
        notes: 'Perform complete blood count and liver panel every 3-6 months. Clarithromycin, erythromycin, isoniazid, ketoconazole, itraconazole may inhibit hepatic metabolism of carbamazepine. Carbamazepine may induce metabolism of: cyclosporine, phenytoin, theophylline, ritonavir, saquinavir, delavirdine, benzodiazepines, ethosuximide, valproic acid, midazolam, corticosteroids, and thyroid hormones. Administer with food to decrease gastrointestinal effects. See preliminary guide for prevention of teratogenesis caused by medications',
      },
      neonatal: {
        dose: 'Limited use; specialized PO regimens.',
        administration: 'PO.',
      },
    },
    stability: '## Stability\n\n- Suspension per prescribing information.',
    adverseEffects: '## Adverse effects\n\nSomnolence, dizziness, skin rashes, hematologic alterations (neutropenia), hepatic alterations, diplopia, blurred vision.',
    bibliography: [BIB.garrahan('carBAMazepine', ' (code 0032, ATC N03AF)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cas-001', name: 'Caspofungin', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'For patients who do not tolerate or do not respond to therapy with other antifungals, patients with renal failure who have documented Candida infection, patients with hepatic insufficiency in whom Fluconazole cannot be used. Empirical treatment in febrile neutropenia if',
    indications: `${MAIN}\n\nFor patients who do not tolerate or do not respond to therapy with other antifungals, patients with renal failure who have documented Candida infection, patients with hepatic insufficiency in whom Fluconazole cannot be used.\nEmpirical treatment in febrile neutropenia without focus on the 5th or 7th day of persistent fever and neutropenia.\nProphylaxis in bone marrow transplant patients and in leukemias and in some cases as treatment of documented infections by fungi sensitive to echinocandins\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial with lyophilized powder containing 50 mg or 70 mg (Cancidas).',
        reconstitution: '10.5 mL SWFI, NS, or bacteriostatic water. Conc: 5 mg/mL (50 mg) or 7 mg/mL (70 mg). Shake gently until clear solution is obtained.',
        diluent: '50-70 mg in 250 mL NS or Ringer lactate.',
        finalConcentration: '0.2-0.28 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Withdraw necessary volume and dilute in 250 mL NS or Ringer lactate. Administer over 60 min.',
        notes: 'Do not use 5% dextrose as diluent (incompatible). Loading dose: 70 mg on day 1; maintenance: 50 mg/day. In patients with moderate hepatic insufficiency increase to 70 mg/day. First-line echinocandin for invasive candidiasis.',
      },
      pediatrico: {
        dose: 'Neonates: 2 mg/kg/day (with Infectious Diseases authorization); Children > 3 months: loading dose 70 mg/m² and continue with 50 mg/m², when coadministered with Rifampicin, Nevirapine, Efavirenz, Carbamazepine, dexamethasone, phenytoin increase to 70 mg/m² every 24 h, maximum dose 70 mg/dose. Adults: Initial 70 mg/dose then 50 mg/dose every 24 h, when coadministered with Rifampicin, Nevirapine, Efavirenz, Carbamazepine, dexamethasone, phenytoin, must be increased to 70 mg/dose once daily. No dose adjustment needed for renal insufficiency.',
        administration: 'IV',
        presentation: 'Powder vial: 50 and 70 mg',
        notes: 'Administer slowly, over 1 hour. Do not dilute in dextrose. Stable 48 h refrigerated once diluted. Interactions: with cyclosporine may increase caspofungin concentration (increased transaminases have been observed), avoid; with tacrolimus may decrease tacrolimus serum concentration.',
      },
      neonatal: {
        dose: '25 mg/m²/day IV per NICU protocol (specialized use).',
        administration: 'IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 1 h at room temperature, 24 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature, 48 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nHypotension, rash, diarrhea, headache, increased transaminases and alkaline phosphatase.',
    bibliography: [BIB.garrahan('Caspofungin*', ' (code 1594, ATC J02AX)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'clp-001', name: 'Chlorpromazine', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antiemetic. Sedation in severe psychomotor agitation and abnormal movements (chorea).',
    indications: `${MAIN}\n\nAntiemetic. Sedation in severe psychomotor agitation and abnormal movements (chorea).\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Tablets: 25-100 mg; IM ampoules 5 mL: 5 mg/mL; IV ampoules 2 mL: 25 mg/mL',
        administration: 'PO IV IM',
        diluent: '0.9% NaCl.',
        finalConcentration: '1 mg/mL.',
        infusionRate: '0.5 mg/min.',
        dose: 'Children > 6 months: 0.5-1 mg/kg/dose every 4-6 h. Maximum dose (IM-IV): < 5 years: 40 mg/day, 5-12 years: 75 mg/day. Adults: psychosis (PO): 30-800 mg/day in 1 to 4 doses, usual dose: 200 mg/day; (IM-IV): start 25 mg may be repeated in 1-4 h up to a maximum of 400 mg/dose every 4-6 h until patient is controlled, usual dose: 300-800 mg/day; antiemetic (PO): 10-25 mg every 4-6 h, (IM-IV): 25-50 mg every 4-6 h.',
        notes: 'Neurologic, hematologic, and hepatic function monitoring in prolonged treatments. IV dilute in SWFI: 1 mg/mL, administer at 0.5 mg/min. With propranolol increases plasma concentration of chlorpromazine. May decrease absorption if administered with antacids containing aluminum and/or magnesium. May increase serum concentration of valproic acid. Avoid contact between injectable solution and skin because it may cause dermatitis.',
      },
    },
    stability: '## Pediatric guide\n\n- 7 days once reconstituted.',
    adverseEffects: '## Adverse effects\n\nSedation, somnolence, hypotension, antimuscarinic effects, respiratory depression, tachycardia, cardiac arrhythmias, extrapyramidal symptoms, hypothermia, gynecomastia, leukocytosis, hemolytic anemia.',
    bibliography: [BIB.garrahan('chlorproMAZINE Hydrochloride', ' (code 0766, ATC N05AA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'cvd-001', name: 'Carvedilol', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Alpha and beta blocking agent. Congestive heart failure. Alpha and beta adrenergic antagonist.',
    indications: `${MAIN}\n\nAlpha and beta blocking agent. Congestive heart failure. Alpha and beta adrenergic antagonist.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 6.25, 12.5 and 25 mg.',
        dose: 'HF: start 3.125 mg PO twice/day and titrate. HTN: 12.5–25 mg PO twice/day.',
        administration: 'PO with food (better tolerance).',
      },
      pediatrico: {
        dose: 'Congestive heart failure: children: initial: 0.08 mg/kg/dose every 12 h for 2 weeks, then double every 2 weeks if well tolerated to a maintenance dose range of 0.3 to 0.7 mg/kg/day every 12 h (maximum: 50 mg/day); adults: initial: 3.125 mg every 12 h, if tolerated may be doubled every 2 weeks to a maximum dose of 25 to 50 mg twice daily. Hypertension: children and adolescents: initial: 0.1 mg/kg/dose (up to 12.5 mg) every 12 h; maximum dose: 0.5 mg/kg/dose (up to 25 mg) every 12 h.',
        administration: 'PO',
        presentation: 'Tablets: 3.125 - 6.25 mg Solution (compounded preparation): 1 mg/mL See formulation',
        notes: 'Administer with food. Contraindicated in hepatic insufficiency. Interactions: Clonidine increases serum levels of carvedilol. Carvedilol may increase serum levels of cyclosporine; may increase effects of other drugs such as digoxin, prazosin, epinephrine. Carvedilol may mask tachycardia of hypoglycemia caused by insulin and oral hypoglycemic agents. Rifampicin may reduce plasma concentration of carvedilol by up to 70%. Decreases beta-blocking effect when administered concomitantly with antacids, calcium channel blockers, cholestyramine, nonsteroidal anti-inflammatory drugs, ampicillin, and salicylates',
      },
    },
    stability: '## Stability\n\n- Store per prescribing information.',
    adverseEffects: '## Adverse effects\n\nDizziness, hypotension, headache, fatigue, hyperglycemia, weight gain, diarrhea, bradycardia, palpitations, etc.',
    bibliography: [BIB.garrahan('Carvedilol*', ' (code 1584, ATC C07AG)'), BIB.heartHf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'des-001', name: 'Desmopressin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Diabetes insipidus (antidiuretic). Hemophilia. von Willebrand disease. Nocturnal enuresis.',
    indications: `${MAIN}\n\nDiabetes insipidus (antidiuretic). Hemophilia. von Willebrand disease. Nocturnal enuresis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'IV ampoule 4 mcg/mL; nasal/PO per presentation.',
        dose: 'DI: 1–2 mcg IV/SC or intranasal dose per protocol.',
        administration: 'Slow IV, SC, or intranasal.',
      },
      pediatrico: {
        dose: 'Diabetes insipidus: IV - SC: 2-4 µg/day every 12 h; intranasal: 0.05-0.1 mL/dose twice daily; PO <12 years: start with 0.05 mg/dose every 12 h until response (range 0.1-0.8 mg/day) >12 years and adults: 0.05 mg/dose every 12 h until response (range: 0.1-1.2 mg/day every 8-12 h). Hemophilia, von Willebrand disease: IV: > 3 months and adults: 0.3 µg/kg, 30 min before procedure. Nocturnal enuresis: intranasal: > 6 years: initial 20 µg, range: 10-40 µg, at bedtime; PO: > 12 years: 0.2-0.4 mg at bedtime. Greater absorption in the anterior region of the nasal fossa.',
        administration: 'PO; IV; SC; Intranasal',
        presentation: 'Nasal solution (with a calibrated cannula of 0.2 mL): 0.1 mg/mL; Nasal spray: 0.1 mg/mL; Ampoules: 4 µg/mL Tablets: 0.1-0.2 mg',
        notes: 'Must be prescribed by specialists. Absorbed in the anterior nasal region. Dose is adjusted to individual clinical response. Keep ampoules and nasal solution refrigerated at 2-6°C. Desmopressin is potentiated by tricyclic antidepressants, carbamazepine, chlorpromazine, indomethacin. Intermittent infusion: usual dilution 0.1 µg/mL, infuse over 15 - 30 min; Continuous infusion: usual dilution 0.1 µg/mL. May be diluted in normal saline or 5% dextrose. SC: administer slowly over 10 - 20 seconds.',
      },
      neonatal: {
        dose: '0.1–0.3 mcg/kg per NICU indication.',
        administration: 'IV.',
      },
    },
    stability: '## Stability\n\n- Refrigerate per presentation.',
    adverseEffects: '## Adverse effects\n\nWater intoxication. Headache, stomach pain, nausea, hyponatremia.',
    bibliography: [BIB.garrahan('Desmopressin Acetate', ' (code 0556, ATC H01BA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dia-001', name: 'Diazepam', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Benzodiazepine anticonvulsant. Muscle relaxant. Anxiolytic.',
    indications: `${MAIN}\n\nBenzodiazepine anticonvulsant. Muscle relaxant. Anxiolytic.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 5–10 mg.',
        dose: '5–10 mg slow IV repeatable per protocol.',
        administration: 'Very slow IV; IM/rectal per presentation.',
      },
      pediatrico: {
        presentation: 'Tablets: 2-5-10 mg; 2 mL ampoules: 5 mg/mL; Solution (compounded preparation): 2 mg/mL',
        administration: 'PO; IV; Rectal',
        diluent: '0.9% NaCl, 5% and 10% dextrose.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '1 to 2 mg/min.',
        dose: 'Status epilepticus IV attack: > 30 days and children: 0.1-0.3 mg/kg/dose every 5-10 min. Maximum dose: < 5 years: 5 mg, > 5 years: 10 mg; Adults: 5-10 mg, may be repeated every 10-15 min up to a maximum of 30 mg. IV infusion: 0.1-0.2 mg/kg/hour. Seizures (immediate treatment): 2 to 5 years: 0.5 mg/kg; 6 to 11 years: 0.3 mg/kg; > 12 years and adults: 0.2 mg/kg. Moderate sedation for procedures: PO: 0.2-0.3 mg/kg (maximum dose: 10 mg) 45 to 60 min before procedure. Sedation, muscle relaxation, or anxiety: PO: 0.12-0.8 mg/kg/day every 6-8 h; IV: 0.04-0.3 mg/kg/dose every 2-4 h up to a maximum of 0.6 mg/kg over 8 h; adults: 2-10 mg/dose every 6-8 h. Patients on mechanical ventilation (IV): 0.2-0.4 mg/kg every 6 h.',
        notes: 'Administration: IV: push: undiluted and do not exceed 5 mg/min, continuous infusion: 0.2 mg/mL in normal saline; PO: administer with food. See preliminary guide for prevention of teratogenesis caused by medications. See practical guide for analgosedation management and weaning in intermediate and moderate care units.',
      },
      neonatal: {
        dose: '0.1–0.3 mg/kg per seizure protocol.',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- Precipitates with some diluents; follow IV formulation prescribing information.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nSomnolence, ataxia, dysarthria, irritability. IV: respiratory depression, thrombophlebitis. Paradoxical effect.',
    bibliography: [BIB.garrahan('diazePAM', ' (code 0070, ATC N05BA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nEN Garrahan batch 5 (part B): ${drugs.length} monographs`);
