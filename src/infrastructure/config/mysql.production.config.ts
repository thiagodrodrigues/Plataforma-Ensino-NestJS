import { Dialect } from 'sequelize';

export const mySqlConfig = {
    database: {
        dialect: 'mysql' as Dialect,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        logging: false
    },
    jwtPrivateKey: process.env.SECRET_KEY
}