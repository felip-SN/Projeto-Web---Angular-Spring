import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    @Input() contato: string = 'nav-link text-white';
    @Input() favorito: string = 'nav-link text-white';
    @Input() categoria: string = 'nav-link text-white';
}
