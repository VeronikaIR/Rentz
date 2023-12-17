export interface ReservationCreateDTO {
  ownerId: string;
  itemId: string;
  totalPrice: number;
  bookedOn: Date;
  bookedUntil: Date;
}
