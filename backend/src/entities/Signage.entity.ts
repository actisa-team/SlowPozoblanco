import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Index } from 'typeorm';
import { TourismResource } from './TourismResource.entity';

export enum DeviceStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    MAINTENANCE = 'maintenance'
}

@Entity('signage')
export class Signage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    // @Index({ spatial: true })
    // @Column({
    //     type: 'geometry',
    //     spatialFeatureType: 'Point',
    //     srid: 4326,
    //     nullable: true
    // })
    // location!: any;string;

    @Column({ unique: true })
    deviceId!: string;

    @Column({
        type: 'enum',
        enum: DeviceStatus,
        default: DeviceStatus.OFFLINE
    })
    status!: DeviceStatus;

    @Column({ type: 'timestamp', nullable: true })
    lastHeartbeat!: Date;

    @OneToOne(() => TourismResource)
    @JoinColumn()
    associatedResource!: TourismResource;

    @Column('int', { default: 0 })
    interactionCount!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
