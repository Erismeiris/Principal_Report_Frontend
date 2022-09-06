import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';
import { School } from '../../interface/login.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formType = 'admin';

  school!: School;

  


userDB: any[] = [];

  user: string = '';


  public loginForm = this.fb.group({
    email: [localStorage.getItem('email' || ''), [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: false,
  })


  public schoolLoginForm = this.fb.group({
    school_name: ['', [Validators.required]],
    password: ['', Validators.required],
    remember: false,

  })

  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {



  }


  login() {

    if (this.loginForm.value.remember === true) {
      localStorage.setItem('email', this.loginForm.value.email!);
    } else {
      localStorage.removeItem('email')
    }
    if (this.loginForm.invalid) {
      return;
    }
    
    this.usuarioService.login(this.loginForm.value).subscribe(resp => {
      this.userDB = resp.user;
      const userName = this.userDB[0].user_name;
      if (resp) {
        
        Swal.fire({
          title: 'Welcome',
          text: `${userName}`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
        this.router.navigateByUrl('/dashboard/add-school');
      }
    }, (err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.msg,
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      })
    })
  }



  loginSchool() {

    const school = this.schoolLoginForm.value;

    this.usuarioService.schoolLogin(school).subscribe(resp => {
      if (resp) {
        this.school = resp.school;
        Swal.fire({
          title: 'Welcome',
          text: `${school.school_name}`,
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.router.navigateByUrl('/dashboard/report');
      }
    }, (err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  }


  home(){
    this.router.navigateByUrl('/dashboard');
  }


}
