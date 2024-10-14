import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatOption, MatSelect} from "@angular/material/select";
import {ApiService} from "../../../shared/services/api.service";
import {Student} from "../../../shared/models/student";
import {SubjectModel} from "../../../shared/models/SubjectModel";

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatSelect,
    MatOption,
    NgForOf,
    DecimalPipe,
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  id: string | null = ''
  student: Student | null = null
  subjectList: SubjectModel[] = []
  showCourses: string[] = []

  courses = [
    "MATEMATICA",
    "Ciencia",
    "Portugues",
    "Filosofia",
  ]

  formGroup = new FormGroup({
    n1: new FormControl(0.0, [Validators.required, Validators.max(10), Validators.min(0)]),
    n2: new FormControl(0.0, [Validators.required, Validators.max(10), Validators.min(0)]),
    n3: new FormControl(0.0, [Validators.required, Validators.max(10), Validators.min(0)]),
    final: new FormControl(0.0)
  })

  sendCourses = new FormControl("", Validators.required)

  ngOnInit() {
    this.formGroup.reset()
    this.id = this.route.snapshot.paramMap.get('id')
    this.api.getStudent(Number(this.id)).subscribe(
      data => {
        this.student = data.student
        this.subjectList = data.subjects
        this.showCourses = this.courses.filter(a => !this.subjectList.map(data => data.subject_name).includes(a))
      }
    )
  }

  submitForm() {
    if (this.sendCourses.valid) {
      this.api.addSubject(
        {
          "subject_name": this.sendCourses.value!,
          "id_user": this.student?.id!
        }
      ).subscribe(
        data => {
          if (data === 201) {
            this.sendCourses.reset()
            this.ngOnInit()
          }
        }
      )
    }
  }

  submitSubjectForm(sub: SubjectModel) {
    if (this.formGroup.valid) {
      const media =
        (this.formGroup.get("n1")?.value! +
          this.formGroup.get("n2")?.value! +
          this.formGroup.get("n3")?.value!) / 3;
      this.formGroup.get('final')?.setValue(media)

      this.api.editSubject(
        {
          "id": sub.id,
          "subject_name": sub.subject_name,
          "id_user": sub.id_user,
          "final_grade": this.formGroup.get("final")?.value!,
          "grade1": this.formGroup.get("n1")?.value!,
          "grade2": this.formGroup.get("n2")?.value!,
          "grade3": this.formGroup.get("n3")?.value!
        }
      ).subscribe(
        data => console.log(data)
      )
    }
  }

}
