import { PartialType } from '@nestjs/swagger';
import CreateTrack from './create-track.dto';

class UpdateTrack extends PartialType(CreateTrack) {}

export default UpdateTrack;
