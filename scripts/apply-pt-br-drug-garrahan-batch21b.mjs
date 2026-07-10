#!/usr/bin/env node
/** Garrahan re-tradução lote 21 — 10 monografias pt-BR (parte B) */
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
};

const drugs = [
  {
    id: 'clo-001', name: 'Clonidina', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Anti-hipertensivo, agonista alfa-2-adrenérgico. Para sedação, dor e prevenção da síndrome de abstinência de opioides.',
    indications: `${MAIN}\n\nAnti-hipertensivo, agonista alfa-2-adrenérgico. Para sedação, dor e prevenção da síndrome de abstinência de opioides.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampolas de 1 mL: 0,150 mg/mL; Solução (preparado magistral): 10 µg/mL',
        reconstitution: 'Uma vez reconstituída, 1 amp. até 24 mL.',
        administration: 'E.V.; V.O.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: 'Conforme diluição para BIC (1 amp. até 24 mL).',
        infusionRate: 'Conforme indicação médica, com BIC.',
        dose: 'Hipertensão grave: 2 a 18 anos: E.V.: 2–6 µg/kg dose única no dia, máximo 300 µg; V.O.: inicial 0,5–1 µg/kg a cada 8 h e aumentar se necessário até máximo 25 µg/kg/dia em doses divididas (não exceder 1,2 mg/dia); Sedação, dor, prevenção da síndrome de abstinência de opioides: E.V.: inicial: 0,25 µg/kg/hora, aumentar de 0,1 µg/kg/hora até obter sedação adequada (na maioria das crianças o efeito observa-se com 1–3 µg/kg/hora); V.O.: 1–3 µg/kg a cada 8 h, dose máxima 5 µg/kg a cada 8 h. Ajustar dose com filtração glomerular < 10 mL/min.',
        notes: 'Deve-se monitorar pressão arterial e pulso. Não suspender abruptamente se administrada por mais de 2 semanas; reduzir diariamente ao longo de 5 dias até 1 µg/kg/dose, a cada 8 h, e então suspender (crise hipertensiva). Ver guia prática para manejo de analgosedação e seu desmame em unidades de cuidados intermediários e moderados.',
      },
    },
    stability: '## Guia pediátrica\n\n- 24 h. Uma vez reconstituída 1 amp. até 24 mL.',
    adverseEffects: '## Efeitos adversos\n\nDermatite de contato, eritema, prurido, constipação, náuseas, xerostomia, tontura, fadiga, sonolência, sedação, depressão, retenção de líquidos, bradicardia, síndrome de Raynaud, cefaleia.',
    bibliography: [BIB.garrahan('cloNIDina cloridrato', ' (cód. 0490, ATC C02AC)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'caf-001', name: 'Citrato de cafeína', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Estimulante do centro respiratório. Profilaxia e tratamento da apneia do recém-nascido. Psicoestimulante.',
    indications: `${MAIN}\n\nEstimulante do centro respiratório. Profilaxia e tratamento da apneia do recém-nascido. Psicoestimulante.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Principalmente neonatal.', dose: 'Sem uso habitual em adultos.', administration: 'N/A.' },
      pediatrico: {
        presentation: 'Solução (preparado magistral): 5 mg de cafeína base/mL; Ampolas de 1 mL: 250 mg de cafeína base/mL',
        administration: 'V.O.; E.V.',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: '10 mg/mL.',
        infusionRate: '30 min com BIC.',
        dose: 'V.O./E.V.: Dose de ataque: 10 mg de cafeína base/kg em dose única; dose de manutenção: 2,5 mg de cafeína base/kg/dia em dose única.',
        notes: 'Ante falta de resposta, realizar dosagem; concentração sanguínea recomendada: 5–25 µg/mL; concentrações > 40–50 µg/mL são tóxicas. A formulação é cafeína base (preparado magistral e comercial). Ver guia para administração de drogas endovenosas.',
      },
      neonatal: { dose: 'Carga 10–20 mg/kg E.V. em 30 min; manutenção 5 mg/kg/dia.', administration: 'E.V./V.O.' },
    },
    stability: '## Guia pediátrica\n\n- 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nTaquicardia, agitação, vômitos.',
    bibliography: [BIB.garrahan('Cafeína', ' (cód. 0029, ATC N06BC)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'man-001', name: 'Manitol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Diurese osmótica, eliminação de toxinas, hipertensão intracraniana.',
    indications: `${MAIN}\n\nDiurese osmótica, eliminação de toxinas, hipertensão intracraniana.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Sachê ou bolsa 500 mL a 15%.', dose: '0,25–1 g/kg E.V. em 15–30 min; repetir conforme osmolaridade.', infusionRate: 'E.V. em 15–30 min.', administration: 'E.V. com filtro.' },
      pediatrico: {
        dose: '0,25–1 g/kg em 15–30 minutos.',
        administration: 'E.V.',
        presentation: 'Solução: 150 mg/mL',
        notes: 'O manitol potencializa o efeito ototóxico dos aminoglicosídeos, pode reduzir o efeito de anticoagulantes, aumenta o risco de toxicidade da digoxina (por produzir hipocalemia). Reduz a toxicidade renal do cisplatina. Não adicionar eletrólitos à solução de manitol porque pode precipitar.',
      },
      neonatal: { dose: '0,25–0,5 g/kg conforme protocolo neuro-UCIN.', administration: 'E.V. lenta.' },
    },
    stability: '## Estabilidade\n\n- Cristaliza no frio; aquecer e agitar antes de usar.',
    adverseEffects: '## Efeitos adversos\n\nCefaleia, confusão, sobrecarga circulatória, visão borrada, rinite, vômitos, náuseas, sede, retenção urinária. A extravasação pode provocar edema, inflamação e necrose cutânea.',
    bibliography: [BIB.garrahan('Manitol', ' (cód. 0387, ATC B05BC)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'sal-001', name: 'Salbutamol', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anti-inflamatório tópico, broncodilatador.',
    indications: `${MAIN}\n\nAnti-inflamatório tópico, broncodilatador.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Nebulização 5 mg/mL; inalador dosimetrado; ampola E.V.', dose: 'Neb: 2,5–5 mg a cada 20 min x 3. E.V.: 0,5 mcg/kg/min em infusão na crise grave.', administration: 'Nebulização ou E.V.' },
      pediatrico: {
        dose: 'Conforme indicação médica.',
        administration: 'Inalatória',
        presentation: 'Aerossol: cada dose Salbutamol 100 mcg + Dipropionato de beclometasona 50 mcg',
        notes: 'Não indicado no ataque agudo. Controlar o paciente mediante provas de função pulmonar. Risco de síndrome de Cushing, aspecto cushingoide, supressão suprarrenal, retardo do crescimento em crianças e adolescentes, diminuição da densidade mineral óssea, catarata, glaucoma e, mais raramente, efeitos psicológicos ou comportamentais (hiperatividade psicomotora, distúrbios do sono, ansiedade, depressão ou agressividade, especialmente em crianças). Controlar a altura de crianças em tratamento. Não suspender o tratamento bruscamente. Precaução em tirotoxicose, tuberculose pulmonar, insuficiência de miocárdio, aneurismas conhecidos ou doenças cardíacas subjacentes graves (isquemia miocárdica, taquiarritmias e cardiomiopatia hipertrófica obstrutiva), hipertensão, tolerância à glicose diminuída, diabetes manifesta, feocromocitoma e uso concomitante de glicosídeos cardíacos. Risco de infecções bucais (recomendar enxágue bucal após administração), hipocalemia potenciada com xantinas, corticoides ou diuréticos: monitorar nível sérico de K+.',
      },
      neonatal: { dose: 'Neb: 0,1–0,3 mg/kg; infusão E.V. na broncodisplasia conforme UCIN.', administration: 'Neb/E.V.' },
    },
    stability: '## Estabilidade\n\n- Nebulização: usar solução fresca.',
    adverseEffects: '## Efeitos adversos\n\nCandidíase bucal ou faríngea; tremor, cefaleia; taquicardia; rouquidão, irritação de boca e garganta.',
    bibliography: [BIB.garrahan('BECLOmetasona + salbutamol', ' (cód. 1022, ATC R03AK)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nit-001', name: 'Nitrofurantoína', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Profilaxia e tratamento de infecções do trato urinário por bactérias gram-negativas e gram-positivas sensíveis, inclusive Escherichia coli, Klebsiella, Enterobacteriaceae, Enterococos e Pseudomonas.',
    indications: `${MAIN}\n\nProfilaxia e tratamento de infecções do trato urinário por bactérias gram-negativas e gram-positivas sensíveis, inclusive Escherichia coli, Klebsiella, Enterobacteriaceae, Enterococos e Pseudomonas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Cápsulas 50 mg, 100 mg; suspensão.', dose: '100 mg V.O. a cada 12 h x 5–7 dias (cistite). Profilaxia: 50–100 mg V.O. à noite.', administration: 'V.O. com alimentos.' },
      pediatrico: {
        dose: 'Crianças: Tratamento: 5–7 mg/kg/dia a cada 6 h. Profilaxia: 2,5 mg/kg/dia uma vez ao dia. Dose máxima: 400 mg. Adultos: Profilaxia: 50–100 mg/dia, à noite; Tratamento: 50–100 mg a cada 6 h, por 7 dias.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 100 mg; Suspensão: 5 mg/mL',
        notes: 'Contraindicada em pacientes com função renal alterada. Precaução em pacientes com asma.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar protegido da luz.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, anorexia, cefaleia, tontura, nistagmo, mialgia, neuropatia periférica, rash, urticária, febre. Anemia hemolítica em pacientes com deficiência de glicose-6-fosfato desidrogenase (G6PD). Em tratamentos prolongados: fibrose pulmonar.',
    bibliography: [BIB.garrahan('NitroFURANTOÍNA', ' (cód. 0319, ATC J01XE)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'flu-001', name: 'Fluconazol', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Candidíase urinária. Micoses superficiais e infecções profundas no paciente não neutropênico.',
    indications: `${MAIN}\n\nCandidíase urinária. Micoses superficiais e infecções profundas no paciente não neutropênico.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachê contendo 200 mg (Fluconazol Norgreen, Rivero, Fluconovag, Braun).',
        reconstitution: 'Não requer reconstituição prévia. Conc: 2 mg/mL.',
        finalConcentration: '2 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Administrar o conteúdo do sachê em 60 min.',
        notes: 'Manter em temperatura ambiente e protegido da luz. Não retirar a proteção (bolsa plástica preta) até o momento de usar.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 100–200 mg; Suspensão: 10 mg/mL; F.A. de 100 mL: 2 mg/mL',
        administration: 'V.O.; E.V.',
        diluent: 'Já diluído.',
        finalConcentration: 'Não diluir.',
        infusionRate: '2 h com BIC.',
        dose: 'Crianças: V.O., E.V.: Candidíase esofágica e orofaríngea: 3–6 mg/kg/dia, dose máxima: 200 mg/dia; Candidíase sistêmica e meningite criptocócica: 6–12 mg/kg/dia, a cada 24 h, dose máxima 400 mg; Adultos: 200–800 mg/dia conforme gravidade da infecção.',
        compatibility: 'Não administrar concomitantemente com ampicilina, gluconato de cálcio, ceftazidima, cefotaxima, cefuroxima, ceftriaxona, clindamicina, furosemida, imipenem e piperacilina.',
        notes: 'Fluconazol pode aumentar os níveis séricos de: ciclosporina, fenitoína, tacrolimus, midazolam, zidovudina, varfarina, cisaprida. Rifampicina diminui a concentração sérica de fluconazol. Administração E.V.: dose ≥ 6 mg/kg infundir em pelo menos 2 h. Boa penetração no LCR. Eliminação: 60% renal; ajustar dose em insuficiência renal. Ver guia preliminar para prevenção de teratogênese por medicamentos.',
      },
      neonatal: { dose: 'Profilaxia/tratamento conforme protocolo UCIN (ex.: 6 mg/kg/dose a cada 72 h em prematuros).', administration: 'E.V. lenta.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- Não especificado.\n\n## Guia pediátrica\n\n- Descartar após aberto.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, dor abdominal, diarreia, alopecia reversível, nefrotoxicidade, hipocalemia, rash (monitorar), prurido, anorexia, hepatotoxicidade (raro), eosinofilia, leucopenia, trombocitopenia, neutropenia.',
    bibliography: [BIB.garrahan('Fluconazol', ' (cód. 0409, ATC J02AC)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'lin-001', name: 'Linezolida', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Em infecções por germes resistentes à vancomicina. Antibacteriano do grupo das oxazolidinonas.',
    indications: `${MAIN}\n\nEm infecções por germes resistentes à vancomicina. Antibacteriano do grupo das oxazolidinonas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Sachê contendo 600 mg de linezolida em 300 mL (Zyvox, Litrocan, Richet).',
        reconstitution: 'Não requer reconstituição prévia. Conc: 2 mg/mL.',
        diluent: '600 mg em 300 mL.',
        finalConcentration: '2 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Pronto para uso. Administrar em 30–120 min.',
        notes: 'Irritante. Pode provocar flebite e dor no local da injeção. Pode apresentar coloração levemente amarelada que pode intensificar com o tempo sem afetar sua potência.',
      },
      pediatrico: {
        presentation: 'Solução injetável E.V. 2 mg/mL: bolsas com solução para infusão contendo 600 mg/300 mL; Comprimidos revestidos: 600 mg',
        administration: 'E.V.; V.O.',
        diluent: 'SF 0,9%, SG 5%, Ringer.',
        finalConcentration: '2 mg/mL.',
        infusionRate: 'Entre 30 e 120 minutos com BIC.',
        dose: 'Neonatos pré-termo menores de 7 dias: 10 mg/kg/dose a cada 12 h; Recém-nascidos a 11 anos: 10 mg/kg/dose a cada 8 h; > 11 anos a 18 anos: 10 mg/kg/dose a cada 12 h, máximo 1200 mg/dia; Adultos: 600 mg/dose a cada 12 h, dose máxima: 1200 mg/dia. Tratamento da tuberculose: < 15 kg: 15 mg/kg/dia a cada 24 h; > 15 kg: 10–12 mg/kg/dia a cada 24 h, dose máxima: 600 mg.',
        compatibility: 'Incompatível com anfotericina B, diazepam, fenitoína, TMS (trimetoprima/sulfametoxazol) e ceftriaxona.',
        notes: 'Pacientes em diálise: administrar após o procedimento. Evitar consumir alimentos ou bebidas ricos em tiramina. Precaução quando administrado junto com agentes adrenérgicos ou serotoninérgicos. E.V.: administrar em 30 a 120 minutos. Ver guia de tratamento de tuberculose.',
      },
      neonatal: { dose: '10 mg/kg/dose a cada 8–12 h (UCIN).', administration: 'E.V.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- Não especificado.\n\n## Guia pediátrica\n\n- 4 h em temperatura ambiente após aberto. Manter no envase original.',
    adverseEffects: '## Efeitos adversos\n\nHipertensão, cefaleia, diarreia, náuseas, trombocitopenia.',
    bibliography: [BIB.garrahan('Linezolida*', ' (cód. 1518, ATC J01XX)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'mer-001', name: 'Meropenem', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Espectro semelhante ao imipenem.',
    indications: `${MAIN}\n\nEspectro semelhante ao imipenem.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó contendo 1 g (Meropenem Drawer, Fabra, FADA, Klonal, Larjan, Richet, Anfietoc).',
        reconstitution: '10 mL de AD. Conc: 50 mg/mL.',
        diluent: '500 mg em 100 mL de SF ou SG 5%.',
        finalConcentration: '5 mg/mL.',
        administration: 'E.V. direta: Sim. Agitar até dissolver em 10 mL AD, administrar em 5 min. E.V. intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e passar em 30–60 min.',
        notes: 'Em caso de restrição hídrica, pode diluir-se até em 50 mL de SF ou SG 5%.',
      },
      pediatrico: {
        presentation: 'F.A.: 500–1000 mg',
        reconstitution: 'Água destilada para reconstituição.',
        administration: 'E.V.; I.M.',
        diluent: 'SF 0,9%, SG 5% e 10%, manitol.',
        finalConcentration: '50 mg/mL.',
        infusionRate: '15 a 30 minutos com BIC.',
        dose: 'Sepse, infecções do SNC e fibrose cística: 120 mg/kg/dia, a cada 8 h, dose máxima: 6 g/dia. Infecção urinária, de pele e partes moles e outras infecções: 60 mg/kg/dia, a cada 8 h, dose máxima: 3 g/dia. Tuberculose pulmonar, intestinal: 60 mg/kg/dia a cada 8 h, máximo 1.000 mg/dose. Tuberculose meníngea: 120 mg/kg/dia a cada 8 h, máximo 2.000/dose. Ver guia de tratamento de tuberculose.',
        notes: 'Menor toxicidade a nível do SNC que imipenem. Administrar em push: 3 a 5 min.; em infusão intermitente: 15 a 30 min.',
      },
      neonatal: {
        presentation: 'Frasco-ampola 500 mg (UCIN).',
        dose: 'Dose e intervalo conforme idade pós-menstrual e peso (ex.: 20 mg/kg/dose a cada 12–24 h em prematuros; ajuste médico).',
        administration: 'E.V. preferencialmente por via central.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 1 h em temperatura ambiente, 8 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- Em SF: 8 h em temperatura ambiente, 48 h refrigerada. Em SG 5%: 3 h em temperatura ambiente, 14 h refrigerada.\n\n## Guia pediátrica\n\n- 2 h em temperatura ambiente. 12 h na geladeira.',
    adverseEffects: '## Efeitos adversos\n\nCefaleia, náuseas, dor abdominal, diarreia.',
    bibliography: [
      BIB.garrahan('MEROpenem', ' (cód. 1152, ATC J01DH)'),
      BIB.sadiUcip,
      BIB.pedGuide,
      { citation: 'Sanford Guide to Antimicrobial Therapy — Meropenem.', url: 'https://www.sanfordguide.com/' },
      { citation: 'ANMAT. Informações de medicamentos — Meropenem.', url: 'https://www.argentina.gob.ar/anmat' },
      { citation: 'Sociedade Argentina de Infectologia (SADI). Uso racional de antimicrobianos.', url: 'https://www.sadi.org.ar/' },
    ],
  },
  {
    id: 'imp-001', name: 'Imipenem + cilastatina', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções respiratórias baixas, urinárias, intra-abdominais, ginecológicas, ósseas e articulares, septicemia, endocardite, de pele e partes moles por bactérias multirresistentes gram-negativas.',
    indications: `${MAIN}\n\nTratamento de infecções respiratórias baixas, urinárias, intra-abdominais, ginecológicas, ósseas e articulares, septicemia, endocardite, de pele e partes moles por bactérias multirresistentes gram-negativas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 500 mg de imipenem + 500 mg de cilastatina (Imipenem Drawer, Dixabiox, Imistatin, Zienam, Pharmavial, Imipecil, Richet).',
        reconstitution: '10 mL de SF ou SG 5%. Conc: 50 mg/mL.',
        diluent: '500 mg em 100 mL de SF ou SG 5%.',
        finalConcentration: '5 mg/mL.',
        administration: 'E.V. intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e agitar. Administrar em 20–30 min. Doses > 500 mg devem ser infundidas em 40–60 min.',
        notes: '500 mg de imipenem + cilastatina contêm 37,5 mg de sódio (1,6 mEq). Se aparecerem náuseas e vômitos, diminuir velocidade de infusão. É possível a administração I.M.',
      },
      pediatrico: {
        presentation: 'F.A.: 500 mg',
        administration: 'E.V.; I.M.',
        diluent: 'SF 0,9%, SG 5% e 10%.',
        finalConcentration: '5 mg/mL.',
        infusionRate: '≤ 500 mg: 15 a 30 min. > 500 mg: 40 a 60 min.',
        dose: 'Crianças: 60–100 mg/kg/dia a cada 6–8 h, dose máxima: 4 g. Adultos: 500 mg a cada 6 h; Pseudomonas: 1000 mg a cada 6 h. Fibrose cística: 90 mg/kg/dia a cada 6 h, dose máxima: 4 g/dia.',
        compatibility: 'Não administrar concomitantemente com ganciclovir.',
        notes: 'Administrar em 30 a 60 minutos. Precaução em pacientes com lesão renal e comprometimento neurológico. Não se aconselha seu uso em recém-nascidos. Com ganciclovir aumenta risco de convulsões.',
      },
      neonatal: { dose: 'Dose conforme idade pós-menstrual (UCIN); uso especializado.', administration: 'E.V.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- Com SF: 4 h em temperatura ambiente e 48 h refrigerada. SG 5%: 4 h em temperatura ambiente e 24 h refrigerada.\n\n## Guia pediátrica\n\n- SF temperatura ambiente 10 h, 48 h na geladeira. SG 5% temperatura ambiente 4 h, 24 h na geladeira.',
    adverseEffects: '## Efeitos adversos\n\nFlebite, reações alérgicas, náuseas, vômitos, diarreia, colite pseudomembranosa, convulsões. Raro: leucopenia, hepatotoxicidade e nefrotoxicidade.',
    bibliography: [BIB.garrahan('IMIpenem + Cilastatina*', ' (cód. 0382, ATC J01DH)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'rif-001', name: 'Rifampicina', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico. Tuberculostático.',
    indications: `${MAIN}\n\nAntibiótico. Tuberculostático.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 600 mg (Rifampicina Kilab, Richet).',
        reconstitution: '10 mL de AD. Conc: 60 mg/mL.',
        diluent: '600 mg em 500 mL de SG 5%.',
        finalConcentration: '1,2 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Agitar suavemente até dissolução completa. Diluir em 100–500 mL de SG 5% e administrar em no máximo 3 h.',
        notes: 'Após 4 h da preparação da diluição, pode ocorrer precipitação do antibiótico. Utilizar preferencialmente SG 5% para a mesma, pois em SF a estabilidade se reduz.',
      },
      pediatrico: {
        presentation: 'Cápsulas: 300 mg; Comprimidos: 300 mg; Xarope: 20 mg/mL; F.A.: 600 mg',
        administration: 'E.V.; V.O.',
        diluent: 'Preferentemente SG 5%. Caso contrário SF.',
        finalConcentration: '6 mg/mL.',
        infusionRate: '30 min. a 3 horas com BIC.',
        dose: 'Menores de 1 mês: 10 mg/kg/dia. Maiores de 1 mês: 10–20 mg/kg/dia a cada 24 h, dose máxima: 600 mg/dia. Tratamento tuberculose: lactentes e crianças: 10–20 mg/kg/dia, dose máxima: 600 mg/dia. Profilaxia de H. influenzae: neonatos < 1 mês: 10 mg/kg/dia a cada 24 h por 4 dias; crianças: 20 mg/kg/dia a cada 24 h por 4 dias; Adultos: 600 mg a cada 24 h por 4 dias. Profilaxia meningococo: < 1 mês: 10 mg/kg/dia a cada 12 h por 2 dias; crianças: 20 mg/kg/dia a cada 12 h por 2 dias; Adultos: 600 mg a cada 12 h por 2 dias. Sinergismo: crianças: 10–20 mg/kg/dia, a cada 12–24 h, dose máxima: 600 mg/dia; adultos: E.V.; V.O.: 300 mg a cada 12 h. Ver tabela de doses de antiinfecciosos em internação hospitalar.',
        notes: 'Contraindicada em pacientes com hipersensibilidade. Precaução em pacientes com doenças hepáticas. Realizar hepatograma no início do tratamento; repetir somente se houver sintomas. Forte indutor do CYP450. Interações: digitálicos, fenitoína, diazepam, ciclosporina, trimetoprima/sulfametoxazol, cetoconazol, teofilina, anticoagulantes, inibidores de protease. A rifampicina interfere com anticoncepcionais orais, diminuindo a eficácia anticonceptiva. Recomenda-se o uso de outros métodos anticoncepcionais (de barreira — preservativo —, dispositivos intrauterinos). Pode conferir coloração alaranjada aos líquidos corporais. Lentes de contato gelatinosas podem manchar-se permanentemente. Ver guia de tratamento de tuberculose.',
      },
      neonatal: { dose: 'Esquemas de TB neonatal conforme protocolo nacional/UCIN.', administration: 'V.O.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente.\n\n## Solução diluída (a administrar)\n\n- 4 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente reconstituído e 4 horas diluído.',
    adverseEffects: '## Efeitos adversos\n\nDistúrbios gastrointestinais, icterícia, hepatite, reações febris tipo influenza, reações dermatológicas, neurotoxicidade. Hematológicos: neutropenia, leucopenia, trombocitopenia (pouco frequente).',
    bibliography: [BIB.garrahan('rifAMPicina', ' (cód. 1054, ATC J04AB)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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
console.log(`\npt-BR Garrahan lote 21 (parte B): ${drugs.length}`);
