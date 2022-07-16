import { PartialType } from '@nestjs/swagger';
import CreateArtist from './create-artist.dto';

class UpdateArtist extends PartialType(CreateArtist) {}

export default UpdateArtist;
