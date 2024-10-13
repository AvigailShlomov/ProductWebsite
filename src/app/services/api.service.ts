import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL} from '../Modals/app-modals';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(data: any): Observable<any> {
    return this.http.post<any>(API_URL, data);
  }

  getProduct(): Observable<any> {
    return this.http.get<any>(API_URL)
  }

  putProduct(data: any, id: number): Observable<any> {
    return this.http.put<any>(API_URL + id, data)
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + id)
  }
}
