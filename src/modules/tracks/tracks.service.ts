import {
  Inject,
  forwardRef,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../services';
import CreateTrack from './dto/create-track.dto';
import UpdateTrack from './dto/update-track.dto';
import Track from './model/track.model';

import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    private inMemoryDb: InMemoryDb<Track>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async getAll(): Promise<Track[]> {
    return this.inMemoryDb.getAll();
  }

  async getById(id: string): Promise<Track> {
    const result = this.inMemoryDb.getById(id);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async create(input: CreateTrack): Promise<Track> {
    const result = {
      id: uuidv4(),
      ...input,
    };
    this.inMemoryDb.create(result);
    return result;
  }

  async update(id: string, input: UpdateTrack): Promise<Track> {
    const result = this.inMemoryDb.update(id, input);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<Track> {
    const result = this.inMemoryDb.remove(id);
    if (result) {
      await this.favoritesService.removeTrack(id);
      return result;
    }
    throw new NotFoundException();
  }

  async removeArtist(id: string): Promise<void> {
    const all = this.inMemoryDb
      .getAll()
      .filter((item) => item.artistId === id)
      .map((item) => ({ ...item, artistId: null }));
    const result = [];

    all.forEach((item) => {
      result.push(this.update(item.id, item));
    });
  }

  async removeAlbum(id: string): Promise<void> {
    const all = this.inMemoryDb
      .getAll()
      .filter((item) => item.albumId === id)
      .map((item) => ({ ...item, albumId: null }));
    const result = [];

    all.forEach((item) => {
      result.push(this.update(item.id, item));
    });
  }
}
