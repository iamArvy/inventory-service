import { registerAs } from '@nestjs/config';

export const validationConfig = registerAs('validation', () => ({
  options: {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  },
}));
