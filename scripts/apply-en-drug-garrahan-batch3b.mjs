#!/usr/bin/env node
/** Garrahan re-translation batch 3/8 — 10 EN monographs (part B) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/en/farmacologia/drugs');

const ADJUST = '> Adjust according to institutional protocol and medical prescription.';
const MAIN = '## Main indications';
const SPEC = 'SPECIALIST USE ONLY.';

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
};

const drugs = [
  {
    id: 'cef-005', name: 'Ceftriaxone', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Third-generation cephalosporin. Treatment of sepsis, meningitis, lower respiratory tract, skin and soft tissue, and bone infections caused by aerobic gram-negative and some gram-positive bacteria. Prophylaxis for STIs (Neisseria gonorrhoeae).',
    indications: `${MAIN}\n\nThird-generation cephalosporin. Treatment of sepsis, meningitis, lower respiratory tract, skin and soft tissue, and bone infections caused by aerobic gram-negative and some gram-positive bacteria. Prophylaxis for STIs (Neisseria gonorrhoeae).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial containing 1 g (Drawer, FABRA, Pharmavial, Acantex, Ceftriaz, Exemple, Norgreen, Bioteral).',
        reconstitution: '10 mL SWFI. Conc: 100 mg/mL.',
        diluent: '1 g in 100 mL NS or 5% dextrose. Infuse over 30-60 min.',
        finalConcentration: '10 mg/mL.',
        administration: 'IM: Yes. Direct IV: Yes. Reconst. 1 g in 9.6 mL SWFI and administer over 2-4 min (except Norgreen brand: NO). Intermittent IV: Yes.',
        notes: 'Do not inject more than 1 g IM. Without lidocaine this route is painful. Incompatible and must not be mixed with vancomycin, fluconazole, and aminoglycosides.',
      },
      pediatrico: {
        presentation: 'Lyophilized powder vial: 1000 mg',
        administration: 'IV; IM',
        diluent: 'SWFI, 0.9% NaCl, 5% dextrose.',
        finalConcentration: 'Between 10 mg/mL and 40 mg/mL.',
        infusionRate: 'Not less than 30 min.',
        dose: 'Children: Mild and moderate infections: 50-75 mg/kg/day every 24 h. Severe infections, sepsis, meningitis, neutropenia: 100 mg/kg/day every 24 h. Maximum dose: 2 g (CNS: 4 g in 2 doses). Adults: 1-2 g every 24 h. Adult preoperative dose: 1 g. STI prophylaxis: Children: IM 250 mg single dose; adolescents and adults: IM: 500 mg/dose, single dose.',
        notes: 'Renal and biliary elimination. Adjust dose with creatinine clearance < 10 mL/min. Use in neonates is not advised as it displaces bilirubin from albumin binding. In newborns, simultaneous administration of solutions containing calcium is contraindicated (wait 48 h from last ceftriaxone dose). Precipitates in lungs and kidneys of preterm and term newborns; cases of fatal reactions.',
      },
      neonatal: {
        dose: '50 mg/kg/dose every 24 h (meningitis: specific NICU regimens).',
        administration: 'IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 6 h at room temperature and 24 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature and 72 h refrigerated.\n\n## Pediatric guide\n\n- 3 days at room temperature and 10 days refrigerated at 4° C.',
    adverseEffects: '## Adverse effects\n\nDiarrhea, leukopenia, transient thrombocytopenia, hemolytic anemia, urticaria, rash, injection-site pain, biliary sludge, fever, headache, dizziness, vertigo.',
    bibliography: [BIB.garrahan('CefTRIAXone', ' (code 0040, ATC J01DD)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-006', name: 'Cefotaxime', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Third-generation cephalosporin. Treatment of lower respiratory tract, skin and soft tissue, bone, joint, intra-abdominal, genitourinary, and central nervous system infections caused by susceptible gram-negative bacteria.',
    indications: `${MAIN}\n\nThird-generation cephalosporin. Treatment of lower respiratory tract, skin and soft tissue, bone, joint, intra-abdominal, genitourinary, and central nervous system infections caused by susceptible gram-negative bacteria.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial-ampoule 1 g.',
        dose: '1–2 g IV every 6–8 h.',
        infusionRate: 'Infusion 30 min.',
        administration: 'IV.',
      },
      pediatrico: {
        presentation: 'Powder vial: 500-1000 mg',
        reconstitution: 'Reconstitute with SWFI. Dilute in 0.9% saline or 5% dextrose.',
        administration: 'IV; IM',
        finalConcentration: '20 to 60 mg/mL (may be bolus 100 mg/mL over 3 to 5 min).',
        infusionRate: '15 to 30 min with infusion pump.',
        dose: '< 12 years: 100-150 mg/kg/day every 6-8 h. > 12 years and adults: 1-2 g every 6-8 h, maximum dose: 12 g. Meningitis: 300 mg/kg/day every 6 h. Cystic fibrosis: 150-200 mg/kg/day every 6 h, maximum dose: 12 g. Adult preoperative dose: 1 g.',
        notes: 'Caution in patients with renal insufficiency. Increased risk of pseudomembranous colitis due to C. difficile.',
      },
      neonatal: {
        dose: '50 mg/kg/dose every 12 h; meningitis: every 8 h (NICU).',
        administration: 'IV.',
      },
    },
    stability: '## Pediatric guide\n\n- 24 h at room temperature and 10 days refrigerated (2 to 8°C).',
    adverseEffects: '## Adverse effects\n\nNeutropenia, hemolytic anemia, headache, pseudomembranous colitis, phlebitis at injection site, rash, anal pruritus.',
    bibliography: [BIB.garrahan('cefOTAxime', ' (code 0037, ATC J01DD)'), BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-007', name: 'Ceftazidime', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Third-generation cephalosporin. Treatment of lower respiratory tract, skin and soft tissue, bone, joint, intra-abdominal, genitourinary, and central nervous system infections caused by susceptible gram-negative bacteria including Pseudomonas.',
    indications: `${MAIN}\n\nThird-generation cephalosporin. Treatment of lower respiratory tract, skin and soft tissue, bone, joint, intra-abdominal, genitourinary, and central nervous system infections caused by susceptible gram-negative bacteria including Pseudomonas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial containing 1 g (Ceftazidime Northia).',
        reconstitution: '10 mL SWFI. Conc: 100 mg/mL.',
        diluent: 'Reconst. 1 g with 10 mL SWFI, dilute in 50-100 mL and administer over 15-30 min.',
        administration: 'Direct IV: Yes. Reconst. 1 g in 10 mL SWFI and administer over 3-5 min. Intermittent IV: Yes.',
        notes: 'Irritant. Caution during reconstitution because CO₂ is released (remove bubbles before administration). Risk of phlebitis with direct IV route. IM administration is possible.',
      },
      pediatrico: {
        presentation: 'Powder vial: 500-1000 mg',
        reconstitution: 'Sterile water for reconstitution.',
        administration: 'IV',
        finalConcentration: '40 mg/mL (may be bolus 180 mg/mL).',
        infusionRate: '15 to 30 min with infusion pump.',
        dose: 'Newborn: according to age and weight. Children: 100-150 mg/kg/day every 8 h, maximum dose: 6 g. Adults: 1-2 g every 8 h. Cystic fibrosis: 150-200 mg/kg/day every 6 h, maximum dose: 9 g. Uncomplicated urinary infection adults: 250 mg every 12 h; complicated: 500 mg every 12 h.',
        notes: 'In renal insufficiency adjust dose and monitor; risk of nephrotoxicity with concomitant nephrotoxic drugs. With prolonged treatment, risk of superinfection by non-susceptible organisms; risk of pseudomembranous colitis.',
      },
      neonatal: {
        dose: '50 mg/kg/dose every 12 h (NICU).',
        administration: 'IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 6 h at room temperature and 24 h refrigerated.\n\n## Pediatric guide\n\n- Stable 24 h at room temperature protected from light; 10 days refrigerated.',
    adverseEffects: '## Adverse effects\n\nLocal intolerance, hypersensitivity, gastrointestinal disorders.',
    bibliography: [BIB.garrahan('cefTAZidime', ' (code 0039, ATC J01DD)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'azt-001', name: 'Aztreonam', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of severe Gram (-) infections in patients allergic to penicillins.',
    indications: `${MAIN}\n\nTreatment of severe Gram (-) infections in patients allergic to penicillins.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial containing 1 g (Richet, Norgreen).',
        reconstitution: '10 mL SWFI. Conc: 100 mg/mL.',
        diluent: '1 g in 100 mL NS.',
        finalConcentration: '10 mg/mL.',
        administration: 'Intermittent IV: Yes. Dilute 1 g in 100 mL NS or 5% dextrose and administer over 20-60 min.',
        notes: 'Do not administer with other medications. If simultaneous administration is required, suspend aztreonam administration.',
      },
      pediatrico: {
        dose: '90-120 mg/kg/day every 6-8 h, maximum dose: 8 g/day. Adults: 1-2 g every 8 h. Cystic fibrosis: 150 mg/kg/day every 8 h.',
        administration: 'IV',
        presentation: 'Powder vial: 1 g',
        notes: 'Administer by IV infusion over 20-60 minutes. Each gram of aztreonam contains 780 mg of arginine.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 7 days refrigerated.\n\n## Diluted solution (for administration)\n\n- Not specified.',
    adverseEffects: '## Adverse effects\n\nHypotension, rash, seizures, nausea, vomiting, anorexia, abdominal pain, pseudomembranous colitis, eosinophilia, leukopenia, neutropenia, thrombocytopenia.',
    bibliography: [BIB.garrahan('Aztreonam*', ' (code 1445, ATC J01DF)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'azt-002', name: 'Aztreonam-avibactam', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of severe Gram (-) infections in patients allergic to penicillins.',
    indications: `${MAIN}\n\nTreatment of severe Gram (-) infections in patients allergic to penicillins.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial with lyophilized powder containing 1.5 g aztreonam + 0.5 g avibactam (in two separate vials) (Emblaveo).',
        reconstitution: 'Reconstitute each vial individually with 10 mL SWFI or NS. Combined final conc: aztreonam 100 mg/mL + avibactam 33.3 mg/mL. Mix both reconstituted vials before diluting.',
        diluent: '1 dose in 100-250 mL NS or 5% dextrose.',
        finalConcentration: 'Aztreonam conc: ≤ 27 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Infusion over 3 hours (extended infusion). Usual dose: aztreonam 6 g + avibactam 2 g/day in 3 doses.',
        notes: 'Indicated for MBL-producing Enterobacterales infections (including NDM). Do not mix with other medications. Protect from light.',
      },
      pediatrico: {
        dose: '90-120 mg/kg/day every 6-8 h, maximum dose: 8 g/day. Adults: 1-2 g every 8 h. Cystic fibrosis: 150 mg/kg/day every 8 h.',
        administration: 'IV',
        presentation: 'Powder vial: 1 g',
        notes: 'Administer by IV infusion over 20-60 minutes. Each gram of aztreonam contains 780 mg of arginine.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Use immediately. If not possible, max. 1 h at room temperature or 24 h refrigerated (undiluted).\n\n## Diluted solution (for administration)\n\n- 12 h at room temperature or 24 h refrigerated once diluted.',
    adverseEffects: '## Adverse effects\n\nHypotension, rash, seizures, nausea, vomiting, anorexia, abdominal pain, pseudomembranous colitis, eosinophilia, leukopenia, neutropenia, thrombocytopenia.',
    bibliography: [BIB.garrahan('Aztreonam*', ' (code 1445, ATC J01DF)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'dop-001', name: 'Dopamine', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Positive inotropic effect. Increases renal, coronary, and cerebral flow. Increases diuresis, dose-dependent.',
    indications: `${MAIN}\n\nPositive inotropic effect. Increases renal, coronary, and cerebral flow. Increases diuresis, dose-dependent.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: '2–20 mcg/kg/min titrated according to hemodynamic response.',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
      pediatrico: {
        presentation: '5 mL ampoules: 40 mg/mL',
        administration: 'IV',
        diluent: '0.9% NaCl, Ringer or 5% dextrose.',
        finalConcentration: '3.2 mg/mL (up to 6 mg/mL in case of fluid restriction).',
        infusionRate: 'Per medical indication, with infusion pump.',
        dose: '2-20 µg/kg/min by continuous infusion. Maximum dose: 50 µg/kg/min.',
        notes: 'Dilute with normal saline or 5% dextrose for administration. Incompatible with alkaline solutions. Cardiac effects of dopamine are antagonized by beta-blockers and peripheral vasoconstriction caused by high doses of dopamine is antagonized by alpha-adrenergic blockers. IV administration of phenytoin in patients receiving dopamine causes hypotension and bradycardia.',
      },
      neonatal: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: '2–10 mcg/kg/min in NICU; close monitoring.',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
    },
    stability: '## General\n\n- Protect from light; stability 24 h per institutional dilution.\n\n## Pediatric guide\n\n- 24 h once diluted.',
    adverseEffects: '## Adverse effects\n\nTachycardia, palpitations, hypotension, vasoconstriction, headache, anxiety, confusion, weakness, nausea, vomiting, dyspnea, mydriasis.',
    bibliography: [BIB.garrahan('DOPamine Hydrochloride', ' (code 0080, ATC C01CA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dob-001', name: 'Dobutamine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Synthetic catecholamine with inotropic activity. Selective action on β1 receptors.',
    indications: `${MAIN}\n\nSynthetic catecholamine with inotropic activity. Selective action on β1 receptors.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: '2.5–20 mcg/kg/min titrated.',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
      pediatrico: {
        presentation: '20 mL ampoules: 12.5 mg/mL',
        reconstitution: 'Reconstitute per prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: '2-20 µg/kg/min, Maximum dose in adults: 40 µg/kg/min',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'IV',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'For IV administration dilute in normal saline or 5% dextrose with a maximum concentration of 5 mg/mL. Dilution is stable 24 h. Incompatible with alkaline solutions. Compatible with: dopamine, epinephrine, vecuronium, isoproterenol, and lidocaine. Do not administer to patients with dynamic left ventricular outflow obstruction. Pink coloration indicates mild oxidation but no loss of potency',
      },
      neonatal: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: '2–10 mcg/kg/min in NICU under specialized prescription.',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
    },
    stability: '## Stability\n\n- Use within 24 h; protect from light per guide.',
    adverseEffects: '## Adverse effects\n\nAnxiety, confusion, weakness, nausea, vomiting, reflex bradycardia. Arrhythmias and tachycardia with high doses.',
    bibliography: [BIB.garrahan('DOBUTamine Hydrochloride', ' (code 0078, ATC C01CA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hal-001', name: 'Haloperidol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antipsychotic. Antiemetic. First-line in pediatric chorea.',
    indications: `${MAIN}\n\nAntipsychotic. Antiemetic. First-line in pediatric chorea.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 5 mg/mL.',
        dose: '0.5–5 mg IV/IM every 30–60 min PRN agitation.',
        administration: 'Slow IV or IM.',
      },
      pediatrico: {
        dose: 'Children: Initial: 0.025 - 0.05 mg/kg/day every 8-12 h, increase until symptoms are controlled or adverse effects intolerable. Maintenance: psychotic disorders: 0.05-0.15 mg/kg/day every 8-12 h, non-psychotic disorders: 0.05-0.075 mg/kg/day every 8-12 h, agitation-hyperkinesia-antiemetic: 0.01-0.03 mg/kg/day in a single dose. Adults: 5-10 mg/dose every 8-12 h.',
        administration: 'PO IV IM',
        presentation: 'Tablets: 1-5-10 mg; Drops: 2 mg/mL (0.1 mg/drop); 1 mL ampoules: 5 mg/mL; Haloperidol decanoate ampoules 3 mL: 50 mg/mL',
        notes: 'CNS depressants may increase adverse effects of haloperidol. With epinephrine may cause hypotension. Carbamazepine and phenobarbital may increase haloperidol metabolism and decrease its effectiveness. Haloperidol decanoate is depot and can only be given IM. Not recommended in children under 3 years.',
      },
      neonatal: {
        dose: 'Not recommended except specialized psychiatric indication.',
        administration: 'IV.',
      },
    },
    stability: '## Stability\n\n- IV use undiluted or per prescribing information.',
    adverseEffects: '## Adverse effects\n\nSevere extrapyramidal and hypothalamic reactions, dystonia. Has fewer muscarinic and hypotensive effects and more extrapyramidal effects than chlorpromazine.',
    bibliography: [BIB.garrahan('haloPERIDol', ' (code 0109, ATC N05AD)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'lid-001', name: 'Lidocaine', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anal irritation, proctitis.',
    indications: `${MAIN}\n\nAnal irritation, proctitis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 1% (10 mg/mL) and 2%.',
        dose: 'Bolus 1–1.5 mg/kg IV; infusion 1–4 mg/min.',
        administration: 'Slow IV bolus and infusion.',
      },
      pediatrico: {
        presentation: 'Ointment (each 100 g contains): Lidocaine 5 g + Hydrocortisone acetate: 0.25 g',
        administration: 'Rectal',
        finalConcentration: '20 mg/mL for bolus. 8 mg/mL for infusion.',
        infusionRate: 'Continuous infusion with infusion pump.',
        dose: 'Apply 2 or 3 times per day (maximum 6 g rectal ointment/day).',
        notes: 'Do not use for prolonged periods.',
      },
      neonatal: {
        dose: '0.5–1 mg/kg bolus per NICU arrhythmia protocol.',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- Use immediately after withdrawal for bolus.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nContact dermatitis, allergic reactions.',
    bibliography: [BIB.garrahan('Lidocaine + Hydrocortisone Acetate', ' (code 1157, ATC D07XA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cip-001', name: 'Ciprofloxacin', version: '1.2.2', updatedAt: '2026-07-10',
    executiveSummary: 'Fluoroquinolone. Treatment of respiratory tract, middle ear, urinary tract, skin and soft tissue infections caused by susceptible bacteria: aerobic gram-negative, Mycobacterium tuberculosis, and some gram-positive.',
    indications: `${MAIN}\n\nFluoroquinolone. Treatment of respiratory tract, middle ear, urinary tract, skin and soft tissue infections caused by susceptible bacteria: aerobic gram-negative, Mycobacterium tuberculosis, and some gram-positive.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachet containing 200 mg (Norgreen, Rivero).',
        reconstitution: 'No prior reconstitution required. Conc: 200 mg / 100 mL.',
        finalConcentration: '200 mg / 100 mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. 200 mg over 30 min, 400 mg over 60 min.',
        notes: 'Do not remove protective cover (black plastic bag) until time of use.',
      },
      pediatrico: {
        presentation: 'Tablets: 250-500 mg; Solution (compounded preparation): 30 mg/mL; Powder vial: 200 mg; Ophthalmic drops: 0.3% Ophthalmic ointment: 0.3%',
        administration: 'PO IV Topical',
        diluent: '0.9% NaCl, 5% and 10% dextrose.',
        finalConcentration: '2 mg/mL.',
        infusionRate: '60 min.',
        dose: 'Mild and moderate infections: 20 mg/kg/day every 12 h, maximum dose: PO: 500 mg/dose; IV: 400 mg/dose. Severe infections, pyelonephritis and cystic fibrosis PO/IV: 30 mg/kg/day, PO: every 12 h, maximum dose: 1.5 g/day; IV: every 8 h, maximum dose: 1.2 g/day. Meningococcal prophylaxis (contact): PO: 20 mg/kg single dose, maximum: 500 mg/dose. Ophthalmic drops: every 2 - 3 h',
        notes: 'Use in pediatrics is advised only in special situations. Administer away from meals. Antacids (containing calcium, magnesium, or aluminum) and sucralfate decrease ciprofloxacin absorption if administered concomitantly. Increases risk of nephrotoxicity with cyclosporine.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (for administration)\n\n- Not specified.\n\n## Pediatric guide\n\n- Once opened, 14 days at room temperature.',
    adverseEffects: '## Adverse effects\n\nArthralgia, nausea, vomiting, headache, dizziness, rash, crystalluria. Tendon ruptures (most frequently Achilles tendon) from 48 h of treatment.',
    bibliography: [BIB.garrahan('CIPROfloxacin', ' (code 0281, ATC J01MA)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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

console.log(`\nEN Garrahan batch 3 (part B): ${drugs.length} monographs`);
