import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";

import { redisService } from "../services/redisService";
import { io } from "../services/socketService";

import { CustomError } from "../utils/CustomError";

import User from "../models/User";

// Get all users (with pagination)
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    page = 1,
    limit = 10,
    fields = "nome cognome email",
    search,
  } = req.query;

  // Validazione parametri
  if (
    !Number.isInteger(Number(page)) ||
    Number(page) <= 0 ||
    !Number.isInteger(Number(limit)) ||
    Number(limit) <= 0
  ) {
    return next(new Error("Invalid pagination parameters"));
  }

  try {
    const query = search
      ? {
          $or: search
            .toString()
            .split(",")
            .map((term) => ({
              $or: [
                { nome: { $regex: term, $options: "i" } },
                { cognome: { $regex: term, $options: "i" } },
                { email: { $regex: term, $options: "i" } },
              ],
            })),
        }
      : {};

    const users = await User.find(query, fields.toString().split(",").join(" "))
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({ users, total });
    return;
  } catch (err) {
    next(err);
    return;
  }
};

// Get total number of users
export const getTotalUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const total = await User.countDocuments();
    res.json(total);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Verifica se l'ID fornito è valido
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({ message: "Invalid user ID format" });
    return;
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { nome, cognome, email, dataNascita, fotoProfilo } = req.body;

    const newUser = new User({
      nome,
      cognome,
      email,
      dataNascita,
      fotoProfilo,
    });

    await newUser.save();
    // Notifica tutti i client della creazione tranne quello che ha creato l'utente
    io.emit("userCreated", {
      message: `Nuovo utente creato: ${newUser.nome} ${newUser.cognome}`,
      user: {
        nome: newUser.nome,
        cognome: newUser.cognome,
        email: newUser.email,
        dataNascita: newUser.dataNascita.toISOString().split("T")[0],
        fotoProfilo: newUser.fotoProfilo,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("updateUser - req.params:", req.params);
  console.log("updateUser - req.body:", req.body);
  console.log("updateUser - req.headers:", req.headers);

  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Errore di validazione:", errors.array());
      next(new CustomError("Validation error", 400));
      return;
    }

    const { id } = req.params;
    console.log("updateUser - id estratto:", id);

    const { nome, cognome, email, dataNascita, fotoProfilo } = req.body;

    if (!id) {
      next(new CustomError("ID utente mancante", 400));
      return;
    }

    // Verifica che l'ID sia un ObjectId valido
    if (!isValidObjectId(id)) {
      next(new CustomError("ID utente non valido", 400));
      return;
    }

    // Trova l'utente da modificare
    const userToUpdate = await User.findById(id);
    console.log("updateUser - userToUpdate:", userToUpdate);

    if (!userToUpdate) {
      next(new CustomError("Utente non trovato", 404));
      return;
    }

    // Verifica email se è cambiata
    if (email !== userToUpdate.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        next(
          new CustomError(
            "Email già in uso. Utilizzare un altro indirizzo email.",
            409
          )
        );
        return;
      }
    }

    // Aggiorna l'utente
    userToUpdate.nome = nome;
    userToUpdate.cognome = cognome;
    userToUpdate.email = email;
    userToUpdate.dataNascita = dataNascita;

    if (fotoProfilo) {
      userToUpdate.fotoProfilo = fotoProfilo;
    }

    await userToUpdate.save();

    // Invia una risposta di successo
    res.status(200).json({
      message: "Utente aggiornato con successo",
      user: userToUpdate,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: "ID utente non valido" });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Utente non trovato" });
      return;
    }

    await User.findByIdAndDelete(id);
    // Rimuovi il lock se presente
    await redisService.removeLock(id);

    // Notifica tutti i client della cancellazione tranne quello che ha cancellato l'utente
    io.emit("userDeleted", {
      message: `Utente eliminato: ${user.nome} ${user.cognome}`,
      user: {
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        dataNascita: user.dataNascita.toISOString().split("T")[0],
        fotoProfilo: user.fotoProfilo,
      },
    });
    
    res.status(200).json({ message: "Utente eliminato con successo" });
  } catch (err) {
    next(err);
  }
};

export const checkUserLock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const clientId = req.headers["x-client-id"] as string;

  if (!clientId) {
    res.status(400).json({ message: "Client ID is required" });
    return;
  }

  try {
    const isLocked = await redisService.checkLock(id);
    if (isLocked) {
      res.status(423).json({ message: "Utente bloccato da un altro client" });
    } else {
      // Se non è bloccato, proviamo ad acquisire il lock
      const lockAcquired = await redisService.acquireLock(id, clientId);
      if (lockAcquired) {
        res.status(200).json({ message: "Lock acquisito con successo" });
      } else {
        res
          .status(423)
          .json({ message: "Non è stato possibile acquisire il lock" });
      }
    }
  } catch (error) {
    next(error);
  }
};
