import { Module } from '@nestjs/common';
import { ConfigModule } from './infrastructure/config/config.mudule';
import { UsersModule } from './users/users.module';


@Module({
  imports: [UsersModule, ConfigModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
