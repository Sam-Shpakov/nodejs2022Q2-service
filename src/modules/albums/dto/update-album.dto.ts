import { PartialType } from '@nestjs/swagger';
import CreateAlbum from './create-album.dto';

export class UpdateAlbum extends PartialType(CreateAlbum) {}

export default UpdateAlbum;
