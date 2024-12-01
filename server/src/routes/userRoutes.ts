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
 *     description: Restituisce una lista di tutti gli utenti registrati, con supporto per la paginazione.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numero della pagina da visualizzare.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Numero di utenti da mostrare per pagina.
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *           default: "nome cognome email"
 *         description: Campi degli utenti da includere nella risposta, separati da spazi.
 *     responses:
 *       200:
 *         description: Lista degli utenti con metadati di paginazione.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nome:
 *                         type: string
 *                       cognome:
 *                         type: string
 *                       email:
 *                         type: string
 *                 total:
 *                   type: integer
 *                   description: Numero totale di utenti disponibili.
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Ottieni un utente per ID
 *     description: Restituisce i dettagli di un singolo utente specificato dall'ID. L'ID deve essere un ObjectId valido.
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
 *       400:
 *         description: Formato dell'ID non valido.
 *       404:
 *         description: Utente non trovato.
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuovo utente
 *     description: Aggiunge un nuovo utente al database. L'email deve essere univoca.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cognome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome dell'utente.
 *               cognome:
 *                 type: string
 *                 description: Cognome dell'utente.
 *               email:
 *                 type: string
 *                 description: Email univoca dell'utente.
 *               dataNascita:
 *                 type: string
 *                 format: date
 *                 description: Data di nascita dell'utente (opzionale).
 *               fotoProfilo:
 *                 type: string
 *                 description: URL della foto profilo (opzionale).
 *     responses:
 *       201:
 *         description: Utente creato con successo.
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
 *                 dataNascita:
 *                   type: string
 *                   format: date
 *                 fotoProfilo:
 *                   type: string
 *       400:
 *         description: Dati non validi o mancanti.
 *       409:
 *         description: Email già in uso.
 */
router.post("/", validateUser, createUser);


export default router;
