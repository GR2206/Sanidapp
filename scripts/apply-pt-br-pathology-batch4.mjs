#!/usr/bin/env node
/** Lote 4/4 — 5 patologías pt-BR finales desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/patologias/items');

const BIB_MS = { citation: 'Ministério da Saúde da Nação Argentina. Estratégias e diretrizes de atenção.', url: 'https://www.argentina.gob.ar/salud' };

const items = [
  {
    id: 'sin-001', name: 'Síncope', version: '1.0', updatedAt: '2026-06-25',
    body: 'O **síncope** é a perda transitória de consciência por hipoperfusão cerebral global, com recuperação espontânea completa. Na emergência classifica-se em **reflexo (vasovagal)**, **ortostático** e **cardíaco** (arritmias, cardiopatia estrutural). O síncope cardíaco tem maior risco de morte súbita e exige investigação urgente. A anamnese detalha contexto (ortostatismo, esforço, dor, micção), pródromos, duração e testemunhas (convulsão vs síncope).\n\nO exame inclui PA em decúbito e ortostatismo, ausculta cardíaca, ECG obrigatório (buscar bradiarritmias, QT longo, bloqueios, isquemia) e glicemia capilar. Na suspeita cardíaca ou síncope sem pródromos ao esforço: monitorização, troponinas se dor associada e consulta à cardiologia. O síncope reflexo em paciente jovem sem cardiopatia costuma ser de baixo risco após ECG normal.\n\n**Enfermagem**: posição segura durante o episódio, oxímetro e PA seriados, ECG na admissão, hidratação oral se ortostático e orientação sobre manobras de contrapressão e evitar desidratação. Registrar medicação (anti-hipertensivos, diuréticos) que favoreçam hipotensão.',
    relatedDrugs: [
      { drugId: 'glu-001', label: 'Dextrose (glicose)' },
      { drugId: 'ade-001', label: 'Adenosina' },
      { drugId: 'atr-001', label: 'Atropina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Syncope guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedade Argentina de Cardiologia. Consenso de síncope.', url: 'https://www.sac.org.ar/' },
      BIB_MS,
      { citation: 'American College of Cardiology / AHA. Syncope evaluation.', url: 'https://www.acc.org/' },
    ],
  },
  {
    id: 'tdm-001', name: 'Distúrbios do meio interno', version: '1.0', updatedAt: '2026-06-25',
    body: 'Os **distúrbios do meio interno (DMI)** agrupam alterações hidroeletrolíticas e ácido-base frequentes na emergência: hiponatremia, hipercalemia, hipocalemia, hipoglicemia, hipocalcemia e distúrbios do equilíbrio ácido-base. Costumam ser **consequência** de outra patologia (vômitos, diarreia, diuréticos, IRA, sepse, insulina em excesso) e sua correção inadequada pode ser iatrogênica.\n\nA **desidratação** hipovolêmica cursa com sede, mucosas secas, hipotensão ortostática, oligúria e hemoconcentração; o tratamento é reposição com cristaloides conforme gravidade e causa. A **hiponatremia** sintomática (convulsões, coma) requer correção controlada com salina hipertônica conforme protocolo; evitar correção rápida para prevenir mielinólise. A **hipercalemia** grave demanda estabilização de membrana (cálcio IV), shift intracelular (insulina-dextrose, beta-2) e eliminação conforme recursos.\n\n**Enfermagem**: monitorizar sinais vitais, diurese, glicemia capilar se indicado, administrar eletrólitos e soluções com bomba de infusão quando indicado, e repetir laboratório conforme prescrição médica. Documentar volume administrado e resposta clínica.',
    relatedDrugs: [
      { drugId: 'nsh-001', label: 'Cloreto de sódio hipertônico' },
      { drugId: 'kcl-001', label: 'Cloreto de potássio' },
      { drugId: 'cag-001', label: 'Gluconato de cálcio' },
      { drugId: 'bic-001', label: 'Bicarbonato de sódio' },
      { drugId: 'ins-001', label: 'Insulina corriente' },
      { drugId: 'glu-001', label: 'Dextrose (glicose)' },
    ],
    bibliography: [
      { citation: 'European Renal Association. Clinical practice guideline on management of hyponatraemia.', url: 'https://www.era-online.org/' },
      { citation: 'Kidney Disease: Improving Global Outcomes (KDIGO). Electrolyte disorders.', url: 'https://kdigo.org/guidelines/' },
      BIB_MS,
      { citation: 'American Society of Nephrology. Core curriculum in electrolyte disorders.', url: 'https://www.asn-online.org/' },
    ],
  },
  {
    id: 'tep-001', name: 'Tromboembolismo pulmonar (TEP)', version: '1.0', updatedAt: '2026-06-25',
    body: 'O **tromboembolismo pulmonar** é a obstrução da artéria pulmonar ou de seus ramos por um trombo, na maioria dos casos proveniente do sistema venoso profundo. A tríade clássica (dor torácica pleurítica, hemoptise, dispneia) é pouco sensível; deve-se suspeitar diante de **dispneia aguda inexplicada**, taquicardia, síncope, hipotensão ou sinais de TVP em membros inferiores. Fatores de risco: imobilização, cirurgia recente, câncer, gestação, anticoncepcionais e trombofilias.\n\nA estratificação com escalas (**Wells**, **GENEVA**) e D-dímero (alto valor preditivo negativo em baixa probabilidade) orienta a investigação. A **angio-TC pulmonar** é o padrão-ouro em muitos centros; ecocardiograma busca sobrecarga direita. O tratamento inclui **anticoagulação** imediata (heparina não fracionada ou enoxaparina) e avaliação de trombólise ou embolectomia no TEP de alto risco (choque ou hipotensão).\n\n**Enfermagem**: oxigenoterapia, monitorização hemodinâmica, controle de sinais de sangramento após anticoagulação, meias de compressão se não contraindicadas e orientação sobre duração do tratamento e sinais de recorrência.',
    clinicalBox: {
      title: 'Escala de Wells — probabilidade de TEP',
      content: 'Pontuação clínica (versão simplificada):\nSinais clínicos de **TVP** — 3 pts\n**TEP** como diagnóstico mais provável — 3 pts\nFC **> 100**/min — 1,5 pts\nImobilização ou cirurgia recente — 1,5 pts\n**TEP ou TVP** prévios — 1,5 pts\n**Hemoptise** — 1 pt\n**Câncer** ativo — 1 pt\n\n**≤ 4:** probabilidade baixa (D-dímero se aplicável) · **> 4:** probabilidade alta → imagem pulmonar urgente.',
    },
    relatedDrugs: [
      { drugId: 'hef-001', label: 'Heparina sódica' },
      { drugId: 'eno-001', label: 'Enoxaparina' },
      { drugId: 'war-001', label: 'Warfarina' },
      { drugId: 'nor-001', label: 'Noradrenalina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Pulmonary Embolism Guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedade Argentina de Cardiologia. Consenso de doença tromboembólica.', url: 'https://www.sac.org.ar/' },
      BIB_MS,
      { citation: 'American College of Chest Physicians. Antithrombotic Therapy guidelines.', url: 'https://www.chestnet.org/' },
    ],
  },
  {
    id: 'tra-001', name: 'Politraumatismo', version: '1.0', updatedAt: '2026-06-25',
    body: 'O **politraumatismo** é a lesão simultânea de múltiplas regiões anatômicas, com risco de choque hemorrágico, TCE, lesão torácica, abdominal e de coluna. Na emergência aplica-se a abordagem **ATLS / ABCDE**: via aérea com proteção cervical, ventilação, circulação e controle de hemorragia, avaliação neurológica (GCS, pupilas) e exposição com prevenção de hipotermia. A **reanimação com damage control** prioriza interromper sangramento e restaurar perfusão.\n\nAções imediatas: dois acessos venosos calibrosos, **cristaloides** e ativação do banco de sangue; **ácido tranexâmico** se indicado por protocolo (< 3 h); torniquetes ou compressão em hemorragia externa; FAST ecográfico ou TC **pan-scan** conforme estabilidade. Analgesia adequada (opioides titulados, cetamina em contexto hemodinâmico instável conforme diretriz). Antibiótico profilático em feridas abertas e fraturas expostas. Contato precoce com cirurgia e UTI.\n\n**Enfermagem**: monitorização contínua, registro seriado de GCS, controle de sangramento e débitos, manter colar cervical até descartar lesão cervical, evitar hipotermia (mantas térmicas), balanço hídrico rigoroso e acompanhamento do paciente nos exames de imagem.',
    clinicalBox: {
      title: 'ABCDE — avaliação inicial',
      content: '**A** — Via aérea + proteção cervical\n**B** — Ventilação e oxigenação (SpO₂, FR, ausculta)\n**C** — Circulação: hemorragia, FC, PA, acessos, reanimação\n**D** — Deterioração neurológica: GCS, pupilas, glicose\n**E** — Exposição completa com prevenção de hipotermia\n\nReavaliar a cada intervenção. Registrar hora de admissão, mecanismo e achados seriados.',
    },
    relatedDrugs: [
      { drugId: 'adr-001', label: 'Adrenalina (epinefrina)' },
      { drugId: 'nor-001', label: 'Noradrenalina' },
      { drugId: 'mor-001', label: 'Morfina' },
      { drugId: 'ket-001', label: 'Cetamina' },
      { drugId: 'man-001', label: 'Manitol' },
      { drugId: 'cef-002', label: 'Cefazolina' },
    ],
    bibliography: [
      { citation: 'American College of Surgeons. ATLS — Advanced Trauma Life Support.', url: 'https://www.facs.org/quality-programs/trauma/atls/' },
      { citation: 'Sociedade Argentina de Trauma e Emergências (SATE). Consensos nacionais.', url: 'https://www.sate.org.ar/' },
      BIB_MS,
      { citation: 'World Health Organization. Emergency care of severe trauma.', url: 'https://www.who.int/' },
    ],
  },
  {
    id: 'tsv-001', name: 'Taquicardia supraventricular (TSV)', version: '1.0', updatedAt: '2026-06-25',
    body: 'A **taquicardia supraventricular (TSV)** é um ritmo rápido regular de origem auricular ou da junção AV, com frequência usualmente 150–250 bpm. O paciente refere **palpitações** de início e fim bruscos, tontura, opressão torácica ou dispneia. No ECG: QRS estreito e regular (salvo aberrância). Diferenciar de flutter auricular, FA com condução rápida e taquicardia sinusal.\n\nEm paciente **instável** (hipotensão, edema agudo de pulmão, dor isquêmica, alteração do estado mental): **cardioversão elétrica sincronizada** imediata. Se estável: manobras vagais e **adenosina** IV em bolus (com monitor e desfibrilador disponíveis). Se falha adenosina: betabloqueador IV, verapamil ou amiodarona conforme protocolo e comorbidades. Tratar causa desencadeante (febre, anemia, hipovolemia).\n\n**Enfermagem**: monitor cardíaco contínuo, acesso venoso, preparar adenosina e equipamento de cardioversão, registrar hora de início e resposta às manobras vagais, vigiar bradicardia após adenosina.',
    relatedDrugs: [
      { drugId: 'ade-001', label: 'Adenosina' },
      { drugId: 'mop-001', label: 'Metoprolol' },
      { drugId: 'amd-001', label: 'Amiodarona' },
      { drugId: 'atr-001', label: 'Atropina' },
    ],
    bibliography: [
      { citation: 'European Society of Cardiology. Supraventricular tachycardia guidelines.', url: 'https://www.escardio.org/Guidelines' },
      { citation: 'Sociedade Argentina de Cardiologia (SAC). Arritmias supraventriculares.', url: 'https://www.sac.org.ar/' },
      BIB_MS,
      { citation: 'American Heart Association. Tachycardia algorithm (ACLS).', url: 'https://www.heart.org/' },
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

console.log(`\nLote 4 patologías: ${items.length} monografías pt-BR — patologías COMPLETAS`);
