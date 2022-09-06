import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Subject, tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LearnerAttendanceService {

  private _refreshrequired = new Subject<void>();
  get Refreshrequired() {
    return this._refreshrequired;
  }

  constructor( private http: HttpClient,
    private usuarioServices: UsuarioService) { }

  getLearnerAttendance(id:number) {
    return this.http.get(`${base_url}/learner_attendance/report/${id}`, this.usuarioServices.headersSchool);
  }
  

  deleteLearnerAttendance(id:number) {
    return this.http.delete(`${base_url}/learner_attendance/${id}`, this.usuarioServices.headersSchool);
  }

  createLearnerAttendance(learnerAttendance:any) {
    return this.http.post(`${base_url}/learner_attendance`, learnerAttendance, this.usuarioServices.headersSchool)
    .pipe(
      tap(() => {
        this._refreshrequired.next();
      })
      );
  }

}
