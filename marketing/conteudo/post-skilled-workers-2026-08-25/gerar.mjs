// Gera as 8 imagens dos posts de Facebook do ImmigraCan.
// Formato 1080x1350 (4:5), como manda a skill /carrossel.
// As fontes vêm dos arquivos que o próprio site já serve — não dá para puxar
// Google Fonts aqui, o egress do ambiente é bloqueado.
import { chromium } from "/tmp/claude-0/-home-user/73e721fb-595f-53bd-b21b-33743e9b3ef4/scratchpad/node_modules/playwright-core/index.mjs";
import { writeFileSync, readFileSync } from "node:fs";

const MEDIA = "/home/user/qualificacanada/.next/static/media";
const b64 = (f) => readFileSync(`${MEDIA}/${f}`).toString("base64");
const MONT = b64("e8f2fbee2754df70-s.p.1dqa_6e_ad4sj.woff2");
const SANS = b64("47df9ba1c7236d3b-s.p.137759vg1sbmi.woff2");

const SAIDA = "/home/user/mazyos/marketing/conteudo/post-skilled-workers-2026-08-25";

const posts = [
  { n: 1, tema: "escuro", eyebrow: "O que significa",
    titulo: "Skilled worker não é só quem tem diploma.",
    apoio: "Eletricista, encanador, soldador, mecânico. Ontário reconhece mais de 140 ofícios — e a sua qualificação são as horas que você já trabalhou." },
  { n: 2, tema: "numero", eyebrow: "Salário real · Job Bank", numero: "CAD 34", unidade: "/hora",
    titulo: "É a mediana de um eletricista certificado em Ontário.",
    apoio: "A faixa vai de CAD 20,00 a CAD 50,50. Sem a certificação, você entra como helper — e ganha bem menos." },
  { n: 3, tema: "bordo", eyebrow: "Ofício compulsório",
    titulo: "Sem licença, é ilegal.",
    apoio: "Em Ontário, eletricista não pode exercer sem certificação. Não é “mal visto”. É proibido por lei." },
  { n: 4, tema: "claro", eyebrow: "Avaliação documental",
    titulo: "Dá para começar do Brasil.",
    apoio: "O Trade Equivalency Assessment é documental e pode ser submetido de onde você estiver. Só o exame é presencial no Canadá." },
  { n: 5, tema: "escuro", eyebrow: "O processo real",
    titulo: "Levei três negativas antes da licença sair.",
    apoio: "A experiência era real. O problema era como eu apresentava a documentação. Negativa não é o fim do processo." },
  { n: 6, tema: "claro", eyebrow: "Ofício x diploma",
    titulo: "1 a 3 anos para revalidar. Ou um caminho mais curto.",
    apoio: "Médico e engenheiro enfrentam anos de revalidação. Ofício técnico segue outra via: comprovação de experiência e exame." },
  { n: 7, tema: "bordo", eyebrow: "O erro mais caro",
    titulo: "Empregado e dono do próprio negócio comprovam de formas diferentes.",
    apoio: "São dois pacotes de documentação distintos. Usar o modelo errado não gera pedido de complemento — gera negativa." },
  { n: 8, tema: "cta", eyebrow: "Primeiro passo",
    titulo: "Guia gratuito para validar seu ofício em Ontário.",
    apoio: "Em português, do processo real. Como identificar seu ofício no sistema canadense e o que dá para adiantar ainda do Brasil." },
];

const temas = {
  escuro: { fundo: "linear-gradient(158deg,#123E6B 0%,#0C2C4E 100%)", titulo: "#fff", apoio: "#D6E2EF", eyebrow: "#FFD9AD", regua: "#E8710A", marca: "#fff", rodape: "#8FA5BE" },
  bordo:  { fundo: "linear-gradient(158deg,#0C2C4E 0%,#3A0E17 100%)", titulo: "#fff", apoio: "#E4D3D6", eyebrow: "#FF9AA6", regua: "#C8102E", marca: "#fff", rodape: "#A08A8F" },
  numero: { fundo: "linear-gradient(158deg,#123E6B 0%,#0C2C4E 100%)", titulo: "#fff", apoio: "#D6E2EF", eyebrow: "#FFD9AD", regua: "#E8710A", marca: "#fff", rodape: "#8FA5BE" },
  claro:  { fundo: "#F5F7FA", titulo: "#123E6B", apoio: "#52606D", eyebrow: "#C05600", regua: "#E8710A", marca: "#123E6B", rodape: "#8494A5" },
  cta:    { fundo: "linear-gradient(158deg,#E8710A 0%,#C05600 100%)", titulo: "#fff", apoio: "#FFE8D2", eyebrow: "#FFF4E8", regua: "#fff", marca: "#fff", rodape: "#FFD9AD" },
};

const html = (p) => {
  const t = temas[p.tema];
  const blocoNumero = p.numero ? `
      <div class="numero"><span>${p.numero}</span><span class="un">${p.unidade}</span></div>` : "";
  const tamTitulo = p.numero ? 46 : (p.titulo.length > 55 ? 66 : 82);
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@font-face{font-family:Mont;src:url(data:font/woff2;base64,${MONT}) format('woff2');font-weight:100 900;font-display:block}
@font-face{font-family:Sans;src:url(data:font/woff2;base64,${SANS}) format('woff2');font-weight:100 900;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:${t.fundo};font-family:Sans,sans-serif;
     display:flex;flex-direction:column;justify-content:space-between;padding:86px 82px}
.topo{display:flex;justify-content:space-between;align-items:center}
.marca{font-family:Mont;font-weight:800;font-size:25px;letter-spacing:.06em;color:${t.marca};display:flex;align-items:center;gap:12px}
.folha{font-size:31px;line-height:1}
.contador{font-size:16px;font-weight:600;letter-spacing:.18em;color:${t.rodape}}
.eyebrow{font-family:Sans;font-size:18px;font-weight:700;text-transform:uppercase;
         letter-spacing:.26em;color:${t.eyebrow};margin-bottom:26px}
.regua{width:76px;height:4px;background:${t.regua};margin-bottom:34px;border-radius:2px}
.numero{font-family:Mont;font-weight:900;font-size:162px;line-height:.95;color:#fff;
        letter-spacing:-.045em;margin-bottom:40px;display:flex;align-items:baseline;gap:20px}
.numero .un{font-size:54px;font-weight:600;letter-spacing:0;margin-left:0}
h1{font-family:Mont;font-weight:800;font-size:${tamTitulo}px;line-height:1.02;
   letter-spacing:-.035em;color:${t.titulo};margin-bottom:30px}
.apoio{font-size:27px;font-weight:400;line-height:1.55;color:${t.apoio};max-width:830px}
.rodape{display:flex;justify-content:space-between;align-items:flex-end}
.site{font-family:Mont;font-weight:700;font-size:23px;color:${t.marca};letter-spacing:.01em}
.autor{font-size:17px;color:${t.rodape};text-align:right;line-height:1.5}
</style></head><body>
  <div class="topo">
    <div class="marca"><span class="folha">🍁</span>QUALIFICA CANADÁ</div>
    <div class="contador">${String(p.n).padStart(2,"0")} / 08</div>
  </div>
  <div class="meio">
    <div class="eyebrow">${p.eyebrow}</div>
    <div class="regua"></div>${blocoNumero}
    <h1>${p.titulo}</h1>
    <p class="apoio">${p.apoio}</p>
  </div>
  <div class="rodape">
    <div class="site">qualificacanada.com</div>
    <div class="autor">Renan Sersun Calefi<br>Eletricista licenciado 309A · Ontário</div>
  </div>
</body></html>`;
};

const navegador = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const pagina = await navegador.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
for (const p of posts) {
  const arquivo = `${SAIDA}/post-${String(p.n).padStart(2,"0")}.html`;
  writeFileSync(arquivo, html(p));
  await pagina.goto(`file://${arquivo}`);
  await pagina.waitForTimeout(250);
  await pagina.screenshot({ path: `${SAIDA}/post-${String(p.n).padStart(2,"0")}.png` });
  console.log(`post-${String(p.n).padStart(2,"0")}.png`);
}
await navegador.close();
