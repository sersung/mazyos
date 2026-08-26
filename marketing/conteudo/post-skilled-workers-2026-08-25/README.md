# Imagens dos posts — ImmigraCan → QualificaCanadá

**Formato:** 1080x1350 (4:5), como manda a skill `/carrossel`. É o que ocupa mais
tela no feed do Facebook no celular.

**Texto dos posts:** `saidas/facebook-immigracan-skilled-workers.md`

## Pareamento

| Imagem | Post | Tema visual |
|---|---|---|
| `post-01.png` | O que "skilled worker" significa | Azul |
| `post-02.png` | Quanto ganha (CAD 34/h) | Azul, número grande |
| `post-03.png` | Ofício compulsório | Bordô |
| `post-04.png` | Dá para começar do Brasil | Claro |
| `post-05.png` | As três negativas | Azul |
| `post-06.png` | Ofício x diploma | Claro |
| `post-07.png` | O erro mais caro | Bordô |
| `post-08.png` | Guia gratuito | Âmbar (CTA) |

Os temas alternam de propósito: postados em sequência, o feed não fica monótono.

## Identidade

Paleta e tipografia do QualificaCanadá, que é a mesma identidade ImmigraCan usada
no site: azul #123E6B, bordô #C8102E, âmbar #E8710A, névoa #F5F7FA. Títulos em
Montserrat 800 com kerning fechado, corpo em Source Sans 3.

As fontes foram embutidas a partir dos arquivos que o próprio site já serve
(`.next/static/media`), porque o ambiente bloqueia acesso ao Google Fonts. Se for
regenerar em outra máquina com internet, dá para trocar por `<link>` normal.

## Regenerar

```
node gerar.mjs
```

Precisa de `playwright-core` e do Chromium. O caminho do binário está no topo do
script — ajuste se mudar de máquina. Os HTMLs ficam salvos ao lado dos PNGs, então
dá para editar o texto direto neles e só rodar o screenshot de novo.

## Antes de postar

- Confira o texto no arquivo de posts: a imagem é o gancho, o texto é o conteúdo.
- No post 02, os salários são do Job Bank e foram levantados em agosto de 2026.
  Se reaproveitar meses depois, confira a fonte antes.
