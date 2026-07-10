#!/usr/bin/env node
/** Lote 3/4 — 10 patologías pt-BR desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/patologias/items');

const BIB_MS = { citation: 'Ministério da Saúde da Nação Argentina. Estratégias e diretrizes de atenção.', url: 'https://www.argentina.gob.ar/salud' };

const items = [
  {
    id: 'icc-001', name: 'Insuficiência cardíaca (IC)', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **insuficiência cardíaca** é uma síndrome clínica na qual o coração não bombeia sangue de forma eficaz para as necessidades metabólicas, ou o faz apenas com pressões de enchimento elevadas. Na emergência predominam as **descompensações agudas**: edema agudo de pulmão, IC com congestão sistêmica, perfil úmido-frio (baixo débito) ou crises hipertensivas associadas. A anamnese explora dispneia paroxística noturna, ortopneia, ganho ponderal, adesão a diuréticos e fatores desencadeantes (infecção, arritmia, IAM, anemia).\n\nO exame avalia crepitantes, ingurgitamento jugular, refluxo hepatojugular, edemas, ritmo e sopros. O **ECG**, radiografia de tórax, BNP/NT-proBNP, ionograma e função renal orientam gravidade e plano terapêutico. O tratamento agudo combina **diuréticos de alça** (furosemida IV), vasodilatadores (nitroglicerina) no perfil hipertenso, oxigênio ou VNI conforme hipoxemia, e manejo da causa desencadeante. No choque cardiogênico requerem-se inotrópicos e cuidados intensivos.\n\n**Enfermagem**: peso diário, balanço hídrico rigoroso, monitorização da diurese pós-furosemida, controle de eletrólitos (K⁺, Mg²⁺), posição semisentada e restrição de sódio e líquidos conforme prescrição médica. Detectar precocemente hipotensão, oligúria e alteração do estado mental.',
    relatedDrugs: [
      { drugId: 'fur-001', label: 'Furosemida' },
      { drugId: 'ngl-001', label: 'Nitroglicerina' },
      { drugId: 'dob-001', label: 'Dobutamina' },
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'esp-001', label: 'Espironolactona' },
    ],
    bibliography: [
      { citation: 'Sociedade Argentina de Cardiologia (SAC). Consensos de insuficiência cardíaca.', url: 'https://www.sac.org.ar/' },
      { citation: 'European Society of Cardiology. Heart Failure Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      BIB_MS,
      { citation: 'American Heart Association. Heart Failure guidelines.', url: 'https://www.heart.org/' },
    ],
  },
  {
    id: 'int-001', name: 'Intoxicação aguda', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **intoxicação aguda** é a exposição a uma substância em dose tóxica, por via oral, inalatória, cutânea ou parenteral. Na emergência argentina são frequentes **superdose medicamentosa** (benzodiazepínicos, opioides, paracetamol, antidepressivos), **álcool etílico**, monóxido de carbono, organofosforados e drogas de abuso. A prioridade é **ABCDE**: via aérea, ventilação, circulação, glicemia capilar e temperatura.\n\nIdentificar toxíndromes: **opioide** (miose, depressão respiratória → naloxona), **anticolinérgico** (pele seca, midríase, retenção), **colinérgico** (sialorreia, broncorreia, miose → atropina), **sedante-hipnótico** (depressão do SNC). Na superdose de **paracetamol**, calcular nomograma de Rumack-Matthew e N-acetilcisteína se indicada. Carvão ativado somente em ingestões recentes (< 1–2 h) e via aérea protegida. Contatar centro toxicológico institucional ou nacional.\n\n**Enfermagem**: preservar amostras (vômito, embalagens), não induzir vômito, monitorar nível de consciência e FR, preparar antídotos conforme protocolo (naloxona, flumazenil com cautela, glicose) e vigilância de agitação ou convulsões na abstinência.',
    relatedDrugs: [
      { drugId: 'nal-001', label: 'Naloxona' },
      { drugId: 'flm-001', label: 'Flumazenil' },
      { drugId: 'atr-001', label: 'Atropina' },
      { drugId: 'bic-001', label: 'Bicarbonato de sódio' },
      { drugId: 'glu-001', label: 'Dextrose (glicose)' },
    ],
    bibliography: [
      { citation: 'American College of Medical Toxicology. ACMT practice guidelines.', url: 'https://www.acmt.net/' },
      { citation: 'Centro de Informação Toxicológica — Argentina (CITBA / hospitais de referência).', url: 'https://www.argentina.gob.ar/salud' },
      BIB_MS,
      { citation: 'Poison Control / WHO. Guidelines for poison control.', url: 'https://www.who.int/health-topics/poisoning' },
    ],
  },
  {
    id: 'ira-001', name: 'Insuficiência renal aguda (IRA)', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **insuficiência renal aguda** (injúria renal aguda) é a deterioração rápida da função renal com acúmulo de produtos nitrogenados e alteração do equilíbrio hidroeletrolítico e ácido-base. Classifica-se em **pré-renal** (hipoperfusão), **renal** (nefrotóxicos, NTA) e **pós-renal** (obstrução). Na emergência é frequente por desidratação, sepse, nefrotóxicos (AINE, contrastes, aminoglicosídeos) e obstrução prostática em homens idosos.\n\nA avaliação inclui creatinina e ureia seriadas, ionograma, gasometria, sedimento urinário, ultrassonografia renal se houver suspeita obstrutiva e revisão da medicação. O manejo inicial é **tratar a causa**, suspender nefrotóxicos, ajustar doses de fármacos ao clearance e otimizar volume: cristaloides em pré-renal com resposta esperada, evitar sobrecarga na oligúria. Indicações de **diálise urgente**: hipercalemia refratária, acidose grave, sobrecarga hídrica com hipoxemia ou uremia sintomática.\n\n**Enfermagem**: balanço hídrico rigoroso, peso diário, registro preciso de diurese horária, vigilância de K⁺ e ECG se hipercalemia, e prevenção de novos insultos renais. Coordenar com farmácia o ajuste de antibióticos e anticoagulantes.',
    relatedDrugs: [
      { drugId: 'fur-001', label: 'Furosemida' },
      { drugId: 'bic-001', label: 'Bicarbonato de sódio' },
      { drugId: 'kcl-001', label: 'Cloreto de potássio' },
      { drugId: 'nsh-001', label: 'Cloreto de sódio hipertônico' },
    ],
    bibliography: [
      { citation: 'Kidney Disease: Improving Global Outcomes (KDIGO). Acute Kidney Injury guideline.', url: 'https://kdigo.org/guidelines/' },
      { citation: 'Sociedade Argentina de Nefrologia (SAN). Consensos nacionais.', url: 'https://www.san.org.ar/' },
      BIB_MS,
      { citation: 'National Institute for Health and Care Excellence. Acute kidney injury guideline.', url: 'https://www.nice.org.uk/guidance/ng148' },
    ],
  },
  {
    id: 'itu-001', name: 'Infecção urinária complicada e pielonefrite', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **infecção do trato urinário (ITU) complicada** ocorre na presença de anomalia estrutural ou funcional, instrumentação recente, gestação, diabetes ou imunossupressão. A **pielonefrite aguda** é infecção do parênquima renal, com febre, dor lombar, náuseas e às vezes sintomas miccionais. Em homens jovens toda ITU é considerada complicada; em idosos pode apresentar-se apenas com alteração do estado geral.\n\nO diagnóstico combina clínica, urocultura e, se houver febre persistente ou má resposta, imagem (ultrassonografia ou TC) para descartar obstrução ou abscesso. Antibiótico empírico conforme diretriz local (ceftriaxona, fluoroquinolona se baixa resistência, piperacilina-tazobactam em casos graves ou hospitalizados). Duração habitual 7–14 dias conforme gravidade. Internar se vômitos, septicemia, gestação, falha renal ou intolerância oral.\n\n**Enfermagem**: registrar temperatura e dor lombar, incentivar hidratação oral se tolera, controle de diurese, culturas antes do antibiótico quando possível sem retardar dose em quadro grave, e orientação sobre higiene e adesão ao tratamento.',
    relatedDrugs: [
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'cip-001', label: 'Ciprofloxacino' },
      { drugId: 'lev-001', label: 'Levofloxacino' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
      { drugId: 'tri-001', label: 'Trimetoprima/sulfametoxazol' },
    ],
    bibliography: [
      { citation: 'Infectious Diseases Society of America. International Clinical Practice Guidelines for Acute Uncomplicated Cystitis and Pyelonephritis.', url: 'https://www.idsociety.org/' },
      { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes de ITU.', url: 'https://www.sadi.org.ar/' },
      BIB_MS,
      { citation: 'European Association of Urology. Urological Infections guidelines.', url: 'https://uroweb.org/guidelines' },
    ],
  },
  {
    id: 'men-001', name: 'Meningite e meningoencefalite', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **meningite bacteriana aguda** é uma emergência infecciosa com inflamação das meninges; a **meningoencefalite** acrescenta comprometimento do parênquima cerebral (frequente em etiologia viral, por exemplo HSV). O quadro clássico inclui febre, cefaleia intensa, rigidez de nuca, fotofobia e alteração do estado mental; em idosos e imunodeprimidos pode ser **subclínica**. O sinal de **Kernig** e **Brudzinski** apoiam o diagnóstico mas não o excluem se ausentes.\n\nAnte suspeita, não retardar antibiótico: hemoculturas e **punção lombar** (ou neuroimagem prévia somente se houver focalidade neurológica, papiledema, imunossupressão ou crise convulsiva recente, conforme protocolo). Esquema empírico adulto habitual: **ceftriaxona** ± **vancomicina** (cobertura de pneumococo resistente) ± **ampicilina** se > 50 anos ou imunossupressão (Listeria). Na suspeita de HSV: **aciclovir** IV. **Dexametasona** antes ou com a primeira dose de antibiótico na meningite pneumocócica conforme diretriz institucional.\n\n**Enfermagem**: isolamento por gotículas conforme protocolo, monitorar GCS e sinais de hipertensão intracraniana, controle rigoroso de temperatura, registrar hora da primeira dose de antibiótico, vigiar convulsões e preparar material para PL em ambiente estéril.',
    relatedDrugs: [
      { drugId: 'cef-005', label: 'Ceftriaxona' },
      { drugId: 'van-001', label: 'Vancomicina' },
      { drugId: 'amp-001', label: 'Ampicilina' },
      { drugId: 'aci-001', label: 'Aciclovir' },
      { drugId: 'dxt-001', label: 'Dexametasona' },
    ],
    bibliography: [
      { citation: 'Infectious Diseases Society of America. Practice guidelines for bacterial meningitis.', url: 'https://www.idsociety.org/' },
      { citation: 'Sociedade Argentina de Infectologia (SADI). Meningite bacteriana.', url: 'https://www.sadi.org.ar/' },
      BIB_MS,
      { citation: 'European Society of Clinical Microbiology and Infectious Diseases. Meningitis guidelines.', url: 'https://www.escmid.org/' },
    ],
  },
  {
    id: 'per-001', name: 'Pericardite aguda', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **pericardite aguda** é inflamação do pericárdio, frequentemente viral ou pós-viral. A dor é **pleurítica**, retroesternal, que **melhora sentado e inclinado para frente** e piora em decúbito e com inspiração profunda. Pode haver fricção pericárdica à ausculta. O ECG mostra tipicamente **elevação difusa do ST** com **depressão do PR** em múltiplas derivações (diferente do IAM, que é territorial e recíproco).\n\nO diagnóstico é clínico com apoio de ECG, ecocardiograma (derrame pericárdico) e troponina (pode elevar-se em miopericardite). Tratamento: **AINE** (ibuprofeno ou AAS em doses anti-inflamatórias) e **colchicina** para reduzir recorrências, conforme diretriz. Evitar anticoagulação se houver risco de hemopericárdio. Internar se febre alta, derrame importante, imunossupressão ou suspeita de pericardite purulenta.\n\n**Enfermagem**: posição semisentada, controle da dor, vigilância de sinais de tamponamento (hipotensão, ingurgitamento jugular, pulsos paradoxais) e orientação sobre repouso relativo e acompanhamento.',
    relatedDrugs: [
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'mor-001', label: 'Morfina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Pericardial diseases guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedade Argentina de Cardiologia (SAC). Pericardite.', url: 'https://www.sac.org.ar/' },
      BIB_MS,
      { citation: 'American College of Cardiology. Pericarditis clinical guidance.', url: 'https://www.acc.org/' },
    ],
  },
  {
    id: 'pna-001', name: 'Pneumonia adquirida na comunidade', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **pneumonia adquirida na comunidade (PAC)** é a infecção aguda do parênquima pulmonar adquirida fora do ambiente hospitalar. Na emergência classifica-se conforme gravidade com escalas como **CURB-65** ou **PSI** para decidir manejo ambulatorial, hospitalar ou em UTI. A apresentação clássica inclui febre, tosse produtiva, dor pleurítica e consolidação à ausculta; em idosos pode debutar com confusão ou dessaturação sem febre marcada.\n\nO estudo inclui radiografia de tórax (ou ultrassonografia torácica se disponível), hemograma, função renal, oximetria e hemoculturas em casos graves. O **antibiótico empírico** ajusta-se à diretriz local e fatores de risco (DPOC, alcoolismo, institucionalização recente). Esquemas frequentes: betalactâmico ± macrolídeo ou fluoroquinolona respiratória em pacientes com comorbidades. Oxigênio se SpO₂ < 90–92 % e reavaliação às 48–72 h.\n\n**Enfermagem**: controle de temperatura e SpO₂, fomentar hidratação e mobilização precoce, técnicas de tosse efetiva, orientação sobre completar o ciclo antibiótico e vacinação antipneumocócica e contra influenza. Isolar somente se houver suspeita de patógeno transmitido por via aérea conforme protocolo.',
    clinicalBox: {
      title: 'CURB-65 — gravidade em PAC',
      content: 'Um ponto por cada critério:\n**C** — Confusão (nova ou GCS ≤ 8)\n**U** — Ureia > 19 mg/dL (ou BUN > 20 mg/dL)\n**R** — Frequência respiratória ≥ 30/min\n**B** — PA sistólica < 90 ou diastólica ≤ 60 mmHg\n**65** — Idade ≥ 65 anos\n\n**0–1:** manejo ambulatorial · **2:** considerar hospitalização · **3–5:** internação; ≥ 4 avaliar UTI.',
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
      { citation: 'Sociedade Argentina de Infectologia (SADI). Recomendações de PAC.', url: 'https://www.sadi.org.ar/' },
      BIB_MS,
      { citation: 'British Thoracic Society. CAP guideline.', url: 'https://www.brit-thoracic.org.uk/' },
    ],
  },
  {
    id: 'pnc-001', name: 'Pancreatite aguda', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **pancreatite aguda** é inflamação do pâncreas com elevação de amilase e/ou lipase (> 3 vezes o limite superior normal) e dor abdominal característica. As causas principais são **litíase biliar** e **álcool**; outras: hipertrigliceridemia, fármacos, CPRE, hipercalcemia. Estratifica-se a gravidade com escalas (Ranson, BISAP, APACHE) e marcadores de necrose ou falha orgânica.\n\nO tratamento é de **suporte**: reposição volêmica agressiva com cristaloides, analgesia adequada (opioides se necessário), jejum oral inicial e reinício da dieta conforme tolerância e protocolo. Não há indicação rotineira de antibiótico profilático. Avaliar colecistectomia na pancreatite biliar leve após resolução, e CPRE urgente se colangite associada. Complicações: necrose infectada, pseudocisto, falha orgânica — encaminhamento à UTI.\n\n**Enfermagem**: monitorar FC, PA, diurese (meta ≥ 0,5 mL/kg/h), balanço hídrico, dor e distensão abdominal. Glicemia seriada (risco de hiperglicemia). Vigiar sinais de sepse na necrose e preparar exames de imagem de controle.',
    relatedDrugs: [
      { drugId: 'mor-001', label: 'Morfina' },
      { drugId: 'ond-001', label: 'Ondansetrona' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
      { drugId: 'mer-001', label: 'Meropenem' },
    ],
    bibliography: [
      { citation: 'American Gastroenterological Association. Acute Pancreatitis Clinical Guidelines.', url: 'https://gastro.org/clinical-guidance' },
      { citation: 'Sociedade Argentina de Gastroenterologia (SAGE). Consenso de pancreatite.', url: 'https://www.sage.org.ar/' },
      BIB_MS,
      { citation: 'International Association of Pancreatology / American Pancreatic Association.', url: 'https://www.iap-online.org/' },
    ],
  },
  {
    id: 'rhd-001', name: 'Rabdomiólise', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **rabdomiólise** é necrose muscular com liberação de mioglobina, CK e eletrólitos ao plasma. Causas frequentes na emergência: **trauma**, queda prolongada, exercício extremo, convulsões, fármacos (**estatinas**, cocaína), hipertermia maligna e infecções. A tríade clássica é mialgia, fraqueza e urina escura; pode cursar sem dor muscular. Complicações: **IRA por mioglobina**, hipercalemia, hipocalcemia, coagulação intravascular.\n\nO tratamento prioritário é **reposição volêmica agressiva** com cristaloides (metas de diurese conforme protocolo, p. ex. 200–300 mL/h se tolera) para diluir mioglobina e prevenir necrose tubular. Corrigir **hipercalemia** e acidose conforme algoritmos. Suspender fármacos suspeitos. Indicações de diálise: hipercalemia refratária, acidose grave, sobrecarga hídrica ou uremia. Monitorar CK seriada (pico a 24–72 h).\n\n**Enfermagem**: balanço hídrico rigoroso, diurese horária, ECG se hipercalemia, evitar nefrotóxicos (AINE, contrastes), repouso relativo e registro de urina (cor, volume). Avaliar síndrome compartimental em membros tensos.',
    clinicalBox: {
      title: 'CK e alarmes na rabdomiólise',
      content: '**CK** > 5× limite superior normal confirma dano muscular (valores muito altos são frequentes).\n\n**Vigiar de imediato:**\n· Diurese **< 0,5 mL/kg/h** apesar de fluidos\n· **K⁺** elevado · **pH** baixo · **Creatinina** em ascensão\n· Urina escura / mioglobinúria positiva\n\nMeta habitual de reanimação: diurese **200–300 mL/h** (ajustar ao protocolo e comorbidades cardíacas).',
    },
    relatedDrugs: [
      { drugId: 'fur-001', label: 'Furosemida' },
      { drugId: 'bic-001', label: 'Bicarbonato de sódio' },
      { drugId: 'kcl-001', label: 'Cloreto de potássio' },
      { drugId: 'nsh-001', label: 'Cloreto de sódio hipertônico' },
      { drugId: 'man-001', label: 'Manitol' },
    ],
    bibliography: [
      { citation: 'Kidney Disease: Improving Global Outcomes (KDIGO). Acute kidney injury and rhabdomyolysis.', url: 'https://kdigo.org/guidelines/' },
      { citation: 'Sociedade Argentina de Nefrologia (SAN). Injúria renal aguda.', url: 'https://www.san.org.ar/' },
      BIB_MS,
      { citation: 'American College of Emergency Physicians. Rhabdomyolysis clinical policy.', url: 'https://www.acep.org/' },
    ],
  },
  {
    id: 'sep-001', name: 'Sepse e choque séptico', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **sepse** é uma disfunção orgânica potencialmente fatal causada por uma resposta desregulada do hospedeiro à infecção. O **choque séptico** define-se por hipotensão persistente que requer vasopressores para manter PAM ≥ 65 mmHg e lactato > 2 mmol/L apesar de reanimação volêmica adequada. Na emergência deve suspeitar-se ante febre ou hipotermia, taquicardia, taquipneia, alteração do estado mental, oligúria ou hipotensão, especialmente em idosos, imunodeprimidos ou com dispositivos invasivos.\n\nO manejo inicial segue a abordagem **hora zero**: hemoculturas antes dos antibióticos se não retardar mais de 45 minutos, antibiótico de amplo espectro precoce conforme foco provável, reanimação com cristaloides 30 mL/kg na hipotensão ou lactato elevado, e vasopressores (noradrenalina de primeira linha) se persistir hipotensão. Identificar e controlar o foco (drenagem de abscesso, retirada de cateter infectado). Lactato seriado e SOFA/qSOFA conforme protocolo institucional.\n\n**Enfermagem**: monitorização contínua, duas vias periféricas ou acesso central, registro rigoroso de balanço hídrico, temperatura e escalas de sedação se intubado. Administrar antibióticos no tempo acordado, preparar culturas e documentar hora de início de cada intervenção do bundle séptico.',
    clinicalBox: {
      title: 'qSOFA — triagem rápida de sepse',
      content: 'Um ponto por cada critério (avaliar fora da UTI):\n**Q** — Frequência respiratória ≥ 22/min\n**S** — Alteração do estado mental (GCS < 15)\n**O** — PA sistólica ≤ 100 mmHg\n\n**≥ 2 pontos:** alto risco de evolução tórpida; ativar protocolo séptico, lactato e avaliação de disfunção orgânica (SOFA). Não substitui o julgamento clínico nem o diagnóstico de infecção.',
    },
    relatedDrugs: [
      { drugId: 'nor-001', label: 'Noradrenalina' },
      { drugId: 'adr-001', label: 'Adrenalina' },
      { drugId: 'vas-001', label: 'Vasopressina' },
      { drugId: 'pip-001', label: 'Piperacilina/tazobactam' },
      { drugId: 'mer-001', label: 'Meropenem' },
      { drugId: 'van-001', label: 'Vancomicina' },
    ],
    bibliography: [
      { citation: 'Surviving Sepsis Campaign. International Guidelines for Management of Sepsis and Septic Shock.', url: 'https://www.sccm.org/survivingsepsiscampaign' },
      { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes de antimicrobianos.', url: 'https://www.sadi.org.ar/' },
      BIB_MS,
      { citation: 'World Health Organization. Sepsis technical package.', url: 'https://www.who.int/health-topics/sepsis' },
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

console.log(`\nLote 3 patologías: ${items.length} monografías pt-BR`);
