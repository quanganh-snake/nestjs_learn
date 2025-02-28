import { Controller, Get, Post, Body, BadRequestException, UnauthorizedException, Headers, UseGuards, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register() {
    return this.authService.regiter();
  }

  @Post('login')
  async login(@Body() { email, password }, @Req() request: Request) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const userAgent = request.get('user-agent');
    // return userAgent

    if (!userAgent) {
      throw new BadRequestException('User-Agent is required');
    }

    const user = await this.authService.checkAuth(email, password, userAgent);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  // async profile(@Headers() headers: any) {
  //   const token = headers.authorization.split(' ').slice(-1).join();
  //   const user = await this.authService.getUser(token);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid token');
  //   }
  //   return user;
  // }
  async profile(@Req() request: Request & { user: { [key: string]: string } }) {
    return request.user;
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refresh_token }) {
    if (!refresh_token) {
      throw new BadRequestException('Refresh token is required');
    }
    const user = await this.authService.refreshToken(refresh_token);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }

  @Delete('revoke-refresh-token')
  async revokeRefreshToken(@Body() { refresh_token }) {
    const isRevoke = await this.authService.revokeRefreshToken(refresh_token);
    if (!isRevoke) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return {
      success: true,
      message: 'Revoke refresh token successfully'
    };
  }

  @Delete('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request & { user: { [key: string]: string } }) {
    const accessToken = request.user.access_token;
    const exp = request.user.token_exp;
    await this.authService.logout(accessToken, +exp);
    return {
      success: true,
      message: 'Logout successfully',
    };
  }
  // async logout(@Headers() headers: any) {
  //   const token = headers.authorization.split(' ').slice(-1).join();
  //   const isLogout = await this.authService.logout(token);
  //   if (!isLogout) {
  //     throw new UnauthorizedException('Invalid token');
  //   }
  //   return {
  //     success: true,
  //     message: 'Logout successfully'
  //   };
  // }
}
