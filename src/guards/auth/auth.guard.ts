import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.get('Authorization')?.split(' ')[1]
    console.log("🚀 ~ AuthGuard ~ token:", token)

    const userAgent = request.get('user-agent');
    if (!userAgent) {
      throw new UnauthorizedException('User-Agent is required')
    }

    if (!token) {
      throw new UnauthorizedException('Token not found')
    }
    console.log("🚀 ~ AuthGuard ~ this.authService.isTokenExpired(token):", this.authService.isTokenExpired(token))
    if (this.authService.isTokenExpired(token)) {
      throw new ForbiddenException('Token expired')
    }

    const user = await this.authService.getUser(token, userAgent)
    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }

    //Cắm thông tin user vào request
    const decoded = this.authService.decodeToken(token);
    request.user = user;
    request.user.access_token = token;
    request.user.token_exp = decoded.exp;
    return true;
  }
}
