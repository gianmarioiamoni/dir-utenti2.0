import { useState } from "react";
import { deleteUser } from "@/services/userServices";
import { useMessage } from "./useMessage";

export const useDeleteUser = (onSuccessDelete?: () => void) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { showSuccess, showError } = useMessage();

  const handleDeleteUser = async (userId: string) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteUser(userId);
      showSuccess("Utente cancellato con successo");

      // Esegue la callback di successo se fornita
      if (onSuccessDelete) {
        onSuccessDelete();
      }
    } catch (error: any) {
      const errorMessage =
        error.message || "Errore durante la cancellazione dell'utente";
      showError(errorMessage);
      setDeleteError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDeleteUser,
    isDeleting,
    deleteError,
  };
};
