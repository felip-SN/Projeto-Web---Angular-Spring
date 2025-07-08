import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Contato } from '../types/interface';
import { ContatoService } from '../service/contato.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contatos-categoria',
  standalone: false,
  templateUrl: './contatos-categoria.component.html',
  styleUrl: './contatos-categoria.component.css'
})
export class ContatosCategoriaComponent implements OnInit {
  contatosFamilia: Contato[] = [];
  contatosFaculdade: Contato[] = [];
  contatosTrabalho: Contato[] = [];
  contatosAmigos: Contato[] = [];
  contatosEmergencia: Contato[] = [];

  contatos: Contato[] = [];

  private modalService = inject(NgbModal);

  constructor(private contatoService: ContatoService) { }

  open(content: TemplateRef<any>, category: string) {
    this.modalService.open(content, { size: 'xl', centered: true });

    switch(category){
      case 'Familia': this.contatos = this.contatosFamilia; break;
      case 'Trabalho': this.contatos = this.contatosTrabalho; break;
      case 'Faculdade': this.contatos = this.contatosFaculdade; break;
      case 'Amigos': this.contatos = this.contatosAmigos; break;
      case 'Emergencia': this.contatos = this.contatosEmergencia; break;
    }
  }

  ngOnInit(): void {
    this.getFamilia();
    this.getTrabalho();
    this.getFaculdade();
    this.getAmigos();
    this.getEmergencia();
  }

  getFamilia() {
    let apiUrl = "http://localhost:8080/api/contato/categoria/Familia"

    this.contatoService.get(apiUrl).subscribe({
      next: data => {
        this.contatosFamilia = data;
      },
      error: error => {
        alert(error);
      }
    });
  }

  getTrabalho() {
    let apiUrl = "http://localhost:8080/api/contato/categoria/Trabalho"

    this.contatoService.get(apiUrl).subscribe({
      next: data => {
        this.contatosTrabalho = data;
      },
      error: error => {
        alert(error);
      }
    });
  }

  getFaculdade() {
    let apiUrl = "http://localhost:8080/api/contato/categoria/Faculdade"

    this.contatoService.get(apiUrl).subscribe({
      next: data => {
        this.contatosFaculdade = data;
      },
      error: error => {
        alert(error);
      }
    });
  }

  getAmigos() {
    let apiUrl = "http://localhost:8080/api/contato/categoria/Amigos"

    this.contatoService.get(apiUrl).subscribe({
      next: data => {
        this.contatosAmigos = data;
      },
      error: error => {
        alert(error);
      }
    });
  }

  getEmergencia() {
    let apiUrl = "http://localhost:8080/api/contato/categoria/Emergencia"

    this.contatoService.get(apiUrl).subscribe({
      next: data => {
        this.contatosEmergencia = data;
      },
      error: error => {
        alert(error);
      }
    });
  }

  updateContato(id: number) {
    const contato = this.contatosFamilia.find(c => c.id == id);
    const novoFavorito = !contato?.favorito;

    var apiUrl = `http://localhost:8080/api/contato/favoritar/${id}?favorito=${novoFavorito}`;

    this.contatoService.update(apiUrl, contato).subscribe({
      next: (data) => {
        contato!.favorito = novoFavorito;
        this.getFamilia();
        this.getTrabalho();
        this.getFaculdade();
        this.getAmigos();
        this.getEmergencia();
      }
    });
  }
}
