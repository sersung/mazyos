---
name: video-diario
description: >
  Produz um pacote diário de vídeo curto, pronto para revisão e postagem manual no YouTube Shorts e TikTok.
  Pesquisa um tema atual com fontes públicas e 2–3 vídeos relevantes do YouTube, cria roteiro e plano de cenas,
  gera vídeo vertical, legenda inferior incorporada, SRT, metadados e nota de fontes; aplica quality gates antes de entregar. Use quando o usuário pedir
  "vídeo diário", "Short do dia", "vídeo para TikTok", "vídeo pro YouTube Shorts", "gerar vídeo financeiro"
  ou /video-diario.
---

# /video-diario — Produção diária de vídeo curto com quality gates

Crie um pacote editorial completo para um vídeo vertical de 60–90 segundos. O padrão inicial deste projeto é **My First Million Vault**: educação financeira em inglês, animação 2D de bonecos de palito e entrega pronta para publicação manual. Adapte idioma, tema, identidade e CTA somente quando o usuário pedir.

## Dependências

- Ler `_memoria/empresa.md` e `_memoria/preferencias.md` antes de definir o tema e o tom.
- Ler `identidade/design-guide.md` antes de qualquer decisão visual. Quando ele estiver vago, usar o padrão visual definido abaixo.
- Ler `marketing/video-diario/historico-temas.md` para não repetir o ângulo principal dos últimos 30 dias.
- Usar `templates/video/pacote-video-diario.md` como lista de produção e entrega.
- Usar `templates/video/pesquisa-youtube-focada.md` antes de escolher tema, hook, metáfora ou ritmo.
- Rodar `node scripts/validar-video-diario.mjs <pasta-do-pacote>` antes de entregar. Corrigir qualquer falha bloqueante.

## Padrão de saída

Salvar em `marketing/video-diario/<slug-do-tema>-<YYYY-MM-DD>/`:

```text
producao.md
video.mp4
legendas.srt
metadados.md
pesquisa.md
quality-report.json
```

O usuário publica manualmente. Nunca enviar, agendar ou publicar em redes sociais sem um pedido explícito.

## Fase 1 — Escolher um tema útil e não repetido

1. Ler `templates/video/pesquisa-youtube-focada.md` e decompor a pauta em dor prática, explicação de especialista e embalagem/retenção.
2. Pesquisar e analisar **2–3 vídeos** recentes do YouTube: priorizar um especialista ou instituição, um educador com execução clara e, quando útil, uma perspectiva alternativa. Registrar URL, criador, data e critério de seleção.
3. Extrair somente padrões abstratos: tipo de hook, clareza da pergunta, ritmo, metáfora, visualização e lacuna editorial. Nunca reutilizar frase, título, sequência de cenas, visual, áudio, thumbnail ou estrutura específica de outro criador.
4. Cruzar os aprendizados com pelo menos duas fontes públicas recentes e confiáveis antes de escolher o assunto. Usar vídeos como evidência editorial e fontes públicas para fatos.
5. Comparar o assunto com `historico-temas.md`. Mudar tema, ângulo, metáfora, promessa ou CTA quando algo equivalente já apareceu nos últimos 30 dias.
6. Priorizar uma única pergunta prática, com alto potencial de identificação e uma resposta visual clara. Não escolher apenas porque um tópico está em alta.
7. Explicar com conteúdo educacional geral. Não recomendar ativos específicos, prometer retornos ou tratar cenários financeiros como certeza.
8. Registrar em `pesquisa.md` as seções `YouTube videos analyzed`, `Editorial synthesis`, `Originality check` e `Public-source verification`.

## Fase 2 — Definir a produção antes de gerar ativos

Antes de gerar qualquer imagem ou clipe, escrever `producao.md` com as definições globais, o plano de cenas e a checagem de narrativa.

### Definições globais

| Item | Padrão My First Million Vault |
|---|---|
| Público | Adultos interessados em fundamentos de finanças pessoais e construção de patrimônio. |
| Objetivo | Fazer a pessoa entender uma ideia financeira prática e desejar acompanhar o canal. |
| Narrativa | Gancho nos primeiros dois segundos → problema concreto → princípio simples → ação pequena → CTA. |
| Formato | 9:16, mínimo 720×1280, 60–90 segundos. |
| Estilo | Animação editorial 2D minimalista, textura de papel off-white, traços carvão, azul-marinho e verde-esmeralda. |
| Personagem | Alex: cabeça branca redonda, membros finos em carvão, gravata verde e maleta azul-marinho. |
| Voz | Narrador masculino americano, claro, natural, confiante e sem tom de guru. |
| Trilha | Instrumental moderno sem vocais, discreto sob a narração, com arco emocional progressivo. |
| Legendas | Inglês, incorporadas na faixa inferior segura do MP4 e também em `.srt`. |

### Plano por cena

Planejar clipes de 3–10 segundos. Cada linha deve conter propósito narrativo, duração, ação única, câmera, texto de narração, budget de narração, cue de música e transição detalhada.

A descrição de transição precisa ter de duas a quatro frases e sempre declarar: aparência do sujeito, trajetória do movimento, mudança de estado e o que permanece no quadro. Não escrever prompts genéricos como “Alex vê dinheiro”.

Conectar cenas contínuas reaproveitando o último quadro real da cena anterior como primeiro quadro da seguinte. Quando houver corte de cena, gerar um primeiro quadro novo. Não misturar ambos os métodos sem justificar.

## Fase 3 — Criar e montar

1. Gerar primeiro uma referência visual primária de Alex em fundo branco. Gerar os demais objetos e ângulos a partir dessa referência; não criar personagens independentes sem referência.
2. Gerar o primeiro quadro de cada cena em 9:16 e usar esse quadro para animar o clipe. Reservar a faixa inferior para legendas e nunca depender de texto dentro da imagem.
3. Criar a narração por trecho narrativo, não como uma faixa única excessivamente longa. Manter a velocidade natural; reduzir o texto antes de acelerar a voz.
4. Gerar trilha instrumental separada a partir do arco de música definido na produção. Na mixagem, preservar som ambiente ou efeitos existentes, narração e música; reduzir a trilha durante a fala.
5. Criar legendas em inglês sincronizadas. Incorporá-las na faixa inferior segura, nunca no terço central/superior. Em vídeo 720×1280, usar fonte sans-serif branca em negrito de aproximadamente 10 px, contorno azul-marinho fino, fundo/sombra escura discreta e margem inferior de aproximadamente 35 px; escalar proporcionalmente em resoluções maiores. Limitar a duas linhas e preservar espaço acima dos controles das plataformas.
6. Criar `metadados.md` com título do Shorts, descrição, 3–5 hashtags e 10–15 tags pesquisáveis; além de uma legenda de TikTok, 4–6 hashtags e palavras-chave de descoberta.

## Fase 4 — Quality gate obrigatório

Verificar o arquivo final antes de entregar. Reprovar e corrigir quando ocorrer qualquer item abaixo.

| Critério | Padrão de aprovação |
|---|---|
| Duração | 60–90 segundos. |
| Formato | 9:16, vertical, 720×1280 ou superior. |
| Áudio | Narração presente, inteligível e consistente; trilha abaixo da voz. |
| Legendas | MP4 com legendas inferiores legíveis, pequenas, dentro da zona segura e SRT sincronizado. |
| Continuidade | Alex, cores, acessórios e estilo permanecem coerentes entre cenas. |
| Roteiro | Gancho inicial, uma ideia central, ação simples e CTA final. |
| Pesquisa editorial | Dois ou três vídeos do YouTube analisados, fontes públicas cruzadas e síntese registrada sem cópia de conteúdo. |
| Originalidade | Hook, metáfora, roteiro, visual e CTA próprios, além de não repetirem o histórico de 30 dias. |
| Segurança editorial | Sem promessa de retorno, recomendação individual ou ativo específico. |
| Pacote | MP4, SRT, metadados, pesquisa e relatório de qualidade presentes. |

Executar o validador. O relatório precisa trazer `pass: true`. Se o vídeo falhar, não entregar como pronto.

## Fase 5 — Histórico e entrega

1. Acrescentar ao `marketing/video-diario/historico-temas.md` a data, o tema, o ângulo e a promessa central do novo vídeo.
2. Entregar primeiro o MP4, depois SRT, metadados e pesquisa.
3. Informar tema, duração, resolução e se o quality gate passou. Ser direto e não reproduzir o roteiro inteiro no chat.

## Regras

- Priorizar clareza, utilidade e precisão sobre sensacionalismo.
- Não usar linguagem de enriquecimento rápido, medo artificial ou jargão de guru.
- Não gerar texto longo dentro de imagens; a narração e as legendas carregam a explicação.
- Não reutilizar o mesmo tema, metáfora e CTA dos últimos 30 dias.
- Não afirmar dados sem registrar a fonte em `pesquisa.md`.
- Usar a pesquisa no YouTube para compreender perguntas, formatos e lacunas; nunca para copiar linguagem, cenas, thumbnail, edição, voz, identidade ou trilha de outros canais.
- Escrever em `quality-check.md`: `youtube_research_used: yes`, `youtube_sources_analyzed: 2` ou `3`, e `originality_check: passed` antes de validar o pacote.
