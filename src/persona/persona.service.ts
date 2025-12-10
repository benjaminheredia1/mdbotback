import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { CreatePersonaDto, UpdatePersonaDto } from '../../utils/schemas/persona.schema';

@Injectable()
export class PersonaService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.persona.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const persona = await this.prismaService.persona.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
          },
        },
        quejas: true,
        felicitaciones: true,
        solicitudes: true,
      },
    });
    if (!persona) {
      throw new HttpException('Persona no encontrada', 404);
    }
    return persona;
  }

  async create(data: CreatePersonaDto) {
    // Verificar si el hcCode ya existe
    const existingPersona = await this.prismaService.persona.findUnique({
      where: { hcCode: data.hcCode },
    });
    if (existingPersona) {
      throw new HttpException('El código HC ya existe', 400);
    }

    // Verificar que el usuario existe si se proporciona
    if (data.id_usuario) {
      const usuario = await this.prismaService.usuario.findUnique({
        where: { id: data.id_usuario },
      });
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', 404);
      }
    }

    return await this.prismaService.persona.create({
      data: {
        nombre: data.nombre,
        hcCode: data.hcCode,
        insurance: data.insurance,
        business: data.business,
        status: data.status,
        area: data.area,
        id_usuario: data.id_usuario,
      },
    });
  }

  async update(id: number, data: UpdatePersonaDto) {
    const persona = await this.prismaService.persona.findUnique({
      where: { id },
    });
    if (!persona) {
      throw new HttpException('Persona no encontrada', 404);
    }

    // Verificar si el hcCode ya existe en otra persona
    if (data.hcCode) {
      const existingPersona = await this.prismaService.persona.findFirst({
        where: {
          hcCode: data.hcCode,
          id: { not: id },
        },
      });
      if (existingPersona) {
        throw new HttpException('El código HC ya existe en otra persona', 400);
      }
    }

    // Verificar que el usuario existe si se proporciona
    if (data.id_usuario) {
      const usuario = await this.prismaService.usuario.findUnique({
        where: { id: data.id_usuario },
      });
      if (!usuario) {
        throw new HttpException('Usuario no encontrado', 404);
      }
    }

    return await this.prismaService.persona.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    const persona = await this.prismaService.persona.findUnique({
      where: { id },
    });
    if (!persona) {
      throw new HttpException('Persona no encontrada', 404);
    }

    // Verificar si tiene registros relacionados
    const hasQuejas = await this.prismaService.queja.count({
      where: { id_persona: id },
    });
    const hasFelicitaciones = await this.prismaService.felicitacion.count({
      where: { id_persona: id },
    });
    const hasSolicitudes = await this.prismaService.solicitud.count({
      where: { id_persona: id },
    });

    if (hasQuejas > 0 || hasFelicitaciones > 0 || hasSolicitudes > 0) {
      throw new HttpException(
        'No se puede eliminar la persona porque tiene registros asociados (quejas, felicitaciones o solicitudes)',
        400,
      );
    }

    await this.prismaService.persona.delete({
      where: { id },
    });

    return { message: 'Persona eliminada exitosamente' };
  }
}
