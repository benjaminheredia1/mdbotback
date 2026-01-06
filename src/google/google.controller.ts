import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google.service';
import { Public } from '../../utils/guards/guard.login';

@Controller('auth')
export class GoogleController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  // 1. El usuario hace clic en el botón del frontend y llega aquí
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Esta función inicia el flujo de OAuth2
    // Passport se encarga de redirigir a Google
  }

  // 2. Google redirige al usuario aquí después de loguearse
  @Public()
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    // 'req.user' contiene el usuario que devolvimos en la Strategy
    const jwt = await this.googleAuthService.validateGoogleUser(req.user);

    // REDIRECCIÓN AL FRONTEND
    // Cambia FRONTEND_URL en tu .env por la URL de tu aplicación React
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${jwt.access_token}`);
  }
}