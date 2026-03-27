import express from "express";
import { createContact, getAllContacts, updateContactStatus } from "../controllers/contactController.js";

const router = express.Router();

// Create contact form submission
router.post("/", createContact);

// Get all contacts (admin/owner only)
router.get("/", getAllContacts);

// Update contact status (admin/owner only)
router.put("/:id/status", updateContactStatus);

export default router;