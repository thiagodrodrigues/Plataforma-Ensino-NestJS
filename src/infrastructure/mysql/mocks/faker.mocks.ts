import { UsersEntity } from "src/users/entities/user.entity";

import IMocks from "./mocks.interface";
import { faker } from "@faker-js/faker";
import { hashSync } from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export default class FakerMocks implements IMocks{
    getUsers(): UsersEntity[]{
        let users: UsersEntity[] = [];
        users = this._getUsers();
        return users;
    }


    private _getUsers(): UsersEntity[]{
        faker.locale = 'pt_BR'
        const users: any[] = [];
        let password = "AdminGeral12345";
        let shufflePassword = hashSync(password,10);
        users.push({
            name: "Administrador Geral",
            email: "admin.geral@gmail.com",
            password: shufflePassword,
            birthdate: faker.date.past(),
            username: "AdminGeral",
            photo: "https://cdn-icons-png.flaticon.com/512/78/78948.png",
            admin: true
        })
        Array.from({ length: 15}).forEach(()=>{
            let pass = "123456";
            let shufflePass = hashSync(pass,10);
            users.push({
                name: faker.name.fullName(),
                email: String(faker.internet.email()),
                password: shufflePass,
                birthdate: faker.date.past(),
                username: faker.helpers.slugify(`${faker.name.firstName()}${faker.animal.type()}${faker.datatype.number({ min: 10, max: 99, precision: 1})}`),
                photo: faker.helpers.arrayElement(["https://cdn-icons-png.flaticon.com/512/1077/1077114.png", "https://cdn-icons-png.flaticon.com/512/149/149071.png", "https://cdn-icons-png.flaticon.com/512/74/74472.png", "https://cdn-icons-png.flaticon.com/128/1077/1077063.png", "https://cdn-icons-png.flaticon.com/512/219/219983.png", "https://cdn-icons-png.flaticon.com/512/747/747376.png", "https://cdn-icons-png.flaticon.com/512/599/599305.png", "https://cdn-icons-png.flaticon.com/512/219/219988.png"]),
                admin: false,
            });
        })
        return users;
    }


}