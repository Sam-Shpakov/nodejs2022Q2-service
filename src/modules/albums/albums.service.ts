import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../services';
import CreateAlbum from './dto/create-album.dto';
import UpdateAlbum from './dto/update-album.dto';
import Album from './models/album.model';

import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    private inMemoryDb: InMemoryDb<Album>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async getAll(): Promise<Album[]> {
    return this.inMemoryDb.getAll();
  }

  async getById(id: string): Promise<Album> {
    const result = this.inMemoryDb.getById(id);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async create(input: CreateAlbum): Promise<Album> {
    const result = {
      id: uuidv4(),
      ...input,
    };
    this.inMemoryDb.create(result);
    return result;
  }

  async update(id: string, input: UpdateAlbum): Promise<Album> {
    const result = this.inMemoryDb.update(id, input);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<Album> {
    const result = this.inMemoryDb.remove(id);
    if (result) {
      await this.tracksService.removeAlbum(id);
      await this.favoritesService.removeAlbum(id);
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
}
