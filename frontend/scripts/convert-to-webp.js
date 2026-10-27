/**
 * Convert homepage images to WebP format using sharp
 * Run: node scripts/convert-to-webp.js
 */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const PUBLIC_DIR = path.join(__dirname, "../public");

// Homepage images to convert (source → output quality)
const imagesToConvert = [
  // Hero slider (LCP images) — quality 80 for good balance
  { src: "images/home/slider1.jpg",  quality: 80 },
  { src: "images/home/slider2.jpg",  quality: 80 },
  { src: "images/home/slider3.jpg",  quality: 80 },
  // Hero grid thumbnails (small boxes) — quality 75
  { src: "images/home/home3.png",    quality: 75 },
  { src: "images/home/home4.png",    quality: 75 },
  { src: "images/home/home5.png",    quality: 75 },
  // About building image on homepage
  { src: "images/about/about1.jpg",  quality: 80 },
  // Empowerment section (below the fold) — quality 75
  { src: "images/empowerment/empowerment1.jpg", quality: 75 },
  { src: "images/empowerment/empowerment2.jpg", quality: 75 },
  { src: "images/empowerment/empowerment3.jpg", quality: 75 },
];

async function convertToWebP({ src, quality }) {
  const inputPath  = path.join(PUBLIC_DIR, src);
  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ NOT FOUND  ${src}`);
    return;
  }

  const inputSize = fs.statSync(inputPath).size;

  try {
    await sharp(inputPath)
      .webp({ quality, effort: 6 })   // effort 6 = better compression, slower encode
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    const saved = Math.round(((inputSize - outputSize) / inputSize) * 100);
    const label = saved > 0 ? `${saved}% saved` : `${Math.abs(saved)}% larger`;

    console.log(
      `✅  ${path.basename(src).padEnd(24)} ${Math.round(inputSize/1024)}KB → ${Math.round(outputSize/1024)}KB  (${label})`
    );
  } catch (err) {
    console.error(`❌  ${src}: ${err.message}`);
  }
}

async function main() {
  console.log("🔄  Converting homepage images to WebP with sharp...\n");

  for (const item of imagesToConvert) {
    await convertToWebP(item);
  }

  console.log("\n✨  Done! Update your image src paths to use .webp extensions.");
}

main();
