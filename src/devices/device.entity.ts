import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceName: string;

  @Column({ type: 'real' })
  temperature: string;

  @Column({ type: 'real' })
  humidity: string;
}
