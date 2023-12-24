import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm!: FormGroup;
  hasError: boolean = false;
  errorMsg: string = '';

  constructor(public afAuth: AngularFireAuth,
              public userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {

    this.createRegistrationForm();

  }

  createRegistrationForm(): void {

    this.registerForm = new FormGroup({
      names: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
      confirmPassword: new FormControl<string>('', Validators.required),
      phoneNumber: new FormControl<string>('', Validators.required),
      town: new FormControl<string>('', Validators.required)
    });

  }

  createUser() {

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.hasError = true;
      this.errorMsg = 'Passwords do not match.'
    } else {
      this.authService.registerUser(this.registerForm);


    }
    console.log(this.registerForm.value);
  }
}
