import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import { NgSelectModule} from "@ng-select/ng-select";
import {ApiService} from "../../shared/services/api.service";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgSelectModule,
    FormsModule,
    RouterLink
  ],
  providers: [ApiService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private apiService: ApiService) {
  }
  courses = [
    {id: 1, courseName: "Matematica"},
    {id: 2, courseName: "Ciencia"},
    {id: 3, courseName: "Portugues"},
    {id: 4, courseName: "Filosofia"},
  ]

  formGroup = new FormGroup({
    sendName: new FormControl("", Validators.required),
    sendEmail: new FormControl("", [Validators.required, Validators.email]),
    sendGrade: new FormControl(undefined, Validators.required),
  })

  submitForm() {
    if (this.formGroup.valid){
      this.apiService.addStudent({
        name: this.formGroup.get('sendName')?.value!,
        serie: this.formGroup.get('sendGrade')?.value!,
        email: this.formGroup.get('sendEmail')?.value!,
        approved: false
      }).subscribe( () =>
        {
          this.formGroup.reset()
        }
      );
    }
  }
}
