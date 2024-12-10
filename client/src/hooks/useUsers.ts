"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetchUsers } from "@/services/userServices";

export const useUsers = (page: number) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ["users", page],
    () => fetchUsers(page),
    {
      keepPreviousData: true, // Non esiste una proprietà esplicita in SWR, ma i dati precedenti vengono mantenuti automaticamente
      revalidateOnFocus: true, // Default: ricarica i dati quando la finestra torna attiva
      revalidateIfStale: true, // Default: ricarica i dati se sono considerati stantii
      dedupingInterval: 5000, // Tempo minimo tra richieste duplicate
    }
  );


  return {
    data,
    isModalOpen,
    onCloseModal,
    onOpenModal,
    error,
    isError: !!error,
    isLoading,
    isValidating,
    mutate, // Per aggiornare manualmente i dati
  };
};
