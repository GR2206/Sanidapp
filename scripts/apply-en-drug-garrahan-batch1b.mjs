#!/usr/bin/env node
/** Garrahan re-translation batch 1/8 — 15 EN monographs (part B) */
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
  sac: { citation: 'Argentine Society of Cardiology. Clinical practice guidelines.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'mid-001', name: 'Midazolam', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Hypnotic-induction agent and general anesthetic induction agent. Alternative benzodiazepine in status epilepticus.',
    indications: `${MAIN}\n\nHypnotic-induction agent and general anesthetic induction agent. Alternative benzodiazepine in status epilepticus.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '5 mg/mL ampoule.', dose: '1–2 mg IV bolus; continuous sedation 0.02–0.1 mg/kg/h.', infusionRate: 'Titrated pump infusion.', administration: 'Slow IV or continuous infusion.' },
      pediatrico: {
        presentation: 'Tablets: 7.5–15 mg; 3 mL ampoules: 5 mg/mL',
        administration: 'PO; IV; IM; rectal; intranasal',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '5 mg/mL (may be given undiluted).',
        infusionRate: 'Continuous infusion per medical indication. IV bolus over 2–5 min. IN over 15 s.',
        dose: 'Conscious sedation: 0.05–0.2 mg/kg/dose. Procedural sedation PO: 0.1–0.2 mg/kg/dose 30–45 min pre-procedure, maximum 15 mg. Status epilepticus, endotracheal intubation, mechanical ventilation (IV–IM–rectal): 0.1–0.3 mg/kg/dose; (continuous infusion): <50 kg: 0.05 mg/kg/h, ≥50 kg: 2 mg/h.',
        notes: 'See preliminary guide for prevention of medication-related teratogenesis. See practical guide for analgosedation management and weaning in intermediate and moderate care units.',
      },
      neonatal: { dose: 'NICU sedation: 0.03–0.06 mg/kg/h (protocol).', administration: 'IV infusion pump.' },
    },
    stability: '## General\n\n- Dilution stable 24 h per package insert.\n\n## Pediatric guide\n\n- 24 h once diluted.',
    adverseEffects: '## Adverse effects\n\nHeadache, dizziness, cardiorespiratory depression, injection-site pain.',
    bibliography: [BIB.garrahan('MIDAzolam', ' (code 0142, ATC N05CD)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'fnt-001', name: 'Fentanyl', version: '1.1.4', updatedAt: '2026-07-10',
    executiveSummary: 'General opioid anesthetic with a mechanism of action similar to morphine. Adjunct to general anesthesia.',
    indications: `${MAIN}\n\nGeneral opioid anesthetic with a mechanism of action similar to morphine. Adjunct to general anesthesia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '50 mcg/mL ampoule.', dose: '25–100 mcg IV bolus; infusion 0.5–2 mcg/kg/h.', administration: 'Slow IV or infusion.' },
      pediatrico: {
        presentation: 'Ampoules: 0.05 mg/mL',
        administration: 'IV; epidural',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '50 mcg/mL.',
        infusionRate: 'Bolus over at least 30 s.',
        dose: '1–12 years: 1–2 µg/kg/dose; >12 years and adults: 0.5–1 µg/kg/dose. Endotracheal intubation: 5–10 µg/kg. Patients on mechanical ventilation: continuous infusion: <50 kg: 1 µg/kg/h, ≥50 kg: 50 µg/h.',
        notes: `${SPEC} Protect from light if administered as a pure drip. Bolus: administer over 3–5 min. Overdose may be treated with naloxone. Analgesic equivalence: 1 µg fentanyl = 0.1 mg morphine. See practical guide for analgosedation management and weaning in intermediate and moderate care units.`,
      },
      neonatal: { dose: '0.5–2 mcg/kg bolus; infusion per NICU pain scale.', administration: 'IV infusion pump.' },
    },
    stability: '## General\n\n- Dilution 24 h per package insert.\n\n## Pediatric guide\n\n- 24 h once diluted.',
    adverseEffects: '## Adverse effects\n\nApnea, bradycardia, rigid or wooden chest. See opioid analgesics section.',
    bibliography: [BIB.garrahan('fentaNYL Citrate', ' (code 0337, ATC N01AH)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'rem-001', name: 'Remifentanil', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Opioid anesthetic adjunct to general anesthesia. Rapid onset and rapid metabolism.',
    indications: `${MAIN}\n\nOpioid anesthetic adjunct to general anesthesia. Rapid onset and rapid metabolism.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '1–5 mg vial.', dose: '0.05–0.2 mcg/kg/min infusion.', administration: 'Continuous IV only.' },
      pediatrico: {
        dose: '0.5 µg/kg bolus over 30 min. Maintenance: 0.1–0.3 µg/kg/min',
        administration: 'IV',
        presentation: 'Lyophilized powder: 5 mg',
        notes: `${SPEC} Do not administer epidurally or intrathecally (glycine in the formulation may cause neurotoxicity).`,
      },
      neonatal: { dose: 'NICU use per anesthetic/neonatal protocol.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Reconstitute per package insert; use within 24 h.',
    adverseEffects: '## Adverse effects\n\nApnea, nausea, bradyarrhythmia, hypotension, respiratory depression. Higher frequency of wooden chest. See opioid analgesics section.',
    bibliography: [BIB.garrahan('REMIentanil*', ' (code 1352, ATC N01AH)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ket-001', name: 'Ketamine', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Dissociative anesthetic. Analgesia.',
    indications: `${MAIN}\n\nDissociative anesthetic. Analgesia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '50 mg/mL ampoule.', dose: 'Analgesia: 0.1–0.3 mg/kg bolus or 0.12–0.36 mg/kg/h. Induction: 1–2 mg/kg IV.', administration: 'Slow IV or infusion.' },
      pediatrico: {
        presentation: '10 mL vial: 50 mg/mL',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '50 mg/mL bolus. 2 mg/mL intermittent or continuous infusion.',
        infusionRate: '1-min bolus.',
        dose: 'Anesthetic induction: IV: 1–2 mg/kg bolus; IM: 5 mg/kg; continuous infusion: 0.25–2 mg/kg/h. Skin, muscle, and bone analgesia: 0.5–1 mg/kg. Endotracheal intubation: 2–3 mg/kg',
        compatibility: 'Precipitates with diazepam.',
        notes: 'With nalbuphine: reduced analgesic effect and hallucinations. With thyroid hormones: tachycardia and hypertension. Contraindications: increased intracranial pressure, traumatic eye injury, and pulmonary hypertension. Administration concentration: 1–10 mg/mL in 5% dextrose or NS. See preliminary guide for prevention of medication-related teratogenesis. See standardized PICU analgosedation preparations.',
      },
      neonatal: { dose: 'NICU use per sedation/analgesia protocol.', administration: 'IV.' },
    },
    stability: '## General\n\n- Use immediately after dilution when applicable.\n\n## Pediatric guide\n\n- 10 days refrigerated; then discard (pharmacy recommendation).',
    adverseEffects: '## Adverse effects\n\nIncreased intracranial pressure, sialorrhea, auditory and visual hallucinations. Chronic use (substance dependence): tachycardia, hypertension, hypotension, gastric dilatation.',
    bibliography: [BIB.garrahan('Ketamine Hydrochloride', ' (code 0125, ATC N01AX)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vec-001', name: 'Vecuronium', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Intermediate-acting neuromuscular blocking agent for hemodynamically unstable patients receiving inotropic support.',
    indications: `${MAIN}\n\nIndicated for patients with hemodynamic instability receiving inotropic support. Intermediate-acting neuromuscular blocking agent.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '4 mg lyophilized vial.', dose: '0.08–0.1 mg/kg bolus; 0.8–1.2 mcg/kg/min infusion.', administration: 'IV.' },
      pediatrico: {
        presentation: 'Lyophilized powder: 10 mg',
        reconstitution: 'Usually with 10 mL (1 mg/mL); with fluid restriction, minimum dilution 5 mL (2 mg/mL).',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% or 10% dextrose, Ringer solution.',
        finalConcentration: '2 mg/mL.',
        dose: '0.1 mg/kg bolus; maintenance: 0.05 mg/kg as needed. Reduce dose in hepatic insufficiency. Continuous infusion: 0.05–0.15 mg/kg/h',
        notes: `${SPEC} Use with caution in neuromuscular and myopathic diseases and in cholestasis. Contraindicated in renal failure (prolonged block). Block prolonged by aminoglycosides, clindamycin, magnesium sulfate, colistin, inhalational anesthetics, and potassium-depleting drugs; decreased by azathioprine and theophylline. Continuous infusion: dilute to maximum 1 mg/mL. See standardized PICU analgosedation preparations.`,
      },
      neonatal: { dose: '0.1 mg/kg bolus; NICU infusion per train-of-four.', administration: 'IV.' },
    },
    stability: '## General\n\n- Reconstitute and use per package insert.\n\n## Pediatric guide\n\n- 24 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nApnea. Similar to pancuronium.',
    bibliography: [BIB.garrahan('Vecuronium Bromide*', ' (code 0638, ATC M03AC)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pnc-001', name: 'Pancuronium', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Nondepolarizing peripheral neuromuscular blocking agent.',
    indications: `${MAIN}\n\nNondepolarizing peripheral neuromuscular blocking agent.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '2 mg/mL ampoule.', dose: '0.08–0.12 mg/kg bolus; repeat per train-of-four.', administration: 'IV.' },
      pediatrico: {
        dose: '0.05–0.1 mg/kg/dose. Continuous infusion: 0.03–0.1 mg/kg/h. Endotracheal intubation: 0.1–0.2 mg/kg. Adjust dose in renal and hepatic insufficiency.',
        administration: 'IV',
        presentation: '2 mL ampoules: 2 mg/mL',
        notes: `${SPEC} Use with caution in neuromuscular and myopathic diseases and in cholestasis. Contraindicated in renal failure. Block prolonged by aminoglycosides, clindamycin, magnesium sulfate, colistin, inhalational anesthetics, and potassium-depleting drugs; decreased by azathioprine and theophylline.`,
      },
      neonatal: { dose: '0.05–0.1 mg/kg per protocol.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Ready to use.',
    adverseEffects: '## Adverse effects\n\nApnea. May occasionally promote histamine release. Vagolytic effect.',
    bibliography: [BIB.garrahan('Pancuronium Bromide*', ' (code 0160, ATC M03AC)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mil-001', name: 'Milrinone', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Positive inotropic agent that improves diastolic function. Phosphodiesterase inhibitor.',
    indications: `${MAIN}\n\nPositive inotropic agent that improves diastolic function. Phosphodiesterase inhibitor.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'IV infusion ampoule or vial per institutional formulation.',
        reconstitution: 'Reconstitute per package insert; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Per unit guide (infusion pump).',
        dose: 'Optional loading dose 50 mcg/kg over 10 min, then 0.375–0.75 mcg/kg/min.',
        infusionRate: 'Slow bolus if loading dose used.',
        administration: 'Continuous IV pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor heart rate, invasive blood pressure, urine output, and peripheral perfusion.',
      },
      pediatrico: {
        presentation: '10 mL vial: 1 mg/mL',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '≤0.5 mg/mL for continuous infusion.',
        infusionRate: 'Per medical indication.',
        dose: 'Loading dose: 50 µg/kg over 15 min; maintenance: 0.25–0.75 µg/kg/min; maximum in adults: 1.13 mg/kg/day. Infusion rate may need reduction in renal insufficiency. Adjust dose in newborns.',
        notes: 'Requires clinical monitoring. Incompatible with furosemide. Continuous infusion: dilute in 5% dextrose or normal saline; usual concentration <200 µg/mL. Do not infuse for more than 48 h.',
      },
    },
    stability: '## General\n\n- Dilution 24 h refrigerated per package insert.\n\n## Pediatric guide\n\n- 24 h once diluted.',
    adverseEffects: '## Adverse effects\n\nVentricular arrhythmias, hypotension, headache, hypokalemia.',
    bibliography: [BIB.garrahan('MILRinone', ' (code 1452, ATC C01CE)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'glc-001', name: 'Glucagon', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment and diagnostic use in hypoglycemia. Hyperglycemic agent that mobilizes hepatic glycogen released into the bloodstream as glucose.',
    indications: `${MAIN}\n\nTreatment and diagnostic use in hypoglycemia. Hyperglycemic agent that mobilizes hepatic glycogen released into the bloodstream as glucose.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '1 mg vial.', dose: '1 mg IM/SC/slow IV; repeat in 15 min if persistent.', administration: 'IM/SC/IV.' },
      pediatrico: {
        dose: '<1 month: 20 µg/kg; 1 month to 2 years: 500 µg; >2 years: <20 kg: 500 µg, ≥20 kg: 1 mg',
        administration: 'SC; IM; IV',
        presentation: 'Vial: 1 mg (1 IU)',
        notes: 'Do not use with anticholinergics. Caution in insulinoma or glucagonoma. Interactions: antagonizes insulin; increases warfarin anticoagulant effect; effect decreased by indomethacin; transient increase in pulse and blood pressure with beta-blockers.',
      },
      neonatal: { dose: '0.03–0.1 mg/kg IM/SC/IV per protocol.', administration: 'IM/SC/IV.' },
    },
    stability: '## Stability\n\n- Reconstitute at time of use.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, diarrhea, hypokalemia.',
    bibliography: [BIB.garrahan('Glucagon Hydrochloride', ' (code 0108, ATC H04AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ipr-001', name: 'Ipratropium bromide', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antimuscarinic anticholinergic bronchodilator.',
    indications: `${MAIN}\n\nAntimuscarinic anticholinergic bronchodilator.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Nebulization 0.25–0.5 mg; MDI.', dose: '0.5 mg nebulization every 6–8 h; combine with salbutamol in crisis.', administration: 'Nebulization.' },
      pediatrico: {
        dose: 'Bronchospasm: Aerosol: 3–14 years: 1–2 puffs 3 times daily up to 6 puffs/day; adults: 2 puffs 4 times daily up to 12 puffs/day. Nebulizer solution: neonates: 25 µg/kg/dose every 8 h; infants and children: 125–250 µg 3 times daily; >12 years and adults: 500 µg 3–4 times daily.',
        administration: 'Inhalation',
        presentation: 'Aerosol: 20 µg/dose; Nebulizer solution: 0.25 mg/mL (12.5 µg/drop)',
        notes: 'Not recommended for children under 12 years (aerosol). Onset of action is slower than beta-adrenergic agonists.',
      },
      neonatal: { dose: '0.25 mg nebulization per NICU respiratory protocol.', administration: 'Nebulization.' },
    },
    stability: '## Stability\n\n- Mixture with salbutamol stable for one shift.',
    adverseEffects: '## Adverse effects\n\nDry mouth, cough, symptom exacerbation, local irritation, urinary retention, constipation.',
    bibliography: [BIB.garrahan('Ipratropium', ' (code 0473, ATC R03BB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'esm-001', name: 'Esmolol', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Selective beta-blocking agent. Post-coarctation repair hypertension, dyspnea and cyanosis crises, ectopic atrial tachyarrhythmia.',
    indications: `${MAIN}\n\nSelective beta-blocking agent. Post-coarctation repair hypertension, dyspnea and cyanosis crises, ectopic atrial tachyarrhythmia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '2500 mg/10 mL ampoule.', dose: 'Loading 0.5 mg/kg over 1 min, then 50–300 mcg/kg/min.', administration: 'IV infusion pump.' },
      pediatrico: {
        dose: 'Loading: 0.5–0.6 mg/kg over 2–4 min, followed by infusion 0.1–0.2 mg/kg/min',
        administration: 'IV',
        presentation: '10 mL ampoules: 250 mg/mL',
        notes: 'Elimination half-life: 9 min. Esmolol may increase serum digoxin and theophylline concentrations. Morphine may increase serum esmolol concentration. The 250 mg/mL ampoule must not be given undiluted; dilute to a final concentration of 10 mg/mL in NS or 5% dextrose.',
      },
    },
    stability: '## Stability\n\n- Use within 24 h after preparation.',
    adverseEffects: '## Adverse effects\n\nHypotension, dizziness, fatigue, headache.',
    bibliography: [BIB.garrahan('Esmolol*', ' (code 1362, ATC C07AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'lab-001', name: 'Labetalol', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Combined alpha- and beta-blocking agent.',
    indications: `${MAIN}\n\nCombined alpha- and beta-blocking agent.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '5 mg/mL ampoule.', dose: '10–20 mg IV bolus every 10 min; infusion 0.5–2 mg/min.', administration: 'Slow IV or infusion.' },
      pediatrico: {
        presentation: 'Tablets: 200 mg; 4 mL ampoules: 5 mg/mL',
        administration: 'IV; PO',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: 'Bolus: 5 mg/mL. Continuous infusion: 1 mg/mL.',
        infusionRate: '2–3 min bolus or continuous infusion.',
        dose: 'Hypertensive crisis: IV infusion: children: loading dose 0.2–1 mg/kg/dose over 2–3 min (maximum 2 mg/min) up to 40 mg. Dose may be repeated every 10 min up to 3–4 mg/kg to 300 mg. Continuous infusion: 0.25–3 mg/kg/h (neonates: start 0.5 mg/kg/h). Adults: 0.3–1 mg/kg/dose loading, up to 20 mg every 2 min; 40–80 mg every 10 min up to 300 mg cumulative. No dose adjustment in renal failure, HD, or PD. Reduce dose in hepatic failure; doses ~50% lower than usual.',
        notes: 'For continuous infusion, dilute in normal saline or 5% dextrose. May be given undiluted in fluid-restricted patients. Avoid in hepatic insufficiency.',
      },
    },
    stability: '## General\n\n- Use fresh dilution for infusion.\n\n## Pediatric guide\n\n- Discard remainder once opened. Dilution stable 24 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nBronchospasm, hepatotoxicity, hyperkalemia, ventricular arrhythmia.',
    bibliography: [BIB.garrahan('Labetalol Hydrochloride*', ' (code 1804, ATC C07AG)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hct-001', name: 'Hydrochlorothiazide', version: '1.0.3', updatedAt: '2026-07-10',
    executiveSummary: 'Thiazide diuretic. Hypertension, edema, and nephrogenic diabetes insipidus.',
    indications: `${MAIN}\n\nThiazide diuretic. Hypertension, edema, and nephrogenic diabetes insipidus.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '12.5–25 mg tablets.', dose: '12.5–50 mg PO every 24 h in the morning.', administration: 'PO.' },
      pediatrico: {
        dose: 'Neonates and infants <6 months: 2–4 mg/kg/day every 12 h; maximum 37.5 mg/day. Infants >6 months and children: 2 mg/kg/day every 12 h; maximum 100 mg/day.',
        administration: 'PO',
        presentation: '12.5–25 mg tablets',
        notes: 'Administer with food. NSAIDs decrease antihypertensive effect. With amphotericin B increases potassium loss.',
      },
      neonatal: { dose: '2–4 mg/kg/day every 12 h; maximum 37.5 mg/day.', administration: 'PO.' },
    },
    stability: '## Stability\n\n- Tablets per package insert.',
    adverseEffects: '## Adverse effects\n\nHypotension, headache, dizziness, hypokalemia, hyperglycemia, hyperlipidemia, hyperuricemia, nausea, vomiting, diarrhea, muscle weakness, photosensitivity.',
    bibliography: [BIB.garrahan('hydroCHLOROthiazide', ' (ATC C03AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pol-001', name: 'Polymyxin B', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Preoperative decolonization in short-bowel patients, combined with oral metronidazole.',
    indications: `${MAIN}\n\nPreoperative decolonization in short-bowel patients, combined with oral metronidazole.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '500,000 IU or 1 million IU vial.', dose: '1.5–2.5 mg/kg/day IV divided every 12 h (convert IU to mg per package insert).', infusionRate: 'Slow infusion.', administration: 'IV.' },
      pediatrico: { dose: '10–20 mg/kg/day every 6–8 h for 5 days.', administration: 'PO', presentation: 'Compounded preparation: capsules', notes: 'Contraindicated in patients with hypersensitivity to polymyxins.' },
      neonatal: { dose: 'Dose per NICU protocol; reserve use.', administration: 'IV.' },
    },
    stability: '## Stability\n\n- Use after dilution per package insert.',
    adverseEffects: '## Adverse effects\n\nIrritability, ataxia, perioral paresthesia, nephrotoxicity.',
    bibliography: [BIB.garrahan('Polymyxin B Sulfate', ' (code 0486, ATC J01XB)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'dig-001', name: 'Digoxin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Cardiac glycoside. Heart failure (positive inotropic and negative chronotropic effect).',
    indications: `${MAIN}\n\nCardiac glycoside. Heart failure (positive inotropic and negative chronotropic effect).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '0.25 mg tablets. 0.25 mg/mL ampoule.', dose: 'IV loading 0.25–0.5 mg; maintenance PO 0.125–0.25 mg/day per renal function.', administration: 'PO or slow IV (diluted per protocol).' },
      pediatrico: {
        dose: 'Rapid digitalization (IV): Term newborn: 0.02–0.04 mg/kg/day; preterm newborn: 0.015–0.025 mg/kg/day; 1 month to 2 years: 0.025–0.05 mg/kg/day; >2 years: 0.03–0.04 mg/kg/day; adolescents: 0.01–0.015 mg/kg/day. Maximum: 1 mg. (PO): increase dose by 20%. Dosing: 50% at start, 25% at 6–8 h, remaining 25% at 12–16 h. In previously digitalized patients use half the dose. Maintenance (PO): Term newborn: 0.01 mg/kg/day (½ drop/kg/day Lanoxin); 1 month–2 years: 0.01–0.015 mg/kg/day (¾ drop/kg/day Lanoxin); >2 years: 0.01 mg/kg/day (½ drop/kg/day Lanoxin); adolescents: 0.005 mg/kg/day (maximum 0.25 mg/day). See renal dose-adjustment table (CIME bulletin)',
        administration: 'PO; IV',
        presentation: 'Tablets: 0.25 mg; Drops: 750 mcg/mL (drops/mg vary by brand); 1 mL ampoules: 0.25 mg/mL',
        notes: 'Potassium-depleting diuretics increase risk of digitalis toxicity. Digoxin levels may increase with amiodarone (reduce digoxin dose ~50% and monitor levels), flecainide, propafenone, spironolactone, erythromycin, verapamil. Corticosteroids increase hypokalemia risk. Therapeutic range: 0.8–2 ng/mL. Levels >2 ng/mL associated with toxicity. Reduce dose in renal insufficiency. IV administration: undiluted or diluted 1:4 in 5% dextrose or normal saline over >5 min. Contraindicated in hypertrophic obstructive cardiomyopathy. Caution: commercial brands differ in drug content per drop. Keep bottle tightly closed.',
      },
      neonatal: { dose: 'Neonatal doses per cardiology protocol and serum levels.', administration: 'Slow IV.' },
    },
    stability: '## Stability\n\n- Ampoules: use after dilution per institutional protocol.',
    adverseEffects: '## Adverse effects\n\nVomiting, dizziness, diarrhea, blurred vision, increased diuresis, cold sweats, seizures, AV block, arrhythmias.',
    bibliography: [BIB.garrahan('diGOXin', ' (code 0073, ATC C01AA)'), BIB.aha, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'vit-001', name: 'Phytonadione (vitamin K)', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hemostatic agent in toxicity from dicumarol derivatives, warfarin, etc. Deficiency of coagulation factors II, VII, IX, and X. Hemorrhagic manifestations.',
    indications: `${MAIN}\n\nHemostatic agent in toxicity from dicumarol derivatives, warfarin, etc. Deficiency of coagulation factors II, VII, IX, and X. Hemorrhagic manifestations.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '10 mg/mL ampoule.', dose: 'Warfarin bleeding: 5–10 mg slow IV.', administration: 'Slow IV, IM, or PO.' },
      pediatrico: {
        presentation: 'Ampoules: 1 mg/0.5 mL – 10 mg/mL; Tablets: 10 mg',
        administration: 'PO; IM; IV',
        diluent: '0.9% NaCl or 5% dextrose. Dilute in 5 or 10 mL.',
        infusionRate: 'Do not administer as bolus.',
        dose: 'Healthy newborn: 0–1 year: 5–10 µg; 1–10 years: 15–30 µg; >11 years: 45–80 µg. Intoxications: 1 mg/kg/day every 8 h, maximum 10 mg. Prothrombin deficiency: infants: 2 mg; older children: 5–10 mg. Drug-induced vitamin K deficiency: PO: 2.5–5 mg/day.',
        notes: 'IV push must not exceed 1 mg/min. Oral absorption depends on bile salts. Contraindicated in G6PD deficiency. In hepatic injury do not exceed therapeutic levels. Monitor effectiveness with prothrombin time. Konakion(R) ampoules may be given PO (required volume extracted with supplied dispenser, needle removed, contents placed directly in child\'s mouth). See multivitamin table.',
      },
      neonatal: { dose: '1 mg IM at birth (standard prophylaxis).', administration: 'Deep IM.' },
    },
    stability: '## General\n\n- Protect from light.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nHeadache, dizziness, convulsive movements, nausea, vomiting, erythema, urticaria, rash, eruptions, dysgeusia, jaundice. Hemolysis in the newborn, Heinz bodies.',
    bibliography: [BIB.garrahan('Vitamin K (Phytonadione)', ' (code 0225, ATC B02BA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nEN Garrahan batch 1 (part B): ${drugs.length} monographs`);
