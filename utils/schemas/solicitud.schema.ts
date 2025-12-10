import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const solicitudSchemaCreate = z.object({
  descripcion: z.string().min(10).max(500),
  id_persona: z.number().int().positive(),
  area: z.string(),
});

export const solicitudSchemaUpdate = z.object({
  descripcion: z.string().min(10).max(500).optional(),
  area: z.string().optional(),
  estado: z.enum(['PENDIENTE', 'EN_PROCESO', 'RESUELTO']).optional(),
});

export const solicitudSchemaResponse = z.object({
  Respuesta: z.string().min(10).max(1000),
});

export class SolicitudDtoCreate extends createZodDto(solicitudSchemaCreate) {}
export class SolicitudDtoUpdate extends createZodDto(solicitudSchemaUpdate) {}
export class SolicitudDtoResponse extends createZodDto(solicitudSchemaResponse) {}
