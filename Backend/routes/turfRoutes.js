import express from "express";
import { addTurf, getTurfs, getTurfById ,deleteTurf} from "../controllers/turfController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("owner"), addTurf);
router.get("/", getTurfs);

router.get("/:id", getTurfById);
router.delete("/:id", protect, deleteTurf);

export default router;