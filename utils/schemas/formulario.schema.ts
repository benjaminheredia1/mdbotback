import { z } from "zod";
import { createZodDto } from "nestjs-zod";

export const formularioSchemaCreate = z.object({
    tipo: z.string().min(3, "El tipo debe tener al menos 3 caracteres").max(100),
    id_persona: z.number().int().positive(),
});
export const formularioSchemaUpdate = z.object({
    id_persona: z.number().int().positive(), 
    Calificacion: z.string().min(1, "La calificación es requerida").max(500),
});
export class createFomrularioDto extends createZodDto(formularioSchemaCreate) { }
export class updateFormularioDto extends createZodDto(formularioSchemaUpdate) { }