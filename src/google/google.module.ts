import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleController } from './google.controller';
import { GoogleAuthService } from './google.service';
import { GoogleStrategy } from './google.strategy';
import { PrismaModule } from '../../utils/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [GoogleController],
  providers: [GoogleAuthService, GoogleStrategy],
  exports: [GoogleAuthService],
})
export class GoogleModule {}
