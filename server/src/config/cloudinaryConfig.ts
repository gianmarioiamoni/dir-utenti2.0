import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configurazione di Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Inserisci nel tuo .env
  api_key: process.env.CLOUDINARY_API_KEY, // Inserisci nel tuo .env
  api_secret: process.env.CLOUDINARY_API_SECRET, // Inserisci nel tuo .env
});

// Configurazione dello storage di Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cartella su Cloudinary
    allowed_formats: ["jpeg", "png", "jpg", "gif"], // Formati consentiti
  } as any,
});

// Middleware Multer
const upload = multer({ storage });

export { cloudinary, upload };
