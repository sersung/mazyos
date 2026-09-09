# Briefing — PlateBalance.com

## O que é

Site de nutrição prática em inglês para o mercado canadense/americano. Ferramentas
gratuitas + conteúdo educativo sobre montar pratos equilibrados dentro do objetivo,
da rotina e do orçamento de quem lê.

## Promessa

"Build meals that fit your goal, your schedule and your budget."

## Público

Gente ocupada que quer comer melhor sem virar um projeto: trabalhador de turno,
família com orçamento apertado, quem treina, imigrante cozinhando comida da terra
natal com ingrediente do supermercado canadense.

## Diferencial (o que os concorrentes não fazem)

1. **Rendimento cru→cozido em todo cálculo.** Todo mundo compara preço de
   prateleira. 1 kg de frango cru vira 720 g cozidos; 1 kg de feijão seco vira
   2,5 kg cozidos. Sem essa correção o ranking de "proteína por dólar" fica
   errado — e todos os que estão no ar estão.
2. **O plano admite quando não fecha.** Vegano sem soja querendo 174 g de
   proteína recebe o melhor plano possível *e um aviso do que não fechou*.
   Calculadora que sempre devolve número redondo está mentindo.
3. **Restrição de rotina como filtro de verdade.** "Sem geladeira no trabalho"
   filtra a base de alimentos antes da escolha, não depois.

## Decisões travadas (09/09/2026)

| Decisão | Escolha | Por quê |
| --- | --- | --- |
| Idioma | Inglês (CA/EUA) | Todos os clusters do relatório são EN; RPM de AdSense muito maior |
| Stack | Astro estático + Nginx | Core Web Vitals, custo de VPS irrisório, sem manutenção de runtime |
| Escopo do lançamento | 15 pilares de uma vez | Decisão do Renan, contra a recomendação de MVP — ressalva registrada abaixo |
| Identidade visual | Criada do zero | Não existia; ver `design-guide.md` |
| Hospedagem | VPS Hostinger | Já contratada |

**Ressalva registrada:** a recomendação era MVP (home + Plate Builder + 5
pilares) porque volume de artigo publicado de uma vez tende a ficar raso, e
conteúdo raso em nicho de saúde é o primeiro a cair. Mitigação aplicada: cada
guia foi escrito com profundidade real (tabelas com números, trade-offs
explícitos, FAQ com schema) em vez de preencher contagem de palavras.

## Modelo de receita

**Fase 1 (agora):** AdSense + afiliados. Zero barreira, zero login, zero paywall.

**Fase 2 (só depois de validar tráfego e retenção):** e-book, plano semanal pago,
ou micro-SaaS em cima do Plate Builder. Nada disso antes dos dados.

## Estado atual

Site pronto e testado, no repositório `sersung/Platebalance`, branch
`claude/platebalance-site-strategy-07du36`. 26 páginas, 16 pilares (13 guias + 3
ferramentas), 13 testes automatizados no motor de cardápio. Falta: deploy na VPS,
AdSense, newsletter, Search Console.
