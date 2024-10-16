import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import { NgSelectModule} from "@ng-select/ng-select";
import {ApiService} from "../../shared/services/api.service";
import {RouterLink} from "@angular/router";
import {generateFromEmail} from "unique-username-generator";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgSelectModule,
    FormsModule,
    RouterLink,
    MatFormField,
    MatSelect,
    MatOption
  ],
  providers: [ApiService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private apiService: ApiService) {
  }

  formGroup = new FormGroup({
    sendName: new FormControl("", Validators.required),
    sendEmail: new FormControl("", [Validators.required, Validators.email]),
    sendGrade: new FormControl(undefined, Validators.required),
  })

  submitForm() {
    if (this.formGroup.valid){
      this.apiService.addStudent({
        name: this.formGroup.get('sendName')?.value!,
        userpassword: "aluno123",
        username: generateFromEmail(this.formGroup.get('sendEmail')?.value!, 3),
        serie: this.formGroup.get('sendGrade')?.value!,
        email: this.formGroup.get('sendEmail')?.value!,
        approved: false
      }).subscribe( (data) =>
        {
          if (data.status === 201){
            this.formGroup.reset()
            alert("Usuario criado com sucesso, senha padrao para o primeiro login: aluno123")
          }
          else {
            alert("Erro ao criar um aluno")
          }
        }
      );
    }
  }
}
