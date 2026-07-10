#!/usr/bin/env node
/** Garrahan re-tradução lote 25 — 10 monografias pt-BR (parte B) */
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
  heartHf: { citation: 'American Heart Association. Diretrizes de insuficiência cardíaca.', url: 'https://www.heart.org/' },
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sanford: { citation: 'Sanford Guide to Antimicrobial Therapy.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
  esc: { citation: 'European Society of Cardiology. Diretrizes de insuficiência cardíaca.', url: 'https://www.escardio.org/' },
};

const drugs = [
  {
    id: 'fsc-001', name: 'Foscarnet', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções do grupo herpes resistentes às terapias convencionais.',
    indications: `${MAIN}\n\nTratamento de infecções do grupo herpes resistentes às terapias convencionais.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Frasco de 500 ml: 24 mg/ml',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '12 mg/mL.',
        infusionRate: 'Entre 1 e 2 h com BIC.',
        dose: 'Retinite por CMV: Indução: 90 mg/kg/dose a cada 12 h ou 60 mg/kg/dose a cada 8 h por 14–21 dias; manutenção: 90–120 mg/kg/dose a cada 24 h. Herpes simples mucocutâneo resistente ao aciclovir: 40 mg/kg/dose a cada 8–12 h.',
        notes: 'Utilizar com cuidado em pacientes com função renal deteriorada e quando se usam outros agentes nefrotóxicos como anfotericina B, aminoglicosídeos, cisplatina, ciclosporina. Interage com pentamidina (aumenta a hipocalcemia), ciprofloxacina (aumenta o risco de convulsões). Para diminuir a toxicidade renal o paciente deve ter uma hidratação adequada. Por cateter central infunde-se sem diluir. Por veia periférica a solução deve ser diluída a uma concentração final máxima de 12 mg/ml. A velocidade de infusão não deve exceder 60 mg/kg/hora. Cada grama de foscarnet sódico contém 10 mmol de sódio e 3,3 mmol de fosfato.',
      },
    },
    stability: '## Guia pediátrica\n\n- Não refrigerar.',
    adverseEffects: '## Efeitos adversos\n\nInsuficiência renal, hipercalcemia, hiper ou hipofosfatemia, alterações metabólicas. Alterações do magnésio.',
    bibliography: [BIB.garrahan('Foscarnet *', ' (cód. 1128, ATC J05AD)'), BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'fur-001', name: 'Furosemida', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Diurético de alça.',
    indications: `${MAIN}\n\nDiurético de alça.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 10 mg/mL.',
        dose: '20–40 mg E.V. lento; 40–80 mg em EAP conforme protocolo.',
        administration: 'E.V. lento ou I.M.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 40 mg; Gotas: 20 mg/ml (1 mg/gota) Ver formulação; Ampolas de 2 ml: 10 mg/ml.',
        administration: 'V.O.; E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '10 mg/mL.',
        infusionRate: '4 mg/min.',
        dose: 'Neonatos e prematuros: V.O.: 1–4 mg/kg/dose a cada 12–24 h; E.V.: 1–2 mg/kg/dose a cada 12–24 h. Lactentes e crianças: E.V.: 1 mg/kg/dose a cada 6–12 h, infusão contínua: 0,05 mg/kg/hora; V.O.: inicial: 0,5–2 mg/kg/dose a cada 12–24 h; dose máxima V.O.: 6 mg/kg/dia. Adultos: V.O./E.V.: 20–80 mg/dia a cada 6–12 h, máximo 600 mg/dia. Pacientes com insuficiência renal podem requerer doses mais altas para induzir a diurese.',
        notes: 'Administrar com alimentos. Para infusão E.V. diluir em solução fisiológica (diluição estável 24 h). A velocidade máxima de administração é 4 mg/min. Proteger da luz se administrado sem diluir. Os AINEs podem reduzir os efeitos anti-hipertensivos e diuréticos da droga. Aumenta o risco de hipocalemia com tiazidas e corticosteroides. Aumenta o risco de ototoxicidade com aminoglicosídeos. A administração lenta previne a ototoxicidade.',
      },
      neonatal: {
        dose: '0,5–1 mg/kg/dose a cada 12–24 h (NNU).',
        administration: 'E.V. lento.',
      },
    },
    stability: '## Geral\n\n- Usar imediatamente; proteger da luz no armazenamento.\n\n## Guia pediátrica\n\n- 24 h uma vez diluída.',
    adverseEffects: '## Efeitos adversos\n\nOtotoxicidade, rash, cefaleia, hipotensão, dores musculares. Em neonatos prematuros: hipocalemia, hipomagnesemia, hiponatremia, hiperuricemia, nefrocalcinose, hipocalcemia.',
    bibliography: [BIB.garrahan('Furosemida', ' (cód. 0099, ATC C03CA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hdr-001', name: 'Hidralazina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anti-hipertensivo. Vasodilatador.',
    indications: `${MAIN}\n\nAnti-hipertensivo. Vasodilatador.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 20 mg/mL.',
        dose: '5–10 mg E.V. a cada 20–30 min; máx. 20 mg/dose obstétrica.',
        administration: 'E.V. lento.',
      },
      pediatrico: {
        dose: 'Lactentes e crianças: inicial: 0,25 mg/kg/dose 3 a 4 vezes por dia, máximo: 25 mg/dose; ir aumentando em 3 a 4 semanas até lactentes: 5 mg/kg/dia e crianças: 7,5 mg/kg/dia, máximo: 200 mg/dia. Em pacientes com leve a moderada insuficiência renal indicar a cada 8 h, em insuficiência renal severa para acetiladores rápidos a cada 8 a 16 h e acetiladores lentos a cada 12 a 24 h. Adultos: inicial: 10 mg a cada 6 h, aumentar 10 a 25 mg/dose a cada 2 a 5 dias até 300 mg/dia. Faixa de dose usual para hipertensão: 25 a 100 mg/dia em 2 doses.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 25–50 mg',
        notes: 'O uso prolongado de hidralazina pode causar deficiência de piridoxina. A indometacina pode diminuir os efeitos hipotensores da hidralazina. Usar com precaução em pacientes com insuficiência renal severa. Administrar com alimentos.',
      },
      neonatal: {
        dose: '0,1–0,5 mg/kg/dose conforme protocolo cardiológico.',
        administration: 'E.V.',
      },
    },
    stability: '## Estabilidade\n\n- Usar após extração.',
    adverseEffects: '## Efeitos adversos\n\nPalpitações, taquicardia, edema, hipotensão ortostática, cefaleia, febre, anorexia, náuseas, vômitos.',
    bibliography: [BIB.garrahan('Hidralazina', ' (cód. 1554, ATC C02DB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hio-001', name: 'Hioscina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Espasmolítico, para inibir produção de secreções.',
    indications: `${MAIN}\n\nEspasmolítico, para inibir produção de secreções.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Comprimidos: 10 mg; Ampolas: 20 mg/ml.',
        administration: 'V.O.; E.V.; I.M.; S.L.; S.C.',
        diluent: 'A. dest., Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolo 5 min.',
        dose: 'Antissecretório (coadjuvante): E.V.–S.C.–I.M.: Lactentes e < 6 anos: 0,3–0,6 mg/kg/dose, dose máxima: 1,5 mg/kg/dia; 6 a 12 anos: 5–10 mg/dose até 3 vezes por dia, > 12 anos: 20 mg/dose até 4 vezes por dia, adultos dose máxima: 100 mg/dia. V.O.: 6 a 12 anos: 10 mg/dose a cada 8 h, > 12 anos: 20 mg a cada 6 h.',
        notes: 'Contraindicada em pacientes com miastenia gravis, megacólon e glaucoma. A hioscina aumenta os efeitos anticolinérgicos de: antidepressivos anticolinérgicos, anti-histamínicos, amantadina, fenotiazinas. O uso concomitante com metoclopramida pode diminuir o efeito sobre o trato gastrointestinal de ambas as drogas. A ampola pode ser administrada por V.O. Ver alerta.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nSecura da boca, taquicardia, distúrbios na visão, constipação, retenção urinária. Reações alérgicas.',
    bibliography: [BIB.garrahan('Hioscina N-Butilbromuro', ' (cód. 0840, ATC A03BA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'imu-001', name: 'Imunoglobulina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Doença de Kawasaki, púrpura trombocitopênica idiopática, síndrome de imunodeficiência adquirida. Terapêutica de reposição conforme indicação de Imunologia. Prevenção de varicela em R.N. e H.I.C.',
    indications: `${MAIN}\n\nDoença de Kawasaki, púrpura trombocitopênica idiopática, síndrome de imunodeficiência adquirida. Terapêutica de reposição conforme indicação de Imunologia. Prevenção de varicela em R.N. e H.I.C.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'F.A.: 2.500–5.000–10.000 mg (concentração: 50 mg/ml)',
        administration: 'E.V.',
        diluent: 'Não deve ser misturada com outras soluções intravenosas.',
        finalConcentration: '5%.',
        infusionRate: '0,3 a 0,5 mL/kg/h em aumento até 4 mL/kg/h.',
        dose: 'Imunodeficiências: iniciar 0,4–0,8 g/kg a cada 3 a 4 semanas. Síndrome de Guillain-Barré severo e incapacidade significativa: 2 g/kg (dividido em 2 a 5 dias) antes das 2 semanas de evolução. Polineuropatia desmielinizante inflamatória crônica: dose de ataque 2 g/kg em 2 a 5 dias, seguida de dose de manutenção 1 g/kg a cada 3–4 semanas. Encefalites autoimunes: 2 g/kg em 2–5 dias. Neuropatia motora multifocal: 2 g/kg, dividido em 2 a 5 dias. Miastenia gravis: 1 g/kg, dose única. Púrpura trombocitopênica idiopática: 0,8–1 g/kg, dose única; conforme critério do especialista pode repetir-se às 48 h. Doença de Kawasaki: 2 g/kg, dose única. Síndrome inflamatória multissistêmica pediátrica (PIMS) relacionada à COVID-19: 2 g/kg em dose única, máximo 100 g. Ver Terapêutica do síndrome inflamatório multissistêmico pediátrico relacionado à COVID-19.',
        notes: 'Administração: Salas de Internação: Ver Plantillas de infusão GG E.V. "Universidade Nacional de Córdoba" Hospital de Dia: Ver Plantilla de infusão de GG E.V. distintas marcas. Ver "Uso de Gammaglobulina em Pediatria". Ver formulário de "Solicitação de Gammaglobulina Endovenosa".',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto. Conservar entre 2 e 30 °C.',
    adverseEffects: '## Efeitos adversos\n\nAnafilaxia, dor torácica, dispneia, choque, cefaleia, febre, calafrios, náuseas, vômitos, mialgias, artralgias.',
    bibliography: [BIB.garrahan('Gammaglobulina Humana Endovenosa *', ' (cód. 0102, ATC J06BA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'ivb-001', name: 'Ivabradina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Insuficiência cardíaca com taquicardia persistente apesar do uso de betabloqueadores. Reduz de maneira exclusiva a frequência cardíaca, atuando mediante a inibição seletiva e específica da corrente If do marcapasso cardíaco que controla a despolarização diastólica espontânea no nó sinusal e regula a frequência cardíaca.',
    indications: `${MAIN}\n\nInsuficiência cardíaca com taquicardia persistente apesar do uso de betabloqueadores. Reduz de maneira exclusiva a frequência cardíaca, atuando mediante a inibição seletiva e específica da corrente If do marcapasso cardíaco que controla a despolarização diastólica espontânea no nó sinusal e regula a frequência cardíaca.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 5 e 7,5 mg.',
        dose: 'Iniciar 5 mg V.O. a cada 12 h; titular a 7,5 mg a cada 12 h conforme FC e tolerância.',
        administration: 'V.O. com as refeições.',
      },
      pediatrico: {
        dose: '≥ 6 meses e < 40 kg: inicial 0,05 mg/kg/dose a cada 12 h, titular dose conforme resposta após 2 semanas de 0,05 mg/kg até alcançar uma redução da frequência cardíaca de pelo menos 20%. Dose máxima 6 meses a 1 ano: 0,2 mg/kg/dose a cada 12 h, > 1 ano: 0,3 mg/kg/dose a cada 12 h (até 7,5 mg/dose a cada 12 h). > 6 meses e > 40 kg: inicial 2,5 mg/dose a cada 12 h, titular dose conforme resposta após 2 semanas de 2,5 mg até alcançar uma redução da frequência cardíaca de pelo menos 20%. Dose máxima 7,5 mg/dose a cada 12 h. Se produzir bradicardia considerar reduzir a dose à dose prévia recebida ou 0,02 mg/kg/dose a cada 12 h se for com a dose inicial.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 5 mg',
        notes: 'Administrar com o café da manhã e jantar, evitar suco de toranja. Precaução em pacientes com insuficiência cardíaca aguda descompensada, hipotensão sustentada, doença do nó sinusal, bradicardia sintomática, insuficiência hepática severa. Interações: evitar o uso concomitante com medicamentos que prolongam o intervalo QT (amiodarona, pentamidina, etc.) pois o prolongamento do intervalo QT poderia exacerbar-se com a redução da frequência cardíaca. Rifampicina, fenitoína reduzem sua atividade. Inibidores potentes do CYP3A4 como antifúngicos azólicos (itraconazol, etc.), antibióticos macrolídeos (claritromicina, eritromicina, etc.), inibidores da protease de HIV (nelfinavir, ritonavir, etc.) aumentam as concentrações plasmáticas da ivabradina. Com diuréticos não poupadores de potássio, risco de arritmias graves.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nCefaleias (durante o 1º mês), tontura possivelmente relacionada com a bradicardia, fenômenos luminosos, visão borrosa, bradicardia, bloqueio A-V de 1º grau, extrassístole, fibrilação atrial, pressão arterial não controlada.',
    bibliography: [BIB.garrahan('ivaBRADina*', ' (cód. 2031, ATC C01EB)'), BIB.heartHf, BIB.anmat, BIB.sac, BIB.esc],
  },
  {
    id: 'kcl-001', name: 'Cloreto de potássio', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hipocalemia.',
    indications: `${MAIN}\n\nHipocalemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampolas 10–20 mEq; bolsas premix.',
        dose: 'Reposição conforme déficit e níveis; típico 10–40 mEq em diluição.',
        infusionRate: '≤ 10 mEq/h periférica.',
        administration: 'E.V. diluído exclusivamente.',
      },
      pediatrico: {
        dose: 'Requerimentos de potássio: V.O./E.V.: < 1 ano: 2–6 mEq/kg/dia; > 1 ano: 1–3 mEq/kg/dia; adultos: 40–80 mEq/dia. Hipocalemia sintomática: E.V.: neonatos, lactentes, crianças: 0,5–1 mEq/kg/dose. Hipocalemia assintomática: V.O.: crianças: 3 mEq/kg/dia (mais perdas concomitantes), adultos: 40–100 mEq em doses divididas (recomenda-se não superar 20 mEq/dose). Ver Boletim CIME Eletrólitos.',
        administration: 'V.O.; E.V.',
        presentation: 'Cápsulas de liberação prolongada: 600 mg (8 mEq de K); Solução V.O. (preparado magistral): 223 mg/ml (3 mEq de K/ml) Ver formulação; Ampolas: 3 mEq/ml',
        notes: 'Precaução em insuficiência renal e suprarrenal. E.V.: não administrar sem diluir (via periférica: concentração de potássio menor que 60 mEq/litro pelo risco de flebite; via central: 150–200 mEq/litro). Velocidade de infusão: < 0,25 mEq/kg/hora. Inf. máx.: 20 mEq/h. Realizar monitorização cardíaca durante a infusão. Solventes compatíveis: Dx 5%, Sol. F. Aumenta risco de hipercalemia com anti-inflamatórios não esteroides, ciclosporina, digoxina, heparina, diuréticos poupadores de potássio. Controlar e corrigir hipomagnesemia. 1 g de ClK = 13,5 mEq de K.',
      },
      neonatal: {
        dose: '1–2 mEq/kg/dia em NNU dividido em bomba.',
        administration: 'E.V. central preferida.',
      },
    },
    stability: '## Estabilidade\n\n- Usar linha dedicada; verificar concentração final.',
    adverseEffects: '## Efeitos adversos\n\nV.O.: náuseas, vômitos, dor abdominal, diarreia, hipercalemia. E.V.: flebite, parestesias, arritmias, bloqueio, parada cardíaca.',
    bibliography: [BIB.garrahan('potássio CLORURO*', ' (cód. 0286, ATC A12BA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ktr-001', name: 'Ketorolac', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Não esteroide. Analgésico em dor aguda de moderada a severa, equivalente aos opioides. Escassa eficácia anti-inflamatória.',
    indications: `${MAIN}\n\nNão esteroide. Analgésico em dor aguda de moderada a severa, equivalente aos opioides. Escassa eficácia anti-inflamatória.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampolas de 1 ml: 30 mg/ml; Ampolas de 2 ml: 15 mg/ml; Comprimidos: 10 mg',
        administration: 'V.O.; E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '30 mg/mL.',
        infusionRate: 'De 1 a 5 minutos.',
        dose: 'Crianças de 6 meses a 16 anos: E.V.: 0,5 mg/kg/dose (máx.: 15 mg/dose) a cada 6–8 h; V.O.: 1 mg/kg/dose a cada 6–8 h, dose máxima: 10 mg/dose. ≥ 17 anos, mais de 50 kg e adultos: E.V.: 30 mg a cada 6–8 h, dose máxima: 120 mg/dia (se a criança pesa menos de 50 kg não exceder 60 mg/dia), V.O.: 10 mg a cada 6–8 h, dose máxima: 40 mg/dia.',
        compatibility: 'Precipita concomitantemente com morfina.',
        notes: 'Duração máxima do tratamento: 48–72 h. Administração: push em mais de 15 segundos ou para infusão intermitente diluir em solução fisiológica ou dextrose 5% em concentração de 0,12 mg/ml. Insuficiência renal moderada ou grave: contraindicado porque o ketorolac e seus metabólitos se eliminam principalmente por via renal. Em pacientes com menor grau de insuficiência renal indicar a metade da dose recomendada, sem superar dose diária total de 60 mg, com determinações periódicas das provas de função renal. A diálise permite eliminar pouco o ketorolac do sangue.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, dispepsias, epigastralgias, constipação, diarreia, edema, hipertensão, rash, prurido, púrpura, sonolência, tontura, cefaleia, sudorese. Hemorragia gastrointestinal, trombocitopenia, convulsões, insuficiência renal aguda.',
    bibliography: [BIB.garrahan('ketoROLac trometamina*', ' (cód. 0642, ATC M01AB)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'lor-001', name: 'Lorazepam', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsivante. Relaxante muscular. Ansiolítico. Antiemético (vômitos antecipatórios).',
    indications: `${MAIN}\n\nAnticonvulsivante. Relaxante muscular. Ansiolítico. Antiemético (vômitos antecipatórios).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 2–4 mg/mL.',
        dose: '1–4 mg E.V. lento PRN sedação; status: 0,1 mg/kg (protocolo).',
        administration: 'E.V. lenta.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 1–2–2,5 mg; Comprimidos sublinguais: 1 mg; Ampolas: 4 mg/ml; Solução (preparado magistral): 1 mg/ml',
        reconstitution: '1 amp. + 3 mL de diluente.',
        administration: 'V.O.; E.V.; I.M.',
        diluent: 'A. dest., Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolo de 2 a 5 minutos. Gotejo para analgosedação.',
        dose: 'Ansiedade, sedação: lactentes e crianças (V.O./E.V.): 0,05 mg/kg/dose a cada 4–6–8 h (máximo 2 mg/dose), adultos: 1–10 mg/dia a cada 8–12 h. Status epilepticus (E.V./Retal): neonatos: 0,05 mg/kg repetir se necessário em 10–15 min., lactentes e crianças: 0,1 mg/kg (máximo 4 mg/dose) repetir se necessário em 10–15 min., adultos: 4 mg/dose repetir se necessário em 10–15 min. Antiemético: 0,05 mg/kg/dose a cada 6 h, máximo: 4 mg/dose.',
        notes: 'E.V.: Diluir previamente com igual volume de Dx 5% ou Sol. F., não exceder 2 mg/minuto. Interações: outros depressores do S.N.C. ou respiratórios podem aumentar os efeitos adversos do lorazepam. As ampolas contêm álcool benzílico 2%, polietilenoglicol e propilenoglicol (precaução em recém-nascidos por toxicidade). Evitar administração intra-arterial. Contraindicado em glaucoma de ângulo estreito. Ver guia preliminar para a prevenção da teratogênese causada por medicamentos. Ver Guia prática para manejo de analgosedação e seu desmame em salas de cuidados intermediários e moderados.',
      },
      neonatal: {
        dose: '0,05 mg/kg E.V. conforme protocolo de convulsões NNU.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Geral\n\n- E.V. diluída conforme bula.\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto. Conservar refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nSedação excessiva, ataxia.',
    bibliography: [BIB.garrahan('LORazepam', ' (cód. 0131, ATC N05BA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ltx-001', name: 'Levotiroxina', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Hipotireoidismo.',
    indications: `${MAIN}\n\nHipotireoidismo.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos; ampola E.V. 200 mcg.',
        dose: 'Mixedema: 200–400 mcg E.V. carga; manutenção V.O.',
        administration: 'E.V. lenta ou V.O. em jejum.',
      },
      pediatrico: {
        dose: '0–3 meses: 10–15 µg/kg; 3–6 meses: 25–50 µg; 6–12 meses: 50–75 µg; 1–5 anos: 75–100 µg; 6–12 anos: 100–150 µg; > 12 anos: 150 µg.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 25 mcg – 50 mcg – 100 mcg',
        notes: 'Deve ser indicada por especialistas. Sais de ferro, hidróxido de alumínio, sucralfato diminuem sua absorção. A levotiroxina aumenta o efeito dos anticoagulantes orais. A fenitoína pode diminuir os níveis de levotiroxina. Administrar com o estômago vazio, 1–1,5 h antes do café da manhã. Não administrar por sonda nasogástrica.',
      },
      neonatal: {
        dose: '10–15 mcg/kg/dia V.O. em hipotireoidismo congênito.',
        administration: 'V.O.',
      },
    },
    stability: '## Estabilidade\n\n- E.V. usar imediatamente após preparação.',
    adverseEffects: '## Efeitos adversos\n\nTaquicardia, cefaleias, arritmias cardíacas, nervosismo, insônia, alopecia, aumento do apetite.',
    bibliography: [BIB.garrahan('levoTIROXina', ' (cód. 0343, ATC H03AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
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
console.log(`\npt-BR Garrahan lote 25 (parte B): ${drugs.length}`);
