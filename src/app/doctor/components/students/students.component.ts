import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ClearStudentDataComponent } from '../student_subjects/clear-student-data/clear-student-data.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{


  studentsData:any;
 UserType:string="students"

  dataSource:any;
  dataTable:any;
  displayedColumns:any
  constructor(private _auth:AuthService , public dialog: MatDialog ,private _toaster:ToastrService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
    
    this.getStudentsData();
   }


  getStudentsData(){
    this._auth.getStudents(this.UserType).subscribe(res=>{
      this.dataSource = res?.map((student:any)=>{
        if(student?.subjects){

          return student?.subjects?.map((sub:any)=>{
            return {
              name:student.userName,
              subjectName:sub.name,
              degree:sub.degree
            }
          })

        }else{
          return [{
            name:student.userName,
            subjectName:'-',
            degree:'-'
          }]
        }
      
      })

      this.dataTable=[];

      this.dataSource.forEach((element :any)=> {
        element.forEach((subElement:any)=>{
          this.dataTable.push({
            name:subElement.name,
            subjectName:subElement.subjectName,
            degree:subElement.degree
          })
        })
      });

      console.log(this.dataSource , " this");
      
    });
  } 

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
   const dialogRef= this.dialog.open(ClearStudentDataComponent);

   dialogRef.afterClosed().subscribe(res=>{
    if(res){
      this.getStudentsData();
      this._toaster.success("تم مسح جميع البيانات بنجاح");
    }
   })
  }

  
  ngOnInit(): void {
  }

}
