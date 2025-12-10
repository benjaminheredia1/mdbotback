import { Injectable, Body, HttpException } from "@nestjs/common";
import { CredentialDtoCreate } from '@/../utils/schemas/users.schema';
import { CredentialsDtoLogin } from '@/../utils/schemas/users.schema';
import { PrismaService } from "utils/prisma.service";
import { HashService } from "utils/hash.service";
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService, private hashService: HashService, private jwtService: JwtService) { }
    findAll() {
        return [{ id: 1, nombre: 'Juan' }, { id: 2, nombre: 'Maria' }];
    }
    async login(data: CredentialsDtoLogin) : Promise<{ message: string, token : string}> {
        try {
            const user = await this.prisma.usuario.findFirst({
                where: {
                    email: data.email
                }
            })
            if (!user) { 
                throw new HttpException('User not found', 404);
            }
            if ( await this.hashService.comparar(data.password, user.password)) { 
                const token =  await this.jwtService.sign({ id: user.id, email: user.email });
                return { message: 'Login successful', token: token };
            }
            else { 
                throw new HttpException('Invalid credentials', 401);
            }
        }
        catch (error) {
            throw new HttpException(error, 500);
        }
        ;
    }
    async create(data: CredentialDtoCreate) {
        try {
            const hashedPassword = await this.hashService.hashear(data.password);
            await this.prisma.usuario.create({
                data: {
                    email: data.email,
                    password: hashedPassword
                }
            })
            return { message: 'User created successfully' };
        }
        catch (error) {
            throw new HttpException(error, 500);
        }
    }

}