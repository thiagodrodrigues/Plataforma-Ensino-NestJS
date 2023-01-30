import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import apiConfig from './infrastructure/config/api.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(apiConfig.port);
  console.log(`Servidor Rodando na porta ${apiConfig.port}`)
}
bootstrap();
