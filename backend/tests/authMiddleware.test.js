const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const { authenticate } = require("../middleware/authMiddleware");

describe("auth middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 when no bearer token is provided", () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches decoded user and calls next for a valid token", () => {
    const decodedUser = { id: "user-id", role: "member" };
    jwt.verify.mockReturnValue(decodedUser);

    const req = { headers: { authorization: "Bearer valid-token" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(req.user).toEqual(decodedUser);
    expect(next).toHaveBeenCalled();
  });

  it("returns 401 for an invalid token", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const req = { headers: { authorization: "Bearer invalid-token" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid or expired token" });
    expect(next).not.toHaveBeenCalled();
  });
});
