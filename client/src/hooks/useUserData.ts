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
  } as UserData);

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);

  if (mode === "edit" && _id) {
    const {
      data: user,
      error,
      isLoading,
      isValidating,
      mutate,
    } = useSWR(["user", _id], () => getUserDetails(_id), {
      keepPreviousData: true, // Non esiste una proprietà esplicita in SWR, ma i dati precedenti vengono mantenuti automaticamente
      revalidateOnFocus: true, // Default: ricarica i dati quando la finestra torna attiva
      revalidateIfStale: true, // Default: ricarica i dati se sono considerati stantii
      dedupingInterval: 5000, // Tempo minimo tra richieste duplicate
    });

    useEffect(() => {
      if (user) {
        const dataNascita =
          user.dataNascita !== null && user.dataNascita !== undefined
            ? typeof user.dataNascita === "string"
              ? (user.dataNascita as string).split("T")[0]
              : dayjs(user.dataNascita).format("yyyy-MM-dd")
            : null;
        setFormData({
          nome: user.nome,
          cognome: user.cognome,
          email: user.email,
          dataNascita: dataNascita ?? "",
          fotoProfilo: user.fotoProfilo,
        });
      }
    }, [user]);
  }

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
      }));
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

    if (formData.fotoProfilo === "") {
      delete formData.fotoProfilo;
    }

    try {
      const response =
        mode === "create"
          ? await addUser(formData)
          : await updateUser(_id, formData);

      if (onSuccess) {
        onSuccess();
      }
      handleCancel();
    } catch (err: any) {
      console.error("Error:", err);
      if (err.response?.status === 423) {
        showError(err.response.data.message || "L'utente è bloccato da un altro client");
      } else {
        showError(err.message || "Si è verificato un errore");
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
