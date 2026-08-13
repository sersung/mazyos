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

## Pendências não resolvidas (recomendação para a próxima rodada)

1. **Links externos para as fontes citadas.** Os artigos nomeiam IRCC, Skilled Trades Ontario e canada.ca, mas quase nunca linkam. Linkar a fonte oficial em cada afirmação regulatória sobe Authoritativeness e é barato.
2. **Datas dos valores monetários.** As faixas salariais e os custos de vida não dizem a que ano se referem ("em 2025" aparece em um artigo, os outros não datam). Em conteúdo YMYL, número sem data envelhece mal.
3. **Os 10 artigos gerais são genéricos.** Cobrem bem o básico, mas não têm ângulo próprio — qualquer portal de imigração tem texto equivalente. Os 5 de ofício técnico são o oposto: específicos e defensáveis. A vantagem competitiva do site está nesse segundo grupo.
4. **Aviso do AdSense.** Com os placeholders removidos, definir se os slots reais entram ou se a monetização sai do escopo do site.
5. **Métricas reais** (tráfego, posição, backlinks) não são verificáveis por leitura de código — precisam de Search Console para a próxima auditoria.

---

## Infra verificada via MCP Hostinger (2026-08-13)

- Domínio `qualificacanada.com` ativo, expira em 2027-05-03.
- DNS: `A @ → 2.25.141.59` e `CNAME www`, apontando para a VPS correta. Verificação do Google Search Console presente no TXT.
- Container `qualificacanada` rodando na VPS `srv1710158.hstgr.cloud`, atrás do Traefik do Coolify.
- **Ponto de atenção de segurança:** a VPS não tem nenhum firewall group associado (`firewall_group_id: null`, lista de firewalls vazia) e expõe em `0.0.0.0` as portas 8080 (dashboard do Traefik), 8000 (painel do Coolify), 32768 (n8n), 5001 e 8088. Vale restringir por firewall ou fechar o que não precisa ser público.
