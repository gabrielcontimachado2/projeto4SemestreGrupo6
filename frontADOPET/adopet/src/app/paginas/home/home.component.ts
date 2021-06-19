
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnuncioServiceService } from 'src/app/servicos/anuncio-service.service';
import { AutenticadorService } from 'src/app/servicos/autenticador.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Armazenas os anuncios que virão da API
  anuncios: any=[];
  constructor(private route: Router, private anuncioService: AnuncioServiceService) { }

  ngOnInit(): void {
    this.getAnuncios();
  }

  //Receber todos os anuncios que estão salvos na API REST
  getAnuncios(){
    this.anuncioService.getAnuncios()
    .subscribe(
   (value) => {
      this.anuncios = value;
   },
   (error) => {
      console.log('failted to load todos')
   }
    )
  }

  //Ir para um anuncio utilizando o id desse anuncio
  irAnuncio(anuncio: any){
    this.route.navigate(['anuncioPet', anuncio.id]);
  }
}
