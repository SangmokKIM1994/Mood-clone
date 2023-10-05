import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfos } from 'src/users/userInfos.entity';
import { Users } from 'src/users/users.entity';
import { Musics } from './music.entity';
import { UsersService } from 'src/users/users.service';
import { S3Service } from 'src/aws/s3.service';
import { OpenAiService } from 'src/openai/openai.client';
import { Streamings } from 'src/streamings/streamings.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users,UserInfos,Musics,Streamings])],
  controllers: [MusicController],
  providers: [MusicService, UsersService,S3Service,OpenAiService]
})
export class MusicModule {}
