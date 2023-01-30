import { Injectable } from '@nestjs/common';
import mySqlConfig from '../../../config';

@Injectable()
export class ConfigService {
    get sequelizeOrmConfig() {
        return mySqlConfig;
    }

    get jwtConfig() {
        return { privateKey: mySqlConfig.jwtPrivateKey };
    }
}