import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm = new FormGroup({
    sendName: new FormControl("", Validators.required),
    sendEmail: new FormControl("", [Validators.required, Validators.email]),
    sendMessage: new FormControl("", Validators.minLength(10)),
  })

  submitForm() {
    console.log(this.contactForm.valid)
  }
}
