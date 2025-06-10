import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato, ContatoResponse } from '../types/interface';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<any>{
    return this.httpClient.get<any>(url);
  }

  save(url: string, contato: any): Observable<any>{
    return this.httpClient.post<any>(url, contato);
  }

  delete(url: string): Observable<void>{
    return this.httpClient.delete<void>(url);
  }

  update(url: string, contato: Contato): Observable<Contato>{
    return this.httpClient.put<Contato>(url, contato);
  }
}
