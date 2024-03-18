import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
  ) { }

  async create(createMeetingDto: CreateMeetingDto) {
    const { companyName, location, meetingDate, summary } = createMeetingDto;

    const meeting = this.meetingsRepository.create({
      companyName,
      location,
      meetingDate,
      summary
    })
    await this.meetingsRepository.save(meeting)
    return 'Meeting added successfully'
  }

  findAll() {
    return this.meetingsRepository.find()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} meeting`;
  // }

  // update(id: number, updateMeetingDto: UpdateMeetingDto) {
  //   return `This action updates a #${id} meeting`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} meeting`;
  // }
}
