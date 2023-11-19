import { Component } from '@angular/core';
import {Item} from "../models/item";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent {

  showForm: boolean = false;

  items: Item[] =  [
    { id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300' },
    { id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300' },
    { id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300' },
    { id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300' },
    { id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300' },
    { id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300' },
    { id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300' },
    { id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300' },
    { id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300' },
    { id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300' },
    { id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300' },
    { id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300' },
    { id: 1, title: 'Item 1', description: 'This is the first item.', picture: 'https://picsum.photos/200/300' },
    { id: 2, title: 'Item 2', description: 'This is the second item.', picture: 'https://picsum.photos/200/300' },
    { id: 3, title: 'Item 3', description: 'This is the third item.', picture: 'https://picsum.photos/200/300' },
  ];

 // constructor(private itemService: ItemService) { }

  showHideForm() {
    this.showForm = !this.showForm;
  }

  ngOnInit() {
   // this.itemService.getItems().subscribe(items => this.items = items);
  }
}
