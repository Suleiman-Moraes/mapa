import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseApi } from '../response-api.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient
  ) {}

  public buscarPedidoEmAndamento(userId: any): Observable<ResponseApi> {
    return this.http.get(`localhost:8080/pedido/user/${userId}/openlast`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }

  private fromJsonResponseApi(jsonData: any): any {
    return Object.assign(ResponseApi, jsonData);
  }
}
