import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import { create, vendors, removeVendor } from "../controllers/vendors";


router.post("/vendor", requireSignin, isAdmin, create);
router.get("/vendors", vendors);
router.delete("/vendor/:slug", requireSignin, isAdmin, removeVendor);


export default router;
