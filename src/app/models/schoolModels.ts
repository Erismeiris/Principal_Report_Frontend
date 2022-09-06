


export class SchoolModel{
    constructor(
        public id_school:number,
        public school_name: string,
        public principal_name: string,
        public grades: string[],
    ){
       
    }
}


export class User{
    constructor(
        public id: number,
        public user_name: string,
        public email: string,
        public rol: string,
    ){

    }
}

export class School{
    constructor(
        public id_school: number,
        public school_name: string,
        public principal_name: string,
        public grades: string[],
        public password: string,
        public id_district: number,
    ){

    }
}

export class Report{
    constructor(
        public id_report: number,
        public report_name: string,
        public report_month: Date | string,
        public school_id: string,
    ){

    }
}