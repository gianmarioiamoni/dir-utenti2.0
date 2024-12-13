import { Router } from "express";
import { validateUser } from "../validators/userValidator";
import { checkUserLock, acquireUserLock, releaseUserLock, verifyLockOwnership } from "../middlewares/userLockMiddleware";

import {
  getUsers,
  getTotalUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController";

const router: Router = Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all registered users with pagination support and search capabilities.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users to show per page.
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *           default: "name surname email"
 *         description: User fields to include in the response, separated by spaces.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter users by name, surname, or email.
 *     responses:
 *       200:
 *         description: List of users with pagination metadata.
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
 *                       name:
 *                         type: string
 *                       surname:
 *                         type: string
 *                       email:
 *                         type: string
 *                 total:
 *                   type: integer
 *                   description: Total number of available users.
 *                 page:
 *                   type: integer
 *                   description: Current page number.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 */
router.get("/", getUsers);

/**
 * @swagger
 * /total:
 *   get:
 *     summary: Ottieni il numero totale di utenti
 *     description: Restituisce il numero totale di documenti nella collezione degli utenti.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Numero totale di utenti restituito con successo.
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 150
 *       500:
 *         description: Errore interno del server.
 */
router.get("/total", getTotalUsers);

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

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Aggiorna un utente
 *     description: Aggiorna i dati di un utente esistente. Richiede il lock sull'utente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente da aggiornare
 *       - in: header
 *         name: x-client-id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del client che richiede la modifica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cognome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utente aggiornato con successo
 *       400:
 *         description: Dati non validi
 *       423:
 *         description: Non hai il lock per questo utente
 *       404:
 *         description: Utente non trovato
 */
router.put("/:id", validateUser, verifyLockOwnership, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un utente
 *     description: Elimina un utente esistente. Richiede il lock sull'utente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente da eliminare
 *       - in: header
 *         name: x-client-id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del client che richiede l'eliminazione
 *     responses:
 *       200:
 *         description: Utente eliminato con successo
 *       423:
 *         description: Non hai il lock per questo utente
 *       404:
 *         description: Utente non trovato
 */
router.delete("/:id", verifyLockOwnership, deleteUser);

/**
 * @swagger
 * /users/lock/{id}:
 *   get:
 *     summary: Verifica e acquisisce il lock per un utente
 *     description: Controlla se un utente è bloccato e, se non lo è, tenta di acquisire il lock
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *       - in: header
 *         name: x-client-id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del client che richiede il lock
 *     responses:
 *       200:
 *         description: Lock acquisito con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lock acquisito con successo
 *       423:
 *         description: Utente bloccato da un altro client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utente bloccato da un altro client
 *       400:
 *         description: Client ID mancante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Client ID is required
 */
router.get('/lock/:id', checkUserLock);

/**
 * @swagger
 * /users/lock/{id}:
 *   delete:
 *     summary: Rilascia il lock per un utente
 *     description: Rilascia il lock precedentemente acquisito per un utente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *       - in: header
 *         name: x-client-id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del client che rilascia il lock
 *     responses:
 *       200:
 *         description: Lock rilasciato con successo
 *       400:
 *         description: Client ID mancante
 *       404:
 *         description: Lock non trovato
 */
router.delete('/lock/:id', releaseUserLock, (req, res) => {
  res.status(200).json({ message: 'Lock rilasciato con successo' });
});

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


export default router;
