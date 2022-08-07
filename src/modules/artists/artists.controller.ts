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

import CreateArtist from './dto/create-artist.dto';
import UpdateArtist from './dto/update-artist.dto';
import { ArtistsService } from './artists.service';
import ArtistEntity from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll(): Promise<ArtistEntity[]> {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<ArtistEntity> {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() input: CreateArtist): Promise<ArtistEntity> {
    return this.artistsService.create(input);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateArtist,
  ): Promise<ArtistEntity> {
    return this.artistsService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.artistsService.remove(id);
  }
}
