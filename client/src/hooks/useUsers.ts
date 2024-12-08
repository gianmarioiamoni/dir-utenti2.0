"use client";

import useSWR from "swr";
import { fetchUsers } from "@/services/userServices";

export const useUsers = (page: number) => {
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
    error,
    isError: !!error,
    // isLoading: !data && !error,
    isLoading,
    isValidating,
    mutate, // Per aggiornare manualmente i dati
  };
};
