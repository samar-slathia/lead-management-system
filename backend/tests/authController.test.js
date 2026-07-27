const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("validator", () => ({
  isEmail: jest.fn(),
}));

jest.mock("../models/User", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

const User = require("../models/User");
const { register, login } = require("../controllers/authController");

function createResponse() {
  const res = {};
  res.statusCode = 200;
  res.status = jest.fn((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn((payload) => {
    res.body = payload;
    return res;
  });
  return res;
}

describe("auth controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("registers a new user with a hashed password", async () => {
    validator.isEmail.mockReturnValue(true);
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashed-password");
    User.create.mockResolvedValue({
      _id: "user-id",
      name: "Jane",
      email: "jane@example.com",
      role: "member",
    });

    const req = {
      body: {
        name: "Jane",
        email: "jane@example.com",
        password: "secret123",
        role: "member",
      },
    };
    const res = createResponse();

    await register(req, res);

    expect(res.statusCode).toBe(201);
    expect(bcrypt.hash).toHaveBeenCalledWith("secret123", 10);
    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane",
        email: "jane@example.com",
        password: "hashed-password",
        role: "member",
      })
    );
    expect(res.body.message).toBe("User Registered Successfully");
  });

  it("returns a 400 error when login payload is missing credentials", async () => {
    const req = { body: {} };
    const res = createResponse();

    await login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email and password are required");
  });

  it("returns a token and user details after a successful login", async () => {
    validator.isEmail.mockReturnValue(true);
    User.findOne.mockResolvedValue({
      _id: "user-id",
      name: "Jane",
      role: "admin",
      password: "hashed-password",
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("signed-token");

    const req = {
      body: {
        email: "jane@example.com",
        password: "secret123",
      },
    };
    const res = createResponse();

    await login(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      token: "signed-token",
      role: "admin",
      name: "Jane",
    });
  });
});
