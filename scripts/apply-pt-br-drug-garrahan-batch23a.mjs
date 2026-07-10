#!/usr/bin/env node
/** Garrahan re-tradução lote 23 — 10 monografias pt-BR (parte A) */
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
};

const drugs = [
  {
    id: 'cef-008', name: 'Cefepima', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Cefalosporina de 4ª geração. Efetiva frente a bacilos gram-negativos (incluídos os não fermentadores: *P. aeruginosa*), cocos gram-positivos (*S. pneumoniae*, *S. aureus* resistente à meticilina) e cocos gram-negativos (*N. meningitidis*).',
    indications: `${MAIN}\n\nCefalosporina de 4ª geração. Efetiva frente a bacilos gram-negativos (incluídos os não fermentadores: *P. aeruginosa*), cocos gram-positivos (*S. pneumoniae*, *S. aureus* resistente à meticilina) e cocos gram-negativos (*N. meningitidis*).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola 1 g ou 2 g.',
        dose: '1–2 g E.V. a cada 8–12 h.',
        infusionRate: 'Perfusão 30 min.',
        administration: 'E.V.',
      },
      pediatrico: {
        dose: 'Infecções leves e moderadas: 50 mg/kg/dose a cada 12 h; Infecções graves (endocardite, neutropenia febril) 50 mg/kg/dose a cada 8 h, Fibrose cística: 50 mg/kg/dose a cada 6 h, dose máxima pediátrica: 2 g/dose. Adultos: 2 g a cada 8–12 h.',
        administration: 'E.V.; I.M.',
        presentation: 'F.A.: 1–2 g',
        notes: 'E.V.: Infundir em 20–30 minutos.',
      },
      neonatal: {
        dose: '30 mg/kg/dose a cada 12 h (protocolo da UTI neonatal).',
        administration: 'E.V.',
      },
    },
    stability: '## Estabilidade\n\n- 24 h refrigerada após diluição.',
    adverseEffects: '## Efeitos adversos\n\nDiarreia, náuseas, vômitos, cefaleia, rash (2%).',
    bibliography: [BIB.garrahan('CefEPIME*', ' (cód. 1502, ATC J01DE)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cef-009', name: 'Cefalotina', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Cefalosporina de primeira geração. Profilaxia cirúrgica, tratamento de infecções do trato respiratório, ouvido médio, pele e tecidos moles causadas por bactérias suscetíveis: cocos gram-positivos.',
    indications: `${MAIN}\n\nCefalosporina de primeira geração. Profilaxia cirúrgica, tratamento de infecções do trato respiratório, ouvido médio, pele e tecidos moles causadas por bactérias suscetíveis: cocos gram-positivos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 1 g (Arecemin, Cefalotina Larjan, Drawer, Dosagluc, Cefade, Richet).',
        reconstitution: '5 mL de AD. Conc.: 200 mg/mL.',
        diluent: '1–2 g em 100 mL de SF ou SG 5%.',
        finalConcentration: '10–20 mg/mL.',
        administration: 'E.V. direta: Sim. Reconst. com 10 mL de AD, SF ou SG 5% e admin. em 3–5 min. E.V. intermitente: Sim. Diluir 1 g em 100 mL de SF ou SG 5% e admin. em 30–60 min.',
        notes: 'Se o conteúdo do frasco não se dissolver por completo, adicionar AD (0,2–0,5 mL) e agitar vigorosamente. O escurecimento da solução em temperatura ambiente não afeta a eficácia. É possível a administração I.M.',
      },
      pediatrico: {
        presentation: 'F.A.: 1000 mg',
        administration: 'E.V.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: '100 mg/mL.',
        infusionRate: '3 a 5 min.',
        dose: '100 mg/kg/dia a cada 6–8 h. Adultos: 500–2000 mg a cada 6 h. Dose pré-cirúrgica em adultos: 1–2 g. Dose máxima: 12 g.',
        notes: 'Associada a aminoglicosídeos pode aumentar o risco de nefrotoxicidade.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 12 h em temperatura ambiente, 96 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- 96 h refrigerado; 12 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nReações alérgicas, tromboflebite, trombocitopenia, leucopenia, nefrotoxicidade.',
    bibliography: [BIB.garrahan('cefALOTina sódica', ' (cód. 0035, ATC J01DB)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-010', name: 'Ceftarolina', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Para bacteriemias persistentes por SAMR com foco respiratório/SDRA. Infecções complicadas de pele e tecidos moles e pneumonia adquirida na comunidade. Indicação exclusiva do especialista.',
    indications: `${MAIN}\n\nPara bacteriemias persistentes por SAMR com foco respiratório/SDRA.\nInfecções complicadas de pele e tecidos moles e pneumonia adquirida na comunidade.\nIndicação exclusiva do especialista.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 600 mg (Zinforo).',
        reconstitution: '20 mL de AD. Conc.: 30 mg/mL.',
        diluent: '600 mg em 250 mL de SF ou SG 5%.',
        finalConcentration: '2,4 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Reconst. 600 mg com 250 mL de AD, SF ou SG 5% e admin. em 60 min.',
      },
      pediatrico: {
        dose: 'Infecções complicadas da pele e tecidos moles e Pneumonia adquirida na comunidade: Neonatos até 2 meses: 6 mg/kg/dose a cada 8 h, > 2 meses a < 2 anos: 8 mg/kg/dose a cada 8 h, > 2 anos a < 12 anos: 12 mg/kg/dose (máximo 400 mg) a cada 8 h, adolescentes entre 12 a < 18 anos com peso < 33 kg: 12 mg/kg/dose (máximo 400 mg) a cada 8 h, adolescentes entre 12 a < 18 anos com peso > 33 kg: 600 mg/dose a cada 12 h, adultos: 600 mg/dose a cada 12 h. I.R.: adultos e adolescentes > 12 a 18 anos e Peso > 33 kg: Clcr 30–50 ml/min: 400 mg/dose a cada 12 h; Clcr 15–30 ml/min: 300 mg/dose a cada 12 h; Doença renal (incluindo hemodiálise): 200 mg/a cada 12 h. 12–18 anos e Peso < 33 kg e crianças 2–12 anos: Clcr 30–50 ml/min: 8 mg/kg/dose a cada 8 h (máximo: 300 mg a cada 8 h); Clcr 15–30 ml/min: 6 mg/kg/dose a cada 8 h (máximo 200 mg/a cada 8 h).',
        administration: 'E.V.',
        presentation: 'F.A. pó: 600 mg',
        notes: 'Administrar mediante infusão E.V. durante 120 min.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Diluir e utilizar imediatamente.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente e 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nRash, prurido, cefaleia, tontura, flebite, náuseas, vômitos, dor abdominal, transaminases aumentadas, pirexia, reações no local da infusão (eritema, flebite, dor), teste de Coombs positivo.',
    bibliography: [BIB.garrahan('CeftaROLINA Fosamil*', ' (cód. 2037, ATC J01DI)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-011', name: 'Ceftazidima-avibactam', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Restrito a casos com microorganismos multirresistentes, produtores de carbapenemases com alto risco de disseminação horizontal na área crítica e alta morbimortalidade associada.',
    indications: `${MAIN}\n\nRestrito a casos com microorganismos multirresistentes, produtores de carbapenemases com alto risco de disseminação horizontal na área crítica e alta morbimortalidade associada.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 2 g de ceftazidima + 0,5 g de avibactam (Zavicefta).',
        reconstitution: '10 mL de AD. Conc.: 200 mg/mL de ceftazidima e 50 mg/mL de avibactam.',
        diluent: '2,5 g em 100 mL de SF ou SG 5%.',
        finalConcentration: 'Conc. ceftazidima: 20 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e admin. em 120 min.',
        notes: 'Uma vez preparada a infusão, não demorar mais de meia hora para iniciá-la (o tempo entre a reconstituição e o final da preparação intravenosa não deve exceder 30 minutos).',
      },
      pediatrico: {
        dose: '3 a 6 meses: 50 mg (ceftazidima + avibactam)/kg/dose a cada 8 h; > 6 meses a 2 anos: 62,5 mg (ceftazidima + avibactam)/kg/dose a cada 8 h; > 2 anos a 18 anos: 62,5 mg (ceftazidima + avibactam)/kg/dose a cada 8 h; máximo 2.500 mg (ceftazidima + avibactam) a cada 8 h',
        administration: 'E.V.',
        presentation: 'F.A. liof.: 2.500 mg (ceftazidima 2.000 mg + avibactam 500 mg)',
        notes: 'Não recomendado com: probenecida; altas doses de cefalosporinas e medicamentos nefrotóxicos como aminoglicosídeos ou diuréticos potentes (ex.: furosemida). A dosificação durante os dias de hemodiálise (HD) deve ser realizada após finalizada a HD. Administrar em pelo menos 2 h. Cada frasco contém 148 mg de sódio.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Diluir e utilizar imediatamente.\n\n## Solução diluída (a administrar)\n\n- 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nCandidíase (incluindo candidíase vulvovaginal e candidíase oral); prova direta de Coombs +, eosinofilia, trombocitose, trombocitopenia; cefaleia, tontura; diarreia, dor abdominal, náuseas, vômitos; elevação de: ALT, AST, fosfatase alcalina no sangue, GGT e de LDH no sangue; erupção maculopapular, urticária, prurido; trombose e flebite no local da perfusão, febre.',
    bibliography: [BIB.garrahan('cefTAZidima + AVIBACTAM*', ' (cód. 2042, ATC J01DD)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cef-012', name: 'Ceftolozano-tazobactam', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Infecções intra-abdominais complicadas, pielonefrite aguda, infecções do trato urinário complicadas e pneumonia adquirida no hospital (NAH), incluída pneumonia associada à ventilação mecânica.',
    indications: `${MAIN}\n\nInfecções intra-abdominais complicadas, pielonefrite aguda, infecções do trato urinário complicadas e pneumonia adquirida no hospital (NAH), incluída pneumonia associada à ventilação mecânica.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 1 g de ceftolozano + 0,5 g de tazobactam (Zerbaxa).',
        reconstitution: '10 mL de AD ou SF. Conc.: 100 mg/mL de ceftolozano e 50 mg/mL de tazobactam.',
        diluent: '1,5 g em 100 mL de SF ou SG 5%.',
        finalConcentration: 'Conc.: 10 mg/mL de ceftolozano e 5 mg/mL de tazobactam.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e administrar em 60 min.',
      },
      pediatrico: {
        dose: 'Crianças: 30 mg/kg/dose (ceftolozano + tazobactam) a cada 8 h; máximo 1500 mg a cada 8 h. Infecções graves: 45 mg/kg/dose a cada 8 h. Adultos: 1500 mg a cada 8 h; Pneumonia associada à ventilação mecânica: 3000 mg a cada 8 h.',
        administration: 'E.V.',
        presentation: 'F.A. pó: 1.500 mg (1.000 mg ceftolozano + 500 mg tazobactam sódico)',
        notes: 'Infusão E.V. (tempo de perfusão: 1 h para todas as doses). Monitorizar pacientes com I.R. no início ante qualquer mudança na função renal durante o tratamento e ajustar dose se necessário. Cada frasco contém 230 mg de sódio.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente ou 7 dias refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nColite por *Clostridioides difficile*, trombocitose, hipocalemia, insônia, ansiedade, cefaleia, tontura, hipotensão, náuseas, diarreia, constipação, vômitos, dor abdominal, erupção, pirexia, reações na zona de infusão, ALT e AST elevadas, transaminase elevada, prova de função hepática anormal, fosfatase alcalina no sangue aumentada, GGT elevada.',
    bibliography: [BIB.garrahan('cefTOLOZANO + tazobactam sódico*', ' (cód. 2041, ATC J01CG)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'amo-001', name: 'Amoxicilina', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico betalactâmico utilizado no tratamento de infecções respiratórias baixas, otite média, sinusite, pele e partes moles. Infecções do trato urinário causadas por microorganismos produtores de betalactâmicos.',
    indications: `${MAIN}\n\nAntibiótico betalactâmico utilizado no tratamento de infecções respiratórias baixas, otite média, sinusite, pele e partes moles. Infecções do trato urinário causadas por microorganismos produtores de betalactâmicos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Cápsulas 500 mg, 875 mg; suspensão; ampola E.V. se disponível.',
        dose: 'V.O.: 500 mg–1 g a cada 8 h. E.V. conforme protocolo hospitalar.',
        administration: 'V.O. com ou sem alimentos; E.V. em perfusão.',
      },
      pediatrico: {
        dose: '20–40 mg/kg/dia de amoxicilina a cada 8 h. Otite média em pacientes de alto risco, otite recorrente ou persistente aguda por *S. pneumoniae*, *H. influenzae*, *M. catarrhalis*: 80–90 mg/kg/dia de amoxicilina; dose máxima: 1500 mg/dia de amoxicilina, infecções graves até 3 g de amoxicilina/dia. Adultos: 250 mg de amoxicilina a cada 8 h. Infecções mais graves e do trato respiratório: 500 mg a cada 8 h. Procinético em pseudo-obstrução intestinal: 20 mg/kg/dia a cada 12 h, dose máxima: 1500 mg/dia.',
        administration: 'V.O.',
        presentation: 'Comprimidos: amoxicilina 500 mg + ácido clavulânico 125 mg; Suspensão: amoxicilina 50 mg/mL + ácido clavulânico 12,5 mg/mL. Apresentação Duo: Comprimidos: amoxicilina 875 mg + ácido clavulânico 125 mg; Suspensão extemporânea reconstituída: amoxicilina 80 mg/mL + ácido clavulânico 11,4 mg/mL',
        notes: 'A apresentação Duo deve ser administrada a cada 12 h, a amoxicilina como tri-hidrato e o ácido clavulânico como sal potássico.',
      },
      neonatal: {
        dose: '25–30 mg/kg/dose V.O. a cada 12 h ou E.V. conforme protocolo da UTI neonatal.',
        administration: 'V.O. ou E.V. conforme tolerância e gravidade.',
      },
    },
    stability: '## Estabilidade\n\n- Suspensão reconstituída: refrigerar conforme bula (habitualmente 7–14 dias).',
    adverseEffects: '## Efeitos adversos\n\nDistúrbios gastrointestinais, diarreia, elevação de transaminases e bilirrubina, nefrite intersticial, reações de hipersensibilidade. Raros: leucopenia, neutropenia, eosinofilia.',
    bibliography: [BIB.garrahan('amoxicilina + Ácido CLAVULÁNICO', ' (cód. 1068, ATC J01CR)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'amo-002', name: 'Amoxicilina/ácido clavulânico', version: '1.0.3', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico betalactâmico utilizado no tratamento de infecções respiratórias baixas, otite média, sinusite, pele e partes moles. Infecções do trato urinário causadas por microorganismos produtores de betalactâmicos.',
    indications: `${MAIN}\n\nAntibiótico betalactâmico utilizado no tratamento de infecções respiratórias baixas, otite média, sinusite, pele e partes moles. Infecções do trato urinário causadas por microorganismos produtores de betalactâmicos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 500/125 mg, 875/125 mg; suspensão; E.V. 1,2 g ou 2,2 g.',
        dose: 'V.O.: 875/125 mg a cada 12 h. E.V.: 1,2 g a cada 8 h ou conforme protocolo.',
        administration: 'V.O. ou E.V.',
      },
      pediatrico: {
        dose: '20–40 mg/kg/dia de amoxicilina a cada 8 h. Otite média em pacientes de alto risco, otite recorrente ou persistente aguda por *S. pneumoniae*, *H. influenzae*, *M. catarrhalis*: 80–90 mg/kg/dia de amoxicilina; dose máxima: 1500 mg/dia de amoxicilina, infecções graves até 3 g de amoxicilina/dia. Adultos: 250 mg de amoxicilina a cada 8 h. Infecções mais graves e do trato respiratório: 500 mg a cada 8 h. Procinético em pseudo-obstrução intestinal: 20 mg/kg/dia a cada 12 h, dose máxima: 1500 mg/dia.',
        administration: 'V.O.',
        presentation: 'Comprimidos: amoxicilina 500 mg + ácido clavulânico 125 mg; Suspensão: amoxicilina 50 mg/mL + ácido clavulânico 12,5 mg/mL. Apresentação Duo: Comprimidos: amoxicilina 875 mg + ácido clavulânico 125 mg; Suspensão extemporânea reconstituída: amoxicilina 80 mg/mL + ácido clavulânico 11,4 mg/mL',
        notes: 'A apresentação Duo deve ser administrada a cada 12 h, a amoxicilina como tri-hidrato e o ácido clavulânico como sal potássico.',
      },
      neonatal: {
        dose: 'Dose conforme protocolo da UTI neonatal; uso restrito.',
        administration: 'V.O. ou E.V. conforme indicação.',
      },
    },
    stability: '## Estabilidade\n\n- Suspensão refrigerada conforme bula. E.V. diluída: usar no turno.',
    adverseEffects: '## Efeitos adversos\n\nDistúrbios gastrointestinais, diarreia, elevação de transaminases e bilirrubina, nefrite intersticial, reações de hipersensibilidade. Raros: leucopenia, neutropenia, eosinofilia.',
    bibliography: [BIB.garrahan('amoxicilina + Ácido CLAVULÁNICO', ' (cód. 1068, ATC J01CR)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'azi-001', name: 'Azitromicina', version: '1.0.5', updatedAt: '2026-07-10',
    executiveSummary: 'Macrolídeo. Infecção disseminada por *Mycobacterium avium* intracelulare group, infecções crônicas por *Pseudomonas aeruginosa* em pacientes fibrocísticos. Profilaxia para IST (*Chlamydia trachomatis*).',
    indications: `${MAIN}\n\nMacrolídeo. Infecção disseminada por *Mycobacterium avium* intracelulare group, infecções crônicas por *Pseudomonas aeruginosa* em pacientes fibrocísticos. Profilaxia para IST (*Chlamydia trachomatis*).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 500 mg; suspensão; frasco E.V. 500 mg.',
        dose: '500 mg V.O. dia 1, depois 250 mg/dia por 4 dias; ou 500 mg E.V. a cada 24 h.',
        administration: 'V.O. ou E.V.',
      },
      pediatrico: {
        dose: '< 6 meses: 10 mg/kg/dia, a cada 24 h durante 5 dias; > 6 meses 1º dia: 10 mg/kg/dia (máximo: 500 mg), depois 5 mg/kg/dia (máximo: 250 mg), até completar 5 dias; Adolescentes e Adultos: 1º dia: 500 mg, depois 250 mg até completar 5 dias. Faringite: 12 mg/kg/dia durante 5 dias. Profilaxia de micobactérias atípicas: 20–30 mg/kg semanal, dose máxima: 1200 mg/semana. Profilaxia para IST: Crianças: V.O.: 20 mg/kg/dose, dose única; Adolescentes: V.O.: 1 g/dose, dose única.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 500 mg; Pó para suspensão oral: 40 mg/mL',
        notes: 'Não administrar com alimentos nem antiácidos. Interações: carBAMazepina e digoxina.',
      },
      neonatal: {
        dose: 'Uso restrito conforme protocolo da UTI neonatal (ex.: Chagas).',
        administration: 'V.O.',
      },
    },
    stability: '## Estabilidade\n\n- E.V. reconstituída conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nColite pseudomembranosa, alergias, sintomas gastrointestinais, cefaleias, tonturas, vertigem, sonolência. Raro: aumento de transaminases.',
    bibliography: [BIB.garrahan('azITROMICina', ' (cód. 0934, ATC J01FA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cla-001', name: 'Claritromicina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Macrolídeo. Tratamento de infecções do trato respiratório alto e baixo, otite média aguda por *Mycoplasma*, *Chlamydia*. Profilaxia e tratamento de infecções por *Mycobacterium avium*.',
    indications: `${MAIN}\n\nMacrolídeo. Tratamento de infecções do trato respiratório alto e baixo, otite média aguda por *Mycoplasma*, *Chlamydia*. Profilaxia e tratamento de infecções por *Mycobacterium avium*.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 500 mg (Claritromicina Northia, Pharmavial, Richet, Kiaricid).',
        reconstitution: '10 mL de AD. Conc.: 50 mg/mL.',
        diluent: '500 mg em 250 mL de SF ou SG 5%.',
        finalConcentration: '2 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Reconst. 500 mg com 10 mL de AD, e diluir em 250 mL de SF, SG 5% e admin. em 60 min.',
        notes: 'Usar unicamente AD para sua reconstituição, já que outros diluentes podem produzir precipitação. Não fazê-lo com SF. Irritante (pode provocar flebite).',
      },
      pediatrico: {
        dose: 'Crianças: 15 mg/kg/dia a cada 12 h, adolescentes e adultos (V.O.): 500 mg a cada 12 h. Tuberculostático: 30 mg/kg/dia a cada 12 h, dose máxima: 1 g/dia.',
        administration: 'V.O.; E.V.',
        presentation: 'Comprimidos: 250 mg; Suspensão: 25 mg/mL; F.A.: 500 mg',
        notes: 'Contraindicada sua associação com terfenadina em pacientes com patologia cardíaca. Interações: carbamazepina, cisaprida, rifabutina. Não refrigerar a suspensão reconstituída.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente e 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 6 h em temperatura ambiente e 48 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nDiarreia, náuseas, gosto anormal, dispepsia, dor abdominal, cefaleias, hipersensibilidade. Ver alerta.',
    bibliography: [BIB.garrahan('Claritromicina', ' (cód. 0451, ATC J01FA)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'cli-001', name: 'Clindamicina', version: '1.2.2', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções por bactérias suscetíveis (anaeróbias, estafilococos, estreptococos, pneumococos) em pele, tecido celular subcutâneo, abdome e trato respiratório baixo.',
    indications: `${MAIN}\n\nTratamento de infecções por bactérias suscetíveis (anaeróbias, estafilococos, estreptococos, pneumococos) em pele, tecido celular subcutâneo, abdome e trato respiratório baixo.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Amp. contendo 600 mg em 4 mL de solução (Clindamicina Drawer, Fabra, Duncan, Clindanovag, Larjan, Ramallo, Northia, FADA, Clindalaf, Klonal).',
        reconstitution: 'Não requer reconst. prévia. Conc.: 150 mg/mL.',
        diluent: '600 mg em 50–100 mL de SF ou SG 5%.',
        finalConcentration: '6–12 mg/mL (conc. máx. 18 mg/mL).',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir em 50 mL de SF ou SG 5% e admin. em 20 min.',
        notes: 'Ao refrigerar pode haver formação de cristais que se redissolvem em temperatura ambiente. A administração rápida pode gerar hipotensão (não se recomenda infundir mais de 1200 mg em 1 h).',
      },
      pediatrico: {
        presentation: 'Cápsulas: 300 mg; Ampolas de 4 mL: 150 mg/mL; Solução (preparado magistral): 100 mg/mL',
        administration: 'V.O.; E.V.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '12 mg/mL.',
        infusionRate: '30 mg/minuto.',
        dose: 'Recém-nascidos: conforme idade e peso; > 1 mês e crianças: 30 mg/kg/dia a cada 6–8 h, dose máxima: E.V.: 4,8 g/dia; V.O.: 1,8 g/dia. Adolescentes e adultos: E.V.: 1,2 a 2,7 g/dia em 2 a 4 doses divididas, dose máxima: 4,8 g/dia; V.O.: 150 a 450 mg/dose a cada 6–8 h, dose máxima: 1,8 g/dia.',
        compatibility: 'Incompatível com ampicilina sódica, fenitoína sódica, barbitúricos, aminofilina, gluconato de cálcio e sulfato de magnésio.',
        notes: 'Interações: beta-bloqueadores, eritromicina.',
      },
      neonatal: {
        dose: '5–7,5 mg/kg/dose a cada 6–8 h.',
        administration: 'E.V.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente e/ou refrigerado.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\nDiarreia, colite pseudomembranosa, vômitos, reações de hipersensibilidade, eosinofilia, leucopenia, agranulocitose, hepatotoxicidade.',
    bibliography: [BIB.garrahan('Clindamicina', ' (cód. 0051, ATC J01FF)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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
console.log(`\npt-BR Garrahan lote 23 (parte A): ${drugs.length}`);
