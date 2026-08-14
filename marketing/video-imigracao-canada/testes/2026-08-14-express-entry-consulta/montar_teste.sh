#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/ubuntu/mazyos/marketing/video-imigracao-canada/testes/2026-08-14-express-entry-consulta"
ASSETS="$ROOT/assets"
VIDEO="$ROOT/video"
DURATION="7.6"
FPS="30"
FRAMES="228"

mkdir -p "$VIDEO/clips"

images=(
  "visual-anchor-ottawa.jpg"
  "scene-02-professional.jpg"
  "scene-03-library.jpg"
  "scene-04-city-workers.jpg"
  "scene-05-sectors.jpg"
  "scene-06-trades.jpg"
  "scene-07-french-study.jpg"
  "scene-08-landscape.jpg"
  "scene-09-toronto.jpg"
)

: > "$VIDEO/visuals.txt"
for i in "${!images[@]}"; do
  index=$(printf '%02d' $((i + 1)))
  ffmpeg -y -loop 1 -framerate "$FPS" -t "$DURATION" -i "$ASSETS/${images[$i]}" \
    -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p" \
    -r "$FPS" -an "$VIDEO/clips/${index}.mp4"
  printf "file '%s'\n" "$VIDEO/clips/${index}.mp4" >> "$VIDEO/visuals.txt"
done

ffmpeg -y -loop 1 -framerate "$FPS" -t 4 -i "$ASSETS/scene-10-end-card.png" \
  -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p" \
  -r "$FPS" -an "$VIDEO/clips/10.mp4"
printf "file '%s'\n" "$VIDEO/clips/10.mp4" >> "$VIDEO/visuals.txt"

ffmpeg -y -f concat -safe 0 -i "$VIDEO/visuals.txt" -c copy "$VIDEO/visuals.mp4"
ffmpeg -y -i "$VIDEO/visuals.mp4" -i "$ROOT/audio/narracao.wav" \
  -filter_complex "[1:a]apad=pad_dur=4[a]" -map 0:v -map "[a]" -t 72.4 \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart \
  "$VIDEO/video-teste-express-entry-2026-08-14.mp4"

ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 \
  "$VIDEO/video-teste-express-entry-2026-08-14.mp4"
