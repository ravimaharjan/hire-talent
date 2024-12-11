// /src/routes/authRoutes.ts
import { Router } from 'express';
import { login } from './auth.controller';

const router = Router();

router.post('/login', login);
// router.post('/refresh-token', refreshToken);

export default router;
