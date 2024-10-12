import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from "./form.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormComponent,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent
  ]
})
export class LoginModule { }
