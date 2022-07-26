import { Exclude } from 'class-transformer';

class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;
}

export default User;
