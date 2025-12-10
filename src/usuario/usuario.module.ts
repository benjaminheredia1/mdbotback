import {Module} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import {HashService} from '../../utils/hash.service';
import {JwtModule} from '@nestjs/jwt';
import { env } from 'process';
@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1h' },
    })],
    controllers: [UsuarioController],
    providers: [UsuarioService, HashService],
    exports: [UsuarioService, HashService]
})
export class UsuarioModule{}