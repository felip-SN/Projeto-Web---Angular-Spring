export interface Contato{
    "id": number,
    "nome": string,
    "telefone": string,
    "telefoneSecundario": string,
    "email": string,
    "endereco": string,
    "foto": string,
    "dataAniversario": Date;
    "empresa": string,
    "cargo": string,
    "favorito": boolean,
    "categoria": string
}

export class ContatoModal{
    id?: number;
    nome?: string;
    telefone?: string;
    telefoneSecundario?: string;
    email?: string;
    endereco?: string;
    foto?: string;
    dataAniversario?: Date;
    empresa?: string;
    cargo?: string;
    favorito?: boolean;
    categoria?: string;
}

export interface ContatoResponse {
  content: Contato[];
  totalPages: number;
  totalElements: number;
  pageable: any;
}

export enum Categoria {
    Familia,
    Trabalho,
    Escola,
    Outros
}