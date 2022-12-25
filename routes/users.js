import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers

import { allUsers, updateUser, removeUser } from "../controllers/users";

router.get("/users", allUsers);

router.delete("/users/:slug", requireSignin, isAdmin, removeUser);
router.put("/user/update/:_id", requireSignin, isAdmin, updateUser);


export default router;
