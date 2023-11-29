// import { Component, OnInit } from '@angular/core';
// import { ItemService } from './item.service';
//
// @Component({
//   selector: 'app-items',
//   templateUrl: './items.component.html',
//   styleUrls: ['./items.component.css']
// })
// export class ItemsComponent implements OnInit {
//   items: any[] = [];
//   newItem: any = {};
//   selectedItem: any = {};
//
//   constructor(private itemService: ItemService) {}
//
//   ngOnInit(): void {
//     this.getItems();
//   }
//
//   getItems(): void {
//     this.itemService.getItems().subscribe(
//       (data) => {
//         this.items = data;
//       },
//       (error) => {
//         console.error('Error fetching items:', error);
//       }
//     );
//   }
//
//   addItem(): void {
//     this.itemService.addItem(this.newItem).subscribe(
//       (data) => {
//         console.log('Item added successfully:', data);
//         this.getItems();
//         this.newItem = {};
//       },
//       (error) => {
//         console.error('Error adding item:', error);
//       }
//     );
//   }
//
//   updateItem(): void {
//     if (this.selectedItem && this.selectedItem.id) {
//       this.itemService.updateItem(this.selectedItem.id, this.selectedItem).subscribe(
//         (data) => {
//           console.log('Item updated successfully:', data);
//           this.getItems();
//           this.selectedItem = {};
//         },
//         (error) => {
//           console.error('Error updating item:', error);
//         }
//       );
//     }
//   }
//
//   deleteItem(id: number): void {
//     this.itemService.deleteItem(id).subscribe(
//       () => {
//         console.log('Item deleted successfully');
//         this.getItems();
//       },
//       (error) => {
//         console.error('Error deleting item:', error);
//       }
//     );
//   }
//
//   onSelect(item: any): void {
//     this.selectedItem = { ...item };
//   }
// }
