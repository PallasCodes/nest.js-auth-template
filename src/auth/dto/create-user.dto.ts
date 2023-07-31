import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  username: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must have a lowercase and uppercase letter, a number and must have 8 words minimum and 32 maximum',
  })
  password: string

  @IsString()
  @MinLength(1)
  @IsOptional()
  urlProfilePicture: string

  @IsString()
  @MinLength(1)
  @IsOptional()
  urlBannerPicture: string
}
