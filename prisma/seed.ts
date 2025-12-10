import { PrismaClient } from '@prisma/client';
import { HashService } from '../utils/hash.service';
import { PrismaService } from '../utils/prisma.service';
const prisma = new PrismaClient();
const hashservice = new HashService();
const prismaService = new PrismaService();

const initialUser =
    [{
        "email": 'admin@admin.com',
        "password": hashservice.hashear('admin123')
    },
    {
        "email": "benjaherediaruiz@gmail.com",
        "password": hashservice.hashear('benjamin123')
    }
    ]
const InitialPersonas = [
    {
        "nombre": 'Juan Perez',
        "hcCode": 'HC123456',
        "insurance": 'Seguro A',
        'business': '555-1234',
        "area": "General"
    },
    {
        "nombre": "Benjamin Heredia",
        "hcCode": "HC654321",
        "insurance": "Seguro B",
        "business": "555-5678",
        "area": "Pediatria"
    }
]
const InitialQuejas = [
    {
        "descripcion": "La consulta fue muy demorada",
        "id_persona": 1
    },
    {
        "descripcion": "El doctor fue muy amable",
        "id_persona": 2
    }
]
const InitialSolicitudes = [
    { "descripcion": "Solicitud de cita médica", "id_persona": 1 },
    { "descripcion": "Solicitud de resultados de laboratorio", "id_persona": 2 }
]
const InitialFelicitaciones = [
    { "descripcion": "Excelente atención del personal", "id_persona": 1 },
    { "descripcion": "Muy satisfecho con el servicio recibido", "id_persona": 2 }
]
class InserccionData {
    constructor(protected prismaService: PrismaService) { }
    async initialSolicitudes(solicitud: ReadonlyArray<{ "descripcion": string, "id_persona": number }>) {
        for (const soli of solicitud) {
            const persona =  await this.prismaService.persona.findUnique({
                where: {
                    id: soli.id_persona
                }
            }
            )
            await this.prismaService.solicitud.create({
                data: {
                    descripcion: soli.descripcion,
                    id_persona: soli.id_persona,
                    area_medica: "General"
                }
            });
        }
    }
    async initialQuejas(solicitud: ReadonlyArray<{ "descripcion": string, "id_persona": number }>) {
        for (const queja of solicitud) {
            const persona = await this.prismaService.persona.findUnique({
                where: {
                    id: queja.id_persona
                }
            }
            )
            await this.prismaService.queja.create({
                data: {
                    descripcion: queja.descripcion,
                    id_persona: queja.id_persona,
                    area_medica: "General"
                }
            });
        }
    }
    async initialFelicitaciones(solicitud: ReadonlyArray<{ "descripcion": string, "id_persona": number }>) {
        for (const felicitacion of solicitud) {
            const persona = await this.prismaService.persona.findUnique({
                where: {
                    id: felicitacion.id_persona
                }
            }
            )

            await this.prismaService.felicitacion.create({
                data: {
                    descripcion: felicitacion.descripcion,
                    id_persona: felicitacion.id_persona,
                    area_medica: "General"
                }
            });
        }
    }
    async initialPersonas(persona: ReadonlyArray<{ "nombre": string, "hcCode": string, "insurance": string, "business": string, "area": string }>) {
        for (const person of persona) {
            await this.prismaService.persona.create({
                data: {
                    nombre: person.nombre,
                    hcCode: person.hcCode,
                    insurance: person.insurance,
                    business: person.business,
                    status: 'ACTIVE',
                    area: person.area
                    

                }
            });
        }
    }
    async initialUsers(users: ReadonlyArray<{ "email": string, "password": Promise<string> }>) {
        for (const user of users) {
            const hashedPassword = await user.password;
            await this.prismaService.usuario.create({
                data: {
                    email: user.email,
                    password: hashedPassword
                }
            });
        }
    }
}

async function main() {
    const inserccionData = new InserccionData(prismaService);
    await inserccionData.initialUsers(initialUser);
    await inserccionData.initialPersonas(InitialPersonas);
    await inserccionData.initialFelicitaciones(InitialFelicitaciones);
    await inserccionData.initialQuejas(InitialQuejas);
    await inserccionData.initialSolicitudes(InitialSolicitudes);
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});