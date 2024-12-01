// utils/CustomError.ts
// export class CustomError extends Error {
//   status: number;

//   constructor(message: string, status: number) {
//     super(message);
//     this.status = status;

//     // Imposta il prototipo correttamente per le sottoclassi
//     Object.setPrototypeOf(this, CustomError.prototype);
//   }
// }
export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);

    // Imposta il nome dell'errore
    this.name = this.constructor.name;
    this.status = status;

    // Imposta il prototipo correttamente per le sottoclassi
    Object.setPrototypeOf(this, CustomError.prototype);

    // Cattura lo stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

