# PlateBalance

> Projeto criado em 09/09/2026. Pasta dedicada — instruções aqui sobrescrevem as
> da raiz quando relevantes.

## Sobre

Site de nutrição prática em inglês (platebalance.com), mercado Canadá/EUA.
Modelo 100% gratuito: ferramentas interativas + conteúdo SEO, monetizado por
AdSense e afiliados. Objetivo da fase 1 é tráfego orgânico e lista de e-mail —
sem produto pago até validar retenção.

## Tipo

Iniciativa pessoal (ativo próprio, não cliente).

## Entregas previstas

- [x] Site Astro estático (repositório `sersung/Platebalance`)
- [x] 3 ferramentas: Plate Builder, calculadora de proteína, custo por refeição
- [x] 13 guias pilares cobrindo os clusters de SEO
- [x] Identidade visual (ver `design-guide.md` nesta pasta)
- [x] Deploy na VPS Hostinger (Nginx + script de release)
- [ ] AdSense aprovado e ativo
- [ ] Newsletter conectada (Listmonk na VPS ou ConvertKit)
- [ ] Search Console + Bing Webmaster
- [ ] Primeiros 30 artigos (13 feitos, 17 na fila em `seo/estrategia-conteudo.md`)

## Onde salvar o que

- Briefing e contexto: nessa pasta
- Pesquisa e plano de SEO: `seo/`
- Código do site: repositório separado `sersung/Platebalance`, não aqui

## Contexto que herda da raiz

Tom de voz, marca e contexto do negócio vêm de `_memoria/` e `identidade/` da
raiz. Não duplicar aqui.

## Específico desse projeto

**Idioma:** o site é 100% em inglês (EN-CA). Conteúdo, meta tags e schema em
inglês; conversa e documentação interna em português. Não misturar — termo de
busca em português tem volume, concorrente e intenção diferentes, e o site não
tem versão PT.

**Identidade visual própria:** PlateBalance tem paleta e tipografia próprias
(`design-guide.md` nesta pasta), diferentes da marca pessoal do Renan. Skills de
carrossel e post que forem gerar peça pro PlateBalance devem ler esse arquivo, e
não `identidade/design-guide.md` da raiz.

**Nicho YMYL:** conteúdo de saúde. Nunca afirmar que um alimento previne, trata
ou cura doença. Toda página que dá número (calorias, proteína) precisa apontar
pro disclaimer médico. Isso não é cautela jurídica decorativa — é o critério que
o Google usa pra derrubar site de nutrição.

**Preço envelhece:** os valores em CAD do site são estimativa de 2026 e viram
mentira em 12 meses. Revisar `src/data/foods.ts` anualmente.
