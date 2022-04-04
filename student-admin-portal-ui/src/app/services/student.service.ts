import { AddStudentRequest } from './../models/api/add-student-request.model';
import { UpdateStudentRequest } from './../models/api/update-student-request.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Student } from "../models/api/student.model";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private baseApiUrl = "https://localhost:7180";

  //private readonly items$: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  constructor(private httpClient: HttpClient) {}

  // fetchStudents() {
  //   this.httpClient
  //     .get<Student[]>(this.baseApiUrl + "/student")
  //     .subscribe((receivedItems) => {
  //       this.items$.next(receivedItems);
  //       console.log(receivedItems);
  //     });
  // }

  // get items(): Observable<Student[]> {
  //   return this.items$.asObservable();
  // }

  getStudents(): Observable<any> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/student');
  }

  getStudent(studentId: string): Observable<any> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/student/' + studentId);
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<any> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }
    return this.httpClient.put<UpdateStudentRequest>(this.baseApiUrl + '/student/' + studentId, updateStudentRequest);
  }

  addStudent(studentRequest: Student): Observable<any> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }
    console.log(addStudentRequest);
    return this.httpClient.post<Student>(this.baseApiUrl + '/student/add', addStudentRequest);
  }

  deleteStudent(studentId: string): Observable<any> {
    return this.httpClient.delete(this.baseApiUrl + '/student/' + studentId);
  }

  uploadImage(studentId: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append("profileImage", file);
    return this.httpClient.post(this.baseApiUrl + '/student/' + studentId + "/upload-image", formData, {
      responseType: 'text'
    });
  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }
}
