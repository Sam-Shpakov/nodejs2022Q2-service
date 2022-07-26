import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
class UpdateArtist {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export default UpdateArtist;
