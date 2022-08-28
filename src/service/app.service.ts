import { Injectable } from '@nestjs/common';
import FakeHotels from '../data/fakeHotels';
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
    const fromTime = new Date(new Date(from).toLocaleDateString()).getTime();
    const toTime = new Date(new Date(from).toLocaleDateString()).getTime();
    const filters = _.pickBy({ country, city }, _.identity);
    const inCityHotels = _.filter(FakeHotels.fakeHotels, filters);
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
      //toLocaleDateString adds 2 hours back
      const begin = new Date(new Date(from).toLocaleDateString()).getTime();
      const end = new Date(new Date(from).toLocaleDateString()).getTime();
      if ((from >= begin && from <= end) || (to >= begin && to <= end)) {
        booked = booked + booking.places;
      }
    });
    return hotel.total - peopleCount - booked >= 0;
  }
  createBooking(body) {
    const hotelData = FakeHotels.fakeHotels;
    const hotelIndex = hotelData.findIndex(
      (hotel) => hotel['id'] == body.hotelId,
    );
    if (hotelIndex < 0)
      throw new Error('No Hotel with ' + body.hotelId + ' id was found');
    if (!hotelData[hotelIndex]['bookings']) {
      Object.assign(hotelData[hotelIndex], { bookings: [] });
    }
    const newBooking = {
      name: body.name,
      from: new Date(body.from).toLocaleDateString(),
      to: new Date(body.to).toLocaleDateString(),
      places: body.peopleCount,
    };
    hotelData[hotelIndex]['bookings'].push(newBooking);
    FakeHotels.saveData(hotelData);
    return hotelData[hotelIndex].bookings[
      hotelData[hotelIndex].bookings.length - 1
    ];
  }
}
