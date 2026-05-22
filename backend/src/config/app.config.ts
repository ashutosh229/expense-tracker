import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.PORT ?? 3000),
  corsOrigin: process.env.CORS_ORIGIN?.split(',') ?? true,
  appUrl: process.env.APP_URL ?? 'http://localhost:3000',
  frontendLoginUrl: process.env.FRONTEND_LOGIN_URL,
}));
