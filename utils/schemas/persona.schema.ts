import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const personaSchemaCreate = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
  hcCode: z.string().min(1, 'El código HC es requerido').max(50),
  insurance: z.string().optional(),
  business: z.string().optional(),
  status: z.string().optional(),
  area: z.string().optional(),
  id_usuario: z.number().int().positive().optional().nullable(),
});

export const personaSchemaUpdate = z.object({
  nombre: z.string().min(3).max(100).optional(),
  hcCode: z.string().min(1).max(50).optional(),
  insurance: z.string().optional(),
  business: z.string().optional(),
  status: z.string().optional(),
  area: z.string().optional(),
  id_usuario: z.number().int().positive().optional(),
});

export class CreatePersonaDto extends createZodDto(personaSchemaCreate) {}
export class UpdatePersonaDto extends createZodDto(personaSchemaUpdate) {}
