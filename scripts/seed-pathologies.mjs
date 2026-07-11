#!/usr/bin/env node
/**
 * Genera monografías de patologías frecuentes en guardias (hospitales públicos / sanatorios AR).
 * Uso: node scripts/seed-pathologies.mjs && npm run sync-pathologies
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ITEMS_DIR = path.join(__dirname, '../content/branches/atencion-sanitaria/patologias/items');
const MASTER_LIST_PATH = path.join(__dirname, '../content/branches/atencion-sanitaria/patologias/master-list-pathologies.csv');

const MS = {
  citation: 'Ministerio de Salud de la Nación Argentina. Estrategias y guías de atención.',
  url: 'https://www.argentina.gob.ar/salud',
};

/** Categoría clínica para master-list-pathologies.csv */
const CATEGORIES = {
  'abd-001': 'cirugía',
  'acv-001': 'neurología',
  'ana-001': 'alergia',
  'asm-001': 'respiratorio',
  'cad-001': 'endocrinología',
  'cel-001': 'infectología',
  'cho-001': 'gastroenterología',
  'cov-001': 'respiratorio',
  'cvu-001': 'neurología',
  'del-001': 'geriatría',
  'dia-001': 'endocrinología',
  'ecl-001': 'obstetricia',
  'end-001': 'infectología',
  'epoc-001': 'respiratorio',
  'fa-001': 'cardiovascular',
  'hda-001': 'gastroenterología',
  'hip-001': 'endocrinología',
  'hta-001': 'cardiovascular',
  'iam-001': 'cardiovascular',
  'ang-001': 'cardiovascular',
  'per-001': 'cardiovascular',
  'tsv-001': 'cardiovascular',
  'icc-001': 'cardiovascular',
  'int-001': 'toxicología',
  'ira-001': 'nefrología',
  'itu-001': 'infectología',
  'men-001': 'infectología',
  'pna-001': 'respiratorio',
  'pnc-001': 'gastroenterología',
  'rhd-001': 'nefrología',
  'sep-001': 'infectología',
  'sin-001': 'cardiovascular',
  'tdm-001': 'metabolismo',
  'tep-001': 'cardiovascular',
  'tra-001': 'trauma',
};

const PATHOLOGIES = [
  {
    id: 'acv-001',
    name: 'Accidente cerebrovascular (ACV)',
    body: `El **accidente cerebrovascular** es un síndrome neurológico focal de inicio brusco por alteración de la circulación cerebral (isquemia o hemorragia). En la guardia debe distinguirse de los **mimics** (crisis convulsiva, hipoglucemia, síncope, migraña con aura prolongada). La anamnesis orienta el tiempo de evolución, anticoagulación previa y foco cardíaco o carotídeo. El examen neurológico documenta **NIHSS** o escala institucional, **Glasgow**, pupilas y signos de hipertensión endocraneana.\n\nEn el **ACV isquémico agudo** la prioridad es la reperfusión dentro de la ventana terapéutica (trombólisis IV y/o trombectomía según protocolo local). La presión arterial se maneja según criterio de trombólisis: evitar descensos bruscos salvo emergencia hipertensiva. En **hemorragia intracraneal** se revierte anticoagulación si corresponde, se controla PA y se deriva a neurocirugía cuando hay indicación.\n\nEn la **recepción del ACV agudo** se **activa el protocolo STROKE**, que consiste en colocar **dos vías periféricas** y solicitar **RMI (resonancia magnética)** para obtener las imágenes dentro del **período ventana**. La **enfermería** asegura vía aérea, oxigenoterapia si SpO₂ < 94 %, monitorización continua y registro horario del nivel de conciencia y NIHSS; glucemia capilar, ionograma y coagulación según protocolo. Mantener NPO hasta definir disfagia. Elevar cabecera 30° si no hay contraindicación. Coordinar código ACV / teleictus institucional. Educar a la familia sobre signos de alarma y continuidad de rehabilitación.`,
    clinicalBoxes: [
      {
        title: 'Escala de Coma de Glasgow (GCS)',
        content: `**Apertura ocular (E)**\n4 Espontánea · 3 A la voz · 2 Al dolor · 1 Ninguna\n\n**Respuesta verbal (V)**\n5 Orientada · 4 Confusa · 3 Palabras inapropiadas · 2 Sonidos incomprensibles · 1 Ninguna\n\n**Respuesta motora (M)**\n6 Obedece órdenes · 5 Localiza dolor · 4 Retirada al dolor · 3 Flexión anormal · 2 Extensión · 1 Ninguna\n\n**Total E + V + M: 3–15.** GCS ≤ 8: valorar protección de vía aérea. Registrar serie, pupilas y lateralidad neurológica.`,
      },
      {
        title: 'NIHSS — puntos clave (resumen)',
        content: `Escala 0–42 para cuantificar déficit neurológico en ACV agudo. Registrar al ingreso y seriado según protocolo.\n\n**Dominios principales:** nivel de conciencia · mirada conjugada · campos visuales · parálisis facial · motricidad de brazos y piernas · ataxia de miembros · sensibilidad · lenguaje · disartria · extinción/negligencia.\n\n**Referencia orientativa:** 0 = sin síntomas · 1–4 = ACV leve · 5–15 = moderado · 16–20 = moderado-grave · > 20 = grave. Documentar hora de inicio de síntomas y puntaje para decisión de reperfusión.`,
      },
    ],
    relatedDrugs: [
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'lab-001', label: 'Labetalol' },
      { drugId: 'man-001', label: 'Manitol' },
    ],
    bibliography: [
      { citation: 'American Heart Association / American Stroke Association. Guidelines for the Early Management of Acute Ischemic Stroke.', url: 'https://www.ahajournals.org/stroke' },
      { citation: 'Sociedad Argentina de Neurología Vascular (SANV). Recomendaciones nacionales.', url: 'https://www.sanv.org.ar/' },
      MS,
      { citation: 'World Stroke Organization. Global stroke guidelines.', url: 'https://www.world-stroke.org/' },
    ],
  },
  {
    id: 'hta-001',
    name: 'Hipertensión arterial (HTA)',
    body: `La **hipertensión arterial** es una elevación persistente de la presión arterial (PA) que incrementa el riesgo cardiovascular, renal y cerebrovascular. En guardia suele presentarse como **crisis hipertensiva** (PA muy elevada con o sin daño de órgano blanco) o como comorbilidad de otra patología aguda. Es fundamental medir PA en ambos brazos con técnica correcta, confirmar con repetición y buscar signos de **emergencia hipertensiva** (encefalopatía, edema agudo de pulmón, síndrome coronario agudo, disección aórtica, eclampsia, IRA aguda).\n\nEl **tratamiento oportuno** depende del contexto: en emergencia hipertensiva se inicia antihipertensivo IV con meta gradual (evitar caída > 25 % de la PA media en la primera hora salvo excepciones como disección aórtica). En **urgencia hipertensiva** (PA elevada sin daño agudo de órgano) se prefiere reinstaurar o ajustar tratamiento oral y observación. Fármacos frecuentes en guardia: labetalol, hidralazina, nitroglicerina o nitroprusiato según escenario y disponibilidad institucional.\n\nEn **enfermería**: monitorizar PA seriada, frecuencia cardíaca, diuresis y nivel de conciencia; registrar hora de cada dosis IV; vigilar hipotensión ortostática al iniciar o intensificar tratamiento. Educar sobre adherencia, restricción de sodio, control ambulatorio y signos de alarma (cefalea intensa, visión borrosa, dolor torácico, disnea).`,
    relatedDrugs: [
      { drugId: 'lab-001', label: 'Labetalol' },
      { drugId: 'hdr-001', label: 'Hidralazina' },
      { drugId: 'ngl-001', label: 'Nitroglicerina' },
      { drugId: 'nip-001', label: 'Nitroprusiato' },
    ],
    bibliography: [
      { citation: 'Sociedad Argentina de Hipertensión Arterial (SAHA). Guías y consensos.', url: 'https://www.saha.org.ar/' },
      { citation: 'European Society of Cardiology / ESH. Guidelines for the management of arterial hypertension.', url: 'https://www.escardio.org/Guidelines' },
      MS,
      { citation: 'American Heart Association. Hypertension clinical guidelines.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'epoc-001',
    name: 'EPOC — exacerbación aguda',
    body: `La **enfermedad pulmonar obstructiva crónica (EPOC)** se caracteriza por limitación crónica al flujo aéreo. La **exacerbación aguda** es un empeoramiento de la disnea, tos o expectoración que supera la variación basal del paciente y suele deberse a infección respiratoria, contaminación ambiental o incumplimiento terapéutico. En la valoración inicial se registra frecuencia respiratoria, uso de musculatura accesoria, coloración, nivel de conciencia y **gasometría** si hay signos de insuficiencia respiratoria.\n\nEl manejo incluye **broncodilatadores** de acción corta (salbutamol ± ipratropio) nebulizados o con inhalador de dosis medida con cámara espaciadora, **corticoides sistémicos** (prednisona oral o metilprednisolona IV según gravedad), antibiótico si hay aumento de purulencia de esputo o necesidad de ventilación mecánica, y **oxígeno titulado** (meta SpO₂ 88–92 % en EPOC conocido para evitar hipoxemia iatrogénica). Valorar VNI en acidosis respiratoria con pH 7,25–7,35 y trabajo respiratorio alto.\n\nLa **enfermería** monitoriza SpO₂ continua, administra nebulizaciones, ayuda con técnica inhalatoria, cuantifica diuresis y vigila somnolencia por hipercapnia. Posición semisentada, hidratación si no hay contraindicación y educación sobre abandono del tabaco y plan de acción ante nuevas exacerbaciones.`,
    relatedDrugs: [
      { drugId: 'sal-001', label: 'Salbutamol' },
      { drugId: 'ipr-001', label: 'Ipratropio' },
      { drugId: 'mep-001', label: 'Metilprednisolona' },
      { drugId: 'dxt-001', label: 'Dexametasona' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
    ],
    bibliography: [
      { citation: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global Strategy Report.', url: 'https://goldcopd.org/' },
      { citation: 'Asociación Argentina de Medicina Respiratoria (AAMR). Guías nacionales.', url: 'https://www.aamr.org.ar/' },
      MS,
      { citation: 'National Institute for Health and Care Excellence (NICE). COPD guideline.', url: 'https://www.nice.org.uk/guidance/ng115' },
    ],
  },
  {
    id: 'icc-001',
    name: 'Insuficiencia cardíaca (ICC)',
    body: `La **insuficiencia cardíaca** es un síndrome clínico en el que el corazón no bombea sangre de forma eficaz para las necesidades metabólicas, o lo hace solo con presiones de llenado elevadas. En guardia predominan las **descompensaciones agudas**: edema agudo de pulmón, ICC con congestión sistémica, perfil húmedo-frío (bajo gasto) o crisis hipertensivas asociadas. La anamnesis explora disnea paroxística nocturna, ortopnea, ganancia ponderal, adherencia a diuréticos y factores desencadenantes (infección, arritmia, IAM, anemia).\n\nEl examen valora crepitantes, ingurgitación yugular, reflujo hepatoyugular, edemas, ritmo y soplos. El **ECG**, radiografía de tórax, BNP/NT-proBNP, ionograma y función renal orientan gravedad y plan terapéutico. El tratamiento agudo combina **diuréticos de asa** (furosemida IV), vasodilatadores (nitroglicerina) en perfil hipertenso, oxígeno o VNI según hipoxemia, y manejo de la causa desencadenante. En choque cardiogénico se requiere inotrópicos y cuidados intensivos.\n\n**Enfermería**: peso diario, balance hídrico estricto, monitorización de diuresis post-furosemida, control de electrolitos (K⁺, Mg²⁺), posición semisentada y restricción de sodio y líquidos según orden médica. Detectar precozmente hipotensión, oliguria y alteración del estado mental.`,
    relatedDrugs: [
      { drugId: 'fur-001', label: 'Furosemida' },
      { drugId: 'ngl-001', label: 'Nitroglicerina' },
      { drugId: 'dob-001', label: 'Dobutamina' },
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'esp-001', label: 'Espironolactona' },
    ],
    bibliography: [
      { citation: 'Sociedad Argentina de Cardiología (SAC). Consensos de insuficiencia cardíaca.', url: 'https://www.sac.org.ar/' },
      { citation: 'European Society of Cardiology. Heart Failure Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      MS,
      { citation: 'American Heart Association. Heart Failure guidelines.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'sep-001',
    name: 'Sepsis y shock séptico',
    body: `La **sepsis** es una disfunción orgánica potencialmente mortal causada por una respuesta desregulada del huésped a la infección. El **shock séptico** se define por hipotensión persistente que requiere vasopresores para mantener PAM ≥ 65 mmHg y lactato > 2 mmol/L pese a reanimación volumétrica adecuada. En guardia debe sospecharse ante fiebre o hipotermia, taquicardia, taquipnea, alteración del estado mental, oliguria o hipotensión, especialmente en adultos mayores, inmunodeprimidos o con dispositivos invasivos.\n\nEl manejo inicial sigue el enfoque **hora cero**: hemocultivos antes de antibióticos si no retrasa más de 45 minutos, antibiótico de amplio espectro precoz según foco probable, reanimación con cristaloides 30 mL/kg en hipotensión o lactato elevado, y vasopresores (noradrenalina de primera línea) si persiste hipotensión. Identificar y controlar el foco (drenaje de absceso, retiro de catéter infectado). Lactato seriado y SOFA/qSOFA según protocolo institucional.\n\n**Enfermería**: monitorización continua, dos vías periféricas o acceso central, registro estricto de balance hídrico, temperatura y escalas de sedación si está intubado. Administrar antibióticos en el tiempo acordado, preparar cultivos y documentar hora de inicio de cada intervención del bundle séptico.`,
    clinicalBox: {
      title: 'qSOFA — cribado rápido de sepsis',
      content: `Un punto por cada criterio (evaluar fuera de UTI):\n**Q** — Frecuencia respiratoria ≥ 22/min\n**S** — Alteración del estado mental (GCS < 15)\n**O** — PA sistólica ≤ 100 mmHg\n\n**≥ 2 puntos:** alto riesgo de evolución tórpida; activar protocolo séptico, lactato y evaluación de disfunción orgánica (SOFA). No sustituye el juicio clínico ni el diagnóstico de infección.`,
    },
    relatedDrugs: [
      { drugId: 'nor-001', label: 'Noradrenalina' },
      { drugId: 'adr-001', label: 'Adrenalina' },
      { drugId: 'vas-001', label: 'Vasopresina' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
      { drugId: 'mer-001', label: 'Meropenem' },
      { drugId: 'van-001', label: 'Vancomicina' },
    ],
    bibliography: [
      { citation: 'Surviving Sepsis Campaign. International Guidelines for Management of Sepsis and Septic Shock.', url: 'https://www.sccm.org/survivingsepsiscampaign' },
      { citation: 'Sociedad Argentina de Infectología (SADI). Guías de antimicrobianos.', url: 'https://www.sadi.org.ar/' },
      MS,
      { citation: 'World Health Organization. Sepsis technical package.', url: 'https://www.who.int/health-topics/sepsis' },
    ],
  },
  {
    id: 'iam-001',
    name: 'Infarto agudo de miocardio (IAM)',
    body: `El **infarto agudo de miocardio (IAM)** es necrosis miocárdica por isquemia prolongada, dentro del espectro del síndrome coronario agudo. Se clasifica en **IAMCEST** (elevación del ST en ECG) e **IAMSEST** (sin elevación del ST). El dolor típico es opresivo retroesternal > 20 minutos, con diaforesis, náuseas, irradiación a brazo izquierdo o mandíbula; en diabéticos, ancianos y mujeres puede ser **atípico** (disnea, astenia, síncope).\n\nLa prioridad en guardia es **ECG en menos de 10 minutos**. Ante **IAMCEST** o equivalentes (bloqueo de rama izquierda nuevo, imagen de ola hiperaguda): activar vía de **reperfusión urgente** (angioplastía primaria o trombólisis según tiempos y recursos). Tratamiento inicial: **ácido acetilsalicílico**, anticoagulación, nitroglicerina si PA lo permite, analgesia y betabloqueador según protocolo. Monitorizar arritmias ventriculares en las primeras 24 h.\n\n**Enfermería**: monitor cardíaco continuo, acceso venoso, oxígeno solo si hipoxemia, registro seriado de dolor (EVA) y preparación para cateterismo. Documentar hora de inicio de síntomas y hora de primer ECG. NPO hasta definición.`,
    clinicalBoxes: [
      {
        title: 'Electrocardiograma — comparación visual',
        illustration: 'ecg-sinus-vs-stemi',
        content: `**Criterio general de IAMCEST:** elevación del punto J ≥ **1 mm** en al menos **2 derivaciones contiguas** (criterios específicos en V2-V3 según sexo). Comparar siempre con un trazado previo si existe.\n\nAnte hallazgo compatible: activar código IAM, AAS y anticoagulación según protocolo, y no retrasar reperfusión.`,
      },
    ],
    relatedDrugs: [
      { drugId: 'ngl-001', label: 'Nitroglicerina' },
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'mor-001', label: 'Morfina' },
      { drugId: 'mop-001', label: 'Metoprolol' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Acute Coronary Syndromes Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedad Argentina de Cardiología (SAC). Guía de SCA.', url: 'https://www.sac.org.ar/' },
      MS,
      { citation: 'American Heart Association. Acute Myocardial Infarction guidelines.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'ang-001',
    name: 'Angina inestable e IAMSEST',
    body: `La **angina inestable** y el **IAM sin elevación del ST (IAMSEST)** forman el polo del síndrome coronario agudo sin elevación del ST. Se caracterizan por dolor torácico en reposo o en reposo prolongado, angina creciente o nuevo, o elevación de **troponina** con ECG sin criterios de IAMCEST. El riesgo se estratifica con escalas (HEART, GRACE, TIMI) para decidir observación, ingreso en unidad coronaria o estrategia invasiva precoz.\n\nEl tratamiento incluye **antiagregación dual** (AAS + inhibidor P2Y12 según protocolo), **anticoagulación**, betabloqueador, estatina de alta intensidad y nitratos para síntomas. La **coronariografía** se indica en pacientes de alto riesgo o con inestabilidad hemodinámica. Diferenciar de otras causas de dolor torácico (disección aórtica, TEP, pericarditis) antes de anticoagular ampliamente.\n\n**Enfermería**: ECG y troponina seriados según protocolo, monitorización continua, control de dolor y PA, registro de episodios anginosos y educación sobre señales de alarma al alta.`,
    relatedDrugs: [
      { drugId: 'ngl-001', label: 'Nitroglicerina' },
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'mor-001', label: 'Morfina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Non-ST-elevation acute coronary syndromes.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedad Argentina de Cardiología (SAC). SCA sin elevación del ST.', url: 'https://www.sac.org.ar/' },
      MS,
      { citation: 'American Heart Association. NSTE-ACS guideline.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'per-001',
    name: 'Pericarditis aguda',
    body: `La **pericarditis aguda** es inflamación del pericardio, frecuentemente viral o postviral. El dolor es **pleurítico**, retroesternal, que **mejora sentado e inclinado hacia adelante** y empeora en decúbito y con la inspiración profunda. Puede haber fricción pericárdica a la auscultación. El ECG muestra típicamente **elevación difusa del ST** con **depresión del PR** en múltiples derivaciones (a diferencia del IAM, que es territorial y recíproco).\n\nEl diagnóstico es clínico con apoyo de ECG, ecocardiograma (derrame pericárdico) y troponina (puede elevarse en miopericarditis). Tratamiento: **AINE** (ibuprofeno o AAS en dosis antiinflamatorias) y **colchicina** para reducir recurrencias, según guía. Evitar anticoagulación si hay riesgo de hemopericardio. Hospitalizar si fiebre alta, derrame importante, inmunosupresión o sospecha de pericarditis purulenta.\n\n**Enfermería**: posición semisentada, control del dolor, vigilancia de signos de taponamiento (hipotensión, ingurgitación yugular, pulsos paradójicos) y educación sobre reposo relativo y seguimiento.`,
    relatedDrugs: [
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'mor-001', label: 'Morfina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Pericardial diseases guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedad Argentina de Cardiología (SAC). Pericarditis.', url: 'https://www.sac.org.ar/' },
      MS,
      { citation: 'American College of Cardiology. Pericarditis clinical guidance.', url: 'https://www.acc.org/' },
    ],
  },
  {
    id: 'tsv-001',
    name: 'Taquicardia supraventricular (TSV)',
    body: `La **taquicardia supraventricular (TSV)** es un ritmo rápido regular de origen auricular o unión AV, con frecuencia usualmente 150–250 lpm. El paciente refiere **palpitaciones** de inicio y fin bruscos, mareo, opresión torácica o disnea. En el ECG: QRS estrecho y regular (salvo aberrancia). Diferenciar de flutter auricular, FA con conducción rápida y taquicardia sinusal.\n\nEn paciente **inestable** (hipotensión, edema agudo de pulmón, dolor isquémico, alteración del estado mental): **cardioversión eléctrica sincronizada** inmediata. Si está estable: maniobras vagales y **adenosina** IV en bolos (con monitor y desfibrilador disponibles). Si falla adenosina: betabloqueador IV, verapamil o amiodarona según protocolo y comorbilidades. Tratar causa desencadenante (fiebre, anemia, hipovolemia).\n\n**Enfermería**: monitor cardíaco continuo, acceso venoso, preparar adenosina y equipo de cardioversión, registrar hora de inicio y respuesta a maniobras vagales, vigilar bradicardia tras adenosina.`,
    relatedDrugs: [
      { drugId: 'ade-001', label: 'Adenosina' },
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'amd-001', label: 'Amiodarona' },
      { drugId: 'atr-001', label: 'Atropina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Supraventricular tachycardia guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedad Argentina de Cardiología (SAC). Arritmias supraventriculares.', url: 'https://www.sac.org.ar/' },
      MS,
      { citation: 'American Heart Association. Tachycardia algorithm (ACLS).', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'pna-001',
    name: 'Neumonía adquirida en la comunidad',
    body: `La **neumonía adquirida en la comunidad (NAC)** es la infección aguda del parénquima pulmonar adquirida fuera del ámbito hospitalario. En guardia se clasifica según gravedad con escalas como **CURB-65** o **PSI** para decidir manejo ambulatorio, hospitalario o en UTI. La presentación clásica incluye fiebre, tos productiva, dolor pleurítico y consolidación en la auscultación; en adultos mayores puede debutar con confusión o desaturación sin fiebre marcada.\n\nEl estudio incluye radiografía de tórax (o ecografía torácica si está disponible), hemograma, función renal, oximetría y hemocultivos en casos graves. El **antibiótico empírico** se ajusta a guía local y factores de riesgo (EPOC, alcoholismo, institucionalización reciente). Esquemas frecuentes: betalactámico ± macrólido o fluoroquinolona respiratoria en pacientes con comorbilidades. Oxígeno si SpO₂ < 90–92 % y reevaluación a las 48–72 h.\n\n**Enfermería**: control de temperatura y SpO₂, fomentar hidratación y movilización precoz, técnicas de tos efectiva, educación sobre completar el ciclo antibiótico y vacunación antineumocócica e influenza. Aislar solo si hay sospecha de patógeno transmitido por vía aérea según protocolo.`,
    clinicalBox: {
      title: 'CURB-65 — gravedad en NAC',
      content: `Un punto por cada criterio:\n**C** — Confusión (nueva o GCS ≤ 8)\n**U** — Urea > 19 mg/dL (o BUN > 20 mg/dL)\n**R** — Frecuencia respiratoria ≥ 30/min\n**B** — PA sistólica < 90 o diastólica ≤ 60 mmHg\n**65** — Edad ≥ 65 años\n\n**0–1:** manejo ambulatorio · **2:** considerar hospitalización · **3–5:** ingreso; ≥ 4 valorar UTI.`,
    },
    relatedDrugs: [
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'azi-001', label: 'Azitromicina' },
      { drugId: 'lev-001', label: 'Levofloxacino' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
      { drugId: 'van-001', label: 'Vancomicina' },
    ],
    bibliography: [
      { citation: 'Infectious Diseases Society of America / American Thoracic Society. Guidelines for CAP in adults.', url: 'https://www.idsociety.org/' },
      { citation: 'Sociedad Argentina de Infectología (SADI). Recomendaciones de NAC.', url: 'https://www.sadi.org.ar/' },
      MS,
      { citation: 'British Thoracic Society. CAP guideline.', url: 'https://www.brit-thoracic.org.uk/' },
    ],
  },
  {
    id: 'ira-001',
    name: 'Insuficiencia renal aguda (IRA)',
    body: `La **insuficiencia renal aguda** (injuria renal aguda) es el deterioro rápido de la función renal con acumulación de productos nitrogenados y alteración del equilibrio hidroelectrolítico y ácido-base. Se clasifica en **prerrenal** (hipoperfusión), **renal** (nefrotóxicos, NTA) e **postrenal** (obstrucción). En guardia es frecuente por deshidratación, sepsis, nefrotóxicos (AINE, contrastes, aminoglucósidos) y obstrucción prostática en varones mayores.\n\nLa evaluación incluye creatinina y urea seriadas, ionograma, gasometría, sedimento urinario, ecografía renal si hay sospecha obstructiva y revisión de medicación. El manejo inicial es **tratar la causa**, suspender nefrotóxicos, ajustar dosis de fármacos al clearance y optimizar volumen: cristaloides en prerrenal con respuesta esperada, evitar sobrecarga en oliguria. Indicaciones de **diálisis urgente**: hiperkalemia refractaria, acidosis grave, sobrecarga hídrica con hipoxemia o uremia sintomática.\n\n**Enfermería**: balance hídrico estricto, peso diario, registro preciso de diuresis horaria, vigilancia de K⁺ y ECG si hiperkalemia, y prevención de nuevos insultos renales. Coordinar con farmacia el ajuste de antibióticos y anticoagulantes.`,
    relatedDrugs: [
      { drugId: 'fur-001', label: 'Furosemida' },
      { drugId: 'bic-001', label: 'Bicarbonato de sodio' },
      { drugId: 'kcl-001', label: 'Cloruro de potasio' },
      { drugId: 'nsh-001', label: 'Cloruro de sodio hipertónico' },
    ],
    bibliography: [
      { citation: 'Kidney Disease: Improving Global Outcomes (KDIGO). Acute Kidney Injury guideline.', url: 'https://kdigo.org/guidelines/' },
      { citation: 'Sociedad Argentina de Nefrología (SAN). Consensos nacionales.', url: 'https://www.san.org.ar/' },
      MS,
      { citation: 'National Institute for Health and Care Excellence. Acute kidney injury guideline.', url: 'https://www.nice.org.uk/guidance/ng148' },
    ],
  },
  {
    id: 'tep-001',
    name: 'Tromboembolismo pulmonar (TEP)',
    body: `El **tromboembolismo pulmonar** es la obstrucción de la arteria pulmonar o sus ramas por un trombo, en la mayoría de los casos procedente del sistema venoso profundo. La tríada clásica (dolor torácico pleurítico, hemoptisis, disnea) es poco sensible; debe sospecharse ante **disnea aguda inexplicada**, taquicardia, sincope, hipotensión o signos de TVP en miembros inferiores. Factores de riesgo: inmovilización, cirugía reciente, cáncer, embarazo, anticonceptivos y trombofilias.\n\nLa estratificación con escalas (**Wells**, **GENEVA**) y D-dímero (alto valor predictivo negativo en baja probabilidad) orientan el estudio. La **angio-TC pulmonar** es el gold standard en muchos centros; ecocardiograma busca sobrecarga derecha. El tratamiento incluye **anticoagulación** inmediata (heparina no fraccionada o enoxaparina) y valoración de trombólisis o embolectomía en TEP de alto riesgo (shock o hipotensión).\n\n**Enfermería**: oxigenoterapia, monitorización hemodinámica, control de signos de sangrado tras anticoagulación, medias de compresión si no contraindicadas y educación sobre duración del tratamiento y signos de recurrencia.`,
    clinicalBox: {
      title: 'Escala de Wells — probabilidad de TEP',
      content: `Puntaje clínico (versión simplificada):\nSignos clínicos de **TVP** — 3 pts\n**TEP** como diagnóstico más probable — 3 pts\nFC **> 100**/min — 1,5 pts\nInmovilización o cirugía reciente — 1,5 pts\n**TEP o TVP** previos — 1,5 pts\n**Hemoptisis** — 1 pt\n**Cáncer** activo — 1 pt\n\n**≤ 4:** probabilidad baja (D-dímero si aplica) · **> 4:** probabilidad alta → imagen pulmonar urgente.`,
    },
    relatedDrugs: [
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'war-001', label: 'Warfarina' },
      { drugId: 'nor-001', label: 'Noradrenalina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Pulmonary Embolism Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedad Argentina de Cardiología. Consenso de enfermedad tromboembólica.', url: 'https://www.sac.org.ar/' },
      MS,
      { citation: 'American College of Chest Physicians. Antithrombotic Therapy guidelines.', url: 'https://www.chestnet.org/' },
    ],
  },
  {
    id: 'fa-001',
    name: 'Fibrilación auricular (FA)',
    body: `La **fibrilación auricular** es la arritmia sostenida más frecuente en la práctica clínica, caracterizada por activación auricular desorganizada y respuesta ventricular irregular. En guardia puede debutar como palpitaciones, disnea, dolor torácico, síncope o hallazgo incidental. Diferenciar **FA de novo**, FA conocida descompensada y flutter auricular. Siempre valorar estabilidad hemodinámica: en paciente inestable (hipotensión, edema agudo de pulmón, isquemia miocárdica aguda) procede **cardioversión eléctrica urgente**.\n\nEn paciente estable se busca causa reversible (sepsis, hipokalemia, hipertiroidismo, alcohol, TEP). El control de frecuencia (betabloqueantes, calcioantagonistas no dihidropiridínicos, digoxina según contexto) o ritmo (cardioversión farmacológica o eléctrica programada) depende de tiempo de evolución y comorbilidades. La **anticoagulación** se decide con escalas CHA₂DS₂-VASc y HAS-BLED; en FA > 48 h o desconocida, anticoagular antes de cardioversión salvo emergencia.\n\n**Enfermería**: monitor cardíaco continuo, registro de FC y PA, administración de antiarrítmicos según protocolo, vigilancia de bradicardia o QT prolongado, y educación sobre adherencia a anticoagulación y control ambulatorio.`,
    clinicalBoxes: [
      {
        title: 'CHA₂DS₂-VASc — riesgo tromboembólico',
        content: `Un punto por cada ítem (máx. 9 en mujer, 8 en varón):\n**C** — ICC o disfunción VI · **H** — HTA · **A₂** — edad ≥ 75 (2 pts) · **D** — diabetes · **S₂** — ACV/AIT/TE previo (2 pts) · **V** — enfermedad vascular · **A** — edad 65–74 · **Sc** — sexo femenino.\n\n**0 (varón) / 1 (mujer):** sin anticoagulación. **1 (varón):** considerar. **≥ 2:** anticoagulación recomendada salvo contraindicación.`,
      },
      {
        title: 'HAS-BLED — riesgo de sangrado',
        content: `Un punto por ítem: **H** — HTA no controlada · **A** — renal/hepática anormal · **S** — ACV previo · **B** — sangrado previo o predisposición · **L** — INR lábil (ACO) · **E** — edad > 65 · **D** — fármacos (AAS, AINE) o alcohol.\n\n≥ 3: alto riesgo de sangrado — no contraindica anticoagulación, pero exige vigilancia y corrección de factores modificables.`,
      },
    ],
    relatedDrugs: [
      { drugId: 'amd-001', label: 'Amiodarona' },
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'war-001', label: 'Warfarina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Atrial Fibrillation Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedad Argentina de Cardiología. Consenso de arritmias.', url: 'https://www.sac.org.ar/' },
      MS,
      { citation: 'American Heart Association / ACC. AF management guideline.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'hda-001',
    name: 'Hemorragia digestiva alta (HDA)',
    body: `La **hemorragia digestiva alta** es el sangrado proximal al ligamento de Treitz, habitualmente por **úlcera péptica**, varices esofagogástricas, gastropatía erosiva, Mallory-Weiss o malignidad. Se manifiesta por hematemesis, melena o, en sangrado masivo, hematochezia. La gravedad se estima con escalas como **Glasgow-Blatchford** o Rockall; signos de inestabilidad (hipotensión, taquicardia, lipotimia, Hb < 7 g/dL) exigen reanimación agresiva.\n\nEl manejo inicial: dos vías venosas de grueso calibre, cristaloides y concentrados de hematíes según protocolo transfusional, **inhibidor de bomba de protones** IV (pantoprazol), y en sospecha de varices: vasoconstrictor esplácnico (octreotida) más antibiótico profiláctico y contacto urgente con endoscopía. Evitar AAS/AINES; reconsiderar anticoagulantes según balance riesgo-beneficio. Intubar para protección de vía aérea si hematemesis activa con alteración del nivel de conciencia.\n\n**Enfermería**: NPO, sonda nasogástrica solo si protocolo lo indica, monitorización continua, tipo y cruce, registro de episodios hemáticos y vigilancia de resangrado. Preparar al paciente y familiares para endoscopia urgente.`,
    clinicalBox: {
      title: 'Glasgow-Blatchford — riesgo en HDA',
      content: `Puntaje 0–23 (mayor = más riesgo de intervención). Ítems principales:\n**Urea** > 6,5 mmol/L (19 mg/dL) · **Hb** baja (según sexo) · **PA sistólica** < 90–110 · **FC** ≥ 100\n**Melena** · **Síncope** · **Hepatopatía** · **ICC** · **Varices** esofágicas conocidas\n\n**0:** bajo riesgo — valorar alta precoz tras observación · **≥ 1:** ingreso y endoscopia según protocolo · Puntajes altos: transfusión y UTI.`,
    },
    relatedDrugs: [
      { drugId: 'pan-001', label: 'Pantoprazol' },
      { drugId: 'oct-001', label: 'Octreotida' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'vit-001', label: 'Vitamina K' },
      { drugId: 'prt-001', label: 'Protamina' },
    ],
    bibliography: [
      { citation: 'International consensus on management of patients with nonvariceal upper gastrointestinal bleeding.', url: 'https://www.bsg.org.uk/' },
      { citation: 'Sociedad Argentina de Gastroenterología (SAGE). Guías de HDA.', url: 'https://www.sage.org.ar/' },
      MS,
      { citation: 'American College of Gastroenterology. Upper GI bleeding guideline.', url: 'https://gi.org/guideline/' },
    ],
  },
  {
    id: 'del-001',
    name: 'Delirium agudo',
    body: `El **delirium** es un trastorno neurocognitivo agudo con alteración de la atención y conciencia, curso fluctuante e inicio en horas o días. Es muy frecuente en guardia y hospitalización de adultos mayores, y se asocia a mayor mortalidad, estancia prolongada y deterioro funcional. Los **precipitantes** incluyen infección, hipoxemia, deshidratación, retención urinaria, fármacos (benzodiacepinas, anticolinérgicos, opioides), dolor no tratado, privación sensorial y cambio de entorno.\n\nEl diagnóstico es clínico (escalas **CAM** o 4AT). El tratamiento de primera línea es **corregir la causa** y aplicar medidas no farmacológicas: orientación temporal y espacial, lentes y audífonos, movilización precoz, sueño nocturno, acompañante y evitar sujeción. La medicación (haloperidol o atípicos en dosis bajas) se reserva para agitación que pone en riesgo al paciente o al equipo, siempre por tiempo limitado.\n\n**Enfermería**: valoración seriada del estado mental, prevención de caídas, ambiente con luz natural, reorientación frecuente y comunicación con la familia. Revisar lista de medicación y retirar fármacos delirantes cuando sea posible.`,
    relatedDrugs: [
      { drugId: 'hal-001', label: 'Haloperidol' },
      { drugId: 'lor-001', label: 'Lorazepam' },
      { drugId: 'mid-001', label: 'Midazolam' },
      { drugId: 'dex-001', label: 'Dexmedetomidina' },
    ],
    bibliography: [
      { citation: 'National Institute for Health and Care Excellence. Delirium: prevention, diagnosis and management.', url: 'https://www.nice.org.uk/guidance/cg103' },
      { citation: 'Sociedad Argentina de Geriatría y Gerontología (SAGG). Consensos sobre delirium.', url: 'https://www.sagg.org.ar/' },
      MS,
      { citation: 'American Geriatrics Society. Clinical Practice Guideline for Postoperative Delirium.', url: 'https://www.americangeriatrics.org/' },
    ],
  },
  {
    id: 'tdm-001',
    name: 'Trastornos del medio interno',
    body: `Los **trastornos del medio interno (TDM)** agrupan alteraciones hidroelectrolíticas y ácido-base frecuentes en guardia: hiponatremia, hiperkalemia, hipokalemia, hipoglucemia, hipocalcemia y trastornos del equilibrio ácido-base. Suelen ser **consecuencia** de otra patología (vómitos, diarrea, diuréticos, IRA, sepsis, insulina excesiva) y su corrección inadecuada puede ser iatrogénica.\n\nLa **deshidratación** hipovolémica cursa con sed, mucosas secas, hipotensión ortostática, oliguria y hemoconcentración; el tratamiento es reposición con cristaloides según gravedad y causa. La **hiponatremia** sintomática (convulsiones, coma) requiere corrección controlada con salina hipertónica según protocolo; evitar corrección rápida para prevenir mielinólisis. La **hiperkalemia** grave demanda estabilización de membrana (calcio IV), shift intracelular (insulina-dextrosa, beta-2) y eliminación según recursos.\n\n**Enfermería**: monitorizar signos vitales, diuresis, glucemia capilar si procede, administrar electrolitos y sueros con bomba de infusión cuando corresponda, y repetir laboratorio según orden médica. Documentar volumen administrado y respuesta clínica.`,
    relatedDrugs: [
      { drugId: 'nsh-001', label: 'Cloruro de sodio hipertónico' },
      { drugId: 'kcl-001', label: 'Cloruro de potasio' },
      { drugId: 'cag-001', label: 'Gluconato de calcio' },
      { drugId: 'bic-001', label: 'Bicarbonato de sodio' },
      { drugId: 'ins-001', label: 'Insulina corriente' },
      { drugId: 'glu-001', label: 'Dextrosa (glucosa)' },
    ],
    bibliography: [
      { citation: 'European Renal Association. Clinical practice guideline on management of hyponatraemia.', url: 'https://www.era-online.org/' },
      { citation: 'Kidney Disease: Improving Global Outcomes (KDIGO). Electrolyte disorders.', url: 'https://kdigo.org/guidelines/' },
      MS,
      { citation: 'American Society of Nephrology. Core curriculum in electrolyte disorders.', url: 'https://www.asn-online.org/' },
    ],
  },
  {
    id: 'cad-001',
    name: 'Cetoacidosis diabética (CAD)',
    body: `La **cetoacidosis diabética** es una emergencia metabólica definida por hiperglucemia, acidosis metabólica con anión gap elevado y cetonemia/cetonuria. Predomina en **diabetes tipo 1**, pero puede aparecer en tipo 2 bajo estrés grave. Los desencadenantes habituales son infección intercurrente, omisión de insulina, IAM y fármacos (corticoides). El cuadro incluye poliuria, polidipsia, náuseas, vómitos, dolor abdominal, respiración de Kussmaul y alteración del sensorio.\n\nEl tratamiento sigue el algoritmo institucional: **reposición de volumen** con cristaloides, **insulina corriente IV** en infusión continua tras dosis inicial, corrección de **potasio** (no iniciar insulina si K⁺ < 3,3 mEq/L), y búsqueda del factor precipitante. El bicarbonato solo se considera en acidosis severa con pH < 6,9 según guía. Monitorizar glucemia horaria, gasometría, electrolitos y estado neurológico. Transición a insulina subcutánea cuando la cetonemia se resuelve y el paciente tolera vía oral.\n\n**Enfermería**: balance hídrico estricto, registro de vómitos y diuresis, glucemia capilar seriada, bomba de insulina con doble verificación de velocidad, y educación sobre prevención (enfermedad intercurrente, ajuste de dosis, no suspender insulina basal).`,
    relatedDrugs: [
      { drugId: 'ins-001', label: 'Insulina corriente' },
      { drugId: 'inp-001', label: 'Insulina NPH' },
      { drugId: 'kcl-001', label: 'Cloruro de potasio' },
      { drugId: 'bic-001', label: 'Bicarbonato de sodio' },
      { drugId: 'glu-001', label: 'Dextrosa (glucosa)' },
    ],
    bibliography: [
      { citation: 'American Diabetes Association. Standards of Care — hyperglycemic crises.', url: 'https://diabetesjournals.org/care/' },
      { citation: 'Sociedad Argentina de Diabetes (SAD). Consenso de CAD.', url: 'https://www.sad.org.ar/' },
      MS,
      { citation: 'Joint British Diabetes Societies. DKA management guideline.', url: 'https://www.diabetes.org.uk/' },
    ],
  },
  {
    id: 'dia-001',
    name: 'Diabetes mellitus',
    body: `La diabetes mellitus es una enfermedad metabólica definida por hiperglucemia crónica. En la **diabetes tipo 1** hay destrucción de las células beta pancreáticas y déficit absoluto de insulina, con inicio frecuente en la infancia o adolescencia. La **diabetes tipo 2** combina resistencia a la insulina y secreción insuficiente; se asocia a edad avanzada, sobrepeso, sedentarismo y antecedentes familiares. La **diabetes gestacional** aparece durante el embarazo y exige control estricto por el riesgo materno y fetal.\n\nEntre las afecciones agudas destacan la **cetoacidosis diabética** (más habitual en tipo 1), el **estado hiperglucémico hiperosmolar** (más frecuente en tipo 2) y la **hipoglucemia**, que puede deberse a exceso de insulina, ayuno prolongado o actividad física no compensada. Las complicaciones crónicas incluyen retinopatía, nefropatía, neuropatía periférica, pie diabético e incremento del riesgo cardiovascular. En la valoración de enfermería conviene registrar poliuria, polidipsia, pérdida de peso, heridas que cicatrizan mal y cambios en el nivel de conciencia.\n\nEl **tratamiento oportuno** combina educación, plan alimentario y actividad física. El tipo 1 requiere insulina desde el diagnóstico. En el tipo 2 se inicia habitualmente con metformina y otros fármacos según meta glucémica; la insulina se indica cuando no se alcanza el control. En hospitalización: monitorizar glucemia capilar, administrar insulina basal y de corrección según protocolo institucional, e iniciar de inmediato el algoritmo de **CAD** o **EHH** cuando corresponda. Ante hipoglucemia sintomática, aplicar la regla del 15-15 (glucosa oral) o glucagón / dextrosa IV según gravedad y protocolo del servicio.`,
    relatedDrugs: [
      { drugId: 'ins-001', label: 'Insulina corriente' },
      { drugId: 'inp-001', label: 'Insulina NPH' },
      { drugId: 'glc-001', label: 'Glucagón' },
      { drugId: 'glu-001', label: 'Dextrosa (glucosa)' },
    ],
    bibliography: [
      { citation: 'American Diabetes Association. Standards of Care in Diabetes.', url: 'https://diabetesjournals.org/care/issue/47/Supplement_1' },
      { citation: 'Sociedad Argentina de Diabetes (SAD). Guías y consensos nacionales.', url: 'https://www.sad.org.ar/' },
      MS,
      { citation: 'International Diabetes Federation. IDF Diabetes Atlas.', url: 'https://diabetesatlas.org/' },
    ],
  },
  {
    id: 'asm-001',
    name: 'Asma — crisis aguda',
    body: `La **crisis asmática aguda** es el empeoramiento rápido de síntomas respiratorios con obstrucción reversible de la vía aérea. En guardia se estratifica la gravedad por frecuencia respiratoria, uso de musculatura accesoria, capacidad de hablar en frases completas, sibilancias, SpO₂ y pico de flujo espiratorio si el paciente puede cooperar. La **asma casi fatal** cursa con silencio auscultatorio, bradicardia, cianosis o alteración del sensorio.\n\nEl tratamiento de primera línea es **salbutamol** de acción corta (nebulización o inhalador con espaciador, dosis repetidas cada 20 min en crisis moderada-grave) más **bromuro de ipratropio** en episodios graves. **Corticoides sistémicos** (prednisona oral o metilprednisolona / dexametasona IV) se indican precozmente. Oxígeno para mantener SpO₂ ≥ 94 %. Valorar sulfato de magnesio IV en crisis refractaria y consulta a UTI si no hay respuesta o hay acidosis respiratoria.\n\n**Enfermería**: posición semisentada, monitorizar SpO₂ y FR continuamente, registrar hora y respuesta a cada nebulización, preparar acceso venoso en crisis moderada-grave y vigilar efectos adversos de beta-2 (temblor, taquicardia). Revisar técnica inhalatoria y plan de acción escrito al alta.`,
    relatedDrugs: [
      { drugId: 'sal-001', label: 'Salbutamol' },
      { drugId: 'ipr-001', label: 'Ipratropio' },
      { drugId: 'mep-001', label: 'Metilprednisolona' },
      { drugId: 'dxt-001', label: 'Dexametasona' },
      { drugId: 'mag-001', label: 'Sulfato de magnesio' },
    ],
    bibliography: [
      { citation: 'Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention.', url: 'https://ginasthma.org/' },
      { citation: 'Asociación Argentina de Medicina Respiratoria (AAMR). Guías de asma.', url: 'https://www.aamr.org.ar/' },
      MS,
      { citation: 'National Asthma Education and Prevention Program (NAEPP). Expert Panel Report.', url: 'https://www.nhlbi.nih.gov/health-topics/asthma' },
    ],
  },
  {
    id: 'ana-001',
    name: 'Anafilaxia',
    body: `La **anafilaxia** es una reacción sistémica grave de hipersensibilidad, potencialmente mortal, con inicio rápido tras exposición a un alérgeno (alimentos, fármacos, venenos de himenóteros, látex). El diagnóstico es clínico: compromiso cutáneo-mucoso (urticaria, angioedema) más afectación respiratoria (estridor, sibilancias, disnea), cardiovascular (hipotensión, síncope) o gastrointestinal severa, tras exposición probable.\n\nEl tratamiento inmediato es **adrenalina intramuscular** (cara anterolateral del muslo, dosis según peso; repetir cada 5–15 min si persiste cuadro). Colocar en posición supina con miembros elevados salvo disnea grave (semisentado). Oxígeno, expansión con cristaloides si hipotensión, y **antihistamínico H1 + H2** y corticoide como coadyuvantes (no sustituyen adrenalina). Retirar el desencadenante si es fármaco IV. Observación mínima 4–6 h (riesgo de reacción bifásica); egreso con autoinyector de adrenalina si corresponde.\n\n**Enfermería**: identificar y retirar alérgeno, llamar ayuda, registrar hora exacta de adrenalina, monitorizar TA, FC y SpO₂, preparar segunda dosis y vía aérea avanzada. Documentar alérgeno y alerta en historia clínica.`,
    clinicalBox: {
      title: 'Adrenalina IM — dosis orientativa',
      content: `Vía **intramuscular** (muslo anterolateral), concentración 1:1000 (1 mg/mL):\n**Adulto:** 0,3–0,5 mg IM (0,3–0,5 mL)\n**Niño:** 0,01 mg/kg IM (máx. 0,3 mg)\n\nRepetir cada **5–15 min** si no hay mejoría clínica. En paro cardiorespiratorio: adrenalina IV según ACLS / protocolo pediátrico institucional.`,
    },
    relatedDrugs: [
      { drugId: 'adr-001', label: 'Adrenalina (epinefrina)' },
      { drugId: 'hdc-001', label: 'Hidrocortisona' },
      { drugId: 'dxt-001', label: 'Dexametasona' },
      { drugId: 'sal-001', label: 'Salbutamol' },
    ],
    bibliography: [
      { citation: 'World Allergy Organization. Anaphylaxis guidelines.', url: 'https://www.worldallergy.org/' },
      { citation: 'Sociedad Argentina de Alergia e Inmunología (SAAI). Consenso de anafilaxia.', url: 'https://www.saai.org.ar/' },
      MS,
      { citation: 'National Institute for Allergy and Infectious Diseases. Anaphylaxis guidelines.', url: 'https://www.niaid.nih.gov/' },
    ],
  },
  {
    id: 'ecl-001',
    name: 'Eclampsia y preeclampsia severa',
    body: `La **preeclampsia** es hipertensión arterial (≥ 140/90) con proteinuria o disfunción de órgano blanco tras las 20 semanas de gestación. La **preeclampsia severa** incluye PA ≥ 160/110, trombocitopenia, alteración hepática, insuficiencia renal, edema pulmonar, síntomas cerebrales o visuales. La **eclampsia** es la aparición de convulsiones tónico-clónicas en contexto de preeclampsia y constituye emergencia obstétrica.\n\nEl manejo combina **sulfato de magnesio** IV (profilaxis y tratamiento de convulsiones), control de PA con **labetalol, hidralazina o nifedipina** según protocolo obstétrico, y **resolución del embarazo** cuando la madre o el feto están en riesgo (timing según edad gestacional y criterios de obstetricia). Monitorizar reflejos patelares, diuresis y frecuencia respiratoria durante magnesio (riesgo de toxicidad). En eclampsia activa: estabilizar, proteger vía aérea y derivación inmediata a maternidad / UTI.\n\n**Enfermería**: PA cada 15 min hasta control, balance hídrico estricto, monitor fetal continuo si corresponde, preparar sulfato de magnesio con bomba y antídoto (gluconato de calcio) disponible. Registrar convulsiones, hora de última comida y medicación antihipertensiva. Coordinar con obstetricia y neonatología.`,
    relatedDrugs: [
      { drugId: 'mag-001', label: 'Sulfato de magnesio' },
      { drugId: 'lab-001', label: 'Labetalol' },
      { drugId: 'hdr-001', label: 'Hidralazina' },
      { drugId: 'cag-001', label: 'Gluconato de calcio' },
    ],
    bibliography: [
      { citation: 'American College of Obstetricians and Gynecologists. Gestational Hypertension and Preeclampsia.', url: 'https://www.acog.org/clinical' },
      { citation: 'Sociedad Argentina de Ginecología y Obstetricia (SAGO). Guías de hipertensión en el embarazo.', url: 'https://www.sago.org.ar/' },
      MS,
      { citation: 'International Society for the Study of Hypertension in Pregnancy. ISSHP guidelines.', url: 'https://www.glowm.com/' },
    ],
  },
  {
    id: 'cvu-001',
    name: 'Crisis convulsiva y status epilepticus',
    body: `La **crisis convulsiva** es un evento paroxístico por descarga eléctrica cerebral anormal. En guardia debe distinguirse **crisis provocada** (hipoglucemia, hiponatremia, alcohol, fármacos, TCE, ACV) de **epilepsia**. El **status epilepticus** es convulsión ≥ 5 min o dos o más crisis sin recuperación completa del nivel de conciencia entre ellas; es emergencia neurológica.\n\nEl algoritmo institucional habitual: **benzodiacepina** de primera línea (diazepam o midazolam IV/rectal/IM según vía disponible). Si persiste, segunda dosis de benzodiacepina y luego **antiepiléptico IV** (levetiracetam, fenitoína o valproato según protocolo). Corregir simultáneamente glucosa, electrolitos y causa reversible. Proteger vía aérea, oxígeno, acceso venoso y monitor cardíaco (fenitoína: riesgo de hipotensión y arritmias con infusión rápida).\n\n**Enfermería**: cronometrar duración de la crisis, lateralizar al paciente, no introducir objetos en la boca, registrar medicación y hora exacta, vigilar postictal (confusión, somnolencia) y observar lesiones por caída. Solicitar glucemia capilar inmediata.`,
    relatedDrugs: [
      { drugId: 'dia-001', label: 'Diazepam' },
      { drugId: 'mid-001', label: 'Midazolam' },
      { drugId: 'lor-001', label: 'Lorazepam' },
      { drugId: 'lvt-001', label: 'Levetiracetam' },
      { drugId: 'fny-001', label: 'Fenitoína' },
      { drugId: 'phb-001', label: 'Fenobarbital' },
    ],
    bibliography: [
      { citation: 'International League Against Epilepsy (ILAE). Status epilepticus treatment guidelines.', url: 'https://www.ilae.org/' },
      { citation: 'Sociedad Argentina de Neurología (SAN). Consensos de epilepsia.', url: 'https://www.san.org.ar/' },
      MS,
      { citation: 'American Epilepsy Society. Treatment of convulsive status epilepticus.', url: 'https://www.aesnet.org/' },
    ],
  },
  {
    id: 'abd-001',
    name: 'Abdomen agudo',
    body: `El **abdomen agudo** es un síndrome de dolor abdominal de inicio reciente que puede requerir intervención quirúrgica o tratamiento urgente. Las causas frecuentes en guardia incluyen apendicitis, colecistitis, pancreatitis, obstrucción intestinal, diverticulitis, isquemia mesentérica, perforación de víscera hueca y patología ginecológica (embarazo ectópico, torsión anexial). La anamnesis explora inicio, localización, irradiación, fiebre, vómitos, ritmo intestinal y antecedentes quirúrgicos.\n\nEl examen valora defensa, rebote, peritonismo, signo de Murphy, masa palpable y hernias. Estudios según sospecha: laboratorio (hemograma, amilasa/lipasa, β-hCG en mujer en edad fértil), ecografía abdominal y TC con contraste cuando está indicada. Manejo inicial: NPO, acceso venoso, analgesia (no retrasar el diagnóstico), antieméticos y antibiótico si peritonitis o infección. Consulta quirúrgica precoz ante peritonismo, inestabilidad hemodinámica o sospecha de isquemia.\n\n**Enfermería**: registrar evolución del dolor en escala EVA seriada, control de signos vitales, preparar al paciente para estudios imagenológicos y cirugía, mantener NPO, sonda nasogástrica solo si indicada, y vigilancia de distensión abdominal y deposiciones.`,
    relatedDrugs: [
      { drugId: 'mor-001', label: 'Morfina' },
      { drugId: 'ond-001', label: 'Ondansetrón' },
      { drugId: 'met-001', label: 'Metronidazol' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
    ],
    bibliography: [
      { citation: 'World Society of Emergency Surgery. WSES guidelines for acute abdomen.', url: 'https://www.wses.org.uk/' },
      { citation: 'Sociedad Argentina de Cirugía (SAC). Consensos de abdomen agudo.', url: 'https://www.cirugia.org.ar/' },
      MS,
      { citation: 'American College of Surgeons. Acute care surgery resources.', url: 'https://www.facs.org/' },
    ],
  },
  {
    id: 'pnc-001',
    name: 'Pancreatitis aguda',
    body: `La **pancreatitis aguda** es inflamación del páncreas con elevación de amilasa y/o lipasa (> 3 veces el límite superior normal) y dolor abdominal característico. Las causas principales son **litiasis biliar** y **alcohol**; otras: hipertrigliceridemia, fármacos, ERCP, hipercalcemia. Se estratifica gravedad con escalas (Ranson, BISAP, APACHE) y marcadores de necrosis o falla orgánica.\n\nEl tratamiento es de **soporte**: reposición volémica agresiva con cristaloides, analgesia adecuada (opioides si precisa), NPO inicial y reinicio de dieta según tolerancia y protocolo. No hay indicación rutinaria de antibiótico profiláctico. Valorar colecistectomía en pancreatitis biliar leve tras resolución, y CPRE urgente si colangitis asociada. Complicaciones: necrosis infectada, pseudoquiste, falla orgánica — derivación a UTI.\n\n**Enfermería**: monitorizar FC, TA, diuresis (meta ≥ 0,5 mL/kg/h), balance hídrico, dolor y distensión abdominal. Glucemia seriada (riesgo de hiperglucemia). Vigilar signos de sepsis en necrosis y preparar estudios imagenológicos de control.`,
    relatedDrugs: [
      { drugId: 'mor-001', label: 'Morfina' },
      { drugId: 'ond-001', label: 'Ondansetrón' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
      { drugId: 'mer-001', label: 'Meropenem' },
    ],
    bibliography: [
      { citation: 'American Gastroenterological Association. Acute Pancreatitis Clinical Guidelines.', url: 'https://gastro.org/clinical-guidance' },
      { citation: 'Sociedad Argentina de Gastroenterología (SAGE). Consenso de pancreatitis.', url: 'https://www.sage.org.ar/' },
      MS,
      { citation: 'International Association of Pancreatology / American Pancreatic Association.', url: 'https://www.iap-online.org/' },
    ],
  },
  {
    id: 'itu-001',
    name: 'Infección urinaria complicada y pielonefritis',
    body: `La **infección del tracto urinario (ITU) complicada** ocurre en presencia de anomalía estructural o funcional, instrumentación reciente, embarazo, diabetes o inmunosupresión. La **pielonefritis aguda** es infección del parénquima renal, con fiebre, dolor lumbar, náuseas y a veces síntomas miccionales. En varones jóvenes toda ITU se considera complicada; en ancianos puede presentarse solo con alteración del estado general.\n\nEl diagnóstico combina clínica, urocultivo y, si hay fiebre persistente o mala respuesta, imagen (ecografía o TC) para descartar obstrucción o absceso. Antibiótico empírico según guía local (ceftriaxona, fluoroquinolona si baja resistencia, piperacilina-tazobactam en severos o hospitalizados). Duración habitual 7–14 días según gravedad. Hospitalizar si vómitos, septicemia, embarazo, falla renal o no tolerancia oral.\n\n**Enfermería**: registrar temperatura y dolor lumbar, incentivar hidratación oral si tolera, control de diuresis, cultivos antes de antibiótico cuando sea posible sin retrasar dosis en cuadro severo, y educación sobre higiene y adherencia al tratamiento.`,
    relatedDrugs: [
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'cip-001', label: 'Ciprofloxacino' },
      { drugId: 'lev-001', label: 'Levofloxacino' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
      { drugId: 'tri-001', label: 'Trimetoprima/sulfametoxazol' },
    ],
    bibliography: [
      { citation: 'Infectious Diseases Society of America. International Clinical Practice Guidelines for Acute Uncomplicated Cystitis and Pyelonephritis.', url: 'https://www.idsociety.org/' },
      { citation: 'Sociedad Argentina de Infectología (SADI). Guías de ITU.', url: 'https://www.sadi.org.ar/' },
      MS,
      { citation: 'European Association of Urology. Urological Infections guidelines.', url: 'https://uroweb.org/guidelines' },
    ],
  },
  {
    id: 'sin-001',
    name: 'Síncope',
    body: `El **síncope** es la pérdida transitoria de conciencia por hipoperfusión cerebral global, con recuperación espontánea completa. En guardia se clasifica en **reflejo (vasovagal)**, **ortostático** y **cardíaco** (arritmias, cardiopatía estructural). El síncope cardíaco tiene mayor riesgo de muerte súbita y exige estudio urgente. La anamnesis detalla contexto (ortostatismo, esfuerzo, dolor, micción), prodromos, duración y testigos (convulsión vs síncope).\n\nEl examen incluye PA en decúbito y ortostatismo, auscultación cardíaca, ECG obligatorio (buscar bradiarritmias, QT largo, bloqueos, isquemia) y glucemia capilar. En sospecha cardíaca o síncope sin prodromos en esfuerzo: monitorización, troponinas si dolor asociado y consulta cardiología. El síncope reflejo en paciente joven sin cardiopatía suele ser de bajo riesgo tras ECG normal.\n\n**Enfermería**: posición segura durante el episodio, oxímetro y TA seriados, ECG al ingreso, hidratación oral si ortostático y educación sobre maniobras de contrapresión y evitar deshidratación. Registrar medicación (antihipertensivos, diuréticos) que favorezcan hipotensión.`,
    relatedDrugs: [
      { drugId: 'glu-001', label: 'Dextrosa (glucosa)' },
      { drugId: 'ade-001', label: 'Adenosina' },
      { drugId: 'atr-001', label: 'Atropina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Syncope guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedad Argentina de Cardiología. Consenso de síncope.', url: 'https://www.sac.org.ar/' },
      MS,
      { citation: 'American College of Cardiology / AHA. Syncope evaluation.', url: 'https://www.acc.org/' },
    ],
  },
  {
    id: 'int-001',
    name: 'Intoxicación aguda',
    body: `La **intoxicación aguda** es la exposición a una sustancia en dosis tóxica, por vía oral, inhalatoria, cutánea o parenteral. En guardia argentina son frecuentes **sobredosis medicamentosa** (benzodiacepinas, opioides, paracetamol, antidepresivos), **alcohol etílico**, monóxido de carbono, organofosforados y drogas de abuso. La prioridad es **ABCDE**: vía aérea, ventilación, circulación, glucemia capilar y temperatura.\n\nIdentificar toxídromes: **opioide** (miosis, depresión respiratoria → naloxona), **anticolinérgico** (piel seca, midriasis, retención), **colinérgico** (sialorrea, broncorrea, miosis → atropina), **sedante-hipnótico** (depresión SNC). En sobredosis de **paracetamol**, calcular nomograma de Rumack-Matthew y N-acetilcisteína si está indicada. Carvón activado solo en ingestas recientes (< 1–2 h) y vía aérea protegida. Contactar centro toxicológico institucional o nacional.\n\n**Enfermería**: preservar muestras (vómito, envases), no inducir vómito, monitorizar nivel de conciencia y FR, preparar antídotos según protocolo (naloxona, flumazenil con cautela, glucosa) y vigilancia de agitación o convulsiones en abstinencia.`,
    relatedDrugs: [
      { drugId: 'nal-001', label: 'Naloxona' },
      { drugId: 'flm-001', label: 'Flumazenil' },
      { drugId: 'atr-001', label: 'Atropina' },
      { drugId: 'bic-001', label: 'Bicarbonato de sodio' },
      { drugId: 'glu-001', label: 'Dextrosa (glucosa)' },
    ],
    bibliography: [
      { citation: 'American College of Medical Toxicology. ACMT practice guidelines.', url: 'https://www.acmt.net/' },
      { citation: 'Centro de Información Toxicológica — Argentina (CITBA / hospitales de referencia).', url: 'https://www.argentina.gob.ar/salud' },
      MS,
      { citation: 'Poison Control / WHO. Guidelines for poison control.', url: 'https://www.who.int/health-topics/poisoning' },
    ],
  },
  {
    id: 'hip-001',
    name: 'Hipoglucemia severa',
    body: `La **hipoglucemia** es glucemia < 70 mg/dL (3,9 mmol/L); es **severa** cuando requiere ayuda de terceros para su tratamiento o presenta alteración del nivel de conciencia o convulsiones. En guardia es frecuente en diabéticos con exceso de insulina u hipoglucemiantes orales, ayuno prolongado, alcohol, sepsis o insuficiencia renal. También puede simular ACV o crisis convulsiva.\n\nEl tratamiento inmediato en paciente consciente: **15–20 g de glucosa oral** (sobres, jugo, miel) y repetir glucemia a los 15 min (regla del 15-15). Si no tolera vía oral o está inconsciente: **glucosa IV** (dextrosa 10 % o 25–50 % según protocolo) o **glucagón IM/SC** si no hay acceso venoso. Tras recuperación, comida con carbohidratos complejos y revisión de esquema insulínico. Investigar causa (dosis, comida omitida, enfermedad intercurrente).\n\n**Enfermería**: glucemia capilar al ingreso en todo paciente con alteración del sensorio, doble verificación de dosis de dextrosa IV, monitorización post-tratamiento (rebote o hipoglucemia recurrente) y educación sobre prevención y portar identificación de diabetes.`,
    clinicalBox: {
      title: 'Regla del 15-15',
      content: `Si el paciente está **consciente y puede deglutir**:\n1. Administrar **15–20 g de glucosa** oral (ej. 4 sobres de glucosa o 150 mL de jugo).\n2. Repetir glucemia a los **15 minutos**.\n3. Si persiste < 70 mg/dL, repetir el ciclo.\n4. Tras normalizar, ofrecer **snack** con carbohidrato complejo.\n\nSi está **inconsciente**: glucosa IV o glucagón IM — no administrar nada por boca.`,
    },
    relatedDrugs: [
      { drugId: 'glu-001', label: 'Dextrosa (glucosa)' },
      { drugId: 'glc-001', label: 'Glucagón' },
      { drugId: 'ins-001', label: 'Insulina corriente' },
    ],
    bibliography: [
      { citation: 'American Diabetes Association. Standards of Care — hypoglycemia.', url: 'https://diabetesjournals.org/care/' },
      { citation: 'Sociedad Argentina de Diabetes (SAD). Manejo de hipoglucemia.', url: 'https://www.sad.org.ar/' },
      MS,
      { citation: 'International Hypoglycaemia Study Group. Definitions and reporting.', url: 'https://ihsgonline.com/' },
    ],
  },
  {
    id: 'men-001',
    name: 'Meningitis y meningoencefalitis',
    body: `La **meningitis bacteriana aguda** es una emergencia infecciosa con inflamación de las meninges; la **meningoencefalitis** añade compromiso del parénquima cerebral (frecuente en etiología viral, por ejemplo HSV). El cuadro clásico incluye fiebre, cefalea intensa, rigidez de nuca, fotofobia y alteración del estado mental; en ancianos e inmunodeprimidos puede ser **subclínica**. El signo de **Kernig** y **Brudzinski** apoyan el diagnóstico pero no lo excluyen si están ausentes.\n\nAnte sospecha, no retrasar antibiótico: hemocultivos y **punción lumbar** (o neuroimagen previa solo si hay focalidad neurológica, papiledema, inmunosupresión o crisis convulsiva reciente, según protocolo). Esquema empírico adulto habitual: **ceftriaxona** ± **vancomicina** (cobertura de neumococo resistente) ± **ampicilina** si > 50 años o inmunosupresión (Listeria). En sospecha de HSV: **aciclovir** IV. **Dexametasona** antes o con la primera dosis de antibiótico en meningitis neumocócica según guía institucional.\n\n**Enfermería**: aislamiento por gotas según protocolo, monitorizar GCS y signos de hipertensión endocraneana, control estricto de temperatura, registrar hora de primera dosis antibiótica, vigilar convulsiones y preparar material para PL en entorno estéril.`,
    relatedDrugs: [
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'van-001', label: 'Vancomicina' },
      { drugId: 'amp-001', label: 'Ampicilina' },
      { drugId: 'aci-001', label: 'Aciclovir' },
      { drugId: 'dxt-001', label: 'Dexametasona' },
    ],
    bibliography: [
      { citation: 'Infectious Diseases Society of America. Practice guidelines for bacterial meningitis.', url: 'https://www.idsociety.org/' },
      { citation: 'Sociedad Argentina de Infectología (SADI). Meningitis bacteriana.', url: 'https://www.sadi.org.ar/' },
      MS,
      { citation: 'European Society of Clinical Microbiology and Infectious Diseases. Meningitis guidelines.', url: 'https://www.escmid.org/' },
    ],
  },
  {
    id: 'cel-001',
    name: 'Celulitis e infección de piel y partes blandas',
    body: `La **celulitis** es infección aguda de la dermis y tejido subcutáneo, habitualmente por **Streptococcus pyogenes** y **Staphylococcus aureus** (incluido MRSA según contexto). Se presenta con eritema, calor, dolor, edema con bordes mal definidos y, a veces, fiebre y linfangitis. Diferenciar de **fascitis necrotizante** (dolor desproporcionado, crepitación, hipotensión, bullas hemorrágicas) que exige cirugía urgente.\n\nEl tratamiento empírico en adulto inmunocompetente sin riesgo de MRSA: **cefalosporina** o **amoxicilina-clavulánico** oral o IV según gravedad. Si factores de MRSA (uso previo de antibióticos, absceso, drogas IV, internación reciente): **clindamicina**, **vancomicina** o **trimethoprim-sulfametoxazol** según guía local. Marcar bordes del eritema para seguir evolución. Hospitalizar si celulitis facial/periorbitaria, inestabilidad hemodinámica, neutropenia o mala respuesta a 48–72 h.\n\n**Enfermería**: elevar el miembro afectado, control de temperatura y extensión de lesión, analgesia, higiene local sin frotar, documentar fotografía o trazado de bordes cada turno y educar sobre signos de empeoramiento (dolor creciente, vesículas, hipotensión).`,
    relatedDrugs: [
      { drugId: 'oxa-001', label: 'Oxacilina' },
      { drugId: 'cef-002', label: 'Cefazolina' },
      { drugId: 'amo-002', label: 'Amoxicilina/clavulánico' },
      { drugId: 'cli-001', label: 'Clindamicina' },
      { drugId: 'van-001', label: 'Vancomicina' },
      { drugId: 'tri-001', label: 'Trimetoprima/sulfametoxazol' },
    ],
    bibliography: [
      { citation: 'Infectious Diseases Society of America. Practice guidelines for skin and soft tissue infections.', url: 'https://www.idsociety.org/' },
      { citation: 'Sociedad Argentina de Infectología (SADI). Infecciones de piel y tejidos blandos.', url: 'https://www.sadi.org.ar/' },
      MS,
      { citation: 'World Health Organization. Skin and soft tissue infections — primary care.', url: 'https://www.who.int/' },
    ],
  },
  {
    id: 'cov-001',
    name: 'COVID-19 — enfermedad aguda',
    body: `La **enfermedad por SARS-CoV-2 (COVID-19)** es una infección respiratoria que en formas graves causa neumonía, síndrome de distrés respiratorio y disfunción multiorgánica. En guardia se estratifica con oximetría, frecuencia respiratoria, imagen pulmonar y marcadores (PCR, ferritina, D-dímero según protocolo). Factores de riesgo de gravedad: edad avanzada, obesidad, diabetes, EPOC, inmunosupresión y vacunación incompleta.\n\nEl manejo de **enfermedad moderada-grave con requerimiento de oxígeno** incluye **dexametasona** sistémica (beneficio en hipoxemia), posición prono en insuficiencia respiratoria, anticoagulación profiláctica o terapéutica según riesgo trombótico, y antibiótico solo si sobreinfección bacteriana sospechada. Valorar antivirales de acción directa según disponibilidad y ventana temporal institucional. Escalar a VNI o VM según criterios de UTI.\n\n**Enfermería**: SpO₂ continua, registro de FR y trabajo respiratorio, oxigenoterapia titulada, aislamiento por gotas y contacto, vigilancia de trombosis venosa, monitorizar glucemia en corticoterapia y apoyar vacunación y aislamiento domiciliario al alta según normativa vigente.`,
    relatedDrugs: [
      { drugId: 'dxt-001', label: 'Dexametasona' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'ose-001', label: 'Oseltamivir' },
    ],
    bibliography: [
      { citation: 'World Health Organization. Clinical management of COVID-19 — living guideline.', url: 'https://www.who.int/publications/guidelines' },
      { citation: 'Ministerio de Salud de la Nación Argentina. Protocolo COVID-19.', url: 'https://www.argentina.gob.ar/salud' },
      { citation: 'National Institutes of Health (NIH). COVID-19 Treatment Guidelines.', url: 'https://www.covid19treatmentguidelines.nih.gov/' },
      { citation: 'Infectious Diseases Society of America. Guidelines on the treatment and management of COVID-19.', url: 'https://www.idsociety.org/' },
    ],
  },
  {
    id: 'tra-001',
    name: 'Politraumatismo',
    body: `El **politraumatismo** es la lesión simultánea de múltiples regiones anatómicas, con riesgo de choque hemorrágico, TCE, lesión torácica, abdominal y de columna. En guardia se aplica el enfoque **ATLS / ABCDE**: vía aérea con protección cervical, ventilación, circulación y control de hemorragia, evaluación neurológica (GCS, pupilas) y exposición con prevención de hipotermia. La **reanimación con damage control** prioriza detener sangrado y restaurar perfusión.\n\nAcciones inmediatas: dos accesos venosos calibrosos, **cristaloides** y activación de banco de sangre; **ácido tranexámico** si indicado por protocolo (< 3 h); torniquetos o compresión en hemorragia externa; FAST ecográfico o TC **pan-scan** según estabilidad. Analgesia adecuada (opioides titulados, ketamina en contexto hemodinámico inestable según guía). Antibiótico profiláctico en heridas abiertas y fracturas expuestas. Contacto precoz con cirugía y UTI.\n\n**Enfermería**: monitorización continua, registro de GCS seriado, control de sangrado y débitos, mantener collarín hasta descartar lesión cervical, evitar hipotermia (mantas térmicas), balance hídrico estricto y acompañamiento del paciente en estudios imagenológicos.`,
    clinicalBox: {
      title: 'ABCDE — evaluación inicial',
      content: `**A** — Vía aérea + protección cervical\n**B** — Ventilación y oxigenación (SpO₂, FR, auscultación)\n**C** — Circulación: hemorragia, FC, TA, accesos, reanimación\n**D** — Deterioro neurológico: GCS, pupilas, glucosa\n**E** — Exposición completa con prevención de hipotermia\n\nReevaluar cada intervención. Registrar hora de ingreso, mecanismo y hallazgos seriados.`,
    },
    relatedDrugs: [
      { drugId: 'adr-001', label: 'Adrenalina (epinefrina)' },
      { drugId: 'nor-001', label: 'Noradrenalina' },
      { drugId: 'mor-001', label: 'Morfina' },
      { drugId: 'ket-001', label: 'Ketamina' },
      { drugId: 'man-001', label: 'Manitol' },
      { drugId: 'cef-002', label: 'Cefazolina' },
    ],
    bibliography: [
      { citation: 'American College of Surgeons. ATLS — Advanced Trauma Life Support.', url: 'https://www.facs.org/quality-programs/trauma/atls/' },
      { citation: 'Sociedad Argentina de Trauma y Emergencias (SATE). Consensos nacionales.', url: 'https://www.sate.org.ar/' },
      MS,
      { citation: 'World Health Organization. Emergency care of severe trauma.', url: 'https://www.who.int/' },
    ],
  },
  {
    id: 'cho-001',
    name: 'Colangitis aguda',
    body: `La **colangitis aguda** es infección del árbol biliar, casi siempre por obstrucción (coledocolitiasis, estenosis, tumor). La **tríada de Charcot** clásica integra fiebre, ictericia y dolor en hipocondrio derecho; la **pentada de Reynolds** añade hipotensión y alteración del estado mental y define colangitis grave. En guardia debe sospecharse en todo paciente ictérico con fiebre o escalofríos, especialmente con antecedente de colelitiasis o manipulación biliar previa.\n\nEl manejo combina **antibiótico de amplio espectro** (cobertura de Gram negativos entéricos y anaerobios según guía local) y **drenaje biliar urgente** en formas moderadas-graves (CPRE, drenaje percutáneo o quirúrgico según recursos). Reanimación con cristaloides si shock séptico. No retrasar antibiótico por esperar imagen si la sospecha es alta. Escalar a UTI en Reynolds o disfunción orgánica.\n\n**Enfermería**: monitorizar TA, FC, temperatura y nivel de conciencia, control de ictericia y coluria, NPO hasta definición, preparación para CPRE (consentimiento, coagulación, acceso venoso) y registro horario de antibióticos y diuresis.`,
    clinicalBox: {
      title: 'Gravedad — Tokyo Guidelines (resumen)',
      content: `**Leve (Grado I):** responde a fluidos y antibiótico; sin disfunción orgánica.\n**Moderada (Grado II):** leucocitosis/leucopenia, fiebre alta, edad > 75, hiperbilirrubinemia marcada o ITU asociada.\n**Grave (Grado III):** disfunción cardiovascular, neurológica, respiratoria, renal, hepática o hematológica.\n\n**Tríada de Charcot:** fiebre + ictericia + dolor HCD · **Reynolds:** Charcot + hipotensión + alteración mental → drenaje urgente.`,
    },
    relatedDrugs: [
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
      { drugId: 'mer-001', label: 'Meropenem' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'met-001', label: 'Metronidazol' },
      { drugId: 'cip-001', label: 'Ciprofloxacino' },
    ],
    bibliography: [
      { citation: 'Tokyo Guidelines. Management of acute cholangitis and cholecystitis.', url: 'https://www.jshbps.jp/en/guideline/' },
      { citation: 'Sociedad Argentina de Gastroenterología (SAGE). Vía biliar y colangitis.', url: 'https://www.sage.org.ar/' },
      MS,
      { citation: 'American Society for Gastrointestinal Endoscopy. Role of ERCP in biliary disease.', url: 'https://www.asge.org/' },
    ],
  },
  {
    id: 'end-001',
    name: 'Endocarditis infecciosa',
    body: `La **endocarditis infecciosa** es infección del endocardio, valvas o material protésico intracardíaco, con alta morbimortalidad si no se trata. Sospechar ante **fiebre prolongada** sin foco, soplo nuevo o cambiante, fenómenos embólicos (petequias, Janeway, Osler, infartos), antecedente de valvulopatía, prótesis valvular, uso de drogas IV o procedimientos dentales recientes en pacientes de riesgo.\n\nAntes de antibiótico: **tres hemocultivos** de distintos sitios y momentos (no retrasar inicio si inestabilidad). Esquema empírico según contexto: **vancomicina** + **ceftriaxona** o **gentamicina** (valva nativa); ajustar cuando haya antibiograma. ETE (ecocardiograma transesofágico) confirma vegetaciones y complicaciones. Indicaciones quirúrgicas: insuficiencia cardíaca refractaria, absceso, fístula, infección protésica temprana o embolia recurrente.\n\n**Enfermería**: hemocultivos seriados, control de temperatura, vigilancia de embolias (neurológicas, esplénicas, renales), educación sobre adherencia prolongada al antibiótico y profilaxis en procedimientos dentales futuros.`,
    clinicalBox: {
      title: 'Criterios de Duke — versión simplificada',
      content: `Diagnóstico probable con **2 mayores**, o **1 mayor + 3 menores**, o **5 menores**.\n\n**Mayores:** hemocultivos positivos típicos · evidencia ecocardiográfica (vegetación, absceso, dehiscencia protésica)\n\n**Menores:** predisposición (valvulopatía, IVDA) · fiebre > 38 °C · fenómenos vasculares (embolia, Janeway, hemorragias) · inmunológicos (Osler, Roth, factor reumatoide) · hemocultivo atípico · hallazgo ecocardiográfico menor\n\nRegistrar hora de extracción de cultivos y de primera dosis antibiótica.`,
    },
    relatedDrugs: [
      { drugId: 'van-001', label: 'Vancomicina' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'gen-001', label: 'Gentamicina' },
      { drugId: 'amp-001', label: 'Ampicilina' },
      { drugId: 'ami-001', label: 'Amikacina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Infective Endocarditis Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedad Argentina de Cardiología (SAC). Endocarditis infecciosa.', url: 'https://www.sac.org.ar/' },
      MS,
      { citation: 'American Heart Association. Infective endocarditis guideline.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'rhd-001',
    name: 'Rabdomiólisis',
    body: `La **rabdomiólisis** es necrosis muscular con liberación de mioglobina, CK y electrolitos al plasma. Causas frecuentes en guardia: **trauma**, caída prolongada, ejercicio extremo, convulsiones, fármacos (**estatinas**, cocaína), hipertermia maligna e infecciones. La tríada clásica es mialgia, debilidad y orina oscura; puede cursar sin dolor muscular. Complicaciones: **IRA por mioglobina**, hiperkalemia, hipocalcemia, coagulación intravascular.\n\nEl tratamiento prioritario es **reposición volémica agresiva** con cristaloides (metas de diuresis según protocolo, p. ej. 200–300 mL/h si tolera) para diluir mioglobina y prevenir necrosis tubular. Corregir **hiperkalemia** y acidosis según algoritmos. Suspender fármacos sospechosos. Indicaciones de diálisis: hiperkalemia refractaria, acidosis grave, sobrecarga hídrica o uremia. Monitorizar CK seriada (pico a 24–72 h).\n\n**Enfermería**: balance hídrico estricto, diuresis horaria, ECG si hiperkalemia, evitar nefrotóxicos (AINE, contrastes), reposo relativo y registro de orina (color, volumen). Valorar compartimental en miembros tensos.`,
    clinicalBox: {
      title: 'CK y alarmas en rabdomiólisis',
      content: `**CK** > 5× límite superior normal confirma daño muscular (valores muy altos son frecuentes).\n\n**Vigilar de inmediato:**\n· Diuresis **< 0,5 mL/kg/h** pese a fluidos\n· **K⁺** elevado · **pH** bajo · **Creatinina** en ascenso\n· Orina oscura / mioglobinuria positiva\n\nMeta habitual de reanimación: diuresis **200–300 mL/h** (ajustar a protocolo y comorbilidades cardíacas).`,
    },
    relatedDrugs: [
      { drugId: 'fur-001', label: 'Furosemida' },
      { drugId: 'bic-001', label: 'Bicarbonato de sodio' },
      { drugId: 'kcl-001', label: 'Cloruro de potasio' },
      { drugId: 'nsh-001', label: 'Cloruro de sodio hipertónico' },
      { drugId: 'man-001', label: 'Manitol' },
    ],
    bibliography: [
      { citation: 'Kidney Disease: Improving Global Outcomes (KDIGO). Acute kidney injury and rhabdomyolysis.', url: 'https://kdigo.org/guidelines/' },
      { citation: 'Sociedad Argentina de Nefrología (SAN). Injuria renal aguda.', url: 'https://www.san.org.ar/' },
      MS,
      { citation: 'American College of Emergency Physicians. Rhabdomyolysis clinical policy.', url: 'https://www.acep.org/' },
    ],
  },
];

function hasClinicalBox(item) {
  const boxes = item.clinicalBoxes ?? (item.clinicalBox ? [item.clinicalBox] : []);
  return boxes.some((box) => Boolean(box.content?.trim() || box.illustration));
}

function escapeCsv(value) {
  const text = String(value);
  return text.includes(',') || text.includes('"') ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeMasterList(items) {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const rows = sorted.map((item) => {
    const category = item.category || CATEGORIES[item.id] || 'general';
    const clinicalBox = hasClinicalBox(item) ? 'sí' : 'no';
    const status = item.status || 'publicado';
    return [item.id, escapeCsv(item.name), category, clinicalBox, status].join(',');
  });

  fs.writeFileSync(
    MASTER_LIST_PATH,
    `id,name,category,clinical_box,status\n${rows.join('\n')}\n`,
  );
}

function main() {
  fs.mkdirSync(ITEMS_DIR, { recursive: true });

  let written = 0;
  for (const item of PATHOLOGIES) {
    const filename = `${item.id}.json`;
    const out = {
      id: item.id,
      name: item.name,
      branch: 'atencion-sanitaria',
      version: '1.0',
      updatedAt: '2026-06-25',
      body: item.body,
      ...(item.clinicalBoxes
        ? { clinicalBoxes: item.clinicalBoxes }
        : item.clinicalBox
          ? { clinicalBox: item.clinicalBox }
          : {}),
      ...(item.relatedDrugs ? { relatedDrugs: item.relatedDrugs } : {}),
      bibliography: item.bibliography,
    };
    fs.writeFileSync(path.join(ITEMS_DIR, filename), `${JSON.stringify(out, null, 2)}\n`);
    written += 1;
    console.log(`  + ${filename}`);
  }

  console.log(`\n✓ ${written} patologías escritas en ${ITEMS_DIR}`);
  writeMasterList(PATHOLOGIES);
  console.log(`✓ master-list-pathologies.csv (${PATHOLOGIES.length} filas)`);
  console.log('  Ejecutá: npm run sync-pathologies');
}

main();
