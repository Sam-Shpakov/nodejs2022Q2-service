import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import {
  AuthModule,
  AlbumsModule,
  ArtistsModule,
  FavoritesModule,
  TracksModule,
  UsersModule,
} from './modules';
import typeOrmConfig from './ormconfig';
import { AuthenticationGuard } from './modules/common/guards';

@Module({
  imports: [
    AuthModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TracksModule,
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
