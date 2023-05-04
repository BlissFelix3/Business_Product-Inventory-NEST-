import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name is required!' })
  name: string;

  @IsNotEmpty({ message: 'Business name is required!' })
  businessName: string;

  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Please provide a valid email!' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required!' })
  @IsMobilePhone(null, {}, { message: 'Please provide a valid phone number' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @MinLength(6, { message: 'Password must be at least 8 characters long!' })
  @IsString()
  password: string;
}
