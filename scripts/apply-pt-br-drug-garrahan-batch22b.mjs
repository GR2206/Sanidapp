#!/usr/bin/env node
/** Garrahan re-tradução lote 22 — 10 monografias pt-BR (parte B) */
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
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
};

const drugs = [
  {
    id: 'cef-005', name: 'Ceftriaxona', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Cefalosporina de terceira geração. Tratamento de sepse, meningite, infecções do trato respiratório inferior, pele e tecidos moles, ósseas, por bactérias gram-negativas aeróbias e algumas gram-positivas. Profilaxia para IST (Neisseria gonorrhoeae).',
    indications: `${MAIN}\n\nCefalosporina de terceira geração. Tratamento de sepse, meningite, infecções do trato respiratório inferior, pele e tecidos moles, ósseas, por bactérias gram-negativas aeróbias e algumas gram-positivas. Profilaxia para IST (Neisseria gonorrhoeae).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 1 g (Drawer, FABRA, Pharmavial, Acantex, Ceftriaz, Exemple, Norgreen, Bioteral).',
        reconstitution: '10 mL de AD. Conc: 100 mg/mL.',
        diluent: '1 g em 100 mL de SF ou SG 5%. Passar em 30–60 min.',
        finalConcentration: '10 mg/mL.',
        administration: 'I.M.: Sim. E.V. direta: Sim. Reconst. 1 g em 9,6 mL de AD e passar em 2–4 min (exceto marca Norgreen: NÃO). E.V. intermitente: Sim.',
        notes: 'Não injetar mais de 1 g por via I.M. Sem lidocaína esta via é dolorosa. É incompatível e não deve ser misturada com vancomicina, fluconazol e aminoglicosídeos.',
      },
      pediatrico: {
        presentation: 'F.A. Liof.: 1000 mg',
        administration: 'E.V.; I.M.',
        diluent: 'AD, SF 0,9%, SG 5%.',
        finalConcentration: 'Entre 10 mg/mL e 40 mg/mL.',
        infusionRate: 'Não menor que 30 min.',
        dose: 'Crianças: Infecções leves e moderadas: 50–75 mg/kg/dia, a cada 24 h. Infecções graves, sepse, meningite, neutropenia: 100 mg/kg/dia, a cada 24 h. Dose máxima: 2 g (SNC: 4 g em 2 doses). Adultos: 1–2 g a cada 24 h. Dose pré-operatória adultos: 1 g. Profilaxia para IST: Crianças: I.M. 250 mg dose única; adolescentes e adultos: I.M.: 500 mg/dose, dose única.',
        notes: 'Eliminação renal e biliar. Ajustar dose com clearance de creatinina < 10 mL/min. Não se aconselha seu uso em neonatos por deslocar a bilirrubina de sua ligação com a albumina. Em R.N. contraindicada a administração simultânea de soluções que contenham cálcio (aguardar 48 h desde a última dose de cefTRIAXona). Precipita em pulmões e rins de R.N. prematuros e a termo, casos de reações fatais.',
      },
      neonatal: {
        dose: '50 mg/kg/dose a cada 24 h (meningite: esquemas específicos UCIN).',
        administration: 'E.V.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 6 h em temperatura ambiente e 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente e 72 h refrigerado.\n\n## Guia pediátrica\n\n- 3 dias em temperatura ambiente e 10 dias na geladeira a 4 °C.',
    adverseEffects: '## Efeitos adversos\n\nDiarreia, leucopenia, trombocitopenia transitória, anemia hemolítica, urticária, rash, dor no local da injeção, barro biliar, febre, cefaleia, tontura, vertigem.',
    bibliography: [BIB.garrahan('CefTRIAXona', ' (cód. 0040, ATC J01DD)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-006', name: 'Cefotaxima', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Cefalosporina de terceira geração. Tratamento de infecções do trato respiratório inferior, pele e partes moles, osso, articulares, intra-abdominais, geniturinárias e sistema nervoso central por bactérias gram-negativas suscetíveis.',
    indications: `${MAIN}\n\nCefalosporina de terceira geração. Tratamento de infecções do trato respiratório inferior, pele e partes moles, osso, articulares, intra-abdominais, geniturinárias e sistema nervoso central por bactérias gram-negativas suscetíveis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola 1 g.',
        dose: '1–2 g E.V. a cada 6–8 h.',
        infusionRate: 'Perfusão 30 min.',
        administration: 'E.V.',
      },
      pediatrico: {
        presentation: 'F.A.: 500–1000 mg',
        reconstitution: 'Reconstituir com AD. Diluir em SF 0,9% ou SG 5%.',
        administration: 'E.V.; I.M.',
        finalConcentration: '20 a 60 mg/mL (pode ser bolo 100 mg/mL em 3 a 5 min).',
        infusionRate: '15 a 30 min com BIC.',
        dose: '< 12 anos: 100–150 mg/kg/dia a cada 6–8 h. > 12 anos e adultos: 1–2 g a cada 6–8 h, dose máxima: 12 g. Meningite: 300 mg/kg/dia a cada 6 h. Fibrose cística: 150–200 mg/kg/dia a cada 6 h, dose máxima: 12 g. Dose pré-operatória em adultos: 1 g.',
        notes: 'Precaução em pacientes com insuficiência renal. Risco aumentado de colite pseudomembranosa por C. difficile.',
      },
      neonatal: {
        dose: '50 mg/kg/dose a cada 12 h; meningite: a cada 8 h (UCIN).',
        administration: 'E.V.',
      },
    },
    stability: '## Guia pediátrica\n\n- 24 h em temperatura ambiente e 10 dias na geladeira (2 a 8 °C).',
    adverseEffects: '## Efeitos adversos\n\nNeutropenia, anemia hemolítica, cefaleias, colite pseudomembranosa, flebite no local da injeção, rash, prurido anal.',
    bibliography: [BIB.garrahan('cefOTAxima', ' (cód. 0037, ATC J01DD)'), BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-007', name: 'Ceftazidima', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Cefalosporina de terceira geração. Tratamento de infecções do trato respiratório inferior, pele e partes moles, ósseas, articulares, intra-abdominais, geniturinárias e sistema nervoso central por bactérias gram-negativas suscetíveis, incluindo Pseudomonas.',
    indications: `${MAIN}\n\nCefalosporina de terceira geração. Tratamento de infecções do trato respiratório inferior, pele e partes moles, ósseas, articulares, intra-abdominais, geniturinárias e sistema nervoso central por bactérias gram-negativas suscetíveis, incluindo Pseudomonas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 1 g (Ceftazidima Northia).',
        reconstitution: '10 mL de AD. Conc: 100 mg/mL.',
        diluent: 'Reconst. 1 g com 10 mL de AD, diluir em 50–100 mL e administrar em 15–30 min.',
        administration: 'E.V. direta: Sim. Reconst. 1 g em 10 mL de AD e administrar em 3–5 min. E.V. intermitente: Sim.',
        notes: 'Irritante. Atenção na reconstituição porque se desprende CO₂ (eliminar as bolhas antes da administração). Existe risco de flebite ao usar a via E.V. direta. É possível a administração I.M.',
      },
      pediatrico: {
        presentation: 'F.A.: 500–1000 mg',
        reconstitution: 'Água destilada para reconstituição.',
        administration: 'E.V.',
        finalConcentration: '40 mg/mL (pode ser bolo 180 mg/mL).',
        infusionRate: '15 a 30 min com BIC.',
        dose: 'Recém-nascido: conforme idade e peso. Crianças: 100–150 mg/kg/dia a cada 8 h, dose máxima: 6 g. Adultos: 1–2 g a cada 8 h. Fibrose cística: 150–200 mg/kg/dia a cada 6 h, dose máxima: 9 g. Infecção urinária não complicada adultos: 250 mg a cada 12 h; as complicadas: 500 mg a cada 12 h.',
        notes: 'Em I.R. ajustar dose e monitorizar, risco de nefrotoxicidade em concomitância com fármacos nefrotóxicos. Em tratamento prolongado risco de superinfecção por organismo não suscetível; risco de colite pseudomembranosa.',
      },
      neonatal: {
        dose: '50 mg/kg/dose a cada 12 h (UCIN).',
        administration: 'E.V.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente e 24 h refrigerado.\n\n## Guia pediátrica\n\n- Estável 24 h em temperatura ambiente protegido da luz; 10 dias na geladeira.',
    adverseEffects: '## Efeitos adversos\n\nIntolerância local, hipersensibilidade, distúrbios gastrointestinais.',
    bibliography: [BIB.garrahan('cefTAZidima', ' (cód. 0039, ATC J01DD)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'azt-001', name: 'Aztreonam', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções graves por Gram (−) em pacientes com alergia às penicilinas.',
    indications: `${MAIN}\n\nTratamento de infecções graves por Gram (−) em pacientes com alergia às penicilinas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 1 g (Richet, Norgreen).',
        reconstitution: '10 mL de AD. Conc: 100 mg/mL.',
        diluent: '1 g em 100 mL de SF.',
        finalConcentration: '10 mg/mL.',
        administration: 'E.V. intermitente: Sim. Diluir 1 g em 100 mL de SF ou SG 5% e administrar em 20–60 min.',
        notes: 'Não administrar junto com outros medicamentos. Em caso de administração simultânea, suspender a administração do aztreonam.',
      },
      pediatrico: {
        dose: '90–120 mg/kg/dia a cada 6–8 h, dose máxima: 8 g/dia. Adultos: 1–2 g a cada 8 h. Fibrose cística: 150 mg/kg/dia a cada 8 h.',
        administration: 'E.V.',
        presentation: 'F.A.: 1 g',
        notes: 'Administrar por infusão E.V. em 20–60 minutos. Cada grama de aztreonam contém 780 mg de arginina.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 7 dias refrigerado.\n\n## Solução diluída (a administrar)\n\n- Não especificado.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, rash, convulsões, náuseas, vômitos, anorexia, dor abdominal, colite pseudomembranosa, eosinofilia, leucopenia, neutropenia, trombocitopenia.',
    bibliography: [BIB.garrahan('Aztreonam*', ' (cód. 1445, ATC J01DF)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'azt-002', name: 'Aztreonam-avibactam', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções graves por Gram (−) em pacientes com alergia às penicilinas.',
    indications: `${MAIN}\n\nTratamento de infecções graves por Gram (−) em pacientes com alergia às penicilinas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 1,5 g de aztreonam + 0,5 g de avibactam (em dois frascos separados) (Emblaveo).',
        reconstitution: 'Reconstituir cada frasco individualmente com 10 mL de AD ou SF. Conc final combinada: aztreonam 100 mg/mL + avibactam 33,3 mg/mL. Misturar ambos os frascos reconstituídos antes de diluir.',
        diluent: '1 dose em 100–250 mL de SF ou SG 5%.',
        finalConcentration: 'Conc aztreonam: ≤ 27 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Infusão em 3 horas (infusão prolongada). Dose habitual: aztreonam 6 g + avibactam 2 g/dia em 3 doses.',
        notes: 'Indicado para infecções por enterobactérias MBL (incluído NDM). Não misturar com outros medicamentos. Proteger da luz.',
      },
      pediatrico: {
        dose: '90–120 mg/kg/dia a cada 6–8 h, dose máxima: 8 g/dia. Adultos: 1–2 g a cada 8 h. Fibrose cística: 150 mg/kg/dia a cada 8 h.',
        administration: 'E.V.',
        presentation: 'F.A.: 1 g',
        notes: 'Administrar por infusão E.V. em 20–60 minutos. Cada gramo de aztreonam contém 780 mg de arginina.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Usar imediatamente. Se não for possível, máx. 1 h em temperatura ambiente ou 24 h refrigerado (sem diluir).\n\n## Solução diluída (a administrar)\n\n- 12 h em temperatura ambiente ou 24 h refrigerado uma vez diluído.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, rash, convulsões, náuseas, vômitos, anorexia, dor abdominal, colite pseudomembranosa, eosinofilia, leucopenia, neutropenia, trombocitopenia.',
    bibliography: [BIB.garrahan('Aztreonam*', ' (cód. 1445, ATC J01DF)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'dop-001', name: 'Dopamina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Efeito inotrópico positivo. Aumenta fluxos renal, coronário e cerebral. Incrementa a diurese, dose dependente.',
    indications: `${MAIN}\n\nEfeito inotrópico positivo. Aumenta fluxos renal, coronário e cerebral. Incrementa a diurese, dose dependente.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '2–20 mcg/kg/min titulado conforme resposta hemodinâmica.',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampolas de 5 mL: 40 mg/mL',
        administration: 'E.V.',
        diluent: 'SF 0,9%, Ringer ou SG 5%.',
        finalConcentration: '3,2 mg/mL (até 6 mg/mL em caso de restrição hídrica).',
        infusionRate: 'Conforme indicação médica, com BIC.',
        dose: '2–20 µg/kg/minuto por infusão contínua. Dose máxima: 50 µg/kg/minuto.',
        notes: 'Diluir com solução fisiológica ou dextrosa 5% para sua administração. Incompatível com soluções alcalinas. Os efeitos cardíacos da dopamina são antagonizados pelos beta-bloqueantes e a vasoconstrição periférica causada por altas doses de dopamina é antagonizada por bloqueantes alfa-adrenérgicos. A administração E.V. de difenilhidantoína em pacientes que estão recebendo dopamina produz hipotensão e bradicardia.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '2–10 mcg/kg/min em UCIN; monitorização estreita.',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Geral\n\n- Proteger da luz; estabilidade 24 h conforme diluição institucional.\n\n## Guia pediátrica\n\n- 24 h uma vez diluída.',
    adverseEffects: '## Efeitos adversos\n\nTaquicardia, palpitações, hipotensão, vasoconstrição, cefaleia, ansiedade, confusão, fraqueza, náuseas, vômitos, dispneia, midríase.',
    bibliography: [BIB.garrahan('DOPamina cloridrato', ' (cód. 0080, ATC C01CA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dob-001', name: 'Dobutamina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Catecolamina sintética com atividade inotrópica. Ação seletiva sobre receptores β1.',
    indications: `${MAIN}\n\nCatecolamina sintética com atividade inotrópica. Ação seletiva sobre receptores β1.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '2,5–20 mcg/kg/min titulado.',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampolas de 20 mL: 12,5 mg/mL',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '2–20 µg/kg/minuto. Dose máxima em adultos: 40 µg/kg/minuto',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Para a administração E.V. diluir em solução fisiológica ou dextrosa 5% com uma concentração máxima de 5 mg/mL. A diluição é estável 24 h. Incompatível com soluções alcalinas. Compatível com: dopamina, adrenalina, vecurônio, isoproterenol e lidocaína. Não administrar a pacientes com obstrução dinâmica de saída de ventrículo esquerdo. A coloração rosada indica leve oxidação mas não perda de potência.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '2–10 mcg/kg/min em UCIN sob prescrição especializada.',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Estabilidade\n\n- Usar em 24 h; proteger da luz conforme guia.',
    adverseEffects: '## Efeitos adversos\n\nAnsiedade, confusão, fraqueza, náuseas, vômitos, bradicardia reflexa. Arritmias e taquicardia com altas doses.',
    bibliography: [BIB.garrahan('DOBUTamina cloridrato', ' (cód. 0078, ATC C01CA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hal-001', name: 'Haloperidol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antipsicótico. Antiemético. De primeira linha na coreia infantil.',
    indications: `${MAIN}\n\nAntipsicótico. Antiemético. De primeira linha na coreia infantil.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 5 mg/mL.',
        dose: '0,5–5 mg E.V./I.M. a cada 30–60 min PRN agitação.',
        administration: 'E.V. lenta ou I.M.',
      },
      pediatrico: {
        dose: 'Crianças: Inicial: 0,025–0,05 mg/kg/dia a cada 8–12 h, ir aumentando até que os sintomas sejam controlados ou os efeitos adversos intoleráveis. Manutenção: transtornos psicóticos: 0,05–0,15 mg/kg/dia a cada 8–12 h, transtornos não psicóticos: 0,05–0,075 mg/kg/dia a cada 8–12 h, agitação–hiperquinesia–antiemético: 0,01–0,03 mg/kg/dia em dose única. Adultos: 5–10 mg/dose a cada 8–12 h.',
        administration: 'V.O. E.V. I.M.',
        presentation: 'Comprimidos: 1–5–10 mg; Gotas: 2 mg/mL (0,1 mg/gota); Ampolas de 1 mL: 5 mg/mL; Ampolas de Haloperidol decanoato de 3 mL: 50 mg/mL',
        notes: 'Os depressores do SNC podem aumentar os efeitos adversos do haloperidol. Com adrenalina pode causar hipotensão. Carbamazepina e fenobarbital podem aumentar o metabolismo do haloperidol e diminuir sua eficácia. O haloperidol decanoato é de depósito e só pode ser administrado por via I.M. Não se recomenda usar em crianças menores de 3 anos.',
      },
      neonatal: {
        dose: 'Não recomendado salvo indicação psiquiátrica especializada.',
        administration: 'E.V.',
      },
    },
    stability: '## Estabilidade\n\n- E.V. usar sem diluição ou conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nReações extrapiramidais e hipotalâmicas graves, distonia. Tem menos efeitos muscarínicos e hipotensores e mais efeitos extrapiramidais que a clorpromazina.',
    bibliography: [BIB.garrahan('haloPERIDol', ' (cód. 0109, ATC N05AD)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'lid-001', name: 'Lidocaína', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Irritação anal, proctite.',
    indications: `${MAIN}\n\nIrritação anal, proctite.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 1% (10 mg/mL) e 2%.',
        dose: 'Bolus 1–1,5 mg/kg E.V.; infusão 1–4 mg/min.',
        administration: 'E.V. bolus lento e infusão.',
      },
      pediatrico: {
        presentation: 'Pomada (cada 100 g contém): Lidocaína 5 g + Acetato de Hidrocortisona: 0,25 g',
        administration: 'Retal',
        finalConcentration: '20 mg/mL para bolo. 8 mg/mL para infusão.',
        infusionRate: 'Infusão contínua com BIC.',
        dose: 'Aplicar 2 ou 3 vezes por dia (máximo 6 g de pomada retal/dia).',
        notes: 'Não usar por períodos prolongados.',
      },
      neonatal: {
        dose: '0,5–1 mg/kg bolus conforme protocolo arritmias UCIN.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Geral\n\n- Usar imediatamente após extração para bolo.\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nDermatite de contato, reações alérgicas.',
    bibliography: [BIB.garrahan('Lidocaína + Hidrocortisona Acetato', ' (cód. 1157, ATC D07XA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cip-001', name: 'Ciprofloxacina', version: '1.2.2', updatedAt: '2026-07-10',
    executiveSummary: 'Fluoroquinolona. Tratamento de infecções do trato respiratório, ouvido médio, trato urinário, pele e tecidos moles causadas por bactérias suscetíveis: gram-negativas aeróbias, Mycobacterium tuberculosis e algumas gram-positivas.',
    indications: `${MAIN}\n\nFluoroquinolona. Tratamento de infecções do trato respiratório, ouvido médio, trato urinário, pele e tecidos moles causadas por bactérias suscetíveis: gram-negativas aeróbias, Mycobacterium tuberculosis e algumas gram-positivas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachê contendo 200 mg (Norgreen, Rivero).',
        reconstitution: 'Não requer reconstituição prévia. Conc: 200 mg / 100 mL.',
        finalConcentration: '200 mg / 100 mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. 200 mg em 30 min, 400 mg em 60 min.',
        notes: 'Não retirar a proteção (bolsa plástica preta) até o momento de usar.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 250–500 mg; Solução (preparado magistral): 30 mg/mL; F.A.: 200 mg; Gotas oftalmológicas: 0,3%; Pomada oftalmológica: 0,3%',
        administration: 'V.O. E.V. Local',
        diluent: 'SF 0,9%, SG 5% e SG 10%.',
        finalConcentration: '2 mg/mL.',
        infusionRate: '60 min.',
        dose: 'Infecções leves e moderadas: 20 mg/kg/dia a cada 12 h, dose máxima: V.O.: 500 mg/dose; E.V.: 400 mg/dose. Infecções graves, pielonefrite e fibrose cística V.O./E.V.: 30 mg/kg/dia, V.O.: a cada 12 h, dose máxima: 1,5 g/dia; E.V.: a cada 8 h, dose máxima: 1,2 g/dia. Profilaxia meningococo (contato): V.O.: 20 mg/kg/dose única, máximo: 500 mg/dose. Gotas oftalmológicas: a cada 2–3 h',
        notes: 'Aconselha-se seu uso em pediatria somente em situações especiais. Administrar longe das refeições. Os antiácidos (que contenham cálcio, magnésio ou alumínio) e o sucralfato diminuem a absorção da ciprofloxacina se administrados concomitantemente. Aumenta risco de nefrotoxicidade com ciclosporina.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- Não especificado.\n\n## Guia pediátrica\n\n- Uma vez aberta, 14 dias em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nArtralgias, náuseas, vômitos, cefaleias, tontura, rash, cristalúria. Rupturas tendinosas (mais frequentemente no tendão de Aquiles) a partir das 48 h de tratamento.',
    bibliography: [BIB.garrahan('CIPROfloxacina', ' (cód. 0281, ATC J01MA)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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
console.log(`\npt-BR Garrahan lote 22 (parte B): ${drugs.length}`);
