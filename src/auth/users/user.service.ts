import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async createUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
