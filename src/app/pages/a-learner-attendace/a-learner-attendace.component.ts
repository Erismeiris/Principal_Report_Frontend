import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LearnerAttendanceService } from '../../services/learner-attendance.service';
import { School } from '../../models/schoolModels';
import { Report } from '../../interface/login.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-a-learner-attendace',
  templateUrl: './a-learner-attendace.component.html',
  styleUrls: ['./a-learner-attendace.component.css']
})
export class ALearnerAttendaceComponent implements OnInit {

  public school!:School
  public reports!:Report;
  public learnerAttendance: any;
  public grade!: any

  public learnerForm: FormGroup = this.fb.group({
    report_id: [0, Validators.required],
    grade: ['', Validators.required],
    roll: [null, Validators.required],
    actuall_attendance: ['', Validators.required],
    percentage_attendance: ['', Validators.required],
  })

  public grades = [
    { name: 'Grade R', value: 'Grade R' },
    { name: 'Grade 1', value: 'Grade 1' },
    { name: 'Grade 2', value: 'Grade 2' },
    { name: 'Grade 3', value: 'Grade 3' },
    { name: 'Grade 4', value: 'Grade 4' },
    { name: 'Grade 5', value: 'Grade 5' },
    { name: 'Grade 6', value: 'Grade 6' },
    { name: 'Grade 7', value: 'Grade 7' },
    { name: 'Grade 8', value: 'Grade 8' },
    { name: 'Grade 9', value: 'Grade 9' },
    { name: 'Grade 10', value: 'Grade 10' },
    { name: 'Grade 11', value: 'Grade 11' },
    { name: 'Grade 12', value: 'Grade 12' },
  ];

   



  constructor(private fb: FormBuilder,
    private learnerAttendanceService: LearnerAttendanceService,
    private usuarioServices: UsuarioService,
    private reportServices: ReportService) {
    

  }

  ngOnInit(): void {
    this.school = this.usuarioServices.school
    this.grade = this.usuarioServices.school.grades;
    
    this.getReportByUserId();

  }
  getLearnerAttendance() {
    const id = this.reports.id_report;
    this.learnerAttendanceService.getLearnerAttendance(id).subscribe(
     ( res:any )=> {
        this.learnerAttendance = res.result;
        
      }
    )
  }

  getReportByUserId() {
    const id = this.school.id_school;
      this.reportServices.getReportBySchoolId(id).subscribe((res:any) => {
        this.reports = res[0];
              
        this.getLearnerAttendance();
      }
      );
    }

  createLearnerAttendance() {
    const { grade, roll, actuall_attendance } = this.learnerForm.value;
    const newLearnerAttendance = {
      report_id:this.reports.id_report, grade, roll, actuall_attendance,
      percentage_attendance: ((actuall_attendance / roll) * 100).toFixed(2)
    };
    

    this.learnerAttendanceService.createLearnerAttendance(newLearnerAttendance).subscribe((res) => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Attendance Created Successfully'
        })
        this.learnerForm.reset();
        
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Attendance Not Created'
        })
      }
      

    });

  }

}
