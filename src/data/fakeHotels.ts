import {
  randCity,
  randCompanyName,
  randCountry,
  randFullName,
  randNumber,
  randSoonDate,
  seed,
} from '@ngneat/falso';
import { randAddress } from '@ngneat/falso';

seed('some-constant-seed');

import * as fs from 'fs';

//expects src/data/hotels.json
export default class FakeHotels {
  public static fakeHotels: {
    name: string;
    total: number;
    country: string;
    city: string;
    address: string;
    price: number;
    bookings: { name: string; places: number; from: string; to: string }[];
  }[];

  constructor() {
    throw new Error('cannot instantiate using a static class');
  }

  static loadData(): boolean {
    try {
      FakeHotels.fakeHotels = JSON.parse(
        fs.readFileSync('./src/data/hotels.json', 'utf8'),
      );
      return true;
    } catch (err) {
      console.log('File read failed:', err);
      return false;
    }
  }

  static saveData(data: typeof FakeHotels.fakeHotels): boolean {
    this.loadData();
    try {
      fs.writeFileSync('./src/data/hotels.json', JSON.stringify(data));
      this.loadData();
      return true;
    } catch (err) {
      console.log('File read failed:', err);
      return false;
    }
  }
}
const hotels = Array(randNumber({ min: 8, max: 16 }))
  .fill(0)
  .map((v, index) => {
    const bookings = Array(randNumber({ min: 7, max: 50 }))
      .fill(0)
      .map(() => {
        const date1 = randSoonDate().toString();
        const date2 = randSoonDate().toString();
        return {
          name: randFullName(),
          places: randNumber({ min: 1, max: 3 }),
          from: date1 < date2 ? date1 : date2,
          to: date1 > date2 ? date1 : date2,
        };
      });
    return {
      id: index,
      name: randCompanyName({ length: 1 }).toString().slice(0, 10),
      total: randNumber({ min: 30, max: 100 }),
      country: randCountry().toString(),
      city: randCity().toString(),
      address: randAddress().street.toString(),
      price: randNumber({ min: 30, max: 300 }),
      bookings,
    };
  });
seed('some-constant-seed');
FakeHotels.saveData(hotels);
