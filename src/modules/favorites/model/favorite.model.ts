import Artist from '../../artists/models/artist.model';
import Album from '../../albums/entities/album.entity';
import Track from '../../tracks/model/track.model';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class FavoritesIds {
  artists: string[];
  albums: string[];
  tracks: string[];
}
