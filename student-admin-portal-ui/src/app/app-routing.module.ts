import { ViewStudentComponent } from './students/view-student/view-student.component';
import { StudentsComponent } from './students/students.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    component: StudentsComponent
  },
  {
    path:'students',
    component: StudentsComponent
  },
  {
    path:'students/:id',
    component: ViewStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
