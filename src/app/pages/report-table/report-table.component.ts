import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Report, School } from '../../models/schoolModels';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit {

  public reports: any;
  public school: School;

  constructor(private reportServices: ReportService,
    public router: Router,
    public usuarioService: UsuarioService) { 
      this.school = this.usuarioService.school
  }
    

  ngOnInit(): void {
    this.getReport();
    this.reportServices.Refreshrequired.subscribe(respone=>{
      this.getReport();

    }); 
    
  }

  getReport() {
    const id_school = this.usuarioService.school.id_school;
    this.reportServices.getReportBySchoolId(id_school).subscribe(res => {
      this.reports = res;

    }
    );
  }

  deleteReport(report: Report) {

    this.reportServices.deleteReport(report).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          this.getReport();
           
           
          }
        }
        )
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error'
        })
      }

    });
  }

}
