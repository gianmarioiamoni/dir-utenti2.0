import { mock } from "jest-mock-extended";
import { getUsers, getUserById, createUser } from "../controllers/userController";
import { Request, Response, NextFunction } from "express";
import { mockDeep, MockProxy } from "jest-mock-extended";
import User from "../models/User";
import { validationResult, Result, ValidationError } from "express-validator";
import { CustomError } from "../utils/CustomError";


//
// GetUsers()
// 
describe("getUsers controller with jest-mock-extended", () => {
  it("should return a paginated list of users", async () => {
    // Crea un mock per il modello User
    const mockUserModel = mock<typeof User>();
    mockUserModel.find.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest
        .fn()
        .mockResolvedValue([
          { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
        ]),
    } as any); // Tipizzazione necessaria per concatenazione di metodi
    mockUserModel.countDocuments.mockResolvedValue(1);

    // Mock di req, res, next
    const req = {
      query: { page: "1", limit: "1", fields: "firstName lastName email" },
    } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    // Sostituisce il modello originale con il mock
    jest.spyOn(User, "find").mockImplementation(mockUserModel.find);
    jest
      .spyOn(User, "countDocuments")
      .mockImplementation(mockUserModel.countDocuments);

    // Chiama il controller
    await getUsers(req, res, next);

    // Verifica il comportamento
    expect(res.json).toHaveBeenCalledWith({
      users: [
        { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
      ],
      total: 1,
    });

    // Assicura che i metodi mockati siano stati chiamati correttamente
    expect(mockUserModel.find).toHaveBeenCalledWith(
      {},
      "firstName lastName email"
    );
    expect(mockUserModel.countDocuments).toHaveBeenCalled();

    // Ripristina i mock
    jest.restoreAllMocks();
  });

  it("should handle errors gracefully", async () => {
    const mockUserModel = mock<typeof User>();
    mockUserModel.find.mockImplementation(() => {
      throw new Error("Database error");
    });

    jest.spyOn(User, "find").mockImplementation(mockUserModel.find);

    // Mock di req, res e next
    const req = {
      query: {},
    } as unknown as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    await getUsers(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error("Database error"));

    jest.restoreAllMocks();
  });

  it("should handle invalid query parameters gracefully", async () => {
    const req = {
      query: { page: "invalid", limit: "-5" }, // Parametri non validi
    } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    // Mock di User.find per evitare errori durante la chiamata
    jest.spyOn(User, "find").mockImplementation(
      () =>
        ({
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue([]),
        } as any)
    );

    jest.spyOn(User, "countDocuments").mockResolvedValue(0);

    await getUsers(req, res, next);

    // Verifica che il middleware di errore sia stato chiamato
    expect(next).toHaveBeenCalledWith(
      new Error("Invalid pagination parameters")
    );

    // Assicura che la risposta non venga inviata
    expect(res.json).not.toHaveBeenCalled();

    // Ripristina i mock
    jest.restoreAllMocks();
  });

  it("should return the correct users based on pagination parameters", async () => {
    const req = {
      query: { page: "2", limit: "1" }, // Pagina 2, limite 1
    } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    // Mock di User.find
    jest.spyOn(User, "find").mockImplementation(
      () =>
        ({
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue([
            {
              firstName: "Jane",
              lastName: "Doe",
              email: "jane.doe@example.com",
            },
          ]),
        } as any)
    );

    // Mock di User.countDocuments
    jest.spyOn(User, "countDocuments").mockResolvedValue(2);

    // Esegui il controller
    await getUsers(req, res, next);

    // Verifica che res.json sia stato chiamato con il risultato atteso
    expect(res.json).toHaveBeenCalledWith({
      users: [
        { firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com" },
      ],
      total: 2,
    });

    // Assicura che next non sia stato chiamato
    expect(next).not.toHaveBeenCalled();

    // Ripristina i mock
    jest.restoreAllMocks();
  });

  it("should return an empty list if no users are found", async () => {
    const req = {
      query: { page: "1", limit: "10" },
    } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    // Mock di User.find
    const findMock = jest.spyOn(User, "find").mockReturnValueOnce({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([]),
    } as any);

    // Mock di User.countDocuments
    jest.spyOn(User, "countDocuments").mockResolvedValueOnce(0);

    await getUsers(req, res, next);

    expect(findMock).toHaveBeenCalled(); // Verifica che il mock sia stato chiamato
    expect(res.json).toHaveBeenCalledWith({
      users: [],
      total: 0,
    });

    jest.restoreAllMocks();
  });


  // Add more test cases
});

//
// GetUserById()
//
describe("getUserById controller with jest-mock-extended", () => {
  it("should return the user if found", async () => {
    // Passiamo un ID valido di 24 caratteri esadecimali
    const req = {
      params: { id: "605c72ef1532073e88a4c5b0" },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    // Mock per il metodo findById
    jest.spyOn(User, "findById").mockResolvedValueOnce({
      _id: "605c72ef1532073e88a4c5b0",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    } as any);

    // Eseguiamo il controller
    await getUserById(req, res, next);

    // Verifica che il metodo json sia stato chiamato con l'utente
    expect(res.json).toHaveBeenCalledWith({
      _id: "605c72ef1532073e88a4c5b0",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    });

    jest.restoreAllMocks();
  });

  it("should return 404 if user is not found", async () => {
    const req = {
      params: { id: "605c72ef1532073e88a4c5b0" },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    // Simuliamo che l'utente non esista
    jest.spyOn(User, "findById").mockResolvedValueOnce(null);

    await getUserById(req, res, next);

    // Verifica che il codice di stato sia 404 e che il messaggio sia quello corretto
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });

    jest.restoreAllMocks();
  });

  it("should call next with an error if the database operation fails", async () => {
    const req = {
      params: { id: "605c72ef1532073e88a4c5b0" },
    } as unknown as Request;

    const res = {} as unknown as Response;

    const next = jest.fn() as NextFunction;

    jest
      .spyOn(User, "findById")
      .mockRejectedValueOnce(new Error("Database error"));

    await getUserById(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error("Database error"));

    jest.restoreAllMocks();
  });
    
  it("should return 400 if the provided ID is not valid", async () => {
    const req = { params: { id: "invalidId" } } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    await getUserById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid user ID format",
    });

    jest.restoreAllMocks();
  });

  // Add more test cases
});


//
// AddUser()
//
// Mock del modello User

// Mock dell'intero modulo express-validator
jest.mock("express-validator", () => ({
  ...jest.requireActual("express-validator"),
  validationResult: jest.fn(),
}));

// Helper per mockare validationResult
export const mockValidationResult = (isValid: boolean, errors: any[] = []) => {
  (validationResult as unknown as jest.Mock).mockImplementation(() => ({
    isEmpty: () => isValid,
    array: () => errors,
  }));
};

jest.mock("express-validator", () => ({
  ...jest.requireActual("express-validator"),
  validationResult: jest.fn(),
}));

describe("addUser controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    // Inizializza req, res e next
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should handle validation errors", async () => {
    mockValidationResult(false, [
      { msg: "Nome è richiesto", param: "nome", location: "body" },
    ]);

    await createUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: "Nome è richiesto", param: "nome", location: "body" }],
    });
  });

  it("should add a user and return 201 with the created user", async () => {
    // Mock input valido
    req.body = {
      nome: "Mario",
      cognome: "Rossi",
      email: "mario2@example.com",
      dataNascita: "1990-01-01",
      fotoProfilo: "https://example.com/mario.jpg",
    };

    // Mock validazione
    mockValidationResult(true); // Validazione corretta

    // Mock comportamento del database (simuliamo il salvataggio dell'utente)
    const mockUser = {
      _id: "674cb19886d5da3a35255181", // ID fisso per il mock
      nome: "Mario",
      cognome: "Rossi",
      email: "mario2@example.com",
      dataNascita: new Date("1990-01-01"), // Data come oggetto Date
      fotoProfilo: "https://example.com/mario.jpg",
    };

    jest.spyOn(User.prototype, "save").mockResolvedValueOnce(mockUser);

    // Mock della ricerca dell'utente
    jest.spyOn(User, "findOne").mockResolvedValueOnce(null); // Nessun utente esistente

    // Crea i mock per res
    const resMock = {
      status: jest.fn().mockReturnThis(), // Mock del metodo status che ritorna 'this' per il chaining
      json: jest.fn(), // Mock del metodo json
    };

    // Esegui il controller
    await createUser(req as Request, resMock as unknown as Response, next);

    // Verifica che la risposta contenga lo status 201
    expect(resMock.status).toHaveBeenCalledWith(201);

    // Verifica che la risposta contenga un oggetto con i campi attesi
    const response = resMock.json.mock.calls[0][0]; // Prendi il primo parametro passato a res.json

    // Verifica che la risposta non sia nulla e contenga i campi principali
    expect(response).not.toBeNull();
    expect(response).toHaveProperty("nome", "Mario");
    expect(response).toHaveProperty("cognome", "Rossi");
    expect(response).toHaveProperty("email", "mario2@example.com");
    expect(response).toHaveProperty(
      "fotoProfilo",
      "https://example.com/mario.jpg"
    );
    // Non verificare l'ID o la data
  });
    
  it("should return 400 if the user data is incomplete or invalid", async () => {
    // Mock input con dati mancanti
    req.body = {
      nome: "Mario",
      cognome: "", // cognome vuoto
      email: "mario2@example.com",
      dataNascita: "1990-01-01",
      fotoProfilo: "https://example.com/mario.jpg",
    };

    // Mock validazione
    mockValidationResult(false); // La validazione fallisce

    // Crea i mock per res
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Esegui il controller
    await createUser(req as Request, resMock as unknown as Response, next);

    // Verifica che lo status sia 400
    expect(resMock.status).toHaveBeenCalledWith(400);

    // Verifica che la risposta contenga un array di errori
    expect(resMock.json).toHaveBeenCalledWith({
      errors: expect.any(Array),
    });
  });

  it("should return 409 if the user already exists", async () => {
    // Mock input valido
    req.body = {
      nome: "Mario",
      cognome: "Rossi",
      email: "mario2@example.com", // L'email già esistente
      dataNascita: "1990-01-01",
      fotoProfilo: "https://example.com/mario.jpg",
    };

    // Mock validazione
    mockValidationResult(true); // Validazione corretta

    // Mock comportamento del database per trovare un utente esistente
    const existingUser = {
      _id: "674cb19886d5da3a35255181",
      nome: "Mario",
      cognome: "Rossi",
      email: "mario2@example.com", // L'email già esistente
      dataNascita: new Date("1990-01-01"),
      fotoProfilo: "https://example.com/mario.jpg",
    };

    jest.spyOn(User, "findOne").mockResolvedValueOnce(existingUser); // Restituisce un utente esistente

    // Crea i mock per res e next
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn(); // Mock della funzione next

    // Esegue il controller
    await createUser(req as Request, resMock as unknown as Response, nextMock);

    // Verifica che la funzione next sia stata chiamata con l'errore personalizzato
    expect(nextMock).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Email già in uso. Utilizzare un altro indirizzo email.",
        status: 409,
      })
    );
  });

  it("should return 500 if there is a database error", async () => {
    // Mock input valido
    req.body = {
      nome: "Mario",
      cognome: "Rossi",
      email: "mario10@example.com",
      dataNascita: "1990-01-01",
      fotoProfilo: "https://example.com/mario.jpg",
    };

    // Mock validazione
    mockValidationResult(true); // Validazione corretta

    // Mock errore nel salvataggio dell'utente
    jest
      .spyOn(User.prototype, "save")
      .mockRejectedValueOnce(new Error("Database error"));

    // Mock `next`
    const nextMock = jest.fn();

    // Esegui il controller
    await createUser(req as Request, res as unknown as Response, nextMock);

    // Verifica che `next` venga chiamato con l'errore
    expect(nextMock).toHaveBeenCalledWith(expect.any(Error));
  }, 20000);

  // Add more test cases
});

import { deleteUser } from "../controllers/userController"; 
import { isValidObjectId } from "mongoose";

jest.mock("mongoose", () => ({
  ...jest.requireActual("mongoose"),
  isValidObjectId: jest.fn(),
}));

describe("deleteUser controller", () => {
  it("should delete a user successfully", async () => {
    // Mock di isValidObjectId e User.findByIdAndDelete
    (isValidObjectId as jest.Mock).mockReturnValue(true);
    const mockUser = { id: "12345", name: "John Doe" };
    jest.spyOn(User, "findByIdAndDelete").mockResolvedValue(mockUser);

    // Mock di req, res e next
    const req = { params: { id: "12345" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await deleteUser(req, res, next);

    // Verifiche
    expect(isValidObjectId).toHaveBeenCalledWith("12345");
    expect(User.findByIdAndDelete).toHaveBeenCalledWith("12345");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Utente cancellato con successo",
    });
    expect(next).not.toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  it("should return 404 if user is not found", async () => {
    (isValidObjectId as jest.Mock).mockReturnValue(true);
    jest.spyOn(User, "findByIdAndDelete").mockResolvedValue(null);

    const req = { params: { id: "12345" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await deleteUser(req, res, next);

    expect(isValidObjectId).toHaveBeenCalledWith("12345");
    expect(User.findByIdAndDelete).toHaveBeenCalledWith("12345");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Utente non trovato" });
    expect(next).not.toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  it("should return 400 if ID format is invalid", async () => {
    (isValidObjectId as jest.Mock).mockReturnValue(false);

    const req = { params: { id: "invalid-id" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await deleteUser(req, res, next);

    expect(isValidObjectId).toHaveBeenCalledWith("invalid-id");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid user ID format",
    });
    expect(next).not.toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  it("should handle errors gracefully", async () => {
    (isValidObjectId as jest.Mock).mockReturnValue(true);
    jest.spyOn(User, "findByIdAndDelete").mockImplementation(() => {
      throw new Error("Database error");
    });

    const req = { params: { id: "12345" } } as unknown as Request;
    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await deleteUser(req, res, next);

    expect(isValidObjectId).toHaveBeenCalledWith("12345");
    expect(User.findByIdAndDelete).toHaveBeenCalledWith("12345");
    expect(next).toHaveBeenCalledWith(new Error("Database error"));

    jest.restoreAllMocks();
  });
});

