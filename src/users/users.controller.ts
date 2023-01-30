import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { UsersEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common/decorators';

@Controller('users')
@Injectable()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post('login')
  login(@Body() data: {email: string, password: string}): Promise<any> {
    return this.usersService.login(data); // CRIA NOVO USUÁRIO
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(createUserDto); // CRIA NOVO USUÁRIO
  }

  @Get()
  findAll(): Promise<UsersEntity[]> {
    return this.usersService.findAll(); // RETORNA TODOS OS USUÁRIOS CADASTRADOS
  }

  @Get(':idUser')
  findOne(@Param('idUser') idUser: number): Promise<UsersEntity> {
    return this.usersService.findOne(idUser);
  }

  @Put(':idUser')
  async update(@Param('idUser') idUser: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(idUser, updateUserDto);
  }

  @Delete(':idUser')
  remove(@Param('idUser') idUser: number) {
    return this.usersService.remove(idUser);
  }

}
