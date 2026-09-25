import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const work = path.resolve("public/media/work");

// Client screenshots are shown at 16:9 everywhere, anchored to the top of the page.
async function prepareCovers() {
  const entries = await readdir(work, { withFileTypes: true });
  for (const entry of entries.filter((item) => item.isDirectory())) {
    const dir = path.join(work, entry.name);
    const source = path.join(dir, "cover-source.png");
    for (const [width, name] of [
      [1600, "cover.webp"],
      [800, "cover-800.webp"],
    ]) {
      await sharp(source)
        .resize(width, Math.round((width * 9) / 16), { fit: "cover", position: "top" })
        .webp({ quality: 80 })
        .toFile(path.join(dir, name));
    }
  }
}

async function prepareFonts() {
  const fonts = path.resolve("public/fonts");
  await mkdir(fonts, { recursive: true });
  await copyFile(
    path.resolve(
      "node_modules/@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2",
    ),
    path.join(fonts, "schibsted-grotesk.woff2"),
  );
}

await prepareCovers();
await prepareFonts();
console.log("Prepared 16:9 cover WebPs and self-hosted fonts.");
