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
import Artist from './models/artist.model';
import CreateArtist from './dto/create-artist.dto';
import UpdateArtist from './dto/update-artist.dto';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll(): Promise<Artist[]> {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() input: CreateArtist): Promise<Artist> {
    return this.artistsService.create(input);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateArtist,
  ): Promise<Artist> {
    return this.artistsService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistsService.remove(id);
  }
}
