import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../models/schoolModels';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public school:any;
  public report:any

  private _refreshrequired = new Subject<void>();
  get Refreshrequired() {
    return this._refreshrequired;
  }

  constructor( private http: HttpClient,
    private usuarioService: UsuarioService) { 
      this.school = this.usuarioService.school
    }



createReport(report: any) {
     return this.http.post(`${base_url}/report`, report,this.usuarioService.headersSchool )
     .pipe(
      tap(() => {
        this._refreshrequired.next();
      })
      );
    };
getReportBySchoolId(id_school:number) {
  const id = this.school.id_school
  return this.http.get(`${base_url}/reportBySchoolId/${id}`,this.usuarioService.headersSchool)
  .pipe(
    tap((rep:any) => {
      this.report = rep[0]
    }
    )
  );
}
deleteReport(report: Report) {
  return this.http.delete(`${base_url}/report/${report.id_report}`,this.usuarioService.headersSchool)
}

  
}
