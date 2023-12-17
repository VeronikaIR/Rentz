import {Component} from '@angular/core';
import {SidebarService} from "./shared/service/sidebar.service";
import {ItemService} from "./overview/service/item.service";
import {CardService} from "./shared/service/card.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

   cartProductCount: number = 0

  constructor(public sidebarservice: SidebarService, public itemService: ItemService, public cardService: CardService) {
    this.cardService.getProducts().subscribe(data => {
      this.cartProductCount = data.length;
    })
  }
}
