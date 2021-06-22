import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/servicos/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuarioGroup: FormGroup;
  usuario: Users;
  usuarioService: any;

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    this.initForm();
  }

  //Iniciar um form com os dados que estão sendo passado no angular
  initForm(){
    this.usuarioGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password:new FormControl('', Validators.required), 
    email:new FormControl('', Validators.required), 
  })
  }

  adicionarUsuario(){

    const usuario = new Users();
    usuario.username = this.usuarioGroup.controls.username.value;
    usuario.password = this.usuarioGroup.controls.password.value;
    usuario.email = this.usuarioGroup.controls.email.value;

    this.userService.addUsuario(usuario).then(() =>{
      alert("Usuario criado com sucesso!!");
    });  
  }

}
