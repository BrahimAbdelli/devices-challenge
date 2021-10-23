import { createDeviceDto } from './dto/create-device.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Device } from './device.entity';

@EntityRepository(Device)
export class DevicesRepository extends Repository<Device> {
  async getDevices(): Promise<Device[]> {
    const query = this.createQueryBuilder('device');
    const devices = await query.getMany();
    return devices;
  }

  async createDevice(
    createDeviceDto: createDeviceDto,
  ): Promise<Device> {
    const { deviceName, temperature, humidity } = createDeviceDto;

    const device = new Device();
    device.deviceName = deviceName;
    device.temperature = temperature;
    device.humidity = humidity;
    await device.save();

    return device;
  }

  async updateTemperaturePair(): Promise<Device[]> {
    const query = this.createQueryBuilder('device');
    const devices = await query
      .update(Device)
      .set({
        temperature: () => '20',
      })
      .where('device.id%2!=1')
      .execute();
    const devicesUpdated = await this.getDevices();
    return devicesUpdated;
  }

  async updateTemperatureToNineteen(): Promise<Device[]> {
    const query = this.createQueryBuilder('device');
    const devices = await query
      .update(Device)
      .set({
        temperature: () => '19',
      })
      .where('device.temperature=20')
      .execute();
    const devicesUpdated = await this.getDevices();
    return devicesUpdated;
  }

  async getTemperaturesBeyondNineteen(): Promise<string[]> {
    const query = this.createQueryBuilder('device');
    const names  = await query.select('device.deviceName','names').where('device.temperature>=19').getRawMany();
    return names;
  }

  async calculateHumidityBeyondNineteen(): Promise<number> {
    const query = this.createQueryBuilder('device');

    const devices = await query.where('device.temperature>19').getMany();
    let { sum } = await query
      .select('SUM(device.humidity)', 'sum')
      .getRawOne();
    const countRows = await query.where('device.temperature>19').getCount();

    const average = sum / countRows;

    return average;
  }

  async getListeComfort(): Promise<Device[]> {
    const query = this.createQueryBuilder('device');

    const devices = await query
      .where('device.humidity*100 BETWEEN 40 AND 60')
      .andWhere('device.temperature BETWEEN 18 AND 20')
      .getMany();

    return devices;
  }

  async deleteNonComfort(): Promise<string> {
    const query = this.createQueryBuilder('device');

    const devices = await query
      .delete()
      .from(Device)
      .where('device.humidity*100 <= 40')
      .orWhere('device.humidity*100 >= 60')
      .orWhere('device.temperature <= 18')
      .orWhere('device.temperature >= 20')
      .execute();

    return "deleted";
  }
}
