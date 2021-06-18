import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnuncioComponent } from './paginas/anuncio/anuncio.component';
import { HeaderComponent } from './paginas/header/header.component';
import { FooterComponent } from './paginas/footer/footer.component';
import { LoginComponent } from './paginas/login/login.component';
import { HomeComponent } from './paginas/home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { AutenticadorService } from 'src/app/servicos/autenticador.service';
import { AuthGuard } from 'src/app/guard/autenGuard.guard';
import { AuthTokenInterceptors } from './interceptor/auten.token.interceptors';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AnuncioPetComponent } from './paginas/anuncio-pet/anuncio-pet.component';
import { BlogComponent } from './paginas/blog/blog.component';
import { PrestacaoContasComponent } from './paginas/prestacao-contas/prestacao-contas.component';



@NgModule({
  declarations: [
    AppComponent,
    AnuncioComponent,
    AnuncioComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    AnuncioPetComponent,
    BlogComponent,
    PrestacaoContasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDropzoneModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    AutenticadorService,
    AuthGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthTokenInterceptors,
        multi: true,
    },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
