# Identidade visual — PlateBalance

> Marca própria do PlateBalance, separada da marca pessoal do Renan.
> Skills de carrossel, post e apresentação que forem gerar peça pro PlateBalance
> leem ESTE arquivo, não o `identidade/design-guide.md` da raiz.
>
> Fonte da verdade em código: `src/styles/global.css` no repositório do site.

---

## Conceito

Comida de verdade, luz de cozinha de manhã. Verde-horta e creme de aveia como
base, páprica como único ponto quente — a cor que chama pra ação e não aparece
em mais nada. O oposto do azul clínico de app de dieta: ninguém quer que a
própria comida pareça um exame de sangue.

## Cores

| Papel | Hex | Uso |
| --- | --- | --- |
| Fundo principal | `#fbf8f2` | Creme de aveia, fundo de tudo |
| Fundo alternativo | `#f4efe4` | Faixas de seção, rodapé, cabeçalho de tabela |
| Superfície / cards | `#ffffff` | Cards, formulários, resultados |
| Verde da marca | `#2e6b45` | Logo, links, títulos |
| Verde escuro (texto) | `#16301f` | Títulos |
| Verde claro | `#e7f0e7` | Fundo de destaque, tags, bloco de resposta |
| **CTA / destaque** | `#c9561f` | Páprica. Botões primários e avisos. **Só isso.** |
| Texto | `#1c231f` | Corpo |
| Texto suave | `#566259` | Legendas, apoio |
| Borda | `#e5ded0` | Todas as bordas |

### Cores do prato (as quatro do sistema)

Usadas no diagrama do prato, nos gráficos e nos badges de macro — sempre as
mesmas, sempre com o mesmo significado:

| Componente | Hex |
| --- | --- |
| Vegetais | `#4c8b3f` |
| Proteína | `#c4562c` |
| Carboidrato | `#d9a227` |
| Gordura | `#6f8494` |

### Modo escuro

Existe e é obrigatório em qualquer peça nova. Fundo `#121714`, superfície
`#1b221e`, verde clareia pra `#6fb287`, páprica pra `#e8834f`. Nunca definir cor
só dentro do bloco escuro.

## Tipografia

- **Títulos:** Fraunces, peso 600, `letter-spacing: -0.015em`. Serifada com
  personalidade — dá calor editorial sem virar rústico.
- **Corpo, botões, UI:** Inter, 400/500/600/700. Corpo em 17px, entrelinha 1.65.
- **Fallback obrigatório:** `Georgia, serif` para títulos e a pilha do sistema
  para corpo. O site tem que continuar bonito se a fonte não carregar.

## Formas

- Cards: raio 14px, borda de 1px, sombra baixa (nunca sombra pesada)
- Botões: raio 9px, padding `.75rem 1.35rem`, peso 600
- Chips/tags: pílula (999px)
- Sombra: `0 1px 2px rgba(28,35,31,.05), 0 8px 24px -12px rgba(28,35,31,.18)`

## Elemento-chave

**O prato dividido.** Círculo com metade verde, um quarto terracota, um quarto
âmbar, com as frações escritas dentro. É o logo, é a ilustração, é o favicon, é
o que aparece na peça de rede social. Um símbolo, repetido — não uma biblioteca
de ilustração.

## O que NUNCA fazer

- Vermelho vivo, neon, ou gradiente saturado
- Foto genérica de banco de imagem com salada de folha em fundo branco
- Corpo de texto em serifada (Fraunces é só título)
- Mais de uma cor quente na mesma peça — a páprica é a única
- Ícone de "antes e depois", balança, ou fita métrica: o site não é sobre isso
- Emoji nos títulos

## Voz aplicada ao visual

O texto do site é direto e sem enrolação; o visual acompanha. Espaço em branco
generoso, tabela em vez de infográfico quando a informação é numérica, e nenhum
elemento decorativo que não esteja carregando informação.
