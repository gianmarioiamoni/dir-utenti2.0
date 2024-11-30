import { body } from "express-validator";
import dayjs from "dayjs";


const customEscape = (value: string): string => {
  // Elimina caratteri pericolosi ma preserva accenti, apostrofi e trattini
  return value
    .replace(/[<>]/g, "") // Rimuovi < e > per prevenire XSS
    .replace(/"/g, "&quot;") // Escape per "
    .replace(/\\/g, "\\\\"); // Escape per \ (backslash)
};

export const validateUser = [
  body("nome")
    .notEmpty()
    .withMessage("Il nome è obbligatorio")
    .isLength({ min: 2 })
    .withMessage("Il nome deve avere almeno 2 caratteri")
    .matches(/^[a-zA-ZÀ-ÿ' -]+$/u)
    .withMessage("Il nome può contenere solo lettere e spazi")
    .trim()
    .customSanitizer(customEscape), // Escape personalizzato,
  body("cognome")
    .notEmpty()
    .withMessage("Il cognome è obbligatorio")
    .isLength({ min: 2 })
    .withMessage("Il cognome deve avere almeno 2 caratteri")
    .matches(/^[a-zA-ZÀ-ÿ' -]+$/u)
    .withMessage("Il cognome può contenere solo lettere e spazi")
    .trim()
    .customSanitizer(customEscape), // Escape personalizzato,
  body("email")
    .notEmpty()
    .withMessage("L'email è obbligatoria")
    .isEmail()
    .withMessage("Inserire un'email valida")
    .trim(),
  body("dataNascita")
    .notEmpty()
    .withMessage("La data di nascita è obbligatoria")
    .isISO8601()
    .withMessage("Inserire una data valida (formato ISO8601, es. YYYY-MM-DD)")
    .custom((value) => {
      const age = dayjs().diff(dayjs(value), "year");
      if (age < 14) {
        throw new Error("Devi avere almeno 14 anni");
      }
      return true;
    }),
  body("fotoProfilo")
    .optional()
    .isURL()
    .withMessage("Inserire un URL valido per la foto profilo")
    .trim(),
];
