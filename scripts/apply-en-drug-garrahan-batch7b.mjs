#!/usr/bin/env node
/** Garrahan re-translation batch 7/8 — 13 EN monographs (part B) */
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
  heartHtn: { citation: 'American Heart Association. Hypertension and arrhythmia guidelines.', url: 'https://www.heart.org/' },
  heartHf: { citation: 'American Heart Association. Heart failure guidelines.', url: 'https://www.heart.org/' },
  anmat: { citation: 'ANMAT. Drug information and authorized prescribing information in Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). ICU medication guidelines.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Argentine Society of Infectious Diseases (SADI). Guidelines and consensus statements.', url: 'https://www.sadi.org.ar/' },
  sadiUcip: { citation: 'Infectious Diseases Service, Infection Prevention and Control. UCIP 2026 — Dilution and stability guide.', url: 'https://www.sadi.org.ar/' },
  sac: { citation: 'Argentine Society of Cardiology. Clinical practice guidelines.', url: 'https://www.sac.org.ar/' },
  esc: { citation: 'European Society of Cardiology. Heart failure guidelines.', url: 'https://www.escardio.org/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Clinical practice guidelines.', url: 'https://www.idsociety.org/' },
};

const drugs = [
  {
    id: 'prp-001', name: 'Propranolol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Non-cardioselective β-blocker indicated for tachyarrhythmias, hypertension, neonatal thyrotoxicosis. Migraine prophylaxis. Palliative treatment of tetralogy of Fallot and obstructive hypertrophic cardiomyopathy. Portal hypertension. Treatment of severe infantile hemangiomas.',
    indications: `${MAIN}\n\nNon-cardioselective β-blocker indicated for tachyarrhythmias, hypertension, neonatal thyrotoxicosis. Migraine prophylaxis. Palliative treatment of tetralogy of Fallot and obstructive hypertrophic cardiomyopathy. Portal hypertension. Treatment of severe infantile hemangiomas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 40 and 80 mg. Ampoule 1 mg/mL.',
        dose: 'HTN/angina: 40–160 mg/day PO divided. IV: 1–3 mg slow, repeat according to protocol.',
        administration: 'PO or slow IV.',
      },
      pediatrico: {
        dose: 'Arrhythmias and hypertension: Neonates: PO: initial: 0.25 mg/kg/dose every 6-8 h, increase slowly up to a maximum of 5 mg/kg/day. Higher doses may be required (consult specialist). Children: PO: initial: 1 mg/kg/day every 6 h, increase gradually every 3-5 days, maintenance: 1-5 mg/kg/day, maximum dose: arrhythmias: 16 mg/kg/day or 60 mg/day; hypertension: 8 mg/kg/day. Migraine prophylaxis: PO: children: 0.6-1.5 mg/kg/day every 8 h, maximum: 4 mg/kg/day; adults: initial: 80 mg/day every 6-8 h, maximum: 160-240 mg/day. Neonatal thyrotoxicosis: PO: 2 mg/kg/day (1-3 mg/kg/day) every 6-12 h. Higher doses may be required (consult specialist); adults: PO: 10-40 mg every 6 h. Infantile hemangiomas: PO: initial: 1 mg/kg/day every 8-12 h; increase gradually weekly up to 2 mg/kg/day (0.5-3 mg/kg/day) every 8-12 h. Continue at target dose until the end of the proliferation phase and complete resolution.',
        administration: 'PO',
        presentation: 'Tablets: 10 - 40 mg; Suspension (compounded preparation): 4 mg/mL',
        notes: 'Adjust dose according to clinical effect and β-blockade. Use with caution in patients with diabetes mellitus and bronchial asthma. Avoid the IV route in patients receiving calcium channel blockers. Aluminum-containing antacids may decrease its absorption. With epinephrine, increased blood pressure and severe bradycardia. Flecainide, hydralazine, verapamil may increase cardiovascular adverse effects. Administer with food to avoid the risk of hypoglycemia. Do not discontinue abruptly. Reduce dose in hepatic insufficiency. In the treatment of infantile hemangiomas propranolol is contraindicated in preterm newborns and newborns younger than 14 days of life, congenital heart disease with contraindication to β-blocker treatment, infants with episodes of obstructive bronchitis, CNS disorders and altered renal function.',
      },
      neonatal: {
        dose: '0.01–0.2 mg/kg/dose IV according to neonatal cardiology protocol.',
        administration: 'Slow IV.',
      },
    },
    stability: '## Stability\n\n- PO according to prescribing information. IV use immediately.',
    adverseEffects: '## Adverse effects\n\nFatigue, lethargy, bradycardia, hypotension, rash, nausea, vomiting, hypoglycemia, apneas, bronchospasm, increased liver enzymes, seizures, cold extremities.',
    bibliography: [BIB.garrahan('Propranolol Hydrochloride*', ' (code 0171, ATC C07AA)'), BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'prt-001', name: 'Protamine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Heparin antagonist; forms insoluble salts inactivating it.',
    indications: `${MAIN}\n\nHeparin antagonist; forms insoluble salts inactivating it.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 10 mg/mL.',
        dose: '1 mg protamine per 100 IU remaining heparin; slow IV over 10 min (max. 50 mg/dose).',
        administration: 'Very slow IV.',
      },
      pediatrico: {
        dose: '1 mL (10 mg) of protamine neutralizes 1000 units of heparin (U.H.) USP. Dose depends on time since heparin discontinuation: < 30 minutes: 1 mg per 100 units of heparin (U.H.) received; 30 min - 60 min: 0.5 - 0.75 mg per 100 U.H. received; 60 min - 120 min: 0.375 - 0.5 mg per 100 U.H. received; > 120 min: 0.25 - 0.375 mg per 100 U.H. received',
        administration: 'Slow IV',
        presentation: '5 mL ampoules: 10 mg/mL',
        notes: 'Administer over 10-minute periods. Do not administer more than 50 mg/dose. Excess acts as a weak anticoagulant. Caution in patients with fish allergy.',
      },
      neonatal: {
        dose: 'Same mg:IU rule according to heparin administered.',
        administration: 'Slow IV.',
      },
    },
    stability: '## Stability\n\n- Use immediately after dilution.',
    adverseEffects: '## Adverse effects\n\nHypotension, pulmonary hypertension, bradycardia and other cardiovascular effects. Dyspnea, nausea, vomiting, lassitude, anaphylactoid reactions.',
    bibliography: [BIB.garrahan('Protamine Sulfate', ' (code 8911, ATC V03AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ran-001', name: 'Ranitidine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'H2 receptor antagonist, antiulcer agent, stress ulcer prevention.',
    indications: `${MAIN}\n\nH2 receptor antagonist, antiulcer agent, stress ulcer prevention.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: '5 mL ampoules: 10 mg/mL',
        administration: 'IV',
        diluent: '0.9% NaCl solution, 5% dextrose.',
        finalConcentration: '2.5 mg/mL.',
        infusionRate: '15 to 30 min with syringe pump.',
        dose: 'Preterm and term infants < 2 weeks: IV: loading dose: 1.5 mg/kg, maintenance: 1.5 mg/kg/day every 12 h. Children: IV: 2-4 mg/kg/day every 6-8 h. Adults: IV: 50 mg/dose every 6-8 h, maximum dose: 400 mg/day.',
        notes: 'For IV administration dilute in 5% dextrose or SWFI to a concentration of 0.5 mg/mL (maximum: 2.5 mg/mL) and infuse over 15-30 minutes. Caution in patients with hepatic insufficiency.',
      },
    },
    stability: '## Pediatric guide\n\n- 48 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nDizziness, insomnia, agitation, skin rash, constipation, nausea, diarrhea, vomiting, headache. Bradycardia with rapid infusion. Rare: increased transaminases, leukopenia, thrombocytopenia, bronchospasm.',
    bibliography: [BIB.garrahan('Ranitidine Hydrochloride', ' (code 0175, ATC A02BA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'sav-001', name: 'Sacubitril/valsartan', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Symptomatic chronic heart failure with left ventricular systolic dysfunction. Sacubitril acts by blocking the effects of neprilysin and valsartan the angiotensin II receptor.',
    indications: `${MAIN}\n\nSymptomatic chronic heart failure with left ventricular systolic dysfunction.\nSacubitril acts by blocking the effects of neprilysin and valsartan the angiotensin II receptor.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 24/26, 49/51 and 97/103 mg (sacubitril/valsartan).',
        dose: 'Start 49/51 mg PO every 12 h; titrate to 97/103 mg every 12 h according to tolerance.',
        administration: 'PO every 12 h.',
      },
      pediatrico: {
        dose: 'It is progressive. For dosing consider the sum of both drugs. Children < 40 kg: initial 1.6 mg/kg/dose every 12 h, may increase dose after 2 - 4 weeks according to tolerance to 2.3 mg/kg/dose every 12 h with a maximum of 3.1 mg/kg/dose every 12 h. > 40 kg to 50 kg: initial 50 mg/dose every 12 h, may increase dose after 2 - 4 weeks according to tolerance to 100 mg/dose every 12 h with a maximum of 150 mg/dose every 12 h. > 50 kg: 100 mg/dose every 12 h, may increase dose after 2 - 4 weeks according to tolerance to 150 mg/dose every 12 h with a maximum of 200 mg/dose every 12 h.',
        administration: 'PO',
        presentation: 'Tablets: 50 mg (Sacubitril 24 mg + Valsartan 26 mg); 100 mg (Sacubitril 49 mg + Valsartan 51 mg); 200 mg (Sacubitril 97 mg + Valsartan 103 mg)',
        notes: 'Increases systemic exposure of statins. With type 5 phosphodiesterase synthetic inhibitors including sildenafil, risk of hypotension. Risk of increased serum potassium and increases in serum creatinine with potassium-sparing diuretics (amiloride), mineralocorticoid antagonists (e.g.: spironolactone), potassium supplements, salt substitutes containing potassium, or others such as heparin. Increased systemic exposure with: OATP1B1, OATP1B3, OAT3 inhibitors (e.g.: rifampicin, cyclosporine), OAT1 (e.g. tenofovir, cidofovir) or MRP2 (e.g.: ritonavir). Reduces maximum concentration and AUC of metformin. Start with half the recommended dose in patients who were not on ACE inhibitor/ARB II treatment or who had been taking low doses of these medications (≤ 0.2 mg/kg/day of enalapril or equivalent). Concomitant therapy with angiotensin-converting enzyme inhibitors (e.g.: losartan) is contraindicated due to the potential risk of angioedema. If medication change is planned, discontinue ACE inhibitor/ARB II and then after 36 h start sacubitril-valsartan. Do not start treatment in patients with serum potassium levels of 5.3 mmol/L or with systolic blood pressure (SBP) < 5th percentile for patient age.',
      },
    },
    stability: '## Stability\n\n- Store according to prescribing information in original packaging.',
    adverseEffects: '## Adverse effects\n\nHypotension, renal function alterations, hyperkalemia, angioedema, dizziness, headache, vertigo, cough, fatigue, asthenia, anemia.',
    bibliography: [BIB.garrahan('Sacubitril + Valsartan*', ' (code 2090, ATC C09DX)'), BIB.heartHf, BIB.anmat, BIB.sac, BIB.esc],
  },
  {
    id: 'srf-001', name: 'Pulmonary surfactant', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of respiratory distress syndrome in newborns < 1250 g or with evidence of surfactant deficit.',
    indications: `${MAIN}\n\nTreatment of respiratory distress syndrome in newborns < 1250 g or with evidence of surfactant deficit.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Not routinely indicated in adults.',
        dose: 'N/A usual adult use.',
        administration: 'N/A.',
      },
      pediatrico: {
        dose: 'Rescue treatment: phospholipids: 4 mL/kg/dose. Second dose according to blood gas parameters. Maximum 4 doses.',
        administration: 'Intratracheal instillation.',
        presentation: '4-8 mL vial: 25 mg/mL total phospholipids.',
        notes: 'Exclusive use by Neonatology specialist. It is a saline dispersion of natural lipids and proteins derived from bovine lungs. Blood reflux from the endotracheal tube has been observed. Store refrigerated.',
      },
      neonatal: {
        dose: '100–200 mg/kg via endotracheal route; repeat according to NICU protocol.',
        administration: 'Intratracheal with mechanical ventilation.',
      },
    },
    stability: '## Stability\n\n- Refrigerate; warm to room temperature before instillation.',
    adverseEffects: '## Adverse effects\n\nPulmonary hemorrhage, transient bradycardia, decreased oxygen saturation, hypotension, hypertension, tachycardia, feeding intolerance, renal insufficiency, hematuria, thrombocytopenia, seizures.',
    bibliography: [BIB.garrahan('Natural Pulmonary Surfactant*', ' (code 1034, ATC R07AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'teo-001', name: 'Aminophylline', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Increases diaphragmatic contractility. Apnea of the newborn.',
    indications: `${MAIN}\n\nIncreases diaphragmatic contractility. Apnea of the newborn.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 24 mg/mL (theophylline equivalent).',
        dose: 'Loading 5–6 mg/kg slow IV; maintenance 0.5 mg/kg/h.',
        administration: 'Slow IV.',
      },
      pediatrico: {
        presentation: '10 mL ampoules: 24 mg/mL',
        administration: 'IV',
        diluent: '5% dextrose.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '20 to 30 min with syringe pump.',
        dose: 'IV loading dose: 7 mg/kg/dose over 20-30 minutes. Maintenance dose: 1-6 months: 0.4 mg/kg/hour, 6-12 months: 0.6 mg/kg/hour, 1-9 years: 0.8 mg/kg/hour, > 10 years and adults: 0.7 mg/kg/hour. Apnea of the newborn: loading dose: 5 mg/kg, maintenance: 5 mg/kg/day every 12 h (monitor serum levels to determine appropriate dose).',
        notes: 'Serum concentration: primary newborn apnea: 3-10 µg/mL, bronchodilator peak 10-15 µg/mL. Increase theophylline levels: erythromycin, ciprofloxacin, norfloxacin. Decrease theophylline levels: rifampicin, carbamazepine, phenobarbital, phenytoin. Increases risk of hypokalemia with high doses of salbutamol. For administration dilute with normal saline (preferably) or 5% dextrose to a concentration of 1 mg/mL (maximum concentration: 25 mg/mL).',
      },
      neonatal: {
        dose: 'Loading and maintenance according to NICU apnea protocol.',
        administration: 'IV on pump.',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nIrritability, restlessness, seizures, headache, insomnia, palpitations, hypotension, extrasystoles, hyperglycemia, abdominal pain, vomiting.',
    bibliography: [BIB.garrahan('amiNOphylline', ' (code 0012, ATC R03DA)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'tia-001', name: 'Thiamine (vitamin B1)', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Deficiency diseases: beriberi (polyneuritis, heart failure, edema). PDH deficiency (pyruvate dehydrogenase). Thiamine deficiency syndrome: type B lactic acidosis (without hypoperfusion/hypoxemia, with or without hyperglycemia, Wernicke encephalopathy (ataxia, confusion, ophthalmoplegia)).',
    indications: `${MAIN}\n\nDeficiency diseases: beriberi (polyneuritis, heart failure, edema). PDH deficiency (pyruvate dehydrogenase).\nThiamine deficiency syndrome: type B lactic acidosis (without hypoperfusion/hypoxemia, with or without hyperglycemia, Wernicke encephalopathy (ataxia, confusion, ophthalmoplegia)).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 100 mg/mL.',
        dose: '100–500 mg slow IV before glucose; then 100 mg TID x 3–5 days.',
        administration: 'Slow IV.',
      },
      pediatrico: {
        dose: 'RDA: 0-6 months: 0.2 mg; 7-12 months: 0.3 mg; 1-3 years: 0.5 mg; 4-8 years: 0.6 mg; 9-13 years: 0.9 mg; 14-18 years: 1.2 mg; adults: 1.1 to 1.4 mg. Normal levels: 1.6 to 4 mg/dl. Beriberi, Wernicke encephalopathy, type B lactic acidosis: children: IV: 25 mg once daily, maximum 1 week, then switch to PO: 5 to 10 mg/day for one month; Adolescents and adults: IV 100 mg/day, maximum 1 week, then PO: 10 mg/day for 1 month. Refeeding syndrome prevention: PO: 2 mg/kg/day, maximum: 100 mg every 24 h for 2 weeks, then 1 mg/kg/day (maximum 10 mg) for 1 month. Congenital lactic acidosis: PO: 100-300 mg/day. PDH deficiency: 300 mg/day Encephalopathy during or after ifosfamide administration: 100 mg every 4 h until resolution of symptoms, administer over 30 minutes.',
        administration: 'PO IV',
        presentation: 'Tablets: 300 mg; Syrup (compounded preparation): 10 mg/mL; 1 mL ampoules: 100 mg/mL',
        notes: 'Associated deficiencies of several B-complex factors are frequently found; it is advisable to use the full complex. Patients on hemodialysis, peritoneal dialysis or malabsorption syndrome have higher daily requirements. See multivitamin table. For refeeding syndrome prevention start thiamine before initiating nutritional intake (including parenteral hydration plan with dextrose), after 2 weeks intake may be provided with B-complex. In oncology patients do not use B-complex, as vitamin B12 administration is not recommended. For IV administration dilute 100 mg in 50 mL normal saline (preferably) or 5% dextrose, infuse over 30 minutes. Must be done under strict monitoring. To avoid acute symptoms of thiamine deficiency, administer before parenteral carbohydrate solutions. PO may be administered with or without food.',
      },
      neonatal: {
        dose: '10 mg IV/day in parenteral nutrition.',
        administration: 'IV.',
      },
    },
    stability: '## Stability\n\n- Protect from light.',
    adverseEffects: '## Adverse effects\n\nContact dermatitis, cyanosis, pulmonary edema, pharyngeal edema, anaphylactic reactions with respiratory distress, pruritus, shock and abdominal pain, paresthesias.',
    bibliography: [BIB.garrahan('Vitamin B1 (Thiamine)', ' (code 0457, ATC A11DA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'tri-001', name: 'Trimethoprim+sulfamethoxazole', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Prophylaxis and treatment of urinary tract infections due to susceptible strains of E. coli, P. mirabilis, K. pneumoniae, Enterobacter spp and coagulase-negative Staphylococcus including S. saprophyticus. Treatment of acute otitis media caused by susceptible Streptococcus pneumoniae and Haemophilus influenzae. Not indicated for prolonged administration or otitis media prophylaxis. Alternative treatment for pneumonia caused by Pneumocystis jirovecii.',
    indications: `${MAIN}\n\nProphylaxis and treatment of urinary tract infections due to susceptible strains of E. coli, P. mirabilis, K. pneumoniae, Enterobacter spp and coagulase-negative Staphylococcus including S. saprophyticus. Treatment of acute otitis media caused by susceptible Streptococcus pneumoniae and Haemophilus influenzae. Not indicated for prolonged administration or otitis media prophylaxis. Alternative treatment for pneumonia caused by Pneumocystis jirovecii.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule containing 80 mg trimethoprim (TMP) + 400 mg sulfamethoxazole (SMX) in 5 mL (Cotrizol G, Novidrine, Bactrim, Danferane, Spectrex).',
        reconstitution: 'No prior reconstitution required. Conc: 16 mg/mL trimethoprim and 80 mg/mL sulfamethoxazole.',
        diluent: '80 mg TMP/400 mg SMX in 100 mL NS or 5% dextrose.',
        finalConcentration: '0.8 mg/mL TMP and 4 mg/mL SMX.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute 1 amp in 100 mL NS and administer over 30-60 min. Do not exceed 90 min.',
        notes: 'A dilution of 1 mL TMP+SMX in 5 mL diluent is recommended.',
      },
      pediatrico: {
        presentation: 'Tablets: 80 mg trimethoprim + 400 mg sulfamethoxazole; Tablets: 160 mg trimethoprim + 800 mg sulfamethoxazole; Syrup: 40 mg trimethoprim + 200 mg sulfamethoxazole /5 mL; Ampoules: 80 mg trimethoprim + 400 mg sulfamethoxazole/5 mL',
        administration: 'PO; IV',
        diluent: '0.9% NaCl solution, 5% and 10% dextrose.',
        finalConcentration: '1.6 mg/mL.',
        infusionRate: 'Not less than 60 min with syringe pump.',
        dose: 'Doses expressed on trimethoprim basis Mild and moderate infections: Children: 8-12 mg/kg/day every 12 h, maximum dose: 320 mg/day; Adults: 160 mg every 12 h, maximum dose 640 mg/day. Severe infections, Pneumocystis jirovecii, stenotrophomonas, meningitis: 20 mg/kg/day every 6 h, maximum IV dose: 240 mg/dose every 6 h, PO: 320 mg/dose every 6 h. Prophylaxis: 5 mg/kg/day 3 times per week, maximum dose 160 mg. Urinary infection prophylaxis: 2 mg/kg/day in a single nightly dose.',
        notes: 'IV ampoules must not be administered undiluted. Interactions: phenytoin, rifampicin (increases levels of these drugs); metronidazole (potentiates metronidazole hematologic toxicity); cyclosporine (potentiates cyclosporine nephrotoxicity).',
      },
      neonatal: {
        dose: 'Avoid < 2 months except vital indication; dose according to NICU.',
        administration: 'PO/IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (to be administered)\n\n- 2 h at room temperature. Prepare immediately before use.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nHypersensitivity reactions (mainly dermatologic), gastrointestinal disturbances (nausea, vomiting), blood dyscrasias. Renal toxicity (in patients with prior renal failure). Hepatitis, cholestasis.',
    bibliography: [BIB.garrahan('Trimethoprim + Sulfamethoxazole', ' (code 0902, ATC J01EA)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'trm-001', name: 'Tramadol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Analgesic.',
    indications: `${MAIN}\n\nAnalgesic.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Calmador(R) capsules: 50 mg, drops: 1 mL=20 drops=50 mg, 1 mL ampoules: 50 mg/mL; Lixidol: tablets 50 mg, drops: 1 mL=24 drops=100 mg; Nobligán(R) capsules: 50 mg, drops: 1 mL=40 drops=100 mg, 2 mL ampoules: 50 mg/mL',
        administration: 'PO; IV',
        diluent: '0.9% NaCl solution, 5% dextrose.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '20 min with syringe pump.',
        dose: '1-2 mg/kg/dose every 8 h, maximum dose: 3 - 6 mg/kg/day. Adults: 50-100 mg every 4-6 h, maximum dose: 400 mg/day. When switching to controlled-release capsules give every 12 h. Adjust dose in hepatic insufficiency.',
        notes: 'Drug under evaluation in pediatrics; use in older children and adolescents. Interacts with carbamazepine and tricyclic antidepressants. See alert',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nSee opioid analgesics section.',
    bibliography: [BIB.garrahan('TraMADol Hydrochloride *', ' (code 0477, ATC N02AX)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'val-001', name: 'Valproate', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsant. Migraine prevention. Psychiatric use: bipolar disorder-mania.',
    indications: `${MAIN}\n\nAnticonvulsant. Migraine prevention. Psychiatric use: bipolar disorder-mania.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'IV ampoule 100 mg/mL; syrup/tablets PO.',
        dose: 'Loading 20–40 mg/kg IV; maintenance 15–60 mg/kg/day PO divided.',
        administration: 'IV over 60 min or PO.',
      },
      pediatrico: {
        dose: 'Status epilepticus (IV; NG; Rectal): 20 mg/kg/dose, maximum loading dose: 1 g: Infusion: 1-4 mg/kg/min. Maintenance (PO): 15 - 50 mg/kg/day every 8 h, maximum dose: 90 mg/kg/day (maximum per day: 2000 - 2500 mg). Neuropathic pain: 10-30 mg/kg/day in 2 or 3 doses, maximum dose: 400 mg/day.',
        administration: 'PO; IV',
        presentation: '5 mL vial: 100 mg/mL; Syrup: 50 mg/mL; Capsules: 250 mg; Tablets: 200-250-400-500 mg',
        notes: 'Plasma levels are recommended if nonadherence to treatment and/or adverse effects are suspected. IV administration: dilute in 50 mL 5% dextrose or normal saline and administer over 60 minutes, maximum infusion rate: 20 mg/minute. Perform complete blood count, platelets and transaminases every 3-6 months and ammonia according to clinical picture. Inhibits lamotrigine metabolism increasing risk of rash, ataxia and tremor. May increase free phenytoin concentration. Anticonvulsant effect may be antagonized by antidepressants and antipsychotics. Although tablets or capsules are different salts depending on brand name (Depakene: valproic acid; Exibral and Logical: magnesium valproate; Valcote: divalproex sodium) all are indicated with valproic acid equivalent. See pregnancy alert See Alert See preliminary guide for prevention of teratogenesis caused by medications.',
      },
      neonatal: {
        dose: 'Restricted use; NICU regimens under neurology.',
        administration: 'IV/PO.',
      },
    },
    stability: '## Stability\n\n- IV according to prescribing information; do not refrigerate precipitate.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, diarrhea, tremor, hair loss, hepatotoxicity, thrombocytopenia, pancreatitis, orexigenic effect.',
    bibliography: [BIB.garrahan('Valproic Acid', ' (code 0235, ATC N03AG)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vas-001', name: 'Vasopressin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'For hypotension refractory to catecholamines with hypovolemia.',
    indications: `${MAIN}\n\nFor hypotension refractory to catecholamines with hypovolemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute according to prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration according to service guide (infusion pump).',
        dose: '0.03–0.04 IU/min fixed or 0.01–0.04 IU/min according to sepsis protocol.',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV on pump; central route preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, diuresis and peripheral perfusion.',
      },
      pediatrico: {
        presentation: '1 mL ampoules: 20 U/mL',
        reconstitution: 'Reconstitute according to prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration according to service guide (infusion pump).',
        dose: '0.01-0.15 U/kg/hour',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'IV',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'For IV administration, dilute in normal saline or 5% dextrose before use, maximum administration concentration 1 U/mL. Discard unused diluted solution after 18 h at room temperature and 24 h under refrigeration.',
      },
      neonatal: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute according to prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration according to service guide (infusion pump).',
        dose: 'Per kg dose according to NICU protocol for refractory shock.',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV on pump; central route preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, diuresis and peripheral perfusion.',
      },
    },
    stability: '## Stability\n\n- Dilution stable according to prescribing information; rotate infusion site.',
    adverseEffects: '## Adverse effects\n\nHypertension, bradycardia, arrhythmias, venous thrombosis, fever, vertigo, tremor, diaphoresis.',
    bibliography: [BIB.garrahan('Vasopressin*', ' (code 1662, ATC H01BA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vrp-001', name: 'Verapamil', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Supraventricular arrhythmias, selective calcium channel blocker.',
    indications: `${MAIN}\n\nSupraventricular arrhythmias, selective calcium channel blocker.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 80 and 120 mg. Ampoule 5 mg/2 mL.',
        dose: 'SVT: 5–10 mg IV over 2 min. PO maintenance: 120–480 mg/day divided.',
        administration: 'Slow IV under monitoring or PO.',
      },
      pediatrico: {
        dose: 'PO: 2-8 mg/kg/day every 8 h. Adults: 240-480 mg/day every 6-8 h (for extended-release tablets every 12-24 h). Cirrhosis: reduce dose by 50%.',
        administration: 'PO',
        presentation: 'Coated tablets: 80 mg',
        notes: 'Monitor heart rate, blood pressure and ECG. Contraindicated: children younger than 2 years, patients receiving β-blockers, sick sinus syndrome, patients with arterial hypotension or hypocalcemia. Increases serum levels of cyclosporine, carbamazepine, theophylline and digoxin. Phenytoin and phenobarbital reduce verapamil effect. Combination with flecainide may result in profound cardiac depression and with amiodarone, cardiotoxicity with bradycardia.',
      },
      neonatal: {
        dose: '0.1–0.2 mg/kg IV according to neonatal cardiology protocol.',
        administration: 'Slow IV.',
      },
    },
    stability: '## Stability\n\n- Ampoules: administer IV undiluted or according to protocol.',
    adverseEffects: '## Adverse effects\n\nAtrioventricular block, constipation, hypotension, vertigo, edema, headache, nausea, vomiting.',
    bibliography: [BIB.garrahan('Verapamil Hydrochloride*', ' (code 0136, ATC C08DA)'), BIB.aha, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'zid-001', name: 'Zidovudine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Nucleoside analogue antiretroviral, reverse transcriptase inhibitor. For treatment of infection caused by HIV retrovirus.',
    indications: `${MAIN}\n\nNucleoside analogue antiretroviral, reverse transcriptase inhibitor. For treatment of infection caused by HIV retrovirus.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial containing 200 mg in 20 mL (Zidovudina Dosa).',
        reconstitution: 'No prior reconstitution required. Conc: 10 mg/mL.',
        diluent: '200 mg in 50-200 mL NS or 5% dextrose.',
        finalConcentration: '2-4 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 50-100 mL NS or 5% dextrose and administer over 60 min.',
      },
      pediatrico: {
        dose: 'Prophylaxis: Newborn < 30 weeks to 35 weeks gestational age: 0 to 4 weeks of life: 2 mg/kg/dose every 12 h, 4 to 6 weeks of life: 3 mg/kg/dose every 12 h; > 35 weeks gestational age: 4 mg/kg/dose every 12 h. Treatment: Preterm infants: 1.5 mg/kg/dose every 12 h until 2 weeks of age, then 2 mg/kg/dose every 8 h. Neonates: PO: 2 mg/kg/dose every 6 h IV: 1.5 mg/kg/dose every 6 h. Children: PO: 4 to 9 kg: 12 mg/kg/dose every 12 h, 9 to 30 kg: 9 mg/kg/dose every 12 h, > 30 kg: 300 mg/dose every 12 h; IV: 120 mg/m²/dose every 6 h. Adults: 300 mg every 12 h. Severe hepatic insufficiency: 300 mg every 24 h.',
        administration: 'PO; IV',
        presentation: 'Capsules: 100-250 mg; Syrup: 10 mg/mL 20 mL vial: 10 mg/mL',
        notes: 'May be administered with meals. IV: Dilute in 5% dextrose (concentration 2-4 mg/mL) and infuse over 1 hour. Interacts with: acyclovir, amphotericin, dapsone, ganciclovir, pentamidine, trimethoprim-sulfamethoxazole, fluconazole, valproic acid, cimetidine, phenytoin, etc. See Post-exposure prophylaxis: occupational, sexual and needlestick in public settings.',
      },
      neonatal: {
        dose: 'Prophylaxis and treatment according to NICU/perinatal protocol.',
        administration: 'Slow IV according to regimen.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (to be administered)\n\n- 24 h at room temperature, 48 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nAnemia, leukopenia (mainly neutropenia), headaches, nausea, insomnia and myalgias.',
    bibliography: [BIB.garrahan('ZIDOvudine* (AZT)', ' (code 0507, ATC J05AF)'), BIB.sadiUcip, BIB.idsa, BIB.anmat, BIB.sadi],
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

console.log(`\nEN Garrahan batch 7 (part B): ${drugs.length} monographs`);
