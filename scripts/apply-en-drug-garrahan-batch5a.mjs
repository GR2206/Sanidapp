#!/usr/bin/env node
/** Garrahan re-translation batch 5/8 — 10 EN monographs (part A) */
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
  sadiUcip: { citation: 'Infectious Diseases Service, Infection Prevention and Control. UCIP 2026 — Dilution and stability guide.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Argentine Society of Infectious Diseases (SADI). Guidelines and consensus statements.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Clinical practice guidelines.', url: 'https://www.idsociety.org/' },
};

const drugs = [
  {
    id: 'aci-001', name: 'Acyclovir', version: '1.2.2', updatedAt: '2026-07-10',
    executiveSummary: 'Disseminated herpes. Herpes zoster and varicella in the immunocompromised host. Herpetic encephalitis. Varicella in the newborn.',
    indications: `${MAIN}\n\nDisseminated herpes. Herpes zoster and varicella in the immunocompromised host. Herpetic encephalitis. Varicella in the newborn.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lyophilized powder vial containing 500 mg (Lazar, LAFEDAR, LIA, Pharma Vial).',
        reconstitution: '10 mL SWFI. Conc: 50 mg/mL.',
        diluent: '500 mg in 100 mL 0.9% NaCl. If dose exceeds 500 mg, dilute in 250 mL 0.9% NaCl.',
        finalConcentration: '5 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Gently shake vial until solution is clear. Administer by slow infusion over more than 1 hour.',
        notes: 'Refrigeration of reconstituted solution (in vial) may cause precipitate that redissolves at room temperature. USE ONLY SWFI (other diluents may precipitate acyclovir).',
      },
      pediatrico: {
        presentation: 'Tablets: 400–800 mg; Lyophilized powder vial: 500 mg; Suspension: 80 mg/mL; Cream/dermal ointment: 5%; Ophthalmic ointment: 3%',
        administration: 'IV; PO; Topical',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '7 mg/mL or less.',
        infusionRate: 'NOT LESS than 1 hour.',
        dose: 'IV: Varicella, herpes zoster: 30 mg/kg/day every 8 h. Herpetic encephalitis: < 12 years: 60 mg/kg/day every 8 h; > 12 years: 30 mg/kg/day every 8 h. Genital herpes, mucocutaneous herpes in immunocompromised host, herpetic gingivostomatitis: < 12 years: 30 mg/kg/day every 8 h; > 12 years: 15 mg/kg/day every 8 h. PO: 80 mg/kg/day every 6 h (maximum dose: 3,2 g), adults: 200–800 mg every 6–8 h. Dose in obese patients should be calculated based on ideal body weight. Bone marrow transplant prophylaxis: Herpes simplex, serology-positive patient (recipient and/or donor): 10 mg/kg/dose every 8 h or 250 mg/m²/dose every 8 h (from 24 h before conditioning until day +30; discontinue if ganciclovir is started). Unrelated allogeneic transplant recipients for CMV prophylaxis: 500 mg/m²/dose every 8 h. Dermatologic therapy: Herpes virus infection: apply 5 times daily for 1 week. Ophthalmology: 3% ophthalmic ointment every 3 h.',
        notes: 'Risk of phlebitis or injection-site inflammation at high concentrations (highly alkaline). Infuse over at least 1 hour at final concentration < 7 mg/mL. Adequate hydration is required to prevent acyclovir precipitation in renal tubules. Do not refrigerate reconstituted antibiotic.',
      },
      neonatal: {
        dose: '20 mg/kg/dose every 8 h in neonatal encephalitis.',
        administration: 'Slow IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 12 h at room temperature.\n\n## Diluted solution (for administration)\n\n- 12 h at room temperature.\n\n## Pediatric guide\n\n- Diluted with 5% dextrose: 24 h at room temperature.\n- Diluted with SWFI: 12 h at room temperature.\n- Do not refrigerate.',
    adverseEffects: '## Adverse effects\n\nHeadache, encephalopathic signs, hypotension, rash, pruritus, nausea, vomiting, diarrhea, hematuria, arthralgia.',
    bibliography: [BIB.garrahan('ACIclovir', ' (code 0002, ATC J05AB)'), BIB.sadiUcip, BIB.pedGuide, BIB.idsa, BIB.anmat],
  },
  {
    id: 'alb-001', name: 'Human albumin', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Plasma volume expander. Burns.',
    indications: `${MAIN}\n\nPlasma volume expander. Burns.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial 20% or 25% albumin.',
        dose: '0,5–1 g/kg according to indication (paracentesis: 6–8 g/L of ascites removed).',
        administration: 'IV.',
      },
      pediatrico: {
        dose: 'Shock: Albumin 5% in 0.9% NaCl = 5–10 mL/kg (0,25–0,50 g/kg). Maximum dose: 6 g/kg/day',
        administration: 'IV',
        presentation: 'See Human albumin evidence-based use (CIME Bulletin) 50 mL vial 20%',
        notes: 'Infusion rate: 0,25–1 mL/min. See Colloid Solutions (CIME Bulletin)',
      },
      neonatal: {
        dose: 'Replacement in neonatal shock per NICU protocol.',
        administration: 'Slow IV.',
      },
    },
    stability: '## Stability\n\n- Use immediately after spiking; do not mix with other drugs.',
    adverseEffects: '## Adverse effects\n\nHeart failure from volume overload, urticaria.',
    bibliography: [BIB.garrahan('Albúmina Humana*', ' (code 0007, ATC B05AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'amd-001', name: 'Amiodarone', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Ventricular arrhythmias.',
    indications: `${MAIN}\n\nVentricular arrhythmias.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 150 mg/3 mL.',
        dose: 'Cardiac arrest: 300 mg IV bolus, then 150 mg. Stable VT: 150 mg over 10 min, infusion 1 mg/min x 6 h.',
        infusionRate: 'Bolus over 10 min; then infusion.',
        administration: 'IV in 5% dextrose (precipitates in NaCl).',
      },
      pediatrico: {
        presentation: 'Tablets: 200 mg; 3 mL ampoules: 50 mg/mL; Suspension (compounded): 5 mg/mL',
        administration: 'PO; IV',
        diluent: '5% dextrose.',
        finalConcentration: '< 3 mg/mL via peripheral line; up to 6 mg/mL via central venous catheter.',
        infusionRate: 'Loading dose over 10 min with continuous infusion pump. Then drip over 12 to 24 h.',
        dose: 'IV: Loading: 5 mg/kg by drip over 15 minutes; then 5 mg/kg/day by continuous infusion. PO: Maintenance: 10 mg/kg/day (maximum: 200 mg/dose) every 12–24 h during the first week, then continue at 5 mg/kg/day. Adults: PO: loading dose: 800–1600 mg/day every 12–24 h for 1–3 weeks, then 600–800 mg/day, maintenance: 200–400 mg/day. Reduce dose in hepatic insufficiency.',
        compatibility: 'Incompatible with aminophylline, ceftazidime, heparin, sodium bicarbonate.',
        notes: 'Specialist-only indication. IV: dilute in 5% dextrose, use rigid bag or glass for infusions longer than 2 h. For concentrations greater than 2 mg/mL and/or infusions longer than 1 hour, use central line. Concentrations < 0,6 mg/mL are unstable. Incompatible with bicarbonate. PO: administer with food. Interacts with: digoxin (amiodarone increases digoxin concentration, reduce digoxin dose by approximately 50% and monitor digoxin levels), beta-blockers and calcium channel blockers (increases risk of bradycardia), phenytoin (increases serum phenytoin concentration and decreases amiodarone concentration). Avoid sun exposure. Highly effective but requires serial monitoring due to adverse effects. See preliminary guide for prevention of medication-related teratogenesis.',
      },
      neonatal: {
        dose: '5 mg/kg bolus; infusion per NICU protocol.',
        administration: 'IV.',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.\n\n## General\n\n- Protect from light; use dedicated line if possible.',
    adverseEffects: '## Adverse effects\n\nPulmonary infiltrates, pulmonary fibrosis, asymptomatic corneal microdeposits (monitor with slit lamp every 6 months), cutaneous photosensitivity, hypo- and hyperthyroidism, polyneuropathies. Prolonged QT. See alert.',
    bibliography: [BIB.garrahan('Amiodarona Clorhidrato*', ' (code 0014, ATC C01BD)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'amf-001', name: 'Amphotericin B deoxycholate', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Febrile neutropenia on day 7. Pulmonary infiltrate during neutropenia. Documented systemic mycoses.',
    indications: `${MAIN}\n\nFebrile neutropenia on day 7. Pulmonary infiltrate during neutropenia. Documented systemic mycoses.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lyophilized powder vial containing 50 mg (Anfotericina LIA, Richet, Northia**).',
        reconstitution: '10 mL SWFI. Conc: 5 mg/mL. Shake vial until colloidal solution is clear.',
        diluent: '50 mg in 500 mL 5% dextrose.',
        finalConcentration: '0,1 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute reconstituted solution in 500 mL 5% dextrose and administer over 6 h.',
        notes: 'Do not use 0.9% NaCl (may precipitate). Under no circumstances should the dose exceed 1,5 mg/kg/day. Overdose may cause cardiorespiratory arrest.',
      },
      pediatrico: {
        presentation: 'Powder vial: 50 mg',
        reconstitution: 'Reconstitute with SWFI. Dilute with dextrose (NOT saline).',
        administration: 'IV',
        finalConcentration: '0,1 mg/mL.',
        infusionRate: 'Between 2 and 4 hours, with continuous infusion pump.',
        dose: 'Start 0,5 mg/kg/day, increase 0,2 mg/kg/day every 24 h, up to 1 mg/kg/day, maximum dose: 50 mg/day. Rapid administration method: start 0,25 mg/kg and increase at 6 h intervals up to 1 mg/kg/day. Do not exceed 1,5 mg/kg/day.',
        notes: 'Infuse over 4–6 h at concentration of 0,1 mg/mL in 5% dextrose via peripheral line and up to 0,5 mg/mL via central line. Premedicate to reduce adverse reactions with hydrocortisone, paracetamol, diphenhydramine 30 min before infusion. Do not administer with solutions containing electrolytes. Correct hypokalemia before administration.',
      },
      neonatal: {
        dose: '0,5–1 mg/kg/dose every 24–48 h per NICU protocol.',
        administration: 'Central IV with hydration and electrolyte monitoring.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h at room temperature in the dark and 7 days refrigerated.\n\n## Diluted solution (for administration)\n\n- Diluted solution is not stable. If remainder, discard. Use light-protected infusion set.\n\n## Pediatric guide — Reconstituted\n\n- Once reconstituted: 24 h at room temperature, 7 days refrigerated (2–8°C).',
    adverseEffects: '## Adverse effects\n\nFever, chills, vomiting (infusion-related), hypokalemia (25%), hypomagnesemia. Nephrotoxicity: may be prevented with prior saline infusion. Anemia (75%). Rare: leukopenia, thrombocytopenia.',
    bibliography: [BIB.garrahan('Anfotericina B (DEOXICOLATO)', ' (code 0020, ATC J02AA)'), BIB.sadiUcip, BIB.pedGuide, BIB.idsa, BIB.anmat],
  },
  {
    id: 'amf-002', name: 'Liposomal amphotericin B', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Patients with documented systemic mycosis refractory to amphotericin B treatment. Transplant recipients with documented systemic mycosis. Severe renal failure during amphotericin B treatment.',
    indications: `${MAIN}\n\nPatients with documented systemic mycosis refractory to amphotericin B treatment. Transplant recipients with documented systemic mycosis. Severe renal failure during amphotericin B treatment.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial containing 50 mg (Ambisome).',
        reconstitution: '10 mL SWFI. Conc: 5 mg/mL.',
        diluent: '50 mg in 100 mL 5% dextrose. Do not use 0.9% NaCl.',
        finalConcentration: '0,5 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Withdraw required dose with syringe. Place filter on syringe and add vial dose to 100 mL 5% dextrose and administer over 60–120 min.',
      },
      pediatrico: {
        dose: '3–5 mg/kg/day, maximum dose: 250 mg/day. If indication is empirical or in certain infections such as candidemia: 3 mg/kg/day. Mucormycosis: 5 to 10 mg/kg/day, depending on involved foci; with central nervous system involvement doses range from 7,5 to 10 mg/kg/day.',
        infusionRate: 'Infusion 2–3 h.',
        administration: 'IV',
        presentation: 'Powder vial: 50 mg',
        notes: 'Concomitant hydrocortisone or diphenhydramine not required. First dose 1 mg/kg. Infusion rate: 2 h. Dilution: 0,2–2 mg/mL. Do not administer with solutions containing electrolytes. Start infusion within 6 h of drug dilution.',
      },
      neonatal: {
        dose: 'Dose per NICU protocol (usually 3–5 mg/kg/day).',
        administration: 'Central IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h at room temperature and 7 days refrigerated.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature. Use light-protected infusion set.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, arrhythmias, fever, chills. Less hepatotoxicity and nephrotoxicity than amphotericin B deoxycholate.',
    bibliography: [BIB.garrahan('Anfotericina B LIPOSOMAL*', ' (code 1154, ATC J02AA)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'amf-003', name: 'Amphotericin B lipid complex', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Febrile neutropenia on day 7. Pulmonary infiltrate during neutropenia. Documented systemic mycoses.',
    indications: `${MAIN}\n\nFebrile neutropenia on day 7. Pulmonary infiltrate during neutropenia. Documented systemic mycoses.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial containing 100 mg in 20 mL solution (Abelcet).',
        reconstitution: 'No prior reconstitution required. Conc: 5 mg/mL.',
        diluent: '100 mg in 100 mL 5% dextrose. Do not use 0.9% NaCl.',
        finalConcentration: '1 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Withdraw required dose with syringe and use filter supplied with vial. Add required dose to 100 mL 5% dextrose and administer over 120 min.',
        notes: 'All unused material must be discarded (contains no preservatives). Use filter needle to withdraw solution from vial and then prepare infusion.',
      },
      pediatrico: {
        dose: 'Start 0,5 mg/kg/day, increase 0,2 mg/kg/day every 24 h, up to 1 mg/kg/day, maximum dose: 50 mg/day. Rapid administration method: start 0,25 mg/kg and increase at 6 h intervals up to 1 mg/kg/day. Do not exceed 1,5 mg/kg/day.',
        administration: 'IV',
        presentation: 'Powder vial: 50 mg',
        notes: 'Infuse over 4–6 h at concentration of 0,1 mg/mL in 5% dextrose via peripheral line and up to 0,5 mg/mL via central line. Premedicate to reduce adverse reactions with hydrocortisone, paracetamol, diphenhydramine 30 min before infusion. Do not administer with solutions containing electrolytes. Correct hypokalemia before administration.',
      },
      neonatal: {
        dose: 'Dose per NICU protocol.',
        administration: 'Central IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Single-use vial. Keep refrigerated.\n\n## Diluted solution (for administration)\n\n- 6 h at room temperature and 48 h refrigerated. Use light-protected infusion set.',
    adverseEffects: '## Adverse effects\n\nFever, chills, vomiting (infusion-related), hypokalemia (25%), hypomagnesemia. Nephrotoxicity: may be prevented with prior saline infusion. Anemia (75%). Rare: leukopenia, thrombocytopenia.',
    bibliography: [BIB.garrahan('Anfotericina B (DEOXICOLATO)', ' (code 0020, ATC J02AA)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'aml-001', name: 'Amlodipine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hypertension. Calcium channel blocker.',
    indications: `${MAIN}\n\nHypertension. Calcium channel blocker.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 5 and 10 mg.',
        dose: '5–10 mg/day PO as single morning dose.',
        administration: 'PO.',
      },
      pediatrico: {
        dose: 'Children: initial: 0,06 mg/kg/day (up to 5 mg/day), once daily; maximum dose: 0,6 mg/kg/day (up to 10 mg/day). Adults: initial: 5 mg once daily, maintenance: 5–10 mg once daily.',
        administration: 'PO',
        presentation: 'Tablets: 5–10 mg; Suspension (compounded): 1 mg/mL',
        notes: 'Do not discontinue drug abruptly.',
      },
    },
    stability: '## Stability\n\n- Store per package insert, protect from light.',
    adverseEffects: '## Adverse effects\n\nPalpitations, peripheral edema, headache, dizziness, fatigue, angina, cardiac arrhythmia (rare).',
    bibliography: [BIB.garrahan('AMLOdipina Besilato', ' (code 1509, ATC C08CA)'), BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'amp-001', name: 'Ampicillin', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'ENT, respiratory, odontostomatologic, gastrointestinal, genitourinary, skin and soft tissue, neurologic, surgical, trauma infections, bacterial meningitis and septicemia.',
    indications: `${MAIN}\n\nENT, respiratory, odontostomatologic, gastrointestinal, genitourinary, skin and soft tissue, neurologic, surgical, trauma infections, bacterial meningitis and septicemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial containing 1 g (Bagó, Drawer, Klonal, LIA, Pharmavial, Rivero).',
        reconstitution: '10 mL SWFI. Conc: 100 mg/mL.',
        diluent: '1 g in 100 mL 0.9% NaCl.',
        finalConcentration: '10 mg/mL.',
        administration: 'Direct IV: Yes. Reconstitute 1 g in 10–15 mL SWFI and administer over NOT LESS than 10–15 min (maximum rate: 100 mg/min). Intermittent IV: Yes. Dilute in 50–100 mL 0.9% NaCl. Administer over 15–60 min.',
        notes: '5% dextrose accelerates ampicillin hydrolysis (use immediately). Prefer dilution with 0.9% NaCl.',
      },
      pediatrico: {
        presentation: 'Powder vial: 500–1000 mg',
        reconstitution: 'RECONSTITUTE WITH SWFI.',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose, Ringer.',
        finalConcentration: 'Between 2 and 30 mg/mL.',
        infusionRate: 'Between 15 and 30 min with continuous infusion pump.',
        dose: 'Newborns: according to age and weight, see neonatal antimicrobial dosing table; Children: 100 mg/kg/day every 6 h. Pneumonia: 200 mg/kg/day every 6 h; Meningitis: 300–400 mg/kg/day every 6 h, maximum dose: 12 g/day; Adults: 500–3000 mg/dose every 6 h. See antibiotic dose adjustment table in renal insufficiency.',
        notes: 'When powder vial is reconstituted at 100 mg/mL concentration it is stable for only 2 h refrigerated. IV push administer over 3–5 minutes, intermittent infusion 15–30 minutes.',
      },
      neonatal: {
        dose: '50 mg/kg/dose every 12 h in term newborn; longer intervals in preterm infants (NICU protocol).',
        administration: 'Slow IV via syringe pump.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 1 h at room temperature, 4 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 4 h at room temperature and 24 h refrigerated.\n\n## Pediatric guide\n\n- 8 h at room temperature (25°C). 48 h refrigerated (4°C).',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, diarrhea, glossitis, anemia, thrombocytopenia, eosinophilia, erythema, rash, urticaria.',
    bibliography: [BIB.garrahan('ampicilina', ' (code 0018, ATC J01CA)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'amp-002', name: 'Ampicillin-sulbactam', version: '1.2.5', updatedAt: '2026-07-10',
    executiveSummary: 'Broad-spectrum antibiotic.',
    indications: `${MAIN}\n\nBroad-spectrum antibiotic.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lyophilized powder vial containing 1 g ampicillin + 0,5 g sulbactam (PharmaVial, Drawer, Klonal, Norgreen, Northia**, Richmond).',
        reconstitution: '5 mL SWFI. Conc: 300 mg/mL.',
        diluent: '1,5 g in 100 mL 0.9% NaCl.',
        finalConcentration: 'Conc. AMS: 15 mg/mL.',
        administration: 'Direct IV: Yes. Reconstitute 1,5 g in 3 mL SWFI and administer over 3–5 min. Intermittent IV: Yes. Administer 1,5 g in 100 mL 0.9% NaCl over 15–30 min.',
        notes: '5% dextrose accelerates ampicillin hydrolysis (use immediately). Prefer dilution with 0.9% NaCl.',
      },
      pediatrico: {
        presentation: 'Powder vial: 1,5 g (ampicillin: 1 g + sulbactam: 0,5 g)',
        reconstitution: 'RECONSTITUTE WITH SWFI.',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose, Ringer.',
        finalConcentration: 'Between 2 and 30 mg/mL.',
        infusionRate: 'Between 15 and 30 min with continuous infusion pump.',
        dose: 'Mild, moderate infections and prophylaxis: Children: 150 mg (ampicillin + sulbactam)/kg/day every 6 h, Adults: 1500 mg/dose every 6 h; maximum dose: 6 g/day (ampicillin + sulbactam). Severe infections (meningitis, bacteremia, complicated intra-abdominal infections, osteomyelitis): Children: 300 mg (ampicillin + sulbactam)/kg/day every 6 h; Adults: 3000 mg/dose every 6 h. Maximum dose: 12 g/day (ampicillin + sulbactam).',
        notes: 'In patients with sodium restriction, note that 1500 mg of sultamicillin contains 5 mEq of sodium. Interacts with allopurinol (may increase frequency of ampicillin rash).',
      },
      neonatal: {
        dose: 'Dose according to postmenstrual age and weight (NICU protocol).',
        administration: 'IV via syringe pump.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 1 h at room temperature and 4 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 3 h at room temperature and 24 h refrigerated.\n\n## Pediatric guide\n\n- 8 h at room temperature (25°C). 48 h refrigerated (4°C). Store at room temperature protected from light.',
    adverseEffects: '## Adverse effects\n\nInjection-site pain and phlebitis, diarrhea, rash, nausea, headache, erythema. Mild elevation of hepatic enzymes. Rare: hematologic abnormalities.',
    bibliography: [BIB.garrahan('ampicilina + SULBACTAM', ' (code 0903, ATC J01CA)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'ani-001', name: 'Anidulafungin', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Prophylaxis and treatment of Candida spp and Aspergillus spp infections. Restricted to partial replacement in prophylaxis and treatment of fungal infections in solid organ transplant recipients; prophylaxis in hematopoietic stem cell transplant recipients; combination therapy in refractory fungal infections; treatment in neutropenic hematology-oncology patients.',
    indications: `${MAIN}\n\nProphylaxis and treatment of Candida spp and Aspergillus spp infections. Restricted to: partial replacement in prophylaxis and treatment of fungal infections in solid organ transplant recipients; prophylaxis in hematopoietic stem cell transplant recipients; combination therapy in patients with refractory fungal infections; treatment in neutropenic hematology-oncology patients.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lyophilized powder vial containing 100 mg (Ecalta).',
        reconstitution: '30 mL SWFI. Conc: 3,33 mg/mL.',
        diluent: '100 mg in 100 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: '0,77 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Administer at rate of 100 mg over 90 min.',
        notes: 'Loading dose (200 mg) must be administered over 3 hours.',
      },
      pediatrico: {
        dose: 'Children: Loading dose: 3 mg/kg/day every 24 h, maintenance: 1,5 mg/kg/day every 24 h; Adults: loading dose: 200 mg/day, maintenance: 100 mg/day',
        administration: 'IV',
        presentation: 'Powder vial (lyophilized): 100 mg',
        notes: 'Infusion rate: < 1,1 mg/minute (do not administer as bolus).',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 1 h refrigerated. Dilute immediately.\n\n## Diluted solution (for administration)\n\n- 48 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nInfusion-related: rash, urticaria, flushing, pruritus, bronchospasm, dyspnea, hypotension. Other: hypokalemia, diarrhea, elevated ALT, hepatic enzymes, serum alkaline phosphatase and serum bilirubin.',
    bibliography: [BIB.garrahan('Anidulafungina*', ' (code 1927, ATC J02AX)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
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

console.log(`\nEN Garrahan batch 5 (part A): ${drugs.length} monographs`);
