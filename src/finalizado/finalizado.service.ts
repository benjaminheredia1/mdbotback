import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { FinalizandoDto } from '../../utils/schemas/finalizando';
@Injectable()
export class FinalizandoService { 
    constructor(private prisma: PrismaService) {}
    async quejas (finalizandoDto: FinalizandoDto) {
        const quejas = await this.prisma.queja.findFirst({
            where: { id: finalizandoDto.id }
        });
        if (!quejas) {
            throw new HttpException('Queja not found', 404);
        }
        const updateQuejas = await this.prisma.queja.update({
            where: { id: finalizandoDto.id },
            data: {
                descripcion: finalizandoDto.descripcion
            }
        })
        return updateQuejas;
    }
    async felicitaciones (finalizandoDto: FinalizandoDto) {
        const felicitaciones = await this.prisma.felicitacion.findFirst({
            where: { id: finalizandoDto.id }
        });
        if (!felicitaciones) {
            throw new HttpException('Felicitacion not found', 404);
        }
        const updateFelicitaciones = await this.prisma.felicitacion.update({
            where: { id: finalizandoDto.id },
            data: {
                descripcion: finalizandoDto.descripcion
            }
        })
        return updateFelicitaciones;
    }
    async solicitudes (finalizandoDto: FinalizandoDto) {
        const solicitudes = await this.prisma.solicitud.findFirst({
            where: { id: finalizandoDto.id }
        });
        if (!solicitudes) {
            throw new HttpException('Solicitud not found', 404);
        }
        const updateSolicitudes = await this.prisma.solicitud.update({
            where: { id: finalizandoDto.id },
            data: {
                descripcion: finalizandoDto.descripcion
            }
        })
        return updateSolicitudes;
    }
}