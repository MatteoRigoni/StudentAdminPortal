import { StudentService } from "../../services/student.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Student } from "src/app/models/ui/student.model";
import { GenderService } from "src/app/services/gender.service";
import { Gender } from "src/app/models/ui/gender.model";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-view-student",
  templateUrl: "./view-student.component.html",
  styleUrls: ["./view-student.component.css"],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | undefined;
  student: Student ;

  genderList: Gender[] = [];

  constructor(
    private studentService: StudentService,
    private genderServices: GenderService,
    private snackbar: MatSnackBar,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get("id");
      if (this.studentId) {
        this.studentService.getStudent(params.get("id")).subscribe(
          (res) => {
            this.student = res;
          },
          (err) => {
            console.log(err);
          }
        );

        this.genderServices.getGenders().subscribe((res) => {
          this.genderList = res;
        },
        (err) => {
          console.log(err);
        });
      }
    });
  }

  onUpdateStudent(){
    this.studentService.updateStudent(this.studentId, this.student).subscribe((res) => {
      this.snackbar.open('Student updated succesfully', undefined, {
        duration: 800
      });
    }, (err) => {
      console.log(err);
    });
  }
}
