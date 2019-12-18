import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PitanjeComponent } from './components/pitanje/pitanje.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PitanjaComponent } from './components/pitanja/pitanja.component';
import { PretragaPitanjaComponent } from './components/pretraga-pitanja/pretraga-pitanja.component';
import { DodajPitanjeComponent } from './components/dodaj-pitanje/dodaj-pitanje.component';


const routes: Routes = [
  {path:'pitanje',component:PitanjeComponent},
  {path:'pitanja',component:PitanjaComponent},
  {path:'login',component:LoginComponent},
  {path:'profil/:username',component:ProfilComponent},
  {path: 'pretragapitanja/:username',component:PretragaPitanjaComponent},
  {path:'dodajPitanje/:username',component:DodajPitanjeComponent},
  {path:'',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
