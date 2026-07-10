import { build, bib } from './drug-build-utils.mjs';

const B = bib('aha', 'anmat', 'sccm', 'aap');

const perf = (dose, rate = 'Titular según TA y perfusión') => ({
  presentation: 'Ampolla o vial para perfusión IV según presentación institucional.',
  reconstitution: 'Reconstituir según prospecto; diluir en SG 5% o NaCl 0,9%.',
  diluent: 'SG 5% o NaCl 0,9%.',
  finalConcentration: 'Concentración según cartilla del servicio (bomba de infusión).',
  dose,
  infusionRate: rate,
  administration: 'IV continua en bomba; vía central preferida.',
  compatibility: 'Verificar compatibilidad en línea con otros vasopresores.',
  notes: 'Monitorizar FC, TA invasiva, diuresis y perfusión periférica.',
});

export const PHASE2_MONOGRAPHS = {
  'nor-001': build({
    id: 'nor-001',
    name: 'Noradrenalina (norepinefrina)',
    executiveSummary: 'Vasopresor de primera línea en shock séptico y distributivo; infusión continua con monitorización hemodinámica.',
    indications: '## Indicaciones\n\n- Shock séptico, anafilaxia refractaria, hipotensión grave en UCI.\n- Soporte hemodinámico transitorio hasta corrección de causa.\n\n## Precauciones\n\n- Extravasación grave; preferir vía central. Monitorizar extremidades y perfusión.',
    dilution: {
      adulto: perf('Inicio habitual 0,05–0,1 mcg/kg/min; titular hasta PAM objetivo (prescripción).', 'Infusión continua en bomba.'),
      pediatrico: perf('0,05–2 mcg/kg/min titulado (protocolo PALS/UCI pediátrica).'),
      neonatal: perf('0,05–1 mcg/kg/min según protocolo NNU y peso.'),
    },
    stability: '## Estabilidad\n\n- Proteger de la luz. Cambiar solución según política del servicio (habitualmente 24 h).',
    adverseEffects: '## Efectos\n\n- Bradicardia reflexa, arritmias, isquemia periférica, extravasación con necrosis.',
    bibliography: B,
  }),

  'dop-001': build({
    id: 'dop-001',
    name: 'Dopamina',
    executiveSummary: 'Catecolamina con efecto dosis-dependiente: inotrópico y vasopresor; uso según protocolo institucional.',
    indications: '## Indicaciones\n\n- Hipotensión con bajo gasto cardíaco, bradicardia sintomática en contextos específicos.\n- Soporte hemodinámico en situaciones seleccionadas.\n\n## Precauciones\n\n- Taquiarritmias, isquemia mesentérica a dosis vasopresoras. Extravasación.',
    dilution: {
      adulto: perf('2–20 mcg/kg/min titulado según respuesta hemodinámica.'),
      pediatrico: perf('5–20 mcg/kg/min (protocolo pediátrico).'),
      neonatal: perf('2–10 mcg/kg/min en NNU; monitorización estrecha.'),
    },
    stability: '## Estabilidad\n\n- Proteger de la luz; estabilidad 24 h según dilución institucional.',
    adverseEffects: '## Efectos\n\n- Náuseas, arritmias, dolor torácico, vasoconstricción periférica.',
    bibliography: B,
  }),

  'dob-001': build({
    id: 'dob-001',
    name: 'Dobutamina',
    executiveSummary: 'Inotrópico beta-1 para insuficiencia cardíaca aguda y shock cardiogénico con bajo gasto.',
    indications: '## Indicaciones\n\n- Insuficiencia cardíaca aguda descompensada con hipoperfusión.\n- Shock cardiogénico en esquemas combinados.\n\n## Precauciones\n\n- Taquiarritmias. Hipovolemia no corregida puede empeorar hipotensión.',
    dilution: {
      adulto: perf('2,5–20 mcg/kg/min titulado.'),
      pediatrico: perf('2–20 mcg/kg/min según protocolo.'),
      neonatal: perf('2–10 mcg/kg/min en NNU bajo prescripción especializada.'),
    },
    stability: '## Estabilidad\n\n- Usar en 24 h; proteger de la luz según cartilla.',
    adverseEffects: '## Efectos\n\n- Taquicardia, arritmias, hipotensión, cefalea.',
    bibliography: B,
  }),

  'vas-001': build({
    id: 'vas-001',
    name: 'Vasopresina',
    executiveSummary: 'Hormona antidiurética en dosis vasopresoras; coadyuvante en shock séptico refractario.',
    indications: '## Indicaciones\n\n- Shock vasodilatador refractario a catecolaminas.\n- Sangrado por varices esofágicas (esquemas específicos).\n\n## Precauciones\n\n- Isquemia periférica, digital, mesentérica. No bolus rápido salvo protocolo.',
    dilution: {
      adulto: perf('0,03–0,04 UI/min fijo o 0,01–0,04 UI/min según protocolo séptico.'),
      pediatrico: perf('0,0002–0,002 UI/kg/min (protocolo pediátrico).'),
      neonatal: perf('Dosis por kg según protocolo NNU para shock refractario.'),
    },
    stability: '## Estabilidad\n\n- Dilución estable según prospecto; rotar sitio de infusión.',
    adverseEffects: '## Efectos\n\n- Isquemia periférica, bradicardia, hipo/hipernatremia según contexto.',
    bibliography: B,
  }),

  'fen-001': build({
    id: 'fen-001',
    name: 'Fenilefrina',
    executiveSummary: 'Vasopresor alfa-adrenérgico puro; hipotensión intraoperatoria y anafilaxia en esquemas.',
    indications: '## Indicaciones\n\n- Hipotensión durante anestesia.\n- Vasopresor en anafilaxia cuando está indicado en protocolo.\n\n## Precauciones\n\n- Reflejo bradicardia. Cuidado en cardiopatía coronaria.',
    dilution: {
      adulto: perf('Bolus 50–100 mcg IV o perfusión 0,1–0,5 mcg/kg/min.', 'Bolus lento o infusión continua.'),
      pediatrico: perf('1–5 mcg/kg/dosis bolus o perfusión según protocolo.'),
      neonatal: perf('Bolus y perfusión según cartilla NNU; uso restringido.'),
    },
    stability: '## Estabilidad\n\n- Usar solución recién preparada o según prospecto.',
    adverseEffects: '## Efectos\n\n- Bradicardia reflexa, hipertensión, cefalea, extravasación.',
    bibliography: B,
  }),

  'mil-001': build({
    id: 'mil-001',
    name: 'Milrinona',
    executiveSummary: 'Inodilatador (inhibidor fosfodiesterasa III) en insuficiencia cardíaca aguda y fallo biventricular.',
    indications: '## Indicaciones\n\n- Insuficiencia cardíaca aguda con bajo gasto y congestión.\n- Puente a soporte mecánico o recuperación.\n\n## Precauciones\n\n- Hipotensión, arritmias. Ajustar en insuficiencia renal.',
    dilution: {
      adulto: perf('Carga 50 mcg/kg en 10 min (opcional), luego 0,375–0,75 mcg/kg/min.', 'Bolus lento si se usa carga.'),
      pediatrico: perf('0,25–1 mcg/kg/min sin carga habitual en pediatría.'),
    },
    stability: '## Estabilidad\n\n- Dilución 24 h refrigerada según prospecto.',
    adverseEffects: '## Efectos\n\n- Taquiarritmias, hipotensión, cefalea, trombocitopenia.',
    bibliography: B,
  }),

  'ngl-001': build({
    id: 'ngl-001',
    name: 'Nitroglicerina',
    executiveSummary: 'Vasodilatador nitrato para síndrome coronario agudo, edema agudo de pulmón y control de PA.',
    indications: '## Indicaciones\n\n- Síndrome coronario agudo, angina inestable.\n- Edema agudo de pulmón hipertensivo.\n- Control de presión arterial perioperatorio.\n\n## Precauciones\n\n- Hipotensión, uso con inhibidores PDE-5 (contraindicado). Tolerancia con infusión prolongada.',
    dilution: {
      adulto: perf('Inicio 5–10 mcg/min; incrementar cada 3–5 min hasta efecto (máx. protocolo).'),
      pediatrico: perf('0,25–5 mcg/kg/min según protocolo pediátrico cardiológico.'),
      neonatal: perf('0,5–3 mcg/kg/min en NNU; monitorizar TA.'),
    },
    stability: '## Estabilidad\n\n- Usar bolsa de vidrio/polietileno según prospecto; proteger de la luz.',
    adverseEffects: '## Efectos\n\n- Cefalea, hipotensión, taquicardia reflexa, metahemoglobinemia (raro).',
    bibliography: B,
  }),

  'nip-001': build({
    id: 'nip-001',
    name: 'Nitroprusiato sódico',
    executiveSummary: 'Vasodilatador de acción ultrarrápida; crisis hipertensiva y balance ventricular en UCI.',
    indications: '## Indicaciones\n\n- Emergencia hipertensiva con daño de órgano blanco.\n- Insuficiencia cardíaca aguda con afterload elevado.\n\n## Precauciones\n\n- Toxicidad por cianuro/tiocianato con infusión prolongada o dosis altas. Proteger de la luz.',
    dilution: {
      adulto: perf('0,3–10 mcg/kg/min titulado; máximo tiempo de infusión según protocolo.', 'Infusión continua protegida de luz.'),
      pediatrico: perf('0,3–5 mcg/kg/min; monitorizar acidosis y tiocianato.'),
    },
    stability: '## Estabilidad\n\n- Proteger estrictamente de la luz; descartar si solución azul/gris.',
    adverseEffects: '## Efectos\n\n- Hipotensión severa, intoxicación por cianuro, metahemoglobinemia.',
    bibliography: B,
  }),

  'mid-001': build({
    id: 'mid-001',
    name: 'Midazolam',
    executiveSummary: 'Benzodiacepina IV para sedación, ansiolisis y status epilepticus en esquemas combinados.',
    indications: '## Indicaciones\n\n- Sedación en ventilación mecánica y procedimientos.\n- Premedicación y status epilepticus (protocolo).\n\n## Precauciones\n\n- Depresión respiratoria, delirium. Acumulación en IRC y en infusión prolongada.',
    dilution: {
      adulto: {
        presentation: 'Ampolla 5 mg/mL.',
        dose: 'Bolus 1–2 mg IV; sedación continua 0,02–0,1 mg/kg/h.',
        infusionRate: 'Perfusión titulada en bomba.',
        administration: 'IV lenta o infusión continua.',
      },
      pediatrico: { dose: 'Bolus 0,05–0,1 mg/kg; infusión 0,06–0,12 mg/kg/h.', administration: 'IV.' },
      neonatal: { dose: 'Sedación NNU: 0,03–0,06 mg/kg/h (protocolo).', administration: 'IV en bomba.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h según prospecto.',
    adverseEffects: '## Efectos\n\n- Depresión respiratoria, hipotensión, tolerancia, síndrome de abstinencia.',
    bibliography: B,
  }),

  'pro-001': build({
    id: 'pro-001',
    name: 'Propofol',
    executiveSummary: 'Anestésico/sedante IV de inicio y offset rápidos; lipémico, riesgo de síndrome de infusión.',
    indications: '## Indicaciones\n\n- Inducción y mantenimiento anestésico.\n- Sedación en UCI (protocolo con lípidos y triglicéridos).\n\n## Precauciones\n\n- Síndrome de infusión del propofol (PRIS) con dosis altas prolongadas. Contaminación: cadena aséptica estricta.',
    dilution: {
      adulto: {
        presentation: 'Emulsión lipídica 10 mg/mL (frasco/ampolla).',
        dose: 'Inducción 1–2,5 mg/kg IV; sedación 25–75 mcg/kg/min.',
        administration: 'IV sin dilución o en infusión según protocolo.',
        notes: 'Monitorizar triglicéridos y ácido láctico en infusión > 48 h.',
      },
      pediatrico: { dose: 'Inducción 2–3 mg/kg; sedación 1–4 mg/kg/h según edad.', administration: 'IV.' },
      neonatal: { dose: 'Uso restringido en NNU; esquemas de sedación según protocolo.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Cadena aséptica; usar en 6–12 h tras apertura según norma del servicio.',
    adverseEffects: '## Efectos\n\n- Hipotensión, apnea, PRIS (acidosis, rabdomiólisis, fallo cardíaco).',
    bibliography: B,
  }),

  'ket-001': build({
    id: 'ket-001',
    name: 'Ketamina',
    executiveSummary: 'Anestésico disociativo con analgesia; útil en broncoespasmo y sedoanalgesia en shock.',
    indications: '## Indicaciones\n\n- Inducción secuencial, sedoanalgesia en UCI.\n- Broncoespasmo severo refractario (protocolo).\n- Analgesia subdisociativa en bajas dosis.\n\n## Precauciones\n\n- Aumento de secreciones; considerar anticolinérgico. HTA y taquicardia.',
    dilution: {
      adulto: {
        presentation: 'Ampolla 50 mg/mL.',
        dose: 'Analgesia: 0,1–0,3 mg/kg bolus o 0,12–0,36 mg/kg/h. Inducción: 1–2 mg/kg IV.',
        administration: 'IV lenta o infusión.',
      },
      pediatrico: { dose: '1–2 mg/kg IV inducción; 0,5–1 mg/kg analgesia.', administration: 'IV/IM según protocolo.' },
      neonatal: { dose: 'Uso en NNU según protocolo de sedación/analgesia.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente tras dilución si aplica.',
    adverseEffects: '## Efectos\n\n- Alucinaciones, hipertensión, hipersalivación, laringoespasmo (raro).',
    bibliography: B,
  }),

  'fnt-001': build({
    id: 'fnt-001',
    name: 'Fentanilo',
    executiveSummary: 'Opioide potente para analgesia y sedación en UCI y procedimientos; riesgo de rigidez torácica en bolus rápido.',
    indications: '## Indicaciones\n\n- Analgesia perioperatoria y en ventilación mecánica.\n- Sedoanalgesia en UCI.\n\n## Precauciones\n\n- Depresión respiratoria. Bolus lentos. Rigidez torácica con bolus rápidos y dosis altas.',
    dilution: {
      adulto: { presentation: 'Ampolla 50 mcg/mL.', dose: 'Bolus 25–100 mcg IV; infusión 0,5–2 mcg/kg/h.', administration: 'IV lenta o infusión.' },
      pediatrico: { dose: '1–2 mcg/kg bolus; 1–3 mcg/kg/h infusión.', administration: 'IV.' },
      neonatal: { dose: '0,5–2 mcg/kg bolus; infusión según escala de dolor NNU.', administration: 'IV en bomba.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h según prospecto.',
    adverseEffects: '## Efectos\n\n- Depresión respiratoria, rigidez muscular, bradicardia, náuseas.',
    bibliography: B,
  }),

  'mor-001': build({
    id: 'mor-001',
    name: 'Morfina',
    executiveSummary: 'Opioide de referencia para dolor moderado-severo y sedoanalgesia en UCI.',
    indications: '## Indicaciones\n\n- Dolor agudo y crónico en hospitalización.\n- Disnea refractaria en cuidados paliativos (protocolo).\n\n## Precauciones\n\n- Depresión respiratoria, retención urinaria. Ajustar en IRC.',
    dilution: {
      adulto: { presentation: 'Ampolla 10 mg/mL.', dose: '2–5 mg IV cada 5–15 min PRN; PCA o infusión según prescripción.', administration: 'IV lenta.' },
      pediatrico: { dose: '0,05–0,1 mg/kg IV cada 2–4 h o infusión.', administration: 'IV.' },
      neonatal: { dose: '0,01–0,05 mg/kg/dosis según escala de dolor NNU.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Usar dilución en turno.',
    adverseEffects: '## Efectos\n\n- Depresión respiratoria, prurito, náuseas, hipotensión.',
    bibliography: B,
  }),

  'suf-001': build({
    id: 'suf-001',
    name: 'Sufentanilo',
    executiveSummary: 'Opioide muy potente para anestesia balanceada y sedación en UCI.',
    indications: '## Indicaciones\n\n- Analgesia en anestesia mayor.\n- Sedoanalgesia en UCI en esquemas con midazolam/propofol.\n\n## Precauciones\n\n- Alta potencia: errores de dosis críticos. Depresión respiratoria.',
    dilution: {
      adulto: { presentation: 'Ampolla 50 mcg/mL.', dose: 'Bolus 5–20 mcg; infusión 0,1–0,5 mcg/kg/h.', administration: 'IV en bomba.' },
      pediatrico: { dose: '0,5–1 mcg/kg bolus; infusión según protocolo.', administration: 'IV.' },
      neonatal: { dose: 'Microdosis en NNU según protocolo de analgesia.', administration: 'IV en bomba.' },
    },
    stability: '## Estabilidad\n\n- Preparar en bomba con doble control.',
    adverseEffects: '## Efectos\n\n- Apnea, rigidez torácica, bradicardia.',
    bibliography: B,
  }),

  'rem-001': build({
    id: 'rem-001',
    name: 'Remifentanilo',
    executiveSummary: 'Opioide ultracorto metabolizado por esterasas plasmáticas; infusión continua sin acumulación.',
    indications: '## Indicaciones\n\n- Analgesia intraoperatoria.\n- Sedoanalgesia en UCI cuando se requiere offset rápido.\n\n## Precauciones\n\n- Hipotensión y bradicardia. Dolor rebote al suspender si no hay analgesia alternativa.',
    dilution: {
      adulto: { presentation: 'Frasco 1–5 mg.', dose: '0,05–0,2 mcg/kg/min infusión.', administration: 'IV continua exclusivamente.' },
      pediatrico: { dose: '0,1–0,5 mcg/kg/min según protocolo.', administration: 'IV.' },
      neonatal: { dose: 'Uso en NNU según protocolo anestésico/neonatal.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Reconstituir según prospecto; usar en 24 h.',
    adverseEffects: '## Efectos\n\n- Apnea, hipotensión, rigidez muscular, dolor al retirar.',
    bibliography: B,
  }),

  'dex-001': build({
    id: 'dex-001',
    name: 'Dexmedetomidina',
    executiveSummary: 'Alfa-2 agonista para sedación cooperativa en ventilación mecánica; menor depresión respiratoria que benzodiacepinas.',
    indications: '## Indicaciones\n\n- Sedación en VM en UCI.\n- Sedación procedural en esquemas autorizados.\n\n## Precauciones\n\n- Bradicardia e hipotensión. No usar como agente único en agitación severa.',
    dilution: {
      adulto: { presentation: 'Ampolla 100 mcg/mL.', dose: 'Carga 1 mcg/kg en 10 min (opcional), luego 0,2–1,5 mcg/kg/h.', administration: 'IV en bomba.' },
      pediatrico: { dose: '0,2–1 mcg/kg/h sin carga habitual en pediatría.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h; no usar ampolletas con partículas.',
    adverseEffects: '## Efectos\n\n- Bradicardia, hipotensión, boca seca, hipertensión en bolus.',
    bibliography: B,
  }),

  'lor-001': build({
    id: 'lor-001',
    name: 'Lorazepam',
    executiveSummary: 'Benzodiacepina intermedia para sedación, ansiedad y status epilepticus.',
    indications: '## Indicaciones\n\n- Sedación, ansiedad aguda.\n- Status epilepticus (esquemas con benzodiacepinas).\n\n## Precauciones\n\n- Depresión respiratoria. Acumulación en IRC y en ancianos.',
    dilution: {
      adulto: { presentation: 'Ampolla 2–4 mg/mL.', dose: '1–4 mg IV lento PRN sedación; status: 0,1 mg/kg (protocolo).', administration: 'IV lenta.' },
      pediatrico: { dose: '0,05–0,1 mg/kg IV lento.', administration: 'IV.' },
      neonatal: { dose: '0,05 mg/kg IV según protocolo convulsiones NNU.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- IV diluida según prospecto.',
    adverseEffects: '## Efectos\n\n- Sedación excesiva, depresión respiratoria, hipotensión.',
    bibliography: B,
  }),

  'dia-001': build({
    id: 'dia-001',
    name: 'Diazepam',
    executiveSummary: 'Benzodiacepina para sedación, convulsiones y síntomas de abstinencia alcohólica (protocolo).',
    indications: '## Indicaciones\n\n- Status epilepticus (rectal/IV según protocolo).\n- Sedación procedural y abstinencia alcohólica en esquemas.\n\n## Precauciones\n\n- Depresión respiratoria. Vejiga de vejiga en IRC. Veinoso: diazepam emulsión IV específica.',
    dilution: {
      adulto: { presentation: 'Ampolla 5–10 mg.', dose: '5–10 mg IV lento repetible según protocolo.', administration: 'IV muy lenta; IM/rectal según presentación.' },
      pediatrico: { dose: '0,2–0,3 mg/kg IV/rectal status epilepticus.', administration: 'IV lenta o rectal.' },
      neonatal: { dose: '0,1–0,3 mg/kg según protocolo convulsiones.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Precipita con algunos diluyentes; seguir prospecto de formulación IV.',
    adverseEffects: '## Efectos\n\n- Apnea, hipotensión, sedación prolongada.',
    bibliography: B,
  }),

  'amd-001': build({
    id: 'amd-001',
    name: 'Amiodarona',
    executiveSummary: 'Antiarrítmico clase III para taquiarritmias ventriculares y supraventriculares en urgencia y mantenimiento.',
    indications: '## Indicaciones\n\n- FV/pVT refractaria en PCR (después de adrenalina según ACLS).\n- Taquicardia ventricular estable, FA con respuesta ventricular rápida (protocolo).\n\n## Precauciones\n\n- Hipotensión con infusión rápida. Toxicidad pulmonar/hepática con uso crónico.',
    dilution: {
      adulto: {
        presentation: 'Ampolla 150 mg/3 mL.',
        dose: 'PCR: 300 mg IV bolus, luego 150 mg. TV estable: 150 mg en 10 min, perfusión 1 mg/min x 6 h.',
        infusionRate: 'Bolus en 10 min; luego infusión.',
        administration: 'IV en SG 5% (precipita en NaCl).',
      },
      pediatrico: { dose: '5 mg/kg bolus IV; infusión 5–15 mcg/kg/min según protocolo PALS.', administration: 'IV.' },
      neonatal: { dose: '5 mg/kg bolus; infusión según protocolo NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Proteger de la luz; usar línea dedicada si es posible.',
    adverseEffects: '## Efectos\n\n- Hipotensión, bradicardia, hepatotoxicidad, fibrosis pulmonar (crónico).',
    bibliography: B,
  }),

  'lid-001': build({
    id: 'lid-001',
    name: 'Lidocaína',
    executiveSummary: 'Antiarrítmico clase IB para arritmias ventriculares; también anestesia local según presentación.',
    indications: '## Indicaciones\n\n- Taquicardia ventricular sin pulso refractaria (ACLS alternativo).\n- TV/pVC estable en protocolos seleccionados.\n\n## Precauciones\n\n- Toxicidad del SNC y cardíaca por niveles altos. Ajustar en hepatopatía e IRC.',
    dilution: {
      adulto: { presentation: 'Ampolla 1% (10 mg/mL) y 2%.', dose: 'Bolus 1–1,5 mg/kg IV; infusión 1–4 mg/min.', administration: 'IV bolus lento e infusión.' },
      pediatrico: { dose: '1 mg/kg bolus; infusión 20–50 mcg/kg/min.', administration: 'IV.' },
      neonatal: { dose: '0,5–1 mg/kg bolus según protocolo arritmias NNU.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente tras extracción para bolus.',
    adverseEffects: '## Efectos\n\n- Mareo, convulsiones, bradicardia, hipotensión (toxicidad).',
    bibliography: B,
  }),

  'atr-001': build({
    id: 'atr-001',
    name: 'Atropina',
    executiveSummary: 'Anticolinérgico para bradicardia sintomática y intoxicaciones colinérgicas.',
    indications: '## Indicaciones\n\n- Bradicardia sintomática en PCR y fuera de PCR (ACLS/PALS).\n- Premedicación antes de intubación (menos frecuente).\n- Intoxicación por organofosforados (esquemas).\n\n## Precauciones\n\n- Dosis < 0,5 mg en adultos puede causar bradicardia paradójica.',
    dilution: {
      adulto: { presentation: 'Ampolla 1 mg/mL.', dose: 'Bradarrítmia: 1 mg IV cada 3–5 min (máx. 3 mg).', administration: 'IV bolus rápido.' },
      pediatrico: { dose: '0,02 mg/kg IV/IO (mín. 0,1 mg, máx. 0,5 mg infantil / 1 mg adolescente).', administration: 'IV/IO.' },
      neonatal: { dose: '0,02 mg/kg IV (protocolo NRP/PALS neonatal).', administration: 'IV/IO.' },
    },
    stability: '## Estabilidad\n\n- Listo para uso; no diluir salvo protocolo.',
    adverseEffects: '## Efectos\n\n- Taquicardia, boca seca, retención urinaria, midriasis.',
    bibliography: B,
  }),

  'ade-001': build({
    id: 'ade-001',
    name: 'Adenosina',
    executiveSummary: 'Antiarrítmico ultracorto para taquicardia supraventricular paroxística.',
    indications: '## Indicaciones\n\n- Taquicardia supraventricular paroxística (TSVP) estable.\n\n## Precauciones\n\n- Bolus rápido con flush inmediato. Asma grave: usar con cautela. Brevísima asistolia puede ser normal.',
    dilution: {
      adulto: { presentation: 'Ampolla 3 mg/mL.', dose: '6 mg IV bolus rápido, luego 12 mg si persiste (máx. 30 mg).', administration: 'IV proximal con flush 20 mL.' },
      pediatrico: { dose: '0,1 mg/kg bolus (máx. 6 mg), luego 0,2 mg/kg (máx. 12 mg).', administration: 'IV bolus rápido.' },
      neonatal: { dose: '0,05–0,1 mg/kg bolus según protocolo.', administration: 'IV con flush.' },
    },
    stability: '## Estabilidad\n\n- Usar sin dilución; administrar de inmediato.',
    adverseEffects: '## Efectos\n\n- Rubor, disnea transitoria, pausa sinusal breve, broncoespasmo.',
    bibliography: B,
  }),

  'mag-001': build({
    id: 'mag-001',
    name: 'Sulfato de magnesio',
    executiveSummary: 'Electrolito con rol en torsades de pointes, eclampsia y asma severa (protocolo).',
    indications: '## Indicaciones\n\n- Torsades de pointes, hipomagnesemia sintomática.\n- Eclampsia / preeclampsia severa (protocolo obstétrico).\n- Asma severa refractaria (esquemas).\n\n## Precauciones\n\n- Depresión respiratoria y arreflexia en sobredosis. Monitorizar patellar reflex y FR.',
    dilution: {
      adulto: { presentation: 'Ampolla 10% (1 g = 10 mL).', dose: 'Torsades: 1–2 g IV en 15 min. Eclampsia: 4–6 g carga según protocolo.', administration: 'IV lenta.' },
      pediatrico: { dose: '25–50 mg/kg IV en 15–20 min (máx. 2 g).', administration: 'IV lenta.' },
      neonatal: { dose: '25–50 mg/kg IV lenta según protocolo NNU.', administration: 'IV en 20 min.' },
    },
    stability: '## Estabilidad\n\n- Compatible en NaCl 5% y SG 5%.',
    adverseEffects: '## Efectos\n\n- Rubor, hipotensión, depresión respiratoria, arreflexia.',
    bibliography: B,
  }),

  'esm-001': build({
    id: 'esm-001',
    name: 'Esmolol',
    executiveSummary: 'Beta-bloqueante ultracorto para taquicardia supraventricular y control perioperatorio de FC/TA.',
    indications: '## Indicaciones\n\n- Taquicardia supraventricular, control de FC en isquemia aguda.\n- Hipertensión perioperatoria.\n\n## Precauciones\n\n- Contraindicado en bradicardia, bloqueo AV avanzado, asma grave.',
    dilution: {
      adulto: { presentation: 'Ampolla 2500 mg/10 mL.', dose: 'Carga 0,5 mg/kg en 1 min, luego 50–300 mcg/kg/min.', administration: 'IV en bomba.' },
      pediatrico: { dose: '100–300 mcg/kg/min infusión según protocolo cardiológico.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar dentro de 24 h tras preparación.',
    adverseEffects: '## Efectos\n\n- Hipotensión, bradicardia, broncoespasmo, hipoglicemia enmascarada.',
    bibliography: B,
  }),

  'mop-001': build({
    id: 'mop-001',
    name: 'Metoprolol',
    executiveSummary: 'Beta-1 bloqueante para control de FC en síndrome coronario agudo y arritmias supraventriculares.',
    indications: '## Indicaciones\n\n- Taquicardia supraventricular, control de FC en SCA sin contraindicaciones.\n- Hipertensión y arritmias en contextos seleccionados.\n\n## Precauciones\n\n- No usar en bradicardia, bloqueo AV, shock cardiogénico descompensado.',
    dilution: {
      adulto: { presentation: 'Ampolla 1 mg/mL.', dose: '5 mg IV cada 5 min hasta 15 mg según tolerancia.', administration: 'IV lenta.' },
      pediatrico: { dose: '0,1 mg/kg IV cada 5 min (máx. protocolo cardiológico).', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Usar sin dilución o según prospecto IV.',
    adverseEffects: '## Efectos\n\n- Bradicardia, hipotensión, broncoespasmo, fatiga.',
    bibliography: B,
  }),

  'lab-001': build({
    id: 'lab-001',
    name: 'Labetalol',
    executiveSummary: 'Beta/alfa bloqueante para crisis hipertensiva y control de TA en obstetricia (protocolo).',
    indications: '## Indicaciones\n\n- Emergencia hipertensiva con daño de órgano blanco.\n- Hipertensión en embarazo (protocolo obstétrico).\n\n## Precauciones\n\n- Evitar en asma grave, bloqueo AV, shock.',
    dilution: {
      adulto: { presentation: 'Ampolla 5 mg/mL.', dose: '10–20 mg IV bolus cada 10 min; infusión 0,5–2 mg/min.', administration: 'IV lenta o infusión.' },
      pediatrico: { dose: '0,2–1 mg/kg IV cada 10 min (máx. 40 mg/dosis).', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Usar dilución fresca para infusión.',
    adverseEffects: '## Efectos\n\n- Hipotensión ortostática, bradicardia, broncoespasmo.',
    bibliography: B,
  }),

  'nal-001': build({
    id: 'nal-001',
    name: 'Naloxona',
    executiveSummary: 'Antagonista opioide para depresión respiratoria por opioides; vida media más corta que muchos opioides.',
    indications: '## Indicaciones\n\n- Depresión respiratoria por opioides.\n- Intoxicación opioide aguda.\n\n## Precauciones\n\n- Duración corta: puede requerir infusion o repetir dosis. Síndrome de abstinencia agudo.',
    dilution: {
      adulto: { presentation: 'Ampolla 0,4 mg/mL.', dose: '0,04–0,4 mg IV cada 2–3 min hasta respuesta (máx. protocolo).', administration: 'IV/IM/intranasal según protocolo.' },
      pediatrico: { dose: '0,1 mg/kg IV (máx. 2 mg); repetir cada 2–3 min.', administration: 'IV/IO.' },
      neonatal: { dose: '0,1 mg/kg IV/IO si depresión por opioides maternos.', administration: 'IV lento.' },
    },
    stability: '## Estabilidad\n\n- Listo para uso.',
    adverseEffects: '## Efectos\n\n- Náuseas, vómitos, agitación, edema pulmonar (raro), recurrencia de depresión.',
    bibliography: B,
  }),

  'flm-001': build({
    id: 'flm-001',
    name: 'Flumazenil',
    executiveSummary: 'Antagonista de benzodiacepinas en sedación excesiva; riesgo de convulsiones en epilepsia o mezcla con TCA.',
    indications: '## Indicaciones\n\n- Reversión de sedación por benzodiacepinas en procedimientos o VM.\n- Intoxicación benzodiacepínica con depresión respiratoria.\n\n## Precauciones\n\n- Contraindicado si mezcla con antidepresivos tricíclicos o en epilepsia tratada con BZD. Convulsiones.',
    dilution: {
      adulto: { presentation: 'Ampolla 0,1 mg/mL.', dose: '0,2 mg IV en 15 s; repetir 0,2 mg cada 1 min hasta 1 mg (protocolo).', administration: 'IV lenta.' },
      pediatrico: { dose: '0,01 mg/kg IV (máx. 0,2 mg) cada 1 min.', administration: 'IV lenta.' },
      neonatal: { dose: 'Uso muy restringido; 0,01 mg/kg según protocolo NNU.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente tras apertura.',
    adverseEffects: '## Efectos\n\n- Convulsiones, agitación, náuseas, recurrencia de sedación.',
    bibliography: B,
  }),
};
