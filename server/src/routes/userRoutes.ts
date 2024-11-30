import { Router } from "express";
import { validateUser } from "../validators/userValidator";

import {
  getUsers,
  getUserById,
  createUser,
} from "../controllers/userController";

const router: Router = Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ottieni tutti gli utenti
 *     description: Restituisce una lista di tutti gli utenti registrati.
 *     responses:
 *       200:
 *         description: Lista degli utenti.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   cognome:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/", getUsers); 

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Ottieni un utente per ID
 *     description: Restituisce i dettagli di un singolo utente specificato dall'ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID univoco dell'utente.
 *     responses:
 *       200:
 *         description: Dettagli dell'utente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 cognome:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Utente non trovato.
 */
router.get("/:id", getUserById); 

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuovo utente
 *     description: Aggiunge un nuovo utente al database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utente creato con successo.
 *       400:
 *         description: Dati non validi.
 */
router.post("/", validateUser, createUser); 

export default router;
