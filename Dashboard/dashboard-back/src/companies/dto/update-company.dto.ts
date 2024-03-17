import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsNotEmpty, IsInt } from 'class-validator';


export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @IsNotEmpty({ message: 'company name field cannot be empty' })
    companyName: string;
  
}
