import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatDialogActions,
    NgIf
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    sendUsername: new FormControl("", Validators.required),
    sendPassword: new FormControl("", [Validators.required, Validators.min(6)]),
    });
  title: string = "";
  newPassword: string = "";
  newConfirmPassword: string = "";
  newUsername: string = "";

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.title = data.title;
  }

  ngOnInit() {
    this.form = this.fb.group({
      newPassword: [this.newPassword, Validators.required],
      confirmNewPassword: [this.newConfirmPassword, [Validators.required, Validators.min(6)]],
      newUsername: [this.newUsername, [Validators.required, Validators.min(6)]]
    });
  }

  save() {
    if (this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
