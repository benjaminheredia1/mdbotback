import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { FelicitacionService } from './felicitacion.service';
import { CreateFelicitacionDto, UpdateFelicitacionDto, ResponseFelicitacionDto } from '../../utils/schemas/felicitacion.schema';

@Controller('felicitacion')
export class FelicitacionController {
  constructor(private readonly felicitacionService: FelicitacionService) {}

  @Get()
  async findAll() {
    return await this.felicitacionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.felicitacionService.findOne(Number(id));
  }

  @Post()
  async create(@Body() body: CreateFelicitacionDto) {
    return await this.felicitacionService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateFelicitacionDto) {
    return await this.felicitacionService.update(Number(id), body);
  }

  @Patch(':id/revisar')
  async review(@Param('id') id: string, @Body() body: ResponseFelicitacionDto) {
    return await this.felicitacionService.review(Number(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.felicitacionService.delete(Number(id));
  }
}