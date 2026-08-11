---
name: video-financas
description: >
  Produz vídeos curtos (60-90s) de educação financeira em stick figures, narrados,
  formato vertical para Shorts/Reels/TikTok. Escreve o roteiro, gera as imagens e a
  narração, monta o vídeo com legenda queimada e roda o controle de qualidade.
  Idioma base inglês, com tradução barata para outros idiomas.
  Use quando o usuário pedir "vídeo de finanças", "novo episódio", "vídeo sobre
  [tema financeiro]", "traduzir episódio", "short de finanças", ou /video-financas.
---

# /video-financas — Vídeos de educação financeira

Skill de produção da série **Finance From Zero**. Pega um tema → entrega um MP4
vertical pronto pra publicar, com legenda queimada e QC aprovado.

## Dependências

- **Repositório do pipeline:** `automacao-videos/` (irmão do MazyOS). Se não
  estiver clonado ao lado, pedir o caminho ao usuário.
- **Tom de voz:** `_memoria/preferencias.md`
- **Contexto do negócio:** `_memoria/empresa.md`
- **Regras do projeto:** `automacao-videos/CLAUDE.md` — ler antes de escrever roteiro
- **Estilo visual:** `automacao-videos/templates/estilo-visual.md`
- **Chaves de API:** `automacao-videos/.env` (Gemini + ElevenLabs)
- **ffmpeg** no PATH

---

## Modos

Ao receber o pedido, identificar qual é:

1. **Episódio novo** — tem um tema, não tem roteiro → fluxo completo abaixo
2. **Tradução** — episódio já existe em inglês → pular para [Tradução](#tradução)
3. **Refação** — o vídeo existe mas algo ficou ruim → pular para [Refação](#refação)

Se o tema não estiver claro, perguntar:
> "Qual conceito financeiro esse episódio ensina? Um só."

---

## Fluxo do episódio novo

### 1. Definir o conceito e a metáfora

Antes de escrever qualquer fala, fechar duas coisas:

- **Conceito:** a UMA ideia, em uma frase. Se não couber, são dois episódios —
  avisar o usuário e propor a divisão.
- **Metáfora:** o objeto ou situação concreta que stick figures conseguem encenar.

A metáfora é o passo que decide a qualidade do vídeo. Juros compostos → bola de
neve. Inflação → régua encolhendo. Diversificação → ovos em cestas. Risco →
corda bamba. Sem metáfora boa, as cenas viram ilustração genérica e o vídeo não
ensina nada.

Mostrar as duas ao usuário antes de escrever o roteiro. É barato mudar aqui.

### 2. Escrever o roteiro

Escrever em **inglês**, seguindo o tom de `_memoria/preferencias.md` traduzido
para o inglês: direto, concreto, instrucional, sem jargão de guru, sem "hey guys",
sem promessa de retorno.

Estrutura:

- **Hook (cena 1)** — tensão ou lacuna imediata. Nunca apresentação. Máx ~180
  caracteres.
- **Corpo (cenas 2 a n-2)** — o conceito construído sobre a metáfora, um passo
  por cena.
- **Fechamento (2 últimas cenas)** — a ideia em uma frase + CTA leve.

Restrições duras:

- 8 a 16 cenas, 55 a 95 segundos no total (~15 caracteres por segundo)
- Máx ~200 caracteres de narração por cena
- **Nenhum prompt visual pode pedir texto, número, placa ou rótulo na imagem.**
  É isso que faz cada idioma novo custar quase zero. Comunicar por composição —
  ver `templates/estilo-visual.md` do repo do pipeline.
- Nada de recomendação de investimento. Ensinar o conceito, nunca indicar a ação.
- Disclaimer obrigatório.

Salvar em `automacao-videos/roteiros/ep<NNN>-<slug>.json`, validado contra
`templates/roteiro.schema.json`.

### 3. Rodar o pipeline

```bash
cd automacao-videos
python pipeline/qc.py roteiros/ep<NNN>-<slug>.json --fase roteiro
```

**Se reprovar, corrigir o roteiro antes de gastar API.** Reprovar roteiro custa
zero; reprovar depois das imagens custa dinheiro.

Passando:

```bash
python pipeline/rodar.py roteiros/ep<NNN>-<slug>.json
```

### 4. Revisão humana

O QC automático pega estrutura, duração, loudness e conformidade. Não pega
consistência de traço, sincronia nem tédio. Ao terminar, pedir ao usuário:

> "Vídeo pronto em `videos/<id>/en/final.mp4`. Antes de publicar, confere três
> coisas que o QC não vê: (1) o personagem está consistente entre as cenas?
> (2) alguma imagem tem texto? (3) você assiste inteiro sem pular?"

Listar também qualquer AVISO do QC.

---

## Tradução

Imagens são reaproveitadas — só narração e legenda mudam. Custo próximo de zero.

1. Copiar o roteiro mantendo **o mesmo `id`** e as **mesmas cenas** (mesmos ids,
   mesmos prompts visuais). Traduzir só `narracao`, `titulo`, `cta`, `disclaimer`.
2. Salvar como `roteiros/ep<NNN>-<slug>.<lang>.json` com `lang` atualizado.
3. Rodar reaproveitando as imagens:

```bash
python pipeline/rodar.py roteiros/ep<NNN>-<slug>.<lang>.json --lang <lang> --pular-imagens
```

Traduzir o **sentido**, não as palavras. Uma metáfora que funciona em inglês pode
não funcionar em português — se não funcionar, adaptar a narração (as imagens
continuam servindo, porque são metáfora visual pura).

Atenção à duração: português costuma ficar ~20% mais longo que inglês. Se o QC
reprovar por duração, enxugar a narração — não acelerar a voz.

---

## Refação

| Problema | Comando |
|---|---|
| Uma imagem ruim | `python pipeline/gerar_imagens.py <roteiro> --cenas s03` |
| Narração de uma cena | `python pipeline/gerar_audio.py <roteiro> --cenas s03` |
| Estilo visual inteiro | editar `templates/estilo-visual.md`, depois `--forcar` |
| Só remontar | `python pipeline/montar_video.py <roteiro>` |

Depois de qualquer refação, remontar e rodar `qc.py --fase final`.

**Mudança de estilo visual quebra a consistência com os episódios publicados.**
Se o usuário pedir, avisar e sugerir começar uma temporada nova em vez de
quebrar a atual.

---

## Numeração de episódios

Olhar `automacao-videos/roteiros/` e usar o próximo número livre. Formato
`ep<NNN>` com três dígitos, slug em kebab-case derivado do conceito em inglês.

## Ao terminar

Se for o primeiro episódio de uma leva, ou se algo mudou no processo, perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Temas já usados valem registro em `_memoria/estrategia.md` para não repetir.
