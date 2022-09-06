import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Subject, tap } from 'rxjs';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ExtracurricularActivitiesService {

  public _refreshNeeded$ = new Subject<void>();
  
  getRefreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor( private http:HttpClient,
    private usuarioServices: UsuarioService) { }



getEstracurricularActivities() {
  return this.http.get(`${base_url}/extracurricular_activities`, this.usuarioServices.headersSchool);
}

getEstracurricularActivityByReportId(id: string) {
  return this.http.get(`${base_url}/extracurricular_activities/${id}`, this.usuarioServices.headersSchool);
}

createEstracurricularActivity(estracurricularActivity: any) {
  return this.http.post(`${base_url}/extracurricular_activities`, estracurricularActivity, this.usuarioServices.headersSchool)
  .pipe(
    tap(() => {
      this._refreshNeeded$.next();
    }
  ));
}

deleteEstracurricularActivity(id: string) {
  return this.http.delete(`${base_url}/extracurricular_activities/${id}`, this.usuarioServices.headersSchool)
  
}



}
