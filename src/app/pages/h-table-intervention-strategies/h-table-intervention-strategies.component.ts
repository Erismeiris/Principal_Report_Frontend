import { Component, OnInit } from '@angular/core';
import { InterventionStrategiesService } from 'src/app/services/intervention-strategies.service';
import { ReportService } from 'src/app/services/report.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-h-table-intervention-strategies',
  templateUrl: './h-table-intervention-strategies.component.html',
  styleUrls: ['./h-table-intervention-strategies.component.css']
})
export class HTableInterventionStrategiesComponent implements OnInit {
  public grades = ['Grade R', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  
  public interventionStrategies: any[] = [];
  public school!: any;
  public report!: any;
  constructor(
    private usuarioService: UsuarioService,
    private reportServices: ReportService,
    private interventionStrategiesService: InterventionStrategiesService
  
  ) { }

  ngOnInit(): void {
    this.getReportBySchoolId();
    this.interventionStrategiesService.refreshNeeded$.subscribe(() => {
      this.getReportBySchoolId();
    });
  }

  getReportBySchoolId() {
    const id = this.usuarioService.school.id_school;
    this.reportServices.getReportBySchoolId(id)
      .subscribe((resp: any) => {
        this.report = resp[0];
        this.getInterventionStrategiesByReportId();
      });
  }

  getInterventionStrategiesByReportId() {
    const id = this.report.id_report;
    this.interventionStrategiesService.getStrategyByReportId(id)
      .subscribe((resp: any) => {
        this.interventionStrategies = resp.result;
      });
  }
  deleteIntervebtionStrategy(id: any) {
    this.interventionStrategiesService.deleteStrategy(id)
      .subscribe((resp: any) => {
        this.getReportBySchoolId();
      });
  }

}
