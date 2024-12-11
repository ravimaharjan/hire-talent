// /src/services/authService.ts
import bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repo';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { User } from '../../interfaces/entity';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // async activateUser(email: string, password: string): Promise<User> {
    //     const user = await 
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     await this.userRepository.createUser(email, hashedPassword);

    //     return user
    // }

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string, userId: string, userType: string } | null> {
        const user = await this.userRepository.findUserByEmail(email);
        console.log('user data', user);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null; // Invalid credentials
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        return { accessToken, refreshToken, userId: user.id, userType: user.userType };
    }
}
