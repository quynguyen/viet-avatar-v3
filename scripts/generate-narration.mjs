import { mkdir, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";

const story = JSON.parse(await readFile(new URL("../src/lib/story.json", import.meta.url), "utf8"));
const root = "/workspace/public/audio";
const voices = { vi: "vi-VN-HoaiMyNeural", en: "en-US-JennyNeural" };
const rates = {
  preschool: "-12%",
  primary: "-8%",
  intermediate: "-4%",
  senior: "+0%",
};

const collections = story.series ?? [{ seasons: story.seasons ?? [{ pages: story.pages }] }];
const jobs = [];
for (const series of collections) {
  for (const season of series.seasons) {
    for (const page of season.pages) {
      for (const level of story.levels) {
        for (const lang of ["vi", "en"]) {
          const text = page.text[level.id][lang];
          const dest = join(root, level.id, lang, `${page.file}.mp3`);
          jobs.push({ text, dest, lang, rate: rates[level.id] });
        }
      }
    }
  }
}

await Promise.all(
  [...new Set(jobs.map((j) => dirname(j.dest)))].map((dir) => mkdir(dir, { recursive: true })),
);

async function exists(path) {
  try {
    const s = await stat(path);
    return s.size > 2000;
  } catch {
    return false;
  }
}

const pending = [];
for (const job of jobs) {
  if (await exists(job.dest)) continue;
  pending.push(job);
}
console.log("generate", pending.length, "skip", jobs.length - pending.length);

function speak({ text, dest, lang, rate }) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "edge-tts",
      ["--voice", voices[lang], `--rate=${rate}`, "--text", text, "--write-media", dest],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    let err = "";
    child.stderr.on("data", (d) => {
      err += d.toString();
    });
    child.on("exit", (code) => {
      if (code === 0) resolve(dest);
      else reject(new Error(`${dest}: ${err || code}`));
    });
  });
}

const limit = 6;
let i = 0;
let ok = 0;
async function worker() {
  while (i < pending.length) {
    const job = pending[i++];
    await speak(job);
    ok += 1;
    if (ok % 10 === 0 || ok === pending.length) console.log(`${ok}/${pending.length}`);
  }
}

await Promise.all(Array.from({ length: limit }, worker));
console.log("done", ok);
