import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuejasModule } from './quejas/quejas.module';
import { FelicitacionModule } from './felicitacion/felicitacion.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaModule } from '../utils/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonaModule } from './persona/persona.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../utils/guards/guard.login';
import { APP_GUARD } from '@nestjs/core';
import { EventsModule } from './events/events.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    PrismaModule, 
    QuejasModule, 
    FelicitacionModule, 
    SolicitudModule, 
    UsuarioModule, 
    PersonaModule, 
    EventsModule,
    WebhookModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    }, {
        provide: APP_GUARD,
        useClass: AuthGuard
    }
  ],
})
export class AppModule { }
