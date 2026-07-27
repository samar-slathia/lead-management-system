jest.mock("../models/Lead", () => ({
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const Lead = require("../models/Lead");
const { updateLeadStatus } = require("../controllers/leadController");

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

describe("lead controller status update", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates the status and records activity", async () => {
    const lead = {
      status: "New",
      activity: [],
      save: jest.fn().mockResolvedValue(true),
    };

    Lead.findById.mockResolvedValue(lead);

    const req = {
      params: { id: "lead-id" },
      body: { status: "Contacted" },
      user: { id: "user-id" },
    };
    const res = createResponse();

    await updateLeadStatus(req, res);

    expect(lead.status).toBe("Contacted");
    expect(lead.activity).toHaveLength(1);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("Contacted");
  });
});
