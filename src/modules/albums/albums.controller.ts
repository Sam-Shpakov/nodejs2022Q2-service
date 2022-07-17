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
import Album from './models/album.model';
import CreateAlbum from './dto/create-album.dto';
import UpdateAlbum from './dto/update-album.dto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll(): Promise<Album[]> {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumsService.getById(id);
  }

  @Post()
  create(@Body() input: CreateAlbum): Promise<Album> {
    return this.albumsService.create(input);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateAlbum,
  ): Promise<Album> {
    return this.albumsService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumsService.remove(id);
  }
}
