import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'userName', length: 60, nullable: false })
    userName: string;

    @Column({ name: 'password', length: 60, nullable: false })
    password: string;
}
