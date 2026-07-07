import { existsSync, statSync } from "node:fs";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);
const scanRoots = ["public", "src"];

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return imageExtensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  }));
  return files.flat();
}

const sourceImages = (await Promise.all(scanRoots.map(root => walk(root)))).flat();

if (!sourceImages.length) {
  console.log("[images] no jpg/png images found, skip webp conversion");
  process.exit(0);
}

const { default: sharp } = await import("sharp");

for (const file of sourceImages) {
  const target = file.replace(path.extname(file), ".webp");
  const sourceMtime = statSync(file).mtimeMs;
  const targetExists = existsSync(target);
  const shouldConvert = !targetExists || statSync(target).mtimeMs < sourceMtime;

  if (!shouldConvert) continue;

  await mkdir(path.dirname(target), { recursive: true });
  await sharp(file)
    .rotate()
    .webp({ quality: 82, effort: 4 })
    .toFile(target);
  console.log(`[images] ${file} -> ${target}`);
}
