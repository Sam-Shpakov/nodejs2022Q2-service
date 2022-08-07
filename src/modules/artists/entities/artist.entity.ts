import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}

export default ArtistEntity;
