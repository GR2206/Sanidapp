#!/usr/bin/env node
/** Garrahan re-tradução lote 24 — 10 monografias pt-BR (parte B) */
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
  heartHtn: { citation: 'American Heart Association. Diretrizes de hipertensão e arritmia.', url: 'https://www.heart.org/' },
  heartHf: { citation: 'American Heart Association. Diretrizes de insuficiência cardíaca e hipertensão.', url: 'https://www.heart.org/' },
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
    id: 'ate-001', name: 'Atenolol', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Betabloqueador seletivo. Hipotensor. Antagonista beta-adrenérgico.',
    indications: `${MAIN}\n\nBetabloqueador seletivo. Hipotensor. Antagonista beta-adrenérgico.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 50 e 100 mg. Ampola 5 mg/10 mL (uso E.V. limitado).',
        dose: 'HAS/angina: 50–100 mg/dia V.O. Arritmias: conforme protocolo cardiológico.',
        administration: 'V.O. em dose única ou fracionada.',
      },
      pediatrico: {
        dose: 'Crianças: inicial: 0,5 a 1 mg/kg/dia a cada 12–24 h; dose máxima: 2 mg/kg/dia, até 100 mg/dia. Adultos: 25–50 mg/dia a cada 24 h, dose máxima: hipertensão: 100 mg/dia; angina: 200 mg/dia.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 50–100 mg; Suspensão (preparado magistral): 5 mg/ml',
        notes: 'Evitar a suspensão abrupta. Usar com precaução em pacientes com broncoespasmo, diabetes mellitus, hipertireoidismo. As doses iniciais dos anti-hipertensivos são tentativas, devem ser modificadas conforme a resposta clínica e efeitos colaterais. Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
    },
    stability: '## Estabilidade\n\n- Comprimidos conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nFadiga, letargia, alucinações, bradicardia, hipotensão, rash, náuseas, vômitos.',
    bibliography: [BIB.garrahan('Atenolol', ' (cód. 0263, ATC C07AB)'), BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'bic-001', name: 'Bicarbonato de sódio', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Correção de acidose metabólica.',
    indications: `${MAIN}\n\nCorreção de acidose metabólica.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 1 mEq/mL (8,4%).',
        dose: '1–2 mEq/kg E.V. diluído em situações selecionadas (prescrição).',
        administration: 'E.V. lenta diluída.',
      },
      pediatrico: {
        presentation: 'Cápsulas: 1000 mg; Solução V.O. 10% (preparado magistral): 100 mg de bicarbonato de sódio/ml (1,2 mEq de bicarbonato/ml e 1,2 mEq de sódio/ml); Solução E.V. 1 Molar: 1 mEq de bicarbonato/ml. Ver formulação',
        administration: 'V.O.; E.V.',
        diluent: 'Salina 0,9% ou Dext. 5%.',
        finalConcentration: 'Correção de EAB em HP.',
        infusionRate: 'Infusão contínua entre 4 e 8 horas com BIC.',
        dose: 'Acidose metabólica aguda grave (E.V.): mEq requeridos = (cc. sérica desejada - cc. atual) x 0,3 x peso em kg. Acidose metabólica crônica (V.O.): mEq requeridos = (cc. sérica desejada - cc. atual) x 0,6 x peso em kg. Ver Boletim CIME Eletrólitos.',
        notes: 'Tratar sempre a causa da acidose. Corrigir em primeiro lugar a hipocalemia. Administração V.O.: administrar 1–3 horas depois das refeições; cápsulas de 1 g de bicarbonato de sódio contêm 12 mEq de bicarbonato e 12 mEq de sódio. Administração E.V.: via periférica: diluir a 1/6; via central: push E.V.: lento até 1 mEq/ml, infusão E.V.: diluir até 0,5 mEq/ml em Dx 5% e infundir em mais de 2 h. Incompatível com cálcio, magnésio e atropina',
      },
      neonatal: {
        dose: '1–2 mEq/kg em parada com acidose conforme NRP.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Guia pediátrica\n\n- Manter em temperatura ambiente. Descartar o restante.\n\n## Geral\n\n- Não misturar com cálcio na mesma linha.',
    adverseEffects: '## Efeitos adversos\n\nV.O.: distensão gástrica e flatulência. E.V.: necrose tecidual (evitar extravasamento), hiponatremia, alcalose metabólica, hipocalcemia.',
    bibliography: [BIB.garrahan('bicarbonato de SÓDIO', ' (cód. 0267, ATC B05CB)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'cac-001', name: 'Cloreto de cálcio', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento da hipocalcemia e da hiperpotassemia.',
    indications: `${MAIN}\n\nTratamento da hipocalcemia e da hiperpotassemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 10% cloreto de cálcio (13,6 mEq Ca/10 mL).',
        dose: 'PCR: 1 g (10 mL) E.V./I.O. Hipocalcemia: 0,5–1 g E.V. lento.',
        administration: 'E.V./I.O. lento.',
      },
      pediatrico: {
        dose: 'Hipocalcemia sintomática: 0,1–0,2 ml/kg/dose (0,14–0,28 mEq de Ca++/kg/dose) a cada 4–6 h. Adultos: 5–10 ml/dose (7–14 mEq/dose) a cada 6 h. Hiperpotassemia: 0,3 ml/kg (máximo: 3 ml). Ver Boletim CIME Eletrólitos.',
        administration: 'E.V.',
        presentation: 'Ampolas de 10 ml: 100 mg de cloreto de cálcio/ml (1,4 mEq de Ca++/ml = 27,3 mg de Ca++/ml)',
        notes: 'A administração E.V. deve ser realizada de forma lenta (< de 0,5–1 ml/min). Para infusão E.V. diluir até 20 mg de cloreto de cálcio por ml (0,2 ml/ml) e infundir em 1 hora. Solventes compatíveis: D 5% e Sol. F. Incompatível com bicarbonato, fosfato e sulfato.',
      },
      neonatal: {
        dose: '20 mg/kg E.V. lento em PCR/hipocalcemia NNU.',
        administration: 'E.V. central.',
      },
    },
    stability: '## Estabilidade\n\n- Incompatível com bicarbonato em linha.',
    adverseEffects: '## Efeitos adversos\n\nNecrose tecidual por extravasamento. Monitorar a frequência cardíaca. Se ocorrer bradicardia, interromper a infusão.',
    bibliography: [BIB.garrahan('cálcio CLORETO', ' (ATC A12AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cag-001', name: 'Gluconato de cálcio', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de hiperpotassemia. Estados hipocalcêmicos.',
    indications: `${MAIN}\n\nTratamento de hiperpotassemia. Estados hipocalcêmicos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 10% (0,465 mEq Ca/mL).',
        dose: '1–2 ampolas (10–20 mL) E.V. lento; repetir conforme protocolo.',
        administration: 'E.V. lento 10–20 min.',
      },
      pediatrico: {
        presentation: 'Ampolas de 10 ml: 100 mg de gluconato de Ca/ml (0,46 mEq de Ca/ml = 9 mg de Ca iônico/ml)',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5% e 10%.',
        finalConcentration: 'Até 50 mg/mL.',
        infusionRate: '1 a 2 mL/min.',
        dose: 'Hipocalcemia sintomática: 1–2 ml/kg/dose (0,46–0,92 mEq/kg/dose) em 5–10 min, pode repetir-se às 6 h ou seguir com infusão de 5 ml/kg/dia (2,3 mEq/kg/dia). Adultos: 10–30 ml (4,6–13,8 mEq) até resposta. Hipocalcemia assintomática com V.O. contraindicada: lactentes e crianças: 2–5 ml/kg/dia em infusão contínua ou a cada 6 h; adultos: 20–150 ml/dia em infusão contínua ou em doses divididas. Hiperpotassemia: 0,5–1 ml/kg (máximo: 10 ml). Ver Boletim CIME Eletrólitos.',
        notes: 'Push E.V.: 0,5–1 ml/minuto. Infusão E.V.: diluir até 50 mg de gluconato de cálcio por ml (0,5 ml/ml) e infundir em 1 hora. Durante a infusão, controlar a frequência cardíaca. Corrigir primeiro a hipocalemia. Solventes compatíveis: Dx 5% e Sol. F. Não misturar com soluções que contêm bicarbonato ou fosfato. 1 mEq de Ca = 20 mg Ca++',
      },
      neonatal: {
        dose: '1–2 mL/kg gluconato 10% E.V. lento sob monitorização.',
        administration: 'E.V. lento.',
      },
    },
    stability: '## Geral\n\n- Usar via dedicada se possível.\n\n## Guia pediátrica\n\n- Descartar uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nNecrose tecidual por extravasamento. Monitorar a frequência cardíaca. Se ocorrer bradicardia, interromper a infusão.',
    bibliography: [BIB.garrahan('cálcio GLUCONATO', ' (cód. 0270, ATC A12AA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'car-001', name: 'Carbamazepina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsivante. Adjuvante no tratamento da dor neuropática. Uso em psiquiatria: estabilizador do humor, antirrecidiva.',
    indications: `${MAIN}\n\nAnticonvulsivante. Adjuvante no tratamento da dor neuropática. Uso em psiquiatria: estabilizador do humor, antirrecidiva.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 200–400 mg; suspensão V.O.',
        dose: 'Início 200 mg V.O. a cada 12 h; titular até 800–1200 mg/dia.',
        administration: 'V.O. com alimentos.',
      },
      pediatrico: {
        dose: 'A dose deve ser ajustada de acordo com a resposta do paciente e sua dosagem sérica (faixa terapêutica: 4–12 µg/ml). Intervalos para comprimidos: a cada 8–12 h; xarope: a cada 6 h. > 6 anos: iniciar 10–20 mg/kg/dia, aumentar até 35 mg/kg/dia; 6–12 anos: iniciar 200 mg/dia, dose de manutenção: 400–800 mg. > 12 anos e adultos: iniciar 400 mg/dia, dose de manutenção 800–1200 mg. Dose máxima 12–15 anos: 1000 mg; > 15 anos: 1200 mg; adultos: 1600 mg/dia. Dor neuropática: 10–30 mg/kg/dia em 2 ou 3 doses (dose máxima: 800 mg/dia).',
        administration: 'V.O.',
        presentation: 'Comprimidos: 200–400 mg; Comprimidos de liberação controlada: 400 mg; Xarope: 20 mg/ml',
        notes: 'Realizar hemograma e hepatograma a cada 3–6 meses. Claritromicina, eritromicina, isoniazida, cetoconazol, itraconazol podem inibir o metabolismo hepático da carbamazepina. A carbamazepina pode induzir o metabolismo de: ciclosporina, difenilhidantoína, teofilina, ritonavir, saquinavir, delavirdina, benzodiazepínicos, etossuximida, ácido valproico, midazolam, corticosteroides e hormônios tireoidianos. Administrar com alimentos para diminuir os efeitos gastrointestinais. Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
      neonatal: {
        dose: 'Uso limitado; esquemas especializados V.O.',
        administration: 'V.O.',
      },
    },
    stability: '## Estabilidade\n\n- Suspensão conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nSonolência, tontura, erupções cutâneas, alterações hematológicas (neutropenia), alterações hepáticas, diplopia, visão borrada.',
    bibliography: [BIB.garrahan('carBAMazepina', ' (cód. 0032, ATC N03AF)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cas-001', name: 'Caspofungina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Para pacientes intolerantes ou sem resposta a outros antifúngicos, com insuficiência renal e candidíase documentada, ou com insuficiência hepática quando o fluconazol não puder ser usado. Tratamento empírico em neutropenia febril.',
    indications: `${MAIN}\n\nPara pacientes intolerantes ou sem resposta a outros antifúngicos, pacientes com insuficiência renal que tenham infecção documentada por cândida, pacientes com insuficiência hepática em que não se possa utilizar fluconazol.\nTratamento empírico em neutropenia febril sem foco no 5º ou 7º dia de persistência de febre e neutropenia.\nProfilaxia em pacientes transplantados de medula óssea e em leucemias e, em alguns casos, como tratamento de infecções documentadas por fungos sensíveis a equinocandinas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 50 mg ou 70 mg (Cancidas).',
        reconstitution: '10,5 mL de AD, SF ou água bacteriostática. Conc: 5 mg/mL (50 mg) ou 7 mg/mL (70 mg). Agitar suavemente até obter solução clara.',
        diluent: '50–70 mg em 250 mL de SF ou Ringer lactato.',
        finalConcentration: '0,2–0,28 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Retirar o volume necessário e diluir em 250 mL de SF ou Ringer lactato. Administrar em 60 min.',
        notes: 'Não utilizar Dx 5% como diluente (incompatível). Dose de carga: 70 mg no dia 1; manutenção: 50 mg/dia. Em pacientes com insuficiência hepática moderada, aumentar para 70 mg/dia. Equinocandina de primeira linha para candidíase invasora.',
      },
      pediatrico: {
        dose: 'Neonatos: 2 mg/kg/dia (com autorização de Infectologia); Crianças > 3 meses: dose de carga 70 mg/m² e continuar com 50 mg/m²; quando coadministrada com rifampicina, nevirapina, efavirenz, carbamazepina, dexametasona, fenitoína, aumentar para 70 mg/m² a cada 24 h, dose máxima 70 mg/dose. Adultos: inicial 70 mg/dose e depois 50 mg/dose a cada 24 h; quando coadministrada com rifampicina, nevirapina, efavirenz, carbamazepina, dexametasona, fenitoína, deve aumentar-se para 70 mg/dose uma vez por dia. Não necessita ajuste por insuficiência renal.',
        administration: 'E.V.',
        presentation: 'F.A.: 50 e 70 mg',
        notes: 'Administrar lentamente, em 1 hora. Não diluir em dextrose. Estável 48 h refrigerado uma vez diluído. Interações: com ciclosporina pode aumentar a concentração da caspofungina (observou-se aumento das transaminases), evitar; com tacrolimus pode diminuir a concentração sérica do tacrolimus.',
      },
      neonatal: {
        dose: '25 mg/m²/dia E.V. conforme protocolo NNU (uso especializado).',
        administration: 'E.V.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente, 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente, 48 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, rash, diarreia, cefaleia, aumento de transaminases e fosfatase alcalina.',
    bibliography: [BIB.garrahan('Caspofungín*', ' (cód. 1594, ATC J02AX)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'clp-001', name: 'Clorpromazina', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antiemético. Sedação na excitação psicomotora severa e nos movimentos anormais (coreia).',
    indications: `${MAIN}\n\nAntiemético. Sedação na excitação psicomotora severa e nos movimentos anormais (coreia).\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Comprimidos: 25–100 mg; Ampolas I.M. de 5 ml: 5 mg/ml; E.V. de 2 ml: 25 mg/ml',
        administration: 'V.O. E.V. I.M.',
        diluent: 'Sol. Cl Na 0,9%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: '0,5 mg/min.',
        dose: 'Crianças > 6 meses: 0,5–1 mg/kg/dose a cada 4–6 h. Dose máxima (I.M.–E.V.): < 5 anos: 40 mg/dia, 5–12 anos: 75 mg/dia. Adultos: psicose (V.O.): 30–800 mg/dia em 1 a 4 doses, dose usual: 200 mg/dia; (I.M.–E.V.): iniciar 25 mg, pode repetir-se em 1–4 h até um máximo de 400 mg/dose a cada 4–6 h até que o paciente esteja controlado, dose usual: 300–800 mg/dia; antiemético (V.O.): 10–25 mg a cada 4–6 h, (I.M.–E.V.): 25–50 mg a cada 4–6 h.',
        notes: 'Controle neurológico, hematológico e de funcionalidade hepática em tratamentos prolongados. E.V. diluir em Sol. F.: 1 mg/ml, administrar a 0,5 mg/min. Com propranolol aumenta a concentração plasmática de clorpromazina. Pode diminuir sua absorção se administrada com antiácidos que contenham alumínio e/ou magnésio. Pode aumentar a concentração sérica do ácido valproico. Evitar o contato entre a solução injetável e a pele porque pode produzir dermatite.',
      },
    },
    stability: '## Guia pediátrica\n\n- 7 dias uma vez reconstituída.',
    adverseEffects: '## Efeitos adversos\n\nSedação, sonolência, hipotensão, efeitos anticolinérgicos, depressão respiratória, taquicardia, arritmias cardíacas, sintomas extrapiramidais, hipotermia, ginecomastia, leucocitose, anemia hemolítica.',
    bibliography: [BIB.garrahan('clorproMAZINA Cloridrato', ' (cód. 0766, ATC N05AA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'cvd-001', name: 'Carvedilol', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Agente bloqueador alfa e beta. Insuficiência cardíaca congestiva. Antagonista alfa e beta-adrenérgico.',
    indications: `${MAIN}\n\nAgente bloqueador alfa e beta. Insuficiência cardíaca congestiva. Antagonista alfa e beta-adrenérgico.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 6,25, 12,5 e 25 mg.',
        dose: 'IC: iniciar 3,125 mg V.O. 2 vezes/dia e titular. HAS: 12,5–25 mg V.O. 2 vezes/dia.',
        administration: 'V.O. com alimentos (melhor tolerância).',
      },
      pediatrico: {
        dose: 'Insuficiência cardíaca congestiva: crianças: inicial: 0,08 mg/kg/dose a cada 12 h durante 2 semanas, depois duplicar a cada 2 semanas se bem tolerada até faixa de dose de manutenção de 0,3 a 0,7 mg/kg/dia a cada 12 h (máximo: 50 mg/dia); adultos: inicial: 3,125 mg a cada 12 h, se tolerada pode duplicar-se a cada 2 semanas até dose máxima de 25 a 50 mg, 2 vezes por dia. Hipertensão: crianças e adolescentes: inicial: 0,1 mg/kg/dose (até 12,5 mg) a cada 12 h; dose máxima: 0,5 mg/kg/dose (até 25 mg) a cada 12 h.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 3,125–6,25 mg; Solução (preparado magistral): 1 mg/ml. Ver formulação',
        notes: 'Administrar com alimentos. É contraindicado em insuficiência hepática. Interações: clonidina aumenta níveis séricos do carvedilol. Carvedilol pode aumentar níveis séricos de ciclosporina; pode aumentar os efeitos de outras drogas como digoxina, prazosina, adrenalina. Carvedilol pode mascarar a taquicardia da hipoglicemia causada pela insulina e hipoglicemiantes orais. Rifampicina pode reduzir a concentração plasmática do carvedilol em até 70%. Diminui seu efeito betabloqueador quando administrado conjuntamente com antiácidos, bloqueadores dos canais de cálcio, colestiramina, anti-inflamatórios não esteroides, ampicilina e salicilatos.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nTontura, hipotensão, cefaleia, fadiga, hiperglicemia, aumento de peso, diarreia, bradicardia, palpitações, etc.',
    bibliography: [BIB.garrahan('Carvedilol*', ' (cód. 1584, ATC C07AG)'), BIB.heartHf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'des-001', name: 'Desmopressina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Diabetes insípida (antidiurético). Hemofilia. Doença de von Willebrand. Enurese noturna.',
    indications: `${MAIN}\n\nDiabetes insípida (antidiurético). Hemofilia. Doença de von Willebrand. Enurese noturna.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola E.V. 4 mcg/mL; nasal/V.O. conforme apresentação.',
        dose: 'DI: 1–2 mcg E.V./S.C. ou dose intranasal conforme protocolo.',
        administration: 'E.V. lenta, S.C. ou intranasal.',
      },
      pediatrico: {
        dose: 'Diabetes insípida: E.V.–S.C.: 2–4 µg/dia a cada 12 h; intranasal: 0,05–0,1 ml/dose 2 vezes por dia; V.O. < 12 anos: iniciar com 0,05 mg/dose a cada 12 h até resposta (faixa 0,1–0,8 mg/dia); > 12 anos e adultos: 0,05 mg/dose a cada 12 h até resposta (faixa: 0,1–1,2 mg/dia a cada 8–12 h). Hemofilia, doença de von Willebrand: E.V.: > 3 meses e adultos: 0,3 µg/kg, 30 min antes do procedimento. Enurese noturna: intranasal: > 6 anos: inicial 20 µg, faixa: 10–40 µg, ao deitar; V.O.: > 12 anos: 0,2–0,4 mg ao deitar. Maior absorção na região anterior da fossa nasal.',
        administration: 'V.O.; E.V.; S.C.; Intranasal',
        presentation: 'Solução nasal (com cânula calibrada de 0,2 ml): 0,1 mg/ml; Spray nasal: 0,1 mg/ml; Ampolas: 4 µg/ml; Comprimidos: 0,1–0,2 mg',
        notes: 'Deve ser indicada por especialistas. Absorve-se na região nasal anterior. A dose é ajustada à resposta clínica individual. Conservar as ampolas e a solução nasal refrigeradas a 2–6 °C. A desmopressina é potenciada por antidepressivos tricíclicos, carbamazepina, clorpromazina, indometacina. Infusão intermitente: diluição usual 0,1 µg/ml, infundir em 15–30 min; infusão contínua: diluição usual 0,1 µg/ml. Pode diluir em solução fisiológica ou dextrose 5%. S.C.: administrar lentamente em 10–20 segundos.',
      },
      neonatal: {
        dose: '0,1–0,3 mcg/kg conforme indicação NNU.',
        administration: 'E.V.',
      },
    },
    stability: '## Estabilidade\n\n- Refrigerar conforme apresentação.',
    adverseEffects: '## Efeitos adversos\n\nIntoxicação hídrica. Cefaleia, dor estomacal, náuseas, hiponatremia.',
    bibliography: [BIB.garrahan('Desmopressina Acetato', ' (cód. 0556, ATC H01BA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dia-001', name: 'Diazepam', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsivante benzodiazepínico. Relaxante muscular. Ansiolítico.',
    indications: `${MAIN}\n\nAnticonvulsivante benzodiazepínico. Relaxante muscular. Ansiolítico.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 5–10 mg.',
        dose: '5–10 mg E.V. lento repetível conforme protocolo.',
        administration: 'E.V. muito lenta; I.M./retal conforme apresentação.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 2–5–10 mg; Ampolas de 2 ml: 5 mg/ml; Solução (preparado magistral): 2 mg/ml',
        administration: 'V.O.; E.V.; Intrarretal',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5% e Dext. 10%.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '1 a 2 mg/min.',
        dose: 'Status epiléptico ataque E.V.: > 30 dias e crianças: 0,1–0,3 mg/kg/dose a cada 5–10 min. Dose máxima: < 5 anos: 5 mg, > 5 anos: 10 mg; Adultos: 5–10 mg, pode repetir-se a cada 10–15 min até máximo de 30 mg. Infusão E.V.: 0,1–0,2 mg/kg/hora. Convulsões (tratamento imediato): 2 a 5 anos: 0,5 mg/kg; 6 a 11 anos: 0,3 mg/kg; > 12 anos e adultos: 0,2 mg/kg. Sedação moderada para procedimentos: V.O.: 0,2–0,3 mg/kg (dose máxima: 10 mg) 45 a 60 min antes do procedimento. Sedação, relaxamento muscular ou ansiedade: V.O.: 0,12–0,8 mg/kg/dia a cada 6–8 h; E.V.: 0,04–0,3 mg/kg/dose a cada 2–4 h até máximo de 0,6 mg/kg no transcurso de 8 h; adultos: 2–10 mg/dose a cada 6–8 h. Pacientes em ARM (E.V.): 0,2–0,4 mg/kg a cada 6 h.',
        notes: 'Administração: E.V.: push: sem diluir e não exceder 5 mg/min, infusão contínua: 0,2 mg/ml em solução fisiológica; V.O.: administrar com os alimentos. Ver guia preliminar para a prevenção de teratogênese causada por medicamentos. Ver guia prática para manejo de analgosedação e seu desmame em salas de cuidados intermediários e moderados.',
      },
      neonatal: {
        dose: '0,1–0,3 mg/kg conforme protocolo de convulsões.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Geral\n\n- Precipita com alguns diluentes; seguir bula da formulação E.V.\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nSonolência, ataxia, disartria, irritabilidade. E.V.: depressão respiratória, tromboflebite. Efeito paradoxal.',
    bibliography: [BIB.garrahan('diazePAM', ' (cód. 0070, ATC N05BA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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
console.log(`\npt-BR Garrahan lote 24 (parte B): ${drugs.length}`);
