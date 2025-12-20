import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto, UpdatePersonaDto } from '../../utils/schemas/persona.schema';
import { Public } from '../../utils/guards/guard.login';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}
@Public()
  @Get()
  async findAll() {
    return await this.personaService.findAll();
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.personaService.findOne(Number(id));
  }

  // Endpoint para buscar por hcCode (para n8n)
  @Public()
  @Get('hccode/:hcCode')
  async findByHcCode(@Param('hcCode') hcCode: string) {
    const persona = await this.personaService.findByHcCode(hcCode);
    if (!persona) {
      return { success: false, message: 'Persona no encontrada' };
    }
    return { success: true, data: persona };
  }
  @Public()
  @Post()
  async create(@Body() body: CreatePersonaDto) {
    return await this.personaService.create(body);
  }
  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePersonaDto) {
    return await this.personaService.update(Number(id), body);
  }
  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.personaService.delete(Number(id));
  }
  @Public()
  @Get('hcode/search') 
  async getHcodes(@Body() body: { hcCode: string }) { 
    console.log('Received hcCode:', body.hcCode);
    return await this.personaService.getHcodes(body.hcCode);
  }
}
