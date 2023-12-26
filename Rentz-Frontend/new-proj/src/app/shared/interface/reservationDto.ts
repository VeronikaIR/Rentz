export interface ReservationDto {
  ownerId: string;
  itemTitle: string;
  totalPrice: number;
  bookedOn: Date;
  bookedUntil: Date;
}
