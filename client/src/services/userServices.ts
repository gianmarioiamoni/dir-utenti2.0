
import axios from "axios";
import { User, UsersResponse } from "@/interfaces/userInterfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";

// export const fetchUsers = async (
//   page: number,
//   limit: number
// ): Promise<FetchUsersResponse> => {
//   try {
//     const response = await axios.get(`${API_URL}/users`, {
//       params: { page, limit, fields: "nome,cognome,email" },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


export const fetchUsers = async (): Promise<UsersResponse> => {
  const user: User = {
    _id: "1",
    nome: "Gianmario",
    cognome: "Iamoni",
    email: "gianmarioiamoni1@gmail.com",
    dataNascita: new Date("1990-01-01"),
    fotoProfilo: "https://example.com/profile.jpg",
  };
  return { users: [user], total: 1 };
};

export const getTotalUsers = async (): Promise<number> => {
    try {
        const response = await axios.get(`${API_URL}/total`);
        return response.data;
    } catch (error) {
        throw error;
    }
};