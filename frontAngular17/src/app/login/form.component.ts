import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgSelectModule,
    FormsModule,
    RouterLink
  ],
  providers: [ApiService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  constructor(private api: ApiService, private router: Router) {
  }

  formGroup = new FormGroup({
    sendLogin: new FormControl("", Validators.required),
    sendPassword: new FormControl("", [Validators.required, Validators.min(6)]),
    sendRemember: new FormControl(false)
  })

  submitForm() {
    if (this.formGroup.valid){
      const formData = new FormData()

      formData.append("username", this.formGroup.get("sendLogin")?.value!)
      formData.append("password", this.formGroup.get("sendPassword")?.value!)
      this.api.validateLogin(formData).subscribe(
        data => {
          if (data.status === 200){
            this.router.navigate(["/studentList"])
          }
        }
      )
    }
  }
}
