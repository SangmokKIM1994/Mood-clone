import { ApiResponseProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  Equals,
  IsEmail,
} from 'class-validator';

export class SignUpDto {
  @ApiResponseProperty({ example: 'yeong0319' })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  id: string;

  @ApiResponseProperty({ example: 'tkdahr$56' })
  @IsString()
  @MinLength(9)
  @MaxLength(15)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
    message: '비밀번호 값을 확인하세요.',
  })
  password: string;

  @ApiResponseProperty({ example: 'tkdahr$56' })
  @IsString()
  @MinLength(9)
  @MaxLength(15)
  @Equals('password', { message: '비밀번호 확인을 확인하세요' })
  confirm: string;

  @ApiResponseProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: '유효한 이메일 주소를 입력하세요' })
  email: string;

  @ApiResponseProperty({ example: 'Mozz' })
  @IsString()
  @MinLength(2)
  @MaxLength(8)
  nickname: string;
}
