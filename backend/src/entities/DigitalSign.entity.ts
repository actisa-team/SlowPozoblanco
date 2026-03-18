import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('digital_signs')
export class DigitalSign {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    location!: string;

    @Column({ default: 'offline' }) // 'online' | 'offline'
    status!: string;

    @Column({ type: 'timestamp', nullable: true })
    lastPing!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
