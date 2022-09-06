import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public images: Array<string> = [
    '../../../assets/dist/img/Fezile_Dabi Education 1.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 2.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 3.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 4.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 5.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 6.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 7.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 8.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 9.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 10.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 11.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 12.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 13.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 14.jpg',
    '../../../assets/dist/img/Fezile_Dabi Education 15.jpg',
   
   
  ];

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
