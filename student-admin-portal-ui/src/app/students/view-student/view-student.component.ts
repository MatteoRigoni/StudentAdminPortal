import { StudentService } from "../../services/student.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    private readonly route: ActivatedRoute,
    private router: Router
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
        duration: 1500
      });
    }, (err) => {
      console.log(err);
    });
  }

  onDeleteStudent() {
    this.studentService.deleteStudent(this.studentId).subscribe((res) => {
      this.snackbar.open('Student removed succesfully', undefined, {
        duration: 1500
      });

      setTimeout(() => {
        this.router.navigateByUrl('/students');
      }, 1000);

    }, (err) => {
      console.log(err);
    });
  }
}
