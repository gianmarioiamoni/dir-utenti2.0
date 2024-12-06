import axios from "axios";
import { User, UsersResponse } from "@/interfaces/userInterfaces";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";

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

export const getUserDetails = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei dettagli utente:", error);
    throw error;
  }
};

export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  const birthdayDate = new Date(birthDate);
  let age = today.getFullYear() - birthdayDate.getFullYear();
  const monthDifference = today.getMonth() - birthdayDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdayDate.getDate())
  ) {
    age--;
  }

  return age;
};