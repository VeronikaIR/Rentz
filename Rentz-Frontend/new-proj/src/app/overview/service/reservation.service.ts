import {Injectable} from '@angular/core';
import {Reservation} from "../../shared/interface/reservation";
import {ReservationCreateDTO} from "../models/reservation";
import {Item} from "../models/item";
import {HttpClient} from "@angular/common/http";
import {CardService} from "../../shared/service/card.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/reservations';
  reservationsList: Reservation[] = [];

  constructor(private http: HttpClient) {
  }


  addReservation(reservation: Reservation) {
    this.reservationsList.push(reservation);
  }

  public checkout() {
    var reservations: ReservationCreateDTO[] = []
    this.reservationsList.forEach((res) => {
      reservations.push({
        ownerId: res.ownerId,
        itemId: res.item.id,
        totalPrice: res.totalPrice,
        bookedOn: res.bookedOn,
        bookedUntil: res.bookedUntil
      });
    });


    reservations.forEach((reservation) => {
      this.http.post<ReservationCreateDTO>(this.apiUrl, reservation).subscribe();
    });

    const observables = reservations.map((reservation) => {
      return this.http.post<ReservationCreateDTO>(this.apiUrl, reservation);
    });
  }
}
