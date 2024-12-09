import { useState } from "react";

import { addUser} from "@/services/userServices";
import { uploadFile } from "@/services/uploadServices";
import { validateUser } from "@/utils/validation";
import { UserData } from "@/interfaces/userInterfaces";

interface useUserFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const useUserForm = ({ onClose, onSuccess }: useUserFormProps) => {
  const [formData, setFormData] = useState<UserData>({
      nome: "",
      cognome: "",
      email: "",
      dataNascita: "",
      fotoProfilo: "",
    } as UserData);

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string> | null>(null);

  const handleFileChange = async (file: File) => {
    try {
      setLoading(true);
      const fileUrl = await uploadFile(file); // Carica il file e ottieni l'URL
      setFormData((prev) => ({ ...prev, fotoProfilo: fileUrl }) as UserData); // Aggiorna il campo della foto
    } catch (error) {
      console.error("Errore durante l'upload del file:", error);
      setValidationErrors((prev) => ({
        ...prev,
        serverError: "Errore durante l'upload del file",
      }))
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }) as UserData);
  };

  const validateForm = () => {
    const newErrors = validateUser(formData);
    console.log("validateForm() - newErrors", newErrors);
    setValidationErrors(newErrors);
    console.log(
      "validateForm() - Object.keys(newErrors).length",
      Object.keys(newErrors).length
    );
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    // se fotoProfilo è "", toglie fotoProfilo da formData
    if (formData.fotoProfilo === "") {
      delete formData.fotoProfilo;
    }
    
    try {
      const response = await addUser(formData);
      // Chiama il callback onSuccess se presente
      if (onSuccess) {
        onSuccess();
      }
      handleCancel();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("useUserForm - err:", err);
        setValidationErrors((prev) => ({
          ...(prev ?? {}),
          serverError: err.message,
        }));
      } else {
        console.error("An unknown error occurred:", err);
        setValidationErrors((prev) => ({
          ...(prev ?? {}),
          serverError: "Errore: qualcosa e' andato storto",
        }));
      }
    }
  };

  const handleCancel = () => {
    onClose();
    setFormData({
      nome: "",
      cognome: "",
      email: "",
      dataNascita: "",
      fotoProfilo: "",
    });
    setValidationErrors(null);
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    handleCancel,
    loading,
    validationErrors,
  };
};
