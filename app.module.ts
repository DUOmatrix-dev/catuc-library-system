import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { BooksController } from './books/books.controller';
import { MembersController } from './members/members.controller';
import { DashboardController } from './dashboard/dashboard.controller';
@Module({imports:[ConfigModule.forRoot({isGlobal:true})],controllers:[BooksController,MembersController,DashboardController],providers:[PrismaService]}) export class AppModule{}
