// /src/routes/authRoutes.ts
import { Router } from 'express';
import {
    updateProfile,
    getUserInfo,
    getWorkExperience,
    createUser,
    // updateWorkExperience
}
    from './user.con';

const router = Router();

router.post('/', createUser);
router.post('/profile', updateProfile);
router.get('/:userId', getUserInfo);
router.get('/freelance/:freelancerId/experience', getWorkExperience);
// router.put('freelancer/:freelancerId/experience' updateWorkExperience);

// router.post('/login', login);
// router.post('/refresh-token', refreshToken);

export default router;
