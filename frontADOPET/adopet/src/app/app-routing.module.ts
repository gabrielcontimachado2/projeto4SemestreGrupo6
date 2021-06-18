import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/paginas/login/login.component';
import { HomeComponent } from 'src/app/paginas/home/home.component';
import { CadastroComponent } from 'src/app/paginas/cadastro/cadastro.component';
import { AnuncioComponent } from 'src/app/paginas/anuncio/anuncio.component';
import { AnuncioPetComponent } from 'src/app/paginas/anuncio-pet/anuncio-pet.component';
import { AuthGuard } from './guard/autenGuard.guard';
import { BlogComponent } from './paginas/blog/blog.component';
import { PrestacaoContasComponent } from './paginas/prestacao-contas/prestacao-contas.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'home',component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard]},
  {path: 'anuncio', component: AnuncioComponent, canActivate: [AuthGuard]},
  {path: 'anuncioPet/:id', component: AnuncioPetComponent, canActivate: [AuthGuard]},
  {path: 'blog', component: BlogComponent, canActivate: [AuthGuard]},
  {path: 'prestacaoContas', component: PrestacaoContasComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
