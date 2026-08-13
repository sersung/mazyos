# Pacote diário de vídeo — template

## Identificação

| Campo | Preencher |
|---|---|
| Data | `YYYY-MM-DD` |
| Canal | `My First Million Vault` |
| Tema | |
| Pergunta prática | |
| Promessa central | |
| Público | |
| Idioma | `English` |
| Duração-alvo | `60–90s` |
| Formato | `9:16 — 720×1280 ou superior` |

## Pesquisa e segurança editorial

| Fonte | Achado verificável | Como será usado | URL |
|---|---|---|---|
| | | | |
| | | | |

**Limite editorial:** O vídeo é educacional. Não inclui recomendação personalizada, promessa de retorno, indicação de ativo específico ou previsão tratada como certeza.

## Definições globais

| Elemento | Decisão |
|---|---|
| Gancho de 0–2s | |
| Personagem/identidade | Alex, cabeça branca redonda, traços carvão, gravata verde, maleta azul-marinho. |
| Paleta | Off-white, carvão, azul-marinho, verde-esmeralda; vermelho apenas para risco. |
| Voz | Narrador masculino americano, claro e natural. |
| Trilha | Instrumental moderno sem vocais. |
| Legendas | Inglês, até duas linhas, branco em negrito com contorno azul-marinho e fundo/sombra escura; manter zona segura inferior. |
| CTA | |

## Plano por cena

| Cena | Tempo | Propósito | Ação única | Câmera | Narração e budget | Transição detalhada | Música |
|---|---|---|---|---|---|---|---|
| 1 | | Gancho | | | | | |
| 2 | | Desenvolver | | | | | |
| 3 | | Desenvolver | | | | | |
| 4 | | Demonstrar | | | | | |
| 5 | | Resolver | | | | | |
| 6 | | CTA | | | | | |

## Arco musical

| Intervalo | Emoção | Arranjo |
|---|---|---|
| 00:00– | | |
| | | |
| | | |

## Legendas e metadados

- `legendas.srt` contém todos os blocos em inglês e tempo sincronizado.
- `metadados.md` contém título, descrição, hashtags, tags e palavras-chave para as duas plataformas.
- `pesquisa.md` lista a escolha editorial, os achados e links das fontes.

## Quality gate final

| Verificação | Resultado |
|---|---|
| Duração entre 60 e 90 segundos | ☐ |
| Vertical 9:16 e 720×1280 ou superior | ☐ |
| Narração clara e trilha abaixo da voz | ☐ |
| Legendas incorporadas, inferiores e legíveis | ☐ |
| SRT presente e sincronizado | ☐ |
| Personagem, paleta e acessórios consistentes | ☐ |
| Gancho, uma ideia central, ação prática e CTA | ☐ |
| Sem recomendação personalizada ou promessa financeira | ☐ |
| MP4, SRT, metadados, pesquisa e `quality-report.json` presentes | ☐ |

**Comando de validação:** `node scripts/validar-video-diario.mjs <pasta-do-pacote>`
