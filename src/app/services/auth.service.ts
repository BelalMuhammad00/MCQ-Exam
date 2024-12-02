import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user =new Subject();

  constructor(private http:HttpClient) { }

  register(model:any):Observable<any>{
    return this.http.post(environment.baseUrl+"students",model)
  }

  login(model:any){
    return this.http.put(environment.baseUrl+"login/1",model);
  }

  getStudents(type:string):Observable<any>{
    return this.http.get(environment.baseUrl+type)
  }

  getStudentById(id:string):Observable<any>{
    return this.http.get(environment.baseUrl+"students/"+id)
  }

  updateStudent(id:string,model:any):Observable<any>{
    return this.http.put(environment.baseUrl+"students/"+id,model);
  }

  getRole():Observable<any>{
    return this.http.get(environment.baseUrl+"login/1");
  }

  clearSubjects(studentId: string): Observable<any> {
    return this.http.patch(`${environment.baseUrl}students/${studentId}`, { subjects: [] });
  }
  

}
