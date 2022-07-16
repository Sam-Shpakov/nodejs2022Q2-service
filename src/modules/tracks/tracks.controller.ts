import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import CreateTrack from './dto/create-track.dto';
import UpdateTrack from './dto/update-track.dto';
import Track from './model/track.model';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll(): Promise<Track[]> {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.tracksService.getById(id);
  }

  @Post()
  create(@Body() CreateTrackDto: CreateTrack): Promise<Track> {
    return this.tracksService.create(CreateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.tracksService.remove(id);
  }

  @Put(':id')
  update(
    @Body() UpdateTrackDto: UpdateTrack,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Track> {
    return this.tracksService.update(id, UpdateTrackDto);
  }
}
