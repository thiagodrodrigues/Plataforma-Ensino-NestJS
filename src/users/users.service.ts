import { Injectable, HttpException, HttpStatus, Inject, Global } from '@nestjs/common';
import { compare, hashSync } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';

import { ConfigService } from '../infrastructure/config/config.service';
import constantsConfig from '../../src/infrastructure/config/constants.config';
import { sign } from 'jsonwebtoken'

@Global()
@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('UsersRepository')
    private userRepository: typeof UsersEntity,
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  public create(createUserDto: CreateUserDto) {
    let shufflePass = hashSync(createUserDto.password,10)
    return this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: shufflePass,
      birthdate: createUserDto.birthdate,
      username: createUserDto.username,
      photo: createUserDto.photo,
      admin: false
    });
  }

  async findAll(): Promise<UsersEntity[]> {
    return this.userRepository.findAll();
  }

  findOne(idUser: number): Promise<UsersEntity> {
    return this.userRepository.findOne({
      where: {
        idUser,
      },
    });
  }

  async update(idUser: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk<UsersEntity>(idUser);
    if (!user) {
        throw new HttpException(constantsConfig.USERS.MESSAGES.ERROR.USER_NOT_FOUND.replace('{USER_ID}', `${idUser}`), HttpStatus.NOT_FOUND);
    }
    let shufflePass = await hashSync(updateUserDto.password,10)
    user.name = updateUserDto.name || user.name;
    user.email = updateUserDto.email || user.email;
    user.password = shufflePass || user.password;
    user.birthdate = updateUserDto.birthdate || user.birthdate;
    user.username = updateUserDto.username || user.username;
    user.photo = updateUserDto.photo || user.photo;
    user.admin = updateUserDto.admin || user.admin;

    try {
        const data = await user.save();
        return (
          new UpdateUserDto(data),
          data
          );
    } catch (err) {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(idUser: number): Promise<void> {
    const user = await this.findOne(idUser);
    await user.destroy();
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne<UsersEntity>({
        where: { email },
    });
  }

  async login(data: { email: string, password: string}) {

    const user = await this.getUserByEmail(data.email);
    if (!user) {
        throw new HttpException(
          constantsConfig.USERS.MESSAGES.ERROR.USER_UNAUTHENTICATED,
          HttpStatus.BAD_REQUEST,
        );
      }
    const isMatch = await compare(data.password, user.password);
    if (!isMatch) {
        throw new HttpException(
            constantsConfig.USERS.MESSAGES.ERROR.USER_UNAUTHENTICATED,
            HttpStatus.BAD_REQUEST,
        );
    }

    const token = sign(user.toJSON(), String(process.env.SECRET_KEY), {
      expiresIn: '2 days'
  });
    return {
      user: {
        idUser: user.idUser,
        name: user.name,
        email: user.email,
        username: user.username,
        photo: user.photo,
        admin: user.admin
      },
      token: token
  };
  }

}
