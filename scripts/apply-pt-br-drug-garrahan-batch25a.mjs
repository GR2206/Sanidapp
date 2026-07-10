#!/usr/bin/env node
/** Garrahan re-tradução lote 25 — 10 monografias pt-BR (parte A) */
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
  ahaAfib: { citation: 'American Heart Association. Diretrizes de fibrilação atrial.', url: 'https://www.heart.org/' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
};

const drugs = [
  {
    id: 'dif-001', name: 'Difenidramina', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Antihistamínico. Coadjuvante antiemético. Sedante.',
    indications: `${MAIN}\n\nAntihistamínico. Coadjuvante antiemético. Sedante.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Cápsulas: 50 mg; Comprimidos: 50 mg; Xarope: 2,5 mg/ml; Ampolas ou F.A. por 10 ml: 10 mg/ml',
        administration: 'V.O.; E.V.; I.M.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5%.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '15 min. com BIC.',
        dose: 'Lactentes: 1 mg/kg/dia; Crianças: 3 - 5 mg/kg/dia a cada 6-8 h, dose máxima: 50 mg/dose; pré-medicação: 1 mg/kg/dose, dose máxima: 50 mg/dose; . Adultos: 50 mg/dose a cada 6 - 8 h, dose máxima: 50 mg/dose.',
        notes: '< 6 meses podem apresentar hiperexcitabilidade paradoxal. Não usar em neonatos. V.O.: administrar com alimentos. Contraindicado em crises asmáticas.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nAtividade anticolinérgica significativa, sedação. Tontura, zumbido, fadiga, diplopia, lassidão, incoordenação, hipotensão, náuseas, vômitos, retenção urinária. Sobredose: psicose, febre, alucinações, convulsões.',
    bibliography: [BIB.garrahan('difenidrAMINA', ' (cód. 0071, ATC R06AA)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'dip-001', name: 'Dipirona', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Analgésico, antipirético. Dor aguda devido a trauma ou cirurgia. Dor cólica. Dor por câncer ou outra dor aguda grave ou crônica em casos refratários a outros analgésicos. Hiperpirexia resistente a outras drogas.',
    indications: `${MAIN}\n\nAnalgésico, antipirético. Dor aguda devido a trauma ou cirurgia. Dor cólica. Dor por câncer ou outra dor aguda grave ou crônica em casos refratários a outros analgésicos. Hiperpirexia resistente a outras drogas.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampolas por 2 ml: 500 mg/ml; Comprimidos: 500 mg; Suspensão: 50 mg/ml',
        administration: 'V.O.; E.V.',
        diluent: 'Sol. Cl Na 0,9%, Dext. 5% e Dext. 10%.',
        finalConcentration: '100 mg/mL.',
        infusionRate: 'Bolus 1 min.',
        dose: '10 mg/kg/dose a cada 6 h. Adultos: 0,5 - 1 g/dose a cada 6 h.',
        notes: 'Por V.O. como droga de 3ª linha após paracetamol e ibuprofeno. Precauções: < 6 meses, associada com heparina há risco de sangramento, pacientes com hepatopatias. Contraindicações: porfiria, leucopenia, alergia a pirazolonas, síndrome hemorrágico.',
      },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante uma vez aberto.',
    adverseEffects: '## Efeitos adversos\n\nAgranulocitose, anemia aplástica, reações cutâneas graves, hipotensão, broncoespasmo, náuseas, vômitos, tontura, cefaleia, diaforese, anafilaxia.',
    bibliography: [BIB.garrahan('Dipirona', ' (cód. 0076, ATC N02BB)'), BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'eno-001', name: 'Enoxaparina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticoagulante. Profilaxia e tratamento da trombose venosa profunda e/ou tromboembolismo pulmonar e trombose arterial.',
    indications: `${MAIN}\n\nAnticoagulante. Profilaxia e tratamento da trombose venosa profunda e/ou tromboembolismo pulmonar e trombose arterial.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Seringa pré-carregada 40–100 mg.',
        dose: 'Profilaxia: 40 mg SC a cada 24 h. TEP: 1 mg/kg SC a cada 12 h.',
        administration: 'SC profunda; não friccionar a região.',
      },
      pediatrico: {
        dose: 'Conforme indicação do especialista. Dose profilática: < 2 meses: 0,75 mg/kg/dose a cada 12 h; > 2 meses: 0,5 mg/kg/dose a cada 12 h. Dose terapêutica: < 2 meses: 1,5 mg/kg/dose a cada 12 h; > 2 meses: 1 mg/kg/dose a cada 12 h',
        administration: 'S.C.',
        presentation: 'Seringa pré-preenchida: 20 mg - 40 mg - 60 mg - 80 mg - 100 mg',
        notes: 'Tem menor risco de sangramento que a heparina, meia-vida prolongada, menor controle laboratorial. Em caso de indicar a combinação com substâncias que afetam a hemostasia, realizar cuidadosos controles clínicos e de laboratório. Ver alerta.',
      },
      neonatal: {
        dose: '1,5 mg/kg SC a cada 12 h na UTI neonatal (protocolo).',
        administration: 'SC.',
      },
    },
    stability: '## Estabilidade\n\n- Seringas pré-carregadas prontas para uso.',
    adverseEffects: '## Efeitos adversos\n\nTrombocitopenia (raro), anemia hipocrômica, necrose cutânea no ponto de injeção, hemorragia, febre, diarreia, confusão, dispneia, edema.',
    bibliography: [BIB.garrahan('Enoxaparina Sódica*', ' (cód. 1184, ATC B01AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'enp-001', name: 'Enalapril', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Vasodilatador venoso e arterial. Inibidor da enzima conversora da angiotensina.',
    indications: `${MAIN}\n\nVasodilatador venoso e arterial. Inibidor da enzima conversora da angiotensina.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 5, 10 e 20 mg. Ampola 1,25 mg/mL (uso IV limitado).',
        dose: 'HA: 5–20 mg/dia V.O. em 1–2 tomadas. IC: iniciar 2,5 mg V.O. 1–2 vezes/dia e titular.',
        administration: 'V.O. com ou sem alimentos.',
      },
      pediatrico: {
        dose: 'V.O.: Crianças: inicial: 0,08 mg/kg/dia a cada 24 h, dose máxima: < 12 anos: 0,6 mg/kg/dia; > 12 anos: 40 mg/dia; adolescentes e adultos: 2,5-5 mg/dia, dose usual para hipertensão: 10-40 mg/dia. E.V. (enalaprilato): Crianças: 5-10 µg/kg/dose a cada 8-24 h; adolescentes e adultos: 0,625-1,25 mg/dose a cada 6 h.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 5 - 10mg; Solução V.O. (preparado magistral): 2 mg/ml (0,1 mg/gota) Ver formulação',
        notes: 'Com diuréticos poupadores de potássio pode produzir hipercalemia. Precaução em pacientes depletados de sódio. É dialisável. Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
    },
    stability: '## Estabilidade\n\n- Comprimidos: conservar conforme bula em temperatura ambiente.\n- Solução IV: usar imediatamente após preparação.',
    adverseEffects: '## Efeitos adversos\n\nReações cutâneas, distúrbios do paladar, vertigem, cefaleia, neutropenia, hipotensão ortostática, tosse. Teratogênico.',
    bibliography: [BIB.garrahan('Enalapril Maleato', ' (cód. 0082, ATC C09AA)'), BIB.ahaHtnHf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'eri-001', name: 'Eritromicina', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Macrolídeo. Infecções por bactérias sensíveis; profilaxia ocular neonatal; estimulação da motilidade gástrica em casos selecionados.',
    indications: '## Indicações\n\n- Infecções por bactérias sensíveis (respiratório, pele, otite).\n- Profilaxia de oftalmia neonatal (pomada ocular).\n- Estimulação da motilidade gástrica conforme protocolo.\n\n' + ADJUST,
    dilution: {
      adulto: {
        presentation: 'Comprimidos; frasco IV 1 g.',
        dose: '250–500 mg V.O. a cada 6 h ou 500 mg–1 g IV a cada 6 h.',
        administration: 'V.O. ou IV.',
      },
      pediatrico: {
        presentation: 'Comprimidos; suspensão; frasco IV 1 g.',
        administration: 'V.O.; IV.',
        dose: '30–50 mg/kg/dia dividido a cada 6 h.',
        notes: 'Ajustar em hepatopatia. Interações com cisaprida, terfenadina e outros substratos de CYP3A4.',
      },
      neonatal: {
        dose: 'Profilaxia ocular: pomada 0,5% conforme protocolo. IV/V.O. conforme indicação da UTI neonatal.',
        administration: 'Tópica ocular ou V.O./IV.',
      },
    },
    stability: '## Estabilidade\n\n- IV instável; usar logo após reconstituição.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, diarreia, prolongamento do QT, hepatotoxicidade, reações de hipersensibilidade.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'esp-001', name: 'Espironolactona', version: '1.0.2', updatedAt: '2026-07-10',
    executiveSummary: 'Diurético poupador de potássio, antagonista da aldosterona, para tratamento de edema e hipocalemia induzida por diuréticos.',
    indications: `${MAIN}\n\nDiurético poupador de potássio, antagonista da aldosterona, para tratamento de edema e hipocalemia induzida por diuréticos.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 25–100 mg.',
        dose: '25–50 mg V.O. a cada 24 h; ascite: 100–400 mg/dia em esquemas.',
        administration: 'V.O.',
      },
      pediatrico: {
        dose: 'Inicial: 1 mg/kg/dia a cada 12-24 h, dose máxima: 3,3 mg/kg/dia (até 100 mg/dia). Adultos: Edema, Hipocalemia: 25 mg - 200 mg a cada 12 - 24 h; Hipertensão: 25 mg - 50 mg/dia.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 25 - 100 mg; Suspensão (preparado magistral): 5 mg/ml',
        notes: 'Contraindicado em hipercalemia, hiponatremia, insuficiência renal grave, anúria. Com anti-inflamatórios não esteroides, ciclosporina, sais de potássio: alto risco de hipercalemia. Pode ocorrer potencialização dos efeitos das drogas anti-hipertensivas e de outros diuréticos.',
      },
      neonatal: {
        dose: '1–3 mg/kg/dia conforme protocolo diurético da UTI neonatal.',
        administration: 'V.O.',
      },
    },
    stability: '## Estabilidade\n\n- V.O. estável.',
    adverseEffects: '## Efeitos adversos\n\nHipercalemia, hiponatremia, cefaleia, anorexia, náuseas, diarreia, vômitos, ginecomastia em homens, distúrbios menstruais em mulheres.',
    bibliography: [BIB.garrahan('Espironolactona', ' (cód. 0085, ATC C03DA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'est-001', name: 'Estreptomicina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico. Antituberculoso.',
    indications: `${MAIN}\n\nAntibiótico. Antituberculoso.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 1 g (Estreptomicina Richet).',
        reconstitution: '4,5 mL de AD ou SF (100 mg/mL).',
        administration: 'I.M.: Sim. Reconst. 1 g com 4,5 mL de AD ou SF e aplicar I.M. profunda.',
      },
      pediatrico: {
        dose: 'Neonatos: reservado somente para pacientes que apresentam resistência a outros aminoglicosídeos. Crianças: 15 - 20 mg/kg/dia, dose máxima: 1 g/dia',
        administration: 'I.M.; E.V. (casos especiais)',
        presentation: 'F.A.: 1 g',
        notes: 'Ajustar dose em insuficiência renal. Para a administração E.V. (somente para pacientes que não toleram a injeção I.M. e com autorização de Infectologia) a dose se dilui em 100 ml de solução fisiológica e infundir em 30-60 minutos através de uma via periférica ou central. Ver guia de tratamento de tuberculose. Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- Não se aplica.',
    adverseEffects: '## Efeitos adversos\n\nOtotoxicidade, nefrotoxicidade, parestesia peribucal. Por injeção I.M. reações de hipersensibilidade.',
    bibliography: [BIB.garrahan('Estreptomicina', ' (cód. 0086, ATC J01GA)'), BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'fer-001', name: 'Ferro sacarose IV', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anemia hipocrômica microcítica.',
    indications: `${MAIN}\n\nAnemia hipocrômica microcítica.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco 100 mg ferro elementar.',
        dose: 'Dose total calculada por déficit; típico 200 mg IV em 15–30 min.',
        administration: 'IV lenta em diluição.',
      },
      pediatrico: {
        dose: 'Todas as doses estão expressas como ferro elementar. Requerimentos: 0 - 1 ano: 6 a 10 mg/dia, 1 - 10 anos: 10 mg; > 10 anos: 12 a 15 mg/dia. Tratamento da anemia: 3 mg/kg/dia. Profilática RN pré-termo: 2 mg/kg/dia.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 200 mg de sulfato ferroso (60 mg de ferro elementar); Gotas: 125 mg de sulfato ferroso/ml (1 conta-gotas = 0,6 ml = 15 mg de ferro elementar); Solução sem hidratos de carbono (preparado magistral): 125 mg de sulfato ferroso/ml',
        notes: 'Administrar separado do leite. A vitamina C aumenta a absorção. Antiácidos e vitamina E diminuem a absorção. Importante: indicar em ml ou conta-gotas já que se confunde o sal com o ferro elementar.',
      },
      neonatal: {
        dose: 'Uso limitado; esquemas hematologia neonatal.',
        administration: 'IV.',
      },
    },
    stability: '## Estabilidade\n\n- Usar diluição preparada imediatamente.',
    adverseEffects: '## Efeitos adversos\n\nNáuseas, vômitos, anorexia, constipação, diarreia, dor epigástrica.',
    bibliography: [BIB.garrahan('Ferro (como Sulfato Ferroso)', ' (cód. 0093, ATC B03AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'flc-001', name: 'Flecainida', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Arritmias ventriculares refratárias a outros agentes. Taquicardia paroxística supraventricular.',
    indications: `${MAIN}\n\nArritmias ventriculares refratárias a outros agentes. Taquicardia paroxística supraventricular.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 100 mg.',
        dose: '100 mg V.O. a cada 12 h; titular a 150 mg a cada 12 h conforme resposta.',
        administration: 'V.O.',
      },
      pediatrico: {
        dose: 'Crianças: 1-5 mg/kg/dia a cada 8 h. Adultos: 100 mg a cada 12 h, aumentando a dosagem a cada 4 dias, conforme necessidade e tolerância. Dose máxima: 400 mg/dia.',
        administration: 'V.O.',
        presentation: 'Comprimidos: 100 mg',
        notes: 'Precaução em pacientes com insuficiência hepática e/ou renal. Os produtos lácteos podem interferir com a absorção em lactentes. Quando se utiliza com amiodarona, reduzir a dose de flecainida em 50 %. Quando se administra conjuntamente com propranolol, os níveis de ambas as drogas aumentam. A flecainida pode aumentar a concentração plasmática de digoxina.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\nVisão turva, náuseas, cefaleia, vômitos, tremor, parestesia, taquiarritmias ventriculares, aumento de transaminases.',
    bibliography: [BIB.garrahan('Flecainida*', ' (cód. 0368, ATC C01BC)'), BIB.ahaAfib, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'fny-001', name: 'Fenitoína', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Anticonvulsivante.',
    indications: `${MAIN}\n\nAnticonvulsivante.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 50 mg/mL.',
        dose: 'Carga 15–20 mg/kg IV (máx. 1500 mg) a ≤ 50 mg/min.',
        infusionRate: 'Não exceder 50 mg/min.',
        administration: 'IV em SF 0,9% (não SG 5%).',
      },
      pediatrico: {
        presentation: 'Difenilhidantoína sódica: Cápsulas: 100 mg; Suspensão: 25 mg/ml; Ampolas de 2 ml: 50 mg/ml; Difenilhidantoína cálcica: Comprimidos: 100 mg',
        administration: 'V.O.; E.V.',
        diluent: 'Sol. Cl Na 0,9% ou Ringer. NÃO Dextrosa.',
        finalConcentration: '1 a 10 mg/mL.',
        infusionRate: '50 mg/min com BIC.',
        dose: 'Dose de carga E.V.: 15-20 mg/kg, dose máxima: 1500 mg. Manutenção E.V. - V.O.: 5-8 mg/kg/dia a cada 12 h. Adultos: 300 mg/dia a cada 8-12 h',
        notes: 'Controle de hemograma, Ca, P, fosfatase alcalina a cada 6 meses. Por V.O. administrar afastado de laticínios. E.V. push: velocidade de infusão neonatos: 0,5 mg/kg/minuto; crianças e adultos: 1-3 mg/kg/minuto (máximo: 50 mg/min). Infusão intermitente (não é recomendada): diluir em solução fisiológica a uma concentração < de 6 mg/ml. Separar 2 h sua administração dos antiácidos e da nutrição enteral. Numerosas interações com drogas (estímulo ou inibição do metabolismo). A isoniazida aumenta o risco de toxicidade de fenitoína: ataxia, hiperreflexia, nistagmo, tremor. Ajustar dose de fenitoína com nível sérico. Ver guia preliminar para a prevenção de teratogênese causada por medicamentos.',
      },
      neonatal: {
        dose: '15–20 mg/kg carga; manutenção conforme níveis na UTI neonatal.',
        administration: 'IV muito lenta.',
      },
    },
    stability: '## Geral\n\n- Precipita com SG 5%; usar NaCl 0,9%.\n\n## Guia pediátrica\n\n- Administrar dentro das 4 h posteriores à diluição.',
    adverseEffects: '## Efeitos adversos\n\nHipertricose, hiperplasia gengival, ataxia, nistagmo, náuseas, vômitos, alterações hematológicas, alteração do metabolismo do cálcio. Em administração rápida: arritmias.',
    bibliography: [BIB.garrahan('DifenilhiDANTOÍNA sódica (Fenitoína)', ' (cód. 0072, ATC N03AB)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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
console.log(`\npt-BR Garrahan lote 25 (parte A): ${drugs.length}`);
