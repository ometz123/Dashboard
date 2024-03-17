import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dashboard_meetings')
export class Meeting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'companyName', length: 60, nullable: false })
    companyName: string;

    @Column({ name: 'location', length: 60, nullable: false })
    location: string

    @Column({ name: 'meetingDate', type: Date, nullable: false })
    meetingDate: Date

    @Column({ name: 'summary', length: 60, nullable: false })
    summary: string

}
