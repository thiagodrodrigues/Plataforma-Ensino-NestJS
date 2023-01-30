import { UsersEntity } from "src/users/entities/user.entity";

export default interface IMocks {
    getUsers(): UsersEntity[];
}