import { Request, Response } from 'express';

import ExperienceService from "./experience.svc";
import { AddExperienceObject } from '../../interfaces/entity';

export const addFreelancerExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const freelancerId = req.body.freelancerId;
        const data = req.body.data;

        const experienceData: AddExperienceObject = {
            title: data.title,
            companyName: data.companyName,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description
        }

        const expService = new ExperienceService();

        const response = await expService.addExperience(freelancerId, experienceData);
        console.log('response', response);
        res.status(200).send({
            "message": "Work Experience added successfully.",
            "data": response
        })

    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Error occured");
    }
}
export async function updateWorkExperience(req: Request, res: Response) {
    try {
        const experienceId = req.params.experienceId;
        const freelancerId = req.body.freelancerId;
        const updateData = req.body.data;

        console.log('freelancerId', freelancerId)

        const expService = new ExperienceService();

        await expService.updateExperience(
            experienceId,
            freelancerId,
            updateData
        );

        res.status(200).send("Work experience updated successfully.")

    } catch (error) {
        console.error("Error occurred", error);
        res.status(500).send("Error occurred");
    }
}

export async function deleteExperience(req: Request, res: Response) {
    try {
        const experieceId = req.params.experienceId;
        const expService = new ExperienceService();

        await expService.deleteExperience(experieceId);

        res.status(200).send({
            message: "Experience deleted successfully."
        })

    } catch (error) {
        console.error("Error occurred", error);
        res.status(500).send("Error occurred");
    }
}