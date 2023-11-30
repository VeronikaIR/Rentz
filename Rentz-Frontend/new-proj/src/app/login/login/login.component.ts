import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  showRegisterForm: boolean = false;
  loginForm!: FormGroup;
  isLoggingIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const {email, password} = this.loginForm.value;
    // this.authService.login(email, password).then(() => {
    //   console.log("successful login");
    // })

    this.authService.login(email, password).then(() => {
      console.log("successful login");
    })
  }


  login() {
    this.isLoggingIn = true;

    // this.authenticationService.signIn({
    //   email: this.form.value.email,
    //   password: this.form.value.password
    // }).subscribe({
    //   next: () => this.router.navigate(['home']),
    //   error: error => {
    //     this.isLoggingIn = false;
    //     this.snackBar.open(error.message, "OK", {
    //       duration: 5000
    //     })
    //   }
    // });
  }


  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
  }


  loginWithGoogle() {
    // Implement Google login logic here
    console.log('Logging in with Google');
    // You may want to use a service for Google authentication or an external library.
  }

}
