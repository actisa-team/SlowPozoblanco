import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('parking_spaces')
export class ParkingSpace {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    zone!: string;

    @Column()
    spaceNumber!: string;

    @Column({ type: 'float', default: 0 })
    latitude!: number;

    @Column({ type: 'float', default: 0 })
    longitude!: number;

    // @Index({ spatial: true })
    // @Column({
    //     type: 'geometry',
    //     spatialFeatureType: 'Point',
    //     srid: 4326,
    //     nullable: true
    // })
    // location!: any;string;

    @Column({ default: false })
    isOccupied!: boolean;

    @Column({ type: 'timestamp', nullable: true })
    occupiedSince!: Date;

    @Column()
    sensorId!: string;

    @Column({ type: 'timestamp', nullable: true })
    lastHeartbeat!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
