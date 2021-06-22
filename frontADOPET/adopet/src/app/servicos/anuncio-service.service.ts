import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anunciosmodels.models';
import Utilidade from './utilidade';

@Injectable({
  providedIn: 'root'
})
export class AnuncioServiceService {

  private anuncioUrl = 'http://127.0.0.1:8000/AnuncioAnimal/';  // URL to web api


  constructor(private http: HttpClient) { }

  getAnuncios(){
    return this.http.get(this.anuncioUrl);
  }

  getAnuncioId(id : any){
    return this.http.get(this.anuncioUrl + id + "/");
  }

  //addAnuncio (anuncio: any){
  //  return this.http.post(this.anuncioUrl, anuncio);
  //}
  addAnuncio (anuncio: any){
    return this.http.post('http://127.0.0.1:8000/AnuncioAnimal/'
       ,   Utilidade.gerarFormData(anuncio)).toPromise();
  }

}
