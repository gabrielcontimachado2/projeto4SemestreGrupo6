import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticadorService } from 'src/app/servicos/autenticador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  showErrorMessage: any;
  formGroup: FormGroup;
  private router: Router;
  loading = false;
  submitted = false;


  constructor(private route: Router, private autenticador: AutenticadorService) { 

    }

  ngOnInit(){
    this.initForm();
  }   

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required )
    })
  }

  //Realizar o login, caso o login seja autenticado pela api, retorna o usuario para a home, se não continuar na pagina de login
  loginProcess(){
    this.autenticador.login(this.formGroup.value)
    .subscribe(
      (data) => {
      if(data){
       this.route.navigate(['home']);
      }else{
       alert('erro');
      }
      },
      (error)=>{
       alert('erro ao autenticar!');
      }
    )
  }

}
      //this.router.navigate(['anuncio']),
    
    //if(this.formGroup.valid){
      //this.autenticador.login(this.formGroup.value).subscribe(result =>{
        //if(result.sucess){
         // console.log(result);
         // alert(result.message);
      //  }
       // else{
       //   alert(result.message);
       // }
    //
  
  
    // if (this.formGroup.invalid) {
    //  return;
  //  }
   // this.autenticador.login(this.formGroup.value).subscribe(
   //   (data: any) => {
   //     this.router.navigate(['/home']);
  //  })
  

  //isLoggedIn() {
  // return this.autenticador.isLoggedIn();
 // }


 // moveToAnuncio() {
  ///  this.router.navigate(['anuncio']);
  //}



