import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from 'src/modules/users/entities/phone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhonesService {

  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) { }

  create(phone: any, user: any) {

    if (user) {
      phone.user = user;
    }

    const newPhone = this.phoneRepository.create(phone);
    return this.phoneRepository.save(newPhone);
  }

  findAll() {
    return `This action returns all phones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phone`;
  }

  update(id: number, updatePhoneDto: UpdatePhoneDto) {
    return `This action updates a #${id} phone`;
  }

  remove(id: number) {
    return `This action removes a #${id} phone`;
  }
}
