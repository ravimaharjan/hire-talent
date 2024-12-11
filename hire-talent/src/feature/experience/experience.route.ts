import { Router } from "express";
import { updateWorkExperience, addFreelancerExperience } from "./experience.con";


const router = Router();

router.put('/:experienceId', updateWorkExperience)
router.post('/', addFreelancerExperience)

export default router;