import { Component, OnInit } from '@angular/core';
import { SchoolModel } from 'src/app/models/schoolModels';
import { AddAchoolService } from 'src/app/services/add-achool.service';
import { School } from '../../interface/login.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-schools',
  templateUrl: './add-schools.component.html',
  styleUrls: ['./add-schools.component.css']
})
export class AddSchoolsComponent implements OnInit {

  schoolList: any = [];

  constructor(private schoolService: AddAchoolService,
              private router: Router) { }

  ngOnInit(): void {

    this.getSchools();
  }

  getOneDistrict(id: number) {
    this.schoolService.getOneDistrict(id).subscribe(res => {
      console.log(res);
    })
  }

  getSchools() {
    this.schoolService.getSchools().subscribe((res: any) => {
      this.schoolList = res;
    })
  }


  /* editSchool(){
    this.schoolService.editSchool();
  } */

  deleteSchool(school: School) {
    Swal.fire({
      title: `Are you sure you want to delete ${school.school_name}?`,
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.schoolService.deleteSchool(school).subscribe((res: any) => {
          this.getSchools();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    }
    )
  }


edit(school:School){

  console.log(school.id_school);
  
  this.router.navigate(['dashboard/add-school']);
}

}
