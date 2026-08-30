import { writeFileSync } from "node:fs";
import { posts, BASE } from "./posts.mjs";

const id = (n) => String(n).padStart(2, "0");

let md = `# 30 posts de Facebook — ImmigraCan → QualificaCanadá

**Conta:** página do ImmigraCan
**Período:** 30 dias consecutivos, um post por dia
**Imagens:** \`imagens/dia-NN.png\` — 1080x1350, numeradas na mesma ordem
**Link:** vai no PRIMEIRO COMENTÁRIO de cada post, nunca no corpo

> O Facebook entrega menos post que tem link externo no corpo. Publicar o
> texto puro e colar o link no primeiro comentário, logo depois de postar,
> preserva o alcance sem esconder o destino.

> Todo número veio dos artigos publicados no qualificacanada.com, que citam
> Job Bank e Skilled Trades Ontario como fonte. Nada foi inventado.

---

## Calendário

| Dia | Tema | Destino do link |
|---|---|---|
`;

for (const p of posts) {
  md += `| ${id(p.n)} | ${p.titulo.replace(/\|/g, "\\|")} | \`${p.link}\` |\n`;
}

md += `
---

`;

for (const p of posts) {
  md += `## Dia ${id(p.n)}\n\n`;
  md += `**Imagem:** \`imagens/dia-${id(p.n)}.png\`\n\n`;
  md += `**Post:**\n\n`;
  md += p.legenda.split("\n").map((l) => (l.trim() ? l : "")).join("\n") + "\n\n";
  md += `**Primeiro comentário:**\n\n\`\`\`\n${BASE}${p.link}\n\`\`\`\n\n---\n\n`;
}

md += `## Como publicar

1. Sobe a imagem do dia com o texto do post. **Sem link no corpo.**
2. Assim que publicar, comenta no próprio post com a URL do primeiro comentário.
3. Fixa esse comentário (menu do comentário → Fixar), para ele não descer
   quando outras pessoas comentarem.

**Horário:** o público é brasileiro de ofício técnico. Fim de tarde e início
de noite no fuso do Brasil costuma pegar melhor do que horário comercial.

**Se um post render bem:** vale impulsionar esse, e não um novo. O algoritmo
já validou o criativo.

## Ressalva de validade

Os valores de salário (dias 02, 13, 14) e as taxas (dia 08) foram levantados
em agosto de 2026 no Job Bank e na Skilled Trades Ontario. Se for reaproveitar
essa sequência meses depois, confira os números antes — cada artigo linka a
fonte exata.

## Regenerar

Texto e imagem saem do mesmo \`posts.mjs\`. Para mudar qualquer coisa, edite
lá e rode:

\`\`\`
node gerar.mjs           # refaz as 30 imagens
node gerar-legendas.mjs  # refaz este documento
\`\`\`
`;

writeFileSync(new URL("./README.md", import.meta.url).pathname, md);
console.log(`README.md com ${posts.length} posts`);
