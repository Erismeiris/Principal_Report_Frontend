import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { TeacherAttendanceService } from 'src/app/services/teacher-attendance.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { School } from '../../interface/login.interface';

@Component({
  selector: 'app-b-teacher-attendance',
  templateUrl: './b-teacher-attendance.component.html',
  styleUrls: ['./b-teacher-attendance.component.css']
})
export class BTeacherAttendanceComponent implements OnInit {

  teacher = {
    absent: 'Yes'
  }

  action:string ='What type of action was taken against the teacher who has not submitted catch up programme'

  public school!:any
  public report!: any

public teacherForm: FormGroup = this.fb.group({
teacher_name:[''],
days_absent:[0],
type_leave:[''],
date_leave_submitted:[''],
submittedBoolean:[''],
submittedAnswer:[''],
actions:['']
})


  constructor(private fb:FormBuilder, 
    private reportService:ReportService,
    private usuarioServices: UsuarioService,
    private teacherAttendanceService: TeacherAttendanceService) {
    
      this.school = this.usuarioServices.school

   }

  ngOnInit(): void {
    this.reportService.getReportBySchoolId(this.school.id_school)
    .subscribe((resp: any) => { 
      this.report = resp[0]
    })
  }

  createTeacher(){
    const {actions,teacher_name,days_absent,type_leave,date_leave_submitted,submittedBoolean,submittedAnswer} = this.teacherForm.value;
    const newTeacher = {
      report_id: this.report.id_report,
      actions,
      teacher_name,
      days_absent,
      type_leave,
      date_leave_submitted,
      submitted: submittedBoolean+', ' + submittedAnswer
    }
    this.teacherAttendanceService.createTeacherAttendance(newTeacher).subscribe((resp) => {
      this.teacherForm.reset()
      
    })
  }

}
