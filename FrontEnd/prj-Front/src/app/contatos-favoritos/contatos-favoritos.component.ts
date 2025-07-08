import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ContatoService } from '../service/contato.service';
import { Contato, ContatoResponse } from '../types/interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contatos-favoritos',
  standalone: false,
  templateUrl: './contatos-favoritos.component.html',
  styleUrl: './contatos-favoritos.component.css'
})
export class ContatosFavoritosComponent implements OnInit {
  private modalService = inject(NgbModal);
  pageNumber: number = 0;
  pageSize: number = 0;
  totalPage: number = 0;

  contatosList: Contato[] = [];
  formGroupContato!: FormGroup;

  page: number = 1;
  category: string = "Categoria";

  constructor(private contatoService: ContatoService, private formBuilder: FormBuilder) {
    this.getFavorites();
  }

  ngOnInit(): void {
    this.formGroupContato = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      nome: [{ value: "", disabled: true }],
      telefone: [{ value: "", disabled: true }],
      telefoneSecundario: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }],
      endereco: [{ value: "", disabled: true }],
      foto: [{ value: "", disabled: true }],
      dataAniversario: [{ value: "", disabled: true }],
      empresa: [{ value: "", disabled: true }],
      cargo: [{ value: "", disabled: true }],
      favorito: [{ value: "", disabled: true }],
      categoria: [{ value: "", disabled: true }],
    });
  }

  getFavorites() {
    let apiUrl = "http://localhost:8080/api/contato/favoritos";

    this.contatoService.get(apiUrl).subscribe({
      next: data => {
        this.contatosList = data;
      },
      error: error => {
        alert(error);
      }
    })
  }

  openLg(content: TemplateRef<any>, modal: string = "", id: number = 0) {
    this.modalService.open(content, { size: 'lg', centered: true }).result.then(
      (result) => {},
      (reason) => {
        this.clearFields();
      },
    )

    if (modal == "edit") {
      const contato = this.contatosList.find(c => c.id == id);

      this.formGroupContato.setValue({
        id: contato?.id,
        nome: contato?.nome,
        telefone: contato?.telefone,
        telefoneSecundario: contato?.telefoneSecundario,
        email: contato?.email,
        endereco: contato?.endereco,
        foto: contato?.foto,
        dataAniversario: contato?.dataAniversario,
        empresa: contato?.empresa,
        cargo: contato?.cargo,
        favorito: contato?.favorito,
        categoria: contato?.categoria
      });

      if (this.formGroupContato.get("categoria")?.value == "" || this.formGroupContato.get("categoria")?.value == null) {
        this.category = "Categoria";
      } else {
        this.category = this.formGroupContato.get("categoria")?.value;
      }
    }
  }

  clearFields() {
    this.formGroupContato.setValue({
      id: '',
      nome: '',
      telefone: '',
      telefoneSecundario: '',
      email: '',
      endereco: '',
      foto: '',
      dataAniversario: '',
      empresa: '',
      cargo: '',
      favorito: '',
      categoria: ''
    });
  }
}
