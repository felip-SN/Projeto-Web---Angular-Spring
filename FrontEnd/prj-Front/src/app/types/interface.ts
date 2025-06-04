export interface Contato{
    "id": number,
    "nome": string,
    "telefone": string,
    "telefoneSecundario": string,
    "email": string,
    "endereco": string,
    "foto": Blob,
    "dataAniversario": Date;
    "empresa": string,
    "cargo": string,
    "favorito": boolean,
    "categoria": string
}