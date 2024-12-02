import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clear-student-data',
  templateUrl: './clear-student-data.component.html',
  styleUrls: ['./clear-student-data.component.scss']
})
export class ClearStudentDataComponent implements OnInit {
  students: any[] = [];
  constructor(private _studentService:AuthService ,public dialogRef: MatDialogRef<ClearStudentDataComponent>) { }

  ngOnInit(): void {
  }

  clearAllStudentData(){

this._studentService.getStudents('students').subscribe({
  next: (students) => {
    this.students = students;

    // Step 2: Clear subjects for each student
    students.forEach((student:any) => {
      this._studentService.clearSubjects(student.id).subscribe({
        next: () => {
          console.log(`Subjects cleared for student: ${student.userName}`);
          
          this.dialogRef.close(true);

        },
        error: (err) => {
          console.error(`Error clearing subjects for student ${student.userName}:`, err);
        }
   
      });
    });
  },
})


    console.log('تم مسح كل البيانات');
    
  }


}
