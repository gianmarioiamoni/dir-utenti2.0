import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useUsers } from "@/hooks/useUsers";
import { checkUserLock, releaseLock } from "@/services/userServices";
import { useMessage } from "@/hooks/useMessage";

interface UserCardProps {
    _id: string;
    page: number;
}

export const useUserCard = ({ _id, page }: UserCardProps) => {
  const router = useRouter();
  const { showError } = useMessage();

  const [isHovered, setIsHovered] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Delete logic
  const { mutate } = useUsers(page);
  const { handleDeleteUser, isDeleting } = useDeleteUser(() => {
    mutate();
    setIsConfirmDialogOpen(false);
  });

  const handleUserClick = () => {
    router.push(`/user/${_id}`);
  };

  const confirmDelete = async () => {
    try {
      await checkUserLock(_id);
      setIsConfirmDialogOpen(true);
    } catch (error) {
      showError((error as Error).message);
    }
  };

  const cancelDelete = () => {
    setIsConfirmDialogOpen(false);
  };

  const proceedDelete = () => {
    handleDeleteUser(_id);
  };

  const openEditDialog = async () => {
    try {
      await checkUserLock(_id);
      setIsEditDialogOpen(true);
    } catch (error) {
      showError((error as Error).message);
    }
  };

  const closeEditDialog = async () => {
    try {
      await releaseLock(_id);
    } catch (error) {
      console.error('Error releasing lock:', error);
    } finally {
      setIsEditDialogOpen(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    isHovered,
    setIsHovered,
    isEditDialogOpen,
    isConfirmDialogOpen,
    isDeleting,
    handleUserClick,
    confirmDelete,
    cancelDelete,
    proceedDelete,
    openEditDialog,
    closeEditDialog,
    handleMouseEnter,
    handleMouseLeave,
  };
};