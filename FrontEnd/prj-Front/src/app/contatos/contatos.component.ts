import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contatos',
  standalone: false,
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.css'
})
export class ContatosComponent {
  private modalService = inject(NgbModal);

  favorite: boolean = false;


  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
	}

  closeTeste(){
    alert("Contato excluido!");
  }

  favoriteClick(){
    this.favorite = !this.favorite;
  }
}
