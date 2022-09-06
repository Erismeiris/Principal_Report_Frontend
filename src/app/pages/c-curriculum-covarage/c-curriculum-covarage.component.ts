import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CurriculumCoverageService } from '../../services/curriculum-coverage.service';

@Component({
  selector: 'c-curriculum-covarage',
  templateUrl: './c-curriculum-covarage.component.html',
  styleUrls: ['./c-curriculum-covarage.component.css']
})
export class CCurriculumCovarageComponent implements OnInit {

  public school!: any;
  public report!:any;


  public grades = ['Grade R', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

    public CurriculumForm: FormGroup = this.fb.group({
  report_id:[0, Validators.required],
  grade:['', Validators.required],
  subjects_behind_per_grade:['', Validators.required],
  names_subject_teachers:['', Validators.required],
  catchup_programme:['',  Validators.required],
  progress_monitoring:['', Validators.required],
    });

  constructor( private fb:FormBuilder,
    private usuarioServices: UsuarioService,
    private reportServices: ReportService,
    private curriculumServices: CurriculumCoverageService) { 
      this.school = this.usuarioServices.school;

    }

  ngOnInit(): void {
    this.getReportBySchoolId();
  }

  getReportBySchoolId(){
    const id = this.school.id_school;
    this.reportServices.getReportBySchoolId(id).subscribe((res:any)=>{
      this.report = res[0];
            })
  }


  createCurriculum(){
    const {report_id, grade, subjects_behind_per_grade, names_subject_teachers, catchup_programme, progress_monitoring} = this.CurriculumForm.value;
    const curriculum = {report_id: this.report.id_report, grade, subjects_behind_per_grade, names_subject_teachers, catchup_programme, progress_monitoring};
   
    this.curriculumServices.createCurriculumCoverage(curriculum).subscribe(res=>{
      this.CurriculumForm.reset();
      
    } )

  }

}
