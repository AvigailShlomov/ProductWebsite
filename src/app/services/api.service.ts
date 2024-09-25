import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }

  getProduct(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/productList/")
  }

  putProduct(data: any, id: string): Observable<any> {
    console.log("update procut put method: ", id);
    return this.http.put<any>("http://localhost:3000/productList/" + id, data)
  }

  deleteProduct(id: string): Observable<any> {
    console.log("update procut put method: ", id);
    return this.http.delete<any>("http://localhost:3000/productList/" + id)
  }
}
