import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LearnerAttendanceService } from '../../services/learner-attendance.service';
import { School } from '../../models/schoolModels';
import { LearnerAttendance } from 'src/app/interface/login.interface';

@Component({
  selector: 'app-a-table-learner-attendance',
  templateUrl: './a-table-learner-attendance.component.html',
  styleUrls: ['./a-table-learner-attendance.component.css']
})
export class ATableLearnerAttendanceComponent implements OnInit {

  public learnerAttendance: LearnerAttendance[] = [];
  public school!:School;
  public reports: any;
  public TotalRollCall:number = 0;
  public TotalAttendance:number = 0;
  public PercentageAttendance:string = '0';

  constructor( private learnerAttendanceService:LearnerAttendanceService,
    private reportServices: ReportService,
    private usuarioServices: UsuarioService) { 
      this.school = this.usuarioServices.school

    }

  ngOnInit(): void {
    this.getReportByUserId();
   this.learnerAttendanceService.Refreshrequired.subscribe(respone=>{
     this.getReportByUserId();
   });
    
  }

  getLearnerAttendance() {
    const id = this.reports.id_report;
    this.learnerAttendanceService.getLearnerAttendance(id).subscribe(
     ( res:any )=> {
        this.learnerAttendance = res.result;
        this.TotalRollCall = this.learnerAttendance.map(item => item.roll).reduce((a, b) => a + b, 0);
        this.TotalAttendance = this.learnerAttendance.map(item => item.actuall_attendance).reduce((a, b) => a + b, 0);
        this.PercentageAttendance = (this.TotalAttendance / this.TotalRollCall * 100).toFixed(2);
      }
    )
  }

getReportByUserId() {
const id = this.school.id_school;
  this.reportServices.getReportBySchoolId(id).subscribe((res:any) => {
    this.reports = res[0];
   
    this.getLearnerAttendance();
  }
  );
}

  deleteLearnerAttendance(id:number) {
    this.learnerAttendanceService.deleteLearnerAttendance(id).subscribe(
      ( res:any )=> {
        this.getLearnerAttendance();
      }
    )
  }

}
