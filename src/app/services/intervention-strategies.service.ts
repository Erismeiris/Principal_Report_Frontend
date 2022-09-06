import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class InterventionStrategiesService {

  public _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor( 
    private http:HttpClient,
    private usuarioServices: UsuarioService
 
    ) { }

  getStrategies() {
    return this.http.get(`${base_url}/intervention_strategies`);
  }

  getStrategyByReportId(id: string) {
    return this.http.get(`${base_url}/intervention_strategies/${id}`, this.usuarioServices.headersSchool);
  }

  createStrategy(strategy: any) {
    return this.http.post(`${base_url}/intervention_strategies`, strategy, this.usuarioServices.headersSchool)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      }));
  }
  deleteStrategy(id: string) {
    return this.http.delete(`${base_url}/intervention_strategies/${id}`, this.usuarioServices.headersSchool);
  }

}
