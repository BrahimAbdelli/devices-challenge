import { DevicesRepository } from './devices.repository';
import { Injectable } from '@nestjs/common';
import { createDeviceDto } from './dto/create-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesRepository)
    private deviceRepository: DevicesRepository
  ) {}

  async getDevices(): Promise<Device[]> {
    return this.deviceRepository.getDevices();
  }

  async createTask(createDeviceDto: createDeviceDto): Promise<Device> {
    return this.deviceRepository.createDevice(createDeviceDto);
  }

  async updateTemperaturePair(): Promise<Device[]> {
    return this.deviceRepository.updateTemperaturePair();
  }

  async updateTemperatureToNineteen(): Promise<Device[]> {
    return this.deviceRepository.updateTemperatureToNineteen();
  }

  async getTemperaturesBeyondNineteen(): Promise<string[]> {
    return this.deviceRepository.getTemperaturesBeyondNineteen();
  }

  async calculateHumidityBeyondNineteen(): Promise<number> {
    return this.deviceRepository.calculateHumidityBeyondNineteen();
  }

  async getListeComfort(): Promise<Device[]> {
    return this.deviceRepository.getListeComfort();
  }

  async deleteNonComfort(): Promise<string> {
    return this.deviceRepository.deleteNonComfort();
  }
}
