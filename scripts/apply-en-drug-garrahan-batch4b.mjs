#!/usr/bin/env node
/** Garrahan re-translation batch 4/8 — 10 EN monographs (part B) */
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
};

const drugs = [
  {
    id: 'pen-001', name: 'Penicillin G sodium', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of lower respiratory tract, nervous system, and heart infections caused by susceptible gram-positive microorganisms and some gram-negative such as Neisseria gonorrhoeae or Neisseria meningitidis.',
    indications: `${MAIN}\n\nTreatment of lower respiratory tract, nervous system, and heart infections caused by susceptible gram-positive microorganisms and some gram-negative such as Neisseria gonorrhoeae or Neisseria meningitidis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial with lyophilized powder containing 3 MIU (Benzyl penicillin sodium Fabra, Drawer, Northia, Klonal).',
        reconstitution: '5 mL SWFI. Conc: 0.6 MIU/mL.',
        diluent: '3 MIU in 100 mL NS.',
        finalConcentration: '0.03 MIU/mL administer over 15-60 min.',
        administration: 'Direct IV: No. Yes, 5 mL SWFI, administer over 3-5 min. Intermittent IV: Yes.',
      },
      pediatrico: {
        presentation: 'Powder vial: 1-3-5 million IU',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '100,000 to 500,000 IU/mL. Infants: 50,000 IU/mL.',
        infusionRate: '15 to 60 min with infusion pump.',
        dose: 'Mild and moderate infections: 100,000 - 150,000 IU/kg/day every 6 h, maximum dose: 8,000,000 IU/day. Severe infections: 200,000 - 300,000 IU/kg/day every 4 h, maximum dose: 24,000,000 IU/day; Meningitis: 300,000 - 400,000 IU/kg/day every 4 h; Group B Streptococcus meningitis Children: 450,000 - 500,000 IU/kg/day every 6 h; Congenital syphilis: < 7 days: 50,000 IU/kg/dose every 12 h; 8 days to 30 days: 50,000 IU/kg/dose every 8 h; infants > 1 month and children: 50,000 IU/kg/dose every 4 - 6 h. Neurosyphilis: maximum dose 18,000,000 IU - 24,000,000 IU.',
        notes: 'Antibiotics such as tetracyclines, chloramphenicol, and erythromycin may antagonize penicillin activity.',
      },
      neonatal: {
        dose: '50,000 IU/kg/dose every 12 h in newborns; meningitis: more frequent regimens (NICU protocol).',
        administration: 'Slow IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 48 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 48 h refrigerated.\n\n## Pediatric guide\n\n- 7 days refrigerated.',
    adverseEffects: '## Adverse effects\n\nSkin rash, urticaria, fever, pain, eosinophilia, hemolytic anemia, leukopenia. In uremia or high doses: seizures.',
    bibliography: [BIB.garrahan('Penicillin G. SODIUM', ' (code 163, ATC J01CA)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'pen-002', name: 'Penicillin G benzathine', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of mild and moderate infections caused by susceptible gram-positive microorganisms or for prophylaxis of infections caused by these microorganisms. Syphilis.',
    indications: `${MAIN}\n\nTreatment of mild and moderate infections caused by susceptible gram-positive microorganisms or for prophylaxis of infections caused by these microorganisms. Syphilis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial with lyophilized powder containing 1.2 and 2.4 MIU (Galtamicina, Klonal, Fabra, Richet, Pen Di Ben).',
        reconstitution: '5 mL SWFI (1.2 MIU); 10 mL SWFI (2.4 MIU). Conc: 0.24-0.12 MIU/mL.',
        diluent: '1.2 MIU in 5 mL SWFI or 2.4 MIU in 10 mL SWFI.',
        finalConcentration: '0.24 MIU/mL.',
        administration: 'Deep IM: Yes. Shake gently to allow powder wetting, then shake vigorously until complete dissolution. Direct IV: No. Intermittent IV: No.',
        notes: 'Must not under any circumstances be administered by IV route due to risk of fatal ischemia.',
      },
      pediatrico: {
        dose: 'Syphilis: 50,000 IU/kg/dose, 1 to 3 doses according to duration of disease; maximum dose: 2,400,000 IU/dose. Secondary rheumatic fever prophylaxis: ≤ 27 Kg: IM: 600,000 IU every 3 to 4 weeks; > 27 kg: IM: 1,200,000 IU every 3 to 4 weeks.',
        administration: 'IM',
        presentation: 'Powder vial: 1,200,000 IU - 2,400,000 IU (lyophilized or suspension)',
        notes: 'Use with caution in children under 2 years. Penicillin G benzathine is administered weekly.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Use immediately. Discard remainder if any.\n\n## Diluted solution (for administration)\n\n- Not applicable.',
    adverseEffects: '## Adverse effects\n\nAllergic reactions, mainly cutaneous. Hemolytic anemia, leukopenia.',
    bibliography: [BIB.garrahan('Penicillin BENZATHINE', ' (code 0162, ATC J01CA)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'tei-001', name: 'Teicoplanin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of lower respiratory tract, bone, skin and soft tissue, and urinary tract infections caused by gram-positive microorganisms susceptible to vancomycin when venous access is lost, as it can be administered by IM route.',
    indications: `${MAIN}\n\nTreatment of lower respiratory tract, bone, skin and soft tissue, and urinary tract infections caused by gram-positive microorganisms susceptible to vancomycin when venous access is lost, as it can be administered by IM route.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial-ampoule 200 mg or 400 mg.',
        reconstitution: 'Reconstitute with sterile water for injection; foaming is normal, allow to settle.',
        dose: 'Loading: 6 mg/kg every 12 h x 3 doses. Maintenance: 6 mg/kg every 24 h.',
        infusionRate: 'Slow IV infusion 30 min.',
        administration: 'IV or IM.',
      },
      pediatrico: {
        dose: 'Newborns: Day 1: 16 mg/kg/day, then 8 mg/kg/day (by infusion); > 2 months mild infections, first 3 doses IV/IM: 10 mg/kg/dose every 12 h, then: 10 mg/kg/day every 24 h; maximum dose: 400 mg/day. Neutropenic Bone Marrow Transplant severe infections: 15 - 20 mg/kg/day, maintain trough concentration: > 10 mg/L. Adults: 400 mg every 12 h for 3 doses, then mild infections: 400 mg every 24 h, severe infections: maximum dose 800 mg every 24 h.',
        administration: 'IV; IM',
        presentation: 'Powder vial: 400 mg',
        notes: 'Its prolonged half-life allows use every 24 h. IV infusion over 30 minutes. Dose adjustment in renal failure.',
      },
    },
    stability: '## Stability\n\n- Reconstituted solution 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nInjection-site pain, fever, nausea, vomiting, anaphylactic reaction. Rare: thrombocytopenia.',
    bibliography: [BIB.garrahan('Teicoplanin', ' (code 521, ATC J01XA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'vor-001', name: 'Voriconazole', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of invasive aspergillosis. Candidemia. Esophageal candidiasis.',
    indications: `${MAIN}\n\nTreatment of invasive aspergillosis. Candidemia. Esophageal candidiasis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial with lyophilized powder containing 200 mg (VFend, Richet, Sandoz).',
        reconstitution: '19 mL SWFI. Conc: 10 mg/mL.',
        diluent: '200 mg in 100 mL NS, 5% dextrose.',
        finalConcentration: '2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 100 mL NS or 5% dextrose and administer over 60-120 min.',
      },
      pediatrico: {
        dose: 'IV: 2 to 12 years: initial loading dose 9 mg/kg/dose every 12 h for 2 doses, maintenance dose 8 mg/kg every 12 h, maximum dose 350 mg every 12 h; > 12 years and adults: loading dose: 6 mg/kg/dose every 12 h for 2 doses, maintenance dose: 4 mg/kg/dose every 12 h. PO: 2 to 12 years: 9 mg/kg/dose every 12 h; > 12 years < 40 kg: 200 mg/dose every 12 h, for 1 day then 100 mg/dose every 12 h; > 40 kg: 400 mg every 12 h for 1 day, then 200 - 300 mg every 12 h. Dose adjustment in renal insufficiency: with Cl < 50 ml/min there may be accumulation of the injectable vehicle (sulfobutylether beta-cyclodextrin sodium), administer PO or assess risk-benefit. Dose adjustment in mild to moderate hepatic insufficiency: reduce maintenance dose by 50%. See dose adjustment table in hepatic insufficiency.',
        administration: 'IV; PO',
        presentation: 'Coated tablets: 50 - 200 mg; Powder vial: 200 mg; Suspension (compounded preparation): 40 mg/mL',
        notes: 'PO: administer 1 h before or 1 h after meals; IV: infuse over 1-2 h (max. rate 3 mg/kg/hour). Monitor hepatic, renal, and visual function. Interactions: voriconazole may increase serum concentration of: cisapride, pimozide, rifabutin (contraindicated), cyclosporine (reduce cyclosporine dose 50%), sirolimus (contraindicated), tacrolimus (reduce tacrolimus dose by 66%), efavirenz, delavirdine, benzodiazepines, calcium channel blockers, methylprednisolone, omeprazole (for omeprazole doses > 40 mg/day, reduce omeprazole dose by 50%). Rifampicin, phenytoin decrease voriconazole serum levels (adjust dose). See preliminary guide for prevention of teratogenesis caused by medications.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nVisual disturbances (photophobia, blurred vision, etc), tachycardia, hypertension, vasodilation, peripheral edema, fever, headache, hallucinations, hypokalemia, hypomagnesemia, nausea, vomiting, QT interval prolongation.',
    bibliography: [BIB.garrahan('Voriconazole*', ' (code 1601, ATC J02AC)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'ert-001', name: 'Ertapenem', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Sequential outpatient hospitalization treatment for intra-abdominal infections and complicated urinary tract infections.',
    indications: `${MAIN}\n\nSequential outpatient hospitalization treatment for intra-abdominal infections and complicated urinary tract infections.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial with lyophilized powder containing 1 g (Invanz, Ertapenem Richet).',
        reconstitution: '10 mL SWFI or NS. Conc: 100 mg/mL.',
        diluent: '1 g in 50-100 mL NS.',
        finalConcentration: '10-20 mg/mL.',
        administration: 'IM: Yes. Reconst. with 3.2 mL painless solvent and administer deep IM. Intermittent IV: Yes. Reconst. with 10 mL SWFI or NS, dilute with 50-100 mL NS and infuse over 30-60 min.',
        notes: 'No more than 6 h should pass between reconstitution and end of administration. Dilution in 5% dextrose is not recommended due to instability.',
      },
      pediatrico: {
        dose: 'Intra-abdominal infections and complicated urinary tract infections: 3 months to 12 years: 15 mg/kg/dose every 12 h for 5 to 14 days, maximum 1 g/day; > 13 years and adults: 1 g for 14 days.',
        administration: 'IV IM',
        presentation: 'Powder vial: 1 g',
        notes: 'Administer with caution in patients with brain lesions or history of seizures. IM: Reconstitute 1 g vial with 3.2 ml of 1% or 2% lidocaine, shake well before use (administer deep IM in a large muscle mass within one hour of preparation). IV: Shake well after reconstitution and dilute in normal saline to a final concentration of 20 mg/ml, infuse over 30 minutes; diluted solution is stable 6 h at room temperature and 24 h refrigerated. Probenecid decreases renal clearance of ertapenem. Contains 137 mg of sodium (approx. 6 mEq)/g of ertapenem.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 1 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 6 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nAbdominal pain, constipation, indigestion, nausea, vomiting, headache, vaginitis, seizures, injection-site pain.',
    bibliography: [BIB.garrahan('ERTApenem*', ' (code 1703, ATC J01DH)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'fos-001', name: 'Fosfomycin', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibacterial.',
    indications: `${MAIN}\n\nAntibacterial.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial with lyophilized powder containing 1 g (Fosfomicina Luar, Fosfomicyn).',
        reconstitution: '10 mL SWFI. Conc: 100 mg/mL.',
        diluent: '1-4 g in 100-250 mL 5% dextrose.',
        finalConcentration: '4-40 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute at 4 mL SWFI or 5% dextrose per each mL of reconstituted solution and infuse at 1 g/h. Clarification: 4 g (40 mL) in 160 mL 5% dextrose. Infuse at 40 mL/h.',
        notes: 'When fosfomycin dissolves an exothermic reaction occurs, causing the vial to warm slightly without altering the antibiotic. High sodium content (each gram of antibiotic contains 14.5 mEq).',
      },
      pediatrico: {
        dose: 'Children: 200 - 400 mg/kg/day every 6-8 h. Adults: 1 g - 5 g/day every 6-8 h; maximum dose: 16 g, in special cases: 8 g every 8 h (consult specialist).',
        administration: 'IV PO',
        presentation: 'Lyophilized powder vial (as sterile disodium salt): 1000 mg (each gram of Fosfomycin contains 14.5 mEq of sodium) Oral solution sachet (as fosfomycin trometamol): 3 g',
        notes: 'Fosfomycin trometamol: metoclopramide, antacids, or calcium salts reduce fosfomycin absorption.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Not specified.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nCommon: diarrhea (9%-10%), nausea (4%-5%), headache (4%-10%), pharyngitis (2.5%), rhinitis (4.5%). Serious: aplastic anemia, cholestasis, hepatic necrosis, toxic megacolon, angioedema.',
    bibliography: [BIB.garrahan('Fosfomycin*', ' (code 1950, ATC J01XX)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'dap-001', name: 'Daptomycin', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibacterial. Severe infections by methicillin-resistant Staphylococcus aureus intolerant or refractory to conventional treatment with vancomycin.',
    indications: `${MAIN}\n\nAntibacterial. Severe infections by methicillin-resistant Staphylococcus aureus intolerant or refractory to conventional treatment with vancomycin.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial with lyophilized powder containing 500 mg (Cubicin RT).',
        reconstitution: '10 mL SWFI. Conc: 50 mg/mL.',
        diluent: '500 mg in 50 mL NS.',
        finalConcentration: '10 mg/mL.',
        administration: 'Direct IV: Yes, adults only. Administer over 2 min. Intermittent IV: Yes. Dilute in 50 mL NS and administer over 30 min.',
        notes: 'Not compatible with 5% dextrose.',
      },
      pediatrico: {
        presentation: 'Powder vial: 500 mg',
        reconstitution: 'Reconstitute and let stand 10 min. Mix with gentle rotations. Do not shake vigorously.',
        administration: 'IV',
        diluent: '0.9% NaCl. NOT 5% dextrose.',
        finalConcentration: '20 mg/mL.',
        infusionRate: '30 min with infusion pump.',
        dose: 'Children 2-6 years: 8 - 10 mg/kg/day every 24 h; 6-12 years: 7 mg/kg/day every 24 h; > 12 years: 4 - 6 mg/kg/day every 24 h. Bacteremia, right-sided endocarditis, osteomyelitis, septic arthritis: 8 - 10 mg/kg/day Adults: Severe skin and soft tissue infections: 4 mg/kg/day every 24 h; bacteremia, right-sided endocarditis: 6 mg/kg/day.',
        notes: 'Infusion rate: 60 minutes. Monitor signs and symptoms of: myopathies and peripheral neuropathy, weekly CPK monitoring.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h at room temperature, 48 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 48 h refrigerated.\n\n## Pediatric guide\n\n- 12 h at room temperature, 48 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nChest pain, peripheral edema, headaches, dizziness, insomnia, abdominal pain, anemia, eosinophilia, increased serum transaminases, renal failure.',
    bibliography: [BIB.garrahan('Daptomycin*', ' (code 1831, ATC J01XX)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'lev-001', name: 'Levofloxacin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Cervicitis, urethritis due to C. trachomatis and gonococcus. Severe infections by multidrug-resistant organisms. Mycobacterial infections.',
    indications: `${MAIN}\n\nCervicitis, urethritis due to C. trachomatis and gonococcus. Severe infections by multidrug-resistant organisms. Mycobacterial infections.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 500 mg, 750 mg; IV 500 mg.',
        dose: '500–750 mg PO/IV every 24 h.',
        administration: 'PO or IV.',
      },
      pediatrico: {
        dose: 'Children: information is very limited, some centers recommend: 6 months to 5 years: 10 mg/kg/dose every 12 h, maximum dose: 500 mg/day; over 5 years: 10 mg/kg/dose every 24 h, maximum dose: 1 g/day. Adults: 500 mg every 24 h; severe infections: 750 mg every 24 h; tuberculosis treatment: 15 - 20 mg/kg/day every 24 h; travelers diarrhea: 500 mg every 24 h for 3 days.',
        administration: 'PO; IV',
        presentation: 'Tablets: 500 mg; 20 mL vial: 25 mg/ml; Suspension (compounded preparation): 50 mg/ml',
        notes: 'Aluminum and magnesium-based antacids should be taken at least 2 h before or after levofloxacin. May prolong theophylline half-life. Additive effects with medications that prolong the QT interval. See tuberculosis treatment guide',
      },
    },
    stability: '## Stability\n\n- IV diluted per prescribing information; protect from light.',
    adverseEffects: '## Adverse effects\n\nDiarrhea, nausea, vaginitis, rash, insomnia, hepatic toxicity. Hyperglycemia, hypoglycemia. Tendon ruptures (most frequently Achilles tendon) from 48 h of treatment.',
    bibliography: [BIB.garrahan('levoFLOXacin*', ' (code 1360, ATC J01MA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'ome-001', name: 'Omeprazole', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Severe gastrointestinal bleeding. Gastro-duodenal ulcer. Gastroesophageal reflux. Hypersecretory conditions. Proton pump inhibitor.',
    indications: `${MAIN}\n\nSevere gastrointestinal bleeding. Gastro-duodenal ulcer. Gastroesophageal reflux. Hypersecretory conditions. Proton pump inhibitor.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Capsules/tablets: 10-20-40 mg; MUPS tablets: 10-20 mg; Powder vial: 40 mg (reconstitute only with the solvent supplied with the vial); Oral suspension: Bottle with powder for reconstitution in 70 ml: 2 mg/ml, also contains 168 mg of sodium bicarbonate/ml.',
        reconstitution: 'Reconstitute only with the solvent supplied by the manufacturer.',
        administration: 'PO; IV',
        diluent: '0.9% NaCl or 5% dextrose for dilution.',
        finalConcentration: '0.4 mg/mL.',
        infusionRate: 'Between 20 and 30 minutes with infusion pump.',
        dose: 'PO: Esophagitis: Children: 0.5 mg/kg/dose, every 24 h, maximum dose: 20 mg/day; Adults: 20 mg/dose, every 24 h. Duodenal ulcer: Children: 1 mg/kg/day; every 12 h, maximum dose 20 mg/day; Adults: 20 mg/dose, every 24 h. Gastroesophageal reflux: Children > 1 month: 0.5-1 mg/kg/dose, every 24 h, maximum dose: 20 mg/day, Adults: 20 mg/dose, every 24 h. Hypersecretory conditions: 60 mg/day. Zollinger-Ellison syndrome: 60 mg/dose every 8 h, followed by maintenance PO therapy of 90 mg/dose every 12 h and then every 24 h. IV: Children 1 month-12 years: 0.5-2 mg/kg/dose, every 24 h. > 12 years: 40 mg/dose, every 24 h. Switch to oral route as soon as the patient tolerates. Gastrointestinal bleeding administer every 8 h, for 3 to 5 days according to evolution and then every 12-24 h.',
        compatibility: 'Do not administer concomitantly with rifampicin, phenytoin, and carbamazepine.',
        notes: 'Once reconstituted with the manufacturer solvent, the injectable lasts 4 h, infuse slowly, undiluted (maximum rate: 4 ml/min). For IV infusion: reconstitute powder with 10 ml of normal saline (stability 12 h), take indicated dose and dilute with the same solvent to a concentration of 0.4 mg/ml; administer over 30 min. Same with 5% dextrose (stability 6 h). Capsule: do not chew or crush granules, capsule may be opened and contents administered with yogurt or orange juice. MUPS tablet: swallow whole with half a glass of liquid and must not be crushed or chewed, may also be disintegrated in half a glass of still water or fruit juice (shake until tablet disintegrates and drink liquid with pellets immediately or within 30 minutes). For NG tube administration dissolve 20 mg capsule in 10 ml of sodium bicarbonate or dissolve MUPS tablet presentation in water. Omeprazole may delay excretion of: diazepam, phenytoin. Decreases iron concentration. Alters concentration of cyclosporine, itraconazole, ketoconazole, voriconazole, clarithromycin, digoxin. Contraindicated with atazanavir. See alert.',
      },
    },
    stability: '## Pediatric guide\n\n- 4 hours at room temperature.',
    adverseEffects: '## Adverse effects\n\nDiarrhea, nausea, constipation, abdominal pain, vomiting, headache, dizziness. Interstitial nephritis.',
    bibliography: [BIB.garrahan('Omeprazole', ' (code 0714, ATC A02BC)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'nor-001', name: 'Norepinephrine (noradrenaline)', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Sympathomimetic. Cardiogenic or septic shock with refractory hypotension and low peripheral resistance.',
    indications: `${MAIN}\n\nSympathomimetic. Cardiogenic or septic shock with refractory hypotension and low peripheral resistance.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: 'Usual starting dose 0.05–0.1 mcg/kg/min; titrate to target MAP (prescription).',
        infusionRate: 'Continuous infusion pump.',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
      pediatrico: {
        presentation: '4 mL ampoules: 1 mg/ml',
        administration: 'IV',
        diluent: 'ONLY 5% dextrose.',
        finalConcentration: 'Usual 4 mcg/mL. With fluid restriction, 16 mcg/mL.',
        infusionRate: 'Infusion pump only.',
        dose: '0.05-1 µg/kg/minute, maximum dose: 2 µg/kg/min Adults: start 4 µg/minute, Infusion: 8-12 µg/minute',
        notes: 'Oxidizes rapidly, do not use if brown discoloration is present. Dilution in normal saline is not recommended. Effects of norepinephrine may be increased in the presence of tricyclic antidepressants, antihistamines, and beta blockers.',
      },
      neonatal: {
        presentation: 'Ampoule or vial for IV infusion per institutional presentation.',
        reconstitution: 'Reconstitute per prescribing information; dilute in 5% dextrose or 0.9% NaCl.',
        diluent: '5% dextrose or 0.9% NaCl.',
        finalConcentration: 'Concentration per service guide (infusion pump).',
        dose: '0.05–1 mcg/kg/min per NICU protocol and weight.',
        infusionRate: 'Titrate according to BP and perfusion',
        administration: 'Continuous IV infusion pump; central line preferred.',
        compatibility: 'Verify in-line compatibility with other vasopressors.',
        notes: 'Monitor HR, invasive BP, urine output, and peripheral perfusion.',
      },
    },
    stability: '## General\n\n- Protect from light. Change solution per service policy (usually 24 h).\n\n## Pediatric guide\n\n- Discard remainder once opened. Dilution stable 24 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nHypertension, necrosis, bradycardia. Prolonged use: decreased cardiac output, plasma volume depletion, severe peripheral and visceral vasoconstriction. Additionally, stress cardiomyopathy.',
    bibliography: [BIB.garrahan('NORadrenaline', ' (code 1401, ATC C01CA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nEN Garrahan batch 4 (part B): ${drugs.length} monographs`);
