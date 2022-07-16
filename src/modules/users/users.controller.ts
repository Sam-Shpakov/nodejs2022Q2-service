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
import User from './model/user.model';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() newUser: CreateUser): Promise<Omit<User, 'password'>> {
    return this.usersService.create(newUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updatePassword: UpdatePassword,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.update(id, updatePassword);
  }
}
