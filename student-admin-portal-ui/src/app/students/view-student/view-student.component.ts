import { StudentService } from "../../services/student.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Student, StudentObj } from "src/app/models/ui/student.model";
import { GenderService } from "src/app/services/gender.service";
import { Gender } from "src/app/models/ui/gender.model";
import { MatSnackBar } from "@angular/material";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-view-student",
  templateUrl: "./view-student.component.html",
  styleUrls: ["./view-student.component.css"],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | undefined;
  student: Student;
  genderList: Gender[] = [];
  isNewStudent = false;
  header = "";
  displayProfileImageUrl = "";

  @ViewChild("studentDetailsForm", { static: false })
  studentDetailsForm?: NgForm;

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
        if (this.studentId.toLowerCase() === "Add".toLowerCase()) {
          this.isNewStudent = true;
          this.header = "Add New Student";
          this.student = new StudentObj();
          this.setImage(undefined);
        } else {
          this.isNewStudent = false;
          this.header = "Edit Student";

          this.studentService.getStudent(this.studentId).subscribe(
            (res) => {
              this.student = res;
              this.setImage(this.student.profileImage);
            },
            (err) => {
              this.setImage(undefined);
              console.log(err);
            }
          );
        }

        this.genderServices.getGenders().subscribe(
          (res) => {
            this.genderList = res;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  onUpdateStudent() {
    this.studentService.updateStudent(this.studentId, this.student).subscribe(
      (res) => {
        this.snackbar.open("Student updated succesfully", undefined, {
          duration: 1000,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onDeleteStudent() {
    this.studentService.deleteStudent(this.studentId).subscribe(
      (res) => {
        this.snackbar.open("Student removed succesfully", undefined, {
          duration: 1000,
        });

        setTimeout(() => {
          this.router.navigateByUrl("/students");
        }, 1000);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onAddStudent() {
    if (this.studentDetailsForm?.form.valid) {
      this.studentService.addStudent(this.student).subscribe(
        (res) => {
          this.snackbar.open("Student created succesfully", undefined, {
            duration: 1000,
          });

          setTimeout(() => {
            this.router.navigateByUrl("/students");
          }, 1000);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  setImage(imagePath: string) {
    if (imagePath) {
      this.displayProfileImageUrl = this.studentService.getImagePath(
        this.student.profileImage
      );
    } else {
      this.displayProfileImageUrl = "/assets/images/user.png";
    }
  }

  uploadImage(event: any) {
    if (this.studentId) {
      const file: File = event.target.files[0];

      this.studentService.uploadImage(this.studentId, file).subscribe(
        (res) => {
          this.student.profileImage = res;

          this.snackbar.open("Profile image updated succesfully", undefined, {
            duration: 1000,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
