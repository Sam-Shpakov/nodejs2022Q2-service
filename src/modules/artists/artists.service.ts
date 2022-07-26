import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../services';
import Artist from './models/artist.model';
import CreateArtist from './dto/create-artist.dto';
import UpdateArtist from './dto/update-artist.dto';

import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(
    private inMemoryDb: InMemoryDb<Artist>,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async getAll(): Promise<Artist[]> {
    return this.inMemoryDb.getAll();
  }

  async getById(id: string): Promise<Artist> {
    const result = this.inMemoryDb.getById(id);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async create(input: CreateArtist): Promise<Artist> {
    const result = {
      id: uuidv4(),
      ...input,
    };
    this.inMemoryDb.create(result);
    return result;
  }

  async update(id: string, input: UpdateArtist): Promise<Artist> {
    const result = this.inMemoryDb.update(id, input);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<Artist> {
    const result = this.inMemoryDb.remove(id);
    if (result) {
      await this.tracksService.removeArtist(id);
      await this.albumsService.removeArtist(id);
      await this.favoritesService.removeArtist(id);
      return result;
    }

    throw new NotFoundException();
  }
}
