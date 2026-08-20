---
name: prospectar
description: >
  Prospecção fria de contractors com auditoria SEO/AEO como isca. Encontra empresas de um nicho
  e região, varre o site de cada uma em 14 pontos, escolhe as 3 falhas mais vendáveis e escreve
  um email frio em inglês com trilha de conformidade CASL. Padrão do projeto: electrical, HVAC
  e plumbing na Grande Toronto (GTA). Use quando o usuário pedir "prospectar", "buscar clientes",
  "lote de prospecção", "cold email", "achar contractor", ou /prospectar.
---

# /prospectar — Prospecção com auditoria como isca

Junta a auditoria de SEO/AEO com a abordagem fria numa coisa só. A mesma visita ao site do
prospect produz **o achado que vende** e **a base legal que permite mandar o email** — porque o
endereço vem publicado no site dele, não de lista comprada.

O produto dessa skill não é a venda. É um email que merece resposta.

## Dependências

- **Contexto e credencial:** `_memoria/empresa.md` — a credencial Red Seal abre todo email
- **Tom de voz:** `_memoria/preferencias.md`
- **Ferramentas:** WebSearch (sourcing), WebFetch (varredura)
- **Outputs vão em:** `marketing/prospeccao/<YYYY-MM-DD>-<nicho>-<regiao>/`
- **Lista de supressão global:** `marketing/prospeccao/supressao.csv` — nunca por lote

## Padrão do projeto

| Item | Padrão |
|---|---|
| Região | Grande Toronto (GTA) — Toronto, Mississauga, Brampton, Vaughan, Markham, Oakville, Richmond Hill, Scarborough |
| Nichos | Electrical, HVAC, plumbing contractors |
| Idioma do email | Inglês |
| Lote | 10–15 prospects |
| Oferta de entrada | Auditoria de 14 pontos em PDF, gratuita, entregue por resposta |
| Produto vendido | Auditoria completa (`/seo`), CAD $900–$2.000 |

Adaptar só quando o usuário pedir outro nicho ou região.

---

## Passo 0 — CASL antes de qualquer coisa

Email comercial para endereço canadense cai na CASL. Não existe isenção B2B. Multa de até
CAD $1 milhão para pessoa física, com responsabilidade pessoal.

A base usada aqui é **consentimento implícito por publicação conspícua**, válida só quando as
três condições valem juntas:

1. O endereço foi publicado publicamente **pela própria empresa**, no site dela
2. A mensagem é relevante ao papel da pessoa — falar do site dela com o dono é
3. A empresa não declarou "não me contate"

**Proibido nessa skill:**

- Email raspado do LinkedIn — os termos do LinkedIn proíbem scraping, então não conta como
  publicação conspícua
- Lista comprada, base de terceiro, diretório agregador
- Endereço pessoal que não esteja publicado no site da empresa
- Qualquer contato que apareça em `supressao.csv`

**Obrigatório em toda mensagem:** identificação do remetente, contato real e mecanismo de
descadastro funcional, honrado em até 10 dias úteis e ativo por no mínimo 60 dias.

O ônus da prova de consentimento é do remetente. Por isso o CSV do Passo 1 registra a origem
de cada endereço — sem essa coluna, o lote não sai.

---

## Passo 1 — Sourcing com trilha de consentimento

1. Perguntar nicho e cidade se o usuário não passou. Default: o padrão do projeto acima.
2. WebSearch por combinações de nicho + cidade ("electrical contractor Mississauga",
   "HVAC company Vaughan", "licensed plumber Markham").
3. Para cada empresa, abrir o site com WebFetch e capturar da **página de contato ou rodapé**:
   nome da empresa, URL, email publicado, caminho exato onde o email estava, nome do dono se
   listado, telefone, cidade.
4. Descartar na hora: quem não publica email no próprio site, quem tem site em domínio de
   terceiro (perfil de agregador, Facebook como site), franquia grande com marketing central,
   e quem já está em `supressao.csv`.

**Output:** `prospects.csv`

```csv
empresa,site,email,onde_o_email_estava,data_captura,cidade,nicho,nome_contato,status
Bright Spark Electric,brightspark.ca,info@brightspark.ca,/contact-us,2026-08-20,Mississauga,electrical,James,novo
```

A coluna `onde_o_email_estava` é a defesa sob CASL. Nunca deixar em branco, nunca preencher de
memória — só com o caminho real visto na visita.

---

## Passo 2 — Varredura de 14 pontos

Para cada prospect: WebFetch na home, na página de serviços e na de contato. Checar:

**Licença e confiança (o bloco que mais vende para contractor)**

1. **Número de licença visível.** Em Ontário, todo Licensed Electrical Contractor precisa
   exibir o número no formato `ECRA/ESA 7999999` em toda publicidade — e a ESA fiscaliza
   anúncios online. HVAC que mexe com gás precisa de registro TSSA; plumbing precisa de
   licença e o nome do licenciado deve aparecer na publicidade. Checar rodapé, contato e
   sobre **antes** de marcar como ausente.
2. Página "sobre" com pessoa real nomeada, não só "we have 20 years of experience"
3. Endereço e telefone reais e consistentes com o Google Business Profile (NAP)

**Local SEO**

4. Schema `LocalBusiness` (ou `Electrician` / `HVACBusiness` / `Plumber`) em JSON-LD
5. `areaServed` declarado com as cidades atendidas
6. Página dedicada por cidade atendida, ou pelo menos as cidades citadas em texto
7. Telefone clicável (`tel:`) e visível sem rolar no mobile

**On-page**

8. Title único por página e com a cidade
9. Meta description presente e não duplicada entre páginas
10. H1 presente e único
11. Alt text descritivo nas imagens de trabalho

**AEO/GEO**

12. Conteúdo em formato answer-first ou seção de FAQ — algo que uma IA consiga citar
13. Schema `FAQPage` implementado

**Técnico**

14. HTTPS com redirect correto, sem soft-404, viewport mobile presente

**Output por prospect:** `varreduras/<slug>.md` com os 14 pontos marcados
(ok / parcial / ausente / não verificável) e uma linha de evidência em cada um.

---

## Passo 3 — Escolher as 3 falhas

O critério **não** é gravidade técnica. É este, nesta ordem:

1. **Verificável em 30 segundos** pelo próprio dono, sem ferramenta nenhuma
2. **Ligada a dinheiro** — a chamada que ele não recebeu, não a métrica que caiu
3. **Corrigível** — a conversa tem que terminar em orçamento, não em desespero

Traduzir sempre. O dono não liga para "TBT de 1.380ms"; liga para "seu site não diz ao Google
quais cidades você atende, então você não aparece quando alguém em Oakville procura eletricista".

**Tabela de tradução:**

| Achado técnico | Como escrever no email |
|---|---|
| Sem `areaServed` / sem schema local | "Your site never tells Google which cities you serve" |
| Meta description duplicada | "Eleven of your pages share the same description tag — Google picks one and ignores the rest" |
| Sem FAQ / sem conteúdo citável | "ChatGPT and Google's AI answers have nothing from your site to quote" |
| Licença ausente do site | "Your ECRA/ESA number isn't anywhere on the site" |
| NAP divergente do GBP | "Your phone number on the site doesn't match your Google listing" |
| Sem página por cidade | "You rank in Brampton and nowhere else you actually drive to" |

**Regra dura sobre licença:** só citar como ausente depois de checar rodapé, contato e sobre.
Acusar um contractor licenciado de não exibir licença destrói a conversa antes de começar. Se
houver qualquer dúvida, não usar esse achado.

---

## Passo 4 — Escrever o email

Máximo 150 palavras. Inglês. Sem anexo no primeiro contato — anexo derruba entregabilidade.

**Estrutura:** credencial em uma linha → por que olhou o site dele → 3 achados → dimensão do
conserto → CTA leve → bloco CASL.

```
Subject: 3 issues I found on brightsparkelectric.ca

Hi James,

I'm a Red Seal electrician here in the GTA, and I build websites for
trades on the side. I was going through contractor sites in Mississauga
and looked at yours.

Three things I found:

1. Your site never tells Google which cities you serve. There's no
   service-area markup on any page, so when someone in Oakville searches
   "electrician near me," you're not in the running.

2. Eleven of your pages share the exact same description tag. Google
   picks one and mostly ignores the rest.

3. There's no FAQ content anywhere, so ChatGPT and Google's AI answers
   have nothing from your site to quote. That's where a growing share of
   "who do I call" searches now ends.

None of this is a rebuild. It's a few hours of work.

I ran a 14-point check on the whole site. Reply and I'll send the PDF —
no charge, no pitch attached.

Renan Sersun Calefi
[negócio] · [cidade, ON]
[telefone] · [email]

Don't want to hear from me again? Reply "stop" and I'll remove you —
you won't get another message from me.
```

**Por que a primeira linha é essa:** Red Seal é credencial interprovincial que o dono do outro
lado conhece, respeita e sabe o que custou. Ele não está lendo uma agência — está lendo um par
licenciado. Nenhum concorrente consegue copiar isso.

Nunca inflar a credencial. O que está em `_memoria/empresa.md` é o teto.

**Output por prospect:** `emails/<slug>.md` com assunto e corpo prontos para copiar.

---

## Passo 5 — O PDF de 14 pontos

Quando o prospect responder, gerar o relatório a partir de `varreduras/<slug>.md`: os 14 pontos,
o que está ok, o que não está, e o que cada correção resolve. Converter em PDF com a skill `pdf`.

É isca, não entrega. Diagnóstico honesto e específico, sem plano de execução detalhado — o plano
é a auditoria completa de $900–$2.000, que roda com `/seo`.

Terminar o PDF com uma frase só sobre o próximo passo. Sem página de vendas.

---

## Passo 6 — Follow-up e registro

- **Um** follow-up, 4–5 dias depois. Duas linhas, sem repetir o pitch. Depois, para.
- Atualizar `status` no CSV: novo / enviado / follow-up / respondeu / descadastrou / cliente
- Quem pedir para sair vai para `marketing/prospeccao/supressao.csv` na hora e nunca mais entra
  em lote nenhum — em até 10 dias úteis, e a lista é permanente
- **Volume:** 10–15 emails por dia, de domínio aquecido. Disparar 50 de domínio novo derruba a
  entregabilidade e joga no spam até email de cliente real

---

## Regras

- Nunca inventar achado. Se o WebFetch não conseguiu ler a página, marcar "não verificável" e
  escolher outro dos 14 pontos — email frio com erro técnico queima o remetente para sempre
- Nunca mandar sem a coluna `onde_o_email_estava` preenchida
- Nunca usar email de LinkedIn, lista comprada ou diretório agregador
- Nunca acusar de falta de licença sem checar rodapé, contato e sobre
- Nunca prometer posição no Google, número de leads ou prazo de resultado
- Nunca anexar arquivo no primeiro email
- Nunca insistir depois do primeiro follow-up
- O email é rascunho: mostrar para o usuário e só enviar depois que ele aprovar. A skill não
  dispara email sozinha
