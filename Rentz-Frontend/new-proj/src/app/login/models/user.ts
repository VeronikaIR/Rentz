import {Item} from "../../overview/models/item"

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  town?: string;
  photoURL: string;
  itemsForRent: Item[];

  //photo url ??????????
}
