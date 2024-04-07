import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CinemaChainModule } from './cinema_chain/cinema_chain.module';
import { CinemaGroupModule } from './cinema_group/cinema_group.module';
import { CinemaModule } from './cinema/cinema.module';
import { SeatModule } from './seat/seat.module';
import { MovieModule } from './movie/movie.module';
import { MovieScheduleModule } from './movie_schedule/movie_schedule.module';
import { MovieBookingModule } from './movie_booking/movie_booking.module';
import { UserModule } from './user/user.module';
import { BannerModule } from './banner/banner.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CinemaChainModule, CinemaGroupModule, CinemaModule, SeatModule, MovieModule, MovieScheduleModule, BannerModule, UserModule, MovieBookingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
