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
  try {
    const response = await axios.post(`${API_URL}`, userData);
    console.log("addUser: response", response);
    return response.data;
  } catch (error: any) {
    console.log("addUser: error", error);
    throw new Error(error.response?.data?.message || "Errore nella creazione utente.");
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error: any) {
    console.log("deleteUser: error", error);
    throw new Error(
      error.response?.data?.message || "Errore nella cancellazione utente."
    );
  }
};


// export const uploadProfileImage = async (file: File) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append(
//       "upload_preset",
//       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
//     );

//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       formData
//     );

//     return response.data.secure_url;
//   } catch (error) {
//     throw error;
//   }
// };