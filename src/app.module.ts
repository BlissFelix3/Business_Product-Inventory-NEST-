import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entities/user.entity';
import { InventoryEntity } from './inventory/entities/inventory.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './common/constants';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, InventoryEntity],
      synchronize: true,
    }),
    UsersModule,
    InventoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },

    Logger,
  ],
})
export class AppModule {}
