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

@Public() // Todos los endpoints de este controlador son públicos
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // ===============================
  // ENDPOINTS PARA N8N (Crear datos)
  // ===============================

  @Post('queja')
  async createQueja(@Body() body: WebhookQuejaDto) {
    return await this.webhookService.createQueja(body);
  }

  @Post('felicitacion')
  async createFelicitacion(@Body() body: WebhookFelicitacionDto) {
    return await this.webhookService.createFelicitacion(body);
  }

  @Post('solicitud')
  async createSolicitud(@Body() body: WebhookSolicitudDto) {
    return await this.webhookService.createSolicitud(body);
  }

  @Post('persona')
  async upsertPersona(@Body() body: WebhookPersonaDto) {
    return await this.webhookService.upsertPersona(body);
  }

  @Post('estado')
  async updateEstado(@Body() body: WebhookEstadoDto) {
    return await this.webhookService.updateEstado(body);
  }

  // ===============================
  // ENDPOINTS REST PARA FRONTEND
  // ===============================

  // Listar todas las quejas con filtros opcionales
  @Get('quejas')
  async getAllQuejas(
    @Query('estado') estado?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return await this.webhookService.getAllQuejas(
      estado,
      limit ? Number(limit) : 50,
      offset ? Number(offset) : 0,
    );
  }

  // Listar todas las felicitaciones con filtros opcionales
  @Get('felicitaciones')
  async getAllFelicitaciones(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return await this.webhookService.getAllFelicitaciones(
      limit ? Number(limit) : 50,
      offset ? Number(offset) : 0,
    );
  }

  // Listar todas las solicitudes con filtros opcionales
  @Get('solicitudes')
  async getAllSolicitudes(
    @Query('estado') estado?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return await this.webhookService.getAllSolicitudes(
      estado,
      limit ? Number(limit) : 50,
      offset ? Number(offset) : 0,
    );
  }

  // Listar todas las personas
  @Get('personas')
  async getAllPersonas(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return await this.webhookService.getAllPersonas(
      limit ? Number(limit) : 50,
      offset ? Number(offset) : 0,
    );
  }

  // Obtener queja por ID
  @Get('quejas/:id')
  async getQuejaById(@Param('id') id: string) {
    return await this.webhookService.getQuejaById(Number(id));
  }

  // Obtener felicitación por ID
  @Get('felicitaciones/:id')
  async getFelicitacionById(@Param('id') id: string) {
    return await this.webhookService.getFelicitacionById(Number(id));
  }

  // Obtener solicitud por ID
  @Get('solicitudes/:id')
  async getSolicitudById(@Param('id') id: string) {
    return await this.webhookService.getSolicitudById(Number(id));
  }

  // ===============================
  // ENDPOINTS PARA N8N (Consultar datos)
  // ===============================

  @Get('persona/hccode/:hcCode')
  async findPersonaByHcCode(@Param('hcCode') hcCode: string) {
    return await this.webhookService.findPersonaByHcCode(hcCode);
  }

  @Get('persona/:id/quejas')
  async getQuejasByPersona(@Param('id') id: string) {
    return await this.webhookService.getQuejasByPersona(Number(id));
  }

  @Get('persona/:id/solicitudes')
  async getSolicitudesByPersona(@Param('id') id: string) {
    return await this.webhookService.getSolicitudesByPersona(Number(id));
  }

  @Get('persona/:id/felicitaciones')
  async getFelicitacionesByPersona(@Param('id') id: string) {
    return await this.webhookService.getFelicitacionesByPersona(Number(id));
  }

  // ===============================
  // ENDPOINT PARA DASHBOARD (Cliente)
  // ===============================

  @Get('dashboard')
  async getDashboardSummary() {
    return await this.webhookService.getDashboardSummary();
  }
  @Public()
  @Post('/delete/all') 
  async deleteAllData() {
    return await this.webhookService.deleteAllData();
  }
}
