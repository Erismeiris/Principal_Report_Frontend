import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-k-meetings',
  templateUrl: './k-meetings.component.html',
  styleUrls: ['./k-meetings.component.css']
})
export class KMeetingsComponent implements OnInit {
  
  meetingsType = [
    'Staff meeting or Economics subject meeting',
    'SMT meetings',
    'Subject committee',
    'Phase meetings',
    'SBST meetings',
    'Finance meetings'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
