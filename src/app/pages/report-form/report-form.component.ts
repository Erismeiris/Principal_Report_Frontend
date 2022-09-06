import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { School } from 'src/app/models/schoolModels';
import { ReportService } from 'src/app/services/report.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  public school: School;

  
  
  
  public createReportForm;

  constructor(private fb: FormBuilder,
    private router: Router,
    private reportService: ReportService,
    private usuarioService: UsuarioService,
    private datePipe: DatePipe) {

    this.school = this.usuarioService.school

    this.createReportForm = this.fb.group({
      report_month: [Date, Validators.required],
      school_id: [(this.school.id_school || ''), Validators.required],
      report_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {



  }


  createReport() {
  const lala = this.createReportForm.get(['report_month'])?.value;
  const nameOfReport = this.datePipe.transform(lala, 'MMMM-yyyy');
  const { report_month, school_id, report_name} = this.createReportForm.value;
   const report = {report_month, report_name:nameOfReport, school_id }
   

    this.reportService.createReport(report).subscribe(resp => {
      if (resp) {
        Swal.fire({
          title: 'Report created',
          text: 'The report has been created',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigateByUrl('/dashboard/report');
          
        })
       

      }else{
        Swal.fire({
          title: 'Error',
          text: 'The report has not been created',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {       
          this.router.navigateByUrl('/dashboard/report');
        })
      }
      
    }) 
  }




}
function getDate(reportName: DateConstructor | null | undefined) {
  throw new Error('Function not implemented.');
}

