import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../service/user.service";

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
              public userService: UserService) {
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
      this.afAuth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
        .then((fireBaseUser) => {
          let userToCreate = {
            name: this.registerForm.value.names,
            email: this.registerForm.value.email,
            phoneNumber: this.registerForm.value.phoneNumber,
            town: this.registerForm.value.town
          }
          this.userService.createUser(userToCreate).subscribe((user) => {
            if (user) this.userService.setUser(user);
          })

        })
        .catch(error => {
          console.error('Registration failed:', error);
        });
    }
    console.log(this.registerForm.value);
  }
}
