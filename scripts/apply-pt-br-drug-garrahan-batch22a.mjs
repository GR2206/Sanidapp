#!/usr/bin/env node
/** Garrahan re-tradução lote 22 — 10 monografias pt-BR (parte A) */
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
    id: 'atr-001', name: 'Atropina', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Bradicardia. Para reduzir secreções de via aérea superior e salivação. Oftalmologia: midriático e cicloplégico.',
    indications: `${MAIN}\n\nBradicardia. Para reduzir secreções de via aérea superior e salivação. Oftalmologia: midriático e cicloplégico.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 1 mg/mL.',
        dose: 'Bradicardia: 1 mg E.V. a cada 3–5 min (máx. 3 mg).',
        administration: 'E.V. em bolus rápido.',
      },
      pediatrico: {
        presentation: 'Ampolas: 1 mg/mL (1000 µg/mL); Gotas: 1%',
        administration: 'E.V.; I.M.; S.C.; Intratraqueal',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: '0,1 mg/mL.',
        infusionRate: 'PARADA CARDÍACA sem diluir (push).',
        dose: '20 µg/kg/dose (dose mínima: 100 µg); pode repetir em intervalos de 5 minutos até dose máxima total: crianças: 1 mg; adolescentes: 2 mg. Toxicologia: E.V. 20 µg/kg.',
        notes: 'Não administrar I.M. em neonatos. Administrar sem diluir por via E.V. Contraindicado em obstrução do trato urinário e glaucoma. Para administração intratraqueal, diluir com solução fisiológica em volume total de 1–2 mL.',
      },
      neonatal: {
        dose: '0,02 mg/kg E.V. (protocolo NRP/PALS neonatal).',
        administration: 'E.V./I.O.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\nMidríase, boca seca, cicloplegia, fotofobia, bradicardia seguida de taquicardia, palpitações, arritmias, retenção urinária, confusão, alucinações.',
    bibliography: [BIB.garrahan('ATROPina Sulfato', ' (cód. 0023, ATC A03BA)'), BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'atr-002', name: 'Atracúrio', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Relaxante muscular de ação periférica (bloqueador neuromuscular). Indicado em insuficiência hepática e renal grave.',
    indications: `${MAIN}\n\nRelaxante muscular de ação periférica (bloqueador neuromuscular). Indicado em insuficiência hepática e renal grave.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 10 mg/mL.',
        dose: '0,4–0,5 mg/kg em bolus; 5–10 mcg/kg/min.',
        administration: 'E.V.',
      },
      pediatrico: {
        presentation: 'Ampolas de 5 mL: 10 mg/mL',
        administration: 'E.V.',
        dose: '0,5 mg/kg. Infusão contínua: 0,3 mg/kg/hora.',
        notes: 'Uso exclusivo do especialista.',
      },
      neonatal: {
        dose: '0,5 mg/kg em bolus conforme protocolo.',
        administration: 'E.V.',
      },
    },
    stability: '## Estabilidade\n\n- Usar em 24 h.',
    adverseEffects: '## Efeitos adversos\n\nLiberador de histamina.',
    bibliography: [BIB.garrahan('Atracurium Besilato*', ' (cód. 0022, ATC M03AC)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'dex-001', name: 'Dexmedetomidina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Sedação de curta duração (24 h) em pacientes intubados ou não.',
    indications: `${MAIN}\n\nSedação de curta duração (24 h) em pacientes intubados ou não.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 100 mcg/mL.',
        dose: 'Carga 1 mcg/kg em 10 min (opcional), depois 0,2–1,5 mcg/kg/h.',
        administration: 'E.V. em bomba.',
      },
      pediatrico: {
        presentation: 'F.A. de 2 mL: 100 µg/mL',
        administration: 'E.V.',
        dose: '> 18 anos: Infusão contínua: 0,2 a 2,5 µg/kg/h por 24 h. Deve-se considerar a diminuição da dose em insuficiência hepática.',
        notes: 'Ver guia para administração de drogas endovenosas. Ver Guia prática para manejo de analgosedação e seu desmame em salas de cuidados intermediários e moderados.',
      },
    },
    stability: '## Estabilidade\n\n- Diluição 24 h; não usar ampolas com partículas.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, bradicardia, apneia, depressão respiratória, broncoespasmo, náuseas, vômitos, xerostomia, arritmia cardíaca.',
    bibliography: [BIB.garrahan('dexMEDETOmidina*', ' (cód. 1762, ATC N05CM)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'mor-001', name: 'Morfina', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Dor aguda e crônica, moderada ou grave. Tratamento sintomático de dispneia. Crise de dispneia e cianose. Opioide forte.',
    indications: `${MAIN}\n\nDor aguda e crônica, moderada ou grave. Tratamento sintomático de dispneia. Crise de dispneia e cianose. Opioide forte.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 10 mg/mL.',
        dose: '2–5 mg E.V. a cada 5–15 min PRN; PCA ou infusão conforme prescrição.',
        administration: 'E.V. lenta.',
      },
      pediatrico: {
        presentation: 'Ampolas: 10 mg/mL; Xarope (preparado magistral): 0,1% (1 mg/mL), 0,3% (3 mg/mL), 1% (10 mg/mL). Ver formulação.',
        administration: 'V.O.; E.V.',
        diluent: 'SF 0,9%, SG 5%, Ringer.',
        finalConcentration: '5 mg/mL.',
        infusionRate: 'Em bolus 5 min. 15 a 30 min. com BIC.',
        dose: 'V.O.: Dose inicial 0,1 mg/kg a cada 4 h; E.V.; S.C.; I.M.: < 50 kg: 0,05 mg/kg a cada 4 h; Infusão contínua: 0,05 mg/kg/hora; > 50 kg: Dose inicial V.O.: 10 mg a cada 4 h (sem dose máxima); E.V.: 5 mg a cada 4 h; Infusão contínua: 2 mg/hora. Aumentar a dose 50% a cada vez até alcançar dose efetiva.',
        notes: 'Recomenda-se associar um AINE. Lembrar que a dor neuropática responde parcialmente aos opioides (associar adjuvantes). Equivalência analgésica: 1 mg de morfina E.V. = 2 mg de morfina V.O.; 1 mg de morfina E.V. = 10 µg de fentanilo. Ver Guia prática para manejo de analgosedação e seu desmame em salas de cuidados intermediários e moderados. Para a apresentação de 1% (10 mg/mL), a receita deve vir refrendada no verso.',
      },
      neonatal: {
        dose: '0,01–0,05 mg/kg/dose conforme escala de dor da UTI neonatal.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Geral\n\n- Usar diluição no turno.\n\n## Guia pediátrica\n\n- Não especificado na guia.',
    adverseEffects: '## Efeitos adversos\n\nVer seção de analgésicos opioides.',
    bibliography: [BIB.garrahan('Morfina Cloridrato', ' (cód. 0144, ATC N02AA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'flm-001', name: 'Flumazenil', version: '1.1.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antagonista das benzodiazepinas.',
    indications: `${MAIN}\n\nAntagonista das benzodiazepinas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 0,1 mg/mL.',
        dose: '0,2 mg E.V. em 15 s; repetir 0,2 mg a cada 1 min até 1 mg (protocolo).',
        administration: 'E.V. lenta.',
      },
      pediatrico: {
        presentation: 'Ampolas de 5 mL: 0,1 mg/mL',
        administration: 'E.V.',
        diluent: 'AD, SF 0,9%, SG 5%, Ringer.',
        finalConcentration: '0,05 mg/mL.',
        infusionRate: 'Push de 15 a 30 s.',
        dose: 'Crianças: 0,01 mg/kg (máximo 0,2 mg) a cada 1 minuto, até 5 doses. Infusão contínua: 5–10 µg/kg/hora. Adultos: 0,2 mg em não menos de 15 segundos. Se não se obtiver a resposta desejada em 1 min., pode injetar-se uma 2ª dose de 0,1 mg e, se necessário, repetir 0,1 mg a cada 60 segundos até dose total de 1 mg.',
        notes: 'Só deve ser utilizado por anestesistas ou terapeutas. Pode ser usado como teste diagnóstico quando se suspeita coma por benzodiazepina. Não usar em intoxicações por benzodiazepinas e antidepressivos ou quando há antecedentes convulsivos.',
      },
      neonatal: {
        dose: 'Uso muito restrito; 0,01 mg/kg conforme protocolo da UTI neonatal.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Geral\n\n- Usar imediatamente após aberto.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente. Depois descartar.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, ansiedade, palpitações. Em pacientes tratados com benzodiazepinas pode provocar síndrome de abstinência, controlada com diazepam.',
    bibliography: [BIB.garrahan('Flumazenil', ' (cód. 0520, ATC V03AB)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'hef-001', name: 'Heparina sódica', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticoagulante.',
    indications: `${MAIN}\n\nAnticoagulante.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco 5000 UI/mL.',
        dose: 'Bolus 60–80 UI/kg em SCA; perfusão 12–15 UI/kg/h titulada ao TTPa.',
        administration: 'E.V. em bomba.',
      },
      pediatrico: {
        presentation: 'F.A.: 5000 U.I./mL',
        administration: 'E.V.',
        dose: 'Dose de ataque: 75–100 U/kg em bolus (10 minutos). Dose inicial: < 1 ano: 28 U/kg/hora; > 1 ano: 20 U/kg/hora; adolescentes: 18 U/kg/hora. Ajustar de acordo com nomogramas.',
        notes: 'Contraindicada em: insuficiência hepática e renal grave, endocardite lenta, gastrite hemorrágica, úlcera gastroduodenal. Drogas que afetam a função plaquetária (aspirina, anti-inflamatórios não esteroides, dipiridamol) podem potencializar o risco de hemorragias; digoxina, anti-histamínicos e nitroglicerina podem diminuir o efeito anticoagulante da heparina.',
      },
      neonatal: {
        dose: '28 UI/kg/h infusão habitual na UTI neonatal (protocolo).',
        administration: 'E.V. em bomba.',
      },
    },
    stability: '## Estabilidade\n\n- Perfusão preparada conforme guia; não agitar.',
    adverseEffects: '## Efeitos adversos\n\nHemorragias, trombocitopenia.',
    bibliography: [BIB.garrahan('Heparina Sódica', ' (cód. 0111, ATC B01AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'col-001', name: 'Colistina', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Organismos multirresistentes, fibrose cística.',
    indications: `${MAIN}\n\nOrganismos multirresistentes, fibrose cística.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. contendo 100 mg de colistina em base ativa (Permalec*, Fabra*, Colistina Richet*, Techsphere*, Alfacolin*, Alficetin, Nolisin, Cotrelan*, Colislym, Espirotech*).',
        reconstitution: '2 mL de AD. Conc.: 50 mg/mL.',
        diluent: '100 mg em 50–100 mL de SF ou SG 5%.',
        finalConcentration: '2 mg/mL.',
        administration: 'E.V. direta: Sim. Reconst. em 3–5 mL de AD e passar em 3–5 min. E.V. intermitente: Sim. Diluir em 50 mL de SF ou SG 5% e infundir em 10–15 min.',
        notes: '100 mg de colistina base equivalem aproximadamente a 240 mg de colistina metanosulfonato e a 3.000.000 UI de potência. É possível a administração I.M. ou inalatória.',
      },
      pediatrico: {
        presentation: 'F.A.: 100 mg de colistina base (3.000.000 U.I.)',
        administration: 'E.V.; Intratecal; Inalatória',
        diluent: 'SF 0,9%, SG 5%, AD, Ringer.',
        finalConcentration: 'Conforme necessidades hídricas do paciente.',
        infusionRate: 'Bolus de 3 a 5 min.',
        dose: 'E.V.: 2,5 colistina base/kg/dose a cada 12 h. Infecções graves, pacientes críticos e fibrose cística: 7 mg de colistina base/kg/dia a cada 8 h. Dose máxima: 100 mg/dose. Adultos dose de carga: 5 mg de colistina base/kg/dose (dose máxima 300 mg); depois de 12 h pós-carga: 100 mg/dose a cada 8 h. Equivalência: 1 mg de colistimetato sódico = 12.500 U de colistimetato sódico = 0,4 mg de colistina base.',
        compatibility: 'Precipita concomitantemente com eritromicina, cefalotina, tetraciclina.',
        notes: 'Aumenta o risco de ototoxicidade e nefrotoxicidade com aminoglicosídeos, ciclosporina, anfotericina e cisplatina.',
      },
      neonatal: {
        dose: 'Dose conforme protocolo da UTI neonatal e peso; monitorização renal rigorosa.',
        administration: 'E.V.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente, 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- Usar imediatamente após diluído (24 h em temperatura ambiente).\n\n## Guia pediátrica\n\n- 8 h em temperatura ambiente, 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nFraqueza muscular, parestesia facial, distúrbios visuais, nefrotóxico. Pode produzir broncoespasmo quando nebulizado (tratar com β-agonistas).',
    bibliography: [BIB.garrahan('Colistina Metansulfonato (Colistimetato sódico)', ' (cód. 1202, ATC J01XB)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'mag-001', name: 'Sulfato de magnésio', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento do déficit de magnésio. Hipocalcemia. Coadjuvante em asma aguda grave.',
    indications: `${MAIN}\n\nTratamento do déficit de magnésio. Hipocalcemia. Coadjuvante em asma aguda grave.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 10% (1 g = 10 mL).',
        dose: 'Torsades: 1–2 g E.V. em 15 min. Eclâmpsia: 4–6 g de carga conforme protocolo.',
        administration: 'E.V. lenta.',
      },
      pediatrico: {
        presentation: 'Ampolas 25%: 250 mg de sulfato de magnésio/mL = 2 mEq de magnésio/mL; Solução a 25% (preparado magistral): 250 mg de sulfato de magnésio/mL = 2 mEq de magnésio/mL. 1 mEq Mg = 12 mg de Mg.',
        administration: 'V.O.; E.V.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '200 mg/mL.',
        infusionRate: '15 a 20 min em emergência médica; caso contrário 2 a 4 horas.',
        dose: 'Dose expressa como magnésio elementar. Requerimento diário 0–6 meses: 50 mg; 6 meses–1 ano: 70 mg; 1–3 anos: 150 mg; 4–6 anos: 200 mg; > 6 anos: 250 mg. Hipomagnesemia sintomática E.V.–I.M.: 0,8–1,6 mEq/kg/dose a cada 4–6 h, dose máxima: 16 mEq/dose. Hipomagnesemia assintomática E.V.: 0,2–0,5 mEq/kg/dia, dose máxima: 8–16 mEq/dia; V.O.: 0,8–1,6 mEq/kg/dose a cada 6 h. Déficit na absorção intestinal V.O.: 20–60 mEq/dia; adultos 60–100 mEq/dia. Coadjuvante de asma aguda grave: 25–50 mg de sulfato de magnésio/kg/dose, dose máxima: 2000 mg de sulfato de magnésio/dose. Ver Boletim CIME Eletrólitos.',
        notes: 'Administração E.V.: Incompatível com cálcio, bicarbonato e fosfato.',
      },
      neonatal: {
        dose: '25–50 mg/kg E.V. lenta conforme protocolo da UTI neonatal.',
        administration: 'E.V. em 20 min.',
      },
    },
    stability: '## Geral\n\n- Compatível em NaCl 0,9% e SG 5%.\n\n## Guia pediátrica\n\n- Descartar após aberto.',
    adverseEffects: '## Efeitos adversos\n\nHiporreflexia, paralisia flácida, hipotensão, bloqueio cardíaco, depressão do S.N.C.',
    bibliography: [BIB.garrahan('magnesio SULFATO', ' (cód. 0133, ATC A12CC)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'cef-001', name: 'Cefalexina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Cefalexina de 1ª geração. Infecções por bactérias sensíveis de vias urinárias, pele, partes moles e osso.',
    indications: `${MAIN}\n\nCefalexina de 1ª geração. Infecções por bactérias sensíveis de vias urinárias, pele, partes moles e osso.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Cápsulas 500 mg; suspensão.',
        dose: '250–500 mg V.O. a cada 6 h.',
        administration: 'V.O.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 500 mg; Xarope: 100 mg/mL',
        administration: 'V.O.',
        dose: 'Crianças: 25–50 mg/kg/dia a cada 6 h; infecções graves: 50–100 mg/kg/dia a cada 6 h, dose máxima: 3 g/dia. Adultos: 250–1000 mg a cada 6 h, dose máxima: 4 g/dia. Profilaxia de infecção urinária em neonatos até 2 meses: 30 mg/kg/dia a cada 24 h, à noite. Profilaxia de endocardite bacteriana: 2 g, 1 hora antes do procedimento.',
        notes: 'Administrar com estômago vazio. Não deve ser utilizada para profilaxia de infecção urinária em crianças maiores de 2 meses, para evitar a emergência de cepas resistentes.',
      },
      neonatal: {
        dose: '25 mg/kg/dose V.O. a cada 12 h conforme protocolo.',
        administration: 'V.O.',
      },
    },
    stability: '## Estabilidade\n\n- Suspensão refrigerada conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, diarreia leve, reações alérgicas, prurido, cefaleia, neutropenia, sobreinfecções micóticas. Nefrotoxicidade (2%).',
    bibliography: [BIB.garrahan('CefaLEXINA', ' (cód. 0034, ATC Jo1DB)'), BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'cef-003', name: 'Cefuroxima', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Cefalosporina de segunda geração. Tratamento de infecções do trato respiratório alto e baixo, otite média, trato urinário, pele e tecidos moles, osso e articulações por bactérias gram-positivas e *Haemophilus influenzae*, *Escherichia coli* e *Klebsiella*.',
    indications: `${MAIN}\n\nCefalosporina de segunda geração. Tratamento de infecções do trato respiratório alto e baixo, otite média, trato urinário, pele e tecidos moles, osso e articulações por bactérias gram-positivas e *Haemophilus influenzae*, *Escherichia coli* e *Klebsiella*.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco 750 mg, 1,5 g E.V.; comprimidos 250–500 mg V.O.',
        dose: 'E.V.: 750 mg–1,5 g a cada 8 h. V.O.: 250–500 mg a cada 12 h.',
        administration: 'E.V. ou V.O.',
      },
      pediatrico: {
        presentation: 'F.A.: 750–1500 mg',
        administration: 'E.V.',
        diluent: 'AD, SF 0,9%, SG 5%.',
        finalConcentration: '250 mg/mL.',
        infusionRate: 'De 3 a 5 min.',
        dose: '3 a 12 anos: 75–150 mg/kg/dia a cada 8 h, dose máxima: 6 g/dia; meningite: 240 mg/kg/dia, dose máxima: 9 g/dia; > 13 anos e adultos: 750–1500 mg/dose a cada 8 h, dose máxima: 6 g/dia. Dose pré-cirúrgica em adultos: 1,5 g.',
        notes: 'Não se aconselha em meningite por *Haemophilus influenzae*. Ajustar dose em insuficiência renal.',
      },
      neonatal: {
        dose: 'Dose conforme protocolo da UTI neonatal.',
        administration: 'E.V.',
      },
    },
    stability: '## Geral\n\n- E.V. diluída: 24 h refrigerada.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente e 48 h refrigerado entre 4 °C e 8 °C.',
    adverseEffects: '## Efeitos adversos\n\nNeutropenia, anemia hemolítica, cefaleia, colite pseudomembranosa, flebite no local da injeção, rash, prurido anal.',
    bibliography: [BIB.garrahan('cefUROxima', ' (cód. 0041, ATC J01DC)'), BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
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
console.log(`\npt-BR Garrahan lote 22 (parte A): ${drugs.length}`);
