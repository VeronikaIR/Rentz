import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {catchError, from, Observable, of, throwError} from "rxjs";
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

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  private translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/user-not-found") {
      return "User not found.";
    }
    if (code === "auth/wrong-password") {
      return "User not found.";
    }
    return message;
  }

}

type SignIn = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
}
}
