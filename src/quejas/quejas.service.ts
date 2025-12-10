import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { CreateQuejaDto, UpdateQuejaDto, ResponseQuejaDto } from '../../utils/schemas/queja.schema';

@Injectable()
export class QuejasService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any> {
    return await this.prismaService.queja.findMany({
      include: { persona: true },
    });
  }

  async findOne(id: number): Promise<any> {
    const queja = await this.prismaService.queja.findUnique({
      where: { id },
      include: { persona: true },
    });
    if (!queja) {
      throw new HttpException('Queja not found', 404);
    }
    return queja;
  }

  async create(data: CreateQuejaDto): Promise<any> {
    const persona = await this.prismaService.persona.findUnique({
      where: { id: data.id_persona },
    });
    if (!persona) {
      throw new HttpException('Persona not exist', 404);
    }
    return await this.prismaService.queja.create({
      data: {
        descripcion: data.descripcion,
        id_persona: data.id_persona,
        area_medica: data.area_medica,
      },
    });
  }

  async update(id: number, data: UpdateQuejaDto): Promise<any> {
    const queja = await this.prismaService.queja.findUnique({ where: { id } });
    if (!queja) {
      throw new HttpException('Queja not found', 404);
    }
    return await this.prismaService.queja.update({
      where: { id },
      data,
    });
  }

  async review(id: number, data: ResponseQuejaDto): Promise<any> {
    const queja = await this.prismaService.queja.findUnique({ where: { id } });
    if (!queja) {
      throw new HttpException('Queja not found', 404);
    }
    return await this.prismaService.queja.update({
      where: { id },
      data: {
        respuesta: data.respuesta,
        estado: 'RESUELTO',
      },
    });
  }

  async delete(id: number): Promise<any> {
    const queja = await this.prismaService.queja.findUnique({ where: { id } });
    if (!queja) {
      throw new HttpException('Queja not found', 404);
    }
    await this.prismaService.queja.delete({ where: { id } });
    return { message: 'Queja deleted successfully' };
  }
}