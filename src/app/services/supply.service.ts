import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supply } from '../model/supply.model';


@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  abastecimentoAdicionado: EventEmitter<void> = new EventEmitter();


  private baseUrl = 'http://localhost:8080/api/abastecimentos';

  constructor(private http: HttpClient) { }

  listarAbastecimentos(): Observable<Supply[]> {
    return this.http.get<Supply[]>(`${this.baseUrl}`);
  }

  adicionarAbastecimento(supply: Supply): Observable<Supply> {
    return this.http.post<Supply>(`${this.baseUrl}`, supply);
  }

  removerAbastecimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
