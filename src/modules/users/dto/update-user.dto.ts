import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
