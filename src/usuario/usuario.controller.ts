import { Controller, Get, Post, UsePipes, Body} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { CredentialsDtoLogin } from '@/../utils/schemas/users.schema';
import { CredentialDtoCreate } from '@/../utils/schemas/users.schema';
import { Public } from 'utils/guards/guard.login';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
    @Get('findAll')
    fndAll() {
        return this.usuarioService.findAll();
    }
    @Post('login')
    @Public()
    login(@Body() credentials: CredentialsDtoLogin) {
        return this.usuarioService.login(credentials);
    }
    @Post('create')
    @Public()
    create(@Body() credentials: CredentialDtoCreate) {
        return this.usuarioService.create(credentials);
    }

}