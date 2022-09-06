import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-l-workshops',
  templateUrl: './l-workshops.component.html',
  styleUrls: ['./l-workshops.component.css']
})
export class LWorkshopsComponent implements OnInit {

  workshops =[
    'Subject forums',
    'Start-up workshops',
    `Principal's meeting`,
    'Feedback meeting SAs',
    'DH capacitation on subject management and leadership',
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
