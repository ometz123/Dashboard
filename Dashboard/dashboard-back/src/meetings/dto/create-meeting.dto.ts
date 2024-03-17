import { IsNotEmpty, IsInt, IsString, IsDate, MaxLength, MinLength } from 'class-validator';

export class CreateMeetingDto {
    @IsNotEmpty({ message: 'companyName field cannot be empty' })
    @IsString()
    @MinLength(3)
    @MaxLength(60)
    companyName: string;

    @IsNotEmpty({ message: 'location field cannot be empty' })
    @IsString()
    @MinLength(3)
    @MaxLength(60)
    location: string

    @IsNotEmpty({ message: 'meetingDate field cannot be empty' })
    @IsDate()
    meetingDate: Date

    @IsNotEmpty({ message: 'summary field cannot be empty' })
    @IsString()
    @MinLength(3)
    @MaxLength(60)
    summary: string

}
