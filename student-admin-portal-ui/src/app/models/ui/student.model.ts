import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface Student {
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  mobile: string,
  profileImage: string,
  genderId: string,
  gender: Gender,
  address: Address
}

export class StudentObj implements Student {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: string = '';
  email: string = '';
  mobile: string = '';
  profileImage: string = '';
  genderId: string = '';
  gender: Gender = {} as Gender;
  address: Address = {} as Address;

}
