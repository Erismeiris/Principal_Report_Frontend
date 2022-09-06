import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { UsuarioService } from '../../services/usuario.service';
import { Report, TeacherAttendace, School } from '../../interface/login.interface';
import { TeacherAttendanceService } from 'src/app/services/teacher-attendance.service';

@Component({
  selector: 'app-b-table-teacher-attendance',
  templateUrl: './b-table-teacher-attendance.component.html',
  styleUrls: ['./b-table-teacher-attendance.component.css']
})
export class BTableTeacherAttendanceComponent implements OnInit {

public report!: Report
public teacherAttendance: any
public school!: any

  constructor( private reportServices: ReportService,
    private usuarioServices: UsuarioService,
    private teacherServices: TeacherAttendanceService) { 
      this.school = this.usuarioServices.school
    }

  ngOnInit(): void {
    this.getReport()
    this.teacherServices.Refreshrequired.subscribe(() => {
     this.getReport()
    })
    
   
  }

  getReport(){
    this.reportServices.getReportBySchoolId(this.school.id_school)
    .subscribe((resp: any) => { 
      this.report = resp[0]
      this.getTeacherAttendance()
    })
  }

  getTeacherAttendance(){
   const id = this.report.id_report
    this.teacherServices.getTeacherAttendanceByReportId(id).subscribe((resp) => {
     this.teacherAttendance = resp
     

     
    })
  }

  deleteTeacherAttendance(id: number){
    this.teacherServices.deleteTeacherAttendance(id).subscribe((resp) => {
      this.getTeacherAttendance()
    })
  }



}
