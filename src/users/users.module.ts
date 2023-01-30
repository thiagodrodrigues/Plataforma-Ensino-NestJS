import { Module, Global } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MysqlModule } from 'src/infrastructure/mysql/mysql.module';
import { usersProviders } from './users.providers';

@Global()
@Module({
  imports: [MysqlModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders ],
  exports: [UsersService]
})
export class UsersModule {}
