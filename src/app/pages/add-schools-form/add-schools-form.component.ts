import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddAchoolService } from 'src/app/services/add-achool.service';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictService } from 'src/app/services/district.service';
import { District, School } from '../../interface/login.interface';



@Component({
  selector: 'add-schools-form',
  templateUrl: './add-schools-form.component.html',
  styleUrls: ['./add-schools-form.component.css']
})
export class AddSchoolsFormComponent implements OnInit {

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};

  districtList: District[] = [];

  gradeSellected: string[] = [];
  public addSchoolForm!: FormGroup;

  id_school: any;
  
   public school:any = []


  constructor(private fb: FormBuilder,
    private addSchoolService: AddAchoolService,
    private router: Router,
    private districServices: DistrictService,
    private activateRoute: ActivatedRoute ) { 
      this.id_school = this.activateRoute.snapshot.params['id'];
     
     
    }
  



  ngOnInit() {
    
      this.addSchoolForm = this.fb.group({
      school_name: ['', Validators.required],
      id_district: ['', Validators.required],
      principal_name: ['', Validators.required],
      grades: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  

    this.getDistricts();

    

    this.dropdownList = [
      { item_id: 1, item_text: 'Grade R' },
      { item_id: 2, item_text: 'Grade 1' },
      { item_id: 3, item_text: 'Grade 2' },
      { item_id: 4, item_text: 'Grade 3' },
      { item_id: 5, item_text: 'Grade 4' },
      { item_id: 6, item_text: 'Grade 5' },
      { item_id: 7, item_text: 'Grade 6' },
      { item_id: 8, item_text: 'Grade 7' },
      { item_id: 9, item_text: 'Grade 8' },
      { item_id: 10, item_text: 'Grade 9' },
      { item_id: 11, item_text: 'Grade 10' },
      { item_id: 12, item_text: 'Grade 11' },
      { item_id: 13, item_text: 'Grade 12' },
    ];

    this.selectedItems = [

    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 13,
      allowSearchFilter: true
    };


  }

  onItemSelect(item: any) {
    console.log(item);

  }
  onSelectAll(items: any) {
    console.log(items);

  }


  getDistricts() {
    this.districServices.getDistrict().subscribe((resp: any) => {
      this.districtList = resp;
    })
  }



  createSchool() {

    const { id_school,school_name, id_district, principal_name, grades, password } = this.addSchoolForm.value;
    const school = {
      id_school,
      school_name,
      id_district,
      principal_name,
      grades: grades.map((item: { item_text: any; }) => item.item_text).join(','),
      password
    }
    this.addSchoolService.addSchool(school).subscribe((resp: any) => {
      Swal.fire({
        title: 'Success',
        text: 'School created successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        this.router.navigateByUrl('/dashboard/school-list');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
       

    })

  }
}






