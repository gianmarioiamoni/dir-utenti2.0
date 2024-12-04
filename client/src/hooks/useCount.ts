// src/hooks/useCount.ts
import { getTotalUsers } from "@/services/userServices";

export function useCount() {
  async function fetchUserCount() {
    try {
      const userCount = await getTotalUsers();
      return { userCount, error: null };
    } catch (error) {
      return {
        userCount: 0,
        error:
          error instanceof Error && error.message
            ? error.message
            : "Errore nel caricamento dati",
      };
    }
  }

  return {
    fetchUserCount,
  };
}
