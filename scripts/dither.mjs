import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/media");
const bone = [0xf8, 0xf3, 0xe8],
  ash = [0x09, 0x09, 0x09];
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }
  return files;
}
async function prepareCovers() {
  for (const file of await walk(path.join(root, "work"))) {
    if (!file.endsWith("cover-source.png")) continue;
    const out = path.join(path.dirname(file), "cover.webp");
    await sharp(file)
      .resize(1600, 1200, { fit: "cover", position: "top" })
      .webp({ quality: 78 })
      .toFile(out);
    await sharp(file)
      .resize(800, 600, { fit: "cover", position: "top" })
      .webp({ quality: 76 })
      .toFile(path.join(path.dirname(file), "cover-800.webp"));
  }
}
async function prepareFonts() {
  const fonts = path.resolve("public/fonts");
  await mkdir(fonts, { recursive: true });
  const copies = [
    [
      "@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      "instrument-serif.woff2",
    ],
    [
      "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      "instrument-serif-italic.woff2",
    ],
    [
      "@fontsource-variable/instrument-sans/files/instrument-sans-latin-standard-normal.woff2",
      "instrument-sans.woff2",
    ],
    ["@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", "ibm-plex-mono.woff2"],
  ];
  for (const [source, target] of copies) {
    await copyFile(path.resolve("node_modules", source), path.join(fonts, target));
  }
}
async function dither(file) {
  const out = file.replace(/\.webp$/, ".dither.png");
  const { data, info } = await sharp(file)
    .resize({ width: 780, withoutEnlargement: true })
    .greyscale()
    .normalize()
    .gamma(1.15)
    .linear(1.08, -10)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const values = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) values[i] = data[i];
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++) {
      const i = y * info.width + x,
        old = values[i],
        value = old < 128 ? 0 : 255,
        error = old - value;
      if (x + 1 < info.width) values[i + 1] += (error * 7) / 16;
      if (y + 1 < info.height) {
        if (x > 0) values[i + info.width - 1] += (error * 3) / 16;
        values[i + info.width] += (error * 5) / 16;
        if (x + 1 < info.width) values[i + info.width + 1] += error / 16;
      }
      const color = value === 0 ? ash : bone;
      const o = i * 4;
      rgba[o] = color[0];
      rgba[o + 1] = color[1];
      rgba[o + 2] = color[2];
      rgba[o + 3] = 255;
    }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ palette: true, colours: 2, compressionLevel: 9 })
    .toFile(out);
}
async function generateBaseAssets() {
  const markPath = "public/phoenix-mark.png";
  await sharp(markPath).resize(180, 180).png().toFile("public/apple-touch-icon.png");
  await sharp(markPath).resize(32, 32).png().toFile("public/favicon-32.png");
  const ogMark = await sharp(markPath).resize(390, 390).png().toBuffer();
  const og = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#000"/><text x="535" y="265" fill="#EFA80F" font-family="Arial,sans-serif" font-size="70" font-weight="700">PHOENIX</text><text x="540" y="325" fill="#EFA80F" font-family="Arial,sans-serif" font-size="28" letter-spacing="9">TECH SOLUTIONS</text><text x="540" y="410" fill="#F8F3E8" font-family="Arial,sans-serif" font-size="28">Free digital work for community organizations.</text></svg>`;
  await sharp(Buffer.from(og))
    .composite([{ input: ogMark, left: 80, top: 120 }])
    .png()
    .toFile("public/og.png");
}
await mkdir(root, { recursive: true });
await prepareCovers();
await prepareFonts();
await generateBaseAssets();
for (const file of await walk(root)) {
  if (file.endsWith(".webp") && !file.endsWith("-800.webp")) await dither(file);
}
console.log("Prepared cover WebPs, dither pairs, brand icons, and the OG image.");
