import { access, copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/media");
const bone = [0xf4, 0xef, 0xe6],
  ash = [0x14, 0x12, 0x0f];
async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}
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
  await mkdir(path.join(root, "env"), { recursive: true });
  const dawn = path.join(root, "env", "dawn.webp");
  if (!(await exists(dawn))) {
    const svg = `<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg"><rect width="1600" height="900" fill="#F4EFE6"/><path d="M0 610L180 500l150 70 260-190 210 170 220-230 230 235 180-110 170 165v290H0z" fill="#6B6459"/><path d="M0 680q300-100 600 0t600 0 400 0v220H0z" fill="#14120F"/><circle cx="1180" cy="270" r="45" fill="#BF3B1E"/></svg>`;
    await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(dawn);
  }
  const grain = Buffer.alloc(128 * 128 * 4);
  let seed = 2024;
  for (let i = 0; i < 128 * 128; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const ink = seed / 2 ** 32 < 0.08;
    const c = ink ? ash : bone;
    grain[i * 4] = c[0];
    grain[i * 4 + 1] = c[1];
    grain[i * 4 + 2] = c[2];
    grain[i * 4 + 3] = ink ? 255 : 0;
  }
  await sharp(grain, { raw: { width: 128, height: 128, channels: 4 } })
    .png({ palette: true, colours: 2 })
    .toFile(path.join(root, "grain.png"));
  const mark = `<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="#F4EFE6"/><g transform="translate(43 43) scale(5)"><path fill="#BF3B1E" d="M8 0h3v3H8z"/><path fill="#14120F" d="M4 4h3v3H4zm8 0h3v3h-3zM0 8h3v3H0zm8 0h3v3H8zm8 0h3v3h-3zM0 12h7v3H0zm12 0h7v3h-7zM0 16h19v3H0z"/></g></svg>`;
  await sharp(Buffer.from(mark)).resize(180, 180).png().toFile("public/apple-touch-icon.png");
  await sharp(Buffer.from(mark)).resize(32, 32).png().toFile("public/favicon-32.png");
  const og = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#F4EFE6"/><g transform="translate(80 70) scale(2.6)"><path fill="#BF3B1E" d="M8 0h3v3H8z"/><path fill="#14120F" d="M4 4h3v3H4zm8 0h3v3H4zm-4 4h3v3H8zM0 8h3v3H0zm16 0h3v3h-3zM0 12h7v3H0zm12 0h7v3h-7zM0 16h19v3H0z"/></g><text x="80" y="300" fill="#14120F" font-family="Georgia,serif" font-size="78">Phoenix Tech Solutions</text><text x="84" y="378" fill="#6B6459" font-family="Arial,sans-serif" font-size="30">Free websites and apps for community organizations.</text><path d="M0 535h1200v95H0z" fill="#14120F"/><path d="M0 535h1200" stroke="#BF3B1E" stroke-width="8" stroke-dasharray="3 13"/></svg>`;
  await sharp(Buffer.from(og)).png().toFile("public/og.png");
}
await mkdir(root, { recursive: true });
await prepareCovers();
await prepareFonts();
await generateBaseAssets();
for (const file of await walk(root)) {
  if (file.endsWith(".webp") && !file.endsWith("-800.webp")) await dither(file);
}
console.log("Prepared cover WebPs, dither pairs, grain, favicons, and OG image.");
