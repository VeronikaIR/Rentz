import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {ItemService} from "../../overview/service/item.service";
import {take} from "rxjs";
import {CreateItemFormGroup} from "../../overview/models/create-item-form-group";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  showRegisterForm: boolean = false;
  //loginForm!: FormGroup;
  isLoggingIn = false;

  //signupForm!: FormGroup;
  //userProfileForm!: FormGroup<UserProfileFormGroup>;

  addItemForRentOpened: boolean = false;
  createItemFromGroup!: FormGroup<CreateItemFormGroup>;

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


    this.createItemFromGroup = this.formBuilder.group({
      title: new FormControl<string | null>('', Validators.required),
      description: new FormControl<string | null>('', Validators.required),
      itemType: new FormControl<string | null>('', Validators.required),
      picture1: new FormControl<File | null>(null, Validators.required),
      picture2: new FormControl<File | null>(null, Validators.required),
      picture3: new FormControl<File | null>(null, Validators.required),
      pricePerDay: new FormControl<string | null>('', Validators.required)
    });
  }

  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  /**
   * login with email and password
   * */
  // onSubmit() {
  //   if (!this.loginForm.valid) {
  //     return;
  //   }
  //   const {email, password} = this.loginForm.value;
  //
  //   this.authService.login(email, password);
  // }


  loginWithGoogle() {
    this.authService.googleAuth();
  }


  addItemForRent(): void {
    this.addItemForRentOpened = !this.addItemForRentOpened;
  }

  closePopup(): void {
    this.addItemForRentOpened = false;
  }


  showUsersItemsForRent(): void {
    this.userService.user$.subscribe((user) => {
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

  createItem(): void {
    debugger;
    // this.createItemFromGroup.markAsTouched();
    // if (!this.createItemFromGroup.valid) return;

    let formData: FormData = new FormData();

    if (this.createItemFromGroup.value.title) formData.set('title', this.createItemFromGroup.value.title.toString());
    if (this.createItemFromGroup.value.description) formData.set('description', this.createItemFromGroup.value.description.toString());
    if (this.createItemFromGroup.value.itemType) formData.set('itemType', this.createItemFromGroup.value.itemType.toString());
    if (this.createItemFromGroup.value.picture1) formData.set('picture1', this.createItemFromGroup.value.picture1);
    if (this.createItemFromGroup.value.picture2) formData.set('picture2', this.createItemFromGroup.value.picture2);
    if (this.createItemFromGroup.value.picture3) formData.set('picture3', this.createItemFromGroup.value.picture3);
    if (this.createItemFromGroup.value.pricePerDay) formData.set('pricePerDay', this.createItemFromGroup.value.pricePerDay.toString());

    this.itemService.createItem(formData).pipe(take(1)).subscribe(() => {
      //TODO refresh overview page;
    })


  }

  // setPicture1ToFormGroup(files: any) {
  //   console.log(files);
  //   debugger;
  //   let file: File | null = files.
  //
  //   this.createItemFromGroup.controls.picture1.setValue(file);
  //
  // }


  onFileChange1(event: any) {

    let selectedFiles = event.target.files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {
        this.createItemFromGroup.patchValue({
          picture1: file
        });
      }
    }
    console.log(this.createItemFromGroup.value);
  }

  onFileChange2(event: any) {

    let selectedFiles = event.target.files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {
        this.createItemFromGroup.patchValue({
          picture2: file
        });
      }
    }
    console.log(this.createItemFromGroup.value);
  }

  onFileChange3(event: any) {

    let selectedFiles = event.target.files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {
        this.createItemFromGroup.patchValue({
          picture3: file
        });
      }
    }
    console.log(this.createItemFromGroup.value);
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
