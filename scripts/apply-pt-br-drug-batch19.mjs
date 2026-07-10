#!/usr/bin/env node
/** Lote 19/19 — 3 monografías pt-BR finales desde español revisado (valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../content/locales/pt-BR/farmacologia/drugs');

const ADJUST = '> Ajustar conforme protocolo institucional e prescrição médica.';

const BIB = {
  anmat: { citation: 'ANMAT. Informações de medicamentos e bulas autorizadas na Argentina.', url: 'https://www.argentina.gob.ar/anmat' },
  pedGuide: { citation: 'Guia institucional de diluição e administração pediátrica. Junho de 2026.', url: 'https://www.sadi.org.ar/' },
  aha: { citation: 'American Heart Association. ACLS / PALS / NRP Guidelines.', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
  sccm: { citation: 'Society of Critical Care Medicine (SCCM). Diretrizes de medicação em UTI.', url: 'https://www.sccm.org/' },
  aap: { citation: 'American Academy of Pediatrics. Medication guidance in critical care.', url: 'https://www.aap.org/' },
};

const drugs = [
  {
    id: 'pho-001', name: 'Fosfato de potássio', version: '1.0', updatedAt: '2026-06-25',
    executiveSummary: 'Reposição de fósforo IV em hipofosfatemia grave de UTI e realimentação.',
    indications: `## Indicações\n\n- Hipofosfatemia < 1 mg/dL ou sintomática em UTI.\n- Síndrome de realimentação.\n\n## Precauções\n\n- Hipocalcemia secundária. Não administrar em bolus rápido. Monitorar Ca2+ e K+.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola fosfato potássico/sódico conforme formulação.', dose: '0,2–0,5 mmol/kg IV em 6–8 h (protocolo).', infusionRate: 'Perfusão lenta.', administration: 'IV diluído.' },
      pediatrico: { dose: '0,2–0,3 mmol/kg IV em 4–6 h.', administration: 'IV em bomba de infusão.' },
      neonatal: { dose: 'Reposição conforme níveis na UCIN.', administration: 'IV lenta.' },
    },
    stability: '## Estabilidade\n\n- Verificar compatibilidade com nutrição parenteral.',
    adverseEffects: '## Efeitos adversos\n\n- Hipocalcemia, hipercalemia, flebite.',
    bibliography: [BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'teo-001', name: 'Aminofilina', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Metilxantina broncodilatadora IV; janela terapêutica estreita e múltiplas interações.',
    indications: `## Indicações\n\n- Broncoespasmo agudo refratário a beta-2.\n- Apneia do prematuro (esquemas históricos; cafeína preferida).\n\n## Precauções\n\n- Toxicidade: náuseas, arritmias, convulsões. NÃO administrar em bolus.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 24 mg/mL (teofilina equivalente).', dose: 'Ataque 5–6 mg/kg IV lenta; manutenção 0,5 mg/kg/h.', administration: 'IV lenta.' },
      pediatrico: {
        presentation: 'Ampola 240 mg/10 mL.',
        administration: 'IV.',
        diluent: 'SG 5%.',
        finalConcentration: '25 mg/mL.',
        infusionRate: '20 a 30 min com bomba de infusão.',
        dose: '1 a 16 anos: 6 mg/kg. Manutenção: 0,8 a 1 mg/kg.',
        notes: 'Broncodilatador. Pode causar náuseas, vômitos, dor abdominal, diarreia, cefaleia, ansiedade, hipotensão, arritmias, convulsões. NÃO ADMINISTRAR EM BOLUS, PRODUZ HIPOTENSÃO E RISCO DE MORTE.',
      },
      neonatal: { dose: 'Ataque e manutenção conforme protocolo apneia UCIN.', administration: 'IV em bomba de infusão.' },
    },
    stability: '## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Náuseas, vômitos, dor abdominal, diarreia, cefaleia, ansiedade, hipotensão, arritmias, convulsões.',
    bibliography: [BIB.pedGuide, BIB.aha, BIB.anmat, BIB.aap],
  },
  {
    id: 'vit-001', name: 'Fitomenadiona (vitamina K)', version: '1.1', updatedAt: '2026-06-30',
    executiveSummary: 'Vitamina K IV/IM/VO para reversão de anticoagulação com varfarina e profilaxia neonatal.',
    indications: `## Indicações\n\n- Sangramento por sobredose de varfarina.\n- Profilaxia de doença hemorrágica do recém-nascido.\n- Coagulopatia por déficit de vitamina K.\n\n## Precauções\n\n- Anafilaxia com IV rápido; administrar lentamente. Não reverte heparina nem DOACs.\n\n${ADJUST}`,
    dilution: {
      adulto: { presentation: 'Ampola 10 mg/mL.', dose: 'Sangramento por varfarina: 5–10 mg IV lenta.', administration: 'IV lenta, IM ou VO.' },
      pediatrico: {
        presentation: 'Ampola 1 mg/0,5 mL ou 10 mg/1 mL.',
        administration: 'Preferencialmente SC; caso contrário IV.',
        diluent: 'SF ou SG 5%. Diluir em 5 ou 10 mL.',
        infusionRate: 'Não administrar em bolus.',
        dose: '5 mg/dia. Dose única.',
        notes: 'Anti-hemorrágico. Pode causar hipotensão, tontura, náusea e vômito. Não administrar em bolus; pode causar hipersensibilidade ou choque anafilático.',
      },
      neonatal: { dose: '1 mg IM ao nascer (profilaxia padrão).', administration: 'IM profunda.' },
    },
    stability: '## Geral\n\n- Proteger da luz.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\n- Reações anafilactoides IV, dor no local IM.',
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

console.log(`\nLote 19 (final): ${drugs.length} monografias pt-BR`);
