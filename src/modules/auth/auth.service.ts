import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async checkAuth(email: string, password: string) {
    // 1. Kiểm tra email có tồn tại hay không?
    try {
      const findEmailExist = await this.userRepository.findOneOrFail({
        where: { email }
      });

      // 2. Kiểm tra password có đúng không?
      if (findEmailExist.password !== password) {
        return {
          status: false,
          message: 'Mật khẩu không đúng!'
        }
      }

      return {
        status: true,
        message: 'Đăng nhập thành công!'
      }
    } catch (error) {
      return {
        status: false,
        message: 'Email không tồn tại!'
      }
    }



  }

  createToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email
    }
    return this.jwtService.signAsync(payload);
  }

  decodedToken(token: string) {
    const tokenPayload = token.split(' ')[1];
    return this.jwtService.verifyAsync(tokenPayload);
  }

  login({ email, password }: { email: string, password: string }) {
    return 'This action adds a new auth';
  }

  getUser() {
    return 'This action returns all auth';
  }
}
