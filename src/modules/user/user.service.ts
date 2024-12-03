import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { ListUserInput } from './dto/list-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    user.password = await bcrypt.hash(user.password, 10);
    await this.userRepository.save(user);
    return user;
  }

  findAll(where: Partial<ListUserInput>) {
    return this.userRepository.find({ where });
  }
}
