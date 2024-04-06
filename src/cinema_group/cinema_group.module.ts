import { Module } from '@nestjs/common';
import { CinemaGroupService } from './cinema_group.service';
import { CinemaGroupController } from './cinema_group.controller';
import { ResponseService } from 'src/utils/response.service';

@Module({
  controllers: [CinemaGroupController],
  providers: [CinemaGroupService, ResponseService],
})
export class CinemaGroupModule {}
