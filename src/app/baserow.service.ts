import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaserowService {
  baseUrl = 'https://baserow.io/api/database/103767/table/280788/473665/';
  token = 'WsSu6kLTX476BQsrFucWpfEFBVpmV49p';

  constructor(private http: HttpClient) { }

  getClientes() {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.token}`
    });

    return this.http.get(`${this.baseUrl}table/{103767}/row/`, { headers });
  }

  adicionarCliente(cliente: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}row/`, cliente, { headers });
  }
  editarCliente(cliente: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.baseUrl}row/${cliente.nome}/`, cliente, { headers });
  }
  excluirCliente(clienteId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<any>(`${this.baseUrl}row/${clienteId}/`, { headers });
  }
}
