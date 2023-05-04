import { Module, ValidationPipe } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { JWT_EXPIRES_IN } from 'src/common/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: JWT_EXPIRES_IN },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
