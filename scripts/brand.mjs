import { readFile } from "node:fs/promises";
import sharp from "sharp";

// Regenerates icons and the social card from the wing mark. Run by hand after the mark changes;
// the outputs are committed so builds never depend on the fonts installed on the build machine.
const mark = await readFile("public/phoenix-wing-navy.svg");
const cream = "#FDF5E8";

const render = (size) =>
  sharp(mark, { density: Math.ceil((72 * size * 2) / 280) })
    .resize(size, size)
    .png()
    .toBuffer();

async function onCream(size, markSize, file) {
  await sharp({ create: { width: size, height: size, channels: 4, background: cream } })
    .composite([{ input: await render(markSize), gravity: "center" }])
    .png()
    .toFile(file);
}

await sharp(await render(32)).toFile("public/favicon-32.png");
await sharp(await render(512)).toFile("public/phoenix-mark.png");
await onCream(180, 144, "public/apple-touch-icon.png");
await onCream(512, 400, "public/icon-512.png");

const og = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${cream}"/>
  <text x="490" y="292" fill="#0D0605" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="56" font-weight="700" letter-spacing="-1.2">Phoenix Tech Solutions</text>
  <text x="492" y="352" fill="#5E554C" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30">Free websites for nonprofits and school clubs.</text>
  <rect x="492" y="400" width="72" height="6" fill="#D56B49"/>
</svg>`;
await sharp(Buffer.from(og))
  .composite([{ input: await render(320), left: 110, top: 155 }])
  .png()
  .toFile("public/og.png");

console.log("Regenerated favicon, touch icons, mark PNG, and social card.");
