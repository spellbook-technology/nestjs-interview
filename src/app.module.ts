import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { dataSourceConfig } from '../config/data-source';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CurrentUserModule } from './current-user/current-user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig),
    AuthModule,
    UsersModule,
    CurrentUserModule,
    ProductsModule,
  ],
})
export class AppModule {}
