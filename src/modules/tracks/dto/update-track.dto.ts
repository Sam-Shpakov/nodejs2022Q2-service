import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

class UpdateTrack {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export default UpdateTrack;
