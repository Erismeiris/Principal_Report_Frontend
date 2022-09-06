import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { UsuarioService } from '../../services/usuario.service';
import { CurriculumCoverageService } from '../../services/curriculum-coverage.service';
import { CurriculumCoverage } from 'src/app/interface/login.interface';

@Component({
  selector: 'app-c-table-curriculum-covarage',
  templateUrl: './c-table-curriculum-covarage.component.html',
  styleUrls: ['./c-table-curriculum-covarage.component.css']
})
export class CTableCurriculumCovarageComponent implements OnInit {


  public school!:any
  public report!:any
  public curriculumCoverage!:any;

  constructor( private usuarioServices: UsuarioService,
              private reportService: ReportService,
              private curriculumCoverageService: CurriculumCoverageService
    ) { 
      this.school = this.usuarioServices.school
    }

  ngOnInit(): void {
    this.getReportBySchoolId()
    this.curriculumCoverageService.refreshrequired.subscribe(()=>{
      this.getReportBySchoolId()
    }
    )
  }

  getReportBySchoolId() {
    const id = this.school.id_school
    this.reportService.getReportBySchoolId(id)
    .subscribe((res:any) => {
      this.report = res[0]
      this.getCurriculumCoverageByReportId()
    } )
  }

  getCurriculumCoverageByReportId() {
    const id = this.report.id_report
    this.curriculumCoverageService.getCurriculumCoverageByReportId(id)
    .subscribe((res:any) => {
      this.curriculumCoverage = res
      
    } )
  }

  deleteCurriculumCoverage(id:number) {
    this.curriculumCoverageService.deleteCurriculumCoverage(id)
    .subscribe(res=>{
      this.getReportBySchoolId()
    } )
  }

}
