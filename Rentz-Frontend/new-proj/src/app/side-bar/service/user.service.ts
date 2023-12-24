import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, ReplaySubject} from "rxjs";
import {User} from "../models/user";
import {CreateUser} from "../models/create-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrlUsers = 'http://localhost:8080/api/users';

  private userSubject: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
  }


  getUserById(userId: string): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrlUsers}/${userId}`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch user with id ${userId}:`, error);
        return of(null);
      })
    );
  }


  getUserInfo(): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrlUsers}/info`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch user:`, error);
        return of(null);
      })
    );
  }

  socialLogin(): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrlUsers}/social-login`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch user:`, error);
        return of(null);
      })
    );
  }


  setUser(user: User | null): void {
    this.userSubject.next(user);
  }

  createUser(user: CreateUser): Observable<User | null> {
    return this.http.post<User>(this.apiUrlUsers, user).pipe(
      catchError((error) => {
        console.error(`Failed to fetch user}:`, error);
        return of(null);
      })
    );
  }
}
