import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(@Body() userDto: User) {
    try {
      const createdUser = await this.authService.registerUser(userDto);
      return createdUser;
    } catch (err) {
      if (err instanceof ConflictException) {
        throw new ConflictException('Username already exists');
      }
      throw err;
    }
  }

  @Post('login')
  async login(@Body() userDto: User) {
    const user = await this.authService.validateUser(
      userDto.username,
      userDto.password,
    );

    if (user) {
      return this.authService.loginUser(user);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
