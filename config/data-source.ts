import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from '../src/products/entities/product.entity';
import { User } from '../src/users/entities/user.entity';

export const dataSourceConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: `db/database_${process.env.NODE_ENV}.sqlite`,
  entities: [User, Product],
  migrations: ['build/src/db/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'test',
};

export const dataSource = new DataSource(dataSourceConfig as DataSourceOptions);
