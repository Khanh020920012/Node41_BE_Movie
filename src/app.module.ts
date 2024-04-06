import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CinemaChainModule } from './cinema_chain/cinema_chain.module';
import { CinemaGroupModule } from './cinema_group/cinema_group.module';
import { CinemaModule } from './cinema/cinema.module';
import { SeatModule } from './seat/seat.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [CinemaChainModule, CinemaGroupModule, CinemaModule, SeatModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
