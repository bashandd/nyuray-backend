import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import {
  createReq,
  getReqs,
  editReq,
  singleReq,
  removeReq,
  assignReq,
  postCandidateForReq,
  profiles,
} from "../controllers/reqs";

router.post("/create-req", requireSignin, isAdmin, createReq);
router.get("/reqs",  getReqs);
router.get("/req/:slug", requireSignin, isAdmin, singleReq);
router.put("/edit-req/:reqID", requireSignin, isAdmin, editReq);
router.put("/req/update/:reqID", requireSignin, isAdmin, assignReq);

router.delete("/req/:reqID", requireSignin, isAdmin, removeReq);
router.get("/req/post-candidate/:slug", requireSignin, postCandidateForReq);
router.get("/profiles", requireSignin, isAdmin, profiles);
export default router;
