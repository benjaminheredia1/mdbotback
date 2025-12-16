import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

let app: NestExpressApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = new DocumentBuilder()
      .setTitle('MdBot API')
      .setDescription('API para el sistema MdBot')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    
    app.enableCors({
      origin: [
        'https://mdbotfront.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    });
    
    await app.init();
  }
  return app;
}

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(async (app) => {
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}

// Export para Vercel serverless
export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}
