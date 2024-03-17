import { IsNotEmpty, MaxLength, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'userName field cannot be empty' })
    @IsString()
    @MinLength(3)
    @MaxLength(60)
    userName: string;

    @IsNotEmpty({ message: 'password field cannot be empty' })
    @IsString()
    @MinLength(3)
    @MaxLength(60)
    password: string;

}
