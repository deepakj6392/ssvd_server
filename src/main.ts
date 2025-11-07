import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (
      process.env.CORS_ORIGINS ||
      'http://localhost:3000,http://localhost:3002,http://10.160.2.165:3000'
    ).split(','),
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
