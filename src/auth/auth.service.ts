import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/user.entity';
import { UsersService } from './users/user.service';
import * as bcrypt from 'bcryptjs';
import { JWT_SECRET } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUserByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async registerUser(user: User): Promise<User> {
    const { username } = user;
    const userNameExists = await this.usersService.getUserByUsername(username);
    if (userNameExists) {
      throw new ConflictException('Username already exists');
    }
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    const createdUser = await this.usersService.createUser(user);
    return createdUser;
  }

  async loginUser(user: User) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload, { secret: JWT_SECRET }),
    };
  }
}
