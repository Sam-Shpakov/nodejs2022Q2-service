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
import { AlbumsService } from './albums.service';
import CreateAlbum from './dto/create-album.dto';
import UpdateAlbum from './dto/update-album.dto';
import Album from './model/album.model';

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
  create(@Body() CreateAlbumDto: CreateAlbum): Promise<Album> {
    return this.albumsService.create(CreateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() UpdateAlbumDto: UpdateAlbum,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Album> {
    return this.albumsService.update(id, UpdateAlbumDto);
  }
}
