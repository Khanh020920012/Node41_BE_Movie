import { Module } from '@nestjs/common';
import { QuanLyRapController } from './QuanLyRap.controller';
import { QuanLyRapService } from './QuanLyRap.service';

@Module({
    controllers: [QuanLyRapController],
    providers: [QuanLyRapService]
})

export class QuanLyRapModule {}