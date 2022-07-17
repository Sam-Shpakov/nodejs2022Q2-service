import { Module, forwardRef } from '@nestjs/common';

import { InMemoryDb } from '../../services';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  providers: [ArtistsService, InMemoryDb],
  controllers: [ArtistsController],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
