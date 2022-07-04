import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`server running on port ${port}`);
}

bootstrap();
