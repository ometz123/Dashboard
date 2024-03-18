import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';

export default registerAs(
    'database',
    (): TypeOrmModuleOptions => ({
        type: 'mssql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        options: {
            encrypt: false,
        },
        synchronize: true,
        entities: [Company, User, Meeting],
    }),
);