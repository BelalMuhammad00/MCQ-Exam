import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  id:any;
subject:any;
userRole:any;
userInfo:any;
totalResult :number=0;
userSubjects:any[]=[];
showResult:boolean = false;
validExam:boolean=true;
  constructor(private _route:ActivatedRoute , private _doctor:DoctorService , private _toaster:ToastrService ,private _auth:AuthService) { 

    this.id=this._route.snapshot.paramMap.get('id');
    this.getSubjectById();
  }

  ngOnInit(): void {
    this.getUserRole();
  }

 getSubjectById(){
  this._doctor.getSubjectById(this.id).subscribe({
    next:(res)=>{
      this.subject=res
    }
  })
 }

 deleteQuestion(index:number){

  this.subject.questions.splice(index,1);
  
  const model={
    name:this.subject.name,
    questions:this.subject.questions
  }
  
  this._doctor.updateSubject(model,this.id).subscribe({
    next:(res)=>{
      this._toaster.success('تم حذف السؤال بنجاح')
    }
  })
    }

    getUserRole(){
      this._auth.getRole().subscribe({
        next:(res)=>{
  this.userRole=res;
  this.getUserData();
        }
      })
    }

    getUserData(){
      this._auth.getStudentById(this.userRole.userId).subscribe({
        next:(res)=>{
this.userInfo=res;
this.userSubjects=res?.subjects ?  res?.subjects : [];
this.checkValidExam();
        }
      })
    }

    getAnswer(event:any){
let value = event.value;
let questionIndex = event.source.name;

this.subject.questions[questionIndex].studentAnswer=value;
      console.log(event.source.name);
      
    }

    getResult(){
     
      this.totalResult=0;
      for(let x in this.subject.questions){
        if(this.subject.questions[x].studentAnswer == this.subject.questions[x].correctAnswer){
          this.totalResult++
        }
      }
      this.showResult= true;
      console.log(this.totalResult);

      // ===========================================================
      this.userSubjects.push({
        name:this.subject.name,
        id:this.id,
        degree:this.totalResult
      })
    const model={
      userName: this.userInfo.userName,
      email:this.userInfo.email,
      password: this.userInfo.password,
      subjects:this.userSubjects
    }

    this._auth.updateStudent(this.userRole.userId,model).subscribe({
      next:(res)=>{
        this._toaster.success("تم تسجيل النتيجة بنجاح")
      }
    })

    }

    checkValidExam(){
      for(let x in this.userSubjects){
        if(this.userSubjects[x].id == this.id){
this.validExam=false;
this.totalResult = this.userSubjects[x].degree;
this._toaster.warning("لقد انجزت هذا الاختبار مسبقا")
        }
      }
    }

}
