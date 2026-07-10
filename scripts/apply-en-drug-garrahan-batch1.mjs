#!/usr/bin/env node
/** Garrahan re-translation batch 1/8 — 20 EN monographs (July 2026 ES source) */
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
  aapPals: { citation: 'American Academy of Pediatrics. Pediatric Advanced Life Support (PALS).', url: 'https://www.aap.org/' },
  wao: { citation: 'World Allergy Organization. Anaphylaxis guidance for healthcare providers.', url: 'https://www.worldallergy.org/' },
  sadiUcip: { citation: 'Infectious Diseases Service, Infection Prevention and Control. UCIP 2026 — Dilution and stability guide.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Argentine Society of Infectious Diseases (SADI). Guidelines and consensus statements.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Clinical practice guidelines.', url: 'https://www.idsociety.org/' },
  sac: { citation: 'Argentine Society of Cardiology. Clinical practice guidelines.', url: 'https://www.sac.org.ar/' },
  heartPh: { citation: 'American Heart Association. Pulmonary hypertension guidelines.', url: 'https://www.heart.org/' },
  escPh: { citation: 'European Society of Cardiology. Pulmonary hypertension guidelines.', url: 'https://www.escardio.org/' },
};

const drugs = [
  {
    id: 'sil-001', name: 'Sildenafil', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Pulmonary vasodilator for pulmonary hypertension.',
    indications: `${MAIN}\n\nPulmonary vasodilator for pulmonary hypertension.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '50 mg tablets; compounding solution 2 mg/mL.', dose: 'Regimens per pulmonary hypertension protocol.', administration: 'PO.' },
      pediatrico: {
        presentation: 'Tablets: 50 mg; Solution (compounded): 2 mg/mL; Ampoules 12.5 mL: 0.8 mg/mL (imported product)',
        administration: 'PO; IV',
        dose: 'Children and adolescents: initial: 0.5–1 mg/kg/dose every 6–8 h, maximum 4 mg/kg/day up to 20 mg/dose every 8 h; maintenance: 0.25–1 mg/kg/dose every 6–8 h, maximum 4 mg/kg/day up to 20 mg/dose every 8 h. No dose adjustment required in hepatic or renal insufficiency',
        notes: 'Restricted indication — specialist use only. Not dialyzable. See sildenafil safety alert.',
      },
    },
    stability: '## Stability\n\n- Store according to package insert in original container.',
    adverseEffects: '## Adverse effects\n\nDiarrhea, dyspepsia, rash, dizziness, headache, abnormal vision, nasal congestion.',
    bibliography: [BIB.garrahan('Sildenafil*', ' (code 1530, ATC G04BE)'), BIB.sac, BIB.anmat, BIB.heartPh, BIB.escPh],
  },
  {
    id: 'bup-001', name: 'Bupivacaine', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Amide-group local anesthetic.',
    indications: `${MAIN}\n\nAmide-group local anesthetic.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '20 mL ampoules: 5 mg/mL; Hyperbaric 4 mL ampoules: 5 mg/mL.', dose: 'Up to 0.5 mg/kg/dose depending on regional block.', administration: 'Local and regional.' },
      pediatrico: {
        presentation: '20 mL ampoules: 5 mg/mL; Hyperbaric 4 mL ampoules: 5 mg/mL',
        administration: 'Local and regional',
        dose: 'Up to 0.5 mg/kg/dose',
        notes: 'SPECIALIST USE ONLY. Do not administer intravenously. Prolonged duration of action. Repeated doses by any route cause accumulation and systemic effects.',
      },
    },
    stability: '## General\n\n- Follow manufacturer storage conditions.',
    adverseEffects: '## Adverse effects\n\nArrhythmias, cardiac arrest. Cardiovascular effects are more severe than with lidocaine.',
    bibliography: [BIB.garrahan('BUPIvacaine Hydrochloride*', ' (code 0028, ATC N01BA)'), BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'adr-001', name: 'Epinephrine', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Sympathomimetic agent. Cardiogenic or septic shock with refractory hypotension and low peripheral resistance.',
    indications: `${MAIN}\n\nSympathomimetic agent. Cardiogenic or septic shock with refractory hypotension and low peripheral resistance.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '1 mg/mL ampoule (1:1000) or 0.1 mg/mL (1:10,000) per institutional formulation.',
        dose: 'Cardiac arrest IV/IO: 1 mg every 3–5 min. Anaphylaxis IM: 0.3–0.5 mg; repeat every 5–15 min if persistent.',
        administration: 'IV/IO in cardiac arrest; IM in anaphylaxis.',
        notes: 'Record time, dose, route, and hemodynamic response.',
      },
      pediatrico: {
        presentation: '4 mL ampoules: 1 mg/mL',
        administration: 'IV',
        diluent: 'Cardiac arrest: 0.9% NaCl, 5% dextrose. Anaphylaxis: undiluted.',
        finalConcentration: 'Cardiac arrest: 0.1 mg/mL (dilute one ampoule to 10 mL). Anaphylaxis: 0.01 mg/kg.',
        infusionRate: 'Bolus.',
        dose: '0.05–1 µg/kg/min, maximum 2 µg/kg/min. Adults: start 4 µg/min; infusion 8–12 µg/min',
        notes: 'Oxidizes rapidly; do not use if brown discoloration is present. Saline dilution is not recommended. Norepinephrine effects may be increased with tricyclic antidepressants, antihistamines, and beta-blockers.',
      },
      neonatal: {
        presentation: '0.1 mg/mL ampoule (1:10,000) preferred for neonates when available.',
        dose: 'Neonatal resuscitation: 0.01–0.03 mg/kg IV/IO/endotracheal per current NRP algorithm.',
        administration: 'Umbilical, peripheral, or other access as appropriate.',
      },
    },
    stability: '## Pediatric guide\n\n- Degrades quickly. Do not use if solution is discolored or precipitated. Discard remainder.\n\n## General\n\n- Protect from light. Store at 15–30 °C.',
    adverseEffects: '## Adverse effects\n\nHypertension, necrosis, bradycardia. Prolonged use: decreased cardiac output, plasma volume depletion, severe peripheral and visceral vasoconstriction. Stress cardiomyopathy may also occur.',
    bibliography: [BIB.garrahan('NORepinephrine', ' (code 1401, ATC C01CA)'), BIB.pedGuide, BIB.aha, BIB.aapPals, BIB.wao],
  },
  {
    id: 'ade-001', name: 'Adenosine', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Rapid conversion to normal sinus rhythm in paroxysmal supraventricular tachycardia. Aids diagnosis of wide- or narrow-complex supraventricular tachycardias.',
    indications: `${MAIN}\n\nRapid conversion to normal sinus rhythm in paroxysmal supraventricular tachycardia. Aids diagnosis of wide- or narrow-complex supraventricular tachycardias.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: '3 mg/mL ampoule.', dose: '6 mg IV rapid bolus, then 12 mg if persistent (max. 30 mg).', administration: 'Proximal IV with 20 mL flush.' },
      pediatrico: {
        presentation: '2 mL ampoules: 3 mg/mL',
        administration: 'IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '3 mg/mL.',
        infusionRate: 'Bolus with immediate 5–10 mL NS flush (two-syringe technique).',
        dose: 'Initial: 50–100 µg/kg (maximum 6 mg); if no response, after 2 min give a second dose of 200 µg/kg and repeat up to 0.5 mg/kg/dose in children or 0.3 mg/kg/dose in neonates, or until sinus rhythm is restored (maximum 12 mg/dose or 30 mg total).',
        notes: 'Avoid tea, cola, coffee, cocoa, and chocolate for at least 12 hours before administration.',
      },
      neonatal: { dose: '0.05–0.1 mg/kg bolus per protocol.', administration: 'IV with flush.' },
    },
    stability: '## Pediatric guide\n\n- Discard remainder once opened.\n\n## General\n\n- Use undiluted; administer immediately.',
    adverseEffects: '## Adverse effects\n\nAlthough the incidence of adverse effects is relatively high, they are usually very transient due to the short half-life (<10 s): chest pain, facial flushing, and hypotension. Transient bradycardia and arrhythmias: AV block, premature atrial complexes, atrial fibrillation, and nonsustained ventricular tachycardia; dyspnea, hyperventilation, cough, and bronchospasm; dizziness, headache, tremor, blurred vision, and increased intracranial pressure; nausea, metallic taste, and gastrointestinal discomfort.',
    bibliography: [BIB.garrahan('Adenosine', ' (code 1181, ATC C01EB)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'met-001', name: 'Metronidazole', version: '1.2.3', updatedAt: '2026-07-10',
    executiveSummary: 'Nitroimidazole antibiotic and antiparasitic agent. Active against anaerobes and protozoa.',
    indications: `${MAIN}\n\nNitroimidazole antibiotic and antiparasitic agent. Active against anaerobes and protozoa.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: '500 mg in 100 mL bag (Metronidazol Norgreen, Rivero, Ugar).',
        reconstitution: 'No prior reconstitution required. Conc.: 5 mg/mL.',
        finalConcentration: '5 mg/mL.',
        administration: 'Direct IV: No. Intermittent IV: Yes. Infuse over 60 min.',
      },
      pediatrico: {
        presentation: 'Tablets, oral suspension, IV ampoules.',
        administration: 'PO; IV',
        diluent: '0.9% NaCl, 5% dextrose.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '60 min.',
        dose: 'Anaerobic infections (PO; IV): 30 mg/kg/day every 8 h, maximum PO: 2 g; IV: 4 g. Amebiasis: 35 mg/kg/day every 8 h for 10 days.',
        notes: 'Avoid alcoholic beverages during treatment and for 48 h afterward. Use caution with warfarin.',
      },
      neonatal: { dose: '7.5 mg/kg/dose every 12 h (NICU).', administration: 'IV/PO.' },
    },
    stability: '## Reconstituted (in vial)\n\n- Not applicable.\n\n## Diluted solution (for administration)\n\n- Not specified.\n\n## Pediatric guide\n\n- Discard remainder once opened.',
    adverseEffects: '## Adverse effects\n\nNausea, vomiting, metallic taste, peripheral neuropathy with prolonged courses, hypersensitivity reactions.',
    bibliography: [BIB.garrahan('metroNIDAZOL', ' (ATC J01XD)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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

console.log(`\nEN Garrahan batch 1 (part A): ${drugs.length} monographs`);
