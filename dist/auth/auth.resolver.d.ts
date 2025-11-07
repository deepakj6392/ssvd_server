import { AuthService } from './auth.service';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    register(email: string, password: string, name?: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    forgotPassword(email: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<string>;
}
