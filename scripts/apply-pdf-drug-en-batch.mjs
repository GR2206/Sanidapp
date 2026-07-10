#!/usr/bin/env node
/**
 * Applies manual EN translations from PDF batch (41 drugs) + translationReviewed flag.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EN_DIR = path.join(__dirname, '../content/locales/en/farmacologia/drugs');

const BIB = {
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  anmat: { citation: 'ANMAT. Drug information and authorized prescribing information in Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). ICU medication guidelines.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sadi: { citation: 'Argentine Society of Infectious Diseases (SADI). Guidelines and consensus statements.', url: 'https://www.sadi.org.ar/' },
  sadiUcip: { citation: 'Infectious Diseases Service, Infection Prevention and Control. UCIP 2026 — Dilution and stability guide.', url: 'https://www.sadi.org.ar/' },
  pedGuide: { citation: 'Institutional pediatric dilution and administration guide. June 2026.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Clinical practice guidelines.', url: 'https://www.idsociety.org/' },
  sac: { citation: 'Argentine Society of Cardiology. Clinical practice guidelines.', url: 'https://www.sac.org.ar/' },
  heart: { citation: 'American Heart Association. Hypertension and heart failure guidelines.', url: 'https://www.heart.org/' },
  heartArr: { citation: 'American Heart Association. Hypertension and arrhythmia guidelines.', url: 'https://www.heart.org/' },
  heartAf: { citation: 'American Heart Association. Atrial fibrillation guidelines.', url: 'https://www.heart.org/' },
  esc: { citation: 'European Society of Cardiology. Heart failure guidelines.', url: 'https://www.escardio.org/' },
  sanfordPip: { citation: 'Sanford Guide to Antimicrobial Therapy — Piperacillin-tazobactam.', url: 'https://www.sanfordguide.com/' },
  anmatPip: { citation: 'ANMAT. Drug information — Piperacillin and tazobactam.', url: 'https://www.argentina.gob.ar/anmat' },
};

const ADJUST = '> Adjust according to institutional protocols and medical prescription.';

const drugs = [
  {
    id: 'tob-001', name: 'Tobramycin', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Aminoglycoside with greater antipseudomonal activity; IV, IM, or inhaled use in cystic fibrosis.',
    indications: `## Indications\n\n- *Pseudomonas* infections in combination.\n- Inhaled in cystic fibrosis exacerbations (specific presentation).\n\n## Precautions\n\n- Monitor levels and renal function.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '40 mg/mL IV ampoule; solution for nebulization.', dose: '5–7 mg/kg/day IV divided every 8 h. Inhaled: according to cystic fibrosis protocol.', administration: 'IV or inhaled.' },
      pediatrico: { dose: '5–7 mg/kg/day IV every 8 h.', administration: 'IV/inhaled as indicated.' },
      neonatal: { dose: '4–5 mg/kg/dose every 24–48 h (NICU).', administration: 'IV.' },
    },
    stability: '## Stability\n\n- IV diluted: 24 h refrigerated.\n- Nebulization: use immediately.',
    adverseEffects: '## Adverse effects\n\n- Nephrotoxicity, ototoxicity, bronchospasm (inhaled).',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'pen-002', name: 'Benzathine penicillin G', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Long-acting depot penicillin for syphilis and rheumatic fever prophylaxis; IM only.',
    indications: `## Indications\n\n- Syphilis (stage-specific regimens).\n- Secondary prophylaxis of rheumatic fever.\n- Prophylaxis of post-streptococcal glomerulonephritis in specific regimens.\n\n## Precautions\n\n- Deep IM only. Do not administer IV (severe risk).\n- Penicillin allergy.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial with lyophilized powder containing 1.2 and 2.4 MIU (Galtamicina, Klonal, Fabra, Richet, Pen Di Ben).',
        reconstitution: '5 mL sterile water (SW) for 1.2 MIU; 10 mL SW for 2.4 MIU. Concentration: 0.24–0.12 MIU/mL.',
        diluent: '1.2 MIU in 5 mL SW or 2.4 MIU in 10 mL SW.',
        finalConcentration: '0.24 MIU/mL.',
        administration: 'Deep IM: Yes. Gently shake to wet the powder, then shake vigorously until completely dissolved. Direct IV: No. Intermittent IV: No.',
        notes: 'Must not be administered via IV under any circumstances due to the risk of fatal ischemia.',
      },
      pediatrico: { dose: 'Rheumatic fever: 600,000 IU IM every 3–4 weeks (< 27 kg) or 1.2 million IU (≥ 27 kg).', administration: 'Deep IM. Do not administer IV.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): use immediately. Discard any remaining amount.\n- Diluted solution (to be administered): not applicable.',
    adverseEffects: '## Adverse effects\n\n### Common\n\n- Pain at the IM site, Jarisch–Herxheimer reaction in syphilis.\n\n### Severe\n\n- Anaphylaxis.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'tic-001', name: 'Ticarcillin/clavulanic acid', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Historical antipseudomonal in combination; use according to antibiogram and institutional availability.',
    indications: `## Indications\n\n- Gram-negative infections, including *Pseudomonas*, in combination regimens.\n- Alternative according to local susceptibility when included in the formulary.\n\n## Precautions\n\n- Penicillin allergy.\n- Adjust for chronic kidney disease (CKD).\n- Use restricted due to the availability of alternatives.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '3.1 g vial (3 g ticarcillin + 0.1 g clavulanate).', reconstitution: 'Reconstitute with 13 mL of diluent according to package insert.', dose: '3.1 g IV every 4–6 h.', infusionRate: 'Infuse over 30 min.', administration: 'IV.' },
      pediatrico: { dose: '200–400 mg/kg/day of ticarcillin divided every 4–6 h (max. per protocol).', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Use dilution within 6–24 h depending on diluent and package insert.',
    adverseEffects: '## Adverse effects\n\n### Frequent\n\n- Diarrhea, phlebitis, hypokalemia with high doses.\n\n### Serious\n\n- Anaphylaxis, *C. difficile* colitis.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'mag-001', name: 'Magnesium sulfate', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Electrolyte with a role in *torsades de pointes*, eclampsia, and severe asthma (protocol).',
    indications: `## Indications\n\n- *Torsades de pointes*, symptomatic hypomagnesemia.\n- Eclampsia / severe preeclampsia (obstetric protocol).\n- Refractory severe asthma (regimens).\n\n## Precautions\n\n- Respiratory depression and areflexia in case of overdose.\n- Monitor patellar reflex and respiratory rate (RR).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '10% ampoule (1 g = 10 mL).', dose: '*Torsades*: 1–2 g IV over 15 min. Eclampsia: 4–6 g loading dose according to protocol.', administration: 'Slow IV.' },
      pediatrico: {
        presentation: '25% magnesium sulfate ampoule (10 mL).', administration: 'IV or IM.', diluent: '0.9% NaCl solution, 5% dextrose.',
        finalConcentration: '200 mg/mL.', infusionRate: '15–20 min in medical emergencies; otherwise 2–4 h.',
        dose: 'Asthma crisis: 25–75 mg/kg/dose; max 2 g.',
        notes: 'Used for asthma crisis, arrhythmias, hypomagnesemia, hypocalcemia; anticonvulsant. May cause drowsiness, hypotension, CNS depression, diarrhea.',
      },
      neonatal: { dose: '25–50 mg/kg slow IV according to NICU protocol.', administration: 'IV over 20 min.' },
    },
    stability: '## General\n\n- Compatible in 5% NaCl and 5% dextrose.\n\n## Pediatric guide\n\n- Discard once opened.',
    adverseEffects: '## Adverse effects\n\n- Flushing, hypotension, respiratory depression, areflexia.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'tig-001', name: 'Tigecycline', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'IV glycylcycline reserved for complicated intra-abdominal and skin polymicrobial infections.',
    indications: `## Indications\n\n- Complicated intra-abdominal and skin infections when alternatives are not suitable.\n\n## Precautions\n\n- Higher mortality in bacteremia in some studies; not first-line in sepsis.\n- Frequent nausea.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial with lyophilized powder containing 50 mg (Tigeciclina Richet, Tygacil).',
        reconstitution: '5 mL normal saline (NS) or 5% dextrose (D5W). Concentration: 10 mg/mL.',
        diluent: '50 mg in 100 mL of NS or D5W.', finalConcentration: '0.5 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 100 mL NS or D5W and infuse over 30–60 min.',
        notes: 'Do not administer simultaneously with amphotericin B, amphotericin B lipid complex, or diazepam. If the loading dose is 200 mg, dilute in 200 mL of NS or D5W.',
      },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): 24 h at room temperature.\n- Diluted solution (to be administered): 48 h at room temperature.',
    adverseEffects: '## Adverse effects\n\n- Nausea, vomiting, hyperbilirubinemia, pancreatitis (rare).',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'srf-001', name: 'Pulmonary surfactant', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Intratracheal drug for neonatal respiratory distress syndrome and prophylaxis in premature infants.',
    indications: `## Indications\n\n- Neonatal RDS (hyaline membrane disease).\n- Prophylaxis in premature infants < 32 weeks.\n\n## Precautions\n\n- Bradycardia and desaturation during instillation: pause and ventilate.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Not routinely indicated in adults.', dose: 'N/A for routine adult use.', administration: 'N/A.' },
      pediatrico: { dose: '100–200 mg/kg intratracheally in newborns (dose according to product).', administration: 'Intratracheal with mechanical ventilation (MV).' },
      neonatal: { dose: '100–200 mg/kg endotracheally; repeat according to NICU protocol.', administration: 'Intratracheal with MV.' },
    },
    stability: '## Stability\n\n- Refrigerate; warm to room temperature before instillation.',
    adverseEffects: '## Adverse effects\n\n- Transient desaturation, bradycardia, reflux of the medication.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'tei-001', name: 'Teicoplanin', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Glycopeptide with loading and maintenance dosing; alternative to IV vancomycin.',
    indications: `## Indications\n\n- Gram-positive infections including MRSA.\n- Prophylaxis in orthopedic/cardiac surgery in regimens.\n\n## Precautions\n\n- Mandatory loading dose.\n- Monitor renal function and levels according to protocol.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '200 mg or 400 mg vial.', reconstitution: 'Reconstitute with water for injection; foaming is normal, allow to stand.', dose: 'Loading: 6 mg/kg every 12 h × 3 doses. Maintenance: 6 mg/kg every 24 h.', infusionRate: 'Slow IV infusion over 30 min.', administration: 'IV or IM.' },
      pediatrico: { dose: 'Loading: 10 mg/kg every 12 h × 3; maintenance: 6–10 mg/kg every 24 h.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Reconstituted solution: 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\n- Rash, nephrotoxicity, ototoxicity, histamine reactions (rapid infusion).',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'tel-001', name: 'Telmisartan', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Long-acting ARB for HTN and reduction of cardiovascular risk.',
    indications: `## Indications\n\n- Essential arterial hypertension.\n- Reduction of cardiovascular events in high-risk patients (according to registered indication).\n\n## Precautions\n\n- Contraindicated in pregnancy.\n- Exercise caution with potassium-sparing diuretics.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '40 and 80 mg tablets.', dose: '40–80 mg/day PO in a single dose.', administration: 'PO with or without food.' },
      pediatrico: { dose: '1–2 mg/kg/day PO (limited use, cardiology protocol).', administration: 'PO.' },
    },
    stability: '## Stability\n\n- Store according to package insert.',
    adverseEffects: '## Adverse effects\n\n- Hypotension, hyperkalemia, dizziness, back pain (rare).',
    bibliography: [{ citation: 'American Heart Association. Hypertension guidelines.', url: 'https://www.heart.org/' }, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'tri-001', name: 'Trimethoprim+sulfamethoxazole', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Combined sulfonamide (co-trimoxazole); UTIs, *Pneumocystis*, and community-acquired cutaneous MRSA.',
    indications: `## Indications\n\n- UTI, prostatitis, susceptible respiratory infections.\n- Prophylaxis and treatment of *Pneumocystis jirovecii*.\n- Community-acquired cutaneous MRSA.\n\n## Precautions\n\n- Risk of severe cutaneous reactions (SJS/TEN).\n- Adjust in chronic kidney disease (CKD).\n- Hyperkalemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule containing 80 mg trimethoprim (TMP) + 400 mg sulfamethoxazole (SMX) in 5 mL (Cotrizol G, Novidrine, Bactrim, Danferane, Spectrex).',
        reconstitution: 'No prior reconstitution required. Concentration: 16 mg/mL TMP and 80 mg/mL SMX.',
        diluent: '80 mg TMP / 400 mg SMX in 100 mL of NS or 5% dextrose (D5W).', finalConcentration: '0.8 mg/mL TMP and 4 mg/mL SMX.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute 1 ampoule in 100 mL NS and infuse over 30–60 min. Do not exceed 90 min.',
        notes: 'A dilution ratio of 1 mL TMP+SMX in 5 mL diluent is recommended.',
      },
      pediatrico: {
        presentation: '80 mg–400 mg/5 mL ampoule.', administration: 'IV.', diluent: '0.9% NaCl solution, 5% and 10% dextrose.',
        finalConcentration: '1.6 mg/mL.', infusionRate: 'No less than 60 min with a syringe pump.',
        dose: '6–12 mg/kg/day in 2 daily doses. Max 15–20 mg/kg/day in 3–4 daily doses. For dose calculation, consider the 80 mg of trimethoprim (TMP), NOT the 480 mg combined with sulfamethoxazole.',
        notes: 'Antibiotic for urinary tract infections, otitis media, chronic bronchitis, and pneumonitis. May cause hypotension, hallucinations, seizures, fever, nausea, vomiting, diarrhea, and phlebitis.',
      },
      neonatal: { dose: 'Avoid < 2 months unless vital indication; dosing according to NICU.', administration: 'PO/IV.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): not applicable.\n- Diluted solution (to be administered): 2 h at room temperature. Prepare immediately before use.\n\n## Pediatric guide\n\n- Discard leftovers once opened.',
    adverseEffects: '## Adverse effects\n\n- Rash, hyperkalemia, myelotoxicity, crystalluria.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'sal-001', name: 'Salbutamol', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Short-acting beta-2 agonist for acute bronchospasm; nebulization or MDI.',
    indications: `## Indications\n\n- Asthmatic crisis and exacerbated COPD.\n- Perioperative bronchospasm.\n\n## Precautions\n\n- Tachycardia, hypokalemia with high doses.\n- Monitor K+ during IV infusion.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Nebulization solution 5 mg/mL; MDI; IV ampoule.', dose: 'Neb: 2.5–5 mg every 20 min × 3. IV: 0.5 mcg/kg/min infusion in severe crisis.', administration: 'Nebulization or IV.' },
      pediatrico: { dose: 'Neb: 0.15 mg/kg (min 2.5 mg).', administration: 'Nebulization.' },
      neonatal: { dose: 'Neb: 0.1–0.3 mg/kg; IV infusion in bronchopulmonary dysplasia according to NICU protocol.', administration: 'Neb/IV.' },
    },
    stability: '## Stability\n\n- Use fresh solution for nebulization.',
    adverseEffects: '## Adverse effects\n\n- Tachycardia, tremor, hypokalemia, arrhythmias.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vas-001', name: 'Vasopressin', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Antidiuretic hormone at vasopressor doses; adjuvant in refractory septic shock.',
    indications: `## Indications\n\n- Refractory vasodilator shock (refractory to catecholamines).\n- Esophageal variceal bleeding (specific regimens).\n\n## Precautions\n\n- Peripheral, digital, or mesenteric ischemia.\n- Do not administer as a rapid bolus unless protocol dictates otherwise.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule or vial for IV infusion according to institutional availability.',
        reconstitution: 'Reconstitute according to package insert; dilute in 5% dextrose (D5W) or 0.9% NaCl.',
        diluent: '5% dextrose (D5W) or 0.9% NaCl.', finalConcentration: 'Per departmental guidelines (infusion pump).',
        dose: '0.03–0.04 IU/min fixed or 0.01–0.04 IU/min according to sepsis protocol.', infusionRate: 'Titrate according to blood pressure (BP) and perfusion.',
        administration: 'Continuous IV infusion via pump; central line preferred.', compatibility: 'Verify inline compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
      pediatrico: {
        presentation: 'Ampoule or vial for IV infusion according to institutional availability.',
        reconstitution: 'Reconstitute according to package insert; dilute in 5% dextrose (D5W) or 0.9% NaCl.',
        diluent: '5% dextrose (D5W) or 0.9% NaCl.', finalConcentration: 'Per departmental guidelines (infusion pump).',
        dose: '0.0002–0.002 IU/kg/min (pediatric protocol).', infusionRate: 'Titrate according to blood pressure (BP) and perfusion.',
        administration: 'Continuous IV infusion via pump; central line preferred.', compatibility: 'Verify inline compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
      neonatal: {
        presentation: 'Ampoule or vial for IV infusion according to institutional availability.',
        reconstitution: 'Reconstitute according to package insert; dilute in 5% dextrose (D5W) or 0.9% NaCl.',
        diluent: '5% dextrose (D5W) or 0.9% NaCl.', finalConcentration: 'Per departmental guidelines (infusion pump).',
        dose: 'Weight-based dosing according to NICU protocol for refractory shock.', infusionRate: 'Titrate according to blood pressure (BP) and perfusion.',
        administration: 'Continuous IV infusion via pump; central line preferred.', compatibility: 'Verify inline compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
    },
    stability: '## Stability\n\n- Dilution stability according to package insert; rotate infusion site.',
    adverseEffects: '## Adverse effects\n\n- Peripheral ischemia, bradycardia, hypo/hypernatremia depending on context.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pos-001', name: 'Posaconazole', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'IV triazole (Noxafil) for prophylaxis and treatment of aspergillosis and invasive mycoses; requires an in-line filter.',
    indications: `## Indications\n\n- Prophylaxis of invasive aspergillosis in high-risk patients.\n- Treatment of aspergillosis and other invasive mycoses as prescribed.\n\n## Precautions\n\n- 0.22 μm in-line filter mandatory.\n- Central line preferred.\n- Multiple interactions due to CYP3A4 inhibition.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Solution for concentrate for infusion containing 300 mg in 16.7 mL (18 mg/mL) (Noxafil IV).',
        reconstitution: 'No prior reconstitution required. Concentration: 18 mg/mL.',
        diluent: '300 mg in 150–250 mL of NS, D5W, or lactated Ringer\'s.', finalConcentration: '1–2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 150–250 mL of NS, D5W, or lactated Ringer\'s and infuse over 90 min using an in-line filter (0.22 μm). Prefer central line.',
        notes: 'Requires a 0.22 μm in-line filter. Prefer central line (irritant in peripheral line). Loading dose: 300 mg every 12 h on day 1; maintenance: 300 mg/day. Multiple interactions due to CYP3A4 inhibition.',
      },
      pediatrico: { dose: 'Regimens under pediatric infectious disease supervision.', administration: 'Intermittent IV according to protocol.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): not applicable.\n- Diluted solution (to be administered): 12 h at room temperature, 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\n- Nausea, diarrhea, elevated transaminases, QT prolongation.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
];

// Part 2 drugs - appended in same array via spread in main
const drugsPart2 = [
  {
    id: 'suf-001', name: 'Sufentanil', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Highly potent opioid for balanced anesthesia and ICU sedation.',
    indications: `## Indications\n\n- Analgesia in major anesthesia.\n- Sedoanalgesia in the ICU in regimens with midazolam/propofol.\n\n## Precautions\n\n- High potency: critical dosing errors.\n- Respiratory depression.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '50 mcg/mL ampoule.', dose: 'Bolus 5–20 mcg; infusion 0.1–0.5 mcg/kg/h.', administration: 'IV by pump.' },
      pediatrico: { dose: '0.5–1 mcg/kg bolus; infusion according to protocol.', administration: 'IV.' },
      neonatal: { dose: 'Microdoses in NICU according to analgesia protocol.', administration: 'IV by pump.' },
    },
    stability: '## Stability\n\n- Prepare in pump with double check.',
    adverseEffects: '## Adverse effects\n\n- Apnea, chest wall rigidity, bradycardia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'roc-001', name: 'Rocuronium', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Rapid-onset non-depolarizing relaxant for intubation and neuromuscular blockade in the ICU.',
    indications: `## Indications\n\n- Rapid sequence intubation (alternative to succinylcholine).\n- Neuromuscular blockade in mechanical ventilation.\n\n## Precautions\n\n- Reversal with sugammadex available.\n- Adjust in severe liver disease.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '10 mg/mL vial.', dose: 'RSI: 0.6–1.2 mg/kg IV. Maintenance: 0.1–0.2 mg/kg/h.', administration: 'IV bolus or infusion.' },
      pediatrico: {
        presentation: '50 mg/5 mL vial.', diluent: '0.9% NaCl solution, 5% dextrose.', finalConcentration: '0.5 to 1 mg/mL. May be administered undiluted.',
        dose: 'For intubation: 0.45 to 0.6 mg/kg/dose. Infusion: 7 to 12 mcg/kg/min.', infusionRate: 'Push or infusion with infusion pump.', administration: 'IV.',
        compatibility: 'Incompatible with thiopental, amphotericin, amoxicillin, dexamethasone, diazepam, furosemide, insulin, methylprednisolone, vancomycin.',
        notes: 'Neuromuscular blocker; requires ventilatory support during administration; does not alter consciousness. May cause prolonged neuromuscular blockade, anaphylaxis.',
      },
      neonatal: { dose: '0.45–1 mg/kg according to NICU protocol.', administration: 'IV.' },
    },
    stability: '## General\n\n- Opened vial according to package insert.\n\n## Pediatric guide\n\n- 30 days in the refrigerator once opened.',
    adverseEffects: '## Adverse effects\n\n- Hypotension, tachycardia, prolonged blockade.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vrp-001', name: 'Verapamil', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Calcium channel blocker for supraventricular tachycardia, AF, and angina.',
    indications: `## Indications\n\n- Paroxysmal supraventricular tachycardia (reversion or heart rate control).\n- Atrial fibrillation/flutter.\n- Angina pectoris and HTN.\n\n## Precautions\n\n- Contraindicated with IV beta-blockers, advanced AV block, decompensated HF, and Wolff-Parkinson-White syndrome with AF.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '80 and 120 mg tablets. 5 mg/2 mL ampoule.', dose: 'SVT: 5–10 mg IV over 2 min. PO maintenance: 120–480 mg/day in divided doses.', administration: 'Slow IV under monitoring or PO.' },
      pediatrico: { dose: '0.1–0.2 mg/kg IV (max 5 mg) over 2 min; repeat once if necessary.', administration: 'Slow IV with cardiac monitor.' },
      neonatal: { dose: '0.1–0.2 mg/kg IV according to neonatal cardiology protocol.', administration: 'Slow IV.' },
    },
    stability: '## Stability\n\n- Ampoules: administer IV undiluted or according to protocol.',
    adverseEffects: '## Adverse effects\n\n- Hypotension, bradycardia, AV block, constipation, edema.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'rem-001', name: 'Remifentanil', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Ultra-short-acting opioid metabolized by plasma esterases; continuous infusion without accumulation.',
    indications: `## Indications\n\n- Intraoperative analgesia.\n- Sedoanalgesia in the ICU when rapid offset is required.\n\n## Precautions\n\n- Hypotension and bradycardia.\n- Rebound pain upon discontinuation if no alternative analgesia is provided.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '1–5 mg vial.', dose: '0.05–0.2 mcg/kg/min infusion.', administration: 'Continuous IV exclusively.' },
      pediatrico: { dose: '0.1–0.5 mcg/kg/min according to protocol.', administration: 'IV.' },
      neonatal: { dose: 'Used in NICU according to anesthetic/neonatal protocol.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Reconstitute according to package insert; use within 24 h.',
    adverseEffects: '## Adverse effects\n\n- Apnea, hypotension, muscle rigidity, withdrawal pain.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'prt-001', name: 'Protamine', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Heparin antidote; reversal post-extracorporeal circulation and heparin overdose.',
    indications: `## Indications\n\n- Reversal of unfractionated heparin following cardiac surgery or bleeding due to heparin.\n\n## Precautions\n\n- Anaphylactoid reactions.\n- Anticoagulation rebound.\n- Partial reversal of LMWH (low molecular weight heparin).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '10 mg/mL ampoule.', dose: '1 mg of protamine per 100 IU of residual heparin; slow IV over 10 min (max 50 mg/dose).', administration: 'Very slow IV.' },
      pediatrico: { dose: '1 mg per 100 IU of heparin; max 50 mg.', administration: 'Slow IV.' },
      neonatal: { dose: 'Same mg:IU ratio according to administered heparin.', administration: 'Slow IV.' },
    },
    stability: '## Stability\n\n- Use immediately after dilution.',
    adverseEffects: '## Adverse effects\n\n- Hypotension, bradycardia, anaphylaxis, pulmonary edema.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'rif-001', name: 'Rifampicin', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Rifamycin for tuberculosis, meningococcal prophylaxis, and biofilms on devices (regimens).',
    indications: `## Indications\n\n- Tuberculosis in combination regimens.\n- Prophylaxis for meningococcal meningitis contacts.\n- Component in prosthetic infections in combination.\n\n## Precautions\n\n- Potent enzymatic inducer (interactions).\n- Orange-stained urine/sweat/saliva.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial with lyophilized powder containing 600 mg (Rifampicina Kilab, Richet).',
        reconstitution: '10 mL of sterile water (SW). Concentration: 60 mg/mL.', diluent: '600 mg in 500 mL of 5% dextrose (D5W).', finalConcentration: '1.2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Shake gently until completely dissolved. Dilute in 100–500 mL D5W and infuse over 3 h max.',
        notes: 'After 4 h of preparation, antibiotic precipitation may occur. Preferably use D5W for dilution, as stability is reduced in normal saline (NS).',
      },
      pediatrico: {
        presentation: '600 mg vial.', diluent: 'Preferably D5W. Otherwise, NS.', finalConcentration: '6 mg/mL.',
        dose: '10 to 20 mg/kg. Max 600 mg/day.', infusionRate: '30 min to 3 h with infusion pump.', administration: 'IV.',
        notes: 'Tuberculostatic antibiotic. May cause nausea, vomiting, dizziness, fever, hepatitis, reddish coloration in sputum, urine, and tears.',
      },
      neonatal: { dose: 'Neonatal TB regimens according to national/NICU protocol.', administration: 'PO.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): 24 h at room temperature.\n- Diluted solution (to be administered): 4 h at room temperature.\n\n## Pediatric guide\n\n- 24 h at room temperature when reconstituted; 4 h when diluted.',
    adverseEffects: '## Adverse effects\n\n- Hepatotoxicity, hypersensitivity reactions, orange coloration of body fluids.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'pnc-001', name: 'Pancuronium', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Long-acting non-depolarizing relaxant with vagolytic effect (tachycardia).',
    indications: `## Indications\n\n- Prolonged neuromuscular blockade in surgery and mechanical ventilation (MV).\n\n## Precautions\n\n- Tachycardia.\n- Renal elimination: prolonged in chronic kidney disease (CKD).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '2 mg/mL ampoule.', dose: '0.08–0.12 mg/kg bolus; repeat according to TOF (Train-of-Four).', administration: 'IV.' },
      pediatrico: { dose: '0.1 mg/kg bolus.', administration: 'IV.' },
      neonatal: { dose: '0.05–0.1 mg/kg according to protocol.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Ready for use.',
    adverseEffects: '## Adverse effects\n\n- Tachycardia, prolonged blockade in CKD.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pro-001', name: 'Propofol', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'IV anesthetic/sedative with rapid onset and offset; lipemic, risk of infusion syndrome.',
    indications: `## Indications\n\n- Anesthetic induction and maintenance.\n- ICU sedation (protocol involving lipids and triglycerides).\n\n## Precautions\n\n- Propofol infusion syndrome (PRIS) with high, prolonged doses.\n- Contamination: strict aseptic chain.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '10 mg/mL lipid emulsion (vial/ampoule).', dose: 'Induction 1–2.5 mg/kg IV; sedation 25–75 mcg/kg/min.', administration: 'IV undiluted or by infusion according to protocol.', notes: 'Monitor triglycerides and lactic acid for infusions > 48 h.' },
      pediatrico: {
        presentation: '200 mg/mL ampoule.', finalConcentration: 'Administer undiluted.', dose: '2.5 to 3.5 mg/kg.', infusionRate: 'Bolus over 20 to 30 seconds.', administration: 'IV.',
        notes: 'General anesthetic. Must be handled with aseptic technique. Use each vial for a single patient and shake well before administering. May cause significant bradycardia if used with fentanyl, hypotension, fever, headache, dizziness. Green urine, pain at injection site.',
      },
      neonatal: { dose: 'Restricted use in NICU; sedation regimens according to protocol.', administration: 'IV.' },
    },
    stability: '## General\n\n- Aseptic chain; use within 6–12 h after opening according to service standards.\n\n## Pediatric guide\n\n- Do not refrigerate. Discard any remaining amount once opened. Dilution stable for 12 h at room temperature.',
    adverseEffects: '## Adverse effects\n\n- Hypotension, apnea, PRIS (acidosis, rhabdomyolysis, cardiac failure).',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'prp-001', name: 'Propranolol', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Non-selective beta-blocker for hypertension (HTN), angina, arrhythmias, migraine prophylaxis, and hyperthyroidism.',
    indications: `## Indications\n\n- Arterial hypertension and angina.\n- Supraventricular and ventricular arrhythmias (per protocol).\n- Migraine and essential tremor prophylaxis.\n- Symptoms of hyperthyroidism and pheochromocytoma (with prior alpha-blockade).\n\n## Precautions\n\n- Contraindicated in bronchial asthma, advanced AV block, and cardiogenic shock.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '40 and 80 mg tablets. 1 mg/mL ampoule.', dose: 'HTN/angina: 40–160 mg/day PO in divided doses. IV: 1–3 mg slowly, repeat according to protocol.', administration: 'PO or slow IV.' },
      pediatrico: { dose: '0.5–1 mg/kg/day PO in 3–4 doses. IV: 0.01–0.1 mg/kg slowly.', administration: 'PO or slow IV with monitoring.' },
      neonatal: { dose: '0.01–0.2 mg/kg/dose IV according to neonatal cardiology protocol.', administration: 'Slow IV.' },
    },
    stability: '## Stability\n\n- PO according to package insert. IV use immediately.',
    adverseEffects: '## Adverse effects\n\n- Bradycardia, hypotension, bronchospasm, fatigue, depression, masked hypoglycemia.',
    bibliography: [BIB.heartArr, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'sul-001', name: 'Sulbactam', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Beta-lactamase inhibitor used as monotherapy for *Acinetobacter baumannii* infections according to institutional protocols.',
    indications: `## Indications\n\n- Monotherapy in *Acinetobacter baumannii* infections (intrinsic activity against OXA-23 and similar enzymes).\n- May be combined with colistin or meropenem depending on sensitivity.\n\n## Precautions\n\n- Do not confuse with ampicillin-sulbactam.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial with lyophilized powder containing 1 g of sodium sulbactam (Sulbactam Richet, Northia, others).',
        reconstitution: '10 mL of sterile water (SW) or normal saline (NS). Concentration: 100 mg/mL.',
        diluent: '1 g in 100 mL of NS or 5% dextrose (D5W).', finalConcentration: '10 mg/mL.',
        administration: 'Direct IV: Yes. Reconstitute in 10 mL SW and administer slowly over 3–5 min. Intermittent IV: Yes. Dilute in 50–100 mL NS or D5W and infuse over 15–30 min.',
        notes: 'Usual dose: 3–4 g/day in 3–4 doses or prolonged infusion (1 g every 6 h over 3 h). May be combined with colistin or meropenem depending on sensitivity. Do not confuse with ampicillin-sulbactam.',
      },
      pediatrico: { dose: 'Regimens according to pediatric infectious disease protocols.', administration: 'IV as indicated.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): 8 h at room temperature, 48 h refrigerated.\n- Diluted solution (to be administered): 8 h at room temperature, 48 h refrigerated.',
    adverseEffects: '## Adverse effects\n\n- Diarrhea, rash, phlebitis.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'vor-001', name: 'Voriconazole', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'First-line triazole for invasive aspergillosis; PO/IV with therapeutic drug monitoring and hepatic monitoring.',
    indications: `## Indications\n\n- Invasive and pulmonary aspergillosis.\n- Fungal infections caused by susceptible filamentous fungi.\n\n## Precautions\n\n- Hepatotoxicity, QT prolongation, photosensitivity.\n- Monitor serum levels when available.\n- Multiple drug interactions (CYP2C19).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial with lyophilized powder containing 200 mg (VFend, Richet, Sandoz).',
        reconstitution: '19 mL of sterile water (SW). Concentration: 10 mg/mL.', diluent: '200 mg in 100 mL of NS or 5% dextrose (D5W).', finalConcentration: '2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 100 mL NS or D5W and infuse over 60–120 min.',
      },
      pediatrico: { dose: '9–10 mg/kg/dose IV every 12 h or PO according to pediatric protocol.', administration: 'IV/PO with therapeutic drug monitoring.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): 24 h refrigerated.\n- Diluted solution (to be administered): 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\n- Transient visual disturbances, hepatotoxicity, photosensitive rash, QT prolongation.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'vls-001', name: 'Valsartan', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'ARB for HTN, post-MI heart failure, and ACE inhibitor intolerance.',
    indications: `## Indications\n\n- Arterial hypertension.\n- Heart failure in patients intolerant to ACE inhibitors (post-MI).\n- Post-infarction with left ventricular dysfunction.\n\n## Precautions\n\n- Contraindicated in pregnancy.\n- Do not initiate concomitantly with ACE inhibitors.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '80 and 160 mg tablets.', dose: 'HTN: 80–320 mg/day PO. Post-MI HF: 40 mg every 12 h, titrate to 160 mg every 12 h.', administration: 'PO with or without food.' },
      pediatrico: { dose: '1.3 mg/kg/day PO (max 160 mg/day) in 1–2 doses.', administration: 'PO.' },
    },
    stability: '## Stability\n\n- Store according to package insert.',
    adverseEffects: '## Adverse effects\n\n- Hypotension, hyperkalemia, dizziness, creatinine elevation.',
    bibliography: [BIB.heart, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'sug-001', name: 'Sugammadex', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Specific reversal agent for rocuronium and vecuronium; does not reverse succinylcholine.',
    indications: `## Indications\n\n- Reversal of neuromuscular blockade by rocuronium/vecuronium.\n- Deep reversal in airway emergencies.\n\n## Precautions\n\n- Reduces the efficacy of hormonal contraceptives.\n- Hypersensitivity reactions.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '100–200 mg/mL vial.', dose: '2 mg/kg moderate; 4 mg/kg deep; 16 mg/kg immediate RSI.', administration: 'IV bolus.' },
      pediatrico: { dose: '2–4 mg/kg depending on the depth of blockade.', administration: 'IV.' },
      neonatal: { dose: 'Limited data; use under pediatric anesthesiology guidance.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Use immediately after withdrawal.',
    adverseEffects: '## Adverse effects\n\n- Cough, metallic taste, bradycardia, anaphylaxis.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ran-001', name: 'Ranitidine', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'H2 antagonist antiulcer agent IV/PO; used for stress ulcer prophylaxis and reflux according to institutional protocol.',
    indications: `## Indications\n\n- Stress ulcer prophylaxis in the ICU.\n- Gastroesophageal reflux and erosive gastritis.\n\n## Precautions\n\n- Rapid IV administration may cause bradycardia.\n- Adjust for renal failure.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: '50 mg/5 mL ampoule.', diluent: '0.9% NaCl solution, 5% dextrose.', finalConcentration: '2.5 mg/mL.',
        dose: '2 to 4 mg/kg/day in 3 or 4 daily doses. Max 200 mg/day.', infusionRate: '15 to 30 min with infusion pump.', administration: 'IV or IM.',
        notes: 'Antiulcer agent. May cause dizziness, nausea, vomiting, injection site pain. Rapid IV administration may cause bradycardia.',
      },
    },
    stability: '## Pediatric guide\n\n- 48 h at room temperature.',
    adverseEffects: '## Adverse effects\n\n- Dizziness, nausea, vomiting, bradycardia (rapid infusion), injection site pain.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'tia-001', name: 'Thiamine (vitamin B1)', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'IV vitamin B1 administered before glucose in patients at risk for Wernicke encephalopathy.',
    indications: `## Indications\n\n- Prophylaxis and treatment of Wernicke encephalopathy.\n- Alcoholism, malnutrition, hyperalimentation (before dextrose).\n\n## Precautions\n\n- Administer before glucose in high-risk patients.\n- Anaphylactoid reactions (rare).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '100 mg/mL ampoule.', dose: '100–500 mg slow IV before glucose; then 100 mg TID for 3–5 days.', administration: 'Slow IV.' },
      pediatrico: { dose: '10–25 mg IV/day depending on age.', administration: 'IV.' },
      neonatal: { dose: '10 mg IV/day in parenteral nutrition.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Protect from light.',
    adverseEffects: '## Adverse effects\n\n- Hypersensitivity reactions (rare), local irritation.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'tor-001', name: 'Torasemide', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Loop diuretic with a longer half-life, for CHF and hypertension.',
    indications: `## Indications\n\n- Chronic heart failure, peripheral edema.\n- Arterial hypertension (PO).\n\n## Precautions\n\n- Hypokalemia, hypovolemia.\n- Monitor renal function.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '10 mg/mL ampoule, PO tablets.', dose: '10–20 mg IV/PO every 24 h; titrate according to diuresis.', administration: 'Slow IV or PO.' },
      pediatrico: { dose: '0.1–0.2 mg/kg/dose every 12–24 h (limited use).', administration: 'IV/PO.' },
      neonatal: { dose: 'Restricted use according to NICU cardiorenal protocol.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- IV according to package insert.',
    adverseEffects: '## Adverse effects\n\n- Hypokalemia, dizziness, elevated uric acid.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'val-001', name: 'Valproate', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Broad-spectrum anticonvulsant; IV in status epilepticus and PO in epilepsy. Hepatotoxicity and teratogenicity.',
    indications: `## Indications\n\n- Status epilepticus (IV loading dose if available).\n- Generalized epilepsy, bipolar mania (PO).\n\n## Precautions\n\n- Hepatotoxicity, pancreatitis, teratogenicity.\n- Contraindicated in active liver disease.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'IV 100 mg/mL ampoule; PO syrup/tablets.', dose: 'Loading 20–40 mg/kg IV; maintenance 15–60 mg/kg/day PO in divided doses.', administration: 'IV over 60 min or PO.' },
      pediatrico: { dose: '20–40 mg/kg/day divided every 8–12 h.', administration: 'IV/PO.' },
      neonatal: { dose: 'Restricted use; NICU regimens under neurology guidance.', administration: 'IV/PO.' },
    },
    stability: '## Stability\n\n- IV according to package insert; do not refrigerate if precipitated.',
    adverseEffects: '## Adverse effects\n\n- Nausea, elevated transaminases, thrombocytopenia, hyperammonemia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vec-001', name: 'Vecuronium', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Intermediate-acting non-depolarizing relaxant for neuromuscular blockade in the operating room and ICU.',
    indications: `## Indications\n\n- Neuromuscular blockade for surgery and MV.\n\n## Precautions\n\n- Reversal with neostigmine + atropine or sugammadex.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '4 mg lyophilized vial.', dose: '0.08–0.1 mg/kg bolus; 0.8–1.2 mcg/kg/min infusion.', administration: 'IV.' },
      pediatrico: {
        presentation: 'Vial with powder for reconstitution, 10 mg.', reconstitution: 'Usually with 10 mL (1 mg/mL); in fluid restriction, minimum dilution 5 mL (2 mg/mL).',
        diluent: '0.9% NaCl solution, 5% or 10% dextrose, Ringer\'s.', finalConcentration: '2 mg/mL.', dose: '0.1 mg/kg/dose. For continuous infusion: 0.09 to 0.15 mg/kg/h.', administration: 'IV.',
        notes: 'Neuromuscular blocker. May cause arrhythmia, tachycardia, respiratory failure, apnea. Requires ventilatory support during administration. Does not alter consciousness.',
      },
      neonatal: { dose: '0.1 mg/kg bolus; NICU infusion according to TOF.', administration: 'IV.' },
    },
    stability: '## General\n\n- Reconstitute and use according to package insert.\n\n## Pediatric guide\n\n- 24 h at room temperature.',
    adverseEffects: '## Adverse effects\n\n- Prolonged blockade, bronchospasm (rare).',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'sav-001', name: 'Sacubitril/valsartan', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Neprilysin inhibitor/ARB (ARNI) for heart failure with reduced ejection fraction.',
    indications: `## Indications\n\n- Chronic heart failure with reduced EF (substitute for ACE inhibitor/ARB in eligible patients).\n- Reduction of hospitalizations and cardiovascular mortality in ambulatory HF.\n\n## Precautions\n\n- Discontinue ACE inhibitor 36 h before initiating.\n- Contraindicated in pregnancy and history of angioedema.\n- Monitor for hypotension, hyperkalemia, and renal function.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '24/26, 49/51, and 97/103 mg tablets (sacubitril/valsartan).', dose: 'Start with 49/51 mg PO every 12 h; titrate to 97/103 mg every 12 h as tolerated.', administration: 'PO every 12 h.' },
      pediatrico: { dose: 'Pediatric doses according to specialized cardiology protocol.', administration: 'PO.' },
    },
    stability: '## Stability\n\n- Store according to package insert in the original packaging.',
    adverseEffects: '## Adverse effects\n\n- Hypotension, hyperkalemia, angioedema, cough (less than with ACE inhibitors), dizziness.',
    bibliography: [{ citation: 'American Heart Association. Heart failure guidelines.', url: 'https://www.heart.org/' }, BIB.anmat, BIB.sac, BIB.esc],
  },
  {
    id: 'ppf-001', name: 'Propafenone', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Class IC antiarrhythmic with beta-blocking activity for AF and SVT.',
    indications: `## Indications\n\n- Paroxysmal atrial fibrillation (pharmacological cardioversion or maintenance).\n- Supraventricular tachycardia.\n- Ventricular arrhythmias in selected contexts.\n\n## Precautions\n\n- Contraindicated in heart failure (HF), bronchospasm, AV block, and Brugada syndrome.\n- Interactions with digoxin and warfarin.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '150 and 300 mg tablets. 35 mg/20 mL ampoule.', dose: 'AF: 450–600 mg/day PO divided doses. IV: 2 mg/kg over 10 min (hospital use).', administration: 'PO or IV under cardiac monitoring.' },
      pediatrico: { dose: '8–10 mg/kg/day PO divided doses (specialized use).', administration: 'PO.' },
    },
    stability: '## Stability\n\n- Administer IV according to protocol after dilution.',
    adverseEffects: '## Adverse effects\n\n- Dizziness, metallic taste, proarrhythmia, bradycardia, nausea.',
    bibliography: [BIB.heartAf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'pip-001', name: 'Piperacillin+tazobactam', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Beta-lactam with beta-lactamase inhibitor for severe polymicrobial infections, including *Pseudomonas* in combination regimens.',
    indications: `## Indications\n\n- Complicated intra-abdominal infections, skin and soft tissue infections, nosocomial pneumonia (in regimens according to culture).\n- Sepsis of abdominal or urinary origin, febrile neutropenia (empiric combination therapy per protocol).\n\n## Precautions\n\n- Adjust dose in renal failure.\n- History of penicillin allergy: evaluate risk before administering.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial with lyophilized powder containing 4 g piperacillin (PIP) + 0.5 g tazobactam (Bagótaz, Drawer, FADA, Pharmavial, Piperac Compuesto, Norgreen, Northia, Vredian, Petezam, Richet, Tazonam EDTA).',
        reconstitution: '20 mL of sterile water (SW). PIP concentration: 200 mg/mL.', diluent: '4.5 g in 100 mL of 0.9% normal saline (NS) or 5% dextrose (D5W).', finalConcentration: 'PIP concentration: 40 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Shake gently until dissolved. Dilute in 50–150 mL NS and infuse over 30 min.',
        notes: 'Continuous IV infusion is possible. In that case, 13.5 g (3 vials) are diluted in 250 mL NS to be infused over 24 h.',
      },
      pediatrico: {
        presentation: 'Powder for reconstitution vial 4500 mg.', reconstitution: 'Reconstitute with 17 mL for a final volume of 20 mL.',
        diluent: '0.9% NaCl solution or 5% dextrose, distilled water for reconstitution.', finalConcentration: '20 mg/mL. In fluid restriction: 200 mg/mL.',
        dose: '240 mg/kg/day in 3 doses. Max 18 g/day. For dose calculation, consider only the 4000 mg of piperacillin, NOT the 4500 mg combined with tazobactam.',
        infusionRate: '30 minutes via infusion pump.', administration: 'IV.',
        notes: 'Broad-spectrum antibiotic for sepsis, intra-abdominal, skin and soft tissue, lower respiratory tract, and urinary tract infections. May cause hyper- and hypotension, arrhythmia, cardiac arrest, headaches, seizures, nausea, vomiting, diarrhea, phlebitis. ADMINISTER ALONE.',
      },
      neonatal: { dose: 'Dose and interval according to postmenstrual age, weight, and infectious focus (prescribed by infectious disease/neonatology specialists).', administration: 'IV, preferably central.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): 24 h at room temperature and 48 h refrigerated.\n- Diluted solution (to be administered): 24 h at room temperature and 7 days refrigerated.\n\n## Pediatric guide\n\n- 24 h at room temperature, 48 h in the refrigerator.',
    adverseEffects: '## Adverse effects\n\n### Common\n\n- Diarrhea, nausea, rash, phlebitis.\n\n### Severe\n\n- Hypersensitivity reactions, *C. difficile* colitis.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanfordPip, BIB.anmatPip, { citation: 'Argentine Society of Infectious Diseases (SADI). Antimicrobial management guidelines.', url: 'https://www.sadi.org.ar/' }],
  },
  {
    id: 'ram-001', name: 'Ramipril', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Long-acting lipophilic ACE inhibitor for HTN, heart failure (HF), and cardiovascular prevention.',
    indications: `## Indications\n\n- Arterial hypertension.\n- Heart failure with ventricular dysfunction.\n- Cardiovascular prevention in high-risk patients and post-myocardial infarction.\n- Diabetic nephropathy with microalbuminuria.\n\n## Precautions\n\n- Contraindicated in pregnancy.\n- Use with caution in bilateral renal artery stenosis.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '2.5, 5, and 10 mg tablets.', dose: 'HTN: 2.5–10 mg/day PO. HF: start with 1.25–2.5 mg/day and titrate.', administration: 'PO in 1–2 doses.' },
      pediatrico: { dose: '0.05–0.1 mg/kg/day PO (specialized use).', administration: 'PO.' },
    },
    stability: '## Stability\n\n- Store according to package insert.',
    adverseEffects: '## Adverse effects\n\n- Cough, hypotension, hyperkalemia, headache, dizziness.',
    bibliography: [BIB.heart, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'pan-001', name: 'Pantoprazole', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'IV/PO PPI for stress ulcer prophylaxis and upper gastrointestinal bleeding.',
    indications: `## Indications\n\n- Stress ulcer prophylaxis in the ICU.\n- Upper gastrointestinal bleeding in IV PPI regimens.\n\n## Precautions\n\n- Interactions with clopidogrel (lesser than omeprazole).\n- Prolonged hypomagnesemia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '40 mg IV vial; PO tablets.', dose: '40–80 mg IV every 24 h as infusion or bolus.', administration: 'IV over 15 min or PO.' },
      pediatrico: { dose: '0.5–1 mg/kg/day IV/PO (max 40 mg).', administration: 'IV/PO.' },
      neonatal: { dose: '0.5–1 mg/kg/day in NICU for prophylaxis.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Reconstitute and use according to IV package insert.',
    adverseEffects: '## Adverse effects\n\n- Headache, diarrhea, thrombocytopenia (rare).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'trm-001', name: 'Tramadol', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Weak centrally acting opioid analgesic; use in moderate pain according to institutional prescription in pediatrics.',
    indications: `## Indications\n\n- Moderate acute pain.\n\n## Precautions\n\n- Respiratory depression, risk of seizures, and withdrawal syndrome.\n- Interactions with SSRIs (serotonergic).\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: '100 mg/2 mL ampoule.', diluent: '0.9% NaCl solution, 5% dextrose.', finalConcentration: '25 mg/mL.',
        dose: '1 to 2 mg/kg/dose in 3 daily doses. Max 3 to 6 mg/kg/day.', infusionRate: '20 min with syringe pump.', administration: 'IV, SC, or IM.',
        notes: 'Centrally acting analgesic. May cause syncope, tachycardia, dizziness, seizures, headaches, hallucinations, nausea, vomiting, diarrhea, respiratory depression, withdrawal syndrome, anaphylaxis.',
      },
    },
    stability: '## Pediatric guide\n\n- Discard leftovers once opened.',
    adverseEffects: '## Adverse effects\n\n- Syncope, tachycardia, dizziness, seizures, nausea, vomiting, respiratory depression, anaphylaxis.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'war-001', name: 'Warfarin', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Oral vitamin K antagonist anticoagulant; requires INR monitoring and patient education.',
    indications: `## Indications\n\n- Atrial fibrillation, mechanical valve prosthesis.\n- Chronic PE/DVT.\n\n## Precautions\n\n- Multiple interactions and dietary considerations.\n- Contraindicated in pregnancy.\n- Risk of bleeding.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '5 mg tablets (and other strengths).', dose: 'Initial dose 5 mg/day PO; adjust according to target INR.', administration: 'PO at the same time daily.' },
      pediatrico: { dose: '0.1–0.2 mg/kg/day PO; adjust by INR.', administration: 'PO.' },
      neonatal: { dose: 'Very restricted use; neonatal cardiology regimens.', administration: 'PO.' },
    },
    stability: '## Stability\n\n- Tablets in original packaging.',
    adverseEffects: '## Adverse effects\n\n- Bleeding, skin necrosis (rare at initiation), teratogenicity.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'zid-001', name: 'Zidovudine', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Nucleoside antiretroviral (AZT) for HIV infection and perinatal prophylaxis according to institutional regimens.',
    indications: `## Indications\n\n- Treatment of HIV infection in combination regimens.\n- Perinatal and post-exposure prophylaxis according to protocol.\n\n## Precautions\n\n- Myelotoxicity (anemia, neutropenia).\n- Adjust in renal/hepatic insufficiency.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial containing 200 mg in 20 mL (Zidovudina Dosa).', reconstitution: 'No prior reconstitution required. Concentration: 10 mg/mL.',
        diluent: '200 mg in 50–200 mL of NS or 5% dextrose (D5W).', finalConcentration: '2–4 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 50–100 mL NS or D5W and infuse over 60 min.',
      },
      pediatrico: { dose: 'Regimens according to pediatric HIV protocol.', administration: 'Intermittent IV as indicated.' },
      neonatal: { dose: 'Prophylaxis and treatment according to NICU/perinatal protocol.', administration: 'Slow IV according to regimen.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): not applicable.\n- Diluted solution (to be administered): 24 h at room temperature, 48 h refrigerated.',
    adverseEffects: '## Adverse effects\n\n- Anemia, neutropenia, nausea, headache, myalgia.',
    bibliography: [BIB.sadiUcip, BIB.idsa, BIB.anmat, BIB.sadi],
  },
  {
    id: 'van-001', name: 'Vancomycin', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Bactericidal glycopeptide against Gram-positive bacteria, including MRSA. Used in severe infections and for prophylaxis according to protocol, requiring slow infusion and monitoring for nephrotoxicity and ototoxicity.',
    indications: `## Indications\n\n- Severe Gram-positive infections, including MRSA and enterococci.\n- Ventilator-associated pneumonia, bacteremia, endocarditis, osteomyelitis.\n- Severe *Clostridioides difficile* colitis: oral route according to medical indication.\n\n## Precautions\n\n- Infuse slowly to reduce Red Man Syndrome.\n- Adjust dosage in renal impairment; monitor renal function and serum levels.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial with lyophilized powder containing 1 g (Vancomicina Northia*, Drawer, Varedet*, Fabra*, Vancomax, Richet*, Icopiax, Rivervan).',
        reconstitution: '10 mL of sterile water (SW). Concentration: 100 mg/mL.', diluent: '500 mg in 100 mL of normal saline (NS).', finalConcentration: '5 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute 500 mg in 100 mL NS and infuse over no less than 90 min. Oral: Yes*. Dilute in 30 mL water and administer via nasogastric tube (NGT).',
        notes: 'Rapid IV administration may cause an anaphylactoid reaction with pruritus, skin rash, and muscle pain. These reactions can be avoided by slow administration of the product.',
      },
      pediatrico: {
        presentation: 'Vial with powder for reconstitution, 500/1000 mg.', reconstitution: 'Distilled water for reconstitution.', diluent: '0.9% NaCl solution or 5% dextrose.',
        finalConcentration: '5 mg/mL.', dose: '10 mg/kg/dose in 4 daily doses.', infusionRate: '60 min with a syringe pump.', administration: 'IV.',
        notes: 'Antibiotic for endocarditis, meningitis, osteomyelitis, infections secondary to central catheters, ventriculoperitoneal shunts, hemodialysis fistulas, vascular grafts, cardiac valve prostheses. Ototoxic, nephrotoxic. May cause hypotension, Red Man Syndrome, phlebitis. Bolus administration may induce cardiac arrest.',
      },
      neonatal: { dose: 'Dosage and interval according to postmenstrual age and renal function (NICU protocol).', administration: 'Preferred central route; monitor access and signs of extravasation.' },
    },
    stability: '## Stability\n\n- Reconstituted (in vial): 24 h refrigerated.\n- Diluted solution (to be administered): 24 h at room temperature.\n\n## Pediatric guide\n\n- 96 h in the refrigerator.',
    adverseEffects: '## Adverse effects\n\n### Frequent\n\n- Nephrotoxicity, phlebitis, Red Man Syndrome with rapid infusion.\n\n### Severe\n\n- Ototoxicity, neutropenia, hypersensitivity reactions.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, { citation: 'Rybak MJ, et al. Therapeutic monitoring of vancomycin: revised consensus guidelines. Am J Health Syst Pharm. 2020.', url: 'https://www.ashp.org/' }, { citation: 'Sanford Guide to Antimicrobial Therapy — Vancomycin dosing and monitoring.', url: 'https://www.sanfordguide.com/' }, { citation: 'ANMAT. Drug information — Vancomycin.', url: 'https://www.argentina.gob.ar/anmat' }],
  },
  {
    id: 'pol-001', name: 'Polymyxin B', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'IV or topical polymyxin; reserved for MDR Gram-negative bacteria. Significant nephrotoxicity.',
    indications: `## Indications\n\n- Systemic infections caused by multidrug-resistant Gram-negative bacteria.\n- Topical use in burns (specific presentation).\n\n## Precautions\n\n- Nephrotoxicity and neurotoxicity.\n- Monitor renal function.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '500,000 IU or 1 million IU vial.', dose: '1.5–2.5 mg/kg/day IV divided every 12 h (convert IU to mg according to package insert).', infusionRate: 'Slow infusion.', administration: 'IV.' },
      pediatrico: { dose: '1.5–2.5 mg/kg/day divided every 12 h.', administration: 'IV.' },
      neonatal: { dose: 'Dosage according to NICU protocol; reserve use.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Use after dilution according to package insert.',
    adverseEffects: '## Adverse effects\n\n- Nephrotoxicity, neurotoxicity, infusion-related reactions.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'suc-001', name: 'Succinylcholine', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Ultra-rapid-acting depolarizing relaxant for intubation; contraindications in hyperkalemia and burn patients.',
    indications: `## Indications\n\n- Rapid sequence intubation (RSI) when there is no contraindication.\n- Electroconvulsive therapy (regimens).\n\n## Precautions\n\n- Hyperkalemia, rhabdomyolysis, extensive burns, periodic paralysis, muscular dystrophies.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '100–500 mg lyophilized vial.', dose: '1–1.5 mg/kg IV bolus for RSI.', administration: 'Rapid IV bolus.' },
      pediatrico: {
        presentation: '500 mg/10 mL ampoule.', diluent: '0.9% NaCl solution, 5% dextrose.', dose: '1 mg/kg/dose. Then 0.3 to 0.6 mg/kg until the desired effect is achieved.',
        infusionRate: 'Push.', administration: 'IV.',
        notes: 'Neuromuscular blocker, requires ventilatory support during administration, does not alter consciousness. May cause hypertension and hypotension, cardiac arrest, malignant hyperthermia, rash, sialorrhea, respiratory depression.',
      },
      neonatal: { dose: '3 mg/kg IV in RSI according to protocol.', administration: 'IV.' },
    },
    stability: '## General\n\n- Reconstitute and use immediately.\n\n## Pediatric guide\n\n- Store in the refrigerator. Stability according to the manufacturer.',
    adverseEffects: '## Adverse effects\n\n- Severe hyperkalemia, fasciculations, myalgia, bradycardia in children.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
];

const allDrugs = [...drugs, ...drugsPart2];

let written = 0;
for (const drug of allDrugs) {
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
  const filePath = path.join(EN_DIR, `${drug.id}.json`);
  fs.writeFileSync(filePath, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  written++;
  console.log(`✓ ${drug.id} — ${drug.name}`);
}

console.log(`\nDone: ${written} EN drug files written with translationReviewed=true`);
