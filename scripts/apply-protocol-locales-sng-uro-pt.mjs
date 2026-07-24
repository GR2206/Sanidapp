#!/usr/bin/env node
/** Remaining pt-BR locales: sng-p001, neo-i-008, uro-001, uro-p001, neo-i-009 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function writeLocale(category, protocol) {
  const dir = path.join(ROOT, 'content/locales/pt-BR/categories', category, 'protocols');
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `${protocol.id}.json`);
  fs.writeFileSync(out, `${JSON.stringify(protocol, null, 2)}\n`, 'utf8');
  console.log('wrote', path.relative(ROOT, out));
}

const protocols = [
  {
    id: 'sng-p001',
    title: 'Colocação de sonda nasogástrica pediátrica',
    category: 'pediatrico',
    branch: 'atencion-sanitaria',
    version: '1.0',
    executiveSummary:
      'Colocar sonda nasogástrica em pediatria somente com indicação justificada, medir o comprimento pelo método NEX ou tabela por idade, confirmar posição gástrica antes do uso e proteger a via aérea e a mucosa nasal.',
    body: `## Passos a realizar

1. Verificar indicação, dois identificadores do paciente e a prescrição (calibre, uso, duração). Explicar à família; planejar contenção terapêutica segura e analgesia/sedação conforme protocolo.
2. Avaliar fossas nasais, malformações craniofaciais e nível de consciência; escolher a fossa mais permeável.
3. Higienização das mãos; preparar sonda pediátrica do calibre indicado, lubrificante hidrossolúvel, seringa de precisão, estetoscópio, fixador suave e recipiente para aspirado.
4. Medir o comprimento: nariz → orelha → xifoide (NEX) ou conforme tabela institucional por idade/estatura; marcar a sonda.
5. Posicionar a criança: lactente semi-sentado ou em decúbito lateral com a cabeça levemente fletida; criança maior em Fowler se colaborar.
6. Lubrificar e introduzir pela fossa escolhida para baixo e para trás; estimular a deglutição com chupeta ou goles se for seguro.
7. Avançar até a marca **sem forçar**. Diante de tosse, cianose, recusa intensa ou resistência: retirar e reavaliar (outra fossa, via orogástrica ou supervisão).
8. Confirmar posição gástrica antes do uso: aspirado com pH ≤ 5 quando disponível; radiografia se houver dúvida, nutrição programada ou paciente crítico. Não usar apenas ausculta.
9. Fixar sem comprimir a asa nasal nem o septo; proteger a pele; registrar fossa, Fr, cm na narina, método de confirmação e aspecto do aspirado.
10. Iniciar descompressão, nutrição ou medicação somente após confirmação documentada.
11. Reavaliar a necessidade a cada turno; retirar no primeiro momento clinicamente possível.

## Fundamentação científica

### Indicações

- Descompressão em íleo, pós-operatório abdominal ou vômitos incoercíveis.
- Nutrição enteral quando a via oral é insuficiente (falha de crescimento, disfagia, doença crítica).
- Administração de fármacos quando não há via oral segura.
- Preparo para procedimentos conforme prescrição.

### Contraindicações relativas

- Trauma facial, fratura de base de crânio ou cirurgia recente de via aérea superior.
- Atresia de coanas, estenose nasal bilateral ou malformação craniofacial complexa (coordenar ORL/cirurgia).
- Varizes esofágicas ou cirurgia esofágica recente.
- Coagulopatia não corrigida com risco de epistaxe grave.

### Seleção de calibre (pediátrico)

| Idade / peso aproximado | Calibre (Fr) sugerido |
| --- | --- |
| Lactente < 5 kg | 5–6 Fr |
| Lactente / criança pequena | 6–8 Fr |
| Criança (idade escolar) | 8–10 Fr |
| Adolescente | 10–12 Fr (nutrição); 12–14 Fr (descompressão) |

### Confirmação de posição

| Método | Uso em pediatria |
| --- | --- |
| pH do aspirado | Preferido quando disponível |
| Radiografia | Em dúvida ou nutrição em paciente instável |
| Ausculta isolada | **Não suficiente** |

### Evidência e recomendações

> **AAP / nutrição pediátrica:** a má posição de SNG é um evento adverso prevenível; verificar a localização antes de alimentar (práticas de segurança).

> **ASPEN pediátrico:** confirmar posição gástrica e elevar a cabeceira quando factível para reduzir aspiração.

### Cuidados posteriores

- Higiene nasal/oral; vigiar úlcera por pressão e sinusite.
- Em lactentes: avaliar desconforto respiratório (a sonda ocupa parte da via nasal).
- Controlar tolerância alimentar, resíduo e sinais de aspiração.
- Evitar tração durante a troca de fraldas ou mobilização.

### Complicações — interromper e comunicar

- Suspeita de colocação pulmonar ou em via aérea.
- Epistaxe, apneia ou dessaturação durante a tentativa.
- Perfuração esofágica (rara; dor, enfisema).
- Pneumotórax.
- Úlcera nasal ou deslocamento recorrente.`,
    bibliography: [
      {
        citation:
          'American Academy of Pediatrics. Enteral nutrition and tube feeding in children — clinical considerations and safety.',
        url: 'https://www.aap.org/en/patient-care/',
      },
      {
        citation:
          'Mehta NM, Skillman HE, Irving SY, et al. Guidelines for the Provision and Assessment of Nutrition Support Therapy in the Pediatric Critically Ill Patient (ASPEN). JPEN. 2017.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28686844/',
      },
      {
        citation: 'Boullata JI, et al. ASPEN Safe Practices for Enteral Nutrition Therapy. JPEN. 2017.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28068900/',
      },
      {
        citation: 'NHS / NPSA. Reducing harm from misplaced nasogastric feeding tubes — pediatric considerations.',
        url: 'https://www.england.nhs.uk/patient-safety/',
      },
      {
        citation:
          'SATI — Comitê de Nutrição. Suporte nutricional no paciente crítico (adaptação pediátrica institucional).',
        url: 'https://www.sati.org.ar/',
      },
    ],
  },
  {
    id: 'neo-i-008',
    title: 'Colocação de sonda orogástrica / nasogástrica neonatal',
    category: 'neonatologia',
    branch: 'atencion-sanitaria',
    division: 'intensiva',
    version: '1.0',
    executiveSummary:
      'Em neonatos (dia 0–30, 500–2500 g), preferir sonda orogástrica se houver desconforto respiratório; medir o comprimento com método validado, confirmar posição gástrica antes do uso e fixar sem lesionar a pele nem a via aérea.',
    body: `## Passos a realizar

1. Confirmar indicação (descompressão, alimentação enteral, esvaziamento pré-CPAP/ventilação), identificar o RN (dois identificadores), peso e idade gestacional/pós-natal.
2. Explicar à família; manter termorregulação (berço aquecido/incubadora) durante o procedimento.
3. Preferir **orogástrica** em prematuros com desconforto, CPAP ou ventilação (libera as fossas nasais). Reservar nasogástrica para RN estáveis com via nasal livre e conforme protocolo.
4. Higienização das mãos; preparar sonda 5–8 Fr conforme o peso, lubrificante hidrossolúvel escasso, seringa de precisão, fixador suave e recipiente para aspirado.
5. Medir o comprimento: na orogástrica, ângulo da boca → orelha → xifoide (ou tabela institucional por peso); marcar a sonda.
6. Posicionar o RN semi-sentado leve ou em decúbito lateral; aspirar secreções orais se necessário.
7. Introduzir suavemente; avançar até a marca **sem forçar**. Diante de cianose, bradicardia, apneia ou resistência: retirar, oxigenar/estabilizar e tentar novamente com supervisão.
8. Confirmar posição gástrica antes de qualquer uso: aspirado gástrico; pH quando disponível; radiografia se houver dúvida, nutrição programada ou má posição prévia. Não confiar apenas na ausculta.
9. Fixar sem ocluir narinas nem comprimir lábio/face; deixar livre o acesso a CPAP/cânulas; registrar via (oral/nasal), Fr, cm, método de confirmação e aspecto do aspirado.
10. Iniciar alimentação ou descompressão somente após confirmação; na nutrição, elevar levemente a cabeceira se a estabilidade permitir.
11. Reavaliar a cada turno; retirar ou trocar conforme protocolo (obstrução, deslocamento, fim da indicação).

## Fundamentação científica

### População e alcance

**Neonatos dia 0–30**, **500 g–2500 g**, em unidade neonatal. A via orogástrica reduz obstrução nasal e trabalho respiratório em prematuros.

### Indicações

- Descompressão gástrica em íleo, enterocolite suspeita, distensão ou vômitos.
- Alimentação enteral (trofismo ou nutrição) quando não há sucção-deglutição segura.
- Esvaziamento gástrico antes de procedimentos ou em suporte respiratório não invasivo com distensão.

### Contraindicações relativas

- Atresia de esôfago ou fístula traqueoesofágica suspeita (coordenar cirurgia; não forçar).
- Malformação craniofacial grave (avaliar via com ORL/cirurgia).
- Coagulopatia com sangramento ativo oral/nasal.

### Seleção de calibre e via

| Peso | Calibre (Fr) | Via preferida |
| --- | --- | --- |
| 500–999 g | 5 Fr | Orogástrica |
| 1000–1499 g | 5–6 Fr | Orogástrica |
| 1500–2500 g | 6–8 Fr | Orogástrica se desconforto; nasogástrica se estável |

### Evidência e recomendações

> **AAP / prática neonatal:** verificar a localização antes de alimentar; a má posição é um evento prevenível (segurança do paciente neonatal).

> **VON / nutrição neonatal:** início precoce de trofismo com sonda bem posicionada melhora a tolerância e reduz dias de nutrição parenteral quando a clínica permite.

### Cuidados posteriores

- Vigiar apneia, bradicardia e dessaturação associadas ao procedimento.
- Controlar resíduo gástrico e tolerância conforme protocolo de alimentação.
- Inspecionar a pele de fixação a cada turno; prevenir lesões por pressão.
- Em CPAP nasal: priorizar orogástrica e evitar oclusão dos prongs.

### Complicações — interromper e comunicar

- Suspeita de colocação em via aérea ou esôfago perfurado.
- Bradicardia/apneia durante a inserção.
- Pneumotórax ou pneumoperitônio (raro).
- Lesão nasal/oral por fixação.
- Aspiração após início da alimentação com sonda mal posicionada.`,
    bibliography: [
      {
        citation: 'American Academy of Pediatrics. Neonatal enteral nutrition and tube feeding safety.',
        url: 'https://www.aap.org/en/patient-care/',
      },
      {
        citation: 'Vermont Oxford Network. Nutritional practices and tube feeding safety in the NICU.',
        url: 'https://www.vtoxford.org/',
      },
      {
        citation:
          'Mehta NM, et al. ASPEN Guidelines for Nutrition Support in the Pediatric Critically Ill Patient. JPEN. 2017.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/28686844/',
      },
      {
        citation:
          'World Health Organization. Optimal feeding of low-birth-weight infants (técnicas de sonda e segurança).',
        url: 'https://www.who.int/publications',
      },
      {
        citation:
          'SATI — Comitê de Nutrição. Suporte nutricional no paciente crítico (adaptação neonatal institucional).',
        url: 'https://www.sati.org.ar/',
      },
    ],
  },
  {
    id: 'uro-001',
    title: 'Coleta de urocultura',
    category: 'adulto',
    branch: 'atencion-sanitaria',
    version: '1.0',
    executiveSummary:
      'Obter urocultura com técnica que minimize contaminação; preferir jato médio limpo ou amostra de sonda recém-colocada; refrigerar ou enviar imediatamente ao laboratório; e interpretar a contagem junto com o quadro clínico.',
    body: `## Passos a realizar

1. Verificar a indicação clínica (disúria, polaciúria, febre com suspeita de ITU, sepse de foco urinário, controle de tratamento conforme protocolo) e a identidade do paciente.
2. Explicar o procedimento; solicitar que se evite micção recente (idealmente ≥ 2–3 h de retenção) se possível sem atrasar urgências.
3. Escolher o método de coleta conforme a situação:
   - **Jato médio limpo** (paciente colaborador, sem sonda).
   - **Sonda vesical de uso único** (paciente não colaborador, retenção ou amostra crítica).
   - **Aspiração do porto da sonda permanente** (nunca da bolsa).
4. Higienização das mãos; preparar frasco estéril de boca larga, antisséptico/sabão conforme protocolo e etiquetas.
5. **Jato médio:** lavar a genitália com água e sabão ou antisséptico conforme protocolo; em mulheres separar os lábios; em homens retrair o prepúcio se aplicável; descartar o primeiro jato e coletar o médio em frasco estéril sem tocar o interior.
6. **Sonda intermitente:** técnica asséptica; descartar os primeiros mililitros e coletar em frasco estéril.
7. **Sonda permanente:** clampear distalmente o cateter por alguns minutos se o protocolo indicar; desinfetar o porto de coleta; aspirar com seringa estéril; **não desconectar** o circuito fechado nem amostrar a bolsa.
8. Fechar o frasco sem contaminar; etiquetar com nome, data, hora, método de obtenção e antibióticos em uso.
9. Enviar ao laboratório **em até 2 h** em temperatura ambiente ou refrigerar (2–8 °C) até 24 h conforme protocolo local; não congelar.
10. Se houver suspeita de sepse urinária: obter urocultura (e hemoculturas) **antes do antibiótico** se isso não atrasar o início além do aceitável (p. ex. Surviving Sepsis).
11. Registrar método, hora e responsável; comunicar o resultado com contagem, germes e interpretação clínica.

## Fundamentação científica

### Indicações

- Suspeita de cistite, pielonefrite ou prostatite bacteriana.
- Febre ou sepse com foco urinário provável.
- ITU associada a sonda (ITU-SV) com critérios clínicos.
- Bacteriúria na gestação, urologia pré-operatória ou imunocomprometidos conforme protocolo.
- Controle de cura somente quando indicado (não de rotina em cistite não complicada após melhora).

### Métodos e qualidade da amostra

| Método | Comentário |
| --- | --- |
| Jato médio limpo | Padrão em adultos colaboradores |
| Sonda intermitente | Útil se não há micção espontânea confiável |
| Porto de sonda permanente | Evita contaminar o sistema fechado |
| Bolsa coletora | **Não válida** para cultura |
| Punção suprapúbica | Reservada a casos especiais / urologia |

### Interpretação orientativa (adulto)

| Contagem (UFC/ml) | Interpretação habitual* |
| --- | --- |
| ≥ 10⁵ | Sugere ITU em amostra de jato médio com clínica |
| 10³–10⁴ | Interpretar com clínica, sexo, método e germes |
| Polimicrobiano / flora mista | Suspeitar contaminação; repetir se a clínica exigir |

\\*Limiares podem variar conforme laboratório e guias locais; sempre correlacionar com sedimento e clínica.

### Evidência e recomendações

> **SATI/SADI 2024 (Cornistein et al.):** na ITU-SV, cultivar somente com suspeita clínica; não tratar bacteriúria assintomática em sonda de rotina; retirar ou trocar a sonda conforme indicação ao obter a amostra.

> **IDSA / SHEA:** não cultivar da bolsa; técnica asséptica no porto; evitar culturas de “vigilância” sem indicação.

### Erros frequentes que invalidam o resultado

- Contaminação por flora periuretral (higiene inadequada ou inclusão do primeiro jato).
- Atraso > 2 h sem refrigeração.
- Amostra da bolsa ou de sonda antiga sem técnica de porto.
- Antibiótico iniciado antes da coleta sem documentá-lo.

### Complicações / situações — comunicar

- Impossibilidade de obter amostra em paciente séptico (escalar sonda intermitente / urologia).
- Trauma uretral ao sondar.
- Resultado positivo com deterioração clínica (ajustar antibiótico conforme antibiograma).`,
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
        citation:
          'Lo E, Nicolle LE, Coffin SE, et al. Strategies to Prevent Catheter-Associated Urinary Tract Infections in Acute Care Hospitals: 2022 Update. Infect Control Hosp Epidemiol. 2022.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36062715/',
      },
      {
        citation:
          'Gupta K, Hooton TM, Naber KG, et al. International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women (IDSA). Clin Infect Dis. 2011 (e atualizações).',
        url: 'https://pubmed.ncbi.nlm.nih.gov/21292654/',
      },
      {
        citation: 'SATI — Comitê de Infectologia Crítica. Coleta de amostras microbiológicas em UTI.',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
    ],
  },
  {
    id: 'uro-p001',
    title: 'Coleta de urocultura pediátrica',
    category: 'pediatrico',
    branch: 'atencion-sanitaria',
    version: '1.0',
    executiveSummary:
      'Em pediatria, obter urocultura com o método menos contaminante possível: bolsa adesiva apenas para rastreamento; confirmar com cateterismo ou punção se o resultado for positivo; enviar a amostra imediatamente e interpretar conforme idade e clínica.',
    body: `## Passos a realizar

1. Verificar indicação (febre sem foco em lactente, disúria, dor abdominal/lombar, ITU recorrente, uropatia) e identificar a criança (dois identificadores).
2. Explicar à família; evitar atrasos em lactentes febris que exigem decisão antibiótica.
3. Escolher o método conforme idade e urgência:
   - **Jato médio limpo:** crianças colaboradoras.
   - **Cateterismo vesical intermitente:** método de escolha para cultura definitiva em lactentes/não colaboradores.
   - **Bolsa adesiva periuretral:** apenas rastreamento; **não** basear tratamento definitivo só em bolsa positiva.
   - **Punção suprapúbica:** conforme experiência local / urologia.
4. Higienização das mãos; preparar frasco estéril, material de higiene genital e, se aplicável, sonda pediátrica do calibre adequado.
5. **Jato médio:** higiene genital; coletar a porção média sem tocar o interior do frasco.
6. **Cateterismo:** técnica estéril (ver protocolo de sonda vesical pediátrica); descartar os primeiros mililitros; coletar em frasco estéril; retirar a sonda.
7. **Bolsa:** higiene rigorosa; colocar a bolsa; vigiar; retirar assim que houver urina; transferir para frasco estéril. Se a cultura da bolsa for positiva ou duvidosa: **confirmar** com cateterismo ou punção antes de definir ITU.
8. Etiquetar: nome, idade, data, hora, método exato e antibióticos prévios.
9. Enviar ao laboratório imediatamente ou refrigerar conforme protocolo; documentar atrasos.
10. Em febre sem foco / suspeita de pielonefrite: cultivar **antes** do antibiótico empírico sempre que isso não atrase o tratamento de uma criança instável.
11. Registrar e interpretar juntamente com sedimento, PCR/PCT se aplicável e critérios AAP/institucionais.

## Fundamentação científica

### Indicações

- Lactente febril sem foco com decisão de investigar ITU.
- Criança com sintomas urinários baixos ou suspeita de pielonefrite.
- Controle em uropatia, refluxo ou ITU recorrente conforme especialista.
- Bacteriúria em situações de risco (imunocomprometidos) conforme protocolo.

### Métodos: hierarquia de confiabilidade

| Método | Confiabilidade diagnóstica |
| --- | --- |
| Punção suprapúbica | Alta |
| Cateterismo intermitente | Alta |
| Jato médio (criança colaboradora) | Boa se a técnica for correta |
| Bolsa adesiva | Baixa (alta contaminação); apenas rastreamento |

### Interpretação orientativa (pediatria)

| Método | Limiar orientativo* |
| --- | --- |
| Cateterismo | ≥ 50 000 UFC/ml de um único germe + clínica/sedimento |
| Jato médio | ≥ 100 000 UFC/ml habitualmente |
| Punção | Qualquer crescimento significativo de um patógeno |
| Bolsa | Não diagnosticar ITU só por bolsa positiva |

\\*Seguir limiares do laboratório e guia AAP/institucional vigentes.

### Evidência e recomendações

> **AAP (ITU em lactentes e crianças):** não usar bolsa adesiva como único método diagnóstico; confirmar com cateterismo ou punção (Roberts et al. / atualizações AAP).

> **SATI/SADI:** evitar culturas desnecessárias de sonda; correlacionar sempre com a clínica (Cornistein et al., 2024).

### Erros frequentes

- Tratar “ITU” apenas com bolsa positiva.
- Atraso no envio → supercrescimento.
- Contaminação por higiene insuficiente.
- Cultivar de fralda ou de bolsa coletora de sonda permanente.

### Complicações — comunicar

- Trauma uretral ao cateterizar (não forçar; consultar urologia).
- Criança séptica sem amostra (priorizar estabilização e culturas em paralelo).
- Resultado positivo com deterioração (ajustar antibiótico).`,
    bibliography: [
      {
        citation:
          'Subcommittee on Urinary Tract Infection, American Academy of Pediatrics. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children. Pediatrics.',
        url: 'https://publications.aap.org/pediatrics/article/128/3/595/30042',
      },
      {
        citation:
          'Cornistein W, et al. Infección urinaria asociada a sonda vesical — recomendaciones intersociedades SATI/SADI 2024. Medicina (B Aires). 2025.',
        url: 'https://www.medicinabuenosaires.com/revistas/vol85-25/n2/348.pdf',
      },
      {
        citation:
          'Lo E, et al. Strategies to Prevent CAUTI in Acute Care Hospitals: 2022 Update. Infect Control Hosp Epidemiol. 2022.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36062715/',
      },
      {
        citation: 'Society of Pediatric Urology — recursos sobre diagnóstico de ITU e malformações.',
        url: 'https://www.spuonline.org/',
      },
      {
        citation: 'SATI — Coleta de amostras microbiológicas em UTI.',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
    ],
  },
  {
    id: 'neo-i-009',
    title: 'Coleta de urocultura neonatal',
    category: 'neonatologia',
    branch: 'atencion-sanitaria',
    division: 'intensiva',
    version: '1.0',
    executiveSummary:
      'Em neonatos (dia 0–30, 500–2500 g), obter urocultura por cateterismo vesical ou punção suprapúbica; não diagnosticar ITU apenas com bolsa adesiva; cultivar antes do antibiótico se a estabilidade permitir.',
    body: `## Passos a realizar

1. Confirmar indicação (febre/hipotermia, sepse neonatal, ITU suspeita, avaliação de foco em RN instável) e identificar o RN (dois identificadores, peso).
2. Explicar à família; manter termorregulação; não atrasar antibiótico em sepse grave por dificuldade de amostra — cultivar em paralelo.
3. Escolher o método:
   - **Cateterismo vesical** (5–6 Fr): método habitual para cultura definitiva.
   - **Punção suprapúbica:** se houver experiência e bexiga palpável/cheia.
   - **Bolsa adesiva:** apenas rastreamento; confirmar todo resultado positivo.
4. Higienização das mãos; técnica asséptica; antisséptico cutâneo conforme protocolo neonatal; deixar secar.
5. **Cateterismo:** lubrificar minimamente; introduzir sem forçar; descartar os primeiros mililitros; coletar em frasco estéril; retirar a sonda.
6. **Punção:** localizar a bexiga (palpação/ultrassonografia se disponível); técnica estéril; aspirar; não atravessar alças intestinais.
7. Etiquetar: nome, peso, data, hora, método e antibióticos maternos/neonatais.
8. Enviar imediatamente ao laboratório; refrigerar somente conforme protocolo se houver atraso breve.
9. Em sepse: obter também hemocultura; iniciar empírico conforme protocolo NRP/institucional sem aguardar a urocultura.
10. Registrar e interpretar com clínica, sedimento (se houver volume) e limiares pediátrico-neonatais.

## Fundamentação científica

### População e alcance

**Neonatos dia 0–30**, **500 g–2500 g**. A ITU neonatal pode apresentar-se como sepse sem sintomas urinários locais.

### Indicações

- Avaliação de sepse neonatal precoce ou tardia com possível foco urinário.
- Febre ou instabilidade térmica sem foco.
- Bacteriúria suspeita em RN com malformação urinária.
- Controle conforme nefrologia/urologia neonatal.

### Métodos e confiabilidade

| Método | Uso no neonato |
| --- | --- |
| Cateterismo | Preferido para cultura diagnóstica |
| Punção suprapúbica | Alta especificidade se houver experiência |
| Bolsa | Apenas rastreamento; alta contaminação |
| Fralda | **Não válido** |

### Interpretação orientativa

| Método | Critério orientativo* |
| --- | --- |
| Cateterismo | ≥ 50 000 UFC/ml de um patógeno + clínica |
| Punção | Crescimento significativo de um patógeno |
| Bolsa positiva | Confirmar sempre |

\\*Ajustar ao laboratório e guia local/AAP.

### Evidência e recomendações

> **AAP:** em lactentes febris pequenos, o método de coleta determina a validade do diagnóstico de ITU.

> **SATI / infectologia crítica:** técnica asséptica e envio rápido; correlacionar com hemocultura na sepse (coleta de amostras microbiológicas).

> **VON:** a sepse de foco urinário faz parte do diferencial de sepse tardia; cultura adequada evita tratamentos prolongados por contaminação.

### Erros frequentes

- Diagnosticar e tratar apenas com bolsa positiva.
- Atraso no envio.
- Contaminação por técnica não estéril.
- Forçar sonda em RN masculino com resistência (risco uretral).

### Complicações — interromper e comunicar

- Bradicardia/apneia durante o procedimento.
- Trauma uretral ou hematúria franca.
- Punção intestinal (se técnica suprapúbica incorreta).
- RN séptico sem amostra (priorizar acesso e antibiótico; completar culturas assim que possível).`,
    bibliography: [
      {
        citation:
          'American Academy of Pediatrics. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children.',
        url: 'https://publications.aap.org/pediatrics/article/128/3/595/30042',
      },
      {
        citation: 'SATI — Coleta de amostras microbiológicas em UTI (Comitê de Infectologia Crítica).',
        url: 'https://www.sati.org.ar/wp-content/uploads/2022/04/Toma-de-muestras-microbiologicas-en-UTI-Revision2007.pdf',
      },
      {
        citation: 'Cornistein W, et al. ITU associada a sonda — recomendações intersociedades SATI/SADI 2024.',
        url: 'https://www.medicinabuenosaires.com/revistas/vol85-25/n2/348.pdf',
      },
      {
        citation: 'Vermont Oxford Network. Late-onset sepsis evaluation in the NICU.',
        url: 'https://www.vtoxford.org/',
      },
      {
        citation:
          'World Health Organization. Guidelines on prevention of healthcare-associated infections in neonatal units.',
        url: 'https://www.who.int/teams/maternal-newborn-child-adolescent-health-and-ageing/newborn-health',
      },
    ],
  },
];

for (const p of protocols) {
  writeLocale(p.category, p);
}
