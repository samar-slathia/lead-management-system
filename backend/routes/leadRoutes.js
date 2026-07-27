const express = require("express");
const router = express.Router();

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  assignLead,
  addNote,
} = require("../controllers/leadController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", createLead);
router.get("/", authenticate, getAllLeads);
router.get("/:id", authenticate, getLeadById);
router.put("/:id", authenticate, updateLead);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteLead);
router.patch("/:id/status", authenticate, authorizeRoles("admin", "member"), updateLeadStatus);
router.post("/:id/notes", authenticate, authorizeRoles("admin", "member"), addNote);
router.patch("/:id/assign", authenticate, authorizeRoles("admin"), assignLead);

module.exports = router;
