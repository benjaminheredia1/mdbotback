import {ipv4, z} from 'zod';  
import { createZodDto } from 'nestjs-zod';

export const finalizandoSchema = z.object({
    id: z.number().int().positive().optional(),
    descripcion: z.string().min(10).max(500)});
    
export class FinalizandoDto extends createZodDto(finalizandoSchema) {}