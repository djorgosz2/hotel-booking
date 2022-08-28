import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { CreateBookingDto } from '../data/CreateBookingDto';

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
    if (!peopleCount || peopleCount == 0) peopleCount = 1;
    const result = this.appService.getHotels(
      country,
      city,
      from,
      to,
      peopleCount,
    );
    return result;
  }
  @Post('/booking')
  createBooking(@Body() bookDto: CreateBookingDto) {
    return this.appService.createBooking(bookDto);
  }
}
