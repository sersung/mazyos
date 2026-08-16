#!/usr/bin/env node

/**
 * Validates a ready-to-post daily short-video package.
 * Usage: node scripts/validar-video-diario.mjs <package-directory>
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const packageDirectory = process.argv[2] ? resolve(process.argv[2]) : null;

if (!packageDirectory) {
  console.error('Usage: node scripts/validar-video-diario.mjs <package-directory>');
  process.exit(2);
}

const requiredFiles = [
  'producao.md',
  'video.mp4',
  'legendas.srt',
  'metadados.md',
  'pesquisa.md',
  'quality-check.md',
];

const checks = [];
const addCheck = (name, pass, detail) => checks.push({ name, pass, detail });

for (const filename of requiredFiles) {
  const filePath = join(packageDirectory, filename);
  addCheck(`required_file:${filename}`, existsSync(filePath), existsSync(filePath) ? 'present' : 'missing');
}

const requiredPresent = checks.every((check) => check.pass);
let mediaInfo = null;

if (existsSync(join(packageDirectory, 'video.mp4'))) {
  const probe = spawnSync(
    'ffprobe',
    [
      '-v', 'error',
      '-show_entries', 'format=duration:stream=codec_type,codec_name,width,height,sample_rate,channels',
      '-of', 'json',
      join(packageDirectory, 'video.mp4'),
    ],
    { encoding: 'utf8' },
  );

  if (probe.error || probe.status !== 0) {
    addCheck('ffprobe', false, probe.error?.message || probe.stderr.trim() || 'ffprobe failed');
  } else {
    try {
      mediaInfo = JSON.parse(probe.stdout);
      const duration = Number(mediaInfo.format?.duration || 0);
      const videoStream = mediaInfo.streams?.find((stream) => stream.codec_type === 'video');
      const audioStream = mediaInfo.streams?.find((stream) => stream.codec_type === 'audio');
      const ratio = videoStream ? videoStream.width / videoStream.height : 0;
      const isNineBySixteen = Math.abs(ratio - (9 / 16)) <= 0.02;

      addCheck('duration_60_to_90_seconds', duration >= 60 && duration <= 90, `${duration.toFixed(2)}s`);
      addCheck(
        'vertical_9_16_minimum_720x1280',
        Boolean(videoStream) && videoStream.width >= 720 && videoStream.height >= 1280 && videoStream.height > videoStream.width && isNineBySixteen,
        videoStream ? `${videoStream.width}x${videoStream.height}` : 'no video stream',
      );
      addCheck('audio_stream_present', Boolean(audioStream), audioStream ? `${audioStream.codec_name || 'audio'} ${audioStream.sample_rate || '?'}Hz` : 'missing');
    } catch (error) {
      addCheck('ffprobe_json', false, error.message);
    }
  }
}

if (existsSync(join(packageDirectory, 'legendas.srt'))) {
  const srt = readFileSync(join(packageDirectory, 'legendas.srt'), 'utf8').trim();
  const blocks = srt ? srt.split(/\r?\n\r?\n/) : [];
  const timeBlocks = blocks
    .map((block) => block.split(/\r?\n/))
    .filter((lines) => lines.length >= 3 && /\d{2}:\d{2}:\d{2},\d{3}\s+-->\s+\d{2}:\d{2}:\d{2},\d{3}/.test(lines[1]));
  const longBlocks = timeBlocks.filter((lines) => lines.slice(2).filter(Boolean).length > 2);

  addCheck('srt_has_timed_blocks', timeBlocks.length > 0, `${timeBlocks.length} timed blocks`);
  addCheck('srt_maximum_two_lines_per_block', longBlocks.length === 0, `${longBlocks.length} blocks over limit`);

  const firstTimestamp = timeBlocks[0]?.[1]?.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
  const lastTimestamp = timeBlocks.at(-1)?.[1]?.match(/-->\s+(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
  const toSeconds = (match) => match ? Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000 : null;
  const firstStart = toSeconds(firstTimestamp);
  const lastEnd = toSeconds(lastTimestamp);
  const expectedDuration = Number(mediaInfo?.format?.duration || 0);

  addCheck('srt_starts_within_first_five_seconds', firstStart !== null && firstStart <= 5, firstStart === null ? 'unreadable' : `${firstStart.toFixed(2)}s`);
  addCheck('srt_covers_final_three_seconds', lastEnd !== null && (!expectedDuration || lastEnd >= expectedDuration - 3), lastEnd === null ? 'unreadable' : `${lastEnd.toFixed(2)}s`);
}

if (existsSync(join(packageDirectory, 'pesquisa.md'))) {
  const research = readFileSync(join(packageDirectory, 'pesquisa.md'), 'utf8').toLowerCase();
  const hasYouTubeSection = /#{1,3}\s*youtube videos analyzed/.test(research);
  const hasSynthesisSection = /#{1,3}\s*editorial synthesis/.test(research);
  const hasOriginalitySection = /#{1,3}\s*originality check/.test(research);
  const hasPublicVerification = /#{1,3}\s*public-source verification/.test(research);
  addCheck(
    'youtube_research_sections_present',
    hasYouTubeSection && hasSynthesisSection && hasOriginalitySection && hasPublicVerification,
    'Require YouTube videos analyzed, Editorial synthesis, Originality check, and Public-source verification sections in pesquisa.md.',
  );
}

if (existsSync(join(packageDirectory, 'quality-check.md'))) {
  const review = readFileSync(join(packageDirectory, 'quality-check.md'), 'utf8').toLowerCase();
  addCheck('captions_burned_in_confirmation', /subtitles_burned_in:\s*yes/.test(review), 'Set subtitles_burned_in: yes after rendering captions into the MP4.');
  addCheck('caption_safe_zone_confirmation', /subtitle_safe_zone:\s*yes/.test(review), 'Set subtitle_safe_zone: yes after checking the lower safe zone.');
  addCheck('narration_mix_confirmation', /narration_clear:\s*yes/.test(review), 'Set narration_clear: yes after confirming voice-over remains intelligible.');
  addCheck('youtube_research_confirmation', /youtube_research_used:\s*yes/.test(review), 'Set youtube_research_used: yes after analyzing 2–3 relevant YouTube videos.');
  addCheck('youtube_source_count_confirmation', /youtube_sources_analyzed:\s*[23]\b/.test(review), 'Set youtube_sources_analyzed: 2 or 3 after documenting the selected videos.');
  addCheck('originality_confirmation', /originality_check:\s*passed/.test(review), 'Set originality_check: passed after confirming the hook, metaphor, script, visual approach, and CTA are original.');
}

const report = {
  package: basename(packageDirectory),
  generatedAt: new Date().toISOString(),
  automaticChecks: checks,
  summary: {
    passed: checks.filter((check) => check.pass).length,
    failed: checks.filter((check) => !check.pass).length,
    pass: checks.every((check) => check.pass),
  },
  media: mediaInfo ? {
    durationSeconds: Number(mediaInfo.format?.duration || 0),
    streams: mediaInfo.streams,
  } : null,
};

writeFileSync(join(packageDirectory, 'quality-report.json'), `${JSON.stringify(report, null, 2)}\n`);

for (const check of checks) {
  console.log(`${check.pass ? 'PASS' : 'FAIL'}  ${check.name} — ${check.detail}`);
}
console.log(`\nResult: ${report.summary.pass ? 'PASS' : 'FAIL'} (${report.summary.passed}/${checks.length} checks passed)`);
process.exit(report.summary.pass ? 0 : 1);
