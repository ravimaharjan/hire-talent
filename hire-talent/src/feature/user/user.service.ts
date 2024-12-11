import bcrypt from 'bcrypt';
import { ObjectDoNotExist, UserAlreadyExistException } from "../../exceptions/app.exception";
import { AddExperienceObject, ProfileObject, UserCreateObject } from "../../interfaces/entity";
import { UserRepository } from "./user.repo"

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userData: UserCreateObject): Promise<any> {
        const user = await this.userRepository.findUserByEmail(userData.email);

        console.log('user', user)

        if (user) {
            throw new UserAlreadyExistException(`User with email ${userData.email} already exist.`)
        }

        let { password, userType } = userData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const role = userType

        console.log('hashed pwd2', hashedPassword);

        const finalUserData = {
            ...userData,
            password: hashedPassword
        }
        console.log('final userData', finalUserData)

        await this.userRepository.createUser(role, finalUserData);
    }

    async addProfile(userId: string, userData: ProfileObject) {
        const user = await this.userRepository.findUserById(userId);
        console.log('user', user)

        if (!user) {
            throw new ObjectDoNotExist(`User with id ${userId} does not exist.`)
        }

        const result = await this.userRepository.updateProfile(userId, userData);
        return result;
    }

    async getFreelancerProfile(userId: string) {
        const user = await this.userRepository.getFreelancerProfile(userId);

        if (!user) {
            throw new ObjectDoNotExist(`User with id ${userId} does not exist.`);
        }
        const { FreeLancerProfile, ...rest } = user;

        // renaming the key for convention
        const response = {
            ...rest,
            freelancerId: user.FreeLancerProfile?.id,
            freelancerInfo: user.FreeLancerProfile
        }
        return response;
    }


    async addExperience(freelancerId: string, userData: AddExperienceObject) {
        const freelancer = await this.userRepository.getFreelancerById(freelancerId);

        if (!freelancer) {
            throw new ObjectDoNotExist(`Freelancer with id ${freelancerId} does not exist.`);
        }

        await this.userRepository.addExperience(freelancerId, userData);
    }

    async getExperience(freelancerId: string) {
        const freelancer = await this.userRepository.getFreelancerById(freelancerId);

        if (!freelancer) {
            throw new ObjectDoNotExist(`Freelancer with id ${freelancerId} does not exist.`);
        }

        return await this.userRepository.getExperience(freelancerId);
    }



    async getEmployerInfo(userId: string) {
        const user = await this.userRepository.getEmployerInfo(userId);

        if (!user) {
            throw new ObjectDoNotExist(`User with id ${userId} does not exist.`);
        }
        return user;
    }
}