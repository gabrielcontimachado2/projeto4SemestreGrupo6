import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anuncio-pet',
  templateUrl: './anuncio-pet.component.html',
  styleUrls: ['./anuncio-pet.component.css']
})
export class AnuncioPetComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public anuncioId: any;

  ngOnInit(): void {
    this.anuncioId = (this.route.snapshot.paramMap.get('id'));
  }

}
