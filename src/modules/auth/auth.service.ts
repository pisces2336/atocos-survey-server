import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserResponse } from './dto/login-user.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const users = await this.userService.findAll({ email });
    if (!users) {
      return null;
    }

    const user = users[0];
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<LoginUserResponse> {
    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      user: user,
    };
  }
}
