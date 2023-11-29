import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic here
      console.log('Login successful!', this.loginForm.value);
    } else {
      // Form is invalid, mark fields as touched to display validation errors
      this.loginForm.markAllAsTouched();
    }
  }


  login() {
    this.isLoggingIn = true;

    this.authenticationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['home']),
      error: error => {
        this.isLoggingIn = false;
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        })
      }
    });
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
