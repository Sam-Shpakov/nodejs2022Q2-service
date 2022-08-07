import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import CreateUser from './dto/create-user.dto';
import UpdatePassword from './dto/update-user.dto';
import UserEntity from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserEntity> {
    return this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() newUser: CreateUser,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    return this.usersService.create(newUser);
  }

  @Put(':id')
  update(
    @Body() updatePassword: UpdatePassword,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.usersService.update(id, updatePassword);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
