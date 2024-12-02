import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _http:HttpClient) { }

  createSubject(model:any):Observable<any>{
    return this._http.post(environment.baseUrl+'subjects',model);
  }

  updateSubject(model:any,id:any):Observable<any>{
    return this._http.put(environment.baseUrl+'subjects/'+id,model);
  }

  getAllSubject():Observable<any>{
    return this._http.get(environment.baseUrl+'subjects');
  }

  getSubjectById(id:any):Observable<any>{
    return this._http.get(environment.baseUrl+'subjects/'+id);
  }

  deleteSubject(id:any):Observable<any>{
    return this._http.delete(environment.baseUrl+'subjects/'+id);
  }
  
}
