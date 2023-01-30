import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UsersEntity } from 'src/users/entities/user.entity';
import { ConfigService } from '../config/config.service';

export const mysqlProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig.database);
            sequelize.addModels([UsersEntity]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];