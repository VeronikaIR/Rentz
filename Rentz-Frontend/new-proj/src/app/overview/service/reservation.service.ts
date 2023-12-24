import {Injectable} from '@angular/core';
import {Reservation} from "../../shared/interface/reservation";
import {ReservationCreateDTO} from "../models/reservation";
import {HttpClient} from "@angular/common/http";
import {ItemService} from "./item.service";
import {CardService} from "../../shared/service/card.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/reservations';
  reservationsList: Reservation[] = [];

  constructor(private http: HttpClient, private itemService: ItemService) {
  }


  addReservation(reservation: Reservation) {
    this.reservationsList.push(reservation);
  }

  public checkout() {
    // var reservations: ReservationCreateDTO[] = [];
    // this.reservationsList.forEach((res) => {
    //   reservations.push({
    //     ownerId: res.ownerId,
    //     itemId: res.item.id,
    //     totalPrice: res.totalPrice,
    //     bookedOn: res.bookedOn,
    //     bookedUntil: res.bookedUntil
    //   });
    // });
    //
    //
    // // reservations.forEach((reservation) => {
    // this.http.post<ReservationCreateDTO>(this.apiUrl, reservations).subscribe(() => {
    //   //TODO empty basket
    // //  this.ov
    //   this.itemService.getItems().subscribe(
    //     (data) => {
    //       this.itemService.items = data;
    //       this.itemService.filteredItems = data;
    //     },
    //     (error) => {
    //       console.error('Error fetching items:', error);
    //     }
    //   );
    // });
  }
}
