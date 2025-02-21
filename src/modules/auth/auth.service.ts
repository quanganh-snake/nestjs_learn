import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashString } from 'src/utils/hashing';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as md5 from 'md5';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis
  ) { }

  async checkAuth(email: string, password: string) {
    //Kiểm tra email có tồn tại hay không?
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      const passwordHash = user.password;
      if (comparePassword(password, passwordHash)) {
        return this.getToken(user);
      }
    }
    return false;
  }

  async refreshToken(refreshToken: string) {
    const decoded = this.decodeToken(refreshToken);
    if (!decoded) return false;

    // Kiểm tra refresh token có tồn tại trong redis không?
    const hashRefreshToken = md5(refreshToken);
    const isExist = await this.redis.get(`refresh_token_${hashRefreshToken}`);

    if (!isExist) return false;
    // console.log("🚀 ~ AuthService ~ refreshToken ~ isExist:", isExist)
    await this.revokeRefreshToken(refreshToken);
    return this.getToken({ id: decoded.sub } as User);
  }

  async revokeRefreshToken(refreshToken: string) {
    const hashRefreshToken = md5(refreshToken);
    const tokenFromRedis = await this.redis.get(`refresh_token_${hashRefreshToken}`);
    if (!tokenFromRedis) return false;
    await this.redis.del(`refresh_token_${hashRefreshToken}`);
    return true;
  }

  async logout(accessToken: string, exp: number) {
    const currentTimeSeconds = new Date().getTime() / 1000;

    const hashAccessToken = md5(accessToken);
    const decoded = this.decodeToken(accessToken);
    const expireTime = decoded.exp;
    const diff = Math.round(expireTime - currentTimeSeconds);

    await this.redis.set(`blacklist_${hashAccessToken}`, hashAccessToken, 'EX', diff);
    return true;
  }

  async getToken(user: User) {
    return {
      access_token: await this.createToken(user),
      refresh_token: await this.createRefreshToken(user),
    }
  }

  async getUser(token: string) {
    const payload = this.decodeToken(token);
    if (!payload) return false;
    return this.userRepository.findOne({ where: { id: payload.sub } });
  }

  createToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  async createRefreshToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME
    });

    // Lưu vào redis: dạng : key - value
    // refresh_token_{hashRefresh} = hasRefresh
    const hashRefreshToken = md5(refreshToken);
    // console.log("🚀 ~ AuthService ~ createRefreshToken ~ hashRefreshToken:", hashRefreshToken)
    // console.log("🚀 ~ AuthService ~ createRefreshToken ~ hashRefreshToken:", hashRefreshToken)
    await this.redis.set(`refresh_token_${hashRefreshToken}`, hashRefreshToken, 'EX', 120);
    return refreshToken
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async saveHashTokenToRedis(token: {
    access_token: string,
    refresh_token: string
  }) {
    const hashRFT = md5(token.refresh_token);
    const hashACT = md5(token.access_token);

    const currentTime = new Date().getTime() / 1000;
    const decoded = this.decodeToken(token.access_token);
    const expireTime = decoded.exp;
    const diff = Math.round(expireTime - currentTime);
    await this.redis.set(`refresh_token_${hashRFT}`, JSON.stringify({
      access_token: hashACT,
      refresh_token: hashRFT
    }), 'EX', diff);

  }
}
