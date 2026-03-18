import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TourismResourceCategory {
    MONUMENT = 'MONUMENT',
    MUSEUM = 'MUSEUM',
    PARK = 'PARK',
    RESTAURANT = 'RESTAURANT',
    HOTEL = 'HOTEL',
    OTHER = 'OTHER'
}

@Entity('tourism_resources')
export class TourismResource {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column('text')
    description!: string;

    @Column({
        type: 'enum',
        enum: TourismResourceCategory,
        default: TourismResourceCategory.MONUMENT
    })
    category!: TourismResourceCategory;

    @Column('decimal', { precision: 10, scale: 6 })
    latitude!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    longitude!: number;

    @Column()
    address!: string;

    @Column({ nullable: true })
    phone!: string;

    @Column({ nullable: true })
    website!: string;

    @Column({ nullable: true })
    email!: string;

    @Column('jsonb', { nullable: true, default: () => "'{}'" })
    media!: {
        images?: string[];
        images360?: string[];
        videos?: string[];
        videos360?: string[];
    };

    @Column('decimal', { precision: 2, scale: 1, default: 0 })
    rating!: number;

    @Column('int', { default: 0 })
    visitorCount!: number;

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
