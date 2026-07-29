---
name: qualidade-conteudo
description: >
  Audita a qualidade de um conteúdo já publicado (artigo de blog, página do site, landing page) —
  E-E-A-T, legibilidade, prontidão pra AEO/GEO (respostas diretas do Google e citação em IAs) e
  saúde técnica básica (schema, meta tags, links). Funciona em português e em inglês. Devolve um
  scorecard com nota por critério e lista priorizada de correções.
  Use quando o usuário pedir "audita esse conteúdo", "revisa esse artigo pra SEO",
  "checklist de qualidade", "e-e-a-t", "isso tá pronto pra AEO", "content quality audit",
  "audit this article", ou /qualidade-conteudo.
---

# /qualidade-conteudo — Auditoria de qualidade, E-E-A-T e AEO-readiness

Skill de checagem pontual: pega **um conteúdo já existente** (ou uma lista curta deles) e devolve um diagnóstico objetivo, sem reescrever nada sem pedir. Diferente do `/seo`, que é o fluxo completo de estratégia — aqui é auditoria rápida do que já está no ar.

## Dependências

- **Tom de voz:** `_memoria/preferencias.md` (só pra avaliar se o conteúdo está de acordo)
- **Contexto do negócio:** `_memoria/empresa.md`
- **Ferramentas:** WebFetch (pra ler a página real), Read (se o conteúdo for um arquivo local, ex: markdown do blog)
- **Outputs vão em:** `marketing/seo/auditorias/<slug-ou-url>-<YYYY-MM-DD>.md`

---

## Quando usar

- Antes de publicar um artigo novo (checar se está pronto)
- Depois de publicar, como checagem periódica
- Quando o usuário desconfia que uma página específica "não performa" e quer saber por quê
- Como parte do Passo 9 do `/seo` (auditoria de site inteiro) — aqui é o mesmo checklist aplicado a uma peça só

## Quando NÃO usar

- Pesquisa de keyword ou estratégia nova → `/seo`
- Criação de conteúdo do zero → `/publicar-tema`

---

## Workflow

### Passo 1 — Identificar o conteúdo e o idioma

1. Pegar a URL (usar WebFetch) ou o caminho do arquivo local (usar Read)
2. Identificar o idioma do conteúdo — não perguntar, ler direto do texto/`lang` do HTML
3. Se o usuário mandar uma lista de várias páginas, rodar o checklist em cada uma e consolidar num único scorecard comparativo no fim

### Passo 2 — E-E-A-T

Avaliar e pontuar (0-2: ausente / parcial / presente) cada item:

- **Experience:** mostra vivência real (casos, fotos próprias, processo, números do próprio negócio) ou é genérico?
- **Expertise:** autor identificado com credencial/bio? Referências corretas ao assunto?
- **Authoritativeness:** o texto cita fontes? existe sinal de que outros sites/páginas apontam pra esse conteúdo?
- **Trust:** data de publicação/atualização visível, contato real acessível no site, sem alegação não verificável

### Passo 3 — Legibilidade e qualidade de escrita

- Frases curtas, parágrafos de 2-4 linhas?
- Sem jargão desnecessário pro público-alvo (checar contra `_memoria/preferencias.md`)
- Estrutura com headings (H2/H3) que quebram bem o conteúdo, não um bloco único de texto
- Livre de erro gramatical/ortográfico óbvio, revisado no idioma nativo daquele texto (não é tradução automática mal revisada)
- Original — não soa como reescrita rasa de concorrente ou texto genérico de IA sem ângulo próprio

### Passo 4 — AEO/GEO-readiness

- As perguntas reais do público (se houver H2/H3 em formato de pergunta) têm resposta direta nas primeiras 1-3 frases, ou o texto enrola antes de responder?
- Tem pelo menos uma lista, tabela ou definição em bloco isolado que uma IA/engine consiga extrair fácil?
- Dados concretos (números, datas, nomes) em vez de afirmação vaga?
- Entidade (empresa/produto) nomeada explicitamente no texto, não só por pronome?
- Tem `FAQPage`, `Article`/`BlogPosting` ou outro schema relevante implementado? (checar o HTML/frontmatter se tiver acesso)

### Passo 5 — Saúde técnica básica

- Title e meta description dentro do tamanho ideal (50-60 / 150-160 caracteres)?
- Imagens com alt text descritivo?
- Links internos e externos da página funcionam (checar uma amostra, não precisa validar todos)?
- Se o site for bilíngue: essa página tem par no outro idioma? o `hreflang` está correto?

### Passo 6 — Scorecard e prioridades

Montar tabela final:

| Critério | Nota (0-2) | Observação |
|---|---|---|
| E-E-A-T — Experience | | |
| E-E-A-T — Expertise | | |
| E-E-A-T — Authoritativeness | | |
| E-E-A-T — Trust | | |
| Legibilidade | | |
| AEO/GEO-readiness | | |
| Saúde técnica | | |

Depois:
- **Nota geral** (soma ou média simples)
- **Top 3 problemas mais graves**, do mais barato de corrigir pro mais caro
- Perguntar se o usuário quer que as correções sejam aplicadas agora (nesse caso, editar o arquivo/conteúdo com cirurgia, mostrando o diff) ou só documentadas pra depois

**Output:** `marketing/seo/auditorias/<slug-ou-url>-<YYYY-MM-DD>.md` com o scorecard completo.

---

## Regras

- Nunca reescrever o conteúdo sem o usuário pedir explicitamente — a auditoria é diagnóstico, não edição automática
- Nunca inventar métricas que exigiriam dado real (tráfego, posição no Google, backlinks) — se não tiver acesso, marcar como "não verificável nessa auditoria"
- Avaliar no idioma original do conteúdo — nunca julgar um texto em inglês pelas regras de escrita em português (ou vice-versa)
- Ser direto e específico na observação de cada nota — "vago" não ajuda, "não cita nenhuma fonte nem dado concreto no parágrafo 2" ajuda
