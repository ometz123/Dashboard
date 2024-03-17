import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { userName, password } = createUserDto;
    const user = this.usersRepository.create({
      userName,
      password
    });
    await this.usersRepository.save(user)
    return `New user "${userName}" Created`
  }
  async login(userName: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        userName, password
      }
    })
    console.log({ user });

    if (!user) throw new NotFoundException("username or password is not correct.")

    return { userName }
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
