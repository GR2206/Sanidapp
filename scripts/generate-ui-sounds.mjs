#!/usr/bin/env node
/** Genera WAV suaves estilo oficina para UI (tap / confirm / toggle). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../assets/sounds');
fs.mkdirSync(outDir, { recursive: true });

function writeWav(filename, samples, sampleRate = 44100) {
  const dataSize = samples.length * 2;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE((s * 32767) | 0, 44 + i * 2);
  }
  fs.writeFileSync(path.join(outDir, filename), buf);
}

function tone(
  freq,
  durationSec,
  {
    sampleRate = 44100,
    amp = 0.18,
    attackMs = 4,
    releaseMs = 90,
    harmonics = [
      [1, 1],
      [2, 0.18],
      [3, 0.06],
    ],
  } = {},
) {
  const n = Math.floor(sampleRate * durationSec);
  const attackN = Math.floor(sampleRate * (attackMs / 1000));
  const releaseN = Math.floor(sampleRate * (releaseMs / 1000));
  const samples = new Float64Array(n);
  const harmSum = harmonics.reduce((s, [, a]) => s + a, 0);

  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let wave = 0;
    for (const [h, a] of harmonics) {
      wave += a * Math.sin(2 * Math.PI * freq * h * t);
    }
    wave /= harmSum;
    let env = 1;
    if (i < attackN) env = i / Math.max(1, attackN);
    else if (i > n - releaseN) env = Math.max(0, (n - i) / Math.max(1, releaseN));
    env *= Math.exp((-3.2 * t) / durationSec);
    samples[i] = wave * amp * env;
  }
  return samples;
}

function concat(...parts) {
  const total = parts.reduce((s, p) => s + p.length, 0);
  const out = new Float64Array(total);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

function silence(ms, sampleRate = 44100) {
  return new Float64Array(Math.floor((sampleRate * ms) / 1000));
}

writeWav(
  'ui-tap.wav',
  tone(920, 0.055, {
    amp: 0.12,
    attackMs: 1.5,
    releaseMs: 45,
    harmonics: [
      [1, 1],
      [2, 0.12],
      [3, 0.04],
    ],
  }),
);

writeWav(
  'ui-confirm.wav',
  concat(
    tone(523.25, 0.09, {
      amp: 0.11,
      attackMs: 6,
      releaseMs: 70,
      harmonics: [
        [1, 1],
        [2, 0.15],
      ],
    }),
    silence(18),
    tone(659.25, 0.12, {
      amp: 0.1,
      attackMs: 6,
      releaseMs: 95,
      harmonics: [
        [1, 1],
        [2, 0.12],
      ],
    }),
  ),
);

writeWav(
  'ui-toggle.wav',
  tone(640, 0.07, {
    amp: 0.11,
    attackMs: 2,
    releaseMs: 55,
    harmonics: [
      [1, 1],
      [2, 0.2],
      [0.5, 0.08],
    ],
  }),
);

console.log('✓', fs.readdirSync(outDir).join(', '));
