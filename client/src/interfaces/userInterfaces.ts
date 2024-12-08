export interface User {
  _id: string;
  nome: string;
  cognome: string;
  email: string;
  dataNascita: Date;
  fotoProfilo: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
}

export interface UserFormErrors {
  nome?: string;
  cognome?: string;
  email?: string;
  dataNascita?: string;
  serverError?: string;
}

export interface UserData {
  nome: string;
  cognome: string;
  email: string;
  dataNascita: string;
  fotoProfilo?: string | null;
}