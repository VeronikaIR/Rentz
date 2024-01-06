import {Component, OnInit} from '@angular/core';
import {Item} from "../../models/item";
import {FormControl} from "@angular/forms";
import {ItemService} from "../../service/item.service";
import {User} from "../../../side-bar/models/user";
import {UserService} from "../../../side-bar/service/user.service";
import {ReservationService} from "../../service/reservation.service";
import {Reservation} from "../../../shared/interface/reservation";
import {CardService} from "../../../shared/service/card.service";
import {ReservationCreateDTO} from "../../models/reservation";
import {HttpClient} from "@angular/common/http";
import {switchMap, take} from "rxjs";
import {ActivatedRoute} from "@angular/router";

interface DateParts {
  year: number;
  month: number;
  day: number;
}


@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {


  showItemInformation: boolean = false;
  showCheckoutPopup: boolean = false;
  isPageLoaded: boolean = false;
  showReservationForm: boolean = false;
  dateFormControl: FormControl<Date[]> = new FormControl();
  succsessCheckout: boolean = false;


  isFlipped: boolean = false;
  isClickedReserve: boolean = false;


  public selectedItem?: Item;
  totalPrice: number = 0;
  public selectedUser!: User;

  protected readonly Date = Date;

  constructor(
    public itemService: ItemService,
    public userService: UserService,
    public http: HttpClient,
    public reservationService: ReservationService,
    public cardService: CardService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dateFormControl.valueChanges.subscribe((event) => {
      let bookedOn = this.dateFormControl.value[0];
      let bookedUntil = this.dateFormControl.value[1];
      if (this.selectedItem) {
        this.totalPrice = this.countDaysBetweenDates(bookedOn, bookedUntil, this.selectedItem.reservationDates) * this.selectedItem.pricePerDay;
      }
    });


    this.route.queryParams.subscribe(params => {
      if (params['paymentId'] && params['PayerID']) {
        const paymentId = params['paymentId'];
        const payerId = params['PayerID'];

        this.http.post<any>('http://localhost:8080/paypal/complete/payment', {
          'paymentId': paymentId,
          'PayerID': payerId
        })
          .subscribe(response => {
            if (response.status == 'success') {
              // Handle successful completion on the frontend
              alert('✅ Payment completed successfully!');
              console.log('Payment completed successfully');
            } else {
              // Handle failure on the frontend
              alert('🛑 Payment completion failed!\n\nDetails: ' + response.error);
              console.log('Payment completion failed');
            }
          });
      }
    });
    // this.createForm();
    //this.myDateValue = new Date();
    this.itemService.getItems().subscribe(
      (data) => {
        this.itemService.items = data;
        this.itemService.filteredItems = data;
        this.isPageLoaded = true;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );


    // this.itemService.itemsSubject$.pipe(take(1)).subscribe((items: Item[]) => {
    //   this.itemService.setItemsSubject(items)
    //   this.itemService.items = items;
    // })

  }


  // constructor(private itemService: ItemService) { }

  public showItemInfo(item: Item): void {
    this.selectedItem = item;
    this.showItemInformation = !this.showItemInformation;
    // this.authService.getUserById(item.ownerId).subscribe((user) => {
    //   if (user) {
    //
    //     this.selectedUser = user;
    //     this.isPageLoaded = true;
    //     // this.showItemInformation = !this.showItemInformation;
    //     this.showItemInformation =true;
    //
    //   }
    // }, error => {
    //   console.error('Error fetching user');
    // });
  }


  public closeItemInfo(): void {
    this.showItemInformation = false;
    this.cardService.checkoutRequested = false;
    this.succsessCheckout = false;
    this.dateFormControl.reset();

  }

  reserve() {

    if (this.dateFormControl.value) {
      this.showItemInformation = false;
      this.isClickedReserve = true;
      this.isClickedReserve = false;
    }


    this.userService.user$.subscribe((user) => {

      if (this.selectedItem && user) {
        this.isClickedReserve = true;
        let bookedOn = this.dateFormControl.value[0];
        let bookedUntil = this.dateFormControl.value[1];

        this.totalPrice = this.countDaysBetweenDates(bookedOn, bookedUntil, this.selectedItem.reservationDates) * this.selectedItem.pricePerDay;

        const reservation: Reservation = {
          ownerId: user.id,
          item: this.selectedItem,
          totalPrice: this.totalPrice,
          bookedOn: bookedOn,
          bookedUntil: bookedUntil
        };
        this.cardService.addProductToCart(reservation);
        this.reservationService.addReservation(reservation);
      }
      this.totalPrice = 0;
    });


    this.dateFormControl.reset();

  }

  countDaysBetweenDates(startDate: Date, endDate: Date, excludeDates: Date[]): number {
    let datesCopy: Date[] = [...excludeDates].map((dateString: Date) => new Date(dateString));
    let days: number = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      let flag = false;
      datesCopy.forEach((date) => {
        if (date.getUTCFullYear() === currentDate.getUTCFullYear()
          && date.getMonth() === currentDate.getMonth()
          && date.getDate() === currentDate.getDate()) {
          flag = true;
        }
      });
      if (!flag) {
        days++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  }

  disableDates(item: Item | undefined): Date[] {
    var disabledDates: Date[] = [];
    item?.reservationDates.forEach((date) => {
      disabledDates.push(new Date(date));
    });

    return disabledDates;
  }


  checkout() {
    // this.reservationService.checkout();

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
      .pipe(
        take(1),
        switchMap(() => {
          this.succsessCheckout = true;
          return this.itemService.getItems();
        }))
      .subscribe((data) => {
        this.itemService.items = data;
        this.itemService.filteredItems = data;
      });


    // this.itemService.getItems().pipe(take(1),
    //   switchMap((data) => {
    //     this.itemService.items = data;
    //     this.itemService.filteredItems = data;
    //
    //     return this.http.post('http://localhost:8080/api/reservations', reservations);
    //   })).subscribe(() => {
    //   this.succsessCheckout = true;
    // });

    // reservations.forEach((reservation) => {
    // this.http.post<string>('http://localhost:8080/api/reservations', reservations).subscribe((result: string) => {
    //
    //   if (result) {
    //     //disable button
    //     this.succsessCheckout = true;
    //
    //     this.cardService.emptyCart();
    //     this.itemService.getItems().subscribe(
    //       (data) => {
    //         this.itemService.items = data;
    //         this.itemService.filteredItems = data;
    //       },
    //       (error) => {
    //         console.error('Error fetching items:', error);
    //       }
    //     );
    //   }
    // });
  }

  continueShopping(): void {
    this.cardService.emptyCart();
    this.showItemInformation = false;
    this.cardService.checkoutRequested = false;
    this.succsessCheckout = false;
  }
}
