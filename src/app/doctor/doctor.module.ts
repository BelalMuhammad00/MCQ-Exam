import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ClearStudentDataComponent } from './components/student_subjects/clear-student-data/clear-student-data.component';



@NgModule({
  declarations: [
    NewExamComponent,
    StudentsComponent,
    SubjectsComponent,
    ClearStudentDataComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class DoctorModule { }
