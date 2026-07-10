#!/usr/bin/env node
/** Lote 5/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/farmacologia/drugs');

const ADJUST = '> Ajustar conforme protocolo institucional e prescrição médica.';

const BIB = {
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Diretrizes clínicas.', url: 'https://www.idsociety.org/' },
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  pedGuide: { citation: 'Guia institucional de diluição e administração pediátrica. Junho de 2026.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  ahaPals: { citation: 'American Academy of Pediatrics. Pediatric Advanced Life Support (PALS).', url: 'https://www.aap.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  wao: { citation: 'World Allergy Organization. Anaphylaxis guidance for healthcare providers.', url: 'https://www.worldallergy.org/' },
};

const drugs = [
  {
    id: 'suc-001', name: 'Succinilcolina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Bloqueador neuromuscular despolarizante de ação ultrarrápida para intubação; contraindicações em hipercalemia e queimados.',
    indications: `## Indicações\n\n- Intubação em sequência rápida (SRI) quando não houver contraindicação.\n- Eletroconvulsoterapia (esquemas específicos).\n\n## Precauções\n\n- Hipercalemia, rabdomiólise, queimaduras extensas, paralisia periódica, distrofias musculares.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola liofilizado 100–500 mg.', dose: '1–1,5 mg/kg IV em bolus para SRI.', administration: 'IV em bolus rápido.' },
      pediatrico: {
        presentation: 'Ampola 500 mg/10 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        infusionRate: 'Push.',
        dose: '1 mg/kg/dose. Depois 0,3 a 0,6 mg/kg até obter o efeito desejado.',
        notes: 'Bloqueador neuromuscular; requer suporte ventilatório durante a administração; não altera o estado de consciência. Pode causar hiper e hipotensão, parada cardíaca, hipertermia maligna, exantema, sialorreia, depressão respiratória.',
      },
      neonatal: { dose: '3 mg/kg IV em SRI conforme protocolo.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Reconstituir e utilizar imediatamente.\n\n## Guia pediátrica\n\n- Conservar refrigerado. Estabilidade conforme laboratório produtor.',
    adverseEffects: '## Efeitos adversos\n\n- Hipercalemia grave, fasciculações, mialgia, bradicardia em crianças.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'isa-001', name: 'Isavuconazol', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Triazol IV (Cresemba) para aspergilose invasiva e mucormicose; requer filtro em linha.',
    indications: `## Indicações principais\n\n- Aspergilose invasiva.\n- Mucormicose conforme prescrição.\n\n## Precauções\n\n- Requer filtro em linha de 0,2–1,2 µm. Interações com inibidores/indutores do CYP3A4.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 200 mg de isavuconazonium sulfato (equiv. a 186 mg de isavuconazol) (Cresemba).',
        reconstitution: '5 mL de água para injeção. Conc.: 40 mg/mL de isavuconazonium sulfato. Agitar suavemente.',
        diluent: '200 mg em 250 mL de SF ou SG 5%.',
        finalConcentration: '0,8 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 250 mL de SF ou SG 5% e administrar em 60 min mediante filtro em linha (0,2–1,2 µm). Não usar seringa.',
        notes: 'Requer filtro em linha de 0,2–1,2 µm durante a infusão. Não administrar em bolus. Dose de ataque: 200 mg a cada 8 h por 6 doses (48 h); manutenção: 200 mg/dia. Indicado em aspergilose invasiva e mucormicose. Interações com inibidores/indutores do CYP3A4.',
      },
      pediatrico: { dose: 'Esquemas sob supervisão de infectologia pediátrica.', administration: 'IV intermitente conforme protocolo.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente; 24 h refrigerada.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, diarreia, elevação de transaminases, prolongamento do QT.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'pen-001', name: 'Penicilina G sódica', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Penicilina natural de espectro estreito; primeira linha na sífilis, meningite por pneumococo sensível e estreptococo.',
    indications: `## Indicações principais\n\n- Sífilis, faringite estreptocócica, meningite/pneumonia por *Streptococcus* sensível.\n- Endocardite por estreptococo sensível (esquemas prolongados).\n\n## Precauções\n\n- Alergia a penicilinas.\n- Doses altas: neurotoxicidade (convulsões) na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 3 MUI (Bencilpenicilina sódica Fabra, Drawer, Northia, Klonal).',
        reconstitution: '5 mL de água para injeção. Conc.: 0,6 MUI/mL.',
        diluent: '3 MUI em 100 mL de SF.',
        finalConcentration: '0,03 MUI/mL administrar entre 15–60 min.',
        administration: 'IV direta: Não. Sim, 5 mL de água para injeção, passar em 3–5 min. IV intermitente: Sim.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '100.000 a 500.000 UI/mL. Lactentes: 50.000 UI/mL.',
        infusionRate: '15 a 60 minutos com bomba de infusão.',
        dose: '100.000 a 250.000 UI/kg/dia em 4 ou 6 doses diárias. 250.000 a 400.000 UI/kg/dia para infecções graves. Máx. 24 milhões UI/dia.',
        notes: 'Antibiótico bactericida para tratamento de septicemia, meningite, pericardite, endocardite, pneumonia. Pode causar anafilaxia, convulsões, tontura, diarreia, neutropenia.',
      },
      neonatal: { dose: '50.000 UI/kg/dose a cada 12 h em RN; meningite: esquemas mais frequentes (protocolo da UCIN).', administration: 'IV lenta.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 48 horas refrigerado.\n\n## Solução diluída (a administrar)\n\n- 48 horas refrigerado.\n\n## Guia pediátrica\n\n- 7 dias refrigerado.',
    adverseEffects: '## Frequentes\n\n- Rash, flebite.\n\n## Graves\n\n- Anafilaxia, convulsões com doses altas na DRC.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'aci-001', name: 'Aciclovir', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Antiviral para herpes simples, varicela-zóster e encefalite herpética; ajustar na DRC.',
    indications: `## Indicações\n\n- Encefalite herpética, infecções herpéticas disseminadas.\n- Profilaxia e tratamento em imunocomprometidos.\n\n## Precauções\n\n- Nefrotoxicidade por cristais: hidratar e ajustar dose na DRC. Neurotoxicidade na DRC.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 500 mg (Lazar, LAFEDAR, LIA, Pharma Vial).',
        reconstitution: '10 mL de água para injeção. Conc.: 50 mg/mL.',
        diluent: '500 mg em 100 mL de SF. Se a dose for maior que 500 mg, diluir em 250 mL de SF.',
        finalConcentration: '5 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Agitar o frasco suavemente até obter solução clara. Administrar por infusão lenta durante mais de uma hora.',
        notes: 'A refrigeração da solução reconstituída (no frasco) pode provocar precipitado que se redissolverá em temperatura ambiente. USAR SOMENTE ÁGUA DESTILADA (outras podem precipitar o aciclovir).',
      },
      pediatrico: {
        presentation: 'Frasco-ampola 500 mg.',
        administration: 'IV (não SC nem IM).',
        diluent: 'SF, SG 5%.',
        finalConcentration: '7 mg/mL ou menos.',
        infusionRate: 'NÃO MENOR que 1 hora.',
        dose: 'Menos de 80 mg/kg/dia.',
        notes: 'Antiviral ativo contra os vírus humanos Herpes simple, incluindo o Herpes zoster. Pode causar cefaleia, tontura, convulsões, alucinações, náuseas, vômitos, diarreia, necrose tissular se ocorrer extravasamento, nefrotoxicidade, anafilaxia.',
      },
      neonatal: { dose: '20 mg/kg/dose a cada 8 h em encefalite neonatal.', administration: 'IV lenta.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 12 h em temperatura ambiente.\n\n## Solução diluída (a administrar)\n\n- 12 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- Dil. com SG 5%: 24 h em temperatura ambiente.\n- Dil. com água para injeção: 12 h em temperatura ambiente.\n- Não refrigerar.',
    adverseEffects: '## Efeitos adversos\n\n- Cefaleia, tontura, convulsões, alucinações, náuseas, vômitos, diarreia.\n- Necrose tissular por extravasamento, nefrotoxicidade, anafilaxia.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.idsa, BIB.anmat],
  },
  {
    id: 'ade-001', name: 'Adenosina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Antiarrítmico ultracurto para taquicardia supraventricular paroxística.',
    indications: `## Indicações\n\n- Taquicardia supraventricular paroxística (TSVP) estável.\n\n## Precauções\n\n- Bolus rápido com flush imediato. Asma grave: utilizar com cautela. Assistolia brevíssima pode ser normal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 3 mg/mL.', dose: '6 mg IV em bolus rápido, depois 12 mg se persistir (máx. 30 mg).', administration: 'IV proximal com flush de 20 mL.' },
      pediatrico: {
        presentation: 'Ampola 6 mg/2 mL.',
        administration: 'IV.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '3 mg/mL.',
        infusionRate: 'Push com lavagem imediata de SF de 5 a 10 mL (administração com duas seringas).',
        dose: 'Inicial 0,05 a 1 mg/kg/dose. Se não houver efeito, repetir aos 2 min e ir incrementando até 0,3 mg/kg/dose.',
        notes: 'Agente antiarrítmico. Pode causar hipotensão, bradicardia, arritmia transitória, dor torácica, dispneia, cefaleia, náuseas. MEIA-VIDA <10 SEGUNDOS. MONITORAR SEMPRE.',
      },
      neonatal: { dose: '0,05–0,1 mg/kg em bolus conforme protocolo.', administration: 'IV com flush.' },
    },
    stability: '## Guia pediátrica\n\n- Descartar o remanescente após aberto.\n\n## Geral\n\n- Utilizar sem diluição; administrar imediatamente.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, bradicardia, arritmia transitória, dor torácica, dispneia, cefaleia, náuseas.\n- Rubor, pausa sinusal breve, broncoespasmo.',
    bibliography: [BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'adr-001', name: 'Adrenalina (epinefrina)', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Catecolamina simpaticomimética não seletiva. Uso em parada cardiorrespiratória, anafilaxia, broncoespasmo grave e suporte hemodinâmico conforme protocolo institucional.',
    indications: `## Indicações principais\n\n- Parada cardiorrespiratória (PCR): conforme algoritmo ACLS / PALS / NRP conforme idade.\n- Anafilaxia: primeira linha junto com medidas de suporte vital.\n- Broncoespasmo grave refratário (conforme protocolo e via autorizada).\n\n## Precauções\n\n- Monitorar FC, PA, ritmo e perfusão durante e após a administração.\n- Conservar em temperatura ambiente entre 15 e 30°. Proteger da luz.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 1 mg/mL (1:1000) ou 0,1 mg/mL (1:10 000) conforme apresentação institucional.',
        dose: 'PCR IV/IO: 1 mg a cada 3–5 min. Anafilaxia IM: 0,3–0,5 mg; repetir a cada 5–15 min se persistir.',
        administration: 'IV/IO em PCR; IM em anafilaxia.',
        notes: 'Registrar hora, dose, via e resposta hemodinâmica.',
      },
      pediatrico: {
        presentation: 'Ampola 1 mg/1 mL (parada); mesma apresentação para anafilaxia SC.',
        administration: 'Parada: IV ou intracardíaca. Anafilaxia: SC.',
        diluent: 'Parada: SF, SG 5%. Anafilaxia: sem diluente.',
        finalConcentration: 'Parada: 0,1 mg/mL (diluir uma ampola até 10 mL). Anafilaxia: 0,01 mg/kg.',
        infusionRate: 'Push.',
        dose: 'Parada: pode ser realizada a cada 5 min, quantas vezes forem necessárias. Anafilaxia: a cada 15 min até 2 doses, depois a cada 4 h.',
        notes: 'Parada: estimulante cardíaco e vasopressor. Anafilaxia: broncodilatador e antialérgico. Degrada-se rapidamente. Não utilizar em caso de coloração da solução ou precipitado. Descartar o remanescente. Conservar em temperatura ambiente entre 15 e 30°. Proteger da luz.',
      },
      neonatal: {
        presentation: 'Ampola 0,1 mg/mL (1:10 000) preferida para neonatos quando disponível.',
        dose: 'RCP neonatal: 0,01–0,03 mg/kg IV/IO/endotraqueal conforme algoritmo NRP vigente.',
        administration: 'Via umbilical, periférica ou outro acesso conforme situação.',
      },
    },
    stability: '## Guia pediátrica\n\n- Degrada-se rapidamente. Não utilizar em caso de coloração da solução ou precipitado. Descartar o remanescente.\n\n## Geral\n\n- Proteger da luz. Conservar em temperatura ambiente entre 15 e 30°.',
    adverseEffects: '## Frequentes\n\n- Taquicardia, palpitações, tremor, ansiedade, hipertensão transitória, cefaleia.\n\n## Graves\n\n- Arritmias ventriculares, isquemia miocárdica, extravasamento com necrose tissular.',
    bibliography: [BIB.pedGuide, BIB.aha, BIB.ahaPals, BIB.wao],
  },
  {
    id: 'alb-001', name: 'Albumina humana', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Coloide para hipovolemia seletiva, síndrome nefrótica e paracentese na cirrose (esquemas específicos).',
    indications: `## Indicações\n\n- Hipovolemia com indicação de coloide conforme protocolo.\n- Síndrome hepatorenal e paracentese maciça na cirrose (esquemas).\n- Hipoalbuminemia com efeito clínico demonstrado (contextos limitados).\n\n## Precauções\n\n- Sobrecarga volêmica. Não utilizar rotineiramente no choque séptico sem indicação.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 20% ou 25% albumina.', dose: '0,5–1 g/kg conforme indicação (paracentese: 6–8 g/L de ascite retirada).', administration: 'IV.' },
      pediatrico: { dose: '0,5–1 g/kg conforme protocolo pediátrico.', administration: 'IV.' },
      neonatal: { dose: 'Reposição em choque neonatal conforme protocolo da UCIN.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- Utilizar imediatamente após pinçar; não misturar com outros medicamentos.',
    adverseEffects: '## Efeitos adversos\n\n- Sobrecarga hídrica, reações de hipersensibilidade (raro).',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'amd-001', name: 'Amiodarona', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Antiarrítmico classe III para taquiarritmias ventriculares e supraventriculares em urgência e manutenção.',
    indications: `## Indicações\n\n- FV/pTV refratária em PCR (após adrenalina conforme ACLS).\n- Taquicardia ventricular estável, FA com resposta ventricular rápida (protocolo).\n\n## Precauções\n\n- Hipotensão com infusão rápida. Toxicidade pulmonar/hepática com uso crônico.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 150 mg/3 mL.', dose: 'PCR: 300 mg IV em bolus, depois 150 mg. TV estável: 150 mg em 10 min, perfusão 1 mg/min por 6 h.', infusionRate: 'Bolus em 10 min; depois infusão.', administration: 'IV em SG 5% (precipita em SF).' },
      pediatrico: {
        presentation: 'Ampola 150 mg/3 mL.',
        administration: 'IV.',
        diluent: 'SG 5%.',
        finalConcentration: '<3 mg/mL em via periférica; até 6 mg/mL em cateter venoso central.',
        infusionRate: 'Dose de ataque em 10 min com bomba de infusão. Depois gotejo durante 12 a 24 h.',
        dose: 'Dose de ataque 5 mg/kg. Gotejo 15 mg/kg/dia durante 12 a 24 h.',
        compatibility: 'Incompatível com aminofilina, ceftazidima, heparina, bicarbonato de sódio.',
        notes: 'Antiarrítmico. Pode causar hipotensão, bradicardia, bloqueio AV, tontura, cefaleia, pele azulada, náuseas, vômitos, neutropenia, anemia, flebite, SDRA, anafilaxia. Toxicidade pulmonar e hepática.',
      },
      neonatal: { dose: '5 mg/kg em bolus; infusão conforme protocolo da UCIN.', administration: 'IV.' },
    },
    stability: '## Guia pediátrica\n\n- Descartar o remanescente após aberto.\n\n## Geral\n\n- Proteger da luz; utilizar linha dedicada se possível.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, bradicardia, bloqueio AV, tontura, cefaleia, pele azulada, náuseas, vômitos.\n- Neutropenia, anemia, flebite, SDRA, anafilaxia. Toxicidade pulmonar e hepática.',
    bibliography: [BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'amf-001', name: 'Anfotericina B desoxicolato', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Polieno de reserva para infecções fúngicas graves; formulação convencional (desoxicolato) com maior nefrotoxicidade.',
    indications: `## Indicações principais\n\n- Candidíase invasiva, aspergilose, criptococose, mucormicose em esquemas.\n- Doença fúngica sistêmica grave quando triazóis/equinocandinas não são adequados.\n\n## Precauções\n\n- Nefrotoxicidade, hipocalemia, hipomagnesemia. Não utilizar SF. Máximo 1,5 mg/kg/dia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 50 mg (Anfotericina LIA, Richet, Northia**).',
        reconstitution: '10 mL de água para injeção. Conc.: 5 mg/mL. Agitar o frasco até que a solução coloidal fique clara.',
        diluent: '50 mg em 500 mL de SG 5%.',
        finalConcentration: '0,1 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir o reconstituído em 500 mL de SG 5% e administrar em 6 h.',
        notes: 'Não utilizar SF (pode precipitar). Sob nenhuma hipótese deve-se superar a dose de 1,5 mg/kg/dia. A sobredose pode provocar parada cardiorrespiratória.',
      },
      pediatrico: {
        presentation: 'Frasco-ampola pó para reconstituir 50 mg.',
        reconstitution: 'Reconstituir com água para injeção. Diluir com dextrose (NÃO salina).',
        administration: 'IV.',
        finalConcentration: '0,1 mg/mL.',
        infusionRate: 'Entre 2 e 4 horas, com bomba de infusão.',
        dose: 'Até 1,5 mg/kg/dia.',
        notes: 'Antifúngico sistêmico. Pode causar hipotensão, arritmias, dor torácica, hipertensão, taquicardia, cefaleia, diarreia, náuseas, vômitos, dor abdominal, anemia, dispneia, reações anafiláticas. Uma sobredose pode provocar parada cardiorrespiratória. Recomenda-se controle de temperatura, pulso, respiração e pressão arterial a cada 30 minutos durante a infusão.',
      },
      neonatal: { dose: '0,5–1 mg/kg/dose a cada 24–48 h conforme protocolo da UCIN.', administration: 'IV central com hidratação e controle iônico.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente na escuridão e 7 dias refrigerado.\n\n## Solução diluída (a administrar)\n\n- A solução diluída não é estável. Se sobrar, descartar o remanescente. Utilizar equipo fotossensível.\n\n## Guia pediátrica — Reconstituído\n\n- Uma vez reconstituído: 24 h em temperatura ambiente, 7 dias refrigerado (2–8°C).',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, arritmias, dor torácica, taquicardia, cefaleia, diarreia, náuseas, vômitos, anemia, dispneia, anafilaxia.\n- Parada cardiorrespiratória por sobredose. Nefrotoxicidade, hipocalemia.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.idsa, BIB.anmat],
  },
  {
    id: 'amf-002', name: 'Anfotericina B lipossomal', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Formulação lipossomal com menor nefrotoxicidade; candidíase/aspergilose sistêmica e criptococose.',
    indications: `## Indicações principais\n\n- Candidíase sistêmica, aspergilose invasiva, criptococose meníngea em esquemas.\n- Alternativa à anfotericina B convencional quando se busca menor nefrotoxicidade.\n\n## Precauções\n\n- Ainda com risco renal; monitorar função renal e íons. Reações relacionadas à infusão.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola contendo 50 mg (Ambisome).',
        reconstitution: '10 mL de água para injeção. Conc.: 5 mg/mL.',
        diluent: '50 mg em 100 mL de SG 5%. Não utilizar SF.',
        finalConcentration: '0,5 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Extrair com seringa a dose necessária. Colocar o filtro na seringa e introduzir a dose do frasco em 100 mL de SG 5% e administrar em 60–120 min.',
      },
      pediatrico: { dose: '3–5 mg/kg/dia IV.', infusionRate: 'Perfusão 2–3 h.', administration: 'IV central.' },
      neonatal: { dose: 'Dose conforme protocolo da UCIN (habitualmente 3–5 mg/kg/dia).', administration: 'IV central.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente e 7 dias refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente. Utilizar equipo fotossensível.',
    adverseEffects: '## Efeitos adversos\n\n- Reações relacionadas à infusão, nefrotoxicidade (menor que convencional), hipocalemia.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
];

for (const drug of drugs) {
  const out = {
    id: drug.id,
    name: drug.name,
    branch: 'atencion-sanitaria',
    version: drug.version,
    updatedAt: drug.updatedAt,
    translationReviewed: true,
    executiveSummary: drug.executiveSummary,
    indications: drug.indications,
    dilution: drug.dilution,
    stability: drug.stability,
    adverseEffects: drug.adverseEffects,
    bibliography: drug.bibliography,
  };
  fs.writeFileSync(path.join(OUT, `${drug.id}.json`), `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log(`✓ ${drug.id}`);
}

console.log(`\nLote 5: ${drugs.length} monografias pt-BR`);
