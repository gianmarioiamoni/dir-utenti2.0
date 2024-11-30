# dir-utenti 2.0

## Release Notes
### 2.0 2024-11-29

### Server

#### Added
- aggiunta validazione di base nello schema Mongoose:
```
const UserSchema: Schema = new Schema<IUser>({
  nome: { type: String, required: [true, "Il nome è obbligatorio."] },
  cognome: { type: String, required: [true, "Il cognome è obbligatorio."] },
  email: { 
    type: String, 
    required: [true, "L'email è obbligatoria."], 
    unique: true, 
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Email non valida."
    }
  },
  dataNascita: { 
    type: Date, 
    required: [true, "La data di nascita è obbligatoria."],
    validate: {
      validator: (value: Date) => value <= new Date(),
      message: "La data di nascita deve essere nel passato."
    }
  },
  fotoProfilo: { type: String },
});
```
- Aggiunta sanitizzazione dei dati utilizzando express-validator, per evitare attacchi di tipo XSS o injection

#### Changed
- Migliorata la gestione degli errori logici, ora uniformata nel middleware errorHandling mediante:
1. definizione di una classe CustomeErro che estende la classe standard Error:
```
// utils/CustomError.ts
export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;

    // Imposta il prototipo correttamente per le sottoclassi
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
```
2. utilizzo nel controller per gestire errori specifici:
```
// Verifica se l'email esiste già
const existingUser = await User.findOne({ email });
if (existingUser) {
  throw new CustomError("Email già in uso. Utilizzare un altro indirizzo email.", 409);
}
```
3. Adattamento del middleware per gestire errori personalizzati:
```
// Gestione degli errori personalizzati
const statusCode = err instanceof CustomError ? err.status : 500;
const message = err instanceof CustomError ? err.message : "Errore del server.";
```



