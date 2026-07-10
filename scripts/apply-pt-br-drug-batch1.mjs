#!/usr/bin/env node
/** Lote 1/19 — 10 monografías pt-BR desde español revisado */
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
  heartHtn: { citation: 'American Heart Association. Hypertension guidelines.', url: 'https://www.heart.org/' },
};

const drugs = [
  {
    id: 'tob-001', name: 'Tobramicina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Aminoglicosídeo com maior atividade antipseudomonas; uso IV, IM ou inalatório na fibrose cística.',
    indications: `## Indicações\n\n- Infecções por *Pseudomonas* em associação.\n- Via inalatória em exacerbações de fibrose cística (apresentação específica).\n\n## Precauções\n\n- Monitorar níveis séricos e função renal.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 40 mg/mL IV; solução para nebulização.', dose: '5–7 mg/kg/dia IV divididos a cada 8 h. Inalatório: conforme protocolo de fibrose cística.', administration: 'IV ou inalatório.' },
      pediatrico: { dose: '5–7 mg/kg/dia IV a cada 8 h.', administration: 'IV/inalatório conforme indicação.' },
      neonatal: { dose: '4–5 mg/kg/dose a cada 24–48 h (UCIN).', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- IV diluída: 24 h refrigerada. Nebulização: usar imediatamente.',
    adverseEffects: '## Efeitos adversos\n\n- Nefrotoxicidade, ototoxicidade, broncoespasmo (inalatório).',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'pen-002', name: 'Penicilina G benzatínica', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Penicilina depot de ação prolongada para sífilis e profilaxia de febre reumática; somente IM.',
    indications: `## Indicações principais\n\n- Sífilis (esquemas por estágio).\n- Profilaxia secundária de febre reumática.\n- Profilaxia de glomerulonefrite pós-estreptocócica em esquemas específicos.\n\n## Precauções\n\n- Somente IM profunda. Não administrar IV (risco grave).\n- Alergia a penicilinas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 1,2 e 2,4 MUI (Galtamicina, Klonal, Fabra, Richet, Pen Di Ben).',
        reconstitution: '5 mL de AD (1,2 MUI); 10 mL de AD (2,4 MUI). Conc.: 0,24–0,12 MUI/mL.',
        diluent: '1,2 MUI em 5 mL de AD ou 2,4 MUI em 10 mL de AD.',
        finalConcentration: '0,24 MUI/mL.',
        administration: 'IM profunda: Sim. Agitar suavemente para umedecer o pó e, em seguida, agitar vigorosamente até dissolução completa. IV direta: Não. IV intermitente: Não.',
        notes: 'Não deve ser administrada por via IV sob nenhuma hipótese, devido ao risco de isquemia fatal.',
      },
      pediatrico: { dose: 'Febre reumática: 600.000 UI IM a cada 3–4 semanas (< 27 kg) ou 1,2 milhão UI (≥ 27 kg).', administration: 'IM profunda. Não IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Utilizar imediatamente. Descartar o remanescente, se houver.\n\n## Solução diluída (a administrar)\n\n- Não se aplica.',
    adverseEffects: '## Frequentes\n\n- Dor no local da IM, reação de Jarisch-Herxheimer na sífilis.\n\n## Graves\n\n- Anafilaxia.',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'tic-001', name: 'Ticarcilina/ácido clavulânico', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Antipseudomonas histórico em associação; uso conforme antibiograma e disponibilidade institucional.',
    indications: `## Indicações principais\n\n- Infecções por Gram-negativos, incluindo *Pseudomonas*, em esquemas combinados.\n- Alternativa conforme sensibilidade local quando disponível no formulário.\n\n## Precauções\n\n- Alergia a penicilinas.\n- Ajuste na DRC. Uso restrito pela disponibilidade de alternativas.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 3,1 g (3 g ticarcilina + 0,1 g ácido clavulânico).', reconstitution: 'Reconstituir com 13 mL de diluente conforme bula.', dose: '3,1 g IV a cada 4–6 h.', infusionRate: 'Infusão em 30 min.', administration: 'IV.' },
      pediatrico: { dose: '200–400 mg/kg/dia de ticarcilina divididos a cada 4–6 h (máx. conforme protocolo).', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Utilizar a diluição em 6–24 h conforme diluente e bula.',
    adverseEffects: '## Frequentes\n\n- Diarreia, flebite, hipocalemia com doses elevadas.\n\n## Graves\n\n- Anafilaxia, colite por *C. difficile*.',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'mag-001', name: 'Sulfato de magnésio', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Eletrólito com papel em *torsades de pointes*, eclâmpsia e asma grave (protocolo).',
    indications: `## Indicações\n\n- *Torsades de pointes*, hipomagnesemia sintomática.\n- Eclâmpsia / pré-eclâmpsia grave (protocolo obstétrico).\n- Asma grave refratária (esquemas específicos).\n\n## Precauções\n\n- Depressão respiratória e arreflexia em superdosagem.\n- Monitorar reflexo patelar e frequência respiratória (FR).\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10% (1 g = 10 mL).', dose: 'Torsades: 1–2 g IV em 15 min. Eclâmpsia: 4–6 g de dose de ataque conforme protocolo.', administration: 'IV lenta.' },
      pediatrico: {
        presentation: 'Ampola de sulfato de magnésio 25% (10 mL).', administration: 'IV ou IM.', diluent: 'Solução NaCl 0,9%, SG 5%.',
        finalConcentration: '200 mg/mL.', infusionRate: '15 a 20 min em emergência médica; caso contrário, 2 a 4 horas.',
        dose: 'Crise asmática: 25–75 mg/kg/dose; máx. 2 g.',
        notes: 'Tratamento de crise asmática, arritmias, hipomagnesemia, hipocalcemia; anticonvulsivante. Pode causar sonolência, hipotensão, depressão do SNC e diarreia.',
      },
      neonatal: { dose: '25–50 mg/kg IV lenta conforme protocolo da UCIN.', administration: 'IV em 20 min.' },
    },
    stability: '## Geral\n\n- Compatível em NaCl 5% e SG 5%.\n\n## Guia pediátrica\n\n- Descartar após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Rubor, hipotensão, depressão respiratória, arreflexia.',
    bibliography: [BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'tig-001', name: 'Tigeciclina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Glicilciclina IV de reserva para infecções polimicrobianas intra-abdominais e de pele complicadas.',
    indications: `## Indicações\n\n- Infecções intra-abdominais e de pele complicadas quando as alternativas não são adequadas.\n\n## Precautões\n\n- Maior mortalidade em bacteriemia em alguns estudos; não é primeira linha na sepse.\n- Náuseas frequentes.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco-ampola com pó liofilizado contendo 50 mg (Tigeciclina Richet, Tygacil).',
        reconstitution: '5 mL de SF ou SG 5%. Conc.: 10 mg/mL.', diluent: '50 mg em 100 mL de SF ou SG 5%.', finalConcentration: '0,5 mg/mL.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir em 100 mL de SF ou SG 5% e administrar em 30–60 min.',
        notes: 'Não administrar simultaneamente com anfotericina B, complexo lipídico de anfotericina B nem diazepam. Quando a dose de ataque for 200 mg, diluir em 200 mL de SF ou SG 5%.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente.\n\n## Solução diluída (a administrar)\n\n- 48 h em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, vômitos, hiperbilirrubinemia, pancreatite (raro).',
    bibliography: [BIB.sadiUcip, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'srf-001', name: 'Surfactante pulmonar', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Fármaco intratraqueal para síndrome do desconforto respiratório neonatal e profilaxia em prematuros.',
    indications: `## Indicações\n\n- SDR neonatal (doença da membrana hialina).\n- Profilaxia em prematuros < 32 semanas.\n\n## Precauções\n\n- Bradicardia e dessaturação durante a instilação: pausar e ventilar.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Não indicado rotineiramente em adultos.', dose: 'N/A para uso habitual em adultos.', administration: 'N/A.' },
      pediatrico: { dose: '100–200 mg/kg por via intratraqueal em RN (dose conforme produto).', administration: 'Intratraqueal em VM.' },
      neonatal: { dose: '100–200 mg/kg por via endotraqueal; repetir conforme protocolo da UCIN.', administration: 'Intratraqueal com VM.' },
    },
    stability: '## Estabilidade\n\n- Refrigerar; aquecer à temperatura ambiente antes da instilação.',
    adverseEffects: '## Efeitos adversos\n\n- Dessaturação transitória, bradicardia, refluxo do medicamento.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'tei-001', name: 'Teicoplanina', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Glicopeptídeo com dose de ataque e manutenção; alternativa à vancomicina IV.',
    indications: `## Indicações\n\n- Infecções por Gram-positivos, incluindo MRSA.\n- Profilaxia em cirurgia ortopédica/cardíaca em esquemas específicos.\n\n## Precauções\n\n- Dose de ataque obrigatória.\n- Monitorar função renal e níveis séricos conforme protocolo.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Frasco-ampola 200 mg ou 400 mg.', reconstitution: 'Reconstituir com água para injeção; formação de espuma é normal — deixar repousar.', dose: 'Ataque: 6 mg/kg a cada 12 h × 3 doses. Manutenção: 6 mg/kg a cada 24 h.', infusionRate: 'Infusão IV lenta em 30 min.', administration: 'IV ou IM.' },
      pediatrico: { dose: 'Ataque: 10 mg/kg a cada 12 h × 3; manutenção: 6–10 mg/kg a cada 24 h.', administration: 'IV.' },
    },
    stability: '## Estabilidade\n\n- Solução reconstituída: 24 h refrigerada.',
    adverseEffects: '## Efeitos adversos\n\n- Rash, nefrotoxicidade, ototoxicidade, reações histamínicas (infusão rápida).',
    bibliography: [BIB.sanford, BIB.anmat, BIB.sadi, BIB.idsa],
  },
  {
    id: 'tel-001', name: 'Telmisartana', version: '1.0', updatedAt: '2026-07-05',
    executiveSummary: 'BRA de longa duração para HAS e redução do risco cardiovascular.',
    indications: `## Indicações\n\n- Hipertensão arterial essencial.\n- Redução de eventos cardiovasculares em pacientes de alto risco (conforme indicação registrada).\n\n## Precauções\n\n- Contraindicado na gestação.\n- Cautela com diuréticos poupadores de potássio.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Comprimidos 40 e 80 mg.', dose: '40–80 mg/dia VO em dose única.', administration: 'VO com ou sem alimentos.' },
      pediatrico: { dose: '1–2 mg/kg/dia VO (uso limitado, protocolo cardiológico).', administration: 'VO.' },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula.',
    adverseEffects: '## Efeitos adversos\n\n- Hipotensão, hipercalemia, tontura, dor lombar (raro).',
    bibliography: [BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'tri-001', name: 'Trimetoprima+sulfametoxazol', version: '1.2', updatedAt: '2026-06-30',
    executiveSummary: 'Sulfonamida combinada (cotrimoxazol); ITU, *Pneumocystis* e MRSA cutâneo comunitário.',
    indications: `## Indicações\n\n- ITU, prostatite, infecções respiratórias sensíveis.\n- Profilaxia e tratamento de *Pneumocystis jirovecii*.\n- MRSA cutâneo comunitário.\n\n## Precauções\n\n- Risco de reações cutâneas graves (SJS/TEN).\n- Ajuste na DRC. Hipercalemia.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola contendo 80 mg de trimetoprima (TMP) + 400 mg de sulfametoxazol (SMX) em 5 mL (Cotrizol G, Novidrine, Bactrim, Danferane, Spectrex).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 16 mg/mL de trimetoprima e 80 mg/mL de sulfametoxazol.',
        diluent: '80 mg TMP/400 mg SMX em 100 mL de SF ou SG 5%.', finalConcentration: '0,8 mg/mL de TMP e 4 mg/mL de SMX.',
        administration: 'IV direta: Não. IV intermitente: Sim. Diluir 1 ampola em 100 mL de SF e administrar em 30–60 min. Não exceder 90 min.',
        notes: 'Recomenda-se diluição de 1 mL de TMP+SMX em 5 mL de diluente.',
      },
      pediatrico: {
        presentation: 'Ampola 80 mg–400 mg/5 mL.', administration: 'IV.', diluent: 'Solução NaCl 0,9%, SG 5% e 10%.',
        finalConcentration: '1,6 mg/mL.', infusionRate: 'Não menos que 60 min com bomba de infusão.',
        dose: '6 a 12 mg/kg/dia em 2 doses diárias. Máx. 15 a 20 mg/kg/dia em 3 ou 4 doses diárias. Para o cálculo da dose, considerar os 80 mg de trimetoprima, NÃO os 480 mg da soma com sulfametoxazol.',
        notes: 'Antibiótico para infecções do trato urinário, otite média, bronquite crônica e pneumonite. Pode causar hipotensão, alucinações, convulsões, febre, náuseas, vômitos, diarreia e flebite.',
      },
      neonatal: { dose: 'Evitar < 2 meses salvo indicação vital; dose conforme UCIN.', administration: 'VO/IV.' },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 2 h em temperatura ambiente. Preparar imediatamente antes do uso.\n\n## Guia pediátrica\n\n- Descartar o remanescente após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Rash, hipercalemia, mielotoxicidade, cristalúria.',
    bibliography: [BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'sal-001', name: 'Salbutamol', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Beta-2 agonista de ação curta para broncoespasmo agudo; nebulização ou MDI.',
    indications: `## Indicações\n\n- Crise asmática e DPOC exacerbada.\n- Broncoespasmo perioperatório.\n\n## Precautões\n\n- Taquicardia, hipocalemia com doses elevadas.\n- Monitorar K+ durante infusão IV.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Nebulização 5 mg/mL; MDI; ampola IV.', dose: 'Neb: 2,5–5 mg a cada 20 min × 3. IV: 0,5 mcg/kg/min em infusão na crise grave.', administration: 'Nebulização ou IV.' },
      pediatrico: { dose: 'Neb: 0,15 mg/kg (mín. 2,5 mg).', administration: 'Nebulização.' },
      neonatal: { dose: 'Neb: 0,1–0,3 mg/kg; infusão IV na broncodisplasia conforme protocolo da UCIN.', administration: 'Neb/IV.' },
    },
    stability: '## Estabilidade\n\n- Nebulização: utilizar solução fresca.',
    adverseEffects: '## Efeitos adversos\n\n- Taquicardia, tremor, hipocalemia, arritmias.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
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

console.log(`\nLote 1: ${drugs.length} monografias pt-BR`);
