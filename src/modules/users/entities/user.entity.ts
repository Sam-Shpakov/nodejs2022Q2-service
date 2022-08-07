import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @Column()
  hashRt: string | null;

  toResponse() {
    const { password, ...response } = this;
    return response;
  }
}

export default UserEntity;
