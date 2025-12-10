import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto, UpdatePersonaDto } from '../../utils/schemas/persona.schema';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  async findAll() {
    return await this.personaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.personaService.findOne(Number(id));
  }

  @Post()
  async create(@Body() body: CreatePersonaDto) {
    return await this.personaService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePersonaDto) {
    return await this.personaService.update(Number(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.personaService.delete(Number(id));
  }
}
