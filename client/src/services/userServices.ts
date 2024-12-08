import axios from "axios";
import { User, UserData, UsersResponse } from "@/interfaces/userInterfaces";

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


export const addUser = async (userData: UserData) => {
  // console.log("addUser - userData", userData);
  // // const response = await axios.post(`${API_URL}`, userData, {
  // //   headers: { "Content-Type": "multipart/form-data" },
  // // });
  // const response = await axios.post(`${API_URL}`, userData);
  // return response.data;

  try {
    const response = await axios.post(`${API_URL}`, userData);

    // Check if response contains status 409 (email già in uso)
    // if (response.status === 409) {
    //   throw new Error("Email già in uso.");
    // }
    return response.data;
  } catch (error: any) {
    // if (error.response?.status === 409) {
    //   throw new Error("Email già in uso. Utilizzare un altro indirizzo email.");
    // }
    // throw new Error("Errore durante l'aggiunta dell'utente.");
    return error;
  }
};


export const uploadProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    throw error;
  }
};