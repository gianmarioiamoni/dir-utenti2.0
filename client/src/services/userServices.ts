import axios from "axios";
import { User, UsersResponse } from "@/interfaces/userInterfaces";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";

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

export const getTotalUsers = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}/total`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async (page: number): Promise<UsersResponse> => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      page,
      limit: 10,
      fields: "nome,cognome,email",
    },
  });
  return response.data;
};