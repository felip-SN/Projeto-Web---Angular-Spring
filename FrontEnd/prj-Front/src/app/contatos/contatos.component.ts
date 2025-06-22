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

  page: number = 1;
  favorite: boolean = false;

  formGroupContato: FormGroup;
  contatoModal = new ContatoModal();

  contatosList: Contato[] = [];

  text: string = "";
  category: string = "Categoria";

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

  open(content: TemplateRef<any>, modal: string = "", id: number = 0) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })

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

  getCategory(category: string) {
    this.category = category;
  }

  fileBase64: string = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.fileBase64 = reader.result as string;
      };
      reader.readAsDataURL(file); // file para base64
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPage) {
      this.pageNumber += 1;
    }

    this.page = this.pageNumber;

    this.getContatos();
  }

  previosPage() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
    }

    this.page = this.pageNumber;

    this.getContatos();
  }

  getContatos() {
    var apiUrl = `http://localhost:8080/api/contato/getContatos?pageNumber=${this.page}&pageSize=10`;

    this.contatoService.get(apiUrl).subscribe({
      next: (data: ContatoResponse) => {
        this.contatosList = data.content;
        this.pageNumber = data.pageable.pageNumber + 1;
        this.pageSize = data.pageable.pageSize;
        this.totalPage = data.totalPages;
      }
    });
  }

  postContato() {
    var apiUrl = "http://localhost:8080/api/contato/save";

    this.contatoModal = this.formGroupContato.value;

    this.contatoModal.categoria = this.category;
    this.contatoModal.foto = this.fileBase64;

    debugger;
    this.contatoService.save(apiUrl, this.contatoModal).subscribe({
      next: (data) => {
        this.formGroupContato.reset();
        this.getContatos();
      }
    });
  }

  deleteContato(id: number) {
    var apiUrl = `http://localhost:8080/api/contato/delete/${id}`;

    this.contatoService.delete(apiUrl).subscribe({
      next: (data) => {
        this.getContatos();
      }
    });
  }

  updateContato(id: number) {
    const contato = this.contatosList.find(c => c.id == id);
    const novoFavorito = !contato?.favorito;

    var apiUrl = `http://localhost:8080/api/contato/favoritar/${id}?favorito=${novoFavorito}`;

    this.contatoService.update(apiUrl, contato).subscribe({
      next: (data) => {
        contato!.favorito = novoFavorito;
        this.getContatos();
      }
    });
  }

  buscarContato(nome: string = "") {
    var apiUrl = `http://localhost:8080/api/contato/buscar?nome=${nome}`;

    if (nome == "" || nome == null) {
      this.getContatos();
      return;
    }

    this.contatoService.get(apiUrl).subscribe({
      next: data => {
        this.contatosList = data;
      }
    });
  }
}
