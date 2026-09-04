# PromptHub — diagnóstico e plano de tráfego

> Site: <https://www.prompterniche.com> · Repositório: `sersung/promphub`
> Data: 04/09/2026 · Rodado com `/seo` (passos 1, 2, 4, 5, 8 e 9) e `/qualidade-conteudo`

---

## O problema que travava tudo

O site tinha 63 artigos publicados e nenhum deles podia receber tráfego de busca.

Os artigos viviam dentro de uma `<section>` da home, abertos por estado local do
React (`useState`). Isso significa, na prática:

- nenhum artigo tinha URL própria — não dava para linkar, compartilhar nem indexar
- o sitemap listava 26 URLs, nenhuma delas de artigo
- o Google via um único endereço (`/`) com 63 artigos escondidos atrás de clique
- todo o esforço de gerar conteúdo 3x por semana estava indo para o lixo

Ou seja: o gargalo não era volume de conteúdo, era arquitetura. O portal produzia
e não publicava, no sentido que importa para busca.

**Outros problemas encontrados na varredura:**

| Problema | Tamanho | Situação |
| --- | --- | --- |
| Páginas de nicho mortas (bug de slug duplicado) | 12 de 12 páginas de venda | Corrigido |
| Artigos com capa inexistente | 28 de 63 | Corrigido |
| Artigos duplicados exatos | 5 | Removidos |
| `readTime` fixo em 6 min no template | ~45 artigos | Recalculado |
| Sem autor, data de atualização ou fonte | 63 de 63 | Corrigido |
| Sem canonical, Open Graph ou schema por página | site inteiro | Corrigido |
| Sem página de política editorial | — | Criada em `/sobre` |

As 12 páginas de nicho são as páginas de venda dos pacotes de R$ 19,90. Estavam
todas caindo em redirect para a home desde que o roteamento foi escrito — inclusive
as que constavam no sitemap. Era receita saindo pelo ralo em silêncio.

---

## Concorrência: onde dá e onde não dá para brigar

Observação direta de SERP em 04/09/2026 (busca real, sem ferramenta paga — os
volumes precisam ser confirmados no Search Console e no Planejador do Google Ads).

**Termo de cabeça — "notícias inteligência artificial Brasil"**
Quem ocupa: Exame, InfoMoney, IA Brasil Notícias. São veículos com autoridade de
domínio e redação própria. **Não dá para brigar de frente**, e nem precisa.

**Termo de produto — "prompts prontos ChatGPT português"**
Quem ocupa: Canaltech, TechTudo, GPT Prompts, Scribd. Quase tudo **gratuito**.
Vender PDF de prompt competindo com "20 prompts prontos" grátis do TechTudo é
subir ladeira. O pacote continua vendendo, mas não é por aí que entra tráfego novo.

**Onde está o espaço real — cauda longa de decisão de compra**
Nenhum dos grandes cobre bem consulta do tipo:

- "vale a pena assinar [ferramenta]"
- "[ferramenta A] ou [ferramenta B] para [tarefa]"
- "quanto custa [ferramenta] no Brasil"
- "alternativa gratuita ao [ferramenta]"

São buscas de intenção comercial, com concorrência fraca em português, e é
exatamente onde mora a comissão de afiliado. Um portal solo não vence a Exame em
"o que é IA", mas vence em "o Make cobra por operação, cuidado com isso".

---

## Estratégia em uma frase

Notícia diária traz volume e recorrência; a página de ferramenta converte esse
volume em comissão; o pacote de prompts segue vendendo para quem já confia no site.

### Os três funis, e o papel de cada um

| Funil | Página | Receita | O que mede sucesso |
| --- | --- | --- | --- |
| Notícia | `/noticias/*` | Display (AdSense) | Sessões, páginas por sessão |
| Ferramenta | `/ferramentas` | Afiliado | Cliques de saída, comissão |
| Produto | `/produtos`, `/prompts-para-*` | Venda direta | Checkout Kiwify |

O erro comum é deixar o funil de notícia sem saída comercial. Por isso todo artigo
termina com o bloco de ferramentas relacionadas ao tema **e** o link para o pacote —
nessa ordem, porque a ferramenta é a decisão mais barata para o leitor.

---

## Cluster de conteúdo (Passo 5 do `/seo`)

A cauda longa comercial é o que precisa ser escrito à mão. A varredura automática
cobre a notícia do dia; ela não cobre nem vai cobrir bem uma comparação de preço.

### Páginas pilar a escrever (ordem de prioridade)

1. **"Quanto custa usar IA numa empresa pequena no Brasil"** — pilar da editoria
   Negócios & IA. Tabela de preço real de cada ferramenta, em reais, com data.
   É o tipo de página que vira resposta direta no Google e citação em IA.
2. **"ChatGPT, Claude ou Gemini: qual assinar"** — pilar da editoria Ferramentas.
   Alta intenção comercial, três links de afiliado numa página só.
3. **"n8n ou Make: qual usar para automatizar sua empresa"** — o site já tem 28
   artigos de automação; falta a página que decide entre as duas ferramentas.
4. **"Ferramentas de IA gratuitas que resolvem de verdade"** — captura quem ainda
   não vai pagar, e alimenta o remarketing e a newsletter.

Cada pilar recebe link dos artigos de notícia da mesma editoria — a estrutura de
editoria já faz metade desse trabalho sozinha.

### Formato obrigatório em toda peça (AEO/GEO — Passo 8)

- `<h2>` em forma de pergunta real, com a resposta nas primeiras 40-60 palavras
- número, preço ou prazo concreto — e, quando não houver, dizer que não foi divulgado
- tabela comparativa quando houver mais de duas opções
- fonte citada com link, sempre que a pauta vier de uma notícia

Isso já está codificado no prompt do gerador automático, não depende de lembrar.

---

## O que ficou pendente (precisa de acesso ou decisão do Renan)

| Pendência | Por quê | Quem resolve |
| --- | --- | --- |
| Volume real das keywords | Não dá para estimar sem Search Console ou Planejador | Renan (contas) |
| Programas de afiliado | `affiliateUrl` está `null` nas 11 ferramentas | Renan (cadastro) |
| Newsletter fora do `localStorage` | Hoje o e-mail capturado não sai do navegador do visitante | Decisão de ferramenta |
| Submeter sitemap novo | 84 URLs, contra 26 antes | Renan (Search Console) |
| Autoria nominal | Hoje assina "Redação PromptHub" | Decisão editorial |

**A newsletter merece atenção.** O formulário do rodapé grava o e-mail no
`localStorage` do próprio visitante e não manda para lugar nenhum. Quem se
inscreveu até hoje não existe em lista nenhuma. Não mexi nisso porque exige
escolher um serviço, mas é a captura mais barata de um portal de notícias.

**Sobre a autoria:** "Redação PromptHub" funciona, mas E-E-A-T pesa mais com pessoa
identificada. Renan é engenheiro eletricista e presta serviço de automação — isso é
credencial real para falar de automação com IA, e vale mais que um nome genérico.

---

## Monitoramento (Passo 7)

**Semanal**
- Search Console: impressões e cliques por página nova
- Conferir se o workflow publicou (Actions do repositório)

**Mensal**
- Quais artigos trouxeram sessão e quais não trouxeram nenhuma em 30 dias
- Cliques de saída em `/ferramentas` versus comissão apurada
- Testar os 5 termos-alvo no Google e no ChatGPT/Perplexity: o site aparece?

**Trimestral**
- Reescrever ou remover artigo com zero sessão em 90 dias — acervo morto pesa
- Refazer esta análise de concorrência
