import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

class CreateAlbum {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;
}

export default CreateAlbum;
