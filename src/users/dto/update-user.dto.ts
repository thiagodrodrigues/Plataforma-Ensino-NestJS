import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    idUser?: number;
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    username: string;
    photo: string;
    admin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
