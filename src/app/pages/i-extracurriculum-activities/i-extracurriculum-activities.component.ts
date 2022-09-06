import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExtracurricularActivitiesService } from 'src/app/services/extracurricular-activities.service';
import { ReportService } from 'src/app/services/report.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'i-extracurriculum-activities',
  templateUrl: './i-extracurriculum-activities.component.html',
  styleUrls: ['./i-extracurriculum-activities.component.css']
})
export class IExtracurriculumActivitiesComponent implements OnInit {

  public school!:any;
  public report!:any;


  public extracurriculumForm: FormGroup = this.fb.group({
    activity_date:new Date,
    activity:[''],
    learner_involved:0,
  })

  constructor( 
    private fb: FormBuilder,
    private extracurricularActivitiesService: ExtracurricularActivitiesService,
    private usuarioService: UsuarioService,
    private reportService: ReportService
  ) {
    this.school = this.usuarioService.school;
  }
  

  ngOnInit(): void {
    this.getReportBySchoolId();
    
  }

  getReportBySchoolId() {
    const id = this.school.id_school;
    this.reportService.getReportBySchoolId(id)
    .subscribe((resp:any) => {
      this.report = resp[0];
    })
  }

  createExtraActivity() {
    const id = this.report.id_report;
    const data = {
      ...this.extracurriculumForm.value,
      report_id: id
    }
    this.extracurricularActivitiesService.createEstracurricularActivity(data)
    .subscribe((resp:any) => {
      this.extracurriculumForm.reset();
    })
  }
}
