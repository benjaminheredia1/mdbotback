import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Esta es la función principal que llamaremos desde el controlador
  async validateGoogleUser(googleUser: any) {
    // CASO 1: ¿El usuario ya entró con Google antes?
    let user = await this.findOneByGoogleId(googleUser.googleId);

    // Si ya existe, genial, saltamos al final para devolver el token.

    // CASO 2: No existe con Google ID, ¿Existe el email registrado?
    if (!user) {
      user = await this.findOneByEmail(googleUser.email);

      if (user) {
        // EL USUARIO EXISTE (tenía cuenta con password).
        // Actualizamos su usuario para añadirle el Google ID y vincular las cuentas.
        user = await this.updateGoogleId(user.id, googleUser.googleId);
      }
    }

    // CASO 3: No existe ni por Google ID ni por Email. Es un usuario nuevo.
    if (!user) {
      user = await this.createGoogleUser({
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        googleId: googleUser.googleId,
        picture: googleUser.picture,
      });
    }

    // Finalmente generamos el JWT para tu sistema
    return this.generateToken(user);
  }

  // Buscar usuario por Google ID
  async findOneByGoogleId(googleId: string) {
    return this.prisma.usuario.findUnique({
      where: { googleId },
    });
  }

  // Buscar usuario por email
  async findOneByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  // Actualizar Google ID de un usuario existente (merge de cuentas)
  async updateGoogleId(userId: number, googleId: string) {
    return this.prisma.usuario.update({
      where: { id: userId },
      data: { googleId },
    });
  }

  // Crear nuevo usuario con Google
  async createGoogleUser(data: {
    email: string;
    firstName?: string;
    lastName?: string;
    googleId: string;
    picture?: string;
  }) {
    return this.prisma.usuario.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        googleId: data.googleId,
        picture: data.picture,
        password: null, // Sin password para usuarios de Google
      },
    });
  }

  // Generar token JWT
  async generateToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
      },
    };
  }
}