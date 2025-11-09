import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    name?: string,
  ): Promise<{ access_token: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword, name });
    await user.save();

    const payload = { email: user.email, sub: user._id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: any): Promise<User | null> {
    const user = await this.userModel.findById(payload.sub);
    return user;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      // For security, don't reveal if email exists or not
      return {
        message:
          'If an account with that email exists, a reset link has been sent.',
      };
    }

    // Generate a reset token (simple implementation - in production, use proper token generation)
    const resetToken = this.jwtService.sign(
      { email: user.email, sub: user._id, type: 'reset' },
      { expiresIn: '15m' },
    );

    // In a real app, you'd send an email with the reset link
    // For now, we'll just return the token (for testing purposes)
    console.log(`Reset token for ${email}: ${resetToken}`);

    return {
      message:
        'If an account with that email exists, a reset link has been sent.',
    };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    try {
      const payload = this.jwtService.verify(token);
      if (payload.type !== 'reset') {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.userModel.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
