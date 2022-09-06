import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Subject, tap } from 'rxjs';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class TeacherAttendanceService {

  private _refreshrequired = new Subject<void>();
  get Refreshrequired() {
    return this._refreshrequired;
  }

  constructor(private http: HttpClient,
    private usuarioServices: UsuarioService) { }


getTeacherAttendanceByReportId(reportId: number) {
  return this.http.get<any>(`${base_url}/teacher_attendance_by_report_id/${reportId}`, this.usuarioServices.headersSchool) 
}

deleteTeacherAttendance(id: number) {
  return this.http.delete<any>(`${base_url}/teacher_attendance/${id}`, this.usuarioServices.headersSchool)
}

createTeacherAttendance(teacherAttendance: any) {
  return this.http.post<any>(`${base_url}/teacher_attendance`, teacherAttendance, this.usuarioServices.headersSchool)
  .pipe(
    tap(() => {
      this._refreshrequired.next();
    })
  );
}

}
