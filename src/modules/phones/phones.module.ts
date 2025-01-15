import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from 'src/modules/users/entities/phone.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phone]),
  ],
  controllers: [PhonesController],
  providers: [PhonesService],
  exports: [PhonesService],
})
export class PhonesModule { }
