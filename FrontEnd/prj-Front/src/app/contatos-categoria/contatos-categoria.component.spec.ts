import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosCategoriaComponent } from './contatos-categoria.component';

describe('ContatosCategoriaComponent', () => {
  let component: ContatosCategoriaComponent;
  let fixture: ComponentFixture<ContatosCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContatosCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatosCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
