import { ObjectDoNotExist } from "../../exceptions/app.exception";
import { AddExperienceObject } from "../../interfaces/entity";
import { UserRepository } from "../user/user.repo";
import ExperienceRepository from "./experience.repo";

class ExperienceService {
    experienceRepository: ExperienceRepository;
    userRepository: UserRepository;

    constructor() {
        this.experienceRepository = new ExperienceRepository();
        this.userRepository = new UserRepository();
    }


    async addExperience(freelancerId: string, userData: AddExperienceObject) {
        const freelancer = await this.userRepository.getFreelancerById(freelancerId);

        if (!freelancer) {
            throw new ObjectDoNotExist(`Freelancer with id ${freelancerId} does not exist.`);
        }

        return await this.experienceRepository.addExperience(freelancerId, userData);
    }

    async updateExperience(experienceId: string, freelancerId: string, updateData: any) {

        const experience = await this.experienceRepository.getExperienceByFreelancer(
            experienceId,
            freelancerId
        )
        if (!experience) {
            throw new ObjectDoNotExist(`Work Experience ${experienceId} does not exist`)
        }
        return await this.experienceRepository.updateExperience(experienceId, updateData);
    }

    async deleteExperience(experienceId: string) {

        return await this.experienceRepository.deleteExperience(experienceId);
    }
}

export default ExperienceService;


