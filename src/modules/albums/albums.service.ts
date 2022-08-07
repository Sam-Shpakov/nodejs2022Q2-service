import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateAlbum from './dto/create-album.dto';
import UpdateAlbum from './dto/update-album.dto';

import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import AlbumEntity from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getById(id: string): Promise<AlbumEntity> {
    const result = await this.albumRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async create(input: CreateAlbum): Promise<AlbumEntity> {
    return await this.albumRepository.save(this.albumRepository.create(input));
  }

  async update(id: string, input: UpdateAlbum): Promise<AlbumEntity> {
    const result = await this.albumRepository.findOne({ where: { id } });
    if (result) {
      return await this.albumRepository.save(
        this.albumRepository.create({
          ...result,
          ...input,
        }),
      );
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<void> {
    const result = await this.albumRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    await this.tracksService.removeAlbum(id);
    await this.favoritesService.removeAlbum(id);
  }

  async removeArtist(id: string): Promise<void> {
    const result = await this.getAll();

    for (const album of result) {
      if (album.artistId === id)
        await this.update(album.id, { ...album, artistId: null });
    }
  }
}
