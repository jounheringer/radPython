import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from "./contact/contact.component";
import {NgModule} from "@angular/core";
import {StudentComponent} from "./student/student.component";
import {FormComponent} from "./login/form.component";

export const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'studentList', component: StudentComponent},
  {path: 'addStudent', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
