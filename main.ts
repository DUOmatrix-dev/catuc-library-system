import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
async function bootstrap(){const app=await NestFactory.create(AppModule);app.setGlobalPrefix('api');app.enableCors({origin:process.env.CORS_ORIGIN?.split(',')||['http://localhost:5173'],credentials:true});app.use(helmet());app.useGlobalPipes(new ValidationPipe({whitelist:true,transform:true,forbidNonWhitelisted:true}));const port=Number(process.env.PORT||4000);await app.listen(port,'0.0.0.0');console.log(`LIBRIX API listening on http://localhost:${port}/api`)}bootstrap();
