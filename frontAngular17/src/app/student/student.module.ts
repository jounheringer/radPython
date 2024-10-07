import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StudentListComponent} from "./student-list/student-list.component";
import {AddStudentFormComponent} from "./add-student-form/add-student-form.component";
import {StudentFilterComponent} from "./student-filter/student-filter.component";
import {StudentListItemComponent} from "./student-list-item/student-list-item.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    StudentListComponent,
    AddStudentFormComponent,
    StudentFilterComponent,
    StudentListItemComponent
  ],
  exports: [
    StudentListComponent,
    AddStudentFormComponent,
    StudentFilterComponent,
    StudentListItemComponent
  ]
})
export class StudentModule { }
