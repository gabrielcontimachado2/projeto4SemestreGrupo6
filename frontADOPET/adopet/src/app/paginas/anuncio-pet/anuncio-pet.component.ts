import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioServiceService } from 'src/app/servicos/anuncio-service.service';

@Component({
  selector: 'app-anuncio-pet',
  templateUrl: './anuncio-pet.component.html',
  styleUrls: ['./anuncio-pet.component.css']
})
export class AnuncioPetComponent implements OnInit {

  constructor(private route: ActivatedRoute, private anuncioService: AnuncioServiceService) { }

  public anuncioId: any;
  anuncio: any;

  ngOnInit(): void {
    this.anuncioId = (this.route.snapshot.paramMap.get('id'));
    this.getAnuncioId();
  }

  getAnuncioId(){
    this.anuncioService.getAnuncioId(this.anuncioId)
    .subscribe(
   (value) => {
      this.anuncio = value;
   },
   (error) => {
      console.log('deu erro ao pegar anuncio')
   }
    )
  }

}

