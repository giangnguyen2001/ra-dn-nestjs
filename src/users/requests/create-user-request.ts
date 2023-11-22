import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @MaxLength(50)
  firstName: string;

  @IsOptional()
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
