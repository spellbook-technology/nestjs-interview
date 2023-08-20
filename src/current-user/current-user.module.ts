import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CurrentUserController } from './current-user.controller';

@Module({
  imports: [UsersModule],
  controllers: [CurrentUserController],
})
export class CurrentUserModule {}
