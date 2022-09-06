import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'j-activities-month',
  templateUrl: './j-activities-month.component.html',
  styleUrls: ['./j-activities-month.component.css']
})
export class JActivitiesMonthComponent implements OnInit {

  
  activitiesKind = ['', 'Finance_Committee', 'Human_Resource_functions' ]
 

  activity:string = ''

  financeCommittee = [ 
    'Assets spot check Quarterly on SA-SAMS',
    'Compliance certificate and Monthly income expenditure quarterly',
    'Audited annual financial statement',
    'Fundraising',
    'Payroll sheet return'   
  ]
  humanResource  = [ 
    'Submission on PO20 Filling of vacant substantive Posts',
    'Submission of Termination letters together with 68B forms',
    'Submission of POO2 forms for implementation of Acting allowances',
    'Submission of leave forms as soon as leave is utilized',
    'Submission of incapacity leave forms for employees who have completed their sick leave days',   
    'Submission of Pension claims forms for retiring employees',   
    'Submission of Housing and medical applications for newly appointed employees',   
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
