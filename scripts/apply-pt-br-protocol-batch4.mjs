#!/usr/bin/env node
/**
 * Lote 4/5 — 5 protocolos pediátrico pt-BR finales desde español revisado.
 * CRÍTICO: peso, talla, edad y volúmenes idénticos al ES (sin redondear ni convertir).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_BASE = path.join(__dirname, '../content/locales/pt-BR/categories');

const protocols = [
  {
    id: 'ret-p001',
    category: 'pediatrico',
    title: 'Coleta de retrocultura de cateter pediátrico',
    version: '1.1',
    executiveSummary:
      'Obter hemocultura pareada (periférica + retrocultura por cada via) de forma simultânea, com igual volume conforme peso e desinfecção estrita do hub, para diagnosticar bacteremia associada ao cateter (BAC) sem retirá-lo.',
    body: `## Passos a realizar

1. Confirmar suspeita de BAC; identificar paciente, cateter, tipo e via(s) a amostrar.
2. Preparar frascos pediátricos idênticos e etiquetas (**PERIFÉRICO** / **CVC via 1**, etc.) antes de desconectar.
3. Explicar à família; organizar contenção e analgesia se requerer punção periférica.
4. Realizar higienização das mãos (momento 2 OMS).
5. Coletar hemocultura periférica em extremidade distinta ao cateter (técnica de \`hem-p001\`).
6. **Simultaneamente ou sem demora:** desinfetar hub com clorexidina alcoólica ≥ 15 s; deixar secar; não repassar.
7. Conectar seringa estéril; coletar sangue da via; inocular frasco com **o mesmo volume** que o periférico.
8. Repetir passos 6–7 para cada via se o cateter for multilúmen.
9. Introduzir todos os frascos no equipamento de hemocultura **ao mesmo tempo**.
10. Registrar hora exata, peso, volume por frasco, sítio periférico, via(s), dias de cateter e antibióticos em curso.
11. Realizar higienização das mãos ao finalizar; transportar imediatamente ao laboratório.

## Fundamentação científica

### Indicação

Suspeita de **bacteremia associada ao cateter (BAC)** em criança portadora de CVC, PICC, cateter umbilical ou diálise, com febre ou deterioração sem foco claro, quando se necessita conservar o cateter ou avaliar origem antes de retirá-lo.

Complementa \`hem-p001\`. A retrocultura deve ser coletada **ao mesmo tempo** que a hemocultura periférica (Cornistein et al., 2025; SATI, 2007).

### Quando NÃO realizar

- Cateter < 48 h instalado (salvo falha asséptica na inserção).
- Baixa suspeita clínica (aumenta falsos positivos por flora cutânea).
- Sem hemocultura periférica pareada simultânea.
- Cateter umbilical: seguir protocolo neonatológico específico.

### Princípio diagnóstico

| Método | Critério sugestivo de BAC |
| --- | --- |
| Tempo diferencial | Retrocultura positiva ≥ 2 h antes que periférica (mesmo germe) |
| Quantitativo | Relação retrocultura/periférica ≥ 3:1 |
| Cultura da ponta | Mesmo germe (Maki ≥ 15 UFC) e hemocultura periférica |

### Volume pareado conforme peso

| Peso | Volume por frasco (periférico = retrocultura) |
| --- | --- |
| < 1 kg | 0,5–1 ml |
| 1–5 kg | 1–3 ml |
| 5–10 kg | 3–5 ml |
| 10–20 kg | 5–10 ml |
| > 20 kg | 10–15 ml |

Volume desigual invalida o tempo diferencial.

### Conduta posterior

- BAC confirmada: avaliar retirada do cateter conforme gravidade, microorganismo e necessidade do acesso.
- Não interpretar flora cutânea (SCN) sem correlação clínica e tempo diferencial.
- Na sepse grave: não retardar antibiótico (SSC Pediátrico 2026).

### Erros frequentes

- Desinfecção insuficiente do hub → falso positivo.
- Demora na incubação → enviesa resultados.
- Extração excessiva em RN → anemia iatrogênica.`,
    bibliography: [
      {
        citation:
          'Cornistein W, et al. Infecciones asociadas a catéteres venosos centrales. Actualización y recomendaciones intersociedades 2025. Medicina (B Aires). (SATI / SADI).',
        url: 'https://www.scielo.org.ar/scielo.php?pid=S0025-76802025001001337&script=sci_arttext',
      },
      {
        citation: 'SATI — Revista Medicina Intensiva. Diagnóstico de bacteriemia asociada a catéter: tiempo diferencial de positividad.',
        url: 'https://revista.sati.org.ar/index.php/MI/article/view/661',
      },
      {
        citation: 'SATI — Coleta de amostras microbiológicas em UTI (hemoculturas e suspeita de infecção de cateter).',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
      {
        citation: 'Weiss SL, et al. Surviving Sepsis Campaign Pediatric Guidelines 2026 — culturas e manejo de BAC.',
        url: 'https://sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-pediatric-guidelines',
      },
      {
        citation: 'Guia de prática clínica de enfermagem sobre hemoculturas — volumes pediátricos pareados.',
        url: 'https://www.consejogeneralenfermeria.org/profesion/guias-clinicas/send/160-guias-clinicas/3122-guia-de-practica-clinica-enfermera-sobre-hemocultivos-actualizacion',
      },
      {
        citation: 'SATI — Comitê de Infectologia Crítica. Guias e consensos.',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
    ],
  },
  {
    id: 'sep-p001',
    category: 'pediatrico',
    title: 'Sepse pediátrica',
    version: '1.1',
    executiveSummary:
      'Reconhecer sepse com critérios Phoenix (disfunção orgânica ≥ 2 pontos), iniciar antibiótico precoce e reanimação guiada por perfusão nos primeiros 60 minutos.',
    body: `## Passos a realizar

1. **Ativar protocolo de sepse** e comunicar à equipe médica imediatamente diante de suspeita clínica.
2. Instalar **monitorização contínua** e assegurar via aérea conforme gravidade do paciente.
3. Administrar **oxigenoterapia** para manter SpO₂ na faixa objetivo.
4. Canalizar **acesso vascular**; coletar **hemoculturas** antes do antibiótico se não retardar seu início.
5. Administrar **antibiótico empírico** de amplo espectro de forma precoce (primeira hora).
6. Iniciar **reanimação com cristaloides** em bolus guiados pela resposta (10–20 ml/kg); reavaliar após cada bolus e repetir se indicado.
7. Solicitar **lactato sérico** e realizar **controle de glicemia**.
8. Calcular e administrar bolus com **precisão conforme peso**; vigiar sinais de sobrecarga hídrica ou deterioração respiratória.
9. Preparar **drogas vasoativas em bomba** se o médico indicar.
10. **Registrar horários** críticos: reconhecimento, culturas, antibiótico, fluidos.
11. Manter **comunicação estreita com a família** e coordenar encaminhamento à UTI se proceder.

## Fundamentação científica

### Definição (Phoenix Sepsis Score)

- **Sepse pediátrica:** infecção suspeita ou confirmada com disfunção orgânica potencialmente fatal (**Phoenix ≥ 2 pontos**).
- **Choque séptico:** sepse com componente cardiovascular alterado (hipotensão, lactato elevado ou necessidade de vasoativos).

Sistemas avaliados: respiratório, cardiovascular, coagulação, neurológico.

### Reconhecimento em enfermagem

- Febre ou hipotermia com alteração do estado mental ou perfusão.
- Taquicardia ou bradicardia fora da faixa etária.
- Taquipneia, necessidade de oxigênio ou ventilação.
- Má perfusão: tempo de enchimento capilar prolongado, pulsos fracos, pele mosqueada.
- Oligúria.

> Ativar protocolo de sepse e equipe médica imediatamente.

### Papel da enfermagem

- Cálculo e administração precisa de bolus por peso.
- Vigilância de sinais de sobrecarga hídrica ou deterioração respiratória.
- Preparação de drogas vasoativas em bomba se indicadas.
- Comunicação estreita com família.

### Critérios de encaminhamento à UTI pediátrica

- Necessidade de vasoativos ou ventilação mecânica.
- Disfunção orgânica múltipla.
- Choque refratário a fluidos.`,
    bibliography: [
      {
        citation:
          'Weiss SL, Peters MJ, et al. Surviving Sepsis Campaign International Guidelines for the Management of Sepsis and Septic Shock in Children 2026.',
        url: 'https://sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-pediatric-guidelines',
      },
      {
        citation:
          'Schlapbach LJ, Watson RS, et al. International Consensus Criteria for Pediatric Sepsis and Septic Shock (Phoenix Sepsis Score). JAMA. 2024.',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10900966/',
      },
      {
        citation: 'SLACIP / ILAS — Consenso Latinoamericano de manejo de sepse em crianças (documento SATI).',
        url: 'https://www.sati.org.ar/wp-content/uploads/10-Consenso-LATAM-SLACIP-Sepsis-Espanol-Acta-Ped-Mex-Marzo-2022.pdf',
      },
      {
        citation: 'SATI — Pediatria.',
        url: 'https://www.sati.org.ar/pediatria/',
      },
    ],
  },
  {
    id: 'son-p001',
    category: 'pediatrico',
    title: 'Colocação de sonda vesical pediátrica',
    version: '1.1',
    executiveSummary:
      'Colocar sonda vesical em criança somente com indicação justificada, técnica estéril, calibre conforme idade, contenção segura e circuito fechado para prevenir ITU associada à sonda.',
    body: `## Passos a realizar

1. Verificar indicação, identificar o paciente (dois identificadores) e confirmar prescrição (tipo de sonda, calibre, duração prevista).
2. Explicar o procedimento à família; organizar contenção terapêutica segura (mínimo duas pessoas) e avaliar analgesia.
3. Realizar higienização das mãos (momento 2 OMS) e abrir kit estéril em superfície limpa.
4. Posicionar a criança: menina em decúbito dorsal com pernas em posição de rã; menino em dorsal com pênis a 90°.
5. Desinfetar o meato uretral com antisséptico do centro para a periferia; aguardar secagem conforme protocolo.
6. Lubrificar a sonda 2–3 cm e introduzir suavemente sem forçar até obter retorno de urina clara.
7. Inflar o balão com o volume indicado pelo fabricante conforme calibre.
8. Conectar a bolsa de drenagem em circuito fechado; fixar a sonda sem tensão na coxa ou abdome.
9. Colocar a bolsa abaixo do nível da bexiga; não apoiá-la no chão.
10. Registrar hora, calibre, volume do balão, aspecto da urina inicial e responsável.
11. Vigiar a cada turno obstrução, vazamentos, hematúria, febre ou irritabilidade; reavaliar necessidade da sonda diariamente.

## Fundamentação científica

### Indicações

- Retenção urinária aguda com dor, globo vesical ou risco de dano renal.
- Monitorização estrita de balanço hídrico em paciente crítico.
- Cirurgia abdominal, pélvica ou urológica conforme prescrição.
- Manejo de bexiga neurogênica (coordenar com urologia).

### Evidência e recomendações

> **Prevenção ITU-SV (SATI/SADI 2024):** não colocar sonda de rotina em pediatria. Avaliar alternativas (saco coletor, sondagem intermitente). Reavaliar necessidade diariamente e retirar no primeiro momento clinicamente possível (Cornistein et al., 2024; Lo et al., 2022).

### Contraindicações relativas

- Trauma uretral suspeito ou confirmado.
- Sangramento uretral ativo ou impossibilidade de identificar meato.
- Estenose uretral ou malformação não avaliada pela urologia.
- Em **menino:** se houver resistência ao avanço, **não forçar** — consultar urologia.

### Seleção de calibre

| Idade / peso aproximado | Calibre (Fr) sugerido |
| --- | --- |
| RN prematuro / RN | 5–6 Fr |
| Lactente | 6–8 Fr |
| Criança (1–8 anos) | 8–10 Fr |
| Criança maior / adolescente | 10–12 Fr |

### Técnica diferenciada por sexo

- **Menina:** meato logo abaixo do clitóris; não confundir com introito vaginal.
- **Menino:** comprimento orientativo em lactente: 4 cm + (idade em anos × 2) cm; confirmar com retorno de urina.

### Cuidados posteriores e critérios de retirada

- Higiene perineal diária com água e sabão neutro; sem antissépticos de rotina no meato.
- Em lactentes: barreira cutânea por risco de dermatite por umidade.
- Retirar ao resolver indicação, diante de suspeita de ITU-SV ou obstrução recorrente.

### Complicações — interromper e comunicar

- Impossibilidade de passar a sonda ou sangramento uretral abundante.
- Urina purulenta com febre (suspeita ITU-SV).
- Ausência de diurese com dor abdominal ou globo vesical.
- Sonda na vagina (menina): retirar e recolocar com técnica estéril.
- Trauma uretral ou hematúria franca persistente.`,
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
      {
        citation: 'American Academy of Pediatrics. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management.',
        url: 'https://publications.aap.org/pediatrics/article/128/3/595/30042',
      },
      {
        citation: 'Society of Pediatric Urology — recursos de cuidados de cateteres e malformações urológicas.',
        url: 'https://www.spuonline.org/',
      },
    ],
  },
  {
    id: 'vic-p001',
    category: 'pediatrico',
    title: 'Colocação de via central pediátrica',
    version: '1.1',
    executiveSummary:
      'Auxiliar na inserção de cateter venoso central pediátrico com barreira de esterilidade máxima, ultrassonografia quando disponível, sedação adequada e bundle de prevenção de bacteremia associada ao cateter (BAC).',
    body: `## Passos a realizar

1. Verificar identificação, alergias, prescrição, consentimento e coagulação conforme protocolo; preparar sedação/analgesia e carro de parada pediátrico.
2. Realizar higienização das mãos e vestir barreira de esterilidade máxima (touca, máscara, avental estéril, luvas estéreis).
3. Posicionar a criança conforme sítio escolhido; em RN garantir controle térmico e monitorização contínua.
4. Desinfetar pele com clorexidina alcoólica em fricção (≥ 20 cm); deixar secar completamente.
5. Auxiliar na inserção com técnica estéril; apoiar ultrassonografia em tempo real se disponível.
6. Conectar linhas em sistema fechado; purgar e fechar vias não usadas; fixar cateter sem tração.
7. Aplicar curativo transparente conforme protocolo institucional; vigiar FC, SpO₂, PA e ritmo durante a inserção.
8. Comprovar retorno venoso em cada via e fixação.
9. Solicitar radiografia de tórax ou ultrassonografia para confirmar ponta na junção cavoatrial e descartar pneumotórax antes do uso, se o protocolo exigir.
10. Registrar sítio, calibre, vias, comprimento, operador, hora e complicações; etiquetar datas em cada via.
11. Desinfetar hub ≥ 15 s antes de cada acesso; reavaliar necessidade do cateter diariamente; retirar ao finalizar indicação ou diante de infecção.

## Fundamentação científica

### Indicações

- Fármacos vasoativos ou soluções hiperosmolares.
- Nutrição parenteral total.
- Monitorização hemodinâmica (PVC, VVC) em paciente crítico.
- Acesso prolongado quando o periférico é insuficiente.
- Hemodiálise ou reanimação em sepse/choque.

### Evidência e recomendações

> **Prevenção BAC/CLABSI (SATI/SADI 2025; OMS 2024):** colocar somente se indicado. Bundle de inserção: higienização das mãos, barreira máxima, antisséptico na pele, sítio ótimo com ultrassonografia e revisão diária da necessidade (Cornistein et al., 2025).

### Seleção do sítio

| Sítio | Considerações pediátricas |
| --- | --- |
| **Jugular interna** | Ecoguiada preferida; menor risco de pneumotórax que subclávia |
| **Femoral** | Frequente em RN/urgência; retirar ou trocar quando possível |
| **Subclávia** | Maior risco de pneumotórax em tórax pequeno |
| **Veia umbilical** | Somente neonatologia, primeiros dias de vida |
| **PICC** | Equipe treinada; acesso prolongado |

### Calibre orientativo

| Peso / idade | Calibre (Fr) |
| --- | --- |
| RN / < 5 kg | 3–4 Fr |
| 5–15 kg | 4–5 Fr |
| 15–30 kg | 5–7 Fr |
| > 30 kg | 7–8 Fr |

### Verificação pós-inserção

- Ponta na junção cavoatrial (aprox. T8–T9); em RN evitar ponta no átrio direito (risco de arritmias e perfuração).

### Complicações — comunicar imediatamente

- Pneumotórax, hemotórax ou dificuldade respiratória aguda.
- Hemorragia local não controlada ou hematoma em expansão.
- Arritmias, bradicardia ou ectopia.
- Febre ou sinais de infecção do sítio / suspeita de BAC.
- Extração acidental do cateter ou trombose venosa.`,
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
      {
        citation: 'American Academy of Pediatrics. Pediatric Advanced Life Support — acesso vascular em emergência.',
        url: 'https://www.aap.org/en/patient-care/pals/',
      },
      {
        citation: 'Society of Critical Care Medicine — Surviving Sepsis Campaign: reanimação e acesso vascular em sepse pediátrica.',
        url: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines',
      },
    ],
  },
  {
    id: 'vip-p001',
    category: 'pediatrico',
    title: 'Colocação de via periférica pediátrica',
    version: '1.2',
    executiveSummary:
      'Canalizar cateter venoso periférico em criança com técnica asséptica não tátil, calibre conforme peso, analgesia e contenção terapêutica segura, e vigilância estreita de extravasamento.',
    body: `## Passos a realizar

1. Identificar o paciente (dois identificadores), alergias e prescrição; escolher calibre e sítio conforme peso.
2. Explicar o procedimento à família e à criança; oferecer analgesia tópica ou sistêmica e organizar contenção terapêutica segura (mínimo duas pessoas).
3. Realizar higienização das mãos (momento 2 OMS) e preparar material estéril.
4. Posicionar a extremidade; aplicar torniquete suave 5–10 cm proximal; palpar e selecionar veia.
5. Desinfetar a pele com antisséptico em fricção circular; deixar secar completamente; não repassar a zona desinfetada.
6. Realizar punção venosa com técnica não tátil (ângulo 10–30°); avançar até refluxo de sangue na câmara.
7. Retirar o torniquete; introduzir o cateter; retirar a agulha; conectar equipo fechado sem desconexões desnecessárias.
8. Verificar refluxo e infusão sem resistência; fixar com curativo transparente sem comprimir.
9. Registrar data, hora, sítio, calibre, número de tentativas e operador; higienização das mãos ao finalizar.
10. Se falhar: máximo duas tentativas por operador; escalar para colega com experiência ou acesso alternativo (intraósseo, central).
11. Revisar a cada turno eritema, dor, edema e extravasamento; desinfetar o hub antes de cada acesso; retirar quando finalizar tratamento ou houver complicação.

## Fundamentação científica

### Indicações

- Administração de medicação ou fluidos IV.
- Reanimação com bolus (desidratação, sepse, choque).
- Coleta de amostras sanguíneas quando não há acesso alternativo.
- Contraste ou procedimentos conforme prescrição médica.

### Evidência e recomendações

> **Bundle de prevenção (OMS 2024 / SATI):** higienização das mãos, técnica asséptica, antisséptico na pele, máximo duas tentativas por operador, fixação adequada e retirada precoce se o acesso não for indispensável (Gorski et al., 2024; CDC/HICPAC, 2011).

### Seleção do sítio e calibre

| Peso aproximado | Calibre sugerido | Sítio preferido |
| --- | --- | --- |
| RN / lactente pequeno | 24 G | Dorso da mão ou pé; antebraço se veia visível |
| 1–10 kg | 24 G | Antebraço, dorso da mão |
| 10–20 kg | 22–24 G | Antebraço |
| > 20 kg | 22–20 G | Antebraço (primeira opção) |

| Preferência | Sítio |
| --- | --- |
| Primeira opção | Antebraço (veias basílica, cefálica ou mediana cefálica) |
| Alternativa | Dorso da mão ou pé (lactente; maior risco de extravasamento) |
| Último recurso | Couro cabeludo (somente RN/lactente conforme protocolo institucional) |
| Evitar | Extremidade com infecção, linfedema, fístula ou punções falhas prévias na mesma zona |

Rotacionar extremidades; não repetir punção no mesmo sítio na mesma sessão.

### Preparação da criança

- Analgesia tópica quando o tempo permitir (EMLA 60 min, lidocaína tópica, J-tip conforme protocolo AAP).
- Contenção terapêutica: uma pessoa estabiliza sem comprimir tórax nem via aérea; outra canaliza.
- Antisséptico: clorexidina alcoólica em crianças ≥ 2 meses; em RN prematuro ou < 2 meses seguir protocolo institucional.

### Critérios de retirada imediata

- Flebite, infiltração ou extravasamento (ativar protocolo se fármaco vesicante).
- Suspeita de infecção do sítio ou bacteremia associada ao cateter.
- Mau funcionamento ou obstrução não resolvida.
- Cateter não mais indispensável.

### Complicações — comunicar imediatamente

- Extravasamento de medicação vesicante, osmótica ou vasoativa.
- Hematoma extenso, sangramento persistente ou perda de pulso distal.
- Cianose ou palidez da extremidade canalizada.
- Dor intensa, choro inconsolável ou recusa da extremidade.
- Febre ou eritema progressivo no sítio de inserção.`,
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
        citation: 'Gorski LA, Hadaway L, Hagle ME, et al. Infusion Therapy Standards of Practice, 9th ed. J Infus Nurs. 2024.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38320480/',
      },
      {
        citation:
          "O'Grady NP, Alexander M, Burns LA, et al. Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011. CDC / HICPAC.",
        url: 'https://www.cdc.gov/infection-control/hcp/guidance-guidelines/isp-intravascular-catheter.html',
      },
      {
        citation: 'American Academy of Pediatrics. Pediatric Pain Management and sedation for procedures.',
        url: 'https://www.aap.org/en/patient-care/sedation-and-analgesia/',
      },
      {
        citation: 'SATI — Comitê de Infectologia Crítica. Prevenção de IRAS e acessos vasculares.',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
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

console.log(`\nLote 4 protocolos: ${protocols.length} monografías pt-BR (pediátrico) — pediátrico COMPLETO`);
