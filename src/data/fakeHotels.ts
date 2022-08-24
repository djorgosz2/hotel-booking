/*
import { rand, seed } from '@ngneat/falso';
import { randSuperhero } from '@ngneat/falso';
import { IsISO8601, IsNumber, IsString, Min } from 'class-validator';
import { randAddress } from '@ngneat/falso';
seed('some-constant-seed');
*/

import * as fs from 'fs';

//expects src/data/hotels.json
export default class FakeHotels {
  public static fakeHotels: {
    name: string;
    total: number;
    country: string;
    city: string;
    address: string;
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
FakeHotels.loadData();
//export default

// Always returns 2
//rand([1, 2, 3, 4, 5]);

// Reset random seed
//seed();
