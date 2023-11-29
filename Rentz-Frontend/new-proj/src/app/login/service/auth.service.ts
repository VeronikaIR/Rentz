import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getUserById(userId: string): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch user with id ${userId}:`, error);
        return of(null);
      })
    );
  }
}
