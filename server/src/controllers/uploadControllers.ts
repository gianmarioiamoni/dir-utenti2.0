import { Request, Response, NextFunction } from "express";

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
      res.status(400).json({ message: "Nessun file caricato." });
      return;
  }

  res.status(200).json({
    message: "File caricato con successo!",
    fileUrl: req.file.path, // URL del file su Cloudinary
  });
};