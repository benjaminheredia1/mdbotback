import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const felicitacionSchemaCreate = z.object({
  descripcion: z.string().min(10),
  area_medica: z.string().min(3).max(100),
  id_persona: z.number().int().positive(),
});

export const felicitacionSchemaUpdate = z.object({
  descripcion: z.string().min(10).max(500).optional(),
  area_medica: z.string().min(3).max(100).optional(),
});

export const felicitacionSchemaResponse = z.object({
  Respuesta: z.string().min(10).max(1000),
});

export class CreateFelicitacionDto extends createZodDto(felicitacionSchemaCreate) {}
export class UpdateFelicitacionDto extends createZodDto(felicitacionSchemaUpdate) {}
export class ResponseFelicitacionDto extends createZodDto(felicitacionSchemaResponse) {}
