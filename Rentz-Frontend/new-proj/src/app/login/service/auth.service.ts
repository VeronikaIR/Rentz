import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {catchError, from, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private auth: AngularFireAuth) {
  }

  getUserById(userId: string): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch user with id ${userId}:`, error);
        return of(null);
      })
    );
  }

  login(username: string, password: string) {
    return this.auth.signInWithEmailAndPassword(username, password);
  }

  logout() {
    return from(this.auth.signOut());
  }
}
