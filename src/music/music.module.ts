import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfos } from 'src/users/userInfos.entity';
import { Users } from 'src/users/users.entity';
import { Musics } from './music.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[TypeOrmModule.forFeature([Users,UserInfos,Musics])],
  controllers: [MusicController],
  providers: [MusicService, UsersService]
})
export class MusicModule {}
