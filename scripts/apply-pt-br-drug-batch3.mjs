#!/usr/bin/env node
/** Lote 3/19 — 10 monografías pt-BR desde español revisado (valores numéricos idénticos al ES) */
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
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
  heartHtn: { citation: 'American Heart Association. Hypertension and arrhythmia guidelines.', url: 'https://www.heart.org/' },
  heartHf: { citation: 'American Heart Association. Hypertension and heart failure guidelines.', url: 'https://www.heart.org/' },
};

const drugs = [
  {
    id: 'prp-001', name: 'Propranolol', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'Betabloqueador não seletivo para HAS, angina, arritmias, profilaxia de enxaqueca e hipertireoidismo.',
    indications: `## Indicações\n\n- Hipertensão arterial e angina.\n- Arritmias supraventriculares e ventriculares (conforme protocolo).\n- Profilaxia de enxaqueca e tremor essencial.\n- Sintomas de hipertireoidismo e feocromocitoma (com bloqueio alfa prévio).\n\n## Precauções\n\n- Contraindicado em asma brônquica, bloqueio AV avançado e choque cardiogênico.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 40 e 80 mg. Ampola 1 mg/mL.', dose: 'HAS/angina: 40–160 mg/dia VO fracionado. IV: 1–3 mg lento, repetir conforme protocolo.', administration: 'VO ou IV lenta.' },
      pediatrico: { dose: '0,5–1 mg/kg/dia VO em 3–4 doses. IV: 0,01–0,1 mg/kg lento.', administration: 'VO ou IV lenta com monitor.' },
      neonatal: { dose: '0,01–0,2 mg/kg/dose IV conforme protocolo cardiológico neonatal.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- VO conforme bula. IV utilizar imediatamente.',
    adverseEffects: '## Efeitos adversos\n\n- Bradicardia, hipotensão, broncoespasmo, fadiga, depressão, hipoglicemia mascarada.',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'sul-001', name: 'Sulbactam', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Inibidor de betalactamases como monoterapia em infecções por *Acinetobacter baumannii* conforme cartilha institucional.',
    indications: `## Indicações principais\n\n- Monoterapia em infecções por *Acinetobacter baumannii* (atividade intrínseca sobre OXA-23 e similares).\n- Pode ser combinado com colistina ou meropenem conforme sensibilidade.\n\n## Precauções\n\n- Não confundir com ampicilina-sulbactam.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1 g de sulbactam sódico (Sulbactam Richet, Northia, outros).',
        reconstitution: '10 mL de água para injeção ou SF. Conc.: 100 mg/mL.',
        diluent: '1 g em 100 mL de SF ou SG 5%.',
        finalConcentration: '10 mg/mL.',
        administration: 'IV direta: Sim. Reconstituir em 10 mL de água para injeção e administrar lentamente em 3–5 min. IV intermitente: Sim. Diluir em 50–100 mL de SF ou SG 5% e administrar em 15–30 min.',
        notes: 'Dose habitual: 3–4 g/dia em 3–4 doses ou infusão prolongada (1 g a cada 6 h em 3 h). Pode ser combinado com colistina ou meropenem conforme sensibilidade. Não confundir com ampicilina-sulbactam.',
      },
      pediatrico: { dose: 'Esquemas conforme protocolo de infectologia pediátrica.', administration: 'IV conforme indicação.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 8 h em temperatura ambiente; 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 8 h em temperatura ambiente; 48 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Diarreia, rash, flebite.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'vor-001', name: 'Voriconazol', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Triazol de primeira linha na aspergilose invasiva; VO/IV com monitorização de níveis e função hepática.',
    indications: `## Indicações principais\n\n- Aspergilose invasiva e pulmonar.\n- Infecções fúngicas por fungos filamentosos sensíveis.\n\n## Precauções\n\n- Hepatotoxicidade, prolongamento do QT, fotossensibilidade. Monitorar níveis séricos quando disponível. Múltiplas interações (CYP2C19).\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 200 mg (VFend, Richet, Sandoz).',
        reconstitution: '19 mL de água para injeção. Conc.: 10 mg/mL.',
        diluent: '200 mg em 100 mL de SF ou SG 5%.',
        finalConcentration: '2 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e administrar durante 60–120 min.',
      },
      pediatrico: { dose: '9–10 mg/kg/dose IV a cada 12 h ou VO conforme protocolo pediátrico.', administration: 'IV/VO com monitorização de níveis.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\n- Alterações visuais transitórias, hepatotoxicidade, rash fotossensível, prolongamento do QT.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.idsa, BIB.anmat],
  },
  {
    id: 'vls-001', name: 'Valsartana', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'BRA para HAS, IC pós-infarto e intolerância a IECA.',
    indications: `## Indicações\n\n- Hipertensão arterial.\n- Insuficiência cardíaca em pacientes intolerantes a IECA (pós-IAM).\n- Pós-infarto com disfunção ventricular esquerda.\n\n## Precauções\n\n- Contraindicado na gestação. Não iniciar concomitantemente com IECA.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 80 e 160 mg.', dose: 'HAS: 80–320 mg/dia VO. IC pós-IAM: 40 mg a cada 12 h, titular até 160 mg a cada 12 h.', administration: 'VO com ou sem alimentos.' },
      pediatrico: { dose: '1,3 mg/kg/dia VO (máx. 160 mg/dia) em 1–2 doses.', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, hipercalemia, tontura, elevação de creatinina.',
    bibliography: [BIB.heartHf, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'sug-001', name: 'Sugamadex', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Agente de reversão específico de rocurônio e vecurônio; não reverte succinilcolina.',
    indications: `## Indicações\n\n- Reversão de bloqueio neuromuscular por rocurônio/vecurônio.\n- Reversão profunda em emergência de via aérea.\n\n## Precauções\n\n- Reduz eficácia de anticoncepcionais hormonais. Reações de hipersensibilidade.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 100–200 mg/mL.', dose: '2 mg/kg moderado; 4 mg/kg profundo; 16 mg/kg SRI imediato.', administration: 'IV em bolus.' },
      pediatrico: { dose: '2–4 mg/kg conforme profundidade do bloqueio.', administration: 'IV.' },
      neonatal: { dose: 'Dados limitados; utilizar sob anestesiologia pediátrica.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar imediatamente após extração.',
    adverseEffects: '## Efeitos adversos\n\n- Tosse, sabor metálico, bradicardia, anafilaxia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ran-001', name: 'Ranitidina', version: '1.0', updatedAt: '2026-06-30',
    executiveSummary: 'Antagonista H2 antiulceroso IV/VO; uso na profilaxia de úlcera de estresse e refluxo conforme protocolo institucional.',
    indications: `## Indicações\n\n- Profilaxia de úlcera de estresse em UTI.\n- Refluxo gastroesofágico e gastrite erosiva.\n\n## Precauções\n\n- Administração IV rápida pode causar bradicardia. Ajustar na insuficiência renal.\n\n${ADJUST}`,
    dilution: {
      pediatrico: {
        presentation: 'Ampola 50 mg/5 mL.',
        administration: 'IV ou IM.',
        diluent: 'SF, SG 5%.',
        finalConcentration: '2,5 mg/mL.',
        infusionRate: '15 a 30 min com bomba de infusão.',
        dose: '2 a 4 mg/kg/dia em 3 ou 4 doses diárias. Máx. 200 mg/dia.',
        notes: 'Antiulceroso. Pode causar tontura, náuseas, vômitos, dor no sítio de injeção. A administração IV rápida pode causar bradicardia.',
      },
    },
    stability: '## Guia pediátrica\n\n- 48 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Tontura, náuseas, vômitos, bradicardia (infusão rápida), dor no sítio de injeção.',
    bibliography: [BIB.pedGuide, BIB.anmat, BIB.aap, BIB.sadi],
  },
  {
    id: 'tia-001', name: 'Tiamina (vitamina B1)', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Vitamina B1 IV antes da glicose em pacientes com risco de encefalopatia de Wernicke.',
    indications: `## Indicações\n\n- Profilaxia e tratamento de encefalopatia de Wernicke.\n- Alcoolismo, desnutrição, hiperalimentação (antes da dextrose).\n\n## Precauções\n\n- Administrar antes da glicose em pacientes de risco. Reações anafilactoides (raro).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 100 mg/mL.', dose: '100–500 mg IV lenta antes da glicose; depois 100 mg TID por 3–5 dias.', administration: 'IV lenta.' },
      pediatrico: { dose: '10–25 mg IV/dia conforme idade.', administration: 'IV.' },
      neonatal: { dose: '10 mg IV/dia em nutrição parenteral.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Proteger da luz.',
    adverseEffects: '## Efeitos adversos\n\n- Reações de hipersensibilidade (raro), irritação local.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'tor-001', name: 'Torasemida', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Diurético de alça com meia-vida mais longa; IC e hipertensão.',
    indications: `## Indicações\n\n- Insuficiência cardíaca crônica, edema periférico.\n- Hipertensão arterial (VO).\n\n## Precauções\n\n- Hipocalemia, hipovolemia. Monitorar função renal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10 mg/mL; comprimidos VO.', dose: '10–20 mg IV/VO a cada 24 h; titular conforme diurese.', administration: 'IV lenta ou VO.' },
      pediatrico: { dose: '0,1–0,2 mg/kg/dose a cada 12–24 h (uso limitado).', administration: 'IV/VO.' },
      neonatal: { dose: 'Uso restrito conforme protocolo cardiorrenal da UCIN.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- IV conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Hipocalemia, tontura, elevação de ácido úrico.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'val-001', name: 'Valproato', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Anticonvulsivante de amplo espectro; IV em status e VO na epilepsia. Hepatotoxicidade e teratogenicidade.',
    indications: `## Indicações\n\n- Estado de mal epiléptico (dose de ataque IV se disponível).\n- Epilepsia generalizada, mania bipolar (VO).\n\n## Precauções\n\n- Hepatotoxicidade, pancreatite, teratogenicidade. Contraindicado em hepatopatia ativa.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola IV 100 mg/mL; xarope/comprimidos VO.', dose: 'Ataque 20–40 mg/kg IV; manutenção 15–60 mg/kg/dia VO dividido.', administration: 'IV em 60 min ou VO.' },
      pediatrico: { dose: '20–40 mg/kg/dia dividido a cada 8–12 h.', administration: 'IV/VO.' },
      neonatal: { dose: 'Uso restrito; esquemas da UCIN sob neurologia.', administration: 'IV/VO.' },
    },
    stability: '## Estabilidade\n\n- IV conforme bula; não refrigerar precipitado.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, elevação de transaminases, trombocitopenia, hiperamonemia.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'vec-001', name: 'Vecurônio', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Bloqueador neuromuscular não despolarizante de duração intermediária para bloqueio neuromuscular em centro cirúrgico e UTI.',
    indications: `## Indicações\n\n- Bloqueio neuromuscular para cirurgia e VM.\n\n## Precauções\n\n- Reversão com neostigmina + atropina ou sugamadex.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 4 mg liofilizado.', dose: '0,08–0,1 mg/kg em bolus; 0,8–1,2 mcg/kg/min em infusão.', administration: 'IV.' },
      pediatrico: {
        presentation: 'Frasco-ampola 10 mg pó para reconstituir.',
        reconstitution: 'Habitualmente com 10 mL (1 mg/mL); em restrição hídrica, diluição mínima 5 mL (2 mg/mL).',
        administration: 'IV.',
        diluent: 'SF, SG 5% ou 10%, Ringer.',
        finalConcentration: '2 mg/mL.',
        dose: '0,1 mg/kg/dose. Para infusão contínua: 0,09 a 0,15 mg/kg/h.',
        notes: 'Bloqueador neuromuscular. Pode causar arritmia, taquicardia, insuficiência respiratória, apneia. Requer suporte ventilatório durante a administração. Não altera a consciência.',
      },
      neonatal: { dose: '0,1 mg/kg em bolus; infusão na UCIN conforme TOF.', administration: 'IV.' },
    },
    stability: '## Geral\n\n- Reconstituir e utilizar conforme bula.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Bloqueio prolongado, broncoespasmo (raro).',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nLote 3: ${drugs.length} monografias pt-BR`);
