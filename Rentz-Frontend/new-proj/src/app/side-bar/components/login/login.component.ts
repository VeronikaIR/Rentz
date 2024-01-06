import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {ItemService} from "../../../overview/service/item.service";
import {HttpClient} from "@angular/common/http";
import {of, switchMap, take} from "rxjs";
import {ReservationDto} from "../../../shared/interface/reservationDto";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  showRegisterForm: boolean = false;
  loginForm!: FormGroup;
  isLoggingIn = false;

  addItemForRentOpened: boolean = false;
  isMyReservationsOpen: boolean = false;
  usersReservations: ReservationDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public userService: UserService,
    public itemService: ItemService,
    public http: HttpClient,
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
    this.usersReservations = [];
    this.isMyReservationsOpen = false;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  /**
   * login with email and password
   * */
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const {email, password} = this.loginForm.value;

    this.authService.login(email, password);
  }


  loginWithGoogle() {
    this.authService.googleAuth();
  }


  showUsersItemsForRent(): void {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.itemService.filteredItems = user.itemsForRent;
      }
    })

  }

  showUserReservations(): void {

    this.isMyReservationsOpen = !this.isMyReservationsOpen;
    if (this.isMyReservationsOpen) {

      this.userService.user$.pipe(take(1), switchMap((user) => {
        if (user) {
          return this.http.get<ReservationDto[]>(`http://localhost:8080/api/reservations/owner/${user.id}`);
        }
        return of(null);
      })).subscribe((reservationsArr: ReservationDto[] | null) => {
        if (reservationsArr) {
          this.usersReservations = reservationsArr;
          console.log(this.usersReservations);
        }
      });
    }

  }

  openMyReservations(): void {

    this.isMyReservationsOpen = !this.isMyReservationsOpen;
  }

  test() {
    alert('test');
  }
  logout() {
    this.authService.afAuth.signOut()
      .then(() => {
        localStorage.removeItem("user");
        this.userService.setUser(null);
        location.reload();
      })
      .catch(error => {
        // Handle logout error
      });
  }


}
