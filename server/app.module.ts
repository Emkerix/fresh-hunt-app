import { Module } from '@nestjs/common';
import { OlxModule } from './src/olx/olx.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}']
    }),
    OlxModule
  ]
})
export class AppModule {}
