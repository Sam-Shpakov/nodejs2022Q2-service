import { IsNotEmpty, IsString } from 'class-validator';

class UpdatePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export default UpdatePassword;
