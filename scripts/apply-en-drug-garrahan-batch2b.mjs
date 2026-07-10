#!/usr/bin/env node
/** Garrahan re-translation batch 2/8 — 10 EN monographs (part B) */
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
    id: 'clo-001', name: 'Clonidine', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antihypertensive, alpha-2 adrenergic agonist. For sedation, pain, prevention of opioid withdrawal syndrome.',
    indications: `${MAIN}\n\nAntihypertensive, alpha-2 adrenergic agonist. For sedation, pain, prevention of opioid withdrawal syndrome.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: '1 mL ampoules: 0.150 mg/mL; Solution (compounded preparation): 10 µg/mL',
        reconstitution: 'Once reconstituted, 1 amp. up to 24 mL.',
        administration: 'IV; PO',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: 'Per dilution for infusion pump (1 amp. up to 24 mL).',
        infusionRate: 'Per medical indication, with infusion pump.',
        dose: 'Severe hypertension: 2 to 18 years: IV: 2-6 µg/kg single daily dose, maximum 300 µg; PO: initial 0.5-1 µg/kg every 8 h and increase if needed up to maximum 25 µg/kg/day in divided doses (do not exceed 1.2 mg/day); Sedation, pain, prevention of opioid withdrawal syndrome: IV: initial: 0.25 µg/kg/h, increase by 0.1 µg/kg/h until adequate sedation (in most children effect should be seen with 1 - 3 µg/kg/h); PO: 1-3 µg/kg every 8 h, maximum dose 5 µg/kg every 8 h. Adjust dose with glomerular filtration < 10 mL/min.',
        notes: 'Blood pressure and pulse must be monitored. Do not discontinue abruptly if administered for more than 2 weeks; reduce daily over 5 days to 1 µg/kg/dose every 8 h then discontinue (hypertensive crisis). See practical guide for analgosedation management and weaning in intermediate and moderate care units.',
      },
    },
    stability: '## Pediatric guide\n\n- 24 h. Once reconstituted 1 amp. up to 24 mL.',
    adverseEffects: '## Adverse effects\n\nContact dermatitis, erythema, pruritus, constipation, nausea, xerostomia, dizziness, fatigue, somnolence, sedation, depression, fluid retention, bradycardia, Raynaud syndrome, headache.',
    bibliography: [BIB.garrahan('cloNIDine Hydrochloride', ' (code 0490, ATC C02AC)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'caf-001', name: 'Caffeine citrate', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Respiratory center stimulant. Prophylaxis and treatment of neonatal apnea. Psychostimulant.',
    indications: `${MAIN}\n\nRespiratory center stimulant. Prophylaxis and treatment of neonatal apnea. Psychostimulant.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Primarily neonatal use.', dose: 'Not routinely used in adults.', administration: 'N/A.' },
      pediatrico: {
        presentation: 'Solution (compounded preparation): 5 mg caffeine base/mL; 1 mL ampoules: 250 mg caffeine base/mL',
        administration: 'PO; IV',
        diluent: '0.9% saline or 5% dextrose.',
        finalConcentration: '10 mg/mL.',
        infusionRate: '30 min with infusion pump.',
        dose: 'PO/IV: Loading dose: 10 mg caffeine base/kg in a single dose; maintenance dose: 2.5 mg caffeine base/kg/day in a single dose.',
        notes: 'If no response, obtain levels; recommended blood concentration: 5 - 25 µg/mL; concentrations > 40 - 50 µg/mL are toxic. Formulation is caffeine base (compounded and commercial). See guide for intravenous drug administration.',
      },
      neonatal: { dose: 'Loading 10–20 mg/kg IV over 30 min; maintenance 5 mg/kg/day.', administration: 'IV/PO.' },
    },
    stability: '## Pediatric guide\n\n- 24 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nTachycardia, agitation, vomiting.',
    bibliography: [BIB.garrahan('Caffeine', ' (code 0029, ATC N06BC)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'man-001', name: 'Mannitol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Osmotic diuresis, toxin elimination, intracranial hypertension.',
    indications: `${MAIN}\n\nOsmotic diuresis, toxin elimination, intracranial hypertension.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '500 mL sachet or bag 15%.',
        dose: '0.25–1 g/kg IV over 15–30 min; repeat per osmolarity.',
        infusionRate: 'IV over 15–30 min.',
        administration: 'IV with filter.',
      },
      pediatrico: {
        dose: '0.25-1 g/kg over 15-30 minutes.',
        administration: 'IV',
        presentation: 'Solution: 150 mg/mL',
        notes: 'Mannitol potentiates the ototoxic effect of aminoglycosides, may reduce the effect of anticoagulant drugs, increases risk of digoxin toxicity (by causing hypokalemia). Reduces renal toxicity of cisplatin. Do not add electrolytes to mannitol solution as precipitation may occur.',
      },
      neonatal: { dose: '0.25–0.5 g/kg per neuro-NICU protocol.', administration: 'Slow IV.' },
    },
    stability: '## Stability\n\n- Crystallizes when cold; warm and shake before use.',
    adverseEffects: '## Adverse effects\n\nHeadache, confusion, circulatory overload, blurred vision, rhinitis, vomiting, nausea, thirst, urinary retention. Extravasation may cause edema, inflammation, and skin necrosis.',
    bibliography: [BIB.garrahan('Mannitol', ' (code 0387, ATC B05BC)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'sal-001', name: 'Salbutamol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Topical anti-inflammatory, bronchodilator.',
    indications: `${MAIN}\n\nTopical anti-inflammatory, bronchodilator.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Nebulization 5 mg/mL; MDI; IV ampoule.',
        dose: 'Neb: 2.5–5 mg every 20 min x 3. IV: 0.5 mcg/kg/min infusion in severe crisis.',
        administration: 'Nebulization or IV.',
      },
      pediatrico: {
        dose: 'Per medical indication.',
        administration: 'Inhalation',
        presentation: 'Aerosol: each dose Salbutamol 100 mcg + Beclomethasone dipropionate 50 mcg',
        notes: 'Not indicated for acute attack. Monitor patient with pulmonary function tests. Risk of Cushing syndrome, cushingoid appearance, adrenal suppression, growth delay in children and adolescents, decreased bone mineral density, cataracts, glaucoma and, more rarely, psychological or behavioral effects (psychomotor hyperactivity, sleep disorders, anxiety, depression or aggressiveness especially in children). Monitor height in children receiving treatment. Do not discontinue treatment abruptly. Caution in thyrotoxicosis, pulmonary tuberculosis, myocardial insufficiency, known aneurysms or severe underlying cardiac disease (myocardial ischemia, tachyarrhythmias and hypertrophic obstructive cardiomyopathy), hypertension, impaired glucose tolerance, overt diabetes, pheochromocytoma and concomitant use of cardiac glycosides. Risk of oral infections (advise patient to rinse mouth after administration), hypokalemia potentiated with concomitant xanthines, corticosteroids or diuretics: monitor serum K+.',
      },
      neonatal: { dose: 'Neb: 0.1–0.3 mg/kg; IV infusion in bronchopulmonary dysplasia per NICU.', administration: 'Neb/IV.' },
    },
    stability: '## Stability\n\n- Use fresh nebulization solution.',
    adverseEffects: '## Adverse effects\n\nOral or pharyngeal candidiasis; tremor, headache; tachycardia; hoarseness, mouth and throat irritation.',
    bibliography: [BIB.garrahan('BECLOmethasone + Salbutamol', ' (code 1022, ATC R03AK)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nit-001', name: 'Nitrofurantoin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Prophylaxis and treatment of urinary tract infections caused by susceptible gram-negative and gram-positive bacteria, including Escherichia coli, Klebsiella, Enterobacteriaceae, Enterococci, and Pseudomonas.',
    indications: `${MAIN}\n\nProphylaxis and treatment of urinary tract infections caused by susceptible gram-negative and gram-positive bacteria, including Escherichia coli, Klebsiella, Enterobacteriaceae, Enterococci, and Pseudomonas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '50 mg, 100 mg capsules; suspension.',
        dose: '100 mg PO every 12 h x 5–7 days (cystitis). Prophylaxis: 50–100 mg PO at night.',
        administration: 'PO with food.',
      },
      pediatrico: {
        dose: 'Children: Treatment: 5-7 mg/kg/day every 6 h. Prophylaxis: 2.5 mg/kg/day once daily. Maximum dose: 400 mg. Adults: Prophylaxis: 50 mg-100 mg/day at night; Treatment: 50 mg-100 mg every 6 h for 7 days.',
        administration: 'PO',
        presentation: 'Tablets: 100 mg; Suspension: 5 mg/mL',
        notes: 'Contraindicated in patients with impaired renal function. Caution in patients with asthma.',
      },
    },
    stability: '## Stability\n\n- Store protected from light.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, anorexia, headache, dizziness, nystagmus, myalgia, peripheral neuropathy, rash, urticaria, fever. Hemolytic anemia in patients with glucose-6-phosphate dehydrogenase (G6PD) deficiency. With prolonged treatment: pulmonary fibrosis.',
    bibliography: [BIB.garrahan('NitroFURANTOIN', ' (code 0319, ATC J01XE)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'flu-001', name: 'Fluconazole', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Urinary candidiasis. Superficial mycoses and deep infections in the non-neutropenic patient.',
    indications: `${MAIN}\n\nUrinary candidiasis. Superficial mycoses and deep infections in the non-neutropenic patient.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachet containing 200 mg (Fluconazol Norgreen, Rivero, Fluconovag, Braun).',
        reconstitution: 'No prior reconstitution required. Conc: 2 mg/mL.',
        finalConcentration: '2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Administer sachet contents over 60 min.',
        notes: 'Keep at room temperature and protected from light. Do not remove protective cover (black plastic bag) until time of use.',
      },
      pediatrico: {
        presentation: 'Tablets: 100-200 mg; Suspension: 10 mg/mL; 100 mL ready-to-use solution: 2 mg/mL',
        administration: 'PO; IV',
        diluent: 'Already diluted.',
        finalConcentration: 'Do not dilute.',
        infusionRate: '2 h with infusion pump.',
        dose: 'Children: PO, IV: Esophageal and oropharyngeal candidiasis: 3-6 mg/kg/day, maximum dose: 200 mg/day; Systemic candidiasis and cryptococcal meningitis: 6-12 mg/kg/day every 24 h, maximum dose 400 mg; Adults: 200-800 mg/day according to severity of infection.',
        compatibility: 'Do not administer concomitantly with ampicillin, calcium gluconate, ceftazidime, cefotaxime, cefuroxime, ceftriaxone, clindamycin, furosemide, imipenem, and piperacillin.',
        notes: 'Fluconazole may increase serum levels of: cyclosporine, phenytoin, tacrolimus, midazolam, zidovudine, warfarin, cisapride. Rifampin decreases serum fluconazole concentration. IV administration: doses ≥ 6 mg/kg infuse over at least 2 h. Good CSF penetration. Elimination: 60% renal; adjust dose in renal insufficiency. See preliminary guide for prevention of medication-related teratogenesis.',
      },
      neonatal: { dose: 'Prophylaxis/treatment per NICU protocol (e.g. 6 mg/kg/dose every 72 h in preterm infants).', administration: 'Slow IV.' },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (for administration)\n\n- Not specified.\n\n## Pediatric guide\n\n- Discard once opened.',
    adverseEffects: '## Adverse effects\n\nNausea, abdominal pain, diarrhea, reversible alopecia, nephrotoxicity, hypokalemia, rash (monitor), pruritus, anorexia, hepatotoxicity (rare), eosinophilia, leukopenia, thrombocytopenia, neutropenia.',
    bibliography: [BIB.garrahan('Fluconazole', ' (code 0409, ATC J02AC)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'lin-001', name: 'Linezolid', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'For infections caused by vancomycin-resistant organisms. Oxazolidinone antibacterial.',
    indications: `${MAIN}\n\nFor infections caused by vancomycin-resistant organisms. Oxazolidinone antibacterial.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachet containing 600 mg linezolid in 300 mL (Zyvox, Litrocan, Richet).',
        reconstitution: 'No prior reconstitution required. Conc: 2 mg/mL.',
        diluent: '600 mg in 300 mL.',
        finalConcentration: '2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Ready to use. Administer over 30-120 min.',
        notes: 'Irritant. May cause phlebitis and injection-site pain. May have a slightly yellowish coloration that may intensify over time without affecting potency.',
      },
      pediatrico: {
        presentation: 'IV injectable solution 2 mg/mL: infusion bags containing 600 mg/300 mL; Coated tablets: 600 mg',
        administration: 'IV; PO',
        diluent: '0.9% NaCl, 5% dextrose, Ringer solution.',
        finalConcentration: '2 mg/mL.',
        infusionRate: '30 to 120 minutes with infusion pump.',
        dose: 'Preterm neonates under 7 days: 10 mg/kg/dose every 12 h; Newborns to 11 years: 10 mg/kg/dose every 8 h; > 11 years to 18 years: 10 mg/kg/dose every 12 h, maximum 1200 mg/day; Adults: 600 mg/dose every 12 h, maximum dose: 1200 mg/day. Tuberculosis treatment: < 15 kg: 15 mg/kg/day every 24 h; > 15 kg: 10-12 mg/kg/day every 24 h, maximum dose: 600 mg.',
        compatibility: 'Incompatible with amphotericin B, diazepam, phenytoin, TMP-SMX (trimethoprim/sulfamethoxazole), and ceftriaxone.',
        notes: 'Patients on dialysis: administer after the procedure. Avoid consuming tyramine-rich foods or beverages. Caution when administered with adrenergic or serotonergic agents. IV: administer over 30 to 120 minutes. See tuberculosis treatment guide.',
      },
      neonatal: { dose: '10 mg/kg/dose every 8–12 h (NICU).', administration: 'IV.' },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (for administration)\n\n- Not specified.\n\n## Pediatric guide\n\n- 4 h at room temperature once opened. Keep in original container.',
    adverseEffects: '## Adverse effects\n\nHypertension, headache, diarrhea, nausea, thrombocytopenia.',
    bibliography: [BIB.garrahan('Linezolid*', ' (code 1518, ATC J01XX)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'mer-001', name: 'Meropenem', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Spectrum similar to imipenem.',
    indications: `${MAIN}\n\nSpectrum similar to imipenem.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial containing 1 g (Meropenem Drawer, Fabra, FADA, Klonal, Larjan, Richet, Anfietoc).',
        reconstitution: '10 mL sterile water for injection. Conc: 50 mg/mL.',
        diluent: '500 mg in 100 mL NS or 5% dextrose.',
        finalConcentration: '5 mg/mL.',
        administration: 'Direct IV: Yes. Shake until dissolved in 10 mL SWFI, administer over 5 min. Intermittent IV: Yes. Dilute in 100 mL NS or 5% dextrose and infuse over 30-60 min.',
        notes: 'With fluid restriction, may be diluted in as little as 50 mL NS or 5% dextrose.',
      },
      pediatrico: {
        presentation: 'Vial: 500-1000 mg',
        reconstitution: 'Sterile water for injection for reconstitution.',
        administration: 'IV; IM',
        diluent: '0.9% NaCl, 5% and 10% dextrose, mannitol.',
        finalConcentration: '50 mg/mL.',
        infusionRate: '15 to 30 minutes with infusion pump.',
        dose: 'Sepsis, CNS infections and cystic fibrosis: 120 mg/kg/day every 8 h, maximum dose: 6 g/day. Urinary tract, skin and soft tissue and other infections: 60 mg/kg/day every 8 h, maximum dose: 3 g/day. Pulmonary, intestinal tuberculosis: 60 mg/kg/day every 8 h, maximum 1,000 mg/dose. Meningeal tuberculosis: 120 mg/kg/day every 8 h, maximum 2,000/dose. See tuberculosis treatment guide.',
        notes: 'Lower CNS toxicity than imipenem. Push administration: 3 to 5 min; intermittent infusion: 15 to 30 min.',
      },
      neonatal: {
        presentation: '500 mg vial-ampoule (Neonatal ICU).',
        dose: 'Dose and interval per postmenstrual age and weight (e.g. 20 mg/kg/dose every 12–24 h in preterm infants; medical adjustment).',
        administration: 'IV preferably via central line.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 1 h at room temperature, 8 h refrigerated.\n\n## Diluted solution (for administration)\n\n- In NS: 8 h at room temperature, 48 h refrigerated. In 5% dextrose: 3 h at room temperature, 14 h refrigerated.\n\n## Pediatric guide\n\n- 2 h at room temperature. 12 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nHeadache, nausea, abdominal pain, diarrhea.',
    bibliography: [
      BIB.garrahan('MEROpenem', ' (code 1152, ATC J01DH)'),
      BIB.sadiUcip,
      BIB.pedGuide,
      { citation: 'Sanford Guide to Antimicrobial Therapy — Meropenem.', url: 'https://www.sanfordguide.com/' },
      { citation: 'ANMAT. Drug information — Meropenem.', url: 'https://www.argentina.gob.ar/anmat' },
      { citation: 'Argentine Society of Infectious Diseases (SADI). Rational use of antimicrobials.', url: 'https://www.sadi.org.ar/' },
    ],
  },
  {
    id: 'imp-001', name: 'Imipenem/cilastatin', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of lower respiratory, urinary, intra-abdominal, gynecologic, bone and joint infections, septicemia, endocarditis, and skin and soft tissue infections caused by multidrug-resistant gram-negative bacteria.',
    indications: `${MAIN}\n\nTreatment of lower respiratory, urinary, intra-abdominal, gynecologic, bone and joint infections, septicemia, endocarditis, and skin and soft tissue infections caused by multidrug-resistant gram-negative bacteria.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial containing 500 mg imipenem + 500 mg cilastatin (Imipenem Drawer, Dixabiox, Imistatin, Zienam, Pharmavial, Imipecil, Richet).',
        reconstitution: '10 mL NS or 5% dextrose. Conc: 50 mg/mL.',
        diluent: '500 mg in 100 mL NS or 5% dextrose.',
        finalConcentration: '5 mg/mL.',
        administration: 'Intermittent IV: Yes. Dilute in 100 mL NS or 5% dextrose and shake. Administer over 20-30 min. Doses >500 mg must be infused over 40-60 min.',
        notes: '500 mg imipenem+cilastatin contains 37.5 mg sodium (1.6 mEq). If nausea and vomiting occur, reduce infusion rate. IM administration is possible.',
      },
      pediatrico: {
        presentation: 'Vial: 500 mg',
        administration: 'IV; IM',
        diluent: '0.9% NaCl, 5% and 10% dextrose.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '≤500 mg: 15 to 30 min. >500 mg: 40 to 60 min.',
        dose: 'Children: 60-100 mg/kg/day every 6-8 h, maximum dose: 4 g. Adults: 500 mg every 6 h; Pseudomonas: 1000 mg every 6 h. Cystic fibrosis: 90 mg/kg/day every 6 h, maximum dose: 4 g/day.',
        compatibility: 'Do not administer concomitantly with ganciclovir.',
        notes: 'Administer over 30 to 60 minutes. Caution in patients with renal impairment and neurological compromise. Use in newborns is not advised. With ganciclovir increases risk of seizures.',
      },
      neonatal: { dose: 'Dose per postmenstrual age (NICU); specialized use.', administration: 'IV.' },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h refrigerated.\n\n## Diluted solution (for administration)\n\n- With NS: 4 h at room temperature and 48 h refrigerated. 5% dextrose: 4 h at room temperature and 24 h refrigerated.\n\n## Pediatric guide\n\n- NS room temperature: 10 h, 48 h refrigerated. 5% dextrose room temperature: 4 h, 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nPhlebitis, allergic reactions, nausea, vomiting, diarrhea, pseudomembranous colitis, seizures. Rare: leukopenia, hepatotoxicity and nephrotoxicity.',
    bibliography: [BIB.garrahan('IMIpenem + Cilastatin*', ' (code 0382, ATC J01DH)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'rif-001', name: 'Rifampin', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiotic. Antituberculous agent.',
    indications: `${MAIN}\n\nAntibiotic. Antituberculous agent.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lyophilized powder vial containing 600 mg (Rifampicina Kilab, Richet).',
        reconstitution: '10 mL sterile water for injection. Conc: 60 mg/mL.',
        diluent: '600 mg in 500 mL 5% dextrose.',
        finalConcentration: '1.2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Shake gently until complete dissolution. Dilute in 100-500 mL 5% dextrose and administer over maximum 3 h.',
        notes: 'After 4 h of prepared dilution, antibiotic precipitation may occur. Preferably use 5% dextrose, as stability is reduced in NS.',
      },
      pediatrico: {
        presentation: 'Capsules: 300 mg; Tablets: 300 mg; Syrup: 20 mg/mL; Vial: 600 mg',
        administration: 'IV; PO',
        diluent: 'Preferably 5% dextrose. Otherwise NS.',
        finalConcentration: '6 mg/mL.',
        infusionRate: '30 min to 3 hours with infusion pump.',
        dose: 'Under 1 month: 10 mg/kg/day. Over 1 month: 10-20 mg/kg/day every 24 h, maximum dose: 600 mg/day. Tuberculosis treatment: infants and children: 10-20 mg/kg/day, maximum dose: 600 mg/day. H. influenzae prophylaxis: neonates < 1 month: 10 mg/kg/day every 24 h for 4 days; children: 20 mg/kg/day every 24 h for 4 days; Adults: 600 mg every 24 h for 4 days. Meningococcal prophylaxis: < 1 month: 10 mg/kg/day every 12 h for 2 days; children: 20 mg/kg/day every 12 h for 2 days; Adults: 600 mg every 12 h for 2 days. Synergism: children: 10-20 mg/kg/day every 12-24 h, maximum dose: 600 mg/day; adults: IV; PO: 300 mg every 12 h. See anti-infective dose table in hospitalization.',
        notes: 'Contraindicated in patients with hypersensitivity. Caution in patients with hepatic disease. Perform liver panel at treatment start; repeat only if symptoms occur. Strong CYP-450 inducer. Interactions: digoxin, phenytoin, diazepam, cyclosporine, trimethoprim/sulfamethoxazole, ketoconazole, theophylline, anticoagulants, protease inhibitors. Rifampin interferes with oral contraceptives, reducing contraceptive efficacy. Other contraceptive methods are recommended (barrier methods—condom—intrauterine devices). May impart an orange color to body fluids. Soft contact lenses may be permanently stained. See tuberculosis treatment guide.',
      },
      neonatal: { dose: 'Neonatal TB regimens per national/NICU protocol.', administration: 'PO.' },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h at room temperature.\n\n## Diluted solution (for administration)\n\n- 4 h at room temperature.\n\n## Pediatric guide\n\n- 24 h at room temperature reconstituted and 4 hours diluted.',
    adverseEffects: '## Adverse effects\n\nGastrointestinal disturbances, jaundice, hepatitis, influenza-like febrile reactions, dermatologic reactions, neurotoxicity. Hematologic: neutropenia, leukopenia, thrombocytopenia (uncommon).',
    bibliography: [BIB.garrahan('rifAMPicin', ' (code 1054, ATC J04AB)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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

console.log(`\nEN Garrahan batch 2 (part B): ${drugs.length} monographs`);
