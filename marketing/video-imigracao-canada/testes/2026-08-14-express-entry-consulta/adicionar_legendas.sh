#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/ubuntu/mazyos/marketing/video-imigracao-canada/testes/2026-08-14-express-entry-consulta"
INPUT="$ROOT/video/video-teste-express-entry-2026-08-14.mp4"
SUBTITLES="$ROOT/legendas.ass"
OUTPUT="$ROOT/video/video-teste-express-entry-2026-08-14-legendado.mp4"

ffmpeg -y -i "$INPUT" \
  -vf "subtitles='$SUBTITLES':fontsdir=/usr/share/fonts/truetype/dejavu" \
  -c:v libx264 -preset medium -crf 20 -c:a copy -movflags +faststart \
  "$OUTPUT"

ffprobe -v error -show_entries stream=codec_type,width,height,avg_frame_rate:format=duration -of default=noprint_wrappers=1 "$OUTPUT"
