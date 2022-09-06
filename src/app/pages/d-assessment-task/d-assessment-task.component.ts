import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { SBAService } from 'src/app/services/sba.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'd-assessment-task',
  templateUrl: './d-assessment-task.component.html',
  styleUrls: ['./d-assessment-task.component.css']
})
export class DAssessmentTaskComponent implements OnInit {

  public report!:any
  public school!:any
  public grades = ['Grade R',"Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];

  terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

  public sbaForms: FormGroup = this.fb.group({
    grade: ['', Validators.required],
    term: ['', Validators.required],
    task: ['',Validators.required],
  });


  constructor( private fb: FormBuilder, 
    private reportServices: ReportService,
    private sbaServices: SBAService,
    private usuariosServices: UsuarioService) { 
    
  }
    
  

  ngOnInit(): void {
    this.school = this.usuariosServices.school
    this.getReportBySchoolId()
    
  }

  getReportBySchoolId(){
    const id = this.school.id_school
    this.reportServices.getReportBySchoolId(id).subscribe(resp => {
      this.report = resp[0]
    })
  }

  createSba(){
    const {grade, term, task} = this.sbaForms.value;
    const sba = { report_id: this.report.id_report,term, grade,  task};
    console.log(sba);
    this.sbaServices.createSba(sba).subscribe(resp=>{
      this.sbaForms.reset();
    })
    
  }
  

}
