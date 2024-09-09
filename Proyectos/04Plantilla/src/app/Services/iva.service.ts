import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICliente } from '../Interfaces/icliente';
import { Observable } from 'rxjs';
import { iva } from '../Interfaces/iva';

@Injectable({
  providedIn: 'root'
})
export class ivaService {
  apiurl = 'http://localhost/Sexto/Proyectos/03MVC/controllers/iva.controller.php?op=';
  constructor(private lector: HttpClient) {}

    todos(): Observable<iva[]> {
    return this.lector.get<iva[]>(this.apiurl + 'todos');
  }
}
