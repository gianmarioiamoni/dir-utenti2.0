import { useState, useEffect } from "react";
import useSWR from "swr";
import dayjs from "dayjs";

import { addUser, getUserDetails, updateUser } from "@/services/userServices";
import { uploadFile } from "@/services/uploadServices";
import { validateUser } from "@/utils/validation";
import { UserData } from "@/interfaces/userInterfaces";
import { useMessage } from "@/hooks/useMessage";

interface useUserDataProps {
  onClose: () => void;
  onSuccess: () => void;
  _id?: string;
  initialData?: UserData;
  mode?: "create" | "edit";
}

export const useUserData = ({
  onClose,
  onSuccess,
  _id = "",
  mode = "create",
}: useUserDataProps) => {
  const { showError } = useMessage();

  const [formData, setFormData] = useState<UserData>({
    nome: "",
    cognome: "",
    email: "",
    dataNascita: "",
    fotoProfilo: "",
  });

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);

  const { data: user } = useSWR(
    mode === "edit" && _id ? ["user", _id] : null,
    () => (_id ? getUserDetails(_id) : null)
  );

  useEffect(() => {
    if (user && mode === "edit") {
      setFormData({
        nome: user.nome || "",
        cognome: user.cognome || "",
        email: user.email || "",
        dataNascita: user.dataNascita ? dayjs(user.dataNascita).format("YYYY-MM-DD") : "",
        fotoProfilo: user.fotoProfilo || "",
      });
    }
  }, [user, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors(null);

    try {
      // Validazione
      const errors = validateUser(formData);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      if (mode === "create") {
        await addUser(formData);
      } else {
        await updateUser(_id, formData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      showError(error instanceof Error ? error.message : "Si è verificato un errore");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      const fileUrl = await uploadFile(file);
      setFormData((prev) => ({ ...prev, fotoProfilo: fileUrl }));
    } catch (error) {
      showError(error instanceof Error ? error.message : "Errore durante il caricamento del file");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    loading,
    validationErrors,
    handleSubmit,
    handleFileUpload,
    handleChange,
  };
};
