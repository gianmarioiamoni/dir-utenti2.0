"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetchUsers } from "@/services/userServices";
import { useMessage } from "@/hooks/useMessage";
import { addUser } from "@/services/userServices";
import { User, UserData } from "@/interfaces/userInterfaces";

export const useUsers = (page: number) => {
  const [addUserError, setAddUserError] = useState<string | null>(null);
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

  const addUser = async (userData: FormData) => {
    try {
      const newUser = await addUser(userData);
      mutate(
        (currentData: any) => ({
          ...currentData,
          users: [newUser, ...currentData.users],
        }),
        false
      );
      setAddUserError(null);
    } catch (error: any) {
      setAddUserError(
        error.response?.data?.message || "Errore nell'aggiunta utente."
      );
      throw error;
    }
  };


  return {
    data,
    error,
    isError: !!error,
    // isLoading: !data && !error,
    isLoading,
    isValidating,
    mutate, // Per aggiornare manualmente i dati
    addUser,
    addUserError
  };
};
