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

import CreateAlbum from './dto/create-album.dto';
import UpdateAlbum from './dto/update-album.dto';
import { AlbumsService } from './albums.service';
import AlbumEntity from './entities/album.entity';
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll(): Promise<AlbumEntity[]> {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<AlbumEntity> {
    return this.albumsService.getById(id);
  }

  @Post()
  create(@Body() input: CreateAlbum): Promise<AlbumEntity> {
    return this.albumsService.create(input);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateAlbum,
  ): Promise<AlbumEntity> {
    return this.albumsService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.albumsService.remove(id);
  }
}
