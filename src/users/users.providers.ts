import { UsersEntity } from "./entities/user.entity";

export const usersProviders = [{ provide: 'UsersRepository', useValue: UsersEntity }];