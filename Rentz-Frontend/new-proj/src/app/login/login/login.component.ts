import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  showRegisterForm: boolean = false;
  loginForm!: FormGroup;
  isLoggingIn = false;

  signupForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    //registration form
    this.createForm();
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



    // .then((user) => {
    //   if (user) {
    //     debugger;
    //     this.userService.getUserInfo().subscribe((userDB) => {
    //       if (userDB) {
    //         this.userService.setUser(userDB);
    //       }
    //     })
    //   }
    // })
  }


  loginWithGoogle() {
    // Implement Google login logic here
    this.authService.googleAuth().then((x) => {
      console.log('Logging in with Google');
      console.log(x);
    });

    // You may want to use a service for Google authentication or an external library.
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

  createForm() {

    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      names: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      personalInformation: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required)
    });

  }

}
