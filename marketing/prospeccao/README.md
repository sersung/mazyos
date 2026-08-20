# marketing/prospeccao/

Saída da skill `/prospectar`. Cada lote vira uma pasta
`<YYYY-MM-DD>-<nicho>-<regiao>/` com:

```text
prospects.csv          # registro + trilha de consentimento CASL
varreduras/<slug>.md   # auditoria de 14 pontos por prospect
emails/<slug>.md       # email pronto para revisar e enviar
```

## supressao.csv

Lista **global e permanente**. Quem pede para sair entra aqui e nunca mais
aparece em lote nenhum. Sob a CASL o pedido precisa ser honrado em até 10
dias úteis. Não apagar linha dessa lista.
