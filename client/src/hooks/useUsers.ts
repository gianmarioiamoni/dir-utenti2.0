// src/hooks/useUsers.ts
import {useState} from "react";
import { useQuery } from "react-query"; 

import { User, UsersResponse } from "@/interfaces/userInterfaces";
import { fetchUsers, getTotalUsers } from "@/services/userServices";



export async function useUsers() {
    const [error, setError] = useState(null);
    const userCount = await getTotalUsers();
    

  return {
    userCount,
  };
}



