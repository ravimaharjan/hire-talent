// /src/controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../../interfaces/express';
import { UserService } from './user.service';
import { ProfileObject, UserCreateObject, UserType } from '../../interfaces/entity';
import { InvalidType } from '../../exceptions/app.exception';

const prisma = new PrismaClient();


export const createUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const authService = new UserService();
        const userObject: UserCreateObject = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            zipcode: data.zipcode,
            country: data.country,
            userType: data.userType
        }
        const user = await authService.createUser(userObject);

        res.status(200).json({ message: 'User created successfully', data: user })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error creating user' });
    }
}

export const getUserProfile = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.userId;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        const userService = new UserService();
        const profileObject: ProfileObject = {
            title: data.title,
            about: data.about,
            currentCompany: data.currentCompany,
            currentSalary: data.currentSalary,
            looking_for: data.looking_for,
            skills: data.skills
        }
        userService.addProfile(data.userId, profileObject);

        res.status(200).send("User profile updated.")
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error occurred");
    }
}



export const getWorkExperience = async (req: Request, res: Response) => {
    try {
        const { freelancerId } = req.params;
        const userService = new UserService();
        const experienceData = await userService.getExperience(freelancerId);
        res.status(200).json({ data: experienceData });
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Error occured");
    }
}

export async function getUserInfo(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const { userType } = req.query;

        const userService = new UserService();
        let userData;
        if (userType === UserType.Freelancer) {
            userData = await userService.getFreelancerProfile(userId);
        }

        else if (userType === UserType.Employer)
            userData = await userService.getFreelancerProfile(userId);

        else {
            throw new InvalidType(`Specified type ${userType} is invalid.`)
        }
        res.status(200).send({ data: userData });
    }
    catch (error) {
        console.error("Error occured: ", error);
        res.status(500).send("Error occured");
    }
}

