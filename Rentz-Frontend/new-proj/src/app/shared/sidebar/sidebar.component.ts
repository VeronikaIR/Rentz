import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {SidebarService} from "../service/sidebar.service";
import {MenuItem} from "../interface/interfaces";

// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
    menus: MenuItem[] = [];
  constructor(public sidebarservice: SidebarService) {

  }

  ngOnInit() {
    this.menus = this.sidebarservice.getMenuList();
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  // toggle(currentMenu:) {
  //   if (currentMenu.type === 'dropdown') {
  //     this.menus.forEach(element => {
  //       if (element === currentMenu) {
  //         currentMenu.active = !currentMenu.active;
  //       } else {
  //         element.active = false;
  //       }
  //     });
  //   }
  // }

  // getState(currentMenu) {
  //
  //   if (currentMenu.active) {
  //     return 'down';
  //   } else {
  //     return 'up';
  //   }
  // }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
