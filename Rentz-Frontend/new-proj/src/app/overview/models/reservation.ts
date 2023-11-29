import {FormControl} from "@angular/forms";

// export interface Reservation {
//   name: FormControl<string>;
//   town: FormControl<string>;
//   phone: FormControl<string>;
//   price: FormControl<number | null>;
//   reservationDate:  FormControl<Date | null>;
//   cardNumber:  FormControl<string | null>;
//   expiryDate:  FormControl<string | null>;
//   cvv:  FormControl<string | null>;
// }


export interface Reservation {
  name: string;
  town: string;
  phone: string;
  price: number | null;
  reservationDate: Date | null;
  cardNumber: string | null;
  expiryDate: string | null;
  cvv: string | null;
}
