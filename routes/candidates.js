import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import {
    createCandidate,
    getCandidatesForAJobCode,
    removeCandidateFromJob
 
} from "../controllers/candidates";

router.post("/create-candidate-profile", requireSignin, createCandidate);
router.get("/get-candidates-for-job/:jobCode", requireSignin, getCandidatesForAJobCode);
router.put("/candidate/update/:candidateID", requireSignin, isAdmin, removeCandidateFromJob);

export default router;
