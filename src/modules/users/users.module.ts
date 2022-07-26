import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InMemoryDb } from '../../services';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ConfigService, InMemoryDb],
  controllers: [UsersController],
  imports: [],
})
export class UsersModule {}
