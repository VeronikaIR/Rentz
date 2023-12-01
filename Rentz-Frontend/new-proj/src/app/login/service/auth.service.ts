import {Injectable, NgZone} from '@angular/core';
import {User} from "../models/user";
import {Observable, switchMap, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {GoogleAuthProvider} from 'firebase/auth';
import {UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$?: Observable<firebase.default.User | null>;
  currentUser?: firebase.default.User | null;

  tokenAccess?: string;


  constructor(private http: HttpClient, public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public ngZone: NgZone,
              public router: Router,
              public userService: UserService
  ) {
    this.user$ = afAuth.authState;
    this.user$.subscribe((user) => {
      this.currentUser = user;
      this.saveUserToLocalStorage(user);
    });
  }


  /** login with email and password */
  login(username: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(username, password).then((user) => {
      if (user) {
        this.afAuth.authState.pipe(
          take(1),
          switchMap((user) => {
            this.currentUser = user;
            this.saveUserToLocalStorage(user);


            return this.userService.getUserInfo();
          })
        ).subscribe((user) => {
          if (user) {
            this.userService.setUser(user);
          }
        });


        // this.afAuth.authState.subscribe((user) => {
        //   this.currentUser = user;
        //   this.saveUserToLocalStorage(user);
        // });
        // this.userService.getUserInfo().subscribe((userDB) => {
        //   if (userDB) {
        //     this.userService.setUser(userDB);
        //   }
        // });
      }
    })


    //.then((result) => {
    //this.setUserData(result.user);
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     // TODO do something here
    //     // save user in database
    //   }
    // })
    //});
  }


  setUserData(user: any) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber
    };

    return userRef.set(userData, {
      merge: true,
    });
  }


  /** login with Google */
  googleAuth() {

    return this.authLogin(new GoogleAuthProvider());

  }

  //
  authLogin(provider: any) {

    return this.afAuth.signInWithPopup(provider).then((result) => {
      this.setUserData(result.user);
      console.log(result);
      //this.SetUserData(result.user);

    });
  }


  private saveUserToLocalStorage(user: firebase.default.User | null): void {
    if (user) {
      debugger;
      user.getIdToken().then((token) => {
        this.tokenAccess = token;
      });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  // logout() {
  //   return from(this.auth.signOut());
  // }
}
