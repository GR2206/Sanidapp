#!/usr/bin/env node
/** Garrahan re-translation batch 2/8 — 10 EN monographs (part A) */
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
  heartHtn: { citation: 'American Heart Association. Hypertension and heart failure guidelines.', url: 'https://www.heart.org/' },
  rybak: { citation: 'Rybak MJ, et al. Therapeutic monitoring of vancomycin: revised consensus guidelines. Am J Health Syst Pharm. 2020.', url: 'https://www.ashp.org/' },
  sanfordVan: { citation: 'Sanford Guide to Antimicrobial Therapy — Vancomycin dosing and monitoring.', url: 'https://www.sanfordguide.com/' },
  anmatVan: { citation: 'ANMAT. Drug information — Vancomycin.', url: 'https://www.argentina.gob.ar/anmat' },
};

const drugs = [
  {
    id: 'van-001', name: 'Vancomycin', version: '1.3', updatedAt: '2026-07-09',
    executiveSummary: 'Bactericidal glycopeptide against beta-lactam–resistant Gram-positive organisms (MRSA, enterococci, and others). High-risk medication: slow infusion (1 h), serum level monitoring, nephrotoxicity and ototoxicity.',
    indications: `${MAIN}\n\n- Treatment of infections caused by beta-lactam–resistant Gram-positive microorganisms (*MRSA, S. viridans, Bacillus, Corynebacterium*).\n- Sepsis, bacteremia, meningitis, septic arthritis, endocarditis, osteomyelitis, nosocomial pneumonia due to *S. aureus*.\n- Pseudomembranous colitis due to *Clostridioides difficile*: oral route according to severity.\n\n## Precautions\n\n- Administer by infusion over 1 hour; risk of red man syndrome with hypotension if infusion is rapid.\n- Caution regarding necrosis with extravasation; monitor trough serum levels according to indication.\n- Adjust dose in renal insufficiency per institutional protocol.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder for injection 500–1000 mg (Rivervan, Vancomax, V. Fabra, V. Northia, V. Richet, Varedet).',
        reconstitution: '10 mL sterile water for injection. Conc: 100 mg/mL.',
        diluent: '500 mg in 100 mL 0.9% NaCl.',
        finalConcentration: '5 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute 500 mg in 100 mL 0.9% NaCl and administer over no less than 60–90 min. Oral: Yes (*C. difficile* colitis).',
        dose: 'Preoperative dose in adults: 1 g/dose.',
        notes: 'Plasma vancomycin monitoring (from 48 h of treatment). Trough according to indication: 15–20 µg/mL (bacteremia, endocarditis, osteomyelitis, meningitis, nosocomial MRSA pneumonia); 10–15 µg/mL for other indications.',
      },
      pediatrico: {
        presentation: 'Powder for injection 500–1000 mg.',
        reconstitution: 'Sterile water for injection for reconstitution.',
        administration: 'IV; PO (*C. difficile* colitis).',
        diluent: '0.9% NaCl or 5% dextrose.',
        finalConcentration: '5 mg/mL.',
        infusionRate: 'Infusion over 1 h.',
        dose: 'IV — Sepsis, bacteremia, meningitis, and septic arthritis: 60 mg/kg/day every 6 h. IV — Other infections: 40 mg/kg/day every 8 h. IV — Cystic fibrosis: 45 mg/kg/day every 8 h. Maximum dose: 2 g/day (up to 4 g/day if underdosed). PO — *C. difficile* colitis: 10 mg/kg/dose every 6 h (max. 125 mg/dose; severe or fulminant: max. 500 mg/dose), 10 days.',
        notes: 'High-risk medication. Ototoxic, nephrotoxic. May cause phlebitis, febrile reactions, rash, eosinophilia, neutropenia. Bolus administration may induce cardiac arrest.',
      },
      neonatal: {
        dose: 'Dose and interval according to postmenstrual age and renal function (NICU protocol).',
        administration: 'Central route preferred; monitor access and signs of extravasation.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature.\n\n## Pediatric guide\n\n- 96 h refrigerated.',
    adverseEffects: '## Common\n\n- Red man syndrome with hypotension (associated with infusion rate).\n- Phlebitis, febrile reactions, rash, eosinophilia, neutropenia.\n\n## Serious\n\n- Ototoxicity, nephrotoxicity.',
    bibliography: [BIB.garrahan('Vancomycin Hydrochloride', ' (code 0216, ATC J01XA)'), BIB.sadiUcip, BIB.rybak, BIB.sanfordVan, BIB.anmatVan],
  },
  {
    id: 'gen-001', name: 'Gentamicin', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Aminoglycoside antibiotic for treatment of bone, central nervous system, respiratory tract, skin and soft tissue, abdominal, urinary, and endocarditis infections caused by Gram-negative bacteria, including Pseudomonas, and Gram-positive bacteria.',
    indications: `${MAIN}\n\nAminoglycoside antibiotic for treatment of bone, central nervous system, respiratory tract, skin and soft tissue, abdominal, urinary, and endocarditis infections caused by Gram-negative bacteria, including Pseudomonas, and Gram-positive bacteria.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule containing 80 mg (Gentamicin Drawer).',
        reconstitution: 'No prior reconstitution required. Conc: 40 mg/mL.',
        diluent: '80 mg in 100 mL 0.9% NaCl.',
        finalConcentration: '0,8 mg/mL.',
        administration: 'Intermittent IV: Yes. Dilute in 100 mL 0.9% NaCl and administer over 30 min.',
      },
      pediatrico: {
        presentation: '2 mL ampoules: 40 mg/mL',
        administration: 'IV; IM',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '11 mg/mL.',
        infusionRate: '30 to 60 min.',
        dose: '5-7,5 mg/kg/day every 24 h, maximum dose: 300 mg. Cystic fibrosis: 10 mg/kg/day, maximum dose: 400 mg. Endocarditis: 3 mg/kg/day every 8 h (monitor serum concentration). See antimicrobial dose adjustment table.',
        compatibility: 'Incompatible with cephalosporins, penicillin, and heparin.',
        notes: 'IV: administer diluted over 30 minutes. Pharmacokinetics: Multiple daily doses: peak: 4 to 12 µg/mL, trough: < 2 µg/mL. Once-daily dosing: peak: 16 to 24 µg/mL, trough: < 1 µg/mL. Monitoring by peak and trough levels. Peak 30 to 60 minutes after completion of a 1-hour infusion; trough: immediately before the next dose. Plasma monitoring required in: treatment > 5 days, decreased renal function, limited therapeutic response, obesity, increased extracellular volume, patients requiring dose escalation, cystic fibrosis, burns, dialysis patients, signs of ototoxicity and nephrotoxicity, and use of other nephrotoxic agents. See preliminary guide for prevention of medication-related teratogenesis.',
      },
      neonatal: {
        dose: '4–5 mg/kg/dose every 24–36 h according to postmenstrual age (NICU).',
        administration: 'IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature and 48 h refrigerated.\n\n## Pediatric guide\n\n- Discard once opened.',
    adverseEffects: '## Adverse effects\n\nVestibular damage, reversible nephrotoxicity, potentiates neuromuscular blockade by anesthetics.',
    bibliography: [BIB.garrahan('Gentamicin', ' (code 0105, ATC J01GB)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'ami-001', name: 'Amikacin', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Aminoglycoside antibiotic used in the treatment of infections caused by Gram-negative bacteria resistant to gentamicin and infections caused by susceptible mycobacteria.',
    indications: `${MAIN}\n\nAminoglycoside antibiotic used in the treatment of infections caused by Gram-negative bacteria resistant to gentamicin and infections caused by susceptible mycobacteria.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule containing 500 mg in 2 mL solution (Duncan, FABRA, Klonal, Larjan, Richet, Rivero).',
        reconstitution: 'No prior reconstitution required. Conc: 250 mg/mL.',
        diluent: '500 mg in 200 mL 0.9% NaCl.',
        finalConcentration: '2,5 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Administer dose over 30-60 min.',
        notes: 'May undergo color change without loss of activity. Discard dark solutions.',
      },
      pediatrico: {
        presentation: '2 mL ampoule: 250 mg/mL',
        administration: 'IV; IM',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: 'Up to 10 mg/mL.',
        infusionRate: '30 to 60 min with infusion pump.',
        dose: '15 mg/kg/day every 12-24 h, maximum dose: 1500 mg/day. Cystic fibrosis: 30 mg/kg/day every 24 h. Mycobacterium avium: 7,5-15 mg/kg/day every 12-24 h. Mycobacterium tuberculosis infection in HIV-positive patients sensitive to amikacin as second-line antituberculous drug: 15-20 mg/kg/day every 12-24 h, maximum dose: 1000 mg/day. Treatment for nontuberculous mycobacterial infection: 15-30 mg/kg/day divided every 12-24 h as part of a multidrug regimen. Maximum dose: 1,5 g/day. Subsequent dosing per pharmacokinetic parameters. Neonates: see neonatal dosing table (> 1000 g and > 7 days: 10 mg/kg/dose every 12 h; > 2 months: 15 mg/kg/dose every 24 h). See antibiotic dose adjustment table in renal insufficiency. See tuberculosis treatment guide.',
        compatibility: 'MUST NOT BE ADMINISTERED WITH OTHER DRUGS. Beta-lactam antibiotics reduce its effectiveness.',
        notes: 'Administer by slow infusion (more than 30 minutes). Pharmacokinetics: Once-daily dosing: peak: 56 to 64 µg/mL, trough: < 1 µg/mL. Multiple daily doses: peak: 20 to 32 µg/mL, trough: 2 to 8 µg/mL. Monitoring by peak and trough levels. Peak 30 to 60 minutes after completion of a 1-hour infusion; trough: immediately before the next dose. Plasma monitoring required in: treatment > 5 days, decreased renal function, limited therapeutic response, obesity, increased extracellular volume, patients requiring dose escalation, cystic fibrosis, burns, dialysis patients, signs of ototoxicity and nephrotoxicity, and use of other nephrotoxic agents. Interacts with numerous drugs in infusion solution; administer separately. See preliminary guide for prevention of medication-related teratogenesis.',
      },
      neonatal: {
        dose: '15 mg/kg/dose every 24–48 h according to postmenstrual age.',
        administration: 'IV.',
      },
    },
    stability: '## Diluted solution (for administration)\n\n- 24 h at room temperature.\n\n## Pediatric guide\n\n- Store closed ampoule in a dark place. Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nOtotoxicity, nephrotoxicity, neuromuscular blockade.',
    bibliography: [BIB.garrahan('amiKACin', ' (code 0011, ATC J01GB)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'pip-001', name: 'Piperacillin/tazobactam', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of mixed aerobic-anaerobic infections. Does not increase antipseudomonal activity; does increase activity against beta-lactamase–producing organisms.',
    indications: `${MAIN}\n\nTreatment of mixed aerobic-anaerobic infections. Does not increase antipseudomonal activity; does increase activity against beta-lactamase–producing organisms.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lyophilized powder vial containing 4 g piperacillin (PIP) + 0,5 g tazobactam (Bagótaz, Drawer, FADA, Pharmavial, Piperac Compuesto, Norgreen, Northia, Vredian, Petezam, Richet, Tazonam EDTA).',
        reconstitution: '20 mL sterile water for injection. PIP conc: 200 mg/mL.',
        diluent: '4,5 g in 100 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: 'PIP conc: 40 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Gently agitate until dissolved. Dilute in 50-150 mL 0.9% NaCl and administer over 30 min.',
        notes: 'Continuous IV infusion is possible. In that case, dilute 13,5 g (3 vials) in 250 mL 0.9% NaCl to run over 24 h.',
      },
      pediatrico: {
        presentation: '4.5 g vial: (piperacillin: 4 g + tazobactam: 0,5 g)',
        reconstitution: 'Reconstitute with 17 mL for final volume of 20 mL.',
        administration: 'IV',
        diluent: '0.9% NaCl or 5% dextrose, sterile water for injection for reconstitution.',
        finalConcentration: '20 mg/mL. In fluid restriction: 200 mg/mL.',
        infusionRate: '30 minutes with infusion pump.',
        dose: 'Mild, moderate, and empiric infections: Children: 300 mg (piperacillin + tazobactam)/kg/day every 8 h, Adults: 4,5 g (piperacillin + tazobactam) every 8 h. Severe infections (bacteremias, complicated intra-abdominal infections): Children: 300 - 450 mg (piperacillin + tazobactam)/kg/day every 6 h, Adults: 4,5 g (piperacillin + tazobactam) every 6 h. Maximum dose: 18 g/day (piperacillin + tazobactam). Cystic fibrosis: 450 mg (piperacillin + tazobactam)/kg/day every 6 h.',
        notes: 'Administer over 30 minutes. Administer 30-60 minutes apart from aminoglycosides. With vecuronium may prolong neuromuscular blockade.',
      },
      neonatal: {
        dose: 'Dose and interval according to postmenstrual age, weight, and infectious focus (infectious diseases/neonatology prescription).',
        administration: 'IV preferably central.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h at room temperature and 48 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature and 7 days refrigerated.\n\n## Pediatric guide\n\n- 24 h at room temperature, 48 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nInsomnia, headache, confusion, seizures, rash, pruritus, edema, diarrhea, constipation, nausea, vomiting.',
    bibliography: [BIB.garrahan('PIPERACILLIN + tazobactam', ' (code 1361, ATC J01CR)'), BIB.sadiUcip, BIB.pedGuide, { citation: 'Sanford Guide to Antimicrobial Therapy — Piperacillin-tazobactam.', url: 'https://www.sanfordguide.com/' }, { citation: 'ANMAT. Drug information — Piperacillin and tazobactam.', url: 'https://www.argentina.gob.ar/anmat' }, { citation: 'Argentine Society of Infectious Diseases (SADI). Antimicrobial management guidelines.', url: 'https://www.sadi.org.ar/' }],
  },
  {
    id: 'roc-001', name: 'Rocuronium', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Rapid induction for polytrauma patients without prior fasting.',
    indications: `${MAIN}\n\nRapid induction for polytrauma patients without prior fasting.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '10 mg/mL vial.',
        dose: 'RSI: 0,6–1,2 mg/kg IV. Maintenance: 0,1–0,2 mg/kg/h.',
        administration: 'IV bolus or infusion.',
      },
      pediatrico: {
        presentation: '5 mL ampoules: 10 mg/mL',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '0,5 to 1 mg/mL. May be administered undiluted.',
        infusionRate: 'Push or infusion with infusion pump.',
        dose: '0,45 - 0,6 mg/kg/dose',
        compatibility: 'Incompatible with thiopental, amphotericin, amoxicillin, dexamethasone, diazepam, furosemide, insulin, methylprednisolone, vancomycin.',
        notes: 'SPECIALIST USE ONLY. May be administered undiluted. For continuous infusion dilute with normal saline or 5% dextrose at a concentration of 0,5 to 1 mg/mL; do not mix with alkaline solutions.',
      },
      neonatal: {
        dose: '0,45–1 mg/kg per NICU protocol.',
        administration: 'IV.',
      },
    },
    stability: '## General\n\n- Opened vial per package insert.\n\n## Pediatric guide\n\n- 30 days refrigerated once opened.',
    adverseEffects: '## Adverse effects\n\nApnea, vagolytic effects, transient hypotension, hypertension, dose-related tachycardia-apnea, arrhythmias, injection-site edema, hiccups, pruritus, nausea, wheezing, residual muscle weakness.',
    bibliography: [BIB.garrahan('Rocuronium*', ' (code 9151, ATC M03AC)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'sug-001', name: 'Sugammadex', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Indicated for reversal of neuromuscular blockade induced by rocuronium.',
    indications: `${MAIN}\n\nIndicated for reversal of neuromuscular blockade induced by rocuronium.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '100–200 mg/mL vial.',
        dose: '2 mg/kg moderate; 4 mg/kg deep; 16 mg/kg immediate RSI.',
        administration: 'IV bolus.',
      },
      pediatrico: {
        dose: 'Adults: routine reversal: a dose of 4 mg/kg is recommended',
        administration: 'IV',
        presentation: '2 mL ampoules: 100 mg/mL',
        notes: 'Use caution in patients receiving anticoagulant therapy. Not recommended in patients with severe renal insufficiency.',
      },
      neonatal: {
        dose: 'Limited data; use under pediatric anesthesiology.',
        administration: 'IV.',
      },
    },
    stability: '## Stability\n\n- Use immediately after withdrawal.',
    adverseEffects: '## Adverse effects\n\nHypersensitivity reactions: flushing, urticaria, erythematous rash, hypotension (severe), tachycardia, and swelling of tongue and pharynx.',
    bibliography: [BIB.garrahan('Sugammadex Sodium', ' (code 1969, ATC V03AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nal-001', name: 'Naloxone', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antagonist of opioids and derivatives.',
    indications: `${MAIN}\n\nAntagonist of opioids and derivatives.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '0,4 mg/mL ampoule.',
        dose: '0,04–0,4 mg IV every 2–3 min until response (per protocol maximum).',
        administration: 'IV/IM/intranasal per protocol.',
      },
      pediatrico: {
        presentation: 'Ampoules: 0,4 mg/mL',
        administration: 'IV; IM; SL',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: 'Undiluted.',
        infusionRate: 'Bolus, 30 sec.',
        dose: 'Partial reversal: Newborns: 0,01 mg/kg (maximum dose: 0,1 mg) every 2-3 minutes until response; older children: 0,01 mg/kg (maximum dose: 0,2 mg), Adults: 0,4-2 mg every 2-3 minutes if needed. Continuous infusion: 2,5-160 µg/kg/hour. Complete reversal: 0,1 mg/kg; if no response may repeat every 2-3 min if IV or every 10 min if IM, maximum dose: 2 mg Toxicology: IV 0,01 mg/kg, maximum dose: 0,1 mg/kg; continuous infusion: 0,4 mg/hour.',
        notes: 'Must be used by physicians trained in its use. Does not cause respiratory depression, drug dependence, or withdrawal syndrome.',
      },
      neonatal: {
        dose: '0,1 mg/kg IV/IO if depression due to maternal opioids.',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- Ready to use.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nIn overdose: nausea and vomiting (rarely).',
    bibliography: [BIB.garrahan('Naloxone', ' (code 0976, ATC V03AB)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ond-001', name: 'Ondansetron', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Refractory emesis. Chemotherapy-induced emesis (indication per current regulations). Postoperative nausea and vomiting.',
    indications: `${MAIN}\n\nRefractory emesis. Chemotherapy-induced emesis (indication per current regulations). Postoperative nausea and vomiting.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '4–8 mg ampoule; ODT tablets.',
        dose: '4–8 mg slow IV or PO every 8 h.',
        administration: 'Slow IV or PO.',
      },
      pediatrico: {
        presentation: 'Tablets: 8 mg; Ampoules: 8 mg',
        administration: 'PO; IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolus over 2 to 5 minutes.',
        dose: 'Chemotherapy-induced nausea and vomiting prophylaxis: Infants, children, and adolescents IV / PO: 0,15 mg/kg/dose (5 mg/m²/dose); maximum dose 8 mg/dose every 8 h. Administer first dose 30 minutes before starting cytotoxic infusion. Postoperative nausea and vomiting prophylaxis: IV: 1 month to 12 years and < 40 kg: 0,1 mg/kg/dose, > 40 kg and adults: 4 mg/dose. Adjust dose in hepatic insufficiency (single daily dose). Acute gastroenteritis: > 6 months 8 kg to 15 kg: 2 mg; 15 kg to 30 kg: 4 mg; > 30 kg: 8 mg. Dose may be repeated only if vomiting occurs within the first 15 minutes after administration.',
        compatibility: 'Incompatible with acyclovir, ampicillin, aminophylline, furosemide, ganciclovir, lorazepam, methylprednisolone, and piperacillin.',
        notes: 'Protect from light; do not administer in the same syringe or infusion with another medication. Administer as push over 2-5 min or by infusion diluted in 5% dextrose or 0.9% NaCl over 15 minutes. Metabolized by cytochrome P-450. Verify normal ECG before treatment due to QT interval prolongation at high doses and avoid concomitant use with cardiotoxic drugs.',
      },
      neonatal: {
        dose: '0,1 mg/kg IV every 8 h per protocol.',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- IV compatible in NaCl and dextrose.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nHeadache, constipation, fatigue, immediate hypersensitivity reactions (urticaria, angioedema, hypotension, bronchospasm, dyspnea, anaphylaxis), QTc interval prolongation, dizziness, fever.',
    bibliography: [BIB.garrahan('Ondansetron', ' (code 0502, ATC A04AA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'los-001', name: 'Losartan', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hypertension. Angiotensin II antagonist.',
    indications: `${MAIN}\n\nHypertension. Angiotensin II antagonist.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '50 and 100 mg tablets.',
        dose: '50–100 mg/day PO in 1–2 doses. May be combined with a diuretic.',
        administration: 'PO with or without food.',
      },
      pediatrico: {
        dose: 'Hypertension: > 6 years: 0.75 mg/kg once daily, maximum dose: 50 mg/day. Adults: initial: 50 mg/day once daily; maintenance: 25 to 100 mg every 12 - 24 h. In hepatic insufficiency start with 25 mg once daily.',
        administration: 'PO',
        presentation: 'Tablets: 50 mg; Suspension (compounded): 2,5 mg/mL',
        notes: 'Avoid concomitant use of other renin-angiotensin system inhibitors.',
      },
    },
    stability: '## Stability\n\n- Store per package insert at room temperature.',
    adverseEffects: '## Adverse effects\n\nHypotension, diarrhea, asthenia, dizziness, fatigue. Thrombocytopenia, rhabdomyolysis, angioedema.',
    bibliography: [BIB.garrahan('loSARTAN potassium', ' (code 1429, ATC C09CA)'), BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'war-001', name: 'Warfarin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Vitamin K antagonist. Anticoagulant.',
    indications: `${MAIN}\n\nVitamin K antagonist. Anticoagulant.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '5 mg tablets (and other strengths).',
        dose: 'Initial dose 5 mg/day PO; adjust per target INR.',
        administration: 'PO at the same time daily.',
      },
      pediatrico: {
        dose: 'Per specialist indication (according to expected INR). Administer once daily.',
        administration: 'PO',
        presentation: 'Tablets: 1 - 2 mg; Suspension (compounded): 1 mg/mL',
        notes: 'Use with caution in patients with trauma, acute infection, moderate to severe renal failure, and moderate to mild hypertension. Contraindicated in patients with bleeding tendency (gastric ulcers, cerebral aneurysms, central nervous system, major surgery, regional lumbar block). Monitor response in patients with hepatic insufficiency; may be markedly increased in obstructive jaundice due to reduced vitamin K absorption and in patients with cirrhosis and/or hepatitis.',
      },
      neonatal: {
        dose: 'Very restricted use; neonatal cardiology regimens.',
        administration: 'PO.',
      },
    },
    stability: '## Stability\n\n- Tablets in original container.',
    adverseEffects: '## Adverse effects\n\nHemorrhage in various organs, bleeding, heel cyanosis, vasculitis, dizziness, fatigue, fever, headache, paresthesias, dermatitis, skin or other tissue gangrene, skin necrosis, abdominal pain, hematuria, cholestasis.',
    bibliography: [BIB.garrahan('Warfarin*', ' (code 1715, ATC B01AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nEN Garrahan batch 2 (part A): ${drugs.length} monographs`);
