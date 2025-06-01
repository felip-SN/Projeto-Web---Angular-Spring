import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosFavoritosComponent } from './contatos-favoritos/contatos-favoritos.component';
import { ContatosComponent } from './contatos/contatos.component';

const routes: Routes = [
  {path: 'favorite', component: ContatosFavoritosComponent},
  {path: 'contacts', component: ContatosComponent},
  {path: '', redirectTo: '/contacts', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
