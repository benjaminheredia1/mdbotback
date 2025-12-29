import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
@Injectable()
export class FormularioService {
    constructor(private prisma: PrismaService) { }
    async createFormulario(data) {
        return await this.prisma.formulario.create({
            data: {
                tipo: data.tipo,
                id_persona: data.id_persona
            }
        });
    }
    async updateFormulario(data: any) {
        const formulario = await this.prisma.formulario.findFirst({
            where: { id_persona: data.id_persona, Calificacion: null }
        });
        if (!formulario) {
            throw new Error('Formulario not found or already rated');
        }
        return await this.prisma.formulario.update({
            where: { id: formulario.id },
            data: {
                Calificacion: data.Calificacion
            }
        });
    }
}