import { Module } from '@nestjs/common';
import { OlxController } from './olx.controller';
import { OlxService } from './olx.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Olx } from './entities/olx.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Olx])],
  controllers: [OlxController],
  providers: [OlxService]
})
export class OlxModule {}
