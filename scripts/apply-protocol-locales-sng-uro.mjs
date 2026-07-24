#!/usr/bin/env node
/**
 * Locales EN (US) + pt-BR for sng-001, sng-p001, neo-i-008, uro-001, uro-p001, neo-i-009.
 * Academic clinical register; numeric values identical to ES source.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function writeLocale(locale, category, protocol) {
  const dir = path.join(ROOT, 'content/locales', locale, 'categories', category, 'protocols');
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `${protocol.id}.json`);
  fs.writeFileSync(out, `${JSON.stringify(protocol, null, 2)}\n`, 'utf8');
  console.log('wrote', path.relative(ROOT, out));
}

const en = [
  {
    id: 'sng-001',
    title: 'Nasogastric tube insertion',
    category: 'adulto',
    branch: 'atencion-sanitaria',
    version: '1.0',
    executiveSummary:
      'Insert a nasogastric tube only with a justified indication, confirm gastric position before use, secure without nasal injury, and reassess the need for the device daily.',
    body: `## Steps to perform

1. Verify indication, contraindications, and patient identity; confirm the prescription (tube type, French size, expected duration, and purpose: decompression, feeding, or drug administration).
2. Explain the procedure; assess nasal patency, septal deviation, and level of consciousness; choose the more patent naris.
3. Perform hand hygiene; prepare a tube of the indicated size, water-soluble lubricant, syringe, stethoscope, noncompressive securement, and a container for aspirate.
4. Measure insertion length: tip of the nose → earlobe → xiphoid process (NEX method); mark the tube.
5. Place the patient semi-upright (Fowler 30–45°) if clinically appropriate; if intubated or with an advanced airway, coordinate with the team and maintain aspiration precautions.
6. Lubricate the distal tip and advance through the chosen naris, directing downward and posteriorly; ask the patient to swallow sips of water if conscious and able to protect the airway.
7. Advance to the mark without forcing. If marked resistance, severe coughing, cyanosis, respiratory distress, or a “muffled” voice occurs: **withdraw immediately** and retry via the other naris or with supervision.
8. Confirm gastric position **before any use**: aspirate contents and assess pH ≤ 5.5 when the method is available; auscultate the epigastrium only as supportive information (not as the sole confirmation method). If uncertain: obtain a chest/abdominal radiograph per institutional protocol.
9. Secure the tube without tension on the nasal ala or septum; protect the skin; document naris, French size, centimeters at the naris, confirmation method, and aspirate appearance.
10. Connect to a drainage bag/system or start nutrition/medication only after documented confirmation.
11. Reassess the indication every shift; remove at the first clinically possible moment.

## Scientific rationale

### Indications

- Gastric decompression in ileus, proximal obstruction, or intractable vomiting.
- Enteral nutrition when the oral route is insufficient or contraindicated.
- Drug administration or activated charcoal when no safer alternative exists.
- Selective gastric lavage in toxicology (restricted indications).

### Relative / relatively absolute contraindications

- Severe facial trauma, basilar skull fracture, or recent sinus/skull-base surgery (prefer orogastric placement or consult).
- Active esophageal varices or recent esophageal surgery (weigh risk–benefit with a specialist).
- Uncorrected severe coagulopathy (epistaxis risk).
- Bilateral nasal obstruction or unresolved choanal atresia.

### French size selection (adult)

| Intended use | Approximate French size |
| --- | --- |
| Decompression / suction | 14–18 Fr |
| Enteral nutrition / medication | 8–12 Fr (fine-bore) |
| Intubated patient / high aspiration risk | Prefer orogastric if protocol indicates |

### Position confirmation

| Method | Comment |
| --- | --- |
| Aspirate pH ≤ 5.5 | Preferred when available and not altered by recent PPI use |
| Radiograph | Gold standard if uncertain, planned feeding, or critical illness |
| Isolated epigastric auscultation | **Insufficient** as the sole criterion |

### Evidence and recommendations

> **ASPEN / ESPEN (clinical nutrition):** verify gastric placement before starting enteral nutrition; do not rely on auscultation alone (McClave et al.; Singer et al.).

> **Critical care:** pulmonary misplacement of an NG tube can cause pneumonia, pneumothorax, or death; always confirm before use (patient-safety practices).

### Aftercare

- Daily nasal and oral hygiene; rotate the fixation point to prevent pressure injury.
- Monitor for epistaxis, sinusitis, odynophagia, vomiting, abdominal distension, and signs of aspiration.
- During feeding: elevate the head of bed ≥ 30° if not contraindicated; check gastric residual volume per local protocol.
- Do not forcefully irrigate if obstructed; consider replacement.

### Complications — stop and notify

- Suspected pulmonary placement (cough, desaturation, absent gastric aspirate).
- Profuse epistaxis or septal hematoma.
- Esophageal perforation or mediastinitis (severe pain, subcutaneous emphysema).
- Pneumothorax after a failed attempt.
- Nasal ulceration from inadequate securement.`,
    bibliography: [
      {
        citation:
          'McClave SA, Taylor BE, Martindale RG, et al. Guidelines for the Provision and Assessment of Nutrition Support Therapy in the Adult Critically Ill Patient (SCCM/ASPEN). JPEN J Parenter Enteral Nutr. 2016 (and updates).',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26773077/',
      },
      {
        citation:
          'Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30348463/',
      },
      {
        citation: 'SATI — Nutrition Committee. Recommendations for nutritional support in the critically ill patient.',
        url: 'https://www.sati.org.ar/',
      },
      {
        citation:
          'National Patient Safety Agency (NPSA) / NHS. Reducing the harm caused by misplaced nasogastric feeding tubes in adults.',
        url: 'https://www.england.nhs.uk/patient-safety/',
      },
      {
        citation:
          'Boullata JI, Carrera AL, Harvey L, et al. ASPEN Safe Practices for Enteral Nutrition Therapy. JPEN. 2017.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28068900/',
      },
    ],
  },
  {
    id: 'sng-p001',
    title: 'Pediatric nasogastric tube insertion',
    category: 'pediatrico',
    branch: 'atencion-sanitaria',
    version: '1.0',
    executiveSummary:
      'Insert a nasogastric tube in pediatrics only with a justified indication, measure length by the NEX method or an age-based table, confirm gastric position before use, and protect the airway and nasal mucosa.',
    body: `## Steps to perform

1. Verify indication, two patient identifiers, and the prescription (French size, purpose, duration). Explain to the family; plan safe therapeutic holding and analgesia/sedation per protocol.
2. Assess the nares, craniofacial malformations, and level of consciousness; choose the more patent naris.
3. Perform hand hygiene; prepare a pediatric tube of the indicated size, water-soluble lubricant, precision syringe, stethoscope, soft securement, and a container for aspirate.
4. Measure length: nose → ear → xiphoid (NEX) or per institutional age/height table; mark the tube.
5. Position the child: infant semi-upright or lateral with the head slightly flexed; older child in Fowler position if cooperative.
6. Lubricate and advance through the chosen naris downward and posteriorly; encourage swallowing with a pacifier or sips if safe.
7. Advance to the mark **without forcing**. If cough, cyanosis, intense refusal, or resistance occurs: withdraw and reassess (other naris, orogastric route, or supervision).
8. Confirm gastric position before use: aspirate with pH ≤ 5 when available; radiograph if uncertain, planned feeding, or critical illness. Do not rely on auscultation alone.
9. Secure without compressing the nasal ala or septum; protect the skin; document naris, Fr, cm at the naris, confirmation method, and aspirate appearance.
10. Start decompression, nutrition, or medication only after documented confirmation.
11. Reassess need every shift; remove at the first clinically possible moment.

## Scientific rationale

### Indications

- Decompression in ileus, abdominal postoperative care, or intractable vomiting.
- Enteral nutrition when the oral route is insufficient (failure to thrive, dysphagia, critical illness).
- Drug administration when no safe oral route exists.
- Procedure preparation per prescription.

### Relative contraindications

- Facial trauma, basilar skull fracture, or recent upper-airway surgery.
- Choanal atresia, bilateral nasal stenosis, or complex craniofacial malformation (coordinate ENT/surgery).
- Esophageal varices or recent esophageal surgery.
- Uncorrected coagulopathy with risk of severe epistaxis.

### French size selection (pediatric)

| Approximate age / weight | Suggested French size |
| --- | --- |
| Infant < 5 kg | 5–6 Fr |
| Infant / small child | 6–8 Fr |
| School-age child | 8–10 Fr |
| Adolescent | 10–12 Fr (feeding); 12–14 Fr (decompression) |

### Position confirmation

| Method | Use in pediatrics |
| --- | --- |
| Aspirate pH | Preferred when available |
| Radiograph | If uncertain or feeding an unstable patient |
| Auscultation alone | **Not sufficient** |

### Evidence and recommendations

> **AAP / pediatric nutrition:** NG tube misplacement is a preventable adverse event; verify location before feeding (safety practices).

> **ASPEN pediatric:** confirm gastric position and elevate the head of bed when feasible to reduce aspiration.

### Aftercare

- Nasal/oral hygiene; watch for pressure injury and sinusitis.
- In infants: assess respiratory distress (the tube occupies part of the nasal airway).
- Monitor feeding tolerance, residuals, and aspiration signs.
- Avoid traction during diaper changes or mobilization.

### Complications — stop and notify

- Suspected pulmonary or airway placement.
- Epistaxis, apnea, or desaturation during the attempt.
- Esophageal perforation (rare; pain, emphysema).
- Pneumothorax.
- Nasal ulceration or recurrent displacement.`,
    bibliography: [
      {
        citation:
          'American Academy of Pediatrics. Enteral nutrition and tube feeding in children — clinical considerations and safety.',
        url: 'https://www.aap.org/en/patient-care/',
      },
      {
        citation:
          'Mehta NM, Skillman HE, Irving SY, et al. Guidelines for the Provision and Assessment of Nutrition Support Therapy in the Pediatric Critically Ill Patient (ASPEN). JPEN. 2017.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28686844/',
      },
      {
        citation: 'Boullata JI, et al. ASPEN Safe Practices for Enteral Nutrition Therapy. JPEN. 2017.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28068900/',
      },
      {
        citation: 'NHS / NPSA. Reducing harm from misplaced nasogastric feeding tubes — pediatric considerations.',
        url: 'https://www.england.nhs.uk/patient-safety/',
      },
      {
        citation:
          'SATI — Nutrition Committee. Nutritional support in the critically ill patient (institutional pediatric adaptation).',
        url: 'https://www.sati.org.ar/',
      },
    ],
  },
  {
    id: 'neo-i-008',
    title: 'Neonatal orogastric / nasogastric tube insertion',
    category: 'neonatologia',
    branch: 'atencion-sanitaria',
    division: 'intensiva',
    version: '1.0',
    executiveSummary:
      'In neonates (day 0–30, 500–2500 g), prefer an orogastric tube if respiratory distress is present; measure length with a validated method, confirm gastric position before use, and secure without injuring skin or the airway.',
    body: `## Steps to perform

1. Confirm indication (decompression, enteral feeding, emptying before CPAP/ventilation), identify the neonate (two identifiers), weight, and gestational/postnatal age.
2. Explain to the family; maintain thermoregulation (radiant warmer/incubator) during the procedure.
3. Prefer an **orogastric** tube in preterm infants with distress, CPAP, or ventilation (keeps the nares free). Reserve nasogastric placement for stable neonates with a patent nasal airway per protocol.
4. Perform hand hygiene; prepare a 5–8 Fr tube by weight, minimal water-soluble lubricant, precision syringe, soft securement, and a container for aspirate.
5. Measure length: for orogastric, corner of the mouth → ear → xiphoid (or institutional weight-based table); mark the tube.
6. Position the neonate slightly semi-upright or lateral; suction oral secretions if needed.
7. Advance gently to the mark **without forcing**. If cyanosis, bradycardia, apnea, or resistance occurs: withdraw, oxygenate/stabilize, and retry with supervision.
8. Confirm gastric position before any use: gastric aspirate; pH when available; radiograph if uncertain, planned feeding, or prior misplacement. Do not rely on auscultation alone.
9. Secure without occluding the nares or compressing the lip/cheek; keep CPAP/cannula access free; document route (oral/nasal), Fr, cm, confirmation method, and aspirate appearance.
10. Start feeding or decompression only after confirmation; during feeding, elevate the head slightly if stability allows.
11. Reassess every shift; remove or replace per protocol (obstruction, displacement, end of indication).

## Scientific rationale

### Population and scope

**Neonates day 0–30**, **500 g–2500 g**, in the neonatal unit. The orogastric route reduces nasal obstruction and work of breathing in preterm infants.

### Indications

- Gastric decompression in ileus, suspected NEC, distension, or vomiting.
- Enteral feeding (trophic or nutrition) when suck–swallow is unsafe.
- Gastric emptying before procedures or during noninvasive respiratory support with distension.

### Relative contraindications

- Suspected esophageal atresia or tracheoesophageal fistula (coordinate surgery; do not force).
- Severe craniofacial malformation (assess route with ENT/surgery).
- Coagulopathy with active oral/nasal bleeding.

### French size and route selection

| Weight | French size | Preferred route |
| --- | --- | --- |
| 500–999 g | 5 Fr | Orogastric |
| 1000–1499 g | 5–6 Fr | Orogastric |
| 1500–2500 g | 6–8 Fr | Orogastric if distress; nasogastric if stable |

### Evidence and recommendations

> **AAP / neonatal practice:** verify location before feeding; misplacement is a preventable event (neonatal patient safety).

> **VON / neonatal nutrition:** early trophic feeds with a correctly positioned tube improve tolerance and reduce parenteral nutrition days when clinically appropriate.

### Aftercare

- Monitor apnea, bradycardia, and desaturation related to the procedure.
- Check gastric residual and tolerance per feeding protocol.
- Inspect fixation skin every shift; prevent pressure injury.
- On nasal CPAP: prioritize orogastric placement and avoid prong occlusion.

### Complications — stop and notify

- Suspected airway placement or esophageal perforation.
- Bradycardia/apnea during insertion.
- Pneumothorax or pneumoperitoneum (rare).
- Nasal/oral injury from securement.
- Aspiration after starting feeds with a misplaced tube.`,
    bibliography: [
      {
        citation: 'American Academy of Pediatrics. Neonatal enteral nutrition and tube feeding safety.',
        url: 'https://www.aap.org/en/patient-care/',
      },
      {
        citation: 'Vermont Oxford Network. Nutritional practices and tube feeding safety in the NICU.',
        url: 'https://www.vtoxford.org/',
      },
      {
        citation:
          'Mehta NM, et al. ASPEN Guidelines for Nutrition Support in the Pediatric Critically Ill Patient. JPEN. 2017.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28686844/',
      },
      {
        citation:
          'World Health Organization. Optimal feeding of low-birth-weight infants (tube techniques and safety).',
        url: 'https://www.who.int/publications',
      },
      {
        citation:
          'SATI — Nutrition Committee. Nutritional support in the critically ill patient (institutional neonatal adaptation).',
        url: 'https://www.sati.org.ar/',
      },
    ],
  },
  {
    id: 'uro-001',
    title: 'Urine culture collection',
    category: 'adulto',
    branch: 'atencion-sanitaria',
    version: '1.0',
    executiveSummary:
      'Obtain a urine culture with technique that minimizes contamination; prefer a clean-catch midstream specimen or a sample from a freshly placed catheter; refrigerate or send promptly to the laboratory; and interpret colony counts together with the clinical picture.',
    body: `## Steps to perform

1. Verify the clinical indication (dysuria, frequency, fever with suspected UTI, urinary-source sepsis, treatment follow-up per protocol) and patient identity.
2. Explain the procedure; ask the patient to avoid recent voiding (ideally ≥ 2–3 h of retention) if possible without delaying urgent care.
3. Choose the collection method by situation:
   - **Clean-catch midstream** (cooperative patient, no catheter).
   - **Single-use intermittent catheterization** (noncooperative patient, retention, or critical sample).
   - **Aspiration from an indwelling catheter sampling port** (never from the bag).
4. Perform hand hygiene; prepare a sterile wide-mouth container, antiseptic/soap per protocol, and labels.
5. **Midstream:** wash the genitals with soap and water or antiseptic per protocol; in women separate the labia; in men retract the foreskin if applicable; discard the first stream and collect the midstream portion in a sterile container without touching the interior.
6. **Intermittent catheter:** aseptic technique; discard the first milliliters and collect into a sterile container.
7. **Indwelling catheter:** clamp the catheter distally for a few minutes if protocol indicates; disinfect the sampling port; aspirate with a sterile syringe; **do not disconnect** the closed system or sample from the bag.
8. Close the container without contaminating it; label with name, date, time, collection method, and current antibiotics.
9. Send to the laboratory **within 2 h** at room temperature, or refrigerate (2–8 °C) for up to 24 h per local protocol; do not freeze.
10. If urinary sepsis is suspected: obtain urine culture (and blood cultures) **before antibiotics** if this does not delay initiation beyond an acceptable window (e.g., Surviving Sepsis).
11. Document method, time, and responsible person; report results with colony count, organism, and clinical interpretation.

## Scientific rationale

### Indications

- Suspected cystitis, pyelonephritis, or bacterial prostatitis.
- Fever or sepsis with a probable urinary source.
- Catheter-associated UTI (CAUTI) with clinical criteria.
- Bacteriuria in pregnancy, preoperative urology, or immunocompromised patients per protocol.
- Test of cure only when indicated (not routinely after uncomplicated cystitis that has improved).

### Methods and specimen quality

| Method | Comment |
| --- | --- |
| Clean-catch midstream | Standard in cooperative adults |
| Intermittent catheterization | Useful when spontaneous voiding is unreliable |
| Indwelling catheter sampling port | Avoids contaminating the closed system |
| Collection bag | **Not valid** for culture |
| Suprapubic aspiration | Reserved for special cases / urology |

### Interpretive guidance (adult)

| Colony count (CFU/mL) | Usual interpretation* |
| --- | --- |
| ≥ 10⁵ | Suggests UTI in a midstream specimen with compatible clinical findings |
| 10³–10⁴ | Interpret with clinical context, sex, method, and organisms |
| Polymicrobial / mixed flora | Suspect contamination; repeat if clinically required |

\\*Thresholds may vary by laboratory and local guidelines; always correlate with sediment and clinical findings.

### Evidence and recommendations

> **SATI/SADI 2024 (Cornistein et al.):** in CAUTI, culture only with clinical suspicion; do not routinely treat asymptomatic bacteriuria in catheterized patients; remove or change the catheter as indicated when obtaining the specimen.

> **IDSA / SHEA:** do not culture from the bag; use aseptic port technique; avoid “surveillance” cultures without indication.

### Common errors that invalidate the result

- Contamination by periurethral flora (poor hygiene or inclusion of the first stream).
- Delay > 2 h without refrigeration.
- Bag specimen or sampling an old catheter without port technique.
- Antibiotics started before collection without documentation.

### Complications / situations — notify

- Inability to obtain a specimen in a septic patient (escalate to intermittent catheterization / urology).
- Urethral trauma during catheterization.
- Positive result with clinical deterioration (adjust antibiotics based on susceptibility).`,
    bibliography: [
      {
        citation:
          'Cornistein W, Nuccetelli Y, Rodríguez VM, et al. Infección urinaria asociada a sonda vesical. Actualización y recomendaciones intersociedades 2024. Medicina (B Aires). 2025;85(2):1-15. (SATI / SADI).',
        url: 'https://www.medicinabuenosaires.com/revistas/vol85-25/n2/348.pdf',
      },
      {
        citation:
          'Cornistein W, et al. Catheter associated urinary tract infection: Update and intersociety recommendations, 2024. Revista Argentina de Terapia Intensiva (SATI).',
        url: 'https://revista.sati.org.ar/index.php/MI/en/article/view/980',
      },
      {
        citation:
          'Lo E, Nicolle LE, Coffin SE, et al. Strategies to Prevent Catheter-Associated Urinary Tract Infections in Acute Care Hospitals: 2022 Update. Infect Control Hosp Epidemiol. 2022.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36062715/',
      },
      {
        citation:
          'Gupta K, Hooton TM, Naber KG, et al. International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women (IDSA). Clin Infect Dis. 2011 (and updates).',
        url: 'https://pubmed.ncbi.nlm.nih.gov/21292654/',
      },
      {
        citation: 'SATI — Critical Infectious Diseases Committee. Microbiologic specimen collection in the ICU.',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
    ],
  },
  {
    id: 'uro-p001',
    title: 'Pediatric urine culture collection',
    category: 'pediatrico',
    branch: 'atencion-sanitaria',
    version: '1.0',
    executiveSummary:
      'In pediatrics, obtain a urine culture with the least contaminating method possible: adhesive bags only for screening; confirm with catheterization or aspiration if positive; send the specimen promptly and interpret by age and clinical findings.',
    body: `## Steps to perform

1. Verify indication (fever without source in an infant, dysuria, abdominal/flank pain, recurrent UTI, uropathy) and identify the child (two identifiers).
2. Explain to the family; avoid delays in febrile infants who require antibiotic decisions.
3. Choose the method by age and urgency:
   - **Clean-catch midstream:** cooperative children.
   - **Intermittent bladder catheterization:** preferred method for definitive culture in infants/noncooperative children.
   - **Periurethral adhesive bag:** screening only; **do not** base definitive treatment on a positive bag alone.
   - **Suprapubic aspiration:** per local experience / urology.
4. Perform hand hygiene; prepare a sterile container, genital hygiene supplies, and, if needed, a pediatric catheter of appropriate French size.
5. **Midstream:** genital hygiene; collect the mid portion without touching the inside of the container.
6. **Catheterization:** sterile technique (see pediatric urinary catheter protocol); discard the first milliliters; collect into a sterile container; remove the catheter.
7. **Bag:** thorough hygiene; apply the bag; monitor; remove as soon as urine appears; transfer to a sterile container. If the bag culture is positive or equivocal: **confirm** with catheterization or aspiration before diagnosing UTI.
8. Label: name, age, date, time, exact method, and prior antibiotics.
9. Send to the laboratory immediately or refrigerate per protocol; document delays.
10. In fever without source / suspected pyelonephritis: culture **before** empiric antibiotics whenever this does not delay treatment of an unstable child.
11. Document and interpret together with sediment, CRP/PCT if applicable, and AAP/institutional criteria.

## Scientific rationale

### Indications

- Febrile infant without source when UTI evaluation is planned.
- Child with lower urinary symptoms or suspected pyelonephritis.
- Follow-up in uropathy, reflux, or recurrent UTI per specialist.
- Bacteriuria in high-risk settings (immunocompromised) per protocol.

### Methods: reliability hierarchy

| Method | Diagnostic reliability |
| --- | --- |
| Suprapubic aspiration | High |
| Intermittent catheterization | High |
| Midstream (cooperative child) | Good if technique is correct |
| Adhesive bag | Low (high contamination); screening only |

### Interpretive guidance (pediatrics)

| Method | Approximate threshold* |
| --- | --- |
| Catheterization | ≥ 50,000 CFU/mL of a single organism + clinical findings/sediment |
| Midstream | ≥ 100,000 CFU/mL typically |
| Aspiration | Any significant growth of a pathogen |
| Bag | Do not diagnose UTI on a positive bag alone |

\\*Follow laboratory and current AAP/institutional thresholds.

### Evidence and recommendations

> **AAP (UTI in infants and children):** do not use an adhesive bag as the sole diagnostic method; confirm with catheterization or aspiration (Roberts et al. / AAP updates).

> **SATI/SADI:** avoid unnecessary catheter cultures; always correlate with clinical findings (Cornistein et al., 2024).

### Common errors

- Treating “UTI” based only on a positive bag.
- Delayed transport → overgrowth.
- Contamination from inadequate hygiene.
- Culturing from a diaper or an indwelling catheter collection bag.

### Complications — notify

- Urethral trauma during catheterization (do not force; consult urology).
- Septic child without a specimen (prioritize stabilization and cultures in parallel).
- Positive result with deterioration (adjust antibiotics).`,
    bibliography: [
      {
        citation:
          'Subcommittee on Urinary Tract Infection, American Academy of Pediatrics. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children. Pediatrics.',
        url: 'https://publications.aap.org/pediatrics/article/128/3/595/30042',
      },
      {
        citation:
          'Cornistein W, et al. Infección urinaria asociada a sonda vesical — recomendaciones intersociedades SATI/SADI 2024. Medicina (B Aires). 2025.',
        url: 'https://www.medicinabuenosaires.com/revistas/vol85-25/n2/348.pdf',
      },
      {
        citation:
          'Lo E, et al. Strategies to Prevent CAUTI in Acute Care Hospitals: 2022 Update. Infect Control Hosp Epidemiol. 2022.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36062715/',
      },
      {
        citation: 'Society of Pediatric Urology — resources on UTI diagnosis and malformations.',
        url: 'https://www.spuonline.org/',
      },
      {
        citation: 'SATI — Microbiologic specimen collection in the ICU.',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
    ],
  },
  {
    id: 'neo-i-009',
    title: 'Neonatal urine culture collection',
    category: 'neonatologia',
    branch: 'atencion-sanitaria',
    division: 'intensiva',
    version: '1.0',
    executiveSummary:
      'In neonates (day 0–30, 500–2500 g), obtain a urine culture by bladder catheterization or suprapubic aspiration; do not diagnose UTI from an adhesive bag alone; culture before antibiotics when stability allows.',
    body: `## Steps to perform

1. Confirm indication (fever/hypothermia, neonatal sepsis, suspected UTI, source evaluation in an unstable neonate) and identify the neonate (two identifiers, weight).
2. Explain to the family; maintain thermoregulation; do not delay antibiotics in severe sepsis because of sampling difficulty — culture in parallel.
3. Choose the method:
   - **Bladder catheterization** (5–6 Fr): usual method for definitive culture.
   - **Suprapubic aspiration:** if experience is available and the bladder is palpable/full.
   - **Adhesive bag:** screening only; confirm every positive result.
4. Perform hand hygiene; aseptic technique; cutaneous antiseptic per neonatal protocol; allow to dry.
5. **Catheterization:** lubricate minimally; advance without forcing; discard the first milliliters; collect into a sterile container; remove the catheter.
6. **Aspiration:** locate the bladder (palpation/ultrasound if available); sterile technique; aspirate; do not traverse bowel loops.
7. Label: name, weight, date, time, method, and maternal/neonatal antibiotics.
8. Send immediately to the laboratory; refrigerate only per protocol if a brief delay occurs.
9. In sepsis: also obtain blood culture; start empiric therapy per NRP/institutional protocol without waiting for the urine culture.
10. Document and interpret with clinical findings, sediment (if volume allows), and pediatric–neonatal thresholds.

## Scientific rationale

### Population and scope

**Neonates day 0–30**, **500 g–2500 g**. Neonatal UTI may present as sepsis without local urinary symptoms.

### Indications

- Evaluation of early- or late-onset neonatal sepsis with a possible urinary source.
- Fever or temperature instability without a focus.
- Suspected bacteriuria in a neonate with urinary malformation.
- Follow-up per neonatal nephrology/urology.

### Methods and reliability

| Method | Use in the neonate |
| --- | --- |
| Catheterization | Preferred for diagnostic culture |
| Suprapubic aspiration | High specificity when expertise is available |
| Bag | Screening only; high contamination |
| Diaper | **Not valid** |

### Interpretive guidance

| Method | Approximate criterion* |
| --- | --- |
| Catheterization | ≥ 50,000 CFU/mL of a pathogen + clinical findings |
| Aspiration | Significant growth of a pathogen |
| Positive bag | Always confirm |

\\*Adjust to laboratory and local/AAP guidance.

### Evidence and recommendations

> **AAP:** in young febrile infants, the collection method determines the validity of a UTI diagnosis.

> **SATI / critical infectious diseases:** aseptic technique and prompt transport; correlate with blood culture in sepsis (microbiologic sampling).

> **VON:** urinary-source sepsis is part of the late-onset sepsis differential; adequate culture avoids prolonged treatment for contamination.

### Common errors

- Diagnosing and treating based only on a positive bag.
- Delayed transport.
- Contamination from nonsterile technique.
- Forcing a catheter in a male neonate with resistance (urethral risk).

### Complications — stop and notify

- Bradycardia/apnea during the procedure.
- Urethral trauma or frank hematuria.
- Bowel puncture (if incorrect suprapubic technique).
- Septic neonate without a specimen (prioritize access and antibiotics; complete cultures as soon as possible).`,
    bibliography: [
      {
        citation:
          'American Academy of Pediatrics. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children.',
        url: 'https://publications.aap.org/pediatrics/article/128/3/595/30042',
      },
      {
        citation: 'SATI — Microbiologic specimen collection in the ICU (Critical Infectious Diseases Committee).',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
      {
        citation: 'Cornistein W, et al. Catheter-associated UTI — SATI/SADI intersociety recommendations 2024.',
        url: 'https://www.medicinabuenosaires.com/revistas/vol85-25/n2/348.pdf',
      },
      {
        citation: 'Vermont Oxford Network. Late-onset sepsis evaluation in the NICU.',
        url: 'https://www.vtoxford.org/',
      },
      {
        citation:
          'World Health Organization. Guidelines on prevention of healthcare-associated infections in neonatal units.',
        url: 'https://www.who.int/teams/maternal-newborn-child-adolescent-health-and-ageing/newborn-health',
      },
    ],
  },
];

// pt-BR continues in same file - split for manageability via second array
const pt = [
  {
    id: 'sng-001',
    title: 'Colocação de sonda nasogástrica',
    category: 'adulto',
    branch: 'atencion-sanitaria',
    version: '1.0',
    executiveSummary:
      'Colocar sonda nasogástrica somente com indicação justificada, confirmar posição gástrica antes do uso, fixar sem lesão nasal e reavaliar diariamente a necessidade do dispositivo.',
    body: `## Passos a realizar

1. Verificar indicação, contraindicações e identidade do paciente; confirmar a prescrição (tipo de sonda, calibre, duração prevista e uso: descompressão, alimentação ou administração de fármacos).
2. Explicar o procedimento; avaliar permeabilidade nasal, desvio septal e nível de consciência; escolher a fossa nasal mais permeável.
3. Realizar higienização das mãos; preparar sonda do calibre indicado, lubrificante hidrossolúvel, seringa, estetoscópio, fixador não compressivo e recipiente para aspirado.
4. Medir o comprimento de inserção: ponta do nariz → lóbulo da orelha → apófise xifoide (método NEX); marcar a sonda.
5. Posicionar o paciente semi-sentado (Fowler 30–45°) se a clínica permitir; se intubado ou com via aérea avançada, coordenar com a equipe e manter precauções de aspiração.
6. Lubrificar a extremidade distal e introduzir pela fossa escolhida, dirigindo-se para baixo e para trás; solicitar deglutição de goles de água se o paciente estiver consciente e puder proteger a via aérea.
7. Avançar até a marca sem forçar. Diante de resistência marcada, tosse intensa, cianose, desconforto respiratório ou voz “apagada”: **retirar imediatamente** e tentar pela outra fossa ou com supervisão.
8. Confirmar posição gástrica **antes de qualquer uso**: aspirar conteúdo e avaliar pH ≤ 5,5 quando o método estiver disponível; auscultar o epigástrio apenas como apoio (não é método único de confirmação). Em caso de dúvida: radiografia de tórax/abdome conforme protocolo institucional.
9. Fixar a sonda sem tensão sobre a asa nasal nem o septo; proteger a pele; registrar fossa, calibre, centímetros na narina, método de confirmação e aspecto do aspirado.
10. Conectar à bolsa/sistema de drenagem ou iniciar nutrição/medicação somente após confirmação documentada.
11. Reavaliar a indicação a cada turno; retirar no primeiro momento clinicamente possível.

## Fundamentação científica

### Indicações

- Descompressão gástrica em íleo, obstrução proximal ou vômitos incoercíveis.
- Nutrição enteral quando a via oral é insuficiente ou está contraindicada.
- Administração de fármacos ou carvão ativado quando não há alternativa segura.
- Lavagem gástrica seletiva conforme toxicologia (indicações restritas).

### Contraindicações relativas / absolutas relativas

- Trauma facial grave, fratura de base de crânio ou cirurgia recente de seios/base de crânio (preferir orogástrica ou consultar).
- Varizes esofágicas ativas ou cirurgia esofágica recente (avaliar risco–benefício com especialista).
- Coagulopatia grave não corrigida (risco de epistaxe).
- Obstrução nasal bilateral ou atresia de coanas não resolvida.

### Seleção de calibre (adulto)

| Uso previsto | Calibre orientativo |
| --- | --- |
| Descompressão / aspiração | 14–18 Fr |
| Nutrição enteral / medicação | 8–12 Fr (sonda fina) |
| Paciente intubado / alto risco de aspiração | Preferir orogástrica se o protocolo indicar |

### Confirmação de posição

| Método | Comentário |
| --- | --- |
| pH do aspirado ≤ 5,5 | Preferido quando disponível e sem IBP recentes que o alterem |
| Radiografia | Padrão-ouro em dúvida, nutrição programada ou paciente crítico |
| Ausculta epigástrica isolada | **Insuficiente** como único critério |

### Evidência e recomendações

> **ASPEN / ESPEN (nutrição clínica):** verificar localização gástrica antes de iniciar nutrição enteral; não confiar apenas na ausculta (McClave et al.; Singer et al.).

> **Cuidados críticos:** a má posição pulmonar de uma SNG pode causar pneumonia, pneumotórax ou morte; confirmar sempre antes do uso (práticas de segurança do paciente).

### Cuidados posteriores

- Higiene nasal e oral diária; rotacionar o ponto de fixação para prevenir úlcera por pressão.
- Vigiar epistaxe, sinusite, odinofagia, vômitos, distensão abdominal e sinais de aspiração.
- Na nutrição: elevar a cabeceira ≥ 30° se não houver contraindicação; controlar resíduo gástrico conforme protocolo local.
- Não irrigar com força diante de obstrução; avaliar recolocação.

### Complicações — interromper e comunicar

- Suspeita de colocação pulmonar (tosse, dessaturação, ausência de aspirado gástrico).
- Epistaxe abundante ou hematoma septal.
- Perfuração esofágica ou mediastinite (dor intensa, enfisema subcutâneo).
- Pneumotórax após tentativa falha.
- Úlcera nasal por fixação inadequada.`,
    bibliography: [
      {
        citation:
          'McClave SA, Taylor BE, Martindale RG, et al. Guidelines for the Provision and Assessment of Nutrition Support Therapy in the Adult Critically Ill Patient (SCCM/ASPEN). JPEN J Parenter Enteral Nutr. 2016 (e atualizações).',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26773077/',
      },
      {
        citation:
          'Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30348463/',
      },
      {
        citation: 'SATI — Comitê de Nutrição. Recomendações de suporte nutricional no paciente crítico.',
        url: 'https://www.sati.org.ar/',
      },
      {
        citation:
          'National Patient Safety Agency (NPSA) / NHS. Reducing the harm caused by misplaced nasogastric feeding tubes in adults.',
        url: 'https://www.england.nhs.uk/patient-safety/',
      },
      {
        citation:
          'Boullata JI, Carrera AL, Harvey L, et al. ASPEN Safe Practices for Enteral Nutrition Therapy. JPEN. 2017.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28068900/',
      },
    ],
  },
];

for (const p of en) {
  writeLocale('en', p.category, p);
}

for (const p of pt) {
  writeLocale('pt-BR', p.category, p);
}

console.log('EN complete; pt-BR partial (sng-001). Remaining pt-BR in apply-protocol-locales-sng-uro-pt.mjs');
