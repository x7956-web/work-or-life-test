import { cp, mkdir, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "tcb-deploy", "public");
const target = path.join(root, "dist");

if (!existsSync(source)) {
  throw new Error("Missing tcb-deploy/public static source directory");
}

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

const files = [
  "index.html",
  "assets/style.ebfbb5a672.css",
  "assets/app.0b7bbd5869.js"
];
let total = 0;
for (const file of files) {
  const size = (await stat(path.join(target, file))).size;
  total += size;
  console.log(`[build] ${file}: ${size} bytes`);
}
console.log(`[build] dist ready: ${total} bytes`);
