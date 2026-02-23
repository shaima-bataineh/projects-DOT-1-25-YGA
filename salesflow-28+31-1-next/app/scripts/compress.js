import sharp from "sharp";
import fs from "fs";
import path from "path";

const imagesFolder = "public/icons";
const thumbsFolder = "public/icons/thumbs";

// إنشاء مجلد thumbnails إذا ما موجود
if (!fs.existsSync(thumbsFolder)) fs.mkdirSync(thumbsFolder, { recursive: true });

// الصور التي تريد تصغيرها (Edge-like icons)
const edgeImages = [
  "crm.png",
  "crmmanagment.svg",
  "salesanalytics.png",
  "LeadTracking.svg",
  "emailmarketing.svg",
  "kpi.png"
];

edgeImages.forEach(async (img) => {
  const ext = path.extname(img).toLowerCase();
  const fileName = path.basename(img); // نفس اسم الملف
  const inputPath = path.join(imagesFolder, img);
  const outputPath = path.join(thumbsFolder, fileName);

  if ([".png", ".jpg", ".jpeg"].includes(ext)) {
    await sharp(inputPath)
      .resize(100, 100) // حجم thumbnail المطلوب (يمكن تغييره)
      .toFile(outputPath);
    console.log(`${img} compressed to thumbs/${fileName}`);
  } else if (ext === ".svg") {
    // بالنسبة للـ SVG، يمكن نسخ الملف فقط لأنه scalable
    fs.copyFileSync(inputPath, outputPath);
    console.log(`${img} copied to thumbs/${fileName} (SVG)`);
  }
});
