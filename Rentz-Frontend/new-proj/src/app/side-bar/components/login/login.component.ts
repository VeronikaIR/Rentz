import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {ItemService} from "../../../overview/service/item.service";

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public userService: UserService,
    public itemService: ItemService
  ) {
  }

  ngOnInit() {
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

  openMyReservations(): void {

    this.isMyReservationsOpen = !this.isMyReservationsOpen;
  }

  logout() {
    this.authService.afAuth.signOut()
      .then(() => {
        localStorage.removeItem("user");
        this.userService.setUser(null);
      })
      .catch(error => {
        // Handle logout error
      });
  }


}
