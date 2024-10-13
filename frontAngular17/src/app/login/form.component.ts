import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgSelectModule,
    FormsModule,
    RouterLink,
    MatDialogModule
  ],
  providers: [ApiService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  constructor(private api: ApiService, private router: Router, private dialog: MatDialog) {
  }

  formGroup = new FormGroup({
    sendLogin: new FormControl("", Validators.required),
    sendPassword: new FormControl("", [Validators.required, Validators.min(6)]),
    sendRemember: new FormControl(false)
  })

  submitForm() {
    if (this.formGroup.valid) {
      const formData = new FormData()
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      formData.append("username", this.formGroup.get("sendLogin")?.value!)
      formData.append("password", this.formGroup.get("sendPassword")?.value!)

      dialogConfig.data = {
        id: 1,
        title: 'Primeiro login, altere seu nome de usuario e senha'
      };
      this.api.validateLogin(formData).subscribe(
        data => {
          const userId = data.body.user_id
          const firstLogin = data.body.first_login
          if (data.status === 200) {
            if (!firstLogin) {
              const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig)

              dialogRef.afterClosed().subscribe(
                (data) => {
                  this.api.updateFirstLogin(
                    {
                      "username": data.newUsername,
                      "userpassword": data.newPassword
                    },
                    userId
                  ).subscribe(
                    data => {
                      if (data === 200) {
                        this.router.navigate(["/studentList"])
                      }
                    }
                  )
                }
              )
            } else {
              this.router.navigate(["/studentList"])
            }
          }
        }
      )
    }
  }
}
