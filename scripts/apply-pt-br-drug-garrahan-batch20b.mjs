#!/usr/bin/env node
/** Garrahan re-tradução lote 20 — 15 monografias pt-BR (parte B) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/farmacologia/drugs');

const ADJUST = '> Ajustar conforme protocolo institucional e prescrição médica.';
const MAIN = '## Indicações principais';
const SPEC = 'USO EXCLUSIVO DO ESPECIALISTA.';

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
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Diretrizes clínicas.', url: 'https://www.idsociety.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'mid-001', name: 'Midazolam', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Indutor do sono e da anestesia geral. Em estado de mal epiléptico pode ser alternativa a outras benzodiazepinas.',
    indications: `${MAIN}\n\nIndutor do sono e da anestesia geral. Em estado de mal epiléptico pode ser alternativa a outras benzodiazepinas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 5 mg/mL.', dose: 'Bolus 1–2 mg E.V.; sedação contínua 0,02–0,1 mg/kg/h.', infusionRate: 'Perfusão titulada em bomba.', administration: 'E.V. lenta ou infusão contínua.' },
      pediatrico: {
        presentation: 'Comprimidos: 7,5–15 mg; Ampolas 3 mL: 5 mg/mL',
        administration: 'V.O.; E.V.; I.M.; Retal; I.N.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '5 mg/mL (pode administrar-se puro).',
        infusionRate: 'Infusão contínua conforme indicação. Bolo E.V. em 2–5 min. I.N. em 15 s.',
        dose: 'Sedação consciente: 0,05–0,2 mg/kg/dose. Sedação para procedimento V.O.: 0,1–0,2 mg/kg/dose 30–45 min antes do procedimento, dose máxima: 15 mg. Estado de mal epiléptico, intubação endotraqueal, ventilação mecânica (E.V.–I.M.–Retal): 0,1–0,3 mg/kg/dose; (infusão contínua): <50 kg: 0,05 mg/kg/h, ≥50 kg: 2 mg/h.',
        notes: 'Ver guia preliminar para prevenção de teratogênese por medicamentos. Ver guia prática para manejo de analgosedação e seu desmame em unidades de cuidados intermediários e moderados.',
      },
      neonatal: { dose: 'Sedação UCIN: 0,03–0,06 mg/kg/h (protocolo).', administration: 'E.V. em bomba.' },
    },
    stability: '## Geral\n\n- Diluição 24 h conforme bula.\n\n## Guia pediátrica\n\n- 24 h após diluído.',
    adverseEffects: '## Efeitos adversos\n\nCefaleia, tontura, depressão cardiorrespiratória, dor no local da injeção.',
    bibliography: [BIB.garrahan('MIDAzolam', ' (cód. 0142, ATC N05CD)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'fnt-001', name: 'Fentanil', version: '1.1.4', updatedAt: '2026-07-10',
    executiveSummary: 'Anestésico opioide geral, mecanismo de ação semelhante à morfina. Coadjuvante da anestesia geral.',
    indications: `${MAIN}\n\nAnestésico opioide geral, mecanismo de ação semelhante à morfina. Coadjuvante da anestesia geral.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 50 mcg/mL.', dose: 'Bolus 25–100 mcg E.V.; infusão 0,5–2 mcg/kg/h.', administration: 'E.V. lenta ou infusão.' },
      pediatrico: {
        presentation: 'Ampolas: 0,05 mg/mL',
        administration: 'E.V.; Peridural',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '50 mcg/mL.',
        infusionRate: 'Push em pelo menos 30 s.',
        dose: '1–12 anos: 1–2 µg/kg/dose; >12 anos e adultos: 0,5–1 µg/kg/dose. Intubação endotraqueal: 5–10 µg/kg. Pacientes em ventilação mecânica: infusão contínua: <50 kg: 1 µg/kg/h, ≥50 kg: 50 µg/h.',
        notes: `${SPEC} Se administrado em gotejamento puro, proteger da luz. Push: administrar em 3–5 min. A sobredose pode ser tratada com naloxona. Equivalência analgésica: 1 µg de fentanil = 0,1 mg de morfina. Ver guia prática para manejo de analgosedação e seu desmame em unidades de cuidados intermediários e moderados.`,
      },
      neonatal: { dose: '0,5–2 mcg/kg em bolus; infusão conforme escala de dor da UCIN.', administration: 'E.V. em bomba.' },
    },
    stability: '## Geral\n\n- Diluição 24 h conforme bula.\n\n## Guia pediátrica\n\n- 24 h após diluído.',
    adverseEffects: '## Efeitos adversos\n\nApneia, bradicardia, tórax rígido ou em madeira. Ver seção de analgésicos opioides.',
    bibliography: [BIB.garrahan('fentaNILo Citrato', ' (cód. 0337, ATC N01AH)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'rem-001', name: 'Remifentanil', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Anestésico opioide coadjuvante da anestesia geral. Início e metabolização rápidos.',
    indications: `${MAIN}\n\nAnestésico opioide coadjuvante da anestesia geral. Início e metabolização rápidos.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco 1–5 mg.', dose: '0,05–0,2 mcg/kg/min em infusão.', administration: 'E.V. contínua exclusivamente.' },
      pediatrico: {
        dose: '0,5 µg/kg em bolus em 30 min. Manutenção: 0,1–0,3 µg/kg/min',
        administration: 'E.V.',
        presentation: 'Pó liofilizado: 5 mg',
        notes: `${SPEC} Não administrar por via epidural ou intratecal (a glicina da formulação pode causar neurotoxicidade).`,
      },
      neonatal: { dose: 'Uso na UCIN conforme protocolo anestésico/neonatal.', administration: 'E.V.' },
    },
    stability: '## Estabilidade\n\n- Reconstituir conforme bula; usar em 24 h.',
    adverseEffects: '## Efeitos adversos\n\nApneia, náuseas, bradiarritmia, hipotensão, depressão respiratória. Maior frequência de tórax em madeira. Ver seção de analgésicos opioides.',
    bibliography: [BIB.garrahan('REMIentanil*', ' (cód. 1352, ATC N01AH)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ket-001', name: 'Cetamina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anestésico dissociativo. Analgesia.',
    indications: `${MAIN}\n\nAnestésico dissociativo. Analgesia.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 50 mg/mL.', dose: 'Analgesia: 0,1–0,3 mg/kg em bolus ou 0,12–0,36 mg/kg/h. Indução: 1–2 mg/kg E.V.', administration: 'E.V. lenta ou infusão.' },
      pediatrico: {
        presentation: 'FA 10 mL: 50 mg/mL',
        administration: 'E.V.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '50 mg/mL em bolus. 2 mg/mL intermitente ou infusão contínua.',
        infusionRate: 'Bolo em 1 min.',
        dose: 'Indução anestésica: E.V.: 1–2 mg/kg em bolus; I.M.: 5 mg/kg; infusão contínua: 0,25–2 mg/kg/h. Analgesia de pele, músculo e osso: 0,5–1 mg/kg. Intubação endotraqueal: 2–3 mg/kg',
        compatibility: 'Precipita com diazepam.',
        notes: 'Com nalbufina: diminui o efeito analgésico e alucinações. Com hormônios tireoidianos: taquicardia e hipertensão. Contraindicações: hipertensão intracraniana, lesão ocular traumática e hipertensão pulmonar. Concentração de administração: 1–10 mg/mL em SG 5% ou SF. Ver guia preliminar para prevenção de teratogênese. Ver preparações padronizadas de analgosedação na UTI pediátrica.',
      },
      neonatal: { dose: 'Uso na UCIN conforme protocolo de sedação/analgesia.', administration: 'E.V.' },
    },
    stability: '## Geral\n\n- Usar imediatamente após diluição, se aplicável.\n\n## Guia pediátrica\n\n- 10 dias refrigerado; depois descartar.',
    adverseEffects: '## Efeitos adversos\n\nHipertensão intracraniana, sialorreia, alucinações auditivas e visuais. Uso crônico: taquicardia, hipertensão, hipotensão, dilatação gástrica.',
    bibliography: [BIB.garrahan('Cetamina Cloridrato', ' (cód. 0125, ATC N01AX)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vec-001', name: 'Vecurônio', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Bloqueador neuromuscular de ação intermediária indicado para pacientes com instabilidade hemodinâmica em suporte inotrópico.',
    indications: `${MAIN}\n\nIndicado para pacientes com instabilidade hemodinâmica em suporte inotrópico. Bloqueador neuromuscular de ação intermediária.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco 4 mg liofilizado.', dose: '0,08–0,1 mg/kg em bolus; 0,8–1,2 mcg/kg/min em infusão.', administration: 'E.V.' },
      pediatrico: {
        presentation: 'Pó liofilizado: 10 mg',
        reconstitution: 'Habitualmente com 10 mL (1 mg/mL); em restrição hídrica, diluição mínima 5 mL (2 mg/mL).',
        administration: 'E.V.',
        diluent: 'SF 0,9%, SG 5% ou 10%, Ringer.',
        finalConcentration: '2 mg/mL.',
        dose: '0,1 mg/kg em bolus; manutenção: 0,05 mg/kg conforme necessidade. Reduzir dose em insuficiência hepática. Infusão contínua: 0,05–0,15 mg/kg/h',
        notes: `${SPEC} Usar com precaução em doenças neuromusculares, miopatias e colestase. Contraindicado em insuficiência renal (bloqueio prolongado). Bloqueio prolongado por aminoglicosídeos, clindamicina, sulfato de magnésio, colistina, anestésicos inalatórios e drogas depletoras de potássio; diminuído por azatioprina e teofilina. Infusão contínua: diluir até concentração máxima de 1 mg/mL. Ver preparações padronizadas de analgosedação na UTI pediátrica.`,
      },
      neonatal: { dose: '0,1 mg/kg em bolus; infusão na UCIN conforme TOF.', administration: 'E.V.' },
    },
    stability: '## Geral\n\n- Reconstituir e usar conforme bula.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nApneias. Semelhante ao pancurônio.',
    bibliography: [BIB.garrahan('Vecurônio Brometo*', ' (cód. 0638, ATC M03AC)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pnc-001', name: 'Pancurônio', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Relaxante muscular não despolarizante de ação periférica.',
    indications: `${MAIN}\n\nRelaxante muscular não despolarizante de ação periférica.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 2 mg/mL.', dose: '0,08–0,12 mg/kg em bolus; repetir conforme TOF.', administration: 'E.V.' },
      pediatrico: {
        dose: '0,05–0,1 mg/kg/dose. Infusão contínua: 0,03–0,1 mg/kg/h. Intubação endotraqueal: 0,1–0,2 mg/kg. Ajustar dose em insuficiência renal e hepática.',
        administration: 'E.V.',
        presentation: 'Ampolas 2 mL: 2 mg/mL',
        notes: `${SPEC} Usar com precaução em doenças neuromusculares, miopatias e colestase. Contraindicado em insuficiência renal. Bloqueio prolongado por aminoglicosídeos, clindamicina, sulfato de magnésio, colistina, anestésicos inalatórios e drogas depletoras de potássio; diminuído por azatioprina e teofilina.`,
      },
      neonatal: { dose: '0,05–0,1 mg/kg conforme protocolo.', administration: 'E.V.' },
    },
    stability: '## Estabilidade\n\n- Pronto para uso.',
    adverseEffects: '## Efeitos adversos\n\nApneia. Pode ocasionalmente favorecer liberação de histamina. Efeito vagolítico.',
    bibliography: [BIB.garrahan('Pancurônio Brometo*', ' (cód. 0160, ATC M03AC)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mil-001', name: 'Milrinona', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Agente inotrópico positivo que melhora a função diastólica. Inibidor da fosfodiesterase.',
    indications: `${MAIN}\n\nAgente inotrópico positivo que melhora a função diastólica. Inibidor da fosfodiesterase.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou SF 0,9%.',
        diluent: 'SG 5% ou SF 0,9%.',
        finalConcentration: 'Conforme cartilha do serviço (bomba de infusão).',
        dose: 'Dose de ataque opcional 50 mcg/kg em 10 min, depois 0,375–0,75 mcg/kg/min.',
        infusionRate: 'Bolus lento se usar dose de ataque.',
        administration: 'E.V. contínua em bomba; via central preferida.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'FA 10 mL: 1 mg/mL',
        administration: 'E.V.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '≤0,5 mg/mL para infusão contínua.',
        dose: 'Dose de ataque: 50 µg/kg em 15 min; manutenção: 0,25–0,75 µg/kg/min; dose máxima em adultos: 1,13 mg/kg/dia. Pode ser necessário reduzir velocidade em insuficiência renal. Ajustar dose em recém-nascidos.',
        notes: 'Requer monitorização clínica. Incompatível com furosemida. Infusão contínua: diluir em SG 5% ou SF; concentração usual <200 µg/mL. Não infundir por mais de 48 h.',
      },
    },
    stability: '## Geral\n\n- Diluição 24 h refrigerada conforme bula.\n\n## Guia pediátrica\n\n- 24 h após diluído.',
    adverseEffects: '## Efeitos adversos\n\nArritmias ventriculares, hipotensão, cefaleia, hipocalemia.',
    bibliography: [BIB.garrahan('MILRinona', ' (cód. 1452, ATC C01CE)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'glc-001', name: 'Glucagon', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento e estudo da hipoglicemia. Agente hiperglicemiante que mobiliza glicogênio hepático liberado na circulação como glicose.',
    indications: `${MAIN}\n\nTratamento e estudo da hipoglicemia. Agente hiperglicemiante que mobiliza glicogênio hepático liberado na circulação como glicose.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco 1 mg.', dose: '1 mg I.M./S.C./E.V. lento; repetir em 15 min se persistir.', administration: 'I.M./S.C./E.V.' },
      pediatrico: {
        dose: '<1 mês: 20 µg/kg; 1 mês a 2 anos: 500 µg; >2 anos: <20 kg: 500 µg, ≥20 kg: 1 mg',
        administration: 'S.C.; I.M.; E.V.',
        presentation: 'FA: 1 mg (1 U.I.)',
        notes: 'Não usar com anticolinérgicos. Precaução em insulinoma ou glucagonoma. Interações: antagoniza insulina; aumenta efeito anticoagulante da varfarina; efeito diminuído pela indometacina; aumento transitório de pulso e pressão arterial com betabloqueadores.',
      },
      neonatal: { dose: '0,03–0,1 mg/kg I.M./S.C./E.V. conforme protocolo.', administration: 'I.M./S.C./E.V.' },
    },
    stability: '## Estabilidade\n\n- Reconstituir no momento do uso.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, diarreia, hipocalemia.',
    bibliography: [BIB.garrahan('Glucagon Cloridrato', ' (cód. 0108, ATC H04AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ipr-001', name: 'Brometo de ipratrópio', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antimuscarínico anticolinérgico broncodilatador.',
    indications: `${MAIN}\n\nAntimuscarínico anticolinérgico broncodilatador.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Nebulização 0,25–0,5 mg; inalador dosimetrado.', dose: '0,5 mg nebulização a cada 6–8 h; combinar com salbutamol na crise.', administration: 'Nebulização.' },
      pediatrico: {
        dose: 'Broncoespasmo: Aerossol: 3–14 anos: 1–2 jatos 3 vezes ao dia até 6 jatos/dia; adultos: 2 jatos 4 vezes ao dia até 12 jatos/dia. Solução para nebulizar: neonatos: 25 µg/kg/dose a cada 8 h; lactentes e crianças: 125–250 µg 3 vezes ao dia; >12 anos e adultos: 500 µg 3–4 vezes ao dia.',
        administration: 'Inalatória',
        presentation: 'Aerossol: 20 µg/dose; Solução para nebulizar: 0,25 mg/mL (12,5 µg/gota)',
        notes: 'Não recomendado para menores de 12 anos (aerossol). Início de ação mais lento que beta-adrenérgicos.',
      },
      neonatal: { dose: '0,25 mg nebulização conforme protocolo respiratório da UCIN.', administration: 'Nebulização.' },
    },
    stability: '## Estabilidade\n\n- Mistura com salbutamol estável durante o turno.',
    adverseEffects: '## Efeitos adversos\n\nBoca seca, tosse, exacerbação de sintomas, irritação local, retenção urinária, constipação.',
    bibliography: [BIB.garrahan('Ipratrópio', ' (cód. 0473, ATC R03BB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'esm-001', name: 'Esmolol', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Betabloqueador seletivo. Hipertensão arterial pós-reparo de coarctação, crises de dispneia e cianose, taquiarritmia auricular ectópica.',
    indications: `${MAIN}\n\nBetabloqueador seletivo. Hipertensão arterial pós-reparo de coarctação, crises de dispneia e cianose, taquiarritmia auricular ectópica.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 2500 mg/10 mL.', dose: 'Ataque 0,5 mg/kg em 1 min, depois 50–300 mcg/kg/min.', administration: 'E.V. em bomba.' },
      pediatrico: {
        dose: 'Ataque: 0,5–0,6 mg/kg em 2–4 min, seguido de infusão 0,1–0,2 mg/kg/min',
        administration: 'E.V.',
        presentation: 'Ampolas 10 mL: 250 mg/mL',
        notes: 'Meia-vida de eliminação: 9 min. Pode aumentar concentrações séricas de digoxina e teofilina. Morfina pode aumentar concentração sérica do esmolol. Ampola 250 mg/mL não pode ser administrada diretamente; diluir até 10 mg/mL em SF ou SG 5%.',
      },
    },
    stability: '## Estabilidade\n\n- Usar em até 24 h após preparação.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, tontura, fadiga, cefaleia.',
    bibliography: [BIB.garrahan('Esmolol*', ' (cód. 1362, ATC C07AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'lab-001', name: 'Labetalol', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Agente bloqueador alfa e beta.',
    indications: `${MAIN}\n\nAgente bloqueador alfa e beta.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 5 mg/mL.', dose: '10–20 mg E.V. em bolus a cada 10 min; infusão 0,5–2 mg/min.', administration: 'E.V. lenta ou infusão.' },
      pediatrico: {
        presentation: 'Comprimidos: 200 mg; Ampolas 4 mL: 5 mg/mL',
        administration: 'E.V.; V.O.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: 'Bolus: 5 mg/mL. Infusão contínua: 1 mg/mL.',
        infusionRate: 'Bolus em 2–3 min ou infusão contínua.',
        dose: 'Crise hipertensiva: Infusão E.V.: crianças: dose de ataque 0,2–1 mg/kg/dose em 2–3 min (máximo 2 mg/min) até 40 mg. Repetir a cada 10 min até máximo 3–4 mg/kg ou 300 mg. Infusão contínua: 0,25–3 mg/kg/h (neonatos: iniciar 0,5 mg/kg/h). Adultos: 0,3–1 mg/kg/dose de ataque, até 20 mg a cada 2 min; 40–80 mg a cada 10 min até 300 mg acumulados. Sem ajuste em insuficiência renal, HD ou DP. Reduzir dose em insuficiência hepática (~50% da habitual).',
        notes: 'Para infusão contínua, diluir em SF ou SG 5%. Pode administrar-se sem diluir em restrição hídrica. Evitar em insuficiência hepática.',
      },
    },
    stability: '## Geral\n\n- Usar diluição fresca para infusão.\n\n## Guia pediátrica\n\n- Descartar sobrante após aberto. Diluição estável 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nBroncoespasmo, hepatotoxicidade, hipercalemia, arritmia ventricular.',
    bibliography: [BIB.garrahan('Labetalol Cloridrato*', ' (cód. 1804, ATC C07AG)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hct-001', name: 'Hidroclorotiazida', version: '1.0.3', updatedAt: '2026-07-10',
    executiveSummary: 'Diurético tiazídico. Hipertensão arterial, edemas e diabetes insípida nefrogênica.',
    indications: `${MAIN}\n\nDiurético tiazídico. Hipertensão arterial, edemas e diabetes insípida nefrogênica.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 12,5–25 mg.', dose: '12,5–50 mg V.O. a cada 24 h pela manhã.', administration: 'V.O.' },
      pediatrico: {
        dose: 'Neonatos e lactentes <6 meses: 2–4 mg/kg/dia a cada 12 h; dose máxima: 37,5 mg/dia. Lactentes >6 meses e crianças: 2 mg/kg/dia a cada 12 h; dose máxima: 100 mg/dia.',
        administration: 'V.O.',
        presentation: 'Comprimidos 12,5–25 mg',
        notes: 'Administrar com alimentos. AINEs diminuem efeito anti-hipertensivo. Com anfotericina B aumenta perda de potássio.',
      },
      neonatal: { dose: '2–4 mg/kg/dia a cada 12 h; máximo 37,5 mg/dia.', administration: 'V.O.' },
    },
    stability: '## Estabilidade\n\n- Comprimidos conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, cefaleia, tontura, hipocalemia, hiperglicemia, hiperlipidemia, hiperuricemia, náuseas, vômitos, diarreia, fraqueza muscular, fotossensibilidade.',
    bibliography: [BIB.garrahan('hidroCLOROtiazida', ' (ATC C03AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pol-001', name: 'Polimixina B', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Descolonização pré-operatória em pacientes com intestino curto, associada ao metronidazol V.O.',
    indications: `${MAIN}\n\nDescolonização pré-operatória em pacientes com intestino curto, associada ao metronidazol V.O.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 500.000 U.I. ou 1 milhão U.I.', dose: '1,5–2,5 mg/kg/dia E.V. divididos a cada 12 h (converter U.I. em mg conforme bula).', infusionRate: 'Perfusão lenta.', administration: 'E.V.' },
      pediatrico: { dose: '10–20 mg/kg/dia a cada 6–8 h por 5 dias.', administration: 'V.O.', presentation: 'Preparação magistral: cápsulas', notes: 'Contraindicada em hipersensibilidade às polimixinas.' },
      neonatal: { dose: 'Dose conforme protocolo da UCIN; uso de reserva.', administration: 'E.V.' },
    },
    stability: '## Estabilidade\n\n- Usar após diluição conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nIrritabilidade, ataxia, parestesia perioral, nefrotoxicidade.',
    bibliography: [BIB.garrahan('Polimixina B Sulfato', ' (cód. 0486, ATC J01XB)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'dig-001', name: 'Digoxina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Glicosídeo cardíaco. Insuficiência cardíaca (efeito inotrópico positivo e cronotrópico negativo).',
    indications: `${MAIN}\n\nGlicosídeo cardíaco. Insuficiência cardíaca (efeito inotrópico positivo e cronotrópico negativo).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 0,25 mg. Ampola 0,25 mg/mL.', dose: 'Ataque E.V. 0,25–0,5 mg; manutenção V.O. 0,125–0,25 mg/dia conforme função renal.', administration: 'V.O. ou E.V. lenta (diluída conforme protocolo).' },
      pediatrico: {
        dose: 'Digitalização rápida (E.V.): RN a termo: 0,02–0,04 mg/kg/dia; RN pré-termo: 0,015–0,025 mg/kg/dia; 1 mês a 2 anos: 0,025–0,05 mg/kg/dia; >2 anos: 0,03–0,04 mg/kg/dia; adolescentes: 0,01–0,015 mg/kg/dia. Máximo: 1 mg. (V.O.): aumentar 20%. Esquema: 50% no início, 25% em 6–8 h, 25% restante em 12–16 h. Em pacientes previamente digitalizados usar metade da dose. Manutenção (V.O.): RN a termo: 0,01 mg/kg/dia (½ gota/kg/dia Lanoxin); 1 mês–2 anos: 0,01–0,015 mg/kg/dia (¾ gota/kg/dia Lanoxin); >2 anos: 0,01 mg/kg/dia (½ gota/kg/dia Lanoxin); adolescentes: 0,005 mg/kg/dia (máximo 0,25 mg/dia). Ver tabela de ajuste em insuficiência renal (boletim CIME)',
        administration: 'V.O.; E.V.',
        presentation: 'Comprimidos: 0,25 mg; Gotas: 750 mcg/mL (gotas/mg variam conforme marca); Ampolas 1 mL: 0,25 mg/mL',
        notes: 'Diuréticos depletores de potássio aumentam risco de intoxicação digitálica. Níveis podem aumentar com amiodarona (reduzir dose ~50% e monitorar), flecainida, propafenona, espironolactona, eritromicina, verapamil. Corticoides aumentam risco de hipocalemia. Faixa terapêutica: 0,8–2 ng/mL. Níveis >2 ng/mL associados à toxicidade. Reduzir dose em insuficiência renal. E.V.: puro ou diluído 1:4 em SG 5% ou SF em >5 min. Contraindicada em cardiomiopatia hipertrófica obstrutiva. Marcas comerciais diferem em droga por gota. Manter frasco bem fechado.',
      },
      neonatal: { dose: 'Doses neonatais conforme protocolo cardiológico e níveis séricos.', administration: 'E.V. lenta.' },
    },
    stability: '## Estabilidade\n\n- Ampolas: usar após diluição conforme protocolo institucional.',
    adverseEffects: '## Efeitos adversos\n\nVômitos, tontura, diarreia, visão borrada, aumento da diurese, sudorese fria, convulsões, bloqueio AV, arritmias.',
    bibliography: [BIB.garrahan('diGOXina', ' (cód. 0073, ATC C01AA)'), BIB.aha, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'vit-001', name: 'Fitomenadiona (vitamina K)', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anti-hemorrágica em intoxicações por derivados do dicumarol, varfarina, etc. Deficiência dos fatores de coagulação II, VII, IX e X. Manifestações hemorrágicas.',
    indications: `${MAIN}\n\nAnti-hemorrágica em intoxicações por derivados do dicumarol, varfarina, etc. Deficiência dos fatores de coagulação II, VII, IX e X. Manifestações hemorrágicas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10 mg/mL.', dose: 'Sangramento por varfarina: 5–10 mg E.V. lento.', administration: 'E.V. lento, I.M. ou V.O.' },
      pediatrico: {
        presentation: 'Ampolas: 1 mg/0,5 mL – 10 mg/mL; Comprimidos: 10 mg',
        administration: 'V.O.; I.M.; E.V.',
        diluent: 'SF 0,9% ou SG 5%. Diluir em 5 ou 10 mL.',
        infusionRate: 'Não administrar em bolus.',
        dose: 'RN saudável: 0–1 ano: 5–10 µg; 1–10 anos: 15–30 µg; >11 anos: 45–80 µg. Intoxicações: 1 mg/kg/dia a cada 8 h, máximo 10 mg. Deficiência de protrombina: lactentes: 2 mg; crianças maiores: 5–10 mg. Deficiência por fármacos: V.O.: 2,5–5 mg/dia.',
        notes: 'Push E.V. não deve exceder 1 mg/min. Absorção oral depende de sais biliares. Contraindicada em deficiência de G6PD. Em lesão hepática não exceder níveis terapêuticos. Monitorar com tempo de protrombina. Ampolas Konakion(R) podem ser administradas V.O. Ver tabela de polivitamínicos.',
      },
      neonatal: { dose: '1 mg I.M. ao nascer (profilaxia padrão).', administration: 'I.M. profunda.' },
    },
    stability: '## Geral\n\n- Proteger da luz.\n\n## Guia pediátrica\n\n- Descartar sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\nCefaleia, tontura, movimentos convulsivos, náuseas, vômitos, eritema, urticária, rash, erupções, disgeusia, icterícia. Hemólise no recém-nascido, corpúsculos de Heinz.',
    bibliography: [BIB.garrahan('Vitamina K (Fitomenadiona)', ' (cód. 0225, ATC B02BA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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
console.log(`\npt-BR Garrahan lote 20 (parte B): ${drugs.length}`);
