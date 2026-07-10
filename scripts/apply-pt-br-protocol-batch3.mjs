#!/usr/bin/env node
/**
 * Lote 3/5 — 10 protocolos pediátrico pt-BR desde español revisado.
 * CRÍTICO: peso, talla, edad y volúmenes idénticos al ES (sin redondear ni convertir).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_BASE = path.join(__dirname, '../content/locales/pt-BR/categories');

const protocols = [
  {
    id: 'bro-p001',
    category: 'pediatrico',
    title: 'Bronquiolite aguda em lactente',
    version: '1.1',
    executiveSummary:
      'Manejo de suporte: oxigênio se hipoxemia, hidratação e aspiração de secreções; sem rotina de broncodilatadores, corticoides nem antibióticos.',
    body: `## Passos a realizar

1. **Avaliar sinais vitais**: SpO₂, FR, tiragem, retrações, alimentação e diurese.
2. Aplicar **escala de gravidade** institucional (ex.: Wood-Downes, RDAI) e registrar fatores de risco.
3. Iniciar **oxigenoterapia** se SpO₂ < 90–92% (objetivo conforme protocolo local, usualmente ≥ 90%).
4. Manter **hidratação**: via oral se tolera; IV ou sonda se ingesta < 50–75% ou houver desidratação.
5. Realizar **aspiração de secreções nasais** com solução fisiológica antes de cada alimentação.
6. Colocar o lactente em **posição semisentada**; minimizar manipulação que aumente irritabilidade.
7. Aplicar **isolamento de contato** (VSR altamente contagioso).
8. **Monitorizar** sinais de fadiga respiratória: gemido, apneia, cianose.
9. **Não administrar de rotina** broncodilatadores, corticoides, antibióticos nem fisioterapia respiratória sem indicação médica.
10. **Orientar a família** sobre lavagem das mãos, evitar tabaco e sinais de piora para reconsulta urgente.
11. **Encaminhar para internação ou UTI** se SpO₂ persistentemente baixa, apneias, desidratação grave ou desconforto respiratório intenso.

## Fundamentação científica

### Definição

Infecção viral do trato respiratório inferior, principalmente por **VSR**, em crianças < 2 anos, com sibilâncias e desconforto respiratório.

### Avaliação inicial

- SpO₂, FR, tiragem, retrações, alimentação, diurese.
- Escala de gravidade institucional (ex.: Wood-Downes, RDAI).
- Fatores de risco: prematuridade, cardiopatia, displasia broncopulmonar, < 3 meses.

### O que NÃO é rotina (AAP)

- Broncodilatadores nebulizados sistemáticos.
- Corticoides sistêmicos.
- Antibióticos sem sobreinfecção bacteriana documentada.
- Fisioterapia respiratória de rotina.

### Critérios de internação / UTI

- SpO₂ persistentemente < 90% com oxigênio.
- Apneias, letargia ou hipoperfusão.
- Ingesta oral muito reduzida com desidratação.
- FR > 70/min ou desconforto respiratório grave.

### Orientação à família

- Lavagem das mãos e evitar tabaco.
- Sinais de piora para reconsulta urgente.`,
    bibliography: [
      {
        citation: 'Ralston SL, Lieberthal AS, Meissner HC, et al. Clinical Practice Guideline: Bronchiolitis. AAP. Pediatrics. 2014.',
        url: 'https://publications.aap.org/pediatrics/article/134/5/e1474/74393',
      },
      {
        citation: 'American Academy of Pediatrics. Updated Guidance: Use of Palivizumab to Prevent RSV. 2022.',
        url: 'https://publications.aap.org/aapnews/news/20880',
      },
      {
        citation: 'SATI — Comitê de Pneumologia Crítica.',
        url: 'https://www.sati.org.ar/guias-comite-neumonologia-critica-cnc/',
      },
      {
        citation: 'SATI — Pediatria.',
        url: 'https://www.sati.org.ar/pediatria/',
      },
    ],
  },
  {
    id: 'dip-p001',
    category: 'pediatrico',
    title: 'Colocação de cateter de diálise peritoneal pediátrico',
    version: '1.1',
    executiveSummary:
      'Auxiliar na colocação de cateter de DP pediátrico com técnica estéril, calibre conforme idade e cuidados pós-operatórios coordenados com nefrologia pediátrica.',
    body: `## Passos a realizar

1. Verificar identificação, peso, prescrição e consentimento familiar; confirmar jejum conforme protocolo.
2. Administrar antibiótico profilático se indicado; preparar sedação/analgesia conforme idade.
3. Preparar cateter pediátrico de DP (calibre/comprimento conforme prescrição), material estéril e curativo.
4. Realizar higienização das mãos e barreira estéril; em lactente garantir controle térmico.
5. Posicionar em decúbito dorsal; desinfetar abdome com antisséptico; deixar secar.
6. Auxiliar na inserção: incisão infraumbilical, introdução do cateter e comprovação de fluxo do dialisador.
7. Verificar drenagem e infusão de teste; fixar cateter sem tensão; suturar conforme técnica.
8. Aplicar curativo estéril; orientar cateter caudalmente; registrar tipo, calibre, operador e hora.
9. Transferir para unidade pediátrica; vigiar dor, sangramento, peritonismo e função do cateter.
10. Orientar família: cuidado da ferida, sinais de alarme e restrições iniciais de atividade.

## Fundamentação científica

### Indicações pediátricas

- Insuficiência renal crônica terminal em criança quando DP é modalidade elegida.
- Doença renal crônica avançada em espera de transplante.
- Algumas situações de IRA em centros com experiência em DP pediátrica (coordenar com nefrologia).

### Seleção de cateter pediátrico

| Idade / tamanho | Orientação |
| --- | --- |
| Lactente | Cateter pediátrico de menor calibre; considerar colocação por cirurgião pediátrico experiente |
| Criança | Comprimento ajustado ao tamanho corporal; cuffs bem posicionados |
| Adolescente | Pode usar cateter de adulto conforme antropometria |

### Evidência e recomendações

> **ISPD Pediatric PD Guidelines (2020):** a DP é modalidade de eleição em muitos centros pediátricos; a colocação deve ser realizada por equipe com experiência em acesso peritoneal pediátrico (Schaefer et al., 2020).

> **IPNA (International Pediatric Nephrology Association):** planejamento antecipado do acesso; educação familiar fundamental desde o início.

### Cuidados pós-operatórios pediátricos

- Analgesia adequada; vigilância de náuseas e distensão abdominal.
- Evitar manipulação do cateter pela criança; fixação segura.
- Em lactentes: vigiar alimentação e sinais de complicação abdominal.
- Primeira troca conforme protocolo de nefrologia pediátrica (usualmente após período de cicatrização).

### Complicações — comunicar imediatamente

- Febre, dor abdominal intensa ou defesa.
- Sangramento ativo na ferida.
- Ausência de fluxo ou vazamento de líquido.
- Infecção do sítio de saída com exsudato purulento.`,
    bibliography: [
      {
        citation: 'Schaefer F, et al. ISPD Guidelines for Peritoneal Dialysis in Children. Perit Dial Int. 2020.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32316759/',
      },
      {
        citation: 'Brown EA, et al. ISPD Guidelines for Peritoneal Access. Perit Dial Int. 2020.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32316758/',
      },
      {
        citation: 'Warady MA, et al. IPNA clinical practice recommendations for the diagnosis and management of children with CKD. Pediatr Nephrol. 2019.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30830470/',
      },
      {
        citation: 'Lok CE, et al. KDOQI Clinical Practice Guideline for Vascular Access: 2019 Update.',
        url: 'https://www.kidney.org/professionals/kdoqi/guidelines-and-commentaries/vascular-access',
      },
      {
        citation: 'International Society for Peritoneal Dialysis — pediatric resources.',
        url: 'https://www.ispd.org/',
      },
    ],
  },
  {
    id: 'dol-p001',
    category: 'pediatrico',
    title: 'Dor e sedação em pediatria',
    version: '1.1',
    executiveSummary:
      'Avaliar dor com escalas validadas por idade (FLACC, EVA, CPOT-ped), tratar de forma multimodal e minimizar sedação desnecessária.',
    body: `## Passos a realizar

1. **Avaliar dor sistematicamente** no início de cada turno e antes/depois de procedimentos.
2. **Selecionar escala validada** conforme idade e situação: FLACC (0–7 anos), EVA (> 6–7 anos), COMFORT-B/CPOT (UTI/intubado), NIPS/PIPP (neonato).
3. **Registrar pontuação** de dor/sedação no prontuário com hora e contexto.
4. Aplicar **medidas não farmacológicas**: contenção terapêutica com familiar, amamentação ou sacarose em lactentes, distração, ambiente tranquilo e agrupar cuidados.
5. Administrar **analgesia farmacológica** conforme prescrição e gravidade (paracetamol/ibuprofeno leve; opioides titulados moderado-grave).
6. Administrar **analgesia antes do procedimento** doloroso quando indicado (não aguardar dor máxima).
7. Na UTI, **reavaliar sedação** com escala adaptada (RASS); priorizar analgesia sobre sedação isolada (PADIS).
8. **Vigiar efeitos adversos**: hipotensão, bradipneia, depressão respiratória com opioides/benzodiazepínicos, náuseas.
9. **Envolver a família** no cuidado da dor e explicar plano de analgesia.
10. **Comunicar imediatamente** se bradipneia, hipotensão, sedação excessiva ou dor não controlada apesar do tratamento.

## Fundamentação científica

### Princípios

- A dor é frequentemente subtratada em pediatria.
- Avaliar dor de forma **sistemática a cada turno** e antes/depois de procedimentos.
- Combinar farmacológico e não farmacológico.

### Escalas de avaliação

| Idade / situação | Escala |
| --- | --- |
| 0–7 anos (pré-verbal) | **FLACC** (Face, Legs, Activity, Cry, Consolability) |
| > 6–7 anos cooperador | **EVA** (escala visual analógica 0–10) |
| UTI / intubado | **COMFORT-B** ou **CPOT** adaptada |
| Neonato | **NIPS** ou **PIPP** |

### Intervenções não farmacológicas

- Contenção terapêutica com familiar.
- Amamentação ou sacarose oral em lactentes para dor procedural leve.
- Distração, música, brincadeira.
- Ambiente tranquilo; agrupar cuidados.

### Analgesia farmacológica (conforme prescrição)

| Situação | Opções frequentes |
| --- | --- |
| Dor leve | Paracetamol, ibuprofeno oral/IV |
| Dor moderada-grave | Opioides titulados (morfina, fentanil) |
| Procedimento breve | Sedação com cetamina, propofol ou midazolam conforme protocolo |

### Sedação na UTI

- Objetivo: paciente tranquilo mas avaliável (evitar sedação excessiva).
- Reavaliar sedação com escala (RASS adaptada).
- Vigiar depressão respiratória com opioides e benzodiazepínicos.
- **PADIS** (adaptação pediátrica das diretrizes SCCM): priorizar analgesia sobre sedação isolada.

### Papel da enfermagem

- Registrar escala de dor/sedação a cada turno.
- Administrar analgesia **antes** de procedimentos dolorosos quando indicado.
- Vigiar efeitos adversos: hipotensão, bradipneia, náuseas.
- Envolver a família no cuidado da dor.`,
    bibliography: [
      {
        citation: 'Devlin JW, et al. PADIS Guidelines — adaptação à população pediátrica em UTI.',
        url: 'https://www.sati.org.ar/guias-de-practica-clinica-para-la-prevencion-y-el-manejo-del-dolor/',
      },
      {
        citation: 'American Academy of Pediatrics. Prevention and Management of Procedural Pain in the Newborn. Pediatrics. 2016.',
        url: 'https://publications.aap.org/pediatrics/article/137/2/e20154271/81496',
      },
      {
        citation: 'Society of Critical Care Medicine — PADIS Guidelines.',
        url: 'https://www.sccm.org/clinical-resources/guidelines',
      },
      {
        citation: 'SATI — Guias de prática clínica para prevenção e manejo da dor (tradução oficial espanhol).',
        url: 'https://www.sati.org.ar/guias-de-practica-clinica-para-la-prevencion-y-el-manejo-del-dolor/',
      },
    ],
  },
  {
    id: 'dpp-p001',
    category: 'pediatrico',
    title: 'Diálise peritoneal pediátrica: trocas e cuidados',
    version: '1.1',
    executiveSummary:
      'Realizar trocas de DP pediátrica com técnica asséptica, volumes conforme superfície corporal, educação familiar e vigilância de peritonite conforme ISPD pediátrico.',
    body: `## Passos a realizar

1. Verificar identificação, peso atual e prescrição (volume por troca, tempo de permanência, concentração, modalidade CAPD/APD).
2. Envolver cuidador capacitado; explicar passos à criança conforme idade.
3. Realizar higienização das mãos; preparar material estéril de uso único.
4. Reduzir correntes de ar; máscara se o protocolo indicar.
5. Desinfetar tampa do cateter e conexões (fricção ≥ 15 s); deixar secar.
6. **Drenagem:** conectar equipo; drenar completamente; registrar volume e aspecto do efluente.
7. **Infusão:** conectar bolsa de dialisador; eliminar ar; infundir volume prescrito conforme peso/SC.
8. Fechar pinças; desconectar com técnica asséptica; tampa estéril no cateter.
9. Descartar material; registrar hora, volumes, concentração e intercorrências.
10. Pesar a criança; vigiar dor abdominal, febre, náuseas ou efluente turvo.
11. Diante de efluente turvo: não reinfundir; comunicar imediatamente; coletar amostra de efluente para cultivo e celularidade.

## Fundamentação científica

### Volumes em pediatria

| Parâmetro | Orientação |
| --- | --- |
| Volume de enchimento | 800–1100 ml/m² de superfície corporal (ajustar à tolerância) |
| Volume inicial em lactente | Menor volume; incremento progressivo conforme nefrologia |
| Permanência | Conforme prescrição; maior tempo em lactentes frequentemente |

Recalcular volumes a cada mudança significativa de peso ou estatura.

### Evidência e recomendações

> **ISPD Pediatric Guidelines (2020):** a DP pediátrica preserva crescimento e qualidade de vida; a técnica asséptica e educação do cuidador são essenciais (Schaefer et al., 2020).

> **Peritonite pediátrica:** apresentação pode ser atípica em lactentes (irritabilidade, febre baixa); efluente turvo é sinal cardinal (Li et al., 2016).

### Educação do cuidador

- Técnica de conexão/desconexão passo a passo.
- Armazenamento de dialisador e ambiente limpo.
- Sinais de alarme: turvação, febre, dor, vazamento.
- Contato com equipe de nefrologia pediátrica 24 h.

### Monitorização pediátrica

- Peso e estatura em cada controle (percentis de crescimento).
- Pressão arterial conforme idade.
- Estado nutricional e proteínas séricas.
- Adesão escolar e atividade física adaptada.

### Complicações — comunicar imediatamente

- Peritonite (efluente turvo ± febre/dor).
- Vazamento de dialisador ou hérnia.
- Obstrução do cateter.
- Desidratação ou sobrecarga hídrica.
- Infecção do sítio de saída.`,
    bibliography: [
      {
        citation: 'Schaefer F, et al. ISPD Guidelines for Peritoneal Dialysis in Children. Perit Dial Int. 2020.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32316759/',
      },
      {
        citation: 'Li PK, et al. ISPD Peritonitis Recommendations 2016. Perit Dial Int. 2016.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27649941/',
      },
      {
        citation: 'Warady MA, et al. IPNA clinical practice recommendations for children with CKD. Pediatr Nephrol. 2019.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30830470/',
      },
      {
        citation: 'Brown EA, et al. ISPD Guidelines for Peritoneal Access. Perit Dial Int. 2020.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32316758/',
      },
      {
        citation: 'International Society for Peritoneal Dialysis — pediatric guidelines.',
        url: 'https://www.ispd.org/guidelines',
      },
    ],
  },
  {
    id: 'feb-001',
    category: 'pediatrico',
    title: 'Febre sem foco em lactente',
    version: '1.2',
    executiveSummary:
      'Avaliar idade, estado geral e sinais de alarme. Estratificar risco de infecção bacteriana grave e decidir estudo ambulatorial, observação ou internação.',
    body: `## Passos a realizar

1. **Registrar idade exata** do lactente e confirmar que a febre é real (temperatura retal ou axilar conforme protocolo).
2. Obter **sinais vitais completos**: FC, FR, PA, temperatura e SpO₂.
3. Avaliar **estado geral** (aspecto, tônus, interação, alimentação) como dado prioritário sobre o valor da temperatura.
4. Explorar **sinais de alarme**: letargia, má perfusão, petéquias, tiragem, recusa alimentar, fontanela abaulada.
5. Avaliar **estado de hidratação e perfusão**; registrar vacinação e antecedentes relevantes.
6. **Estratificar risco conforme idade** e decidir conduta com a equipe médica (estudo ambulatorial, observação ou internação).
7. Obter **amostras indicadas** conforme idade e risco: hemocultura antes do antibiótico se proceder, urocultura (saco coletor ou método estéril) e outros exames conforme critérios.
8. **Monitorizar** durante observação se aplicável; reavaliar estado geral a cada 1–2 horas.
9. **Orientar a família** sobre sinais de piora e critérios de reconsulta urgente.
10. **Encaminhar ou internar imediatamente** se aparecer qualquer sinal de alarme durante a avaliação.

## Fundamentação científica

### Objetivo

Padronizar a avaliação inicial do lactente com febre sem foco aparente.

### Estratificação por idade

| Idade | Conduta geral |
| --- | --- |
| **0–28 dias** | Considerar internação e estudo completo (meningite, ITU, bacteremia) |
| **29–60 dias** | Analítica, urocultura; hemocultura conforme protocolo e estado geral |
| **61–90 dias** | Estratificação com critérios validados (Rochester, Philadelphia ou diretriz local) |
| **> 3 meses** | Avaliar estado geral; foco clínico; manejo ambulatorial se bom aspecto |

### Avaliação de enfermagem

- Sinais vitais completos (FC, FR, PA, temperatura, SpO₂).
- Estado de hidratação e perfusão.
- Fontanela, exantema petequial, tiragem, recusa alimentar.
- Registro de vacinação e antecedentes.

### Sinais de alarme

- Letargia, hipotonia ou irritabilidade inconsolável.
- Má perfusão, hipotensão ou taquicardia desproporcionada.
- Petéquias ou púrpura.
- Tiragem, gemido, cianose ou apneia.
- Vômitos persistentes ou recusa total do alimento.

> Priorizar o **estado geral** sobre dado isolado de temperatura (AAP 2021).

### Amostras (conforme indicação médica)

- Hemocultura antes do antibiótico se proceder.
- Urocultura (saco coletor ou método estéril conforme idade).
- Outros exames conforme idade e critérios de risco.`,
    bibliography: [
      {
        citation: 'American Academy of Pediatrics. Clinical Practice Guideline: Febrile Infants 8 to 60 Days Old. Pediatrics. 2021.',
        url: 'https://publications.aap.org/pediatrics/article/148/2/e2021052228/179775',
      },
      {
        citation: 'SATI — Área Pediatria. Recursos e diretrizes em cuidados críticos pediátricos.',
        url: 'https://www.sati.org.ar/pediatria/',
      },
      {
        citation: 'Sociedade Latinoamericana de Cuidados Intensivos Pediátricos (SLACIP) — Consenso LATAM manejo de sepse em crianças.',
        url: 'https://www.sati.org.ar/wp-content/uploads/10-Consenso-LATAM-SLACIP-Sepsis-Espanol-Acta-Ped-Mex-Marzo-2022.pdf',
      },
      {
        citation: 'Weiss SL, et al. Surviving Sepsis Campaign Pediatric Guidelines 2026 — reconhecimento precoce em lactente febril.',
        url: 'https://sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-pediatric-guidelines',
      },
    ],
  },
  {
    id: 'hem-p001',
    category: 'pediatrico',
    title: 'Coleta de hemocultura pediátrica',
    version: '1.2',
    executiveSummary:
      'Coletar hemocultura antes do antibiótico se possível, ajustando volume ao peso da criança, com técnica asséptica estrita e sem retardar antibiótico na sepse grave.',
    body: `## Passos a realizar

1. Confirmar indicação clínica; identificar o paciente (dois identificadores), pesar e registrar hora, sítio e motivo da coleta.
2. Explicar à família; organizar contenção terapêutica e analgesia (sacarose 24% em lactentes, lidocaína tópica se houver tempo).
3. Preparar frascos pediátricos (aeróbico ± anaeróbico); desinfetar tampas com álcool 70% e deixar secar.
4. Realizar higienização das mãos (momento 2 OMS).
5. Desinfetar pele com antisséptico em fricção; ampliar área; deixar secar ≥ 30 s; não repassar zona desinfetada.
6. Realizar punção venosa periférica com técnica asséptica; coletar volume conforme peso (ver tabela na fundamentação).
7. Inocular frascos na ordem conforme sistema: vácuo (aeróbico primeiro); seringa (anaeróbico primeiro se aplicável).
8. Misturar por inversão suave; etiquetar em mesa limpa com nome, data, hora, sítio e peso.
9. Realizar higienização das mãos ao finalizar; transportar ao laboratório imediatamente.
10. Registrar número de pares, volume por frasco, antibióticos prévios e hora de início do antibiótico empírico.
11. Comunicar resultado positivo com patógeno, suspeita de contaminação ou deterioração clínica.

## Fundamentação científica

### Indicações

- Suspeita de sepse ou choque séptico.
- Febre em lactente de alto risco (estratégia AAP).
- Febre sem foco com instabilidade ou imunocomprometimento.
- Suspeita de endocardite ou bacteremia associada ao cateter.

### Evidência e recomendações

> **SSC Pediátrico (2026):** obter culturas antes do antibiótico empírico se não retardar seu início. No choque séptico: **não retardar antibiótico** por dificuldade de punção; coletar culturas em paralelo (Weiss et al., 2026).

### Momento e número de pares

- Ideal: antes de antibióticos; não é obrigatório coincidir com pico febril.
- Sepse grave: 2 pares mínimo de extremidades distintas, simultâneos.
- Endocardite: 3 pares de sítios distintos.

### Volume conforme peso

| Peso da criança | Volume por frasco |
| --- | --- |
| < 1 kg | 0,5–1 ml |
| 1–5 kg | 1–3 ml |
| 5–10 kg | 3–5 ml |
| 10–20 kg | 5–10 ml |
| > 20 kg | 10–15 ml |

Não sobreencher frascos pediátricos; respeitar máximo do fabricante.

### Sítio de punção

- Preferir punção venosa periférica em sítios distintos.
- Sangue de cateter central: somente com protocolo de retrocultura (\`ret-p001\`).
- Não descartar sangue de rotina antes da hemocultura periférica.

### Prevenção de contaminação

- Não tocar tampa do frasco após desinfecção.
- Em lactentes: técnica asséptica estrita por maior impacto de falsos positivos (SATI, 2007; CGEE, 2024).

### Escalonamento

- Se impossível obter amostra na sepse grave: escalar acesso (intraósseo, central) sem retardar antibiótico.`,
    bibliography: [
      {
        citation:
          'Weiss SL, et al. Surviving Sepsis Campaign International Guidelines for the Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children (2026).',
        url: 'https://sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-pediatric-guidelines',
      },
      {
        citation: 'American Academy of Pediatrics. Clinical Practice Guideline: Febrile Infants 2021.',
        url: 'https://publications.aap.org/pediatrics/article/148/2/e2021052228/179775',
      },
      {
        citation: 'SATI — Coleta de amostras microbiológicas em UTI (Comitê de Infectologia Crítica).',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
      {
        citation: 'Guia de prática clínica de enfermagem sobre hemoculturas — volumes pediátricos (Consejo General de Enfermería de España).',
        url: 'https://www.consejogeneralenfermeria.org/profesion/guias-clinicas/send/160-guias-clinicas/3122-guia-de-practica-clinica-enfermera-sobre-hemocultivos-actualizacion',
      },
      {
        citation:
          'Cornistein W, et al. Infecciones asociadas a catéteres venosos centrales. Actualización intersociedades SATI/SADI 2025.',
        url: 'https://www.scielo.org.ar/scielo.php?pid=S0025-76802025001001337&script=sci_arttext',
      },
      {
        citation: 'SATI — Comitê de Infectologia Crítica. Guias e consensos.',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
    ],
  },
  {
    id: 'med-p001',
    category: 'pediatrico',
    title: 'Administração segura de medicação IV pediátrica',
    version: '1.0',
    executiveSummary:
      'Verificar as 9 certezas com dupla checagem de dose por peso, compatibilidade e velocidade; usar bomba em fármacos de alto risco e vigiar extravasamento.',
    body: `## Passos a realizar

1. Realizar higienização das mãos e preparar medicação em área limpa.
2. Verificar as **9 certezas**: paciente, medicamento, dose, via, hora, registro, razão, resposta e forma de administração.
3. **Dupla checagem independente** de dose calculada por peso (mg/kg) ou superfície corporal conforme prescrição.
4. Confirmar alergias, via de acesso adequada e função renal/hepática se aplicável.
5. Preparar medicação conforme protocolo de diluição pediátrica institucional.
6. Desinfetar hub do cateter com clorexidina alcoólica ≥ 15 s; técnica asséptica.
7. Administrar com **bomba de infusão** quando indicado (vasopressores, potássio, antibióticos críticos, sedação).
8. Vigiar reações adversas e sinais de extravasamento durante e após a infusão.
9. Documentar hora, dose, peso, via, velocidade e resposta no prontuário.
10. Notificar imediatamente extravasamento, flebite, reação alérgica ou erro de medicação.

## Fundamentação científica

### Indicações

Administração segura de medicação intravenosa em criança hospitalizada, incluindo fármacos de alto risco e soluções hiperosmolares.

### As 9 certezas (adaptação pediátrica)

1. Paciente correto (dois identificadores).
2. Medicamento correto.
3. **Dose correta conforme peso atual** (recalcular se o peso mudou).
4. Via correta (periférica vs central conforme fármaco).
5. Hora correta.
6. Registro correto.
7. Razão correta.
8. Resposta correta (vigiar efeitos e toxicidade).
9. Forma correta de administração (bolus vs infusão contínua).

### Precauções especiais pediátricas

| Tipo de fármaco | Precaução |
| --- | --- |
| Vasopressores | Via central preferencial; bomba dedicada; titulação estreita |
| Potássio IV | Nunca em bolus; velocidade máxima conforme peso e protocolo |
| Antibióticos críticos | Respeitar tempo de infusão (beta-lactâmicos prolongados) |
| Sedoanalgesia | Cálculo por kg; vigilância de depressão respiratória |
| Fármacos vesicantes/osmóticos | Via central; vigilância estreita de extravasamento |
| Fármacos fotossensíveis | Proteger da luz |

### Evidência e recomendações

> **OMS — Medication Without Harm:** verificação sistemática e dupla checagem em população pediátrica por maior risco de erro de dose (WHO, 2023).

> **ISMP:** práticas seguras de medicação IV; push lento e diluição adequada em crianças (ISMP, 2024).

> **Gorski et al. (2024):** padrões de terapia de infusão; desinfecção de hub e sistema fechado.

### Eventos a notificar imediatamente

- Extravasamento ou flebite (especialmente vesicantes).
- Reação alérgica ou anafilaxia.
- Erro de medicação ou dúvida na prescrição.
- Depressão respiratória após sedoanalgesia IV.

### Complicações

- Extravasamento com risco de necrose tecidual em lactentes.
- Flebite química ou infecciosa.
- Anafilaxia.
- Erro de dose por falha no cálculo ponderal.`,
    bibliography: [
      {
        citation: 'World Health Organization. Patient Safety — Medication Without Harm (pediatric medication safety).',
        url: 'https://www.who.int/teams/integrated-health-services/patient-safety/policy/medication-without-harm',
      },
      {
        citation: 'Institute for Safe Medication Practices (ISMP). Guidelines for Safe Practice of IV Medications.',
        url: 'https://www.ismp.org/guidelines/iv-push',
      },
      {
        citation: 'Gorski LA, Hadaway L, Hagle ME, et al. Infusion Therapy Standards of Practice, 9th ed. J Infus Nurs. 2024.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38320480/',
      },
      {
        citation: 'American Academy of Pediatrics. Medication Safety in the Pediatric Inpatient Setting.',
        url: 'https://www.aap.org/en/patient-care/patient-safety/',
      },
      {
        citation: 'SATI — Recomendações gerais para sedoanalgesia e manejo de infusões em UTI.',
        url: 'https://www.sati.org.ar/guias-comite-neumonologia-critica-cnc/',
      },
      {
        citation: 'NICE NG18. Intravenous fluid therapy in children and young people in hospital.',
        url: 'https://www.nice.org.uk/guidance/ng18',
      },
    ],
  },
  {
    id: 'oxi-p001',
    category: 'pediatrico',
    title: 'Oxigenoterapia pediátrica',
    version: '1.1',
    executiveSummary:
      'Titular oxigênio conforme idade e patologia, vigiando SpO₂ e sinais de fadiga respiratória; escalar dispositivo se não houver resposta.',
    body: `## Passos a realizar

1. **Verificar prescrição médica** e objetivo de SpO₂ conforme idade, patologia e comorbidades.
2. **Selecionar dispositivo** adequado (cateter nasal, máscara simples, reservatório, CNAF, VNI/VM) conforme gravidade.
3. **Colocar dispositivo** com hidratação de mucosas; fixar sem comprimir pele nem cartilagens.
4. **Ajustar fluxo** conforme dispositivo e peso (cateter nasal: 0,5–2 L/min lactente, 1–4 L/min criança).
5. Instalar **monitorização contínua de SpO₂** junto com FR, tiragem, retrações e gemido.
6. **Reavaliar resposta** a cada 30–60 min (ou contínuo na UTI); registrar dispositivo, fluxo e SpO₂ atingida.
7. **Escalar suporte respiratório** se SpO₂ persistir abaixo do objetivo apesar de oxigênio máximo com dispositivo atual; comunicar imediatamente.
8. **Comunicar imediatamente** diante de aumento de tiragem, apneia, cianose, agitação ou letargia nova, bradicardia ou hipotensão.
9. **Documentar** dispositivo, fluxo, FiO₂ aproximada e resposta clínica a cada turno.

## Fundamentação científica

### Indicações

- Hipoxemia (SpO₂ abaixo do objetivo etário).
- Desconforto respiratório moderado a grave.
- Choque com hipoperfusão.
- Contexto de sepse, bronquiolite, pneumonia ou asma grave.

### Objetivos de SpO₂ (referência geral)

| Situação | SpO₂ objetivo |
| --- | --- |
| Lactente / criança sem cardiopatia | 94–98% |
| Prematuro / displasia broncopulmonar | Conforme protocolo neonatal (ex.: 90–95%) |
| Crise asmática em resolução | ≥ 94% |

Ajustar conforme prescrição médica e comorbidades.

### Dispositivos

| Dispositivo | Fluxo orientativo | FiO₂ aproximada |
| --- | --- | --- |
| Cateter nasal de baixo fluxo | 0,5–2 L/min (lactente) / 1–4 L/min (criança) | 24–40% |
| Máscara simples | 5–10 L/min | 40–60% |
| Máscara com reservatório | 10–15 L/min | 60–90% |
| CNAF (alto fluxo) | Conforme peso e protocolo UTI | Titulável |
| VNI / VM | Conforme prescrição | |

### Sinais de alarme

- Aumento de tiragem, apneia ou cianose.
- Agitação ou letargia nova.
- SpO₂ persistentemente abaixo do objetivo apesar de oxigênio máximo com dispositivo atual.
- Bradicardia ou hipotensão.`,
    bibliography: [
      {
        citation: 'American Academy of Pediatrics. Bronchiolitis Clinical Practice Guideline. Pediatrics. 2014 (atualizações AAP).',
        url: 'https://publications.aap.org/pediatrics/article/134/5/e1474/74393',
      },
      {
        citation: 'Weiss SL, et al. Surviving Sepsis Campaign Pediatric Guidelines 2026.',
        url: 'https://sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-pediatric-guidelines',
      },
      {
        citation: 'SATI — Comitê de Pneumologia Crítica. Suporte respiratório.',
        url: 'https://www.sati.org.ar/guias-comite-neumonologia-critica-cnc/',
      },
      {
        citation: 'World Health Organization. Oxygen therapy for children — WHO guidelines.',
        url: 'https://www.who.int/teams/maternal-newborn-child-adolescent-health-and-ageing/child-health/paediatric-hospital-care',
      },
    ],
  },
  {
    id: 'pam-p001',
    category: 'pediatrico',
    title: 'Colocação de linha arterial pediátrica (PAM)',
    version: '1.1',
    executiveSummary:
      'Canalizar cateter arterial pediátrico para monitorização invasiva da pressão arterial média (PAM), com avaliação de circulação colateral, técnica de Seldinger estéril e sistema transdutor calibrado ao eixo flebostático.',
    body: `## Passos a realizar

1. Confirmar indicação; identificar o paciente, peso e prescrição; verificar coagulação se aplicável; obter consentimento.
2. Avaliar circulação colateral antes da radial (Allen modificado ou Barbeau com oximetria/Doppler em lactentes).
3. Administrar sedação e analgesia conforme protocolo; em RN garantir controle térmico e monitorização.
4. Realizar higienização das mãos e vestir barreira estéril; preparar kit arterial pediátrico e sistema de transdução.
5. Posicionar a criança (punho estendido para radial; perna em extensão neutra para femoral); palpar pulso (Doppler se necessário).
6. Desinfetar pele com antisséptico em fricção; deixar secar.
7. Puncionar artéria a 10–30° até refluxo pulsátil; introduzir guia; avançar cateter com técnica de Seldinger.
8. Retirar guia; conectar a sistema pré-purgado sem bolhas; fixar cateter sem compressão excessiva.
9. Conectar transdutor; verificar onda arterial no monitor; vigiar perfusão distal imediatamente.
10. Colocar transdutor ao nível do eixo flebostático; realizar zero; confirmar PAM coerente com clínica e idade.
11. Ajustar pressurizador a 300 mmHg (fluxo 1–3 ml/h conforme peso); registrar sítio, calibre, hora e operador.
12. Vigiar a cada turno ponto de inserção, perfusão distal e leituras; realizar zero no início do turno ou após mobilização; retirar ao finalizar indicação ou diante de isquemia.

## Fundamentação científica

### Definição e indicações

A **PAI** registra pressão sistólica, diastólica e **média (PAM)** de forma contínua e facilita gasometrias seriadas em UTI pediátrica, neonatologia ou perioperatório crítico.

Indicada em instabilidade hemodinâmica, fármacos vasoativos, gasometrias frequentes e titulação de PAM objetivo conforme idade.

### Evidência e recomendações

> **SSC Pediátrico (2026):** usar metas de PAM ajustadas à idade e percentis; não aplicar automaticamente o limiar adulto ≥ 65 mmHg (Weiss et al., 2026).

### Seleção do sítio

| Ordem | Sítio | Notas pediátricas |
| --- | --- | --- |
| 1ª | Radial | Preferida se pulso palpável |
| 2ª | Pediosa dorsal | Alternativa em lactente |
| Urgência | Femoral | Retirar precocemente quando possível |
| RN | Umbilical | Somente neonatologia, protocolo específico |
| Evitar | Braquial/ulnar | Circulação colateral limitada |

### Calibre orientativo

| Peso / idade | Calibre |
| --- | --- |
| RN / < 5 kg | 24 G |
| 5–20 kg | 22–24 G |
| > 20 kg | 20–22 G |

### Objetivos de PAM por idade

| Grupo | Orientação |
| --- | --- |
| RN / lactente | Tabelas de PAM por idade; percentis no choque |
| Criança | PAM adequada para idade |
| Adolescente | Pode aproximar-se de critérios de adulto |

### Cuidados e recanalização

- Desinfetar hub antes de gasometria; volume mínimo de sangue descartado conforme peso.
- Se inserção de urgência sem assepsia ótima: recanalizar em 48 h conforme protocolo (Scheer et al., 2002; OMS, 2024).

### Complicações — comunicar imediatamente

- Isquemia distal: palidez, cianose, ausência de pulso.
- Sangramento ativo ou hematoma em expansão.
- Onda amortecida (bolhas, coágulos, malposição).
- Febre ou eritema no sítio (suspeita infecção).
- Trombose arterial ou extração acidental do cateter.`,
    bibliography: [
      {
        citation: 'Weiss SL, et al. Surviving Sepsis Campaign Pediatric Guidelines 2026 — objetivos hemodinâmicos e monitorização.',
        url: 'https://sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-pediatric-guidelines',
      },
      {
        citation: 'World Health Organization. Guidelines for prevention of BSI associated with intravascular catheters — Part 2. WHO, 2024.',
        url: 'https://www.who.int/publications/i/item/9789240121805',
      },
      {
        citation: 'Cornistein W, et al. Infecciones asociadas a catéteres venosos centrales. Actualización SATI/SADI 2025.',
        url: 'https://www.scielo.org.ar/scielo.php?pid=S0025-76802025001001337&script=sci_arttext',
      },
      {
        citation: 'Scheer BV, Perel A, Pfeiffer UJ, et al. Complications and risk factors of peripheral arterial catheters. Crit Care. 2002.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12493067/',
      },
      {
        citation: 'American Academy of Pediatrics. Neonatal Resuscitation Program — acesso vascular e monitorização.',
        url: 'https://www.aap.org/en/patient-care/neonatal-resuscitation-program-nrp/',
      },
      {
        citation: 'SATI — Comitê de Infectologia Crítica. Guias e consensos.',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
    ],
  },
  {
    id: 'reh-p001',
    category: 'pediatrico',
    title: 'Reidratação na gastroenterite aguda',
    version: '1.1',
    executiveSummary:
      'Avaliar grau de desidratação, priorizar reidratação oral com SRO e reservar IV para desidratação moderada-grave ou intolerância oral.',
    body: `## Passos a realizar

1. **Pesar na admissão** para calcular volumes de reidratação conforme peso.
2. **Avaliar grau de desidratação** com sinais clínicos (estado geral, olhos, mucosas, lágrimas, fontanela, diurese, tempo de enchimento capilar).
3. **Classificar em Plano A, B ou C** conforme grau de desidratação e decidir manejo com a equipe médica.
4. **Plano A (sem desidratação):** aumentar líquidos orais (SRO, leite, água), continuar alimentação habitual e orientar sobre sinais de alarme.
5. **Plano B (moderada):** administrar **SRO 50–100 ml/kg em 4 horas** com colher ou seringa pequena, frequente e lenta; reavaliar a cada 1–2 horas.
6. Se houver **vômitos** durante Plano B: fazer pausas breves e reiniciar em pequenos volumes; escalar para Plano C se falhar.
7. **Plano C (grave ou choque):** canalizar acesso vascular urgente e administrar **cristaloides IV 20 ml/kg** em bolus; reavaliar e repetir conforme resposta.
8. **Registrar entradas e saídas**: vômitos, diarreia, diurese e líquidos administrados.
9. **Monitorizar sinais vitais** e vigiar hipoglicemia em lactentes.
10. Quando o paciente **tolerar via oral**, transicionar de IV para SRO de forma progressiva.
11. Aplicar **isolamento de contato** se a etiologia for infecciosa.

## Fundamentação científica

### Avaliação do grau de desidratação

| Sinal | Sem / leve | Moderada | Grave |
| --- | --- | --- | --- |
| Estado geral | Bem | Irritável, inquieto | Letárgico, hipotônico |
| Olhos | Normais | Fundos | Muito fundos |
| Mucosas | Úmidas | Secas | Muito secas |
| Lágrimas | Presentes | Diminuídas | Ausentes |
| Fontanela | Normal | Deprimida | Muito deprimida |
| Diurese | Normal | Diminuída | Oligúria/anúria |
| Tempo enchimento capilar | < 2 s | 2–3 s | > 3 s |

### Plano A — Sem desidratação (manejo domiciliar)

- Aumentar líquidos orais (SRO, leite, água).
- Continuar alimentação habitual.
- Orientar sobre sinais de alarme.

### Plano B — Desidratação moderada

- **SRO** 50–100 ml/kg em 4 horas no serviço de saúde.
- Administrar com colher ou seringa pequena, frequente e lenta.
- Reavaliar a cada 1–2 horas.
- Se vômitos: pausas breves e reiniciar em pequenos volumes.
- Se falha: Plano C.

### Plano C — Desidratação grave ou choque

- **Cristaloides IV** em bolus 20 ml/kg; reavaliar e repetir.
- Acesso vascular urgente.
- Monitorizar sinais vitais e diurese.
- Quando tolera oral: transição para SRO.

### Papel da enfermagem

- Pesar na admissão para calcular volumes.
- Registrar entradas e saídas (vômitos, diarreia, diurese).
- Administrar SRO com paciência; envolver os pais.
- Vigiar hipoglicemia em lactentes.
- Isolamento de contato se etiologia infecciosa.

### Não indicado de rotina

- Antidiarreicos (loperamida).
- Antibióticos salvo disenteria com sangue ou indicação específica.
- Dieta restritiva prolongada; reintroduzir alimentos precocemente.`,
    bibliography: [
      {
        citation: 'World Health Organization. The treatment of diarrhoea: a manual for physicians and other senior health workers — Plan A, B, C.',
        url: 'https://www.who.int/publications/i/item/9789241593183',
      },
      {
        citation: 'American Academy of Pediatrics. Clinical Practice Guideline: Maintenance Intravenous Fluids in Children. Pediatrics. 2018.',
        url: 'https://publications.aap.org/pediatrics/article/142/6/e20183083/38604',
      },
      {
        citation: 'Weiss SL, et al. Surviving Sepsis Campaign Pediatric Guidelines — reanimação com fluidos.',
        url: 'https://sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-pediatric-guidelines',
      },
      {
        citation: 'SATI — Pediatria.',
        url: 'https://www.sati.org.ar/pediatria/',
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

console.log(`\nLote 3 protocolos: ${protocols.length} monografías pt-BR (pediátrico)`);
