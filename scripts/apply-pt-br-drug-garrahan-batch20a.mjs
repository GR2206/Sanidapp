#!/usr/bin/env node
/** Garrahan re-tradução lote 20 — 5 monografias pt-BR (parte A) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/farmacologia/drugs');

const ADJUST = '> Ajustar conforme protocolo institucional e prescrição médica.';
const MAIN = '## Indicações principais';

const BIB = {
  garrahan: (name, meta = '') => ({
    citation: `Hospital de Pediatría SAMIC Prof. Dr. Juan P. Garrahan. Formulário Farmacêutico Institucional — ${name}${meta}.`,
    url: 'https://farmacia.garrahan.gov.ar/Vademecum/Busqueda',
  }),
  pedGuide: { citation: 'Guia institucional de diluição e administração pediátrica. Junho de 2026.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  aapPals: { citation: 'American Academy of Pediatrics. Pediatric Advanced Life Support (PALS).', url: 'https://www.aap.org/' },
  wao: { citation: 'World Allergy Organization. Anaphylaxis guidance for healthcare providers.', url: 'https://www.worldallergy.org/' },
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
  heartPh: { citation: 'American Heart Association. Pulmonary hypertension guidelines.', url: 'https://www.heart.org/' },
  escPh: { citation: 'European Society of Cardiology. Pulmonary hypertension guidelines.', url: 'https://www.escardio.org/' },
};

const drugs = [
  {
    id: 'sil-001', name: 'Sildenafila', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Vasodilatador pulmonar para hipertensão pulmonar.',
    indications: `${MAIN}\n\nVasodilatador pulmonar para hipertensão pulmonar.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 50 mg; solução magistral 2 mg/mL.', dose: 'Esquemas conforme protocolo de hipertensão pulmonar.', administration: 'V.O.' },
      pediatrico: {
        presentation: 'Comprimidos: 50 mg; Solução (magistral): 2 mg/mL; Ampolas 12,5 mL: 0,8 mg/mL (medicamento importado)',
        administration: 'V.O.; E.V.',
        dose: 'Crianças e adolescentes: inicial: 0,5–1 mg/kg/dose a cada 6–8 h, dose máxima: 4 mg/kg/dia até 20 mg/dose a cada 8 h; manutenção: 0,25–1 mg/kg/dose a cada 6–8 h, dose máxima: 4 mg/kg/dia até 20 mg/dose a cada 8 h. Não requer ajuste de dose em insuficiência hepática ou renal',
        notes: 'Indicação restrita — uso exclusivo do especialista. Não é dialisável. Ver alerta de sildenafila.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula em embalagem original.',
    adverseEffects: '## Efeitos adversos\n\nDiarreia, dispepsia, rash, tontura, cefaleia, visão anormal, congestão nasal.',
    bibliography: [BIB.garrahan('Sildenafil*', ' (cód. 1530, ATC G04BE)'), BIB.sac, BIB.anmat, BIB.heartPh, BIB.escPh],
  },
  {
    id: 'bup-001', name: 'Bupivacaína', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anestésico local do grupo das amidas.',
    indications: `${MAIN}\n\nAnestésico local do grupo das amidas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampolas 20 mL: 5 mg/mL; Ampolas hiperbáricas 4 mL: 5 mg/mL.', dose: 'Até 0,5 mg/kg/dose conforme bloqueio regional.', administration: 'Local e regional.' },
      pediatrico: {
        presentation: 'Ampolas 20 mL: 5 mg/mL; Ampolas hiperbáricas 4 mL: 5 mg/mL',
        administration: 'Local e regional',
        dose: 'Até 0,5 mg/kg/dose',
        notes: 'USO EXCLUSIVO DO ESPECIALISTA. Não administrar por via endovenosa. Ação prolongada. Doses repetidas por qualquer via causam acúmulo e efeitos sistêmicos.',
      },
    },
    stability: '## Geral\n\n- Seguir condições de armazenamento do fabricante.',
    adverseEffects: '## Efeitos adversos\n\nArritmias, parada cardíaca. Os efeitos cardiovasculares são mais graves que os da lidocaína.',
    bibliography: [BIB.garrahan('BUPIvacaína Cloridrato*', ' (cód. 0028, ATC N01BA)'), BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'adr-001', name: 'Adrenalina (epinefrina)', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Simpaticomimético. Choque cardiogênico ou séptico com hipotensão refratária e baixa resistência periférica.',
    indications: `${MAIN}\n\nSimpaticomimético. Choque cardiogênico ou séptico com hipotensão refratária e baixa resistência periférica.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 1 mg/mL (1:1000) ou 0,1 mg/mL (1:10.000) conforme apresentação institucional.',
        dose: 'PCR E.V./I.O.: 1 mg a cada 3–5 min. Anafilaxia I.M.: 0,3–0,5 mg; repetir a cada 5–15 min se persistir.',
        administration: 'E.V./I.O. na PCR; I.M. na anafilaxia.',
        notes: 'Registrar hora, dose, via e resposta hemodinâmica.',
      },
      pediatrico: {
        presentation: 'Ampolas 4 mL: 1 mg/mL',
        administration: 'E.V.',
        diluent: 'PCR: SF 0,9%, SG 5%. Anafilaxia: sem diluente.',
        finalConcentration: 'PCR: 0,1 mg/mL (diluir uma ampola até 10 mL). Anafilaxia: 0,01 mg/kg.',
        infusionRate: 'Push.',
        dose: '0,05–1 µg/kg/min, dose máxima: 2 µg/kg/min. Adultos: iniciar 4 µg/min; infusão 8–12 µg/min',
        notes: 'Oxida rapidamente; não utilizar se apresentar coloração marrom. Não se recomenda diluir em solução fisiológica. Os efeitos da noradrenalina podem aumentar com antidepressivos tricíclicos, anti-histamínicos e betabloqueadores.',
      },
      neonatal: {
        presentation: 'Ampola 0,1 mg/mL (1:10.000) preferida para neonatos quando disponível.',
        dose: 'RCP neonatal: 0,01–0,03 mg/kg E.V./I.O./endotraqueal conforme algoritmo NRP vigente.',
        administration: 'Via umbilical, periférica ou outro acesso conforme situação.',
      },
    },
    stability: '## Guia pediátrica\n\n- Degrada rapidamente. Não usar se a solução estiver descolorida ou precipitada. Descartar o sobrante.\n\n## Geral\n\n- Proteger da luz. Conservar entre 15 e 30 °C.',
    adverseEffects: '## Efeitos adversos\n\nHipertensão, necrose, bradicardia. Uso prolongado: diminuição do débito cardíaco, depleção do volume plasmático, vasoconstrição periférica e visceral grave. Cardiomiopatia por estresse.',
    bibliography: [BIB.garrahan('NORadrenalina', ' (cód. 1401, ATC C01CA)'), BIB.pedGuide, BIB.aha, BIB.aapPals, BIB.wao],
  },
  {
    id: 'ade-001', name: 'Adenosina', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Reversão rápida ao ritmo sinusal em taquicardias supraventriculares paroxísticas. Auxilia no diagnóstico de taquicardias supraventriculares de complexos largos ou estreitos.',
    indications: `${MAIN}\n\nReversão rápida ao ritmo sinusal em taquicardias supraventriculares paroxísticas. Auxilia no diagnóstico de taquicardias supraventriculares de complexos largos ou estreitos.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 3 mg/mL.', dose: '6 mg E.V. em bolus rápido, depois 12 mg se persistir (máx. 30 mg).', administration: 'E.V. proximal com flush de 20 mL.' },
      pediatrico: {
        presentation: 'Ampolas 2 mL: 3 mg/mL',
        administration: 'E.V.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '3 mg/mL.',
        infusionRate: 'Push com lavagem imediata de 5–10 mL de SF (técnica de duas seringas).',
        dose: 'Inicial: 50–100 µg/kg (dose máxima: 6 mg); se não houver resposta, após 2 min administrar segunda dose de 200 µg/kg e repetir até máximo de 0,5 mg/kg/dose em crianças ou 0,3 mg/kg/dose em neonatos, ou até ritmo sinusal (máximo: 12 mg/dose ou 30 mg total).',
        notes: 'Evitar chá, cola, café ou cacau e chocolate por pelo menos 12 horas antes da administração.',
      },
      neonatal: { dose: '0,05–0,1 mg/kg em bolus conforme protocolo.', administration: 'E.V. com flush.' },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante após aberto.\n\n## Geral\n\n- Usar sem diluição; administrar imediatamente.',
    adverseEffects: '## Efeitos adversos\n\nEmbora a incidência de efeitos adversos seja relativamente elevada, são sumamente transitórios devido à curta meia-vida (<10 s): dor torácica, rubor facial (flush) e hipotensão. Bradicardia e arritmias transitórias: bloqueio AV, complexos auriculares prematuros, fibrilação auricular e taquicardia ventricular não sustentada; dispneia, hiperventilação, tosse e broncoespasmo; tontura, cefaleia, tremor, visão borrada e hipertensão endocraniana; náuseas, sabor metálico e desconforto gastrointestinal.',
    bibliography: [BIB.garrahan('Adenosina', ' (cód. 1181, ATC C01EB)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'met-001', name: 'Metronidazol', version: '1.2.3', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico nitroimidazólico e antiparasitário. Ativo contra anaeróbios e protozoários.',
    indications: `${MAIN}\n\nAntibiótico nitroimidazólico e antiparasitário. Ativo contra anaeróbios e protozoários.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachê 500 mg em 100 mL (Metronidazol Norgreen, Rivero, Ugar).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 5 mg/mL.',
        finalConcentration: '5 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Administrar em 60 min.',
      },
      pediatrico: {
        presentation: 'Comprimidos, xarope, ampolas E.V.',
        administration: 'V.O.; E.V.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '60 min.',
        dose: 'Infecções anaeróbicas (V.O.; E.V.): 30 mg/kg/dia a cada 8 h, dose máxima: V.O.: 2 g; E.V.: 4 g. Amebíase: 35 mg/kg/dia a cada 8 h por 10 dias.',
        notes: 'Evitar bebidas alcoólicas durante o tratamento e até 48 h após. Precaução com varfarina.',
      },
      neonatal: { dose: '7,5 mg/kg/dose a cada 12 h (UCIN).', administration: 'E.V./V.O.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- Não especificado.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, sabor metálico, neuropatia periférica em tratamentos prolongados, reações de hipersensibilidade.',
    bibliography: [BIB.garrahan('metroNIDAZOL', ' (ATC J01XD)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
];

for (const drug of drugs) {
  fs.writeFileSync(
    path.join(OUT, `${drug.id}.json`),
    `${JSON.stringify({ ...drug, branch: 'atencion-sanitaria', translationReviewed: true }, null, 2)}\n`,
    'utf8',
  );
  console.log(`✓ ${drug.id}`);
}
console.log(`\npt-BR Garrahan lote 20 (parte A): ${drugs.length}`);
