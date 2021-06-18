import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticadorService } from 'src/app/servicos/autenticador.service';

@Injectable()
export class AuthGuard implements CanActivate {    
  constructor(
   private autenticadorService: AutenticadorService,
   private router:Router){}
  canActivate(
   route: ActivatedRouteSnapshot, 
   state: RouterStateSnapshot)
   : boolean 
   | UrlTree 
   | Observable<boolean 
   | UrlTree> 
   | Promise<boolean 
   | UrlTree> {
   let userData = this.autenticadorService.userInfo.getValue();
   if(userData){
	   if(state.url.indexOf("login") != -1){
	      this.router.navigate(["home"]);
	      return false;
	   }
	   else{
	      return true;
	   }
   }
   else{
	   if(state.url.indexOf("login") == -1){
	      this.router.navigate(["login"]);
	      return false;
	   }
	   else{
	      return true;
	   }
   }    
  }
}