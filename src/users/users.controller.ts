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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { SignUpDto } from "./dto/signup.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: "회원 가입" })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: "회원 가입 완료" })
  @Post()
  async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto
  ): Promise<{ message: string }> {
    const user = await this.userService.signup(signUpDto);
    return { message: `${user.nickname}님 회원 가입이 완료 되었습니다.` };
  }

  @ApiOperation({ summary: "로그인" })
  // @ApiBody({ type: { id: string, password: string } })
  @ApiResponse({ status: 200, description: "로그인 성공" })
  @Post("/login")
  async login(
    @Body(ValidationPipe) id: string,
    password: string
  ): Promise<{ message: string; token: string; nickname: string }> {
    return await this.userService.login(id, password);
  }
}
