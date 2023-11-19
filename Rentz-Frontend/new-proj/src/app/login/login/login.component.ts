
import {User} from "../models/user";
import {AuthService} from "../service/auth.service";
import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // public user: User = {
  //   id: 1,
  //   name: 'John Doe',
  //   email: 'johndoe@example.com'
  // };

  @Input() userId: number = 1;
  @Input() username: string = 'John Doe';
  @Input() userEmail: string = 'johndoe@example.com';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    //this.user = this.authService.getUser();
  }
}
