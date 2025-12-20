import { Controller, Get, Post, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudDtoCreate, SolicitudDtoUpdate, SolicitudDtoResponse } from '../../utils/schemas/solicitud.schema';
import { Public } from '../../utils/guards/guard.login';

@Public()
@Controller('solicitud')
export class SolicitudController {
  constructor(private solicitudService: SolicitudService) {}
@Public()
  @Get()
  async findAll() {
    return await this.solicitudService.findAll();
  }
@Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.solicitudService.findOne(Number(id));
  }
@Public()
  @Post()
  async create(@Body() solicitudDtoCreate: SolicitudDtoCreate) {
    return await this.solicitudService.create(solicitudDtoCreate);
  }
@Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: SolicitudDtoUpdate) {
    return await this.solicitudService.update(Number(id), body);
  }
@Public()
  @Patch(':id/revisar')
  async review(@Param('id') id: string, @Body() body: SolicitudDtoResponse) {
    return await this.solicitudService.review(Number(id), body);
  }
@Public()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.solicitudService.delete(Number(id));
  }
}
