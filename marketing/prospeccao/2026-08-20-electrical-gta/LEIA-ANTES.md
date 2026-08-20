# Lote incompleto — só sourcing bruto

Gerado em 2026-08-20 numa sessão remota cujo ambiente **bloqueia egress
para sites externos**. O WebSearch funcionou; WebFetch e curl foram
negados pelo gateway (403 no CONNECT, inclusive para `example.com`).

## O que este arquivo é

`candidatos-seed.csv` é uma lista de partida montada **só com resultado de
busca**. Nada aqui foi verificado abrindo o site.

## O que este arquivo NÃO é

Não é `prospects.csv`. Não está pronto para enviar email.

As colunas `email` e `onde_o_email_estava` estão **vazias de propósito**.
Sob a CASL o ônus da prova de consentimento é do remetente, e a origem do
endereço só vale se tiver sido vista na visita real ao site. Preencher
essas colunas a partir de resultado de busca invalida a trilha.

A coluna `ecra_esa_visto_na_busca` traz número que apareceu em resultado de
busca. Serve só para dizer que a empresa é licenciada — **nunca** para
marcar o ponto 1 da varredura como ok ou ausente. Isso exige abrir rodapé,
contato e sobre.

## Como completar

Rodar `/prospectar` numa máquina com acesso normal à internet, usando este
CSV como ponto de partida. A skill refaz o Passo 1 de verdade (visita,
email publicado, caminho exato) e segue para a varredura dos 14 pontos.
