import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginAdmin, LoginSchool} from '../interface/login.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { School, User } from '../models/schoolModels';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public school!: School;
  public admin!: User

  constructor(private http: HttpClient,
    private router: Router,
   ) { }

  get tokenAdmin() {
    return localStorage.getItem('adminToken')
  }
  get tokenSchool() {
    return localStorage.getItem('tokenSchool')
  }

  get headersAdmin(): any {
    return {
      headers: {
        'x-token': this.tokenAdmin
      }
    }
  }
  get headersSchool(): any {
    return {
      headers: {
        'x-token': this.tokenSchool
      }
    }
  }

  login(user: any) {
    return this.http.post(`${base_url}/login`, user)
      .pipe(
        tap((resp: any) => {

          localStorage.setItem('adminToken', resp.token);
        })
      )
  }


  schoolLogin(school: any) {

    return this.http.post(`${base_url}/login_school`, school)
      .pipe(
        tap((resp: any) => {

          localStorage.setItem('tokenSchool', resp.token);
        })
      )
  }

  // token validate
  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/renew`, this.headersSchool)
    .pipe(
      map((resp: any) => {
        const {id_school, school_name, principal_name, grades, password, id_district } = resp.uid;
        this.school = new School(id_school, school_name, principal_name, grades, password, id_district);
        localStorage.setItem('tokenSchool', resp.token);
        
        return true

      }),      

      catchError(error => of(false))

    );
  }

  //validar si esta autenticado
  validarTokenAdmin(): Observable<boolean> {
    return this.http.get(`${base_url}/renew`, this.headersAdmin).pipe(
      map((resp: any) => {
        const {_id, user_name, email, rol } = resp.uid;
        this.admin = new User(_id, user_name, email, rol);
                
        localStorage.setItem('adminToken', resp.token);

        return true
      }),
      
      catchError(error => of(false))

    );
  }

}
