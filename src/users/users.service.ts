import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  CustomError,
  E_USER_EMAIL_EXISTS,
  HttpStatus,
} from 'src/common/custom/customError';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser)
      throw new CustomError(E_USER_EMAIL_EXISTS, HttpStatus.CONFLICT);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
