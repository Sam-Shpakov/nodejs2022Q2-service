import { Module } from '@nestjs/common';

import {
  AlbumsModule,
  ArtistsModule,
  FavoritesModule,
  TracksModule,
  UsersModule,
} from './modules';

@Module({
  imports: [
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TracksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
