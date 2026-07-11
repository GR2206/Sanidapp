#!/usr/bin/env node
/** Lote 2/4 — 10 patologías pt-BR desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/patologias/items');

const BIB_MS = { citation: 'Ministério da Saúde da Nação Argentina. Estratégias e diretrizes de atenção.', url: 'https://www.argentina.gob.ar/salud' };

const items = [
  {
    id: 'del-001', name: 'Delirium agudo', version: '1.0', updatedAt: '2026-06-25',
    body: 'O **delirium** é um transtorno neurocognitivo agudo com alteração da atenção e consciência, curso flutuante e início em horas ou dias. É muito frequente na emergência e na internação de idosos, e associa-se a maior mortalidade, permanência prolongada e deterioração funcional. Os **precipitantes** incluem infecção, hipoxemia, desidratação, retenção urinária, medicamentos (benzodiazepínicos, anticolinérgicos, opioides), dor não tratada, privação sensorial e mudança de ambiente.\n\nO diagnóstico é clínico (escalas **CAM** ou 4AT). O tratamento de primeira linha é **corrigir a causa** e aplicar medidas não farmacológicas: orientação temporal e espacial, óculos e aparelhos auditivos, mobilização precoce, sono noturno, acompanhante e evitar contenção. A medicação (haloperidol ou atípicos em doses baixas) reserva-se para agitação que coloca em risco o paciente ou a equipe, sempre por tempo limitado.\n\n**Enfermagem**: avaliação seriada do estado mental, prevenção de quedas, ambiente com luz natural, reorientação frequente e comunicação com a família. Revisar lista de medicação e retirar fármacos delirantes quando possível.',
    relatedDrugs: [
      { drugId: 'hal-001', label: 'Haloperidol' },
      { drugId: 'lor-001', label: 'Lorazepam' },
      { drugId: 'mid-001', label: 'Midazolam' },
      { drugId: 'dex-001', label: 'Dexmedetomidina' },
    ],
    bibliography: [
      { citation: 'National Institute for Health and Care Excellence. Delirium: prevention, diagnosis and management.', url: 'https://www.nice.org.uk/guidance/cg103' },
      { citation: 'Sociedade Argentina de Geriatria e Gerontologia (SAGG). Consensos sobre delirium.', url: 'https://www.sagg.org.ar/' },
      BIB_MS,
      { citation: 'American Geriatrics Society. Clinical Practice Guideline for Postoperative Delirium.', url: 'https://www.americangeriatrics.org/' },
    ],
  },
  {
    id: 'dia-001', name: 'Diabetes mellitus', version: '1.0', updatedAt: '2026-06-25',
    body: 'A diabetes mellitus é uma doença metabólica definida por hiperglicemia crônica. Na **diabetes tipo 1** há destruição das células beta pancreáticas e déficit absoluto de insulina, com início frequente na infância ou adolescência. A **diabetes tipo 2** combina resistência à insulina e secreção insuficiente; associa-se a idade avançada, sobrepeso, sedentarismo e antecedentes familiares. A **diabetes gestacional** surge durante a gestação e exige controle rigoroso pelo risco materno e fetal.\n\nEntre as afecções agudas destacam-se a **cetoacidose diabética** (mais habitual no tipo 1), o **estado hiperglicêmico hiperosmolar** (mais frequente no tipo 2) e a **hipoglicemia**, que pode dever-se a excesso de insulina, jejum prolongado ou atividade física não compensada. As complicações crônicas incluem retinopatia, nefropatia, neuropatia periférica, pé diabético e incremento do risco cardiovascular. Na avaliação de enfermagem convém registrar poliúria, polidipsia, perda de peso, feridas que cicatrizam mal e mudanças no nível de consciência.\n\nO **tratamento oportuno** combina educação, plano alimentar e atividade física. O tipo 1 requer insulina desde o diagnóstico. No tipo 2 inicia-se habitualmente com metformina e outros fármacos conforme meta glicêmica; a insulina indica-se quando não se alcança o controle. Na internação: monitorar glicemia capilar, administrar insulina basal e de correção conforme protocolo institucional, e iniciar de imediato o algoritmo de **CAD** ou **EHH** quando corresponder. Ante hipoglicemia sintomática, aplicar a regra do 15-15 (glicose oral) ou glucagon / dextrose IV conforme gravidade e protocolo do serviço.',
    relatedDrugs: [
      { drugId: 'ins-001', label: 'Insulina corriente' },
      { drugId: 'inp-001', label: 'Insulina NPH' },
      { drugId: 'glc-001', label: 'Glucagon' },
      { drugId: 'glu-001', label: 'Dextrose (glicose)' },
    ],
    bibliography: [
      { citation: 'American Diabetes Association. Standards of Care in Diabetes.', url: 'https://diabetesjournals.org/care/issue/47/Supplement_1' },
      { citation: 'Sociedade Argentina de Diabetes (SAD). Diretrizes e consensos nacionais.', url: 'https://www.sad.org.ar/' },
      BIB_MS,
      { citation: 'International Diabetes Federation. IDF Diabetes Atlas.', url: 'https://diabetesatlas.org/' },
    ],
  },
  {
    id: 'ecl-001', name: 'Eclâmpsia e pré-eclâmpsia grave', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **pré-eclâmpsia** é hipertensão arterial (≥ 140/90) com proteinúria ou disfunção de órgão-alvo após as 20 semanas de gestação. A **pré-eclâmpsia grave** inclui PA ≥ 160/110, trombocitopenia, alteração hepática, insuficiência renal, edema pulmonar, sintomas cerebrais ou visuais. A **eclâmpsia** é o surgimento de convulsões tônico-clônicas em contexto de pré-eclâmpsia e constitui emergência obstétrica.\n\nO manejo combina **sulfato de magnésio** IV (profilaxia e tratamento de convulsões), controle de PA com **labetalol, hidralazina ou nifedipino** conforme protocolo obstétrico, e **resolução da gestação** quando a mãe ou o feto estão em risco (timing conforme idade gestacional e critérios de obstetrícia). Monitorar reflexos patelares, diurese e frequência respiratória durante magnésio (risco de toxicidade). Na eclâmpsia ativa: estabilizar, proteger via aérea e encaminhamento imediato à maternidade / UTI.\n\n**Enfermagem**: PA a cada 15 min até controle, balanço hídrico rigoroso, monitorização fetal contínua se corresponder, preparar sulfato de magnésio com bomba de infusão e antídoto (gluconato de cálcio) disponível. Registrar convulsões, hora da última refeição e medicação anti-hipertensiva. Coordenar com obstetrícia e neonatologia.',
    relatedDrugs: [
      { drugId: 'mag-001', label: 'Sulfato de magnésio' },
      { drugId: 'lab-001', label: 'Labetalol' },
      { drugId: 'hdr-001', label: 'Hidralazina' },
      { drugId: 'cag-001', label: 'Gluconato de cálcio' },
    ],
    bibliography: [
      { citation: 'American College of Obstetricians and Gynecologists. Gestational Hypertension and Preeclampsia.', url: 'https://www.acog.org/clinical' },
      { citation: 'Sociedade Argentina de Ginecologia e Obstetrícia (SAGO). Diretrizes de hipertensão na gestação.', url: 'https://www.sago.org.ar/' },
      BIB_MS,
      { citation: 'International Society for the Study of Hypertension in Pregnancy. ISSHP guidelines.', url: 'https://www.glowm.com/' },
    ],
  },
  {
    id: 'end-001', name: 'Endocardite infecciosa', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **endocardite infecciosa** é infecção do endocárdio, valvas ou material protético intracardíaco, com alta morbimortalidade se não tratada. Suspeitar ante **febre prolongada** sem foco, sopro novo ou alterado, fenômenos embólicos (petéquias, Janeway, Osler, infartos), antecedente de valvulopatia, prótese valvar, uso de drogas IV ou procedimentos dentários recentes em pacientes de risco.\n\nAntes do antibiótico: **três hemoculturas** de distintos sítios e momentos (não retardar início se instabilidade). Esquema empírico conforme contexto: **vancomicina** + **ceftriaxona** ou **gentamicina** (valva nativa); ajustar quando houver antibiograma. ETE (ecocardiograma transesofágico) confirma vegetações e complicações. Indicações cirúrgicas: insuficiência cardíaca refratária, abscesso, fístula, infecção protética precoce ou embolia recorrente.\n\n**Enfermagem**: hemoculturas seriadas, controle de temperatura, vigilância de embolias (neurológicas, esplênicas, renais), orientação sobre adesão prolongada ao antibiótico e profilaxia em procedimentos dentários futuros.',
    clinicalBox: {
      title: 'Critérios de Duke — versão simplificada',
      content: 'Diagnóstico provável com **2 maiores**, ou **1 maior + 3 menores**, ou **5 menores**.\n\n**Maiores:** hemoculturas positivas típicas · evidência ecocardiográfica (vegetação, abscesso, deiscência protética)\n\n**Menores:** predisposição (valvulopatia, uso de drogas IV) · febre > 38 °C · fenômenos vasculares (embolia, Janeway, hemorragias) · imunológicos (Osler, Roth, fator reumatoide) · hemocultura atípica · achado ecocardiográfico menor\n\nRegistrar hora da coleta de culturas e da primeira dose de antibiótico.',
    },
    relatedDrugs: [
      { drugId: 'van-001', label: 'Vancomicina' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'gen-001', label: 'Gentamicina' },
      { drugId: 'amp-001', label: 'Ampicilina' },
      { drugId: 'ami-001', label: 'Amicacina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Infective Endocarditis Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedade Argentina de Cardiologia (SAC). Endocardite infecciosa.', url: 'https://www.sac.org.ar/' },
      BIB_MS,
      { citation: 'American Heart Association. Infective endocarditis guideline.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'epoc-001', name: 'DPOC — exacerbação aguda', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **doença pulmonar obstrutiva crônica (DPOC)** caracteriza-se por limitação crônica ao fluxo aéreo. A **exacerbação aguda** é uma piora da dispneia, tosse ou expectoração que supera a variação basal do paciente e costuma dever-se a infecção respiratória, contaminação ambiental ou não adesão terapêutica. Na avaliação inicial registra-se frequência respiratória, uso de musculatura acessória, coloração, nível de consciência e **gasometria** se houver sinais de insuficiência respiratória.\n\nO manejo inclui **broncodilatadores** de ação curta (salbutamol ± ipratrópio) nebulizados ou com inalador de dose medida com espaçador, **corticoides sistêmicos** (prednisona oral ou metilprednisolona IV conforme gravidade), antibiótico se houver aumento da purulência do escarro ou necessidade de ventilação mecânica, e **oxigênio titulado** (meta SpO₂ 88–92 % em DPOC conhecida para evitar hipoxemia iatrogênica). Avaliar VNI em acidose respiratória com pH 7,25–7,35 e trabalho respiratório elevado.\n\nA **enfermagem** monitoriza SpO₂ contínua, administra nebulizações, auxilia com técnica inalatória, quantifica diurese e vigia sonolência por hipercapnia. Posição semisentada, hidratação se não houver contraindicação e orientação sobre cessação do tabagismo e plano de ação ante novas exacerbações.',
    relatedDrugs: [
      { drugId: 'sal-001', label: 'Salbutamol' },
      { drugId: 'ipr-001', label: 'Ipratrópio' },
      { drugId: 'mep-001', label: 'Metilprednisolona' },
      { drugId: 'dxt-001', label: 'Dexametasona' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
    ],
    bibliography: [
      { citation: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global Strategy Report.', url: 'https://goldcopd.org/' },
      { citation: 'Associação Argentina de Medicina Respiratória (AAMR). Diretrizes nacionais.', url: 'https://www.aamr.org.ar/' },
      BIB_MS,
      { citation: 'National Institute for Health and Care Excellence (NICE). COPD guideline.', url: 'https://www.nice.org.uk/guidance/ng115' },
    ],
  },
  {
    id: 'fa-001', name: 'Fibrilação atrial (FA)', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **fibrilação atrial** é a arritmia sustentada mais frequente na prática clínica, caracterizada por ativação atrial desorganizada e resposta ventricular irregular. Na emergência pode debutar como palpitações, dispneia, dor torácica, síncope ou achado incidental. Diferenciar **FA de novo**, FA conhecida descompensada e flutter atrial. Sempre avaliar estabilidade hemodinâmica: em paciente instável (hipotensão, edema agudo de pulmão, isquemia miocárdica aguda) procede **cardioversão elétrica urgente**.\n\nEm paciente estável busca-se causa reversível (sepse, hipocalemia, hipertireoidismo, álcool, TEP). O controle da frequência (betabloqueadores, bloqueadores de cálcio não dihidropiridínicos, digoxina conforme contexto) ou ritmo (cardioversão farmacológica ou elétrica programada) depende do tempo de evolução e comorbidades. A **anticoagulação** decide-se com escalas CHA₂DS₂-VASc e HAS-BLED; em FA > 48 h ou desconhecida, anticoagular antes da cardioversão salvo emergência.\n\n**Enfermagem**: monitor cardíaco contínuo, registro de FC e PA, administração de antiarrítmicos conforme protocolo, vigilância de bradicardia ou QT prolongado, e orientação sobre adesão à anticoagulação e acompanhamento ambulatorial.',
    clinicalBoxes: [
      {
        title: 'CHA₂DS₂-VASc — risco tromboembólico',
        content: 'Um ponto por cada item (máx. 9 em mulher, 8 em homem):\n**C** — IC ou disfunção VI · **H** — HAS · **A₂** — idade ≥ 75 (2 pts) · **D** — diabetes · **S₂** — AVC/AIT/TE prévio (2 pts) · **V** — doença vascular · **A** — idade 65–74 · **Sc** — sexo feminino.\n\n**0 (homem) / 1 (mulher):** sem anticoagulação. **1 (homem):** considerar. **≥ 2:** anticoagulação recomendada salvo contraindicação.',
      },
      {
        title: 'HAS-BLED — risco de sangramento',
        content: 'Um ponto por item: **H** — HAS não controlada · **A** — renal/hepática anormal · **S** — AVC prévio · **B** — sangramento prévio ou predisposição · **L** — INR lábil (ACO) · **E** — idade > 65 · **D** — fármacos (AAS, AINE) ou álcool.\n\n≥ 3: alto risco de sangramento — não contraindica anticoagulação, mas exige vigilância e correção de fatores modificáveis.',
      },
    ],
    relatedDrugs: [
      { drugId: 'amd-001', label: 'Amiodarona' },
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'war-001', label: 'Varfarina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Atrial Fibrillation Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedade Argentina de Cardiologia. Consenso de arritmias.', url: 'https://www.sac.org.ar/' },
      BIB_MS,
      { citation: 'American Heart Association / ACC. AF management guideline.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'hda-001', name: 'Hemorragia digestiva alta (HDA)', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **hemorragia digestiva alta** é o sangramento proximal ao ligamento de Treitz, habitualmente por **úlcera péptica**, varizes esofagogástricas, gastropatia erosiva, Mallory-Weiss ou malignidade. Manifesta-se por hematêmese, melena ou, em sangramento maciço, hematoquezia. A gravidade estima-se com escalas como **Glasgow-Blatchford** ou Rockall; sinais de instabilidade (hipotensão, taquicardia, lipotimia, Hb < 7 g/dL) exigem reanimação agressiva.\n\nO manejo inicial: duas vias venosas de grande calibre, cristaloides e concentrados de hemácias conforme protocolo transfusional, **inibidor de bomba de prótons** IV (pantoprazol), e na suspeita de varizes: vasoconstritor esplâncnico (octreotida) mais antibiótico profilático e contato urgente com endoscopia. Evitar AAS/AINEs; reconsiderar anticoagulantes conforme balanço risco-benefício. Intubar para proteção de via aérea se hematêmese ativa com alteração do nível de consciência.\n\n**Enfermagem**: jejum oral, sonda nasogástrica somente se o protocolo indicar, monitorização contínua, tipagem e reserva, registro de episódios hemáticos e vigilância de ressangramento. Preparar o paciente e familiares para endoscopia urgente.',
    clinicalBox: {
      title: 'Glasgow-Blatchford — risco em HDA',
      content: 'Escore 0–23 (maior = mais risco de intervenção). Itens principais:\n**Ureia** > 6,5 mmol/L (19 mg/dL) · **Hb** baixa (conforme sexo) · **PA sistólica** < 90–110 · **FC** ≥ 100\n**Melena** · **Síncope** · **Hepatopatia** · **IC** · **Varizes** esofágicas conhecidas\n\n**0:** baixo risco — avaliar alta precoce após observação · **≥ 1:** internação e endoscopia conforme protocolo · Escores altos: transfusão e UTI.',
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
      { citation: 'Sociedade Argentina de Gastroenterologia (SAGE). Diretrizes de HDA.', url: 'https://www.sage.org.ar/' },
      BIB_MS,
      { citation: 'American College of Gastroenterology. Upper GI bleeding guideline.', url: 'https://gi.org/guideline/' },
    ],
  },
  {
    id: 'hip-001', name: 'Hipoglicemia grave', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **hipoglicemia** é glicemia < 70 mg/dL (3,9 mmol/L); é **grave** quando requer ajuda de terceiros para seu tratamento ou apresenta alteração do nível de consciência ou convulsões. Na emergência é frequente em diabéticos com excesso de insulina ou hipoglicemiantes orais, jejum prolongado, álcool, sepse ou insuficiência renal. Também pode simular AVC ou crise convulsiva.\n\nO tratamento imediato em paciente consciente: **15–20 g de glicose oral** (sachês, suco, mel) e repetir glicemia aos 15 min (regra do 15-15). Se não tolera via oral ou está inconsciente: **glicose IV** (dextrose 10 % ou 25–50 % conforme protocolo) ou **glucagon IM/SC** se não houver acesso venoso. Após recuperação, refeição com carboidratos complexos e revisão do esquema insulínico. Investigar causa (dose, refeição omitida, doença intercorrente).\n\n**Enfermagem**: glicemia capilar na admissão em todo paciente com alteração do sensorium, dupla verificação de dose de dextrose IV, monitorização pós-tratamento (rebote ou hipoglicemia recorrente) e orientação sobre prevenção e portar identificação de diabetes.',
    clinicalBox: {
      title: 'Regra do 15-15',
      content: 'Se o paciente está **consciente e pode deglutir**:\n1. Administrar **15–20 g de glicose** oral (ex.: 4 sachês de glicose ou 150 mL de suco).\n2. Repetir glicemia aos **15 minutos**.\n3. Se persistir < 70 mg/dL, repetir o ciclo.\n4. Após normalizar, oferecer **lanche** com carboidrato complexo.\n\nSe está **inconsciente**: glicose IV ou glucagon IM — não administrar nada por via oral.',
    },
    relatedDrugs: [
      { drugId: 'glu-001', label: 'Dextrose (glicose)' },
      { drugId: 'glc-001', label: 'Glucagon' },
      { drugId: 'ins-001', label: 'Insulina corriente' },
    ],
    bibliography: [
      { citation: 'American Diabetes Association. Standards of Care — hypoglycemia.', url: 'https://diabetesjournals.org/care/' },
      { citation: 'Sociedade Argentina de Diabetes (SAD). Manejo de hipoglicemia.', url: 'https://www.sad.org.ar/' },
      BIB_MS,
      { citation: 'International Hypoglycaemia Study Group. Definitions and reporting.', url: 'https://ihsgonline.com/' },
    ],
  },
  {
    id: 'hta-001', name: 'Hipertensão arterial (HAS)', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **hipertensão arterial** é uma elevação persistente da pressão arterial (PA) que incrementa o risco cardiovascular, renal e cerebrovascular. Na emergência costuma apresentar-se como **crise hipertensiva** (PA muito elevada com ou sem lesão de órgão-alvo) ou como comorbidade de outra patologia aguda. É fundamental medir PA em ambos os braços com técnica correta, confirmar com repetição e buscar sinais de **emergência hipertensiva** (encefalopatia, edema agudo de pulmão, síndrome coronariana aguda, dissecção aórtica, eclâmpsia, IRA aguda).\n\nO **tratamento oportuno** depende do contexto: na emergência hipertensiva inicia-se anti-hipertensivo IV com meta gradual (evitar queda > 25 % da PA média na primeira hora salvo exceções como dissecção aórtica). Na **urgência hipertensiva** (PA elevada sem lesão aguda de órgão) prefere-se reinstaurar ou ajustar tratamento oral e observação. Fármacos frequentes na emergência: labetalol, hidralazina, nitroglicerina ou nitroprussiato conforme cenário e disponibilidade institucional.\n\nEm **enfermagem**: monitorar PA seriada, frequência cardíaca, diurese e nível de consciência; registrar hora de cada dose IV; vigiar hipotensão ortostática ao iniciar ou intensificar tratamento. Orientar sobre adesão, restrição de sódio, acompanhamento ambulatorial e sinais de alerta (cefaleia intensa, visão turva, dor torácica, dispneia).',
    relatedDrugs: [
      { drugId: 'lab-001', label: 'Labetalol' },
      { drugId: 'hdr-001', label: 'Hidralazina' },
      { drugId: 'ngl-001', label: 'Nitroglicerina' },
      { drugId: 'nip-001', label: 'Nitroprussiato' },
    ],
    bibliography: [
      { citation: 'Sociedade Argentina de Hipertensão Arterial (SAHA). Diretrizes e consensos.', url: 'https://www.saha.org.ar/' },
      { citation: 'European Society of Cardiology / ESH. Guidelines for the management of arterial hypertension.', url: 'https://www.escardio.org/Guidelines' },
      BIB_MS,
      { citation: 'American Heart Association. Hypertension clinical guidelines.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'iam-001', name: 'Infarto agudo do miocárdio (IAM)', version: '1.0', updatedAt: '2026-06-25',
    body: 'O **infarto agudo do miocárdio (IAM)** é necrose miocárdica por isquemia prolongada, dentro do espectro da síndrome coronariana aguda. Classifica-se em **IAM com supra de ST** (elevação do ST no ECG) e **IAM sem supra de ST**. A dor típica é opressiva retroesternal > 20 minutos, com diaforese, náuseas, irradiação para braço esquerdo ou mandíbula; em diabéticos, idosos e mulheres pode ser **atípica** (dispneia, astenia, síncope).\n\nA prioridade na emergência é **ECG em menos de 10 minutos**. Ante **IAM com supra de ST** ou equivalentes (bloqueio de ramo esquerdo novo, imagem de onda hiperaguda): ativar via de **reperfusão urgente** (angioplastia primária ou trombólise conforme tempos e recursos). Tratamento inicial: **ácido acetilsalicílico**, anticoagulação, nitroglicerina se PA permitir, analgesia e betabloqueador conforme protocolo. Monitorar arritmias ventriculares nas primeiras 24 h.\n\n**Enfermagem**: monitor cardíaco contínuo, acesso venoso, oxigênio somente se hipoxemia, registro seriado de dor (EVA) e preparação para cateterismo. Documentar hora de início dos sintomas e hora do primeiro ECG. Jejum oral até definição.',
    clinicalBoxes: [
      {
        title: 'Eletrocardiograma — comparação visual',
        illustration: 'ecg-sinus-vs-stemi',
        content: '**Critério geral de IAM com supra de ST:** elevação do ponto J ≥ **1 mm** em pelo menos **2 derivações contíguas** (critérios específicos em V2-V3 conforme sexo). Comparar sempre com um traçado prévio se existir.\n\nAnte achado compatível: ativar código IAM, AAS e anticoagulação conforme protocolo, e não retardar reperfusão.',
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
      { citation: 'Sociedade Argentina de Cardiologia (SAC). Guia de SCA.', url: 'https://www.sac.org.ar/' },
      BIB_MS,
      { citation: 'American Heart Association. Acute Myocardial Infarction guidelines.', url: 'https://www.heart.org/' },
    ],
  },
];

for (const item of items) {
  const out = {
    id: item.id,
    name: item.name,
    branch: 'atencion-sanitaria',
    version: item.version,
    updatedAt: item.updatedAt,
    translationReviewed: true,
    body: item.body,
    bibliography: item.bibliography,
  };
  if (item.clinicalBox) out.clinicalBox = item.clinicalBox;
  if (item.clinicalBoxes) out.clinicalBoxes = item.clinicalBoxes;
  if (item.relatedDrugs) out.relatedDrugs = item.relatedDrugs;
  fs.writeFileSync(path.join(OUT, `${item.id}.json`), `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log(`✓ ${item.id}`);
}

console.log(`\nLote 2 patologías: ${items.length} monografías pt-BR`);
