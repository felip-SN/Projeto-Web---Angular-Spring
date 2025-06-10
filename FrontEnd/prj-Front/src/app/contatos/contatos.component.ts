import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contato, ContatoModal, ContatoResponse } from '../types/interface';
import { ContatoService } from '../service/contato.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contatos',
  standalone: false,
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.css'
})
export class ContatosComponent {
  private modalService = inject(NgbModal);
  pageNumber: number = 0;
  pageSize: number = 0;
  totalPage: number = 0;
  favorite: boolean = false;

  formGroupContato: FormGroup;
  contatoModal = new ContatoModal();

  contatosList: Contato[] = [];

  constructor(private contatoService: ContatoService, private formBuilder: FormBuilder) {
    this.getContatos();

    this.formGroupContato = formBuilder.group({
      id: [],
      nome: [],
      telefone: [],
      telefoneSecundario: [],
      email: [],
      endereco: [],
      foto: [],
      dataAniversario: [],
      empresa: [],
      cargo: [],
      favorito: [],
      categoria: [],
    })
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
  }

  favoriteClick() {
    this.favorite = !this.favorite;
  }

  nextPage(){
    if(this.pageNumber < this.totalPage){
        this.pageNumber += 1;
    }

    this.getContatos(this.pageNumber);
  }

  previosPage(){
    if(this.pageNumber > 1){
        this.pageNumber -= 1;
    }

    this.getContatos(this.pageNumber);
  }

  getContatos(page: number = 1) {
    var apiUrl = `http://localhost:8080/api/contato/getContatos?pageNumber=${page}&pageSize=10`;

    this.contatoService.get(apiUrl).subscribe({
      next: (data: ContatoResponse) => {
        console.log(data.content);
        this.contatosList = data.content;
        this.pageNumber = data.pageable.pageNumber + 1;
        this.pageSize = data.pageable.pageSize;
        this.totalPage = data.totalPages;
      }
    });
  }

  postContato(){
    var apiUrl = "http://localhost:8080/api/contato/save";

    this.contatoModal = this.formGroupContato.value;

    this.contatoService.save(apiUrl, this.contatoModal).subscribe({
      next: (data) => {
        console.log(this.formGroupContato.get('categoria')?.value)
        this.formGroupContato.reset();
        this.getContatos();
      }
    })
  }
}
