import { Controller, Get, Post, UsePipes, Body} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { CredentialsDtoLogin } from '../../utils/schemas/users.schema';
import { CredentialDtoCreate } from '../../utils/schemas/users.schema';
import { Public } from '../../utils/guards/guard.login';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
    @Public()
    @Get('findAll')
    fndAll() {
        return this.usuarioService.findAll();
    }
    @Public()
    @Post('login')
    login(@Body() credentials: CredentialsDtoLogin) {
        return this.usuarioService.login(credentials);
    }
    @Public()
    @Post('create')
    create(@Body() credentials: CredentialDtoCreate) {
        return this.usuarioService.create(credentials);
    }

}