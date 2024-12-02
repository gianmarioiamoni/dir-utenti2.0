// src/hooks/useUsers.ts
import { useQuery } from "react-query";

interface User {
    _id: string;
    nome: string;
    cognome: string;
    email: string;
    dataNascita: Date;
    fotoProfilo: string;
}

interface UsersResponse {
    users: User[];
    total: number;
}


// fetchUsers restituisce una promise oggetto {users: User[], total: number}
const fetchUsers = async (): Promise<UsersResponse> => {
  // Sostituisci con l'API reali quando disponibile
    const user: User = {
      _id: "1",
      nome: "Gianmario",
      cognome: "Iamoni",
      email: "gianmarioiamoni1@gmail.com",
      dataNascita: new Date("1990-01-01"),
      fotoProfilo: "https://example.com/profile.jpg",
    }
    return {users: [user], total: 1};
}

export function useUsers() {
  const { data, isLoading, error } = useQuery<UsersResponse, Error>(
    "users",
    fetchUsers
  );

  return {
    userCount: data?.users?.length ?? 0,
    isLoading,
    error,
  };
}



