import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ReportService } from '../../services/report.service';
import { InterventionStrategiesService } from 'src/app/services/intervention-strategies.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'h-intervention-strategies',
  templateUrl: './h-intervention-strategies.component.html',
  styleUrls: ['./h-intervention-strategies.component.css']
})
export class HInterventionStrategiesComponent implements OnInit {

  public grades = ['Grade R', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  
  public interventionStrategies: any[] = [];
  public school!: any;
  public report!: any;

  public strategyForm = this.fb.group({
    grade:[''],
    name_teacher:[''],
    subject_underperforming:[''],
    intervention_strategies:[''],
    progress_in_month:[''],
  })


  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private reportServices: ReportService,
    private interventionStrategiesService: InterventionStrategiesService
    ) { 
    this.school = this.usuarioService.school;
  }

  ngOnInit(): void {
    this.getReportBySchoolId();
    
  }

  getReportBySchoolId() {
    const id = this.usuarioService.school.id_school;
    this.reportServices.getReportBySchoolId(id)
      .subscribe((resp: any) => {
        this.report = resp[0];
        
      });
  }

  createInterventionStrategy() {
    const { grade, name_teacher, subject_underperforming, intervention_strategies, progress_in_month } = this.strategyForm.value;
    const strategy = {grade, name_teacher, subject_underperforming, intervention_strategies, progress_in_month,
      report_id: this.report.id_report
    }

    this.interventionStrategiesService.createStrategy(strategy)
    .subscribe((resp: any) => {
      this.strategyForm.reset();
    });
    
  }

}
