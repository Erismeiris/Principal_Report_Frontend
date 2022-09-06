import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { SBAService } from 'src/app/services/sba.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-d-table-assessment-task',
  templateUrl: './d-table-assessment-task.component.html',
  styleUrls: ['./d-table-assessment-task.component.css']
})
export class DTableAssessmentTaskComponent implements OnInit {

  
  public report!:any
  public tasks:any 

  constructor( private usuariosServices: UsuarioService, 
    private reportServices: ReportService,
    private sbaServices: SBAService) { 
   
    this.report = this.reportServices.report
  }

  ngOnInit(): void {
    this.report = this.reportServices.getReportBySchoolId(this.usuariosServices.school.id_school)
    this.getSba()
    this.sbaServices.refreshNeeded$.subscribe(()=>{
      this.getSba()
    })

  }



  getSba(){
    const id = this.report.id_report
    this.sbaServices.getSbaByReportId(id).subscribe(resp => {
      this.tasks = resp
    })
  }

  deleteTask(id_sba:any){
    this.sbaServices.deleteSba(id_sba).subscribe(resp => {
      this.getSba()
    })
    
  }
 


  

}
