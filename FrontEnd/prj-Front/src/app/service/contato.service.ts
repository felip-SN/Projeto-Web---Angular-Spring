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

  save(url: string, contato: any): Observable<string>{
    return this.httpClient.post(url, contato, {responseType: 'text'});
  }

  delete(url: string): Observable<string>{
    return this.httpClient.delete(url, {responseType: 'text'});
  }

  update(url: string, contato: any): Observable<string>{
    return this.httpClient.put(url, contato, {responseType: 'text'});
  }
}
