import Artist from '../../artists/entities/artist.entity';
import Album from '../../albums/entities/album.entity';
import Track from '../../tracks/entities/track.entity';

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
