import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/api/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl = "https://localhost:7180";

  constructor(private httpClient: HttpClient) { }

  getGenders(): Observable<any> {
    return this.httpClient.get<Gender>(this.baseApiUrl + '/gender');
  }
}
