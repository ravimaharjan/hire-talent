// /src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/express';

interface JwtPayload {
    userId: string;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403);

        const payload = user as JwtPayload;
        req.userId = payload.userId;
        next();
    });
};
