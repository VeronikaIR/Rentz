import { Component } from '@angular/core';
import {CardService} from "../../service/card.service";

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent {
  constructor(public cardService: CardService) {
  }

  getTotalPrice() {
    return this.cardService.getTotalPrice();
  }

  requestCheckout() {
    this.cardService.requestCheckout();
  }
}
