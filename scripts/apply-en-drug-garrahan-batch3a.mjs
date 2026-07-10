#!/usr/bin/env node
/** Garrahan re-translation batch 3/8 — 10 EN monographs (part A) */
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
    id: 'atr-001', name: 'Atropine', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Bradycardia. To reduce upper airway secretions and salivation. Ophthalmology: mydriatic and cycloplegic.',
    indications: `${MAIN}\n\nBradycardia. To reduce upper airway secretions and salivation. Ophthalmology: mydriatic and cycloplegic.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 1 mg/mL.',
        dose: 'Bradycardia: 1 mg IV every 3–5 min (max. 3 mg).',
        administration: 'Rapid IV bolus.',
      },
      pediatrico: {
        presentation: 'Ampoules: 1 mg/ml (1000 µg/ml); Drops: 1%',
        administration: 'IV; IM; SC; Intratracheal',
        diluent: '0.9% NaCl or 5% dextrose.',
        finalConcentration: '0,1 mg/mL.',
        infusionRate: 'CARDIAC ARREST undiluted (push).',
        dose: '20 µg/kg/dose (minimum dose: 100 µg); may be repeated at 5-minute intervals up to a total maximum dose: children: 1 mg; adolescents: 2 mg Toxicology: IV 20 µg/kg',
        notes: 'Do not administer IM in neonates. Administer undiluted by IV route. Contraindicated in urinary tract obstruction and glaucoma. For intratracheal administration, dilute with normal saline in a total volume of 1-2 ml.',
      },
      neonatal: {
        dose: '0,02 mg/kg IV (NRP/PALS neonatal protocol).',
        administration: 'IV/IO.',
      },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nMydriasis, dry mouth, cycloplegia, photophobia, bradycardia followed by tachycardia, palpitations, arrhythmias, urinary retention, confusion, hallucinations.',
    bibliography: [BIB.garrahan('ATROPine Sulfate', ' (code 0023, ATC A03BA)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'atr-002', name: 'Atracurium', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Peripheral-acting muscle relaxant (neuromuscular blocker). Indicated in severe hepatic and renal insufficiency.',
    indications: `${MAIN}\n\nPeripheral-acting muscle relaxant (neuromuscular blocker). Indicated in severe hepatic and renal insufficiency.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 10 mg/mL.',
        dose: '0,4–0,5 mg/kg bolus; 5–10 mcg/kg/min.',
        administration: 'IV.',
      },
      pediatrico: {
        dose: '0,5 mg/kg. Continuous infusion: 0,3 mg/kg/hour',
        administration: 'IV',
        presentation: '5 mL ampoules: 10 mg/ml',
        notes: 'For specialist use only.',
      },
      neonatal: {
        dose: '0,5 mg/kg bolus per protocol.',
        administration: 'IV.',
      },
    },
    stability: '## Stability\n\n- Use within 24 h.',
    adverseEffects: '## Adverse effects\n\nHistamine releaser.',
    bibliography: [BIB.garrahan('Atracurium Besylate*', ' (code 0022, ATC M03AC)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dex-001', name: 'Dexmedetomidine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Short-duration sedation (24 h) in intubated or non-intubated patients.',
    indications: `${MAIN}\n\nShort-duration sedation (24 h) in intubated or non-intubated patients.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 100 mcg/mL.',
        dose: 'Loading dose 1 mcg/kg over 10 min (optional), then 0,2–1,5 mcg/kg/h.',
        administration: 'IV infusion pump.',
      },
      pediatrico: {
        dose: '> 18 years: Continuous infusion: 0,2 to 2,5 µg/kg/h for 24 h. Dose reduction should be considered in hepatic insufficiency.',
        administration: 'IV',
        presentation: '2 mL ampoule: 100 µg/ml',
        notes: 'See guide for intravenous drug administration. See practical guide for analgosedation management and weaning in intermediate and moderate care units.',
      },
    },
    stability: '## Stability\n\n- Dilution stable 24 h; do not use ampoules containing particles.',
    adverseEffects: '## Adverse effects\n\nHypotension, bradycardia, apnea, respiratory depression, bronchospasm, nausea, vomiting, xerostomia, cardiac arrhythmia.',
    bibliography: [BIB.garrahan('dexMEDETOmidine*', ' (code 1762, ATC N05CM)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mor-001', name: 'Morphine', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Acute and chronic pain, moderate or severe. Symptomatic treatment of dyspnea. Dyspnea and cyanosis crises. Strong opioid.',
    indications: `${MAIN}\n\nAcute and chronic pain, moderate or severe. Symptomatic treatment of dyspnea. Dyspnea and cyanosis crises. Strong opioid.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 10 mg/mL.',
        dose: '2–5 mg IV every 5–15 min PRN; PCA or infusion per prescription.',
        administration: 'Slow IV.',
      },
      pediatrico: {
        presentation: 'Ampoules: 10 mg/ml; Syrup (compounded): 0,1% (1 mg/ml), 0,3% (3 mg/ml), 1% (10 mg/ml) See formulation',
        administration: 'PO; IV',
        diluent: '0.9% NaCl, 5% dextrose, Ringer solution.',
        finalConcentration: '5 mg/mL.',
        infusionRate: 'Bolus over 5 min. 15 to 30 min with infusion pump.',
        dose: 'PO: Initial dose 0,1 mg/kg every 4 h; IV; SC; IM: < 50 kg: 0,05 mg/kg every 4 h; Continuous infusion: 0,05 mg/kg/hour; >50 kg: Initial dose PO: 10 mg every 4 h (no ceiling dose); IV: 5 mg every 4 h, Continuous infusion: 2 mg/hour. Increase dose by 50% each time until effective dose is reached.',
        notes: 'Association with an NSAID is recommended. Remember that neuropathic pain responds only partially to opioids (add adjuvants). Analgesic equivalence: 1 mg morphine IV = 2 mg morphine PO; 1 mg morphine IV = 10 µg fentanyl. See practical guide for analgosedation management and weaning in intermediate and moderate care units. For the 1% (10 mg/ml) presentation, the prescription must be endorsed on the reverse.',
      },
      neonatal: {
        dose: '0,01–0,05 mg/kg/dose according to NICU pain scale.',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- Use dilution within the shift.\n\n## Pediatric guide\n\n- Not specified in guide.',
    adverseEffects: '## Adverse effects\n\nSee opioid analgesics section.',
    bibliography: [BIB.garrahan('Morphine Hydrochloride', ' (code 0144, ATC N02AA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'flm-001', name: 'Flumazenil', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Benzodiazepine antagonist.',
    indications: `${MAIN}\n\nBenzodiazepine antagonist.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 0,1 mg/mL.',
        dose: '0,2 mg IV over 15 s; repeat 0,2 mg every 1 min up to 1 mg (protocol).',
        administration: 'Slow IV.',
      },
      pediatrico: {
        presentation: '5 mL ampoules: 0,1 mg/ml',
        administration: 'IV',
        diluent: 'Sterile water for injection, 0.9% NaCl, 5% dextrose, Ringer solution.',
        finalConcentration: '0,05 mg/mL.',
        infusionRate: 'Push over 15 to 30 sec.',
        dose: 'Children: 0,01 mg/kg (maximum 0,2 mg) every 1 minute, up to 5 doses. Continuous infusion: 5-10 µg/kg/hour. Adults: 0,2 mg over no less than 15 seconds If desired response is not obtained within 1 min, a 2nd dose of 0,1 mg may be injected and, if necessary, repeat 0,1 mg every 60 seconds up to a total dose of 1 mg.',
        notes: 'Must be used only by anesthesiologists or intensivists. May be used as a diagnostic test when benzodiazepine-induced coma is suspected. Do not use in benzodiazepine and antidepressant intoxications or when there is a history of seizures.',
      },
      neonatal: {
        dose: 'Very restricted use; 0,01 mg/kg per NICU protocol.',
        administration: 'Slow IV.',
      },
    },
    stability: '## General\n\n- Use immediately after opening.\n\n## Pediatric guide\n\n- 24 h at room temperature. Then discard.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, anxiety, palpitations. In patients treated with benzodiazepines may cause withdrawal syndrome controlled with diazepam.',
    bibliography: [BIB.garrahan('Flumazenil', ' (code 0520, ATC V03AB)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hef-001', name: 'Heparin sodium', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticoagulant.',
    indications: `${MAIN}\n\nAnticoagulant.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial 5000 UI/mL.',
        dose: 'Bolus 60–80 UI/kg in ACS; infusion 12–15 UI/kg/h titrated to aPTT.',
        administration: 'IV infusion pump.',
      },
      pediatrico: {
        dose: 'Loading dose: 75-100 U/kg bolus (10 minutes). Initial dose: < 1 year: 28 U/kg/hour, > 1 year: 20 U/kg/hour, adolescents: 18 U/kg/hour. Adjust according to nomograms.',
        administration: 'IV',
        presentation: 'Ampoule: 5000 U.I./ml',
        notes: 'Contraindicated in: severe hepatic and renal insufficiency, subacute endocarditis, hemorrhagic gastritis, gastroduodenal ulcer. Drugs affecting platelet function (aspirin, nonsteroidal anti-inflammatory drugs, dipyridamole) may potentiate bleeding risk; digoxin, antihistamines, and nitroglycerin may decrease the anticoagulant effect of heparin.',
      },
      neonatal: {
        dose: '28 UI/kg/h usual infusion in NICU (protocol).',
        administration: 'IV infusion pump.',
      },
    },
    stability: '## Stability\n\n- Infusion prepared per guide; do not shake.',
    adverseEffects: '## Adverse effects\n\nHemorrhage, thrombocytopenia.',
    bibliography: [BIB.garrahan('Heparin Sodium', ' (code 0111, ATC B01AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'col-001', name: 'Colistin', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Multidrug-resistant organisms, cystic fibrosis.',
    indications: `${MAIN}\n\nMultidrug-resistant organisms, cystic fibrosis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial containing 100 mg colistin base (Permalec*, Fabra*, Colistina Richet*, Techsphere*, Alfacolin*, Alficetin, Nolisin, Cotrelan*, Colislym, Espirotech*).',
        reconstitution: '2 mL sterile water for injection. Conc: 50 mg/mL.',
        diluent: '100 mg in 50-100 mL 0.9% NaCl or 5% dextrose.',
        finalConcentration: '2 mg/mL.',
        administration: 'Direct IV: Yes. Reconstitute in 3-5 mL sterile water for injection and administer over 3-5 min. Intermittent IV: Yes. Dilute in 50 mL 0.9% NaCl or 5% dextrose and infuse over 10-15 min.',
        notes: '100 mg colistin base is approximately equivalent to 240 mg colistin methanesulfonate and 3.000.000 IU potency. IM or inhalation administration is possible.',
      },
      pediatrico: {
        presentation: 'Vial: 100 mg colistin base (3.000.000 U.I.)',
        administration: 'IV; Intrathecal; Inhalation',
        diluent: '0.9% NaCl, 5% dextrose, sterile water for injection, Ringer solution.',
        finalConcentration: 'According to patient fluid requirements.',
        infusionRate: 'Bolus over 3 to 5 min.',
        dose: 'IV: 2,5 colistin base/kg/dose every 12 h. Severe infections, critically ill patients, and cystic fibrosis: 7 mg colistin base/kg/day every 8 h. Maximum dose: 100 mg/dose. Adults loading dose: 5 mg colistin base/kg/dose (maximum dose 300 mg); then 12 h post loading: 100 mg/dose every 8 h. Equivalence: 1 mg sodium colistimethate = 12.500 U sodium colistimethate = 0,4 mg colistin base.',
        compatibility: 'Precipitates concomitantly with erythromycin, cephalothin, tetracycline.',
        notes: 'Increases risk of ototoxicity and nephrotoxicity with aminoglycosides, cyclosporine, amphotericin, and cisplatin.',
      },
      neonatal: {
        dose: 'Dose per NICU protocol and weight; strict renal monitoring.',
        administration: 'IV.',
      },
    },
    stability: '## Reconstituted (in vial)\n\n- 24 h at room temperature, 48 h refrigerated.\n\n## Diluted solution (for administration)\n\n- Use immediately once diluted. (24 h at room temperature).\n\n## Pediatric guide\n\n- 8 h at room temperature, 24 h refrigerated.',
    adverseEffects: '## Adverse effects\n\nMuscle weakness, facial paresthesia, visual disturbances, nephrotoxic. May cause bronchospasm when nebulized (treat with β-agonists).',
    bibliography: [BIB.garrahan('Colistin Methanesulfonate (Sodium colistimethate)', ' (code 1202, ATC J01XB)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'mag-001', name: 'Magnesium sulfate', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Treatment of magnesium deficiency. Hypocalcemia. Adjunct in severe acute asthma.',
    indications: `${MAIN}\n\nTreatment of magnesium deficiency. Hypocalcemia. Adjunct in severe acute asthma.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampoule 10% (1 g = 10 mL).',
        dose: 'Torsades: 1–2 g IV over 15 min. Eclampsia: 4–6 g loading dose per protocol.',
        administration: 'Slow IV.',
      },
      pediatrico: {
        presentation: '25% ampoules: 250 mg magnesium sulfate/ml = 2 mEq magnesium/ml; 25% solution (compounded): 250 mg magnesium sulfate/ml = 2 mEq magnesium/ml 1 mEq Mg = 12 mg Mg',
        administration: 'PO; IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '200 mg/mL.',
        infusionRate: '15 to 20 min in medical emergency; otherwise 2 to 4 hours.',
        dose: 'Dose expressed as elemental magnesium Daily requirement 0-6 months: 50 mg; 6 months- 1 year: 70 mg; 1-3 years: 150 mg; 4-6 years: 200 mg; > 6 years: 250 mg. Symptomatic hypomagnesemia IV-IM: 0,8-1,6 mEq/kg/dose every 4-6 h, maximum dose: 16 mEq/dose. Asymptomatic hypomagnesemia IV: 0,2-0,5 mEq/kg/day, maximum dose: 8-16 mEq/day; PO: 0,8-1,6 mEq/kg/dose every 6 h. Intestinal absorption deficit PO: 20-60 mEq/day; adults 60-100 mEq/day. Adjunct in severe acute asthma: 25 - 50 mg magnesium sulfate/kg/dose, maximum dose: 2000 mg magnesium sulfate/dose. See CIME Electrolytes Bulletin.',
        notes: 'IV administration: Incompatible with calcium, bicarbonate, and phosphate.',
      },
      neonatal: {
        dose: '25–50 mg/kg slow IV per NICU protocol.',
        administration: 'IV over 20 min.',
      },
    },
    stability: '## General\n\n- Compatible in 0.9% NaCl and 5% dextrose.\n\n## Pediatric guide\n\n- Discard once opened.',
    adverseEffects: '## Adverse effects\n\nHyporeflexia, flaccid paralysis, hypotension, heart block, CNS depression.',
    bibliography: [BIB.garrahan('magnesium SULFATE', ' (code 0133, ATC A12CC)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cef-001', name: 'Cephalexin', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'First-generation cephalexin. Infections caused by susceptible bacteria of the urinary tract, skin, soft tissues, and bone.',
    indications: `${MAIN}\n\nFirst-generation cephalexin. Infections caused by susceptible bacteria of the urinary tract, skin, soft tissues, and bone.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Capsules 500 mg; suspension.',
        dose: '250–500 mg PO every 6 h.',
        administration: 'PO.',
      },
      pediatrico: {
        dose: 'Children: 25-50 mg/kg/day every 6 h, severe infections: 50-100 mg/kg/day every 6 h, maximum dose: 3 g/day. Adults: 250-1000 mg every 6 h, maximum dose: 4 g/day. Urinary tract infection prophylaxis in neonates up to 2 months: 30 mg/kg/day every 24 h, at night. Bacterial endocarditis prophylaxis: 2 g, 1 hour before procedure.',
        administration: 'PO',
        presentation: 'Tablets: 500 mg; Syrup: 100 mg/ml',
        notes: 'Administer on an empty stomach. Should not be used for urinary tract infection prophylaxis in children older than 2 months to avoid emergence of resistant strains.',
      },
      neonatal: {
        dose: '25 mg/kg/dose PO every 12 h per protocol.',
        administration: 'PO.',
      },
    },
    stability: '## Stability\n\n- Refrigerated suspension per package insert.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, mild diarrhea, allergic reactions, pruritus, headache, neutropenia, fungal superinfections. Nephrotoxicity (2%).',
    bibliography: [BIB.garrahan('CefaLEXIN', ' (code 0034, ATC Jo1DB)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cef-003', name: 'Cefuroxime', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Second-generation cephalosporin. Treatment of upper and lower respiratory tract infections, otitis media, urinary tract, skin and soft tissues, bone and joint infections caused by Gram-positive bacteria and Haemophilus influenzae, Escherichia coli, and Klebsiella.',
    indications: `${MAIN}\n\nSecond-generation cephalosporin. Treatment of upper and lower respiratory tract infections, otitis media, urinary tract, skin and soft tissues, bone and joint infections caused by Gram-positive bacteria and Haemophilus influenzae, Escherichia coli, and Klebsiella.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Vial 750 mg, 1,5 g IV; tablets 250–500 mg PO.',
        dose: 'IV: 750 mg–1,5 g every 8 h. PO: 250–500 mg every 12 h.',
        administration: 'IV or PO.',
      },
      pediatrico: {
        presentation: 'Vial: 750-1500 mg',
        administration: 'IV',
        diluent: 'Sterile water for injection, 0.9% NaCl, 5% dextrose.',
        finalConcentration: '250 mg/mL.',
        infusionRate: '3 to 5 min.',
        dose: '3 to 12 years: 75 -150 mg/kg/day every 8 h, maximum dose: 6 g/day; meningitis: 240 mg/kg/day , maximum dose: 9 g/day, >13 years and adults: 750-1500 mg/dose every 8 h, maximum dose: 6 g/day. Preoperative dose in adults: 1,5 g.',
        notes: 'Not recommended for meningitis due to Haemophilus influenzae. Adjust dose in renal insufficiency.',
      },
      neonatal: {
        dose: 'Dose per NICU protocol.',
        administration: 'IV.',
      },
    },
    stability: '## General\n\n- Diluted IV: 24 h refrigerated.\n\n## Pediatric guide\n\n- 24 h at room temperature and 48 h refrigerated between 4° C and 8° C.',
    adverseEffects: '## Adverse effects\n\nNeutropenia, hemolytic anemia, headache, pseudomembranous colitis, phlebitis at injection site, rash, anal pruritus.',
    bibliography: [BIB.garrahan('cefUROxime', ' (code 0041, ATC J01DC)'), BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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

console.log(`\nEN Garrahan batch 3 (part A): ${drugs.length} monographs`);
