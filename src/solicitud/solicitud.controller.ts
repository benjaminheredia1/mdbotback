import { Controller, Get, Post, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudDtoCreate, SolicitudDtoUpdate, SolicitudDtoResponse } from 'utils/schemas/solicitud.schema';

@Controller('solicitud')
export class SolicitudController {
  constructor(private solicitudService: SolicitudService) {}

  @Get()
  async findAll() {
    return await this.solicitudService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.solicitudService.findOne(Number(id));
  }

  @Post()
  async create(@Body() solicitudDtoCreate: SolicitudDtoCreate) {
    return await this.solicitudService.create(solicitudDtoCreate);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: SolicitudDtoUpdate) {
    return await this.solicitudService.update(Number(id), body);
  }

  @Patch(':id/revisar')
  async review(@Param('id') id: string, @Body() body: SolicitudDtoResponse) {
    return await this.solicitudService.review(Number(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.solicitudService.delete(Number(id));
  }
}
