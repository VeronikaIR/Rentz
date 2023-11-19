import {Injectable} from '@angular/core';
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  getUser(): User {
    return {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com'
    };
  }
}
