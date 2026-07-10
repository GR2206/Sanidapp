#!/usr/bin/env node
/** Garrahan re-translation batch 4/8 — 10 EN monographs (part A) */
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
    id: 'cef-008', name: 'Cefepime', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Fourth-generation cephalosporin. Effective against gram-negative bacilli (including non-fermenters: P. aeruginosa), gram-positive cocci (S. pneumoniae, methicillin-resistant S. aureus), and gram-negative cocci (N. meningitidis).',
    indications: `${MAIN}\n\nFourth-generation cephalosporin. Effective against gram-negative bacilli (including non-fermenters: P. aeruginosa), gram-positive cocci (S. pneumoniae, methicillin-resistant S. aureus), and gram-negative cocci (N. meningitidis).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial 1 g or 2 g.',
        dose: '1–2 g IV every 8–12 h.',
        infusionRate: 'Infusion over 30 min.',
        administration: 'IV.',
      },
      pediatrico: {
        dose: 'Mild and moderate infections: 50 mg/kg/dose every 12 h; severe infections (endocarditis, febrile neutropenia) 50 mg/kg/dose every 8 h, cystic fibrosis: 50 mg/kg/dose every 6 h, maximum pediatric dose: 2 g/dose. Adults: 2 g every 8–12 h.',
        administration: 'IV; IM.',
        presentation: 'Powder vial: 1–2 g',
        notes: 'IV: Infuse over 20–30 minutes.',
      },
      neonatal: {
        dose: '30 mg/kg/dose every 12 h (NICU protocol).',
        administration: 'IV.',
      },
    },
    stability: '## Stability\n\n- 24 h refrigerated after dilution.',
    adverseEffects: '## Adverse effects\n\nDiarrhea, nausea, vomiting, headache, rash (2%).',
    bibliography: [BIB.garrahan('CefEPIME*', ' (code 1502, ATC J01DE)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cef-009', name: 'Cefalothin', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'First-generation cephalosporin. Surgical prophylaxis, treatment of respiratory tract, middle ear, skin and soft tissue infections caused by susceptible bacteria: gram-positive cocci.',
    indications: `${MAIN}\n\nFirst-generation cephalosporin. Surgical prophylaxis, treatment of respiratory tract, middle ear, skin and soft tissue infections caused by susceptible bacteria: gram-positive cocci.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial containing 1 g (Arecemin, Cefalotina Larjan, Drawer, Dosagluc, Cefade, Richet).',
        reconstitution: '5 mL SWFI. Conc: 200 mg/mL.',
        diluent: '1–2 g in 100 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: '10–20 mg/mL.',
        administration: 'Direct IV: Yes. Reconstitute with 10 mL SWFI, 0.9% NaCl or 5% dextrose and administer over 3–5 min. Intermittent IV: Yes. Dilute 1 g in 100 mL 0.9% NaCl or 5% dextrose and administer over 30–60 min.',
        notes: 'If vial contents do not dissolve completely, add SWFI (0,2–0,5 mL) and shake vigorously. Darkening of the solution at room temperature does not affect efficacy. IM administration is possible.',
      },
      pediatrico: {
        presentation: 'Powder vial: 1000 mg',
        administration: 'IV',
        diluent: '0.9% NaCl or 5% dextrose.',
        finalConcentration: '100 mg/mL.',
        infusionRate: '3 to 5 min.',
        dose: '100 mg/kg/day every 6–8 h. Adults: 500–2000 mg every 6 h. Preoperative dose in adults: 1–2 g. Maximum dose: 12 g.',
        notes: 'Concomitant use with aminoglycosides may increase risk of nephrotoxicity.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 12 h at room temperature, 96 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature.\n\n## Pediatric guide\n\n- 96 h refrigerated; 12 h at room temperature.',
    adverseEffects: '## Adverse effects\n\nAllergic reactions, thrombophlebitis, thrombocytopenia, leukopenia, nephrotoxicity.',
    bibliography: [BIB.garrahan('cefALOTina sódica', ' (code 0035, ATC J01DB)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-010', name: 'Ceftaroline', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'For persistent MRSA bacteremia with respiratory focus/ARDS. Complicated skin and soft tissue infections and community-acquired pneumonia. Specialist-only indication.',
    indications: `${MAIN}\n\nFor persistent MRSA bacteremia with respiratory focus/ARDS.\nComplicated skin and soft tissue infections and community-acquired pneumonia.\nSpecialist-only indication.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial containing 600 mg (Zinforo).',
        reconstitution: '20 mL SWFI. Conc: 30 mg/mL.',
        diluent: '600 mg in 250 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: '2,4 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Reconstitute 600 mg with 250 mL SWFI, 0.9% NaCl or 5% dextrose and administer over 60 min.',
      },
      pediatrico: {
        dose: 'Complicated skin and soft tissue infections and community-acquired pneumonia: Neonates up to 2 months: 6 mg/kg/dose every 8 h, > 2 months to < 2 years: 8 mg/kg/dose every 8 h, > 2 years to < 12 years: 12 mg/kg/dose (maximum 400 mg) every 8 h, adolescents 12 to < 18 years weighing < 33 kg: 12 mg/kg/dose (maximum 400 mg) every 8 h, adolescents 12 to < 18 years weighing > 33 kg: 600 mg/dose every 12 h, adults: 600 mg/dose every 12 h. Renal insufficiency: adults and adolescents > 12 to 18 years and weight > 33 kg: Clcr 30–50 mL/min: 400 mg/dose every 12 h; Clcr 15–30 mL/min: 300 mg/dose every 12 h; renal disease (including hemodialysis): 200 mg every 12 h. 12–18 years and weight < 33 kg and children 2–12 years: Clcr 30–50 mL/min: 8 mg/kg/dose every 8 h (maximum: 300 mg every 8 h); Clcr 15–30 mL/min: 6 mg/kg/dose every 8 h (maximum 200 mg every 12 h).',
        administration: 'IV',
        presentation: 'Powder vial: 600 mg',
        notes: 'Administer by IV infusion over 120 min.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Dilute and use immediately.\n\n## Diluted solution (for administration)\n\n- 6 h at room temperature and 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nRash, pruritus, headache, dizziness, phlebitis, nausea, vomiting, abdominal pain, elevated transaminases, pyrexia, infusion-site reactions (erythema, phlebitis, pain), positive Coombs test.',
    bibliography: [BIB.garrahan('CeftaROLINA Fosamil*', ' (code 2037, ATC J01DI)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-011', name: 'Ceftazidime-avibactam', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Restricted to cases with multidrug-resistant microorganisms, carbapenemase producers with high risk of horizontal dissemination in the critical care area and associated high morbidity and mortality.',
    indications: `${MAIN}\n\nRestricted to cases with multidrug-resistant microorganisms, carbapenemase producers with high risk of horizontal dissemination in the critical care area and associated high morbidity and mortality.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial containing 2 g ceftazidime + 0,5 g avibactam (Zavicefta).',
        reconstitution: '10 mL SWFI. Conc: 200 mg/mL ceftazidime and 50 mg/mL avibactam.',
        diluent: '2,5 g in 100 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: 'Ceftazidime conc: 20 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 100 mL 0.9% NaCl or 5% dextrose and administer over 120 min.',
        notes: 'Once the infusion is prepared, do not delay more than half an hour before starting it (time between reconstitution and completion of intravenous preparation must not exceed 30 minutes).',
      },
      pediatrico: {
        dose: '3 to 6 months: 50 mg (ceftazidime + avibactam)/kg/dose every 8 h; > 6 months to 2 years: 62,5 mg (ceftazidime + avibactam)/kg/dose every 8 h; > 2 years to 18 years: 62,5 mg (ceftazidime + avibactam)/kg/dose every 8 h; maximum 2.500 mg (ceftazidime + avibactam) every 8 h',
        administration: 'IV',
        presentation: 'Lyophilized powder vial: 2.500 mg (ceftazidime 2.000 mg + avibactam 500 mg)',
        notes: 'Not recommended with: probenecid; high doses of cephalosporins and nephrotoxic drugs such as aminoglycosides or potent diuretics (e.g., furosemide). Dosing on hemodialysis (HD) days should be performed after HD is completed. Administer over at least 2 h. Each vial contains 148 mg sodium.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Dilute and use immediately.\n\n## Diluted solution (for administration)\n\n- 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nCandidiasis (including vulvovaginal and oral candidiasis); direct Coombs test positive, eosinophilia, thrombocytosis, thrombocytopenia; headache, dizziness; diarrhea, abdominal pain, nausea, vomiting; elevation of ALT, AST, blood alkaline phosphatase, GGT and blood LDH; maculopapular rash, urticaria, pruritus; thrombosis and phlebitis at infusion site, fever.',
    bibliography: [BIB.garrahan('cefTAZidima + AVIBACTAM*', ' (code 2042, ATC J01DD)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-012', name: 'Ceftolozane-tazobactam', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Complicated intra-abdominal infections, acute pyelonephritis, complicated urinary tract infections and hospital-acquired pneumonia (HAP), including ventilator-associated pneumonia.',
    indications: `${MAIN}\n\nComplicated intra-abdominal infections, acute pyelonephritis, complicated urinary tract infections and hospital-acquired pneumonia (HAP), including ventilator-associated pneumonia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Powder vial containing 1 g ceftolozane + 0,5 g tazobactam (Zerbaxa).',
        reconstitution: '10 mL SWFI or 0.9% NaCl. Conc: 100 mg/mL ceftolozane and 50 mg/mL tazobactam.',
        diluent: '1,5 g in 100 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: 'Conc: 10 mg/mL ceftolozane and 5 mg/mL tazobactam.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 100 mL 0.9% NaCl or 5% dextrose and administer over 60 min.',
      },
      pediatrico: {
        dose: 'Children: 30 mg/kg/dose (ceftolozane + tazobactam) every 8 h; maximum 1500 mg every 8 h. Severe infections: 45 mg/kg/dose every 8 h. Adults: 1500 mg every 8 h; ventilator-associated pneumonia: 3000 mg every 8 h.',
        administration: 'IV',
        presentation: 'Powder vial: 1.500 mg (1.000 mg ceftolozane + 500 mg sodium tazobactam)',
        notes: 'IV infusion (infusion time: 1 h for all doses). Monitor patients with renal insufficiency at initiation for any change in renal function during treatment and adjust dose if necessary. Each vial contains 230 mg sodium.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 1 h at room temperature.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature or 7 days refrigerated.',
    adverseEffects: '## Adverse effects\n\nClostridioides difficile colitis, thrombocytosis, hypokalemia, insomnia, anxiety, headache, dizziness, hypotension, nausea, diarrhea, constipation, vomiting, abdominal pain, rash, pyrexia, infusion-site reactions, elevated ALT and AST, elevated transaminases, abnormal liver function test, increased blood alkaline phosphatase, elevated GGT.',
    bibliography: [BIB.garrahan('cefTOLOZANO + tazobactam sódico*', ' (code 2041, ATC J01CG)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'amo-001', name: 'Amoxicillin', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Beta-lactam antibiotic used in the treatment of lower respiratory tract infections, otitis media, sinusitis, skin and soft tissues. Urinary tract infections caused by beta-lactamase–producing microorganisms.',
    indications: `${MAIN}\n\nBeta-lactam antibiotic used in the treatment of lower respiratory tract infections, otitis media, sinusitis, skin and soft tissues. Urinary tract infections caused by beta-lactamase–producing microorganisms.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Capsules 500 mg, 875 mg; suspension; IV ampoule if available.',
        dose: 'PO: 500 mg–1 g every 8 h. IV per hospital protocol.',
        administration: 'PO with or without food; IV infusion.',
      },
      pediatrico: {
        dose: '20–40 mg/kg/day of amoxicillin every 8 h. Otitis media in high-risk patients, recurrent or persistent acute otitis due to S. pneumoniae, H. influenzae, M. catarrhalis: 80–90 mg/kg/day of amoxicillin; maximum dose: 1500 mg/day of amoxicillin, severe infections up to 3 g amoxicillin/day. Adults: 250 mg amoxicillin every 8 h. More severe and respiratory tract infections: 500 mg every 8 h. Prokinetic in intestinal pseudo-obstruction: 20 mg/kg/day every 12 h, maximum dose: 1500 mg/day.',
        administration: 'PO',
        presentation: 'Tablets: amoxicillin 500 mg + clavulanic acid 125 mg; Suspension: amoxicillin 50 mg/mL + clavulanic acid 12,5 mg/mL. Duo presentation: Tablets: amoxicillin 875 mg + clavulanic acid 125 mg; Reconstituted extemporaneous suspension: amoxicillin 80 mg/mL + clavulanic acid 11.4 mg/mL',
        notes: 'Duo presentation should be administered every 12 h; amoxicillin as trihydrate and clavulanic acid as potassium salt.',
      },
      neonatal: {
        dose: '25–30 mg/kg/dose PO every 12 h or IV per NICU protocol.',
        administration: 'PO or IV according to tolerance and severity.',
      },
    },
    stability: '## Stability\n\n- Reconstituted suspension: refrigerate per package insert (usually 7–14 days).',
    adverseEffects: '## Adverse effects\n\nGastrointestinal disturbances, diarrhea, elevation of transaminases and bilirubin, interstitial nephritis, hypersensitivity reactions. Rare: leukopenia, neutropenia, eosinophilia.',
    bibliography: [BIB.garrahan('amoxicilina + Ácido CLAVULÁNICO', ' (code 1068, ATC J01CR)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'amo-002', name: 'Amoxicillin/clavulanic acid', version: '1.0.3', updatedAt: '2026-07-10',
    executiveSummary: 'Beta-lactam antibiotic used in the treatment of lower respiratory tract infections, otitis media, sinusitis, skin and soft tissues. Urinary tract infections caused by beta-lactamase–producing microorganisms.',
    indications: `${MAIN}\n\nBeta-lactam antibiotic used in the treatment of lower respiratory tract infections, otitis media, sinusitis, skin and soft tissues. Urinary tract infections caused by beta-lactamase–producing microorganisms.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 500/125 mg, 875/125 mg; suspension; IV 1,2 g or 2,2 g.',
        dose: 'PO: 875/125 mg every 12 h. IV: 1,2 g every 8 h or per protocol.',
        administration: 'PO or IV.',
      },
      pediatrico: {
        dose: '20–40 mg/kg/day of amoxicillin every 8 h. Otitis media in high-risk patients, recurrent or persistent acute otitis due to S. pneumoniae, H. influenzae, M. catarrhalis: 80–90 mg/kg/day of amoxicillin; maximum dose: 1500 mg/day of amoxicillin, severe infections up to 3 g amoxicillin/day. Adults: 250 mg amoxicillin every 8 h. More severe and respiratory tract infections: 500 mg every 8 h. Prokinetic in intestinal pseudo-obstruction: 20 mg/kg/day every 12 h, maximum dose: 1500 mg/day.',
        administration: 'PO',
        presentation: 'Tablets: amoxicillin 500 mg + clavulanic acid 125 mg; Suspension: amoxicillin 50 mg/mL + clavulanic acid 12,5 mg/mL. Duo presentation: Tablets: amoxicillin 875 mg + clavulanic acid 125 mg; Reconstituted extemporaneous suspension: amoxicillin 80 mg/mL + clavulanic acid 11.4 mg/mL',
        notes: 'Duo presentation should be administered every 12 h; amoxicillin as trihydrate and clavulanic acid as potassium salt.',
      },
      neonatal: {
        dose: 'Dose per NICU protocol; restricted use.',
        administration: 'PO or IV per indication.',
      },
    },
    stability: '## Stability\n\n- Refrigerated suspension per package insert. Diluted IV: use within shift.',
    adverseEffects: '## Adverse effects\n\nGastrointestinal disturbances, diarrhea, elevation of transaminases and bilirubin, interstitial nephritis, hypersensitivity reactions. Rare: leukopenia, neutropenia, eosinophilia.',
    bibliography: [BIB.garrahan('amoxicilina + Ácido CLAVULÁNICO', ' (code 1068, ATC J01CR)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'azi-001', name: 'Azithromycin', version: '1.0.5', updatedAt: '2026-07-10',
    executiveSummary: 'Macrolide. Disseminated Mycobacterium avium intracellulare group infection, chronic Pseudomonas aeruginosa infections in cystic fibrosis patients. STI prophylaxis (Chlamydia trachomatis).',
    indications: `${MAIN}\n\nMacrolide. Disseminated Mycobacterium avium intracellulare group infection, chronic Pseudomonas aeruginosa infections in cystic fibrosis patients. STI prophylaxis (Chlamydia trachomatis).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Tablets 500 mg; suspension; IV vial 500 mg.',
        dose: '500 mg PO day 1, then 250 mg/day x 4 days; or 500 mg IV every 24 h.',
        administration: 'PO or IV.',
      },
      pediatrico: {
        dose: '< 6 months: 10 mg/kg/day every 24 h for 5 days; > 6 months day 1: 10 mg/kg/day (maximum: 500 mg), then 5 mg/kg/day (maximum: 250 mg), to complete 5 days; Adolescents and adults: day 1: 500 mg, then 250 mg to complete 5 days. Pharyngitis: 12 mg/kg/day for 5 days. Atypical mycobacteria prophylaxis: 20–30 mg/kg weekly, maximum dose: 1200 mg/week. STI prophylaxis: Children: PO: 20 mg/kg/dose, single dose; Adolescents: PO: 1 g/dose, single dose.',
        administration: 'PO',
        presentation: 'Tablets: 500 mg; Oral suspension powder: 40 mg/mL',
        notes: 'Do not administer with food or antacids. Interactions: carbamazepine and digoxin.',
      },
      neonatal: {
        dose: 'Restricted use per NICU protocol (e.g., Chagas).',
        administration: 'PO.',
      },
    },
    stability: '## Stability\n\n- Reconstituted IV per package insert.',
    adverseEffects: '## Adverse effects\n\nPseudomembranous colitis, allergies, gastrointestinal symptoms, headaches, dizziness, vertigo, somnolence. Rare: elevated transaminases.',
    bibliography: [BIB.garrahan('azITROMICina', ' (code 0934, ATC J01FA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cla-001', name: 'Clarithromycin', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Macrolide. Treatment of upper and lower respiratory tract infections, acute otitis media due to Mycoplasma and Chlamydia. Prophylaxis and treatment of Mycobacterium avium infections.',
    indications: `${MAIN}\n\nMacrolide. Treatment of upper and lower respiratory tract infections, acute otitis media due to Mycoplasma and Chlamydia. Prophylaxis and treatment of Mycobacterium avium infections.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Lyophilized powder vial containing 500 mg (Claritromicina Northia, Pharmavial, Richet, Kiaricid).',
        reconstitution: '10 mL SWFI. Conc: 50 mg/mL.',
        diluent: '500 mg in 250 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: '2 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Reconstitute 500 mg with 10 mL SWFI, dilute in 250 mL 0.9% NaCl, 5% dextrose and administer over 60 min.',
        notes: 'Use only SWFI for reconstitution, as other diluents may cause precipitation. Do not use 0.9% NaCl. Irritant (may cause phlebitis).',
      },
      pediatrico: {
        dose: 'Children: 15 mg/kg/day every 12 h, adolescents and adults (PO): 500 mg every 12 h. Antituberculous: 30 mg/kg/day every 12 h, maximum dose: 1 g/day.',
        administration: 'PO; IV',
        presentation: 'Tablets: 250 mg; Suspension: 25 mg/mL; Powder vial: 500 mg',
        notes: 'Contraindicated in combination with terfenadine in patients with cardiac disease. Interactions: carbamazepine, cisapride, rifabutin. Do not refrigerate reconstituted suspension.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h at room temperature and 48 h refrigerated.\n\n## Diluted solution (for administration)\n\n- 6 h at room temperature and 48 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nDiarrhea, nausea, abnormal taste, dyspepsia, abdominal pain, headaches, hypersensitivity. See alert.',
    bibliography: [BIB.garrahan('Claritromicina', ' (code 0451, ATC J01FA)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cli-001', name: 'Clindamycin', version: '1.2.2', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of infections caused by susceptible bacteria (anaerobes, staphylococci, streptococci, pneumococci) of the skin, subcutaneous cellular tissue, abdomen, and lower respiratory tract.',
    indications: `${MAIN}\n\nTreatment of infections caused by susceptible bacteria (anaerobes, staphylococci, streptococci, pneumococci) of the skin, subcutaneous cellular tissue, abdomen, and lower respiratory tract.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule containing 600 mg in 4 mL solution (Clindamicina Drawer, Fabra, Duncan, Clindanovag, Larjan, Ramallo, Northia, FADA, Clindalaf, Klonal).',
        reconstitution: 'No prior reconstitution required. Conc: 150 mg/mL.',
        diluent: '600 mg in 50–100 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: '6–12 mg/mL (max conc 18 mg/mL).',
        administration: 'Direct IV: No. Intermittent IV: Yes. Dilute in 50 mL 0.9% NaCl or 5% dextrose and administer over 20 min.',
        notes: 'Refrigeration may cause crystal formation that redissolves at room temperature. Rapid administration may cause hypotension (infusing more than 1200 mg in 1 h is not recommended).',
      },
      pediatrico: {
        presentation: 'Capsules: 300 mg; 4 mL ampoules: 150 mg/mL; Solution (compounded): 100 mg/mL',
        administration: 'PO; IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '12 mg/mL.',
        infusionRate: '30 mg/minute.',
        dose: 'Newborns: according to age and weight; > 1 month and children: 30 mg/kg/day every 6–8 h, maximum dose: IV: 4,8 g/day; PO: 1,8 g/day. Adolescents and adults: IV: 1,2 to 2,7 g/day in 2 to 4 divided doses, maximum dose: 4,8 g/day; PO: 150 to 450 mg/dose every 6–8 h, maximum dose: 1,8 g/day.',
        compatibility: 'Incompatible with ampicillin sodium, phenytoin sodium, barbiturates, aminophylline, calcium gluconate and magnesium sulfate.',
        notes: 'Interactions: beta-blockers, erythromycin.',
      },
      neonatal: {
        dose: '5–7,5 mg/kg/dose every 6–8 h.',
        administration: 'IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (for administration)\n\n- 24 h at room temperature and/or refrigerated.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nDiarrhea, pseudomembranous colitis, vomiting, hypersensitivity reactions, eosinophilia, leukopenia, agranulocytosis, hepatotoxicity.',
    bibliography: [BIB.garrahan('Clindamicina', ' (code 0051, ATC J01FF)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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

console.log(`\nEN Garrahan batch 4 (part A): ${drugs.length} monographs`);
