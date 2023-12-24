import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Reservation} from "../interface/reservation";
import {ReservationService} from "../../overview/service/reservation.service";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public cartItems: Reservation[] = [];
  public products = new Subject();
  public checkoutRequested:boolean = false;

  public isShoppingCartOpen: boolean = false;

  constructor(
    private reservationService: ReservationService
  ) {
  }

  getProducts(): Observable<any> {
    console.log('this.cartItems :', this.cartItems);
    return this.products.asObservable();
  }

  addProductToCart(reservation: Reservation) {
    this.cartItems.push(reservation);
    this.products.next(this.cartItems);
  }

  // Remove single product from the cart
  removeProductFromCart(productId: string) {
    this.cartItems.map((item: Reservation, index: number) => {
      if (item.item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    this.reservationService.reservationsList.map((item: Reservation, index: number) => {
      if (item.item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    // Update Observable value
    this.products.next(this.cartItems);
  }

  openShoppingCart(flag: boolean): void {
    this.isShoppingCartOpen = !this.isShoppingCartOpen;
  }


  emptyCart() {
    this.cartItems.length = 0;
    this.products.next(this.cartItems);
    this.checkoutRequested = false;
  }

  //Calculate total price on item added to the cart
  getTotalPrice() {
    let total = 0;

    this.cartItems.map(item => {
      total += item?.totalPrice;
    });

    return total
  }

  requestCheckout() {
    this.checkoutRequested = true;
  }

  public getCheckoutStatus() {
    return this.checkoutRequested;
  }


  // getReservationsByUserId(userId: string): Observable<Reservation> {
  //
  // }
}
