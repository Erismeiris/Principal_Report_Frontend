import { Component, OnInit } from '@angular/core';
import { CurriculumRecordService } from 'src/app/services/curriculum-record.service';
import { ReportService } from 'src/app/services/report.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gtbale-curriculum-record',
  templateUrl: './g-table-curriculum-record.component.html',
  styleUrls: ['./g-table-curriculum-record.component.css']
})
export class GTableCurriculumRecordComponent implements OnInit {

  public school!:any;
  public report!:any;
  public curriculumRecord!:any;

  constructor(
    private usuarioServices: UsuarioService,
    private reportServices: ReportService,
    private curriculumRecordServices: CurriculumRecordService
    ) { 
      this.school = this.usuarioServices.school;
      
      
    }
  

  ngOnInit(): void {
    this.getReportBySchoolId();
    this.curriculumRecordServices.refreshNeeded$.subscribe(()=>{
      this.getReportBySchoolId();
    })
  }

  getReportBySchoolId(){
    this.reportServices.getReportBySchoolId(this.school.id_school)
    .subscribe((resp:any)=>{
      this.report = resp[0];
      this.getCurriculumRecordByReportId();
    })
  }

  getCurriculumRecordByReportId(){
    const id = this.report.id_report;
    this.curriculumRecordServices.getCurriculumRecordByReportId(id)
    .subscribe((resp:any)=>{
      this.curriculumRecord = resp;
    })
  }

  deleteCurrilumRecord(id_curriculum_record:number){
    this.curriculumRecordServices.deleteCurrilumRecord(id_curriculum_record)
    .subscribe((resp:any)=>{
      this.getCurriculumRecordByReportId();
    })
  }

}
