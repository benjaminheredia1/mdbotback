import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import {
  WebhookQuejaDto,
  WebhookFelicitacionDto,
  WebhookSolicitudDto,
  WebhookPersonaDto,
  WebhookEstadoDto,
} from '../../utils/schemas/webhook.schema';
import { Public } from '../../utils/guards/guard.login';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // ===============================
  // ENDPOINTS PARA N8N (Crear datos)
  // ===============================

  @Public()
  @Post('queja')
  async createQueja(@Body() body: WebhookQuejaDto) {
    return await this.webhookService.createQueja(body);
  }

  @Public()
  @Post('felicitacion')
  async createFelicitacion(@Body() body: WebhookFelicitacionDto) {
    return await this.webhookService.createFelicitacion(body);
  }

  @Public()
  @Post('solicitud')
  async createSolicitud(@Body() body: WebhookSolicitudDto) {
    return await this.webhookService.createSolicitud(body);
  }

  @Public()
  @Post('persona')
  async upsertPersona(@Body() body: WebhookPersonaDto) {
    return await this.webhookService.upsertPersona(body);
  }

  @Public()
  @Post('estado')
  async updateEstado(@Body() body: WebhookEstadoDto) {
    return await this.webhookService.updateEstado(body);
  }

  // ===============================
  // ENDPOINTS PARA N8N (Consultar datos)
  // ===============================

  @Public()
  @Get('persona/hccode/:hcCode')
  async findPersonaByHcCode(@Param('hcCode') hcCode: string) {
    return await this.webhookService.findPersonaByHcCode(hcCode);
  }

  @Public()
  @Get('persona/:id/quejas')
  async getQuejasByPersona(@Param('id') id: string) {
    return await this.webhookService.getQuejasByPersona(Number(id));
  }

  @Public()
  @Get('persona/:id/solicitudes')
  async getSolicitudesByPersona(@Param('id') id: string) {
    return await this.webhookService.getSolicitudesByPersona(Number(id));
  }

  @Public()
  @Get('persona/:id/felicitaciones')
  async getFelicitacionesByPersona(@Param('id') id: string) {
    return await this.webhookService.getFelicitacionesByPersona(Number(id));
  }

  // ===============================
  // ENDPOINT PARA DASHBOARD (Cliente)
  // ===============================

  @Public()
  @Get('dashboard')
  async getDashboardSummary() {
    return await this.webhookService.getDashboardSummary();
  }
}
