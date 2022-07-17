import { Module, forwardRef } from '@nestjs/common';

import { InMemoryDb } from '../../services';
import { FavoritesModule } from '../favorites/favorites.module';

import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  providers: [TracksService, InMemoryDb],
  controllers: [TracksController],
  exports: [TracksService],
  imports: [forwardRef(() => FavoritesModule)],
})
export class TracksModule {}
