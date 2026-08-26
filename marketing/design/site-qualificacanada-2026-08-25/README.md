# Redesign da home — qualificacanada.com

**Canvas:** https://claude.ai/code/artifact/1dafc0e5-5475-43ab-9236-91051efd59ed
**Data:** 2026-08-25

Estes são os arquivos-fonte. O HTML publicado é montado a partir deles e não
fica no git — são 2,5 MB, quase tudo código do editor, e sai de um comando.

## Artboards

| Arquivo | O que é |
|---|---|
| `Main.dc.html` | Recomendação (direção A) em alta fidelidade, desktop 1440 |
| `MainMobile.dc.html` | A mesma direção em 390, corrigindo o header quebrado |
| `DirecaoA.dc.html` | A · Ofício documentado — institucional, sóbrio, prova numérica |
| `DirecaoB.dc.html` | B · Canteiro premium — escuro, industrial, foto de alto contraste |
| `DirecaoC.dc.html` | C · Guia de bolso — claro, quente, as 4 etapas como estrutura |
| `canvas.json` | Posições, títulos e as anotações com os bugs encontrados |

## Base

Paleta e tipografia vieram do código do site, não de estimativa:
`#123E6B` azul · `#0C2C4E` azul escuro · `#C8102E` bordô · `#E8710A` âmbar ·
`#C05600` CTA · `#1F2933` grafite · `#52606D` ardósia · `#F5F7FA` névoa ·
`#D9E2EC` borda. Montserrat (títulos), Lora (corpo editorial), Source Sans 3 (UI).

## Bugs do site atual que motivaram o redesenho

1. Os losangos do hero se sobrepõem e cortam texto — "PRODUTO 5" vira "ODUTO 5".
2. No mobile o logo quebra em duas linhas e colide com o CTA; a home não tem menu
   (o header dela é um bloco separado do `components/Header.tsx` do resto do site).
3. "Autor licenciado 309A **in** Ontário" — sobrou um "in" em inglês.

Os três estão anotados como sticky notes no canvas.

## Pendências

- **Foto do autor**: está como placeholder marcado. Foto real muda muito o hero.
- **Estático x clicável**: os artboards são mockups. Se a direção escolhida virar
  protótipo navegável até o checkout, é outra rodada.

## Regenerar o canvas

```
node "<base do skill design>/seed-canvas.mjs" \
  --template "<base do skill design>/payload.template.html" \
  --out redesign-qualifica-canada.html \
  --title "Redesign Qualifica Canadá" \
  --artboard Main.dc.html --artboard MainMobile.dc.html \
  --artboard DirecaoA.dc.html --artboard DirecaoB.dc.html --artboard DirecaoC.dc.html \
  --canvas canvas.json
```

Depois republique no mesmo endereço do canvas.
