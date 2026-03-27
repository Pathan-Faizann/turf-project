import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, phone, email, turf: purpose, message } = req.body;

    const contact = new Contact({
      name,
      phone,
      email,
      purpose,
      message
    });

    await contact.save();

    res.status(201).json({
      message: "Contact form submitted successfully",
      contact
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      message: "Failed to submit contact form",
      error: error.message
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      message: "Failed to fetch contacts",
      error: error.message
    });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      message: "Contact status updated successfully",
      contact
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({
      message: "Failed to update contact status",
      error: error.message
    });
  }
};