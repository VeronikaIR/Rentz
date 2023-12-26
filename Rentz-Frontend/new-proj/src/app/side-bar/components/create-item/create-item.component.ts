import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateItemFormGroup} from "../../../overview/models/create-item-form-group";
import {switchMap, take} from "rxjs";
import {ItemService} from "../../../overview/service/item.service";
import {Item} from "../../../overview/models/item";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  createItemFromGroup!: FormGroup<CreateItemFormGroup>;

  constructor(private formBuilder: FormBuilder, public itemService: ItemService) {
  }

  ngOnInit() {

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

  createItem(): void {
    let formData: FormData = new FormData();

    if (this.createItemFromGroup.value.title) formData.set('title', this.createItemFromGroup.value.title.toString());
    if (this.createItemFromGroup.value.description) formData.set('description', this.createItemFromGroup.value.description.toString());
    if (this.createItemFromGroup.value.itemType) formData.set('itemType', this.createItemFromGroup.value.itemType.toString());
    if (this.createItemFromGroup.value.picture1) formData.set('picture1', this.createItemFromGroup.value.picture1);
    if (this.createItemFromGroup.value.picture2) formData.set('picture2', this.createItemFromGroup.value.picture2);
    if (this.createItemFromGroup.value.picture3) formData.set('picture3', this.createItemFromGroup.value.picture3);
    if (this.createItemFromGroup.value.pricePerDay) formData.set('pricePerDay', this.createItemFromGroup.value.pricePerDay.toString());

    this.itemService.createItem(formData)
      .pipe(take(1),
        switchMap((item: Item) => {

          return this.itemService.getItems();
        }))
      .subscribe((data) => {
        this.itemService.items = data;
        this.itemService.filteredItems = data;
        this.itemService.addItemForRentOpened = false;
      });

  }

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

  closePopup(): void {
    this.itemService.addItemForRentOpened = false;
  }
}
