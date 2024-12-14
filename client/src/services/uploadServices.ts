import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/upload`;

/**
 * Carica un file su Cloudinary tramite il server.
 * @param file - Il file da caricare.
 * @returns L'URL del file caricato.
 * @throws Error se il caricamento fallisce
 */
export const uploadFile = async (file: File): Promise<string> => {
  // Validazione del file
  if (!file) {
    throw new Error("Nessun file fornito");
  }

  // Verifica il tipo di file
  if (!file.type.startsWith('image/')) {
    throw new Error("Solo le immagini sono permesse");
  }

  // Verifica la dimensione del file (5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Il file non può superare i 5MB");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data.fileUrl) {
      throw new Error("URL del file mancante nella risposta");
    }

    return response.data.fileUrl;
  } catch (error: any) {
    console.error("Errore durante il caricamento del file:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Errore durante il caricamento del file");
    }
    throw error;
  }
};
