import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../types';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ nullable: true })
    phone!: string;

    @Column({ nullable: true })
    country!: string;

    @Column({ nullable: true })
    postalCode!: string;

    @Column({ type: 'int', nullable: true })
    age!: number;

    @Column({ nullable: true })
    gender!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: UserRole;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin!: Date;

    @Column({ nullable: true })
    resetPasswordToken!: string;

    @Column({ type: 'timestamp', nullable: true })
    resetPasswordExpires!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
