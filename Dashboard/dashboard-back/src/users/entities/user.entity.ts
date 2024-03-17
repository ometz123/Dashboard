import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dashboard_users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'userName', length: 60, nullable: false })
    userName: string;

    @Column({ name: 'password', length: 60, nullable: false })
    password: string;
}
