import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { EventsGateway } from '../events/events.gateway';
import {
  WebhookQuejaDto,
  WebhookFelicitacionDto,
  WebhookSolicitudDto,
  WebhookPersonaDto,
  WebhookEstadoDto,
} from '../../utils/schemas/webhook.schema';

@Injectable()
export class WebhookService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
  ) {}

  // Crear queja desde n8n
  async createQueja(data: WebhookQuejaDto) {
    const queja = await this.prisma.queja.create({
      data: {
        descripcion: data.descripcion,
        area_medica: data.area_medica,
        id_persona: Number(data.id_persona),
        estado: 'PENDIENTE',
      },
      include: {
        persona: true,
      },
    });

    // Emitir evento en tiempo real
    this.eventsGateway.emitNewQueja(queja);
    this.eventsGateway.emitDashboardUpdate({ type: 'nueva-queja', payload: queja });

    return { success: true, data: queja };
  }

  // Crear felicitación desde n8n
  async createFelicitacion(data: WebhookFelicitacionDto) {
    const felicitacion = await this.prisma.felicitacion.create({
      data: {
        descripcion: data.descripcion,
        area_medica: data.area_medica,
        id_persona: Number(data.id_persona),
      },
      include: {
        persona: true,
      },
    });

    this.eventsGateway.emitNewFelicitacion(felicitacion);
    this.eventsGateway.emitDashboardUpdate({ type: 'nueva-felicitacion', payload: felicitacion });

    return { success: true, data: felicitacion };
  }

  // Crear solicitud desde n8n
  async createSolicitud(data: WebhookSolicitudDto) {
    const solicitud = await this.prisma.solicitud.create({
      data: {
        descripcion: data.descripcion,
        area_medica: data.area_medica,
        id_persona: Number(data.id_persona),
        estado: 'PENDIENTE',
      },
      include: {
        persona: true,
      },
    });

    this.eventsGateway.emitNewSolicitud(solicitud);
    this.eventsGateway.emitDashboardUpdate({ type: 'nueva-solicitud', payload: solicitud });

    return { success: true, data: solicitud };
  }

  // Crear o actualizar persona desde n8n
  async upsertPersona(data: WebhookPersonaDto) {
    const persona = await this.prisma.persona.upsert({
      where: { hcCode: data.hcCode },
      update: {
        nombre: data.nombre,
        insurance: data.insurance,
        business: data.business,
        status: data.status,
        area: data.area,
      },
      create: {
        nombre: data.nombre,
        hcCode: data.hcCode,
        insurance: data.insurance,
        business: data.business,
        status: data.status,
        area: data.area,
      },
    });

    this.eventsGateway.emitNewPersona(persona);
    this.eventsGateway.emitDashboardUpdate({ type: 'persona-upsert', payload: persona });

    return { success: true, data: persona };
  }

  // Buscar persona por hcCode (para n8n)
  async findPersonaByHcCode(hcCode: string) {
    const persona = await this.prisma.persona.findUnique({
      where: { hcCode },
      include: {
        quejas: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        felicitaciones: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        solicitudes: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!persona) {
      return { success: false, message: 'Persona no encontrada' };
    }

    return { success: true, data: persona };
  }

  // Actualizar estado de queja/felicitacion/solicitud
  async updateEstado(data: WebhookEstadoDto) {
    let result: any;

    switch (data.tipo) {
      case 'queja':
        result = await this.prisma.queja.update({
          where: { id: Number(data.id) },
          data: {
            estado: data.estado,
            respuesta: data.respuesta,
          },
          include: { persona: true },
        });
        this.eventsGateway.emitUpdateQueja(result);
        break;

      case 'felicitacion':
        result = await this.prisma.felicitacion.update({
          where: { id: Number(data.id) },
          data: {
            Respuesta: data.respuesta,
          },
          include: { persona: true },
        });
        this.eventsGateway.emitUpdateFelicitacion(result);
        break;

      case 'solicitud':
        result = await this.prisma.solicitud.update({
          where: { id: Number(data.id) },
          data: {
            estado: data.estado,
            Respuesta: data.respuesta,
          },
          include: { persona: true },
        });
        this.eventsGateway.emitUpdateSolicitud(result);
        break;
    }

    this.eventsGateway.emitDashboardUpdate({ 
      type: `${data.tipo}-actualizada`, 
      payload: result 
    });

    return { success: true, data: result };
  }

  // Obtener todas las quejas de una persona
  async getQuejasByPersona(id_persona: number) {
    const quejas = await this.prisma.queja.findMany({
      where: { id_persona },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: quejas };
  }

  // Obtener todas las solicitudes de una persona
  async getSolicitudesByPersona(id_persona: number) {
    const solicitudes = await this.prisma.solicitud.findMany({
      where: { id_persona },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: solicitudes };
  }

  // Obtener todas las felicitaciones de una persona
  async getFelicitacionesByPersona(id_persona: number) {
    const felicitaciones = await this.prisma.felicitacion.findMany({
      where: { id_persona },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: felicitaciones };
  }

  // Dashboard: obtener resumen de todas las gestiones
  async getDashboardSummary() {
    const [quejas, felicitaciones, solicitudes, personas] = await Promise.all([
      this.prisma.queja.findMany({
        include: { persona: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      this.prisma.felicitacion.findMany({
        include: { persona: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      this.prisma.solicitud.findMany({
        include: { persona: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      this.prisma.persona.count(),
    ]);

    const stats = {
      totalPersonas: personas,
      totalQuejas: quejas.length,
      totalFelicitaciones: felicitaciones.length,
      totalSolicitudes: solicitudes.length,
      quejasPendientes: quejas.filter(q => q.estado === 'PENDIENTE').length,
      solicitudesPendientes: solicitudes.filter(s => s.estado === 'PENDIENTE').length,
    };

    return {
      success: true,
      data: {
        stats,
        quejas,
        felicitaciones,
        solicitudes,
      },
    };
  }
}
