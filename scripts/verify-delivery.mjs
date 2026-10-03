import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
// The bundled probe is used with its macOS library directory, never a system install.
const suffix = process.platform === "win32" ? "-msvc" : process.platform === "linux" ? (process.report.getReport().header.glibcVersionRuntime ? "-gnu" : "-musl") : "";
const pkg = `@remotion/compositor-${process.platform}-${process.arch}${suffix}`;
const libs = resolve(root, "node_modules", pkg);
const target =
  process.argv[2] ?? resolve(root, "delivery/招聘工作台-手绘宣传片.mp4");
const result = spawnSync(
  resolve(libs, process.platform === "win32" ? "ffprobe.exe" : "ffprobe"),
  ["-v", "error", "-show_streams", "-show_format", "-of", "json", target],
  { encoding: "utf8", env: { ...process.env, DYLD_LIBRARY_PATH: libs } },
);
if (result.status !== 0) throw new Error(result.stderr || "Media probe failed");
const info = JSON.parse(result.stdout),
  video = info.streams.find((s) => s.codec_type === "video"),
  audio = info.streams.find((s) => s.codec_type === "audio");
if (
  !video ||
  video.width !== 1920 ||
  video.height !== 1080 ||
  video.r_frame_rate !== "30/1" ||
  Number(video.nb_frames) !== 900 ||
  Number(video.duration) !== 30
)
  throw new Error("Unexpected video dimensions, frame count or duration");
if (
  !audio ||
  audio.channels !== 2 ||
  Math.abs(Number(audio.duration) - 30) > 0.1
)
  throw new Error("Missing or incomplete stereo soundtrack");
const report = {
  video: {
    width: video.width,
    height: video.height,
    fps: 30,
    frames: 900,
    duration: 30,
    codec: video.codec_name,
  },
  audio: {
    codec: audio.codec_name,
    channels: audio.channels,
    sampleRate: audio.sample_rate,
    duration: audio.duration,
  },
  sha256: createHash("sha256").update(readFileSync(target)).digest("hex"),
  bytes: info.format.size,
};
writeFileSync(
  resolve(root, "delivery/media-info.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
