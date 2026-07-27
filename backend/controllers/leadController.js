const Lead = require("../models/Lead");

const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      status: status || "New",
      activity: [
        {
          action: "Lead created",
          user: req.user ? req.user.id : "system",
          timestamp: new Date(),
        },
      ],
    });

    return res.status(201).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const status = req.query.status;

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Lead.countDocuments(query),
    ]);

    return res.status(200).json({
      leads,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const updates = { ...req.body };
    Object.assign(lead, updates);

    lead.activity.push({
      action: "Lead updated",
      user: req.user ? req.user.id : "system",
      timestamp: new Date(),
    });

    await lead.save();

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.status = status;
    lead.activity.push({
      action: `Status updated to ${status}`,
      user: req.user ? req.user.id : "system",
      timestamp: new Date(),
    });

    await lead.save();

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const assignLead = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({ message: "assignedTo is required" });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.assignedTo = assignedTo;
    lead.activity.push({
      action: `Lead assigned to ${assignedTo}`,
      user: req.user ? req.user.id : "system",
      timestamp: new Date(),
    });

    await lead.save();

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Note text is required" });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.notes.push({
      text,
      createdBy: req.user ? req.user.id : "system",
    });

    lead.activity.push({
      action: "Note added",
      user: req.user ? req.user.id : "system",
      timestamp: new Date(),
    });

    await lead.save();

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  assignLead,
  addNote,
};
