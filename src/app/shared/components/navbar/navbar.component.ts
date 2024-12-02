import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
user:any=null;
isNavbarOpen = false;

toggleNavbar() {
  this.isNavbarOpen = !this.isNavbarOpen;
}
  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    this.getUserData();
  }
getUserData(){
  this._auth.user.subscribe({
    next:(res:any)=>{
      if(res.userName){
        this.user=res;
      }
      
    }
  })
}

logOut(){
  const model={}
  this._auth.login(model).subscribe(res=>{
    this.user=null;
    this._auth.user.next(res);
  });

  localStorage.removeItem("userData");

}

}
