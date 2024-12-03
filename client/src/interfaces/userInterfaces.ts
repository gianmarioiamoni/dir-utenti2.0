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
