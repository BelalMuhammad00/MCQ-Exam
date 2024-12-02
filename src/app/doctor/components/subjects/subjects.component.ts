import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
subjects:any[]=[];
userRole:any={};
  constructor(private _doctor:DoctorService , private _auth:AuthService,private _toaster:ToastrService) { }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getUserRole();
  }

  getAllSubjects(){
    this._doctor.getAllSubject().subscribe({
      next:(res:any)=>{
        this.subjects=res
      }
    })
  }

  getUserRole(){
    this._auth.getRole().subscribe({
      next:(res)=>{
this.userRole=res.role
      }
    })
  }

  deleteSubject(index:number){
    let id = this.subjects[index].id
    this.subjects.splice(index,1);
    this._doctor.deleteSubject(id).subscribe({
      next:(res)=>{
this._toaster.success('تم حذف المادة بنجاح')
      }
    })
  }

}
