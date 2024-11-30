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
