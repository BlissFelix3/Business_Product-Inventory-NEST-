import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }

  @Post('login')
  async login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }
}
