import { mock } from "jest-mock-extended";
import { getUsers, getUserById } from "../controllers/userController";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

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

describe("getUserById controller with jest-mock-extended", () => {
  it("should return the user if found", async () => {
    const req = { params: { id: "validUserId" } } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    jest.spyOn(User, "findById").mockResolvedValueOnce({
      _id: "validUserId",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    } as any);

    await getUserById(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      _id: "validUserId",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    });

    jest.restoreAllMocks();
  });

  it("should return 404 if user is not found", async () => {
    const req = { params: { id: "nonExistingUserId" } } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    jest.spyOn(User, "findById").mockResolvedValueOnce(null);

    await getUserById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });

    jest.restoreAllMocks();
  });

  // Add more test cases
});
