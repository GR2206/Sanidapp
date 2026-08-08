/**
 * Clinical EN / pt-BR overlays for IV-calc drug batch.
 * Source of truth for doses: Spanish monographs under content/branches/.../drugs/
 * @type {Record<string, { en: object, pt: object }>}
 */
export const IV_LOCALE_OVERRIDES = {
  'adr-001': {
    en: {
      name: 'Epinephrine (adrenaline)',
      executiveSummary:
        'Catecholamine. Adult cardiac arrest: **1 mg IV/IO every 3–5 min**. Pediatric arrest: **0.01 mg/kg** (max 1 mg). Anaphylaxis IM: adult **0.3–0.5 mg**; ped **0.01 mg/kg** (max 0.5). Shock infusion: **0.05–1 mcg/kg/min**.',
      indications:
        '## Indications\n\n- Cardiac arrest (ACLS/PALS/NRP).\n- Anaphylaxis; refractory severe asthma (selected regimens).\n- Shock / symptomatic bradycardia with continuous infusion.\n\n## Precautions\n\n- Arrhythmias, hypertension, myocardial ischemia; extravasation → necrosis.\n- Distinguish concentrations **1:1000 (1 mg/mL)** vs **1:10,000 (0.1 mg/mL)**.\n\n> In cardiac arrest do not delay epinephrine; prefer IV/IO.',
      adulto: {
        presentation: 'Ampule 1 mg/mL (1:1000) or 0.1 mg/mL (1:10,000).',
        dose: 'Arrest: **1 mg IV/IO every 3–5 min**. Anaphylaxis IM: **0.3–0.5 mg** (repeat every 5–15 min). Infusion: **0.05–0.5 mcg/kg/min** (up to **1 mcg/kg/min**) titrated.',
        administration: 'IV/IO in arrest; IM anterolateral thigh in anaphylaxis; infusion via pump (central preferred).',
        notes: 'Monitor ECG, BP, and infusion site.',
      },
      pediatrico: {
        presentation: 'Ampule 1 mg/mL; dilute to 0.1 mg/mL for arrest if using 1:1000.',
        diluent: '0.9% NaCl or D5W for arrest dilution.',
        finalConcentration: 'Arrest: **0.1 mg/mL**. Infusion: e.g. **16–32 mcg/mL** (e.g. 0.6 mg in 25–50 mL NS).',
        dose: 'Arrest: **0.01 mg/kg IV/IO** (max **1 mg**) every 3–5 min. Anaphylaxis IM: **0.01 mg/kg** (max **0.5 mg**). Infusion: **0.05–1 mcg/kg/min** (usual max **2 mcg/kg/min**).',
        administration: 'IV/IO/IM per indication; infusion only via pump.',
        notes: 'Do not use if brown/precipitated. Discard remainder.',
      },
      neonatal: {
        presentation: 'Prefer 0.1 mg/mL (1:10,000) when available.',
        dose: 'Neonatal CPR: **0.01–0.03 mg/kg IV/IO** (NRP); endotracheal only if no vascular access (**0.05–0.1 mg/kg**). Infusion: **0.05–1 mcg/kg/min**.',
        administration: 'Umbilical / IV; pump for infusion.',
        notes: 'Follow current institutional NRP algorithm.',
      },
      stability: '## Stability\n\n- Protect from light. Discard if discolored or precipitated. Pump dilutions: follow local guide (usually 24 h).',
      adverseEffects: '## Adverse effects\n\nTachycardia, hypertension, arrhythmias, anxiety, hyperglycemia, necrosis from extravasation.',
    },
    pt: {
      name: 'Adrenalina (epinefrina)',
      executiveSummary:
        'Catecolamina. PCR adulto: **1 mg IV/IO a cada 3–5 min**. Pediatria PCR: **0,01 mg/kg** (máx. 1 mg). Anafilaxia IM: adulto **0,3–0,5 mg**; ped **0,01 mg/kg** (máx. 0,5). Infusão no choque: **0,05–1 mcg/kg/min**.',
      indications:
        '## Indicações\n\n- Parada cardiorrespiratória (ACLS/PALS/NRP).\n- Anafilaxia; asma grave refratária (esquemas).\n- Choque / bradicardia sintomática com infusão contínua.\n\n## Precauções\n\n- Arritmias, hipertensão, isquemia miocárdica; extravasamento → necrose.\n- Diferenciar concentrações **1:1000 (1 mg/mL)** vs **1:10.000 (0,1 mg/mL)**.\n\n> Na PCR não atrasar a adrenalina; preferir via IV/IO.',
      adulto: {
        presentation: 'Ampola 1 mg/mL (1:1000) ou 0,1 mg/mL (1:10.000).',
        dose: 'PCR: **1 mg IV/IO a cada 3–5 min**. Anafilaxia IM: **0,3–0,5 mg** (repetir a cada 5–15 min). Infusão: **0,05–0,5 mcg/kg/min** (até **1 mcg/kg/min**) ajustada.',
        administration: 'IV/IO na PCR; IM anterolateral da coxa na anafilaxia; infusão em bomba (central preferível).',
        notes: 'Monitorar ECG, PA e local da infusão.',
      },
      pediatrico: {
        presentation: 'Ampola 1 mg/mL; diluir para 0,1 mg/mL na PCR se usar 1:1000.',
        diluent: 'NaCl 0,9% ou SG 5% para diluição na PCR.',
        finalConcentration: 'PCR: **0,1 mg/mL**. Infusão: ex. **16–32 mcg/mL** (ex. 0,6 mg em 25–50 mL SF).',
        dose: 'PCR: **0,01 mg/kg IV/IO** (máx. **1 mg**) a cada 3–5 min. Anafilaxia IM: **0,01 mg/kg** (máx. **0,5 mg**). Infusão: **0,05–1 mcg/kg/min** (máx. habitual **2 mcg/kg/min**).',
        administration: 'IV/IO/IM conforme indicação; infusão só em bomba.',
        notes: 'Não usar se solução marrom/precipitada. Desprezar o restante.',
      },
      neonatal: {
        presentation: 'Preferir 0,1 mg/mL (1:10.000) quando disponível.',
        dose: 'RCP neonatal: **0,01–0,03 mg/kg IV/IO** (NRP); endotraqueal só se não houver acesso vascular (**0,05–0,1 mg/kg**). Infusão: **0,05–1 mcg/kg/min**.',
        administration: 'Via umbilical / IV; bomba para infusão.',
        notes: 'Seguir algoritmo NRP vigente do centro.',
      },
      stability: '## Estabilidade\n\n- Proteger da luz. Desprezar se coloração ou precipitado. Diluições de bomba: seguir guia local (habitual 24 h).',
      adverseEffects: '## Efeitos adversos\n\nTaquicardia, hipertensão, arritmias, ansiedade, hiperglicemia, necrose por extravasamento.',
    },
  },

  'nor-001': {
    en: {
      name: 'Norepinephrine (noradrenaline)',
      executiveSummary:
        'First-line vasopressor in septic shock. Adult: start **0.05–0.1 mcg/kg/min** (or **4–8 mcg/min**) titrate to MAP. Pediatrics/NICU: **0.05–1 mcg/kg/min** (usual max **2 mcg/kg/min**). Central line + pump.',
      indications:
        '## Indications\n\n- Vasodilated shock (septic) with hypotension despite volume.\n- Other shocks with low SVR.\n\n## Precautions\n\n- Digital/mesenteric ischemia; arrhythmias; extravasation → necrosis (treat with local phentolamine per protocol).\n- Prefer D5W as diluent in many institutional guides (oxidation in NS).\n\n> Does not replace fluid resuscitation or treatment of the cause.',
      adulto: {
        presentation: 'Ampule 1 mg/mL (often 4 mL = 4 mg).',
        diluent: 'Prefer D5W; NS per local monograph.',
        finalConcentration: 'E.g. 4–16 mcg/mL (service guide).',
        dose: 'Start **0.05–0.1 mcg/kg/min** or **4–8 mcg/min**; titrate (common ranges **8–12 mcg/min**; high **>30 mcg/min** ICU only).',
        infusionRate: 'Continuous infusion via pump.',
        administration: 'Central IV preferred; never IM.',
        notes: 'Monitor MAP, lactate, urine output, peripheral perfusion.',
      },
      pediatrico: {
        presentation: 'Ampules 4 mL: 1 mg/mL.',
        diluent: 'Prefer D5W.',
        finalConcentration: 'Usual **4 mcg/mL**; fluid restriction **16 mcg/mL**.',
        dose: '**0.05–1 mcg/kg/min**; usual max **2 mcg/kg/min**.',
        infusionRate: 'Pump only.',
        administration: 'IV.',
        notes: 'Do not use if brown discoloration. Discard remainder.',
      },
      neonatal: {
        presentation: 'Ampule 1 mg/mL; NICU dilution.',
        diluent: 'Prefer D5W.',
        finalConcentration: 'E.g. **4–16 mcg/mL** (NICU guide).',
        dose: '**0.05–1 mcg/kg/min** continuous IV; titrate to MAP/perfusion (common max **1–2 mcg/kg/min**).',
        infusionRate: 'Pump; central line preferred.',
        administration: 'IV.',
        notes: 'Invasive monitoring when available.',
      },
      stability: '## Stability\n\n- Protect from light. Pump dilution: ~24 h at room temperature (local guide). Discard if oxidized.',
      adverseEffects: '## Adverse effects\n\nHypertension, reflex bradycardia, ischemia, necrosis from extravasation, arrhythmias.',
    },
    pt: {
      name: 'Noradrenalina (norepinefrina)',
      executiveSummary:
        'Vasopressor de 1ª linha no choque séptico. Adulto: início **0,05–0,1 mcg/kg/min** (ou **4–8 mcg/min**) ajustar à PAM. Pediatria/UTIN: **0,05–1 mcg/kg/min** (máx. habitual **2 mcg/kg/min**). Via central + bomba.',
      indications:
        '## Indicações\n\n- Choque vasodilatado (séptico) com hipotensão apesar de volume.\n- Outros choques com RVS baixa.\n\n## Precauções\n\n- Isquemia digital/mesentérica; arritmias; extravasamento → necrose (tratar com fentolamina local conforme protocolo).\n- Preferir glicose 5% como diluente em muitos guias (oxidação em SF).\n\n> Não substitui reanimação com fluidos nem o tratamento da causa.',
      adulto: {
        presentation: 'Ampola 1 mg/mL (frequente 4 mL = 4 mg).',
        diluent: 'Preferível SG 5%; SF conforme ficha local.',
        finalConcentration: 'Ex. 4–16 mcg/mL (guia do serviço).',
        dose: 'Início **0,05–0,1 mcg/kg/min** ou **4–8 mcg/min**; ajustar (faixas frequentes **8–12 mcg/min**; altas **>30 mcg/min** só UTI).',
        infusionRate: 'Infusão contínua em bomba.',
        administration: 'IV central preferida; nunca IM.',
        notes: 'Monitorar PAM, lactato, diurese, perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampolas 4 mL: 1 mg/mL.',
        diluent: 'Preferível SG 5%.',
        finalConcentration: 'Usual **4 mcg/mL**; restrição hídrica **16 mcg/mL**.',
        dose: '**0,05–1 mcg/kg/min**; máx. habitual **2 mcg/kg/min**.',
        infusionRate: 'Só bomba.',
        administration: 'IV.',
        notes: 'Não usar se coloração marrom. Desprezar o restante.',
      },
      neonatal: {
        presentation: 'Ampola 1 mg/mL; diluição UTIN.',
        diluent: 'Preferível SG 5%.',
        finalConcentration: 'Ex. **4–16 mcg/mL** (guia UTIN).',
        dose: '**0,05–1 mcg/kg/min** IV contínuo; ajustar à PAM/perfusão (máx. frequente **1–2 mcg/kg/min**).',
        infusionRate: 'Bomba; via central preferida.',
        administration: 'IV.',
        notes: 'Monitorização invasiva quando disponível.',
      },
      stability: '## Estabilidade\n\n- Proteger da luz. Diluição em bomba: ~24 h à temperatura ambiente (guia local). Desprezar se oxidada.',
      adverseEffects: '## Efeitos adversos\n\nHipertensão, bradicardia reflexa, isquemia, necrose por extravasamento, arritmias.',
    },
  },

  'vas-001': {
    en: {
      name: 'Vasopressin',
      executiveSummary:
        'Antidiuretic hormone at vasopressor doses. Adult septic shock: **0.03 units/min** fixed (range **0.01–0.04 units/min**) as adjunct to norepinephrine. Pediatrics: **0.0005–0.002 units/kg/min** (**0.03–0.12 units/kg/h**). No rapid bolus unless protocol.',
      indications:
        '## Indications\n\n- Refractory vasodilated shock / adjunct in sepsis (Surviving Sepsis).\n- Central diabetes insipidus and variceal GI bleeding: **different regimens and higher doses** — do not confuse with shock dosing.\n\n## Precautions\n\n- Digital, mesenteric, coronary ischemia; relative hyponatremia; ↓ cardiac output if excessive afterload.\n- Central line preferred. Does not replace volume or antibiotics.\n- Common ampules: **20 units/mL**.\n\n> In shock, use “low fixed” doses; exceeding 0.04 units/min usually adds little benefit and increases ischemia.',
      adulto: {
        presentation: 'Ampule 20 units/mL.',
        dose: 'Septic shock: **0.03 units/min** continuous IV (alternative titration **0.01–0.04 units/min**). Varices (other regimen): often **0.2–0.4 units/min** — hepatology/GI protocol only.',
        administration: 'Dilute in NS/D5W (common max conc. **1 unit/mL**); continuous pump.',
        notes: 'Monitor BP, lactate, peripheral perfusion, and urine output.',
      },
      pediatrico: {
        presentation: 'Ampule 20 units/mL.',
        dose: 'Refractory shock: **0.0005–0.002 units/kg/min** (approx. **0.03–0.12 units/kg/h**); some protocols use up to **0.15 units/kg/h** — infectious diseases/ICU.',
        administration: 'IV; dilute NS/D5W; max **1 unit/mL**.',
        notes: 'Once diluted: discard ~18 h at room temperature / ~24 h refrigerated (local guide).',
      },
      neonatal: {
        presentation: 'Ampule 20 units/mL; specialized NICU use.',
        dose: 'Refractory shock: **0.0003–0.002 units/kg/min** continuous IV (approx. **0.02–0.12 units/kg/h**); titrate with monitoring — neonatology.',
        administration: 'Central IV + pump; dilute NS/D5W (max ~1 unit/mL).',
        notes: 'High ischemic risk — specialist only.',
      },
      stability: '## Stability\n\n- Dilution: follow package insert/local guide (~18–24 h).',
      adverseEffects: '## Adverse effects\n\nPeripheral/mesenteric ischemia, hypertension, bradycardia, arrhythmias, hyponatremia, skin necrosis if extravasation.',
    },
    pt: {
      name: 'Vasopressina',
      executiveSummary:
        'Hormônio antidiurético em doses vasopressoras. Choque séptico adulto: **0,03 UI/min** fixo (faixa **0,01–0,04 UI/min**) como adjuvante à noradrenalina. Pediatria: **0,0005–0,002 UI/kg/min** (**0,03–0,12 UI/kg/h**). Sem bolo rápido salvo protocolo.',
      indications:
        '## Indicações\n\n- Choque vasodilatado refratário / adjuvante na sepse (Surviving Sepsis).\n- Diabetes insípida central e hemorragia digestiva varicosa: **esquemas distintos e doses maiores** — não confundir com doses de choque.\n\n## Precauções\n\n- Isquemia digital, mesentérica, coronária; hiponatremia relativa; ↓ débito se pós-carga excessiva.\n- Via central preferível. Não substitui volume nem antibióticos.\n- Ampolas frequentes: **20 UI/mL**.\n\n> No choque, doses “fixas baixas”; subir acima de 0,04 UI/min geralmente não acrescenta e aumenta isquemia.',
      adulto: {
        presentation: 'Ampola 20 UI/mL.',
        dose: 'Choque séptico: **0,03 UI/min** IV contínuo (alternativa titulação **0,01–0,04 UI/min**). Varizes (outro esquema): frequentemente **0,2–0,4 UI/min** — só hepatologia/protocolo GI.',
        administration: 'Diluir em SF/SG 5% (máx. conc. freq. **1 UI/mL**); bomba contínua.',
        notes: 'Monitorar PA, lactato, perfusão periférica e diurese.',
      },
      pediatrico: {
        presentation: 'Ampola 20 UI/mL.',
        dose: 'Choque refratário: **0,0005–0,002 UI/kg/min** (equiv. orient. **0,03–0,12 UI/kg/h**); alguns protocolos usam até **0,15 UI/kg/h** — infectologia/UTI.',
        administration: 'IV; diluir SF/SG 5%; máx. **1 UI/mL**.',
        notes: 'Diluído: desprezar ~18 h T° amb / ~24 h refrigerado (guia local).',
      },
      neonatal: {
        presentation: 'Ampola 20 UI/mL; uso UTIN especializado.',
        dose: 'Choque refratário: **0,0003–0,002 UI/kg/min** IV contínuo (orient. **0,02–0,12 UI/kg/h**); ajustar com monitorização — neonatologia.',
        administration: 'IV central + bomba; diluir SF/SG 5% (máx. ~1 UI/mL).',
        notes: 'Risco isquêmico elevado — só especialista.',
      },
      stability: '## Estabilidade\n\n- Diluição: seguir bula/guia local (~18–24 h).',
      adverseEffects: '## Efeitos adversos\n\nIsquemia periférica/mesentérica, hipertensão, bradicardia, arritmias, hiponatremia, necrose cutânea se extravasamento.',
    },
  },

  'teo-001': {
    en: {
      name: 'Aminophylline',
      executiveSummary:
        'Methylxanthine. Adult: load **5–6 mg/kg** slow IV; maintenance **0.5–0.7 mg/kg/h**. Pediatrics load **7 mg/kg**; maint. **0.4–0.8 mg/kg/h** by age. Neonatal apnea: load **5 mg/kg**; maint. **2.5 mg/kg every 12 h** (**5 mg/kg/day**).',
      indications:
        '## Indications\n\n- Apnea of prematurity (alternative/adjunct to caffeine per center).\n- Bronchospasm / diaphragmatic support in selected regimens.\n\n## Precautions\n\n- Narrow therapeutic window: tachycardia, vomiting, seizures.\n- Interactions: ↑ levels with macrolides/quinolones; ↓ with rifampin/phenobarbital/phenytoin.\n\n> Titrate with serum levels when available.',
      adulto: {
        presentation: 'Ampule 24 mg/mL (aminophylline ≈ theophylline equivalent per monograph).',
        dose: 'Load **5–6 mg/kg IV** over 20–30 min; maintenance **0.5–0.7 mg/kg/h** continuous IV.',
        administration: 'Slow IV / pump; preferably dilute in NS or D5W (usual conc. **1 mg/mL**, max **25 mg/mL**).',
        notes: 'Bronchodilator target orient. peak **10–15 µg/mL**.',
      },
      pediatrico: {
        presentation: 'Ampules 10 mL: 24 mg/mL.',
        diluent: '0.9% NS or D5W.',
        finalConcentration: 'Usual **1 mg/mL** (max **25 mg/mL**).',
        dose: 'IV load: **7 mg/kg** over 20–30 min. Maintenance: **1–6 months 0.4 mg/kg/h**; **6–12 months 0.6 mg/kg/h**; **1–9 years 0.8 mg/kg/h**; **≥10 years 0.7 mg/kg/h**.',
        infusionRate: 'Load 20–30 min via pump.',
        administration: 'IV.',
        notes: 'Neonatal apnea: see neonatal profile. Monitor levels.',
      },
      neonatal: {
        presentation: 'Ampule 24 mg/mL.',
        dose: 'Neonatal apnea: load **5 mg/kg IV** over 20–30 min; maintenance **2.5 mg/kg/dose every 12 h** (**5 mg/kg/day**) — adjust with levels (common target **3–10 µg/mL**).',
        administration: 'IV via pump; dilute NS/D5W (usual conc. 1 mg/mL).',
        notes: 'Watch HR, vomiting, seizures.',
      },
      stability: '## Stability\n\n- Opened ampule: discard remainder. Dilutions: follow local guide (~24 h).',
      adverseEffects: '## Adverse effects\n\nIrritability, tachycardia, arrhythmias, vomiting, seizures, hypokalemia (with β-agonists).',
    },
    pt: {
      name: 'Aminofilina',
      executiveSummary:
        'Metilxantina. Adulto: carga **5–6 mg/kg** IV lento; manutenção **0,5–0,7 mg/kg/h**. Pediatria carga **7 mg/kg**; mant. **0,4–0,8 mg/kg/h** conforme idade. Apneia RN: carga **5 mg/kg**; mant. **2,5 mg/kg a cada 12 h** (**5 mg/kg/dia**).',
      indications:
        '## Indicações\n\n- Apneia da prematuridade (alternativa/complemento à cafeína conforme o centro).\n- Broncoespasmo / suporte diafragmático em esquemas selecionados.\n\n## Precauções\n\n- Margem terapêutica estreita: taquicardia, vômitos, convulsões.\n- Interações: ↑ níveis com macrolídeos/quinolonas; ↓ com rifampicina/fenobarbital/fenitoína.\n\n> Ajustar com níveis séricos quando disponíveis.',
      adulto: {
        presentation: 'Ampola 24 mg/mL (aminofilina ≈ teofilina equivalente conforme ficha).',
        dose: 'Carga **5–6 mg/kg IV** em 20–30 min; manutenção **0,5–0,7 mg/kg/h** IV contínuo.',
        administration: 'IV lenta / bomba; diluir preferencialmente em SF ou SG 5% (conc. habitual **1 mg/mL**, máx. **25 mg/mL**).',
        notes: 'Meta broncodilatadora orient. pico **10–15 µg/mL**.',
      },
      pediatrico: {
        presentation: 'Ampolas 10 mL: 24 mg/mL.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: 'Habitual **1 mg/mL** (máx. **25 mg/mL**).',
        dose: 'Carga IV: **7 mg/kg** em 20–30 min. Manutenção: **1–6 meses 0,4 mg/kg/h**; **6–12 meses 0,6 mg/kg/h**; **1–9 anos 0,8 mg/kg/h**; **≥10 anos 0,7 mg/kg/h**.',
        infusionRate: 'Carga 20–30 min com bomba.',
        administration: 'IV.',
        notes: 'Apneia RN: ver perfil neonatal. Monitorar níveis.',
      },
      neonatal: {
        presentation: 'Ampola 24 mg/mL.',
        dose: 'Apneia do RN: carga **5 mg/kg IV** em 20–30 min; manutenção **2,5 mg/kg/dose a cada 12 h** (**5 mg/kg/dia**) — ajustar com níveis (meta freq. **3–10 µg/mL**).',
        administration: 'IV em bomba; diluir SF/SG 5% (conc. habitual 1 mg/mL).',
        notes: 'Vigiar FC, vômitos, convulsões.',
      },
      stability: '## Estabilidade\n\n- Ampola aberta: desprezar o restante. Diluições: seguir guia local (~24 h).',
      adverseEffects: '## Efeitos adversos\n\nIrritabilidade, taquicardia, arritmias, vômitos, convulsões, hipocalemia (com β-agonistas).',
    },
  },

  'ins-001': {
    en: {
      name: 'Regular insulin',
      executiveSummary:
        'Regular (short-acting) insulin. Adult/ped DKA: bolus **0.05–0.1 units/kg** then **0.05–0.1 units/kg/h** IV. Neonatal hyperglycemia: **0.01–0.05 units/kg/h**. Hyperkalemia: **0.1 units/kg** with glucose.',
      indications:
        '## Indications\n\n- Diabetic ketoacidosis and hyperosmolar hyperglycemic state.\n- Glycemic control in ICU.\n- Correction of hyperkalemia (with glucose).\n\n## Practical identification\n\n- Short-acting / regular (usual yellow label — confirm local packaging).\n- Distinguish from NPH (intermediate).\n\n## Precautions\n\n- Hypoglycemia and hypokalemia. Frequent capillary glucose during infusion.\n\n> Titrate per institutional DKA/ICU protocol.',
      adulto: {
        presentation: 'Vial 100 units/mL (regular).',
        dose: 'DKA: bolus **0.1 units/kg IV** then infusion **0.1 units/kg/h** titrated to glucose. Hyperkalemia: **10 units** IV with glucose (or **0.1 units/kg**).',
        administration: 'IV pump (dilute e.g. **1 unit/mL** in NS) or SC.',
        notes: 'Hold/reduce if glucose falls rapidly; replace K+ per DKA protocol.',
      },
      pediatrico: {
        presentation: 'Vial/ampule 100 units/mL.',
        diluent: '0.9% NS (usual); D5–D10W per protocol.',
        dose: 'DKA: bolus **0.05–0.1 units/kg IV** then **0.05–0.1 units/kg/h**. Hyperkalemia: **0.1 units/kg** with glucose.',
        infusionRate: 'Continuous pump.',
        administration: 'IV or SC.',
        notes: 'Watch for hypoglycemia, tachycardia, pallor, hypokalemia.',
      },
      neonatal: {
        presentation: '100 units/mL; NICU dilution (e.g. 0.1–1 unit/mL).',
        dose: 'Neonatal hyperglycemia: **0.01–0.05 units/kg/h** continuous IV; titrate to glucose.',
        administration: 'IV pump.',
        notes: 'Neonatology only; high hypoglycemia risk.',
      },
      stability: '## Stability\n\n- Opened vial: ~28 days refrigerated (package insert). Diluted infusion: ~24 h.',
      adverseEffects: '## Adverse effects\n\nHypoglycemia, hypokalemia, rare allergy, lipodystrophy (chronic SC).',
    },
    pt: {
      name: 'Insulina regular (corrente)',
      executiveSummary:
        'Insulina regular (ação rápida). CAD adulto/ped: bolo **0,05–0,1 UI/kg** depois **0,05–0,1 UI/kg/h** IV. Hiperglicemia UTIN: **0,01–0,05 UI/kg/h**. Hipercalemia: **0,1 UI/kg** com glicose.',
      indications:
        '## Indicações\n\n- Cetoacidose diabética e estado hiperglicêmico hiperosmolar.\n- Controle glicêmico em UTI.\n- Correção de hipercalemia (com glicose).\n\n## Identificação prática\n\n- Ação rápida / regular (etiqueta amarela habitual — confirmar embalagem local).\n- Diferenciar de NPH (intermediária).\n\n## Precauções\n\n- Hipoglicemia e hipocalemia. Glicemia capilar frequente na infusão.\n\n> Ajustar conforme protocolo de CAD/UTI do centro.',
      adulto: {
        presentation: 'Frasco 100 UI/mL (regular).',
        dose: 'CAD: bolo **0,1 UI/kg IV** depois infusão **0,1 UI/kg/h** ajustada à glicemia. Hipercalemia: **10 UI** IV com glicose (ou **0,1 UI/kg**).',
        administration: 'IV bomba (diluir ex. **1 UI/mL** em SF) ou SC.',
        notes: 'Suspender/reduzir se glicemia cair rápido; repor K+ conforme protocolo CAD.',
      },
      pediatrico: {
        presentation: 'Frasco/ampola 100 UI/mL.',
        diluent: 'SF 0,9% (habitual); SG 5–10% conforme protocolo.',
        dose: 'CAD: bolo **0,05–0,1 UI/kg IV** depois **0,05–0,1 UI/kg/h**. Hipercalemia: **0,1 UI/kg** com glicose.',
        infusionRate: 'Bomba contínua.',
        administration: 'IV ou SC.',
        notes: 'Vigiar hipoglicemia, taquicardia, palidez, hipocalemia.',
      },
      neonatal: {
        presentation: '100 UI/mL; diluição UTIN (ex. 0,1–1 UI/mL).',
        dose: 'Hiperglicemia UTIN: **0,01–0,05 UI/kg/h** IV contínuo; ajustar à glicemia.',
        administration: 'IV bomba.',
        notes: 'Só neonatologia; risco alto de hipoglicemia.',
      },
      stability: '## Estabilidade\n\n- Frasco aberto: ~28 dias refrigerado (bula). Infusão diluída: ~24 h.',
      adverseEffects: '## Efeitos adversos\n\nHipoglicemia, hipocalemia, alergia rara, lipodistrofia (SC crônico).',
    },
  },

  'dop-001': {
    en: {
      name: 'Dopamine',
      executiveSummary:
        'Dose-dependent catecholamine. Usual ranges: **2–5 mcg/kg/min** (dopaminergic), **5–10 mcg/kg/min** (inotropic), **10–20 mcg/kg/min** (vasopressor). Pediatrics/NICU: **2–20 mcg/kg/min** (common max **50 mcg/kg/min**). Central line + pump.',
      indications:
        '## Indications\n\n- Shock with low output / hypotension when inotropy ± vasoconstriction is desired.\n- Historical “renal” low-dose use: limited evidence vs norepinephrine in sepsis.\n\n## Precautions\n\n- Tachycardia, arrhythmias, peripheral vasoconstriction at high doses; extravasation → necrosis.\n- Incompatible with alkaline solutions (bicarbonate).\n\n> Titrate to MAP/perfusion; prefer central line.',
      adulto: {
        presentation: 'Ampule 40 mg/mL (5 mL) or institutional vial.',
        diluent: '0.9% NS or D5W (not alkaline).',
        finalConcentration: 'E.g. **800 mcg/mL** (200 mg in 250 mL) or **1600 mcg/mL** (fluid restriction) — local guide.',
        dose: '**2–20 mcg/kg/min** continuous IV; titrate. Orient.: **2–5** dopaminergic; **5–10** inotropic; **10–20** vasopressor. Common max **20–50 mcg/kg/min** ICU only.',
        infusionRate: 'Continuous infusion pump only.',
        administration: 'Central IV preferred; never IM.',
        notes: 'Monitor HR, BP, urine output, and infusion site.',
      },
      pediatrico: {
        presentation: 'Ampules 5 mL: 40 mg/mL.',
        diluent: '0.9% NS, Ringer, or D5W.',
        finalConcentration: 'Usual **3.2 mg/mL**; up to **6 mg/mL** if fluid restriction.',
        dose: '**2–20 mcg/kg/min** continuous IV; usual max **50 mcg/kg/min**.',
        infusionRate: 'Pump.',
        administration: 'IV.',
        notes: 'Antagonized by beta-blockers; high-dose vasoconstriction by alpha-blockers. Discard if abnormal color.',
      },
      neonatal: {
        presentation: 'Ampule 40 mg/mL; NICU dilution.',
        diluent: '0.9% NS or D5W.',
        finalConcentration: 'E.g. **0.8–3.2 mg/mL** per NICU guide.',
        dose: '**2–10 mcg/kg/min** continuous IV (up to **20 mcg/kg/min** if refractory) — neonatology.',
        infusionRate: 'Pump; central line preferred.',
        administration: 'IV.',
        notes: 'Close BP and HR monitoring.',
      },
      stability: '## Stability\n\n- Pump dilution: ~24 h room temperature (local guide). Protect from light. Discard if oxidized.',
      adverseEffects: '## Adverse effects\n\nTachycardia, arrhythmias, hypertension/hypotension, nausea, vasoconstriction, necrosis from extravasation.',
    },
    pt: {
      name: 'Dopamina',
      executiveSummary:
        'Catecolamina dose-dependente. Faixas habituais: **2–5 mcg/kg/min** (dopaminérgico), **5–10 mcg/kg/min** (inotrópico), **10–20 mcg/kg/min** (vasopressor). Pediatria/UTIN: **2–20 mcg/kg/min** (máx. freq. **50 mcg/kg/min**). Via central + bomba.',
      indications:
        '## Indicações\n\n- Choque com baixo débito / hipotensão quando se busca inotropismo ± vasoconstrição.\n- Uso histórico “renal” em doses baixas: evidência limitada frente à noradrenalina na sepse.\n\n## Precauções\n\n- Taquicardia, arritmias, vasoconstrição periférica em doses altas; extravasamento → necrose.\n- Incompatível com soluções alcalinas (bicarbonato).\n\n> Ajustar à PAM/perfusão; preferir via central.',
      adulto: {
        presentation: 'Ampola 40 mg/mL (5 mL) ou frasco institucional.',
        diluent: 'SF 0,9% ou SG 5% (não alcalinas).',
        finalConcentration: 'Ex. **800 mcg/mL** (200 mg em 250 mL) ou **1600 mcg/mL** (restrição hídrica) — guia local.',
        dose: '**2–20 mcg/kg/min** IV contínuo; ajustar. Orient.: **2–5** dopaminérgico; **5–10** inotrópico; **10–20** vasopressor. Máx. freq. **20–50 mcg/kg/min** só UTI.',
        infusionRate: 'Só bomba de infusão contínua.',
        administration: 'IV central preferida; nunca IM.',
        notes: 'Monitorar FC, PA, diurese e local da infusão.',
      },
      pediatrico: {
        presentation: 'Ampolas 5 mL: 40 mg/mL.',
        diluent: 'SF 0,9%, Ringer ou SG 5%.',
        finalConcentration: 'Usual **3,2 mg/mL**; até **6 mg/mL** se restrição hídrica.',
        dose: '**2–20 mcg/kg/min** IV contínuo; máx. habitual **50 mcg/kg/min**.',
        infusionRate: 'Bomba.',
        administration: 'IV.',
        notes: 'Antagonizado por betabloqueadores; vasoconstrição em dose alta por alfabloqueadores. Desprezar se coloração anormal.',
      },
      neonatal: {
        presentation: 'Ampola 40 mg/mL; diluição UTIN.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: 'Ex. **0,8–3,2 mg/mL** conforme guia UTIN.',
        dose: '**2–10 mcg/kg/min** IV contínuo (até **20 mcg/kg/min** se refratário) — neonatologia.',
        infusionRate: 'Bomba; via central preferida.',
        administration: 'IV.',
        notes: 'Monitorização estreita de PA e FC.',
      },
      stability: '## Estabilidade\n\n- Diluição em bomba: ~24 h T° ambiente (guia local). Proteger da luz. Desprezar se oxidada.',
      adverseEffects: '## Efeitos adversos\n\nTaquicardia, arritmias, hipertensão/hipotensão, náuseas, vasoconstrição, necrose por extravasamento.',
    },
  },

  'dob-001': {
    en: {
      name: 'Dobutamine',
      executiveSummary:
        'Selective β1 inotrope. Adult/pediatrics: **2.5–20 mcg/kg/min** continuous IV (common max **40 mcg/kg/min**). NICU: **2–10 mcg/kg/min**. Do not use in dynamic LVOT obstruction.',
      indications:
        '## Indications\n\n- Low output / decompensated HF / cardiogenic shock needing inotropy.\n- Pharmacologic stress testing (different regimen).\n\n## Precautions\n\n- Tachycardia, arrhythmias, hypotension if vasodilation; contraindicated in dynamic LVOT obstruction.\n- Incompatible with alkaline solutions.\n\n> Titrate to cardiac index / MAP / lactate; central line preferred.',
      adulto: {
        presentation: 'Ampule 12.5 mg/mL (20 mL = 250 mg) or institutional vial.',
        diluent: '0.9% NS or D5W.',
        finalConcentration: 'E.g. **1000–2000 mcg/mL** (250–500 mg in 250 mL); common max **5 mg/mL**.',
        dose: '**2.5–20 mcg/kg/min** continuous IV; titrate. Usual max **40 mcg/kg/min**.',
        infusionRate: 'Pump only.',
        administration: 'Continuous IV; central line preferred.',
        notes: 'Slight pink color = mild oxidation without clear potency loss; discard if brown/precipitated.',
      },
      pediatrico: {
        presentation: 'Ampules 20 mL: 12.5 mg/mL.',
        diluent: '0.9% NS or D5W.',
        finalConcentration: 'Up to **5 mg/mL**.',
        dose: '**2–20 mcg/kg/min** continuous IV; common max **40 mcg/kg/min**.',
        infusionRate: 'Pump.',
        administration: 'IV.',
        notes: 'Orient. compatible with dopamine, epinephrine, lidocaine (verify local guide). Dilution ~24 h.',
      },
      neonatal: {
        presentation: 'Ampule 12.5 mg/mL; NICU dilution.',
        diluent: '0.9% NS or D5W.',
        finalConcentration: 'E.g. **1–5 mg/mL** per guide.',
        dose: '**2–10 mcg/kg/min** continuous IV; titrate — neonatology.',
        infusionRate: 'Pump; central line preferred.',
        administration: 'IV.',
        notes: 'Monitor HR, BP, and perfusion.',
      },
      stability: '## Stability\n\n- Dilution: ~24 h. Protect from light per local guide.',
      adverseEffects: '## Adverse effects\n\nTachycardia, arrhythmias, hypotension, nausea, anxiety, myocardial ischemia.',
    },
    pt: {
      name: 'Dobutamina',
      executiveSummary:
        'Inotrópico β1 seletivo. Adulto/pediatria: **2,5–20 mcg/kg/min** IV contínuo (máx. freq. **40 mcg/kg/min**). UTIN: **2–10 mcg/kg/min**. Não usar em obstrução dinâmica da via de saída do VE.',
      indications:
        '## Indicações\n\n- Baixo débito / ICC descompensada / choque cardiogênico com necessidade de inotropismo.\n- Testes de estresse farmacológico (esquema distinto).\n\n## Precauções\n\n- Taquicardia, arritmias, hipotensão se vasodilatação; contraindicada em obstrução dinâmica da via de saída do VE.\n- Incompatível com soluções alcalinas.\n\n> Ajustar ao índice cardíaco / PAM / lactato; via central preferível.',
      adulto: {
        presentation: 'Ampola 12,5 mg/mL (20 mL = 250 mg) ou frasco institucional.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: 'Ex. **1000–2000 mcg/mL** (250–500 mg em 250 mL); máx. freq. **5 mg/mL**.',
        dose: '**2,5–20 mcg/kg/min** IV contínuo; ajustar. Máx. habitual **40 mcg/kg/min**.',
        infusionRate: 'Só bomba.',
        administration: 'IV contínua; via central preferida.',
        notes: 'Cor rosa leve = oxidação leve sem perda clara de potência; desprezar se marrom/precipitado.',
      },
      pediatrico: {
        presentation: 'Ampolas 20 mL: 12,5 mg/mL.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: 'Até **5 mg/mL**.',
        dose: '**2–20 mcg/kg/min** IV contínuo; máx. freq. **40 mcg/kg/min**.',
        infusionRate: 'Bomba.',
        administration: 'IV.',
        notes: 'Compatível orient. com dopamina, adrenalina, lidocaína (verificar guia local). Diluição ~24 h.',
      },
      neonatal: {
        presentation: 'Ampola 12,5 mg/mL; diluição UTIN.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: 'Ex. **1–5 mg/mL** conforme guia.',
        dose: '**2–10 mcg/kg/min** IV contínuo; ajustar — neonatologia.',
        infusionRate: 'Bomba; via central preferida.',
        administration: 'IV.',
        notes: 'Monitorar FC, PA e perfusão.',
      },
      stability: '## Estabilidade\n\n- Diluição: ~24 h. Proteger da luz conforme guia local.',
      adverseEffects: '## Efeitos adversos\n\nTaquicardia, arritmias, hipotensão, náuseas, ansiedade, isquemia miocárdica.',
    },
  },

  'kcl-001': {
    en: {
      name: 'Potassium chloride',
      executiveSummary:
        'K⁺ replacement. Pediatrics: maint. **1–3 mEq/kg/day** (<1 y: **2–6**); symptomatic hypokalemia IV **0.5–1 mEq/kg/dose**. Usual rate **≤0.25 mEq/kg/h** (common max **20 mEq/h**). Never undiluted IV.',
      indications:
        '## Indications\n\n- Hypokalemia; replacement of losses; maintenance in fluid therapy.\n\n## Precautions\n\n- **Never give concentrate undiluted.** Risk of arrest from iatrogenic hyperkalemia.\n- CKD, potassium-sparing diuretics, ACEI/ARB, NSAIDs.\n- Correct concomitant hypomagnesemia.\n\n> 1 g KCl ≈ **13.5 mEq** K⁺. Common ampules **3 mEq/mL**.',
      adulto: {
        presentation: 'Ampules 10–20 mEq; premix bags; PO ER 8 mEq/cap.',
        dose: 'Typical replacement **10–40 mEq** per diluted dose; oral maint. **40–80 mEq/day** in divided doses (common max **20 mEq**/PO dose).',
        infusionRate: 'Peripheral usual **≤10 mEq/h**; with monitoring/central may be higher per protocol (common max **20 mEq/h**).',
        administration: 'IV **only diluted** (peripheral < **60 mEq/L**; central up to **150–200 mEq/L** orient.).',
        notes: 'ECG during rapid infusions.',
      },
      pediatrico: {
        presentation: 'Ampules **3 mEq/mL**; PO compounded solution ~3 mEq/mL; ER caps 8 mEq.',
        dose: 'Maintenance: **<1 y: 2–6 mEq/kg/day**; **>1 y: 1–3 mEq/kg/day**. Symptomatic hypokalemia IV: **0.5–1 mEq/kg/dose**. Asymptomatic PO: ~**3 mEq/kg/day** + losses.',
        administration: 'PO or diluted IV.',
        notes: 'Usual IV rate **≤0.25 mEq/kg/h**; common max **20 mEq/h**. Compatible NS/D5W.',
      },
      neonatal: {
        presentation: 'Ampule 3 mEq/mL; NICU dilution.',
        dose: 'Maintenance **1–2 mEq/kg/day** IV via pump; symptomatic correction **0.5–1 mEq/kg** slow under monitoring.',
        administration: 'Central IV preferred; never concentrated bolus.',
        notes: 'Neonatology + ECG if rapid correction.',
      },
      stability: '## Stability\n\n- Use dedicated line when possible; verify final concentration before connecting.',
      adverseEffects: '## Adverse effects\n\nPO: nausea, abdominal pain. IV: phlebitis, paresthesias, arrhythmias, block, arrest.',
    },
    pt: {
      name: 'Cloreto de potássio',
      executiveSummary:
        'Reposição de K⁺. Pediatria: mant. **1–3 mEq/kg/dia** (<1 a: **2–6**); hipocalemia sintomática IV **0,5–1 mEq/kg/dose**. Velocidade habitual **≤0,25 mEq/kg/h** (máx. freq. **20 mEq/h**). Nunca IV puro.',
      indications:
        '## Indicações\n\n- Hipocalemia; reposição de perdas; manutenção em fluidoterapia.\n\n## Precauções\n\n- **Nunca administrar concentrado sem diluir.** Risco de parada por hipercalemia iatrogênica.\n- IRC, diuréticos poupadores de K⁺, IECA/BRA, AINE.\n- Corrigir hipomagnesemia concomitante.\n\n> 1 g ClK ≈ **13,5 mEq** K⁺. Ampolas frequentes **3 mEq/mL**.',
      adulto: {
        presentation: 'Ampolas 10–20 mEq; bolsas pré-mistura; VO LP 8 mEq/cáps.',
        dose: 'Reposição típica **10–40 mEq** por dose diluída; mant. oral **40–80 mEq/dia** em doses divididas (máx. freq. **20 mEq**/toma VO).',
        infusionRate: 'Periferia habitual **≤10 mEq/h**; com monitorização/central pode ser maior conforme protocolo (máx. freq. **20 mEq/h**).',
        administration: 'IV **somente diluído** (periferia < **60 mEq/L**; central até **150–200 mEq/L** orient.).',
        notes: 'ECG durante infusões rápidas.',
      },
      pediatrico: {
        presentation: 'Ampolas **3 mEq/mL**; solução magistral VO ~3 mEq/mL; cáps. LP 8 mEq.',
        dose: 'Manutenção: **<1 a: 2–6 mEq/kg/dia**; **>1 a: 1–3 mEq/kg/dia**. Hipocalemia sintomática IV: **0,5–1 mEq/kg/dose**. VO assintomática: ~**3 mEq/kg/dia** + perdas.',
        administration: 'VO ou IV diluído.',
        notes: 'Velocidade IV habitual **≤0,25 mEq/kg/h**; máx. freq. **20 mEq/h**. Compatível SF/SG 5%.',
      },
      neonatal: {
        presentation: 'Ampola 3 mEq/mL; diluição UTIN.',
        dose: 'Manutenção **1–2 mEq/kg/dia** IV em bomba; correção sintomática **0,5–1 mEq/kg** lento sob monitorização.',
        administration: 'IV central preferida; nunca bolo concentrado.',
        notes: 'Neonatologia + ECG se correção rápida.',
      },
      stability: '## Estabilidade\n\n- Usar linha dedicada quando possível; verificar concentração final antes de conectar.',
      adverseEffects: '## Efeitos adversos\n\nVO: náuseas, dor abdominal. IV: flebite, parestesias, arritmias, bloqueio, parada.',
    },
  },

  'cac-001': {
    en: {
      name: 'Calcium chloride',
      executiveSummary:
        'Concentrated Ca²⁺ salt. Adult arrest: **1 g (10 mL of 10%)** IV/IO. Pediatrics: **0.1–0.2 mL/kg** (common hyperK max **3 mL**). NICU: **20 mg/kg** slow IV. More elemental Ca/mL than gluconate — do not interchange mL for mL.',
      indications:
        '## Indications\n\n- Symptomatic hypocalcemia; hyperkalemia with ECG changes; Ca²⁺-blocker overdose (protocols).\n- Arrest with suspected reversible cause (hyperK / hypoCa / Ca-blocker overdose).\n\n## Precautions\n\n- Extravasation → severe necrosis; prefer central line.\n- **Incompatible with bicarbonate, phosphate, and sulfate** (precipitates).\n- Do not interchange mL for mL with gluconate.\n\n> Ampule 10%: **100 mg/mL** CaCl₂ ≈ **1.4 mEq Ca²⁺/mL**.',
      adulto: {
        presentation: 'Ampule 10 mL of 10% (~13.6 mEq Ca /10 mL).',
        dose: 'Arrest / severe hyperK: **10 mL (1 g)** IV/IO; may repeat. Hypocalcemia: **5–10 mL (0.5–1 g)** slow IV every 6 h per ionized Ca.',
        administration: 'Slow IV/IO (< **0.5–1 mL/min** push); for infusion dilute ~**20 mg/mL** and infuse ~1 h.',
        notes: 'Stop if bradycardia. Compatible NS/D5W.',
      },
      pediatrico: {
        presentation: 'Ampules 10 mL: 100 mg/mL (1.4 mEq Ca²⁺/mL).',
        dose: 'Symptomatic hypocalcemia: **0.1–0.2 mL/kg** (**0.14–0.28 mEq/kg**) every 4–6 h. HyperK: **0.3 mL/kg** (common max **3 mL**/dose).',
        administration: 'Slow IV; dilute for infusion.',
        notes: 'Monitor ECG.',
      },
      neonatal: {
        presentation: 'Ampule 10%; NICU guide.',
        dose: '**20 mg/kg** (= **0.2 mL/kg** of 10%) slow IV in arrest/symptomatic hypocalcemia; may repeat per response.',
        administration: 'Central IV preferred; slow with monitoring.',
        notes: 'Avoid extravasation.',
      },
      stability: '## Stability\n\n- Do not mix with HCO₃⁻/PO₄³⁻ in the same line.',
      adverseEffects: '## Adverse effects\n\nBradycardia, hypotension if rapid; necrosis from extravasation; hypercalcemia.',
    },
    pt: {
      name: 'Cloreto de cálcio',
      executiveSummary:
        'Sal de Ca²⁺ concentrada. PCR adulto: **1 g (10 mL a 10%)** IV/IO. Pediatria: **0,1–0,2 mL/kg** (máx. freq. hiperK **3 mL**). UTIN: **20 mg/kg** IV lento. Mais Ca elemental/mL que gluconato — não intercambiar mL a mL.',
      indications:
        '## Indicações\n\n- Hipocalcemia sintomática; hiperpotassemia com alterações de ECG; intoxicação por bloqueadores de Ca²⁺ (protocolos).\n- PCR com causa reversível suspeitada (hiperK / hipoCa / overdose de bloqueadores de Ca).\n\n## Precauções\n\n- Extravasamento → necrose grave; preferir via central.\n- **Incompatível com bicarbonato, fosfato e sulfato** (precipita).\n- Não intercambiar mL a mL com gluconato.\n\n> Ampola 10%: **100 mg/mL** ClCa ≈ **1,4 mEq Ca²⁺/mL**.',
      adulto: {
        presentation: 'Ampola 10 mL a 10% (~13,6 mEq Ca /10 mL).',
        dose: 'PCR / hiperK grave: **10 mL (1 g)** IV/IO; pode repetir. Hipocalcemia: **5–10 mL (0,5–1 g)** IV lento a cada 6 h conforme Ca iônico.',
        administration: 'IV/IO lento (< **0,5–1 mL/min** push); para infusão diluir ~**20 mg/mL** e infundir ~1 h.',
        notes: 'Interromper se bradicardia. Compatível SF/SG 5%.',
      },
      pediatrico: {
        presentation: 'Ampolas 10 mL: 100 mg/mL (1,4 mEq Ca²⁺/mL).',
        dose: 'Hipocalcemia sintomática: **0,1–0,2 mL/kg** (**0,14–0,28 mEq/kg**) a cada 4–6 h. HiperK: **0,3 mL/kg** (máx. freq. **3 mL**/dose).',
        administration: 'IV lento; diluir para infusão.',
        notes: 'Monitorar ECG.',
      },
      neonatal: {
        presentation: 'Ampola 10%; guia UTIN.',
        dose: '**20 mg/kg** (= **0,2 mL/kg** a 10%) IV lento em PCR/hipocalcemia sintomática; pode repetir conforme resposta.',
        administration: 'IV central preferida; lento com monitorização.',
        notes: 'Evitar extravasamento.',
      },
      stability: '## Estabilidade\n\n- Não misturar com HCO₃⁻/PO₄³⁻ na mesma linha.',
      adverseEffects: '## Efeitos adversos\n\nBradicardia, hipotensão se rápido; necrose por extravasamento; hipercalcemia.',
    },
  },

  'bic-001': {
    en: {
      name: 'Sodium bicarbonate',
      executiveSummary:
        'HCO₃⁻. Acute acidosis: estimate **mEq = (desired HCO₃ − actual) × 0.3 × kg**. Orient. bolus **1–2 mEq/kg** diluted IV. NICU/selected arrest: **1–2 mEq/kg** slow. Always treat the cause; correct hypokalemia first.',
      indications:
        '## Indications\n\n- Selected severe metabolic acidosis; specific intoxications; refractory hyperK (regimens).\n- NRP: restricted use (not routine in arrest).\n\n## Precautions\n\n- Extravasation → necrosis. Na⁺ load. Alkalosis, hypocalcemia.\n- **Incompatible with calcium, magnesium, and atropine** in-line.\n\n> Ampule 1 M = **1 mEq/mL** (8.4%). Peripheral: dilute (e.g. 1/6).',
      adulto: {
        presentation: 'Ampule 1 mEq/mL (8.4%); also 0.5 M / PO.',
        dose: 'Selected situations: **1–2 mEq/kg** IV; or calculate **(desired − actual) × 0.3 × kg**. Infuse slowly (often >2 h if not emergency).',
        administration: 'Diluted IV; central line for high concentrations. Peripheral: dilute (e.g. to **0.5 mEq/mL**).',
        notes: 'Do not mix with calcium.',
      },
      pediatrico: {
        presentation: 'IV solution 1 M (1 mEq/mL); PO 10% compounded ~1.2 mEq/mL; caps 1 g ~ 12 mEq.',
        dose: 'Acute IV: **mEq = (desired − actual) × 0.3 × kg** (orient. bolus **1–2 mEq/kg**). Chronic PO: factor **0.6 × kg**.',
        diluent: '0.9% NS or D5W.',
        finalConcentration: 'Diluted peripheral; central up to 1 mEq/mL slow push.',
        infusionRate: 'Usual infusion 4–8 h via pump if not emergency.',
        administration: 'PO or IV.',
        notes: 'Correct hypokalemia before/during.',
      },
      neonatal: {
        presentation: '1 mEq/mL; NICU dilution.',
        dose: '**1–2 mEq/kg** slow IV in selected severe acidosis / NRP when indicated — not routine in arrest.',
        administration: 'Slow IV (dilute; prefer safe line).',
        notes: 'IVH risk if rapid bolus — neonatology.',
      },
      stability: '## Stability\n\n- Room temperature. Discard remainder of opened ampule. Do not mix with Ca²⁺.',
      adverseEffects: '## Adverse effects\n\nNecrosis from extravasation, alkalosis, hypernatremia, hypocalcemia, flatulence (PO).',
    },
    pt: {
      name: 'Bicarbonato de sódio',
      executiveSummary:
        'HCO₃⁻. Acidose aguda: estimar **mEq = (HCO₃ desejado − atual) × 0,3 × kg**. Orient. bolo **1–2 mEq/kg** IV diluído. UTIN/PCR selecionada: **1–2 mEq/kg** lento. Tratar sempre a causa; corrigir hipocalemia primeiro.',
      indications:
        '## Indicações\n\n- Acidose metabólica grave selecionada; intoxicações específicas; hiperK refratária (esquemas).\n- NRP: uso restrito (não rotineiro na PCR).\n\n## Precauções\n\n- Extravasamento → necrose. Carga de Na⁺. Alcalose, hipocalcemia.\n- **Incompatível com cálcio, magnésio e atropina** na linha.\n\n> Ampola 1 M = **1 mEq/mL** (8,4%). Periferia: diluir (ex. 1/6).',
      adulto: {
        presentation: 'Ampola 1 mEq/mL (8,4%); também 0,5 M / VO.',
        dose: 'Situações selecionadas: **1–2 mEq/kg** IV; ou calcular **(desejado − atual) × 0,3 × kg**. Infundir lento (frequentemente >2 h se não emergência).',
        administration: 'IV diluído; via central para concentrações altas. Periferia: diluir (ex. até **0,5 mEq/mL**).',
        notes: 'Não misturar com cálcio.',
      },
      pediatrico: {
        presentation: 'Solução IV 1 M (1 mEq/mL); VO 10% magistral ~1,2 mEq/mL; cáps. 1 g ~ 12 mEq.',
        dose: 'Aguda IV: **mEq = (desejado − atual) × 0,3 × kg** (orient. bolo **1–2 mEq/kg**). Crônica VO: fator **0,6 × kg**.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: 'Periferia diluída; central até 1 mEq/mL push lento.',
        infusionRate: 'Infusão habitual 4–8 h com bomba se não emergência.',
        administration: 'VO ou IV.',
        notes: 'Corrigir hipocalemia antes/durante.',
      },
      neonatal: {
        presentation: '1 mEq/mL; diluição UTIN.',
        dose: '**1–2 mEq/kg** IV lento em acidose grave selecionada / NRP quando indicado — não rotineiro na PCR.',
        administration: 'IV lenta (diluir; preferir via segura).',
        notes: 'Risco de hemorragia IVH se bolo rápido — neonatologia.',
      },
      stability: '## Estabilidade\n\n- T° ambiente. Desprezar restante de ampola aberta. Não misturar com Ca²⁺.',
      adverseEffects: '## Efeitos adversos\n\nNecrose por extravasamento, alcalose, hipernatremia, hipocalcemia, flatulência (VO).',
    },
  },

  'ket-001': {
    en: {
      name: 'Ketamine',
      executiveSummary:
        'Dissociative anesthesia / analgesia. IV induction **1–2 mg/kg** (IM **5 mg/kg**). Analgesia **0.1–0.5 mg/kg** bolus or **0.12–0.36 mg/kg/h**. Sedation infusion **0.25–2 mg/kg/h**. NICU: **0.5–2 mg/kg** IV / **0.5–1 mg/kg/h** — specialist.',
      indications:
        '## Indications\n\n- Brief induction/anesthesia; procedural analgesia; selected ICU sedation.\n- Intubation: **2–3 mg/kg** IV in pediatric regimens.\n\n## Precautions\n\n- ↑ BP/HR; sialorrhea; dreams/hallucinations. Caution with ICH, open globe injury, PHT.\n- Precipitates with diazepam in the same line.\n\n> Dilute to **1–10 mg/mL** for infusion (NS/D5W).',
      adulto: {
        presentation: 'Ampule 50 mg/mL.',
        dose: 'Analgesia: **0.1–0.3 mg/kg** bolus or **0.12–0.36 mg/kg/h**. Induction: **1–2 mg/kg IV**.',
        administration: 'Slow IV or infusion; dilute for drip.',
        notes: 'Monitor airway and BP.',
      },
      pediatrico: {
        presentation: 'Ampule 10 mL: 50 mg/mL.',
        diluent: '0.9% NS or D5W.',
        finalConcentration: 'Bolus up to 50 mg/mL; usual infusion **1–2 mg/mL** (orient. max 10 mg/mL).',
        dose: 'IV induction **1–2 mg/kg**; IM **5 mg/kg**. Infusion **0.25–2 mg/kg/h**. Analgesia **0.5–1 mg/kg**. Intubation **2–3 mg/kg**.',
        infusionRate: 'Bolus ~1 min.',
        administration: 'IV/IM.',
        notes: 'Relative contraindications: ICH, ocular trauma, PHT.',
      },
      neonatal: {
        presentation: '50 mg/mL; NICU dilution to 1–10 mg/mL.',
        dose: 'Analgesia/sedation: bolus **0.5–2 mg/kg IV** slow; infusion **0.5–1 mg/kg/h** titrated — neonatology/anesthesia only.',
        administration: 'IV.',
        notes: 'Restricted use; continuous monitoring.',
      },
      stability: '## Stability\n\n- Dilution: follow local guide (often days refrigerated per pharmacy). Strict asepsis.',
      adverseEffects: '## Adverse effects\n\nHypertension, tachycardia, sialorrhea, nystagmus, hallucinations, rare laryngospasm, ↑ ICP.',
    },
    pt: {
      name: 'Cetamina (ketamina)',
      executiveSummary:
        'Anestesia dissociativa / analgesia. Indução IV **1–2 mg/kg** (IM **5 mg/kg**). Analgesia **0,1–0,5 mg/kg** bolo ou **0,12–0,36 mg/kg/h**. Infusão sedação **0,25–2 mg/kg/h**. UTIN: **0,5–2 mg/kg** IV / **0,5–1 mg/kg/h** — especialista.',
      indications:
        '## Indicações\n\n- Indução/anestesia breve; analgesia procedimental; sedação em UTI selecionada.\n- Intubação: **2–3 mg/kg** IV em esquemas pediátricos.\n\n## Precauções\n\n- ↑ PA/FC; sialorreia; sonhos/alucinações. Precaução HIC, lesão ocular aberta, HTP.\n- Precipita com diazepam na mesma linha.\n\n> Diluir a **1–10 mg/mL** para infusão (SF/SG 5%).',
      adulto: {
        presentation: 'Ampola 50 mg/mL.',
        dose: 'Analgesia: **0,1–0,3 mg/kg** bolo ou **0,12–0,36 mg/kg/h**. Indução: **1–2 mg/kg IV**.',
        administration: 'IV lento ou infusão; diluir para gotejamento.',
        notes: 'Monitorar via aérea e PA.',
      },
      pediatrico: {
        presentation: 'Ampola 10 mL: 50 mg/mL.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: 'Bolo até 50 mg/mL; infusão habitual **1–2 mg/mL** (máx. orient. 10 mg/mL).',
        dose: 'Indução IV **1–2 mg/kg**; IM **5 mg/kg**. Infusão **0,25–2 mg/kg/h**. Analgesia **0,5–1 mg/kg**. Intubação **2–3 mg/kg**.',
        infusionRate: 'Bolo ~1 min.',
        administration: 'IV/IM.',
        notes: 'Contraindicações relativas: HIC, trauma ocular, HTP.',
      },
      neonatal: {
        presentation: '50 mg/mL; diluição UTIN a 1–10 mg/mL.',
        dose: 'Analgesia/sedação: bolo **0,5–2 mg/kg IV** lento; infusão **0,5–1 mg/kg/h** ajustada — só neonatologia/anestesia.',
        administration: 'IV.',
        notes: 'Uso restrito; monitorização contínua.',
      },
      stability: '## Estabilidade\n\n- Diluição: seguir guia local (muitas vezes dias refrigerado conforme farmácia). Usar assepsia estrita.',
      adverseEffects: '## Efeitos adversos\n\nHipertensão, taquicardia, sialorreia, nistagmo, alucinações, laringoespasmo raro, ↑ PIC.',
    },
  },

  'pro-001': {
    en: {
      name: 'Propofol',
      executiveSummary:
        'IV hypnotic. Adult induction **1–2.5 mg/kg**; ped **2–2.5 mg/kg**. ICU sedation: **25–75 mcg/kg/min** or **0.25–4 mg/kg/h**. NICU: highly restricted — if used, low bolus **1–2 mg/kg** / minimal titrated infusion.',
      indications:
        '## Indications\n\n- Anesthetic induction/maintenance; sedation in ventilated patients.\n- Not analgesic — combine opioid if pain.\n\n## Precautions\n\n- Hypotension, apnea, injection-site pain. Propofol infusion syndrome (rare) at high/prolonged doses.\n- Caution in lipid disorders / pancreatitis.\n- Emulsion: aseptic technique; discard **6–12 h** after opening.\n\n> May be used undiluted (10 mg/mL) or diluted in D5W (= **2 mg/mL**).',
      adulto: {
        presentation: 'Emulsion 10 mg/mL.',
        dose: 'Induction **1–2.5 mg/kg IV**. Sedation **25–75 mcg/kg/min** (equiv. orient. **1.5–4.5 mg/kg/h**) titrated.',
        administration: 'Slow IV bolus or infusion; dedicated line preferred.',
        notes: 'Monitor BP, triglycerides, and lactate if infusion >48 h.',
      },
      pediatrico: {
        presentation: 'Ampules/vials 20 mL: 10 mg/mL.',
        finalConcentration: 'Undiluted or =2 mg/mL in D5W.',
        dose: 'Bolus **2–2.5 mg/kg**. Continuous infusion **0.25–4 mg/kg/h** (common max peri-extubation sedation ~48 h).',
        infusionRate: 'Bolus 20–30 s.',
        administration: 'IV.',
        notes: 'Opened line stability ~6 h. Store per package insert.',
      },
      neonatal: {
        presentation: '10 mg/mL; exceptional NICU use.',
        dose: 'Highly restricted. If anesthesia/procedure: bolus **1–2 mg/kg IV** slow; infusion specialist only at minimal titrated doses (e.g. **0.5–2 mg/kg/h**).',
        administration: 'IV with secured airway / full monitoring.',
        notes: 'Prefer validated NICU alternatives when available.',
      },
      stability: '## Stability\n\n- Aseptic chain. Discard remainder 6–12 h after opening. Dilution in D5W: ~12 h room temperature (local guide).',
      adverseEffects: '## Adverse effects\n\nApnea, hypotension, bradycardia, local pain, hypertriglyceridemia, infusion syndrome (rare).',
    },
    pt: {
      name: 'Propofol',
      executiveSummary:
        'Hipnótico IV. Indução adulto **1–2,5 mg/kg**; ped **2–2,5 mg/kg**. Sedação UTI: **25–75 mcg/kg/min** ou **0,25–4 mg/kg/h**. UTIN: uso muito restrito — se usado, bolo baixo **1–2 mg/kg** / infusão mínima ajustada.',
      indications:
        '## Indicações\n\n- Indução/manutenção anestésica; sedação em paciente ventilado.\n- Não analgésico — associar opioide se dor.\n\n## Precauções\n\n- Hipotensão, apneia, dor na injeção. Síndrome da infusão de propofol (rara) em doses altas/prolongadas.\n- Precaução em distúrbios lipídicos / pancreatite.\n- Emulsão: técnica asséptica; desprezar às **6–12 h** de aberto.\n\n> Pode usar sem diluir (10 mg/mL) ou diluído em SG 5% (= **2 mg/mL**).',
      adulto: {
        presentation: 'Emulsão 10 mg/mL.',
        dose: 'Indução **1–2,5 mg/kg IV**. Sedação **25–75 mcg/kg/min** (equiv. orient. **1,5–4,5 mg/kg/h**) ajustada.',
        administration: 'IV bolo lento ou infusão; via dedicada preferível.',
        notes: 'Monitorar PA, triglicerídeos e lactato se infusão prolongada (>48 h).',
      },
      pediatrico: {
        presentation: 'Ampolas/frascos 20 mL: 10 mg/mL.',
        finalConcentration: 'Sem diluir ou =2 mg/mL em SG 5%.',
        dose: 'Bolo **2–2,5 mg/kg**. Infusão contínua **0,25–4 mg/kg/h** (máx. freq. sedação peri-extubação ~48 h).',
        infusionRate: 'Bolo 20–30 s.',
        administration: 'IV.',
        notes: 'Estabilidade de linha aberta ~6 h. Conservar conforme bula.',
      },
      neonatal: {
        presentation: '10 mg/mL; uso excepcional UTIN.',
        dose: 'Uso muito restrito. Se anestesia/procedimento: bolo **1–2 mg/kg IV** lento; infusão só especialista em doses mínimas ajustadas (ex. **0,5–2 mg/kg/h**).',
        administration: 'IV com via aérea assegurada / monitorização completa.',
        notes: 'Preferir alternativas validadas em UTIN quando existirem.',
      },
      stability: '## Estabilidade\n\n- Cadeia asséptica. Desprezar restante às 6–12 h de abertura. Diluição em SG 5%: ~12 h T° amb (guia local).',
      adverseEffects: '## Efeitos adversos\n\nApneia, hipotensão, bradicardia, dor local, hipertrigliceridemia, síndrome da infusão (rara).',
    },
  },

  'hef-001': {
    en: {
      name: 'Unfractionated heparin',
      executiveSummary:
        'UFH. Adult: bolus **60–80 units/kg** then **12–18 units/kg/h** IV. Pediatrics: bolus **75 units/kg** → **20–28 units/kg/h**. NICU: bolus **75 units/kg** → **28 units/kg/h** titrated to anti-Xa/aPTT. Prophylaxis SC **5000 units every 8–12 h**.',
      indications:
        '## Indications\n\n- Treatment/prophylaxis of thromboembolism; ACS; CPB; perioperative bridge.\n\n## Precautions\n\n- Bleeding; HIT. aPTT/anti-Xa every 6 h until stable.\n- Not IM. Neuraxial anesthesia: safety intervals.\n\n> Antidote: **protamine** (~1 mg per 100 units recent UFH; common max initial dose 50 mg).',
      adulto: {
        presentation: 'Ampules 1000–5000 units/mL.',
        dose: 'IV treatment: bolus **80 units/kg** (ACS often **60 units/kg**, common max **4000–5000 units**) → infusion **18 units/kg/h** (ACS **12 units/kg/h**) titrated. Prophylaxis: **5000 units SC every 8–12 h**.',
        administration: 'IV pump / SC. Never IM.',
        notes: 'Line flush (10–100 units/mL) is not a therapeutic dose.',
      },
      pediatrico: {
        presentation: 'Ampules; pharmacy dilution.',
        dose: 'Bolus **75 units/kg** → infusion **20–28 units/kg/h** titrated to anti-Xa/aPTT.',
        administration: 'IV/SC.',
        notes: 'Hematology/ICU.',
      },
      neonatal: {
        presentation: 'NICU dilution (e.g. 50–100 units/mL).',
        dose: 'Bolus **75 units/kg IV** → infusion **28 units/kg/h**; titrate to anti-Xa (common target **0.3–0.7 units/mL**) — neonatology/hematology.',
        administration: 'IV pump.',
        notes: 'Frequent adjustment due to neonatal clearance.',
      },
      stability: '## Stability\n\n- Infusion in NS/D5W per compatibility; prepare extemporaneously.',
      adverseEffects: '## Adverse effects\n\nBleeding, hematoma, HIT, osteoporosis (chronic), hyperkalemia.',
    },
    pt: {
      name: 'Heparina sódica',
      executiveSummary:
        'HNF. Adulto: bolo **60–80 UI/kg** depois **12–18 UI/kg/h** IV. Pediatria: bolo **75 UI/kg** → **20–28 UI/kg/h**. UTIN: bolo **75 UI/kg** → **28 UI/kg/h** ajustada a anti-Xa/TTPa. Profilaxia SC **5000 UI a cada 8–12 h**.',
      indications:
        '## Indicações\n\n- Tratamento/profilaxia de tromboembolismo; SCA; CEC; ponte perioperatória.\n\n## Precauções\n\n- Hemorragia; HIT. TTPa/anti-Xa a cada 6 h até estável.\n- Não IM. Anestesia neuroaxial: tempos de segurança.\n\n> Antídoto: **protamina** (~1 mg por 100 UI HNF recentes; máx. freq. dose inicial 50 mg).',
      adulto: {
        presentation: 'Ampolas 1000–5000 UI/mL.',
        dose: 'IV tratamento: bolo **80 UI/kg** (SCA frequentemente **60 UI/kg**, máx. freq. **4000–5000 UI**) → infusão **18 UI/kg/h** (SCA **12 UI/kg/h**) ajustada. Profilaxia: **5000 UI SC a cada 8–12 h**.',
        administration: 'IV bomba / SC. Nunca IM.',
        notes: 'Flush de vias (10–100 UI/mL) não é dose terapêutica.',
      },
      pediatrico: {
        presentation: 'Ampolas; diluição farmácia.',
        dose: 'Bolo **75 UI/kg** → infusão **20–28 UI/kg/h** ajustada a anti-Xa/TTPa.',
        administration: 'IV/SC.',
        notes: 'Hematologia/UTI.',
      },
      neonatal: {
        presentation: 'Diluição UTIN (ex. 50–100 UI/mL).',
        dose: 'Bolo **75 UI/kg** IV → infusão **28 UI/kg/h**; ajustar a anti-Xa (meta freq. **0,3–0,7 UI/mL**) — neonatologia/hematologia.',
        administration: 'IV bomba.',
        notes: 'Ajuste frequente pelo clearance neonatal.',
      },
      stability: '## Estabilidade\n\n- Infusão em SF/SG 5% conforme compatibilidade; preparar extemporânea.',
      adverseEffects: '## Efeitos adversos\n\nHemorragia, hematoma, HIT, osteoporose (crônico), hiperpotassemia.',
    },
  },

  'cef-003': {
    en: {
      name: 'Cefuroxime',
      executiveSummary:
        '2nd-generation cephalosporin. Adult IV **750 mg–1.5 g every 8 h**. Pediatrics **75–150 mg/kg/day every 8 h** (meningitis up to **240 mg/kg/day**). Neonates: **50–100 mg/kg/day** divided every 8–12 h by GA/weight.',
      indications:
        '## Indications\n\n- Respiratory, ENT, urinary, skin/soft-tissue, bone infections by susceptible organisms (incl. *H. influenzae*, E. coli, Klebsiella).\n- Selected surgical prophylaxis.\n\n## Precautions\n\n- Beta-lactam allergy. Adjust in CKD.\n- Not first choice for *H. influenzae* meningitis (prefer 3rd gen).\n\n> IV or PO per presentation.',
      adulto: {
        presentation: 'Vial 750 mg, 1.5 g IV; tablets 250–500 mg PO.',
        dose: 'IV: 750 mg–1.5 g every 8 h. PO: 250–500 mg every 12 h.',
        administration: 'IV or PO.',
      },
      pediatrico: {
        presentation: 'Vial: 750–1500 mg',
        administration: 'IV.',
        diluent: 'SWFI, 0.9% NaCl, D5W.',
        finalConcentration: '250 mg/mL.',
        infusionRate: '3 to 5 min.',
        dose: 'Ages 3–12 years: 75–150 mg/kg/day every 8 h, max dose: 6 g/day; meningitis: 240 mg/kg/day, max dose: 9 g/day; ≥13 years and adults: 750–1500 mg/dose every 8 h, max dose: 6 g/day. Adult preoperative dose: 1.5 g.',
        notes: 'Not advised in meningitis due to Haemophilus influenzae. Adjust dose in renal impairment.',
      },
      neonatal: {
        presentation: 'Vial 750 mg; NICU reconstitution.',
        dose: '**50–100 mg/kg/day IV** divided every **8–12 h** by gestational age and weight (non-meningeal infections). Meningitis: prefer other cephalosporins — if used, high regimens infectious diseases/NICU only.',
        administration: 'Slow IV 3–5 min or infusion.',
        notes: 'Adjust interval in prematurity/CKD.',
      },
      stability: '## Stability\n\n- Diluted IV: 24 h refrigerated.\n\n## Pediatric guide\n\n- 24 h at room temperature and 48 h refrigerated between 4 °C and 8 °C.',
      adverseEffects: '## Adverse effects\n\nNeutropenia, hemolytic anemia, headache, C. difficile colitis, injection-site phlebitis, rash, anal pruritus.',
    },
    pt: {
      name: 'Cefuroxima',
      executiveSummary:
        'Cefalosporina de 2ª geração. Adulto IV **750 mg–1,5 g a cada 8 h**. Pediatria **75–150 mg/kg/dia a cada 8 h** (meningite até **240 mg/kg/dia**). Neonatos: **50–100 mg/kg/dia** dividido a cada 8–12 h conforme IG/peso.',
      indications:
        '## Indicações\n\n- Infecções respiratórias, ORL, urinárias, pele/partes moles, ósseas por germes sensíveis (incl. *H. influenzae*, E. coli, Klebsiella).\n- Profilaxia cirúrgica selecionada.\n\n## Precauções\n\n- Alergia a betalactâmicos. Ajustar na IRC.\n- Não de escolha em meningite por *H. influenzae* (preferir 3ª geração).\n\n> IV ou VO conforme apresentação.',
      adulto: {
        presentation: 'Frasco 750 mg, 1,5 g IV; comprimidos 250–500 mg VO.',
        dose: 'IV: 750 mg–1,5 g a cada 8 h. VO: 250–500 mg a cada 12 h.',
        administration: 'IV ou VO.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola: 750–1500 mg',
        administration: 'IV.',
        diluent: 'AD, Sol. Cl Na 0,9%, SG 5%.',
        finalConcentration: '250 mg/mL.',
        infusionRate: 'De 3 a 5 min.',
        dose: '3 a 12 anos: 75–150 mg/kg/dia a cada 8 h, dose máxima: 6 g/dia; meningite: 240 mg/kg/dia, dose máxima: 9 g/dia; ≥13 anos e adultos: 750–1500 mg/dose a cada 8 h, dose máxima: 6 g/dia. Dose pré-cirúrgica em adultos: 1,5 g.',
        notes: 'Não se aconselha em meningite por Haemophilus influenzae. Ajustar dose na insuficiência renal.',
      },
      neonatal: {
        presentation: 'Frasco 750 mg; reconstituição UTIN.',
        dose: '**50–100 mg/kg/dia IV** dividido a cada **8–12 h** conforme idade gestacional e peso (infecções não meníngeas). Meningite: preferir outras cefalosporinas — se usado, esquemas altos só infectologia/UTIN.',
        administration: 'IV lento 3–5 min ou infusão.',
        notes: 'Ajustar intervalo na prematuridade/IRC.',
      },
      stability: '## Estabilidade\n\n- IV diluída: 24 h refrigerada.\n\n## Guia pediátrico\n\n- 24 h à T° ambiente e 48 h na geladeira entre 4 °C e 8 °C.',
      adverseEffects: '## Efeitos adversos\n\nNeutropenia, anemia hemolítica, cefaleia, colite pseudomembranosa, flebite no local de injeção, rash, prurido anal.',
    },
  },

  'cag-001': {
    en: {
      name: 'Calcium gluconate',
      executiveSummary:
        'IV calcium salt. Adult hyperK / symptomatic hypocalcemia: **1–2 g (10–20 mL of 10%)** slow IV. Pediatrics: **0.5–1 mL/kg** of 10% gluconate (common max **10–20 mL**/dose). Monitor ECG; necrosis risk if extravasation.',
      indications:
        '## Indications\n\n- Hyperkalemia with ECG changes (membrane stabilization).\n- Symptomatic hypocalcemia; calcium-channel blocker toxicity / hypermagnesemia (protocols).\n\n## Precautions\n\n- **Do not mix with bicarbonate or phosphate** (precipitates). Prefer central line or well-flowing peripheral.\n- Stop if bradycardia. Correct concomitant hypokalemia with judgment.\n- Calcium chloride has more elemental Ca/mL — do not interchange mL for mL.\n\n> Ampule 10%: ~**100 mg gluconate/mL** ~ **9 mg elemental Ca/mL** (~0.46 mEq/mL).',
      adulto: {
        presentation: 'Ampule 10% (10 mL).',
        dose: 'HyperK / emergency: **10–20 mL (1–2 g)** IV over **2–5–10 min**; repeat at 5–10 min if ECG changes persist. Hypocalcemia: **1–2 g** then infusion per ionized Ca.',
        administration: 'Slow IV under monitoring; dilute if infusion (up to ~50 mg/mL). Orient. push rate **0.5–1 mL/min**.',
        notes: 'Extravasation → necrosis. Compatible with NS/DX; not with HCO3-/PO4.',
      },
      pediatrico: {
        presentation: 'Ampule 10 mL of 10%.',
        dose: 'Symptomatic hypocalcemia / hyperK: **0.5–1 mL/kg** of 10% (**50–100 mg/kg** gluconate; common max **10 mL**/dose) over 5–10 min; may repeat or switch to **~5 mL/kg/day** infusion. Asymptomatic (if not PO): **2–5 mL/kg/day**.',
        administration: 'IV; dilute; watch HR.',
        notes: 'See institutional electrolyte bulletin.',
      },
      neonatal: {
        presentation: 'Ampule 10%; NICU guide.',
        dose: '**1–2 mL/kg** of 10% gluconate (**100–200 mg/kg**) slow IV; may repeat or switch to infusion per ionized Ca.',
        administration: 'Slow IV with monitoring.',
        notes: 'Prefer safe line; avoid extravasation.',
      },
      stability: '## Stability\n\n- Use dedicated line when possible; discard opened ampule per local guide.',
      adverseEffects: '## Adverse effects\n\nBradycardia, hypotension if rapid; calcification/necrosis from extravasation; hypercalcemia.',
    },
    pt: {
      name: 'Gluconato de cálcio',
      executiveSummary:
        'Sal de cálcio IV. Adulto hiperK / hipocalcemia sintomática: **1–2 g (10–20 mL a 10%)** IV lento. Pediatria: **0,5–1 mL/kg** de gluconato 10% (máx. freq. **10–20 mL**/dose). Monitorar ECG; risco de necrose se extravasamento.',
      indications:
        '## Indicações\n\n- Hiperpotassemia com alterações de ECG (estabilização de membrana).\n- Hipocalcemia sintomática; toxicidade por bloqueadores de cálcio / hipermagnesemia (protocolos).\n\n## Precauções\n\n- **Não misturar com bicarbonato nem fosfato** (precipita). Preferir via central ou periferia bem permeável.\n- Interromper se bradicardia. Corrigir hipocalemia concomitante com critério.\n- Cloreto de cálcio tem mais Ca elemental/mL — não intercambiar mL a mL.\n\n> Ampola 10%: ~**100 mg gluconato/mL** ~ **9 mg Ca elemental/mL** (~0,46 mEq/mL).',
      adulto: {
        presentation: 'Ampola 10% (10 mL).',
        dose: 'HiperK / emergência: **10–20 mL (1–2 g)** IV em **2–5–10 min**; repetir aos 5–10 min se persistirem alterações de ECG. Hipocalcemia: **1–2 g** e depois infusão conforme Ca iônico.',
        administration: 'IV lento sob monitorização; diluir se infusão (até ~50 mg/mL). Velocidade push orient. **0,5–1 mL/min**.',
        notes: 'Extravasamento → necrose. Compatível com SF/DX; não com HCO3-/PO4.',
      },
      pediatrico: {
        presentation: 'Ampola 10 mL a 10%.',
        dose: 'Hipocalcemia sintomática / hiperK: **0,5–1 mL/kg** a 10% (**50–100 mg/kg** gluconato; máx. freq. **10 mL**/dose) em 5–10 min; pode repetir ou passar a **~5 mL/kg/dia** em infusão. Assintomática (se não VO): **2–5 mL/kg/dia**.',
        administration: 'IV; diluir; controlar FC.',
        notes: 'Ver boletim institucional de eletrólitos.',
      },
      neonatal: {
        presentation: 'Ampola 10%; guia UTIN.',
        dose: '**1–2 mL/kg** de gluconato 10% (**100–200 mg/kg**) IV lento; pode repetir ou passar a infusão conforme Ca iônico.',
        administration: 'IV lento com monitorização.',
        notes: 'Via preferente segura; evitar extravasamento.',
      },
      stability: '## Estabilidade\n\n- Usar via dedicada se possível; desprezar ampola aberta conforme guia local.',
      adverseEffects: '## Efeitos adversos\n\nBradicardia, hipotensão se rápido; calcificação/necrose por extravasamento; hipercalcemia.',
    },
  },

  'rem-001': {
    en: {
      name: 'Remifentanil',
      executiveSummary:
        'Ultrashort opioid. Adult: **0.05–0.2 mcg/kg/min**. Pediatrics: bolus **0.5 mcg/kg** → **0.1–0.3 mcg/kg/min**. NICU: **0.05–0.25 mcg/kg/min** — anesthesia/neonatology only.',
      indications:
        '## Indications\n\n- Adjunct to general anesthesia; sedation/analgesia with secured airway.\n\n## Precautions\n\n- Apnea, chest wall rigidity, bradycardia, hypotension.\n- **Not epidural/intrathecal** (glycine in formulation).\n\n> Specialist use only.',
      adulto: {
        presentation: 'Vial 1–5 mg.',
        dose: '0.05–0.2 mcg/kg/min infusion.',
        administration: 'Continuous IV exclusively.',
      },
      pediatrico: {
        dose: '0.5 mcg/kg bolus over 30 s. Maintenance: 0.1–0.3 mcg/kg/min',
        administration: 'IV.',
        presentation: 'Lyophilized vial: 5 mg',
        notes: 'SPECIALIST USE ONLY. Do not give epidural or intrathecal (glycine in the formulation may cause neurotoxicity).',
      },
      neonatal: {
        presentation: 'Lyophilized 1–5 mg; NICU dilution (e.g. 20–50 mcg/mL).',
        dose: 'Infusion **0.05–0.25 mcg/kg/min** continuous IV; rare bolus **0.5–1 mcg/kg** slow — anesthesia/neonatology only with secured airway.',
        administration: 'IV exclusively via pump.',
        notes: 'Titrate to response; high apnea/rigidity risk.',
      },
      stability: '## Stability\n\n- Reconstitute per package insert; use within 24 h.',
      adverseEffects: '## Adverse effects\n\nApnea, nausea, bradyarrhythmia, hypotension, respiratory depression. Higher frequency of chest wall rigidity. See opioid analgesics section.',
    },
    pt: {
      name: 'Remifentanila',
      executiveSummary:
        'Opioide ultracurto. Adulto: **0,05–0,2 mcg/kg/min**. Pediatria: bolo **0,5 mcg/kg** → **0,1–0,3 mcg/kg/min**. UTIN: **0,05–0,25 mcg/kg/min** — só anestesia/neonatologia.',
      indications:
        '## Indicações\n\n- Coadjuvante de anestesia geral; sedação/analgesia com via aérea assegurada.\n\n## Precauções\n\n- Apneia, rigidez torácica, bradicardia, hipotensão.\n- **Não epidural/intratecal** (glicina na formulação).\n\n> Uso exclusivo de especialista.',
      adulto: {
        presentation: 'Frasco 1–5 mg.',
        dose: '0,05–0,2 mcg/kg/min infusão.',
        administration: 'IV contínua exclusivamente.',
      },
      pediatrico: {
        dose: '0,5 mcg/kg em bolo em 30 s. Manutenção: 0,1–0,3 mcg/kg/min',
        administration: 'IV.',
        presentation: 'Frasco-ampola liof.: 5 mg',
        notes: 'USO EXCLUSIVO DO ESPECIALISTA. Não administrar por via epidural ou intratecal (a glicina da formulação pode causar neurotoxicidade).',
      },
      neonatal: {
        presentation: 'Liofilizado 1–5 mg; diluição UTIN (ex. 20–50 mcg/mL).',
        dose: 'Infusão **0,05–0,25 mcg/kg/min** IV contínuo; bolo raro **0,5–1 mcg/kg** lento — só anestesia/neonatologia com via aérea assegurada.',
        administration: 'IV exclusiva em bomba.',
        notes: 'Ajustar à resposta; risco alto de apneia/rigidez.',
      },
      stability: '## Estabilidade\n\n- Reconstituir conforme bula; usar em 24 h.',
      adverseEffects: '## Efeitos adversos\n\nApneia, náuseas, bradiarritmia, hipotensão, depressão respiratória. Maior frequência de tórax lenhoso. Ver seção analgésicos opioides.',
    },
  },

  'roc-001': {
    en: {
      name: 'Rocuronium',
      executiveSummary:
        'Neuromuscular blocker. Adult RSI: **0.6–1.2 mg/kg** IV. Pediatrics: **0.45–0.6 mg/kg**. Neonates: **0.45–0.6 mg/kg** (up to **1 mg/kg** RSI) — only with airway ready.',
      indications:
        '## Indications\n\n- Intubation / RSI; perioperative muscle relaxation.\n\n## Precautions\n\n- Apnea; vagolytic effects. Incompatible with several alkaline drugs.\n\n> Specialist use only; sugammadex reversal when available.',
      adulto: {
        presentation: 'Vial 10 mg/mL.',
        dose: 'RSI: 0.6–1.2 mg/kg IV. Maintenance: 0.1–0.2 mg/kg/h.',
        administration: 'IV bolus or infusion.',
      },
      pediatrico: {
        presentation: 'Ampules 5 mL: 10 mg/mL',
        administration: 'IV.',
        diluent: '0.9% NaCl, D5W.',
        finalConcentration: '0.5 to 1 mg/mL. May be given undiluted.',
        infusionRate: 'Push or infusion via pump.',
        dose: '0.45–0.6 mg/kg/dose',
        compatibility: 'Incompatible with thiopental, amphotericin, amoxicillin, dexamethasone, diazepam, furosemide, insulin, methylprednisolone, vancomycin.',
        notes: 'SPECIALIST USE ONLY. May be given undiluted. For continuous infusion dilute with NS or D5W to 0.5–1 mg/mL; do not mix with alkaline solutions.',
      },
      neonatal: {
        presentation: '10 mg/mL; may be used undiluted.',
        dose: 'Intubation: **0.45–0.6 mg/kg IV**; RSI / difficult conditions up to **1 mg/kg**. Maintenance: **0.1–0.2 mg/kg** or low titrated infusion.',
        administration: 'IV; secured airway mandatory.',
        notes: 'Neonatology/anesthesia.',
      },
      stability: '## Stability\n\n- Opened vial per package insert.\n\n## Pediatric guide\n\n- 30 days refrigerated once opened.',
      adverseEffects: '## Adverse effects\n\nApnea, vagolysis, transient hypotension, hypertension, tachycardia related to dose-apnea, arrhythmias, injection-site edema, hiccups, pruritus, nausea, wheezing, residual muscle weakness.',
    },
    pt: {
      name: 'Rocurônio',
      executiveSummary:
        'Bloqueador neuromuscular. RSI adulto: **0,6–1,2 mg/kg** IV. Pediatria: **0,45–0,6 mg/kg**. Neonatos: **0,45–0,6 mg/kg** (até **1 mg/kg** RSI) — só com via aérea pronta.',
      indications:
        '## Indicações\n\n- Intubação / RSI; relaxamento muscular perioperatório.\n\n## Precauções\n\n- Apneia; efeitos vagolíticos. Incompatível com vários fármacos alcalinos.\n\n> Uso exclusivo de especialista; antídoto sugamadex quando disponível.',
      adulto: {
        presentation: 'Frasco 10 mg/mL.',
        dose: 'RSI: 0,6–1,2 mg/kg IV. Manutenção: 0,1–0,2 mg/kg/h.',
        administration: 'IV bolo ou infusão.',
      },
      pediatrico: {
        presentation: 'Ampolas de 5 ml: 10 mg/ml',
        administration: 'IV.',
        diluent: 'Sol. Cl Na 0,9%, SG 5%.',
        finalConcentration: '0,5 a 1 mg/mL. Pode administrar sem diluir.',
        infusionRate: 'Push ou infusão com bomba.',
        dose: '0,45–0,6 mg/kg/dose',
        compatibility: 'Incompatível com tiopental, anfotericina, amoxicilina, dexametasona, diazepam, furosemida, insulina, metilprednisolona, vancomicina.',
        notes: 'USO EXCLUSIVO DO ESPECIALISTA. Pode administrar sem diluir. Para infusão contínua diluir com solução fisiológica ou glicose 5% com concentração de 0,5 a 1 mg/ml; não misturar com soluções alcalinas.',
      },
      neonatal: {
        presentation: '10 mg/mL; pode usar sem diluir.',
        dose: 'Intubação: **0,45–0,6 mg/kg IV**; RSI / condições difíceis até **1 mg/kg**. Manutenção: **0,1–0,2 mg/kg** ou infusão baixa ajustada.',
        administration: 'IV; via aérea assegurada obrigatória.',
        notes: 'Neonatologia/anestesia.',
      },
      stability: '## Estabilidade\n\n- Frasco aberto conforme bula.\n\n## Guia pediátrico\n\n- 30 dias na geladeira uma vez aberto.',
      adverseEffects: '## Efeitos adversos\n\nApneia, vagólise, hipotensão transitória, hipertensão, taquicardia relacionada dose-apneia, arritmias, edema no local de injeção, soluço, prurido, náuseas, sibilos, fraqueza muscular residual.',
    },
  },

  'alb-001': {
    en: {
      name: 'Human albumin',
      executiveSummary:
        'Colloid. Adult: **0.5–1 g/kg**. Pediatric shock: 5% albumin **5–10 mL/kg** (**0.25–0.5 g/kg**). Neonates: **0.5–1 g/kg** (or 5% **10–20 mL/kg**) slow IV.',
      indications:
        '## Indications\n\n- Selected volume expansion; burns; large-volume paracentesis.\n\n## Precautions\n\n- Fluid overload; rare allergy.\n\n> Does not replace crystalloids as first line in most shocks.',
      adulto: {
        presentation: 'Vial 20% or 25% albumin.',
        dose: '0.5–1 g/kg per indication (paracentesis: 6–8 g/L of ascites removed).',
        administration: 'IV.',
      },
      pediatrico: {
        dose: 'Shock: 5% albumin in NS = 5–10 mL/kg (0.25–0.50 g/kg). Max dose: 6 g/kg/day',
        administration: 'IV.',
        presentation: 'See albumin evidence-based use (CIME bulletin). 50 mL vial at 20%',
        notes: 'Infusion rate: 0.25–1 mL/min. See Colloid Solutions (CIME bulletin).',
      },
      neonatal: {
        presentation: 'Vial 20% or 5% per NICU stock.',
        dose: 'Hypoalbuminemia / selected expansion: **0.5–1 g/kg** IV (orient. equiv. 5% albumin **10–20 mL/kg** or 20% **2.5–5 mL/kg**) slow over 1–2 h.',
        administration: 'Slow IV; do not mix with other drugs in the same line.',
        notes: 'Watch for overload; neonatology.',
      },
      stability: '## Stability\n\n- Use immediately after spiking; do not mix with other drugs.',
      adverseEffects: '## Adverse effects\n\nHeart failure from volume overload, urticaria.',
    },
    pt: {
      name: 'Albumina humana',
      executiveSummary:
        'Coloide. Adulto: **0,5–1 g/kg**. Pediatria choque: albumina 5% **5–10 mL/kg** (**0,25–0,5 g/kg**). Neonatos: **0,5–1 g/kg** (ou 5% **10–20 mL/kg**) IV lento.',
      indications:
        '## Indicações\n\n- Expansão volumétrica selecionada; queimaduras; paracentese de grande volume.\n\n## Precauções\n\n- Sobrecarga hídrica; alergia rara.\n\n> Não substitui cristaloides como primeira linha na maioria dos choques.',
      adulto: {
        presentation: 'Frasco 20% ou 25% albumina.',
        dose: '0,5–1 g/kg conforme indicação (paracentese: 6–8 g/L de ascite retirada).',
        administration: 'IV.',
      },
      pediatrico: {
        dose: 'Choque: Albumina 5% em SF = 5–10 ml/kg (0,25–0,50 g/kg). Dose máxima: 6 g/kg/dia',
        administration: 'IV.',
        presentation: 'Ver uso da albumina baseado em evidência científica (Boletim CIME). Frasco de 50 ml a 20%',
        notes: 'Velocidade de infusão: 0,25–1 ml/min. Ver Soluções Coloidais (Boletim CIME).',
      },
      neonatal: {
        presentation: 'Frasco 20% ou 5% conforme estoque UTIN.',
        dose: 'Hipoalbuminemia / expansão selecionada: **0,5–1 g/kg** IV (equiv. orient. albumina 5% **10–20 mL/kg** ou 20% **2,5–5 mL/kg**) lento em 1–2 h.',
        administration: 'IV lenta; não misturar com outros fármacos na mesma linha.',
        notes: 'Vigiar sobrecarga; neonatologia.',
      },
      stability: '## Estabilidade\n\n- Usar imediatamente após puncionar; não misturar com outros fármacos.',
      adverseEffects: '## Efeitos adversos\n\nInsuficiência cardíaca por sobrecarga de volume, urticária.',
    },
  },

  'pol-001': {
    en: {
      name: 'Polymyxin B',
      executiveSummary:
        'Polymyxin B. Adult IV: **1.5–2.5 mg/kg/day** every 12 h. Pediatrics PO (decolonization): **10–20 mg/kg/day**. NICU IV reserve: **1.5–2.5 mg/kg/day** divided every 12 h — infectious diseases.',
      indications:
        '## Indications\n\n- Resistant Gram-negative infections (IV); selected preoperative PO decolonization (± metronidazole).\n\n## Precautions\n\n- Nephro- and neurotoxicity. Confirm local vial units↔mg conversion.\n\n> Reserve / infectious diseases use.',
      adulto: {
        presentation: 'Vial-ampule 500,000 units or 1 million units.',
        dose: '1.5–2.5 mg/kg/day IV divided every 12 h (convert units to mg per package insert).',
        infusionRate: 'Slow infusion.',
        administration: 'IV.',
      },
      pediatrico: {
        dose: '10–20 mg/kg/day every 6–8 h for 5 days.',
        administration: 'PO.',
        presentation: 'Compounded preparation: sachets',
        notes: 'Contraindicated in patients with hypersensitivity reactions to polymyxins.',
      },
      neonatal: {
        presentation: 'Vial 500,000–1,000,000 units; conversion per package insert.',
        dose: 'IV (reserve): **1.5–2.5 mg/kg/day** divided every **12 h**; adjust in CKD — infectious diseases/NICU only.',
        administration: 'Slow IV infusion.',
        notes: 'Monitor creatinine and neurologic signs.',
      },
      stability: '## Stability\n\n- Use after dilution per package insert.',
      adverseEffects: '## Adverse effects\n\nIrritability, ataxia, perioral paresthesia, nephrotoxicity.',
    },
    pt: {
      name: 'Polimixina B',
      executiveSummary:
        'Polimixina B. Adulto IV: **1,5–2,5 mg/kg/dia** a cada 12 h. Pediatria VO (descolonização): **10–20 mg/kg/dia**. UTIN IV reserva: **1,5–2,5 mg/kg/dia** dividido a cada 12 h — infectologia.',
      indications:
        '## Indicações\n\n- Infecções por gram-negativos resistentes (IV); descolonização pré-cirúrgica VO em esquemas selecionados (± metronidazol).\n\n## Precauções\n\n- Nefro e neurotoxicidade. Confirmar conversão UI↔mg do frasco local.\n\n> Uso de reserva / infectologia.',
      adulto: {
        presentation: 'Frasco-ampola 500.000 UI ou 1 milhão UI.',
        dose: '1,5–2,5 mg/kg/dia IV dividido a cada 12 h (converter UI para mg conforme bula).',
        infusionRate: 'Infusão lenta.',
        administration: 'IV.',
      },
      pediatrico: {
        dose: '10–20 mg/kg/dia a cada 6–8 h durante 5 dias.',
        administration: 'VO.',
        presentation: 'Preparação magistral: sachês',
        notes: 'Contraindicada em pacientes com reações de hipersensibilidade a polimixinas.',
      },
      neonatal: {
        presentation: 'Frasco 500.000–1.000.000 UI; conversão conforme bula.',
        dose: 'IV (reserva): **1,5–2,5 mg/kg/dia** dividido a cada **12 h**; ajustar na IRC — só infectologia/UTIN.',
        administration: 'IV infusão lenta.',
        notes: 'Monitorar creatinina e sinais neurológicos.',
      },
      stability: '## Estabilidade\n\n- Usar após diluição conforme bula.',
      adverseEffects: '## Efeitos adversos\n\nIrritabilidade, ataxia, parestesia perioral, nefrotoxicidade.',
    },
  },

  'col-001': {
    en: {
      name: 'Colistin (colistimethate)',
      executiveSummary:
        'XDR polymyxin in **mg CBA**. Adult: load **~5 mg CBA/kg** (common max **300 mg**), maint. **~2.5 mg CBA/kg every 12 h**. Pediatrics **~2.5 mg CBA/kg every 12 h**. Neonates: **2.5–5 mg CBA/kg/day** divided every 8–12 h.',
      indications:
        '## Indications\n\n- Infections by *Acinetobacter*, *Pseudomonas*, XDR Enterobacterales when no alternatives.\n- Cystic fibrosis (IV/inhaled per protocol).\n- Intrathecal/intraventricular: neurosurgery/infectious diseases only.\n\n## Precautions\n\n- **Nephro- and neurotoxicity**. Monitor creatinine and neurologic signs.\n- Confirm whether the label states **CBA**, **CMS**, or **units** — do not interchange without conversion.\n- Orientative equivalence: **1 mg CBA ≈ 2.4 mg CMS ≈ 30,000 units**; **100 mg CBA ≈ 3 M units** (common local vials).\n\n> Prefer ideal body weight in obesity per PK protocol.',
      adulto: {
        presentation: 'Vial frequently **100 mg CBA** (~3 M units) / local generics.',
        dose: 'Load (critical): **5 mg CBA/kg** (institutional ceiling often **300 mg CBA**). Maintenance (start ~12 h post-load): **2.5 mg CBA/kg every 12 h** or **~150–180 mg CBA/day** divided every 8–12 h per guide/CrCl. Mandatory renal adjustment.',
        administration: 'Direct IV: 3–5 mL SWFI over 3–5 min, or dilute 50–100 mL NS/D5W and infuse 10–30+ min. Also IM/inhaled per protocol.',
        notes: 'Precipitates with erythromycin, cephalothin, tetracyclines. Potentiates otonephrotoxicity with AG, amphotericin, cisplatin, cyclosporine.',
      },
      pediatrico: {
        presentation: 'Vial 100 mg CBA (~3 M units).',
        dose: 'Usual: **2.5 mg CBA/kg every 12 h**. Severe/CF/critical: up to **~5–7 mg CBA/kg/day** divided every 8 h (common max **100 mg**/dose) — infectious diseases.',
        administration: 'IV (slow bolus or infusion); inhaled/intrathecal protocol only.',
        notes: 'Same CBA/CMS/units conversion as adults.',
      },
      neonatal: {
        presentation: 'Vial 100 mg CBA; specialized NICU use.',
        dose: '**2.5–5 mg CBA/kg/day IV** divided every **8–12 h**; prematurity/CKD: more conservative dose or interval — infectious diseases + renal function.',
        administration: 'Slow IV / infusion.',
        notes: 'Strict renal monitoring; confirm CBA vs CMS/units on the vial.',
      },
      stability: '## Stability\n\n- Reconstituted: ~24 h room temp / ~48 h refrigerated (package insert).\n- Diluted: prefer immediate use (~8–24 h per local guide).',
      adverseEffects: '## Adverse effects\n\nNephrotoxicity, paresthesias, muscle weakness, neurotoxicity, bronchospasm (nebulization — β-agonists).',
    },
    pt: {
      name: 'Colistina (colistimetato)',
      executiveSummary:
        'Polimixina XDR em **mg CBA**. Adulto: carga **~5 mg CBA/kg** (máx. freq. **300 mg**), mant. **~2,5 mg CBA/kg a cada 12 h**. Pediatria **~2,5 mg CBA/kg a cada 12 h**. Neonatos: **2,5–5 mg CBA/kg/dia** dividido a cada 8–12 h.',
      indications:
        '## Indicações\n\n- Infecções por *Acinetobacter*, *Pseudomonas*, enterobacterales XDR quando não há alternativas.\n- Fibrose cística (IV/inalada conforme protocolo).\n- Intratecal/intraventricular: só neurocirurgia/infectologia.\n\n## Precauções\n\n- **Nefro e neurotoxicidade**. Monitorar creatinina e sinais neurológicos.\n- Confirmar se o rótulo expressa **CBA**, **CMS** ou **UI** — não intercambiar sem conversão.\n- Equivalência orientativa: **1 mg CBA ≈ 2,4 mg CMS ≈ 30.000 UI**; **100 mg CBA ≈ 3 M UI** (frascos locais frequentes).\n\n> Preferir peso ideal em obesos conforme protocolo PK.',
      adulto: {
        presentation: 'FA frequentemente **100 mg CBA** (~3 M UI) / genéricos locais.',
        dose: 'Carga (críticos): **5 mg CBA/kg** (teto institucional freq. **300 mg CBA**). Manutenção (iniciar ~12 h pós-carga): **2,5 mg CBA/kg a cada 12 h** ou **~150–180 mg CBA/dia** dividido a cada 8–12 h conforme guia/ClCr. Ajuste renal obrigatório.',
        administration: 'IV direta: 3–5 mL AD em 3–5 min, ou diluir 50–100 mL SF/SG 5% e infundir 10–30+ min. Também IM/inalatória conforme protocolo.',
        notes: 'Precipita com eritromicina, cefalotina, tetraciclinas. Potencia otonefrotoxicidade com AG, anfotericina, cisplatina, ciclosporina.',
      },
      pediatrico: {
        presentation: 'FA 100 mg CBA (~3 M UI).',
        dose: 'Habitual: **2,5 mg CBA/kg a cada 12 h**. Graves/FQ/críticos: até **~5–7 mg CBA/kg/dia** dividido a cada 8 h (máx. freq. **100 mg**/dose) — infectologia.',
        administration: 'IV (bolo lento ou infusão); inalatória/intratecal só protocolo.',
        notes: 'Mesma conversão CBA/CMS/UI que em adultos.',
      },
      neonatal: {
        presentation: 'FA 100 mg CBA; uso UTIN especializado.',
        dose: '**2,5–5 mg CBA/kg/dia IV** dividido a cada **8–12 h**; prematuros/IRC: dose ou intervalo mais conservadores — infectologia + função renal.',
        administration: 'IV lento / infusão.',
        notes: 'Monitorização renal estrita; confirmar CBA vs CMS/UI do frasco.',
      },
      stability: '## Estabilidade\n\n- Reconstituído: ~24 h T° amb / ~48 h refrigerado (bula).\n- Diluído: preferir uso imediato (~8–24 h conforme guia local).',
      adverseEffects: '## Efeitos adversos\n\nNefrotoxicidade, parestesias, fraqueza muscular, neurotoxicidade, broncoespasmo (nebulização — β-agonistas).',
    },
  },

  'lvt-001': {
    en: {
      name: 'Levetiracetam',
      executiveSummary:
        'Anticonvulsant. Adult load **60 mg/kg IV** (max **4500 mg**); maint. **500–1500 mg every 12 h**. Pediatrics up to **60 mg/kg/day**. Neonates: load **40–60 mg/kg** → maint. **20–40 mg/kg/day** every 12 h.',
      indications:
        '## Indications\n\n- Seizures / status (adjunct); epilepsy.\n\n## Precautions\n\n- Adjust in CKD/hemodialysis. Taper gradually.\n\n> Dilute IV and infuse ~15 min (neonates common conc. **5 mg/mL**).',
      adulto: {
        presentation: 'Vial 500 mg/5 mL IV; tablets PO.',
        dose: 'Load 60 mg/kg IV (max 4500 mg); maintenance 500–1500 mg every 12 h PO.',
        administration: 'IV over 15 min or PO.',
      },
      pediatrico: {
        presentation: 'Tablets: 500–1000 mg; PO solution: 100 mg/mL; vial 5 mL: 100 mg/mL',
        administration: 'PO / IV.',
        diluent: '0.9% NaCl, D5W, Ringer.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '15 minutes via pump.',
        dose: 'Ages 4–16 years: initial 10–20 mg/kg/day every 12 h, increase 10–20 mg/kg/day every 2 weeks up to max 60 mg/kg/day every 12 h. Adults: initial 500 mg every 12 h, increase 1000 mg/day every 2 weeks up to max 3000 mg/day. Adjust dose in renal impairment and hemodialysis. See levetiracetam dose adjustment in altered renal function.',
        notes: 'IV administration: Dilute the dose in 100 mL NS or D5W and give over 15 min (neonates: 5 mg/mL). Taper gradually to minimize increased seizure frequency.',
      },
      neonatal: {
        presentation: '100 mg/mL; dilute to ~5 mg/mL.',
        dose: 'Load **40–60 mg/kg IV** over ~15 min; maintenance **10–20 mg/kg/dose every 12 h** (**20–40 mg/kg/day**), titrate to response — neonatology.',
        administration: 'IV.',
        notes: 'Renal adjustment; do not stop abruptly.',
      },
      stability: '## Stability\n\n- IV dilution 4 h room temperature per package insert.\n\n## Pediatric guide\n\n- Discard remainder once opened. Dilution stable 24 h at room temperature.',
      adverseEffects: '## Adverse effects\n\nAsthenia, depression, nervousness, somnolence, infection, ataxia, dizziness, vertigo, seizures.',
    },
    pt: {
      name: 'Levetiracetam',
      executiveSummary:
        'Anticonvulsivante. Adulto carga **60 mg/kg IV** (máx. **4500 mg**); mant. **500–1500 mg a cada 12 h**. Pediatria até **60 mg/kg/dia**. Neonatos: carga **40–60 mg/kg** → mant. **20–40 mg/kg/dia** a cada 12 h.',
      indications:
        '## Indicações\n\n- Crises convulsivas / status (adjuvante); epilepsia.\n\n## Precauções\n\n- Ajustar na IRC/hemodiálise. Suspender gradualmente.\n\n> IV diluir e infundir ~15 min (neonatos conc. freq. **5 mg/mL**).',
      adulto: {
        presentation: 'Frasco 500 mg/5 mL IV; comprimidos VO.',
        dose: 'Carga 60 mg/kg IV (máx. 4500 mg); manutenção 500–1500 mg a cada 12 h VO.',
        administration: 'IV em 15 min ou VO.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 500–1000 mg; Solução VO: 100 mg/ml; Frasco-ampola 5 ml: 100 mg/ml',
        administration: 'VO / IV.',
        diluent: 'Sol. Cl Na 0,9%, SG 5%, Ringer.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '15 minutos com bomba.',
        dose: '4 a 16 anos: inicial 10–20 mg/kg/dia a cada 12 h, incrementar 10–20 mg/kg/dia a cada 2 semanas até máx. 60 mg/kg/dia a cada 12 h. Adultos: inicial 500 mg a cada 12 h, incrementar 1000 mg/dia a cada 2 semanas até máx. 3000 mg/dia. Ajustar a dose na insuficiência renal e hemodiálise. Ver ajuste de dose de levetiracetam em função renal alterada.',
        notes: 'Administração IV: Diluir a dose em 100 ml de solução fisiológica ou glicose 5% e administrar em 15 min (neonatos: 5 mg/ml). Suspender o fármaco gradualmente para minimizar o aumento da frequência de convulsões.',
      },
      neonatal: {
        presentation: '100 mg/mL; diluir a ~5 mg/mL.',
        dose: 'Carga **40–60 mg/kg IV** em ~15 min; manutenção **10–20 mg/kg/dose a cada 12 h** (**20–40 mg/kg/dia**), ajustar à resposta — neonatologia.',
        administration: 'IV.',
        notes: 'Ajuste renal; não suspender de súbito.',
      },
      stability: '## Estabilidade\n\n- Diluição IV 4 h ambiente conforme bula.\n\n## Guia pediátrico\n\n- Desprezar o restante uma vez aberto. Diluição estável 24 h à T° ambiente.',
      adverseEffects: '## Efeitos adversos\n\nAstenia, depressão, nervosismo, sonolência, infecção, ataxia, tonturas, vertigem, convulsões.',
    },
  },

  'bum-001': {
    en: {
      name: 'Bumetanide',
      executiveSummary:
        'Loop diuretic (~40× furosemide mg for mg). Adult **0.5–1 mg** IV. Pediatrics **0.015–0.05 mg/kg/dose**. Neonates **0.01–0.05 mg/kg/dose** every 12–24 h.',
      indications:
        '## Indications\n\n- Edema in HF, cirrhosis, CKD when potent diuresis is required.\n\n## Precautions\n\n- Hypokalemia and hypovolemia. Adjust in severe liver disease.\n\n> Adjust per institutional protocol and medical prescription.',
      adulto: {
        presentation: 'Ampule 0.25 mg/mL.',
        dose: '0.5–1 mg IV/IM; repeat per response (1 mg ~ 40 mg furosemide).',
        administration: 'IV/IM.',
      },
      pediatrico: {
        dose: '0.015–0.05 mg/kg/dose every 6–12 h.',
        administration: 'IV/IM.',
      },
      neonatal: {
        dose: '**0.01–0.05 mg/kg/dose IV** every **12–24 h**; titrate to diuresis — neonatology.',
        administration: 'IV.',
        notes: 'Watch hypokalemia and hypovolemia.',
      },
      stability: '## Stability\n\n- Use after withdrawal; dilution not usually required.',
      adverseEffects: '## Adverse effects\n\n- Hypokalemia, hypotension, muscle cramps.',
    },
    pt: {
      name: 'Bumetanida',
      executiveSummary:
        'Diurético de alça (~40× furosemida mg a mg). Adulto **0,5–1 mg** IV. Pediatria **0,015–0,05 mg/kg/dose**. Neonatos **0,01–0,05 mg/kg/dose** a cada 12–24 h.',
      indications:
        '## Indicações\n\n- Edema em ICC, cirrose, IRC quando se requer diurese potente.\n\n## Precauções\n\n- Hipocalemia e hipovolemia. Ajustar em hepatopatia grave.\n\n> Ajustar conforme protocolo institucional e prescrição médica.',
      adulto: {
        presentation: 'Ampola 0,25 mg/mL.',
        dose: '0,5–1 mg IV/IM; repetir conforme resposta (1 mg ~ 40 mg furosemida).',
        administration: 'IV/IM.',
      },
      pediatrico: {
        dose: '0,015–0,05 mg/kg/dose a cada 6–12 h.',
        administration: 'IV/IM.',
      },
      neonatal: {
        dose: '**0,01–0,05 mg/kg/dose IV** a cada **12–24 h**; ajustar à diurese — neonatologia.',
        administration: 'IV.',
        notes: 'Vigiar hipocalemia e hipovolemia.',
      },
      stability: '## Estabilidade\n\n- Usar após extração sem diluição habitual.',
      adverseEffects: '## Efeitos adversos\n\n- Hipocalemia, hipotensão, cãibras musculares.',
    },
  },

  'hdr-001': {
    en: {
      name: 'Hydralazine',
      executiveSummary:
        'Arterial vasodilator. Adult IV **5–10 mg** every 20–30 min. Pediatrics PO initial **0.25 mg/kg/dose**. Neonates IV **0.1–0.5 mg/kg/dose** every 6–8 h — cardiology.',
      indications:
        '## Indications\n\n- Hypertension (incl. selected crises); post–cardiac surgery in pediatrics/NICU.\n\n## Precautions\n\n- Reflex tachycardia, hypotension. Adjust in CKD.\n\n> Slow IV with monitoring.',
      adulto: {
        presentation: 'Ampule 20 mg/mL.',
        dose: '5–10 mg IV every 20–30 min; max 20 mg/dose obstetric.',
        administration: 'Slow IV.',
      },
      pediatrico: {
        dose: 'Infants and children: initial 0.25 mg/kg/dose 3–4 times daily, max 25 mg/dose; increase over 3–4 weeks up to infants 5 mg/kg/day and children 7.5 mg/kg/day, max 200 mg/day. Mild–moderate renal impairment: every 8 h; severe renal impairment for rapid acetylators every 8–16 h and slow acetylators every 12–24 h. Adults: initial 10 mg every 6 h, increase 10–25 mg/dose every 2–5 days up to 300 mg/day. Usual hypertension range: 25–100 mg/day in 2 doses.',
        administration: 'PO.',
        presentation: 'Tablets: 25–50 mg',
        notes: 'Prolonged hydralazine use may cause pyridoxine deficiency. Indomethacin may reduce hypotensive effects. Use caution in severe renal impairment. Give with food.',
      },
      neonatal: {
        presentation: 'Ampule 20 mg/mL; NICU dilution.',
        dose: '**0.1–0.5 mg/kg/dose IV** slow every **6–8 h**; titrate to BP — cardiology/neonatology.',
        administration: 'Slow IV.',
        notes: 'Watch tachycardia and hypotension.',
      },
      stability: '## Stability\n\n- Use after withdrawal.',
      adverseEffects: '## Adverse effects\n\nPalpitations, tachycardia, edema, orthostatic hypotension, headache, fever, anorexia, nausea, vomiting.',
    },
    pt: {
      name: 'Hidralazina',
      executiveSummary:
        'Vasodilatador arterial. Adulto IV **5–10 mg** a cada 20–30 min. Pediatria VO inicial **0,25 mg/kg/dose**. Neonatos IV **0,1–0,5 mg/kg/dose** a cada 6–8 h — cardiologia.',
      indications:
        '## Indicações\n\n- Hipertensão (incl. crises selecionadas); pós-cirurgia cardíaca em pediatria/UTIN.\n\n## Precauções\n\n- Taquicardia reflexa, hipotensão. Ajuste na IRC.\n\n> IV lento com monitorização.',
      adulto: {
        presentation: 'Ampola 20 mg/mL.',
        dose: '5–10 mg IV a cada 20–30 min; máx. 20 mg/dose obstétrica.',
        administration: 'IV lento.',
      },
      pediatrico: {
        dose: 'Lactentes e crianças: inicial 0,25 mg/kg/dose 3 a 4 vezes ao dia, máximo 25 mg/dose; ir aumentando em 3 a 4 semanas até lactentes 5 mg/kg/dia e crianças 7,5 mg/kg/dia, máximo 200 mg/dia. Em insuficiência renal leve a moderada indicar a cada 8 h; em insuficiência renal grave para acetiladores rápidos a cada 8 a 16 h e acetiladores lentos a cada 12 a 24 h. Adultos: inicial 10 mg a cada 6 h, aumentar 10 a 25 mg/dose a cada 2 a 5 dias até 300 mg/dia. Faixa usual para hipertensão: 25 a 100 mg/dia em 2 doses.',
        administration: 'VO.',
        presentation: 'Comprimidos: 25–50 mg',
        notes: 'O uso prolongado de hidralazina pode causar deficiência de piridoxina. A indometacina pode diminuir os efeitos hipotensores da hidralazina. Usar com precaução em insuficiência renal grave. Administrar com alimentos.',
      },
      neonatal: {
        presentation: 'Ampola 20 mg/mL; diluição UTIN.',
        dose: '**0,1–0,5 mg/kg/dose IV** lento a cada **6–8 h**; ajustar à PA — cardiologia/neonatologia.',
        administration: 'IV lento.',
        notes: 'Vigiar taquicardia e hipotensão.',
      },
      stability: '## Estabilidade\n\n- Usar após extração.',
      adverseEffects: '## Efeitos adversos\n\nPalpitações, taquicardia, edema, hipotensão ortostática, cefaleia, febre, anorexia, náuseas, vômitos.',
    },
  },
};
