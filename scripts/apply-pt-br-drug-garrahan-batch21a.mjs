#!/usr/bin/env node
/** Garrahan re-tradução lote 21 — 10 monografias pt-BR (parte A) */
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
  sanfordVan: { citation: 'Sanford Guide to Antimicrobial Therapy — Vancomycin dosing and monitoring.', url: 'https://www.sanfordguide.com/' },
  sanfordPiptazo: { citation: 'Sanford Guide to Antimicrobial Therapy — Piperacillin-tazobactam.', url: 'https://www.sanfordguide.com/' },
  sadi: { citation: 'Sociedade Argentina de Infectologia (SADI). Diretrizes e consensos.', url: 'https://www.sadi.org.ar/' },
  sac: { citation: 'Sociedade Argentina de Cardiologia. Diretrizes de prática clínica.', url: 'https://www.sac.org.ar/' },
  heartHtn: { citation: 'American Heart Association. Diretrizes de hipertensão e insuficiência cardíaca.', url: 'https://www.heart.org/' },
  rybak: { citation: 'Rybak MJ, et al. Therapeutic monitoring of vancomycin: revised consensus guidelines. Am J Health Syst Pharm. 2020.', url: 'https://www.ashp.org/' },
};

const drugs = [
  {
    id: 'van-001', name: 'Vancomicina', version: '1.3', updatedAt: '2026-07-09',
    executiveSummary: 'Glicopeptídeo bactericida contra Gram-positivos resistentes a beta-lactâmicos (MRSA, enterococos e outros). Medicamento de alto risco: infusão lenta (1 h), vigilância de níveis séricos, nefrotoxicidade e ototoxicidade.',
    indications: `${MAIN}\n\n- Tratamento de infecções por microorganismos Gram-positivos resistentes a beta-lactâmicos (*MRSA, S. viridans, Bacillus, Corynebacterium*).\n- Sepse, bacteriemia, meningite, artrite séptica, endocardite, osteomielite, pneumonia intrahospitalar por *S. aureus*.\n- Colite pseudomembranosa por *Clostridioides difficile*: via oral conforme gravidade.\n\n## Precauções\n\n- Administrar em infusão durante 1 hora; risco de síndrome do homem vermelho com hipotensão se a infusão for rápida.\n- Precaução por necrose em extravasamento; controlar níveis séricos (vale) conforme indicação.\n- Ajustar dose em insuficiência renal conforme protocolo institucional.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. 500–1000 mg (Rivervan, Vancomax, V. Fabra, V. Northia, V. Richet, Varedet).',
        reconstitution: '10 mL de AD. Conc.: 100 mg/mL.',
        diluent: '500 mg em 100 mL de SF.',
        finalConcentration: '5 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Diluir 500 mg em 100 mL de SF e administrar em não menos de 60–90 min. Oral: Sim (colite por *C. difficile*).',
        dose: 'Dose pré-cirúrgica em adultos: 1 g/dose.',
        notes: 'Monitorização de vancomicina no plasma (a partir de 48 h de tratamento). Vale conforme indicação: 15–20 µg/mL (bacteriemia, endocardite, osteomielite, meningite, pneumonia intrahospitalar por MRSA); 10–15 µg/mL em outras indicações.',
      },
      pediatrico: {
        presentation: 'F.A. 500–1000 mg.',
        reconstitution: 'Água destilada para reconstituição.',
        administration: 'E.V.; V.O. (colite por *C. difficile*).',
        diluent: 'SF 0,9% ou SG 5%.',
        finalConcentration: '5 mg/mL.',
        infusionRate: 'Infusão durante 1 h.',
        dose: 'E.V. — Sepse, bacteriemia, meningite e artrite séptica: 60 mg/kg/dia, a cada 6 h. E.V. — Outras infecções: 40 mg/kg/dia, a cada 8 h. E.V. — Fibrose cística: 45 mg/kg/dia, a cada 8 h. Dose máxima: 2 g/dia (até 4 g/dia se dosagem baixa). V.O. — Colite por *C. difficile*: 10 mg/kg/dose a cada 6 h (máx. 125 mg/dose; grave ou fulminante: máx. 500 mg/dose), 10 dias.',
        notes: 'Medicamento de alto risco. Ototóxico, nefrotóxico. Pode causar flebite, reações febris, rash, eosinofilia, neutropenia. A administração em bolus pode induzir parada cardíaca.',
      },
      neonatal: {
        dose: 'Dose e intervalo conforme idade pós-menstrual e função renal (protocolo UCIN).',
        administration: 'Via central preferida; monitorizar acesso e sinais de extravasamento.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- 96 h refrigerado.',
    adverseEffects: '## Frequentes\n\n- Síndrome do homem vermelho com hipotensão (associada à velocidade de infusão).\n- Flebite, reações febris, rash, eosinofilia, neutropenia.\n\n## Graves\n\n- Ototoxicidade, nefrotoxicidade.',
    bibliography: [BIB.garrahan('Vancomicina Cloridrato', ' (cód. 0216, ATC J01XA)'), BIB.sadiUcip, BIB.rybak, BIB.sanfordVan, BIB.anmat],
  },
  {
    id: 'gen-001', name: 'Gentamicina', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico aminoglicosídeo para tratamento de infecções em osso, sistema nervoso central, trato respiratório, pele e partes moles, abdominais, urinárias e endocardite por bactérias gram-negativas, incluindo Pseudomonas, e gram-positivas.',
    indications: `${MAIN}\n\nAntibiótico aminoglicosídeo para tratamento de infecções em osso, sistema nervoso central, trato respiratório, pele e partes moles, abdominais, urinárias e endocardite por bactérias gram-negativas, incluindo Pseudomonas, e gram-positivas.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola contendo 80 mg (Gentamicina Drawer).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 40 mg/mL.',
        diluent: '80 mg em 100 mL de SF.',
        finalConcentration: '0,8 mg/mL.',
        administration: 'E.V. intermitente: Sim. Diluir em 100 mL de SF e administrar em 30 min.',
      },
      pediatrico: {
        presentation: 'Ampolas de 2 mL: 40 mg/mL',
        administration: 'E.V.; I.M.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '11 mg/mL.',
        infusionRate: '30 a 60 min.',
        dose: '5–7,5 mg/kg/dia a cada 24 h, dose máxima: 300 mg. Fibrose cística: 10 mg/kg/dia, dose máxima: 400 mg. Endocardite: 3 mg/kg/dia a cada 8 h (monitorar concentração sérica). Ver tabela de ajuste de dose de antimicrobianos.',
        compatibility: 'Incompatível com cefalosporinas, penicilina e heparina.',
        notes: 'E.V.: administrar diluído em 30 minutos. Farmacocinética: Múltiplas doses diárias: pico: 4 a 12 µg/mL, vale: < 2 µg/mL. Dose única diária: pico: 16 a 24 µg/mL, vale: < 1 µg/mL. O acompanhamento será feito medindo pico e vale. Pico entre 30 e 60 minutos após finalizada a infusão de uma hora; vale: imediatamente antes da próxima dose. Requer monitorização plasmática em: tratamentos > 5 dias, pacientes com função renal diminuída, pacientes com resposta terapêutica limitada, obesidade, aumento do volume extracelular, pacientes que requerem aumento de dose, fibrocísticos, queimados, pacientes submetidos a diálise, sinais de ototoxicidade e nefrotoxicidade e uso de outros agentes nefrotóxicos. Ver guia preliminar para prevenção de teratogênese causada por medicamentos.',
      },
      neonatal: {
        dose: '4–5 mg/kg/dose a cada 24–36 h conforme idade pós-menstrual (UCIN).',
        administration: 'E.V.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- Não se aplica.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente e 48 h refrigerado.\n\n## Guia pediátrica\n\n- Descartar após aberto.',
    adverseEffects: '## Efeitos adversos\n\nLesão vestibular, nefrotoxicidade reversível, potencializa o bloqueio neuromuscular por anestésicos.',
    bibliography: [BIB.garrahan('Gentamicina', ' (cód. 0105, ATC J01GB)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanford, BIB.anmat, BIB.sadi],
  },
  {
    id: 'ami-001', name: 'Amicacina', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antibiótico aminoglicosídeo, utilizado no tratamento de infecções por bactérias Gram-negativas resistentes à gentamicina e infecções por micobactérias suscetíveis.',
    indications: `${MAIN}\n\nAntibiótico aminoglicosídeo, utilizado no tratamento de infecções por bactérias Gram-negativas resistentes à gentamicina e infecções por micobactérias suscetíveis.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola contendo 500 mg em 2 mL de solução (Duncan, FABRA, Klonal, Larjan, Richet, Rivero).',
        reconstitution: 'Não requer reconstituição prévia. Conc.: 250 mg/mL.',
        diluent: '500 mg em 200 mL de SF.',
        finalConcentration: '2,5 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Administrar a dose em 30–60 min.',
        notes: 'Pode sofrer alteração de coloração sem perda de atividade. Descartar soluções escuras.',
      },
      pediatrico: {
        presentation: 'Ampola de 2 mL: 250 mg/mL',
        administration: 'E.V.; I.M.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: 'Até 10 mg/mL.',
        infusionRate: 'Entre 30 e 60 min com BIC.',
        dose: '15 mg/kg/dia a cada 12–24 h, dose máxima: 1500 mg/dia. Fibrose cística: 30 mg/kg/dia a cada 24 h. Mycobacterium avium: 7,5–15 mg/kg/dia a cada 12–24 h. Infecção por Mycobacterium tuberculosis em pacientes HIV positivos sensíveis à amicacina como fármaco antituberculoso de segunda linha: 15–20 mg/kg/dia a cada 12–24 h, dose máxima: 1000 mg/dia. Tratamento para infecção por micobactérias não tuberculosas: 15–30 mg/kg/dia divididos a cada 12–24 h como parte de um regime com múltiplos fármacos. Dose máxima: 1,5 g/dia. A dosagem subsequente deve ser feita de acordo com parâmetros farmacocinéticos. Neonatos: ver tabela de dosagem em neonatos (> 1000 g e > 7 dias: 10 mg/kg/dose a cada 12 h; > 2 meses: 15 mg/kg/dose a cada 24 h). Ver tabela de ajuste de dose de antibióticos em I.R. Ver Guia de tratamento de tuberculose.',
        compatibility: 'NÃO DEVE SER ADMINISTRADO COM OUTROS FÁRMACOS. Os ATB beta-lactâmicos reduzem sua eficácia.',
        notes: 'Administrar por infusão lenta (mais de 30 minutos). Farmacocinética: Dose única diária: pico: 56 a 64 µg/mL, vale: < 1 µg/mL. Múltiplas doses diárias: pico: 20 a 32 µg/mL, vale: 2 a 8 µg/mL. O acompanhamento será feito medindo pico e vale. Pico entre 30 e 60 minutos após finalizada a infusão de uma hora; vale: imediatamente antes da próxima dose. Requer monitorização plasmática em: tratamentos > 5 dias, pacientes com função renal diminuída, pacientes com resposta terapêutica limitada, obesidade, aumento do volume extracelular, pacientes que requerem aumento de dose, fibrocísticos, queimados, pacientes submetidos a diálise, sinais de ototoxicidade e nefrotoxicidade e uso de outros agentes nefrotóxicos. Interage com numerosos fármacos em solução de infusão; administrar separadamente. Ver guia preliminar para prevenção de teratogênese causada por medicamentos.',
      },
      neonatal: {
        dose: '15 mg/kg/dose a cada 24–48 h conforme idade pós-menstrual.',
        administration: 'E.V.',
      },
    },
    stability: '## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente.\n\n## Guia pediátrica\n\n- Conservar ampola fechada em local escuro. Descartar o sobrante após aberta.',
    adverseEffects: '## Efeitos adversos\n\nOtotoxicidade, nefrotoxicidade, bloqueio neuromuscular.',
    bibliography: [BIB.garrahan('amiKACina', ' (cód. 0011, ATC J01GB)'), BIB.sadiUcip, BIB.pedGuide, BIB.anmat, BIB.sadi],
  },
  {
    id: 'pip-001', name: 'Piperacilina+tazobactam', version: '1.2.1', updatedAt: '2026-07-10',
    executiveSummary: 'Tratamento de infecções mistas aeróbias-anaeróbias. Não aumenta a atividade antipseudomonas, sim frente a germes produtores de beta-lactamases.',
    indications: `${MAIN}\n\nTratamento de infecções mistas aeróbias-anaeróbias. Não aumenta a atividade antipseudomonas, sim frente a germes produtores de beta-lactamases.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'F.A. com pó liofilizado contendo 4 g de piperacilina (PIP) + 0,5 g de tazobactam (Bagótaz, Drawer, FADA, Pharmavial, Piperac Compuesto, Norgreen, Northia, Vredian, Petezam, Richet, Tazonam EDTA).',
        reconstitution: '20 mL de AD. Conc. PIP: 200 mg/mL.',
        diluent: '4,5 g em 100 mL de SF ou SG 5%.',
        finalConcentration: 'Conc. PIP: 40 mg/mL.',
        administration: 'E.V. direta: Não. E.V. intermitente: Sim. Agitar suavemente até dissolução. Diluir em 50–150 mL de SF e administrar em 30 min.',
        notes: 'É possível a administração E.V. em infusão contínua. Nesse caso, diluir 13,5 g (3 F.A.) em 250 mL de SF a passar em 24 h.',
      },
      pediatrico: {
        presentation: 'F.A. de 4,5 g: (piperacilina: 4 g + tazobactam: 0,5 g)',
        reconstitution: 'Reconstituir com 17 mL para volume final de 20 mL.',
        administration: 'E.V.',
        diluent: 'SF 0,9% ou SG 5%, água destilada para reconstituição.',
        finalConcentration: '20 mg/mL. Em restrição hídrica: 200 mg/mL.',
        infusionRate: '30 minutos com BIC.',
        dose: 'Infecções leves, moderadas e tratamento empírico: Crianças: 300 mg (piperacilina + tazobactam)/kg/dia a cada 8 h, Adultos: 4,5 g (piperacilina + tazobactam) a cada 8 h. Infecções graves (bacteriemias, infecções intra-abdominais complicadas): Crianças: 300–450 mg (piperacilina + tazobactam)/kg/dia a cada 6 h, Adultos: 4,5 g (piperacilina + tazobactam) a cada 6 h. Dose máxima: 18 g/dia (piperacilina + tazobactam). Fibrose cística: 450 mg (piperacilina + tazobactam)/kg/dia a cada 6 h.',
        notes: 'Administrar em 30 minutos. Administrar 30–60 minutos separado dos aminoglicosídeos. Com vecurônio pode prolongar o bloqueio neuromuscular.',
      },
      neonatal: {
        dose: 'Dose e intervalo conforme idade pós-menstrual, peso e foco infeccioso (prescrição de infectologia/neonatologia).',
        administration: 'E.V. preferencialmente central.',
      },
    },
    stability: '## Reconstituído (no frasco)\n\n- 24 h em temperatura ambiente e 48 h refrigerado.\n\n## Solução diluída (a administrar)\n\n- 24 h em temperatura ambiente e 7 dias refrigerado.\n\n## Guia pediátrica\n\n- 24 h em temperatura ambiente, 48 h refrigerado.',
    adverseEffects: '## Efeitos adversos\n\nInsônia, cefaleia, confusão, convulsões, rash, prurido, edema, diarreia, constipação, náuseas, vômitos.',
    bibliography: [BIB.garrahan('PIPERACILINA + tazobactam', ' (cód. 1361, ATC J01CR)'), BIB.sadiUcip, BIB.pedGuide, BIB.sanfordPiptazo, BIB.anmat, BIB.sadi],
  },
  {
    id: 'roc-001', name: 'Rocurônio', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Indução rápida para politraumatizados sem jejum prévio.',
    indications: `${MAIN}\n\nIndução rápida para politraumatizados sem jejum prévio.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco 10 mg/mL.',
        dose: 'IOT de sequência rápida: 0,6–1,2 mg/kg E.V. Manutenção: 0,1–0,2 mg/kg/h.',
        administration: 'E.V. em bolus ou infusão.',
      },
      pediatrico: {
        presentation: 'Ampolas de 5 mL: 10 mg/mL',
        administration: 'E.V.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '0,5 a 1 mg/mL. Pode ser administrado sem diluir.',
        infusionRate: 'Push ou infusão com BIC.',
        dose: '0,45–0,6 mg/kg/dose',
        compatibility: 'Incompatível com tiopental, anfotericina, amoxicilina, dexametasona, diazepam, furosemida, insulina, metilprednisolona, vancomicina.',
        notes: 'USO EXCLUSIVO DO ESPECIALISTA. Pode ser administrado sem diluir. Para infusão contínua diluir com solução fisiológica ou dextrose 5% com concentração de 0,5 a 1 mg/mL; não misturar com soluções alcalinas.',
      },
      neonatal: {
        dose: '0,45–1 mg/kg conforme protocolo UCIN.',
        administration: 'E.V.',
      },
    },
    stability: '## Geral\n\n- Frasco aberto conforme bula.\n\n## Guia pediátrica\n\n- 30 dias refrigerado após aberto.',
    adverseEffects: '## Efeitos adversos\n\nApneia, vagólise, hipotensão transitória, hipertensão, taquicardia relacionada dose-apneia, arritmias, edema no local da injeção, soluço, prurido, náuseas, sibilância, fraqueza muscular residual.',
    bibliography: [BIB.garrahan('Rocuronio*', ' (cód. 9151, ATC M03AC)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'sug-001', name: 'Sugamadex', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Indicado na reversão do bloqueio neuromuscular induzido por rocurônio.',
    indications: `${MAIN}\n\nIndicado na reversão do bloqueio neuromuscular induzido por rocurônio.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Frasco 100–200 mg/mL.',
        dose: '2 mg/kg moderado; 4 mg/kg profundo; 16 mg/kg IOT de sequência rápida imediata.',
        administration: 'E.V. em bolus.',
      },
      pediatrico: {
        presentation: 'Ampolas de 2 mL: 100 mg/mL',
        administration: 'E.V.',
        dose: 'Adultos: reversão de rotina: recomenda-se dose de 4 mg/kg',
        notes: 'Agir com precaução em pacientes que recebem tratamento anticoagulante. Não se recomenda em pacientes com insuficiência renal grave.',
      },
      neonatal: {
        dose: 'Dados limitados; usar sob anestesiologia pediátrica.',
        administration: 'E.V.',
      },
    },
    stability: '## Estabilidade\n\n- Usar imediatamente após extração.',
    adverseEffects: '## Efeitos adversos\n\nReações de hipersensibilidade: rubor, urticária, erupção eritematosa, hipotensão (grave), taquicardia e edema de língua e faringe.',
    bibliography: [BIB.garrahan('Sugammadex Sódico', ' (cód. 1969, ATC V03AB)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'nal-001', name: 'Naloxona', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antagonista dos opioides e derivados.',
    indications: `${MAIN}\n\nAntagonista dos opioides e derivados.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 0,4 mg/mL.',
        dose: '0,04–0,4 mg E.V. a cada 2–3 min até resposta (máx. conforme protocolo).',
        administration: 'E.V./I.M./intranasal conforme protocolo.',
      },
      pediatrico: {
        presentation: 'Ampolas: 0,4 mg/mL',
        administration: 'E.V.; I.M.; S.L.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: 'Sem diluir.',
        infusionRate: 'Bolus, 30 s.',
        dose: 'Reversão parcial: Recém-nascidos: 0,01 mg/kg (dose máxima: 0,1 mg) a cada 2–3 minutos até obter resposta; crianças maiores: 0,01 mg/kg (dose máxima: 0,2 mg), Adultos: 0,4–2 mg a cada 2–3 minutos se necessário. Infusão contínua: 2,5–160 µg/kg/hora. Reversão total: 0,1 mg/kg; se não houver resposta, pode repetir a cada 2–3 min. se via E.V. ou a cada 10 min. se via I.M., dose máxima: 2 mg. Toxicologia: E.V. 0,01 mg/kg, dose máxima: 0,1 mg/kg; infusão contínua: 0,4 mg/hora.',
        notes: 'Deve ser utilizado por médicos treinados em seu uso. Não produz depressão respiratória, farmacodependência nem síndrome de abstinência.',
      },
      neonatal: {
        dose: '0,1 mg/kg E.V./I.O. se depressão por opioides maternos.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Geral\n\n- Pronto para uso.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\nEm sobredose: náuseas e vômitos (raramente).',
    bibliography: [BIB.garrahan('Naloxona', ' (cód. 0976, ATC V03AB)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'ond-001', name: 'Ondansetrona', version: '1.1.1', updatedAt: '2026-07-10',
    executiveSummary: 'Êmese refratária. Êmese por quimioterapia (indicação conforme norma vigente). Náuseas e vômitos pós-operatórios.',
    indications: `${MAIN}\n\nÊmese refratária. Êmese por quimioterapia (indicação conforme norma vigente). Náuseas e vômitos pós-operatórios.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Ampola 4–8 mg; comprimidos ODT.',
        dose: '4–8 mg E.V. lenta ou V.O. a cada 8 h.',
        administration: 'E.V. lenta ou V.O.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 8 mg; Ampolas: 8 mg',
        administration: 'V.O.; E.V.',
        diluent: 'SF 0,9%, SG 5%.',
        finalConcentration: '1 mg/mL.',
        infusionRate: 'Bolus de 2 a 5 minutos.',
        dose: 'Profilaxia de náuseas e vômitos induzidos por quimioterapia: Lactentes, crianças e adolescentes E.V./V.O.: 0,15 mg/kg/dose (5 mg/m²/dose); dose máxima 8 mg/dose a cada 8 h. Administrar a primeira dose 30 minutos antes de iniciar a infusão do citostático. Profilaxia de náuseas e vômitos pós-operatórios: E.V.: 1 mês a 12 anos e < 40 kg: 0,1 mg/kg/dose, > 40 kg e adultos: 4 mg/dose. Ajustar a dose em insuficiência hepática (apenas uma dose por dia). Gastroenterite aguda: > 6 meses 8 kg a 15 kg: 2 mg; 15 kg a 30 kg: 4 mg; > 30 kg: 8 mg. A dose pode ser repetida somente se ocorrer vômito nos primeiros 15 minutos após a administração.',
        compatibility: 'Incompatível com aciclovir, ampicilina, aminofilina, furosemida, ganciclovir, lorazepam, metilprednisolona e piperacilina.',
        notes: 'Proteger da luz; não administrar na mesma seringa ou infusão com outro medicamento. Administrar em push 2–5 min ou por infusão diluída em SG 5% ou SF em 15 minutos. Metabolizado pelo citocromo P-450. Verificar a normalidade do ECG antes do tratamento pelo aumento do intervalo QT em doses altas e evitar o uso concomitante com fármacos cardiotóxicos.',
      },
      neonatal: {
        dose: '0,1 mg/kg E.V. a cada 8 h conforme protocolo.',
        administration: 'E.V. lenta.',
      },
    },
    stability: '## Geral\n\n- E.V. compatível em SF e SG.\n\n## Guia pediátrica\n\n- Descartar o sobrante após aberto.',
    adverseEffects: '## Efeitos adversos\n\nCefaleia, constipação, fadiga, reações de hipersensibilidade imediata (urticária, angioedema, hipotensão, broncoespasmo, dispneia, anafilaxia), prolongamento do intervalo QTc, tontura, febre.',
    bibliography: [BIB.garrahan('Ondansetrón', ' (cód. 0502, ATC A04AA)'), BIB.aha, BIB.pedGuide, BIB.anmat, BIB.sccm, BIB.aap],
  },
  {
    id: 'los-001', name: 'Losartana', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Hipertensão. Antagonista da angiotensina II.',
    indications: `${MAIN}\n\nHipertensão. Antagonista da angiotensina II.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 50 e 100 mg.',
        dose: '50–100 mg/dia V.O. em 1–2 tomadas. Pode ser combinado com diurético.',
        administration: 'V.O. com ou sem alimentos.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 50 mg; Suspensão (preparado magistral): 2,5 mg/mL',
        administration: 'V.O.',
        dose: 'Hipertensão: > 6 anos: 0,75 mg/kg, uma vez por dia, dose máxima: 50 mg/dia. Adultos: inicial: 50 mg/dia, uma vez por dia; manutenção: 25 a 100 mg a cada 12–24 h. Em insuficiência hepática iniciar com 25 mg uma vez por dia.',
        notes: 'Evitar o uso concomitante de outros inibidores do sistema renina-angiotensina.',
      },
    },
    stability: '## Estabilidade\n\n- Conservar conforme bula em temperatura ambiente.',
    adverseEffects: '## Efeitos adversos\n\nHipotensão, diarreia, astenia, tontura, fadiga. Trombocitopenia, rabdomiólise, angioedema.',
    bibliography: [BIB.garrahan('loSARTÁN potásico', ' (cód. 1429, ATC C09CA)'), BIB.heartHtn, BIB.anmat, BIB.sac, BIB.aap],
  },
  {
    id: 'war-001', name: 'Varfarina', version: '1.0.1', updatedAt: '2026-07-10',
    executiveSummary: 'Antagonista da vitamina K. Anticoagulante.',
    indications: `${MAIN}\n\nAntagonista da vitamina K. Anticoagulante.\n\n${ADJUST}`,
    dilution: {
      adulto: {
        presentation: 'Comprimidos 5 mg (e outras concentrações).',
        dose: 'Dose inicial 5 mg/dia V.O.; ajustar conforme INR objetivo.',
        administration: 'V.O. no mesmo horário diariamente.',
      },
      pediatrico: {
        presentation: 'Comprimidos: 1–2 mg; Suspensão (preparado magistral): 1 mg/mL',
        administration: 'V.O.',
        dose: 'Conforme indicação do especialista (de acordo com o INR esperado). Administrar uma vez por dia.',
        notes: 'Usar com precaução em pacientes com trauma, infecção aguda, insuficiência renal moderada a grave e hipertensão moderada a leve. Contraindicado em pacientes com tendência a hemorragias (úlceras gástricas, aneurismas cerebrais, sistema nervoso central, grandes cirurgias, bloqueio peridural regional). Monitorar a resposta em pacientes com insuficiência hepática; pode ser marcadamente aumentada em icterícia obstrutiva devido à absorção reduzida de vitamina K e em pacientes com cirrose e/ou hepatite.',
      },
      neonatal: {
        dose: 'Uso muito restrito; esquemas cardiológicos neonatais.',
        administration: 'V.O.',
      },
    },
    stability: '## Estabilidade\n\n- Comprimidos na embalagem original.',
    adverseEffects: '## Efeitos adversos\n\nHemorragias em distintos órgãos, sangramento, cianose nos calcanhares, vasculite, tontura, fadiga, febre, cefaleia, parestesias, dermatite, gangrena da pele ou outros tecidos, necrose cutânea, dor abdominal, hematúria, colestase.',
    bibliography: [BIB.garrahan('Warfarina*', ' (cód. 1715, ATC B01AA)'), BIB.aha, BIB.anmat, BIB.sccm, BIB.aap],
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
console.log(`\npt-BR Garrahan lote 21 (parte A): ${drugs.length}`);
