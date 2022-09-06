import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { School, SchoolForm } from '../interface/login.interface';
import { UsuarioService } from './usuario.service';



const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class AddAchoolService {

  constructor( private http: HttpClient,
              private router: Router,
              private usuarioService: UsuarioService) { }

  //get Token from localStorage
  get token(){
    return localStorage.getItem('token')
  }

  get headers(){
    return { headers: {
      'x-token': this.token || ''
    }}
  }


addSchool( school: School){
  return this.http.post(`${base_url}/school/`, school)
}

getOneDistrict( id_district: any){
  return this.http.get(`${base_url}/district/${id_district}`)
}


getSchools(){
  return this.http.get(`${base_url}/school`, this.usuarioService.headersAdmin)
}

getOneSchool(id: any){
  return this.http.get(`${base_url}/school/${id}`, this.usuarioService.headersAdmin)
}

updateSchool( school: any){
  return this.http.put(`${base_url}/school/${school.id_school}`, school, this.usuarioService.headersAdmin)
}

deleteSchool( school: School){
  return this.http.delete(`${base_url}/school/${school.id_school}`, this.usuarioService.headersAdmin)
}

}
