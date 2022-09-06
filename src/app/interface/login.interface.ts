


export interface LoginAdmin {
    email: string;
    password: string;
    remember: boolean | null;
}

export interface User{
    email: string;
    password: string;
    rol: string;
    user_name: string;
}

export interface School {
    id_school: number;
    school_name: string;
    principal_name: string;
    grades: string;
    password: string;
    id_district: number;
}


export interface District {
    id_district: number;
    district_name: string;
    privince: string;

}

export interface SchoolForm {
    id_school: number;
    school_name: string;
    principal_name: string;
    grades: string;
    password: string;
    id_district: number;
}


export interface LoginSchool{
    school_name: string;
    password: string;
}

export interface Report{
    id_report: number;
    school_id: number;
    report_name: string;
    report_month: Date

}


export interface LearnerAttendance{
    id_learner_attendance: number;
    report_id: number;
    grade: string;
    roll:number;
    actuall_attendance: number;
    percentage_attendance: number;
}

export interface TeacherAttendace{
id_teacher_attendance: number;
report_id:number;
teacher_name:string;
days_absent:number;
type_leave:string;
date_leave_submitted:Date;
submitted:string;
actions:string;
}


export interface CurriculumCoverage{
    id_curriculum_coverage: number;
    report_id: number;
    grade: string;
    subjects_behind_per_grade: string;
    names_subject_teachers: string;
    catchup_programme: string;
    progress_monitoring: string;
}
