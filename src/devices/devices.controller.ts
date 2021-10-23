import { DevicesService } from './devices.service';
import { Controller, Delete, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body, Put } from '@nestjs/common';
import { createDeviceDto } from './dto/create-device.dto';
import { Device } from './device.entity';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Get()
  getDevices(): Promise<Device[]> {
    return this.devicesService.getDevices();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createDeviceDto: createDeviceDto): Promise<Device> {
    return this.devicesService.createTask(createDeviceDto);
  }

  @Post('/updateTemperaturePair')
  @UsePipes(ValidationPipe)
  updateTemperaturePair(): Promise<Device[]> {
    return this.devicesService.updateTemperaturePair();
  }

  @Post('/updateTemperatureToNineteen')
  @UsePipes(ValidationPipe)
  updateTemperatureToNineteen(): Promise<Device[]> {
    return this.devicesService.updateTemperatureToNineteen();
  }

  @Get('/getTemperaturesBeyondNineteen')
  @UsePipes(ValidationPipe)
  getTemperaturesBeyondNineteen(): Promise<string[]> {
    return this.devicesService.getTemperaturesBeyondNineteen();
  }

  @Get('/calculateHumidityBeyondNineteen')
  @UsePipes(ValidationPipe)
  calculateHumidityBeyondNineteen(): Promise<number> {
    return this.devicesService.calculateHumidityBeyondNineteen();
  }

  @Get('/getListeComfort')
  @UsePipes(ValidationPipe)
  getListeComfort(): Promise<Device[]> {
    return this.devicesService.getListeComfort();
  }

  @Delete('/deleteNonComfort')
  deleteTask(): Promise<string> {
    return this.devicesService.deleteNonComfort();
  }
}
