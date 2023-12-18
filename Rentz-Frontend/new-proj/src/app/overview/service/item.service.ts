import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Item} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8080/api/items';
  items: Item[] = [];
  filteredItems: Item[] = [];
  private itemsSubject: ReplaySubject<Item[]> = new ReplaySubject<Item[]>();
  itemsSubject$: Observable<Item[]> = this.itemsSubject.asObservable();

  addItemForRentOpened: boolean = false;

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItemById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  filterItems(itemType?: string) {
    this.filteredItems = [];
    debugger;
    if (itemType) {
      this.items.forEach(x => {
        if (x.itemType === itemType) {
          this.filteredItems.push(x);
        }
      })
    } else {
      this.filteredItems = this.items;
    }
  }

  // getItemsByCategory(itemType: string): void {
  //   const urlWithQueryParam = `${this.apiUrl}/filter?type=${itemType}`;
  //   this.http.get<any[]>(urlWithQueryParam).subscribe((items) => {
  //     debugger;
  //
  //     this.setItemsSubject(items);
  //   })
  // }

  createItem(formData: FormData): Observable<Item> {
    debugger;
    return this.http.post<Item>(this.apiUrl + '/create', formData);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  setItemsSubject(items: Item[]): void {
    debugger;
    this.itemsSubject.next(items);
  }


  addItemForRent(): void {
    this.addItemForRentOpened = true;
  }

}
