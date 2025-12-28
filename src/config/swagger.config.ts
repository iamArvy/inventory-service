import { registerAs } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from './app.config';
import { TENANT_HEADER, WAREHOUSE_HEADER } from 'src/constants';

const { name, version } = appConfig();

export const swaggerConfig = registerAs('swagger', () => ({
  document: new DocumentBuilder()
    .setTitle(name)
    .setDescription('Inventory Management Service API')
    .setVersion(version)
    .setContact(
      'Oluwaseyi Oke',
      'https://iamarvy.netlify.app',
      'iamarvy.tech@gmail.com',
    )
    // .addBearerAuth({
    //   type: 'http',
    //   scheme: 'bearer',
    //   bearerFormat: 'JWT',
    // })
    .addApiKey(
      {
        type: 'apiKey',
        name: TENANT_HEADER.key,
        in: 'header',
      },
      TENANT_HEADER.name,
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: WAREHOUSE_HEADER.key,
        in: 'header',
      },
      WAREHOUSE_HEADER.name,
    )
    .build(),
  path: 'docs',
  options: {
    swaggerOptions: { persistAuthorization: true },
    jsonDocumentUrl: 'swagger/json',
  },
}));
