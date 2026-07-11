#!/usr/bin/env node
/** Lote 1/4 — 10 patologías pt-BR desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/patologias/items');

const BIB_MS = { citation: 'Ministério da Saúde da Nação Argentina. Estratégias e diretrizes de atenção.', url: 'https://www.argentina.gob.ar/salud' };

const items = [
  {
    id: 'abd-001', name: 'Abdome agudo', version: '1.0', updatedAt: '2026-06-25',
    body: 'O **abdome agudo** é uma síndrome de dor abdominal de início recente que pode requerer intervenção cirúrgica ou tratamento urgente. As causas frequentes na emergência incluem apendicite, colecistite, pancreatite, obstrução intestinal, diverticulite, isquemia mesentérica, perfuração de víscera oca e patologia ginecológica (gravidez ectópica, torção anexial). A anamnese explora início, localização, irradiação, febre, vômitos, ritmo intestinal e antecedentes cirúrgicos.\n\nO exame avalia defesa, rebote, peritonismo, sinal de Murphy, massa palpável e hérnias. Exames conforme suspeita: laboratório (hemograma, amilase/lipase, β-hCG em mulher em idade fértil), ultrassonografia abdominal e TC com contraste quando indicada. Manejo inicial: jejum oral, acesso venoso, analgesia (sem retardar o diagnóstico), antieméticos e antibiótico se peritonite ou infecção. Consulta cirúrgica precoce ante peritonismo, instabilidade hemodinâmica ou suspeita de isquemia.\n\n**Enfermagem**: registrar evolução da dor em escala EVA seriada, controle de sinais vitais, preparar o paciente para exames de imagem e cirurgia, manter jejum oral, sonda nasogástrica somente se indicada, e vigilância de distensão abdominal e evacuações.',
    relatedDrugs: [
      { drugId: 'mor-001', label: 'Morfina' },
      { drugId: 'ond-001', label: 'Ondansetrona' },
      { drugId: 'met-001', label: 'Metronidazol' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
    ],
    bibliography: [
      { citation: 'World Society of Emergency Surgery. WSES guidelines for acute abdomen.', url: 'https://www.wses.org.uk/' },
      { citation: 'Sociedade Argentina de Cirurgia (SAC). Consensos de abdome agudo.', url: 'https://www.cirugia.org.ar/' },
      BIB_MS,
      { citation: 'American College of Surgeons. Acute care surgery resources.', url: 'https://www.facs.org/' },
    ],
  },
  {
    id: 'acv-001', name: 'Acidente vascular cerebral (AVC)', version: '1.0', updatedAt: '2026-06-25',
    body: 'O **acidente vascular cerebral** é uma síndrome neurológica focal de início abrupto por alteração da circulação cerebral (isquemia ou hemorragia). Na emergência deve distinguir-se dos **mimics** (crise convulsiva, hipoglicemia, síncope, enxaqueca com aura prolongada). A anamnese orienta o tempo de evolução, anticoagulação prévia e foco cardíaco ou carotídeo. O exame neurológico documenta **NIHSS** ou escala institucional, **Glasgow**, pupilas e sinais de hipertensão intracraniana.\n\nNo **AVC isquêmico agudo** a prioridade é a reperfusão dentro da janela terapêutica (trombólise IV e/ou trombectomia conforme protocolo local). A pressão arterial é manejada conforme critério de trombólise: evitar quedas bruscas salvo emergência hipertensiva. Na **hemorragia intracraniana** reverte-se anticoagulação se corresponder, controla-se PA e encaminha-se à neurocirurgia quando há indicação.\n\nNa **recepção do AVC agudo** **ativa-se o protocolo STROKE**, que consiste em colocar **duas vias periféricas** e solicitar **RM (ressonância magnética)** para obter as imagens dentro do **período janela**. A **enfermagem** assegura via aérea, oxigenoterapia se SpO₂ < 94 %, monitorização contínua e registro horário do nível de consciência e NIHSS; glicemia capilar, ionograma e coagulação conforme protocolo. Manter jejum oral até definir disfagia. Elevar cabeceira 30° se não houver contraindicação. Coordenar código AVC / teleictus institucional. Orientar a família sobre sinais de alerta e continuidade da reabilitação.',
    clinicalBoxes: [
      {
        title: 'Escala de Coma de Glasgow (GCS)',
        content: '**Abertura ocular (E)**\n4 Espontânea · 3 À voz · 2 À dor · 1 Nenhuma\n\n**Resposta verbal (V)**\n5 Orientada · 4 Confusa · 3 Palavras inapropriadas · 2 Sons incompreensíveis · 1 Nenhuma\n\n**Resposta motora (M)**\n6 Obedece ordens · 5 Localiza dor · 4 Retirada à dor · 3 Flexão anormal · 2 Extensão · 1 Nenhuma\n\n**Total E + V + M: 3–15.** GCS ≤ 8: avaliar proteção de via aérea. Registrar série, pupilas e lateralidade neurológica.',
      },
      {
        title: 'NIHSS — pontos-chave (resumo)',
        content: 'Escala 0–42 para quantificar déficit neurológico no AVC agudo. Registrar na admissão e de forma seriada conforme protocolo.\n\n**Domínios principais:** nível de consciência · olhar conjugado · campos visuais · paralisia facial · motricidade de braços e pernas · ataxia de membros · sensibilidade · linguagem · disartria · extinção/negligência.\n\n**Referência orientativa:** 0 = sem sintomas · 1–4 = AVC leve · 5–15 = moderado · 16–20 = moderado-grave · > 20 = grave. Documentar hora de início dos sintomas e escore para decisão de reperfusão.',
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
      { citation: 'Sociedade Argentina de Neurologia Vascular (SANV). Recomendações nacionais.', url: 'https://www.sanv.org.ar/' },
      BIB_MS,
      { citation: 'World Stroke Organization. Global stroke guidelines.', url: 'https://www.world-stroke.org/' },
    ],
  },
  {
    id: 'ana-001', name: 'Anafilaxia', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **anafilaxia** é uma reação sistêmica grave de hipersensibilidade, potencialmente fatal, com início rápido após exposição a um alérgeno (alimentos, medicamentos, venenos de himenópteros, látex). O diagnóstico é clínico: comprometimento cutâneo-mucoso (urticária, angioedema) mais acometimento respiratório (estridor, sibilos, dispneia), cardiovascular (hipotensão, síncope) ou gastrointestinal grave, após exposição provável.\n\nO tratamento imediato é **adrenalina intramuscular** (face anterolateral da coxa, dose conforme peso; repetir a cada 5–15 min se persistir o quadro). Colocar em decúbito dorsal com membros elevados salvo dispneia grave (semisentado). Oxigênio, expansão com cristaloides se hipotensão, e **anti-histamínico H1 + H2** e corticoide como coadjuvantes (não substituem adrenalina). Retirar o desencadeante se for medicamento IV. Observação mínima 4–6 h (risco de reação bifásica); alta com autoinjetor de adrenalina se corresponder.\n\n**Enfermagem**: identificar e retirar alérgeno, acionar ajuda, registrar hora exata da adrenalina, monitorar PA, FC e SpO₂, preparar segunda dose e via aérea avançada. Documentar alérgeno e alerta no prontuário.',
    clinicalBox: {
      title: 'Adrenalina IM — dose orientativa',
      content: 'Via **intramuscular** (coxa anterolateral), concentração 1:1000 (1 mg/mL):\n**Adulto:** 0,3–0,5 mg IM (0,3–0,5 mL)\n**Criança:** 0,01 mg/kg IM (máx. 0,3 mg)\n\nRepetir a cada **5–15 min** se não houver melhora clínica. Em parada cardiorrespiratória: adrenalina IV conforme ACLS / protocolo pediátrico institucional.',
    },
    relatedDrugs: [
      { drugId: 'adr-001', label: 'Adrenalina (epinefrina)' },
      { drugId: 'hdc-001', label: 'Hidrocortisona' },
      { drugId: 'dxt-001', label: 'Dexametasona' },
      { drugId: 'sal-001', label: 'Salbutamol' },
    ],
    bibliography: [
      { citation: 'World Allergy Organization. Anaphylaxis guidelines.', url: 'https://www.worldallergy.org/' },
      { citation: 'Sociedade Argentina de Alergia e Imunologia (SAAI). Consenso de anafilaxia.', url: 'https://www.saai.org.ar/' },
      BIB_MS,
      { citation: 'National Institute for Allergy and Infectious Diseases. Anaphylaxis guidelines.', url: 'https://www.niaid.nih.gov/' },
    ],
  },
  {
    id: 'ang-001', name: 'Angina instável e IAM sem supra de ST', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **angina instável** e o **IAM sem elevação do ST (IAMSSST)** formam o polo da síndrome coronariana aguda sem elevação do ST. Caracterizam-se por dor torácica em repouso ou prolongada, angina crescente ou nova, ou elevação de **troponina** com ECG sem critérios de IAM com supra de ST. O risco é estratificado com escalas (HEART, GRACE, TIMI) para decidir observação, internação em unidade coronariana ou estratégia invasiva precoce.\n\nO tratamento inclui **dupla antiagregação** (AAS + inibidor P2Y12 conforme protocolo), **anticoagulação**, betabloqueador, estatina de alta intensidade e nitratos para sintomas. A **coronariografia** é indicada em pacientes de alto risco ou com instabilidade hemodinâmica. Diferenciar de outras causas de dor torácica (dissecção aórtica, TEP, pericardite) antes de anticoagular amplamente.\n\n**Enfermagem**: ECG e troponina seriados conforme protocolo, monitorização contínua, controle de dor e PA, registro de episódios anginosos e orientação sobre sinais de alerta na alta.',
    relatedDrugs: [
      { drugId: 'ngl-001', label: 'Nitroglicerina' },
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'mor-001', label: 'Morfina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Non-ST-elevation acute coronary syndromes.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedade Argentina de Cardiologia (SAC). SCA sem elevação do ST.', url: 'https://www.sac.org.ar/' },
      BIB_MS,
      { citation: 'American Heart Association. NSTE-ACS guideline.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'asm-001', name: 'Asma — crise aguda', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **crise asmática aguda** é a piora rápida de sintomas respiratórios com obstrução reversível das vias aéreas. Na emergência estratifica-se a gravidade por frequência respiratória, uso de musculatura acessória, capacidade de falar em frases completas, sibilos, SpO₂ e pico de fluxo expiratório se o paciente puder cooperar. A **asma quase fatal** cursa com silêncio auscultatório, bradicardia, cianose ou alteração do sensorium.\n\nO tratamento de primeira linha é **salbutamol** de ação curta (nebulização ou inalador com espaçador, doses repetidas a cada 20 min em crise moderada-grave) mais **brometo de ipratrópio** em episódios graves. **Corticoides sistêmicos** (prednisona oral ou metilprednisolona / dexametasona IV) indicam-se precocemente. Oxigênio para manter SpO₂ ≥ 94 %. Avaliar sulfato de magnésio IV em crise refratária e consulta à UTI se não houver resposta ou houver acidose respiratória.\n\n**Enfermagem**: posição semisentada, monitorar SpO₂ e FR continuamente, registrar hora e resposta a cada nebulização, preparar acesso venoso em crise moderada-grave e vigiar efeitos adversos de beta-2 (tremor, taquicardia). Revisar técnica inalatória e plano de ação escrito na alta.',
    relatedDrugs: [
      { drugId: 'sal-001', label: 'Salbutamol' },
      { drugId: 'ipr-001', label: 'Ipratrópio' },
      { drugId: 'mep-001', label: 'Metilprednisolona' },
      { drugId: 'dxt-001', label: 'Dexametasona' },
      { drugId: 'mag-001', label: 'Sulfato de magnésio' },
    ],
    bibliography: [
      { citation: 'Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention.', url: 'https://ginasthma.org/' },
      { citation: 'Associação Argentina de Medicina Respiratória (AAMR). Diretrizes de asma.', url: 'https://www.aamr.org.ar/' },
      BIB_MS,
      { citation: 'National Asthma Education and Prevention Program (NAEPP). Expert Panel Report.', url: 'https://www.nhlbi.nih.gov/health-topics/asthma' },
    ],
  },
  {
    id: 'cad-001', name: 'Cetoacidose diabética (CAD)', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **cetoacidose diabética** é uma emergência metabólica definida por hiperglicemia, acidose metabólica com ânion gap elevado e cetonemia/cetonúria. Predomina no **diabetes tipo 1**, mas pode aparecer no tipo 2 sob estresse grave. Os desencadeantes habituais são infecção intercorrente, omissão de insulina, IAM e medicamentos (corticoides). O quadro inclui poliúria, polidipsia, náuseas, vômitos, dor abdominal, respiração de Kussmaul e alteração do sensorium.\n\nO tratamento segue o algoritmo institucional: **reposição de volume** com cristaloides, **insulina corriente IV** em infusão contínua após dose inicial, correção de **potássio** (não iniciar insulina se K⁺ < 3,3 mEq/L), e busca do fator precipitante. O bicarbonato só se considera em acidose grave com pH < 6,9 conforme diretriz. Monitorizar glicemia horária, gasometria, eletrólitos e estado neurológico. Transição para insulina subcutânea quando a cetonemia se resolve e o paciente tolera via oral.\n\n**Enfermagem**: balanço hídrico rigoroso, registro de vômitos e diurese, glicemia capilar seriada, bomba de insulina com dupla verificação de velocidade, e orientação sobre prevenção (doença intercorrente, ajuste de dose, não suspender insulina basal).',
    relatedDrugs: [
      { drugId: 'ins-001', label: 'Insulina corriente' },
      { drugId: 'inp-001', label: 'Insulina NPH' },
      { drugId: 'kcl-001', label: 'Cloreto de potássio' },
      { drugId: 'bic-001', label: 'Bicarbonato de sódio' },
      { drugId: 'glu-001', label: 'Dextrose (glicose)' },
    ],
    bibliography: [
      { citation: 'American Diabetes Association. Standards of Care — hyperglycemic crises.', url: 'https://diabetesjournals.org/care/' },
      { citation: 'Sociedade Argentina de Diabetes (SAD). Consenso de CAD.', url: 'https://www.sad.org.ar/' },
      BIB_MS,
      { citation: 'Joint British Diabetes Societies. DKA management guideline.', url: 'https://www.diabetes.org.uk/' },
    ],
  },
  {
    id: 'cel-001', name: 'Celulite e infecção de pele e partes moles', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **celulite** é infecção aguda da derme e tecido subcutâneo, habitualmente por **Streptococcus pyogenes** e **Staphylococcus aureus** (incluído MRSA conforme contexto). Apresenta-se com eritema, calor, dor, edema com bordas mal definidas e, às vezes, febre e linfangite. Diferenciar de **fasciíte necrosante** (dor desproporcional, crepitação, hipotensão, bolhas hemorrágicas) que exige cirurgia urgente.\n\nO tratamento empírico em adulto imunocompetente sem risco de MRSA: **cefalosporina** ou **amoxicilina-clavulanato** oral ou IV conforme gravidade. Se fatores de MRSA (uso prévio de antibióticos, abscesso, drogas IV, internação recente): **clindamicina**, **vancomicina** ou **trimetoprima-sulfametoxazol** conforme diretriz local. Marcar bordas do eritema para seguir evolução. Internar se celulite facial/periorbitária, instabilidade hemodinâmica, neutropenia ou má resposta a 48–72 h.\n\n**Enfermagem**: elevar o membro afetado, controle de temperatura e extensão da lesão, analgesia, higiene local sem friccionar, documentar fotografia ou traçado de bordas a cada turno e orientar sobre sinais de piora (dor crescente, vesículas, hipotensão).',
    relatedDrugs: [
      { drugId: 'oxa-001', label: 'Oxacilina' },
      { drugId: 'cef-002', label: 'Cefazolina' },
      { drugId: 'amo-002', label: 'Amoxicilina/clavulanato' },
      { drugId: 'cli-001', label: 'Clindamicina' },
      { drugId: 'van-001', label: 'Vancomicina' },
      { drugId: 'tri-001', label: 'Trimetoprima/sulfametoxazol' },
    ],
    bibliography: [
      { citation: 'Infectious Diseases Society of America. Practice guidelines for skin and soft tissue infections.', url: 'https://www.idsociety.org/' },
      { citation: 'Sociedade Argentina de Infectologia (SADI). Infecções de pele e tecidos moles.', url: 'https://www.sadi.org.ar/' },
      BIB_MS,
      { citation: 'World Health Organization. Skin and soft tissue infections — primary care.', url: 'https://www.who.int/' },
    ],
  },
  {
    id: 'cho-001', name: 'Colangite aguda', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **colangite aguda** é infecção da árvore biliar, quase sempre por obstrução (coledocolitíase, estenose, tumor). A **tríade de Charcot** clássica integra febre, icterícia e dor em hipocôndrio direito; a **pêntade de Reynolds** acrescenta hipotensão e alteração do estado mental e define colangite grave. Na emergência deve suspeitar-se em todo paciente ictérico com febre ou calafrios, especialmente com antecedente de colelitíase ou manipulação biliar prévia.\n\nO manejo combina **antibiótico de amplo espectro** (cobertura de Gram-negativos entéricos e anaeróbios conforme diretriz local) e **drenagem biliar urgente** em formas moderadas-graves (CPRE, drenagem percutânea ou cirúrgica conforme recursos). Reanimação com cristaloides se choque séptico. Não retardar antibiótico por aguardar imagem se a suspeita é alta. Escalar à UTI em Reynolds ou disfunção orgânica.\n\n**Enfermagem**: monitorar PA, FC, temperatura e nível de consciência, controle de icterícia e colúria, jejum oral até definição, preparação para CPRE (consentimento, coagulação, acesso venoso) e registro horário de antibióticos e diurese.',
    clinicalBox: {
      title: 'Gravidade — Tokyo Guidelines (resumo)',
      content: '**Leve (Grau I):** responde a fluidos e antibiótico; sem disfunção orgânica.\n**Moderada (Grau II):** leucocitose/leucopenia, febre alta, idade > 75, hiperbilirrubinemia marcada ou ITU associada.\n**Grave (Grau III):** disfunção cardiovascular, neurológica, respiratória, renal, hepática ou hematológica.\n\n**Tríada de Charcot:** febre + icterícia + dor HCD · **Reynolds:** Charcot + hipotensão + alteração mental → drenagem urgente.',
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
      { citation: 'Sociedade Argentina de Gastroenterologia (SAGE). Via biliar e colangite.', url: 'https://www.sage.org.ar/' },
      BIB_MS,
      { citation: 'American Society for Gastrointestinal Endoscopy. Role of ERCP in biliary disease.', url: 'https://www.asge.org/' },
    ],
  },
  {
    id: 'cov-001', name: 'COVID-19 — doença aguda', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **doença por SARS-CoV-2 (COVID-19)** é uma infecção respiratória que em formas graves causa pneumonia, síndrome do desconforto respiratório agudo e disfunção multiorgânica. Na emergência estratifica-se com oximetria, frequência respiratória, imagem pulmonar e marcadores (PCR, ferritina, D-dímero conforme protocolo). Fatores de risco de gravidade: idade avançada, obesidade, diabetes, DPOC, imunossupressão e vacinação incompleta.\n\nO manejo de **doença moderada-grave com necessidade de oxigênio** inclui **dexametasona** sistêmica (benefício na hipoxemia), posição prona na insuficiência respiratória, anticoagulação profilática ou terapêutica conforme risco trombótico, e antibiótico somente se suspeita de sobreinfecção bacteriana. Avaliar antivirais de ação direta conforme disponibilidade e janela temporal institucional. Escalar para VNI ou ventilação mecânica conforme critérios de UTI.\n\n**Enfermagem**: SpO₂ contínua, registro de FR e trabalho respiratório, oxigenoterapia titulada, isolamento por gotículas e contato, vigilância de trombose venosa, monitorar glicemia em corticoterapia e apoiar vacinação e isolamento domiciliar na alta conforme normativa vigente.',
    relatedDrugs: [
      { drugId: 'dxt-001', label: 'Dexametasona' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'ose-001', label: 'Oseltamivir' },
    ],
    bibliography: [
      { citation: 'World Health Organization. Clinical management of COVID-19 — living guideline.', url: 'https://www.who.int/publications/guidelines' },
      { citation: 'Ministério da Saúde da Nação Argentina. Protocolo COVID-19.', url: 'https://www.argentina.gob.ar/salud' },
      { citation: 'National Institutes of Health (NIH). COVID-19 Treatment Guidelines.', url: 'https://www.covid19treatmentguidelines.nih.gov/' },
      { citation: 'Infectious Diseases Society of America. Guidelines on the treatment and management of COVID-19.', url: 'https://www.idsociety.org/' },
    ],
  },
  {
    id: 'cvu-001', name: 'Crise convulsiva e estado de mal epiléptico', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **crise convulsiva** é um evento paroxístico por descarga elétrica cerebral anormal. Na emergência deve distinguir-se **crise provocada** (hipoglicemia, hiponatremia, álcool, medicamentos, TCE, AVC) de **epilepsia**. O **estado de mal epiléptico** é convulsão ≥ 5 min ou duas ou mais crises sem recuperação completa do nível de consciência entre elas; é emergência neurológica.\n\nO algoritmo institucional habitual: **benzodiazepínico** de primeira linha (diazepam ou midazolam IV/retal/IM conforme via disponível). Se persistir, segunda dose de benzodiazepínico e depois **antiepiléptico IV** (levetiracetam, fenitoína ou valproato conforme protocolo). Corrigir simultaneamente glicose, eletrólitos e causa reversível. Proteger via aérea, oxigênio, acesso venoso e monitor cardíaco (fenitoína: risco de hipotensão e arritmias com infusão rápida).\n\n**Enfermagem**: cronometrar duração da crise, lateralizar o paciente, não introduzir objetos na boca, registrar medicação e hora exata, vigiar período pós-ictal (confusão, sonolência) e observar lesões por queda. Solicitar glicemia capilar imediata.',
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
      { citation: 'Sociedade Argentina de Neurologia (SAN). Consensos de epilepsia.', url: 'https://www.san.org.ar/' },
      BIB_MS,
      { citation: 'American Epilepsy Society. Treatment of convulsive status epilepticus.', url: 'https://www.aesnet.org/' },
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

console.log(`\nLote 1 patologías: ${items.length} monografías pt-BR`);
