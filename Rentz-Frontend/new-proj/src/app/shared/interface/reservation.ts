import {Item} from "../../overview/models/item";


export interface Reservation {
  ownerId: string;
  item: Item;
  totalPrice: number;
  bookedOn: Date;
  bookedUntil: Date;
}
