---
name: seo
description: >
  Fluxo completo de SEO, AEO e GEO + Google Ads em 9 passos: idioma do site, pesquisa de
  demanda, análise de concorrência, Google Meu Negócio, otimização on-page, estratégia de
  conteúdo, Google Ads, checklist de monitoramento, AEO/GEO (aparecer em respostas diretas do
  Google e em IAs como ChatGPT, Gemini, Perplexity) e auditoria de qualidade/E-E-A-T. Funciona
  em português e em inglês, inclusive sites bilíngues.
  Use quando o usuário pedir "seo", "aeo", "geo", "palavras-chave", "google ads",
  "aparecer no google", "aparecer no chatgpt", "aparecer nas ias", "featured snippet",
  "google meu negócio", "gmb", "analisar concorrência seo", "qualidade de conteúdo", "e-e-a-t",
  "pesquisa de nicho", "google trends".
---

# /seo — SEO completo + AEO + GEO + Google Ads

## Dependências

- **Contexto do negócio:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`
- **Estratégia atual:** `_memoria/estrategia.md`
- **Ferramentas:** WebSearch, WebFetch (nativos)
- **Outputs vão em:** `marketing/seo/`

---

## Workflow

### Passo 0 — IDIOMA: em que idioma(s) o site/conteúdo existe?

**Objetivo:** Calibrar toda a pesquisa e os outputs pro(s) idioma(s) certo(s) antes de gastar uma chamada de busca.

1. Se já estiver claro pela conversa ou pelo `_memoria/empresa.md` (site, público, país), seguir sem perguntar.
2. Senão, perguntar:

   > "Esse trabalho de SEO é pra um site em português, em inglês, ou os dois (bilíngue)?"

3. Se **bilíngue**: cada passo abaixo roda **uma vez por idioma** (termos de busca diferentes, concorrentes diferentes — o concorrente PT-BR raramente é o mesmo do mercado EN). Os outputs ficam nos mesmos arquivos, com seções separadas por idioma (`## 🇧🇷 Português` / `## 🇺🇸 English`).
4. Confirmar também: as versões PT e EN são **páginas separadas com hreflang** (ex: `/pt/artigo` e `/en/article`) ou é **conteúdo único só em um idioma**? Isso muda o checklist técnico do Passo 4 (hreflang só se aplica a multi-idioma real).

**Regra:** nunca misturar termos de busca dos dois idiomas na mesma pesquisa — "melhor fornecedor de X" e "best X supplier" têm concorrência, volume e intenção diferentes, mesmo que o produto seja o mesmo.

---

### Passo 1 — DEMANDA: O que as pessoas buscam nesse nicho?

**Objetivo:** Entender se existe demanda real e como as pessoas buscam.

> Se o Passo 0 identificou mais de um idioma, repetir esse passo inteiro pra cada idioma — termos-semente, sazonalidade e classificação são independentes por idioma, nunca tradução direta de um pro outro.

1. Ler `_memoria/empresa.md` pra extrair: produtos/serviços, região, público-alvo, diferenciais
2. Gerar uma lista inicial de **30-50 termos-semente** baseados em:
   - Categorias de produto/serviço
   - Intenção de busca (informacional, comercial, transacional)
   - Localização (cidade, região, estado)
   - Uso final / contexto do cliente
3. Usar **WebSearch** pra cada grupo de termos:
   - Buscar `"[termo] site:trends.google.com"` pra ver sazonalidade
   - Buscar `"[termo]"` pra ver o que aparece (orgânico, ads, maps)
   - Buscar `"[termo] related searches"` pra expandir a lista
4. Classificar cada termo por:
   - **Volume estimado:** alto / médio / baixo / micro
   - **Intenção:** informacional, comercial, transacional, navegacional
   - **Dificuldade:** quantos concorrentes fortes aparecem?
   - **Relevância:** direto (produto exato) / indireto (nicho relacionado) / tangencial

**Output:** Salvar em `marketing/seo/01-pesquisa-demanda.md` com:
- Tabela de termos classificados
- Top 10 termos prioritários (volume + intenção transacional + baixa concorrência)
- Termos sazonais
- Termos descartados e por quê

---

### Passo 2 — CONCORRÊNCIA: Quem aparece pra essas buscas?

**Objetivo:** Mapear quem domina os resultados e onde estão os gaps.

> Se bilíngue: os concorrentes do mercado PT-BR e do mercado EN costumam ser empresas diferentes — mapear os dois conjuntos separadamente, sem assumir que quem ganha em um idioma ganha no outro.

1. Pegar os **top 10 termos** do Passo 1
2. Pra cada termo, usar **WebSearch** e analisar:
   - **Top 5 resultados orgânicos:** quem são, que tipo de página (site institucional, marketplace, blog, diretório)
   - **Resultados do Maps/Local Pack:** quem aparece, quantas avaliações, nota
   - **Google Ads:** alguém anuncia? qual a copy?
3. Pra cada concorrente relevante (máx 5-8), usar **WebFetch** pra analisar:
   - Estrutura do site (páginas, blog, catálogo)
   - Meta titles e descriptions das páginas principais
   - Conteúdo: falam de quê? com que profundidade?
   - Schema markup: usam dados estruturados?
   - GMB: perfil completo? fotos? posts? avaliações?
4. Identificar:
   - **Gaps:** o que nenhum concorrente faz bem
   - **Oportunidades:** termos onde ninguém domina
   - **Ameaças:** concorrentes fortes demais pra competir de frente
   - **Benchmark:** o padrão mínimo que o negócio precisa atingir

**Output:** `marketing/seo/02-analise-concorrencia.md` com:
- Tabela de concorrentes
- Mapa de gaps e oportunidades
- Recomendações: onde atacar primeiro

---

### Passo 3 — GMB: Google Meu Negócio (resultado mais rápido)

**Objetivo:** Montar o perfil completo do Google Business Profile pra aparecer no Maps e Local Pack.

1. Pesquisar como está o perfil atual (se existir): buscar o nome da empresa no Google
2. Criar documento com **tudo que precisa ser preenchido/otimizado:**

   **Informações básicas:**
   - Nome (idêntico ao registrado)
   - Categoria principal + secundárias (sugerir as melhores pro nicho)
   - Endereço, telefone, site
   - Horário de funcionamento
   - Área de atendimento

   **Descrição do negócio:**
   - Descrição otimizada (750 caracteres) com palavras-chave naturais
   - Tom: conforme `_memoria/preferencias.md`

   **Atributos e serviços:**
   - Serviços relevantes
   - Atributos (entrega, atacado, produção própria, etc.)

   **Fotos recomendadas:**
   - Checklist (fachada, interior, produtos, equipe, produção)
   - Especificações

   **Posts GMB:**
   - 4 posts iniciais sugeridos
   - Calendário de posts recorrentes

   **Estratégia de avaliações:**
   - Como pedir avaliações dos clientes atuais
   - Template de resposta (positivas e negativas) — usar `/responder-avaliacoes`

   **Citações e diretórios:**
   - Lista de diretórios relevantes pro nicho
   - NAP consistente (Name, Address, Phone) pra todas as listagens

**Output:** `marketing/seo/03-google-meu-negocio.md`

---

### Passo 4 — ON-PAGE: Otimizar o site

**Objetivo:** Garantir que cada página esteja otimizada pras palavras-chave certas — e pronta pra ser lida por rich results e por IAs.

1. Ler a estrutura atual do site (se `site/` existir; senão, perguntar as páginas)
2. Pra cada página:

   **Mapeamento de palavras-chave por página** (por idioma, se bilíngue)

   **Meta tags otimizadas:**
   - Title (50-60 caracteres, keyword no início)
   - Meta description (150-160 caracteres, com CTA)
   - H1, H2, H3 sugeridos
   - Idioma declarado no HTML (`<html lang="pt-BR">` ou `<html lang="en">`)

   **Multi-idioma (só se o site tiver páginas PT e EN separadas):**
   - `hreflang` recíproco entre as versões (`<link rel="alternate" hreflang="pt-BR" href="...">` e `hreflang="en"`, mais uma tag `x-default`)
   - Nunca traduzir automático sem revisão humana — Google e IAs penalizam/ignoram tradução mecânica
   - URLs separadas por idioma (`/pt/...` e `/en/...`, ou subdomínio/domínio próprio) — nunca o mesmo path trocando conteúdo por cookie/JS

   **Schema Markup (dados estruturados, JSON-LD):**
   - `LocalBusiness` (ou subtipo mais específico: `Restaurant`, `Store`, `ProfessionalService`)
   - `Organization` na home (nome, logo, redes sociais via `sameAs`)
   - `Product`/`Offer` pros produtos, com preço e disponibilidade reais
   - `Article`/`BlogPosting` nos posts (autor, data de publicação, data de atualização)
   - `FAQPage` nas seções de perguntas
   - `BreadcrumbList` pra hierarquia de navegação
   - `AggregateRating`/`Review` só se existirem avaliações reais — nunca inventar nota
   - Validar todo schema no [Rich Results Test do Google](https://search.google.com/test/rich-results) antes de considerar pronto

   **Checklist técnico:**
   - URLs amigáveis, sem stopwords desnecessárias, no idioma certo
   - Alt text das imagens (descritivo, com keyword natural, no idioma da página)
   - Imagens em formato moderno (WebP/AVIF) e comprimidas — pesa direto no Core Web Vitals
   - Core Web Vitals (LCP, INP, CLS) dentro da faixa "bom" — checar via PageSpeed Insights
   - Mobile-friendly
   - Sitemap.xml (listando todas as versões de idioma), robots.txt, canonical, Open Graph + Twitter Card

   **Internal linking:** mapa de links internos sugerido, sempre dentro do mesmo idioma — nunca linkar uma página PT pra uma EN como se fosse "leitura relacionada"

**Output:** `marketing/seo/04-otimizacao-on-page.md` com:
- Tabela: página → idioma → keyword principal → title → description → H1
- Schema markup pronto pra copiar (JSON-LD), por página
- Checklist técnico com status (feito / pendente)

---

### Passo 5 — CONTEÚDO: Estratégia de autoridade

**Objetivo:** Criar plano de conteúdo que posicione a empresa como referência no nicho.

1. Baseado nos termos do Passo 1 (especialmente os informacionais):

   **Páginas/posts evergreen:**
   - 5-10 ideias que respondem dúvidas reais do público
   - Pra cada ideia: título otimizado, keyword-alvo, estrutura de headings, estimativa de tamanho

   **Cluster de conteúdo:**
   - Página pilar
   - Páginas satélite que linkam pra pilar
   - Estrutura de internal linking

   **Calendário editorial:**
   - Prioridade de publicação
   - Frequência sugerida
   - Formato (blog post, guia, FAQ, comparativo)

   **Conteúdo local:**
   - Páginas de área de atendimento (se fizer sentido)
   - Conteúdo com referências locais

   **Sinais de E-E-A-T pra incluir em cada peça:**
   - Autor identificado (nome + credencial/experiência real, não "Equipe [Empresa]" genérico)
   - Fontes e referências verificáveis quando citar dado externo
   - Data de publicação e de última atualização visíveis
   - Exemplo ou caso concreto do próprio negócio, não só teoria genérica

   > Se bilíngue: conteúdo em EN não é tradução 1:1 do PT (nem o contrário) — adaptar exemplos, moeda, unidades, referências culturais e os termos de busca próprios daquele mercado.

**Output:** `marketing/seo/05-estrategia-conteudo.md`

> Essa lista é o insumo da skill `/publicar-tema` — cada item dessa estratégia vira artigo + carrossel + legendas com um único comando.

---

### Passo 6 — GOOGLE ADS: Campanhas prontas pra rodar

**Objetivo:** Estruturar campanhas baseadas nos dados reais da pesquisa.

1. Definir **objetivo das campanhas:**
   - Geração de leads (ligações, WhatsApp, formulário)
   - Visitas ao site
   - Alcance local

2. **Estrutura de campanhas:**

   **Search:**
   - Grupos de anúncios (1 por cluster de keyword)
   - Pra cada grupo: 10-15 palavras-chave, lista de negativas, 3 RSAs, extensões
   - Orçamento diário, estratégia de lance, segmentação geográfica

   **Local (se aplicável):** anúncios pra Google Maps, segmentação por proximidade

   **Display/Remarketing (opcional):** públicos, formatos

3. **Copies dos anúncios:**
   - Seguir tom de `_memoria/preferencias.md`
   - Incluir diferenciais concretos
   - CTAs específicos
   - 15 headlines, 4 descriptions

4. **Landing page:** avaliar se o site atual serve ou precisa de página específica

**Output:** `marketing/seo/06-google-ads.md` com estrutura completa, palavras-chave organizadas, copies prontas, orçamento e configurações.

> A skill `/anuncio-google` consome esse arquivo e gera o CSV pronto pra importar no Google Ads.

---

### Passo 7 — MONITORAMENTO: Checklist mensal

**Objetivo:** Garantir que o trabalho continue dando resultado.

**Semanal:**
- Posição nos top 10 termos
- Responder avaliações no GMB
- Postar no GMB (1x/semana mínimo)

**Mensal:**
- Revisar métricas do Google Ads (CTR, CPC, conversões, custo/lead) — usar `/relatorio-ads`
- Verificar tráfego orgânico (Google Search Console)
- Atualizar palavras-chave negativas
- Publicar 1-2 conteúdos do calendário editorial
- Verificar citações/diretórios

**Trimestral:**
- Refazer pesquisa de concorrência (Passo 2 resumido)
- Atualizar fotos e posts do GMB
- Revisar estratégia de conteúdo
- Avaliar novas oportunidades de keywords

**Output:** `marketing/seo/07-checklist-monitoramento.md`

---

### Passo 8 — AEO + GEO: Aparecer em respostas diretas (Google e IAs)

**Objetivo:** Otimizar pra dois tipos de "resposta pronta" que competem com o clique tradicional:

- **AEO (Answer Engine Optimization):** featured snippets, People Also Ask, painel de resposta direta e AI Overviews do Google, busca por voz (Google Assistant, Siri, Alexa)
- **GEO (Generative Engine Optimization):** citação em respostas de ChatGPT, Gemini, Perplexity, Copilot

São otimizações relacionadas mas distintas — tratar as duas, não só uma.

**Por que importa:** Cada vez mais gente pergunta direto pra um assistente ou lê a resposta pronta no topo do Google, sem clicar em nada. Quem é citado ganha lead qualificado sem pagar ads e sem depender só da posição #1 tradicional.

1. **Auditoria AEO/GEO** (repetir por idioma, se bilíngue):
   - WebSearch nos top 10 termos do Passo 1 e checar: existe featured snippet/AI Overview? é a empresa, concorrente, ou ninguém do nicho?
   - WebSearch dos mesmos termos em formato de pergunta ("o que é...", "how does... work") pra ver como o Google responde direto
   - Testar os mesmos termos em engines de IA acessíveis via WebSearch/WebFetch e registrar: a empresa aparece? quem aparece? qual fonte foi citada?

2. **Estrutura "resposta primeiro" (answer-first):**
   - Cada H2/H3 que for uma pergunta real do público deve ter a resposta direta nas **primeiras 1-3 frases** (40-60 palavras), só depois o desenvolvimento
   - Formato: pergunta como heading → resposta objetiva → detalhamento, exemplos, contexto
   - Evitar rodeio: Google e IAs descartam parágrafos que enrolam antes de responder

3. **Formatos que engines preferem extrair:**
   - Listas numeradas/com bullets pra processos e passo a passo
   - Tabelas comparativas (preço, prazo, especificação) — fáceis de citar/renderizar
   - Definições curtas em bloco isolado ("X é...") logo no início de artigos sobre conceito
   - Dados concretos e verificáveis: números, datas, certificações, endereço — nunca vago

4. **Clareza de entidade:**
   - Nome da empresa, localização e categoria consistentes em todo o site e nas citações externas (mesmo NAP do Passo 3)
   - Nomear a entidade explicitamente no texto (empresa/produto/pessoa) em vez de só usar pronomes — IAs conectam melhor entidades nomeadas

5. **FAQ Schema + páginas de pergunta:**
   - Seção de FAQ com perguntas reais do nicho (5-10, baseadas no que o público pergunta de verdade)
   - Implementar `FAQPage` schema (JSON-LD)
   - Página dedicada tipo "perguntas frequentes sobre X" quando o volume de dúvidas justificar

6. **Citações externas (menções):**
   - IAs generativas pesam menções em fontes que consideram confiáveis
   - Ações: diretórios do nicho, sites de avaliação, guest posts, menções em blogs relevantes, aparições em mídia, Wikipedia/Wikidata quando aplicável
   - Se bilíngue: buscar citações no ecossistema de cada idioma — um guest post em blog brasileiro não ajuda a aparecer em respostas em inglês, e vice-versa

7. **Dados estruturados reforçados:** `LocalBusiness`, `FAQPage`, `Product`, `Article`/`BlogPosting`, `HowTo` quando o conteúdo for um passo a passo

8. **Monitoramento AEO/GEO:**
   - A cada 30 dias, testar os top 5 termos (por idioma) no Google e via WebSearch em engines de IA
   - Registrar: apareceu? quem apareceu? qual fonte foi citada?
   - Ajustar conteúdo com base nos resultados

**Output:** `marketing/seo/08-geo-otimizacao-ia.md` com auditoria (por idioma), FAQ + schema JSON-LD, lista de ações pra aumentar citações, checklist de monitoramento.

---

### Passo 9 — QUALIDADE: Auditoria de E-E-A-T e saúde técnica

**Objetivo:** Garantir que o site passe no "teste de confiança" do Google e das IAs — conteúdo raso ou site com problema técnico não aparece em lugar nenhum, não importa a keyword.

1. **E-E-A-T (Experience, Expertise, Authoritativeness, Trust):**
   - **Experience:** o conteúdo mostra vivência real (fotos próprias, casos reais, processo mostrado) em vez de genérico?
   - **Expertise:** tem autor identificado com credencial/bio? (`author` no schema `Article`)
   - **Authoritativeness:** o site é citado/linkado por outras fontes do nicho? aparece em diretórios relevantes?
   - **Trust:** HTTPS, página de contato real, política de privacidade, avaliações reais visíveis, dados da empresa (CNPJ/endereço) verificáveis

2. **Qualidade do conteúdo (por página/artigo, por idioma):**
   - Responde a intenção de busca por completo, ou só arranha a superfície?
   - Original — não é reescrita rasa de concorrente
   - Atualizado — data de publicação e de última atualização visíveis
   - Livre de erro gramatical/ortográfico (revisar no idioma nativo de cada versão, não só tradução automática)
   - Legibilidade adequada ao público: frases curtas, parágrafos de 2-4 linhas, sem jargão desnecessário

3. **Saúde técnica:**
   - Links quebrados (internos e externos) — checar amostra das páginas principais
   - Conteúdo duplicado (inclusive entre versões PT/EN mal configuradas sem hreflang correto)
   - Core Web Vitals dentro do "bom" no PageSpeed Insights
   - Todas as páginas indexáveis que deveriam estar (checar `robots.txt` e `noindex` acidental)

4. **Prioridades:** listar os 5 problemas que mais travam ranqueamento/aparição em IA, do mais barato de resolver pro mais caro

**Output:** `marketing/seo/09-qualidade-eeat.md` com checklist marcado (feito/pendente), lista de problemas encontrados e prioridades de correção.

> Pra auditoria avulsa de qualidade em conteúdo já publicado (sem rodar o `/seo` inteiro), usar a skill `/qualidade-conteudo` diretamente.

---

## Execução

Ao rodar `/seo`, executar o Passo 0 (idioma) e depois **todos os 9 passos em sequência**, salvando cada output no arquivo correspondente. Entre cada passo, mostrar resumo do que foi encontrado antes de seguir.

Se o usuário quiser rodar apenas um passo: `/seo passo 3`, `/seo gmb`, `/seo aeo`, `/seo geo` ou `/seo qualidade`.

Ao finalizar, apresentar **resumo executivo** com:
- Top 5 oportunidades encontradas
- Ações prioritárias (o que fazer primeiro)
- Estimativa de investimento em ads
- Próximos passos recomendados

---

## Regras

- Toda pesquisa deve ser real (usar WebSearch/WebFetch), nunca inventar dados de volume ou concorrência
- Copies e textos seguem `_memoria/preferencias.md` estritamente
- Termos no idioma real de cada mercado (português do Brasil ou inglês), como o público de lá busca — nunca traduzir termo de busca ao pé da letra de um idioma pro outro
- Se o site for bilíngue, cada passo roda por idioma — nunca misturar termos, concorrentes ou schema de um idioma no output do outro
- AEO e GEO são otimizações diferentes (resposta direta do Google vs. citação em IA generativa) — tratar as duas, não só uma
- Quando um dado não puder ser obtido (ex: volume exato), deixar claro que é estimativa e explicar a lógica
- Focar em termos com intenção comercial/transacional pra negócio B2C/B2B local
- Schema markup em formato JSON-LD (padrão Google), validado no Rich Results Test antes de dar como pronto
- Google Ads: nunca inventar CPC ou estimativas de custo sem base real
