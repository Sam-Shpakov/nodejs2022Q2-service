import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';

import CreateUser from './dto/create-user.dto';
import UpdatePassword from './dto/update-user.dto';
import UserEntity from './entities/user.entity';
import User from './interfaces/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  private hashPassword(password: string) {
    return hash(password, +this.configService.get('CRYPT_SALT'));
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<UserEntity> {
    const result = await this.userRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async getByLogin(login: string): Promise<UserEntity> {
    const result = await this.userRepository.findOne({
      where: { login },
    });
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async create(
    input: CreateUser,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    const result = new User();
    result.id = uuidv4();
    result.login = input.login;
    result.password = await this.hashPassword(input.password);
    result.createdAt = +Date.now();
    result.updatedAt = +Date.now();
    result.version = 1;

    const user = this.userRepository.create(result);
    return (await this.userRepository.save(user)).toResponse();
  }

  async update(
    id: string,
    input: UpdatePassword,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      const newHashedPassword = await this.hashPassword(input.newPassword);
      const isCompare = await compare(input.oldPassword, user.password);
      if (!isCompare) {
        throw new ForbiddenException('oldPassword is wrong');
      }
      const newUserData: User = {
        ...user,
        password: newHashedPassword,
        updatedAt: Date.now(),
        createdAt: +user.createdAt,
        version: user.version + 1,
      };
      return await this.userRepository.save(
        this.userRepository.create(newUserData),
      );
    }
    throw new NotFoundException();
  }

  async updateHashRt(id: string, hashRt: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.save(
      this.userRepository.create({
        ...user,
        hashRt,
      }),
    );
    return;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
