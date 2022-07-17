import Artist from '../../artists/models/artist.model';
import Album from '../../albums/models/album.model';
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
