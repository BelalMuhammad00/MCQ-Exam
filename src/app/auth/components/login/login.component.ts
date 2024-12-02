import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  users:any[]=[];
  UserType:string="students"
    constructor(private _fb:FormBuilder , private _auth:AuthService, private _router:Router,private _toaster:ToastrService) { }

  ngOnInit(): void {
   this.createForm();
   this.getUsers();
  }

  createForm(){
    this.loginForm=this._fb.group({
      type:[this.UserType],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required]
    })
    }

    getRole(event:any){
this.UserType=event.value;
this.getUsers();
    }

    getUsers(){
      this._auth.getStudents(this.UserType).subscribe({
        next:(res:any)=>{
          this.users=res
        }
      })
    }  


    submit(){
    
    
      let index = this.users.findIndex(item=> item.email===this.loginForm.value.email && item.password===this.loginForm.value.password);
    
      if(index== -1){
        this._toaster.error('الايميل او كلمة المرور غير صحيحة',"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        });

      }else{
    const model={
      userName:this.users[index].userName,
      role:this.UserType,
      userId:this.users[index].id
    }


        this._auth.login(model).subscribe({
          next:(res)=>{console.log(res);
            this._auth.user.next(res);
            localStorage.setItem("userData",JSON.stringify(res));
           this._toaster.success('تم تسجيل الدخول بنجاح',"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        })
      this._router.navigate(['/subjects'])
          }
        })
    
      }
    
    }

}


