import Artist from '../../artists/model/artist.model';
import Album from '../../albums/model/album.model';
import Track from '../../tracks/model/track.model';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface FavoritesIds {
  artists: string[];
  albums: string[];
  tracks: string[];
}
