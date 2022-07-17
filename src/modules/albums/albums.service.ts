import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { v4 as uuidv4 } from 'uuid';
import CreateAlbum from './dto/create-album.dto';
import UpdateAlbum from './dto/update-album.dto';
import Album from './models/album.model';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  private albums: Album[] = [];

  async getAll(): Promise<Album[]> {
    return this.albums;
  }

  async getById(id: string): Promise<Album> {
    const album = this.albums.find((album) => id === album.id);
    if (album) return album;
    throw new NotFoundException();
  }

  async create(albumDto: CreateAlbum): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      ...albumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async remove(id: string): Promise<Album> {
    const album = this.albums.find((album) => id === album.id);
    if (album) {
      await this.tracksService.removeAlbums(id);
      await this.favoritesService.removeAlbum(id);
      this.albums = this.albums.filter((album) => album.id !== id);
      return;
    }
    throw new NotFoundException();
  }

  async update(id: string, albumDto: UpdateAlbum): Promise<Album> {
    const album = this.albums.find((album) => id === album.id);
    if (album) {
      let updatedAlbum: Album | null = null;
      this.albums = this.albums.map((album) =>
        album.id === id
          ? (updatedAlbum = {
              ...album,
              ...albumDto,
            })
          : album,
      );
      return updatedAlbum;
    }
    throw new NotFoundException();
  }

  async removeArtist(id: string): Promise<void> {
    this.albums = this.albums.map((album) =>
      album.artistId === id ? { ...album, artistId: null } : album,
    );
    return;
  }
}
