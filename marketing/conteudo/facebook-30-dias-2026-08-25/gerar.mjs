// Gera as 30 imagens a partir de posts.mjs, para o texto e a arte nunca
// saírem de sincronia. 1080x1350 (4:5), identidade do QualificaCanadá.
// As fontes vêm dos arquivos que o próprio site serve — o ambiente bloqueia
// o Google Fonts.
import { chromium } from "/tmp/claude-0/-home-user/73e721fb-595f-53bd-b21b-33743e9b3ef4/scratchpad/node_modules/playwright-core/index.mjs";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { posts } from "./posts.mjs";

const MEDIA = "/home/user/qualificacanada/.next/static/media";
const b64 = (f) => readFileSync(`${MEDIA}/${f}`).toString("base64");
const MONT = b64("e8f2fbee2754df70-s.p.1dqa_6e_ad4sj.woff2");
const SANS = b64("47df9ba1c7236d3b-s.p.137759vg1sbmi.woff2");

const SAIDA = new URL("./imagens/", import.meta.url).pathname;
mkdirSync(SAIDA, { recursive: true });

const temas = {
  escuro: { fundo: "linear-gradient(158deg,#123E6B 0%,#0C2C4E 100%)", titulo: "#fff", apoio: "#D6E2EF", eyebrow: "#FFD9AD", regua: "#E8710A", marca: "#fff", rodape: "#8FA5BE", folha: "#C8102E" },
  bordo:  { fundo: "linear-gradient(158deg,#0C2C4E 0%,#3A0E17 100%)", titulo: "#fff", apoio: "#E4D3D6", eyebrow: "#FF9AA6", regua: "#C8102E", marca: "#fff", rodape: "#A08A8F", folha: "#C8102E" },
  numero: { fundo: "linear-gradient(158deg,#123E6B 0%,#0C2C4E 100%)", titulo: "#fff", apoio: "#D6E2EF", eyebrow: "#FFD9AD", regua: "#E8710A", marca: "#fff", rodape: "#8FA5BE", folha: "#C8102E" },
  claro:  { fundo: "#F5F7FA", titulo: "#123E6B", apoio: "#52606D", eyebrow: "#C05600", regua: "#E8710A", marca: "#123E6B", rodape: "#8494A5", folha: "#C8102E" },
  cta:    { fundo: "linear-gradient(158deg,#E8710A 0%,#C05600 100%)", titulo: "#fff", apoio: "#FFE8D2", eyebrow: "#FFF4E8", regua: "#fff", marca: "#fff", rodape: "#FFD9AD", folha: "#fff" },
};

const FOLHA = `<svg width="30" height="30" viewBox="0 0 32 32" style="flex-shrink:0"><path fill="currentColor" d="M16 29v-4.4l-5.9 1 .8-2.5-6.9-5.6 1.5-.7-1.1-4 4.4.9 1.1-1.9 3.8 4.1-1.4-7.6 2.2 1.2L16 3l1.5 5.5 2.2-1.2-1.4 7.6 3.8-4.1 1.1 1.9 4.4-.9-1.1 4 1.5.7-6.9 5.6.8 2.5-5.9-1V29z"/></svg>`;

const esc = (t) => String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

const html = (p) => {
  const t = temas[p.tema];
  const blocoNumero = p.numero
    ? `<div class="numero"><span>${esc(p.numero)}</span><span class="un">${esc(p.unidade)}</span></div>`
    : "";
  // Título encolhe conforme o comprimento; com número no topo, encolhe mais.
  const L = p.titulo.length;
  const tamTitulo = p.numero ? (L > 46 ? 42 : 48) : (L > 62 ? 60 : (L > 44 ? 70 : 82));
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@font-face{font-family:Mont;src:url(data:font/woff2;base64,${MONT}) format('woff2');font-weight:100 900;font-display:block}
@font-face{font-family:Sans;src:url(data:font/woff2;base64,${SANS}) format('woff2');font-weight:100 900;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:${t.fundo};font-family:Sans,sans-serif;
     display:flex;flex-direction:column;justify-content:space-between;padding:80px 78px}
.topo{display:flex;justify-content:space-between;align-items:center}
.marca{font-family:Mont;font-weight:800;font-size:24px;letter-spacing:.06em;color:${t.marca};
       display:flex;align-items:center;gap:12px}
.marca .f{color:${t.folha};display:flex}
.contador{font-size:16px;font-weight:600;letter-spacing:.18em;color:${t.rodape}}
.eyebrow{font-size:18px;font-weight:700;text-transform:uppercase;letter-spacing:.24em;
         color:${t.eyebrow};margin-bottom:24px}
.regua{width:76px;height:4px;background:${t.regua};margin-bottom:32px;border-radius:2px}
.numero{font-family:Mont;font-weight:900;font-size:150px;line-height:.95;color:${t.titulo};
        letter-spacing:-.045em;margin-bottom:34px;display:flex;align-items:baseline;gap:20px}
.numero .un{font-size:50px;font-weight:600;letter-spacing:0}
h1{font-family:Mont;font-weight:800;font-size:${tamTitulo}px;line-height:1.04;
   letter-spacing:-.035em;color:${t.titulo};margin-bottom:28px;text-wrap:pretty}
.apoio{font-size:26px;font-weight:400;line-height:1.55;color:${t.apoio};max-width:840px;text-wrap:pretty}
.rodape{display:flex;justify-content:space-between;align-items:flex-end;gap:20px}
.site{font-family:Mont;font-weight:700;font-size:22px;color:${t.marca}}
.autor{font-size:16px;color:${t.rodape};text-align:right;line-height:1.5}
</style></head><body>
  <div class="topo">
    <div class="marca"><span class="f">${FOLHA}</span>QUALIFICA CANADÁ</div>
    <div class="contador">${String(p.n).padStart(2,"0")} / 30</div>
  </div>
  <div class="meio">
    <div class="eyebrow">${esc(p.eyebrow)}</div>
    <div class="regua"></div>
    ${blocoNumero}
    <h1>${esc(p.titulo)}</h1>
    <p class="apoio">${esc(p.apoio)}</p>
  </div>
  <div class="rodape">
    <div class="site">qualificacanada.com</div>
    <div class="autor">Renan Sersun Calefi<br>Eletricista licenciado 309A · Ontário</div>
  </div>
</body></html>`;
};

const navegador = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const pagina = await navegador.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
const estouros = [];
for (const p of posts) {
  const id = String(p.n).padStart(2, "0");
  const arq = `${SAIDA}dia-${id}.html`;
  writeFileSync(arq, html(p));
  await pagina.goto(`file://${arq}`);
  await pagina.waitForTimeout(160);
  // O conteúdo não pode passar de 1350px: o print cortaria o rodapé.
  const alturaReal = await pagina.evaluate(() => document.body.scrollHeight);
  if (alturaReal > 1350) estouros.push(`dia-${id}: ${alturaReal}px`);
  await pagina.screenshot({ path: `${SAIDA}dia-${id}.png` });
}
await navegador.close();
console.log(`geradas ${posts.length} imagens`);
console.log(estouros.length ? "ESTOURAM A ALTURA: " + estouros.join(", ") : "nenhuma estoura a altura");
