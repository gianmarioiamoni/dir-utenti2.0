// src/hooks/useCount.ts
import { useQuery } from "@tanstack/react-query";
import { getTotalUsers } from "@/services/userServices";

export function useCount() {
  const {
    data: userCount = 0,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["total"],
    queryFn: getTotalUsers,
    staleTime: 30000,
  });

  return {
    userCount,
    isLoading,
    isError,
  };
}
