# PromptHub — como operar o portal no dia a dia

> Manual curto. O detalhe técnico está no `README.md` do repositório `promphub`.

---

## O que roda sozinho

De segunda a sexta, às 06:00 (BRT), o GitHub Actions:

1. varre 4 fontes de notícia (Google Notícias BR e EN, TechCrunch, The Verge)
2. escolhe uma pauta que o site ainda não cobriu
3. escreve o artigo com o Gemini, seguindo o formato de resposta direta
4. registra a fonte original, que sai no rodapé do artigo
5. regenera sitemap e RSS e commita

Se a API falhar, **nada é publicado**. Isso é de propósito: o gerador antigo tinha
um texto reserva fixo, e foi assim que o site acumulou 5 artigos idênticos.

**Único requisito:** o secret `GEMINI_API_KEY` precisa estar válido no repositório.
Chave vencida = portal para de publicar em silêncio. Vale conferir as Actions uma
vez por semana.

---

## O que precisa de mão

### Ligar um programa de afiliado

1. Cadastre-se no programa da ferramenta
2. Abra `src/data/affiliates.json`
3. Cole a URL de rastreio no campo `affiliateUrl` daquela ferramenta
4. Commit e push — o deploy faz o resto

O que acontece sozinho a partir daí: o link passa a apontar para a URL de afiliado,
ganha `rel="sponsored nofollow"` (exigência do Google) e o aviso de comissão aparece
no card. Enquanto `affiliateUrl` for `null`, o link vai para o site oficial sem
rastreio nenhum — ou seja, **nada no site afirma comissão que não existe**.

### Acrescentar uma ferramenta à lista

Mesma lista, campo por campo. Os dois que importam são `verdict` (o que ela
resolve) e `watchOut` (quando não compensa). O `watchOut` não é enfeite: é ele que
separa a página de uma lista de review pago, e é o que faz o leitor voltar.

### Criar uma editoria nova

Acrescente uma entrada em `src/data/taxonomy.json`. Menu, sitemap, prerender e a
página da categoria passam a considerá-la automaticamente. Não precisa mexer em
mais nada.

### Escrever um artigo à mão

Acrescente o objeto em `src/data/posts.json` (só `slug`, `title`, `excerpt`,
`category`, `tags` e `content` são obrigatórios) e rode:

```bash
npm run content:build
```

O script preenche capa, autor, datas, tempo de leitura e destaque, e regenera
sitemap e RSS.

---

## O que NÃO fazer

- **Não editar `posts-index.json` nem `src/data/content/`** — são gerados.
  A fonte é `posts.json`.
- **Não publicar artigo sem fonte quando a pauta veio de uma notícia.** A
  atribuição sai no rodapé e vira `citation` no schema; é o que sustenta o
  argumento de que o portal apura em vez de reescrever.
- **Não tirar o aviso de afiliado.** Além de exigência de publicidade, é sinal de
  confiança que o Google lê.
- **Não deixar duas ferramentas sem `watchOut`.** Lista sem contraindicação lê
  como publieditorial e derruba a taxa de retorno.

---

## Sinais de que algo quebrou

| Sintoma | Provável causa |
| --- | --- |
| Nenhum commit automático há dias | `GEMINI_API_KEY` vencida ou Action desabilitada |
| CI vermelho no push | `npm run content:check` achou post fora do padrão — rode `npm run content:normalize` |
| Artigo novo não aparece no Google | Sitemap não foi ressubmetido, ou faz menos de 48h |
| Página abre em branco | Deploy sem `prerender` — confira se o build rodou `npm run build` inteiro |
