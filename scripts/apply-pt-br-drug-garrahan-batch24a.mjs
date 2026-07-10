#!/usr/bin/env node
/** Garrahan re-tradução lote 24 — 10 monografias pt-BR (parte A) */
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
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
  heartHtn: { citation: 'American Heart Association. Diretrizes de hipertensão.', url: 'https://www.heart.org/' },
};

const drugs = [
  {
    id: 'aci-001', name: 'Aciclovir', version: '1.2.2', updatedAt: '2026-07-10',
    executiveSummary: 'Herpes disseminado. Herpes-zóster e varicela em hospedeiro imunocomprometido (HIC). Encefalite herpética. Varicela em recém-nascido.',
    indications: `${MAIN}\n\nHerpes disseminado. Herpes-zóster e varicela em hospedeiro imunocomprometido (HIC). Encefalite herpética. Varicela em recém-nascido.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 500 mg (Lazar, LAFEDAR, LIA, Pharma Vial).',
        reconstitution: '10 mL de AD. Conc.: 50 mg/mL.',
        diluent: '500 mg em 100 mL de SF. Se a dose for maior que 500 mg, diluir em 250 mL de SF.',
        finalConcentration: '5 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Agitar o frasco suavemente até obter solução clara. Administrar por infusão lenta durante mais de uma hora.',
        notes: 'A refrigeração da solução reconstituída (no frasco) pode provocar precipitado que se redissolverá em temperatura ambiente. USAR SOMENTE ÁGUA DESTILADA (outras podem precipitar o aciclovir).',
      },
      pediatrico: {
        presentation: 'Comprimidos: 400–800 mg; F.A. liof.: 500 mg; Suspensão: 80 mg/mL; Creme/Unguento dermatológico: 5%; Pomada oftálmica: 3%',
        administration: 'E.V.; V.O.; Tópica',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '7 mg/mL ou menos.',
        infusionRate: 'NÃO MENOR que 1 hora.',
        dose: 'E.V.: Varicela, herpes-zóster: 30 mg/kg/dia a cada 8 h. Encefalite herpética: < 12 anos: 60 mg/kg/dia a cada 8 h; > 12 anos: 30 mg/kg/dia a cada 8 h. Herpes genital, herpes mucocutâneo em HIC, gingivoestomatite herpética: < 12 anos: 30 mg/kg/dia a cada 8 h; > 12 anos: 15 mg/kg/dia a cada 8 h. V.O.: 80 mg/kg/dia a cada 6 h (dose máxima: 3,2 g), adultos: 200–800 mg a cada 6–8 h. A dose em pacientes obesos deve ser calculada com base no peso corporal ideal. Profilaxia de transplante de medula óssea: Herpes simples, paciente com sorologia positiva (receptor e/ou doador): 10 mg/kg/dose a cada 8 h ou 250 mg/m²/dose a cada 8 h (desde 24 h antes do acondicionamento até o dia +30; suspender se iniciar ganciclovir). Receptores de transplante alogênico não relacionado para profilaxia de CMV: 500 mg/m²/dose a cada 8 h. Terapia dermatológica: Infecção por herpesvírus: aplicar 5 vezes ao dia, durante 1 semana. Oftalmologia: Pomada oftálmica 3% a cada 3 h.',
        notes: 'Risco de flebite ou inflamação no local da injeção em altas concentrações (muito alcalino). Infundir em pelo menos 1 hora a uma concentração final < 7 mg/mL. Para prevenir a precipitação do aciclovir nos túbulos renais é necessária hidratação adequada. Não refrigerar o antibiótico reconstituído.',
      },
      neonatal: {
        dose: '20 mg/kg/dose a cada 8 h em encefalite neonatal.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 12 h em temperatura ambiente.\n\n## Solução diluída (a administrar)\n\n- 12 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- Dil. com DX 5%: 24 h em temperatura ambiente.\n- Dil. com AD: 12 h em temperatura ambiente.\n- Não refrigerar.',
    adverseEffects: '## Efeitos adversos\n\nCefaleia, sinais encefalopáticos, hipotensão, rash, prurido, náuseas, vômitos, diarreia, hematúria, artralgia.',
    bibliography: [BIB.garrahan('ACIclovir', ' (cód. 0002, ATC J05AB)'), BIB.sadiUcip, BIB.pedGuide, BIB.idsa, BIB.anmat],
  },
  {
    id: 'alb-001', name: 'Albúmina humana', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Expansor de volume plasmático. Queimaduras.',
    indications: `${MAIN}\n\nExpansor de volume plasmático. Queimaduras.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco 20% ou 25% de albúmina.',
        dose: '0,5–1 g/kg conforme indicação (paracentese: 6–8 g/L de ascite retirada).',
        administration: 'E.V.',
      },
      pediatrico: {
        dose: 'Choque: Albúmina 5% em Sol. F. = 5–10 ml/kg (0,25–0,50 g/kg). Dose máxima: 6 g/kg/dia',
        administration: 'E.V.',
        presentation: 'Ver Albúmina — uso baseado em evidência científica (Boletim CIME). Frasco de 50 ml a 20%',
        notes: 'Velocidade de infusão: 0,25–1 ml/min. Ver Soluções Coloidais (Boletim CIME)',
      },
      neonatal: {
        dose: 'Reposição em choque neonatal conforme protocolo da UTI neonatal.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Estabilidade\n\n- Usar imediatamente após pinçar; não misturar com outros medicamentos.',
    adverseEffects: '## Efeitos adversos\n\nInsuficiência cardíaca por sobrecarga de volume, urticária.',
    bibliography: [BIB.garrahan('Albúmina Humana*', ' (cód. 0007, ATC B05AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'amd-001', name: 'Amiodarona', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Arritmias ventriculares.',
    indications: `${MAIN}\n\nArritmias ventriculares.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 150 mg/3 mL.',
        dose: 'PCR: 300 mg E.V. em bolus, depois 150 mg. TV estável: 150 mg em 10 min, perfusão 1 mg/min por 6 h.',
        infusionRate: 'Bolus em 10 min; depois infusão.',
        administration: 'E.V. em SG 5% (precipita em NaCl).',
      },
      pediatrico: {
        presentation: 'Comprimidos: 200 mg; Ampolas de 3 ml: 50 mg/ml; Suspensão (preparado magistral): 5 mg/ml',
        administration: 'V.O.; E.V.',
        diluent: 'Dext. 5%.',
        finalConcentration: '<3 mg/mL em via periférica; até 6 mg/mL em cateter venoso central.',
        infusionRate: 'Dose de carga em 10 min com BIC. Depois gotejo durante 12 a 24 h.',
        dose: 'E.V.: Ataque: 5 mg/kg em gotejo em 15 minutos; depois 5 mg/kg/dia em infusão contínua. V.O.: Manutenção: 10 mg/kg/dia (máximo: 200 mg/dose) a cada 12–24 h durante a primeira semana, depois continuar a 5 mg/kg/dia. Adultos: V.O.: dose de carga: 800–1600 mg/dia a cada 12–24 h durante 1–3 semanas, depois 600–800 mg/dia, manutenção: 200–400 mg/dia. Reduzir a dose em insuficiência hepática.',
        compatibility: 'Incompatível com aminofilina, ceftazidima, heparina, bicarbonato de sódio.',
        notes: 'Indicação exclusiva do especialista. E.V.: diluir em dextrosa 5%, usar sachê rígido ou vidro para infusões de mais de 2 h. Para concentrações maiores que 2 mg/ml e/ou infusões de mais de 1 hora, utilizar via central. Concentrações < 0,6 mg/ml são instáveis. Incompatível com bicarbonato. V.O.: administrar com alimentos. Interage com: digoxina (amiodarona aumenta a concentração de digoxina, reduzir a dose de digoxina aproximadamente 50% e monitorar níveis de digoxina), beta-bloqueadores e bloqueadores dos canais de cálcio (aumenta risco de bradicardia), difenilhidantoína (aumenta concentração sérica de fenitoína e diminui a de amiodarona). Evitar exposição ao sol. Este fármaco é muito eficaz, mas deve ser usado com controles seriados, por seus efeitos adversos. Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
      neonatal: {
        dose: '5 mg/kg em bolus; infusão conforme protocolo da UTI neonatal.',
        administration: 'E.V.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante após aberto.\n\n## Geral\n\n- Proteger da luz; usar linha dedicada se possível.',
    adverseEffects: '## Efeitos adversos\n\nInfiltrados pulmonares, fibrose pulmonar, microdepósitos corneanos assintomáticos (controlar com lâmpada de fenda a cada 6 meses), fotossensibilidade cutânea, hipo e hipertiroidismo, polineuropatias. QT prolongado. Ver alerta.',
    bibliography: [BIB.garrahan('Amiodarona Cloridrato*', ' (cód. 0014, ATC C01BD)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'amf-001', name: 'Anfotericina B desoxicolato', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Neutropênico febril no 7º dia. Infiltrado pulmonar durante a neutropenia. Micoses sistêmicas documentadas.',
    indications: `${MAIN}\n\nNeutropênico febril no 7º dia. Infiltrado pulmonar durante a neutropenia. Micoses sistêmicas documentadas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 50 mg (Anfotericina LIA, Richet, Northia**).',
        reconstitution: '10 mL de AD. Conc.: 5 mg/mL. Agitar o frasco até que a solução coloidal fique clara.',
        diluent: '50 mg em 500 mL de DX 5%.',
        finalConcentration: '0,1 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir o reconstituído em 500 mL de DX 5% e administrar em 6 h.',
        notes: 'Não utilizar SF (pode precipitar). Em nenhuma hipótese deve-se ultrapassar a dose de 1,5 mg/kg/dia. A sobredose pode provocar parada cardiorrespiratória.',
      },
      pediatrico: {
        presentation: 'F.A.: 50 mg',
        reconstitution: 'Reconstituir com AD. Diluir com dextrosa (NÃO salina).',
        administration: 'E.V.',
        finalConcentration: '0,1 mg/mL.',
        infusionRate: 'Entre 2 e 4 horas, com BIC.',
        dose: 'Iniciar 0,5 mg/kg/dia, aumentar 0,2 mg/kg/dia a cada 24 h, até 1 mg/kg/dia, dose máxima: 50 mg/dia. Forma rápida de administração: iniciar 0,25 mg/kg e ir aumentando com intervalos de 6 h até 1 mg/kg/dia. Não exceder 1,5 mg/kg/dia.',
        notes: 'Infundir em 4–6 h a uma concentração de 0,1 mg/ml em dextrosa 5% por via periférica e até 0,5 mg/ml por via central. Premedicar para diminuir reações adversas com hidrocortisona, paracetamol, difenidramina 30 min. antes da infusão. Não administrar com soluções que contenham eletrólitos. Corrigir hipocalemia antes da administração.',
      },
      neonatal: {
        dose: '0,5–1 mg/kg/dose a cada 24–48 h conforme protocolo da UTI neonatal.',
        administration: 'E.V. central com hidratação e controle iônico.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente na escuridão e 7 dias refrigerado.\n\n## Solução diluída (a administrar)\n\n- A solução diluída não é estável. Se sobrar, descartar o remanescente. Usar equipo fotossensível.\n\n## Guia pediátrica — Reconstituído\n\n- Uma vez reconstituído: 24 h em temperatura ambiente, 7 dias em geladeira (2–8°C).',
    adverseEffects: '## Efeitos adversos\n\nFebre, calafrios, vômitos (relacionados à infusão), hipocalemia (25%), hipomagnesemia. Nefrotoxicidade: pode ser prevenida com infusão salina prévia. Anemia (75%). Raros: leucopenia, trombocitopenia.',
    bibliography: [BIB.garrahan('Anfotericina B (DEOXICOLATO)', ' (cód. 0020, ATC J02AA)'), BIB.sadiUcip, BIB.pedGuide, BIB.idsa, BIB.anmat],
  },
  {
    id: 'amf-002', name: 'Anfotericina B liposomal', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Pacientes com micose sistêmica documentada, refratária ao tratamento com anfotericina B. Transplantados com micose sistêmica documentada. Insuficiência renal grave durante o tratamento com anfotericina B.',
    indications: `${MAIN}\n\nPacientes com micose sistêmica documentada, refratária ao tratamento com anfotericina B. Transplantados com micose sistêmica documentada. Insuficiência renal grave durante o tratamento com anfotericina B.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 50 mg (Ambisome).',
        reconstitution: '10 mL de AD. Conc.: 5 mg/mL.',
        diluent: '50 mg em 100 mL de DX 5%. Não utilizar SF.',
        finalConcentration: '0,5 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Extrair com seringa a dose necessária. Colocar o filtro na seringa e introduzir a dose do frasco em 100 mL de DX 5% e administrar em 60–120 min.',
      },
      pediatrico: {
        dose: '3–5 mg/kg/dia, dose máxima: 250 mg/dia. Se a indicação for empírica ou em certas infecções como candidemia: 3 mg/kg/dia. Mucormicose: 5 a 10 mg/kg/dia, conforme os focos envolvidos; com comprometimento do sistema nervoso central as doses variam de 7,5 a 10 mg/kg/dia.',
        infusionRate: 'Perfusão 2–3 h.',
        administration: 'E.V.',
        presentation: 'F.A.: 50 mg',
        notes: 'Não é necessária a administração concomitante de hidrocortisona ou difenidramina. Primeira dose 1 mg/kg. Velocidade de infusão: 2 h. Diluição: 0,2–2 mg/ml. Não administrar com soluções que contenham eletrólitos. Iniciar a infusão dentro de 6 h da diluição do fármaco.',
      },
      neonatal: {
        dose: 'Dose conforme protocolo da UTI neonatal (habitualmente 3–5 mg/kg/dia).',
        administration: 'E.V. central.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente e 7 dias refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente. Usar equipo fotossensível.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, arritmias, febre, calafrios. Menor hepatotoxicidade e nefrotoxicidade que a anfotericina B desoxicolato.',
    bibliography: [BIB.garrahan('Anfotericina B LIPOSOMAL*', ' (cód. 1154, ATC J02AA)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'amf-003', name: 'Anfotericina B complexo lipídico', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Neutropênico febril no 7º dia. Infiltrado pulmonar durante a neutropenia. Micoses sistêmicas documentadas.',
    indications: `${MAIN}\n\nNeutropênico febril no 7º dia. Infiltrado pulmonar durante a neutropenia. Micoses sistêmicas documentadas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 100 mg em 20 mL de solução (Abelcet).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 5 mg/mL.',
        diluent: '100 mg em 100 mL de DX 5%. Não utilizar SF.',
        finalConcentration: '1 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Extrair com seringa a dose necessária e utilizar o filtro que acompanha o frasco. Introduzir a dose requerida em 100 mL de DX 5% e administrar em 120 min.',
        notes: 'Todo o material não utilizado deve ser descartado (não contém conservantes). Utilizar a agulha com filtro para retirar a solução do frasco e depois preparar a infusão.',
      },
      pediatrico: {
        dose: 'Iniciar 0,5 mg/kg/dia, aumentar 0,2 mg/kg/dia a cada 24 h, até 1 mg/kg/dia, dose máxima: 50 mg/dia. Forma rápida de administração: iniciar 0,25 mg/kg e ir aumentando com intervalos de 6 h até 1 mg/kg/dia. Não exceder 1,5 mg/kg/dia.',
        administration: 'E.V.',
        presentation: 'F.A.: 50 mg',
        notes: 'Infundir em 4–6 h a uma concentração de 0,1 mg/ml em dextrosa 5% por via periférica e até 0,5 mg/ml por via central. Premedicar para diminuir reações adversas com hidrocortisona, paracetamol, difenidramina 30 min. antes da infusão. Não administrar com soluções que contenham eletrólitos. Corrigir hipocalemia antes da administração.',
      },
      neonatal: {
        dose: 'Dose conforme protocolo da UTI neonatal.',
        administration: 'E.V. central.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Frasco de uso único. Manter refrigerado.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente e 48 h refrigerado. Usar equipo fotossensível.',
    adverseEffects: '## Efeitos adversos\n\nFebre, calafrios, vômitos (relacionados à infusão), hipocalemia (25%), hipomagnesemia. Nefrotoxicidade: pode ser prevenida com infusão salina prévia. Anemia (75%). Raros: leucopenia, trombocitopenia.',
    bibliography: [BIB.garrahan('Anfotericina B (DEOXICOLATO)', ' (cód. 0020, ATC J02AA)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'aml-001', name: 'Amlodipino', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hipertensão. Bloqueador dos canais de cálcio.',
    indications: `${MAIN}\n\nHipertensão. Bloqueador dos canais de cálcio.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 5 e 10 mg.',
        dose: '5–10 mg/dia V.O. em dose única matutina.',
        administration: 'V.O.',
      },
      pediatrico: {
        dose: 'Crianças: inicial: 0,06 mg/kg/dia (até 5 mg/dia), uma vez ao dia; dose máxima: 0,6 mg/kg/dia (até 10 mg/dia). Adultos: inicial: 5 mg uma vez ao dia, manutenção: 5–10 mg uma vez ao dia.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 5–10 mg; Suspensão (preparado magistral): 1 mg/ml',
        notes: 'Não descontinuar abruptamente o fármaco.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula, proteger da luz.',
    adverseEffects: '## Efeitos adversos\n\nPalpitações, edema periférico, cefaleia, tontura, fadiga, angina, arritmia cardíaca (raro).',
    bibliography: [BIB.garrahan('AMLOdipina Besilato', ' (cód. 1509, ATC C08CA)'), BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'amp-001', name: 'Ampicilina', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Infecção ORL, respiratória, odontoestomatológica, gastrointestinal, geniturinária, de pele e tecido mole, neurológica, cirurgia, traumatologia, meningite bacteriana e septicemia.',
    indications: `${MAIN}\n\nInfecção ORL, respiratória, odontoestomatológica, gastrointestinal, geniturinária, de pele e tecido mole, neurológica, cirurgia, traumatologia, meningite bacteriana e septicemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 1 g (Bagó, Drawer, Klonal, LIA, Pharmavial, Rivero).',
        reconstitution: '10 mL de AD. Conc.: 100 mg/mL.',
        diluent: '1 g em 100 mL de SF.',
        finalConcentration: '10 mg/mL.',
        administration: 'E.V. direta: Sim. Reconst. 1 g em 10–15 mL de AD e passar em NÃO MENOS DE 10–15 min (veloc. máxima: 100 mg/min). E.V. intermitente: Sim. Diluir em 50–100 mL de SF. Passar em 15–60 min.',
        notes: 'A DX 5% acelera a hidrólise da ampicilina (usar imediatamente). Prefere-se diluir com SF.',
      },
      pediatrico: {
        presentation: 'F.A.: 500–1000 mg',
        reconstitution: 'RECONSTITUIR COM ÁGUA DESTILADA.',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%, Ringer.',
        finalConcentration: 'Entre 2 e 30 mg/mL.',
        infusionRate: 'Entre 15 e 30 min com BIC.',
        dose: 'Recém-nascidos: conforme idade e peso, ver Tabela de Doses de antimicrobianos em neonatologia; Crianças: 100 mg/kg/dia a cada 6 h. Pneumonia: 200 mg/kg/dia a cada 6 h; Meningite: 300–400 mg/kg/dia a cada 6 h, dose máxima: 12 g/dia; Adultos: 500–3000 mg/dose a cada 6 h. Ver tabela de ajuste de dose de antibióticos em I.R.',
        notes: 'Quando o F.A. é reconstituído com concentração de 100 mg/ml é estável somente por 2 h em geladeira. E.V. push administrar em 3–5 minutos, infusão intermitente 15–30 minutos.',
      },
      neonatal: {
        dose: '50 mg/kg/dose a cada 12 h em RN a termo; intervalos maiores em prematuros (protocolo da UTI neonatal).',
        administration: 'E.V. lenta em bomba de seringa.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente, 4 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 4 h em temperatura ambiente e 24 h refrigerado.\n\n## Guia pediátrica\n\n- 8 h em temperatura ambiente (25°). 48 h em geladeira (4°).',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, diarreia, glossite, anemia, trombocitopenia, eosinofilia, eritema, rash, urticária.',
    bibliography: [BIB.garrahan('ampicilina', ' (cód. 0018, ATC J01CA)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'amp-002', name: 'Ampicilina-sulbactam', version: '1.2.5', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico de amplo espectro.',
    indications: `${MAIN}\n\nAntibiótico de amplo espectro.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 1 g de ampicilina + 0,5 g de sulbactam (PharmaVial, Drawer, Klonal, Norgreen, Northia**, Richmond).',
        reconstitution: '5 mL de AD. Conc.: 300 mg/mL.',
        diluent: '1,5 g em 100 mL de SF.',
        finalConcentration: 'Conc. AMS: 15 mg/mL.',
        administration: 'E.V. direta: Sim. Reconst. 1,5 g em 3 mL de AD e admin. 3–5 min. E.V. intermitente: Sim. Admin. 1,5 g em 100 mL de SF em 15–30 min.',
        notes: 'A DX 5% acelera a hidrólise da ampicilina (usar imediatamente). Prefere-se diluir com SF.',
      },
      pediatrico: {
        presentation: 'F.A.: 1,5 g (ampicilina: 1 g + sulbactam: 0,5 g)',
        reconstitution: 'RECONSTITUIR COM ÁGUA DESTILADA.',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%, Ringer.',
        finalConcentration: 'Entre 2 e 30 mg/mL.',
        infusionRate: 'Entre 15 e 30 min com BIC.',
        dose: 'Infecções leves, moderadas e profilaxia: Crianças: 150 mg (ampicilina + sulbactam)/kg/dia a cada 6 h, Adultos: 1500 mg/dose a cada 6 h; dose máxima: 6 g/dia (ampicilina + sulbactam). Infecções graves (meningite, bacteriemias, infecções intra-abdominais complicadas, osteomielite): Crianças: 300 mg (ampicilina + sulbactam)/kg/dia a cada 6 h; Adultos: 3000 mg/dose a cada 6 h. Dose máxima: 12 g/dia (ampicilina + sulbactam).',
        notes: 'Em pacientes com restrição de Na, observar que 1500 mg de sultamicilina contêm 5 mEq de Na. Interage com alopurinol (pode aumentar a frequência de rash por ampicilina).',
      },
      neonatal: {
        dose: 'Dose conforme idade pós-menstrual e peso (protocolo da UTI neonatal).',
        administration: 'E.V. em bomba de seringa.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente e 4 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 3 h em temperatura ambiente e 24 h refrigerado.\n\n## Guia pediátrica\n\n- 8 h em temperatura ambiente (25°). 48 h em geladeira (4°). Conservar em temperatura ambiente, protegido da luz.',
    adverseEffects: '## Efeitos adversos\n\nDor no local da injeção e flebite, diarreia, rash, náuseas, cefaleia, eritema. Leve aumento de enzimas hepáticas. Raro: alterações hematológicas.',
    bibliography: [BIB.garrahan('ampicilina + SULBACTAM', ' (cód. 0903, ATC J01CA)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'ani-001', name: 'Anidulafungina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Profilaxia e tratamento de infecções por *Candida* spp. e *Aspergillus* spp. Restrito a: substituição parcial em profilaxia e tratamento de infecções fúngicas em pacientes transplantados de órgãos sólidos; profilaxia em pacientes com transplante de células hematopoiéticas; tratamento combinado em pacientes com infecções fúngicas refratárias; tratamento em pacientes hemato-oncológicos neutropênicos.',
    indications: `${MAIN}\n\nProfilaxia e tratamento de infecções por *Candida* spp. e *Aspergillus* spp. Restrito a: substituição parcial em profilaxia e tratamento de infecções fúngicas em pacientes transplantados de órgãos sólidos; profilaxia em pacientes com transplante de células hematopoiéticas; tratamento combinado em pacientes com infecções fúngicas refratárias; tratamento em pacientes hemato-oncológicos neutropênicos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 100 mg (Ecalta).',
        reconstitution: '30 mL de AD. Conc.: 3,33 mg/mL.',
        diluent: '100 mg em 100 mL de SF ou DX 5%.',
        finalConcentration: '0,77 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Administrar a velocidade de 100 mg em 90 min.',
        notes: 'A dose de carga (200 mg) deve ser administrada em 3 horas.',
      },
      pediatrico: {
        dose: 'Crianças: Dose de carga: 3 mg/kg/dia a cada 24 h, manutenção: 1,5 mg/kg/dia a cada 24 h; Adultos: dose de carga: 200 mg/dia, manutenção: 100 mg/dia',
        administration: 'E.V.',
        presentation: 'F.A. (pó liofilizado): 100 mg',
        notes: 'Velocidade de infusão: < 1,1 mg/minuto (não administrar em bolus).',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h refrigerado. Diluir imediatamente.\n\n## Solução diluída (a administrar)\n\n- 48 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nAssociadas à infusão: exantema, urticária, rubor, prurido, broncoespasmo, dispneia, hipotensão. Outras: hipocalemia, diarreia, aumento de ALT, enzimas hepáticas, fosfatase alcalina sérica e bilirrubina sérica.',
    bibliography: [BIB.garrahan('Anidulafungina*', ' (cód. 1927, ATC J02AX)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
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
console.log(`\npt-BR Garrahan lote 24 (parte A): ${drugs.length}`);
