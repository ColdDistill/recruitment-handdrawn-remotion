import { mkdirSync, writeFileSync } from "node:fs";
// Original 30-second composition: 120 BPM, Dmaj7 / Bm7 / Gmaj7 / Aadd9.
// All sounds synthesized here; no samples, third-party tracks, or network calls.
const sr = 44100,
  seconds = 30,
  n = sr * seconds,
  l = new Float64Array(n),
  r = new Float64Array(n);
let seed = 20301003;
const noise = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return (seed / 4294967296) * 2 - 1;
};
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
function add(at, duration, fn, gain = 0.1, pan = 0) {
  const start = Math.round(at * sr),
    count = Math.min(Math.ceil(duration * sr), n - start);
  for (let i = 0; i < count; i++) {
    const t = i / sr,
      v = fn(t, duration) * gain;
    l[start + i] += v * Math.sqrt((1 - pan) / 2);
    r[start + i] += v * Math.sqrt((1 + pan) / 2);
  }
}
const env = (t, d, a = 0.012, rel = 0.08) =>
  Math.min(1, t / a) * Math.min(1, Math.max(0, (d - t) / rel));
const chords = [
  [50, 57, 61, 66],
  [47, 54, 57, 62],
  [43, 50, 54, 59],
  [45, 52, 59, 61],
];
for (let bar = 0; bar < 14; bar++) {
  const at = bar * 2,
    ch = chords[bar % 4];
  ch.forEach((note, j) =>
    add(
      at,
      2.25,
      (t, d) => {
        const f = hz(note + 12);
        return (
          (Math.sin(2 * Math.PI * f * t) +
            0.32 * Math.sin(2 * Math.PI * f * 1.002 * t) +
            0.12 * Math.sin(4 * Math.PI * f * t)) *
          env(t, d, 0.25, 0.65)
        );
      },
      0.045,
      (j - 1.5) * 0.32,
    ),
  );
  for (let step = 0; step < 8; step++) {
    const pos = at + step * 0.25,
      note = ch[[0, 2, 1, 3, 2, 1, 3, 2][step]] + 24;
    add(
      pos,
      0.34,
      (t, d) => {
        const f = hz(note);
        return (
          (Math.sin(2 * Math.PI * f * t) +
            0.3 * Math.sin(4 * Math.PI * f * t)) *
          Math.exp(-t * 14) *
          env(t, d, 0.003, 0.02)
        );
      },
      bar < 2 ? 0.075 : 0.105,
      step % 2 ? 0.55 : -0.55,
    );
    if (bar >= 1)
      add(
        pos,
        0.075,
        (t) => noise() * Math.exp(-t * 65),
        step % 2 ? 0.036 : 0.018,
        step % 2 ? 0.35 : -0.35,
      );
  }
  for (let beat = 0; beat < 4; beat++) {
    const pos = at + beat * 0.5;
    if (bar >= 2 || beat === 0)
      add(
        pos,
        0.32,
        (t) =>
          Math.sin(
            2 * Math.PI * (48 * t + 75 * 0.018 * (1 - Math.exp(-t / 0.018))),
          ) * Math.exp(-t * 13),
        0.31,
      );
    if (beat % 2 === 1 && bar >= 2) {
      add(
        pos,
        0.17,
        (t) => noise() * Math.exp(-t * 30) * (Math.sin(t * 18000) * 0.5 + 0.5),
        0.11,
      );
      add(
        pos,
        0.13,
        (t) => Math.sin(2 * Math.PI * 180 * t) * Math.exp(-t * 35),
        0.025,
      );
    }
    if (bar >= 1)
      add(
        pos,
        0.38,
        (t, d) => {
          const f = hz(ch[0] - 12);
          return (
            (Math.sin(2 * Math.PI * f * t) +
              0.24 * Math.sin(4 * Math.PI * f * t)) *
            env(t, d, 0.008, 0.1) *
            Math.exp(-t * 2)
          );
        },
        0.2,
      );
  }
}
// Phrase melody leaves space for interface motion and resolves into the end card.
const melody = [74, 78, 81, 78, 76, 74, 73, 69, 71, 74, 78, 76, 73, 76, 81, 78];
for (let i = 0; i < 32; i++) {
  const at = 8 + i * 0.5,
    f = hz(melody[i % 16]);
  add(
    at,
    0.56,
    (t, d) =>
      (Math.sin(2 * Math.PI * f * t) + 0.16 * Math.sin(4 * Math.PI * f * t)) *
      env(t, d, 0.008, 0.2) *
      Math.exp(-t * 4),
    0.075,
    Math.sin(i) * 0.18,
  );
}
// Sound design: airy junction swishes, short UI clicks, success bell.
for (const at of [4, 9, 15, 20, 25])
  add(
    at - 0.18,
    0.38,
    (t, d) =>
      noise() * Math.sin((Math.PI * t) / d) ** 2 * (0.25 + (0.75 * t) / d),
    0.035,
    0,
  );
for (const at of [
  5.3, 6.0, 6.6, 10.4, 11.4, 12.4, 16.6, 17.3, 18, 21.5, 22.5, 23.5,
])
  add(
    at,
    0.045,
    (t) =>
      (Math.sin(2 * Math.PI * 1800 * t) + noise() * 0.25) * Math.exp(-t * 100),
    0.043,
    0.15,
  );
for (const [i, note] of [74, 78, 81, 86].entries())
  add(
    25.5 + i * 0.09,
    1.0,
    (t, d) =>
      Math.sin(2 * Math.PI * hz(note) * t) *
      Math.exp(-t * 5) *
      env(t, d, 0.002, 0.2),
    0.08,
    (i - 1.5) * 0.3,
  );
chords[0].forEach((note, j) =>
  add(
    28,
    2,
    (t, d) => Math.sin(2 * Math.PI * hz(note + 12) * t) * env(t, d, 0.06, 1.3),
    0.065,
    (j - 1.5) * 0.3,
  ),
);
// Deterministic stereo delay. Read from dry copies, avoiding runaway feedback.
const dl = l.slice(),
  dr = r.slice();
for (const [delay, gain] of [
  [0.1875, 0.17],
  [0.375, 0.09],
]) {
  const offset = Math.round(delay * sr);
  for (let i = offset; i < n; i++) {
    l[i] += dr[i - offset] * gain;
    r[i] += dl[i - offset] * gain;
  }
}
let peak = 0,
  sum = 0;
for (let i = 0; i < n; i++) {
  const fade = Math.min(
    1,
    i / (sr * 0.06),
    Math.max(0, (n - 1 - i) / (sr * 0.7)),
  );
  l[i] = Math.tanh(l[i] * 1.8) * fade;
  r[i] = Math.tanh(r[i] * 1.8) * fade;
  peak = Math.max(peak, Math.abs(l[i]), Math.abs(r[i]));
}
const gain = 0.84 / peak,
  pcm = Buffer.alloc(n * 4);
for (let i = 0; i < n; i++) {
  const a = l[i] * gain,
    b = r[i] * gain;
  pcm.writeInt16LE(Math.round(a * 32767), i * 4);
  pcm.writeInt16LE(Math.round(b * 32767), i * 4 + 2);
  sum += (a * a + b * b) / 2;
}
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(pcm.length + 36, 4);
header.write("WAVEfmt ", 8);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(sr, 24);
header.writeUInt32LE(sr * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(pcm.length, 40);
mkdirSync("public", { recursive: true });
writeFileSync("public/soundtrack.wav", Buffer.concat([header, pcm]));
console.log(
  JSON.stringify({
    duration: seconds,
    sampleRate: sr,
    channels: 2,
    bpm: 120,
    peakDb: 20 * Math.log10(0.84),
    rmsDb: 10 * Math.log10(sum / n),
    output: "public/soundtrack.wav",
  }),
);
