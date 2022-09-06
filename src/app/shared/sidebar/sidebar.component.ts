import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { School, User } from 'src/app/models/schoolModels';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public school:School
  public admin: User;


  constructor(private userService: UsuarioService, private routes: Router) {
    
    if(this.userService.school){
    this.school = this.userService.school;
    }else{
      this.school = new School(0,"","",[],"",0,);
    }
   if(this.userService.admin){
    this.admin = this.userService.admin;
   }else{
    this.admin = new User(0,"","","")
   }
    
    

  }

  ngOnInit(): void {
    
  }


  

}
