import { Dialect } from 'sequelize';

export const mySqlConfig = {
    database: {
        dialect: 'mysql' as Dialect,
        host: 'localhost',
        username: 'root',
        password: 'root',
        port: 3306,
        database: 'testandonest',
        logging: false
    },
    jwtPrivateKey: process.env.SECRET_KEY
}