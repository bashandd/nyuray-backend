import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import {
  createClient,
  getClients,
  editClient,
  singleClient,
  removeClient,
} from "../controllers/clients";

router.post("/create-client", requireSignin, isAdmin, createClient);
router.get("/clients", getClients);
router.get("/client/:slug", requireSignin, isAdmin, singleClient);
router.put("/edit-client/:clientId", requireSignin, isAdmin, editClient);
router.delete("/client/:clientId", requireSignin, isAdmin, removeClient);
export default router;
