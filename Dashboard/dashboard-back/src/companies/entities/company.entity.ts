import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dashboard_companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'companyName', length: 60, nullable: false })
    companyName: string;
}
