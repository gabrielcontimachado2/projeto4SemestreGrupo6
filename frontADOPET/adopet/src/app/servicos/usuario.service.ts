import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import Utilidade from './utilidade';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient) { }

  //Url base da API
  backUrl = baseUrl;

  addUsuario(usuario: any){
    return this.http.post(this.backUrl + 'users/'
       ,   Utilidade.gerarFormData(usuario)).toPromise();
  }

}
