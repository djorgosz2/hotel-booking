/*
import { rand, seed } from '@ngneat/falso';
import { randSuperhero } from '@ngneat/falso';
import { IsISO8601, IsNumber, IsString, Min } from 'class-validator';
seed('some-constant-seed');
*/
import { randAddress } from '@ngneat/falso';

export default [
  {
    id: 1,
    name: 'Hotel Example',
    country: 'Hungary',
    city: 'Budapest',
    total: 50,
    bookings: [
      {
        name: 'John',
        places: 2,
        from: '2022-01-01',
        to: '2022-01-02',
        address: randAddress(),
      },
    ],
    //block hotel on x y day array (renovation etc)
    //photo on frontend dir
  },
  {
    id: 2,
    name: 'Hotel 2 Example',
    city: 'City 2 Example',
    country: 'Hungary',
    total: 3,
    bookings: [
      {
        name: 'Marie',
        places: 3,
        from: '2022-01-01',
        to: '2022-01-02',
        address: randAddress(),
      },
    ],
    //block hotel on x y day array (renovation etc)?
    //photo on frontend dir
  },
];

// Always returns 2
//rand([1, 2, 3, 4, 5]);

// Reset random seed
//seed();
