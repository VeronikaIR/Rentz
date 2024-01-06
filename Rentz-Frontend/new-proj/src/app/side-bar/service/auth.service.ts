import {Injectable, NgZone} from '@angular/core';
import {Observable, switchMap, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {GoogleAuthProvider} from 'firebase/auth';
import {UserService} from "./user.service";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$?: Observable<firebase.default.User | null>;
  currentUser?: firebase.default.User | null;

  tokenAccess?: string;


  constructor(public afAuth: AngularFireAuth,
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
      }
    })
  }


  registerUser(formGroup: FormGroup) {
    this.afAuth.createUserWithEmailAndPassword(formGroup.value.email, formGroup.value.password)
      .then((user) => {
        if (user) {
          this.afAuth.authState.pipe(
            take(1),
            switchMap((user) => {
              this.currentUser = user;
              this.saveUserToLocalStorage(user);

              let userToCreate = {
                name: formGroup.value.names,
                email: formGroup.value.email,
                phoneNumber: formGroup.value.phoneNumber,
                town: formGroup.value.town
              }

              return this.userService.createUser(userToCreate);
            })
          ).subscribe((user) => {
            if (user) {
              this.userService.setUser(user);
            }
          });
        }

      })

  }

  /** login with Google */
  googleAuth() {

    //return this.authLogin(new GoogleAuthProvider());
    return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((user) => {
      //this.setUserData(result.user);
      //console.log(result);
      //this.SetUserData(result.user);
      if (user) {
        this.afAuth.authState.pipe(
          take(1),
          switchMap((user) => {
            this.currentUser = user;
            this.saveUserToLocalStorage(user);

            return this.userService.socialLogin();
          })
        ).subscribe((user) => {
          if (user) {
            this.userService.setUser(user);
            console.log(this.user$);
          }
        });
      }


    });


  }

  //
  // authLogin(provider: any) {
  //
  //   return this.afAuth.signInWithPopup(provider).then((result) => {
  //     this.setUserData(result.user);
  //     console.log(result);
  //     //this.SetUserData(result.user);
  //
  //   });
  // }


  public saveUserToLocalStorage(user: firebase.default.User | null): void {
    if (user) {
      user.getIdToken().then((token) => {
        this.tokenAccess = token;
      });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  public loadTokenAccessFromLocalStorage(): string | null {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      this.tokenAccess = user.stsTokenManager.accessToken;

      user.id = user.uid;
      this.currentUser = user;
      this.userService.setUser(user);
    }

    return null;
  }

  // logout() {
  //   return from(this.auth.signOut());
  // }
}
