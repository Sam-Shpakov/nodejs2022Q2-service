import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;
}

export default TrackEntity;
