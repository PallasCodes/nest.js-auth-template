import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({ nullable: false })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  password: string
}
