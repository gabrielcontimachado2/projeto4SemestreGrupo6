import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  public getAnuncio(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/AnuncioAnimal/');
  }

}
