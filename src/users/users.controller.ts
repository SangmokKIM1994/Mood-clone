import {
  Controller,
  ValidationPipe,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { SignUpDto } from "./dto/signup.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto
  ): Promise<{ message: string }> {
    const user = await this.userService.signup(signUpDto);
    return { message: `${user.nickname}님 회원 가입이 완료 되었습니다.` };
  }
}
