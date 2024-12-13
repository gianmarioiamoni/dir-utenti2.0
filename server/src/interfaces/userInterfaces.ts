import { Document } from 'mongoose';

export interface IUser extends Document {
    nome: string;
    cognome: string;
    email: string;
    dataNascita: Date;
    fotoProfilo?: string;
}

export interface UserData {
    nome: string;
    cognome: string;
    email: string;
    dataNascita: string;  
    fotoProfilo?: string;
}
