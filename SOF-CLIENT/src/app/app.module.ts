import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PitanjeComponent } from './components/pitanje/pitanje.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PretragaPitanjaComponent } from './components/pretraga-pitanja/pretraga-pitanja.component';
import { DodajPitanjeComponent } from './components/dodaj-pitanje/dodaj-pitanje.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OdgovorComponent } from './components/odgovor/odgovor.component';
import { TagComponent } from './components/tag/tag.component';
import { SerachUserComponent } from './components/serach-user/serach-user.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
 
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PitanjeComponent,
    HomeComponent,
    ProfilComponent,
    PretragaPitanjaComponent,
    DodajPitanjeComponent,
    SearchBarComponent,
    OdgovorComponent,
    TagComponent,
    SerachUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
