import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { SupportLearnerService } from 'src/app/services/support-learner.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'f-support-learners',
  templateUrl: './f-suppor-learners.component.html',
  styleUrls: ['./f-suppor-learners.component.css']
})
export class FSupporLearnersComponent implements OnInit {

  public school!: any;
  public report!: any;
  
public createSuportGivenToLearnerForm = this.fb.group({
  report_id:0,
  orphaned:0,
  households:0,
  teenage_pregnancy:0,
  receiving_support_at_school:0,
  referred_to_DBST:0,
  cases_successfully_closed:0,
  living_with_disabilities:0,

})
  constructor( 
    private fb:FormBuilder,
    private usuarioServices: UsuarioService,
    private supportLearners: SupportLearnerService,
    private reportServices: ReportService

    ) {
      this.school = this.usuarioServices.school;
      
     }

  ngOnInit(): void {
    this.getReportBySchoolId();
  }

  getReportBySchoolId(){
    this.reportServices.getReportBySchoolId(this.school.id_school).subscribe(resp => {
      this.report = resp[0];
    })
  }

 
createSupportGivenToLearner(){
  const {orphaned, households, teenage_pregnancy, receiving_support_at_school, referred_to_DBST, cases_successfully_closed, living_with_disabilities} = this.createSuportGivenToLearnerForm.value;
  const data = {
    report_id: this.report.id_report,
    orphaned,
    households,
    teenage_pregnancy,
    receiving_support_at_school,
    referred_to_DBST,
    cases_successfully_closed,
    living_with_disabilities,
  }
  this.supportLearners.createSupportGivenToLearner(data).subscribe(resp => {
    this.createSuportGivenToLearnerForm.reset();
  })
}
  
  
  

  
}
