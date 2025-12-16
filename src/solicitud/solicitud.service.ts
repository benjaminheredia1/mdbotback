import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { SolicitudDtoCreate, SolicitudDtoUpdate, SolicitudDtoResponse } from '../../utils/schemas/solicitud.schema';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class SolicitudService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async findAll(): Promise<any> {
    return await this.prismaService.solicitud.findMany({
      include: { persona: true },
    });
  }

  async findOne(id: number): Promise<any> {
    const solicitud = await this.prismaService.solicitud.findUnique({
      where: { id },
      include: { persona: true },
    });
    if (!solicitud) {
      throw new HttpException('Solicitud not found', 404);
    }
    return solicitud;
  }

  async create(data: SolicitudDtoCreate): Promise<any> {
    const persona = await this.prismaService.persona.findUnique({
      where: { id: Number(data.id_persona) },
    });
    if (!persona) {
      throw new HttpException('Persona not found', 404);
    }
    const solicitud = await this.prismaService.solicitud.create({
      data: {
        descripcion: data.descripcion,
        id_persona: Number(data.id_persona),
        area_medica: data.area,
      },
      include: { persona: true },
    });
    
    this.eventsGateway.emitNewSolicitud(solicitud);
    this.eventsGateway.emitDashboardUpdate({ type: 'nueva-solicitud', payload: solicitud });
    
    return solicitud;
  }

  async update(id: number, data: SolicitudDtoUpdate): Promise<any> {
    const solicitud = await this.prismaService.solicitud.findUnique({ where: { id } });
    if (!solicitud) {
      throw new HttpException('Solicitud not found', 404);
    }
    const updated = await this.prismaService.solicitud.update({
      where: { id },
      data: {
        descripcion: data.descripcion,
        area_medica: data.area,
        estado: data.estado,
      },
      include: { persona: true },
    });
    
    this.eventsGateway.emitUpdateSolicitud(updated);
    this.eventsGateway.emitDashboardUpdate({ type: 'solicitud-actualizada', payload: updated });
    
    return updated;
  }

  async review(id: number, data: SolicitudDtoResponse): Promise<any> {
    const solicitud = await this.prismaService.solicitud.findUnique({ where: { id } });
    if (!solicitud) {
      throw new HttpException('Solicitud not found', 404);
    }
    const updated = await this.prismaService.solicitud.update({
      where: { id },
      data: {
        Respuesta: data.Respuesta,
        estado: 'RESUELTO',
      },
      include: { persona: true },
    });
    
    this.eventsGateway.emitUpdateSolicitud(updated);
    this.eventsGateway.emitDashboardUpdate({ type: 'solicitud-actualizada', payload: updated });
    
    return updated;
  }

  async delete(id: number): Promise<any> {
    const solicitud = await this.prismaService.solicitud.findUnique({ where: { id } });
    if (!solicitud) {
      throw new HttpException('Solicitud not found', 404);
    }
    await this.prismaService.solicitud.delete({ where: { id } });
    return { message: 'Solicitud deleted successfully' };
  }
}