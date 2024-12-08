import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";

import { CustomError } from "../utils/CustomError";

import User from "../models/User";

// Get all users (with pagination)
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = 10, fields = "nome cognome email" } = req.query;

  // Validazione esplicita dei parametri non validi
  if (
    !Number.isInteger(Number(page)) ||
    Number(page) <= 0 ||
    !Number.isInteger(Number(limit)) ||
    Number(limit) <= 0
  ) {
    return next(new Error("Invalid pagination parameters"));
  }

  try {
    const users = await User.find({}, fields.toString().split(",").join(" "))
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    
    const total = await User.countDocuments();

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
    res.json( total );
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
) => {
  console.log("req.body", req.body);
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Errore di validazione:", errors.array());
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return next(
        new CustomError("Nessun valore fornito nel body della richiesta.", 400)
      );
    }


    const { nome, cognome, email, dataNascita, fotoProfilo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        "Email già in uso. Utilizzare un altro indirizzo email.",
        409
      );
    }

    const newUser = new User({
      nome,
      cognome,
      email,
      dataNascita,
      fotoProfilo,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};