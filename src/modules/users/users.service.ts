import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';

import { InMemoryDb } from '../../services';
import CreateUser from './dto/create-user.dto';
import UpdatePassword from './dto/update-user.dto';
import User from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    private inMemoryDb: InMemoryDb<User>,
    private configService: ConfigService,
  ) {}

  private hashPassword(password: string) {
    return hash(password, +this.configService.get('CRYPT_SALT'));
  }

  async getAll(): Promise<User[]> {
    return this.inMemoryDb.getAll();
  }

  async getById(id: string): Promise<User> {
    const result = this.inMemoryDb.getById(id);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async create(input: CreateUser): Promise<Omit<User, 'password'>> {
    const result = new User();
    result.id = uuidv4();
    result.login = input.login;
    result.password = await this.hashPassword(input.password);
    result.createdAt = Date.now();
    result.updatedAt = Date.now();
    result.version = 1;

    const { password, ...responseUser } = result;
    this.inMemoryDb.create(result);
    return responseUser;
  }

  async update(
    id: string,
    input: UpdatePassword,
  ): Promise<Omit<User, 'password'>> {
    const user = this.inMemoryDb.getById(id);
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
        version: user.version + 1,
      };
      this.inMemoryDb.update(id, newUserData);
      const { password, ...responseUser } = newUserData;
      return responseUser;
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<User> {
    const result = this.inMemoryDb.remove(id);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }
}
