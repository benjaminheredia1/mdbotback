import {Module} from '@nestjs/common';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
     imports: [JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1h' },
    })],
    controllers: [SolicitudController],
    exports: [SolicitudService],
    providers: [SolicitudService,]
})
export class SolicitudModule { 
}