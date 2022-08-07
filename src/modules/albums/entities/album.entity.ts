import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null;
}
export default AlbumEntity;
