import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Verifica delle variabili d'ambiente
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary environment variables are not properly configured");
}

// Configurazione di Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurazione dello storage di Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cartella su Cloudinary
    allowed_formats: ["jpeg", "png", "jpg", "gif"], // Formati consentiti
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Limita dimensioni
    format: "jpg", // Converti tutto in jpg
  } as any,
});

// Middleware Multer con limiti di dimensione
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite di 5MB
  },
  fileFilter: (req, file, cb) => {
    // Verifica il tipo di file
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Solo le immagini sono permesse'));
      return;
    }
    cb(null, true);
  }
});

export { cloudinary, upload };
