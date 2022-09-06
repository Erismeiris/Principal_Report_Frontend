import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ALearnerAttendaceComponent } from './a-learner-attendace/a-learner-attendace.component';
import { ATableLearnerAttendanceComponent } from './a-table-learner-attendance/a-table-learner-attendance.component';
import { BTeacherAttendanceComponent } from './b-teacher-attendance/b-teacher-attendance.component';
import { BTableTeacherAttendanceComponent } from './b-table-teacher-attendance/b-table-teacher-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CCurriculumCovarageComponent } from './c-curriculum-covarage/c-curriculum-covarage.component';
import { CTableCurriculumCovarageComponent } from './c-table-curriculum-covarage/c-table-curriculum-covarage.component';
import { DAssessmentTaskComponent } from './d-assessment-task/d-assessment-task.component';
import { DTableAssessmentTaskComponent } from './d-table-assessment-task/d-table-assessment-task.component';
import { ESupportLearnersComponent } from './e-support-learners/e-support-learners.component';
import { ETableSupportLearnersComponent } from './e-table-support-learners/e-table-support-learners.component';
import { FSupporLearnersComponent } from './f-suppor-learners/f-suppor-learners.component';
import { GCurriculumRecordComponent } from './g-curriculum-record/g-curriculum-record.component';
import { GTableCurriculumRecordComponent } from './g-table-curriculum-record/g-table-curriculum-record.component';
import { HTableInterventionStrategiesComponent } from './h-table-intervention-strategies/h-table-intervention-strategies.component';
import { HInterventionStrategiesComponent } from './h-intervention-strategies/h-intervention-strategies.component';
import { IExtracurriculumActivitiesComponent } from './i-extracurriculum-activities/i-extracurriculum-activities.component';
import { ITableExtracurriculumActivitiesComponent } from './i-table-extracurriculum-activities/i-table-extracurriculum-activities.component';
import { JTableActivitiesMonthComponent } from './j-table-activities-month/j-table-activities-month.component';
import { JActivitiesMonthComponent } from './j-activities-month/j-activities-month.component';
import { KMeetingsComponent } from './k-meetings/k-meetings.component';
import { KTableMeetingsComponent } from './k-table-meetings/k-table-meetings.component';
import { LTableWorkshopsComponent } from './l-table-workshops/l-table-workshops.component';
import { LWorkshopsComponent } from './l-workshops/l-workshops.component';
import { MAppointmentComponent } from './m-appointment/m-appointment.component';
import { MTableAppointmentComponent } from './m-table-appointment/m-table-appointment.component';
import { NTableNewAppointmentComponent } from './n-table-new-appointment/n-table-new-appointment.component';
import { NNewAppointmentComponent } from './n-new-appointment/n-new-appointment.component';
import { OAppointedTeachersComponent } from './o-appointed-teachers/o-appointed-teachers.component';
import { OTableAppointedTeachersComponent } from './o-table-appointed-teachers/o-table-appointed-teachers.component';
import { PTableResolutionComponent } from './p-table-resolution/p-table-resolution.component';
import { PResolutionComponent } from './p-resolution/p-resolution.component';
import { QGeneralComponent } from './q-general/q-general.component';
import { HttpClientModule } from '@angular/common/http';
import { AddSchoolsComponent } from './add-schools/add-schools.component';
import { AddSchoolsFormComponent } from './add-schools-form/add-schools-form.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportTableComponent } from './report-table/report-table.component';





@NgModule({
  declarations: [
    DashboardComponent,
   
    PagesComponent,
        ALearnerAttendaceComponent,
        ATableLearnerAttendanceComponent,
        BTeacherAttendanceComponent,
        BTableTeacherAttendanceComponent,
        CCurriculumCovarageComponent,
        CTableCurriculumCovarageComponent,
        DAssessmentTaskComponent,
        DTableAssessmentTaskComponent,
        ESupportLearnersComponent,
        ETableSupportLearnersComponent,
        FSupporLearnersComponent,
        GCurriculumRecordComponent,
        GTableCurriculumRecordComponent,
        HTableInterventionStrategiesComponent,
        HInterventionStrategiesComponent,
        IExtracurriculumActivitiesComponent,
        ITableExtracurriculumActivitiesComponent,
        JTableActivitiesMonthComponent,
        JActivitiesMonthComponent,
        KMeetingsComponent,
        KTableMeetingsComponent,
        LTableWorkshopsComponent,
        LWorkshopsComponent,
        MAppointmentComponent,
        MTableAppointmentComponent,
        NTableNewAppointmentComponent,
        NNewAppointmentComponent,
        OAppointedTeachersComponent,
        OTableAppointedTeachersComponent,
        PTableResolutionComponent,
        PResolutionComponent,
        QGeneralComponent,
        AddSchoolsComponent,
        AddSchoolsFormComponent,
        EditSchoolComponent,
        ReportFormComponent,
        ReportTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
      
    NgMultiSelectDropDownModule.forRoot()
    
   
    
  ],
  exports: [
    DashboardComponent,
   
   
  ],
  providers: [
     DatePipe,
  ]
})
export class PagesModule { }
