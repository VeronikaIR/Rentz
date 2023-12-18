import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {ItemService} from "../../../overview/service/item.service";
import {take} from "rxjs";
import {CreateItemFormGroup} from "../../../overview/models/create-item-form-group";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  showRegisterForm: boolean = false;
  loginForm!: FormGroup;
  isLoggingIn = false;

  //signupForm!: FormGroup;
  //userProfileForm!: FormGroup<UserProfileFormGroup>;

  addItemForRentOpened: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public userService: UserService,
    public itemService: ItemService
  ) {
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]
    // });

    //registration form
    // this.createRegistrationForm();

    //create item form
    // this.createAddItemForm();

    // this.userService.user$.pipe(take(1)).subscribe((user: User) => {
    //   this.userProfileForm.patchValue({
    //     name: user.name,
    //     email: user.email,
    //     phoneNumber: user.phoneNumber,
    //     town: user.town
    //   });
    // });



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
    this.userService.user$.subscribe((user: User) => {
      this.itemService.filteredItems = user.itemsForRent;
    })

  }

  signup() {

    // if (this.signupForm.valid) {
    //
    //   this.authService.SignUp(
    //
    //     this.signupForm.value.email,
    //
    //     this.signupForm.value.password
    //
    //   );
    //
    // }

  }






  // createRegistrationForm(): void {
  //
  //   this.signupForm = new FormGroup({
  //     email: new FormControl<string>('', Validators.required),
  //     password: new FormControl<string>('', Validators.required),
  //     confirmPassword: new FormControl<string>('', Validators.required),
  //     names: new FormControl<string>('', Validators.required),
  //     phoneNumber: new FormControl<string>('', Validators.required),
  //     personalInformation: new FormControl<string>('', Validators.required),
  //     town: new FormControl<string>('', Validators.required)
  //   });
  //
  // }

  // createAddItemForm(): void {
  //   this.createItemFromGroup = new FormGroup({
  //     title: new FormControl<string>('', Validators.required),
  //     description: new FormControl<string>('', Validators.required),
  //     itemType: new FormControl<string>('', Validators.required),
  //     picture1: new FormControl<File | null>(null, Validators.required),
  //     picture2: new FormControl<File | null>(null, Validators.required),
  //     picture3: new FormControl<File | null>(null, Validators.required),
  //     pricePerDay: new FormControl<string>('', Validators.required)
  //   });
  //}

}
