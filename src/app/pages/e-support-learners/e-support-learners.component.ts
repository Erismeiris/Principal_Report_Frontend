import { Component, OnInit } from '@angular/core';
import { SupportLearnerService } from 'src/app/services/support-learner.service';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'e-support-learners',
  templateUrl: './e-support-learners.component.html',
  styleUrls: ['./e-support-learners.component.css']
})
export class ESupportLearnersComponent implements OnInit {

  public grades = ['Grade R', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  public school!:any;
  public report!:any;


  public supportLearnerForm: FormGroup = this.fb.group({
    no_learners_special_education: [0, Validators.required],
    grade_remedial: ['', Validators.required],
    number_remedial: [0, Validators.required],
    grade_integrated: ['', Validators.required],
    number_integrated: [0, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private reportservices: ReportService,
    private supportLearnerServices: SupportLearnerService) { 
      this.school = this.usuarioService.school;
    }

  ngOnInit(): void {
    this.getReportBySchool();

  }

  getReportBySchool() {
    this.reportservices.getReportBySchoolId(this.school.id_school).subscribe((resp:any) => {
      this.report = resp[0];

    });
  }

  createSupportLearner() {
    const { no_learners_special_education, grade_remedial, number_remedial, grade_integrated, number_integrated } = this.supportLearnerForm.value;
    const supportLearner = {
      report_id: this.report.id_report,
      no_learners_special_education,
      grade_remedial,
      number_remedial,
      grade_integrated,
      number_integrated,
    };
    this.supportLearnerServices.createSupportLearner(supportLearner).subscribe((resp: any) => {
      this.supportLearnerForm.reset();
      
    });
  }



}
