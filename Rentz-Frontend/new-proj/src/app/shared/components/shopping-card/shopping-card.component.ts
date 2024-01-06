import {Component, OnInit} from '@angular/core';
import {CardService} from "../../service/card.service";
import {UserService} from "../../../side-bar/service/user.service";
import {sum} from "@angular/fire/firestore";
import {HttpClient} from "@angular/common/http";
import {ReservationCreateDTO} from "../../../overview/models/reservation";
import {switchMap, take} from "rxjs";
import {ReservationService} from "../../../overview/service/reservation.service";

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent {
  constructor(public cardService: CardService, public userService: UserService, private http: HttpClient, private reservationService: ReservationService) {
  }

  getTotalPrice() {
    return this.cardService.getTotalPrice();
  }

  // requestCheckout() {
  //
  //
  //     return this.http.post('https://sandbox.paypal.com'+'paypal/make/payment?sum='+sum, {})
  //       .map((response: Response) => response.json());
  //   //this.cardService.requestCheckout();
  // }


  onPaymentCreate(): void {
    // Make a POST request to your Spring Boot backend
    const sum = this.getTotalPrice();
    this.http.post<any>('http://localhost:8080/paypal/make/payment?sum='+sum, {})
      .subscribe(response => {
        if (response.status == "success") {
          // Handle successful creation on the frontend

          // Check if the response has a redirect_url
          if (response.redirect_url) {
            // Redirect to the specified URL
            this.makeReservation(response.redirect_url);
          } else {
            console.log('Redirect URL not found in the response');
          }
        } else {
          // Handle failure on the frontend
          console.log('Payment creation failed');
        }
      });
  }

  makeReservation(redirectUrl: string) {
    var reservations: ReservationCreateDTO[] = [];
    this.reservationService.reservationsList.forEach((res) => {
      reservations.push({
        ownerId: res.ownerId,
        itemId: res.item.id,
        totalPrice: res.totalPrice,
        bookedOn: res.bookedOn,
        bookedUntil: res.bookedUntil
      });
    });

    this.http.post('http://localhost:8080/api/reservations', reservations)
      .subscribe((data) => {
        window.location.href = redirectUrl;
      });


  }


  onPaymentSuccess(details: any): void {
    // Make a POST request to your Spring Boot backend
    const orderId = details.id;
    this.http.post<any>('http://localhost:8080/paypal/complete/payment', { orderId })
      .subscribe(response => {
        if (response.success) {
          // Handle successful completion on the frontend
          console.log('Payment completed successfully');
        } else {
          // Handle failure on the frontend
          console.log('Payment completion failed');
        }
      });
  }

  onPaymentCancel(): void {
    // Handle canceled payment
    console.log('Payment canceled');
  }
}
