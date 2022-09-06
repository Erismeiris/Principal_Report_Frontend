import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ATableLearnerAttendanceComponent } from './a-table-learner-attendance/a-table-learner-attendance.component';
import { BTableTeacherAttendanceComponent } from './b-table-teacher-attendance/b-table-teacher-attendance.component';
import { CTableCurriculumCovarageComponent } from './c-table-curriculum-covarage/c-table-curriculum-covarage.component';
import { DTableAssessmentTaskComponent } from './d-table-assessment-task/d-table-assessment-task.component';
import { ETableSupportLearnersComponent } from './e-table-support-learners/e-table-support-learners.component';
import { GTableCurriculumRecordComponent } from './g-table-curriculum-record/g-table-curriculum-record.component';
import { HTableInterventionStrategiesComponent } from './h-table-intervention-strategies/h-table-intervention-strategies.component';
import { ITableExtracurriculumActivitiesComponent } from './i-table-extracurriculum-activities/i-table-extracurriculum-activities.component';
import { JTableActivitiesMonthComponent } from './j-table-activities-month/j-table-activities-month.component';
import { KTableMeetingsComponent } from './k-table-meetings/k-table-meetings.component';
import { LTableWorkshopsComponent } from './l-table-workshops/l-table-workshops.component';
import { MTableAppointmentComponent } from './m-table-appointment/m-table-appointment.component';
import { NTableNewAppointmentComponent } from './n-table-new-appointment/n-table-new-appointment.component';
import { OTableAppointedTeachersComponent } from './o-table-appointed-teachers/o-table-appointed-teachers.component';
import { PTableResolutionComponent } from './p-table-resolution/p-table-resolution.component';
import { QGeneralComponent } from './q-general/q-general.component';
import { PrincipalGuard } from '../guard/user.guard';
import { AddSchoolsComponent } from './add-schools/add-schools.component';
import { AdminGuard } from '../guard/admin.guard';
import { AddSchoolsFormComponent } from './add-schools-form/add-schools-form.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';
import { ReportTableComponent } from './report-table/report-table.component';


const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'learner-attendance', canActivate: [PrincipalGuard], component: ATableLearnerAttendanceComponent },
      { path: 'teacher-attendance', canActivate: [PrincipalGuard], component: BTableTeacherAttendanceComponent },
      { path: 'curriculum-coverage', canActivate: [PrincipalGuard], component: CTableCurriculumCovarageComponent },
      { path: 'assessment-task', canActivate: [PrincipalGuard], component: DTableAssessmentTaskComponent },
      { path: 'support-learners', canActivate: [PrincipalGuard], component: ETableSupportLearnersComponent },
      { path: 'curriculum-record', canActivate: [PrincipalGuard], component: GTableCurriculumRecordComponent },
      { path: 'intervention-strategies', canActivate: [PrincipalGuard], component: HTableInterventionStrategiesComponent },
      { path: 'extracurriculum-activities', canActivate: [PrincipalGuard], component: ITableExtracurriculumActivitiesComponent },
      { path: 'activities-month', canActivate: [PrincipalGuard], component: JTableActivitiesMonthComponent },
      { path: 'meetings', canActivate: [PrincipalGuard], component: KTableMeetingsComponent },
      { path: 'workshops', canActivate: [PrincipalGuard], component: LTableWorkshopsComponent },
      { path: 'appointment', canActivate: [PrincipalGuard], component: MTableAppointmentComponent },
      { path: 'new-appointment', canActivate: [PrincipalGuard], component: NTableNewAppointmentComponent },
      { path: 'appointed-teachers', canActivate: [PrincipalGuard], component: OTableAppointedTeachersComponent },
      { path: 'resolutions', canActivate: [PrincipalGuard], component: PTableResolutionComponent },
      { path: 'report', canActivate: [PrincipalGuard], component: ReportTableComponent },
      { path: 'general', canActivate: [PrincipalGuard], component: QGeneralComponent },
      {path: 'add-school', canActivate: [AdminGuard], component: AddSchoolsFormComponent},
      {path: 'edit-school/:id', canActivate: [AdminGuard], component: EditSchoolComponent},
      {path: 'school-list', canActivate: [AdminGuard], component: AddSchoolsComponent},
    ]
  }
]


@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
