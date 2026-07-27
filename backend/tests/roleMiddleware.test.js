const { authorizeRoles } = require("../middleware/roleMiddleware");

describe("role middleware", () => {
  it("allows requests when the user role is permitted", () => {
    const req = { user: { role: "admin" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const middleware = authorizeRoles("admin", "member");
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("returns 403 when the user role is not permitted", () => {
    const req = { user: { role: "member" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const middleware = authorizeRoles("admin");
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    expect(next).not.toHaveBeenCalled();
  });
});
