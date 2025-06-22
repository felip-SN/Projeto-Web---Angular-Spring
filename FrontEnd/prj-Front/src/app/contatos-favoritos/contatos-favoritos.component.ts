import { Component } from '@angular/core';
import { ContatoService } from '../service/contato.service';
import { Contato, ContatoResponse } from '../types/interface';

@Component({
  selector: 'app-contatos-favoritos',
  standalone: false,
  templateUrl: './contatos-favoritos.component.html',
  styleUrl: './contatos-favoritos.component.css'
})
export class ContatosFavoritosComponent {

  contatoList: Contato[] = [];

  constructor(private contatoService: ContatoService){
    this.getFavorites();
  }

  getFavorites(){
    let apiUrl = "http://localhost:8080/api/contato/favoritos";

    this.contatoService.get(apiUrl).subscribe({
      next: data => {
        this.contatoList = data;
      }
    })
  }
}
