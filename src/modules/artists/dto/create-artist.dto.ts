import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

class CreateArtist {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export default CreateArtist;
