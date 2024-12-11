import { useState } from "react";

import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useUsers } from "@/hooks/useUsers";


interface UserCardProps {
    _id: string;
    page: number;
}

export const useUserCard = ({ _id, page }: UserCardProps) => {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);


  // Delete logic
  const { mutate } = useUsers(page); // Ottiene la funzione di mutazione
  const { handleDeleteUser, isDeleting } = useDeleteUser(() => {
    // Ricarica la lista degli utenti dopo la cancellazione
    mutate();
    setIsConfirmDialogOpen(false);
  });
  //
  const handleUserClick = () => {
    router.push(`/user/${_id}`);
  };

  const confirmDelete = () => {
    setIsConfirmDialogOpen(true);
  };

  const cancelDelete = () => {
    setIsConfirmDialogOpen(false);
  };

  const proceedDelete = () => {
    handleDeleteUser(_id);
  };

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return {
    // Funzioni per la gestione della card utente
    isHovered,
    setIsHovered,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
    handleUserClick,
    isDeleting,
    handleDeleteUser,
    confirmDelete,
    cancelDelete,
    proceedDelete,
    openEditDialog,
    closeEditDialog,
  };
};