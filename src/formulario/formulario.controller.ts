import { Controller, Post, Put, Body } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { createFomrularioDto, updateFormularioDto } from '../../utils/schemas/formulario.schema';
import { Public } from 'utils/guards/guard.login';

@Controller('formulario')
export class FormularioController {
    constructor(readonly formularioService: FormularioService) {
    }
    @Public()
    @Post("create")
    async createFormulario(@Body() data: createFomrularioDto) {
        return this.formularioService.createFormulario(data);
    }
    @Public()
    @Put("update")
    async updateFormulario(@Body() data: updateFormularioDto) {
        return this.formularioService.updateFormulario(data);
    }
}