import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthService } from './auth.service';
import { mainConfig } from '../main.config';

const USER_USERNAME = 'username';
const USER_PASSWORD = 'password';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    authService = module.get<AuthService>(AuthService);

    mainConfig(app);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /sign_in', () => {
    describe('with valid credentials', () => {
      beforeEach(async () => {
        await authService.signUp({
          username: USER_USERNAME,
          password: USER_PASSWORD,
        });
      });

      it('should return a 200 response with the user', () => {
        return request(app.getHttpServer())
          .post('/auth/sign_in')
          .send({ username: USER_USERNAME, password: USER_PASSWORD })
          .then(({ statusCode }) => {
            expect(statusCode).toBe(200);
          });
      });
    });

    describe('with invalid credentials', () => {
      it('should return a 401 response with an error', () => {
        return request(app.getHttpServer())
          .post('/auth/sign_in')
          .send({ username: USER_USERNAME, password: 'invalid' })
          .then(({ statusCode }) => {
            expect(statusCode).toBe(401);
          });
      });
    });
  });

  describe('POST /sign_up', () => {
    describe('with valid credentials', () => {
      it('should return a 201 response with the user', () => {
        return request(app.getHttpServer())
          .post('/auth/sign_up')
          .send({ username: USER_USERNAME, password: USER_PASSWORD })
          .then(({ statusCode }) => {
            expect(statusCode).toBe(201);
          });
      });
    });

    describe('with username already exists', () => {
      beforeEach(async () => {
        await authService.signUp({
          username: USER_USERNAME,
          password: USER_PASSWORD,
        });
      });

      it('should return a 422 response with an error', () => {
        return request(app.getHttpServer())
          .post('/auth/sign_up')
          .send({ username: USER_USERNAME, password: 'invalid' })
          .then(({ statusCode }) => {
            expect(statusCode).toBe(422);
          });
      });
    });
  });
});
