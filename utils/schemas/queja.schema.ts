import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const quejaSchemaCreate = z.object({
  descripcion: z.string().min(10),
  id_persona: z.number().int().positive(),
  area_medica: z.string()
});

export const quejaSchemaUpdate = z.object({
  descripcion: z.string().min(10).max(500).optional(),
  area_medica: z.string().optional(),
  estado: z.enum(['PENDIENTE', 'EN_PROCESO', 'RESUELTO']).optional(),
});

export const quejaSchemaResponse = z.object({
  respuesta: z.string().min(10).max(1000),
});

export class CreateQuejaDto extends createZodDto(quejaSchemaCreate) {}
export class UpdateQuejaDto extends createZodDto(quejaSchemaUpdate) {}
export class ResponseQuejaDto extends createZodDto(quejaSchemaResponse) {}