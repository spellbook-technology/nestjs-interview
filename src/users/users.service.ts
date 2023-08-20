import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneByOrFail({ id });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  remove(user: User) {
    return this.usersRepository.delete(user);
  }
}
