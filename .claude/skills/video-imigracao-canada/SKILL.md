---
name: video-imigracao-canada
description: Produzir vídeos verticais diários, em português brasileiro, sobre atualizações oficiais de imigração canadense. Usar quando for necessário monitorar o IRCC, selecionar uma notícia oficial relevante, escrever roteiro informativo, gerar vídeo documental com imagens do Canadá de origem licenciada ou geradas para o projeto, e registrar fonte, licença e controle de qualidade.
---

# Vídeos diários — imigração canadense

Produzir vídeos curtos e factuais para brasileiros interessados em imigração canadense. O vídeo deve informar uma atualização oficial, sem promessa de resultado, aconselhamento individual, sensacionalismo ou interpretação jurídica personalizada.

Ler `references/fontes-e-licencas.md` antes de selecionar qualquer pauta ou ativo visual. Essa referência define as fontes editoriais permitidas, as regras de uso de imagens e o modelo de registro de licença.

## Princípios editoriais

Usar apenas o **IRCC** como fonte factual primária. Toda notícia deve apontar para uma página oficial e trazer a data de publicação. Separar com precisão fatos em vigor, medidas temporárias, propostas, consultas e anúncios futuros. Não deduzir elegibilidade individual; explicar apenas quem a atualização declara afetar e indicar a fonte oficial para a verificação.

Apresentar uma novidade material por episódio. Não tratar rumores, cobertura de terceiros ou postagens sociais como confirmação. Não publicar um vídeo novo quando não houver atualização oficial relevante desde a última execução; registrar a ausência de pauta no histórico e aguardar a próxima execução.

## Operação autônoma

Na execução diária, não pedir confirmação, aprovação de pauta, escolha de voz ou revisão antes de produzir. Aplicar todas as verificações desta habilidade, escolher a pauta oficial material mais recente, produzir o episódio que for aprovado pelo controle de qualidade e registrar o resultado. Se não houver pauta material ou se o controle de qualidade reprovar o episódio, registrar **sem publicação** com a razão e encerrar a execução.

## Parâmetros fixos

| Item | Padrão obrigatório |
|---|---|
| Idioma | Português brasileiro |
| Formato | Vertical 9:16, para Reels, Shorts e TikTok |
| Duração | 55–90 segundos |
| Estrutura | 8–14 cenas de conteúdo, de 3–8 segundos cada, mais tela final de 3–4 segundos |
| Narração | Voz masculina em português brasileiro, objetiva, calma e clara; gerar por trecho/cena |
| Legendas | Obrigatórias em português brasileiro, sincronizadas à locução e posicionadas na área inferior segura |
| Visual | Fotografia documental contemporânea do Canadá; paisagens e cenários urbanos, aeroportos, universidades e trabalho quando relevantes |
| Elementos proibidos | Bonecos-palito, ilustração infantil, texto dentro de imagens, logotipos, marcas d’água, marcas, personagens identificáveis sem licença |
| Base factual | Link e data de uma fonte primária do IRCC |
| Tela final | Últimos 3–4 segundos com a chamada obrigatória definida abaixo |
| Aviso | Aviso informativo obrigatório no fim e na descrição |

## Fluxo diário

### 1. Buscar e escolher a pauta

Consultar o feed RSS do Newsroom do IRCC. Ler os novos itens publicados desde `state/ultima-execucao.json`. Para cada candidato, abrir a publicação original e a página do programa/regra relacionada quando o comunicado não trouxer todos os detalhes.

Selecionar somente uma pauta que seja nova, verificável e útil à audiência brasileira. Priorizar alterações em programas, critérios, prazos, taxas, processamento, Express Entry, autorizações de estudo ou trabalho, residência permanente, patrocínio familiar e medidas temporárias. Marcar como **sem publicação** se não houver item material, em vez de transformar comunicados antigos em “notícia de hoje”.

Antes de escrever, preencher uma ficha de verificação:

```json
{
  "source_url": "https://www.canada.ca/...",
  "source_title": "Título oficial",
  "published_at": "YYYY-MM-DD",
  "status": "em_vigor | anunciado | proposto | temporário | encerrado",
  "who_is_affected": "grupo descrito pela fonte",
  "effective_date": "YYYY-MM-DD ou null",
  "what_changed": "uma frase factual",
  "what_is_unknown": ["limitações ou detalhes não confirmados"],
  "reviewed_at": "YYYY-MM-DDTHH:MM:SSZ"
}
```

Se um elemento material não puder ser confirmado na fonte oficial, removê-lo da pauta. Não preencher lacunas com estimativas ou conhecimento não citado.

### 2. Definir ângulo e roteiro

Definir **uma notícia, uma mudança e um impacto geral**. O título e a abertura devem explicar a relevância, sem afirmar que o público “vai conseguir” ou “deve aplicar”. Usar linguagem direta: “o IRCC informou”, “a medida entra em vigor em”, “isso pode afetar pessoas que…”, “confira os critérios oficiais”.

Estruturar o roteiro assim:

| Bloco | Objetivo |
|---|---|
| Abertura | Nomear a mudança e por que merece atenção, sem clickbait. |
| Contexto | Explicar em linguagem simples o programa ou processo afetado. |
| Fato principal | Dizer exatamente o que mudou, quando e para quem, conforme a fonte. |
| Limites | Distinguir regra vigente, proposta, medida temporária ou informação ainda não divulgada. |
| Próximo passo seguro | Orientar a consultar a página oficial e, se necessário, um profissional autorizado. |
| Encerramento | Incluir o aviso informativo e CTA leve para acompanhar novas atualizações. |

Manter cada trecho de narração abaixo de aproximadamente 180 caracteres. Não usar jargão sem explicação. Não usar “garantido”, “aprovação”, “visto certo”, “atalho”, “segredo” ou comparações de urgência artificial. Não oferecer avaliação de caso individual.

Salvar o roteiro em `roteiros/ep<NNN>-<slug>.pt-BR.json`. Usar a numeração sequencial e slug em kebab-case sem data. Incluir `source_url`, `published_at`, `status`, `disclaimer`, cenas e `asset_registry`.

### 3. Planejar cenas documentais

Transformar cada ponto do roteiro em uma cena visual concreta do Canadá. Usar alternância entre natureza, cidade e contexto humano, apenas quando coerente com o tema. Exemplos adequados incluem um plano amplo de Toronto, Vancouver, Montreal ou Ottawa; chegada a aeroporto sem marcas; biblioteca universitária; estação de metrô; ambiente de trabalho contemporâneo; famílias vistas à distância; paisagens de montanhas, lagos ou bairros residenciais canadenses.

Cada prompt visual deve indicar fotografia documental, composição vertical, horário/luz e enquadramento. Terminar com: **“sem texto, sem logotipos, sem marcas d’água, sem marcas, sem pessoas identificáveis”**. Não pedir placas, números, infográficos, documentos migratórios legíveis, telas de sistemas ou uso do logotipo do Governo do Canadá.

Não representar o anúncio como aprovação de visto, entrevista de imigração, fronteira em situação de tensão ou autoridade examinando documentos, salvo se for estritamente necessário e a cena puder ser mostrada de forma genérica, ética e licenciada. Evitar estereótipos, filas de pessoas vulneráveis e dramatização de risco migratório.

### 4. Obter e registrar os ativos

Usar somente ativos que atendam à política de `references/fontes-e-licencas.md`. Preferir fotografia gerada especificamente para o episódio; caso seja usado ativo licenciado, registrar URL, autor, tipo e texto de atribuição antes da montagem.

Criar `assets/asset-registry.json` para cada episódio e bloquear a montagem caso qualquer ativo não possua licença, origem ou registro verificável. Não usar captura de tela do site do IRCC como imagem de cena. A referência oficial será exibida na descrição e nos metadados, não dentro do visual.

### 5. Produzir narração e montagem

Gerar a narração por trecho, mantendo a mesma voz masculina, volume e ritmo entre as cenas. Gerar e incorporar legendas obrigatórias em português brasileiro, sincronizadas à locução, com contraste alto, no terço inferior e acima da área coberta pelas interfaces de Reels, Shorts e TikTok. As legendas devem ser aplicadas na etapa de montagem, nunca dentro da imagem gerada. Usar música de fundo instrumental discreta, com licença compatível ou geração própria, em volume inferior ao da voz.

Montar em 9:16. Garantir que imagens, transições, legendas e áudio tenham espaço seguro para as interfaces de Reels, Shorts e TikTok.

Reservar os últimos **3–4 segundos** para uma tela final limpa, produzida na etapa de montagem — e não dentro de uma imagem gerada. Exibir, de forma legível, somente a frase: **“Quer saber mais? Acesse o link na descrição”.** Essa tela deve permanecer estável até o fim, com contraste suficiente e música discreta; não incluir endereços de site, logotipos de terceiros, imagens licenciadas sem registro ou chamadas adicionais.

Não usar efeitos cômicos, animações de bonecos-palito ou transições que façam a informação parecer entretenimento infantil.

### 6. Controle de qualidade

Reprovar e corrigir o episódio se ocorrer qualquer item da tabela.

| Verificação | Critério de aprovação |
|---|---|
| Fonte | Uma fonte oficial primária do IRCC, URL acessível e data registrada. |
| Atualidade | A informação é nova desde o último vídeo publicado ou está explicitamente apresentada como referência histórica. |
| Exatidão | Datas, status e grupos afetados coincidem com a fonte. |
| Linguagem | Português brasileiro natural, sem promessa, alarmismo ou aconselhamento individual. |
| Visual | Imagens documentais do Canadá; nenhuma cena com bonecos-palito, texto, logo ou ativo sem origem verificável. |
| Licença | Todo ativo consta em `asset-registry.json`; atribuições estão prontas para a descrição. |
| Legibilidade | Voz clara, áudio equilibrado e corte vertical sem elementos importantes cobertos. |
| Legendas | Todas as falas possuem legendas em português brasileiro, sincronizadas, com contraste alto e dentro da área inferior segura. |
| Tela final | Últimos 3–4 segundos exibem somente: “Quer saber mais? Acesse o link na descrição”. |
| Aviso | Aviso informativo presente no fim e na descrição. |

### 7. Finalizar e registrar

Exportar o vídeo em `videos/ep<NNN>-<slug>/pt-BR/final.mp4`. Criar `descricao.md` com título, resumo curto, URL oficial, data da fonte, aviso e atribuições necessárias. Atualizar `marketing/video-imigracao-canada/historico-temas.md` e `state/ultima-execucao.json` após conclusão ou após uma execução sem publicação.

Usar este aviso no fechamento e na descrição:

> Conteúdo informativo baseado em fonte oficial do IRCC, publicada em [data]. Regras migratórias podem mudar. Verifique a página oficial antes de tomar decisões; este vídeo não substitui orientação jurídica ou migratória individual.

## Refação

Quando apenas uma cena estiver inadequada, substituir somente o respectivo ativo e atualizar seu registro de licença. Quando houver erro factual, interromper a publicação, corrigir o roteiro a partir da fonte oficial e refazer a narração afetada. Quando o tema estiver desatualizado antes da publicação, cancelar o episódio e registrar a razão no histórico; não publicar conteúdo superado.
