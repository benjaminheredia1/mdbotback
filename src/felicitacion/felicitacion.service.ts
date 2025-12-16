import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { CreateFelicitacionDto, UpdateFelicitacionDto, ResponseFelicitacionDto } from '../../utils/schemas/felicitacion.schema';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class FelicitacionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async findAll(): Promise<any> {
    return await this.prismaService.felicitacion.findMany({
      include: { persona: true },
    });
  }

  async findOne(id: number): Promise<any> {
    const felicitacion = await this.prismaService.felicitacion.findUnique({
      where: { id },
      include: { persona: true },
    });
    if (!felicitacion) {
      throw new HttpException('Felicitacion not found', 404);
    }
    return felicitacion;
  }

  async create(data: CreateFelicitacionDto): Promise<any> {
    const persona = await this.prismaService.persona.findUnique({
      where: { id: data.id_persona },
    });
    if (!persona) {
      throw new HttpException('Persona not exist', 404);
    }
    const felicitacion = await this.prismaService.felicitacion.create({
      data: {
        descripcion: data.descripcion,
        area_medica: data.area_medica,
        id_persona: data.id_persona,
      },
      include: { persona: true },
    });
    
    this.eventsGateway.emitNewFelicitacion(felicitacion);
    this.eventsGateway.emitDashboardUpdate({ type: 'nueva-felicitacion', payload: felicitacion });
    
    return felicitacion;
  }

  async update(id: number, data: UpdateFelicitacionDto): Promise<any> {
    const felicitacion = await this.prismaService.felicitacion.findUnique({ where: { id } });
    if (!felicitacion) {
      throw new HttpException('Felicitacion not found', 404);
    }
    const updated = await this.prismaService.felicitacion.update({
      where: { id },
      data,
      include: { persona: true },
    });
    
    this.eventsGateway.emitUpdateFelicitacion(updated);
    this.eventsGateway.emitDashboardUpdate({ type: 'felicitacion-actualizada', payload: updated });
    
    return updated;
  }

  async review(id: number, data: ResponseFelicitacionDto): Promise<any> {
    const felicitacion = await this.prismaService.felicitacion.findUnique({ where: { id } });
    if (!felicitacion) {
      throw new HttpException('Felicitacion not found', 404);
    }
    const updated = await this.prismaService.felicitacion.update({
      where: { id },
      data: {
        Respuesta: data.Respuesta,
      },
      include: { persona: true },
    });
    
    this.eventsGateway.emitUpdateFelicitacion(updated);
    this.eventsGateway.emitDashboardUpdate({ type: 'felicitacion-actualizada', payload: updated });
    
    return updated;
  }

  async delete(id: number): Promise<any> {
    const felicitacion = await this.prismaService.felicitacion.findUnique({ where: { id } });
    if (!felicitacion) {
      throw new HttpException('Felicitacion not found', 404);
    }
    await this.prismaService.felicitacion.delete({ where: { id } });
    return { message: 'Felicitacion deleted successfully' };
  }
}