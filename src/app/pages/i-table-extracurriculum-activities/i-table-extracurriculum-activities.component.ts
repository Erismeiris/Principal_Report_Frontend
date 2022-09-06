import { Component, OnInit } from '@angular/core';
import { ExtracurricularActivitiesService } from 'src/app/services/extracurricular-activities.service';
import { UsuarioService } from '../../services/usuario.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-i-table-extracurriculum-activities',
  templateUrl: './i-table-extracurriculum-activities.component.html',
  styleUrls: ['./i-table-extracurriculum-activities.component.css']
})
export class ITableExtracurriculumActivitiesComponent implements OnInit {

  public school!:any
  public report!:any;
  public extracurricularActivities!: any[];

  constructor( 
    private extracurricularActivitiesService: ExtracurricularActivitiesService,
    private usuarioService: UsuarioService,
    private reportService: ReportService
 
  ) {
    this.school = this.usuarioService.school;
   }

  ngOnInit(): void {
    this.getReportBySchoolId();
    this.extracurricularActivitiesService._refreshNeeded$.subscribe(() => {
      this.getReportBySchoolId();
    })
  }

  getReportBySchoolId() {
    const id = this.school.id_school;
    this.reportService.getReportBySchoolId(this.school._id)
    .subscribe((resp:any) => {
      this.report = resp[0];
      this.getEstracurricularActivityByReportId();
    })
  }

  getEstracurricularActivityByReportId() {
    const id = this.report.id_report;
    this.extracurricularActivitiesService.getEstracurricularActivityByReportId(id)
    .subscribe((resp:any) => {
      this.extracurricularActivities = resp.result;
      
    })
  }

  deleteExtraActivity(id: string) {
    this.extracurricularActivitiesService.deleteEstracurricularActivity(id)
    .subscribe((resp:any) => {
      this.getEstracurricularActivityByReportId();
    })
  }

}
