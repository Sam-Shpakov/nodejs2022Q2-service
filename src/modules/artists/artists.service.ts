import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ArtistEntity from './entities/artist.entity';
import CreateArtist from './dto/create-artist.dto';
import UpdateArtist from './dto/update-artist.dto';

import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getById(id: string): Promise<ArtistEntity> {
    const result = await this.artistRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async create(input: CreateArtist): Promise<ArtistEntity> {
    return await this.artistRepository.save(
      this.artistRepository.create(input),
    );
  }

  async update(id: string, input: UpdateArtist): Promise<ArtistEntity> {
    const result = await this.artistRepository.findOne({ where: { id } });
    if (result) {
      return await this.artistRepository.save(
        this.artistRepository.create({
          ...result,
          ...input,
        }),
      );
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<void> {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    await this.tracksService.removeArtist(id);
    await this.albumsService.removeArtist(id);
    await this.favoritesService.removeArtist(id);
  }
}
