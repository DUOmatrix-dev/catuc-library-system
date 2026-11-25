import { Body, Controller, Get, Post, Query, ConflictException } from '@nestjs/common';
import { IsString } from 'class-validator';
import { PrismaService } from '../prisma.service';
class CreateMemberDto{@IsString() membershipNo!:string;@IsString() fullName!:string;@IsString() category!:string;}
@Controller('members') export class MembersController{constructor(private db:PrismaService){}@Get() async list(@Query('limit') limit='50'){const take=Math.min(Math.max(Number(limit)||50,1),100);const [data,total]=await Promise.all([this.db.member.findMany({take,orderBy:{createdAt:'desc'}}),this.db.member.count()]);return {data,total,limit:take}}@Post() async create(@Body() dto:CreateMemberDto){const exists=await this.db.member.findUnique({where:{membershipNo:dto.membershipNo}});if(exists)throw new ConflictException('Membership number already exists');return this.db.member.create({data:{membershipNo:dto.membershipNo,fullName:dto.fullName,category:dto.category}})}}
