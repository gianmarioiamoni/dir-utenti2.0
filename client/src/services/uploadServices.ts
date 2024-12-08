import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/upload";

/**
 * Carica un file su Cloudinary tramite il server.
 * @param file - Il file da caricare.
 * @returns L'URL del file caricato.
 */
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.fileUrl; // URL dell'immagine salvata su Cloudinary
};
