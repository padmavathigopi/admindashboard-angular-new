import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testtable } from '../app/models/reports-table';
import { admindata } from '../app/models/reports-table';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {
  private baseUrl = 'https://gglgm8-8080.csb.app/api/tutorials/';
private adminUrl='http://localhost:8082/api/admindbs/';
  constructor(private http: HttpClient) { }
  getAll(): Observable<Testtable[]> {
    return this.http.get<Testtable[]>(this.baseUrl);
    
  }

  get(id: any): Observable<Testtable> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id :any,data: any): Observable<Testtable> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id:number): Observable<Testtable> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Testtable[]> {
    return this.http.get<Testtable[]>(`${this.baseUrl}?title=${title}`);
  }


  

  getAdmin(): Observable<admindata[]> {
    return this.http.get<admindata[]>(this.adminUrl);
  }
  
  createAdmin(data: any): Observable<any> {
    return this.http.post(this.adminUrl, data);
  }
  
  updateAdmin(id: any, data: any): Observable<any> {
    return this.http.put(`${this.adminUrl}/${id}`, data);
  }
  
  deleteAdmin(id: any): Observable<admindata> {
    return this.http.delete(`${this.adminUrl}/${id}`);
  }
  
}
