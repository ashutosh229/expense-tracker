import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MailService } from '../src/infrastructure/mail/mail.service';
import { resetAuthTestData, testPrisma } from './helpers/test-prisma';

describe('Backend API (e2e)', () => {
  let app: INestApplication;
  let latestVerificationToken: string | null = null;

  const user = {
    email: 'verified-user@auth-e2e.test',
    password: 'password123',
  };

  const mailServiceMock = {
    sendVerificationEmail: jest.fn(async (_email: string, token: string) => {
      latestVerificationToken = token;
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MailService)
      .useValue(mailServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();

    const { ValidationPipe } = await import('@nestjs/common');
    const { HttpExceptionFilter } = await import(
      '../src/common/filters/http-exception.filter'
    );
    const { ApiResponseInterceptor } = await import(
      '../src/common/interceptors/api-response.interceptor'
    );

    const config = app.get(ConfigService);
    app.enableCors({
      origin: config.get<string[] | boolean>('app.corsOrigin', true),
      credentials: true,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ApiResponseInterceptor());

    await app.init();
  });

  beforeEach(async () => {
    latestVerificationToken = null;
    mailServiceMock.sendVerificationEmail.mockClear();
    await resetAuthTestData();
  });

  afterAll(async () => {
    await resetAuthTestData();
    await testPrisma.$disconnect();
    await app.close();
  });

  it('GET / returns a wrapped health response', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200);

    expect(response.body).toMatchObject({
      success: true,
      data: 'Hello World!',
      meta: {
        requestId: expect.any(String),
        timestamp: expect.any(String),
      },
    });
  });

  it('registers, verifies, logs in, restores session, and logs out', async () => {
    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201);

    expect(registerResponse.body).toMatchObject({
      success: true,
      data: {
        message: 'Registration successful. Please verify your email address.',
      },
    });
    expect(mailServiceMock.sendVerificationEmail).toHaveBeenCalledWith(
      user.email,
      expect.any(String),
    );
    expect(latestVerificationToken).toEqual(expect.any(String));

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(401)
      .expect(({ body }) => {
        expect(body.success).toBe(false);
        expect(body.error.message).toBe('Please verify your email before login.');
      });

    const verifyResponse = await request(app.getHttpServer())
      .get('/auth/verify-email')
      .query({ token: latestVerificationToken })
      .expect(200);

    expect(verifyResponse.body).toMatchObject({
      success: true,
      data: {
        message: 'Email verified successfully. You can now log in.',
      },
    });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(200);

    const accessToken = loginResponse.body.data.accessToken;
    expect(accessToken).toEqual(expect.any(String));
    expect(loginResponse.body.data.user).toMatchObject({
      email: user.email,
      isEmailVerified: true,
    });

    const meResponse = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(meResponse.body.data.user).toMatchObject({
      email: user.email,
      isEmailVerified: true,
    });

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.message).toBe('Logged out successfully.');
      });
  });

  it('rejects invalid registration input', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'not-an-email',
        password: 'short',
      })
      .expect(400)
      .expect(({ body }) => {
        expect(body.success).toBe(false);
        expect(body.error.message).toEqual(
          expect.arrayContaining([
            'email must be an email',
            'password must be longer than or equal to 8 characters',
          ]),
        );
      });
  });

  it('rejects duplicate verified registration', async () => {
    await request(app.getHttpServer()).post('/auth/register').send(user);
    await request(app.getHttpServer())
      .get('/auth/verify-email')
      .query({ token: latestVerificationToken });

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(409)
      .expect(({ body }) => {
        expect(body.error.message).toBe(
          'An account with this email already exists.',
        );
      });
  });

  it('rejects protected endpoints without a token', async () => {
    await request(app.getHttpServer())
      .get('/auth/me')
      .expect(401)
      .expect(({ body }) => {
        expect(body.success).toBe(false);
        expect(body.error.message).toBe('Missing authentication token.');
      });
  });
});
