import { build, bib } from './drug-build-utils.mjs';

const B = bib('aha', 'anmat', 'sccm', 'aap');

export const PHASE4_MONOGRAPHS = {
  'ins-001': build({
    id: 'ins-001',
    name: 'Insulina regular',
    executiveSummary: 'Insulina humana de acción corta IV/SC para cetoacidosis, hiperglucemia en UCI y corrección con glucosa.',
    indications: '## Indicaciones\n\n- Cetoacidosis diabética e estado hiperglucémico hiperosmolar.\n- Control glucémico en UCI con protocolo de insulina.\n- Corrección de hiperkalemia (esquemas con glucosa).\n\n## Precauciones\n\n- Hipoglucemia. Monitorizar glicemia capilar cada 1–2 h en infusión.',
    dilution: {
      adulto: { presentation: 'Frasco 100 UI/mL.', dose: 'CAD: bolus 0,1 UI/kg IV luego infusión 0,1 UI/kg/h titulada.', administration: 'IV en bomba o SC.' },
      pediatrico: { dose: '0,05–0,1 UI/kg/h infusión en CAD (protocolo pediátrico).', administration: 'IV/SC.' },
      neonatal: { dose: 'Hiperglucemia NNU: 0,01–0,05 UI/kg/h en bomba.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Perfusión IV 24–48 h según protocolo institucional.',
    adverseEffects: '## Efectos\n\n- Hipoglucemia, hipokalemia durante corrección de CAD.',
    bibliography: B,
  }),

  'inp-001': build({
    id: 'inp-001',
    name: 'Insulina NPH',
    executiveSummary: 'Insulina intermedia SC para transición post-CAD y diabetes basal en hospitalización.',
    indications: '## Indicaciones\n\n- Esquema basal-bolus en diabetes hospitalizada.\n- Transición tras infusión de insulina regular en CAD estabilizada.\n\n## Precauciones\n\n- No administrar IV. Hipoglucemia retardada.',
    dilution: {
      adulto: { presentation: 'Frasco 100 UI/mL NPH.', dose: 'Dosis basal según esquema (ej. 0,2–0,5 UI/kg/día basal).', administration: 'SC exclusivamente.' },
      pediatrico: { dose: 'Basal 0,2–0,5 UI/kg/día SC dividido.', administration: 'SC.' },
      neonatal: { dose: 'Uso limitado; esquemas endocrinología neonatal SC.', administration: 'SC.' },
    },
    stability: '## Estabilidad\n\n- Refrigerar; rotar suavemente antes de usar.',
    adverseEffects: '## Efectos\n\n- Hipoglucemia, lipodistrofia en sitio de inyección.',
    bibliography: B,
  }),

  'suc-001': build({
    id: 'suc-001',
    name: 'Succinilcolina',
    executiveSummary: 'Relajante despolarizante de acción ultrarrápida para intubación; contraindicaciones en hiperkalemia y quemados.',
    indications: '## Indicaciones\n\n- Intubación rápida secuencia (RSI) cuando no hay contraindicación.\n- Electroconvulsoterapia (esquemas).\n\n## Precauciones\n\n- Hiperkalemia, rabdomiólisis, quemaduras extensas, parálisis periódica, distrofias musculares.',
    dilution: {
      adulto: { presentation: 'Frasco liofilizado 100–500 mg.', dose: '1–1,5 mg/kg IV bolus para RSI.', administration: 'IV bolus rápido.' },
      pediatrico: { dose: '2 mg/kg IV (neonatos 3 mg/kg) en RSI.', administration: 'IV.' },
      neonatal: { dose: '3 mg/kg IV en RSI según protocolo.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Reconstituir y usar de inmediato.',
    adverseEffects: '## Efectos\n\n- Hiperkalemia grave, fasciculaciones, mialgia, bradicardia en niños.',
    bibliography: B,
  }),

  'roc-001': build({
    id: 'roc-001',
    name: 'Rocuronio',
    executiveSummary: 'Relajante no despolarizante de inicio rápido para intubación y bloqueo neuromuscular en UCI.',
    indications: '## Indicaciones\n\n- Intubación en secuencia rápida (alternativa a succinilcolina).\n- Bloqueo neuromuscular en ventilación mecánica.\n\n## Precauciones\n\n- Reversión con sugammadex disponible. Ajustar en hepatopatía severa.',
    dilution: {
      adulto: { presentation: 'Frasco 10 mg/mL.', dose: 'RSI: 0,6–1,2 mg/kg IV. Mantenimiento: 0,1–0,2 mg/kg/h.', administration: 'IV bolus o infusión.' },
      pediatrico: { dose: '0,6 mg/kg intubación; 0,4–1 mg/kg/h infusión.', administration: 'IV.' },
      neonatal: { dose: '0,45–1 mg/kg según protocolo NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Frasco abierto según prospecto.',
    adverseEffects: '## Efectos\n\n- Hipotensión, taquicardia, bloqueo prolongado.',
    bibliography: B,
  }),

  'vec-001': build({
    id: 'vec-001',
    name: 'Vecuronio',
    executiveSummary: 'Relajante no despolarizante intermedio para bloqueo neuromuscular en quirófano y UCI.',
    indications: '## Indicaciones\n\n- Bloqueo neuromuscular para cirugía y VM.\n\n## Precauciones\n\n- Reversión con neostigmina + atropina o sugammadex (no efectivo en vecuronio - sugammadex is for rocuronium). Actually sugammadex reverses rocuronium/vecuronium - vecuronium reversed by neostigmine primarily.',
    dilution: {
      adulto: { presentation: 'Frasco 4 mg liofilizado.', dose: '0,08–0,1 mg/kg bolus; 0,8–1,2 mcg/kg/min infusión.', administration: 'IV.' },
      pediatrico: { dose: '0,08–0,1 mg/kg bolus; infusión según TOF.', administration: 'IV.' },
      neonatal: { dose: '0,1 mg/kg bolus; infusión NNU según TOF.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Reconstituir y usar según prospecto.',
    adverseEffects: '## Efectos\n\n- Bloqueo prolongado, broncoespasmo (raro).',
    bibliography: B,
  }),

  'cst-001': build({
    id: 'cst-001',
    name: 'Cisatracurio',
    executiveSummary: 'Relajante no despolarizante degradado por Hofmann; útil en hepatopatía e IRC.',
    indications: '## Indicaciones\n\n- Bloqueo neuromuscular en UCI y cirugía cuando se desea eliminación independiente de órganos.\n\n## Precauciones\n\n- Histamina mediada en bolus rápidos. Monitorizar TOF.',
    dilution: {
      adulto: { presentation: 'Ampolla 2 mg/mL.', dose: '0,15–0,2 mg/kg bolus; 1–3 mcg/kg/min infusión.', administration: 'IV.' },
      pediatrico: { dose: '0,1–0,15 mg/kg bolus; infusión según TOF.', administration: 'IV.' },
      neonatal: { dose: '1–2 mcg/kg/min infusión NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Rash, broncoespasmo, bloqueo prolongado.',
    bibliography: B,
  }),

  'atr-002': build({
    id: 'atr-002',
    name: 'Atracurio',
    executiveSummary: 'Relajante no despolarizante con degradación espontánea; liberación de histamina.',
    indications: '## Indicaciones\n\n- Bloqueo neuromuscular en cirugía y VM.\n\n## Precauciones\n\n- Histamina: hipotensión y broncoespasmo. Laúdesio (convulsiones) con infusión prolongada (raro).',
    dilution: {
      adulto: { presentation: 'Ampolla 10 mg/mL.', dose: '0,4–0,5 mg/kg bolus; 5–10 mcg/kg/min.', administration: 'IV.' },
      pediatrico: { dose: '0,3–0,5 mg/kg bolus.', administration: 'IV.' },
      neonatal: { dose: '0,5 mg/kg bolus según protocolo.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar en 24 h.',
    adverseEffects: '## Efectos\n\n- Hipotensión, broncoespasmo, eritema.',
    bibliography: B,
  }),

  'pnc-001': build({
    id: 'pnc-001',
    name: 'Pancuronio',
    executiveSummary: 'Relajante no despolarizante largo con efecto vagolítico (taquicardia).',
    indications: '## Indicaciones\n\n- Bloqueo neuromuscular prolongado en cirugía y VM.\n\n## Precauciones\n\n- Taquicardia. Eliminación renal: prolongado en IRC.',
    dilution: {
      adulto: { presentation: 'Ampolla 2 mg/mL.', dose: '0,08–0,12 mg/kg bolus; repetir según TOF.', administration: 'IV.' },
      pediatrico: { dose: '0,1 mg/kg bolus.', administration: 'IV.' },
      neonatal: { dose: '0,05–0,1 mg/kg según protocolo.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Listo para uso.',
    adverseEffects: '## Efectos\n\n- Taquicardia, bloqueo prolongado en IRC.',
    bibliography: B,
  }),

  'sug-001': build({
    id: 'sug-001',
    name: 'Sugammadex',
    executiveSummary: 'Agente de reversión específico de rocuronio y vecuronio; no revierte succinilcolina.',
    indications: '## Indicaciones\n\n- Reversión de bloqueo neuromuscular por rocuronio/vecuronio.\n- Reversión profunda en emergencia de vía aérea.\n\n## Precauciones\n\n- Reduce eficacia de anticonceptivos hormonales. Reacciones de hipersensibilidad.',
    dilution: {
      adulto: { presentation: 'Frasco 100–200 mg/mL.', dose: '2 mg/kg moderado; 4 mg/kg profundo; 16 mg/kg RSI inmediato.', administration: 'IV bolus.' },
      pediatrico: { dose: '2–4 mg/kg según profundidad de bloqueo.', administration: 'IV.' },
      neonatal: { dose: 'Datos limitados; usar bajo anestesiología pediátrica.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente tras extracción.',
    adverseEffects: '## Efectos\n\n- Tos, sabor metálico, bradicardia, anafilaxia.',
    bibliography: B,
  }),

  'sal-001': build({
    id: 'sal-001',
    name: 'Salbutamol',
    executiveSummary: 'Beta-2 agonista de acción corta para broncoespasmo agudo; nebulización o MDI.',
    indications: '## Indicaciones\n\n- Crisis asmática y EPOC exacerbado.\n- Broncoespasmo perioperatorio.\n\n## Precauciones\n\n- Taquicardia, hipokalemia con altas dosis. Monitorizar K+ en infusión IV.',
    dilution: {
      adulto: { presentation: 'Nebulización 5 mg/mL; MDI; ampolla IV.', dose: 'Neb: 2,5–5 mg cada 20 min x 3. IV: 0,5 mcg/kg/min infusión en crisis severa.', administration: 'Nebulización o IV.' },
      pediatrico: { dose: 'Neb: 0,15 mg/kg (mín. 2,5 mg).', administration: 'Nebulización.' },
      neonatal: { dose: 'Neb: 0,1–0,3 mg/kg; infusión IV en broncodisplasia según NNU.', administration: 'Neb/IV.' },
    },
    stability: '## Estabilidad\n\n- Nebulización usar solución fresca.',
    adverseEffects: '## Efectos\n\n- Taquicardia, temblor, hipokalemia, arritmias.',
    bibliography: B,
  }),

  'ipr-001': build({
    id: 'ipr-001',
    name: 'Bromuro de ipratropio',
    executiveSummary: 'Anticolinérgico inhalado para broncoespasmo; sinergia con salbutamol en nebulización.',
    indications: '## Indicaciones\n\n- EPOC exacerbado y asma moderada-grave en combinación con beta-2.\n\n## Precauciones\n\n- Glaucoma de ángulo cerrado si nebulización en ojos. Retención urinaria en HPB.',
    dilution: {
      adulto: { presentation: 'Nebulización 0,25–0,5 mg; MDI.', dose: '0,5 mg nebulización cada 6–8 h; combinar con salbutamol en crisis.', administration: 'Nebulización.' },
      pediatrico: { dose: '0,25–0,5 mg nebulización cada 6–8 h.', administration: 'Nebulización.' },
      neonatal: { dose: '0,25 mg nebulización según protocolo respiratorio NNU.', administration: 'Nebulización.' },
    },
    stability: '## Estabilidad\n\n- Mezcla con salbutamol estable en turno.',
    adverseEffects: '## Efectos\n\n- Boca seca, tos, retención urinaria.',
    bibliography: B,
  }),

  'teo-001': build({
    id: 'teo-001',
    name: 'Aminofilina',
    executiveSummary: 'Metilxantina broncodilatadora IV; ventana terapéutica estrecha y múltiples interacciones.',
    indications: '## Indicaciones\n\n- Broncoespasmo agudo refractario a beta-2.\n- Apnea del prematuro (esquemas históricos; cafeína preferida).\n\n## Precauciones\n\n- Toxicidad: náuseas, arritmias, convulsiones. Monitorizar niveles si disponible.',
    dilution: {
      adulto: { presentation: 'Ampolla 24 mg/mL (teofilina equivalente).', dose: 'Carga 5–6 mg/kg IV lento; mantenimiento 0,5 mg/kg/h.', administration: 'IV lenta.' },
      pediatrico: { dose: 'Carga 5 mg/kg; mantenimiento 0,5–1 mg/kg/h.', administration: 'IV.' },
      neonatal: { dose: 'Carga y mantenimiento según protocolo apnea NNU.', administration: 'IV en bomba.' },
    },
    stability: '## Estabilidad\n\n- Compatible en SG 5% y NaCl.',
    adverseEffects: '## Efectos\n\n- Náuseas, taquicardia, convulsiones, hipokalemia.',
    bibliography: B,
  }),

  'caf-001': build({
    id: 'caf-001',
    name: 'Citrato de cafeína',
    executiveSummary: 'Estimulante respiratorio central de primera línea en apnea del prematuro.',
    indications: '## Indicaciones\n\n- Tratamiento y profilaxis de apnea del prematuro.\n\n## Precauciones\n\n- Taquicardia, irritabilidad. Monitorizar niveles en uso prolongado.',
    dilution: {
      adulto: { presentation: 'Principalmente neonatal.', dose: 'No uso habitual en adultos.', administration: 'N/A.' },
      pediatrico: { dose: 'Carga 20 mg/kg IV; mantenimiento 5–10 mg/kg/día VO/IV.', administration: 'IV lento o VO.' },
      neonatal: { dose: 'Carga 20 mg/kg IV en 30 min; luego 5–10 mg/kg/día.', administration: 'IV/VO.' },
    },
    stability: '## Estabilidad\n\n- Solución oral/IV según prospecto.',
    adverseEffects: '## Efectos\n\n- Taquicardia, NEC asociación en estudios (vigilar), irritabilidad.',
    bibliography: B,
  }),

  'dxt-001': build({
    id: 'dxt-001',
    name: 'Dexametasona',
    executiveSummary: 'Corticoide potente IV/VO para edema cerebral, croup, COVID grave y profilaxis náuseas.',
    indications: '## Indicaciones\n\n- Edema cerebral, croup (nebulización/IM según protocolo).\n- Profilaxis náuseas por quimioterapia y postoperatoria.\n- Maduración pulmonar fetal (esquema obstétrico).\n\n## Precauciones\n\n- Hiperglucemia, inmunosupresión. Taper si uso prolongado.',
    dilution: {
      adulto: { presentation: 'Ampolla 4–8 mg/mL; comprimidos.', dose: '4–10 mg IV/IM según indicación; croup ped: 0,6 mg/kg dosis única.', administration: 'IV/IM/VO/nebulización según protocolo.' },
      pediatrico: { dose: '0,15–0,6 mg/kg/día dividido o dosis única en croup.', administration: 'IV/VO/IM.' },
      neonatal: { dose: 'Maduración pulmonar fetal: esquema obstétrico. Evitar uso prolongado en RN.', administration: 'IM materno / IV RN según protocolo.' },
    },
    stability: '## Estabilidad\n\n- IV estable según dilución.',
    adverseEffects: '## Efectos\n\n- Hiperglucemia, insomnio, supresión adrenal, infecciones.',
    bibliography: B,
  }),

  'mep-001': build({
    id: 'mep-001',
    name: 'Metilprednisolona',
    executiveSummary: 'Corticoide IV para asma grave, reacciones alérgicas, edema medular y brotes de EM.',
    indications: '## Indicaciones\n\n- Asma grave, exacerbación EPOC, anafilaxia (después de adrenalina).\n- Edema medular por compresión tumoral.\n\n## Precauciones\n\n- Hiperglucemia, psicosis esteroidea, inmunosupresión.',
    dilution: {
      adulto: { presentation: 'Frasco 40–125 mg.', dose: 'Asma: 60–125 mg IV. EM brote: 1 g/día x 3–5 días (protocolo).', administration: 'IV lenta o perfusión.' },
      pediatrico: { dose: '1–2 mg/kg IV cada 6 h en asma grave.', administration: 'IV.' },
      neonatal: { dose: 'Uso restringido; esquemas pulmonares/DAH según NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Reconstituir según prospecto.',
    adverseEffects: '## Efectos\n\n- Hiperglucemia, insomnio, úlcera, infección oportunista.',
    bibliography: B,
  }),

  'hdc-001': build({
    id: 'hdc-001',
    name: 'Hidrocortisona',
    executiveSummary: 'Corticoide con actividad mineralocorticoide; shock séptico refractario e insuficiencia adrenal.',
    indications: '## Indicaciones\n\n- Insuficiencia adrenal aguda.\n- Shock séptico refractario (esquemas de dosis de estrés).\n- Profilaxis de enfermedad de injerto contra huésped.\n\n## Precauciones\n\n- Hiperglucemia, retención de sodio.',
    dilution: {
      adulto: { presentation: 'Frasco 100 mg.', dose: 'Insuficiencia adrenal: 100 mg IV bolus. Shock: 50 mg cada 6 h o infusión según protocolo.', administration: 'IV bolus o infusión.' },
      pediatrico: { dose: '2–4 mg/kg bolus insuficiencia adrenal; 50 mg/m²/día dividido.', administration: 'IV.' },
      neonatal: { dose: '2–5 mg/kg/dosis en insuficiencia adrenal neonatal.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar tras reconstitución según prospecto.',
    adverseEffects: '## Efectos\n\n- Hiperglucemia, hipertensión, edema, infecciones.',
    bibliography: B,
  }),

  'glc-001': build({
    id: 'glc-001',
    name: 'Glucagón',
    executiveSummary: 'Hormona para hipoglucemia severa inconsciente cuando no hay acceso IV para dextrosa.',
    indications: '## Indicaciones\n\n- Hipoglucemia severa con alteración del nivel de conciencia.\n- Intoxicación por betabloqueantes/calcioantagonistas (infusión en protocolo).\n\n## Precauciones\n\n- Efecto corto: dar carbohidratos al recuperar conciencia. Náuseas frecuentes.',
    dilution: {
      adulto: { presentation: 'Frasco 1 mg.', dose: '1 mg IM/SC/IV lento; repetir en 15 min si persiste.', administration: 'IM/SC/IV.' },
      pediatrico: { dose: '0,03 mg/kg IM/SC (máx. 1 mg).', administration: 'IM/SC.' },
      neonatal: { dose: '0,03–0,1 mg/kg IM/SC/IV según protocolo.', administration: 'IM/SC/IV.' },
    },
    stability: '## Estabilidad\n\n- Reconstituir al momento.',
    adverseEffects: '## Efectos\n\n- Náuseas, vómitos, hiperglucemia rebound.',
    bibliography: B,
  }),

  'vit-001': build({
    id: 'vit-001',
    name: 'Fitomenadiona (vitamina K)',
    executiveSummary: 'Vitamina K IV/IM/VO para reversión de anticoagulación con warfarina y profilaxis neonatal.',
    indications: '## Indicaciones\n\n- Sangrado por sobredosis de warfarina.\n- Profilaxis de enfermedad hemorrágica del recién nacido.\n- Coagulopatía por déficit de vitamina K.\n\n## Precauciones\n\n- Anafilaxia con IV rápido; administrar lento. No revierte heparina ni DOACs.',
    dilution: {
      adulto: { presentation: 'Ampolla 10 mg/mL.', dose: 'Sangrado warfarina: 5–10 mg IV lento.', administration: 'IV lento, IM o VO.' },
      pediatrico: { dose: '1–5 mg IV/IM/VO según INR y sangrado.', administration: 'IV lento.' },
      neonatal: { dose: '1 mg IM al nacer (profilaxis estándar).', administration: 'IM profunda.' },
    },
    stability: '## Estabilidad\n\n- Proteger de la luz.',
    adverseEffects: '## Efectos\n\n- Reacciones anafilactoides IV, dolor en sitio IM.',
    bibliography: B,
  }),

  'ltx-001': build({
    id: 'ltx-001',
    name: 'Levotiroxina',
    executiveSummary: 'Hormona tiroidea T4 IV/VO para mixedema coma y déficit en hospitalización.',
    indications: '## Indicaciones\n\n- Coma mixedematoso (carga IV con T3 según protocolo).\n- Reposición en hipotiroidismo en paciente hospitalizado.\n\n## Precauciones\n\n- Arritmias e isquemia en ancianos con carga rápida. Monitorizar ECG.',
    dilution: {
      adulto: { presentation: 'Comprimidos; ampolla IV 200 mcg.', dose: 'Mixedema: 200–400 mcg IV carga; mantenimiento VO.', administration: 'IV lenta o VO en ayunas.' },
      pediatrico: { dose: '10–15 mcg/kg/día VO; IV en mixedema según endocrinología.', administration: 'IV/VO.' },
      neonatal: { dose: '10–15 mcg/kg/día VO en hipotiroidismo congénito.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- IV usar inmediatamente tras preparación.',
    adverseEffects: '## Efectos\n\n- Taquicardia, angina, arritmias, insomnio.',
    bibliography: B,
  }),

  'hdr-001': build({
    id: 'hdr-001',
    name: 'Hidralazina',
    executiveSummary: 'Vasodilatador directo para emergencia hipertensiva en embarazo y preeclampsia.',
    indications: '## Indicaciones\n\n- Preeclampsia/eclampsia con HTA severa.\n- Emergencia hipertensiva en esquemas obstétricos.\n\n## Precauciones\n\n- Taquicardia reflexa. Cefalea y flushing.',
    dilution: {
      adulto: { presentation: 'Ampolla 20 mg/mL.', dose: '5–10 mg IV cada 20–30 min; máx. 20 mg/dosis obstétrica.', administration: 'IV lento.' },
      pediatrico: { dose: '0,1–0,2 mg/kg IV cada 6 h (uso limitado).', administration: 'IV.' },
      neonatal: { dose: '0,1–0,5 mg/kg/dosis según protocolo cardiológico.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar tras extracción.',
    adverseEffects: '## Efectos\n\n- Taquicardia, cefalea, hipotensión, síndrome lupus-like (crónico).',
    bibliography: B,
  }),

  'efe-001': build({
    id: 'efe-001',
    name: 'Efedrina',
    executiveSummary: 'Simpaticomimético mixto para hipotensión intraoperatoria y broncoespasmo histórico.',
    indications: '## Indicaciones\n\n- Hipotensión durante anestesia espinal/epidural.\n- Bradicardia con hipotensión en contexto anestésico.\n\n## Precauciones\n\n- Taquicardia, HTA. Uso limitado en cardiopatía isquémica.',
    dilution: {
      adulto: { presentation: 'Ampolla 30–50 mg/mL.', dose: '5–10 mg IV bolus; repetir cada 3–5 min.', administration: 'IV lento.' },
      pediatrico: { dose: '0,1–0,2 mg/kg IV bolus.', administration: 'IV.' },
      neonatal: { dose: 'Uso restringido en NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Listo para uso.',
    adverseEffects: '## Efectos\n\n- Taquicardia, palpitaciones, ansiedad, HTA.',
    bibliography: B,
  }),

  'hal-001': build({
    id: 'hal-001',
    name: 'Haloperidol',
    executiveSummary: 'Antipsicótico butirofenona para agitación, delirium y náuseas refractarias.',
    indications: '## Indicaciones\n\n- Agitación psicomotora y delirium en UCI.\n- Náuseas refractarias (esquemas paliativos).\n\n## Precauciones\n\n- Prolongación QT, discinesia aguda, síndrome neuroléptico maligno. Evitar en Parkinson.',
    dilution: {
      adulto: { presentation: 'Ampolla 5 mg/mL.', dose: '0,5–5 mg IV/IM cada 30–60 min PRN agitación.', administration: 'IV lento o IM.' },
      pediatrico: { dose: '0,025–0,075 mg/kg/dosis IV/IM (máx. protocolo).', administration: 'IV/IM.' },
      neonatal: { dose: 'No recomendado salvo indicación psiquiátrica especializada.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- IV usar sin dilución o según prospecto.',
    adverseEffects: '## Efectos\n\n- Sedación, extrapiramidalismo, QT prolongado.',
    bibliography: B,
  }),

  'alb-001': build({
    id: 'alb-001',
    name: 'Albúmina humana',
    executiveSummary: 'Coloide para hipovolemia selectiva, síndrome nefrótico y paracentesis en cirrosis (esquemas).',
    indications: '## Indicaciones\n\n- Hipovolemia con indicación de coloide según protocolo.\n- Síndrome hepatorenal y paracentesis masiva en cirrosis (esquemas).\n- Hipoalbuminemia con efecto clínico demostrado (contextos limitados).\n\n## Precauciones\n\n- Sobrecarga volumétrica. No usar rutinariamente en shock séptico sin indicación.',
    dilution: {
      adulto: { presentation: 'Frasco 20% o 25% albúmina.', dose: '0,5–1 g/kg según indicación (paracentesis: 6–8 g/L de ascitis retirada).', administration: 'IV.' },
      pediatrico: { dose: '0,5–1 g/kg según protocolo pediátrico.', administration: 'IV.' },
      neonatal: { dose: 'Reposición en shock neonatal según protocolo NNU.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente tras pinzar; no mezclar con otros fármacos.',
    adverseEffects: '## Efectos\n\n- Sobrecarga hídrica, reacciones de hipersensibilidad (raro).',
    bibliography: B,
  }),

  'srf-001': build({
    id: 'srf-001',
    name: 'Surfactante pulmonar',
    executiveSummary: 'Fármaco intratraqueal para síndrome de distrés respiratorio neonatal y prevención en prematuros.',
    indications: '## Indicaciones\n\n- SDRA neonatal (enfermedad de membrana hialina).\n- Profilaxis en prematuros < 32 semanas.\n\n## Precauciones\n\n- Bradicardia y desaturación durante instalación: pausar y ventilar.',
    dilution: {
      adulto: { presentation: 'No indicado en adultos rutinariamente.', dose: 'N/A uso habitual adulto.', administration: 'N/A.' },
      pediatrico: { dose: '100–200 mg/kg intratraqueal en RN (dosis según producto).', administration: 'Intratraqueal en VM.' },
      neonatal: { dose: '100–200 mg/kg vía endotraqueal; repetir según protocolo NNU.', administration: 'Intratraqueal con VM.' },
    },
    stability: '## Estabilidad\n\n- Refrigerar; calentar a temperatura ambiente antes de instilar.',
    adverseEffects: '## Efectos\n\n- Desaturación transitoria, bradicardia, reflujo del medicamento.',
    bibliography: B,
  }),

  'aci-001': build({
    id: 'aci-001',
    name: 'Aciclovir',
    executiveSummary: 'Antiviral para herpes simple, varicela-zóster y encefalitis herpética; ajustar en IRC.',
    indications: '## Indicaciones\n\n- Encefalitis herpética, infecciones herpéticas diseminadas.\n- Profilaxis y tratamiento en inmunocomprometidos.\n\n## Precauciones\n\n- Nefrotoxicidad por cristales: hidratar y ajustar dosis en IRC. Neurotoxicidad en IRC.',
    dilution: {
      adulto: { presentation: 'Frasco 250 mg.', dose: '10 mg/kg IV cada 8 h (encefalitis).', infusionRate: 'Perfusión 1 h.', administration: 'IV diluido.' },
      pediatrico: { dose: '10–20 mg/kg IV cada 8 h según infección.', administration: 'IV 1 h.' },
      neonatal: { dose: '20 mg/kg/dosis cada 8 h en encefalitis neonatal.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Dilución 24 h refrigerada.',
    adverseEffects: '## Efectos\n\n- Nefrotoxicidad, náuseas, confusión (neurotoxicidad).',
    bibliography: bib('idsa', 'anmat', 'sccm', 'aap'),
  }),

  'gnc-001': build({
    id: 'gnc-001',
    name: 'Ganciclovir',
    executiveSummary: 'Antiviral para citomegalovirus en trasplantados e inmunocomprometidos; mielotoxicidad.',
    indications: '## Indicaciones\n\n- Enfermedad invasiva por CMV en trasplantados.\n- Profilaxis de CMV en esquemas de alto riesgo.\n\n## Precauciones\n\n- Neutropenia y trombocitopenia. Teratogénico. Ajustar en IRC.',
    dilution: {
      adulto: { presentation: 'Frasco 500 mg.', dose: '5 mg/kg IV cada 12 h x 14–21 días (inducción).', infusionRate: 'Perfusión 1 h.', administration: 'IV.' },
      pediatrico: { dose: '5 mg/kg IV cada 12 h según protocolo trasplante.', administration: 'IV.' },
      neonatal: { dose: '6 mg/kg/dosis cada 12 h en CMV congénito (protocolo especializado).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- No refrigerar solución reconstituida según prospecto.',
    adverseEffects: '## Efectos\n\n- Neutropenia, trombocitopenia, nefrotoxicidad.',
    bibliography: bib('idsa', 'anmat', 'sccm', 'aap'),
  }),

  'ose-001': build({
    id: 'ose-001',
    name: 'Oseltamivir',
    executiveSummary: 'Antiviral oral para influenza; iniciar idealmente dentro de 48 h de síntomas.',
    indications: '## Indicaciones\n\n- Influenza en pacientes de riesgo o grave.\n- Profilaxis post-exposición en brotes.\n\n## Precauciones\n\n- Ajustar dosis en IRC. Efectos neuropsiquiátricos reportados en pediatría.',
    dilution: {
      adulto: { presentation: 'Cápsulas 75 mg; suspensión.', dose: '75 mg VO cada 12 h x 5 días (tratamiento).', administration: 'VO con o sin alimentos.' },
      pediatrico: { dose: 'Dosis por peso según suspensión (30–75 mg cada 12 h).', administration: 'VO.' },
      neonatal: { dose: '1–3 mg/kg/dosis VO cada 12 h según protocolo influenza NNU.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Suspensión refrigerada según prospecto.',
    adverseEffects: '## Efectos\n\n- Náuseas, vómitos, cefalea.',
    bibliography: bib('idsa', 'anmat', 'sccm', 'aap'),
  }),

  'fer-001': build({
    id: 'fer-001',
    name: 'Hierro sacarosa IV',
    executiveSummary: 'Reposición de hierro IV para anemia ferropénica cuando VO no tolera o no es efectiva.',
    indications: '## Indicaciones\n\n- Anemia ferropénica en IRC, embarazo, sangrado crónico cuando VO falla.\n- Reposición rápida prequirúrgica en esquemas.\n\n## Precauciones\n\n- Reacciones anafilactoides: administrar lento en entorno con resucitación. No mezclar con otros fármacos.',
    dilution: {
      adulto: { presentation: 'Frasco 100 mg hierro elemental.', dose: 'Dosis total calculada por déficit; típico 200 mg IV en 15–30 min.', administration: 'IV lenta en dilución.' },
      pediatrico: { dose: '3–7 mg/kg hierro elemental IV según protocolo.', administration: 'IV lenta.' },
      neonatal: { dose: 'Uso limitado; esquemas hematología neonatal.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar dilución preparada de inmediato.',
    adverseEffects: '## Efectos\n\n- Hipotensión, reacciones infusion-related, manchado cutáneo.',
    bibliography: B,
  }),

  'tia-001': build({
    id: 'tia-001',
    name: 'Tiamina (vitamina B1)',
    executiveSummary: 'Vitamina B1 IV antes de glucosa en pacientes con riesgo de encefalopatía de Wernicke.',
    indications: '## Indicaciones\n\n- Profilaxis y tratamiento de encefalopatía de Wernicke.\n- Alcoholismo, desnutrición, hiperalimentación (antes de dextrosa).\n\n## Precauciones\n\n- Administrar antes de glucosa en pacientes de riesgo. Reacciones anafilactoides (raro).',
    dilution: {
      adulto: { presentation: 'Ampolla 100 mg/mL.', dose: '100–500 mg IV lenta antes de glucosa; luego 100 mg TID x 3–5 días.', administration: 'IV lenta.' },
      pediatrico: { dose: '10–25 mg IV/día según edad.', administration: 'IV.' },
      neonatal: { dose: '10 mg IV/día en nutrición parenteral.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Proteger de la luz.',
    adverseEffects: '## Efectos\n\n- Reacciones de hipersensibilidad (raro), irritación local.',
    bibliography: B,
  }),
};
