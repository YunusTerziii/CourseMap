import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const materialsDir = path.join(root, "public", "materials");
const outputDir = path.join(root, "public", "generated", "pdf-pages");

const files = [
  ["week-1", "ce103-week-1-intro.en.md_slide.pdf"],
  ["week-2", "ce103-week-2-setup.en.md_slide.pdf"],
  ["week-3", "ce103-week-3-git.en.md_slide.pdf"],
  ["week-4", "ce103-week-4-test.en.md_slide.pdf"],
  ["week-5", "ce103-week-5-c.en.md_slide.pdf"],
  ["week-6", "ce103-week-6-cpp.en.md_slide.pdf"],
  ["week-7", "ce103-week-7-csharp.en.md_slide.pdf"],
  ["week-8", "ce103-week-8-java-I.en.md_slide.pdf"],
  ["ce100-week-1", "ce100-week-1-intro.en.md_slide.pdf"],
  ["ce100-week-2", "ce100-week-2-recurrence.en.md_slide.pdf"],
  ["ce100-week-3", "ce100-week-3-matrix.en.md_slide.pdf"],
  ["ce100-week-4", "ce100-week-4-heap.en.md_slide.pdf"],
  ["ce100-week-5", "ce100-week-5-dp.en.md_slide.pdf"],
  ["ce100-week-6", "ce100-week-6-lcs.en.md_slide.pdf"],
  ["ce100-week-7", "ce100-week-7-knapsack.en.md_slide.pdf"],
  ["ce100-week-9", "ce100-week-9-huffman.en.md_slide.pdf"],
  ["ce100-week-10", "ce100-week-10-graphs.en.md_slide.pdf"],
  ["ce100-week-11", "ce100-week-11-shortestpath.en.md_slide.pdf"],
  ["ce100-week-12", "ce100-week-12-crypto.en.md_slide.pdf"],
  ["ce100-week-13", "ce100-week-13-symenc.en.md_slide.pdf"],
  ["ce100-week-14", "ce100-week-14-otp.en.md_slide.pdf"],
  ["ce204-week-1", "ce204-week-1.en.md_slide.pdf"],
  ["ce204-week-2", "ce204-week-2.en.md_slide.pdf"],
  ["ce204-week-3", "ce204-week-3.en.md_slide.pdf"],
  ["ce204-week-4", "ce204-week-4.en.md_slide.pdf"],
  ["ce204-week-5", "ce204-week-5.en.md_slide.pdf"],
  ["ce204-week-6", "ce204-week-6.en.md_slide.pdf"],
  ["ce204-week-7", "ce204-week-7.en.md_slide.pdf"],
  ["ce204-week-9", "ce204-week-9.en.md_slide.pdf"],
  ["ce204-week-10", "ce204-week-10.en.md_slide.pdf"],
  ["ce204-week-11", "ce204-week-11.en.md_slide.pdf"],
  ["ce204-week-12", "ce204-week-12.en.md_slide.pdf"],
  ["ce204-week-13", "ce204-week-13.en.md_slide.pdf"],
  ["ce204-week-14", "ce204-week-14.en.md_slide.pdf"],
  ["ce204-week-15", "ce204-week-15.en.md_slide.pdf"],
  ["ce204-week-16", "ce204-week-16-final.en.md_slide.pdf"]
];

function normalizeText(value) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function titleFromLines(lines, fallback) {
  const ignored = new Set(["download", "doc", "slide", "pptx"]);
  const candidate = lines.find((line) => {
    const normalized = line.toLowerCase();
    return line.length > 2 && !ignored.has(normalized) && !normalized.includes("ce103 algorithms and programming i") && !normalized.includes("ce100 algorithms and programming ii") && !normalized.includes("ce204 object-oriented programming");
  });
  return candidate ?? fallback;
}

async function extractPdf(weekId, fileName) {
  const filePath = path.join(materialsDir, fileName);
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
    const page = await doc.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const lines = textContent.items
      .map((item) => normalizeText(item.str ?? ""))
      .filter(Boolean)
      .filter((line, index, all) => index === 0 || line !== all[index - 1]);

    pages.push({
      page: pageNumber,
      title: titleFromLines(lines, `Sayfa ${pageNumber}`),
      lines,
      text: lines.join("\n")
    });
  }

  return {
    weekId,
    source: `/materials/${fileName}`,
    pageCount: doc.numPages,
    generatedAt: new Date().toISOString(),
    pages
  };
}

fs.mkdirSync(outputDir, { recursive: true });

for (const [weekId, fileName] of files) {
  console.log(`Extracting ${weekId} from ${fileName}...`);
  const result = await extractPdf(weekId, fileName);
  const outFile = path.join(outputDir, `${weekId}.json`);
  fs.writeFileSync(outFile, JSON.stringify(result));
  console.log(`Wrote ${outFile} (${result.pageCount} pages)`);
}
