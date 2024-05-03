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
import { QuanLyDatVeModule } from './QuanLyDatVe/QuanLyDatVe.module';
import { QuanLyNguoiDungModule } from './QuanLyNguoiDung/QuanLyNguoiDung.module';
import { QuanLyRapModule } from './QuanLyRap/QuanLyRap.module';
import { QuanLyPhimModule } from './QuanLyPhim/QuanLyPhim.module';

@Module({
  imports: [CinemaChainModule, CinemaGroupModule, CinemaModule, SeatModule, 
    MovieModule, MovieScheduleModule, BannerModule, UserModule, MovieBookingModule, 
    AuthModule, QuanLyDatVeModule, QuanLyNguoiDungModule, QuanLyRapModule, QuanLyPhimModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
