import { IsNotEmpty } from 'class-validator';

export class createDeviceDto {
  @IsNotEmpty()
  deviceName: string;

  @IsNotEmpty()
  temperature: string;

  @IsNotEmpty()
  humidity: string;
}
