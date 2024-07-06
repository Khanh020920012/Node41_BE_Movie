import { Module } from '@nestjs/common';
import { QuanLyDatVeController } from './QuanLyDatVe.controller';
import { QuanLyDatVeService } from './QuanLyDatVe.service';

@Module({
    controllers: [QuanLyDatVeController],
    providers: [QuanLyDatVeService]
})

export class QuanLyDatVeModule {}
//