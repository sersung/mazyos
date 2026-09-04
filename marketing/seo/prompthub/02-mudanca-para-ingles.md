# PromptHub — troca para inglês e saída dos produtos

> Decisão de 04/09/2026. Substitui partes do `00-diagnostico-e-plano.md`,
> que foi escrito quando o site era em português e vendia os pacotes.

---

## O que mudou

Três decisões, tomadas juntas:

1. **Site 100% em inglês.** Não é bilíngue. A versão em português sai do ar.
2. **Acervo traduzido.** Os 58 artigos foram reescritos em inglês.
3. **Produtos fora do site.** Os pacotes de prompts saem — o site em inglês
   fica só com notícia e afiliado.

A terceira contraria o pedido original ("mantendo ainda os documentos a venda").
Foi escolha consciente, com a consequência declarada: **a receita direta acaba.**
Sobram AdSense e comissão de afiliado.

---

## O que isso muda na estratégia

O diagnóstico anterior dizia para não brigar por "notícias de IA" porque Exame e
InfoMoney ocupam. Em inglês o problema é **muito pior**: TechCrunch, The Verge,
Ars Technica e VentureBeat dominam, e ainda existem centenas de newsletters de IA
bem estabelecidas. O mercado é o mais saturado da internet.

**O que continua valendo:** a cauda longa de decisão de compra. "Is X worth it",
"X vs Y", "how much does X cost". Em inglês a concorrência nesses termos é maior
que em português, mas o volume também é ordens de grandeza maior, e a comissão de
afiliado é paga em dólar.

**O que deixou de valer:** todo o funil de venda direta. As páginas de nicho, o
bundle, o catálogo de prompts e a captura de lead que desbloqueava o material
premium não existem mais.

### O funil agora

| Etapa | Página | Receita |
| --- | --- | --- |
| Descoberta | `/news/*` | Display (AdSense) |
| Decisão | `/tools` | Afiliado |
| Retenção | Newsletter | — (ainda não conectada) |

Um funil a menos que antes. A newsletter passou de acessório a peça central:
é o único ativo próprio que sobrou, e continua gravando e-mail no `localStorage`
do visitante sem chegar a lista nenhuma.

---

## Sobre o acervo traduzido

Os 58 artigos não foram traduzidos ao pé da letra. Foram reescritos, adaptando
moeda, exemplos e referências ao Brasil.

**O problema que apareceu na tradução:** cerca de nove dos artigos longos eram o
mesmo texto com as palavras trocadas — "IA e automação multiplicam lucros e
cortam custos" em nove variações. Traduzir literalmente teria criado nove páginas
inglesas competindo pela mesma busca. Cada uma virou uma pergunta distinta (o que
a automação custa de verdade, qual processo automatizar primeiro, por que projetos
falham, como medir retorno, construir ou comprar).

**Cinco artigos afirmavam coisas sobre empresas reais sem fonte registrada.**
Foram checados contra a reportagem original e três receberam link de fonte
(Salesforce/Fin, Ford recontratando 350 engenheiros, DeepHealth). Os que não
deram para verificar foram reescritos em torno da lição, sem repetir a afirmação.

---

## Pendências do Renan (atualizadas)

| Pendência | Situação |
| --- | --- |
| Programas de afiliado | **Agora é a única receita variável.** Prioridade máxima — `affiliateUrl` segue `null` nas 11 ferramentas |
| Newsletter | **Subiu de importância.** É o único ativo próprio que restou |
| Search Console | Ressubmeter: as URLs mudaram todas (`/noticias` → `/news`) e o sitemap tem 72 URLs novas |
| Domínio | `prompterniche.com` continua, mas o nome remete a prompts e o site não vende mais prompts. Vale decidir se troca |
| Autoria | "PromptHub Newsroom" hoje. Assinar com nome próprio pesa mais em E-E-A-T |
| Perda de ranqueamento | Os 301 preservam o que dava para preservar, mas trocar de idioma zera o histórico de relevância por termo. Contar meses, não semanas |

---

## O risco que vale registrar

Trocar de idioma **descarta o histórico de indexação em português**. Os redirects
301 preservam autoridade de link, não relevância por termo — o Google vai
reavaliar cada página para um público e um conjunto de buscas diferentes.

Some-se a isso a saída dos produtos e o resultado é: por um período, o site não
tem receita direta nem o ranqueamento que tinha. A aposta é que o mercado em
inglês compense pelo volume e pela comissão em dólar. É uma aposta razoável e é
uma aposta — vale medir com honestidade nos primeiros 90 dias antes de investir
mais em cima dela.
