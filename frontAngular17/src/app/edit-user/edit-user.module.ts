import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent} from "./student-form/student-form.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentFormComponent
  ],
  exports: [
    StudentFormComponent
  ]
})
export class EditUserModule { }
