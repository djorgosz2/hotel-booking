import { Injectable } from '@nestjs/common';
import hotelData from '../data/fakeHotels';
import * as _ from 'lodash';

@Injectable()
export class AppService {
  getHotels(
    country: string,
    city: string,
    from: Date,
    to: Date,
    peopleCount: number,
  ): Record<string, unknown> {
    const fromTime = new Date(from).getTime();
    const toTime = new Date(from).getTime();
    const filters = _.pickBy({ country, city }, _.identity);
    const inCityHotels = _.filter(hotelData, filters);
    return inCityHotels.filter((hotel) =>
      this.isHotelBookable(hotel, fromTime, toTime, peopleCount),
    );
  }

  isHotelBookable(
    hotel,
    from: number,
    to: number,
    peopleCount: number,
  ): boolean {
    let booked = 0;
    //data validation on lower data layers needed
    hotel.bookings.forEach((booking) => {
      const begin = new Date(booking.from).getTime();
      const end = new Date(booking.to).getTime();
      if ((from >= begin && from <= end) || (to >= begin && to <= end)) {
        booked = booked + booking.places;
      }
    });
    return hotel.total - peopleCount - booked >= 0;
  }
}
