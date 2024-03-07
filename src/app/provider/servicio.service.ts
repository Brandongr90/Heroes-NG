import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  public api = 'http://127.0.0.1:8000/api/productos/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public http: HttpClient) {
  }
  
  POST(modelo: string, data: any) {
    return this.http.post(this.api + modelo, data);
  }

  PUT(modelo: string, data: any) {
    return this.http.put(this.api + modelo, data);
  }

  DELETE(modelo: string, data: any) {
    return this.http.delete(this.api + modelo + data);
  }

}
