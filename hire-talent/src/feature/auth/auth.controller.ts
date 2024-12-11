import { Request, Response } from 'express';
import { AuthService } from './auth.service';



export const updateFreelancerData = async (req: Request, res: Response): Promise<void> => {

}

// export const activateUser = async (req: Request, res: Response): Promise<void> => {
//     const { email, password } = req.body;

//     try {
//         const authService = new AuthService();
//         const user = await authService.activateUser(email, password);


//         res.status(201).json({ message: 'User registered successfully', user });
//     } catch (error) {
//         res.status(500).json({ error: 'Error registering user' });
//     }
// };


export const login = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const authService = new AuthService();
        const tokens = await authService.login(email, password);

        if (tokens) {
            res.status(200).json(tokens);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Error occcured :", error);
        res.status(500).json({ error: 'Error logging in' });
    }
};


// export const refreshToken = async (req: Request, res: Response): Promise<void> => {
//     const { token } = req.body;

//     if (!token) return res.status(401).json({ error: 'No token provided' });

//     try {
//         const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
//         const accessToken = generateAccessToken(payload.userId);
//         res.status(200).json({ accessToken });
//     } catch (error) {
//         res.status(403).json({ error: 'Invalid token' });
//     }
// };
