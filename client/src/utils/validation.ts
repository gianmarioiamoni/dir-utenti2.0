import { UserData } from "@/interfaces/userInterfaces";

const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const validateUser = (user: UserData): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Nome validation
  if (!user.nome || !/^[A-Za-z\s']+$/.test(user.nome)) {
    errors.nome =
      "Nome non valido. Sono ammesse solo lettere, spazi e apostrofo.";
  }

  // Cognome validation
  if (!user.cognome || !/^[A-Za-z\s']+$/.test(user.cognome)) {
    errors.cognome =
      "Cognome non valido. Sono ammesse solo lettere, spazi e apostrofo.";
  }

  // Email validation
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = "Email non valida";
  }

  // Data di nascita validation
  if (!user.dataNascita) {
    errors.dataNascita = "Data di nascita obbligatoria";
  } else {
    // const age = calculateAge(user.dataNascita.toISOString().split("T")[0]);
    const age = calculateAge(user.dataNascita.split("T")[0]);
    console.log("validazione età:", age);
    if (age < 14) {
      errors.dataNascita = "Devi avere almeno 14 anni";
    }
  }

  return errors;
};
