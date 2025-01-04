import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as db from '../db.json';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    console.log('db: ', db.products);
    return this.appService.getHello();
  }
}
