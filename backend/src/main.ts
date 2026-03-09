import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const requiredEnvs = ['PORT', 'MONGODB_URI', 'FRONTEND_URL'];
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

  if (missingEnvs.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvs.join(', ')}`,
    );
  }

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  let frontendUrl = configService.get<string>('FRONTEND_URL');

  if (frontendUrl && frontendUrl.endsWith('/')) {
    frontendUrl = frontendUrl.slice(0, -1);
  }

  app.enableCors({
    origin: frontendUrl,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Snippet Vault API')
    .setDescription('The Snippet Vault API description')
    .setVersion('1.0')
    .addTag('snippets')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
