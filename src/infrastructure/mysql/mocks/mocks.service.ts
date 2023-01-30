import { CreateUserDto } from "../../../users/dto/create-user.dto";
import FakerMocks from "./faker.mocks";
import IMocks from "./mocks.interface";

import { Inject, Injectable, Global } from '@nestjs/common';
import { UsersService } from "../../../users/users.service";

@Global()
@Injectable()
export class MocksService {
    private _users: CreateUserDto[];
    @Inject(UsersService)
    private readonly userService: UsersService;

    constructor(
        mocksGenerator: IMocks,
        ){
        this._users = mocksGenerator.getUsers();
    };

    async createUsers() {
        let countUsers = 0;
        for(countUsers = 0; countUsers < this._users.length; countUsers++){
            await this.userService.create(this._users[countUsers])
        }
        return {
            createdUsers: countUsers
        }
    }
}

const execute = async ()=>{
    const mocks = new MocksService(new FakerMocks);
    console.log("MOCKS", mocks)

    const totalUsers = await mocks.createUsers();
    console.log(totalUsers);
}

execute();