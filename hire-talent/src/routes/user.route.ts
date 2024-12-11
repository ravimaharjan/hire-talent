// /src/routes/authRoutes.ts
import { Router } from 'express';
import { updateProfile, getUserInfo, addFreelancerExperience, getWorkExperience, createUser } from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.post('/profile', updateProfile);
router.get('/:userId', getUserInfo);
router.post('/freelance/:freelancerId/experience', addFreelancerExperience)
router.get('/freelance/:freelancerId/experience', getWorkExperience);

// router.post('/login', login);
// router.post('/refresh-token', refreshToken);

export default router;
