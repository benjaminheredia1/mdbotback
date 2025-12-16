import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Schema para crear queja desde n8n
export const WebhookQuejaSchema = z.object({
  id_persona: z.number().or(z.string().transform(Number)),
  area_medica: z.string().min(1),
  descripcion: z.string().min(1),
  fecha: z.string().optional(), // YYYY-MM-DD
  hora: z.string().optional(),  // HH:MM:SS
});

// Schema para crear felicitación desde n8n
export const WebhookFelicitacionSchema = z.object({
  id_persona: z.number().or(z.string().transform(Number)),
  area_medica: z.string().min(1),
  descripcion: z.string().min(1),
  fecha: z.string().optional(),
  hora: z.string().optional(),
});

// Schema para crear solicitud desde n8n
export const WebhookSolicitudSchema = z.object({
  id_persona: z.number().or(z.string().transform(Number)),
  area_medica: z.string().min(1),
  descripcion: z.string().min(1),
  fecha: z.string().optional(),
  hora: z.string().optional(),
});

// Schema para crear/actualizar persona desde n8n
export const WebhookPersonaSchema = z.object({
  nombre: z.string().min(1),
  hcCode: z.string().min(1),
  insurance: z.string().optional(),
  business: z.string().optional(),
  status: z.string().optional(),
  area: z.string().optional(),
});

// Schema para actualizar estado desde n8n
export const WebhookEstadoSchema = z.object({
  id: z.number().or(z.string().transform(Number)),
  tipo: z.enum(['queja', 'felicitacion', 'solicitud']),
  estado: z.enum(['PENDIENTE', 'EN_PROCESO', 'RESUELTO']),
  respuesta: z.string().optional(),
});

export class WebhookQuejaDto extends createZodDto(WebhookQuejaSchema) {}
export class WebhookFelicitacionDto extends createZodDto(WebhookFelicitacionSchema) {}
export class WebhookSolicitudDto extends createZodDto(WebhookSolicitudSchema) {}
export class WebhookPersonaDto extends createZodDto(WebhookPersonaSchema) {}
export class WebhookEstadoDto extends createZodDto(WebhookEstadoSchema) {}
