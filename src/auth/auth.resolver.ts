import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<string> {
    const result = await this.authService.register(email, password, name);
    return result.access_token;
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const result = await this.authService.login(email, password);
    return result.access_token;
  }

  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string): Promise<string> {
    const result = await this.authService.forgotPassword(email);
    return result.message;
  }

  @Mutation(() => String)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    const result = await this.authService.resetPassword(token, newPassword);
    return result.message;
  }
}
