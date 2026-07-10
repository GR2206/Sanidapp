import { build, bib } from './drug-build-utils.mjs';

const B = bib('aha', 'anmat', 'sccm', 'aap');

export const PHASE3_MONOGRAPHS = {
  'fny-001': build({
    id: 'fny-001',
    name: 'Fenitoína',
    executiveSummary: 'Anticonvulsivante y antiarrítmico clase IB; carga lenta IV en status epilepticus con monitorización de PA.',
    indications: '## Indicaciones\n\n- Status epilepticus (después de benzodiacepinas).\n- Profilaxis y tratamiento de convulsiones en neurocirugía/trauma.\n\n## Precauciones\n\n- Hipotensión y arritmias con infusión rápida. Extravasación: síndrome del guante calcificado. Monitorizar niveles.',
    dilution: {
      adulto: { presentation: 'Ampolla 50 mg/mL.', dose: 'Carga 15–20 mg/kg IV (máx. 1500 mg) a ≤ 50 mg/min.', infusionRate: 'No exceder 50 mg/min.', administration: 'IV en SF 0,9% (no SG 5%).' },
      pediatrico: { dose: '15–20 mg/kg carga IV a 1 mg/kg/min.', administration: 'IV lenta.' },
      neonatal: { dose: '15–20 mg/kg carga; mantenimiento según niveles NNU.', administration: 'IV muy lenta.' },
    },
    stability: '## Estabilidad\n\n- Precipita con SG 5%; usar NaCl 0,9%.',
    adverseEffects: '## Efectos\n\n- Nistagmo, ataxia, hipotensión, arritmias, toxicidad con niveles altos.',
    bibliography: B,
  }),

  'phb-001': build({
    id: 'phb-001',
    name: 'Fenobarbital',
    executiveSummary: 'Barbitúrico antiepiléptico; segunda línea en status epilepticus refractario.',
    indications: '## Indicaciones\n\n- Status epilepticus refractario a benzodiacepinas y fenitoína.\n- Convulsiones neonatales (protocolo NNU).\n\n## Precauciones\n\n- Depresión respiratoria. Acumulación y sedación prolongada.',
    dilution: {
      adulto: { presentation: 'Ampolla 200 mg/mL.', dose: 'Carga 15–20 mg/kg IV lenta; mantenimiento 1–3 mg/kg/día.', administration: 'IV muy lenta.' },
      pediatrico: { dose: '15–20 mg/kg carga IV; 3–5 mg/kg/día mantenimiento.', administration: 'IV lenta.' },
      neonatal: { dose: 'Carga 15–20 mg/kg; mantenimiento 3–4 mg/kg/día (NNU).', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- No mezclar con otros fármacos en Y.',
    adverseEffects: '## Efectos\n\n- Sedación, depresión respiratoria, hipotensión, rash.',
    bibliography: B,
  }),

  'lvt-001': build({
    id: 'lvt-001',
    name: 'Levetiracetam',
    executiveSummary: 'Anticonvulsivante IV/VO de amplio espectro; útil en status y profilaxis sin interacciones CYP relevantes.',
    indications: '## Indicaciones\n\n- Status epilepticus (carga IV).\n- Monoterapia o adyuvante en epilepsia focal y generalizada.\n\n## Precauciones\n\n- Ajustar en insuficiencia renal. Cambios conductuales/psiquiátricos.',
    dilution: {
      adulto: { presentation: 'Frasco 500 mg/5 mL IV; comprimidos VO.', dose: 'Carga 60 mg/kg IV (máx. 4500 mg); mantenimiento 500–1500 mg cada 12 h VO.', administration: 'IV en 15 min o VO.' },
      pediatrico: { dose: 'Carga 40–60 mg/kg IV; 20–40 mg/kg/día dividido cada 12 h.', administration: 'IV/VO.' },
      neonatal: { dose: 'Carga 40–60 mg/kg; mantenimiento según protocolo NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Dilución IV 4 h ambiente según prospecto.',
    adverseEffects: '## Efectos\n\n- Somnolencia, irritabilidad, cefalea, trombocitopenia (raro).',
    bibliography: B,
  }),

  'val-001': build({
    id: 'val-001',
    name: 'Valproato',
    executiveSummary: 'Anticonvulsivante de amplio espectro; IV en status y VO en epilepsia. Hepatotoxicidad y teratogenicidad.',
    indications: '## Indicaciones\n\n- Status epilepticus (carga IV si disponible).\n- Epilepsia generalizada, manía bipolar (VO).\n\n## Precauciones\n\n- Hepatotoxicidad, pancreatitis, teratogenicidad. Contraindicado en hepatopatía activa.',
    dilution: {
      adulto: { presentation: 'Ampolla IV 100 mg/mL; jarabe/comprimidos VO.', dose: 'Carga 20–40 mg/kg IV; mantenimiento 15–60 mg/kg/día VO dividido.', administration: 'IV en 60 min o VO.' },
      pediatrico: { dose: '20–40 mg/kg/día dividido cada 8–12 h.', administration: 'IV/VO.' },
      neonatal: { dose: 'Uso restringido; esquemas NNU bajo neurología.', administration: 'IV/VO.' },
    },
    stability: '## Estabilidad\n\n- IV según prospecto; no refrigerar precipitado.',
    adverseEffects: '## Efectos\n\n- Náuseas, elevación de transaminasas, trombocitopenia, hiperamonemia.',
    bibliography: B,
  }),

  'car-001': build({
    id: 'car-001',
    name: 'Carbamazepina',
    executiveSummary: 'Anticonvulsivante y estabilizador del ánimo; inductor enzimático con múltiples interacciones.',
    indications: '## Indicaciones\n\n- Epilepsia focal, neuralgia del trigémino.\n- Trastorno bipolar (VO).\n\n## Precauciones\n\n- Síndrome de hipersensibilidad (HLA-B*1502 en asiáticos). Agranulocitosis. Interacciones CYP.',
    dilution: {
      adulto: { presentation: 'Comprimidos 200–400 mg; suspensión VO.', dose: 'Inicio 200 mg VO cada 12 h; titular hasta 800–1200 mg/día.', administration: 'VO con alimentos.' },
      pediatrico: { dose: '10–20 mg/kg/día dividido cada 8–12 h.', administration: 'VO.' },
      neonatal: { dose: 'Uso limitado; esquemas especializados VO.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Suspensión según prospecto.',
    adverseEffects: '## Efectos\n\n- Mareo, diplopía, leucopenia, rash grave (SJS/TEN).',
    bibliography: B,
  }),

  'fur-001': build({
    id: 'fur-001',
    name: 'Furosemida',
    executiveSummary: 'Diurético de asa de acción rápida; edema agudo de pulmón, ICC descompensada e hiperkalemia en esquemas.',
    indications: '## Indicaciones\n\n- Edema agudo de pulmón, insuficiencia cardíaca descompensada.\n- Hipervolemia en IRC y síndrome nefrótico.\n\n## Precauciones\n\n- Hipokalemia, hipovolemia, ototoxicidad con bolus rápidos. Monitorizar electrolitos y diuresis.',
    dilution: {
      adulto: { presentation: 'Ampolla 10 mg/mL.', dose: '20–40 mg IV lento; 40–80 mg en EAP según protocolo.', administration: 'IV lento o IM.' },
      pediatrico: { dose: '0,5–1 mg/kg IV/IM cada 6–12 h.', administration: 'IV lento.' },
      neonatal: { dose: '0,5–1 mg/kg/dosis cada 12–24 h (NNU).', administration: 'IV lento.' },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente; proteger de la luz.',
    adverseEffects: '## Efectos\n\n- Hipokalemia, hipotensión, deshidratación, ototoxicidad.',
    bibliography: B,
  }),

  'bum-001': build({
    id: 'bum-001',
    name: 'Bumetanida',
    executiveSummary: 'Diurético de asa más potente que furosemida mg a mg; útil en resistencia a furosemida.',
    indications: '## Indicaciones\n\n- Edema en ICC, cirrosis, IRC cuando se requiere diuresis potente.\n\n## Precauciones\n\n- Hipokalemia y hipovolemia. Ajustar en hepatopatía severa.',
    dilution: {
      adulto: { presentation: 'Ampolla 0,25 mg/mL.', dose: '0,5–1 mg IV/IM; repetir según respuesta (1 mg ≈ 40 mg furosemida).', administration: 'IV/IM.' },
      pediatrico: { dose: '0,015–0,05 mg/kg/dosis cada 6–12 h.', administration: 'IV/IM.' },
      neonatal: { dose: '0,01–0,05 mg/kg/dosis según protocolo.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar tras extracción sin dilución habitual.',
    adverseEffects: '## Efectos\n\n- Hipokalemia, hipotensión, calambres musculares.',
    bibliography: B,
  }),

  'tor-001': build({
    id: 'tor-001',
    name: 'Torasemida',
    executiveSummary: 'Diurético de asa con vida media más larga; ICC y hipertensión.',
    indications: '## Indicaciones\n\n- Insuficiencia cardíaca crónica, edema periférico.\n- Hipertensión arterial (VO).\n\n## Precauciones\n\n- Hipokalemia, hipovolemia. Monitorizar función renal.',
    dilution: {
      adulto: { presentation: 'Ampolla 10 mg/mL; comprimidos VO.', dose: '10–20 mg IV/VO cada 24 h; titular según diuresis.', administration: 'IV lento o VO.' },
      pediatrico: { dose: '0,1–0,2 mg/kg/dosis cada 12–24 h (uso limitado).', administration: 'IV/VO.' },
      neonatal: { dose: 'Uso restringido según protocolo cardiorrenal NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- IV según prospecto.',
    adverseEffects: '## Efectos\n\n- Hipokalemia, mareo, elevación de ácido úrico.',
    bibliography: B,
  }),

  'hct-001': build({
    id: 'hct-001',
    name: 'Hidroclorotiazida',
    executiveSummary: 'Tiazida oral para hipertensión y edema leve; hipokalemia e hiperglucemia.',
    indications: '## Indicaciones\n\n- Hipertensión arterial, edema leve de ICC.\n- Nefrolitiasis por calcio (esquemas).\n\n## Precauciones\n\n- Hiponatremia, hipokalemia. Contraindicada en anuria y gota.',
    dilution: {
      adulto: { presentation: 'Comprimidos 12,5–25 mg.', dose: '12,5–50 mg VO cada 24 h en la mañana.', administration: 'VO.' },
      pediatrico: { dose: '1–2 mg/kg/día VO dividido (máx. 50 mg/día).', administration: 'VO.' },
      neonatal: { dose: 'Uso limitado; 1–2 mg/kg/día bajo prescripción especializada.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Comprimidos según prospecto.',
    adverseEffects: '## Efectos\n\n- Hipokalemia, hiperglucemia, hiperuricemia, fotosensibilidad.',
    bibliography: B,
  }),

  'esp-001': build({
    id: 'esp-001',
    name: 'Espironolactona',
    executiveSummary: 'Diurético ahorrador de potasio; ICC, ascitis y hiperaldosteronismo.',
    indications: '## Indicaciones\n\n- ICC con fracción de eyección reducida, ascitis por cirrosis.\n- Hiperaldosteronismo primario/secundario.\n\n## Precauciones\n\n- Hiperkalemia, especialmente con IECA/ARA-II. Ginecomastia.',
    dilution: {
      adulto: { presentation: 'Comprimidos 25–100 mg.', dose: '25–50 mg VO cada 24 h; ascitis: 100–400 mg/día en esquemas.', administration: 'VO.' },
      pediatrico: { dose: '1–3 mg/kg/día VO dividido.', administration: 'VO.' },
      neonatal: { dose: '1–3 mg/kg/día según protocolo diurético NNU.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- VO estable.',
    adverseEffects: '## Efectos\n\n- Hiperkalemia, ginecomastia, mareo, rash.',
    bibliography: B,
  }),

  'man-001': build({
    id: 'man-001',
    name: 'Manitol',
    executiveSummary: 'Diurético osmótico IV para hipertensión intracraneal y glaucoma agudo.',
    indications: '## Indicaciones\n\n- Hipertensión intracraneal aguda, herniación cerebral (puente).\n- Profilaxis de insuficiencia renal en rabdomiólisis (protocolo).\n\n## Precauciones\n\n- Sobrecarga volumétrica, hiponatremia, insuficiencia renal si osmolaridad plasmática muy alta.',
    dilution: {
      adulto: { presentation: 'Bolsa 20% manitol.', dose: '0,25–1 g/kg IV en 15–30 min; repetir según osmolaridad.', infusionRate: 'IV en 15–30 min.', administration: 'IV con filtro.' },
      pediatrico: { dose: '0,25–1 g/kg IV en 15–30 min.', administration: 'IV.' },
      neonatal: { dose: '0,25–0,5 g/kg según protocolo neuro-NNU.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Cristaliza en frío; calentar y agitar antes de usar.',
    adverseEffects: '## Efectos\n\n- Deshidratación, hiponatremia, insuficiencia cardíaca por sobrecarga.',
    bibliography: B,
  }),

  'hef-001': build({
    id: 'hef-001',
    name: 'Heparina sódica',
    executiveSummary: 'Anticoagulante parenteral; TEP, síndromes coronarios y circulación extracorpórea. Control con TTPa.',
    indications: '## Indicaciones\n\n- Tromboembolismo venoso, síndrome coronario agudo.\n- Profilaxis y tratamiento en cirugía cardíaca/ECMO.\n\n## Precauciones\n\n- Sangrado mayor. TTPa según protocolo. Antídoto: protamina.',
    dilution: {
      adulto: { presentation: 'Frasco 5000 UI/mL.', dose: 'Bolus 60–80 UI/kg en SCA; perfusión 12–15 UI/kg/h titulada a TTPa.', administration: 'IV en bomba.' },
      pediatrico: { dose: 'Bolus 75 UI/kg; infusión 20 UI/kg/h ajustada a TTPa.', administration: 'IV.' },
      neonatal: { dose: '28 UI/kg/h infusión habitual en NNU (protocolo).', administration: 'IV en bomba.' },
    },
    stability: '## Estabilidad\n\n- Perfusión preparada según cartilla; no agitar.',
    adverseEffects: '## Efectos\n\n- Hemorragia, trombocitopenia inducida por heparina (HIT).',
    bibliography: B,
  }),

  'eno-001': build({
    id: 'eno-001',
    name: 'Enoxaparina',
    executiveSummary: 'HBPM para TEP, profilaxis tromboembólica y síndrome coronario (esquemas).',
    indications: '## Indicaciones\n\n- Tromboprofilaxis en cirugía y hospitalización.\n- TEP/TVP, síndrome coronario en esquemas sin heparina IV.\n\n## Precauciones\n\n- Ajustar dosis en IRC severa. Sangrado. Antídoto limitado (protamina parcial).',
    dilution: {
      adulto: { presentation: 'Jeringa precargada 40–100 mg.', dose: 'Profilaxis: 40 mg SC cada 24 h. TEP: 1 mg/kg SC cada 12 h.', administration: 'SC profunda; no frotar zona.' },
      pediatrico: { dose: '0,5–1 mg/kg SC cada 12 h según protocolo pediátrico.', administration: 'SC.' },
      neonatal: { dose: '1,5 mg/kg SC cada 12 h en NNU (protocolo).', administration: 'SC.' },
    },
    stability: '## Estabilidad\n\n- Jeringas precargadas listas para uso.',
    adverseEffects: '## Efectos\n\n- Hematoma SC, sangrado mayor, trombocitopenia.',
    bibliography: B,
  }),

  'fon-001': build({
    id: 'fon-001',
    name: 'Fondaparinux',
    executiveSummary: 'Anticoagulante sintético anti-Xa; profilaxis ortopédica y TEP en alergia a heparina sin HIT.',
    indications: '## Indicaciones\n\n- Tromboprofilaxis en cirugía ortopédica mayor.\n- TEP/TVP en esquemas seleccionados.\n\n## Precauciones\n\n- Contraindicado en IRC severa (ClCr < 30). Sin antídoto específico.',
    dilution: {
      adulto: { presentation: 'Jeringa precargada 2,5–10 mg.', dose: 'Profilaxis: 2,5 mg SC cada 24 h. TEP: 5–10 mg SC según peso.', administration: 'SC profunda.' },
      pediatrico: { dose: 'Uso limitado bajo hematología pediátrica.', administration: 'SC.' },
      neonatal: { dose: 'No recomendado rutinariamente.', administration: 'SC.' },
    },
    stability: '## Estabilidad\n\n- No refrigerar jeringas precargadas según prospecto.',
    adverseEffects: '## Efectos\n\n- Sangrado, anemia, trombocitopenia (raro).',
    bibliography: B,
  }),

  'war-001': build({
    id: 'war-001',
    name: 'Warfarina',
    executiveSummary: 'Anticoagulante oral antagonista de vitamina K; requiere control de INR y educación del paciente.',
    indications: '## Indicaciones\n\n- Fibrilación auricular, prótesis valvular mecánica.\n- TEP/TVP crónico.\n\n## Precauciones\n\n- Múltiples interacciones y dieta. Contraindicado en embarazo. Riesgo de sangrado.',
    dilution: {
      adulto: { presentation: 'Comprimidos 5 mg (y otras concentraciones).', dose: 'Dosis inicial 5 mg/día VO; ajustar según INR objetivo.', administration: 'VO a misma hora diaria.' },
      pediatrico: { dose: '0,1–0,2 mg/kg/día VO; ajustar por INR.', administration: 'VO.' },
      neonatal: { dose: 'Uso muy restringido; esquemas cardiológicos neonatales.', administration: 'VO.' },
    },
    stability: '## Estabilidad\n\n- Comprimidos en envase original.',
    adverseEffects: '## Efectos\n\n- Sangrado, necrosis cutánea (raro inicio), teratogenicidad.',
    bibliography: B,
  }),

  'prt-001': build({
    id: 'prt-001',
    name: 'Protamina',
    executiveSummary: 'Antídoto de heparina; reversión post-circulación extracorpórea y sobredosis de heparina.',
    indications: '## Indicaciones\n\n- Reversión de heparina no fraccionada tras cirugía cardíaca o sangrado por heparina.\n\n## Precauciones\n\n- Reacciones anafilactoides. Rebound de anticoagulación. Reversión parcial de HBPM.',
    dilution: {
      adulto: { presentation: 'Ampolla 10 mg/mL.', dose: '1 mg protamina por 100 UI heparina restantes; IV lento en 10 min (máx. 50 mg/dosis).', administration: 'IV muy lenta.' },
      pediatrico: { dose: '1 mg por 100 UI heparina; máx. 50 mg.', administration: 'IV lenta.' },
      neonatal: { dose: 'Misma regla mg:UI según heparina administrada.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Usar inmediatamente tras dilución.',
    adverseEffects: '## Efectos\n\n- Hipotensión, bradicardia, anafilaxia, edema pulmonar.',
    bibliography: B,
  }),

  'kcl-001': build({
    id: 'kcl-001',
    name: 'Cloruro de potasio',
    executiveSummary: 'Reposición de potasio IV/VO; concentraciones periféricas máximas estrictas por riesgo de paro cardíaco.',
    indications: '## Indicaciones\n\n- Hipokalemia sintomática o severa.\n- Mantenimiento en nutrición parenteral.\n\n## Precauciones\n\n- Nunca bolus IV directo. Máx. 10 mEq/h periférica y 20 mEq/h central (protocolo). Monitorizar ECG.',
    dilution: {
      adulto: { presentation: 'Ampollas 10–20 mEq; bolsas premix.', dose: 'Reposición según déficit y niveles; típico 10–40 mEq en dilución.', infusionRate: '≤ 10 mEq/h periférica.', administration: 'IV diluido exclusivamente.' },
      pediatrico: { dose: '0,5–1 mEq/kg/día mantenimiento; reposición según K+ sérico.', administration: 'IV en bomba.' },
      neonatal: { dose: '1–2 mEq/kg/día en NNU dividido en bomba.', administration: 'IV central preferida.' },
    },
    stability: '## Estabilidad\n\n- Usar línea dedicada; verificar concentración final.',
    adverseEffects: '## Efectos\n\n- Flebitis, arritmias por administración rápida, hiperkalemia.',
    bibliography: B,
  }),

  'nsh-001': build({
    id: 'nsh-001',
    name: 'Cloruro de sodio hipertónico',
    executiveSummary: 'Solución hipertónica (3%, 7,5%, 23,4%) para hiponatremia sintomática e hipertensión intracraneal.',
    indications: '## Indicaciones\n\n- Hiponatremia sintomática grave.\n- Hipertensión intracraneal con herniación (bolus en protocolo neuro).\n\n## Precauciones\n\n- Corrección lenta de sodio para evitar síndrome de desmielinización osmótica. Monitorizar Na+ cada 2–4 h.',
    dilution: {
      adulto: { presentation: 'Ampolla/bolsa NaCl 3% o 23,4%.', dose: '3%: 100–150 mL bolus en edema cerebral. Hiponatremia: según cálculo de déficit.', administration: 'IV central para 23,4%.' },
      pediatrico: { dose: '2–5 mL/kg NaCl 3% bolus en herniación (protocolo PALS).', administration: 'IV.' },
      neonatal: { dose: 'Bolus hipertónico según protocolo neuro-NNU.', administration: 'IV central.' },
    },
    stability: '## Estabilidad\n\n- Solución lista; doble verificar concentración.',
    adverseEffects: '## Efectos\n\n- Sobrecorrección de sodio, flebitis, edema pulmonar.',
    bibliography: B,
  }),

  'bic-001': build({
    id: 'bic-001',
    name: 'Bicarbonato de sodio',
    executiveSummary: 'Alcalinizante IV para acidosis metabólica grave y algunos intoxicaciones (protocolo).',
    indications: '## Indicaciones\n\n- Acidosis metabólica con pH < 7,1 en contextos específicos.\n- Intoxicación por tricíclicos (alcalinización urinaria en protocolo).\n- Hiperkalemia con cambios ECG (esquemas).\n\n## Precauciones\n\n- Hipokalemia, alcalosis, hipernatremia. Extravasación tisular.',
    dilution: {
      adulto: { presentation: 'Ampolla 1 mEq/mL (8,4%).', dose: '1–2 mEq/kg IV diluido en situaciones seleccionadas (prescripción).', administration: 'IV lenta diluida.' },
      pediatrico: { dose: '1 mEq/kg IV lento diluido según gasometría.', administration: 'IV lenta.' },
      neonatal: { dose: '1–2 mEq/kg en parada con acidosis según NRP.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- No mezclar con calcio en misma línea.',
    adverseEffects: '## Efectos\n\n- Alcalosis, hipokalemia, hiperosmolaridad.',
    bibliography: B,
  }),

  'cag-001': build({
    id: 'cag-001',
    name: 'Gluconato de calcio',
    executiveSummary: 'Reposición de calcio IV en hipocalcemia sintomática e hiperkalemia con cambios ECG.',
    indications: '## Indicaciones\n\n- Hipocalcemia sintomática (tetania, QT prolongado).\n- Hiperkalemia con alteraciones ECG (esquema de urgencia).\n- Intoxicación por bloqueadores de canales de calcio.\n\n## Precauciones\n\n- Extravasación: necrosis. No mezclar con bicarbonato en misma línea.',
    dilution: {
      adulto: { presentation: 'Ampolla 10% (0,465 mEq Ca/mL).', dose: '1–2 ampollas (10–20 mL) IV lento; repetir según protocolo.', administration: 'IV lento 10–20 min.' },
      pediatrico: { dose: '0,5–1 mL/kg gluconato 10% IV lento.', administration: 'IV lento.' },
      neonatal: { dose: '1–2 mL/kg gluconato 10% IV lento bajo monitorización.', administration: 'IV lento.' },
    },
    stability: '## Estabilidad\n\n- Usar vía dedicada si es posible.',
    adverseEffects: '## Efectos\n\n- Bradicardia, hipotensión, necrosis por extravasación.',
    bibliography: B,
  }),

  'cac-001': build({
    id: 'cac-001',
    name: 'Cloruro de calcio',
    executiveSummary: 'Calcio elemental IV más concentrado que gluconato; parada cardíaca por hipocalcemia/hiperK/hiperMg.',
    indications: '## Indicaciones\n\n- Parada cardíaca por hiperkalemia, hipocalcemia o intoxicación por bloqueadores de calcio.\n- Hipocalcemia severa sintomática.\n\n## Precauciones\n\n- Mayor riesgo de necrosis por extravasación que gluconato. Vía central preferida.',
    dilution: {
      adulto: { presentation: 'Ampolla 10% cloruro de calcio (13,6 mEq Ca/10 mL).', dose: 'PCR: 1 g (10 mL) IV/IO. Hipocalcemia: 0,5–1 g IV lento.', administration: 'IV/IO lento.' },
      pediatrico: { dose: '20 mg/kg (0,2 mL/kg) IV/IO en PCR según PALS.', administration: 'IV/IO.' },
      neonatal: { dose: '20 mg/kg IV lento en PCR/hypocalcemia NNU.', administration: 'IV central.' },
    },
    stability: '## Estabilidad\n\n- Incompatible con bicarbonato en línea.',
    adverseEffects: '## Efectos\n\n- Bradicardia, necrosis tisular, arritmias.',
    bibliography: B,
  }),

  'pho-001': build({
    id: 'pho-001',
    name: 'Fosfato de potasio',
    executiveSummary: 'Reposición de fósforo IV en hipofosfatemia severa de UCI y realimentación.',
    indications: '## Indicaciones\n\n- Hipofosfatemia < 1 mg/dL o sintomática en UCI.\n- Síndrome de realimentación.\n\n## Precauciones\n\n- Hipocalcemia secundaria. No bolus rápido. Monitorizar Ca2+ y K+.',
    dilution: {
      adulto: { presentation: 'Ampolla fosfato potásico/sódico según formulación.', dose: '0,2–0,5 mmol/kg IV en 6–8 h (protocolo).', infusionRate: 'Perfusión lenta.', administration: 'IV diluido.' },
      pediatrico: { dose: '0,2–0,3 mmol/kg IV en 4–6 h.', administration: 'IV en bomba.' },
      neonatal: { dose: 'Reposición según niveles en NNU.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidad\n\n- Verificar compatibilidad con nutrición parenteral.',
    adverseEffects: '## Efectos\n\n- Hipocalcemia, hiperkalemia, flebitis.',
    bibliography: B,
  }),

  'glu-001': build({
    id: 'glu-001',
    name: 'Dextrosa (glucosa)',
    executiveSummary: 'Carbohidrato IV para hipoglucemia, mantenimiento hídrico y vehículo de dilución.',
    indications: '## Indicaciones\n\n- Hipoglucemia sintomática.\n- Mantenimiento y reposición calórica IV.\n- Diluyente de fármacos compatibles.\n\n## Precauciones\n\n- Hiperglucemia, flebitis con concentraciones altas periféricas. Monitorizar glicemia.',
    dilution: {
      adulto: { presentation: 'Bolsas SG 5%, 10%, 50%.', dose: 'Hipoglucemia: 25 g (50 mL SG 50%) IV bolus. Mantenimiento según plan hídrico.', administration: 'IV.' },
      pediatrico: { dose: '0,5–1 g/kg SG 10–25% IV bolus en hipoglucemia.', administration: 'IV.' },
      neonatal: { dose: '2 mL/kg SG 10% IV bolus; infusión de mantenimiento según NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Bolsas según prospecto; una vez pinzada usar en turno.',
    adverseEffects: '## Efectos\n\n- Hiperglucemia, flebitis, sobrecarga hídrica.',
    bibliography: B,
  }),

  'mtp-001': build({
    id: 'mtp-001',
    name: 'Metoclopramida',
    executiveSummary: 'Procinético y antiemético; migra y náuseas postoperatorias. Riesgo de discinesia extrapiramidal.',
    indications: '## Indicaciones\n\n- Náuseas y vómitos postoperatorios y por fármacos.\n- Gastroparesia, reflujo (VO).\n\n## Precauciones\n\n- Discinesia extrapiramidal especialmente en jóvenes. Contraindicado en obstrucción GI.',
    dilution: {
      adulto: { presentation: 'Ampolla 10 mg/2 mL.', dose: '10 mg IV lento cada 6–8 h PRN.', administration: 'IV lento.' },
      pediatrico: { dose: '0,1–0,15 mg/kg IV cada 6–8 h (máx. 10 mg).', administration: 'IV lento.' },
      neonatal: { dose: 'Uso restringido; 0,1 mg/kg según protocolo NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Usar tras extracción.',
    adverseEffects: '## Efectos\n\n- Acatisia, distonía, sedación, prolongación QT.',
    bibliography: B,
  }),

  'ond-001': build({
    id: 'ond-001',
    name: 'Ondansetrón',
    executiveSummary: 'Antiemético setrón para náuseas postoperatorias y por quimioterapia.',
    indications: '## Indicaciones\n\n- Náuseas y vómitos postoperatorios.\n- Antiemesis en quimioterapia y radioterapia.\n\n## Precauciones\n\n- Prolongación QT. Constipación.',
    dilution: {
      adulto: { presentation: 'Ampolla 4–8 mg; comprimidos ODT.', dose: '4–8 mg IV lento o VO cada 8 h.', administration: 'IV lento o VO.' },
      pediatrico: { dose: '0,1–0,15 mg/kg IV/VO (máx. 8 mg).', administration: 'IV/VO.' },
      neonatal: { dose: '0,1 mg/kg IV cada 8 h según protocolo.', administration: 'IV lento.' },
    },
    stability: '## Estabilidad\n\n- IV compatible en NaCl y SG.',
    adverseEffects: '## Efectos\n\n- Cefalea, constipación, prolongación QT.',
    bibliography: B,
  }),

  'pan-001': build({
    id: 'pan-001',
    name: 'Pantoprazol',
    executiveSummary: 'IBP IV/VO para profilaxis de úlcera de estrés y sangrado digestivo alto.',
    indications: '## Indicaciones\n\n- Profilaxis de úlcera de estrés en UCI.\n- Hemorragia digestiva alta en esquemas con IBP IV.\n\n## Precauciones\n\n- Interacciones con clopidogrel (menor que omeprazol). Hipomagnesemia prolongado.',
    dilution: {
      adulto: { presentation: 'Frasco 40 mg IV; comprimidos VO.', dose: '40–80 mg IV cada 24 h en infusión o bolo.', administration: 'IV en 15 min o VO.' },
      pediatrico: { dose: '0,5–1 mg/kg/día IV/VO (máx. 40 mg).', administration: 'IV/VO.' },
      neonatal: { dose: '0,5–1 mg/kg/día en NNU para profilaxis.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Reconstituir y usar según prospecto IV.',
    adverseEffects: '## Efectos\n\n- Cefalea, diarrea, trombocitopenia (raro).',
    bibliography: B,
  }),

  'oct-001': build({
    id: 'oct-001',
    name: 'Octreotida',
    executiveSummary: 'Análogo de somatostatina para sangrado variceal, fistulas y síndromes neuroendocrinos.',
    indications: '## Indicaciones\n\n- Hemorragia por varices esofágicas (coadyuvante).\n- Fístulas pancreáticas y entéricas de alto débito.\n- Tumores neuroendocrinos.\n\n## Precauciones\n\n- Colelitiasis con uso prolongado. Hiperglucemia/hypoglucemia.',
    dilution: {
      adulto: { presentation: 'Ampolla 50–100 mcg/mL.', dose: 'Bolus 50 mcg IV luego infusión 50 mcg/h en sangrado variceal (protocolo).', administration: 'IV en bomba.' },
      pediatrico: { dose: '1–2 mcg/kg/dosis SC/IV según protocolo pediátrico.', administration: 'IV/SC.' },
      neonatal: { dose: 'Esquemas NNU para colecciones linfáticas/fístulas.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Perfusión 24 h según dilución.',
    adverseEffects: '## Efectos\n\n- Náuseas, dolor abdominal, bradicardia, alteración de glicemia.',
    bibliography: B,
  }),

  'des-001': build({
    id: 'des-001',
    name: 'Desmopresina',
    executiveSummary: 'Análogo ADH para diabetes insípida, hemofilia von Willebrand y sangrado urémico.',
    indications: '## Indicaciones\n\n- Diabetes insípida central.\n- Hemofilia A leve / enfermedad de von Willebrand (esquemas).\n- Sangrado urémico en diálisis.\n\n## Precauciones\n\n- Hiponatremia e hipoosmolaridad con fluidos libres. Monitorizar sodio.',
    dilution: {
      adulto: { presentation: 'Ampolla IV 4 mcg/mL; nasal/VO según presentación.', dose: 'DI: 1–2 mcg IV/SC o dosis intranasal según protocolo.', administration: 'IV lento, SC o intranasal.' },
      pediatrico: { dose: '0,3 mcg/kg IV/SC en sangrado o DI según protocolo.', administration: 'IV/SC/intranasal.' },
      neonatal: { dose: '0,1–0,3 mcg/kg según indicación NNU.', administration: 'IV.' },
    },
    stability: '## Estabilidad\n\n- Refrigerar según presentación.',
    adverseEffects: '## Efectos\n\n- Hiponatremia, cefalea, flush, trombosis (raro).',
    bibliography: B,
  }),
};
