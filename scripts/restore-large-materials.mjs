import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const largeMaterials = [
  {
    output: "public/materials/ce100-week-10-graphs.en.md_slide.pdf",
    partsDir: "large-materials/ce100-week-10-graphs.en.md_slide.pdf.parts"
  }
];

for (const material of largeMaterials) {
  const outputPath = join(root, material.output);
  const partsPath = join(root, material.partsDir);

  if (existsSync(outputPath) || !existsSync(partsPath)) {
    continue;
  }

  const parts = readdirSync(partsPath)
    .filter((name) => name.endsWith(".bin"))
    .sort();

  if (parts.length === 0) {
    continue;
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  const chunks = parts.map((part) => readFileSync(join(partsPath, part)));
  writeFileSync(outputPath, Buffer.concat(chunks));
  console.log(`Restored ${material.output} from ${parts.length} parts.`);
}
