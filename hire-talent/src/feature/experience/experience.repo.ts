import { FreeLancerProfile, Prisma, PrismaClient, UserType, WorkExperience } from '@prisma/client';

const prisma = new PrismaClient();

class ExperienceRepository {

    async getExperienceByFreelancer(experienceId: string, freelancerId: string): Promise<WorkExperience | null> {

        return await prisma.workExperience.findUnique({
            where: {
                freelancer_id: freelancerId,
                id: experienceId
            },
        })
    }
    async addExperience(freelancerId: string, experienceData: any) {
        return await prisma.workExperience.create({
            data: {
                ...experienceData,
                freelancer_id: freelancerId
            }
        })
    }
    async updateExperience(experienceId: string, updateData: any): Promise<WorkExperience | null> {
        return await prisma.workExperience.update({
            where: {
                id: experienceId
            },
            data: updateData
        })
    }

    async deleteExperience(experienceId: string) {
        return await prisma.workExperience.delete({
            where: {
                id: experienceId
            }
        })
    }

}

export default ExperienceRepository;
