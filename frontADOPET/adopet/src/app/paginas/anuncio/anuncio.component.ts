import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Anuncio } from 'src/app/models/anunciosmodels.models';
import { AnuncioServiceService } from 'src/app/servicos/anuncio-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import * as Utilidade from 'src/app/servicos/utilidade';


@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {
  

  anuncio: any;
  anuncioGroup: FormGroup;
  anuncios: Anuncio;
  files: File[] = [];
  fotoAnuncioA: File;

  constructor(private anuncioService: AnuncioServiceService) { }

  ngOnInit(): void {
    this.getAnuncios();
    this.initForm();
  }

initForm(){
    this.anuncioGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    tipoAnimal: new FormControl('', Validators.required),
    localizacao:new FormControl('', Validators.required),
    raca: new FormControl('', Validators.required),
    porte: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
    personalidade:new FormControl('', Validators.required),
    observacoes: new FormControl('', Validators.required),
    historia: new FormControl('', Validators.required),
    fotoAnuncio: new FormControl(['']), 
  })
}


  getAnuncios(){
      this.anuncioService.getAnuncios()
      .subscribe(
     (value) => {
        this.anuncio = value;
     },
     (error) => {
        console.log('failted to load todos')
     }
      )
  }

  addAnuncios(){

    const anuncios = new Anuncio();
    anuncios.nome = this.anuncioGroup.controls.nome.value;
    anuncios.tipoAnimal = this.anuncioGroup.controls.tipoAnimal.value;
    anuncios.localizacao = this.anuncioGroup.controls.localizacao.value;
    anuncios.raca = this.anuncioGroup.controls.raca.value;
    anuncios.porte = this.anuncioGroup.controls.porte.value;
    anuncios.sexo = this.anuncioGroup.controls.sexo.value;
    anuncios.dataNascimento = this.anuncioGroup.controls.dataNascimento.value;
    anuncios.personalidade = this.anuncioGroup.controls.personalidade.value;
    anuncios.observacoes = this.anuncioGroup.controls.observacoes.value;
    anuncios.historia = this.anuncioGroup.controls.historia.value;
    anuncios.fotoAnuncio = this.fotoAnuncioA
    anuncios.fotos = this.files;

    this.anuncioService.addAnuncio(anuncios).then(res =>{
      alert("Anuncio salvo com sucesso!!");
    });  
  }

  onImageChanged(event:any){
    this.fotoAnuncioA = event.target.files[0];
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async converte(files: File) {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    return reader.onload = () => {
      return reader.result;
    };
  }

     
}


