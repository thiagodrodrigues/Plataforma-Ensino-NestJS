import { Column, Model, Table, CreatedAt, UpdatedAt, Min, IsEmail, AllowNull, Unique, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'users', 
    timestamps: true
})
export class UsersEntity extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    idUser?: Number;

    @AllowNull(false)
    @Column
    name: string;

    @Unique
    @AllowNull(false)
    @IsEmail
    @Column
    email: string;

    @AllowNull(false)
    @Min(8)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    birthdate: Date;

    @Unique
    @AllowNull(false)
    @Min(3)
    @Column
    username: string;

    @AllowNull(false)
    @Column
    photo: string;

    @AllowNull(false)
    @Column({
        defaultValue: false
    })
    admin: boolean;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}
