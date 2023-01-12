import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import {
    createCandidate,
    getCandidatesForAJobCode,
    getAllCandidatesFromDB,
    getMatchingCandidates,
    removeCandidateFromJob
 
} from "../controllers/candidates";

router.post("/create-candidate-profile", requireSignin, createCandidate);
router.get("/get-candidates-for-job/:jobCode", requireSignin, getCandidatesForAJobCode);
router.get("/get-all-candidates",requireSignin, getAllCandidatesFromDB);
router.get("/get-matching-candidates/:skills", requireSignin, getMatchingCandidates);
router.put("/candidate/update/:candidateID", requireSignin, isAdmin, removeCandidateFromJob);

export default router;
