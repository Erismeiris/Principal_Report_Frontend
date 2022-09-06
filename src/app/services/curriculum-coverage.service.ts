import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Subject, tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CurriculumCoverageService {

  private _refreshrequired = new Subject<void>();

  get refreshrequired() {
    return this._refreshrequired;
  }


  constructor( private http: HttpClient, private usuarioService: UsuarioService) { }




  getCurriculumCoverage() {
    return this.http.get(`${base_url}/curriculum_coverage`, this.usuarioService.headersSchool);
  }

  getCurriculumCoverageByReportId(id:number) {
    return this.http.get(`${base_url}/curriculum_coverageByReportId/${id}`, this.usuarioService.headersSchool);
  }

  createCurriculumCoverage(curriculumCoverage:any) {
    return this.http.post(`${base_url}/curriculum_coverage`, curriculumCoverage, this.usuarioService.headersSchool)
    .pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
  }

  deleteCurriculumCoverage(id:number) {
    return this.http.delete(`${base_url}/curriculum_coverage/${id}`, this.usuarioService.headersSchool);
  }



}
