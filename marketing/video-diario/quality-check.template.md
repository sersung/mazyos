# Quality check — preenchimento obrigatório

Marcar `yes` somente depois da montagem e da verificação do arquivo final.

```text
subtitles_burned_in: yes
subtitle_safe_zone: yes
narration_clear: yes
```

## Notas rápidas

- Confirmar que as legendas em inglês estão incorporadas na parte inferior do MP4 e não encobrem elementos importantes ou controles usuais das plataformas.
- Confirmar que a voz está compreensível acima da trilha em todo o vídeo.
- Confirmar continuidade de personagem, paleta, acessórios e estilo entre as cenas.
- Se algum item falhar, corrigir antes de executar `node scripts/validar-video-diario.mjs <pasta-do-pacote>`.
