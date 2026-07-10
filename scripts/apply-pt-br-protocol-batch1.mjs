#!/usr/bin/env node
/** Lote 1/5 — 10 protocolos adulto pt-BR desde español revisado (formato, estilo y valores numéricos idénticos al ES) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_BASE = path.join(__dirname, '../content/locales/pt-BR/categories');

const protocols = [
  {
    id: 'cur-001',
    category: 'adulto',
    title: 'Curativo de ferida cirúrgica',
    version: '1.2',
    executiveSummary:
      'Realizar curativo estéril, avaliar sinais de infecção de sítio cirúrgico e documentar a evolução da ferida a cada turno.',
    body: `## Passos a realizar

1. Realizar higienização das mãos (técnica OMS) e verificar a identidade do paciente.
2. Preparar material estéril: luvas, solução fisiológica ou antisséptico indicado, gazes e curativo oclusivo.
3. Avaliar a ferida: eritema, exsudato, odor, bordas, dor e sinais de deiscência.
4. Retirar o curativo anterior com técnica asséptica.
5. Limpar do centro para a periferia com material estéril; não reutilizar material em zonas contaminadas.
6. Aplicar curativo conforme prescrição e fixar sem tensão.
7. Registrar achados, tipo de exsudato e conduta no prontuário de enfermagem.
8. Comunicar imediatamente secreção purulenta, deiscência, celulite ou febre.

## Fundamentação científica

### Indicações

Procedimento de enfermagem para curativo de ferida cirúrgica em adulto hospitalizado.

### Material

- Luvas estéreis
- Solução fisiológica ou antisséptico indicado na prescrição
- Gazes estéreis
- Curativo oclusivo

### Evidência e recomendações

> **OMS 2018:** Prevenção de infecção de sítio cirúrgico mediante técnica asséptica, curativo estéril e vigilância de sinais locais.

> **SATI — Infectologia Crítica:** Manejo de infecções de pele e partes moles com encaminhamento precoce diante de sinais de complicação.

### Critérios de encaminhamento

- Secreção purulenta ou fétida.
- Deiscência de sutura ou evisceração.
- Celulite perilesional em progressão.
- Febre ou piora da dor local sem explicação.

### Complicações

- Infecção de sítio cirúrgico.
- Deiscência ou evisceração.
- Celulite perilesional.
- Atraso na cicatrização.`,
    bibliography: [
      {
        citation:
          'World Health Organization. Global Guidelines for the Prevention of Surgical Site Infection. WHO, 2018.',
        url: 'https://www.who.int/publications/i/item/global-guidelines-for-the-prevention-of-surgical-site-infection',
      },
      {
        citation:
          'SATI — Comitê de Infectologia Crítica. Guia de manejo de infecções de pele e partes moles.',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
      {
        citation: 'World Health Organization. Infection prevention and control in health care.',
        url: 'https://www.who.int/teams/integrated-health-services/infection-prevention-control',
      },
      {
        citation: 'SATI — Guias e consensos gerais.',
        url: 'https://www.sati.org.ar/guias/',
      },
    ],
  },
  {
    id: 'dia-001',
    category: 'adulto',
    title: 'Colocação de cateter de diálise',
    version: '1.1',
    executiveSummary:
      'Colocar cateter de hemodiálise com técnica estéril, sítio de jugular interna preferido, ultrassonografia quando disponível e plano de retirada ou conversão para fístula conforme KDOQI e prevenção de infecção (SATI/SADI).',
    body: `## Passos a realizar

1. Identificar o paciente, verificar prescrição e consentimento; revisar plaquetas/INR conforme protocolo.
2. Posicionar em Trendelenburg leve (15°) se jugular.
3. Realizar higienização das mãos e barreira estéril máxima (touca, máscara, campo amplo, luvas estéreis).
4. Preparar a pele com clorexidina alcoólica em área ampla; **deixar secar**.
5. Auxiliar na inserção ecoguiada; manter campo estéril.
6. Verificar fluxo e refluxo em **ambas as vias**; eliminar ar.
7. Suturar e fixar; aplicar curativo estéril.
8. Conectar linhas conforme marcação arterial/venosa (não inverter).
9. Registrar sítio, calibre, tipo (tunelizado/não tunelizado), operador e hora.
10. Vedar as vias com solução anticoagulante conforme protocolo (heparina ou citrato).
11. Antes de cada sessão de HD: desinfetar o hub com clorexidina alcoólica (fricção ≥ 15 s); conectar o circuito sem contaminar as vias.
12. Ao finalizar a sessão, lavar e vedar as vias conforme protocolo da unidade de diálise.

## Fundamentação científica

### Indicações

- Necessidade de hemodiálise imediata sem fístula ou enxerto funcionante.
- Acesso vascular ponte enquanto amadurece acesso autólogo.
- Terapia de substituição renal em UTI (IRA grave) conforme critério médico.

### Tipos de cateter

| Tipo | Uso |
| --- | --- |
| **Não tunelizado** (temporário) | Urgência, IRA, ponte até fístula ou cateter tunelizado |
| **Tunelizado com cuff** | Hemodiálise crônica sem acesso autólogo disponível |

Ambos são cateteres venosos centrais de **dupla via** (arterial/venoso para circuito de HD).

### Seleção do sítio

| Sítio | Recomendação |
| --- | --- |
| **Jugular interna direita** | Primeira opção (menor risco de estenose central vs subclávia) |
| **Jugular interna esquerda** | Alternativa |
| **Femoral** | Somente temporário e de curta duração; maior risco infeccioso |
| **Subclávia** | **Evitar** se possível (alto risco de estenose venosa central) |

### Evidência e recomendações

> **KDOQI 2019 (Lok et al.):** O cateter deve ser a **última opção** na DRC estágio 5. Planejar acesso autólogo e retirar o cateter quando não for mais necessário.

> **SATI/SADI 2025:** Prevenção de infecção de cateter com técnica asséptica estrita e cuidado das vias.

### Contraindicações relativas

- Infecção no sítio de punção.
- Trombose venosa central ipsilateral conhecida.
- Coagulopatia grave não corrigida (avaliar risco/benefício).

### Complicações — comunicar imediatamente

- Sangramento ativo, hematoma em expansão ou comprometimento de via aérea.
- Pneumotórax ou dispneia aguda pós-inserção.
- Febre, calafrios ou secreção purulenta no sítio (suspeita de infecção de cateter / bacteremia).
- Obstrução de ambas as vias ou recirculação excessiva na diálise.`,
    bibliography: [
      {
        citation:
          'Lok CE, Huber TS, Lee T, et al. KDOQI Clinical Practice Guideline for Vascular Access: 2019 Update. Am J Kidney Dis. 2020;75(4 Suppl 2):S1-S164.',
        url: 'https://www.kidney.org/professionals/kdoqi/guidelines-and-commentaries/vascular-access',
      },
      {
        citation: 'Lok CE, Huber TS, Lee T. KDOQI 2019 Vascular Access Guidelines: What Is New. Am J Kidney Dis. 2020.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/35210726/',
      },
      {
        citation:
          'Cornistein W, et al. Infecciones asociadas a catéteres venosos centrales. Actualización intersociedades SATI/SADI 2025.',
        url: 'https://www.scielo.org.ar/scielo.php?pid=S0025-76802025001001337&script=sci_arttext',
      },
      {
        citation:
          'World Health Organization. Guidelines for prevention of BSI associated with central venous catheters — Part 2. WHO, 2024.',
        url: 'https://www.who.int/publications/i/item/9789240121805',
      },
    ],
  },
  {
    id: 'dip-001',
    category: 'adulto',
    title: 'Colocação de cateter de diálise peritoneal',
    version: '1.1',
    executiveSummary:
      'Auxiliar na colocação de cateter de Tenckhoff com técnica estéril, sítio infraumbilical e cuidados pós-operatórios imediatos conforme ISPD/KDOQI.',
    body: `## Passos a realizar

1. Verificar identificação do paciente, prescrição, consentimento e jejum conforme protocolo cirúrgico.
2. Confirmar antibiótico profilático administrado se indicado.
3. Preparar material estéril: cateter de DP (Tenckhoff), campo, luvas, antisséptico e curativo oclusivo.
4. Realizar higienização das mãos e vestir barreira estéril conforme função (circulante ou instrumentador).
5. Posicionar o paciente em decúbito dorsal; desinfetar o abdome com clorexidina alcoólica em área ampla; deixar secar.
6. Auxiliar na inserção: incisão infraumbilical, dissecção até o peritônio, introdução do cateter e comprovação de fluxo do líquido dialisador.
7. Verificar se o cateter drena e aspira corretamente; fixar com pontos de sutura conforme técnica.
8. Realizar curativo da ferida com curativo estéril; deixar o cateter orientado caudalmente e fixado sem tensão.
9. Registrar tipo de cateter, sítio, operador, hora e teste de fluxo.
10. Transferir para unidade com cuidados pós-operatórios: vigiar dor, sangramento, peritonismo e função do cateter.
11. Orientar o paciente: não molhar a ferida conforme protocolo; evitar esforço abdominal inicial; laxante se indicado.

## Fundamentação científica

### Indicações

- Início de terapia de substituição renal com **diálise peritoneal (DP)** como modalidade crônica ou ponte.
- Doença renal crônica estágio 5 quando a DP é modalidade elegida (KDOQI 2019).
- Ponte temporária para hemodiálise em situações selecionadas.

### Tipo de cateter

| Característica | Recomendação |
| --- | --- |
| Modelo | Tenckhoff com dois cuffs (superficial e profundo) |
| Sítio de saída | Infraumbilical, lateral à linha média |
| Orientação | Distal em direção à pelve (evitar kinking) |
| Túnel | Configuração com trajetória descendente (reduz infecção) |

### Evidência e recomendações

> **ISPD Guidelines on Peritoneal Access (2020):** preferir colocação por equipe treinada; profilaxia antibiótica perioperatória; evitar saída do cateter em prega cutânea ou zona de pressão (Brown et al., 2020).

> **KDOQI Vascular Access 2019:** planejar acesso com antecedência na DRC avançada; DP é modalidade válida quando o paciente está informado e capacitado (Lok et al., 2020).

### Papel da enfermagem

- Preparação pré-operatória e checklist de segurança.
- Assistência em campo estéril e registro de eventos.
- Cuidados pós-operatórios imediatos e educação inicial.
- Coordenação com nefrologia para primeira troca conforme protocolo.

### Cuidados pós-operatórios (primeiras 48–72 h)

- Vigiar sinais vitais, dor, sangramento na ferida e peritonismo.
- Manter curativo seco; curativo conforme protocolo após período inicial.
- Evitar manipulação desnecessária do cateter.
- Não iniciar trocas até ordem médica e fluxo confirmado.

### Complicações — comunicar imediatamente

- Sangramento ativo ou hematoma abdominal em expansão.
- Dor abdominal intensa, febre ou defesa (suspeita de perfuração ou peritonite).
- Ausência de fluxo ou vazamento de líquido peridrenagem.
- Eritema ou exsudato purulento no sítio de saída do cateter.`,
    bibliography: [
      {
        citation: 'Brown EA, et al. ISPD Guidelines for Peritoneal Access. Perit Dial Int. 2020;40(4):297-310.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32316758/',
      },
      {
        citation:
          'Lok CE, Huber TS, Lee T, et al. KDOQI Clinical Practice Guideline for Vascular Access: 2019 Update. Am J Kidney Dis. 2020.',
        url: 'https://www.kidney.org/professionals/kdoqi/guidelines-and-commentaries/vascular-access',
      },
      {
        citation: 'Li PK, et al. ISPD Guidelines for Peritoneal Dialysis. Perit Dial Int. 2022 updates.',
        url: 'https://www.ispd.org/guidelines',
      },
      {
        citation: 'SATI — Comitê de Nefrologia. Recomendações em terapia de substituição renal.',
        url: 'https://www.sati.org.ar/',
      },
      {
        citation: 'World Health Organization. Guidelines for surgical site infection prevention. WHO, 2018.',
        url: 'https://www.who.int/publications/i/item/9789241550475',
      },
    ],
  },
  {
    id: 'dpp-001',
    category: 'adulto',
    title: 'Diálise peritoneal: trocas e cuidados',
    version: '1.1',
    executiveSummary:
      'Realizar trocas de DP com técnica asséptica estrita, vigiar peso e sinais de peritonite, e documentar cada sessão conforme ISPD.',
    body: `## Passos a realizar

1. Verificar identificação do paciente e prescrição (modalidade CAPD/APD, volume, tempo de permanência, concentração do dialisador).
2. Realizar higienização das mãos e preparar material: bolsa de dialisador, equipo de transferência, máscara se o protocolo indicar.
3. Fechar portas e janelas; reduzir correntes de ar no ambiente.
4. Colocar touca e máscara; realizar nova higienização das mãos.
5. Desinfetar tampa do cateter e conexões com clorexidina alcoólica ou povidona iodada conforme protocolo; fricção ≥ 15 s; deixar secar.
6. **Drenagem:** conectar o equipo; abrir a pinça de drenagem; permitir saída completa do líquido peritoneal; registrar volume drenado e aspecto do líquido.
7. **Infusão:** conectar bolsa de dialisador fresca; verificar ausência de ar no sistema; infundir volume prescrito.
8. Fechar pinças na ordem correta; desconectar com técnica asséptica; aplicar tampa estéril ao cateter.
9. Descartar material de uso único; registrar hora, volume infundido/drenado, concentração e intercorrências.
10. Pesar o paciente conforme protocolo; vigiar dor abdominal, febre ou turvação do efluente.
11. Diante de efluente turvo ou sintomas: não reintroduzir dialisador; comunicar imediatamente e coletar amostra de efluente para cultivo.

## Fundamentação científica

### Modalidades

| Modalidade | Descrição |
| --- | --- |
| **CAPD** | Trocas manuais várias vezes ao dia |
| **APD** | Ciclador noturno automatizado (auxiliar na conexão/desconexão) |

### Indicações da técnica asséptica

> **ISPD Peritonitis Guidelines (2016/2022):** a maioria das peritonites origina-se por contaminação no momento da conexão. A técnica asséptica estrita é o pilar da prevenção (Li et al., 2016).

### Cuidados do cateter e sítio de saída

- Revisar o sítio de saída diariamente: eritema, exsudato, granuloma, dor.
- Classificar conforme escala de sítio de saída (ISPD); não usar antissépticos de rotina salvo indicação.
- Fixar o cateter para evitar tração; cinto de suporte se aplicável.
- Banho: proteger o sítio conforme protocolo (chuveiro com proteção, sem imersão).

### Monitorização

| Parâmetro | Frequência |
| --- | --- |
| Peso | Diário |
| Pressão arterial | Conforme protocolo |
| Efluente (clareza, volume) | A cada troca |
| Balanço hídrico | Diário |
| Glicemia (se dialisador com glicose) | Conforme indicação |

### Critérios de suspeita de peritonite

- Efluente turvo.
- Dor abdominal.
- Febre.
- Náuseas ou vômitos.

**Conduta:** coletar amostra de efluente (primeiro efluente após 2–4 h de permanência mínimo conforme ISPD), iniciar antibiótico intraperitoneal conforme prescrição, não descartar bolsa de dialisador até indicação.

### Complicações — comunicar imediatamente

- Peritonite (efluente turvo + sintomas).
- Vazamento de dialisador (úmido no sítio de saída ou região genital).
- Obstrução do cateter (drenagem incompleta).
- Desidratação ou sobrecarga hídrica marcada.
- Hérnia abdominal ou dor persistente.`,
    bibliography: [
      {
        citation: 'Li PK, et al. ISPD Peritonitis Recommendations 2016. Perit Dial Int. 2016;36(5):481-508.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27649941/',
      },
      {
        citation: 'Li PK, et al. ISPD Guidelines for Peritoneal Dialysis. Perit Dial Int. 2022.',
        url: 'https://www.ispd.org/guidelines',
      },
      {
        citation: 'Brown EA, et al. ISPD Guidelines for Peritoneal Access. Perit Dial Int. 2020.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32316758/',
      },
      {
        citation: 'Lok CE, et al. KDOQI Clinical Practice Guideline for Vascular Access: 2019 Update.',
        url: 'https://www.kidney.org/professionals/kdoqi/guidelines-and-commentaries/vascular-access',
      },
      {
        citation: 'International Society for Peritoneal Dialysis — patient and caregiver education resources.',
        url: 'https://www.ispd.org/',
      },
    ],
  },
  {
    id: 'hem-001',
    category: 'adulto',
    title: 'Coleta de hemocultura',
    version: '1.1',
    executiveSummary:
      'Coletar dois pares de hemocultura por punção venosa periférica antes do antibiótico se possível, 10–15 ml por frasco, com técnica asséptica estrita para minimizar contaminação.',
    body: `## Passos a realizar

1. Identificar o paciente e registrar hora, sítio e motivo da coleta.
2. Realizar higienização das mãos (momento 2 OMS: antes de procedimento asséptico).
3. Preparar frascos aeróbico + anaeróbico em temperatura ambiente; desinfetar tampa com álcool 70% e deixar secar.
4. Desinfetar a pele com clorexidina alcoólica em fricção; ampliar área; **deixar secar** ≥ 30 s.
5. Realizar punção venosa com técnica asséptica; não repassar pele desinfetada com dedos não estéreis.
6. Coletar sangue e inocular frascos na ordem conforme sistema (vácuo: aeróbico primeiro; seringa: anaeróbico primeiro).
7. Inocular **10–15 ml por frasco** em adultos (respeitar fabricante).
8. Misturar suavemente por inversão (não agitar vigorosamente).
9. Etiquetar em mesa limpa: nome, data, hora, sítio.
10. Realizar higienização das mãos ao finalizar (momentos 3 e 4 OMS).
11. Transportar ao laboratório **imediatamente**; registrar hora da coleta e início do antibiótico se aplicável.
12. Comunicar resultado positivo com patógeno, suspeita de contaminação ou deterioração clínica.

## Fundamentação científica

### Indicações principais

- Suspeita clínica de **sepse** ou choque séptico.
- Febre de origem desconhecida ou calafrios com instabilidade.
- Suspeita de endocardite infecciosa.
- Avaliação de febre em paciente com dispositivos intravasculares.
- Suspeita de bacteremia associada ao cateter (protocolo específico institucional).

### Número de amostras (adulto)

| Situação | Pares recomendados |
| --- | --- |
| Sepse / suspeita de bacteremia | **2 pares** (mínimo) |
| Endocardite aguda | 3 pares de sítios distintos |
| Febre de origem desconhecida | 2–3 pares conforme protocolo |

Cada **par** = 1 frasco **aeróbico** + 1 frasco **anaeróbico**.

### Momento da coleta

- **Ideal:** antes de iniciar antibióticos.
- **Não é obrigatório** coincidir com pico febril; pode realizar-se diante de suspeita clínica.
- Se já recebe antibióticos: coletar em concentração de vale (imediatamente antes da próxima dose) ou conforme protocolo local.
- Em urgência séptica: os dois pares podem ser coletados **simultaneamente** de extremidades distintas sem retardar tratamento.

### Evidência e recomendações

> **Surviving Sepsis 2021 (Evans et al.):** Obter culturas **antes** do antibiótico empírico se não retardar seu início por mais de 45 minutos.

> **SATI — Coleta de amostras microbiológicas em UTI:** Técnica asséptica estrita para minimizar contaminação por flora cutânea.

### Sítio de punção

- **Preferir punção venosa periférica** em sítios distintos.
- Evitar punção acima de acesso venoso periférico em uso.
- Sangue de cateter central: somente se suspeitar infecção do cateter e conforme protocolo (pares periférico + central).

### Prevenção de contaminação

- Não tocar tampa do frasco nem interior da tampa após desinfecção.
- Trocar agulha antes de inocular se o protocolo indicar.
- Não usar o mesmo par de punção para outras amostras sem ordem asséptica.

### Complicações

- Contaminação por flora cutânea (falsos positivos).
- Hematoma ou dor no sítio de punção.
- Atraso no transporte que invalida interpretação.`,
    bibliography: [
      {
        citation:
          'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34605781/',
      },
      {
        citation: 'SATI — Coleta de amostras microbiológicas em UTI (Comitê de Infectologia Crítica).',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
      {
        citation:
          'Guia de prática clínica de enfermagem sobre hemoculturas — Consejo General de Enfermería de España (baseada em evidência 2024-2025).',
        url: 'https://www.consejogeneralenfermeria.org/profesion/guias-clinicas/send/160-guias-clinicas/3122-guia-de-practica-clinica-enfermera-sobre-hemocultivos-actualizacion',
      },
      {
        citation:
          'Cornistein W, et al. Infecciones asociadas a catéteres venosos centrales. Actualización intersociedades SATI/SADI 2025.',
        url: 'https://www.scielo.org.ar/scielo.php?pid=S0025-76802025001001337&script=sci_arttext',
      },
    ],
  },
  {
    id: 'hig-001',
    category: 'adulto',
    title: 'Higienização das mãos e prevenção de IRAS',
    version: '1.1',
    executiveSummary:
      'Aplicar os 5 momentos de higienização das mãos da OMS e o bundle multimodal SATI para prevenir infecções relacionadas à assistência à saúde.',
    body: `## Passos a realizar

1. Realizar higienização das mãos nos **5 momentos OMS**: antes de tocar o paciente, antes de tarefa asséptica, após risco de fluidos corporais, após tocar o paciente, após tocar o ambiente.
2. Usar solução alcoólica com fricção por 20–30 segundos até secar quando as mãos não estão visivelmente sujas.
3. Lavar com sabão e água quando há sujidade visível, esporos (C. difficile) ou surto de vírus entéricos.
4. Aplicar medidas de isolamento conforme via de transmissão (contato, gotículas, aerossóis).
5. Cuidar de acessos vasculares e dispositivos urinários conforme protocolo institucional.
6. Realizar limpeza e desinfecção do ambiente do paciente.
7. Comunicar surtos ou colonizações multirresistentes.
8. Registrar cumprimento em observações diretas e eventos associados a dispositivos (AVP, SV, VM).

## Fundamentação científica

### Indicações

Reduzir infecções relacionadas à assistência à saúde (IRAS) mediante higienização das mãos e medidas de barreira padronizadas.

### Cinco momentos de higienização das mãos (OMS)

1. Antes de tocar o paciente.
2. Antes de realizar tarefa asséptica.
3. Após risco de exposição a fluidos corporais.
4. Após tocar o paciente.
5. Após tocar o ambiente do paciente.

### Evidência e recomendações

> **OMS 2009:** A higienização das mãos é a intervenção mais efetiva para prevenir IRAS. Solução alcoólica como método preferencial salvo contraindicações.

> **SATI — Infectologia Crítica:** Bundle multimodal que inclui isolamento, cuidado de dispositivos, limpeza ambiental e stewardship antimicrobiano.

### Bundle multimodal (SATI — Infectologia Crítica)

- Medidas de isolamento conforme via de transmissão (contato, gotículas, aerossóis).
- Cuidado de acessos vasculares e dispositivos urinários conforme protocolo.
- Limpeza e desinfecção do ambiente do paciente.
- Uso racional de antimicrobianos (programa de stewardship).

### Indicadores de enfermagem

- Cumprimento de higienização das mãos em observações diretas.
- Registro de eventos associados a dispositivos (AVP, SV, VM).
- Comunicação de surtos ou colonizações multirresistentes.

### Complicações

- Transmissão de microorganismos multirresistentes.
- Infecções associadas a dispositivos (ICS, ITU-SV, PAV).
- Surtos nosocomiais.`,
    bibliography: [
      {
        citation: 'World Health Organization. WHO Guidelines on Hand Hygiene in Health Care. WHO, 2009.',
        url: 'https://www.who.int/publications/i/item/9789241597906',
      },
      {
        citation:
          'SATI — Consenso interinstitucional: estratégia multimodal de prevenção de infecções associadas a dispositivos.',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
      {
        citation: 'SATI — Guias e consensos.',
        url: 'https://www.sati.org.ar/guias/',
      },
      {
        citation: 'World Health Organization. Infection prevention and control in health care.',
        url: 'https://www.who.int/teams/integrated-health-services/infection-prevention-control',
      },
    ],
  },
  {
    id: 'med-001',
    category: 'adulto',
    title: 'Administração segura de medicação IV',
    version: '1.1',
    executiveSummary:
      'Verificar as 9 certezas, compatibilidade e velocidade de infusão; usar bomba de infusão em drogas vasoativas e antibióticos críticos.',
    body: `## Passos a realizar

1. Realizar higienização das mãos e preparar medicação em área limpa.
2. Verificar as **9 certezas**: paciente, medicamento, dose, via, hora, registro, razão, resposta e forma de administração.
3. Confirmar prescrição, alergias e função renal/hepática se aplicável.
4. Preparar medicação conforme protocolo de diluição institucional.
5. Desinfetar conexão e usar técnica asséptica.
6. Administrar com bomba de infusão quando indicado (vasopressores, potássio, antibióticos críticos).
7. Vigiar reações adversas durante e após a infusão.
8. Documentar hora, dose, via e resposta no prontuário.
9. Notificar imediatamente extravasamento, flebite, reação alérgica ou erro de medicação.

## Fundamentação científica

### Indicações

Administração segura de medicação intravenosa em adulto hospitalizado, incluindo fármacos de alto risco.

### As 9 certezas

1. Paciente correto.
2. Medicamento correto.
3. Dose correta.
4. Via correta.
5. Hora correta.
6. Registro correto.
7. Razão correta.
8. Resposta correta (vigiar efeitos).
9. Forma correta de administração.

### Precauções especiais

| Tipo de fármaco | Precaução |
| --- | --- |
| Vasopressores | Via central preferencial; bomba dedicada |
| Potássio IV | Nunca em bolus; velocidade máxima conforme protocolo |
| Antibióticos críticos | Respeitar tempo de infusão (ex.: beta-lactâmicos prolongados) |
| Fármacos fotossensíveis | Proteger da luz |

### Evidência e recomendações

> **ISMP:** Guias para prática segura de medicação IV em bolus em adultos.

> **OMS — Medication Without Harm:** Verificação sistemática e registro como pilares da segurança do paciente.

### Eventos a notificar imediatamente

- Extravasamento ou flebite.
- Reação alérgica ou anafilaxia.
- Erro de medicação ou dúvida na prescrição.

### Complicações

- Extravasamento de fármacos vesicantes.
- Flebite química ou infecciosa.
- Anafilaxia.
- Erro de medicação com dano ao paciente.`,
    bibliography: [
      {
        citation:
          'Institute for Safe Medication Practices (ISMP). Guidelines for Safe Practice of Adult IV Push Medications.',
        url: 'https://www.ismp.org/guidelines/iv-push',
      },
      {
        citation: 'World Health Organization. Patient Safety — Medication Without Harm.',
        url: 'https://www.who.int/teams/integrated-health-services/patient-safety/policy/medication-without-harm',
      },
      {
        citation: 'SATI — Recomendações gerais para sedoanalgesia e manejo de infusões em UTI.',
        url: 'https://www.sati.org.ar/guias-comite-neumonologia-critica-cnc/',
      },
      {
        citation: 'Gorski LA, Hadaway L, Hagle ME, et al. Infusion Therapy Standards of Practice, 9th ed. J Infus Nurs. 2024.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/38320480/',
      },
    ],
  },
  {
    id: 'nac-001',
    category: 'adulto',
    title: 'Pneumonia adquirida na comunidade (adulto)',
    version: '1.1',
    executiveSummary:
      'Avaliar gravidade, oxigenar conforme necessidade, obter culturas se indicado e iniciar antibiótico empírico precoce conforme cenário clínico.',
    body: `## Passos a realizar

1. Registrar sinais vitais completos: FR, SpO₂, PA, FC, temperatura e estado mental.
2. Aplicar escala de gravidade institucional (CURB-65, PSI ou critério médico local).
3. Confirmar imagem compatível (radiografia de tórax ou outra indicada).
4. Obter hemoculturas se a doença for moderada-grave ou requerer internação.
5. Solicitar antígeno urinário de pneumococo e Legionella conforme protocolo local.
6. Administrar oxigenoterapia titulada (objetivo SpO₂ 92–96% na maioria dos adultos).
7. Controlar hidratação e febre conforme prescrição.
8. Monitorizar trabalho respiratório; preparar suporte avançado se houver deterioração.
9. Aplicar isolamento respiratório conforme suspeita (TBC, gripe, COVID-19, etc.).
10. Orientar o paciente sobre adesão antibiótica e sinais de alarme.

## Fundamentação científica

### Indicações

Infecção aguda do parênquima pulmonar adquirida fora do hospital ou nas primeiras 48 h de internação, em paciente não exposto recentemente a fatores de risco de multirresistência.

### Avaliação inicial

- Sinais vitais, FR, SpO₂, estado mental, balanço hídrico.
- Escala de gravidade institucional (CURB-65, PSI ou critério médico local).
- Radiografia de tórax ou imagem compatível.
- Hemoculturas se moderada-grave ou internação.
- Antígeno urinário pneumococo / Legionella conforme protocolo local.

### Evidência e recomendações

> **ATS/IDSA 2019 (Metlay et al.):** Diagnóstico clínico-radiológico com estratificação de gravidade para decidir ambulatorial vs hospitalização. Antibiótico empírico precoce conforme cenário clínico.

> **SATI — Comitê de Pneumologia Crítica:** Recomendações específicas para pneumonia adquirida na comunidade em adultos hospitalizados.

### Critérios de encaminhamento à UTI

- Necessidade de ventilação mecânica ou VNI com instabilidade.
- Choque séptico ou hipotensão persistente.
- Alteração grave do estado de consciência.
- Hipoxemia refratária (PaO₂/FiO₂ < 250 com oxigênio suplementar).

### Complicações

- Insuficiência respiratória aguda.
- Sepse / choque séptico.
- Derrame pleural complicado ou empiema.
- Atraso no antibiótico ou oxigenoterapia inadequada.`,
    bibliography: [
      {
        citation: 'SATI — Comitê de Pneumologia Crítica. Pneumonia adquirida na comunidade.',
        url: 'https://www.sati.org.ar/guias-comite-neumonologia-critica-cnc/',
      },
      {
        citation:
          'Metlay JP, Waterer GW, Long AC, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the ATS and IDSA. Am J Respir Crit Care Med. 2019;200(7):e45-e67.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31573350/',
      },
      {
        citation: 'SATI — Guias e consensos gerais.',
        url: 'https://www.sati.org.ar/guias/',
      },
      {
        citation: 'Evans L, et al. Surviving Sepsis Campaign 2021 — manejo de sepse de origem respiratória.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34605781/',
      },
    ],
  },
  {
    id: 'nav-001',
    category: 'adulto',
    title: 'Prevenção de pneumonia associada à ventilação mecânica',
    version: '1.1',
    executiveSummary:
      'Aplicar o bundle de prevenção de PAV: higiene bucal, elevação da cabeceira, sedação mínima, desmame ventilatório precoce e manejo do circuito.',
    body: `## Passos a realizar

1. Realizar higiene bucal com clorexidina a cada 6–8 h (salvo contraindicação).
2. Manter elevação da cabeceira 30–45° de forma contínua, salvo contraindicação hemodinâmica.
3. Aplicar sedação mínima e avaliar diariamente janela de sedação / prova de respiração espontânea conforme protocolo médico.
4. Administrar profilaxia de úlcera por estresse e tromboprofilaxia conforme prescrição.
5. Manejar o circuito: não trocar rotineiramente; evitar condensado na via aérea.
6. Aplicar descontaminação digestiva seletiva somente se indicada por protocolo institucional.
7. Realizar higienização das mãos estrita antes e após manipular a via aérea.
8. Vigiar temperatura, secreções traqueais (quantidade, cor, odor) e oxigenação.
9. Registrar dias de ventilação mecânica e eventos associados.
10. Comunicar febre nova, secreções purulentas ou piora radiológica imediatamente.

## Fundamentação científica

### Indicações

Pneumonia que se desenvolve ≥ 48 horas após intubação endotraqueal e ventilação mecânica invasiva.

### Evidência e recomendações

> **SATI / Sociedade Argentina de Infectologia 2024:** Consenso intersociedades sobre prevenção de pneumonia associada à ventilação mecânica com bundle multimodal.

> **Klompas et al. 2022 (SHEA/IDSA):** Atualização de estratégias para prevenir PAV, eventos ventilatórios associados e pneumonia nosocomial não ventilatória.

### Bundle de prevenção (referência)

| Medida | Frequência / critério |
| --- | --- |
| Higiene bucal com clorexidina | A cada 6–8 h |
| Elevação da cabeceira | 30–45° contínua |
| Sedação mínima | Avaliação diária |
| Manejo do circuito | Sem troca rotineira |

### Critérios de suspeita clínica

- Febre nova ou leucocitose/leucopenia.
- Secreções purulentas aumentadas.
- Piora da oxigenação ou infiltrado radiológico novo.

### Complicações

- Pneumonia associada à ventilação mecânica confirmada.
- Prolongação da ventilação mecânica e permanência em UTI.
- Sepse respiratória.`,
    bibliography: [
      {
        citation:
          'SATI / Sociedade Argentina de Infectologia. Pneumonia Associada à Ventilação Mecânica — Atualização e Consenso Intersociedades 2024.',
        url: 'https://www.sati.org.ar/comite-de-infectologia-critica/',
      },
      {
        citation: 'SATI — Comitê de Pneumologia Crítica. Guia de prevenção da pneumonia associada à VM.',
        url: 'https://www.sati.org.ar/guias-comite-neumonologia-critica-cnc/',
      },
      {
        citation:
          'Klompas M, et al. Strategies to Prevent Ventilator-Associated Pneumonia, Ventilator-Associated Events, and Nonventilator Hospital-Acquired Pneumonia in Acute-Care Hospitals: 2022 Update. Infect Control Hosp Epidemiol. 2022.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36062715/',
      },
      {
        citation: 'World Health Organization. Infection prevention and control in health care.',
        url: 'https://www.who.int/teams/integrated-health-services/infection-prevention-control',
      },
    ],
  },
  {
    id: 'oxi-001',
    category: 'adulto',
    title: 'Oxigenoterapia em adulto hospitalizado',
    version: '1.1',
    executiveSummary:
      'Titular oxigênio para atingir saturação objetivo, reavaliar necessidade a cada 24 h e vigiar retenção de CO₂ em pacientes com DPOC.',
    body: `## Passos a realizar

1. Verificar prescrição e objetivo de SpO₂ conforme perfil do paciente.
2. Selecionar dispositivo adequado (cateter nasal, máscara simples, reservatório, VNI ou VM conforme indicação).
3. Ajustar fluxo e confirmar saturação dentro da faixa objetivo.
4. Hidratar mucosas e revisar integridade cutânea pelo dispositivo.
5. Monitorizar SpO₂, FR, trabalho respiratório e nível de consciência.
6. Reavaliar necessidade de oxigênio pelo menos a cada 24 h.
7. Registrar dispositivo, fluxo e resposta no prontuário.
8. Suspender oxigênio se o paciente atingir saturação objetivo em ar ambiente.

## Fundamentação científica

### Indicações

- Hipoxemia documentada (SpO₂ abaixo do objetivo ou PaO₂ < 60 mmHg).
- Insuficiência respiratória aguda ou em contexto de sepse, PAC, edema pulmonar, etc.

### Objetivos de saturação

| Perfil do paciente | SpO₂ objetivo |
| --- | --- |
| Adulto sem risco de hipercapnia | 92–96% |
| DPOC / risco de hipercapnia | 88–92% (ajustar conforme gasometria) |
| Gestação | ≥ 95% |

### Dispositivos

- **Cateter nasal:** 1–6 L/min (FiO₂ aproximada 24–44%).
- **Máscara simples:** 6–10 L/min.
- **Máscara com reservatório:** alto fluxo; requer vigilância estreita.
- **VNI / VM:** conforme prescrição médica.

### Evidência e recomendações

> **BTS 2017 (O'Driscoll et al.):** Titular oxigênio para atingir saturação objetivo; evitar oxigenoterapia de manutenção sem indicação.

> **Surviving Sepsis Campaign 2021:** Manter SpO₂ ≥ 92% na sepse, ajustando conforme comorbidades.

### Complicações

- Retenção de CO₂ em pacientes com DPOC ou risco de hipercapnia.
- Lesão por pressão do dispositivo.
- Hipoxemia por fluxo insuficiente ou dispositivo mal posicionado.`,
    bibliography: [
      {
        citation:
          "O'Driscoll BR, Howard LS, Earis J, et al. BTS Guideline for Oxygen Use in Adults in Healthcare and Emergency Settings. Thorax. 2017;72(Suppl 1):ii1-ii90.",
        url: 'https://pubmed.ncbi.nlm.nih.gov/28507176/',
      },
      {
        citation:
          'SATI — Comitê de Pneumologia Crítica. Recomendações em paciente crítico ventilado e suporte respiratório.',
        url: 'https://www.sati.org.ar/guias-comite-neumonologia-critica-cnc/',
      },
      {
        citation: 'Evans L, et al. Surviving Sepsis Campaign 2021 — recomendações sobre oxigenação e ventilação.',
        url: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines',
      },
      {
        citation: 'World Health Organization. Oxygen therapy for acute and chronic conditions.',
        url: 'https://www.who.int/health-topics/oxygen',
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

console.log(`\nLote 1 protocolos: ${protocols.length} monografías pt-BR (adulto)`);
