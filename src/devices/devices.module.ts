import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  DevicesController } from './devices.controller';
import { DevicesRepository } from './devices.repository';
import { DevicesService } from './devices.service';

@Module({
  imports: [TypeOrmModule.forFeature([DevicesRepository])],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
