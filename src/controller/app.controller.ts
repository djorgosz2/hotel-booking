import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hotels')
  findHotels(
    @Query('from') from: Date,
    @Query('to') to: Date,
    @Query('city') city: string,
    @Query('country') country: string,
    @Query('peopleCount') peopleCount: number,
  ) {
    console.log('params', from, to, city, peopleCount);
    if (!peopleCount || peopleCount == 0) peopleCount = 1;
    const result = this.appService.getHotels(
      country,
      city,
      from,
      to,
      peopleCount,
    );
    console.log(result);
    return result;
  }
  /*
  @Post("/")
  createBooking(@Body() bookDto: CreateBookingDto) {
    this.appService.createBooking();
  }*/
}
