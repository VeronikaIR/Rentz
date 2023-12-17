import {Component, OnInit} from '@angular/core';
import {Item} from "../models/item";
import {ReservationCreateDTO} from "../models/reservation";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../service/item.service";
import {User} from "../../login/models/user";
import {AuthService} from "../../login/service/auth.service";
import {UserService} from "../../login/service/user.service";
import {ReservationService} from "../service/reservation.service";
import {Reservation} from "../../shared/interface/reservation";
import {CardService} from "../../shared/service/card.service";

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
  //reservationForm!: FormGroup;
  dateFormControl: FormControl<Date[]> = new FormControl();


  isFlipped: boolean = false;


  public selectedItem?: Item;
  public selectedUser!: User;


  constructor(private fb: FormBuilder,
              public itemService: ItemService,
              private authService: AuthService,
              public userService: UserService,
              public reservationService: ReservationService,
              public cardService: CardService) {
  }

  ngOnInit(): void {
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

  }

  reserve() {
    //this.isFlipped = !this.isFlipped;


    this.userService.user$.subscribe((user: User) => {

      if (this.selectedItem) {
        let bookedOn = this.dateFormControl.value[0];
        let bookedUntil = this.dateFormControl.value[1];

        let totalPrice = this.calculateDaysInRange(bookedOn, bookedUntil) * this.selectedItem.pricePerDay;

        const reservation: Reservation = {
          ownerId: user.id,
          item: this.selectedItem,
          totalPrice: totalPrice,
          bookedOn: bookedOn,
          bookedUntil: bookedUntil
        };
        this.cardService.addProductToCart(reservation);
        this.reservationService.addReservation(reservation);
      }
    });


    this.showItemInformation = false;

  }

  calculateDaysInRange(start: Date, end: Date) {
    return ((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }

  disableDates(item: Item | undefined): Date[] {
    console.log(item?.reservationDates);

    var disabledDates: Date[] = [];
    item?.reservationDates.forEach((date) => {
      disabledDates.push(new Date(date));
    });

    return disabledDates;
  }

  //
  // showReservationScreen(): void {
  //   console.log(this.showReservationForm);
  //   this.showReservationForm = !this.showReservationForm;
  // }


  createForm(): void {
    // this.reservationForm = this.fb.group({
    //   name: ['John Doe', Validators.required],
    //   town: ['Sofia', Validators.required],
    //   phone: ['+359 545 4332', Validators.required],
    //   price: [null, Validators.required],
    //   bookedOn: [null, Validators.required],
    //   bookedUntil: [null, Validators.required],
    //   cardNumber: [null, Validators.required],
    //   expiryDate: [null, Validators.required],
    //   cvv: [null, Validators.required],
    // });
  }

  onSubmit() {
    // Handle form submission logic here
    //console.log(this.reservationForm.value);
  }


  // /*************** Date picker **************************/
  // onDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //   } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
  //     this.toDate = date;
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //   }
  // }
  //
  // isHovered(date: NgbDate) {
  //   return (
  //     this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
  //   );
  // }
  //
  // isInside(date: NgbDate) {
  //   return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  // }
  //
  // isRange(date: NgbDate) {
  //   return (
  //     date.equals(this.fromDate) ||
  //     (this.toDate && date.equals(this.toDate)) ||
  //     this.isInside(date) ||
  //     this.isHovered(date)
  //   );
  // }
  //
  // validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
  //   const parsed = this.formatter.parse(input);
  //   return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  // }

  protected readonly Date = Date;

  checkout() {
    this.reservationService.checkout();


  }
}
