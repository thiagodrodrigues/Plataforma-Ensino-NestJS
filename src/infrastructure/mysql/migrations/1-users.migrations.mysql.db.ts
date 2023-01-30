/* import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('users', {
            idUser: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                field: 'idUser',
                autoIncrement: true,
                unique: true,
                allowNull: false
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            birthdate: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            }, 
            photo: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            admin: Sequelize.DataTypes.BOOLEAN, // SOMENTE VISIVEL PARA O DESENVOLVEDOR
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('users');
    }
} */

const sql = `
    create database testandonest;
    create table "users" (
    "idUser" int auto_increment primary key not null unique, 
    "name" varchar(255) not null,
    "email" varchar(255) unique  not null, 
    "password" varchar(255), 
    "birthdate" date not null,
    "photo" varchar(255) not null, 
    "username" varchar(255) unique not null, 
    "admin" tinyint(1)
    "createdAt" timestamp with time zone, 
    "updatedAt" timestamp with time zone,
    primary key ("idUser")
);
`;

module.exports = {
up: queryInterface => queryInterface.sequelize.query(sql),
down: () => {},
};