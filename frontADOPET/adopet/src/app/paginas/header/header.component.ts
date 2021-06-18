import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnuncioServiceService } from 'src/app/servicos/anuncio-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router, private anuncioService: AnuncioServiceService) { }

  ngOnInit(): void {
  }

}
