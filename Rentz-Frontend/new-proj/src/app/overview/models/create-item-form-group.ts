import {FormControl} from "@angular/forms";

export interface CreateItemFormGroup {
  title:  FormControl<string|null>;
  description: FormControl<string|null>;
  itemType: FormControl<string|null>;
  picture1: FormControl<File | null>;
  picture2: FormControl<File | null>;
  picture3: FormControl<File | null>;
  pricePerDay: FormControl<string|null>;
}
