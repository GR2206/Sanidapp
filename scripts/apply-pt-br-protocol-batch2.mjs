#!/usr/bin/env node
/** Lote 2/5 — 8 protocolos adulto pt-BR desde español revisado (formato, estilo y valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_BASE = path.join(__dirname, '../content/locales/pt-BR/categories');

const protocols = [
  {
    id: 'pad-001',
    category: 'adulto',
    title: 'Dor, agitação e delirium em adulto crítico (PADIS)',
    version: '1.1',
    executiveSummary:
      'Avaliar dor de forma sistemática, minimizar sedação, prevenir delirium e favorecer mobilização precoce e sono respeitoso.',
    body: `## Passos a realizar

1. Avaliar dor a cada turno com EVA, ESCID ou BPS conforme estado de consciência.
2. Avaliar sedação com escala RASS e delirium com CAM-ICU ou ICDSC.
3. Administrar analgesia multimodal; evitar sedação como monoterapia da dor.
4. Manter objetivo RASS 0 a −1 na maioria; realizar interrupção diária de sedação se indicada.
5. Aplicar medidas não farmacológicas de delirium: reorientação, presença de familiar, ciclo luz-escuridão, minimizar ruído noturno.
6. Sentar e mobilizar conforme tolerância e prescrição.
7. Agrupar cuidados e reduzir alarmes desnecessários no horário noturno.
8. Revisar fármacos delirógenos: anticolinérgicos, benzodiazepínicos e opioides.
9. Registrar escalas, intervenções e resposta a cada turno.

## Fundamentação científica

### Indicações

Conjunto de recomendações para **P**ain (dor), **A**gitation/Sedation (agitação/sedação), **D**elirium (delirium), **I**mmobility (imobilidade) e **S**leep disruption (disrupção do sono) em pacientes críticos adultos (marco PADIS).

### Ferramentas de avaliação

| Domínio | Ferramenta sugerida |
| --- | --- |
| Dor | EVA / ESCID / BPS conforme estado de consciência |
| Sedação | RASS (Richmond Agitation-Sedation Scale) |
| Delirium | CAM-ICU ou ICDSC |

### Evidência e recomendações

> **PADIS Guidelines (Devlin et al. 2018):** Avaliação sistemática de dor, sedação e delirium; minimizar benzodiazepínicos; favorecer mobilização precoce.

> **SATI:** Tradução oficial ao espanhol das diretrizes PADIS para uso à beira do leito em UTI.

### Complicações

- Delirium prolongado e deterioração cognitiva.
- Sedação excessiva com prolongação da ventilação mecânica.
- Dor não tratada com agitação e complicações hemodinâmicas.
- Imobilidade com fraqueza adquirida na UTI.`,
    bibliography: [
      {
        citation:
          'Devlin JW, Skrobik Y, Gélinas C, et al. Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU (PADIS). Crit Care Med. 2018;46(9):e825-e873.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30113379/',
      },
      {
        citation:
          'SATI — Guias de prática clínica para a prevenção e o manejo da dor, agitação/sedação e delirium (tradução oficial ao espanhol).',
        url: 'https://www.sati.org.ar/guias-de-practica-clinica-para-la-prevencion-y-el-manejo-del-dolor/',
      },
      {
        citation: 'Society of Critical Care Medicine — PADIS Guidelines.',
        url: 'https://www.sccm.org/clinical-resources/guidelines',
      },
      {
        citation: 'SATI — Guias e consensos gerais.',
        url: 'https://www.sati.org.ar/guias/',
      },
    ],
  },
  {
    id: 'pam-001',
    category: 'adulto',
    title: 'Colocação de linha arterial (PAM)',
    version: '1.1',
    executiveSummary:
      'Canalizar cateter arterial para monitorização invasiva da pressão arterial média (PAM), com teste de Allen favorável, técnica de Seldinger estéril e sistema transdutor calibrado ao eixo flebostático.',
    body: `## Passos a realizar

1. Identificar o paciente e verificar coagulação se aplicável; realizar **teste de Allen** favorável antes de canalizar artéria radial.
2. Realizar higienização das mãos e barreira estéril; posicionar o punho estendido sobre suporte e palpar pulso arterial.
3. Desinfetar a pele com clorexidina alcoólica; **deixar secar**.
4. Puncionar a 30–45° até refluxo **pulsátil**; introduzir guia, retirar agulha e avançar cateter sobre guia (técnica de Seldinger).
5. Retirar guia; conectar a sistema pré-purgado **sem bolhas**.
6. Fixar cateter com sutura ou dispositivo adesivo; aplicar curativo transparente.
7. Conectar transdutor; colocar ao **nível do eixo flebostático** (4º espaço intercostal, linha axilar média).
8. Realizar **zero** do transdutor com o paciente em posição padrão.
9. Confirmar onda arterial no monitor e leitura de PAM coerente com a clínica.
10. Ajustar pressurizador a **300 mmHg** para fluxo contínuo (3 ml/h conforme protocolo).
11. Vigiar a cada turno ponto de inserção, perfusão distal (cor, temperatura, pulso) e curativo.
12. Realizar zero no início do turno, após mobilização ou leituras duvidosas; retirar ao finalizar indicação ou diante de isquemia/infecção.

## Fundamentação científica

### Indicações

- Instabilidade hemodinâmica ou choque (sepse, hemorrágico, etc.).
- Uso de fármacos vasoativos que requerem titulação estreita.
- Necessidade de gasometrias arteriais frequentes.
- Monitorização de PAM objetivo em UTI ou perioperatório crítico.

A **monitorização invasiva da pressão arterial (PAI)** permite registrar de forma contínua a pressão sistólica, diastólica e **média (PAM)**, além de facilitar gasometrias arteriais seriadas.

### Seleção do sítio

| Ordem | Sítio | Notas |
| --- | --- | --- |
| 1ª opção | **Artéria radial** | Acessível; requer **teste de Allen** favorável |
| 2ª opção | Artéria pediosa dorsal | Alternativa com circulação colateral |
| Urgência / choque | **Femoral** | Maior risco infeccioso; avaliar retirada precoce |
| Evitar se possível | Braquial / ulnar | Circulação colateral limitada |

### Teste de Allen (antes da radial)

1. Comprimir ambas as artérias radial e ulnar simultaneamente.
2. O paciente abre e fecha a mão até palidez.
3. Soltar a ulnar: a mão deve **reperfundir em < 10 segundos**.
4. Se anormal, escolher outro sítio ou solicitar avaliação médica.

### Evidência e recomendações

> **Surviving Sepsis Campaign 2021:** No choque séptico, a PAM é um objetivo de perfusão (usualmente ≥ 65 mmHg).

> **Scheer et al. 2002:** Complicações de cateteres arteriais periféricos; vigilância da perfusão distal é essencial.

### Material

- Kit de cateter arterial (calibre 20 G radial habitual).
- Técnica de **Seldinger**: agulha, guia, dilatador, cateter.
- Clorexidina alcoólica 0,5–2%.
- Sistema fechado: transdutor, pressurizador (300 mmHg), SF contínuo.

> Se a inserção foi de urgência sem assepsia ótima, recanalizar em sítio distinto dentro de **48 h** conforme protocolo institucional.

### Complicações — comunicar imediatamente

- Palidez, dor ou parestesias distais (isquemia).
- Sangramento ativo ou hematoma em expansão.
- Onda amortecida ou damping (bolhas, coágulos, malposição).
- Febre ou eritema no sítio de inserção (suspeita de infecção).`,
    bibliography: [
      {
        citation: 'Evans L, et al. Surviving Sepsis Campaign 2021 — objetivos hemodinâmicos e monitorização na sepse.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34605781/',
      },
      {
        citation:
          'World Health Organization. Guidelines for prevention of BSI associated with intravascular catheters — Part 2 (CVC/ações assépticas aplicáveis). WHO, 2024.',
        url: 'https://www.who.int/publications/i/item/9789240121805',
      },
      {
        citation:
          'Cornistein W, et al. Infecciones asociadas a catéteres venosos centrales. Actualización SATI/SADI 2025 (princípios de prevenção em dispositivos intravasculares).',
        url: 'https://www.scielo.org.ar/scielo.php?pid=S0025-76802025001001337&script=sci_arttext',
      },
      {
        citation:
          'Scheer BV, Perel A, Pfeiffer UJ, et al. Clinical review: Complications and risk factors of peripheral arterial catheters used for hemodynamic monitoring in anesthesia and intensive care medicine. Crit Care. 2002.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12493067/',
      },
    ],
  },
  {
    id: 'ret-001',
    category: 'adulto',
    title: 'Coleta de retrocultura de cateter',
    version: '1.1',
    executiveSummary:
      'Obter hemocultura pareada (periférica + retrocultura por cada via) de forma simultânea, com igual volume e desinfecção estrita do hub, para diagnosticar bacteremia associada ao cateter sem retirá-lo.',
    body: `## Passos a realizar

1. Identificar paciente, cateter, via e suspeita clínica de bacteremia associada ao cateter (BAC).
2. Realizar higienização das mãos (momento 2 OMS); preparar frascos e etiquetas (**PERIFÉRICO** / **CVC via X**) antes da punção.
3. Coletar hemocultura periférica em extremidade **distinta** à do cateter com técnica asséptica padrão (ver \`hem-001\`).
4. **Simultaneamente ou imediatamente:** retirar curativo se impedir acesso; desinfetar hub com clorexidina alcoólica (fricção ≥ 15 s); deixar secar.
5. Coletar sangue do cateter com seringa ou sistema estéril; **mesmo volume** que o periférico (10–15 ml adulto).
6. Inocular frascos conforme sistema (vácuo: aeróbico primeiro; seringa: anaeróbico primeiro); misturar por inversão suave.
7. Repetir para cada via se o cateter for multilúmen (etiquetar cada uma).
8. Introduzir todos os frascos no equipamento de hemocultura **ao mesmo tempo**.
9. Registrar hora exata de cada coleta, via amostrada, dias de cateter instalado e antibióticos em curso.
10. Realizar higienização das mãos ao finalizar; comunicar resultado positivo ou deterioração clínica imediatamente.

## Fundamentação científica

### Indicações

Suspeita de **bacteremia associada a cateter venoso central (BAC)** em paciente com:

- Febre, calafrios ou instabilidade hemodinâmica sem foco claro.
- Portador de CVC, PICC ou cateter de diálise.
- Necessidade de **conservar o cateter** ou avaliar origem antes de retirá-lo.

Complementa o protocolo de **coleta de hemocultura** (\`hem-001\`). A retrocultura coleta-se **ao mesmo tempo** que a hemocultura periférica.

### Quando NÃO realizar retrocultura de rotina

- Cateter inserido **há menos de 48 horas**, salvo suspeita de falha asséptica na inserção.
- Baixa suspeita clínica de BAC (aumenta falsos positivos).
- Sem hemocultura periférica pareada simultânea.

### Princípio diagnóstico (interpretação pelo laboratório)

| Método | Critério sugestivo de BAC |
| --- | --- |
| **Tempo diferencial de positividade** | Retrocultura positiva **≥ 2 horas antes** que a periférica (mesmo germe e antibiograma) |
| **Quantitativo** | Relação retrocultura/periférica **≥ 3:1** em contagem de colônias |
| **Cultura da ponta** | Mesmo germe na ponta (Maki ≥ 15 UFC) e hemocultura periférica |

### Evidência e recomendações

> **SATI/SADI 2025 (Cornistein et al.):** Retrocultura pareada com igual volume e desinfecção estrita do hub para diagnóstico de BAC sem retirada obrigatória do cateter.

> **Surviving Sepsis 2021:** Culturas antes de antibióticos na sepse se não retardar tratamento.

### Conduta posterior (referência clínica)

- Se BAC confirmada: avaliar **retirada do cateter** conforme gravidade, microorganismo e necessidade do acesso.
- Iniciar ou ajustar antibiótico empírico conforme protocolo institucional e SATI/SADI 2025.
- Não interpretar isolamento de flora cutânea (SCN) sem correlação clínica e tempo diferencial.

### Complicações / erros frequentes

- Desinfecção insuficiente do hub → **falso positivo**.
- Volume desigual → invalida tempo diferencial.
- Demora na incubação → enviesa resultados.
- Não etiquetar via → impossível identificar foco.`,
    bibliography: [
      {
        citation:
          'Cornistein W, et al. Infecciones asociadas a catéteres venosos centrales. Actualización y recomendaciones intersociedades 2025. Medicina (B Aires). (SATI / SADI).',
        url: 'https://www.scielo.org.ar/scielo.php?pid=S0025-76802025001001337&script=sci_arttext',
      },
      {
        citation:
          'SATI — Revista Medicina Intensiva. Diagnóstico de bacteriemia asociada a catéter: tiempo diferencial de positividad y métodos microbiológicos.',
        url: 'https://revista.sati.org.ar/index.php/MI/article/view/661',
      },
      {
        citation: 'SATI — Coleta de amostras microbiológicas em UTI (hemoculturas e suspeita de infecção de cateter).',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
      {
        citation: 'Evans L, et al. Surviving Sepsis Campaign 2021 — culturas antes de antibióticos na sepse.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34605781/',
      },
    ],
  },
  {
    id: 'sep-001',
    category: 'adulto',
    title: 'Sepse em adulto',
    version: '1.2',
    executiveSummary:
      'Identificar precocemente a sepse, iniciar antibiótico na primeira hora, medir lactato e monitorizar perfusão e função respiratória.',
    body: `## Passos a realizar

1. Diante de suspeita clínica, ativar o protocolo institucional de sepse e comunicar à equipe médica imediatamente.
2. Iniciar monitorização contínua: FC, PA, FR, SpO₂, temperatura e diurese.
3. Administrar oxigenoterapia para manter SpO₂ ≥ 92% (ajustar conforme comorbidades).
4. Canalizar acesso vascular periférico e, se necessário, central.
5. Coletar culturas **antes** do antibiótico somente se não retardar seu início.
6. Administrar antibiótico de amplo espectro empírico na **primeira hora** desde o reconhecimento.
7. Solicitar lactato sérico; repetir se o valor inicial for > 2 mmol/L.
8. Infundir cristaloides guiados pela resposta hemodinâmica se houver hipoperfusão.
9. Reavaliar o paciente a cada 30–60 minutos: perfusão, balanço hídrico e resposta ao tratamento.
10. Registrar tempos críticos (reconhecimento, culturas, antibiótico, fluidos) e comunicar deterioração imediatamente.

## Fundamentação científica

### Indicações

Síndrome de disfunção orgânica potencialmente fatal causada por resposta desregulada do hospedeiro à infecção (definição Sepsis-3).

### Critérios de suspeita (enfermagem / primeiro contato)

- Alteração do estado mental, febre ou hipotermia.
- Taquicardia, taquipneia ou hipotensão.
- Oligúria, má perfusão periférica ou lactato elevado.
- Foco infeccioso provável (respiratório, urinário, abdominal, pele, dispositivos).

### Evidência e recomendações

> **Surviving Sepsis Campaign 2021 (Evans et al.):** Diante de suspeita de sepse, não retardar antibiótico nem reanimação por exames complementares. Obter culturas antes do antibiótico se não retardar seu início por mais de 45 minutos.

> **SATI — Comitê de Infectologia Crítica:** A detecção precoce e o cumprimento do bundle de sepse (culturas, antibiótico, lactato, fluidos) são responsabilidade transversal da equipe, com papel central da enfermagem na vigilância e registro.

### Papel da enfermagem

- Detecção precoce e registro sistemático de sinais de alarme.
- Cumprimento dos bundles de sepse (culturas, antibiótico, lactato, fluidos).
- Vigilância de perfusão, balanço hídrico e resposta ao tratamento.
- Comunicação imediata à equipe médica diante de deterioração.

### Complicações

- Choque séptico refratário.
- Insuficiência respiratória aguda.
- Lesão renal aguda e disfunção multissistêmica.
- Atraso no antibiótico ou reanimação volêmica inadequada.`,
    bibliography: [
      {
        citation:
          'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34605781/',
      },
      {
        citation: 'Surviving Sepsis Campaign — Guias e recursos oficiais.',
        url: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines',
      },
      {
        citation: 'Sociedade Argentina de Terapia Intensiva (SATI). Comitê de Infectologia Crítica — Guias e consensos.',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
      {
        citation:
          'Rhodes A, Evans LE, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016. Intensive Care Med. 2017;43(3):304-377.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28101605/',
      },
    ],
  },
  {
    id: 'sho-001',
    category: 'adulto',
    title: 'Choque séptico: reanimação inicial',
    version: '1.1',
    executiveSummary:
      'Diante de choque séptico, iniciar reanimação com cristaloides, antibiótico precoce e vasopressores se persistir hipotensão após volume, com monitorização estreita.',
    body: `## Passos a realizar

1. Assegurar via aérea, ventilação e oxigenação adequadas.
2. Canalizar duas vias periféricas de grosso calibre; acesso central se necessário.
3. Infundir cristaloides balanceados 30 ml/kg em bolus, reavaliando resposta hemodinâmica.
4. Administrar antibiótico de amplo espectro na primeira hora desde o reconhecimento.
5. Coletar hemoculturas e culturas de foco antes do antibiótico se não retardar seu início.
6. Iniciar noradrenalina como vasopressor de primeira linha se a hipotensão persistir após fluidos.
7. Monitorizar PAM invasiva se disponível, diurese horária e lactato seriado.
8. Preparar e administrar fluidos e drogas vasoativas com bomba de infusão conforme prescrição.
9. Vigiar extravasamento, perfusão periférica e sinais de sobrecarga hídrica.
10. Registrar tempos críticos: reconhecimento, antibiótico, início de fluidos e vasopressores.

## Fundamentação científica

### Indicações

Sepse com necessidade de vasopressores para manter PAM ≥ 65 mmHg e lactato > 2 mmol/L apesar de reanimação inicial adequada (definição operativa de choque séptico).

### Objetivos de reanimação (primeiras 3–6 horas)

| Parâmetro | Objetivo inicial |
| --- | --- |
| PAM | ≥ 65 mmHg |
| Lactato | Redução ≥ 10% em 2–4 h se elevado |
| Diurese | ≥ 0,5 ml/kg/h (se não tiver IRA prévia) |
| SpO₂ | ≥ 92% ou conforme prescrição |

### Evidência e recomendações

> **Surviving Sepsis Campaign 2021:** Reanimação com cristaloides balanceados, antibiótico precoce e noradrenalina como vasopressor de primeira linha. A reanimação guiada por objetivos dinâmicos pode requerer avaliação médica avançada conforme recursos do serviço.

### Papel da enfermagem

- Preparar e administrar fluidos e drogas vasoativas conforme prescrição com bomba de infusão.
- Vigiar extravasamento, perfusão periférica e sinais de sobrecarga hídrica.
- Registrar tempos críticos: reconhecimento, antibiótico, início de fluidos e vasopressores.

### Complicações

- Sobrecarga hídrica e edema pulmonar.
- Extravasamento de vasopressores.
- Arritmias por eletrólitos ou fármacos.
- Disfunção multissistêmica refratária.`,
    bibliography: [
      {
        citation:
          'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34605781/',
      },
      {
        citation:
          'Rhodes A, Evans LE, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock: 2016. Intensive Care Med. 2017;43(3):304-377.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28101605/',
      },
      {
        citation: 'SATI — Guias e consensos da Sociedade Argentina de Terapia Intensiva.',
        url: 'https://www.sati.org.ar/guias/',
      },
      {
        citation: 'Surviving Sepsis Campaign — Guias e recursos oficiais.',
        url: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines',
      },
    ],
  },
  {
    id: 'son-001',
    category: 'adulto',
    title: 'Colocação de sonda vesical',
    version: '1.1',
    executiveSummary:
      'Colocar sonda vesical somente com indicação justificada, com técnica estéril, calibre adequado, fixação segura e circuito fechado para prevenir ITU associada à sonda.',
    body: `## Passos a realizar

1. Verificar indicação e contraindicações; confirmar identidade do paciente e prescrição (tipo, calibre, duração prevista).
2. Realizar higienização das mãos e preparar kit estéril em superfície limpa.
3. Posicionar o paciente: decúbito dorsal, joelhos semiflexionados; em mulher separar lábios; em homem elevar pênis a 90°.
4. Desinfetar meato uretral com antisséptico em movimento circular do centro para a periferia; aguardar secagem se o protocolo indicar.
5. Colocar sonda com técnica estéril: lubrificar, introduzir suavemente sem forçar até retorno de urina clara.
6. Inflar balão com volume indicado (usualmente 10 ml água estéril, seguir fabricante).
7. Conectar a bolsa de drenagem em **circuito fechado**; evitar desconexões desnecessárias.
8. Fixar sonda sem tensão (coxa em mulher, abdome suprapúbico em homem).
9. Posicionar bolsa abaixo do nível da bexiga; não apoiar no chão.
10. Registrar hora, calibre, volume do balão, aspecto da urina inicial e responsável.
11. Reavaliar indicação da sonda a cada turno; retirar no primeiro momento clinicamente possível.

## Fundamentação científica

### Indicações

- Retenção urinária aguda com dor ou risco de dano renal.
- Monitorização estrita de diurese em paciente crítico.
- Manejo de incontinência em úlcera por pressão ou cuidados terminais (conforme protocolo institucional).
- Cirurgia urológica ou pélvica conforme prescrição.

### Contraindicações relativas

- Trauma uretral suspeito ou confirmado.
- Estenose uretral não resolvida.
- Procedimento em curso pela urologia (coordenar).

### Material

- Kit de sondagem vesical estéril (número conforme prescrição).
- Gel lubrificante hidrossolúvel estéril.
- Antisséptico (clorexidina alcoólica ou povidona iodada conforme protocolo).
- Campo estéril, luvas estéreis.
- Sistema de drenagem fechado e fixador não compressivo.

### Evidência e recomendações

> **SATI/SADI 2024 (Cornistein et al.):** Não colocar sonda de rotina. Reavaliar necessidade diariamente e retirar no primeiro momento clinicamente possível para prevenir ITU-SV.

> **SHEA/IDSA 2022 (Lo et al.):** Bundle de prevenção de ITU associada a cateter urinário.

### Cuidados posteriores

- Manter higiene perineal diária com água e sabão; não usar antissépticos de rotina no meato.
- Vigiar obstrução, vazamentos, hematúria, dor suprapúbica ou febre.
- Não trocar sonda nem bolsa de forma rotineira; somente conforme obstrução, desconexão ou protocolo institucional.

### Complicações — interromper e comunicar

- Impossibilidade de passar a sonda ou sangramento uretral abundante.
- Urina turva purulenta com febre (suspeita ITU-SV).
- Ausência de diurese com dor abdominal (obstrução ou erro de colocação).`,
    bibliography: [
      {
        citation:
          'Cornistein W, Nuccetelli Y, Rodríguez VM, et al. Infección urinaria asociada a sonda vesical. Actualización y recomendaciones intersociedades 2024. Medicina (B Aires). 2025;85(2):1-15. (SATI / SADI).',
        url: 'https://www.medicinabuenosaires.com/revistas/vol85-25/n2/348.pdf',
      },
      {
        citation:
          'Cornistein W, et al. Catheter associated urinary tract infection: Update and intersociety recommendations, 2024. Revista Argentina de Terapia Intensiva (SATI).',
        url: 'https://revista.sati.org.ar/index.php/MI/en/article/view/980',
      },
      {
        citation: 'SATI — Comitê de Infectologia Crítica. Guias e consensos (ITU-SV, prevenção de IRAS).',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
      {
        citation:
          'Lo E, Nicolle LE, Coffin SE, et al. Strategies to Prevent Catheter-Associated Urinary Tract Infections in Acute Care Hospitals: 2022 Update. Infect Control Hosp Epidemiol. 2022.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36062715/',
      },
    ],
  },
  {
    id: 'vic-001',
    category: 'adulto',
    title: 'Colocação de via central',
    version: '1.1',
    executiveSummary:
      'Inserir cateter venoso central com barreira de esterilidade máxima, preparação cutânea com clorexidina, guia ecográfica quando disponível e bundle de prevenção de bacteremia associada ao cateter (BAC).',
    body: `## Passos a realizar

1. Verificar consentimento, alergias e exames de coagulação conforme protocolo.
2. Preparar carro de parada e material de barreira estéril completa.
3. Posicionar paciente (Trendelenburg leve se jugular/subclávia conforme indicação).
4. Realizar higienização das mãos e usar touca, máscara, avental estéril e luvas estéreis (barreira máxima).
5. Preparar pele com clorexidina alcoólica 0,5–2% em fricção, ampliando área ≥ 20 cm; **deixar secar**.
6. Auxiliar em técnica estéril; apoiar ultrassonografia em tempo real se o serviço a utilizar.
7. Conectar linhas em sistema fechado; purgar e fechar vias não usadas.
8. Fixar cateter com sutura ou dispositivo de sujeição; aplicar curativo transparente ou com clorexidina conforme protocolo.
9. Comprovar retorno venoso e fixação; solicitar radiografia ou ultrassonografia para confirmar ponta se o protocolo exigir.
10. Registrar sítio, calibre, vias, operador, complicações imediatas e hora; etiquetar datas de inserção.
11. Desinfetar hub com clorexidina alcoólica antes de cada acesso (fricção ≥ 15 s).
12. Reavaliar necessidade do cateter diariamente; retirar ao finalizar indicação ou diante de infecção/suspeita.

## Fundamentação científica

### Indicações

- Administração de fármacos vasoativos ou soluções hiperosmolares.
- Nutrição parenteral total.
- Hemodinâmica invasiva (PVC, VVC) em paciente crítico.
- Acesso venoso de longa duração quando não é possível ou adequado o acesso periférico.
- Diálise ou procedimentos de substituição renal (cateter específico).

### Seleção do sítio (adulto UTI)

| Sítio | Considerações |
| --- | --- |
| **Subclávia** | Menor risco infeccioso na UTI; maior risco mecânico (pneumotórax) |
| **Jugular interna** | Acesso ecoguiado preferido; vigilância de infecção e posição |
| **Femoral** | Evitar na UTI se houver alternativa (maior risco infeccioso e trombótico) |

A decisão final é **médica**, considerando anatomia, coagulação, urgência e experiência do operador.

### Evidência e recomendações

> **SATI/SADI 2025 (Cornistein et al.):** Colocar somente se indicado. Bundle de inserção e reavaliação diária da necessidade do cateter.

> **OMS 2024:** Barreira de esterilidade máxima e clorexidina alcoólica na pele para prevenção de BAC/CLABSI.

### Bundle de inserção (resumo)

1. Higienização das mãos.
2. Barreira de esterilidade máxima.
3. Antisséptico na pele (clorexidina alcoólica).
4. Seleção ótima do sítio.
5. Revisão diária da necessidade do cateter.

### Complicações — comunicar imediatamente

- Pneumotórax, hemotórax ou dificuldade respiratória aguda.
- Hemorragia local não controlada ou hematoma em expansão.
- Arritmias durante inserção.
- Febre ou sinais de infecção do sítio / suspeita de BAC.`,
    bibliography: [
      {
        citation:
          'World Health Organization. Guidelines for the prevention of bloodstream infections associated with central venous catheters — Part 2. WHO, 2024.',
        url: 'https://www.who.int/publications/i/item/9789240121805',
      },
      {
        citation:
          'Cornistein W, et al. Infecciones asociadas a catéteres venosos centrales. Actualización y recomendaciones intersociedades 2025. Medicina (B Aires). (SATI / SADI).',
        url: 'https://www.scielo.org.ar/scielo.php?pid=S0025-76802025001001337&script=sci_arttext',
      },
      {
        citation: 'SATI — Comitê de Infectologia Crítica. Guias e consensos (BAC, prevenção de IRAS).',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
      {
        citation:
          "O'Grady NP, Alexander M, Burns LA, et al. CDC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011.",
        url: 'https://www.cdc.gov/infection-control/hcp/guidance-guidelines/isp-intravascular-catheter.html',
      },
    ],
  },
  {
    id: 'vip-001',
    category: 'adulto',
    title: 'Colocação de via periférica',
    version: '1.1',
    executiveSummary:
      'Inserir cateter venoso periférico com técnica asséptica não tátil, antisséptico na pele, fixação adequada e retirada precoce se não for indispensável.',
    body: `## Passos a realizar

1. Identificar paciente, alergias e prescrição (calibre, tipo de solução).
2. Realizar higienização das mãos (técnica OMS) antes e após o procedimento.
3. Explicar ao paciente e posicionar extremidade estendida.
4. Aplicar torniquete 5–10 cm proximal ao sítio; palpar e selecionar veia.
5. Desinfetar pele com clorexidina alcoólica em fricção circular; **deixar secar completamente**.
6. Inserir cateter com técnica não tátil a 15–30° até retorno de sangue na câmara.
7. Retirar torniquete antes de avançar completamente se ainda estiver colocado.
8. Introduzir cateter, retirar agulha e conectar equipo fechado sem desconectar desnecessariamente.
9. Fixar com curativo transparente sem comprimir.
10. Registrar data, hora, sítio, calibre e número de tentativas.
11. Revisar a cada turno eritema, dor, edema, exsudato, flebite ou extravasamento.
12. Retirar quando finalizar tratamento ou diante de sinais de complicação; reavaliar necessidade diariamente.

## Fundamentação científica

### Indicações

- Administração de medicação ou fluidos IV.
- Coleta de amostras sanguíneas quando não há acesso alternativo.
- Contraste ou procedimentos conforme prescrição.
- Reanimação com acesso periférico de urgência.

### Seleção do sítio

| Preferência | Sítio |
| --- | --- |
| Primeira opção | Antebraço (veias basílica, cefálica ou mediana cefálica) |
| Alternativa | Dorso da mão (maior risco de flebite) |
| Evitar | Extremidade com fístula AV, linfedema, trombose ou infecção local |
| Evitar | Membro do lado com mastectomia radical (salvo indicação médica) |

### Material

- Cateter venoso periférico estéril (calibre conforme prescrição).
- Torniquete, antisséptico (clorexidina alcoólica 0,5–2% preferencial).
- Curativo transparente semipermeável estéril.
- Equipo de infusão estéril e recipiente para perfurocortantes.

### Evidência e recomendações

> **OMS 2024:** Guias para prevenção de septicemias por cateteres periféricos com técnica asséptica não tátil e clorexidina na pele.

> **CDC 2011 (O'Grady et al.):** Não trocar cateter de rotina; retirar quando não for mais indispensável.

### Critérios de retirada imediata

- Flebite, infiltração ou extravasamento.
- Suspeita de infecção do sítio ou bacteremia associada ao cateter.
- Mau funcionamento ou obstrução não resolvida.
- Cateter não mais indispensável.

### Complicações — comunicar imediatamente

- Extravasamento de fármaco vesicante ou irritante.
- Hematoma extenso ou sangramento persistente.
- Dor intensa, cianose distal ou perda de pulso.`,
    bibliography: [
      {
        citation:
          'World Health Organization. Guidelines for the prevention of bloodstream infections and other infections associated with the use of intravascular catheters — Part 1: Peripheral catheters. WHO, 2024.',
        url: 'https://www.who.int/publications/i/item/9789240080189',
      },
      {
        citation: 'OMS — Notícias: novas orientações para reduzir septicemias por cateteres (2024).',
        url: 'https://www.who.int/es/news-room/09-05-2024-new-guidance-aims-to-reduce-bloodstream-infections-from-catheter-use',
      },
      {
        citation:
          'SATI — Consenso interinstitucional: prevenção de infecções associadas a dispositivos (acessos vasculares).',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
      {
        citation:
          "O'Grady NP, Alexander M, Burns LA, et al. Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011. CDC / Healthcare Infection Control Practices Advisory Committee.",
        url: 'https://www.cdc.gov/infection-control/hcp/guidance-guidelines/isp-intravascular-catheter.html',
      },
    ],
  },
];

for (const p of protocols) {
  const out = {
    id: p.id,
    title: p.title,
    category: p.category,
    branch: 'atencion-sanitaria',
    version: p.version,
    executiveSummary: p.executiveSummary,
    body: p.body,
    bibliography: p.bibliography,
  };
  const dir = path.join(OUT_BASE, p.category, 'protocols');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${p.id}.json`), `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log(`✓ ${p.id}`);
}

console.log(`\nLote 2 protocolos: ${protocols.length} monografías pt-BR (adulto) — adulto COMPLETO`);
