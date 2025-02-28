import { BadRequestException, Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth/social')
export class SocialLoginController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('google')
  async googleLogin(
    @Body() { google_access_token }: { google_access_token: string },
    @Req() request: Request
  ) {
    if (!google_access_token) {
      throw new BadRequestException('Google access token is required');
    }

    const res = await this.authService.getGoogleUser(google_access_token);
    // console.log("🚀 ~ SocialLoginController ~ googleLogin ~ res:", res)

    if (!res) {
      throw new BadRequestException('Invalid google access token');
    }

    const userAgent = request.get('user-agent');
    if (!userAgent) {
      throw new BadRequestException('User agent is required');
    }

    const googleUser = this.authService.getGoogleUser(google_access_token);

    return this.authService.loginGoogle(googleUser, userAgent);
  }

}
