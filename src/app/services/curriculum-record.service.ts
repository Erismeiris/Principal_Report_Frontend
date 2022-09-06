import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { ReportService } from './report.service';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';
import { Report } from '../models/schoolModels';

const base_url = environment.base_url


@Injectable({
  providedIn: 'root'
})
export class CurriculumRecordService {

  public _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  constructor( 
    private http: HttpClient,
    private usuarioServices: UsuarioService    
    ) {    }




getCurriculumRecordByReportId(id_report:number){
return this.http.get(`${base_url}/curriculum_recordByReportId/${id_report}`, this.usuarioServices.headersSchool)
}

createCurriculumRecord(curriculumRecord:any){
  return this.http.post(`${base_url}/curriculum_record`, curriculumRecord, this.usuarioServices.headersSchool)
  .pipe(
    tap(() => {
      this._refreshNeeded$.next();
    }))
}

deleteCurrilumRecord(id_curriculum_record:number){
  return this.http.delete(`${base_url}/curriculum_record/${id_curriculum_record}`, this.usuarioServices.headersSchool)
}



}
