import { IsNumber, IsISO8601, Min, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  hotelId: number;
  @Min(1)
  @IsNumber()
  peopleCount: number;
  @IsString()
  name: string;
  @IsISO8601()
  from: Date;
  @IsISO8601()
  to: Date;
}

//export class GetBookingDto extends PickType(CreateCatDto) {}
