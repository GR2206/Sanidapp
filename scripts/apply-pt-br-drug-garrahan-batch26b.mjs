#!/usr/bin/env node
/** Garrahan re-tradução lote 26 — 13 monografias pt-BR (parte B) */
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
  heartHf: { citation: 'American Heart Association. Diretrizes de insuficiência cardíaca.', url: 'https://www.heart.org/' },
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  sadiUcip: { citation: 'Serviço de Infectologia, Prevenção e Controle de Infecções. UCIP 2026 — Guia de diluição e estabilidade.', url: 'https://www.sadi.org.ar/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
  esc: { citation: 'European Society of Cardiology. Diretrizes de insuficiência cardíaca.', url: 'https://www.escardio.org/' },
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Diretrizes clínicas.', url: 'https://www.idsociety.org/' },
};

const drugs = [
  {
    id: 'prp-001', name: 'Propranolol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Beta-bloqueante não cardioseletivo indicado para tratar taquiarritmias, hipertensão, tirotoxicose neonatal. Profilaxia da enxaqueca. Tratamento paliativo da tetralogia de Fallot e cardiomiopatia hipertrófica obstrutiva. Hipertensão portal. Tratamento de hemangiomas infantis graves.',
    indications: `${MAIN}\n\nBeta-bloqueante não cardioseletivo indicado para tratar taquiarritmias, hipertensão, tirotoxicose neonatal. Profilaxia da enxaqueca. Tratamento paliativo da tetralogia de Fallot e cardiomiopatia hipertrófica obstrutiva. Hipertensão portal. Tratamento de hemangiomas infantis graves.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 40 e 80 mg. Ampola 1 mg/mL.',
        dose: 'HAS/angina: 40–160 mg/dia V.O. fracionado. E.V.: 1–3 mg lento, repetir conforme protocolo.',
        administration: 'V.O. ou E.V. lenta.',
      },
      pediatrico: {
        dose: 'Arritmias e hipertensão: Neonatos: V.O.: inicial: 0,25 mg/kg/dose a cada 6–8 h, aumentar lentamente até um máximo de 5 mg/kg/dia. Pode requerer-se doses maiores (consultar com especialista). Crianças: V.O.: inicial: 1 mg/kg/dia a cada 6 h, aumentar gradualmente a cada 3–5 dias, manutenção: 1–5 mg/kg/dia, dose máxima: arritmias: 16 mg/kg/dia ou 60 mg/dia; hipertensão: 8 mg/kg/dia. Profilaxia enxaqueca: V.O.: crianças: 0,6–1,5 mg/kg/dia a cada 8 h, máximo: 4 mg/kg/dia; adultos: inicial: 80 mg/dia a cada 6–8 h, máximo: 160–240 mg/dia. Tirotoxicose neonatal: V.O.: 2 mg/kg/dia (1–3 mg/kg/dia) a cada 6–12 h. Pode requerer-se doses maiores (consultar o especialista); adultos: V.O.: 10–40 mg a cada 6 h. Hemangiomas infantis: V.O.: inicial: 1 mg/kg/dia a cada 8–12 h; incrementar de forma gradual semanalmente até 2 mg/kg/dia (0,5–3 mg/kg/dia) a cada 8–12 h. Continuar com a dose objetivo até o final da fase de proliferação e resolução completa.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 10 - 40 mg; Suspensão (preparado magistral): 4 mg/ml',
        notes: 'Regular a dose conforme efeito clínico e beta-bloqueante. Usar com precaução em pacientes com diabetes mellitus e asma brônquica. Evitar a via E.V. em pacientes que estão recebendo bloqueadores do canal de cálcio. Os antiácidos que contêm alumínio podem diminuir sua absorção. Com adrenalina, aumento da pressão sanguínea e bradicardia severa. Flecainida, hidralazina, verapamil podem aumentar os efeitos adversos cardiovasculares. Administrar com alimentos a fim de evitar o risco de hipoglicemia. Não descontinuar abruptamente. Diminuir a dose em insuficiência hepática. No tratamento dos hemangiomas infantis o propranolol está contraindicado em pacientes recém-nascidos pré-termo e recém-nascidos menores de 14 dias de vida, cardiopatia congênita com contraindicação para o tratamento com beta-bloqueantes, lactentes com episódios de bronquite obstrutiva, distúrbios do SNC e função renal alterada.',
      },
      neonatal: {
        dose: '0,01–0,2 mg/kg/dose E.V. conforme protocolo cardiológico neonatal.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Estabilidade\n\n- V.O. conforme bula. E.V. usar imediatamente.',
    adverseEffects: '## Efeitos adversos\n\nFadiga, letargia, bradicardia, hipotensão, rash, náuseas, vômitos, hipoglicemia, apneias, broncoespasmo, aumento de enzimas hepáticas, convulsões, extremidades frias.',
    bibliography: [BIB.garrahan('Propranolol Cloridrato*', ' (cód. 0171, ATC C07AA)'), BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'prt-001', name: 'Protamina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antagonista da heparina, forma sais insolúveis inativando-a.',
    indications: `${MAIN}\n\nAntagonista da heparina, forma sais insolúveis inativando-a.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 10 mg/mL.',
        dose: '1 mg protamina por 100 UI heparina restantes; E.V. lento em 10 min (máx. 50 mg/dose).',
        administration: 'E.V. muito lenta.',
      },
      pediatrico: {
        dose: '1 ml (10 mg) de protamina neutraliza 1000 unidades de heparina (U.H.) USP. A dose depende do tempo desde a suspensão de heparina: < 30 minutos: 1 mg c/100 Unidades de heparina (U.H.) recebida 30 min - 60 min: 0,5 - 0,75 mg c/100 U.H. recebida 60 min - 120 min: 0,375 - 0,5 mg c/ 100 U.H. recebida > 120 min: 0,25 - 0,375 mg c/ 100 U.H. recebida',
        administration: 'E.V. lenta',
        presentation: 'Ampolas por 5 ml: 10 mg/ml',
        notes: 'Administrar em períodos de 10 minutos. Não administrar mais de 50 mg/dose. O excesso atua como anticoagulante fraco. Precaução em pacientes com alergia ao peixe.',
      },
      neonatal: {
        dose: 'Mesma regra mg:UI conforme heparina administrada.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Estabilidade\n\n- Usar imediatamente após diluição.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, hipertensão pulmonar, bradicardia e outros efeitos cardiovasculares. Dispneia, náuseas, vômitos, lassidão, reações anafilactoides.',
    bibliography: [BIB.garrahan('Protamina Sulfato', ' (cód. 8911, ATC V03AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ran-001', name: 'Ranitidina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antagonista do receptor H2, antiulceroso, prevenção de úlcera de stress.',
    indications: `${MAIN}\n\nAntagonista do receptor H2, antiulceroso, prevenção de úlcera de stress.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampolas de 5 ml: 10 mg/ml',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '2,5 mg/mL.',
        infusionRate: '15 a 30 min. com BIC.',
        dose: 'Prematuros e lactentes a termo < 2 semanas: E.V.: dose de carga: 1,5 mg/kg, manutenção: 1,5 mg/kg/dia c/12 h. Crianças: E.V.: 2–4 mg/kg/dia c/6–8 h. Adultos: E.V.: 50 mg/dose c/6–8 h, dose máxima: 400 mg/dia.',
        notes: 'Para sua administração E.V. diluir em Dx 5% ou Sol. F. a uma concentração de 0,5 mg/ml (máximo: 2,5 mg/ml) e infundir em 15–30 minutos. Precaução em pacientes com insuficiência hepática.',
      },
    },
    stability: '## Guia pediátrica\n\n- 48 h à temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nTontura, insônia, agitação, rash cutâneo, constipação, náuseas, diarreia, vômitos, cefaleia. Bradicardia em infusão rápida. Raros: Aumento de transaminases, leucopenia, trombocitopenia, broncoespasmo.',
    bibliography: [BIB.garrahan('Ranitidina Cloridrato', ' (cód. 0175, ATC A02BA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'sav-001', name: 'Sacubitril/valsartana', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Insuficiência cardíaca crônica sintomática com disfunção sistólica do ventrículo esquerdo. O Sacubitril atua bloqueando os efeitos da neprilisina e o Valsartana o receptor da angiotensina II.',
    indications: `${MAIN}\n\nInsuficiência cardíaca crônica sintomática com disfunção sistólica do ventrículo esquerdo.\nO Sacubitril atua bloqueando os efeitos da neprilisina e o Valsartana o receptor da angiotensina II.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 24/26, 49/51 e 97/103 mg (sacubitril/valsartana).',
        dose: 'Iniciar 49/51 mg V.O. a cada 12 h; titular a 97/103 mg a cada 12 h conforme tolerância.',
        administration: 'V.O. a cada 12 h.',
      },
      pediatrico: {
        dose: 'É progressiva. Para a dose considera-se a somatória de ambas as drogas. Crianças < 40 kg: inicial 1,6 mg/kg/dose a cada 12 h, podendo aumentar a dose após 2–4 semanas conforme tolerância a 2,3 mg/kg/dose a cada 12 h com um máximo de 3,1 mg/kg/dose a cada 12 h. > de 40 kg a 50 kg: inicial 50 mg/dose a cada 12 h, podendo aumentar a dose após 2–4 semanas conforme tolerância a 100 mg/dose a cada 12 h com um máximo de 150 mg/dose a cada 12 h. > 50 kg: 100 mg/dose a cada 12 h, podendo aumentar a dose após 2–4 semanas conforme tolerância a 150 mg/dose a cada 12 h com um máximo de 200 mg/dose a cada 12 h.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 50 mg (Sacubitril 24 mg + Valsartana 26 mg); 100 mg (Sacubitril 49 mg + Valsartana 51 mg); 200 mg (Sacubitril 97 mg + Valsartana 103 mg)',
        notes: 'Aumenta a exposição sistêmica de estatinas. Com inibidores sintéticos da fosfodiesterase tipo 5 incluindo sildenafila risco de hipotensão. Risco de aumento do potássio sérico e aumentos de creatinina sérica com diuréticos poupadores de potássio (amilorida), antagonistas mineralocorticoides (p.ex.: espironolactona) suplementos de potássio, substitutos do sal que contêm potássio ou outros como a heparina. Exposição sistêmica aumentada com: inibidores de OATP1B1, OATP1B3, OAT3 (ex.: rifampicina, ciclosporina), OAT1 (ex. tenofovir, cidofovir) ou de MRP2 (ex.: ritonavir). Reduz a concentração máxima e o AUC da metformina. Iniciar com a metade da dose recomendada em pacientes que não vinham em tratamento com IECA/ARA II ou que estavam tomando doses baixas destes medicamentos (≤ 0,2 mg/kg/dia de enalapril ou equivalente). A terapia concomitante junto com inibidores da enzima conversora de angiotensina II (ex.: losartana) está contraindicada devido ao risco potencial de angioedema. Se se planeja a troca de medicação, suspender o IECA/ARA II e depois de 36 h começar com sacubitril-valsartana. Não iniciar o tratamento em pacientes com níveis de potássio sérico de 5,3 mmol/L ou com pressão arterial sistólica (PAS) < percentil 5 para a idade do paciente.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula no envase original.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, alterações na função renal, hiperpotassemia, angioedema, tontura, cefaleia, vertigem, tosse, fadiga, astenia, anemia.',
    bibliography: [BIB.garrahan('Sacubitrilo + Valsartan*', ' (cód. 2090, ATC C09DX)'), BIB.heartHf, BIB.anmat, BIB.sac, BIB.esc],
  },
  {
    id: 'srf-001', name: 'Surfactante pulmonar', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de síndrome de distress respiratório em recém-nascidos < de 1250 g ou com evidência de déficit de surfactante.',
    indications: `${MAIN}\n\nTratamento de síndrome de distress respiratório em recém-nascidos < de 1250 g ou com evidência de déficit de surfactante.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Não indicado em adultos rotineiramente.',
        dose: 'N/A uso habitual adulto.',
        administration: 'N/A.',
      },
      pediatrico: {
        dose: 'Tratamento de resgate: fosfolípidos: 4 ml/kg/dose. Segunda dose conforme parâmetros de gases no sangue. Máximo 4 doses.',
        administration: 'Instilação intratraqueal.',
        presentation: 'F.A. de 4–8 ml: 25 mg/ml de fosfolípidos totais.',
        notes: 'Uso exclusivo do especialista em Neonatologia. É uma dispersão salina de lipídios naturais e proteínas derivadas de pulmões bovinos. Observou-se refluxo sanguíneo do tubo endotraqueal. Conservar na geladeira.',
      },
      neonatal: {
        dose: '100–200 mg/kg via endotraqueal; repetir conforme protocolo NNU.',
        administration: 'Intratraqueal com VM.',
      },
    },
    stability: '## Estabilidade\n\n- Refrigerar; aquecer à temperatura ambiente antes de instilar.',
    adverseEffects: '## Efeitos adversos\n\nHemorragia pulmonar, bradicardia transitória, diminuição da saturação de oxigênio, hipotensão, hipertensão, taquicardia, intolerância à alimentação, insuficiência renal, hematúria, trombocitopenia, convulsões.',
    bibliography: [BIB.garrahan('Surfactante Pulmonar Natural*', ' (cód. 1034, ATC R07AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'teo-001', name: 'Aminofilina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Aumenta a contratilidade diafragmática. Apneia do recém-nascido.',
    indications: `${MAIN}\n\nAumenta a contratilidade diafragmática. Apneia do recém-nascido.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 24 mg/mL (teofilina equivalente).',
        dose: 'Carga 5–6 mg/kg E.V. lento; manutenção 0,5 mg/kg/h.',
        administration: 'E.V. lenta.',
      },
      pediatrico: {
        presentation: 'Ampolas de 10 ml: 24 mg/ml',
        administration: 'E.V.',
        diluent: 'Dext. 5%.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '20 a 30 min com BIC.',
        dose: 'Dose de ataque E.V.: 7 mg/kg/dose em 20–30 minutos. Dose de manutenção: 1–6 meses: 0,4 mg/kg/hora, 6–12 meses: 0,6 mg/kg/hora, 1–9 anos: 0,8 mg/kg/hora, > 10 anos e adultos: 0,7 mg/kg/hora. Apneia do recém-nascido: dose de carga: 5 mg/kg, manutenção: 5 mg/kg/dia a cada 12 h (monitorar níveis séricos para determinar a dose apropriada).',
        notes: 'Concentração sérica: apneia primária R.N.: 3–10 µg/ml, broncodilatador pico 10–15 µg/ml. Aumentam os níveis de teofilina: eritromicina, ciprofloxacina, norfloxacina. Diminuem os níveis de teofilina: rifampicina, carbamazepina, fenobarbital, difenilhidantoína. Aumenta o risco de hipocalemia com doses altas de salbutamol. Para sua administração diluir com solução fisiológica (preferentemente) ou dextrosa 5% a uma concentração de 1 mg/ml (máxima concentração: 25 mg/ml).',
      },
      neonatal: {
        dose: 'Carga e manutenção conforme protocolo apneia NNU.',
        administration: 'E.V. em bomba.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nIrritabilidade, inquietação, convulsões, cefaleia, insônia, palpitações, hipotensão, extrassístoles, hiperglicemia, dor abdominal, vômitos.',
    bibliography: [BIB.garrahan('amiNOFilina', ' (cód. 0012, ATC R03DA)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'tia-001', name: 'Tiamina (vitamina B1)', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Doenças carenciais: beribéri (polineurite, insuficiência cardíaca, edemas). Deficiência PDH (piruvato desidrogenase). Síndrome de deficiência de tiamina: acidose láctica tipo B (sem hipoperfusão/hipoxemia, com ou sem hiperglicemia, encefalopatia de Wernicke (ataxia, confusão, oftalmoplegia).',
    indications: `${MAIN}\n\nDoenças carenciais: beribéri (polineurite, insuficiência cardíaca, edemas). Deficiência PDH (piruvato desidrogenase).\nSíndrome de deficiência de tiamina: acidose láctica tipo B (sem hipoperfusão/hipoxemia, com ou sem hiperglicemia, encefalopatia de Wernicke (ataxia, confusão, oftalmoplegia).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 100 mg/mL.',
        dose: '100–500 mg E.V. lenta antes de glicose; depois 100 mg TID por 3–5 dias.',
        administration: 'E.V. lenta.',
      },
      pediatrico: {
        dose: 'R.N.D: 0–6 meses: 0,2 mg; 7–12 meses: 0,3 mg; 1–3 anos: 0,5 mg; 4–8 anos: 0,6 mg; 9–13 anos: 0,9 mg; 14–18 anos: 1,2 mg; adultos: 1,1 a 1,4 mg. Níveis normais: 1,6 a 4 mg/dl. Beribéri, Encefalopatia de Wernicke, Acidose Láctica tipo B: crianças: E.V.: 25 mg, uma vez por dia, máximo 1 semana, depois passar a V.O.: 5 a 10 mg/dia por um mês; Adolescentes e adultos: E.V. 100 mg/dia, máximo 1 semana, depois V.O.: 10 mg/dia por 1 mês. Prevenção de síndrome de realimentação: V.O.: 2 mg/kg/dia, máximo: 100 mg a cada 24 h durante 2 semanas, depois 1 mg/kg/dia (máximo 10 mg) durante 1 mês. Acidose Láctica Congênita: V.O.: 100–300 mg/dia. Deficiência PDH: 300 mg/dia Encefalopatia durante ou pós administração de Ifosfamida: 100 mg a cada 4 h até resolução dos sintomas, administrar em 30 minutos.',
        administration: 'V.O. E.V.',
        presentation: 'Comprimidos: 300 mg; Xarope (preparado magistral): 10 mg/ml; Ampolas de 1 ml: 100 mg/ml',
        notes: 'É frequente encontrar carências associadas de vários fatores do complexo B, é conveniente utilizar todo o complexo. Pacientes em hemodiálise, diálise peritoneal ou síndrome de má absorção têm maiores requerimentos diários. Ver tabela de polivitamínicos. Para prevenção de síndrome de realimentação iniciar tiamina antes de iniciar aporte nutricional (inclusive plano de hidratação parenteral com dextrosa), depois das 2 semanas pode-se fazer o aporte com complexo B. Em pacientes oncológicos não utilizar complexo B, pois não se recomenda a administração de vitamina B12. Para a administração E.V. diluir 100 mg em 50 ml de solução fisiológica (preferentemente) ou dextrosa 5%, infundir em 30 minutos. Deve ser feito sob estrito monitoramento. Para evitar sintomas agudos de deficiência de tiamina, administrá-la antes das soluções de carboidratos parenterais. V.O. pode ser administrada com ou sem alimentos.',
      },
      neonatal: {
        dose: '10 mg E.V./dia em nutrição parenteral.',
        administration: 'E.V.',
      },
    },
    stability: '## Estabilidade\n\n- Proteger da luz.',
    adverseEffects: '## Efeitos adversos\n\nDermatite de contato, cianose, edema pulmonar, edema faríngeo, reações anafiláticas com distress respiratório, prurido, choque e dor abdominal, parestesias.',
    bibliography: [BIB.garrahan('Vitamina B1 (Tiamina)', ' (cód. 0457, ATC A11DA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'tri-001', name: 'Trimetoprima+sulfametoxazol', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Profilaxia e tratamento de infecções do trato urinário devido a cepas suscetíveis de E. coli, P. mirabilis, K. Pneumoniae, Enterobacter spp e Staphylococcus plasmocoagulase negativo incluindo S. saprophyticus. Tratamento da otite média aguda causada por Streptococcus pneumoniae e Haemophilus influenzae suscetíveis. Não indicado em administração prolongada ou profilaxia de otite média. Alternativa ao tratamento da pneumonia causada por Pneumocystis jirovecii.',
    indications: `${MAIN}\n\nProfilaxia e tratamento de infecções do trato urinário devido a cepas suscetíveis de E. coli, P. mirabilis, K. Pneumoniae, Enterobacter spp e Staphylococcus plasmocoagulase negativo incluindo S. saprophyticus. Tratamento da otite média aguda causada por Streptococcus pneumoniae e Haemophilus influenzae suscetíveis. Não indicado em administração prolongada ou profilaxia de otite média. Alternativa ao tratamento da pneumonia causada por Pneumocystis jirovecii.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Amp contendo 80 mg de trimetoprima (TMP) + 400 mg de sulfametoxazol (SMX) em 5 mL (Cotrizol G, Novidrine, Bactrim, Danferane, Spectrex).',
        reconstitution: 'Não requer reconst. prévia. Conc: 16 mg/mL trimetoprima e 80 mg/mL de sulfametoxazol.',
        diluent: '80 mg TMP/400 mg SMX em 100 mL de SF ou Dx 5%.',
        finalConcentration: '0,8 mg/mL de TMP e 4 mg/mL de SMX.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir 1 amp em 100 mL de SF e admin. em 30–60 min. Não exceder 90 min.',
        notes: 'Recomenda-se uma diluição de 1 mL de TMP+SMX em 5 mL de diluente.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 80 mg trimetoprima + 400 mg sulfametoxazol; Comprimidos: 160 mg trimetoprima + 800 mg sulfametoxazol; Xarope: 40 mg de trimetoprima + 200 mg sulfametoxazol/5 ml; Ampolas: 80 mg de trimetoprima + 400 mg de sulfametoxazol/5 ml',
        administration: 'V.O.; E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5% e 10%.',
        finalConcentration: '1,6 mg/mL.',
        infusionRate: 'Não menor a 60 min. com BIC.',
        dose: 'Doses expressas em base à trimetoprima Infecções leves e moderadas: Crianças: 8–12 mg/kg/dia a cada 12 h, dose máxima: 320 mg/dia; Adultos: 160 mg a cada 12 h, dose máxima 640 mg/dia. Infecções severas, Pneumocystis jirovecii, stenotrophomona, meningite: 20 mg/kg/dia a cada 6 h, dose máxima E.V.: 240 mg/dose a cada 6 h, V.O.: 320 mg/dose a cada 6 h. Profilaxia: 5 mg/kg/dia 3 vezes por semana, dose máxima 160 mg. Profilaxia infecções urinárias: 2 mg/kg/dia em uma dose diária noturna.',
        notes: 'Ampolas E.V. não devem ser administradas sem diluir. Interações: fenitoína, rifampicina (aumenta os níveis destas drogas); metronidazol (potencia a toxicidade hematológica do metronidazol); ciclosporina (potencia a nefrotoxicidade da ciclosporina).',
      },
      neonatal: {
        dose: 'Evitar < 2 meses salvo indicação vital; dose conforme NNU.',
        administration: 'V.O./E.V.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 2 h à temperatura ambiente. Preparar imediatamente antes do uso.\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nReações de hipersensibilidade (sobretudo dermatológicas), distúrbios gastrointestinais (náuseas, vômitos), discrasias sanguíneas. Toxicidade renal (em pacientes com falha renal prévia). Hepatite, colestase.',
    bibliography: [BIB.garrahan('Trimetoprima + Sulfametoxazol', ' (cód. 0902, ATC J01EA)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'trm-001', name: 'Tramadol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Analgésico.',
    indications: `${MAIN}\n\nAnalgésico.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Calmador(R) cápsulas: 50 mg, gotas: 1 ml=20 gotas=50 mg, ampolas de 1 ml: 50 mg/ml; Lixidol®: comprimidos 50 mg, gotas: 1 ml=24 gotas=100 mg; Nobligán(R) cápsulas: 50 mg, gotas: 1 ml=40 gotas=100 mg, ampolas de 2 ml: 50 mg/ml',
        administration: 'V.O.; E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '20 min. com BIC.',
        dose: '1–2 mg/kg/dose a cada 8 h, dose máxima: 3–6 mg/kg/dia. Adultos: 50–100 mg a cada 4–6 h, dose máxima: 400 mg/dia. Ao passar a cápsulas de liberação controlada dar a cada 12 h. Ajustar a dose em insuficiência hepática.',
        notes: 'Droga em avaliação em pediatria, utilizar em crianças maiores e adolescentes. Interage com carbamazepina e antidepressivos tricíclicos. Ver alerta',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nVer apartado analgésicos opiáceos.',
    bibliography: [BIB.garrahan('TraMADol Cloridrato *', ' (cód. 0477, ATC N02AX)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'val-001', name: 'Valproato', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsivante. Prevenção de enxaqueca. Uso em psiquiatria: doença bipolar-mania.',
    indications: `${MAIN}\n\nAnticonvulsivante. Prevenção de enxaqueca. Uso em psiquiatria: doença bipolar-mania.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola E.V. 100 mg/mL; xarope/comprimidos V.O.',
        dose: 'Carga 20–40 mg/kg E.V.; manutenção 15–60 mg/kg/dia V.O. dividido.',
        administration: 'E.V. em 60 min ou V.O.',
      },
      pediatrico: {
        dose: 'Status epiléptico (E.V.; S.N.G.; Retal): 20 mg/kg/dose, dose de carga máxima: 1 g: Infusão: 1–4 mg/kg/min. Manutenção (V.O.): 15–50 mg/kg/dia a cada 8 h, dose máxima: 90 mg/kg/dia (máximo por dia: 2000–2500 mg). Dor neuropática: 10–30 mg/kg/dia em 2 ou 3 doses, dose máxima: 400 mg/dia.',
        administration: 'V.O.; E.V.',
        presentation: 'F.A. de 5 ml: 100 mg/ml; Xarope: 50 mg/ml; Cápsulas: 250 mg; Comprimidos: 200–250–400–500 mg',
        notes: 'Recomenda-se obter níveis plasmáticos em caso de suspeita de falta de adesão ao tratamento e/ou efeitos adversos. Administração E.V.: diluir em 50 ml de dextrosa 5% ou solução fisiológica e administrar em 60 minutos, velocidade máxima de infusão: 20 mg/minuto. Realizar hemograma, plaquetas e transaminases a cada 3–6 meses e amônio conforme clínica. Inibe metabolismo de lamotrigina aumentando o risco de rash, ataxia e tremor. Pode aumentar a concentração de fenitoína livre. O efeito anticonvulsivante pode ser antagonizado por antidepressivos e antipsicóticos. Embora os comprimidos ou cápsulas sejam sais distintos conforme o nome comercial (Depakene: ácido valproico; Exibral e Logical: valproato de magnésio; Valcote: divalproato sódico) todos estão indicados com o equivalente a ácido valproico. Ver alerta em gravidez Ver Alerta Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
      neonatal: {
        dose: 'Uso restrito; esquemas NNU sob neurologia.',
        administration: 'E.V./V.O.',
      },
    },
    stability: '## Estabilidade\n\n- E.V. conforme bula; não refrigerar precipitado.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, diarreia, tremor, queda do cabelo, hepatotoxicidade, trombocitopenia, pancreatite, orexígeno.',
    bibliography: [BIB.garrahan('Ácido Valproico', ' (cód. 0235, ATC N03AG)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vas-001', name: 'Vasopressina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Para hipotensão refratária a catecolaminas com hipoplejia.',
    indications: `${MAIN}\n\nPara hipotensão refratária a catecolaminas com hipoplejia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '0,03–0,04 UI/min fixo ou 0,01–0,04 UI/min conforme protocolo séptico.',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorizar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampolas de 1 ml: 20 U/ml',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '0,01–0,15 U/kg/hora',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Para sua administração E.V., diluir em solução fisiológica ou em dextrosa 5% antes de utilizar, máxima concentração de administração 1 U/ml. Descartar a solução diluída não utilizada após 18 h à temperatura ambiente e 24 h sob refrigeração.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: 'Dose por kg conforme protocolo NNU para choque refratário.',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorizar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Estabilidade\n\n- Diluição estável conforme bula; rotacionar sítio de infusão.',
    adverseEffects: '## Efeitos adversos\n\nHipertensão, bradicardia, arritmias, trombose venosa, febre, vertigem, tremor, diaforese.',
    bibliography: [BIB.garrahan('Vasopressina*', ' (cód. 1662, ATC H01BA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vrp-001', name: 'Verapamil', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Arritmias supraventriculares, bloqueante seletivo de cálcio.',
    indications: `${MAIN}\n\nArritmias supraventriculares, bloqueante seletivo de cálcio.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 80 e 120 mg. Ampola 5 mg/2 mL.',
        dose: 'TSV: 5–10 mg E.V. em 2 min. Manutenção V.O.: 120–480 mg/dia fracionado.',
        administration: 'E.V. lenta sob monitorização ou V.O.',
      },
      pediatrico: {
        dose: 'V.O.: 2–8 mg/kg/dia a cada 8 h. Adultos: 240–480 mg/dia a cada 6–8 h (para comprimidos retard a cada 12–24 h). Cirrose: reduzir dose a 50%.',
        administration: 'V.O.',
        presentation: 'Comprimidos revestidos: 80 mg',
        notes: 'Monitorar frequência cardíaca, pressão arterial e E.C.G. Contraindicado: menores de 2 anos, pacientes que recebem beta-bloqueantes, doença do nó sinusal, pacientes que apresentam hipotensão arterial ou hipocalcemia. Aumenta níveis séricos de ciclosporina, carbamazepina, teofilina e digoxina. Fenitoína e fenobarbital reduzem o efeito do verapamil. A combinação com flecainida pode resultar em uma depressão cardíaca profunda e com amiodarona, cardiotoxicidade com bradicardia.',
      },
      neonatal: {
        dose: '0,1–0,2 mg/kg E.V. conforme protocolo cardiológico neonatal.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Estabilidade\n\n- Ampolas: administrar E.V. sem diluição ou conforme protocolo.',
    adverseEffects: '## Efeitos adversos\n\nBloqueio atrioventricular, constipação, hipotensão, vertigem, edema, cefaleia, náuseas, vômitos.',
    bibliography: [BIB.garrahan('Verapamilo Cloridrato*', ' (cód. 0136, ATC C08DA)'), BIB.aha, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'zid-001', name: 'Zidovudina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antirretroviral análogo dos nucleosídeos, inibidor da transcriptase reversa. Para tratamento da infecção causada pelo retrovírus HIV.',
    indications: `${MAIN}\n\nAntirretroviral análogo dos nucleosídeos, inibidor da transcriptase reversa. Para tratamento da infecção causada pelo retrovírus HIV.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 200 mg em 20 mL (Zidovudina Dosa).',
        reconstitution: 'Não requer reconst. prévia. Conc: 10 mg/mL.',
        diluent: '200 mg em 50–200 mL de SF ou Dx 5%.',
        finalConcentration: '2–4 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir em 50–100 mL de SF ou Dx 5% e admin. em 60 min.',
      },
      pediatrico: {
        dose: 'Profilaxia: R.N. < 30 semanas a 35 semanas I.G.: 0 a 4 semanas de vida: 2 mg/kg/dose a cada 12 h, 4 a 6 semanas de vida: 3 mg/kg/dose a cada 12 h; > 35 semanas I.G.: 4 mg/kg/dose a cada 12 h. Tratamento: Prematuros: 1,5 mg/kg/dose a cada 12 h até 2 semanas de idade, depois 2 mg/kg/dose a cada 8 h. Neonatos: V.O.: 2 mg/kg/dose a cada 6 h E.V.: 1,5 mg/kg/dose a cada 6 h. Crianças: V.O.: 4 a 9 Kg: 12 mg/kg/dose a cada 12 h, 9 a 30 kg: 9 mg/kg/dose a cada 12 h, > 30 kg: 300 mg/dose a cada 12 h; E.V.: 120 mg/m²/dose a cada 6 h. Adultos: 300 mg a cada 12 h. Insuficiência hepática severa: 300 mg a cada 24 h.',
        administration: 'V.O.; E.V.',
        presentation: 'Cápsulas: 100–250 mg; Xarope: 10 mg/ml F.A. de 20 ml: 10 mg/ml',
        notes: 'Pode ser administrada com as refeições. E.V.: Diluir em D 5% (concentração 2–4 mg/ml) e infundir em 1 hora. Interage com: aciclovir, anfotericina, dapsona, ganciclovir, pentamidina, trimetoprima-sulfametoxazol, fluconazol, ácido valproico, cimetidina, difenilhidantoína, etc. Ver Profilaxia pós exposição: laboral, sexual e cortopunção na via pública.',
      },
      neonatal: {
        dose: 'Profilaxia e tratamento conforme protocolo NNU/perinatal.',
        administration: 'E.V. lenta conforme esquema.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 24 h à temperatura ambiente, 48 h refrigerada.',
    adverseEffects: '## Efeitos adversos\n\nAnemia, leucopenia (principalmente neutropenia), cefaleias, náuseas, insônia e mialgias.',
    bibliography: [BIB.garrahan('ZIDOvudina*', ' (AZT) (cód. 0507, ATC J05AF)'), BIB.sadiUcip, BIB.idsa, BIB.anmat, BIB.sadi],
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
console.log(`\npt-BR Garrahan lote 26 (parte B): ${drugs.length}`);
