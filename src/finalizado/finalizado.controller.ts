import {Controller, Post, Body, Put} from '@nestjs/common';
import { Public } from '../../utils/guards/guard.login';
import { FinalizandoService } from './finalizado.service';
import { FinalizandoDto } from '../../utils/schemas/finalizando';
@Controller('finalizado')
export class FinalizadoController {
    constructor(private readonly finalizandoService: FinalizandoService) {}
    @Public()
    @Put('felicitacion')
    async felicitacionFinalizada(@Body() solicitud: FinalizandoDto) {
        return await this.finalizandoService.felicitaciones(solicitud);
    }
    @Public()
    @Put('queja')
    async quejaFinalizada(@Body() solicitud: FinalizandoDto) {
        return await this.finalizandoService.quejas(solicitud);
    }
    @Public()
    @Put('solicitud')
    async solicitudFinalizada(@Body() solicitud: FinalizandoDto) {
        return await this.finalizandoService.solicitudes(solicitud);
    }
}