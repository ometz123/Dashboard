import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty({ message: 'companyName field cannot be empty' })
    companyName: string;
}
