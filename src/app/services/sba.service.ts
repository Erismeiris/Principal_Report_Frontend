import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Subject, tap } from 'rxjs';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class SBAService {

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  constructor( private http: HttpClient, private usuarioServices: UsuarioService) { }


getSbaByReportId(id:number){
  return this.http.get(`${base_url}/sba`, this.usuarioServices.headersSchool)
}

deleteSba(id:number){
  return this.http.delete(`${base_url}/sba/${id}`, this.usuarioServices.headersSchool)
}
createSba(sba:any){
  return this.http.post(`${base_url}/sba`, sba, this.usuarioServices.headersSchool)
  .pipe(
    tap(()=>{
      this._refreshNeeded$.next();
    } )
  )
}


}
