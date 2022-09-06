import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { SupportLearnerService } from 'src/app/services/support-learner.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'table-support-learners',
  templateUrl: './e-table-support-learners.component.html',
  styleUrls: ['./e-table-support-learners.component.css']
})
export class ETableSupportLearnersComponent implements OnInit {

  public report!:any
  public school!:any;
  public supportLearners!:any;
  public supportGivenTolearner!:any;


  public show1: boolean = false;
  public show2: boolean = false;

  constructor( private reportServices: ReportService,
    private usuarioServices: UsuarioService,
    private supportLearnerServices: SupportLearnerService) {
this.school = this.usuarioServices.school;
     }

  ngOnInit(): void {
    this.getReportBySchoolId();
    this.supportLearnerServices._refreshNeeded$.subscribe(() => {
      this.getReportBySchoolId();
    })
    

    
  }


  showIf(){
    if(this.show1 === false){
      this.show1 = true    
    }else{
      this.show1 = false
    }
  }

  showIf2(){
    if(this.show2 === false){
      this.show1 = false;
      this.show2 = true
    }else{
      this.show2 = false
    }
  }

  getReportBySchoolId(){
    this.reportServices.getReportBySchoolId(this.school.id_school)
    .subscribe((resp:any) => {
      this.report = resp[0];
      this.getSupportLearnersByReport();
      
      
    })}

  getSupportLearnersByReport(){
    const id = this.report.id_report;
    this.supportLearnerServices.getSupportLearnerByReport(id).subscribe((resp: any) => {
      this.supportLearners = resp;
      this.getSupportGivenToLearnerByReportId();      
    })
  }
  
  deleteSupportLearners(id: any){
    this.supportLearnerServices.deleteSupportLearner(id).subscribe((resp: any) => {
      this.getSupportLearnersByReport();
    })
  }

  deleteSupportGivenToLearner(id: any){
    this.supportLearnerServices.deleteSupportGivenToLearner(id).subscribe((resp: any) => {
      this.getSupportLearnersByReport();
    })
  }

  getSupportGivenToLearnerByReportId(){
    const id = this.report.id_report;
    this.supportLearnerServices.getSupportGivenToLearnerByReportId(id)
    .subscribe((resp:any) => {
      this.supportGivenTolearner = resp;
    })
  }

}
