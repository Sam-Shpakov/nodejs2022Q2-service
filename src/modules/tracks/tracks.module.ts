import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesModule } from '../favorites/favorites.module';

import TrackEntity from './entities/track.entity';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
})
export class TracksModule {}
