import { StudentService } from "./student.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Student } from "../models/ui/student.model";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
  students: Student[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  filterString = '';

  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort!: MatSort;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    // this.studentService.fetchStudents();

    this.studentService.getStudents().subscribe(
      (res) => {
        this.students = res;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }
        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
