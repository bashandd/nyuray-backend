import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import {
  create,
  skills,
  removeSkill,
  updateSkill,
} from "../controllers/skill";

router.post("/skill", requireSignin, create);
router.get("/skills", skills);
router.delete("/skill/:slug", requireSignin, isAdmin, removeSkill);
router.put("/skill/:slug", requireSignin, isAdmin, updateSkill);

export default router;
