import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CurriculumRecordService } from 'src/app/services/curriculum-record.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'g-curriculum-record',
  templateUrl: './g-curriculum-record.component.html',
  styleUrls: ['./g-curriculum-record.component.css']
})
export class GCurriculumRecordComponent implements OnInit {

  public school!:any;
  public report!:any;

  public curriculumRecordForm: FormGroup = this.fb.group({
    dates_submissions:'',
    name_responsible_teacher:'',
    actual_date:'',
    challenges_experienced:'',
    verification_by_SMT:"",

  })

  constructor(private fb:FormBuilder,
    private usuarioService: UsuarioService,
    private curriculumRecordServices: CurriculumRecordService,
    private reportServices: ReportService) { 
      this.school = this.usuarioService.school;
    }

  ngOnInit(): void {
    this.getReportBySchoolId();
  }

getReportBySchoolId(){
  this.reportServices.getReportBySchoolId(this.school.id_school)
  .subscribe(resp=>{
    this.report = resp[0];
    
    
  })
}

createCurriculumRecord(){
  const {dates_submissions, name_responsible_teacher, actual_date, challenges_experienced, verification_by_SMT} = this.curriculumRecordForm.value;
  const curriculumRecord = {
  dates_submissions,
  name_responsible_teacher,
  actual_date,
  challenges_experienced,
  verification_by_SMT,
  report_id:this.report.id_report
}
  this.curriculumRecordServices.createCurriculumRecord(curriculumRecord)
  .subscribe(resp=>{
    this.curriculumRecordForm.reset();
  })
}


}
