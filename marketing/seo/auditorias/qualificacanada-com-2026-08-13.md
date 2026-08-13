# Auditoria — qualificacanada.com

**Data:** 2026-08-13
**Escopo:** home, listagem e páginas de artigo (15), páginas institucionais
**Método:** leitura do código-fonte no repositório (`sersung/qualificacanada`), não da URL pública
**Idioma do conteúdo:** português (pt-BR), site monolíngue — hreflang não se aplica

---

## Scorecard

| Critério | Nota (0-2) | Observação |
|---|---|---|
| E-E-A-T — Experience | 1 | A home tem vivência real e forte (três negativas, licença em dez/2022, depoimento assinado). Os 15 artigos não carregavam nada disso: nenhum sinal de autoria ou vivência dentro da peça. |
| E-E-A-T — Expertise | 0 → 2 | O autor tem credencial verificável (309A em Ontário) descrita em `/sobre`, mas o schema dos artigos declarava `author: Organization`, jogando fora a credencial. Corrigido para `Person` com `jobTitle`. |
| E-E-A-T — Authoritativeness | 1 | Cita fontes oficiais nominalmente (IRCC, Skilled Trades Ontario, canada.ca, skilledtradesontario.ca), mas quase sem links externos para elas. Backlinks: não verificável nesta auditoria. |
| E-E-A-T — Trust | 0 → 2 | Nenhum artigo exibia data de publicação, e o `BlogPosting` não tinha `datePublished`/`dateModified` — Google não gera rich result de artigo sem isso. Disclaimer RCIC e contato reais já existiam e são um ponto forte. |
| Legibilidade | 2 | Parágrafos curtos, H2 a cada 2-4 parágrafos, listas frequentes, sem jargão de guru. Alinhado ao tom de `_memoria/preferencias.md`. |
| AEO/GEO-readiness | 1 → 2 | Dados concretos e listas extraíveis já eram bons (faixas salariais, custos por cidade, etapas numeradas). Faltava `FAQPage` fora da home e blocos de pergunta-resposta direta nos artigos. |
| Saúde técnica | 1 → 2 | Canonical, robots, sitemap e breadcrumb corretos. Falhas: sitemap com `lastModified` fixo, sem 404 customizado, sem OG image por artigo, tempo de leitura falso. |

**Nota geral antes:** 6/14
**Nota geral depois das correções aplicadas:** 12/14

---

## Top problemas encontrados (do mais barato de corrigir ao mais caro)

### 1. Tempo de leitura falso em todos os artigos — corrigido
Todo artigo exibia `Leitura: ~5 min`, hardcoded. O valor real varia de 2 a 5 min. Agora é calculado do texto (200 palavras/min).

### 2. Placeholders de anúncio visíveis em produção — corrigido
Cada artigo mostrava dois blocos com o texto literal `[Anúncio Google AdSense]` para o visitante. Além de parecer site inacabado, é o tipo de conteúdo-placeholder que pesa contra numa revisão do AdSense. Removidos.

### 3. Artigos sem data e sem autor — corrigido
Nenhum dos 15 artigos exibia data ou autoria, e o schema não tinha `datePublished`/`dateModified`. É a falha mais cara em E-E-A-T para conteúdo de imigração, que é YMYL (Your Money or Your Life) — Google aplica critério mais rígido de confiança nesse nicho. Datas recuperadas do histórico do git (não estimadas): 10 artigos em 2026-06-29, 5 em 2026-08-09.

### 4. Credencial do autor desperdiçada — corrigido
O maior ativo de E-E-A-T do projeto é o autor ser eletricista licenciado 309A em Ontário — alguém que passou pelo processo que o site ensina. O schema declarava `Organization` como autor. Agora declara `Person`, com cargo e link para `/sobre`.

### 5. Sem `FAQPage` fora da home — corrigido nos 5 artigos de ofício técnico
As páginas comercialmente relevantes (TEA, 309A, Skilled Trades Ontario, salários, reversão de negativa) não tinham bloco de pergunta-resposta nem schema. São exatamente as buscas em que featured snippet e citação por IA decidem o clique. Adicionadas 4 perguntas por artigo, com respostas extraídas do próprio texto — sem inventar informação nova.

### 6. Sitemap com data congelada — corrigido
Todas as URLs declaravam `lastModified: 2026-07-23`, inclusive artigos publicados em junho. Agora cada artigo declara a própria data.

### 7. Sem página 404 — corrigido
Qualquer URL inexistente caía no 404 padrão do Next, sem navegação. Agora há uma página de resgate com links para home, artigos e contato.

### 8. Sem links entre artigos — corrigido
Os 15 artigos não linkavam entre si; só apontavam para as páginas de venda. Adicionado bloco "Continue lendo" com 3 sugestões, priorizando o mesmo grupo temático (ofício técnico vs. imigração geral).

---

## Pendências — status na segunda rodada (2026-08-13)

1. ~~**Links externos para as fontes citadas.**~~ **Resolvido.** Todos os 15 artigos ganharam bloco "Fontes oficiais" com link externo (`rel="noopener noreferrer"`, dofollow) para IRCC, Skilled Trades Ontario, Job Bank, Ontario.ca ou Statistics Canada conforme o assunto. As mesmas fontes entram no `BlogPosting` como `citation`.
2. ~~**Datas dos valores monetários.**~~ **Resolvido.** Os 6 artigos com valores em dinheiro passam a exibir aviso de que são faixas de referência da data de publicação, com a data explícita, e remetem às fontes oficiais. O H2 "O mercado de trabalho canadense em 2025" — que datava um artigo publicado em 2026 — virou título atemporal.
3. ~~**Os 10 artigos gerais são genéricos.**~~ **Tratado.** Os 10 receberam bloco de perguntas + `FAQPage` — agora os 15 artigos têm FAQ, com todas as respostas extraídas do corpo do próprio texto. Foram criados links contextuais dos artigos gerais para os de ofício técnico nos dois pontos em que o texto já puxava para o assunto (seção de trades em "profissões com demanda"; item de revalidação de diploma em "erros comuns"), fechando o funil entre conteúdo de topo e produto.
   *Ressalva honesta:* isso resolve a prontidão técnica e o funil, não o fundo editorial. Os 10 continuam sem ângulo autoral próprio, e isso não é corrigível sem material do Renan — inventar vivência num site YMYL seria exatamente a fraude de E-E-A-T que esta auditoria existe para evitar. A recomendação de concentrar conteúdo novo no grupo de ofício técnico continua de pé.
4. ~~**Aviso do AdSense.**~~ **Resolvido:** monetização removida. Saíram o script do `adsbygoogle`, a meta `google-adsense-account` e o `public/ads.txt`. Com 3 páginas indexadas e ~0 impressões, o script custava carregamento em toda página sem nenhuma unidade renderizando. Volta quando houver audiência.
5. ~~**Métricas reais.**~~ **Parcialmente resolvido** — ver a seção de Search Console abaixo.

---

## Search Console — Cobertura em 2026-08-13

Base: export de cobertura ("Todas as páginas conhecidas"), série de 2026-05-14 a 2026-08-06. Os dois arquivos enviados são o mesmo export duplicado.

### O número que importa

| Data | Indexadas | Não indexadas |
|---|---|---|
| 2026-06-29 (site no ar) | 4 | 1 |
| 2026-06-30 | 2 | 4 |
| 2026-07-10 | 2 | 6 |
| 2026-08-06 | 3 | 5 |

**O Google conhece cerca de 8 URLs. O site tem 23** (home + 7 institucionais + índice + 15 artigos, todas no sitemap). Ou seja: o problema principal não é qualidade de indexação, é **descoberta** — dois terços do site nunca foram rastreados. Impressões no período: entre 0 e 4 por dia.

### Problemas críticos reportados

| Motivo | Páginas | Diagnóstico |
|---|---|---|
| Não encontrado (404) | 2 | Não identificável por este export — ver abaixo. |
| Página com redirecionamento | 2 | **Esperado, não é falha.** O `next.config.ts` faz 301 de `www.qualificacanada.com` para o apex, e o DNS tem `CNAME www`. O Google lista a variante www como "com redirecionamento" — é o comportamento correto. |
| Bloqueada pelo robots.txt | 1 | Não identificável por este export — ver abaixo. |

### O que foi descartado por verificação direta

Três hipóteses testadas contra o HTML gerado pelo build, todas negativas:

- **Canonical apontando para a home.** O root layout usa `alternates: { canonical: "./" }`, que poderia fazer toda página se declarar duplicata da home. Verificado no build: cada página emite o próprio canonical correto (`/sobre`, `/contato`, `/artigos`…). **Não é a causa.**
- **Links internos quebrados.** Todos os `href` internos de `app/` e `components/` foram cruzados com as rotas reais. **Nenhum link quebrado.**
- **robots.txt bloqueando algo.** O `app/robots.ts` do repositório emite `allow: /` para `*` e aponta o sitemap. Não há `public/robots.txt` conflitante. **Nada bloqueado pelo código.**

### O que falta para fechar o diagnóstico

O export de cobertura resumido traz apenas as contagens, não as URLs. Para nomear as 2 páginas com 404 e a 1 bloqueada por robots.txt é preciso o **export de dentro de cada problema**: no Search Console, abrir Indexação → Páginas, clicar no motivo específico (ex.: "Não encontrado (404)") e exportar a lista de exemplos dessa tela.

Não foi possível checar o site no ar a partir deste ambiente — o proxy de rede bloqueia egress para `qualificacanada.com` e para os domínios oficiais. Toda a verificação acima veio do código e do build local.

### Recomendação de maior impacto

Dado que 15 das 23 URLs nunca foram descobertas, o passo com maior retorno não está no código: confirmar no Search Console que `sitemap.xml` está **submetido** e sendo lido, e usar "Inspecionar URL → Solicitar indexação" nos 5 artigos de ofício técnico, que são as páginas com intenção comercial. As correções de E-E-A-T desta rodada ajudam a página a ser *mantida* no índice depois de rastreada, mas não substituem o rastreamento inicial.

---

## Infra verificada via MCP Hostinger (2026-08-13)

- Domínio `qualificacanada.com` ativo, expira em 2027-05-03.
- DNS: `A @ → 2.25.141.59` e `CNAME www`, apontando para a VPS correta. Verificação do Google Search Console presente no TXT.
- Container `qualificacanada` rodando na VPS `srv1710158.hstgr.cloud`, atrás do Traefik do Coolify.
- **Ponto de atenção de segurança:** a VPS não tem nenhum firewall group associado (`firewall_group_id: null`, lista de firewalls vazia) e expõe em `0.0.0.0` as portas 8080 (dashboard do Traefik), 8000 (painel do Coolify), 32768 (n8n), 5001 e 8088. Vale restringir por firewall ou fechar o que não precisa ser público.

---

## Deploy de 2026-08-13

Merge da branch de correções na `main`, disparando o workflow `Deploy QualificaCanadá para VPS`.

- **Run 31705952533 — sucesso.** rsync e `docker compose up -d --build` concluídos às 13:39:37 UTC.
- Não foi possível confirmar o site no ar a partir deste ambiente (proxy bloqueia egress para o domínio) nem ler o container via MCP (ver abaixo). A confirmação do deploy vem dos passos do workflow, todos verdes.

### Achado: o deploy anterior nunca chegou em produção

O run de 2026-08-10 (commit `2b32b1b`, "captura de e-mail no guia grátis + GA4 + tracking pronto pra Meta Pixel") **falhou**:

```
ssh: connect to host *** port 22: Operation timed out
rsync error: unexplained error (code 255)
```

Ou seja: o formulário de captura de lead, o GA4 e o tracking do Meta Pixel ficaram três dias no repositório sem estar no ar. Só entraram em produção com o deploy de hoje. Se o GA4 aparentava não registrar nada nesse período, essa é a explicação.

O SSH da VPS já se mostrou instável a partir dos runners do GitHub — vale monitorar, porque é o único caminho de deploy do projeto.

### Firewall: planejado, NÃO aplicado

O firewall foi aprovado mas **não pôde ser criado**: o servidor MCP da Hostinger reconectou sob outro identificador no meio da sessão e passou a exigir aprovação manual em cada chamada, que não foi concedida. Nenhuma alteração de infraestrutura foi feita.

Plano para executar depois, na ordem exata — a API da Hostinger **dropa todo tráfego de entrada por padrão**, então as regras de liberação têm de existir antes da ativação, ou a VPS fica inacessível:

1. `VPS_createNewFirewallV1` — criar o firewall.
2. `VPS_createFirewallRuleV1` — liberar, com `source: any`, nesta ordem: **TCP 22** (sem isso o deploy via GitHub Actions morre), **TCP 80** e **TCP 443** (sem isso os 19 sites saem do ar).
3. Conferir a lista de regras com `VPS_getFirewallDetailsV1` **antes** de seguir.
4. `VPS_activateFirewallV1` — só então ativar na VM 1710158.

Duas consequências a aceitar conscientemente antes de ativar, porque não são óbvias:

- **O painel do Coolify em `http://<ip>:8000` para de responder.** Se ele não estiver publicado por domínio atrás do Traefik, o acesso ao painel se perde — numa VPS que hospeda 19 projetos.
- **O n8n em `:32768` para de receber chamadas externas.** Webhooks de serviços de terceiros apontando para essa porta quebram silenciosamente. Como automação é uma das frentes do negócio, isso precisa ser verificado antes.

Reversão, se algo quebrar: `VPS_deactivateFirewallV1` na VM 1710158.
