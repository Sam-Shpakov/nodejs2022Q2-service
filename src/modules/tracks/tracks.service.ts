import {
  Inject,
  forwardRef,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TrackEntity from './entities/track.entity';
import CreateTrack from './dto/create-track.dto';
import UpdateTrack from './dto/update-track.dto';

import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async getAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async getById(id: string): Promise<TrackEntity> {
    const result = await this.trackRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async create(input: CreateTrack): Promise<TrackEntity> {
    return await this.trackRepository.save(this.trackRepository.create(input));
  }

  async update(id: string, input: UpdateTrack): Promise<TrackEntity> {
    const result = await this.trackRepository.findOne({ where: { id } });
    if (result) {
      return await this.trackRepository.save(
        this.trackRepository.create({
          ...result,
          ...input,
        }),
      );
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<void> {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    await this.favoritesService.removeTrack(id);
  }

  async removeArtist(id: string): Promise<void> {
    const result = await this.getAll();
    for (const track of result) {
      if (track.artistId === id)
        await this.update(track.id, { ...track, artistId: null });
    }
  }

  async removeAlbum(id: string): Promise<void> {
    const result = await this.getAll();
    for (const track of result) {
      if (track.albumId === id)
        await this.update(track.id, { ...track, albumId: null });
    }
  }
}
