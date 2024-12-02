import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
userForm!:FormGroup;
students:any[]=[];
 UserType:string="students"
  constructor(private _fb:FormBuilder , private _auth:AuthService, private _router:Router,private _toaster:ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    this.getStudents();
  }

getStudents(){
  this._auth.getStudents(this.UserType).subscribe({
    next:(res:any)=>{
      this.students=res
    }
  })
}  



createForm(){
this.userForm=this._fb.group({
  userName:['',Validators.required],
  email:['',Validators.required,Validators.email],
  password:['',Validators.required],
  cPassword:['',Validators.required]
})
}

submit(){
  let model = {
    userName:this.userForm.value.userName,
    email:this.userForm.value.email,
    password:this.userForm.value.password
  }

  let index = this.students.findIndex(item=> item.email==this.userForm.value.email);

  if(index!== -1){
    this._toaster.error('الايميل موجود مسبقا',"",{
      disableTimeOut:false,
      titleClass:"toaster_title",
      messageClass:"toaster_message",
      timeOut:5000,
      closeButton:true
    });
  }else{

    this._auth.register(model).subscribe({
      next:(res)=>{console.log(res);
       this._toaster.success('تم انشاء الحساب بنجاح',"",{
      disableTimeOut:false,
      titleClass:"toaster_title",
      messageClass:"toaster_message",
      timeOut:5000,
      closeButton:true
    })

    const model={
      userName:res.userName,
      role:"students",
      userId:res.id
    }


        this._auth.login(model).subscribe({
          next:(res)=>{console.log(res);
            this._auth.user.next(res);
          }
        })

  this._router.navigate(['/subjects'])
      }
    })

  }

}


}
