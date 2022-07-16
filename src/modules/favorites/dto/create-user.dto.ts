import { IsNotEmpty, IsString } from 'class-validator';
class CreateUser {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default CreateUser;
