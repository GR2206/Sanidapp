#!/usr/bin/env node
/** Garrahan re-tradução lote 23 — 10 monografias pt-BR (parte B) */
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
  idsa: { citation: 'Infectious Diseases Society of America (IDSA). Diretrizes clínicas.', url: 'https://www.idsociety.org/' },
};

const drugs = [
  {
    id: 'pen-001', name: 'Penicilina G sódica', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções do trato respiratório inferior, sistema nervoso e coração causadas por microorganismos gram-positivos sensíveis e alguns gram-negativos como Neisseria gonorrhoeae ou Neisseria meningitidis.',
    indications: `${MAIN}\n\nTratamento de infecções do trato respiratório inferior, sistema nervoso e coração causadas por microorganismos gram-positivos sensíveis e alguns gram-negativos como Neisseria gonorrhoeae ou Neisseria meningitidis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 3 MUI (Bencilpenicilina sódica Fabra, Drawer, Northia, Klonal).',
        reconstitution: '5 mL de AD. Conc: 0,6 MUI/mL.',
        diluent: '3 MUI em 100 mL de SF.',
        finalConcentration: '0,03 MUI/mL administrar entre 15–60 min.',
        administration: 'E.V. direta: Não. Sim, 5 mL de AD, passar em 3–5 min. E.V. intermitente: Sim.',
      },
      pediatrico: {
        presentation: 'F.A.: 1–3–5 milhões U.I.',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '100.000 a 500.000 UI/mL. Lactentes: 50.000 UI/mL.',
        infusionRate: '15 a 60 minutos com BIC.',
        dose: 'Infecções leves e moderadas: 100.000–150.000 U.I./kg/dia a cada 6 h, dose máxima: 8.000.000 U.I./dia. Infecções graves: 200.000–300.000 U.I./kg/dia a cada 4 h, dose máxima: 24.000.000 U.I./dia; Meningite: 300.000–400.000 U.I./kg/dia a cada 4 h; Meningite por Estreptococos grupo B Crianças: 450.000–500.000 U.I./kg/dia a cada 6 h; Sífilis congênita: < 7 dias: 50.000 U.I./kg/dose a cada 12 h; 8 dias a 30 dias: 50.000 U.I./kg/dose a cada 8 h; lactentes > 1 mês e crianças: 50.000 U.I./kg/dose a cada 4–6 h. Neurosífilis: dose máxima 18.000.000 U.I.–24.000.000 U.I..',
        notes: 'Antibióticos como tetraciclinas, cloranfenicol e eritromicina podem antagonizar a atividade da penicilina.',
      },
      neonatal: {
        dose: '50.000 UI/kg/dose a cada 12 h em R.N.; meningite: esquemas mais frequentes (protocolo UCIN).',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 48 h refrigerado.\n\n## Guia pediátrica\n\n- 7 dias na geladeira.',
    adverseEffects: '## Efeitos adversos\n\nRash dérmico, urticária, febre, dor, eosinofilia, anemia hemolítica, leucopenia. Em uremia ou altas doses: convulsões.',
    bibliography: [BIB.garrahan('penicilina G. SÓDICA', ' (cód. 163, ATC J01CA)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'pen-002', name: 'Penicilina G benzatínica', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções leves e moderadas causadas por microorganismos gram-positivos sensíveis ou para profilaxia de infecções ocasionadas por esses microorganismos. Sífilis.',
    indications: `${MAIN}\n\nTratamento de infecções leves e moderadas causadas por microorganismos gram-positivos sensíveis ou para profilaxia de infecções ocasionadas por esses microorganismos. Sífilis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 1,2 e 2,4 MUI (Galtamicina, Klonal, Fabra, Richet, Pen Di Ben).',
        reconstitution: '5 mL AD (1,2 MUI); 10 mL AD (2,4 MUI). Conc: 0,24–0,12 MUI/mL.',
        diluent: '1,2 MUI em 5 mL de AD ou 2,4 MUI em 10 mL de AD.',
        finalConcentration: '0,24 MUI/mL.',
        administration: 'I.M. profunda: Sim. Agitar suavemente para permitir a umectação do pó, depois agitar vigorosamente até a completa dissolução. E.V. direta: Não. E.V. intermitente: Não.',
        notes: 'Não deve ser administrada sob nenhuma circunstância por via E.V. pelo risco de produzir isquemia fatal.',
      },
      pediatrico: {
        dose: 'Sífilis: 50.000 U.I./kg/dose, 1 a 3 doses conforme tempo de evolução; dose máxima: 2.400.000 U.I./dose. Prevenção secundária de febre reumática: ≤ 27 kg: I.M.: 600.000 U.I. a cada 3 a 4 semanas; > 27 kg: I.M.: 1.200.000 U.I. a cada 3 a 4 semanas.',
        administration: 'I.M.',
        presentation: 'F.A.: 1.200.000 U.I.–2.400.000 U.I. (liofilizado ou suspensão)',
        notes: 'Indicar com precaução em menores de 2 anos. A administração da penicilina G benzatínica é semanal.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Utilizar imediatamente. Descartar o remanescente se houver.\n\n## Solução diluída (a administrar)\n\n- Não se aplica.',
    adverseEffects: '## Efeitos adversos\n\nReações alérgicas, sobretudo cutâneas. Anemia hemolítica, leucopenia.',
    bibliography: [BIB.garrahan('penicilina  BENZATÍNICA', ' (cód. 0162, ATC J01CA)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'tei-001', name: 'Teicoplanina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções do trato respiratório inferior, osso, pele e partes moles e infecções das vias urinárias por microorganismos gram-positivos sensíveis à vancomicina em caso de perda de acesso venoso, dado que pode ser administrada por via I.M..',
    indications: `${MAIN}\n\nTratamento de infecções do trato respiratório inferior, osso, pele e partes moles e infecções das vias urinárias por microorganismos gram-positivos sensíveis à vancomicina em caso de perda de acesso venoso, dado que pode ser administrada por via I.M..\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola 200 mg ou 400 mg.',
        reconstitution: 'Reconstituir com água para injeção; espuma normal, deixar repousar.',
        dose: 'Carga: 6 mg/kg a cada 12 h x 3 doses. Manutenção: 6 mg/kg a cada 24 h.',
        infusionRate: 'Perfusão E.V. lenta 30 min.',
        administration: 'E.V. ou I.M.',
      },
      pediatrico: {
        dose: 'R.N.: 1º dia: 16 mg/kg/dia, depois 8 mg/kg/dia (em infusão); > 2 meses infecções leves, as primeiras 3 doses E.V./I.M.: 10 mg/kg/dose a cada 12 h, depois: 10 mg/kg/dia a cada 24 h; dose máxima: 400 mg/dia. Neutropênicos Transplante de Medula Óssea infecções graves: 15–20 mg/kg/dia, manter concentração vale: > 10 mg/L. Adultos: 400 mg a cada 12 h por 3 doses, depois infecções leves: 400 mg a cada 24 h, infecções graves: dose máxima 800 mg a cada 24 h.',
        administration: 'E.V.; I.M.',
        presentation: 'F.A.: 400 mg',
        notes: 'Sua meia-vida prolongada permite o uso a cada 24 h. Infusão E.V. em 30 minutos. Ajuste de dose em insuficiência renal.',
      },
    },
    stability: '## Estabilidade\n\n- Solução reconstituída 24 h refrigerada.',
    adverseEffects: '## Efeitos adversos\n\nDor no local da injeção, febre, náuseas, vômitos, reação anafilática. Raro: trombocitopenia.',
    bibliography: [BIB.garrahan('Teicoplanina', ' (cód. 521, ATC J01XA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'vor-001', name: 'Voriconazol', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de aspergilose invasiva. Candidemia. Candidíase esofágica.',
    indications: `${MAIN}\n\nTratamento de aspergilose invasiva. Candidemia. Candidíase esofágica.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 200 mg (VFend, Richet, Sandoz).',
        reconstitution: '19 mL de AD. Conc: 10 mg/mL.',
        diluent: '200 mg em 100 mL de SF, DX 5%.',
        finalConcentration: '2 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir em 100 mL de SF ou DX 5% e administrar durante 60–120 min.',
      },
      pediatrico: {
        dose: 'E.V.: 2 a 12 anos: dose de carga inicial 9 mg/kg/dose a cada 12 h por 2 doses, dose de manutenção 8 mg/kg a cada 12 h, dose máxima 350 mg c/12 h; > 12 anos e adultos: dose de carga: 6 mg/kg/dose a cada 12 h por 2 doses, dose de manutenção: 4 mg/kg/dose c/12 h. V.O.: 2 a 12 anos: 9 mg/kg/dose c/12 h; > 12 anos < 40 kg: 200 mg/dose c/12 h, durante 1 dia depois 100 mg/dose c/12 h; > 40 kg: 400 mg a cada 12 h durante 1 dia, depois 200–300 mg c/12 h. Ajuste de dose em insuficiência renal: com Cl < 50 ml/min pode haver acumulação do veículo do injetável (éter sulfobutílico de beta ciclodextrina sódica), administrar por V.O. ou avaliar risco-benefício. Ajuste de dose em insuficiência hepática leve a moderada: reduzir a dose de manutenção em 50%. Ver tabela de ajuste de dose em I.H.',
        administration: 'E.V.; V.O.',
        presentation: 'Comprimidos revestidos: 50–200 mg; F.A.: 200 mg; Suspensão (preparado magistral): 40 mg/ml',
        notes: 'V.O.: administrar 1 h antes ou 1 h depois das refeições; E.V.: infundir em 1–2 h (máx. velocidade 3 mg/kg/hora). Monitorar a função hepática, renal e visual. Interações: voriconazol pode aumentar a concentração sérica de: cisaprida, pimozida, rifabutina (contraindicada), ciclosporina (diminuir a dose de ciclosporina 50%), sirolimus (contraindicado), tacrolimus (diminuir a dose de tacrolimus em 66%), efavirenz, delavirdina, benzodiazepínicos, bloqueantes dos canais de cálcio, metilprednisolona, omeprazol (para doses de omeprazol > 40 mg/dia, reduzir a dose do omeprazol em 50%). Rifampicina, difenilhidantoína diminuem os níveis séricos de voriconazol (ajustar sua dose). Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nAlterações visuais (fotofobia, visão borrada, etc.), taquicardia, hipertensão, vasodilatação, edema periférico, febre, cefaleia, alucinações, hipocalemia, hipomagnesemia, náuseas, vômitos, prolongamento do intervalo QT.',
    bibliography: [BIB.garrahan('Voriconazol*', ' (cód. 1601, ATC J02AC)'), BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'ert-001', name: 'Ertapenem', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento sequencial de internação ambulatorial para infecções intra-abdominais e infecções urinárias complicadas.',
    indications: `${MAIN}\n\nTratamento sequencial de internação ambulatorial para infecções intra-abdominais e infecções urinárias complicadas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 1 g (Invanz, Ertapenem Richet).',
        reconstitution: '10 mL de AD ou SF. Conc: 100 mg/mL.',
        diluent: '1 g em 50–100 mL de SF.',
        finalConcentration: '10–20 mg/mL.',
        administration: 'I.M.: Sim. Reconst. com 3,2 mL de solvente indolor e aplicar I.M. profundo. E.V. intermitente: Sim. Reconst. com 10 mL de AD ou SF, diluir com 50–100 mL de SF e infundir em 30–60 min.',
        notes: 'Não devem passar mais de 6 h entre a reconstituição e o fim da administração. Não se recomenda a diluição em DX 5% por sua instabilidade.',
      },
      pediatrico: {
        dose: 'Infecções intra-abdominais e infecções urinárias complicadas: 3 meses a 12 anos: 15 mg/kg/dose a cada 12 h durante 5 a 14 dias, máximo 1 g/dia; > 13 anos e adultos: 1 g durante 14 dias.',
        administration: 'E.V. I.M.',
        presentation: 'F.A.: 1 g',
        notes: 'Administrar com precaução em pacientes com lesões cerebrais ou história de convulsões. I.M.: Reconstituir o frasco de 1 g com 3,2 ml de lidocaína a 1% ou a 2%, agitar bem antes de usar (administrar I.M. profundo em um músculo de grande massa muscular dentro da hora de preparado). E.V.: Agitar bem após reconstituído e diluir em solução fisiológica a uma concentração final de 20 mg/ml, infundir em 30 minutos; a solução diluída é estável 6 h em temperatura ambiente e 24 h refrigerada. O probenecid diminui o clearance renal do ertapenem. Contém 137 mg de sódio (aprox. 6 mEq)/g de ertapenem.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 6 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nDor abdominal, constipação, indigestão, náuseas, vômitos, cefaleia, vaginite, convulsões, dor no local da injeção.',
    bibliography: [BIB.garrahan('ERTApenem*', ' (cód. 1703, ATC J01DH)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'fos-001', name: 'Fosfomicina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibacteriano.',
    indications: `${MAIN}\n\nAntibacteriano.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 1 g (Fosfomicina Luar, Fosfomicyn).',
        reconstitution: '10 mL de AD. Conc: 100 mg/mL.',
        diluent: '1–4 g em 100–250 mL de DX 5%.',
        finalConcentration: '4–40 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir na proporção de 4 mL de AD ou DX 5% por cada mL de solução reconstituída e infundir na proporção de 1 g/h. Esclarecimento: 4 g (40 mL) em 160 mL de DX 5%. Passam-se 40 mL/h.',
        notes: 'Ao dissolver a fosfomicina ocorre uma reação exotérmica, o que faz o frasco aquecer levemente sem alterar o antibiótico. Alto conteúdo de sódio (cada grama de ATB contém 14,5 mEq).',
      },
      pediatrico: {
        dose: 'Crianças: 200–400 mg/kg/dia a cada 6–8 h. Adultos: 1 g–5 g/dia a cada 6–8 h; dose máxima: 16 g, em casos especiais: 8 g a cada 8 h (consultar o especialista).',
        administration: 'E.V. V.O.',
        presentation: 'F.A. Liof. (como sal dissódica estéril): 1000 mg (cada grama de Fosfomicina contém 14,5 mEq de sódio) Sachê granulado para solução oral (como fosfomicina trometamol): 3 g',
        notes: 'Fosfomicina trometamol: com metoclopramida, antiácidos ou sais de cálcio reduz a absorção da fosfomicina.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não especificado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nComuns: diarreia (9%–10%), náuseas (4%–5%), cefaleia (4%–10%), faringite (2,5%), rinite (4,5%). Graves: anemia aplásica, colestase, necrose hepática, megacólon tóxico, angioedema.',
    bibliography: [BIB.garrahan('Fosfomicina*', ' (cód. 1950, ATC J01XX)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'dap-001', name: 'Daptomicina', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibacteriano. Infecções graves por Staphylococcus aureus meticilino resistente intolerantes ou refratárias ao tratamento convencional com vancomicina.',
    indications: `${MAIN}\n\nAntibacteriano. Infecções graves por Staphylococcus aureus meticilino resistente intolerantes ou refratárias ao tratamento convencional com vancomicina.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 500 mg (Cubicin RT).',
        reconstitution: '10 mL de AD. Conc: 50 mg/mL.',
        diluent: '500 mg em 50 mL de SF.',
        finalConcentration: '10 mg/mL.',
        administration: 'E.V. direta: Sim, somente em adultos. Passar em 2 min. E.V. intermitente: Sim. Diluir em 50 mL de SF e administrar em 30 min.',
        notes: 'Não é compatível com DX 5%.',
      },
      pediatrico: {
        presentation: 'F.A.: 500 mg',
        reconstitution: 'Reconstituir e deixar repousar 10 min. Misturar com rotações suaves. Não agitar vigorosamente.',
        administration: 'E.V.',
        diluent: 'Sol. Cl Na 0,9%. NÃO Dext. 5%.',
        finalConcentration: '20 mg/mL.',
        infusionRate: '30 min. com BIC.',
        dose: 'Crianças 2–6 anos: 8–10 mg/kg/dia c/24 h; 6–12 anos: 7 mg/kg/dia c/24 h; > 12 anos: 4–6 mg/kg/dia c/24 h. Bacteremia, endocardite direita, osteomielite, artrite séptica: 8–10 mg/kg/dia Adultos: Infecções graves de pele e partes moles: 4 mg/kg/dia c/24 h; bacteremia, endocardite direita: 6 mg/kg/dia.',
        notes: 'Velocidade de infusão: 60 minutos. Controle de sinais e sintomas de: miopatias e neuropatia periférica, monitorização semanal de CPK.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente, 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 48 h refrigerado.\n\n## Guia pediátrica\n\n- 12 h em temperatura ambiente, 48 h na geladeira.',
    adverseEffects: '## Efeitos adversos\n\nDor no peito, edema periférico, cefaleias, tontura, insônia, dor abdominal, anemia, eosinofilia, aumento das transaminases séricas, insuficiência renal.',
    bibliography: [BIB.garrahan('Daptomicina*', ' (cód. 1831, ATC J01XX)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'lev-001', name: 'Levofloxacino', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Cervicite, uretrite por Cl. trachomatis e gonococo. Infecções graves por germes multirresistentes. Infecções por micobactérias.',
    indications: `${MAIN}\n\nCervicite, uretrite por Cl. trachomatis e gonococo. Infecções graves por germes multirresistentes. Infecções por micobactérias.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 500 mg, 750 mg; E.V. 500 mg.',
        dose: '500–750 mg V.O./E.V. a cada 24 h.',
        administration: 'V.O. ou E.V.',
      },
      pediatrico: {
        dose: 'Crianças: é muito limitada a informação, alguns centros recomendam: 6 meses a 5 anos: 10 mg/kg/dose a cada 12 h, dose máxima: 500 mg/dia; maiores de 5 anos: 10 mg/kg/dose a cada 24 h, dose máxima: 1 g/dia. Adultos: 500 mg a cada 24 h; infecções graves: 750 mg a cada 24 h; tratamento para tuberculose: 15–20 mg/kg/dia a cada 24 h; diarreia do viajante: 500 mg a cada 24 h durante 3 dias.',
        administration: 'V.O.; E.V.',
        presentation: 'Comprimidos: 500 mg; F.A. de 20 ml: 25 mg/ml; Suspensão (preparação magistral): 50 mg/ml',
        notes: 'Os antiácidos à base de alumínio e magnésio devem ser ingeridos pelo menos 2 h antes ou depois da levofloxacina. Pode prolongar a meia-vida da teofilina. Efeitos aditivos com medicamentos que prolongam o intervalo QT. Ver guia de tratamento de tuberculose.',
      },
    },
    stability: '## Estabilidade\n\n- E.V. diluída conforme bula; proteger da luz.',
    adverseEffects: '## Efeitos adversos\n\nDiarreia, náuseas, vaginite, rash, insônia, toxicidade hepática. Hiperglicemia, hipoglicemia. Rupturas tendinosas (mais frequentemente no tendão de Aquiles) a partir das 48 h de tratamento.',
    bibliography: [BIB.garrahan('levoFLOXacina*', ' (cód. 1360, ATC J01MA)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'ome-001', name: 'Omeprazol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hemorragia digestiva grave. Úlcera gastroduodenal. Refluxo gastroesofágico. Condições hipersecretoras. Inibidor da bomba de prótons.',
    indications: `${MAIN}\n\nHemorragia digestiva grave. Úlcera gastroduodenal. Refluxo gastroesofágico. Condições hipersecretoras. Inibidor da bomba de prótons.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Cápsulas/comprimidos: 10–20–40 mg; Comprimidos \'mups\': 10–20 mg; F.A.: 40 mg (reconstituir somente com o solvente que acompanha o F.A.); Suspensão V.O.: Frasco com pó para reconstituir em 70 ml: 2 mg/ml, contém adicionalmente 168 mg de bicarbonato de sódio/ml.',
        reconstitution: 'Reconstituir somente com o solvente fornecido pelo fabricante.',
        administration: 'V.O.; E.V.',
        diluent: 'Sol. Cl Na 0,9% ou Dext. 5% para diluição.',
        finalConcentration: '0,4 mg/mL.',
        infusionRate: 'Entre 20 e 30 minutos com BIC.',
        dose: 'V.O.: Esofagite: Crianças: 0,5 mg/kg/dose, a cada 24 h, dose máxima: 20 mg/dia; Adultos: 20 mg/dose, a cada 24 h. Úlcera duodenal: Crianças: 1 mg/kg/dia; a cada 12 h, dose máxima 20 mg/dia; Adultos: 20 mg/dose, a cada 24 h. Refluxo gastroesofágico: Crianças > 1 mês: 0,5–1 mg/kg/dose, a cada 24 h, dose máxima: 20 mg/dia, Adultos: 20 mg/dose, a cada 24 h. Condições hipersecretoras: 60 mg/dia. Síndrome de Zollinger-Ellison: 60 mg/dose a cada 8 h, seguido de uma terapia de manutenção V.O. de 90 mg/dose a cada 12 h e depois a cada 24 h. E.V.: Crianças de 1 mês–12 anos: 0,5–2 mg/kg/dose, a cada 24 h. > 12 anos: 40 mg/dose, a cada 24 h. Passar para a via oral tão rápido quanto o paciente tiver tolerância. Hemorragias digestivas administrar a cada 8 h, de 3 a 5 dias conforme evolução e depois a cada 12–24 h.',
        compatibility: 'Não administrar concomitantemente com rifampicina, fenitoína e carbamazepina.',
        notes: 'O injetável uma vez reconstituído com o solvente do fabricante dura 4 h, infundir lentamente, sem diluir (velocidade máxima: 4 ml/min). Para infusão E.V.: reconstituir o pó com 10 ml de sol. fisiol. (estabilidade 12 h), tomar a dose indicada e diluir com o mesmo solvente a uma concentração de 0,4 mg/ml; administrar em 30 min. Idem com Dext. 5% (estabilidade 6 h). Cápsula: não mastigar nem esmagar os grânulos, pode-se abrir a cápsula e administrar o conteúdo com iogurte ou suco de laranja. Comprimido \'mups\': engolir inteiro com meio copo de líquido e não deve ser pulverizado nem mastigado, também pode ser desintegrado em meio copo de água sem gás ou suco de frutas (agita-se até que o comprimido se desintegre e bebe-se o líquido com os pellets imediatamente ou dentro de 30 minutos). Para administrar por S.N.G. dissolver a cápsula de 20 mg em 10 ml de bicarbonato de sódio ou dissolver a apresentação comprimidos mups em água. O omeprazol pode retardar a excreção de: diazepam, difenilhidantoína. Diminui a concentração de ferro. Altera a concentração de ciclosporina, itraconazol, cetoconazol, voriconazol, claritromicina, digoxina. Contraindicado com atazanavir. Ver alerta.',
      },
    },
    stability: '## Guia pediátrica\n\n- 4 horas em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nDiarreia, náuseas, constipação, dor abdominal, vômitos, cefaleia, tontura. Nefrite intersticial.',
    bibliography: [BIB.garrahan('Omeprazol', ' (cód. 0714, ATC A02BC)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'nor-001', name: 'Noradrenalina (norepinefrina)', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Simpaticomimético. Choque cardiogênico ou séptico com hipotensão refratária com baixa resistência periférica.',
    indications: `${MAIN}\n\nSimpaticomimético. Choque cardiogênico ou séptico com hipotensão refratária com baixa resistência periférica.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: 'Início habitual 0,05–0,1 mcg/kg/min; titular até PAM objetivo (prescrição).',
        infusionRate: 'Infusão contínua em bomba.',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
      pediatrico: {
        presentation: 'Ampolas de 4 ml: 1 mg/ml',
        administration: 'E.V.',
        diluent: 'SOMENTE Dext. 5%.',
        finalConcentration: 'Usual 4 mcg/mL. Em restrição hídrica, 16 mcg/mL.',
        infusionRate: 'Somente por BIC.',
        dose: '0,05–1 µg/kg/minuto, dose máxima: 2 µg/kg/min Adultos: iniciar 4 µg/minuto, Infusão: 8–12 µg/minuto',
        notes: 'Oxida-se rapidamente, não utilizar se apresentar coloração marrom. Não se recomenda diluir em solução fisiológica. Os efeitos da noradrenalina podem ser aumentados na presença de antidepressivos tricíclicos, anti-histamínico e beta-bloqueantes.',
      },
      neonatal: {
        presentation: 'Ampola ou frasco para perfusão E.V. conforme apresentação institucional.',
        reconstitution: 'Reconstituir conforme bula; diluir em SG 5% ou NaCl 0,9%.',
        diluent: 'SG 5% ou NaCl 0,9%.',
        finalConcentration: 'Concentração conforme guia do serviço (bomba de infusão).',
        dose: '0,05–1 mcg/kg/min conforme protocolo UCIN e peso.',
        infusionRate: 'Titular conforme PA e perfusão',
        administration: 'E.V. contínua em bomba; via central preferida.',
        compatibility: 'Verificar compatibilidade em linha com outros vasopressores.',
        notes: 'Monitorar FC, PA invasiva, diurese e perfusão periférica.',
      },
    },
    stability: '## Geral\n\n- Proteger da luz. Trocar solução conforme política do serviço (habitualmente 24 h).\n\n## Guia pediátrica\n\n- Descartar o sobrante uma vez aberta. Diluição estável 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nHipertensão, necrose, bradicardia. Uso prolongado: diminuição do débito cardíaco, depleção do volume plasmático, vasoconstrição periférica e visceral severa. Além disso, cardiopatia por estresse.',
    bibliography: [BIB.garrahan('NORadrenalina', ' (cód. 1401, ATC C01CA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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
console.log(`\npt-BR Garrahan lote 23 (parte B): ${drugs.length}`);
