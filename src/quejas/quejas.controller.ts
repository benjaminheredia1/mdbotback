import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { QuejasService } from './quejas.service';
import { CreateQuejaDto, UpdateQuejaDto, ResponseQuejaDto } from '../../utils/schemas/queja.schema';
import { Public } from '../../utils/guards/guard.login';

@Public()
@Controller('quejas')
export class QuejasController {
  constructor(private readonly quejasService: QuejasService) { }
  @Public()
  @Get()
  async findAll() {
    return await this.quejasService.findAll();
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.quejasService.findOne(Number(id));
  }
  @Public()
  @Post()
  async create(@Body() body: CreateQuejaDto) {
    return await this.quejasService.create(body);
  }
  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateQuejaDto) {
    return await this.quejasService.update(Number(id), body);
  }
  @Public()
  @Patch(':id/revisar')
  async review(@Param('id') id: string, @Body() body: ResponseQuejaDto) {
    return await this.quejasService.review(Number(id), body);
  }
  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.quejasService.delete(Number(id));
  }
}