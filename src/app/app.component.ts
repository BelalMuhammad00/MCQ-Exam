import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.getUserData();
  }
  
constructor(private _auth:AuthService) {}

  getUserData(){
    this._auth.getRole().subscribe({
      next:(res)=>{console.log(res);
        this._auth.user.next(res);
      }
    })
  }
}