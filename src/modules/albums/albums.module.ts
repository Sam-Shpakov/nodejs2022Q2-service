import { Module, forwardRef } from '@nestjs/common';

import { InMemoryDb } from '../../services';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';

import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
@Module({
  providers: [InMemoryDb, AlbumsService],
  controllers: [AlbumsController],
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  exports: [AlbumsService],
})
export class AlbumsModule {}
