# Pesquisa: visual e conversão da landing page do QualificaCanadá

- **Data:** 2026-08-08
- **Pedido:** melhorar o visual do site para atrair mais cliques e mais vendas
- **Insumo:** lista de padrões de infoproduto brasileiro trazida pelo Renan

---

## A conclusão que muda tudo

O público do QualificaCanadá é brasileiro de ofício técnico pesquisando
imigração para o Canadá. É um nicho com fraude documentada: o próprio IRCC
alerta contra sites falsos que prometem garantir entrada ou acelerar
processos, e existe registro de gente perdendo milhares de dólares com
consultor não autorizado.

Isso inverte parte do manual padrão de infoproduto. Os sinais que a lista
recomenda — contador regressivo, "12.847 alunos transformados", logos de
mídia — **são exatamente os sinais que o golpista usa**. Nesse nicho eles não
constroem confiança, eles disparam alarme.

A pesquisa de 2026 sobre confiança em landing page diz a mesma coisa por outro
caminho: num clima em que o consumidor está mais cético, a estratégia durável é
**autenticidade e especificidade acima de volume e polimento**. Prova
verificável e nome real batem parede de selo genérico e nota perfeita
suspeita.

O ativo do Renan é exatamente isso: uma licença 309A real, um ofício real, e
uma história de três negativas que ninguém inventaria para se promover. **A
estratégia visual certa aqui é credencial em primeiro plano, não urgência
fabricada.**

---

## O que a pesquisa confirma da lista

| Item da lista | Veredito | O que a evidência diz |
|---|---|---|
| Mobile first | ✅ Confirmado | 185 milhões de brasileiros online, esmagadoramente por celular. É onde a página tem que estar certa primeiro. |
| Botão WhatsApp fixo | ✅ Confirmado, e mais forte do que a lista diz | 99% de penetração em smartphone no Brasil, 97% acessam diariamente, 1h38 por dia em média. |
| Carregamento rápido | ✅ Confirmado | 1 segundo a mais de carregamento custa cerca de 7% das conversões. LCP abaixo de 2,5s é o alvo. |
| Ancoragem de preço | ✅ Confirmado | "De R$ 638 por R$ 297" já estava certo. Parcelamento aumenta percepção de acessibilidade. |
| Garantia de 7 dias | ✅ Obrigatório mesmo | Direito de arrependimento do CDC para compra a distância. Já estava na página. |
| Primeiro CTA na primeira dobra | ✅ Confirmado | O visitante decide em ~3 segundos se fica. |
| Storytelling do criador | ✅ Confirmado | E é o maior ativo dessa página específica. |
| Cores vibrantes no CTA | ⚠️ Confirmado pelo motivo errado | O que os testes medem não é o poder de laranja ou verde, é **contraste**. Botão vermelho em página vermelha converte pior que azul. A página já usa laranja sobre azul-escuro — contraste alto, está correto. |

---

## O que a pesquisa contradiz

### "Páginas com menos de 350 palavras convertem mais"

Falso para este produto. A evidência é que página longa vence quando o produto
exige consideração, confiança e educação — tráfego frio, oferta complexa,
público que não conhece a marca. Aqui os três se aplicam: ninguém conhece o
QualificaCanadá, o processo do TEA é complicado, e a decisão real não é
"gastar R$ 297", é "apostar anos da minha vida nesse caminho".

Cortar a página para 350 palavras destruiria também o trabalho de SEO/AEO.

### "Escassez real (vagas limitadas, timer)"

Não fazer. O art. 37 do CDC proíbe publicidade capaz de induzir o consumidor a
erro, e contador regressivo falso e estoque limitado fictício são citados como
exemplo clássico de urgência artificial. Um PDF tem escalabilidade infinita —
não existe vaga limitada. Além do risco jurídico, é o sinal de golpe que esse
público específico já aprendeu a identificar.

### "Contador de alunos" e "logos de mídia"

Não fazer, por um motivo simples: seria mentira. Não existem 12.847 alunos e o
produto não saiu na Globo. Inventar é publicidade enganosa e, se algum
comprador conferir, destrói a única coisa que sustenta a venda — a
credibilidade de quem escreveu.

Isso não significa abrir mão de prova social. Significa que ela precisa ser
real (ver "o que depende do Renan").

### "VSL de 5-15 minutos"

A lista se contradiz aqui: pede VSL de 5 a 15 minutos e, três parágrafos
depois, "vídeos curtos". Vídeo realmente ajuda — em torno de 86% de aumento de
conversão nas médias publicadas — mas VSL longo é formato de lançamento com
tráfego quente. Para tráfego frio de busca, vídeo curto de 60 a 90 segundos com
o Renan falando, mostrando a cara e a licença, faz mais e custa menos.

---

## O que foi implementado

**1. Bug crítico de contraste — CTA azul sobre laranja.**
Todos os 13 CTAs da página renderizavam texto azul (#1565C0) sobre fundo
laranja (#C05600). Regressão minha: ao escopar os estilos em `.lp`, o seletor
`a` virou `.lp a` e passou a vencer `.btn-cta` por especificidade. Corrigido
com `:not(.btn)`. Hoje é branco sobre laranja, contraste 4.59:1, passa WCAG AA.

**2. Header mobile.** Logo, botão e menu empilhavam em três linhas e comiam
270px antes do hero começar, com o menu cortado sem aviso. Agora o CTA sai do
header (vive na barra fixa), o menu rola numa linha só com degradê indicando
que continua.

**3. Barra fixa de oferta no mobile.** Preço ancorado (R$ 638 riscado, R$ 297,
12x de R$ 24,75) e CTA sempre ao alcance. Antes, passado o hero, a oferta só
reaparecia no fim da página.

**4. Credencial na primeira dobra.** O selo "Autor licenciado 309A em Ontário"
subiu para logo abaixo do H1. Antes só aparecia depois de rolar. Num nicho
cheio de golpe, esse é o fato mais persuasivo da página.

**5. Hero informativo no lugar de decoração.** Os losangos diziam "PRODUTO 1",
"PRODUTO 2", "PRODUTO 5" — jargão interno, sem informação, e escondidos no
mobile. No lugar entrou o card "Do Brasil à licença" com as 5 etapas reais do
processo, que mostra o que a coleção entrega: o mapa.

**6. WhatsApp flutuante.** Só renderiza com `NEXT_PUBLIC_WHATSAPP` definido —
número inventado seria pior que botão nenhum.

---

## O que depende do Renan, em ordem de impacto

1. **Foto real.** A seção do autor mostra um losango com as iniciais "RC".
   A pesquisa é direta: uma foto autêntica de pessoa ou trabalho real supera
   dez imagens de banco polidas, e imagem genérica sinaliza que o negócio não
   tem o que mostrar. Uma foto no canteiro, de uniforme, vale mais que qualquer
   ajuste de CSS que eu faça.

2. **Foto da licença 309A.** É a prova documental do argumento central da
   página, e é verificável. Hoje ela existe só como texto.

3. **Depoimentos reais.** Se alguém já usou os guias e mandou mensagem, isso é
   prova social legítima — nome, cidade, ofício. Print de WhatsApp real
   converte mais que depoimento diagramado.

4. **Número de WhatsApp** para ligar o botão.

5. **Vídeo curto de 60 a 90 segundos** no hero: quem é você, o que aconteceu,
   o que o material resolve.

---

## Fontes

- [Trust Signals That Convert: A Funnel Placement Framework](https://www.digitalapplied.com/blog/social-proof-trust-signals-2026-conversion-placement-framework)
- [Landing Page Hero Section: Design Best Practices That Convert (2026)](https://www.landy-ai.com/blog/landing-page-hero-section)
- [Which CTA Button Color Converts the Best? — CXL](https://cxl.com/blog/which-color-converts-the-best/)
- [CTA Button A/B Tests: Why Most Button Color Tests Are Worthless](https://atticusli.com/blog/posts/cta-button-ab-tests-why-button-color-tests-are-worthless/)
- [A publicidade enganosa de infoprodutos](https://walmarandrade.com.br/publicidade-enganosa-infoprodutos/)
- [Direito do consumidor e publicidade enganosa — Migalhas](https://www.migalhas.com.br/depeso/405184/direito-do-consumidor-e-publicidade-enganosa-regulamentacoes)
- [IRCC adverte sobre golpes dos falsos consultores de imigração](https://terryferreira.ca/falsos-consultores-de-imigracao/)
- [Golpes comuns de imigração e como evitá-los — Migalhas](https://www.migalhas.com.br/depeso/415336/golpes-comuns-de-imigracao-e-como-evita-los)
- [Short Form vs Long Form Sales Pages](https://thrivethemes.com/long-sales-page-vs-short-sales-page/)
- [When to Use Short Form and Long Form Sales Pages — Teachable](https://www.teachable.com/blog/when-to-use-short-form-and-long-form-sales-pages)
- [Estatísticas do WhatsApp no Brasil 2026 — Unred](https://unred.com.br/blog/estatisticas-whatsapp-brasil)
- [O consumo de internet e redes sociais no Brasil de 2026](https://www.negociossc.com.br/blog/o-consumo-de-internet-e-redes-sociais-no-brasil-de-2026-em-dados/)
- [Criação de landing page de alta conversão: guia de performance para 2026](https://agencianovofoco.com.br/criacao-de-landing-page-de-alta-conversao-o-guia-de-performance-para-2026/)
