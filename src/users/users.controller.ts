import {
  Controller,
  ValidationPipe,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request as ExpressRequest } from "express";
import { Users } from "./users.entity";
import { DeleteUserDto } from "./dto/deleteuser.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: "회원 가입" })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: "회원 가입 완료" })
  @Post("/signup")
  async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto
  ): Promise<{ message: string }> {
    const user = await this.userService.signup(signUpDto);
    return { message: `${user.nickname}님 회원 가입이 완료 되었습니다.` };
  }

  @ApiOperation({ summary: "회원 가입 시 아이디 확인" })
  // @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 200, description: "회원 가입 완료" })
  @Post("/signup/idcheck")
  async idcheck(@Body() id: string) {
    await this.userService.checkId(id);
    return { message: `${id}는 사용 가능한 ID입니다.` };
  }

  @ApiOperation({ summary: "회원 가입 시 아이디 확인" })
  // @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 200, description: "회원 가입 완료" })
  @Post("/signup/idcheck")
  async nicknamecheck(@Body() nickname: string) {
    await this.userService.checkNickname(nickname);
    return { message: `${nickname}는 사용 가능한 ID입니다.` };
  }

  @ApiOperation({ summary: "로그인" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "로그인 성공" })
  @Post("/login")
  async login(
    @Body(ValidationPipe) id: string,
    password: string
  ): Promise<{ message: string; token: string; nickname: string }> {
    return await this.userService.login(id, password);
  }

  @ApiOperation({ summary: "회원 프로필 사진 수정" })
  @ApiResponse({ status: 200, description: "프로필 사진 수정 완료" })
  @Patch("/uploadprofile")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("file"))
  async uploadProfile(
    @Req() req: ExpressRequest & { user: Users },
    @UploadedFile() file: Express.Multer.File
  ) {
    const { userId } = req.user;
    await this.userService.uploadProfile(
      userId,
      file.buffer,
      file.originalname
    );
  }

  @ApiOperation({ summary: "회원탈퇴" })
  @ApiBody({ type: DeleteUserDto })
  @ApiResponse({ status: 200, description: "회원 탈퇴 성공" })
  @Delete("/delete")
  @UseGuards(AuthGuard("jwt"))
  async deleteuser(@Req() req: ExpressRequest & { user: Users }) {
    const user = req.user;
    return await this.userService.deleteuser(user.userId);
  }
}
