import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Item} from "../models/item";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  showItemInformation: boolean = false;
  showReservationForm: boolean = false;
  reservationForm!: FormGroup;


  isFlipped: boolean = false;


  items: Item[] = [
    {id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300'},
    {id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300'},
    {id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300'},
    {id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300'},
    {id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300'},
    {id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300'},
    {id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300'},
    {id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300'},
    {id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300'},
    {id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300'},
    {id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300'},
    {id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300'},
    {id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300'},
    {id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300'},
    {id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300'},
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }


  // constructor(private itemService: ItemService) { }

  public showItemInfo(): void {
    this.showItemInformation = !this.showItemInformation;
  }

  flip() {
    this.isFlipped = !this.isFlipped;

  }

  //
  // showReservationScreen(): void {
  //   console.log(this.showReservationForm);
  //   this.showReservationForm = !this.showReservationForm;
  // }


  createForm(): void {
    this.reservationForm = this.fb.group({
      name: ['John Doe', Validators.required],
      town: ['Sofia', Validators.required],
      phone: ['+359 545 4332', Validators.required],
      price: [null, Validators.required],
      reservationDate: [null, Validators.required],
      cardNumber: [null, Validators.required],
      expiryDate: [null, Validators.required],
      cvv: [null, Validators.required],
    });
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.reservationForm.value);
  }


}
