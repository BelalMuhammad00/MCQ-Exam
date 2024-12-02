import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
 subjectName =new FormControl("");
 questionForm!:FormGroup;
 questions:any[]=[];
 correctNum:any;
 startAdd:boolean=false;
 preview:boolean=false;
 Sname:string="";
 stepperIndex=0; 
 questionId:any;
  constructor(private _fb:FormBuilder, private _toaster:ToastrService,private _doctor:DoctorService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.questionForm=this._fb.group({
      question:["",Validators.required],
      answer1:["",Validators.required],
      answer2:["",Validators.required],
      answer3:["",Validators.required],
      answer4:["",Validators.required],
      correctAnswer:[""],
    })
  }

  createQuestion(){
    if(this.correctNum){
const model={
  question:this.questionForm.value.question,
  answer1:this.questionForm.value.answer1,
  answer2:this.questionForm.value.answer2,
  answer3:this.questionForm.value.answer3,
  answer4:this.questionForm.value.answer4,
  correctAnswer:this.questionForm.value[this.correctNum]
}

this.questions.push(model);
this.questionForm.reset();
console.log(this.questions);

    }else{
      this._toaster.error('يرجي اختيار الاجابة الصحيحة');
    }
  }

  getCorrectAnswer(event:any){
    this.correctNum=event.value;
  }

  submit(){
    const model={
      name:this.Sname,
      questions:this.questions
    }

 

    if(this.preview==true){
      this.stepperIndex=2
    }else{
      this._doctor.createSubject(model).subscribe({
        next:(res)=>{
  this.preview=true;
  this.questionId=res.id;
        }
      })
    }
  };

  start(){
    if(this.subjectName.value===""){
this._toaster.error("يرحي ادخال اسم المادة");
this.startAdd=false;
    }else{
      this.startAdd=true;
      this.Sname=this.subjectName.value;
    }

    if(this.startAdd=true){
      this.stepperIndex=1;
    }
  };

  clearForm(){
    this.questionForm.reset();
  }
  cancel(){
    this.clearForm();
    this.startAdd=false;
    this.questions=[];
    this.stepperIndex=0;
    this.subjectName.reset();
    this.Sname="";
  }

  deleteQuestion(index:number){

this.questions.splice(index,1);

const model={
  name:this.Sname,
  questions:this.questions
}

this._doctor.updateSubject(model,this.questionId).subscribe({
  next:(res)=>{
    this._toaster.success('تم حذف السؤال بنجاح')
  }
})
  }
}
