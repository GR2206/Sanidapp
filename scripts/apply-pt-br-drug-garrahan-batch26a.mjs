#!/usr/bin/env node
/** Garrahan re-tradução lote 26 — 13 monografias pt-BR (parte A) */
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
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Diretrizes clínicas.', url: 'https://www.idsociety.org/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  ahaHtnHf: { citation: 'American Heart Association. Diretrizes de hipertensão e insuficiência cardíaca.', url: 'https://www.heart.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sag: { citation: 'Sociedade Argentina de Ginecologia e Obstetrícia. Protocolos obstétricos.', url: 'https://www.sag.org.ar/' },
};

const drugs = [
  {
    id: 'lvt-001', name: 'Levetiracetam', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsivante.',
    indications: `${MAIN}\n\nAnticonvulsivante.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco 500 mg/5 mL E.V.; comprimidos V.O.',
        dose: 'Carga 60 mg/kg E.V. (máx. 4500 mg); manutenção 500–1500 mg a cada 12 h V.O.',
        administration: 'E.V. em 15 min ou V.O.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 500 - 1000 mg; Solução V.O.: 100 mg/ml; F.A. por 5 ml: 100 mg/ml',
        administration: 'V.O. E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%, Ringer.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '15 minutos com BIC.',
        dose: '4 a 16 anos: inicial: 10 - 20 mg/kg/dia a cada 12 h, incrementar 10 - 20 mg/kg/dia a cada 2 semanas até um máximo de 60 mg/kg/dia a cada 12 h. Adultos: inicial: 500 mg a cada 12 h, incrementar 1000 mg/dia a cada 2 semanas até um máximo de 3000 mg/dia. Ajustar a dose em insuficiência renal e hemodiálise. Ver Ajuste de dose de levetiracetam em pacientes com função renal alterada.',
        notes: 'Administração E.V.: Diluir a dose em 100 ml de solução fisiológica ou dextrosa 5 % e administrar em 15 min (neonatos: 5 mg/ml). Suspender a droga gradualmente para minimizar o aumento da frequência de convulsões.',
      },
      neonatal: {
        dose: 'Carga 40–60 mg/kg; manutenção conforme protocolo da UCIN.',
        administration: 'E.V.',
      },
    },
    stability: '## Geral\n\n- Diluição E.V. 4 h em temperatura ambiente conforme bula.\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto. Diluição estável 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nAstenia, depressão, nervosismo, sonolência, infecção, ataxia, tontura, vertigem, convulsões.',
    bibliography: [BIB.garrahan('levETIRAcetam*', ' (cód. 1536, ATC N03AX)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mep-001', name: 'Metilprednisolona', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anti-inflamatório e imunossupressor. Lesão medular. Tratamento de rejeição em glomerulopatias (lúpus, etc.).',
    indications: `${MAIN}\n\nAnti-inflamatório e imunossupressor. Lesão medular. Tratamento de rejeição em glomerulopatias (lúpus, etc.).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco 40–125 mg.',
        dose: 'Asma: 60–125 mg E.V. EM em surto: 1 g/dia por 3–5 dias (protocolo).',
        administration: 'E.V. lenta ou perfusão.',
      },
      pediatrico: {
        presentation: 'F.A. liof.: 500 mg',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '125 mg/mL.',
        infusionRate: '20 a 60 minutos com BIC.',
        dose: 'Anti-inflamatório e imunossupressor: E.V.: 30 mg/kg em uma dose, seguido de 15 - 30 mg/kg/dia ou 600 mg/m²/dia a cada 24 h durante 3 dias; Lesão medular: E.V.: 30 mg/kg seguido de 5,4 mg/kg/hora por 23 h; Tratamento de rejeição - glomerulopatias: E.V.: 10 mg/kg/dose durante 3 dias consecutivos, dose máxima: 1 g/dose; taquicardia ventricular - miocardite linfocítica silente: 30 mg/kg/dia em uma dose por 3 doses. Ver doses equivalentes de corticosteroides.',
        notes: 'Reconstituição de F.A.: adicionar unicamente o diluente fornecido no envase ou água para injetável, é estável 48 h em temperatura ambiente. Infusão E.V.: diluir em solução fisiológica (preferentemente) ou dextrosa 5% em uma concentração recomendada de 2,5 - 20 mg/ml e administrar em 30 - 120 minutos. Push E.V.: máxima concentração recomendada 125 mg/ml. Para doses < 250 mg infundir em não menos de 5 minutos; doses ≥ 250 mg infundir em não menos de 30 minutos. Com altas doses pode requerer-se profilaxia antiácida. Ver considerações para uma corticoterapia segura. Ver atualização de corticosteroides.',
      },
      neonatal: {
        dose: 'Uso restrito; esquemas pulmonares/DAH conforme UCIN.',
        administration: 'E.V.',
      },
    },
    stability: '## Geral\n\n- Reconstituir conforme bula.\n\n## Guia pediátrica\n\n- 48 h em temperatura ambiente uma vez reconstituída.',
    adverseEffects: '## Efeitos adversos\n\nHipertensão, hiperglicemia, úlcera péptica, miopatia, retardo do crescimento, cataratas, osteoporose, cataratas subcapsular posterior, síndrome cushingoide, alcalose hipocalêmica, edema, susceptibilidade aumentada às infecções, osteonecrose.',
    bibliography: [BIB.garrahan('metilprednisoLOna', ' (cód. 0137, ATC H02AB)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'min-001', name: 'Minociclina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico do grupo das tetraciclinas utilizado para tratar infecções bacterianas, incluindo pneumonia e outras infecções do trato respiratório, determinadas infecções de pele e partes moles, dos olhos, do sistema linfático, do aparelho digestivo, do aparelho reprodutor e do sistema urinário.',
    indications: `${MAIN}\n\nAntibiótico do grupo das tetraciclinas utilizado para tratar infecções bacterianas, incluindo pneumonia e outras infecções do trato respiratório, determinadas infecções de pele e partes moles, dos olhos, do sistema linfático, do aparelho digestivo, do aparelho reprodutor e do sistema urinário.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Cápsulas 100 mg.',
        dose: '100 mg V.O. a cada 12 h.',
        administration: 'V.O. com abundante água.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 50 - 100 mg',
        administration: 'V.O.',
        dose: 'Infecções de pele e tecidos moles: > 8 anos: carga: 4 mg/kg, depois 2 mg/kg/dose a cada 12 h; máximo: 200 mg/dia, em caso de infecções por germes multirresistentes (acinetobacter sp, S maltophilia, Nocardia) dose máxima diária 400 mg; adultos: carga: 200 mg, depois 100 mg/dose a cada 12 h, em caso de infecções por germes multirresistentes (acinetobacter sp, S maltophilia, Nocardia) 200 mg/dose a cada 12 h.',
        notes: 'Pode ser tomado com ou sem alimentos, beber um copo de água com cada dose. Em terapia prolongada realizar controle hematológico, renal e hepático. Interações: antiácidos com ferro, alumínio, cálcio e magnésio diminuem sua absorção. Diminuir dose de anticoagulantes porque aumenta sua ação.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula; proteger da luz.',
    adverseEffects: '## Efeitos adversos\n\nColoração permanente nos dentes e inibição do desenvolvimento ósseo em crianças, anorexia, náusea, vômito, diarreia, urticária, erupção, dermatite, superinfecção, anemia hemolítica, trombocitopenia, eosinofilia.',
    bibliography: [BIB.garrahan('minoCICLina cloridrato', ' (cód. 1359, ATC J01AA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'mox-001', name: 'Moxifloxacino', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibacteriano para tratamento de tuberculose resistente a drogas.',
    indications: `${MAIN}\n\nAntibacteriano para tratamento de tuberculose resistente a drogas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 400 mg; E.V. 400 mg.',
        dose: '400 mg V.O./E.V. a cada 24 h.',
        administration: 'V.O. ou E.V.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 400 mg',
        administration: 'V.O. Ocular',
        dose: 'Lactentes e menores de 15 anos: 10 mg/kg/dia a cada 24 h, dose máxima: 400 mg; adolescentes e maiores de 15 anos: 400 mg a cada 24 h.',
        notes: 'Precauções: vigilar sinais de tendinite ou ruptura de tendão, o risco de ruptura aumenta com o uso concomitante de corticoides. Utilizar com precaução em pacientes com distúrbios do S.N.C. porque as quinolonas podem provocar convulsões. Precaução com fármacos redutores do nível de K (p. ex. diuréticos de alça e tipo tiazida, laxantes, corticosteroides, anfotericina B) ou associados com bradicardia clinicamente significativa. Interações: efeito aditivo na prolongação do intervalo QT ao administrar simultaneamente com medicamentos que possam atuar sobre o QT. Espaçar 6 h de antiácidos com Mg e Al, sucralfato, didanosina, e agentes com Fe e Zn. Aumenta ação de anticoagulantes orais, maior monitorização de INR. Ver guia de tratamento de tuberculose.',
      },
    },
    stability: '## Estabilidade\n\n- E.V.: usar conforme bula de bolsa ou diluição.',
    adverseEffects: '## Efeitos adversos\n\nSuperinfecções devidas a bactérias resistentes ou fungos, como candidíase oral e vaginal; cefaleia, tontura, insônia, confusão, agitação, alucinações; prolongamento de QT em pacientes com hipocalemia; náuseas, vômitos, dor abdominal e diarreia; aumento de transaminases.',
    bibliography: [BIB.garrahan('MOXIfloxacina*', ' (cód. 1765, ATC J01MA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'mtp-001', name: 'Metoclopramida', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antiemético, antinauseoso.',
    indications: `${MAIN}\n\nAntiemético, antinauseoso.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 10 mg/2 mL.',
        dose: '10 mg E.V. lenta a cada 6–8 h PRN.',
        administration: 'E.V. lenta.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 10 mg; Gotas crianças: 2 mg/ml (0,1 mg/gota); Gotas adultos: 5 mg/ml; Ampolas por 2 ml: 5 mg/ml',
        administration: 'V.O.; E.V.; I.M.',
        diluent: 'Sol. Cl Na 0,9%.',
        finalConcentration: '0,2 a 5 mg/mL.',
        infusionRate: 'Não menor que 15 min.',
        dose: 'Crianças: 0,4 - 0,8 mg/kg/dia a cada 6 h; adultos: 10 - 15 mg/dose a cada 6 h. Por quimioterapia: E.V. - V.O.: 1 - 2 mg/kg/dose, a cada 2 - 4 h por 2 a 5 doses, se continuarem as náuseas e/ou vômitos: 0,5 mg/kg ou 30 mg; a cada 4 - 6 h por 5 dias. Pós-operatório: crianças: 0,1 - 0,2 mg/kg/dose a cada 6 - 8 h; > 14 anos e adultos: 10 mg a cada 6 - 8 h. A dose máxima é a anterior àquela que produz efeitos extrapiramidais.',
        compatibility: 'Incompatível com cefalotina e bicarbonato de sódio.',
        notes: 'Usar com precaução e reduzir a dose em insuficiência renal, hipertensão ou depressão. Os antimuscarínicos e analgésicos opiáceos antagonizam o efeito da metoclopramida sobre o trato gastrointestinal, os antipsicóticos aumentam o risco dos efeitos extrapiramidais. A metoclopramida aumenta os efeitos do paracetamol e aspirina.',
      },
      neonatal: {
        dose: 'Uso restrito; 0,1 mg/kg conforme protocolo da UCIN.',
        administration: 'E.V.',
      },
    },
    stability: '## Geral\n\n- Usar após extração.\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberta.',
    adverseEffects: '## Efeitos adversos\n\nSintomas extrapiramidais (mais comuns em crianças e adultos jovens, especialmente após doses altas por via E.V.), convulsões, síndrome neuroléptica maligna. Ocasionalmente: sonolência, inquietação, depressão, diarreia.',
    bibliography: [BIB.garrahan('MetoCLOPRAMIDA', ' (cód. 0138, ATC A03FA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ngl-001', name: 'Nitroglicerina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Vasodilatador coronariano de curta duração. Hipotensor endovenoso, periférico e pulmonar.',
    indications: `${MAIN}\n\nVasodilatador coronariano de curta duração. Hipotensor endovenoso, periférico e pulmonar.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: 'Início 5–10 mcg/min; incrementar a cada 3–5 min até efeito (máx. protocolo).',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorizar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampolas de 5 ml: 5 mg/ml',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '< 400 mcg/mL.',
        infusionRate: 'Somente por BIC.',
        dose: '0,5-10 µg/kg/minuto.',
        compatibility: 'Não administrar concomitantemente a outra medicação. Pode antagonizar o efeito anticoagulante da heparina.',
        notes: 'Para infusão contínua diluir em dextrosa 5% ou solução fisiológica em uma concentração de 50-100 µg/ml (concentração máxima: 400 µg/ml). Diminui o efeito anticoagulante da heparina. Os beta-bloqueadores e bloqueadores dos canais de cálcio podem aumentar o efeito hipotensor da nitroglicerina.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '0,5–3 mcg/kg/min na UCIN; monitorizar PA.',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorizar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Geral\n\n- Usar bolsa de vidro/polietileno conforme bula; proteger da luz.\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberta.',
    adverseEffects: '## Efeitos adversos\n\nVertigem, cefaleias, taquicardia, náuseas, hipotensão, tontura, dermatite esfoliativa.',
    bibliography: [BIB.garrahan('nitroGLICERINA', ' (cód. 0150, ATC C01CA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nif-001', name: 'Nifedipino', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Vasodilatador arterial. Bloqueador dos canais de cálcio.',
    indications: `${MAIN}\n\nVasodilatador arterial. Bloqueador dos canais de cálcio.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos liberação prolongada 30 e 60 mg. Cápsulas 10 mg.',
        dose: 'HA: 30–60 mg/dia V.O. LP. Tocolise/obstétrica: conforme protocolo de maternidade.',
        administration: 'V.O. Não triturar nem mastigar formulações LP.',
      },
      pediatrico: {
        dose: 'Comprimidos de liberação controlada: 0,25-0,5 mg/kg/dia, a cada 12-24 h; dose máxima: 3 mg/kg/dia (até 120 mg/dia). Adultos: Inicial: comprimidos de liberação controlada: 30 a 60 mg/dia a cada 24 h; dose máxima: 120 mg/dia (comprimidos de liberação controlada).',
        administration: 'V.O. S.L.',
        presentation: 'Comprimidos de liberação controlada: 30 mg',
        notes: 'Interações: aumenta os efeitos adversos dos betabloqueadores; aumenta a concentração sérica da digoxina; a rifampicina diminui níveis de nifedipina; com ciclosporina se exacerba a hiperplasia gengival.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nReações de calor, cefaleia, náuseas, reações cutâneas, edemas em membros inferiores, taquicardia, palpitações, hiperplasia gengival.',
    bibliography: [BIB.garrahan('NIFEdipina', ' (cód. 0240, ATC C08CA)'), BIB.ahaHtnHf, BIB.anmat, BIB.sag, BIB.aap],
  },
  {
    id: 'nip-001', name: 'Nitroprussiato sódico', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Vasodilatador arterial e venoso.',
    indications: `${MAIN}\n\nVasodilatador arterial e venoso.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '0,3–10 mcg/kg/min titulado; máximo tempo de infusão conforme protocolo.',
        infusionRate: 'Infusão contínua protegida da luz.',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorizar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'F.A.: 50 mg',
        administration: 'E.V.',
        diluent: 'SOMENTE Dextrosa 5%.',
        finalConcentration: 'Usual 200 mcg/mL. Em restrição hídrica, 1000 mcg/mL.',
        infusionRate: 'Somente por BIC, conforme PA.',
        dose: 'Inicial: 0,5-1 µg/kg/min, manutenção: até 4-6 µg/kg/min',
        notes: 'Diluir em dextrosa a 5% em uma concentração de 0,2 mg/ml (concentração máxima de diluição: 1 mg/ml); a diluição dura 24 h se mantida protegida da luz.',
      },
    },
    stability: '## Geral\n\n- Proteger estritamente da luz; descartar se solução azul/cinza.\n\n## Guia pediátrica\n\n- 24 h uma vez reconstituído. 24 h uma vez diluído.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, sudorese, inquietação, cefaleia, palpitações. Intoxicação por tiocianato.',
    bibliography: [BIB.garrahan('nitroPRUSIATO de Sódio', ' (cód. 0151, ATC C02DD)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nsh-001', name: 'Cloreto de sódio hipertônico', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hiponatremia.',
    indications: `${MAIN}\n\nHiponatremia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola/bolsa NaCl 3% ou 23,4%.',
        dose: '3%: 100–150 mL bolus em edema cerebral. Hiponatremia: conforme cálculo de déficit.',
        administration: 'E.V. central para 23,4%.',
      },
      pediatrico: {
        dose: 'Requerimentos: 2 mEq/kg/dia. Tratamento hiponatremia: primeiro tratamento etiológico. Hiponatremia aguda, sintomática com Na <130: (Na teórico - Na real) x 0,6 x peso (kg) = mEq Na a administrar como ClNa a 3% em 1- 4 h. Ver Boletim CIME Eletrólitos.',
        administration: 'V.O. E.V.',
        presentation: 'Ampolas: 200 mg/ml (3,4 mEq de Na/ml); Solução V.O. (preparado magistral): 233 mg/ml (4 mEq de Na/ml)',
        notes: 'Não corrigir a natremia mais de 10 mEq/litro por vez. Não administrar a 20% E.V. sem diluir. Precaução em pacientes com insuficiência cardíaca congestiva, severa insuficiência renal, retenção de sódio com edema, neonatos com hiperbilirrubinemia. Pseudohiponatremia: a cada aumento de 62 mg% na glicemia, produz-se uma diminuição de 1 mEq na concentração de Na.',
      },
      neonatal: {
        dose: 'Bolus hipertônico conforme protocolo neuro-UCIN.',
        administration: 'E.V. central.',
      },
    },
    stability: '## Estabilidade\n\n- Solução pronta; verificar duplamente a concentração.',
    adverseEffects: '## Efeitos adversos\n\nEdema, náuseas, vômitos.',
    bibliography: [BIB.garrahan('Sódio CLORURO', ' (cód. 0313, ATC A12CA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ose-001', name: 'Oseltamivir', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento da influenza (A ou B) em adultos e maiores de 1 ano dentro dos 2 primeiros dias após o início dos sintomas. Profilaxia contra a influenza em maiores de 13 anos. Inibidor da neuraminidase.',
    indications: `${MAIN}\n\nTratamento da influenza (A ou B) em adultos e maiores de 1 ano dentro dos 2 primeiros dias após o início dos sintomas. Profilaxia contra a influenza em maiores de 13 anos. Inibidor da neuraminidase.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Cápsulas 75 mg; suspensão.',
        dose: '75 mg V.O. a cada 12 h por 5 dias (tratamento).',
        administration: 'V.O. com ou sem alimentos.',
      },
      pediatrico: {
        dose: 'Tratamento (duração do tratamento: 5 dias): Recém-nascido a termo (RNT) < 15 dias: 3 mg/kg/dose a cada 24 h; RNT > 15 dias: 3 mg/kg/dose a cada 12 h; Recém-nascidos pré-termo (RPT) IG corrigida < 38 sem: 1 mg/kg/dose a cada 12 h; RPT IG corrigida 38 - 40 sem: 1,5 mg/kg/dose a cada 12 h. Dose máxima neonatos: 12 mg totais a cada 12 h, início dentro das 48 h do início do quadro. 3 meses a 1 ano: 3 mg/kg/dose a cada 12 h; > 1 a 12 anos: <15 kg: 30 mg a cada 12 h; 15 a 23 kg: 45 mg a cada 12 h; 23 a 40 kg: 60 mg a cada 12 h; > 40 kg e adultos: 75 mg a cada 12 h. Profilaxia: Neonatos não se recomenda; adolescentes e adultos: 75 mg/dia durante 10 dias. Ajuste de dose em insuficiência renal: Cl Cr 10-30 ml/min reduzir a frequência da dose: tratamento: a cada 24 h, profilaxia: a cada 48 h.',
        administration: 'V.O.',
        presentation: 'Cápsulas: 75 mg; Suspensão: 12 mg/ml; Xarope (preparado magistral): 15 mg/ml',
        notes: 'O tratamento deve começar dentro das 48 h do início dos sintomas. Profilaxia começar dentro dos 2 dias do contato. Não administrar com vacina de vírus vivo de influenza e com nenhum medicamento que contenha salicilatos (aspirina) por risco de síndrome de Reye, para reduzir a febre recomenda-se paracetamol ou outros AINEs. Recomenda-se utilização de ranitidina em dose profilática pois pode produzir hemorragia digestiva e controle de enzimas hepáticas.',
      },
      neonatal: {
        dose: '1–3 mg/kg/dose V.O. a cada 12 h conforme protocolo influenza UCIN.',
        administration: 'V.O.',
      },
    },
    stability: '## Estabilidade\n\n- Suspensão refrigerada conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nInsônia, vertigem, náuseas, vômitos, dor abdominal, conjuntivite, epistaxe, distúrbios no ouvido. Transtornos de conduta. Delírio, ideação suicida.',
    bibliography: [BIB.garrahan('Oseltamivir Fosfato*', ' (cód. 1611, ATC J05AH)'), BIB.idsa, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'phb-001', name: 'Fenobarbital', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsivante, hipnótico.',
    indications: `${MAIN}\n\nAnticonvulsivante, hipnótico.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 200 mg/mL.',
        dose: 'Carga 15–20 mg/kg E.V. lenta; manutenção 1–3 mg/kg/dia.',
        administration: 'E.V. muito lenta.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 15-100 mg; Ampolas de 2 ml: 50 mg/ml; Solução (preparado magistral): 20 mg/ml Ver Formulação',
        administration: 'V.O.; E.V.: I.M.',
        diluent: 'Sol. Cl Na 0,9%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: '30 mg/min com BIC.',
        dose: 'Ataque (E.V.; I.M.): 20 mg/kg/dose, dose máxima: 1 g. Manutenção (V.O.; E.V.): 3-5 mg/kg/dia a cada 12-24 h. Adultos: 100 mg a cada 12 h, dose máxima: 600 mg. I.R. com filtrado glomerular < a 10 ml/min/1,73 m²: reduzir a dose a 50% e administrar a cada 24 h; hemodiálise intermitente (se dialisa 20-50%): pode ser necessário administrar uma dose extra, administrar uma dose durante e depois; diálise peritoneal (se dialisa entre 40-50%, dependendo do número de ciclos); terapia de reposição contínua: monitorar os níveis séricos, em alguns casos pode ser necessário doses mais altas e mais frequentes. Insuficiência hepática: embora se recomende diminuir a dose, não existe um ajuste de dose específico.',
        notes: 'Tanto em insuficiência hepática como renal se recomenda monitoramento frequente de níveis séricos, em alguns casos pode ser necessário doses mais altas e mais frequentes. Indutor enzimático, reduz concentração plasmática de: carBAMazepina, clonazePAM, lamoTRIgina, valproato. Os efeitos anticonvulsivantes são antagonizados por antidepressivos e antipsicóticos. Administrar sem diluir ou diluir com igual volume de Sol. F. Máxima velocidade de infusão: crianças: 30 mg/min, adultos ou > de 60 kg: 60 mg/min. Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
      neonatal: {
        dose: 'Carga 15–20 mg/kg; manutenção 3–4 mg/kg/dia (UCIN).',
        administration: 'E.V.',
      },
    },
    stability: '## Geral\n\n- Não misturar com outros fármacos em Y.\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nSonolência, irritabilidade e hiperatividade, ataxia, erupção cutânea, depressão cardiorrespiratória.',
    bibliography: [BIB.garrahan('FENobarbital', ' (cód. 0092, ATC N03AA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'pos-001', name: 'Posaconazol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções fúngicas invasivas (IFI), quando outros fármacos de primeira linha não podem ser utilizados ou resultaram ineficazes (aspergilose, fusariose, cromoblastomicose, micetoma, coccidioidomicose) e como tratamento de primeira linha em pacientes selecionados com candidíase orofaríngea.',
    indications: `${MAIN}\n\nTratamento de infecções fúngicas invasivas (IFI), quando outros fármacos de primeira linha não podem ser utilizados ou resultaram ineficazes (aspergilose, fusariose, cromoblastomicose, micetoma, coccidioidomicose) e como tratamento de primeira linha em pacientes selecionados com candidíase orofaríngea.\nProfilaxia de IFI em pacientes imunodeprimidos (pacientes com leucemia mieloide aguda, ou síndrome mielodisplásica sob quimioterapia ou transplante de células-tronco hematopoiéticas sob tratamento imunossupressor).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Solução para concentrado para solução para infusão contendo 300 mg em 16,7 mL (18 mg/mL) (Noxafil IV).',
        reconstitution: 'Não requer reconstituição prévia. Conc: 18 mg/mL.',
        diluent: '300 mg em 150-250 mL de SF, Dx 5% ou Ringer lactato.',
        finalConcentration: '1-2 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir em 150-250 mL de SF, Dx 5% ou Ringer lactato e admin. em 90 min mediante filtro em linha (0,22 µm). Usar via central preferentemente.',
        notes: 'Requer filtro em linha de 0,22 µm. Preferir via central (irritante em via periférica). Dose de carga: 300 mg a cada 12 h no dia 1; manutenção: 300 mg/dia. Indicado em profilaxia e tratamento de aspergilose e outras micoses invasoras. Múltiplas interações por inibição do CYP3A4.',
      },
      pediatrico: {
        dose: 'Suspensão de liberação imediata: Profilaxia: 4 - 6 mg/kg/dose a cada 8 h, máximo: 400 mg/dose; Tratamento: 4 - 6 mg/kg/dose a cada 6 h Comprimidos de liberação prolongada: ≥ 3 anos e adolescentes ≤ 17 anos: dose de carga (por 24 h): 5 - 7 mg/kg/dose a cada 12 h, máximo: 300 mg/dose), manutenção: 5 - 7 mg/kg/dose a cada 24 h, máximo 300 mg/dose. Ajustar dose por monitoramento terapêutico (faixa desejada profilaxia: ≥ 700 ng/mL, tratamento: 1000 - 1250 ng/mL)',
        administration: 'V.O.',
        presentation: 'Comprimidos de liberação modificada: 100 mg; Suspensão oral por 105 ml: 40 mg/ml',
        notes: 'O comprimido e a suspensão oral não devem ser usados indistintamente, devido às diferenças existentes quanto à dosagem de cada formulação. Os comprimidos de liberação modificada podem ser administrados com ou sem refeições e a suspensão oral deve ser administrada com uma refeição ou um suplemento nutricional naqueles pacientes que não toleram uma refeição para melhorar a absorção. Não podem ser partidos. Concentração aumentada por verapamilo, ciclosporina, claritromicina, eritromicina. Aumenta concentração de vincristina, vinblastina (risco de neurotoxicidade), ciclosporina, tacrolimus, sirolimus (reduzir dose ao iniciar tratamento com posaconazol e controlar seu nível sanguíneo); atazanavir, inibidores da protease (vigiar efeitos adversos), digoxina (monitorizar níveis ao iniciar tratamento). Concentração diminuída por fosamprenavir, antagonistas H2 e inibidores de bomba de prótons.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 12 h em temperatura ambiente, 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nNeutropenia, desequilíbrio eletrolítico, anorexia, apetite diminuído, hipocalemia, hipomagnesemia, parestesia, tontura, sonolência, cefaleia, disgeusia, hipertensão, náuseas, vômitos, dor abdominal, diarreia, dispepsia, secura da boca, flatulência, constipação, desconforto anorretal, erupção, prurido, febre, astenia, fadiga.',
    bibliography: [BIB.garrahan('Posaconazol*', ' (cód. 1742, ATC J02AC)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'pro-001', name: 'Propofol', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anestésico. Sedação em pacientes ventilados.',
    indications: `${MAIN}\n\nAnestésico. Sedação em pacientes ventilados.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Emulsão lipídica 10 mg/mL (frasco/ampola).',
        dose: 'Indução 1–2,5 mg/kg E.V.; sedação 25–75 mcg/kg/min.',
        administration: 'E.V. sem diluição ou em infusão conforme protocolo.',
        notes: 'Monitorizar triglicérides e ácido lático em infusão > 48 h.',
      },
      pediatrico: {
        presentation: 'F.A. /ampolas por 20 ml: 10 mg/ml',
        administration: 'E.V.',
        finalConcentration: 'Administrar sem diluir.',
        infusionRate: 'Bolus de 20 a 30 segundos.',
        dose: 'Bolus: 2 - 2,5 mg/kg Infusão contínua: 0,25 - 4 mg/kg/h, máximo 48 h para o período periextubação.',
        notes: 'Agente hipnótico de rápido início e curta duração. Não tem efeitos analgésicos. Precaução em pacientes com instabilidade cardiocirculatória e distúrbios do metabolismo lipídico (pancreatite, hiperlipoproteinemia primária, hiperlipidemia diabética). Estabilidade da infusão: 6 h. Pode ser administrado sem diluir ou diluído em Dx 5% a concentração maior de 2 mg/ml. Conservar em geladeira. Ver preparações padronizadas de analgosedação em UCIP.',
      },
      neonatal: {
        dose: 'Uso restrito na UCIN; esquemas de sedação conforme protocolo.',
        administration: 'E.V.',
      },
    },
    stability: '## Geral\n\n- Cadeia asséptica; usar em 6–12 h após abertura conforme norma do serviço.\n\n## Guia pediátrica\n\n- Não refrigerar. Descartar o sobrante uma vez aberto. Diluição estável 12 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nApneia, dor no sítio da injeção. Possível excitação psicomotora e diminuição da frequência cardíaca.',
    bibliography: [BIB.garrahan('Propofol*', ' (cód. 0434, ATC N01AX)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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
console.log(`\npt-BR Garrahan lote 26 (parte A): ${drugs.length}`);
