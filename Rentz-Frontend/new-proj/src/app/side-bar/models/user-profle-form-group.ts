import {FormControl} from "@angular/forms";

export interface UserProfileFormGroup {
  name: FormControl<string>;
  profilePicture: FormControl<File | null>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  town: FormControl<string | null>;
}
