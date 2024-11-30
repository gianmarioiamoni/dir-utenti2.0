import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  nome: string;
  cognome: string;
  email: string;
  dataNascita: Date;
  fotoProfilo?: string; // optional
}

const UserSchema: Schema = new Schema<IUser>({
  nome: { type: String, required: [true, "Il nome è obbligatorio."] },
  cognome: { type: String, required: [true, "Il cognome è obbligatorio."] },
  email: {
    type: String,
    required: [true, "L'email è obbligatoria."],
    unique: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Email non valida.",
    },
  },
  dataNascita: {
    type: Date,
    required: [true, "La data di nascita è obbligatoria."],
    validate: {
      validator: (value: Date) => value <= new Date(),
      message: "La data di nascita deve essere nel passato.",
    },
  },
  fotoProfilo: { type: String },
});


const User = mongoose.model<IUser>("User", UserSchema);

export default User;
