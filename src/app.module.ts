import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), DevicesModule],
})
export class AppModule {}
