import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CustomError,
  E_INCORRECT_EMAIL_OR_PASSWORD,
  HttpStatus,
} from 'src/common/custom/customError';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtPayload } from 'src/users/interface/users.interface';
import { JWT_SECRET } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersService.create(createUserDto);
    delete user.password;
    return user;
  }

  // async validateUser(email: string, password: string) {
  //   const user = await this.usersService.findByEmail(email);

  //   if (user && user.validatePassword(password)) {
  //     return user;
  //   }

  //   throw CustomErrorFactory(
  //     E_INCORRECT_EMAIL_OR_PASSWORD,
  //     HttpStatus.CONFLICT,
  //   );
  // }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new CustomError(E_INCORRECT_EMAIL_OR_PASSWORD, HttpStatus.CONFLICT);
    }
    const payload: JwtPayload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { secret: JWT_SECRET });
    return { accessToken };
  }

  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<UserEntity | undefined> {
    return this.usersService.findById(payload.id);
  }
}
