import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from './../artists/artists.service';
import Album from '../albums/model/album.model';
import Artist from '../artists/model/artist.model';
import Track from '../tracks/model/track.model';
import { FavoritesIds, FavoritesResponse } from './model/favorite.model';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  private favorites: FavoritesIds = { tracks: [], albums: [], artists: [] };

  async getAll(): Promise<FavoritesResponse> {
    const tracks: Track[] = await Promise.allSettled(
      this.favorites.tracks.map((trackId) =>
        this.tracksService.getById(trackId),
      ),
    ).then((res) =>
      res.map((item) => (item as unknown as PromiseFulfilledResult<any>).value),
    );
    const albums: Album[] = await Promise.allSettled(
      this.favorites.albums.map((albumId) =>
        this.albumsService.getById(albumId),
      ),
    ).then((res) =>
      res.map((item) => (item as unknown as PromiseFulfilledResult<any>).value),
    );
    const artists: Artist[] = await Promise.allSettled(
      this.favorites.artists.map((artistId) =>
        this.artistsService.getById(artistId),
      ),
    ).then((res) =>
      res.map((item) => (item as unknown as PromiseFulfilledResult<any>).value),
    );
    return { artists, albums, tracks };
  }

  async addTrack(id: string): Promise<void> {
    try {
      await this.tracksService.getById(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    this.favorites.tracks.push(id);
    return;
  }

  async removeTrack(id: string): Promise<void> {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    return;
  }

  async addAlbum(id: string): Promise<void> {
    try {
      await this.albumsService.getById(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    this.favorites.albums.push(id);
    return;
  }

  async removeAlbum(id: string): Promise<void> {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    return;
  }

  async addArtist(id: string): Promise<void> {
    try {
      await this.artistsService.getById(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    this.favorites.artists.push(id);
    return;
  }

  async removeArtist(id: string): Promise<void> {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    return;
  }
}
