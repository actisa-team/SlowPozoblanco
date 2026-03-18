import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

export enum AuditAction {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    LOGIN = 'LOGIN'
}

@Entity('audit_logs')
export class AuditLog {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, { nullable: true })
    user!: User;

    @Column({
        type: 'enum',
        enum: AuditAction
    })
    action!: AuditAction;

    @Column()
    entity!: string;

    @Column({ nullable: true })
    entityId!: string;

    @Column('jsonb', { nullable: true })
    changes!: any;

    @Column()
    ipAddress!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
