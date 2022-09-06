import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DistrictService } from 'src/app/services/district.service';
import { District, School } from '../../interface/login.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAchoolService } from 'src/app/services/add-achool.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.css']
})
export class EditSchoolComponent implements OnInit {

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};



  districtList: District[] = [];

  public id?:number;

  public school!: School;


  
  public editSchoolForm = this.fb.group({
    id_school: [this.id],
    school_name: ['', Validators.required],
    id_district: [0, Validators.required],
    principal_name: ['', Validators.required],
    grades: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],

  });


  constructor(private fb: FormBuilder,
              private districServices: DistrictService,
              private activeteRouter: ActivatedRoute,
              private addSchoolService: AddAchoolService,
              private router: Router) { 
                this.id = this.activeteRouter.snapshot.params['id'];
                        

              }

  ngOnInit(): void {

    this.getDistricts();
    this.getOneSchool();

   

  }



  updateSchool() {
    
    
    this.addSchoolService.updateSchool(this.editSchoolForm.value, )
    .subscribe( resp => {
                  
      Swal.fire('Guardado', 'Los cambios fueron guardados', 'success')
 
      const ruta = () => this.router.navigateByUrl('/dashboard/school-list');
      setTimeout( ruta, 2000)
      

    }, (err) =>{
      Swal.fire('Error', err.error.msg, 'error');
     
      
    })
    
  }

  getOneSchool() {
    if(this.id){
    this.addSchoolService.getOneSchool(this.id).subscribe((resp: any) => {
      this.school = resp[0];
      this.editSchoolForm.patchValue({
        id_school: this.school.id_school,
        school_name: this.school.school_name,
        id_district: this.school.id_district,
        principal_name: this.school.principal_name,
        grades: this.school.grades,
        password: this.school.password,
      })
      
      
    });
  } else {
    this.editSchoolForm.reset();
  }
}


  getDistricts() {
    this.districServices.getDistrict().subscribe((resp: any) => {
      this.districtList = resp;
    })
  }


}
