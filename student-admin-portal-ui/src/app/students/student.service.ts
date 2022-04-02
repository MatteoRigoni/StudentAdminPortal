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
    return this.httpClient.get<any>(this.baseApiUrl + '/student');
  }
}
