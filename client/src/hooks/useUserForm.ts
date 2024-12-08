import { useState } from "react";

import { addUser} from "@/services/userServices";
import { uploadFile } from "@/services/uploadServices";
import { validateUser } from "@/utils/validation";
import { UserData } from "@/interfaces/userInterfaces";

interface useUserFormProps {
    onClose: () => void;
}


export const useUserForm = ({ onClose }: useUserFormProps) => {
  const [formData, setFormData] = useState<UserData>({} as UserData);

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string> | null>(null);

  const handleFileChange = async (file: File) => {
    try {
      setLoading(true);
      const fileUrl = await uploadFile(file); // Carica il file e ottieni l'URL
      setFormData((prev) => ({ ...prev, fotoProfilo: fileUrl }) as UserData); // Aggiorna il campo della foto
    } catch (error) {
      console.error("Errore durante l'upload del file:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // if (name === "dataNascita") {
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: new Date(value).toISOString(),
    //   }));
    // } else {
    //   setFormData((prev) => ({ ...prev, [name]: value }));
    // }
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
    // se fotoProfilo è "", togli fotoProfilo da formData
    if (formData.fotoProfilo === "") {
      delete formData.fotoProfilo;
    }
    
    try {
      await addUser(formData);
      handleCancel();
    } catch (e) {
      console.error(e);
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
