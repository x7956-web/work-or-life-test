import { cp, mkdir, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "tcb-deploy", "public");
const target = path.join(root, "dist");
const studioSources = [
  ["src/xhsStudio.css", "tcb-deploy/public/assets/xhs-studio.20260708.css"],
  ["src/xhsStudioPreset.js", "tcb-deploy/public/assets/xhs-studio.preset.20260708.js"],
  ["src/xhsStudio.js", "tcb-deploy/public/assets/xhs-studio.20260708.js"]
];

if (!existsSync(source)) {
  throw new Error("Missing tcb-deploy/public static source directory");
}

for (const [from, to] of studioSources) {
  const sourceFile = path.join(root, from);
  const targetFile = path.join(root, to);
  if (existsSync(sourceFile)) {
    await mkdir(path.dirname(targetFile), { recursive: true });
    await cp(sourceFile, targetFile);
  }
}

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

const files = [
  "index.html",
  "assets/style.ebfbb5a672.css",
  "assets/app.0b7bbd5869.js",
  "assets/xhs-post.20260708-scene.css",
  "assets/xhs-post.20260708-scene.js",
  "assets/xhs-studio.20260708.css",
  "assets/xhs-studio.preset.20260708.js",
  "assets/xhs-studio.20260708.js"
];
let total = 0;
for (const file of files) {
  const size = (await stat(path.join(target, file))).size;
  total += size;
  console.log(`[build] ${file}: ${size} bytes`);
}
console.log(`[build] dist ready: ${total} bytes`);
