import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class SupportLearnerService {

  public school!:any;

public _refreshNeeded$ = new Subject<void>();
get refreshNeeded(){
  return this._refreshNeeded$;
}

  constructor( private http: HttpClient, private usuarioServices: UsuarioService) { 
    this.school = this.usuarioServices.school;
  }

getSupportLearners(){
  return this.http.get(`${base_url}/support_learners/${this.school}`, this.usuarioServices.headersSchool);
}

getSupportLearnerByReport(report_id: string){
  return this.http.get(`${base_url}/support_learners/${report_id}`, this.usuarioServices.headersSchool);
}

getSupportGivenToLearnerByReportId(report_id: string){
  return this.http.get(`${base_url}/support_given_to_learners/${report_id}`, this.usuarioServices.headersSchool);
}

deleteSupportLearner(id: string){
  return this.http.delete(`${base_url}/support_learners/${id}`, this.usuarioServices.headersSchool);
}

createSupportLearner(data: any){
  return this.http.post(`${base_url}/support_learners`, data, this.usuarioServices.headersSchool)
  .pipe(
    tap(() => {
      this._refreshNeeded$.next();
    }));
}
createSupportGivenToLearner(data: any){
  return this.http.post(`${base_url}/support_given_to_learners`, data, this.usuarioServices.headersSchool)
  .pipe(
    tap(() => {
      this._refreshNeeded$.next();
    }));
  }

  deleteSupportGivenToLearner(id: string){
    return this.http.delete(`${base_url}/support_given_to_learners/${id}`, this.usuarioServices.headersSchool);
  }

}
