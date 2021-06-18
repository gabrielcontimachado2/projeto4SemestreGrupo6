
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

  anuncios: any=[];
  constructor(private route: Router, private anuncioService: AnuncioServiceService) { }

  ngOnInit(): void {
    this.getAnuncios();
  }


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

  irAnuncio(anuncio: any){
    this.route.navigate(['anuncioPet', anuncio.id]);
  }
}
