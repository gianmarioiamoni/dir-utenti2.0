import axios from "axios";
import { User, UserData, UsersResponse } from "@/interfaces/userInterfaces";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";

// Genera un ID client univoco per la sessione
export const getClientId = () => {
  let clientId = sessionStorage.getItem('clientId');
  if (!clientId) {
    clientId = `client_${Math.random().toString(36).substring(2)}`;
    sessionStorage.setItem('clientId', clientId);
  }
  return clientId;
};

export const getTotalUsers = async (): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}/total`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// userServices.ts
export const fetchUsers = async (
  page: number, 
  nUsersPerPage: number,
  search?: string[]
): Promise<UsersResponse> => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      page,
      limit: nUsersPerPage,
      fields: "nome,cognome,email",
      search: search ? search.join(',') : undefined
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

export const updateUser = async (userId: string, userData: UserData) => {
  try {
    if (!userId) {
      throw new Error("ID utente mancante");
    }
    console.log("updateUser - userId:", userId);
    console.log("updateUser - API_URL:", API_URL);
    console.log("updateUser - full URL:", `${API_URL}/${userId}`);
    
    const clientId = getClientId();
    console.log("updateUser - clientId:", clientId);
    
    const response = await axios.put(`${API_URL}/${userId}`, userData, {
      headers: {
        'x-client-id': clientId
      }
    });
    console.log("updateUser: response", response);
    
    return response.data;
  } catch (error: any) {
    console.log("updateUser: error", error);
    throw new Error(
      error.response?.data?.message || "Errore nell'aggiornamento utente."
    );
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const clientId = getClientId();
    await axios.delete(`${API_URL}/${userId}`, {
      headers: {
        'x-client-id': clientId
      }
    });
  } catch (error: any) {
    console.error("deleteUser: error", error);
    throw new Error(
      error.response?.data?.message || "Errore nell'eliminazione utente."
    );
  }
};

export const checkUserLock = async (userId: string): Promise<boolean> => {
  console.log("checkUserLock - userId:", userId);
  try {
    const clientId = getClientId();
    console.log("checkUserLock - clientId:", clientId);
    if (!clientId) {
      throw new Error('Client ID non trovato');
    }
    
    const response = await axios.get(`${API_URL}/lock/${userId}`, {
      headers: {
        'x-client-id': clientId
      }
    });
    console.log("checkUserLock - response:", response);
    return response.data?.message === 'Lock acquisito con successo';
  } catch (error) {
    console.error("checkUserLock - error:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 423) {
        throw new Error(error.response.data.message);
      }
      if (error.response?.status === 400) {
        throw new Error('Errore nella richiesta di lock');
      }
    }
    throw new Error('Errore durante il controllo del lock');
  }
};

export const releaseLock = async (userId: string): Promise<void> => {
  try {
    const clientId = getClientId();
    if (!clientId) {
      throw new Error('Client ID non trovato');
    }
    
    await axios.delete(`${API_URL}/lock/${userId}`, {
      headers: {
        'x-client-id': clientId
      }
    });
  } catch (error) {
    console.error('Error releasing lock:', error);
    // Non lanciamo l'errore perché il rilascio del lock non dovrebbe bloccare l'utente
  }
};