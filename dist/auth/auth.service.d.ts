import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user/user.model';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(email: string, password: string, name?: string): Promise<{
        access_token: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    validateUser(payload: any): Promise<User | null>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
