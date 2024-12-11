// /src/repositories/userRepository.ts
import { FreeLancerProfile, Prisma, PrismaClient, UserType, WorkExperience } from '@prisma/client';
// import { User, UserCreateObject } from '../interfaces/entity';
import { ObjectDoNotExist } from '../../exceptions/app.exception';
import { excludeFields } from '../../utils/model';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {

    async findUserByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: { email },
        });

        return result;
    }

    async findUserById(userId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user;
    }

    async createUser(role: string, userData: any): Promise<User> {
        const roleData = await prisma.role.findFirst({
            where: {
                role_name: role
            },
            select: {
                id: true
            }
        })

        if (!roleData) {
            throw new ObjectDoNotExist(`Role ${role} do not exist. User creation failed.`)
        }

        return await prisma.user.create({
            data: {
                ...userData,
                roles: {
                    create: {
                        role: {
                            connect: {
                                id: roleData.id // Assumes 'admin' role already exists
                            }
                        }
                    }
                }
            }
        })
    }

    async updateProfile(userId: string, profileData: any) {
        return await prisma.freeLancerProfile.create({
            data: {
                ...profileData,
                user_id: userId,
            },
        });
    }

    async getFreelancerProfile(userId: string) {
        const userData = await prisma.user.findUnique({
            where: {
                id: userId,
                userType: "Freelancer"
            },
            include: {
                FreeLancerProfile: {
                    include: {
                        workExperience: {
                            orderBy: {
                                startDate: "desc"
                            }
                        }
                    }
                }
            }
        });

        if (userData) {
            return excludeFields(userData, ["password"])
        }
        return userData;
    }

    async addExperience(freelancerId: string, experienceData: any) {
        return await prisma.workExperience.create({
            data: {
                ...experienceData,
                freelancer_id: freelancerId
            }
        })
    }

    async getExperience(freelancerId: string): Promise<WorkExperience[] | null> {
        return await prisma.workExperience.findMany({
            where: {
                freelancer_id: freelancerId
            }
        })
    }


    async getFreelancerById(freelancerId: string): Promise<FreeLancerProfile | null> {
        const freelancerData = await prisma.freeLancerProfile.findUnique({
            where: {
                id: freelancerId
            }
        })

        return freelancerData;
    }

    async getEmployerInfo(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId,
                userType: "Employer"
            }
        })
    }



    // async getPostByUser(author_id: string, postId: string): Promise<Post | null> {
    //     return await prisma.post.findUnique({
    //         where: {
    //             authorId: author_id,
    //             // id: experienceId

    //         }
    //     })
    // }
}
