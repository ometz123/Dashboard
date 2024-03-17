import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetingsModule } from './meetings/meetings.module';
import { CompaniesModule } from './companies/companies.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Company } from './companies/entities/company.entity';
// import { User } from './users/entities/user.entity';
// import { Meeting } from './meetings/entities/meeting.entity';
// import { Statistic } from './statistics/entities/statistic.entity';
import { ConfigModule } from '@nestjs/config';
//import configuration from './config/configuration';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    MeetingsModule,
    CompaniesModule,
    StatisticsModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
